import { describe, expect, it } from "vitest";
import { buildForecastContext } from "./evidence";
import { calculateForecast } from "./forecast";

function context(
  overrides: Partial<Parameters<typeof buildForecastContext>[0]> = {}
) {
  return buildForecastContext({
    dateKey: "2026-07-29",
    now: new Date(2026, 6, 29, 13, 0),
    place: "home",
    protectiveCount: 2,
    riskCount: 1,
    effectiveEvidenceDays: 20,
    signals: {
      energy: 7,
      mood: 7,
      focus: 7,
      drive: 7
    },
    ...overrides
  });
}

describe("legacy forecast boundary", () => {
  it("preserves the 64 + protection - risk formula", () => {
    const forecast = calculateForecast(context());
    expect(forecast.score).toBe(69);
    expect(forecast.reasons[0]).toContain("64 + 2 × 4.8 − 1 × 4.2");
  });

  it("maps score bands exactly", () => {
    expect(calculateForecast(context({ protectiveCount: 5, riskCount: 0 })).band).toBe("green");
    expect(calculateForecast(context({ protectiveCount: 0, riskCount: 1 })).band).toBe("yellow");
    expect(
      calculateForecast(
        context({ signals: { energy: 2, mood: 2, focus: 2 }, riskCount: 8 })
      ).band
    ).toBe("red");
  });

  it("caps energy at three to 48", () => {
    const forecast = calculateForecast(
      context({ signals: { energy: 3, mood: 8, focus: 8, drive: 8 }, protectiveCount: 9 })
    );
    expect(forecast.score).toBe(48);
    expect(forecast.caps).toContain(48);
  });

  it("caps other low state to 58", () => {
    const forecast = calculateForecast(
      context({ signals: { energy: 8, mood: 8, focus: 4, drive: 8 }, protectiveCount: 9 })
    );
    expect(forecast.score).toBe(58);
  });

  it("applies missing-state period and evidence-day caps", () => {
    const afternoon = calculateForecast(
      context({ signals: {}, effectiveEvidenceDays: 0, protectiveCount: 5 })
    );
    expect(afternoon.score).toBe(62);
    expect(afternoon.caps).toEqual(expect.arrayContaining([62, 72]));
  });

  it("separates prediction from observation in its reason trace", () => {
    expect(calculateForecast(context()).reasons.at(-1)).toMatch(/separate/);
  });
});
