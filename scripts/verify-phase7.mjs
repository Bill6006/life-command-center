import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const screenshotFiles = [
  "phase-7-health.jpg",
  "phase-7-pattern.jpg",
  "phase-7-therapy.jpg",
  "phase-7-azure.jpg",
  "phase-7-father.jpg",
  "phase-7-faith.jpg",
  "phase-7-money.jpg",
  "phase-7-social.jpg",
  "phase-7-week.jpg",
  "phase-7-vision.jpg",
  "phase-7-environment.jpg",
  "phase-7-work-wins.jpg"
];
const requiredFiles = [
  "src/features/domains/types.ts",
  "src/features/domains/definitions.ts",
  "src/features/domains/state.ts",
  "src/features/domains/intelligence.ts",
  "src/features/domains/DomainScreen.tsx",
  "src/features/domains/state.test.ts",
  "src/features/domains/intelligence.test.ts",
  "docs/reports/phase-7.md",
  ...screenshotFiles.map((file) => `docs/screenshots/${file}`)
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

requireMarkers("src/features/domains/definitions.ts", [
  "Health and recovery",
  "Pattern lab",
  "Azure and learning",
  "Fatherhood and child growth",
  "Faith and meaning",
  "Money",
  "Social and presence",
  "Week",
  "Vision",
  "Environment",
  "Fitbod owns exercises and equipment",
  "No dating shame",
  "No real amount, account, or financial fixture"
]);
requireMarkers("src/features/domains/state.ts", [
  '"unknown"',
  '"explicit-false"',
  "domainCheckIns",
  "workWins",
  "sanitizedWorkWin",
  "sevenDayMovementRates"
]);
requireMarkers("src/features/domains/intelligence.ts", [
  "buildIntelligenceProjection",
  "resolveWeeklyFocus",
  "weeklyFocusRecords",
  "effectiveEvidenceDays"
]);
requireMarkers("src/features/domains/DomainScreen.tsx", [
  "Existing intelligence layer",
  "Weekly Growth Focus",
  "Work Wins",
  "Mark details sensitive",
  "EnvironmentPanel",
  "GuideTarget"
]);
requireMarkers("src/styles.css", [
  ".domain-screen",
  ".domain-field-grid",
  ".work-wins-panel",
  ".weekly-focus-card",
  "min-width: 0",
  "overflow-wrap: anywhere",
  "@media (max-width: 680px)",
  "@media (max-width: 280px)"
]);

function jpegDimensions(bytes) {
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = bytes[offset + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7)
      };
    }
    offset += 2 + length;
  }
  return null;
}

for (const file of screenshotFiles) {
  const path = resolve(root, "docs", "screenshots", file);
  if (!existsSync(path)) continue;
  const bytes = readFileSync(path);
  if (bytes.subarray(0, 3).toString("hex") !== "ffd8ff") {
    failures.push(`${file}: invalid JPEG signature`);
    continue;
  }
  const dimensions = jpegDimensions(bytes);
  if (dimensions?.width !== 397 || dimensions?.height !== 882) {
    failures.push(
      `${file}: expected 397x882 browser bitmap from a 412x915 logical viewport, found ${
        dimensions?.width ?? "?"
      }x${
        dimensions?.height ?? "?"
      }`
    );
  }
}

if (failures.length > 0) {
  console.error("Phase 7 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 7 verified: authoritative domain navigation, blank source-qualified state, " +
    "shared forecast/capacity/Weekly Focus integration, Work Win privacy, storage-safe " +
    "reload behavior, Fitbod boundary, and twelve deployed mobile screenshots captured " +
    "from a 412x915 logical viewport."
);
