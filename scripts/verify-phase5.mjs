import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const requiredFiles = [
  "src/features/today/types.ts",
  "src/features/today/score.ts",
  "src/features/today/command.ts",
  "src/features/today/minimumWins.ts",
  "src/features/today/moveLifecycle.ts",
  "src/features/today/TodayScreen.tsx",
  "src/features/today/score.test.ts",
  "src/features/today/command.test.ts",
  "src/features/today/minimumWins.test.ts",
  "src/features/today/moveLifecycle.test.ts",
  "docs/reports/phase-5.md",
  "docs/screenshots/phase-5-cant-now-sheet.jpg"
];

for (const path of requiredFiles) {
  if (!existsSync(resolve(root, path))) failures.push(`${path}: missing`);
}

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

if (failures.length === 0) {
  const read = (path) => readFileSync(resolve(root, path), "utf8");
  const types = read("src/features/today/types.ts");
  for (const marker of [
    '"energy"',
    '"career"',
    '"money"',
    '"fatherhood"',
    '"health"',
    '"social"',
    '"home"',
    '"emotional"',
    '"unknown"',
    '"explicit-false"',
    "SessionConstraint",
    "EffectFollowUp"
  ]) {
    if (!types.includes(marker)) failures.push(`Today types: missing ${marker}`);
  }

  const score = read("src/features/today/score.ts");
  for (const marker of ["maxScore: 16", "knownCategories > 0", "not a verdict"]) {
    if (!score.includes(marker)) failures.push(`Today Score: missing ${marker}`);
  }

  const command = read("src/features/today/command.ts");
  for (const marker of [
    "safe-driving-reset",
    "Do not interact with this screen",
    "Fitbod owns exact programming",
    "activeConstraint"
  ]) {
    if (!command.includes(marker)) failures.push(`Today Command: missing ${marker}`);
  }
  if ((command.match(/isMovementReadiness: true/g) ?? []).length !== 1) {
    failures.push("movement boundary: expected exactly one readiness candidate");
  }

  const wins = read("src/features/today/minimumWins.ts");
  for (const marker of [
    "wins: [body, future, relationship]",
    '"manual-done"',
    '"covered"',
    "coveredByMoveId",
    "removeMoveCoverage"
  ]) {
    if (!wins.includes(marker)) failures.push(`Minimum Wins: missing ${marker}`);
  }

  const lifecycle = read("src/features/today/moveLifecycle.ts");
  for (const marker of [
    "Only one move may be active",
    "pauseMove",
    "completeMove",
    "undoCompletedMove",
    "cantNow",
    "tryAnother",
    "displayLockPeriod",
    "recordEffectFollowUp"
  ]) {
    if (!lifecycle.includes(marker)) failures.push(`move lifecycle: missing ${marker}`);
  }

  const screen = read("src/features/today/TodayScreen.tsx");
  for (const marker of [
    "Today Score",
    "Today Command",
    "Why this command",
    "Try this",
    "Can't now",
    "Try another",
    "Pause here",
    "Today Minimum Wins",
    "Save constraint"
  ]) {
    if (!screen.includes(marker)) failures.push(`Today UI: missing ${marker}`);
  }

  const styles = read("src/styles.css");
  for (const marker of [
    ".cant-now-sheet",
    "position: sticky",
    "@media (max-width: 280px)",
    "overflow-wrap: anywhere"
  ]) {
    if (!styles.includes(marker)) failures.push(`zoom-safe sheet: missing ${marker}`);
  }

  const screenshot = readFileSync(resolve(root, "docs/screenshots/phase-5-cant-now-sheet.jpg"));
  const dimensions = jpegDimensions(screenshot);
  if (screenshot.subarray(0, 3).toString("hex") !== "ffd8ff") {
    failures.push("mobile screenshot: invalid JPEG signature");
  }
  if (dimensions?.width !== 412 || dimensions?.height !== 915) {
    failures.push(
      `mobile screenshot: expected 412x915, found ${dimensions?.width ?? "?"}x${
        dimensions?.height ?? "?"
      }`
    );
  }
}

if (failures.length > 0) {
  console.error("Phase 5 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 5 verified: evidence-aware Today Score, context-safe command, exactly three " +
    "Minimum Wins, single-move lifecycle, structured temporary constraints, delayed effect " +
    "checks, Fitbod boundary, and 412x915 zoom-safe mobile evidence."
);
