# Privacy Gate

This repository started private. The owner approved public visibility on
2026-07-29 after the history-wide release audit passed. A subsequent
unauthenticated check found that GitHub still served an unreachable,
pre-rewrite commit object by direct SHA. The repository was immediately
returned to private visibility pending a GitHub-side purge.

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
6. Public visibility, if required, has explicit owner approval.

If private GitHub Pages is unavailable, CI artifacts remain the preview
mechanism. No public fallback is automatic.

The repository-owned portion of the gate passed on 2026-07-29. The complete
audit, including historical Actions logs and artifacts plus manual screenshot
review, is recorded in
[`reports/public-release-privacy-audit.md`](reports/public-release-privacy-audit.md).
GitHub Pages is configured to deploy only through the audited Actions workflow
and only while repository visibility is public. Public release remains blocked
until GitHub no longer serves the retained pre-rewrite object.

## Local-first contract

The production app will not include analytics, telemetry, crash reporting,
advertising, remote logging, cloud sync, or third-party user-data collection.
User state stays in the browser and exports are generated only on demand.
