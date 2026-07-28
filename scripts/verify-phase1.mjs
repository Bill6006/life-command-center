import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const requiredDocuments = [
  "docs/legacy-source-fingerprint.md",
  "docs/legacy-system-map.md",
  "docs/legacy-owner-inventory.md",
  "docs/feature-parity-matrix.md",
  "docs/data-contract.md",
  "docs/storage-contract.md",
  "docs/guide-contract.md",
  "docs/intelligence-contract.md",
  "docs/export-contract.md",
  "docs/synthetic-fixture-plan.md",
  "docs/reports/phase-1.md"
];

const failures = [];
const read = (path) => readFileSync(resolve(root, path), "utf8");
const requireText = (path, text, label = text) => {
  if (!read(path).includes(text)) failures.push(`${path}: missing ${label}`);
};

for (const path of requiredDocuments) {
  if (!existsSync(resolve(root, path))) failures.push(`${path}: missing document`);
}

if (failures.length === 0) {
  const fingerprint = read("docs/legacy-source-fingerprint.md");
  for (const value of [
    "8beb34f3389bd9945b2ec860a590820a963f90b434c32b6ad18ef7e173823865",
    "1,395,667 bytes",
    "18,030",
    "1,904",
    "JavaScript parse errors | 0"
  ]) {
    if (!fingerprint.includes(value)) {
      failures.push(`source fingerprint: missing verified value ${value}`);
    }
  }

  const parity = read("docs/feature-parity-matrix.md");
  for (const tab of [
    "Today",
    "Azure",
    "Money",
    "Father",
    "Faith",
    "Health",
    "Pattern",
    "Love/Social",
    "Therapy",
    "Week",
    "Vision",
    "Data"
  ]) {
    if (!parity.includes(`| ${tab} |`)) failures.push(`parity matrix: missing ${tab} tab`);
  }

  const storage = read("docs/storage-contract.md");
  for (const identifier of [
    "tyree_life_command_center_v1",
    "tlcc_persistent_store_v1",
    "_backup_latest",
    "_last_good",
    "_verified_import_pending_v1",
    "pre_import::"
  ]) {
    if (!storage.includes(identifier)) {
      failures.push(`storage contract: missing ${identifier}`);
    }
  }

  const exportsContract = read("docs/export-contract.md");
  for (const family of [
    "Full Backup",
    "Life Update",
    "Pattern Lab",
    "Forecast Moves",
    "Level 5 Review",
    "Phase 17 Acceptance / tuning",
    "Work Win proof packet"
  ]) {
    if (!exportsContract.includes(family)) {
      failures.push(`export contract: missing ${family}`);
    }
  }

  const systemMap = read("docs/legacy-system-map.md");
  for (const suite of [
    "Phase 16",
    "Phase 17",
    "Phase 65A",
    "Phase 65B",
    "Phase 66A",
    "Phase 66B",
    "Phase 67A",
    "Phase 67B",
    "Phase 67C",
    "Phase 67D",
    "Phase 68",
    "Phase 70K"
  ]) {
    if (!systemMap.includes(`| ${suite} |`)) {
      failures.push(`system map: missing ${suite} acceptance suite`);
    }
  }

  const ownerInventory = read("docs/legacy-owner-inventory.md");
  const ownerRows = ownerInventory.match(/^\| S\d+-L\d+-\d+ \|/gm) ?? [];
  if (ownerRows.length !== 1904) {
    failures.push(`owner inventory: expected 1904 rows, found ${ownerRows.length}`);
  }

  requireText("docs/guide-contract.md", "Smart check-in");
  requireText("docs/intelligence-contract.md", "Minimum Wins");
  requireText("docs/intelligence-contract.md", "Personal optimization");
  requireText("docs/intelligence-contract.md", "Weekly focus and capacity");
  requireText("docs/intelligence-contract.md", "Movement boundary");
}

if (failures.length > 0) {
  console.error("Phase 1 contract verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Phase 1 contracts verified: ${requiredDocuments.length} documents, 12 tabs, ` +
    "all storage/export/smart/acceptance families, and 1,904 callable owners."
);
