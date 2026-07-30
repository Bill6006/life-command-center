import { useState, type ChangeEvent } from "react";
import { runPhase68Acceptance, type Phase68Acceptance } from "../../diagnostics";
import {
  buildLevel5Review,
  buildLifeUpdate,
  buildPhase17Report,
  buildWorkWinPacket,
  exportJson,
  safeExportFilename,
  type ExportRange
} from "../../exports";
import type { useGuideRuntime } from "../../guides/useGuideRuntime";
import { GuideTarget } from "../../guides/GuideExperience";
import { fullBackupJson, type PreparedBackup } from "../../storage/fullBackup";
import type { RestoreMode } from "../../storage/verifiedRestore";
import { downloadText } from "./download";

type Runtime = ReturnType<typeof useGuideRuntime>;

function currentDate() {
  return new Date().toISOString().slice(0, 10);
}

export function DataScreen({ runtime }: { runtime: Runtime }) {
  const [range, setRange] = useState<ExportRange>("30");
  const [includePrivatePattern, setIncludePrivatePattern] = useState(false);
  const [prepared, setPrepared] = useState<PreparedBackup | null>(null);
  const [restoreName, setRestoreName] = useState("");
  const [restoreError, setRestoreError] = useState("");
  const [activityNotice, setActivityNotice] = useState("");
  const [acceptance, setAcceptance] = useState<Phase68Acceptance | null>(null);
  const [diagnosticStatus, setDiagnosticStatus] = useState<
    "idle" | "running" | "complete" | "error"
  >("idle");
  const effectiveDate = runtime.effectiveDate || currentDate();

  async function exportFullBackup() {
    setActivityNotice("Preparing the private Full Backup.");
    const text = await fullBackupJson(runtime.rootState, {
      effectiveDate
    });
    downloadText(
      safeExportFilename("full-backup", effectiveDate),
      text
    );
    setActivityNotice("Full Backup prepared for local download.");
  }

  function exportLifeUpdate() {
    const report = buildLifeUpdate(runtime.rootState, {
      range,
      effectiveDate,
      includePrivatePattern
    });
    downloadText(
      safeExportFilename("life-update", effectiveDate),
      exportJson(report)
    );
    setActivityNotice("Life Update prepared for local download.");
  }

  function exportLevel5() {
    const report = buildLevel5Review(runtime.rootState, {
      range,
      effectiveDate,
      acceptance
    });
    downloadText(
      safeExportFilename("level-5", effectiveDate),
      exportJson(report)
    );
    setActivityNotice("Level 5 review prepared for local download.");
  }

  function exportPhase17() {
    if (!acceptance) return;
    downloadText(
      safeExportFilename("phase-17", effectiveDate),
      exportJson(buildPhase17Report(runtime.rootState, acceptance))
    );
    setActivityNotice("Phase 17 report prepared for local download.");
  }

  function exportWorkWins(
    mode: "sanitized-json" | "sanitized-text" | "full-metadata-json"
  ) {
    if (
      mode === "full-metadata-json" &&
      !window.confirm(
        "Full metadata can contain private context. Export it for local review?"
      )
    ) {
      return;
    }
    const packet = buildWorkWinPacket(runtime.rootState, mode);
    const extension = mode === "sanitized-text" ? "txt" : "json";
    downloadText(
      safeExportFilename("work-wins", effectiveDate, extension),
      typeof packet === "string" ? packet : exportJson(packet),
      extension === "txt" ? "text/plain" : "application/json"
    );
    setActivityNotice(
      mode === "full-metadata-json"
        ? "Full-metadata Work Win packet prepared for local download."
        : "Sanitized Work Win packet prepared for local download."
    );
  }

  async function prepareImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setRestoreError("");
    setPrepared(null);
    setRestoreName(file.name);
    setActivityNotice("Preparing and checking the selected backup.");
    try {
      const next = await runtime.prepareRestore(await file.text());
      setPrepared(next);
      setActivityNotice(
        next.verified
          ? "Full Backup signature verified. Choose Replace, Merge, or Cancel."
          : "Readable legacy state prepared. Choose Replace, Merge, or Cancel."
      );
    } catch (error) {
      setRestoreError(
        error instanceof Error ? error.message : "The backup could not be prepared."
      );
      setActivityNotice("Backup preparation stopped with a readable error.");
    }
  }

  async function restore(mode: RestoreMode) {
    if (!prepared) return;
    setRestoreError("");
    setActivityNotice(
      mode === "cancel"
        ? "Cancelling the prepared restore."
        : `${mode === "replace" ? "Replacing" : "Merging"} local state and verifying both storage layers.`
    );
    try {
      const result = await runtime.executeRestore(prepared, mode);
      if (result.status === "cancelled") {
        setPrepared(null);
        setRestoreName("");
        setActivityNotice("Prepared restore cancelled. Local state was not changed.");
      }
    } catch (error) {
      setRestoreError(
        error instanceof Error ? error.message : "The restore could not be verified."
      );
      setActivityNotice("Restore stopped and the protected local state remains available.");
    }
  }

  async function runDiagnostics() {
    setDiagnosticStatus("running");
    setActivityNotice("Running the on-demand Phase 68 acceptance groups.");
    try {
      const result = await runPhase68Acceptance(runtime.rootState, {
        effectiveDate,
        externalVerificationComplete: false
      });
      setAcceptance(result);
      setDiagnosticStatus("complete");
      setActivityNotice(
        `Phase 68 completed with ${result.decision}. ${result.groups.filter((group) => group.passed).length} of ${result.groups.length} groups passed.`
      );
    } catch {
      setDiagnosticStatus("error");
      setActivityNotice("Phase 68 stopped with a readable error.");
    }
  }

  return (
    <section className="data-screen" aria-labelledby="data-screen-title">
      <p className="sr-only" role="status" aria-live="polite">
        {activityNotice}
      </p>
      <article className="data-hero">
        <div className="domain-monogram" aria-hidden="true">
          DA
        </div>
        <div>
          <span className="eyebrow">Storage and data</span>
          <h1 id="data-screen-title">Keep recovery close and exports intentional.</h1>
          <p>
            The workspace remains local-first. Backups, analytical exports, and
            diagnostics are generated only here; no data is uploaded by this screen.
          </p>
        </div>
        <p className="domain-boundary">
          Full Backup contains the complete local workspace. Analytical exports
          are projections and exclude unknown durable state. Review every file
          before sharing it.
        </p>
      </article>

      <div className="data-grid">
        <article className="data-card" id="data-storage">
          <span className="eyebrow">Recovery layer</span>
          <h2>Storage and backup</h2>
          <dl className="data-status-list">
            <div>
              <dt>Primary save</dt>
              <dd>{runtime.saveStatus}</dd>
            </div>
            <div>
              <dt>Latest snapshot</dt>
              <dd>
                {runtime.lastBackupAt
                  ? new Date(runtime.lastBackupAt).toLocaleString()
                  : runtime.backupStatus === "idle"
                    ? "Not created this session"
                    : runtime.backupStatus}
              </dd>
            </div>
            <div>
              <dt>Saved days</dt>
              <dd>{Object.keys(runtime.rootState.days).length}</dd>
            </div>
            <div>
              <dt>Schema</dt>
              <dd>{runtime.rootState.schemaVersion}</dd>
            </div>
          </dl>
          <label className="data-toggle">
            <input
              type="checkbox"
              checked={runtime.rootState.settings.autoBackupEnabled}
              onChange={(event) =>
                runtime.mutateRoot((state) => {
                  state.settings.autoBackupEnabled = event.target.checked;
                })
              }
            />
            <span>Automatic recovery snapshot every 30 minutes</span>
          </label>
          <div className="data-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={() => {
                setActivityNotice("Creating and verifying a recovery snapshot.");
                void runtime
                  .createRecoveryBackup()
                  .then(() =>
                    setActivityNotice(
                      "Recovery snapshot verified in both local storage layers."
                    )
                  )
                  .catch(() =>
                    setActivityNotice(
                      "Recovery snapshot stopped with a readable error."
                    )
                  );
              }}
              disabled={runtime.backupStatus === "saving"}
            >
              {runtime.backupStatus === "saving"
                ? "Verifying…"
                : "Create recovery snapshot"}
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => void exportFullBackup()}
            >
              Download Full Backup
            </button>
          </div>
          <p className="data-warning">
            Full Backup includes private notes and all local records. Keep it
            private and never commit it.
          </p>
        </article>

        <article className="data-card" id="data-restore">
          <span className="eyebrow">Verified import</span>
          <h2>Prepare before replacing anything.</h2>
          <p>
            The file is parsed and migrated before a choice appears. Replace and
            Merge both require write/read-back verification and a reload check.
          </p>
          <label className="file-picker">
            <span>Choose a JSON backup</span>
            <input type="file" accept="application/json,.json" onChange={prepareImport} />
          </label>
          {prepared ? (
            <div className="restore-review" role="status" aria-live="polite">
              <strong>{restoreName}</strong>
              <span>
                {prepared.verified
                  ? "Full Backup signature verified"
                  : "Readable legacy state; no Full Backup signature"}
              </span>
              <span>Source schema: {prepared.sourceSchemaVersion}</span>
              <div className="data-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => void restore("replace")}
                >
                  Replace
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => void restore("merge")}
                >
                  Merge
                </button>
                <button
                  className="button button-quiet"
                  type="button"
                  onClick={() => void restore("cancel")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
          {restoreError ? (
            <p className="data-error" role="alert">
              {restoreError}
            </p>
          ) : null}
        </article>

        <article className="data-card data-card-wide" id="data-life-update">
          <span className="eyebrow">Analytical projection</span>
          <h2>Life Update</h2>
          <p>
            Generate a 7-day, 30-day, or all-history projection. Private Pattern
            details stay out unless you explicitly include them.
          </p>
          <div className="export-options">
            <label>
              <span>Logged-day range</span>
              <select
                value={range}
                onChange={(event) => setRange(event.target.value as ExportRange)}
              >
                <option value="7">Last 7</option>
                <option value="30">Last 30</option>
                <option value="all">All</option>
              </select>
            </label>
            <label className="data-toggle">
              <input
                type="checkbox"
                checked={includePrivatePattern}
                onChange={(event) => setIncludePrivatePattern(event.target.checked)}
              />
              <span>Include private Pattern fields</span>
            </label>
          </div>
          <div className="data-actions">
            <button className="button button-primary" type="button" onClick={exportLifeUpdate}>
              Download Life Update
            </button>
            <button className="button button-secondary" type="button" onClick={exportLevel5}>
              Download Level 5 review
            </button>
          </div>
        </article>

        <article className="data-card" id="data-work-wins">
          <span className="eyebrow">Career proof</span>
          <h2>Work Win packets</h2>
          <p>
            Sanitized files omit private issue context and marked-sensitive results.
            Full metadata requires an explicit warning.
          </p>
          <div className="data-actions data-actions-stacked">
            <button className="button button-primary" type="button" onClick={() => exportWorkWins("sanitized-json")}>
              Sanitized JSON
            </button>
            <button className="button button-secondary" type="button" onClick={() => exportWorkWins("sanitized-text")}>
              Sanitized text
            </button>
            <button className="button button-quiet" type="button" onClick={() => exportWorkWins("full-metadata-json")}>
              Full metadata
            </button>
          </div>
        </article>

        <article className="data-card" id="data-diagnostics">
          <span className="eyebrow">On-demand only</span>
          <h2>Diagnostics and maturity truth</h2>
          <p>
            Deep checks do not run during startup or ordinary saves. Capability,
            adoption, and personal outcome evidence remain separate.
          </p>
          {acceptance ? (
            <div
              className="diagnostic-result"
              data-decision={acceptance.decision}
              role="status"
              aria-live="polite"
            >
              <strong>{acceptance.decision}</strong>
              <span>
                {acceptance.groups.filter((group) => group.passed).length} of{" "}
                {acceptance.groups.length} automated groups passed
              </span>
              <span>
                Personal evidence: {acceptance.maturity.outcome.level}
              </span>
              <small>{acceptance.reasons[1]}</small>
            </div>
          ) : (
            <p className="diagnostic-idle" role="status">
              Not run. No deep diagnostic work has executed.
            </p>
          )}
          <div className="data-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={() => void runDiagnostics()}
              disabled={diagnosticStatus === "running"}
            >
              {diagnosticStatus === "running" ? "Running…" : "Run Phase 68 acceptance"}
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={exportPhase17}
              disabled={!acceptance}
            >
              Download Phase 17 report
            </button>
          </div>
          {diagnosticStatus === "error" ? (
            <p className="data-error" role="alert">
              Diagnostics stopped with a readable failure.
            </p>
          ) : null}
        </article>
      </div>

      <GuideTarget step={runtime.currentStep} activeTab="data" />
    </section>
  );
}
