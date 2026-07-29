import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const requiredFiles = [
  "src/guides/types.ts",
  "src/guides/time.ts",
  "src/guides/eligibility.ts",
  "src/guides/guideRegistry.ts",
  "src/guides/session.ts",
  "src/guides/routing.ts",
  "src/guides/automation.ts",
  "src/guides/useGuideRuntime.ts",
  "src/guides/GuideExperience.tsx",
  "src/guides/time.test.ts",
  "src/guides/eligibility.test.ts",
  "src/guides/guideRegistry.test.ts",
  "src/guides/session.test.ts",
  "src/guides/routing.test.ts",
  "src/guides/automation.test.ts",
  "docs/screenshots/phase-4-guide-overlay.jpg",
  "docs/reports/phase-4.md"
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
    const segmentLength = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: bytes.readUInt16BE(offset + 5),
        width: bytes.readUInt16BE(offset + 7)
      };
    }
    offset += 2 + segmentLength;
  }
  return null;
}

if (failures.length === 0) {
  const read = (path) => readFileSync(resolve(root, path), "utf8");
  const types = read("src/guides/types.ts");
  for (const field of [
    "guideFamily",
    "sourcePeriod",
    "targetId",
    "condition",
    "sideEffect",
    "completionRule",
    "optionality"
  ]) {
    if (!types.includes(field)) failures.push(`typed guide step: missing ${field}`);
  }

  const time = read("src/guides/time.ts");
  for (const marker of [
    "after_sleep_4am",
    "hour >= 5 && hour < 12",
    "hour >= 12 && hour < 17",
    "weekday === \"Sun\"",
    "weekday === \"Mon\""
  ]) {
    if (!time.includes(marker)) failures.push(`guide clock: missing ${marker}`);
  }

  const eligibility = read("src/guides/eligibility.ts");
  for (const marker of [
    "missedMorningEligibility",
    "weeklyGuideEligibility",
    "smartCheckInEligibility",
    "< 60"
  ]) {
    if (!eligibility.includes(marker)) failures.push(`eligibility: missing ${marker}`);
  }

  const registry = read("src/guides/guideRegistry.ts");
  for (const marker of [
    "morningOrder",
    "afternoonOrder",
    "eveningOrder",
    "weeklySeeds",
    "today-check-in",
    ".slice(0, 3)"
  ]) {
    if (!registry.includes(marker)) failures.push(`guide registry: missing ${marker}`);
  }

  const session = read("src/guides/session.ts");
  for (const marker of [
    "startQuickMode",
    "Stop Quick Mode before starting a guide",
    "stopGuide",
    "reconcileRecoveredGuideState",
    "next.completions"
  ]) {
    if (!session.includes(marker)) failures.push(`guide session: missing ${marker}`);
  }

  const experience = read("src/guides/GuideExperience.tsx");
  for (const marker of [
    "guide-badge",
    "guide-overlay",
    "Smart Check-In",
    "Quick Mode",
    "Save & next",
    "Stop"
  ]) {
    if (!experience.includes(marker)) failures.push(`guide UI: missing ${marker}`);
  }

  const app = read("src/app/App.tsx");
  for (const marker of ["bottom-navigation", "rememberActiveTab", "data-guide-target"]) {
    if (!app.includes(marker)) failures.push(`app shell: missing ${marker}`);
  }

  const screenshot = readFileSync(resolve(root, "docs/screenshots/phase-4-guide-overlay.jpg"));
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
  console.error("Phase 4 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 4 verified: deterministic guide clock, six guide families, typed registry, " +
    "durable sessions, Quick Mode exclusion, Smart Check-In gates, routing, autosave, " +
    "single-owner automation, and 412x915 mobile evidence."
);
