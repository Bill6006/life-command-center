# Storage, Recovery, and Verified Restore Contract

The application is local-first. Durability must survive refresh, browser
process loss, interrupted writes, cross-tab activity, schema migration, and a
failed import without silently reverting meaningful history.

## Compatibility identifiers

| Layer | Legacy-compatible identifier |
| --- | --- |
| Primary local storage | `tyree_life_command_center_v1` |
| IndexedDB database | `tlcc_persistent_store_v1` |
| IndexedDB object store | `state` |
| Active record ID | `tlcc_active` |
| State envelope prefix | `TLCC_STATE::` |
| Latest backup suffix | `_backup_latest` |
| Last-good suffix | `_last_good` |
| Pending verified import | `_verified_import_pending_v1` |
| Verified import session | `_verified_import_session_v1` |
| Pre-import prefix | `pre_import::` |
| Current legacy schema boundary | `v289-phase64s-verified-restore-foundation` |

Compatibility aliases such as `backup_latest` and `last_good` are read when
present. All identifiers live in one documented compatibility adapter.

## Layer model

1. **In-memory canonical state**
2. **Primary local storage** for immediate synchronous durability
3. **IndexedDB active state** for independent durable verification
4. **Latest backup** for scheduled/on-demand recovery
5. **Last-good and session snapshots**
6. **Critical/domain recovery records**
7. **Per-day caches**, pruned to a seven-day recovery window
8. **Pre-import exact snapshot**
9. **Pending verified-import marker/session**
10. **Downloaded Full Backup**, outside browser storage

`stateForStorage` omits the embedded legacy seed only. It preserves durable
user state and unknown extension fields.

## Save lifecycle

- A direct user mutation schedules a canonical save after 450 ms unless the
  operation requires immediate durability.
- Focused fields and pending range drafts are committed before a save boundary.
- Primary local storage is written first.
- Secondary writes follow after approximately 200 ms for local-file execution
  or 900 ms for hosted execution.
- Secondary writes update recovery snapshots, day caches, and IndexedDB.
- `pagehide`, `beforeunload`, and hidden `visibilitychange` commit drafts, save,
  and flush best-effort secondary writes.
- A save reports failure visibly. It cannot continue by pretending empty state
  is canonical.
- Scheduled backups default to a 30-minute interval. The stable latest backup
  and timestamped manual download have distinct purposes.

## Startup candidate selection

Boot checks a pending verified restore first. Otherwise it:

1. reads all available primary/recovery candidates;
2. parses and migrates each candidate without mutation;
3. calculates a meaningful-state stamp;
4. ranks candidates by content/input/guide/domain evidence, not `_savedAt`
   alone;
5. selects or merges the strongest non-shrinking candidate;
6. repairs global domains from stronger domain records;
7. repairs per-day content by its day-content stamp; and
8. falls back to blank defaults only when no recoverable candidate exists,
   while showing a visible recovery explanation.

The meaningful stamp includes user input, guide completion, canonical domain
updates, and per-day timestamps.

## Merge rules

### Per-day

- Union date keys.
- Choose/merge each day by its meaningful content stamp.
- Preserve unknown fields.
- Merge action/history collections by stable IDs and meaningful timestamps.
- Do not replace a newer input field with an older saved copy.

### Global domains

Career, money, the legacy child-growth domain, faith, learning, and weekly
anchors use domain-specific timestamps, completeness/meaning scores, and repair
logic. One domain cannot overwrite another because a root `_savedAt` is newer.

### Guides

Guide completion is merged by its own completion timestamp and date/week key.
Stale active-guide state is sanitized. Older recovery state cannot remove a
newer completion.

### Shrink guard

Before accepting a recovery candidate, compare at least:

- day count;
- oldest meaningful date;
- career proof meaning; and
- child-growth progress meaning.

A major unexplained shrink is blocked or merged with the trusted baseline.
Recovery snapshots do not gain authority merely because they were written
later.

## Anti-rollback rule

For every incoming state, compare `_inputUpdatedAt`, day content stamps, guide
completion stamps, and per-domain update stamps with the current trusted state.
When the incoming copy is older in a meaningful area, merge that area from the
trusted state. Volatile `_savedAt` may order equal-content copies but cannot
authorize data loss.

## Verified restore transaction

Restore supports **Replace**, **Merge**, and **Cancel**.

1. Read the selected file and parse its envelope.
2. Validate version/shape and prepare a migrated candidate without changing
   active state.
3. Show a summary and ask for Replace, Merge, or Cancel.
4. On Cancel, perform zero durable writes.
5. Capture an exact pre-import rollback snapshot and signatures.
6. Create a transaction ID and pending marker.
7. For Merge, apply the merge/anti-rollback rules. For Replace, use the
   prepared import while preserving schema-allowed unknown fields.
8. Write canonical local storage, read it back, and compare the canonical
   restore signature.
9. Write IndexedDB in a strictly awaited transaction, read it back, and compare
   the same signature.
10. Only after both stores verify, switch in-memory state and reload with the
    transaction ID in the URL hash.
11. During boot, verify primary, IndexedDB, and memory against the pending
    transaction signature.
12. Mark success and clear pending markers only after reload verification.
13. On any failure, restore the exact pre-import snapshot to both stores,
    verify rollback, clear/annotate the transaction, and show readable error
    details.

“Imported successfully” is forbidden before step 12.

## Canonical signatures

The restore signature is deterministic over meaningful durable state:

- object keys canonicalized;
- volatile transaction/save metadata excluded;
- unknown user fields retained;
- arrays retain semantic order unless a collection contract defines stable-ID
  ordering; and
- no personal content is logged as part of a diagnostic mismatch.

## Cross-tab and interrupted-operation behavior

- A `storage` event triggers candidate comparison, not blind replacement.
- An active verified import has one transaction owner; another tab may warn but
  not interleave writes.
- On startup with a pending marker, complete verification or roll back. Never
  ignore the marker.
- Interrupted backup/export does not modify canonical state.

## Reset

Reset is an explicit destructive user operation:

1. show what will be cleared and recommend a backup;
2. require confirmation;
3. clear primary and compatibility keys;
4. delete the IndexedDB database;
5. clear recovery/day/import layers; and
6. initialize blank safe defaults.

No automated error path may call reset.

## Required Phase 3 tests

- fresh blank boot;
- compatibility-key load;
- every synthetic old-version migration;
- primary newer / IndexedDB older and the inverse;
- conflicting domain timestamps;
- day-cache repair;
- shrink guard;
- focused draft/pagehide flush;
- Replace, Merge, and Cancel;
- interrupted primary or IndexedDB write;
- read-back signature mismatch;
- reload verification;
- exact rollback;
- unknown-field round trip; and
- Full Backup restore equivalence.
