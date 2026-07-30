import { describe, expect, it } from "vitest";
import { rankBottlenecks } from "./bottlenecks";
import { calculateCapacityBudget } from "./capacity";
import {
  INTELLIGENCE_CANDIDATES,
  rankIntelligenceCandidates
} from "./candidates";
import { buildForecastContext } from "./evidence";

function ranked(
  now: Date,
  overrides: Partial<Parameters<typeof buildForecastContext>[0]> = {}
) {
  const context = buildForecastContext({
    dateKey: "2026-07-29",
    now,
    place: "home",
    signals: { energy: 8, mood: 8, focus: 8, drive: 8 },
    recoveryRisk: 20,
    availableMinutes: 60,
    effectiveEvidenceDays: 20,
    ...overrides
  });
  return rankIntelligenceCandidates(
    context,
    calculateCapacityBudget(context),
    rankBottlenecks(context)
  );
}

describe("time, context, capacity, and dedupe candidate gates", () => {
  it("does not show dinner support before 15:30", () => {
    const dinner = ranked(new Date(2026, 6, 29, 15, 29), { needFood: true }).find(
      (candidate) => candidate.id === "dinner-support"
    )!;
    expect(dinner.eligible).toBe(false);
    expect(dinner.rejections.join(" ")).toContain("15:30");
  });

  it("opens dinner support exactly at 15:30", () => {
    const dinner = ranked(new Date(2026, 6, 29, 15, 30), { needFood: true }).find(
      (candidate) => candidate.id === "dinner-support"
    )!;
    expect(dinner.eligible).toBe(true);
  });

  it("does not open tonight or bedtime actions early", () => {
    const list = ranked(new Date(2026, 6, 29, 15, 59));
    expect(list.find((candidate) => candidate.id === "tonight-plan")?.eligible).toBe(false);
    expect(list.find((candidate) => candidate.id === "bedtime-protection")?.eligible).toBe(false);
  });

  it("blocks private action when privacy is explicitly unavailable", () => {
    const faith = ranked(new Date(2026, 6, 29, 18, 0), {
      weeklyFocus: "faith-meaning",
      privacyAvailable: false
    }).find((candidate) => candidate.id === "quiet-faith-reset")!;
    expect(faith.rejections).toContain("Privacy is unavailable.");
  });

  it("suppresses an active duplicate family", () => {
    const future = ranked(new Date(2026, 6, 29, 10, 0), {
      activeFamilies: ["future-focus"]
    }).find((candidate) => candidate.id === "future-ten")!;
    expect(future.eligible).toBe(false);
  });

  it("blocks deep Future work on Saturday", () => {
    const deep = ranked(new Date(2026, 7, 1, 10, 0), {
      dateKey: "2026-08-01"
    }).find((candidate) => candidate.id === "deep-future-block")!;
    expect(deep.rejections).toContain("Saturday protects against deep/high Future work.");
  });

  it("lets urgent Protect outrank Weekly Focus", () => {
    const list = ranked(new Date(2026, 6, 29, 10, 0), {
      recoveryRisk: 80,
      signals: { energy: 2, mood: 4, focus: 3, drive: 3 },
      weeklyFocus: "career"
    });
    expect(list.find((candidate) => candidate.eligible)?.lane).toBe("protect");
  });

  it("uses exactly one safe driving candidate", () => {
    const list = ranked(new Date(2026, 6, 29, 10, 0), { place: "driving" });
    expect(list.filter((candidate) => candidate.eligible).map((candidate) => candidate.id)).toEqual([
      "safe-driving-protect"
    ]);
  });

  it("has no duplicate stable IDs or score-gaming candidate", () => {
    expect(new Set(INTELLIGENCE_CANDIDATES.map((candidate) => candidate.id)).size).toBe(
      INTELLIGENCE_CANDIDATES.length
    );
    expect(INTELLIGENCE_CANDIDATES.some((candidate) => /score/i.test(candidate.title))).toBe(false);
  });

  it("is byte-equivalent for the same frozen input", () => {
    const first = ranked(new Date(2026, 6, 29, 10, 0));
    const second = ranked(new Date(2026, 6, 29, 10, 0));
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
  });
});
