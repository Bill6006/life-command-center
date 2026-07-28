# Complete Legacy System Map

This map converts the authoritative single-file application into bounded
successor modules. It describes behavior, not permission to copy the monolith.
The exhaustive owner-by-owner evidence is in
[legacy-owner-inventory.md](legacy-owner-inventory.md).

## Runtime composition

The legacy application is a browser-only, local-first system with four tightly
coupled planes:

1. **Presentation:** an HTML shell, ten accumulated style blocks, string-based
   renderers, tab navigation, overlays, sheets, toasts, and mobile layout
   patches.
2. **State:** one mutable root object with per-day records, global domain
   records, settings, timestamps, history, and forward-compatible patch stores.
3. **Intelligence:** deterministic forecast scoring, evidence qualification,
   Minimum Wins, capacity lanes, action ranking, learning, guide automation,
   and capability/adoption/evidence truth.
4. **Durability:** primary local storage, IndexedDB, recovery snapshots,
   per-day caches, verified import, rollback, and JSON/text exports.

The successor must separate these planes while preserving their observable
behavior and compatibility boundaries.

## Tab and screen registry

| Key | Label | Legacy responsibility | Successor boundary |
| --- | --- | --- | --- |
| `today` | Today | Current-state inputs, Today Command, Minimum Wins, active move lifecycle, snapshots, guide entry, work-win entry | `features/today` plus shared guide and intelligence presenters |
| `azure` | Azure | Career skill stages, proof state, claims, Work Wins, review queue, learning context | `features/career` |
| `money` | Money | Funds, debt, utilization, savings goals, daily discipline, rhythm summaries | `features/money` |
| `father` | Father | Daily connection/coaching, tiny lessons, growth categories, weekly review | `features/fatherhood` with neutral child-profile identifiers |
| `faith` | Faith | Reading/subject progress, minimum practice, prayer, preaching, signatures, weekly statistics | `features/faith` |
| `health` | Health | Readiness, active load, recovery, nutrition, hydration, movement ladder, Fitbod boundary | `features/health` |
| `pattern` | Pattern | Sleep, food, caffeine, stressors, energy symptoms, timelines, private-variable analysis | `features/patterns` |
| `social` | Love/Social | Presence, connection, outreach, relationship signals | `features/social` |
| `therapy` | Therapy | Stress, loneliness, confidence, overwhelm, journal and emotional-regulation signals | `features/therapy` |
| `week` | Week | Weekly focus, capacity lanes, anchors, trend summaries, weekly guide/review | `features/week` |
| `vision` | Vision | Long-horizon identity, principles, goals, and direction | `features/vision` |
| `data` | Data | Backup/import, exports, diagnostics, acceptance reports, settings, reset | `features/data` |

The shell also owns date navigation, effective-day rollover, quick mode,
period-aware guide launch, save status, install/PWA affordances, global error
surfaces, and recovery warnings.

## Successor module ownership

| Successor area | Owns | Must not own |
| --- | --- | --- |
| `app` | boot, providers, error boundary, route/tab registry | domain formulas |
| `domain` | pure types, defaults, schemas, migrations, evidence semantics | browser APIs |
| `storage` | adapters, candidate ranking, merge, verification, rollback | UI strings |
| `guides` | step definitions, eligibility, progress, routing effects | tab renderers |
| `intelligence` | context, scoring, candidates, ranking, learning, capacity | direct DOM access |
| `features/*` | screen composition and user mutations | persistence internals |
| `exports` | versioned projections and privacy controls | live mutable state |
| `diagnostics` | deterministic suites and support reports | production mutations |
| `ui` | tokens, controls, sheets, status and accessible primitives | user data rules |

## Behavioral subsystems

### Application clock and navigation

- Use the configured application time zone, not an incidental browser parsing
  default.
- Preserve the effective-day rollover mode and communicate when effective date
  differs from the device-local date.
- Preserve date navigation, active tab, guide-driven navigation, hash
  transaction markers, focus restoration, scroll behavior, and mobile resize /
  orientation handling.
- Quick Mode remains distinct from the full guide and cannot run concurrently
  with one.

### Daily capture and domain inputs

- Core state distinguishes unlogged from an explicit value.
- Per-period ranges and pending slider drafts are committed before save,
  navigation, export, page hide, or unload.
- Domain inputs update their own timestamps and must not silently mark unrelated
  evidence as complete.
- Previous-night and tonight records are assigned by actual night boundary, not
  merely by the displayed calendar card.
- Unknown extension fields survive load, migration, merge, backup, and restore.

### Evidence and scoring

- Evidence states include unknown, explicit false, logged true, auto-observed,
  inferred, trusted/qualified, and untrusted/incomplete.
- Unknown is not failure. Explicit false is meaningful evidence and must remain
  distinct from missing.
- Day evidence completeness is weighted. At least 80 percent is qualified,
  50–79 percent is partial, a nonzero value below 50 percent is limited, and
  zero is insufficient.
- A day score has eight two-point categories: Energy, Career, Money,
  Fatherhood, Health, Social/Love, Home Reset, and Emotional Control.
- Display can begin after one logged slot; analytics require positive evidence
  weight.
- Capability, product adoption, and personal evidence are separate truths. The
  UI must not convert them into a moral or shame score.

### Forecast and action lifecycle

- Forecast context combines current period values, last-night and tonight
  records, sleep, caffeine, food, hydration, recovery, domain profiles,
  timelines, private signals when permitted, constraints, and 3/7/30-day
  trends.
- Deterministic scoring applies confidence floors/caps and labels Green,
  Yellow, or Red.
- Bottlenecks cover body battery, nervous system, mission drift, recovery risk,
  environment friction, connection need, presence/identity, faith/meaning, and
  data confidence.
- Candidate moves are gated by clock window, period, contraindications,
  current context, dedupe group, active dose, feedback constraints, repetition,
  and capacity.
- Only one move is active. Lifecycle states include proposed, started, done,
  paused, tried-another, dismissed, undo, and later effectiveness check.
- Predicted lift and observed lift stay separate.
- “Can’t now” feedback changes constraints without being recorded as an outcome
  failure.
- Exact exercise and equipment prescription is outside the application. The
  app owns readiness and a recovery/micro/starter/planned movement ladder;
  Fitbod owns exact programming.

### Minimum Wins and capacity

- Exactly three whole-day Minimum Wins are selected deterministically.
- The normal shape is body/recovery, future, and relationship, with a support
  substitute when context requires it.
- Manual `Done` and automatic `Covered` are separate, reversible states.
- Same-family completion can cover a win; undo removes that coverage.
- Micro-administration, duplicate “two minute” actions, and score-gaming
  candidates are excluded.
- Capacity is evidence-aware and can be Low, Normal, or High; incomplete current
  evidence produces a provisional Low result.
- Protect, Future, and Connection lane allowances are explicit. Urgent Protect
  needs outrank weekly focus. Weekly focus narrows Future candidates only.
- Saturday suppresses deep/high Future work. Optional High stretch is never
  required.

### Career proof

- A completed relevant technical action may offer an optional Work Win capture.
- The record stores bounded text and metadata only, never screenshot bytes or
  binary attachments.
- Mappings may suggest skill stages and draft proof, STAR, resume, and recall
  text, but the user remains the source of truth.
- Resume-ready advancement requires explicit confirmation and remains labeled
  as a draft until verified.
- Sanitized export is the default; marked-sensitive notes and private context
  are omitted.

### Guides and automation

Morning, afternoon, evening, missed-morning, weekly, and smart check-in
automation are specified in [guide-contract.md](guide-contract.md). The guide
engine owns eligibility and ordered steps; screens own the routed controls.

### Persistence and recovery

The complete layer order, merge rules, anti-rollback constraints, verified
restore transaction, and reset behavior are specified in
[storage-contract.md](storage-contract.md).

### Export and diagnostics

All export families, privacy modes, and compatibility expectations are
specified in [export-contract.md](export-contract.md). Acceptance suites are
treated as executable diagnostics, never as a reason to expose real data.

## Event surface

The source uses 19 event types: `beforeunload`, `blur`, `change`, `click`,
`error`, `focus`, `input`, `keydown`, `orientationchange`, `pagehide`,
`pointerdown`, `pointerup`, `resize`, `scroll`, `storage`, `touchend`,
`unhandledrejection`, and `visibilitychange`.

The successor should consolidate these into React event handlers and a small
set of lifecycle hooks. Global listeners are reserved for durability, viewport,
cross-tab storage, and fatal-error behavior and must have explicit cleanup.

## Acceptance-suite map

| Suite family | Behavioral boundary |
| --- | --- |
| Phase 16 | Speed, UI safety, and mature feature acceptance |
| Phase 17 | Scenario acceptance and tuning report |
| Phase 65A | Evidence truth and unknown/explicit/inferred distinctions |
| Phase 65B | Timeframe and forecast truth |
| Phase 66A | “Can’t now,” constraint learning, management, and undo |
| Phase 66B | Current context, schedule inference, and candidate fit |
| Phase 67A | Personal action optimization, comparable history, lift, uncertainty |
| Phase 67B | Weekly focus, capacity, lane limits, and realistic selection |
| Phase 67C | Work Win privacy, mapping, bounded storage, and drafts |
| Phase 67D | Capability/adoption/evidence maturity truth and anti-shame language |
| Phase 68 | Fresh, migration, time, command, feedback, career, truth, regression, mobile structure, tuning, and performance groups |
| Phase 70K | Final Fitbod boundary, retired duplicates, compatibility, and movement ladder |

Automated failure is Red. Automated pass with incomplete external confirmation
is Yellow. Green additionally requires physical Android confirmation, a GitHub
artifact, and real-world tuning evidence.

## Complete-owner disposition

The generated ledger classifies all 1,904 callable owners as
automation/guide, compatibility/domain, diagnostic/test, export, navigation,
persistence, pure domain logic, rendering, or state mutation. Every row has a
source line, script block, domain, and classification. No callable owner is
unexplained; Phase 2 and later implementation work must link new modules back
to these contracts rather than transcribing legacy functions.
