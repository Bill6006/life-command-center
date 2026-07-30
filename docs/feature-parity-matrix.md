# Feature Parity Matrix

Status values are `Contracted`, `Implemented`, `Verified`, or `Deferred by
explicit boundary`. Phase 1 establishes contracts only.

| Surface | Required behavior | Contract source | Phase 1 |
| --- | --- | --- | --- |
| App shell | Time-zone-aware effective date, date navigation, tab registry, save/recovery status, PWA shell, mobile behavior | system map, storage contract | Contracted |
| Today | Core state capture, Today Command, three Minimum Wins, active move, snapshots, guides, Work Win entry | data + intelligence + guide contracts | Contracted |
| Azure | Skill stages, proof/claims, Work Wins, review queue, learning context | data + export contracts | Contracted |
| Money | Funds, balances, utilization, goals, daily discipline, rhythm | data contract | Contracted |
| Father | Connection/coaching, lesson, growth categories, weekly review | data + guide contracts | Contracted |
| Faith | Progress, daily/minimum practice, preaching, weekly statistics | data contract | Contracted |
| Health | Readiness, active load, recovery, food/water, movement ladder | data + intelligence contracts | Contracted |
| Pattern | Sleep, time-aware food, caffeine, stressors, symptoms, timelines, private-mode analysis | data + export contracts | Contracted |
| Love/Social | Presence, connection, outreach and relationship signals | data contract | Contracted |
| Therapy | Stress, loneliness, confidence, overwhelm, journal and regulation signals | data contract | Contracted |
| Week | Weekly focus, capacity lanes, anchors, trends, guide/review | intelligence + guide contracts | Contracted |
| Vision | Identity, principles, long-horizon goals and direction | data contract | Contracted |
| Data | Backup, verified import, exports, diagnostics, settings, reset | storage + export contracts | Contracted |
| Quick Mode | Separate reduced capture flow; disabled during a guide | guide contract | Contracted |
| Morning guide | 05:00–11:59 ordered conditional capture | guide contract | Contracted |
| Afternoon guide | 12:00–16:59 ordered conditional capture | guide contract | Contracted |
| Evening guide | 17:00–04:59 ordered conditional capture and closeout | guide contract | Contracted |
| Missed morning | Offered after morning when still relevant and incomplete | guide contract | Contracted |
| Weekly guide | Sunday evening / Monday morning window; focus and rhythm | guide contract | Contracted |
| Smart check-in | Guide prerequisite, 60-minute unlock/refresh, at most three steps | guide contract | Contracted |
| Evidence integrity | Unknown/false/logged/inferred/trusted distinctions and weighted completeness | data contract | Contracted |
| Day scoring | Eight two-point categories with evidence-aware display/analytics | data contract | Contracted |
| Forecast | Context, score/band, bottleneck, lever, reasons, window | intelligence contract | Contracted |
| Candidate moves | Deterministic library, clock/context/safety gates, ranking and dedupe | intelligence contract | Contracted |
| Action lifecycle | Start, done, pause, alternative, dismiss, undo, later effect check | intelligence contract | Contracted |
| Constraint learning | “Can’t now” reason, blocking, management and undo without false negative outcome | intelligence contract | Contracted |
| Personal optimization | Comparable history, recency/source weights, observed lift, uncertainty | intelligence contract | Contracted |
| Minimum Wins | Exactly three, capacity-aware, manual Done vs automatic Covered | intelligence contract | Contracted |
| Weekly focus | User choice control, auto suggestion, carry-forward, Future-lane narrowing | intelligence contract | Contracted |
| Capacity budget | Low/Normal/High, provisional state, Protect/Future/Connection lanes | intelligence contract | Contracted |
| Work Wins | Privacy-first local capture, upward-only mapping, drafts and review queue | data + export contracts | Contracted |
| Fitbod boundary | App owns readiness/ladder; exact exercise/equipment selection external | intelligence contract | Deferred by explicit boundary |
| Primary storage | Current local storage key compatibility and canonical save | storage contract | Contracted |
| IndexedDB | Compatible database/store, strict verified writes and reads | storage contract | Contracted |
| Recovery snapshots | Latest, last-good, session, critical/domain, pre-import | storage contract | Contracted |
| Day caches | Per-day recovery, content-stamp merge, seven-day pruning | storage contract | Contracted |
| Anti-rollback | Meaningful stamps, shrink guard, trusted baseline merge | storage contract | Contracted |
| Verified restore | Replace/Merge/Cancel, pending marker, dual-write verification, reload, exact rollback | storage contract | Contracted |
| Full Backup | Complete versioned durable state with unknown-field round trip | export contract | Contracted |
| Life Update | 7/30/all analytical projection and optional private pattern fields | export contract | Contracted |
| Pattern export | Forecast context, timelines, food/night mapping, rates and profiles | export contract | Contracted |
| Forecast move export | Lifecycle, prediction/observation and learning summary | export contract | Contracted |
| Level 5 review | Deep capability/adoption/evidence and tuning projection | export contract | Contracted |
| Phase 17 report | Acceptance/tuning diagnostic projection | export contract | Contracted |
| Work Win packet | Sanitized JSON/text default and explicit full metadata JSON | export contract | Contracted |
| Acceptance Phase 16/17 | Legacy mature UI, speed, scenario and tuning checks | system map + fixture plan | Contracted |
| Acceptance Phase 65A/B | Evidence and timeframe truth | system map + fixture plan | Contracted |
| Acceptance Phase 66A/B | Feedback constraints and context fit | system map + fixture plan | Contracted |
| Acceptance Phase 67A–D | Optimization, capacity, proof, maturity truth | system map + fixture plan | Contracted |
| Acceptance Phase 68 | Grouped automation plus external verification decision | system map + fixture plan | Contracted |
| Acceptance Phase 70K | Final movement/Fitbod boundary | system map + fixture plan | Contracted |

Nothing is marked implemented in Phase 1. Later phases must update this matrix
only when behavior has both an implementation and an objective parity test.

## Successor implementation ledger

| Surface | Current status | Evidence |
| --- | --- | --- |
| Repository privacy and monitoring | Verified | Phase 0 issue and CI privacy workflow |
| Legacy map and contracts | Verified | [Phase 1 report](reports/phase-1.md) |
| App shell, 12-tab navigation, PWA, and mobile foundation | Verified | [Phase 2 report](reports/phase-2.md) |
| Storage, recovery, migration, Full Backup, and verified restore | Verified | [Phase 3 report](reports/phase-3.md) |
| Quick Mode, six guide families, routing, automation, and persistence | Verified | [Phase 4 report](reports/phase-4.md) |
| Today Score and current-context command layer | Verified | [Phase 5 report](reports/phase-5.md) |
| Action lifecycle and temporary constraint feedback | Verified | [Phase 5 report](reports/phase-5.md) |
| Exactly three versioned Minimum Wins | Verified | [Phase 5 report](reports/phase-5.md) |
| Fitbod exact-programming boundary | Verified boundary | One readiness-ladder candidate; no exercise prescription |
| Forecast, capacity, Weekly Focus, personal optimization, and maturity truth | Verified | [Phase 6 report](reports/phase-6.md) |
| Domain screens | Verified | [Phase 7 report](reports/phase-7.md) |
| Exports, diagnostics, and final acceptance | Verified | [Phase 8 report](reports/phase-8.md) |
| Visual polish, keyboard access, touch targets, and platform accessibility | Verified | [Phase 9 report](reports/phase-9.md) |
| Final privacy, migration, Android, cutover, rollback, and fallback boundary | Implemented; owner confirmation pending | [Phase 10 report](reports/phase-10.md) |
