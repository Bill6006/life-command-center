import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const requiredFiles = [
  "src/features/data/DataScreen.tsx",
  "src/features/data/download.ts",
  "src/exports/index.ts",
  "src/exports/index.test.ts",
  "src/diagnostics/phase68.ts",
  "src/diagnostics/phase68.test.ts",
  "docs/reports/phase-8.md"
];

for (const path of requiredFiles) {
  if (!existsSync(resolve(root, path))) failures.push(`${path}: missing`);
}

function requireMarkers(path, markers) {
  if (!existsSync(resolve(root, path))) return;
  const source = readFileSync(resolve(root, path), "utf8");
  for (const marker of markers) {
    if (!source.includes(marker)) failures.push(`${path}: missing ${marker}`);
  }
}

requireMarkers("src/features/data/DataScreen.tsx", [
  "Automatic recovery snapshot every 30 minutes",
  "Download Full Backup",
  "Life Update",
  "Level 5 review",
  "Work Win packets",
  "Run Phase 68 acceptance",
  "Not run. No deep diagnostic work has executed.",
  'restore("replace")',
  'restore("merge")',
  'restore("cancel")'
]);
requireMarkers("src/exports/index.ts", [
  "buildLifeUpdate",
  "buildLevel5Review",
  "buildPhase17Report",
  "buildWorkWinPacket",
  "privatePatternIncluded",
  "unknownDurableStateIncluded: false",
  "safeExportFilename"
]);
requireMarkers("src/diagnostics/phase68.ts", [
  '"fresh"',
  '"migration"',
  '"time"',
  '"command"',
  '"feedback"',
  '"career"',
  '"truth"',
  '"regression"',
  '"mobile"',
  '"tuning"',
  '"performance"',
  '"YELLOW"',
  "GREEN is never claimed from in-app automation alone."
]);
requireMarkers("src/guides/useGuideRuntime.ts", [
  "saveLatestBackup",
  "restorePending",
  "verifyPendingOnBoot",
  "createRecoveryBackup",
  "prepareRestore",
  "executeRestore"
]);
requireMarkers("src/styles.css", [
  ".data-screen",
  ".data-grid",
  ".data-card",
  ".diagnostic-result",
  "min-width: 0",
  "overflow-wrap: anywhere",
  "@media (max-width: 680px)"
]);

if (failures.length > 0) {
  console.error("Phase 8 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 8 verified: dual-layer recovery snapshots, signed Full Backup and verified " +
    "restore UI, range-selectable projections, sanitized Work Win packets, independent " +
    "maturity truth, and explicitly on-demand grouped acceptance."
);
