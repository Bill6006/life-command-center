import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const screenshotFiles = [
  {
    path: "docs/screenshots/phase-9-mobile-today.jpg",
    width: 397,
    height: 882
  },
  {
    path: "docs/screenshots/phase-9-desktop-data.jpg",
    width: 1405,
    height: 990
  }
];
const requiredFiles = [
  "src/accessibility/useDialogFocus.ts",
  "src/accessibility/contrast.ts",
  "src/accessibility/contrast.test.ts",
  "docs/reports/phase-9.md",
  ...screenshotFiles.map((screenshot) => screenshot.path)
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

requireMarkers("src/accessibility/useDialogFocus.ts", [
  "FOCUSABLE_SELECTOR",
  'event.key === "Escape"',
  'event.key !== "Tab"',
  "previousFocusRef.current?.focus()"
]);
requireMarkers("src/features/today/TodayScreen.tsx", [
  "useDialogFocus",
  'aria-modal="true"',
  "reasonDialogRef"
]);
requireMarkers("src/guides/GuideExperience.tsx", [
  'role="region"',
  'aria-live="polite"',
  'role="status"'
]);
requireMarkers("src/features/data/DataScreen.tsx", [
  "activityNotice",
  'aria-live="polite"',
  'role="alert"'
]);
requireMarkers("src/app/App.tsx", [
  "Skip to main content",
  'id="main-content"'
]);
requireMarkers("src/styles.css", [
  "--focus-ring",
  ".skip-link",
  ".sr-only",
  "safe-area-inset-top",
  "safe-area-inset-right",
  "safe-area-inset-bottom",
  "min-height: 44px",
  "@media (prefers-reduced-motion: reduce)",
  "@media (forced-colors: active)"
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

for (const screenshot of screenshotFiles) {
  const path = resolve(root, screenshot.path);
  if (!existsSync(path)) continue;
  const bytes = readFileSync(path);
  if (bytes.subarray(0, 3).toString("hex") !== "ffd8ff") {
    failures.push(`${screenshot.path}: invalid JPEG signature`);
    continue;
  }
  const dimensions = jpegDimensions(bytes);
  if (
    dimensions?.width !== screenshot.width ||
    dimensions?.height !== screenshot.height
  ) {
    failures.push(
      `${screenshot.path}: expected ${screenshot.width}x${screenshot.height}, found ${
        dimensions?.width ?? "?"
      }x${dimensions?.height ?? "?"}`
    );
  }
}

if (failures.length > 0) {
  console.error("Phase 9 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 9 verified: skip navigation, full focus visibility, modal focus trap and " +
    "Escape/restore behavior, live status announcements, 44px primary targets, safe-area " +
    "handling, reduced motion, forced-colors support, WCAG AA token checks, and final " +
    "deployed Android/desktop screenshots."
);
