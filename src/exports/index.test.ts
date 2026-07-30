import { describe, expect, it } from "vitest";
import {
  addWorkWin,
  writeDomainField
} from "../features/domains/state";
import { createBlankAppState } from "../state/model";
import {
  buildLevel5Review,
  buildLifeUpdate,
  buildWorkWinPacket,
  exportJson,
  safeExportFilename,
  selectExportDateKeys
} from "./index";

const NOW = new Date("2042-05-31T12:00:00.000Z");

function syntheticState() {
  const state = createBlankAppState();
  for (let day = 1; day <= 31; day += 1) {
    const dateKey = `2042-05-${String(day).padStart(2, "0")}`;
    state.days[dateKey] = {
      _inputUpdatedAt: `${dateKey}T12:00:00.000Z`
    };
  }
  writeDomainField(state, {
    dateKey: "2042-05-31",
    domain: "pattern",
    storageKey: "pattern",
    scope: "day",
    fieldId: "sleepHours",
    value: 7,
    now: NOW
  });
  writeDomainField(state, {
    dateKey: "2042-05-31",
    domain: "pattern",
    storageKey: "pattern",
    scope: "day",
    fieldId: "nightFood",
    value: "synthetic private pattern detail",
    now: NOW
  });
  addWorkWin(state, {
    id: "synthetic-win",
    technology: "Synthetic platform",
    issue: "private synthetic incident context",
    action: "Used a synthetic diagnostic procedure.",
    result: "private synthetic result",
    evidenceStatus: "verified",
    sensitive: true,
    status: "complete",
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString()
  });
  return state;
}

describe("Phase 8 exports", () => {
  it("selects exact 7, 30, and all logged-day ranges", () => {
    const state = syntheticState();
    expect(selectExportDateKeys(state, "7", "2042-05-31")).toHaveLength(7);
    expect(selectExportDateKeys(state, "30", "2042-05-31")).toHaveLength(30);
    expect(selectExportDateKeys(state, "all", "2042-05-31")).toHaveLength(31);
  });

  it("emits parseable Life Update JSON and excludes private Pattern fields by default", () => {
    const state = syntheticState();
    const report = buildLifeUpdate(state, {
      range: "7",
      now: NOW,
      effectiveDate: "2042-05-31"
    });
    const parsed = JSON.parse(exportJson(report));
    const latest = parsed.recentDaySnapshots.at(-1);

    expect(parsed.loggedDays).toBe(7);
    expect(latest.domains.pattern.sleepHours.value).toBe(7);
    expect(latest.domains.pattern.nightFood).toBeUndefined();
    expect(exportJson(parsed)).not.toContain("private synthetic incident context");
    expect(exportJson(parsed)).not.toContain("private synthetic result");
  });

  it("includes private Pattern details only after the explicit setting", () => {
    const report = buildLifeUpdate(syntheticState(), {
      range: "7",
      now: NOW,
      effectiveDate: "2042-05-31",
      includePrivatePattern: true
    });
    const latest = report.recentDaySnapshots.at(-1);
    expect(
      (
        latest?.domains as Record<
          string,
          Record<string, { value?: unknown }>
        >
      ).pattern.nightFood.value
    ).toBe("synthetic private pattern detail");
  });

  it("keeps Level 5 capability, adoption, and personal evidence separate", () => {
    const report = buildLevel5Review(syntheticState(), {
      range: "30",
      now: NOW,
      effectiveDate: "2042-05-31"
    });

    expect(report.maturity.capability.level).toBe("not-built");
    expect(report.maturity.adoption.level).toBe("established");
    expect(report.maturity.outcome.level).toBe("insufficient");
    expect(report.capabilityEvidence).toMatchObject({ status: "not-run" });
  });

  it("makes sanitized and full Work Win packets materially different", () => {
    const state = syntheticState();
    const sanitized = exportJson(
      buildWorkWinPacket(state, "sanitized-json", NOW)
    );
    const full = exportJson(
      buildWorkWinPacket(state, "full-metadata-json", NOW)
    );
    const text = buildWorkWinPacket(state, "sanitized-text", NOW);

    expect(sanitized).not.toContain("private synthetic incident context");
    expect(sanitized).not.toContain("private synthetic result");
    expect(full).toContain("private synthetic incident context");
    expect(full).toContain("private synthetic result");
    expect(text).toContain("[withheld: sensitive]");
  });

  it("uses fixed filenames without user-entered content", () => {
    expect(safeExportFilename("life-update", "2042-05-31")).toBe(
      "life-command-center-life-update-2042-05-31.json"
    );
    expect(safeExportFilename("work-wins", "unsafe", "txt")).toBe(
      "life-command-center-work-wins-undated.txt"
    );
  });
});
