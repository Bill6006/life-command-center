import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const requiredFiles = [
  "docs/migration-runbook.md",
  "docs/android-test-checklist.md",
  "docs/cutover-checklist.md",
  "docs/rollback-plan.md",
  "docs/reports/phase-10.md",
  "docs/reports/public-release-privacy-audit.md",
  "docs/PRIVACY_GATE.md",
  "src/storage/cutover.test.ts"
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

requireMarkers("docs/migration-runbook.md", [
  "Do not upload",
  "Full Backup signature verified",
  "v1-modular-storage",
  "integrity.canonicalSignature",
  "YELLOW"
]);
requireMarkers("docs/android-test-checklist.md", [
  "physical Android",
  "/life-command-center/",
  "standalone mode",
  "GREEN is allowed only after"
]);
requireMarkers("docs/cutover-checklist.md", [
  "Repository-owned release gates",
  "Owner-only cutover gates",
  "Current decision: **YELLOW",
  "GREEN only after explicit owner confirmation"
]);
requireMarkers("docs/rollback-plan.md", [
  "exact pre-import",
  "Cancel performs no durable write",
  "The permanent URL and repository name must not change",
  "No automated result authorizes deletion"
]);
requireMarkers("docs/reports/phase-10.md", [
  "25 retained Actions archives",
  "264 archive files",
  "real backup was",
  "Issue #11 and the milestone remain open"
]);
requireMarkers(".github/workflows/privacy-scan.yml", [
  "fetch-depth: 0",
  "npm ci",
  "npm run build",
  "npm run privacy:public"
]);
requireMarkers("package.json", [
  '"cutover:verify": "node scripts/verify-phase10.mjs"',
  "npm run cutover:verify"
]);

if (failures.length > 0) {
  console.error("Phase 10 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 10 verified: final privacy/artifact evidence, private migration runbook, " +
    "physical Android checklist, cutover decision, rollback protection, old-app fallback, " +
    "and explicit YELLOW-to-GREEN owner confirmation boundary."
);
