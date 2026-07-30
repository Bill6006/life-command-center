# Phase 8 Report — Data, Exports, Diagnostics, and Acceptance

## Result

Phase 8 is complete and deployed. The Data tab now exposes the existing local-first storage and verified
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
  verifier, and complete privacy gates pass.
- The public code release passed
  [Privacy Scan](https://github.com/Bill6006/life-command-center/actions/runs/30505909525),
  [Repository CI](https://github.com/Bill6006/life-command-center/actions/runs/30505909560),
  and [Pages deployment](https://github.com/Bill6006/life-command-center/actions/runs/30505909545)
  on commit
  [`dff446e`](https://github.com/Bill6006/life-command-center/commit/dff446ec76aa13ea9e51e0cfdd99315fa7218d37).

## Deployment evidence

The permanent live URL was opened in a fresh unauthenticated browser and in
Chrome at a 412 × 915 logical CSS viewport. The Phase 8 banner, Data heading,
dormant diagnostic state, and the 11/11 YELLOW acceptance result were confirmed.
The base page, hashed script and stylesheet, manifest, 192/512 icons, service
worker, and Workbox runtime all returned HTTP 200 from
`/life-command-center/`. The manifest retains start URL
`/life-command-center/#/today`, scope `/life-command-center/`, and standalone
display.

Two blank/synthetic screenshots were captured from the deployed build:
[Data and storage](../screenshots/phase-8-data.jpg) and
[on-demand diagnostics](../screenshots/phase-8-diagnostics.jpg). Chrome excludes
its scrollbar and browser inset from the saved page bitmap, so both artifacts
are 397 × 882 while the measured application viewport is 412 × 915.

Phase 8 was checked at the four required base widths and four zoom-equivalent
effective widths:

| Base width | 100% | 115% | 130% | 150% |
| --- | ---: | ---: | ---: | ---: |
| 360 | 360 | 313 | 276 | 240 |
| 375 | 375 | 326 | 288 | 250 |
| 412 | 412 | 358 | 316 | 274 |
| 430 | 430 | 373 | 330 | 286 |

All 16 combinations rendered the Data screen without a fatal shell or
horizontal page, hero, card, restore-review, or diagnostic-result overflow.

## Privacy result

The source/build scan, GitHub Privacy Scan, and complete reachable-history
public-release audit pass. The local audit covered 19 commits, 236 unique
history blobs, 158 current files, 9 build files, and 0 artifact files. Commit
identities use GitHub noreply addresses. The committed screenshots show only
blank or synthetic local state and contain no exported file content.
