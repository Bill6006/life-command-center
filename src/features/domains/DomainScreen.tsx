import { useMemo, useState } from "react";
import {
  confirmWeeklyFocus,
  resolveWeeklyFocus,
  WEEKLY_FOCUS_DOMAINS,
  WEEKLY_FOCUS_LABELS,
  weekKeyForDate,
  type WeeklyFocusDomain
} from "../../intelligence";
import { GuideTarget } from "../../guides/GuideExperience";
import type { useGuideRuntime } from "../../guides/useGuideRuntime";
import { DOMAIN_DEFINITIONS, ENVIRONMENT_DEFINITION } from "./definitions";
import { buildStateIntelligenceProjection, weeklyFocusRecords } from "./intelligence";
import {
  addWorkWin,
  domainEvidenceSummary,
  readDomainField,
  readWorkWins,
  sevenDayMovementRates,
  writeDomainField,
  writePhase7DomainValue
} from "./state";
import type {
  DomainDefinition,
  DomainFieldDefinition,
  DomainFieldPrimitive,
  DomainTabId,
  WorkWinRecord
} from "./types";

type Runtime = ReturnType<typeof useGuideRuntime>;

function primitiveValue(value: DomainFieldPrimitive) {
  return value === null ? "" : String(value);
}

function DomainFieldControl({
  definition,
  field,
  runtime
}: {
  definition: DomainDefinition;
  field: DomainFieldDefinition;
  runtime: Runtime;
}) {
  const record = readDomainField(
    runtime.rootState,
    runtime.effectiveDate,
    definition.id,
    definition.storageKey,
    field.scope,
    field.id
  );
  const controlId = `domain-${definition.id}-${field.id}`;
  const update = (value: DomainFieldPrimitive) =>
    runtime.mutateRoot((state) =>
      writeDomainField(state, {
        dateKey: runtime.effectiveDate,
        domain: definition.id,
        storageKey: definition.storageKey,
        scope: field.scope,
        fieldId: field.id,
        value
      })
    );

  if (field.kind === "toggle") {
    return (
      <fieldset className="domain-field domain-field-toggle">
        <legend>
          {field.label}
          {field.private ? <span className="private-chip">Private</span> : null}
        </legend>
        {field.help ? <p>{field.help}</p> : null}
        <div role="group" aria-label={field.label}>
          <button
            type="button"
            data-selected={record.value === null}
            onClick={() => update(null)}
          >
            Unknown
          </button>
          <button
            type="button"
            data-selected={record.value === false}
            onClick={() => update(false)}
          >
            No
          </button>
          <button
            type="button"
            data-selected={record.value === true}
            onClick={() => update(true)}
          >
            Yes
          </button>
        </div>
      </fieldset>
    );
  }

  if (field.kind === "text") {
    return (
      <label className="domain-field" htmlFor={controlId}>
        <span>
          {field.label}
          {field.private ? <span className="private-chip">Private</span> : null}
        </span>
        {field.help ? <small>{field.help}</small> : null}
        <textarea
          id={controlId}
          value={typeof record.value === "string" ? record.value : ""}
          onChange={(event) => update(event.currentTarget.value)}
          placeholder="Blank until you choose to add a local note"
        />
      </label>
    );
  }

  if (field.kind === "choice") {
    return (
      <label className="domain-field" htmlFor={controlId}>
        <span>
          {field.label}
          {field.private ? <span className="private-chip">Private</span> : null}
        </span>
        {field.help ? <small>{field.help}</small> : null}
        <select
          id={controlId}
          value={typeof record.value === "string" ? record.value : ""}
          onChange={(event) => update(event.currentTarget.value || null)}
        >
          <option value="">Unknown / not logged</option>
          {field.options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.kind === "scale") {
    const minimum = field.min ?? 0;
    const maximum = field.max ?? 10;
    const options = Array.from({ length: maximum - minimum + 1 }, (_, index) => minimum + index);
    return (
      <label className="domain-field" htmlFor={controlId}>
        <span>
          {field.label}
          {field.private ? <span className="private-chip">Private</span> : null}
        </span>
        {field.help ? <small>{field.help}</small> : <small>0–10 · unknown is separate</small>}
        <select
          id={controlId}
          value={typeof record.value === "number" ? record.value : ""}
          onChange={(event) =>
            update(event.currentTarget.value === "" ? null : Number(event.currentTarget.value))
          }
        >
          <option value="">Unknown / not logged</option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="domain-field" htmlFor={controlId}>
      <span>
        {field.label}
        {field.private ? <span className="private-chip">Private</span> : null}
      </span>
      {field.help ? <small>{field.help}</small> : null}
      <input
        id={controlId}
        type={field.kind}
        min={field.min}
        max={field.max}
        step={field.step}
        value={primitiveValue(record.value)}
        onChange={(event) => {
          if (event.currentTarget.value === "") update(null);
          else if (field.kind === "number") update(Number(event.currentTarget.value));
          else update(event.currentTarget.value);
        }}
      />
    </label>
  );
}

function ForecastBridge({ runtime }: { runtime: Runtime }) {
  const projection = useMemo(
    () =>
      buildStateIntelligenceProjection(
        runtime.rootState,
        runtime.effectiveDate,
        runtime.context.now
      ),
    [runtime.context.now, runtime.effectiveDate, runtime.rootState]
  );
  return (
    <aside className="domain-intelligence" aria-label="Shared command intelligence">
      <div>
        <span className="eyebrow">Existing intelligence layer</span>
        <h2>{projection.selected.title}</h2>
        <p>{projection.selected.instruction}</p>
      </div>
      <dl>
        <div>
          <dt>Forecast</dt>
          <dd>
            {projection.forecast.score} · {projection.forecast.confidence}
          </dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>
            {projection.capacity.provisional ? "Provisional " : ""}
            {projection.capacity.band}
          </dd>
        </div>
        <div>
          <dt>Protected lane</dt>
          <dd>{projection.capacity.protectedNextLane}</dd>
        </div>
        <div>
          <dt>Evidence days</dt>
          <dd>{projection.context.effectiveEvidenceDays}</dd>
        </div>
      </dl>
      <p className="truth-note">Predicted direction stays separate from observed outcomes.</p>
    </aside>
  );
}

function HealthRates({ runtime }: { runtime: Runtime }) {
  const rates = sevenDayMovementRates(runtime.rootState, runtime.effectiveDate);
  const display = (value: number | null) => (value === null ? "—" : `${value}%`);
  return (
    <aside className="domain-rate-card" aria-label="Seven-day movement evidence">
      <span className="eyebrow">Movement history</span>
      <h2>Seven-day evidence</h2>
      <dl>
        <div>
          <dt>Movement rate</dt>
          <dd>{display(rates.movement)}</dd>
        </div>
        <div>
          <dt>Starter rate</dt>
          <dd>{display(rates.starter)}</dd>
        </div>
        <div>
          <dt>Lift rate</dt>
          <dd>{display(rates.lift)}</dd>
        </div>
        <div>
          <dt>Recovery rate</dt>
          <dd>{display(rates.recovery)}</dd>
        </div>
      </dl>
      <p>{rates.days ? `${rates.days} local day record(s) considered.` : "No movement history yet."}</p>
    </aside>
  );
}

function WeekFocusCard({ runtime }: { runtime: Runtime }) {
  const records = weeklyFocusRecords(runtime.rootState);
  const weekKey = weekKeyForDate(runtime.context.now);
  const resolution = resolveWeeklyFocus(records, weekKey);
  const [selection, setSelection] = useState<WeeklyFocusDomain>(
    resolution.selected ?? resolution.suggestion
  );

  const confirm = () =>
    runtime.mutateRoot((state) => {
      const next = confirmWeeklyFocus(weeklyFocusRecords(state), weekKey, selection, new Date());
      writePhase7DomainValue(state, "weeklyAnchors", "weeklyFocusRecords", next);
    });

  return (
    <section className="weekly-focus-card" id="weekly-growth-focus" aria-labelledby="weekly-focus-title">
      <div>
        <span className="eyebrow">User-controlled</span>
        <h2 id="weekly-focus-title">Weekly Growth Focus</h2>
        <p>
          {resolution.selected
            ? `${WEEKLY_FOCUS_LABELS[resolution.selected]} is active from ${resolution.source.replaceAll("-", " ")}.`
            : "No focus is confirmed for this week."}
        </p>
      </div>
      <label htmlFor="weekly-focus-select">
        <span>Confirm or change</span>
        <select
          id="weekly-focus-select"
          value={selection}
          onChange={(event) => setSelection(event.currentTarget.value as WeeklyFocusDomain)}
        >
          {WEEKLY_FOCUS_DOMAINS.map((domain) => (
            <option value={domain} key={domain}>
              {WEEKLY_FOCUS_LABELS[domain]}
            </option>
          ))}
        </select>
      </label>
      <button className="button button-primary" type="button" onClick={confirm}>
        Confirm focus
      </button>
      <div className="focus-suggestion">
        <span>Automatic suggestion</span>
        <strong>{WEEKLY_FOCUS_LABELS[resolution.suggestion]}</strong>
        <small>Evidence can suggest; it cannot replace your choice.</small>
      </div>
    </section>
  );
}

function WorkWinsPanel({ runtime }: { runtime: Runtime }) {
  const wins = readWorkWins(runtime.rootState);
  const [technology, setTechnology] = useState("");
  const [issue, setIssue] = useState("");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");
  const [evidenceStatus, setEvidenceStatus] =
    useState<WorkWinRecord["evidenceStatus"]>("unverified");
  const [sensitive, setSensitive] = useState(true);

  const save = (status: WorkWinRecord["status"]) => {
    const timestamp = new Date().toISOString();
    const record: WorkWinRecord = {
      id: `work-win-${timestamp}-${wins.length + 1}`,
      technology: technology.trim().slice(0, 160),
      issue: issue.trim().slice(0, 2400),
      action: action.trim().slice(0, 2400),
      result: result.trim().slice(0, 2400),
      evidenceStatus,
      sensitive,
      status,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    runtime.mutateRoot((state) => addWorkWin(state, record));
    setTechnology("");
    setIssue("");
    setAction("");
    setResult("");
    setEvidenceStatus("unverified");
    setSensitive(true);
  };

  const hasInput = [technology, issue, action, result].some((value) => value.trim());

  return (
    <section className="work-wins-panel" aria-labelledby="work-wins-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Career proof bridge</span>
          <h2 id="work-wins-title">Work Wins</h2>
          <p>Capture bounded text only. Attachments and screenshot bytes are never stored.</p>
        </div>
        <span>{wins.length} local record(s)</span>
      </div>
      <div className="work-win-form">
        <label>
          <span>Technology</span>
          <input value={technology} onChange={(event) => setTechnology(event.currentTarget.value)} />
        </label>
        <label>
          <span>Issue / problem <span className="private-chip">Private</span></span>
          <textarea value={issue} onChange={(event) => setIssue(event.currentTarget.value)} />
        </label>
        <label>
          <span>Action <span className="private-chip">Private</span></span>
          <textarea value={action} onChange={(event) => setAction(event.currentTarget.value)} />
        </label>
        <label>
          <span>Result <span className="private-chip">Private</span></span>
          <textarea value={result} onChange={(event) => setResult(event.currentTarget.value)} />
        </label>
        <label>
          <span>Evidence status</span>
          <select
            value={evidenceStatus}
            onChange={(event) =>
              setEvidenceStatus(event.currentTarget.value as WorkWinRecord["evidenceStatus"])
            }
          >
            <option value="unverified">Unverified</option>
            <option value="observed">Observed</option>
            <option value="verified">Verified</option>
          </select>
        </label>
        <label className="sensitivity-control">
          <input
            type="checkbox"
            checked={sensitive}
            onChange={(event) => setSensitive(event.currentTarget.checked)}
          />
          <span>Mark details sensitive</span>
        </label>
      </div>
      <div className="work-win-actions">
        <button
          className="button button-secondary"
          type="button"
          disabled={!hasInput}
          onClick={() => save("draft")}
        >
          Save draft
        </button>
        <button
          className="button button-primary"
          type="button"
          disabled={!hasInput}
          onClick={() => save("complete")}
        >
          Save complete
        </button>
      </div>
      <p className="truth-note">
        Sanitized export is the default and omits marked-sensitive result details. Skill mapping
        can only suggest upward proof review.
      </p>
      {wins.length ? (
        <div className="work-win-queue" aria-label="Work Win review queue">
          {wins.slice(-4).reverse().map((win) => (
            <article key={win.id}>
              <span>{win.status} · {win.evidenceStatus}</span>
              <h3>{win.technology || "Technology not named"}</h3>
              <p>{win.sensitive ? "Sensitive local details hidden in this review card." : win.result}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="blank-callout">The review queue is empty. No synthetic Work Win is bundled.</p>
      )}
    </section>
  );
}

function DomainSections({
  definition,
  runtime
}: {
  definition: DomainDefinition;
  runtime: Runtime;
}) {
  return (
    <div className="domain-sections">
      {definition.sections.map((section) => (
        <section className="domain-section-card" aria-labelledby={`${section.id}-title`} key={section.id}>
          <div className="domain-section-heading">
            <span className="eyebrow">{section.eyebrow}</span>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div className="domain-field-grid">
            {section.fields.map((field) => (
              <DomainFieldControl
                definition={definition}
                field={field}
                runtime={runtime}
                key={`${field.scope}-${field.id}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DomainHero({
  definition,
  runtime
}: {
  definition: DomainDefinition;
  runtime: Runtime;
}) {
  const fields = definition.sections.flatMap((section) =>
    section.fields.map((field) => ({ id: field.id, scope: field.scope }))
  );
  const evidence = domainEvidenceSummary(
    runtime.rootState,
    runtime.effectiveDate,
    definition.id,
    definition.storageKey,
    fields
  );
  return (
    <header className="domain-hero">
      <div className="domain-monogram" aria-hidden="true">
        {definition.id.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <span className="eyebrow">{definition.eyebrow}</span>
        <h1>{definition.title}</h1>
        <p>{definition.description}</p>
        <div className="domain-status-row">
          <span>{evidence.label}</span>
          <span>Autosave: {runtime.saveStatus}</span>
          <span>Effective day: {runtime.effectiveDate}</span>
        </div>
      </div>
      <p className="domain-boundary">{definition.boundary}</p>
    </header>
  );
}

export function DomainScreen({
  activeTab,
  runtime
}: {
  activeTab: DomainTabId;
  runtime: Runtime;
}) {
  const definition = DOMAIN_DEFINITIONS[activeTab];
  return (
    <section className="domain-screen" aria-label={definition.eyebrow}>
      <DomainHero definition={definition} runtime={runtime} />
      <ForecastBridge runtime={runtime} />
      {activeTab === "week" ? <WeekFocusCard runtime={runtime} /> : null}
      <DomainSections definition={definition} runtime={runtime} />
      {activeTab === "health" ? <HealthRates runtime={runtime} /> : null}
      {activeTab === "azure" ? <WorkWinsPanel runtime={runtime} /> : null}
      <GuideTarget step={runtime.currentStep} activeTab={activeTab} />
    </section>
  );
}

export function EnvironmentPanel({ runtime }: { runtime: Runtime }) {
  return (
    <section className="embedded-domain" id="environment-panel" aria-label="Environment domain">
      <DomainHero definition={ENVIRONMENT_DEFINITION} runtime={runtime} />
      <DomainSections definition={ENVIRONMENT_DEFINITION} runtime={runtime} />
    </section>
  );
}

export function isDomainTab(id: string): id is DomainTabId {
  return Object.hasOwn(DOMAIN_DEFINITIONS, id);
}
