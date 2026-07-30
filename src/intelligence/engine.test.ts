import { describe, expect, it } from "vitest";
import { buildIntelligenceProjection } from "./engine";

describe("integrated intelligence projection", () => {
  it("chooses data confidence for blank current state", () => {
    const result = buildIntelligenceProjection({
      dateKey: "2026-07-29",
      now: new Date(2026, 6, 29, 10, 0),
      place: "home"
    });
    expect(result.bottlenecks[0].id).toBe("data-confidence");
    expect(result.selected.id).toBe("qualified-check-in");
    expect(result.capacity.provisional).toBe(true);
  });

  it("keeps reachable peak bounded by time and capacity", () => {
    const result = buildIntelligenceProjection({
      dateKey: "2026-07-29",
      now: new Date(2026, 6, 29, 10, 0),
      place: "home",
      availableMinutes: 6,
      signals: { energy: 8, mood: 8, focus: 8, drive: 8 },
      recoveryRisk: 20,
      effectiveEvidenceDays: 30
    });
    expect(result.reachablePeak - result.forecast.score).toBeLessThanOrEqual(2);
    expect(result.northStar).toBe(100);
  });
});
