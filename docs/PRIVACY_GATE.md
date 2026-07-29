# Privacy Gate

The replacement `Bill6006/life-command-center` repository started private on
2026-07-29. It was recreated only after a complete external recovery package
and clean reachable-history bundle were independently verified.

The predecessor repository was then deleted. GitHub still serves an
unreachable pre-rewrite commit and patch from that deleted namespace. The
replacement repository must remain private pending a GitHub-side purge and
unauthenticated 404 confirmation.

## Protected boundary

The following content must never be committed:

- the supplied monolithic behavioral source
- real backup, restore, Life Update, Level 5, or Work Win export files
- real user history, notes, profile details, family identifiers, financial
  values, resume content, contact details, or private-pattern entries
- screenshots containing real user data
- authenticated browser state, secrets, tokens, or environment files

Synthetic fixtures must use invented people, dates, balances, notes, and
history. Fresh-install defaults must remain neutral and blank.

## Automated gate

`node scripts/privacy-scan.mjs` scans tracked source, documentation, fixtures,
public assets, screenshots, JSON, and built output when present.
`node scripts/public-release-audit.mjs` additionally scans every reachable
commit and blob, commit identity metadata, the complete current publishable
working tree, and the generated build. Together they check:

- hashed signatures of known legacy identifiers and distinctive copied values
- high-confidence email and phone patterns
- private keys and common credential assignments
- non-blank embedded personal-profile seed fields
- forbidden backup/export filename patterns
- accidental tracking of the legacy source directory

The denylist contains one-way hashes only. It does not contain the protected
values themselves.

## Deployment gate

Deployment remains disabled until all of the following are true:

1. The legacy monolith is untracked.
2. No real backup or export is tracked.
3. The production bundle contains no protected value.
4. Privacy scanning passes against both repository and build output.
5. Fixtures have been manually confirmed synthetic.
6. The deleted predecessor commit and patch URLs return 404 unauthenticated.
7. Public visibility, if required, has explicit owner approval.

If private GitHub Pages is unavailable, CI artifacts remain the preview
mechanism. No public fallback is automatic.

The replacement repository-owned portion of the gate passed locally on
2026-07-29. The complete audit, including the predecessor's historical Actions
logs and artifacts plus manual screenshot review, is recorded in
[`reports/public-release-privacy-audit.md`](reports/public-release-privacy-audit.md).
GitHub Pages is configured to deploy only through the audited Actions workflow
and only while repository visibility is public. Public release remains blocked
until GitHub no longer serves either retained pre-rewrite URL from the deleted
predecessor namespace.

## Local-first contract

The production app will not include analytics, telemetry, crash reporting,
advertising, remote logging, cloud sync, or third-party user-data collection.
User state stays in the browser and exports are generated only on demand.
