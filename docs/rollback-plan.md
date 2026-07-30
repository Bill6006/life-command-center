# Cutover Rollback Plan

Rollback protects local data without changing repository history, weakening
privacy controls, or deleting the old application.

## Before import

1. Keep the old application and its two matching private backups unchanged.
2. If the destination contains any intended state, create a recovery snapshot
   and download a destination Full Backup.
3. Keep all files outside Git, issues, chat attachments, and shared folders.
4. Use Replace only when the source should become the entire destination.

## Automatic restore protection

Replace and Merge:

1. parse and migrate before offering a destructive choice;
2. preserve an exact pre-import local-storage and IndexedDB session;
3. write the target to both storage layers;
4. read both layers back and compare canonical signatures;
5. leave a pending marker for reload verification; and
6. restore the exact pre-import session if a write, read-back, transaction, or
   reload-verification check fails.

Cancel performs no durable write.

## Manual rollback

If the import result is not acceptable:

1. Stop using the new installation and do not delete either source backup.
2. Return to the unchanged old application for read-only fallback.
3. If the destination had prior intended state, prepare its pre-import Full
   Backup on Data and choose Replace.
4. Require signature verification and the post-reload verification notice.
5. Confirm the destination returns to its pre-import day count and
   representative records.
6. Preserve the failed source file unchanged for private diagnosis; create only
   synthetic reproductions for GitHub.

If a rollback cannot be verified, stop. Do not clear browser storage, uninstall
the PWA, edit the private backup, or retire the old app until a safe recovery
path is established.

## Repository rollback

The deployed repository and the owner's private data are independent. A Pages
release defect may be rolled back by redeploying a previously verified clean
commit, but that does not migrate or erase browser-local state. The permanent URL and repository name must not change.

## Retirement gate

The old app remains the fallback until the owner explicitly confirms:

- real backup import;
- matching day count and signature evidence;
- physical Android backup/download/restore;
- acceptable real-world use; and
- a separate private post-cutover recovery copy.

No automated result authorizes deletion.
