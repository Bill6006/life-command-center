import { describe, expect, it } from "vitest";
import { buildForecastContext, periodForMinute, qualifySignal } from "./evidence";

describe("forecast evidence context", () => {
  it("keeps unknown values unknown", () => {
    expect(qualifySignal(undefined)).toEqual({
      value: null,
      source: "unknown",
      known: false
    });
  });

  it("does not make a numeric explicit false unknown", () => {
    expect(qualifySignal({ value: 0, source: "explicit-false" })).toEqual({
      value: 0,
      source: "explicit-false",
      known: true
    });
  });

  it("uses the contracted guide periods", () => {
    expect(periodForMinute(5 * 60)).toBe("morning");
    expect(periodForMinute(12 * 60)).toBe("afternoon");
    expect(periodForMinute(17 * 60)).toBe("evening");
  });

  it("builds a serializable, source-qualified context", () => {
    const context = buildForecastContext({
      dateKey: "2026-07-29",
      now: new Date(2026, 6, 29, 15, 29),
      place: "work",
      signals: { energy: { value: 7, source: "logged" }, focus: null },
      recoveryRisk: { value: 42, source: "inferred" },
      protectiveCount: 2,
      riskCount: 1
    });
    expect(context.period).toBe("afternoon");
    expect(context.signals.energy.known).toBe(true);
    expect(context.signals.focus.known).toBe(false);
    expect(context.recoveryRisk.source).toBe("inferred");
    expect(JSON.parse(JSON.stringify(context))).toEqual(context);
  });
});
