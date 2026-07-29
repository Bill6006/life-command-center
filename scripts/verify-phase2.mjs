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
    'const REPOSITORY_BASE = "/life-command-center/"',
    "base: REPOSITORY_BASE",
    'name: "Life Command Center"',
    "scope: REPOSITORY_BASE",
    "start_url: `${REPOSITORY_BASE}#/today`",
    "navigateFallback: `${REPOSITORY_BASE}index.html`",
    'display: "standalone"',
    'registerType: "autoUpdate"'
  ]) {
    if (!vite.includes(marker)) failures.push(`PWA config: missing ${marker}`);
  }

  const builtIndex = read("dist/index.html");
  for (const marker of [
    'src="/life-command-center/assets/',
    'href="/life-command-center/assets/',
    'href="/life-command-center/manifest.webmanifest"'
  ]) {
    if (!builtIndex.includes(marker)) failures.push(`built index: missing ${marker}`);
  }
  if (/\/[^/]*command-center-next\//i.test(builtIndex)) {
    failures.push("built index: contains the deleted predecessor subpath");
  }

  const manifest = JSON.parse(read("dist/manifest.webmanifest"));
  if (manifest.name !== "Life Command Center") {
    failures.push(`manifest: expected Life Command Center, found ${manifest.name ?? "missing"}`);
  }
  if (manifest.scope !== "/life-command-center/") {
    failures.push(`manifest: unexpected scope ${manifest.scope ?? "missing"}`);
  }
  if (manifest.start_url !== "/life-command-center/#/today") {
    failures.push(`manifest: unexpected start_url ${manifest.start_url ?? "missing"}`);
  }
  const iconPaths = (manifest.icons ?? []).map((icon) => icon.src);
  for (const iconPath of [
    "/life-command-center/icon-192.png",
    "/life-command-center/icon-512.png"
  ]) {
    if (!iconPaths.includes(iconPath)) failures.push(`manifest: missing ${iconPath}`);
  }

  const serviceWorker = read("dist/sw.js");
  for (const marker of [
    "/life-command-center/index.html",
    'url:"icon-192.png"',
    'url:"icon-512.png"',
    'url:"manifest.webmanifest"'
  ]) {
    if (!serviceWorker.includes(marker)) failures.push(`service worker: missing ${marker}`);
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
  "Phase 2 verified: 12 routed tabs, blank defaults, Error Boundary, explicit " +
    "/life-command-center/ asset, manifest and service-worker paths, PWA shell, " +
    "icons, and 412x915 synthetic mobile evidence."
);
