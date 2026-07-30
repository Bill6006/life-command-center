# Phase 8 Report — Data, Exports, Diagnostics, and Acceptance

## Result

Phase 8 implementation is complete and awaiting the public deployment evidence
pass. The Data tab now exposes the existing local-first storage and verified
restore contracts, versioned analytical projections, privacy-separated career
proof packets, and explicitly on-demand diagnostics. No application data is
uploaded by these features.

## Storage and recovery

- Automatic recovery snapshots default to every 30 minutes and can be disabled
  locally.
- Manual recovery snapshots write and verify the stable latest-backup key in
  local storage and IndexedDB.
- Full Backup uses the existing signed, versioned envelope and preserves unknown
  durable fields for exact round trips.
- Import prepares and migrates a file before Replace, Merge, or Cancel is
  offered. Replace and Merge reuse the dual-write, read-back, reload-verification,
  and exact rollback coordinator from Phase 3.
- Boot checks for a pending restore marker before ordinary recovery. With no
  marker, persisted storage is captured synchronously so Today initialization
  cannot overwrite a saved guide or workspace.

## On-demand exports

- Life Update supports 7, 30, and all logged-day ranges.
- Private Pattern values are excluded unless the local include-private control
  is explicitly enabled.
- Unknown durable extensions remain exclusive to Full Backup.
- Level 5 keeps capability, adoption, and personal outcome evidence separate.
- Phase 17 contains grouped acceptance and tuning evidence without raw personal
  records.
- Work Win packets offer sanitized JSON, sanitized text, and an explicitly
  warned full-metadata JSON mode. Sanitized modes omit private issue context and
  marked-sensitive result text.
- Filenames contain only the product, export kind, and effective date.

## Diagnostics and truth

Phase 68 runs only after the visible Data-screen button is pressed. It reports
fresh, migration, time, command, feedback, career, truth, regression, mobile,
tuning, and performance groups. Automated success without external mobile and
deployment evidence is YELLOW; in-app automation can never claim GREEN alone.

Capability readiness, observed adoption, and qualified personal outcome
evidence use the existing maturity truth function and remain independent.

## Automated evidence

- 163 tests pass across 32 files.
- Exact export ranges, JSON parsing, private Pattern consent, Work Win
  sanitized/full differences, safe filenames, Full Backup signature round trip,
  grouped Phase 68 truth, on-demand UI behavior, and persisted guide boot order
  have regression coverage.
- Strict TypeScript, production PWA build, all inherited verifiers, the Phase 8
  verifier, and complete privacy gates are required before deployment.

## Deployment evidence

Pending the first Phase 8 code deployment. This section will be replaced with
the confirmed Actions runs, permanent live URL, Android screenshot, route/asset
checks, and width/zoom results before the phase is closed.
