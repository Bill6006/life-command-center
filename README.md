# Life Command Center

Privacy-first, local-first modular rebuild of Life Command Center.

The project is being rebuilt from a separately held behavioral reference. The
legacy monolith, real backups, personal exports, and real user history are
deliberately excluded from Git.

- [Project status](PROJECT_STATUS.md)
- [Privacy gate](docs/PRIVACY_GATE.md)
- [Public-release privacy audit](docs/reports/public-release-privacy-audit.md)
- [GitHub Actions](../../actions)
- Expected permanent Pages URL:
  `https://bill6006.github.io/life-command-center/`

The application will remain deterministic and browser-local. It will not add
analytics, telemetry, advertising, cloud sync, or remote user-state logging.

The public application is deployed only through the repository's GitHub Pages
workflow after the full CI, build-output privacy, and reachable-history audit
gates pass. Public deployment is currently blocked because GitHub still serves
an unreachable retained object from the deleted predecessor repository.

## Local development

```sh
npm install
npm run dev
```

The production check is `npm run ci`. It verifies privacy, the legacy contracts,
unit behavior, the TypeScript/Vite PWA build, the 12-tab shell, verified storage,
the deterministic guide engine, mobile evidence, and built-output privacy.

The current shell starts with zero personal records. Import and verified restore
are implemented as a tested storage library; the Data-screen controls arrive in
Phase 8. Do not place a real backup in the repository.

Phase 4 adds browser-local autosave plus Morning, Afternoon, Evening,
missed-Morning, Smart Check-In, and Weekly guide sessions. Guide navigation
never marks evidence complete merely by opening a screen.

Phase 5 adds the evidence-aware Today command layer, exactly three versioned
Minimum Wins, current-context safety, structured temporary constraints, and a
single active move with pause, completion, undo, alternatives, and later effect
checks.
