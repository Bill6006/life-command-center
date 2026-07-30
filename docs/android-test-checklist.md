# Physical Android Test Checklist

Use this checklist on the owner's physical Android device with the permanent
URL. Do not attach screenshots containing real state.

## Public blank/synthetic checks

- [x] Permanent HTTPS URL opens from a fresh unauthenticated browser.
- [x] The repository subpath, all 12 routes, scripts, styles, icons, manifest,
  service worker, and Workbox runtime load without 404 responses.
- [x] Synthetic Android browser testing passes at 360, 375, 412, and 430 CSS
  pixels and at 100%, 115%, 130%, and 150% zoom-equivalent widths.
- [x] No page, card, sheet, dialog, or guide overlay has horizontal overflow.
- [x] Primary touch targets meet the 44-pixel minimum.
- [x] Keyboard skip navigation and the Can't now modal focus lifecycle pass.

## Owner-only physical-device checks

- [ ] Open https://bill6006.github.io/life-command-center/ in current Android
  Chrome without an authenticated GitHub session.
- [ ] Install the PWA and confirm it launches in standalone mode beneath the
  `/life-command-center/` scope.
- [ ] Confirm the Android back action, route changes, text keyboard, select
  controls, date fields, file picker, and bottom navigation behave normally.
- [ ] Rotate portrait to landscape and back without horizontal page, card,
  sheet, or dialog overflow.
- [ ] Verify content is not hidden by the status bar, display cutout, gesture
  area, or bottom safe area.
- [ ] With synthetic state, create and download a Full Backup.
- [ ] Cancel one prepared restore and confirm the current state does not change.
- [ ] Complete one synthetic Replace restore and confirm reload verification,
  day count, and canonical signature.
- [ ] Complete the owner-only real backup procedure in
  [the migration runbook](migration-runbook.md).
- [ ] Close Android Chrome completely, reopen the installed app, and confirm
  the restored day count and representative records remain.
- [ ] After one successful online load, briefly test the installed shell
  offline; reconnect before any backup transfer or update check.
- [ ] Download a post-migration Full Backup and move a second copy to the
  owner's chosen private recovery location.
- [ ] Use the app in ordinary conditions long enough to confirm Today, guides,
  intelligence, domain editing, and backup behavior.

## Result boundary

Automated emulation and screenshots do not satisfy the physical-device items.
Status remains **YELLOW** until the owner explicitly confirms every applicable
owner-only check. GREEN is allowed only after that confirmation.
