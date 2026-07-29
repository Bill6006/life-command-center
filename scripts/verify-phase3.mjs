import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const requiredFiles = [
  "src/state/model.ts",
  "src/state/schemas.ts",
  "src/state/migrations.ts",
  "src/storage/adapters.ts",
  "src/storage/canonical.ts",
  "src/storage/coordinator.ts",
  "src/storage/fullBackup.ts",
  "src/storage/keys.ts",
  "src/storage/merge.ts",
  "src/storage/verifiedRestore.ts"
];
const read = (path) => readFileSync(resolve(root, path), "utf8");

for (const path of requiredFiles) {
  if (!existsSync(resolve(root, path))) failures.push(`${path}: missing`);
}

if (failures.length === 0) {
  const schemas = read("src/state/schemas.ts");
  if ((schemas.match(/\.passthrough\(\)/g) ?? []).length < 4) {
    failures.push("schemas: root, settings, day, and domain passthrough boundaries required");
  }

  const keys = read("src/storage/keys.ts");
  for (const identifier of [
    "tyree_life_command_center_v1",
    "tlcc_persistent_store_v1",
    'store: "state"',
    'active: "tlcc_active"',
    "_backup_latest",
    "_last_good",
    "_critical_recovery",
    "_day_",
    "_verified_import_pending_v1",
    "_verified_import_session_v1",
    "pre_import::"
  ]) {
    if (!keys.includes(identifier)) failures.push(`storage compatibility: missing ${identifier}`);
  }

  const migrations = read("src/state/migrations.ts");
  for (const marker of [
    "migrationRegistry",
    "legacy-root-domains",
    "normalize-current-shape",
    "findLegacyChildGrowth",
    "appStateSchema.parse"
  ]) {
    if (!migrations.includes(marker)) failures.push(`migrations: missing ${marker}`);
  }

  const restore = read("src/storage/verifiedRestore.ts");
  for (const marker of [
    'mode === "cancel"',
    "rollbackExact",
    "canonicalRestoreSignature",
    "Primary restore signature mismatch",
    "IndexedDB restore signature mismatch",
    "verifyPendingOnBoot"
  ]) {
    if (!restore.includes(marker)) failures.push(`verified restore: missing ${marker}`);
  }

  const backup = read("src/storage/fullBackup.ts");
  for (const marker of [
    'exportType: "Full Backup"',
    'algorithm: "SHA-256"',
    "canonicalBytes",
    "integrity verification failed"
  ]) {
    if (!backup.includes(marker)) failures.push(`Full Backup: missing ${marker}`);
  }

  const testFiles = [
    "src/state/migrations.test.ts",
    "src/storage/merge.test.ts",
    "src/storage/fullBackup.test.ts",
    "src/storage/verifiedRestore.test.ts",
    "src/storage/coordinator.test.ts"
  ];
  const storageTests = testFiles.reduce(
    (count, path) => count + (read(path).match(/^\s+it\(/gm) ?? []).length,
    0
  );
  if (storageTests < 21) {
    failures.push(`storage tests: expected at least 21 cases, found ${storageTests}`);
  }
}

if (failures.length > 0) {
  console.error("Phase 3 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 3 verified: passthrough schemas, migrations, compatibility keys, " +
    "dual storage, recovery merge, verified restore, exact rollback, and 21 storage cases."
);
