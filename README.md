# Life Command Center

Privacy-first, local-first modular rebuild of Life Command Center.

The project is being rebuilt from a separately held behavioral reference. The
legacy monolith, real backups, personal exports, and real user history are
deliberately excluded from Git.

- [Project status](PROJECT_STATUS.md)
- [Privacy gate](docs/PRIVACY_GATE.md)
- [Public-release privacy audit](docs/reports/public-release-privacy-audit.md)
- [Private migration runbook](docs/migration-runbook.md)
- [Physical Android checklist](docs/android-test-checklist.md)
- [Cutover checklist](docs/cutover-checklist.md)
- [Rollback plan](docs/rollback-plan.md)
- [GitHub Actions](../../actions)
- Expected permanent Pages URL:
  `https://bill6006.github.io/life-command-center/`

The application will remain deterministic and browser-local. It will not add
analytics, telemetry, advertising, cloud sync, or remote user-state logging.

The public application is deployed only through the repository's GitHub Pages
workflow after the full CI, build-output privacy, and reachable-history audit
gates pass. The verified permanent URL is
`https://bill6006.github.io/life-command-center/`.

## Local development

```sh
npm install
npm run dev
```

The production check is `npm run ci`. It verifies privacy, the legacy contracts,
unit behavior, the TypeScript/Vite PWA build, the 12-tab shell, verified storage,
the deterministic guide engine, mobile evidence, and built-output privacy.

The current shell starts with zero personal records. The Data screen exposes
signed Full Backup, rollback-safe Replace/Merge/Cancel restore, local recovery
snapshots, sanitized analytical exports, and explicitly on-demand diagnostics.
Do not place a real backup or generated export in the repository.

Phase 4 adds browser-local autosave plus Morning, Afternoon, Evening,
missed-Morning, Smart Check-In, and Weekly guide sessions. Guide navigation
never marks evidence complete merely by opening a screen.

Phase 5 adds the evidence-aware Today command layer, exactly three versioned
Minimum Wins, current-context safety, structured temporary constraints, and a
single active move with pause, completion, undo, alternatives, and later effect
checks.

Phase 6 adds the deterministic Peak Forecast path, evidence-qualified context,
bottleneck and candidate gates, capacity lanes, authoritative Weekly Focus,
bounded personal learning, independent maturity truth, and synthetic golden
parity.

Phase 8 adds 7/30/all Life Update projections, Level 5 and Phase 17 reports,
sanitized or explicitly full Work Win packets, and grouped Phase 68 acceptance.
Automated checks remain YELLOW until separate deployment and mobile verification
is complete.

Phase 9 adds skip navigation, modal focus trapping and Escape close, live status
announcements, consistent focus rings and spacing, 44-pixel primary targets,
safe-area protection, reduced-motion behavior, forced-colors support, and
contrast regression checks without removing application behavior.

Phase 10 adds the final full-history/build/Actions-artifact privacy checkpoint,
private migration runbook, physical Android checklist, cutover decision, and
rollback plan. Repository-owned gates may complete automatically, but final
status remains YELLOW until the owner explicitly confirms real backup import,
matching day count/signature, physical Android restore, and real-world use.
