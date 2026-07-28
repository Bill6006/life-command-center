# Privacy Gate

This repository starts private and remains private unless the owner explicitly
approves a visibility change after the final privacy audit.

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
public assets, screenshots, JSON, and built output when present. It checks:

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

## Local-first contract

The production app will not include analytics, telemetry, crash reporting,
advertising, remote logging, cloud sync, or third-party user-data collection.
User state stays in the browser and exports are generated only on demand.
