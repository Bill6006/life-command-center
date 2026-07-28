# Data Contract

This contract defines the durable and analytical meaning of application state.
It is intentionally value-free: no real seed profile, history, financial
amount, contact detail, employer detail, or private note belongs in source
control.

## Contract principles

1. Blank defaults are safe and first-run state contains no personal facts.
2. Missing, explicitly false, inferred, and observed values are distinct.
3. Unknown object fields are preserved by schemas, migrations, merges, and
   backups.
4. Canonical state is serializable data; DOM nodes, functions, binary images,
   and transient promises are forbidden.
5. Mutations update the narrowest relevant timestamp.
6. Historical records are append-oriented. Recovery cannot silently shrink
   meaningful history.
7. Old compatibility fields may remain passthrough without being active UI.

## Root state

The successor TypeScript model must cover:

| Namespace | Meaning |
| --- | --- |
| `settings` | Time-zone/rollover, active screen/date, guide state, privacy/export choices, backup preferences, feature preferences, feedback/constraint/optimization/capacity stores |
| `days` | Records keyed by effective local date |
| `azure` | Career skills, claims, proof, learning and career-progress state |
| `learning` | Knowledge/review/spaced-practice state |
| `money` | Balances, goals and money rhythm |
| child-growth compatibility domain | Child profile categories, custom skills and weekly review, using neutral internal identifiers in new code |
| `faith` | Progress, subjects/books and practice history |
| `weeklyAnchors` | Weekly direction/rhythm and focus anchors |
| `logs` | Bounded operational/history records where still behaviorally required |
| `_domainUpdatedAt` | Per-global-domain meaningful timestamps |
| `_inputUpdatedAt` | Latest user-input stamp |
| `_savedAt` | Persistence metadata only; never the sole recovery rank |
| `_schemaVersion` | Current migration version |
| compatibility extensions | Backup integrity, Work Wins, feedback constraints, optimization and capacity records |

Legacy private identifiers may be recognized during migration but new
interfaces use neutral names. A migration adapter maps old keys without
serializing the original personal seed.

## Per-day record

Every `days[dateKey]` record may contain:

- evidence metadata: `_logged`, `_rangePeriods`, field/section timestamps;
- core state: energy, mood, sleep and their logged flags;
- daily completions: water, movement/workout, career study, money check,
  fatherhood connection, home reset, social connection, and night reset;
- fatherhood: daily connection, coaching, lesson and observation data;
- money discipline;
- pattern/tonight: sleep, food, caffeine, stressors, symptoms, reading/private
  signals subject to privacy settings;
- faith practice;
- therapy: stress, loneliness, confidence, overwhelm, journal and related
  emotional signals;
- health/body: active load, recovery/readiness, hydration/nutrition, and the
  movement ladder;
- social/presence and environment;
- `dayFood` by morning, afternoon, and evening;
- `morningStart`, Saturday context, recovery and end-of-day review;
- `forecastActions`, `forecastDismissals`, and `minimumWins`;
- `moodTimeline` and `energyTimeline`;
- bounded `privateEvents` metadata;
- `dailySnapshot`; and
- forward-compatible unknown fields.

Old equipment-inventory and exact-workout fields remain read/write passthrough
only for compatibility. They do not drive new UI or candidate selection.

## Evidence model

The typed evidence wrapper must be capable of representing:

| State | Meaning | Counts as negative? |
| --- | --- | --- |
| Unknown | No reliable observation | No |
| Explicit false | User answered “no” | Yes, where the metric defines a negative |
| Logged true/value | User explicitly supplied evidence | According to value |
| Auto-observed | A directly recorded app event establishes the fact | According to event |
| Inferred | Derived from related context | Never at full source weight |
| Trusted/qualified | Meets completeness/source rules | Yes |
| Untrusted/incomplete | Present but below analytical threshold | Not at full weight |

Evidence completeness:

- 80–100 percent: qualified, full analytical weight;
- 50–79 percent: partial, half analytical weight;
- 1–49 percent: limited, excluded from personal learning;
- 0 percent: insufficient.

Source quality is part of the evidence record. Inferred or derived current
features use a `0.62` multiplier in personal optimization; unknown fields are
excluded from similarity rather than filled with a neutral number.

## Day scoring

`scoreDay` produces eight categories, each with a maximum of two points:

1. Energy
2. Career
3. Money
4. Fatherhood
5. Health
6. Social/Love
7. Home Reset
8. Emotional Control

The display may show a score after at least one relevant slot is logged.
Analytics require positive evidence weight. The result includes category
details, total points, percentage, evidence coverage, and qualification. It
must never treat missing evidence as failure.

## Forecast actions

A forecast action record includes, as applicable:

- stable ID, date, period and candidate/move ID;
- text, family/dedupe group, lane, weekly-focus alignment;
- earliest/latest time and contextual prerequisites;
- prediction score, predicted lift range, uncertainty and confidence;
- lifecycle timestamps for start, finish, pause, dismissal and undo;
- “Can’t now” reason and constraint reference;
- before/after observations and effect-check status;
- observed lift only when enough comparable metrics exist; and
- compatibility fields preserved on round trip.

Exploratory rejection is not an outcome failure. Undo must reverse the relevant
lifecycle/coverage effect without deleting unrelated history.

## Minimum Wins

A daily Minimum Wins collection has exactly three entries. Each has a stable
ID, library version, family, lane, tier, reason, source context, and status
evidence.

- `Done` means an explicit user completion.
- `Covered` means a completed same-family action supplied equivalent evidence.
- Undo removes automatic coverage.
- Recovery/abstention pivots are valid outcomes.
- The library version at the legacy boundary is
  `today_win_library_precise_caffeine_sync_v9`.

## Weekly focus and capacity

Weekly focus is keyed by the Monday week key. Store the user-selected focus
separately from an automatic suggestion. User choice carries forward and
remains authoritative.

Capacity records include raw score, evidence-known flags, provisional state,
confidence, Low/Normal/High band, lane allowances, urgent Protect state, and
optional stretch availability. Lack of current evidence cannot produce a false
High band.

## Work Wins

Work Win records contain bounded user-entered text, selected technology tags,
result/effect, evidence metadata, explainability, privacy confirmation, local
editable drafts, mapping suggestions, and review items.

They must:

- store no image bytes or base64 attachments;
- omit private context and sensitive locations from sanitized projections;
- advance existing career stages upward only;
- keep generated resume/proof language labeled as draft; and
- require explicit user confirmation for resume-ready suggestions.

## Validation and schema evolution

Phase 3 schemas use Zod `.passthrough()` at the root, day, domain, action, and
extension boundaries. Validation reports issues; it must not replace a
malformed but recoverable state with empty defaults without a visible recovery
path.

Each migration is:

- version-keyed and ordered;
- pure and deterministic;
- idempotent when applied twice;
- privacy-neutral;
- covered by a fixture; and
- prohibited from deleting unknown fields.

The contract’s canonical comparison strips volatile persistence metadata but
does not strip meaningful user fields.
