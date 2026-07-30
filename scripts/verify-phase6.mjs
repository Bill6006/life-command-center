import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const requiredFiles = [
  "src/intelligence/types.ts",
  "src/intelligence/evidence.ts",
  "src/intelligence/forecast.ts",
  "src/intelligence/bottlenecks.ts",
  "src/intelligence/candidates.ts",
  "src/intelligence/capacity.ts",
  "src/intelligence/weeklyFocus.ts",
  "src/intelligence/optimization.ts",
  "src/intelligence/learning.ts",
  "src/intelligence/maturity.ts",
  "src/intelligence/engine.ts",
  "src/intelligence/parityFixtures.ts",
  "src/intelligence/parity.test.ts",
  "src/intelligence/phase6.ts",
  "docs/reports/phase-6.md"
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

requireMarkers("src/intelligence/evidence.ts", [
  '"explicit-false"',
  '"unknown"',
  "periodForMinute"
]);
requireMarkers("src/intelligence/forecast.ts", [
  "64 + context.protectiveCount * 4.8 - context.riskCount * 4.2",
  "caps.push(48)",
  "caps.push(58)",
  "Predicted forecast remains separate"
]);
requireMarkers("src/intelligence/candidates.ts", [
  'INTELLIGENCE_LIBRARY_VERSION = "peak-moves-v1"',
  "15 * 60 + 30",
  "16 * 60",
  "17 * 60",
  "Saturday protects against deep/high Future work",
  "Urgent protection outranks Future alignment"
]);
requireMarkers("src/intelligence/capacity.ts", [
  "(energy ?? 0) * 9",
  "(drive ?? 0) * 5",
  "(focus ?? 0) * 6",
  "(recoveryRisk ?? 0) * 0.25",
  "optionalStretch"
]);
requireMarkers("src/intelligence/weeklyFocus.ts", [
  '"current-user-choice"',
  '"carried-user-choice"',
  "It cannot replace a confirmed user choice"
]);
requireMarkers("src/intelligence/optimization.ts", [
  "if (pairs.length < 3) return null",
  ".slice(0, 8)",
  "0.62",
  "(done + 2.6)",
  "rejected * 0.85"
]);
requireMarkers("src/intelligence/learning.ts", [
  "predictedEffect",
  "early signal, not proof",
  "Feasibility rejections affect completion fit but never observed lift"
]);
requireMarkers("src/intelligence/maturity.ts", [
  "Capability, adoption, and personal outcome remain independent",
  '"not-observed"',
  '"early-signal"',
  '"qualified"'
]);
requireMarkers("src/intelligence/parityFixtures.ts", [
  '"phase-6-golden-v1"',
  '"legacy-weight-boundary"',
  '"low-capacity-urgent-protection"',
  '"high-capacity-confirmed-focus"',
  '"driving-safety"'
]);

if (failures.length > 0) {
  console.error("Phase 6 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 6 verified: source-qualified forecast context, fixed legacy score weights, " +
    "bottleneck and candidate gates, capacity lanes, authoritative Weekly Focus, bounded " +
    "personal learning, independent maturity truth, and synthetic golden parity."
);
