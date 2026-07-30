# Private Migration Runbook

This runbook moves an existing Life Command Center backup into the permanent
application at https://bill6006.github.io/life-command-center/ without sending
the file or its contents to GitHub, Codex, an issue, a screenshot, or another
service.

## Non-negotiable privacy boundary

- Perform the real migration only in the owner's browser.
- Do not upload, attach, paste, commit, or share the backup, its private fields,
  its local SHA-256 value, or its canonical signature.
- Keep the protected old application available and unchanged until the final
  owner confirmation.
- Use blank or synthetic files for support, screenshots, and defect reports.
- Stop before Replace or Merge if the selected file, source application, or
  intended mode is uncertain.

## Backup types

The Data screen accepts two compatibility classes:

1. A signed `Full Backup` envelope. Preparation must say **Full Backup
   signature verified** before Replace or Merge is offered.
2. A readable legacy raw-state file. Preparation identifies it as a readable
   legacy state without a Full Backup signature. This is supported for
   migration, but no source-signature match may be claimed. After a successful
   import, create a new signed Full Backup locally and use that as the new
   recovery baseline.

An integrity error, invalid JSON error, missing restore confirmation, or
unexpected source schema is a stop condition. Do not edit a signed file to make
it pass.

## Private preflight

1. In the old application, create two local backup copies and keep both outside
   every Git working tree.
2. Compute a local SHA-256 for each file and confirm the two files match. Keep
   the digest private.
3. For a signed Full Backup, privately record:
   - `integrity.algorithm`;
   - `integrity.canonicalSignature`;
   - `integrity.canonicalBytes`; and
   - the count of keys in `state.days`.
4. Open the permanent URL in the target Android browser and confirm the address
   begins exactly with `https://bill6006.github.io/life-command-center/`.
5. On **Data**, record the destination's current **Saved days** and **Schema**.
6. If the destination is not blank, create a recovery snapshot and download a
   destination Full Backup before importing anything.
7. Complete a synthetic Replace and rollback rehearsal before using the real
   file.

## Owner-only import

1. Open **Data → Prepare before replacing anything**.
2. Choose the private JSON file from Android local storage.
3. Confirm the displayed filename is the intended local file.
4. For a signed source, require **Full Backup signature verified**. For an
   unsigned legacy source, require the explicit readable-legacy message and
   retain the local source digest.
5. Choose:
   - **Replace** when the old backup is the authoritative workspace for this
     new installation; or
   - **Merge** only when the current destination contains intentional records
     that must be combined with the source.
6. Let the application reload. Do not close it during the reload-verification
   step.
7. Require the readable **Restore verified after reload** notice. A failure
   invokes the protected rollback path and is a stop condition.

## Private verification

1. On **Data**, confirm **Saved days** equals the source day count.
2. Confirm the current schema is `v1-modular-storage`.
3. Visit Today, Week, every domain screen, and Data. Check representative
   historical dates and known records locally without taking personal
   screenshots.
4. Confirm guides, Minimum Wins, active-move history, Work Wins, Weekly Focus,
   capacity, forecast evidence, and private Pattern fields that existed in the
   source are present.
5. Download a new destination Full Backup.
6. Confirm the new file prepares as a signed Full Backup.
7. For a signed source, compare the new
   `integrity.canonicalSignature` and day count with the privately recorded
   source values. `_savedAt` is excluded from this canonical comparison.
8. For an unsigned legacy source, record the new signed signature as the
   baseline, then restore that new backup in a separate fresh browser profile
   and confirm its day count and canonical signature remain unchanged.
9. Close and reopen the installed app, then confirm the same day count and
   representative records again.

Do not mark the migration complete if a day count, signed-source signature,
reload verification, or representative record differs.

## Completion record

Record only pass/fail in the public Phase 10 issue. Keep counts, signatures,
filenames, screenshots, and private observations off GitHub.

The project remains **YELLOW** until the owner explicitly confirms the real
backup import, matching day count/signature, physical Android restore, and
real-world use.
