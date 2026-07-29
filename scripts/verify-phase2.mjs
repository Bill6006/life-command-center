import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const sourceFingerprint =
  "8beb34f3389bd9945b2ec860a590820a963f90b434c32b6ad18ef7e173823865";

const requiredFiles = [
  "index.html",
  "src/main.tsx",
  "src/app/App.tsx",
  "src/app/AppErrorBoundary.tsx",
  "src/domain/defaults.ts",
  "src/navigation/hashRoute.ts",
  "src/navigation/tabRegistry.ts",
  "src/styles.css",
  "public/icon-192.png",
  "public/icon-512.png",
  "docs/screenshots/phase-2-mobile-shell.jpg",
  "dist/index.html",
  "dist/manifest.webmanifest",
  "dist/sw.js"
];

for (const path of requiredFiles) {
  if (!existsSync(resolve(root, path))) failures.push(`${path}: missing`);
}

if (failures.length === 0) {
  const read = (path) => readFileSync(resolve(root, path), "utf8");
  const registry = read("src/navigation/tabRegistry.ts");
  const tabRows = registry.match(/^\s+id: "[a-z]+",$/gm) ?? [];
  if (tabRows.length !== 12) {
    failures.push(`tab registry: expected 12 definitions, found ${tabRows.length}`);
  }

  const ids = [
    "today",
    "azure",
    "money",
    "father",
    "faith",
    "health",
    "pattern",
    "social",
    "therapy",
    "week",
    "vision",
    "data"
  ];
  for (const id of ids) {
    if (!registry.includes(`id: "${id}"`)) failures.push(`tab registry: missing ${id}`);
  }

  const defaults = read("src/domain/defaults.ts");
  for (const blank of ["days: {}", "domains: {}", "logs: []"]) {
    if (!defaults.includes(blank)) failures.push(`blank defaults: missing ${blank}`);
  }
  if (/\bseed\b/i.test(defaults)) failures.push("blank defaults: seed field is forbidden");

  const vite = read("vite.config.ts");
  for (const marker of [
    'base: "./"',
    'start_url: "./#/today"',
    'display: "standalone"',
    'registerType: "autoUpdate"'
  ]) {
    if (!vite.includes(marker)) failures.push(`PWA config: missing ${marker}`);
  }

  const builtIndex = read("dist/index.html");
  if (/=["']\/(?:assets|icon-|manifest|sw\.)/i.test(builtIndex)) {
    failures.push("built index: root-absolute asset path breaks repository subpaths");
  }

  const rootIndexBytes = readFileSync(resolve(root, "index.html"));
  const rootIndexHash = createHash("sha256").update(rootIndexBytes).digest("hex");
  if (rootIndexHash === sourceFingerprint) {
    failures.push("root index: authoritative legacy source was copied");
  }

  const screenshot = readFileSync(resolve(root, "docs/screenshots/phase-2-mobile-shell.jpg"));
  if (screenshot.subarray(0, 3).toString("hex") !== "ffd8ff") {
    failures.push("mobile screenshot: invalid JPEG signature");
  } else {
    let offset = 2;
    let dimensions;
    while (offset + 9 < screenshot.length) {
      if (screenshot[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = screenshot[offset + 1];
      if (marker === 0xd9 || marker === 0xda) break;
      const segmentLength = screenshot.readUInt16BE(offset + 2);
      const isStartOfFrame = marker >= 0xc0 && marker <= 0xc3;
      if (isStartOfFrame) {
        dimensions = {
          height: screenshot.readUInt16BE(offset + 5),
          width: screenshot.readUInt16BE(offset + 7)
        };
        break;
      }
      offset += 2 + segmentLength;
    }
    if (dimensions?.width !== 412 || dimensions?.height !== 915) {
      failures.push(
        `mobile screenshot: expected 412x915, found ${dimensions?.width ?? "?"}x${
          dimensions?.height ?? "?"
        }`
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Phase 2 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 2 verified: 12 routed tabs, blank defaults, Error Boundary, relative " +
    "subpath build, PWA shell, icons, and 412x915 synthetic mobile evidence."
);
