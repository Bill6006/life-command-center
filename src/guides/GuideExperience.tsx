import type { useGuideRuntime } from "./useGuideRuntime";
import type { GuideFamily, GuideStepDefinition, MainGuideFamily } from "./types";

type Runtime = ReturnType<typeof useGuideRuntime>;

const FAMILY_LABELS: Record<GuideFamily, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  "missed-morning": "Missed Morning",
  "smart-check-in": "Smart Check-In",
  weekly: "Weekly"
};

function GuideBadge({
  family,
  runtime
}: {
  family: MainGuideFamily | "weekly";
  runtime: Runtime;
}) {
  const complete = runtime.guideState.completions[family]?.key ===
    (family === "weekly" ? runtime.weekly.key : runtime.effectiveDate);
  const active = runtime.guideState.active?.family === family;
  return (
    <span className="guide-badge" data-status={active ? "active" : complete ? "complete" : "open"}>
      {FAMILY_LABELS[family]} · {active ? "Active" : complete ? "Complete" : "Open"}
    </span>
  );
}

export function GuideControls({ runtime }: { runtime: Runtime }) {
  const active = runtime.guideState.active;
  const suggestionLabel = FAMILY_LABELS[runtime.suggestion];
  return (
    <section className="guide-control-card" id="guide-controls" aria-labelledby="guide-controls-title">
      <div className="guide-control-heading">
        <div>
          <span className="eyebrow">Time-aware guidance</span>
          <h2 id="guide-controls-title">
            {active ? `${FAMILY_LABELS[active.family]} guide in progress` : `${suggestionLabel} guide is ready`}
          </h2>
          <p>
            Guides route to existing controls and save each explicit step. Opening a target never
            manufactures an answer.
          </p>
        </div>
        <div
          className="save-chip"
          data-status={runtime.saveStatus}
          role="status"
          aria-live="polite"
        >
          <span className="status-dot" />
          {runtime.saveStatus === "loading"
            ? "Opening local state"
            : runtime.saveStatus === "saving"
              ? "Saving locally"
              : runtime.saveStatus === "error"
                ? "Save needs attention"
                : "Saved locally"}
        </div>
      </div>

      <div className="guide-badges" aria-label="Guide completion status">
        <GuideBadge family="morning" runtime={runtime} />
        <GuideBadge family="afternoon" runtime={runtime} />
        <GuideBadge family="evening" runtime={runtime} />
        <GuideBadge family="weekly" runtime={runtime} />
      </div>

      <div className="guide-primary-actions">
        <button
          className="button button-primary"
          type="button"
          disabled={Boolean(active) || runtime.guideState.quickMode.active}
          onClick={() => runtime.launch(runtime.suggestion, false)}
        >
          Start {suggestionLabel} Guide
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={runtime.toggleQuickMode}
        >
          {runtime.guideState.quickMode.active ? "Stop Quick Mode" : "Start Quick Mode"}
        </button>
        <button
          className="button button-secondary"
          type="button"
          disabled={!runtime.missedMorning.eligible || Boolean(active)}
          title={runtime.missedMorning.reason}
          onClick={() => runtime.launch("missed-morning", false)}
        >
          Missed Morning
        </button>
        <button
          className="button button-secondary"
          type="button"
          disabled={!runtime.smart.eligible || Boolean(active)}
          title={runtime.smart.reason}
          onClick={() => runtime.launch("smart-check-in", false)}
        >
          Smart Check-In
        </button>
        <button
          className="button button-secondary"
          type="button"
          disabled={!runtime.weekly.eligible || Boolean(active)}
          title={runtime.weekly.reason}
          onClick={() => runtime.launch("weekly", false)}
        >
          Weekly Guide
        </button>
      </div>

      <details className="manual-guides">
        <summary>Launch another full guide</summary>
        <div>
          {(["morning", "afternoon", "evening"] as const).map((family) => (
            <button
              type="button"
              className="text-button"
              disabled={Boolean(active) || runtime.guideState.quickMode.active}
              onClick={() => runtime.launch(family, true)}
              key={family}
            >
              {FAMILY_LABELS[family]}
            </button>
          ))}
        </div>
      </details>

      {runtime.guideState.quickMode.active && (
        <div className="quick-mode-panel" role="status">
          <span className="eyebrow">Quick Mode</span>
          <strong>Reduced check-in is active.</strong>
          <p>Guide launch is paused until Quick Mode is stopped. Evidence keeps normal save semantics.</p>
        </div>
      )}
      {runtime.notice && (
        <div className="guide-notice" role="status" aria-live="polite">
          <span>{runtime.notice}</span>
          <button type="button" aria-label="Dismiss guide message" onClick={() => runtime.setNotice("")}>
            ×
          </button>
        </div>
      )}
    </section>
  );
}

export function GuideTarget({
  step,
  activeTab
}: {
  step: GuideStepDefinition | undefined;
  activeTab: string;
}) {
  if (!step || step.tab !== activeTab) return null;
  return (
    <article className="guide-target-card" id={step.targetId} tabIndex={-1}>
      <span className="eyebrow">Guide target · {FAMILY_LABELS[step.guideFamily as GuideFamily]}</span>
      <h2>{step.title}</h2>
      <p>{step.note}</p>
      <div className="guide-target-rule">
        <span>Completion rule</span>
        <strong>
          {step.completionRule === "explicit-evidence" ? "Explicit confirmation" : "Acknowledgement"}
        </strong>
      </div>
    </article>
  );
}

export function GuideOverlay({ runtime }: { runtime: Runtime }) {
  const active = runtime.guideState.active;
  const step = runtime.currentStep;
  if (!active || !step) return null;
  const finalStep = active.stepIndex === active.stepIds.length - 1;
  return (
    <aside
      className="guide-overlay"
      role="region"
      aria-live="polite"
      aria-labelledby="active-guide-title"
    >
      <div className="guide-overlay-progress">
        <span>{FAMILY_LABELS[active.family]} Guide</span>
        <span>
          {active.stepIndex + 1} / {active.stepIds.length}
        </span>
      </div>
      <div className="guide-progress-track" aria-hidden="true">
        <span style={{ width: `${((active.stepIndex + 1) / active.stepIds.length) * 100}%` }} />
      </div>
      <h2 id="active-guide-title">{step.title}</h2>
      <p>{step.note}</p>
      <div className="guide-overlay-actions">
        <button className="button button-primary" type="button" onClick={runtime.next}>
          {finalStep ? "Save & complete" : "Save & next"}
        </button>
        <button className="button button-secondary" type="button" onClick={runtime.skip}>
          Skip
        </button>
        <button className="text-button" type="button" onClick={runtime.stop}>
          Stop
        </button>
      </div>
    </aside>
  );
}
