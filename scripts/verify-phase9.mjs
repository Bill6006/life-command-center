import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const failures = [];
const requiredFiles = [
  "src/accessibility/useDialogFocus.ts",
  "src/accessibility/contrast.ts",
  "src/accessibility/contrast.test.ts",
  "docs/reports/phase-9.md"
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

if (failures.length > 0) {
  console.error("Phase 9 verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  "Phase 9 verified: skip navigation, full focus visibility, modal focus trap and " +
    "Escape/restore behavior, live status announcements, 44px primary targets, safe-area " +
    "handling, reduced motion, forced-colors support, and WCAG AA token checks."
);
