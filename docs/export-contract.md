# Export Contract

Exports are versioned projections over a committed, migrated snapshot. Building
an export first commits focused fields and pending range drafts, but it does not
otherwise mutate user state.

## Shared rules

- Add `exportType`, format/schema version, generation timestamp, application
  timezone, effective local date, and rollover metadata.
- Use stable UTF-8 JSON or plain text downloads.
- Exclude functions, DOM state, transient timers, binary attachments, and the
  embedded legacy seed.
- Preserve unknown durable fields only in Full Backup; analytical exports expose
  documented projections.
- Sanitized/private-off is the default for analytical and proof exports.
- Never log or show full exported content as an error diagnostic.
- Large exports show progress, disable duplicate export controls, yield to the
  browser, and report readable failure.
- Mobile export behavior must not rely on popup windows.

## Export families

| Family | Formats / ranges | Purpose and required content | Privacy behavior |
| --- | --- | --- | --- |
| Full Backup | JSON, all durable state | Exact migration/restore artifact, schema/envelope, canonical integrity metadata, settings, domains, days, history, unknown extensions | Contains user data by design; explicit action and warning; never a repository artifact |
| Fast/latest backup | JSON | Lightweight immediate recovery download from canonical storage projection | Same private handling as Full Backup |
| Life Update | JSON, 7/30/all logged days | Averages, evidence integrity, completion rates, category scores, snapshots, domain summaries, forecast, patterns, actions and reflection | Private pattern fields included only by explicit setting |
| Pattern Lab | JSON within Life Update / diagnostic projection | Forecast context, per-period slider logs, day food, actual-night mapping, timelines, rates, averages, profiles | Private-variable details null/stripped by default |
| Forecast Moves | JSON projection | Action lifecycle, candidate/context summary, predicted vs observed effects, automatic learning and compact Work Win summary | No unrelated private day content |
| Mood timeline | JSON projection | Normalized level, time, trigger note, summary ranges and signal counts | Treat notes as user data; only included in explicit analytical export |
| Level 5 Review | JSON, range-selectable | Deep app capability, adoption, personal evidence, domains, maturity truth, UI safety, constraints, optimization, capacity and sanitized career-proof packet | Sanitized career proof by default; avoids full backup payload |
| Phase 17 Acceptance / tuning | JSON | Scenario results, diagnostics, performance/tuning evidence, readable failures | Synthetic/structural diagnostics preferred; no raw personal records |
| Work Win proof packet | Sanitized JSON, sanitized text, explicit full-metadata JSON | Bounded records, mappings, evidence metadata, editable drafts and review state | Sanitized default omits private context and marked-sensitive location |
| Targeted sleep/night helpers | Structured JSON segments | Actual-night food, pre-bed stressors, next-morning effects, sleep/recovery context | Follow analytical private setting |

## Full Backup envelope

The successor envelope is versioned and accepts the legacy forms:

```ts
interface FullBackupEnvelope {
  app: "Tyree Life Command Center";
  exportType: "Full Backup";
  formatVersion: number;
  schemaVersion: string;
  generatedAt: string;
  timeZone: string;
  effectiveDate: string;
  state: unknown;          // validated with passthrough schemas
  integrity: {
    algorithm: "SHA-256";
    canonicalSignature: string;
    canonicalBytes: number;
  };
}
```

The integrity signature protects transport and verification; it is not an
authentication claim. Import prepares legacy raw-state and wrapped forms
without modifying the selected file.

Round-trip invariant:

```text
normalize(restore(export(state))) === normalize(state)
```

Normalization removes volatile export/save/transaction metadata only. It
retains unknown durable fields and meaningful timestamps.

## Life Update

Required top-level areas:

- application/export/time/range metadata and a concise analysis prompt;
- logged day count and evidence integrity;
- averages and weighted category scores;
- completion rates;
- body/recovery, weekday, capability and forecast display profiles;
- next best action and automatic outcome learning;
- career, learning, money, faith, fatherhood, social/presence and pattern
  summaries;
- mood timeline;
- daily forecast and move projections;
- recent reflection, sanitized day projections and daily snapshots; and
- a compact Work-to-Career proof summary.

The deep Level 5 and Phase 17 bodies remain separate to keep mobile Life Update
generation reliable.

Private inclusion must be visible in metadata. Turning it off strips private
fields from both day and pattern projections rather than merely hiding them in
the UI.

## Level 5 and maturity truth

The deep review distinguishes:

1. product capability built;
2. feature adoption/use;
3. personal evidence/outcome.

It includes confidence/evidence counts and never upgrades one dimension from
another. Patch-era sections for feedback constraints, personal optimization,
capacity, Work Wins and maturity truth are first-class versioned sections, not
runtime monkey-patch appendices in the successor.

## Work Win packet

Sanitized records:

- exclude private context;
- replace marked-sensitive evidence locations with an omission marker;
- contain no screenshots, image bytes or base64 data;
- retain technology tags, result/effect, explainability, proof mappings,
  editable drafts and open review types; and
- say that drafts require verification.

The full-metadata option is explicit and remains local. Both modes enforce a
bounded record size.

## Export filenames

Filenames contain an export-family slug and local timestamp/date. The scheduled
latest backup uses a stable “latest” filename; manual backups are timestamped.
Filenames contain no user-entered name, note, employer, contact, or private
event text.

## Failure and cancellation

- A failure leaves canonical state untouched.
- Controls re-enable and progress reaches a terminal error state.
- The error describes the family and operation without embedding private
  content.
- Where supported, cancellation aborts generation/download only.
- A failed export never triggers reset or an empty-state save.

## Phase 8 parity tests

- frozen-state snapshots for every family and range;
- private-off/private-on projections;
- Full Backup unknown-field round trip;
- canonical signature stability;
- actual-night boundary assignment;
- predicted vs observed action fields;
- maturity-dimension separation;
- Work Win sanitized/full diff and binary rejection;
- large synthetic dataset progress/yield behavior;
- mobile download filename/type;
- error/cancel cleanup; and
- no personal fixture value in source, bundle, snapshots, or reports.
