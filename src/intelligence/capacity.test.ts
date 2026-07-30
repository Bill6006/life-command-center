import { describe, expect, it } from "vitest";
import { calculateCapacityBudget } from "./capacity";
import { buildForecastContext } from "./evidence";

function budget(
  signals: Record<string, number> = { energy: 7, drive: 6, focus: 6 },
  recoveryRisk: number | null = 30
) {
  return calculateCapacityBudget(
    buildForecastContext({
      dateKey: "2026-07-29",
      now: new Date(2026, 6, 29, 10, 0),
      place: "home",
      signals,
      recoveryRisk
    })
  );
}

describe("capacity budget", () => {
  it("uses the exact raw capacity formula and clamps to 100", () => {
    expect(budget().raw).toBe(100);
  });

  it("is provisional and Low with fewer than three known inputs", () => {
    const result = budget({ energy: 8 }, null);
    expect(result).toMatchObject({ provisional: true, band: "low", confidence: "low" });
    expect(result.allowances.future).toBe(0);
  });

  it("assigns Medium confidence to exactly three inputs", () => {
    const result = budget({ energy: 6, drive: 6, focus: 6 }, null);
    expect(result.confidence).toBe("medium");
    expect(result.provisional).toBe(false);
  });

  it("assigns Higher confidence to four inputs", () => {
    expect(budget().confidence).toBe("higher");
  });

  it("reserves Protect when recovery is urgent", () => {
    const result = budget({ energy: 7, drive: 7, focus: 7 }, 72);
    expect(result.band).toBe("low");
    expect(result.urgentProtect).toBe(true);
    expect(result.protectedNextLane).toBe("protect");
  });

  it("makes the high-band stretch optional", () => {
    const result = budget({ energy: 8, drive: 8, focus: 8 }, 20);
    expect(result.band).toBe("high");
    expect(result.optionalStretch).toBe(true);
    expect(result.allowances).toEqual({ protect: 1, future: 1, connection: 1 });
  });
});
