# Synthetic Fixture and Parity Plan

All committed fixtures are fabricated. They must not be copied, transformed,
hashed as data, or statistically derived from the authoritative source’s
embedded seed, the user’s browser storage, backups, exports, notes, screenshots,
resume, finances, family details, or contact information.

## Fixture factory

Build typed factories with deterministic IDs and a frozen application clock:

```text
makeBlankState()
makeDay(overrides)
makeState({ days, domains, settings, extensions })
makeForecastAction(overrides)
makeWorkWin(overrides)
makeBackup({ schemaVersion, state, unknownExtensions })
```

Use conspicuously synthetic labels such as `Example User`, `Sample Child`,
`Example Skill`, and `Example Organization`. Use reserved example domains if an
email-shaped value is ever required. Prefer no contact data at all.

Financial values, dates, notes and histories are round numbers or generated
patterns with no relation to real values.

## Core fixture catalog

| Fixture | Required properties | Primary use |
| --- | --- | --- |
| `blank-first-run` | Empty safe defaults, no seed facts | boot, privacy, shell |
| `one-explicit-day` | Logged true and explicit false values | evidence truth |
| `unknown-heavy-day` | Most fields absent | no false failure / provisional capacity |
| `qualified-week` | Seven fabricated days over 80% completeness | trends and scoring |
| `partial-week` | Mixed 50–79% and limited days | evidence weighting |
| `night-boundary` | Records around 04:00/05:00 and tonight intent | effective day and actual-night mapping |
| `period-boundaries` | One case at every inclusive/exclusive guide/forecast time | guide and time gates |
| `low-capacity` | Very-low state and high recovery risk | Protect priority / lane limits |
| `high-capacity` | Fully known high state, low risk | optional stretch |
| `saturday` | High future candidate plus recovery/connection alternatives | Saturday suppression |
| `feedback-constraint` | Active, expired and undone “Can’t now” reasons | Phase 66A behavior |
| `context-fit` | Place/time/privacy/food/schedule variations | Phase 66B behavior |
| `comparable-history` | Explicit/inferred/unknown features and effect checks over age bands | Phase 67A optimization |
| `weekly-focus` | User choice, auto suggestion and carry-forward | Phase 67B behavior |
| `work-win` | Mapped/unmapped, missing result, private note, sensitive location, oversized binary marker | Phase 67C privacy and mapping |
| `maturity-truth` | Built/not used/evidence absent and inverse combinations | Phase 67D anti-conflation |
| `movement-boundary` | Readiness keys, ladder aliases, retired move IDs, legacy equipment fields | Phase 70K boundary |
| `large-history` | At least 365 generated days and many actions | performance, export, merge |

## Migration fixtures

Create one minimal JSON fixture for each distinct historical schema shape
recognized by the migration registry, plus:

- raw legacy state without an envelope;
- current wrapped Full Backup;
- missing optional namespaces;
- old child-growth namespace;
- old equipment/exact-workout passthrough fields;
- legacy movement snack alias;
- patch stores introduced after the base schema;
- unknown root/domain/day/action extensions;
- malformed-but-recoverable numeric/string fields;
- invalid unrecoverable envelope; and
- pending verified-import records at each transaction stage.

Migration assertions:

1. expected fields are added;
2. meaningful fields are not deleted;
3. unknown extensions survive;
4. migration is idempotent;
5. source fixture is not mutated; and
6. no fixture contains a denylisted personal signature.

## Golden parity harness

The original monolith remains outside the repository. A local-only adapter may
run its pure/isolated behavior against the same synthetic fixtures and emit
normalized golden results. Only reviewed, privacy-scanned synthetic inputs and
normalized expected outputs may enter source control.

Comparison categories:

- migrations and normalized state;
- day evidence integrity and eight-category score;
- guide eligibility and ordered step IDs;
- forecast context, score/band, bottleneck and reasons;
- candidate eligibility/ranking and stable tie-break;
- action lifecycle and constraint learning;
- comparable-history and predicted/observed lift;
- capacity, lanes, weekly focus and Minimum Wins;
- export projections and signatures; and
- storage merge/candidate-selection decisions.

Golden files include a contract version and fixture seed. Volatile timestamps,
transaction IDs, byte-order-only object differences and download filenames are
normalized explicitly; meaningful timestamps and array order are not.

## Acceptance-suite cases

| Legacy suite | Synthetic successor coverage |
| --- | --- |
| Phase 16 | UI safety, export responsiveness, mature feature structure |
| Phase 17 | Scenario runner and tuning report |
| Phase 65A | unknown, explicit false, logged, inferred, qualified and limited evidence |
| Phase 65B | guide period, forecast window, effective date and actual-night truth |
| Phase 66A | constraint creation, block, expiration, management, undo, no false outcome penalty |
| Phase 66B | place/time/privacy/food/schedule context and answer expiration |
| Phase 67A | source/recency weighting, three-feature minimum, eight-record limit, lift and uncertainty |
| Phase 67B | focus control, provisional capacity, lane use, urgent Protect, Saturday |
| Phase 67C | mappings, incomplete drafts, upward-only skill history, sanitization, bounded no-binary storage |
| Phase 67D | capability/adoption/evidence independence and neutral language |
| Phase 68 | fresh, migration, time, command, feedback, career, truth, regression, mobile structure, tuning, performance |
| Phase 70K | four readiness keys, movement ladder, retired duplicates, Fitbod ownership, equipment passthrough |

## Storage fault fixtures

Use injectable adapters to simulate:

- primary missing/corrupt/stale/newer;
- IndexedDB missing/corrupt/stale/newer;
- last-good newer only in one domain;
- day cache newer only for one date;
- large history shrink;
- an older guide completion;
- primary write failure;
- IndexedDB transaction abort;
- read-back signature mismatch;
- reload before pending verification;
- rollback write/read failure; and
- cross-tab update during normal save or import.

Each scenario asserts visible error/recovery status and proves no silent empty
state save.

## UI and accessibility fixtures

Story/test states include:

- narrow Android viewport and wide desktop;
- reduced motion, high text zoom and keyboard-only;
- long synthetic labels and notes;
- empty/loading/recovery/error states;
- installable and local-file warning states;
- guide overlays at first/middle/final steps; and
- export/import progress and failure states.

Screenshots may contain synthetic data only. The privacy scan runs before a
snapshot can be committed.

## Privacy enforcement

Fixture CI performs:

1. repository privacy scan;
2. schema validation;
3. no binary/base64 attachment scan;
4. no forbidden legacy source/backup filename scan;
5. entropy/credential-pattern scan;
6. generated-bundle scan; and
7. snapshot/report scan.

A privacy failure blocks the build. Updating a golden output never bypasses the
denylist.
