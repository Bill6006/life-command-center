# Cutover Checklist

The public application is a final release candidate. The cutover decision is
split between repository-owned evidence and private owner confirmation.

## Repository-owned release gates

- [x] Repository and complete reachable Git history pass the protected-source,
  PII, credentials, environment-file, backup/export, and noreply-identity
  audit.
- [x] The production PWA build passes the same privacy checks.
- [x] Every retained GitHub Actions artifact has been inventoried, downloaded,
  digest-verified, opened, and scanned.
- [x] Privacy Scan, Repository CI, and Pages run only from the permanent public
  repository.
- [x] The permanent URL and repository-subpath PWA assets return HTTP 200.
- [x] Blank/synthetic mobile, zoom, desktop, keyboard, touch, label, contrast,
  and overflow checks pass.
- [x] Signed synthetic backup preparation, Replace, dual-store read-back,
  reload verification, day-count equality, canonical-signature equality, and
  rollback behavior have automated coverage.
- [x] The protected old application remains outside Git as a fallback.

## Owner-only cutover gates

- [ ] Keep two matching private backups from the old application.
- [ ] Complete the real import using
  [the private migration runbook](migration-runbook.md).
- [ ] Confirm the real source and destination day counts match.
- [ ] Confirm a signed source and post-import backup have the same canonical
  signature, or establish and re-verify a new signed baseline for an unsigned
  legacy source.
- [ ] Complete the
  [physical Android checklist](android-test-checklist.md).
- [ ] Retain the old app without additional writes during the observation
  period.
- [ ] Confirm the permanent app has worked in ordinary real-world use.
- [ ] Confirm the private post-cutover backup is stored in the intended
  recovery location.
- [ ] Explicitly authorize retiring the old app only after the observation
  period.

## Decision

Current decision: **YELLOW — automated and public deployment evidence pass;
private real-data and physical-device confirmation is pending.**

GREEN only after explicit owner confirmation of real backup import, matching
day count/signature, physical Android backup/download/restore, and real-world
use. A GitHub issue checkbox, automated diagnostic, or emulator result cannot
substitute for that confirmation.
