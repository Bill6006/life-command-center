import { describe, expect, it } from "vitest";
import { calculateTodayScore, readinessBand } from "./score";
import { createBlankTodayState, TODAY_CATEGORIES } from "./types";

describe("Today Score evidence semantics", () => {
  it("does not display before one category is explicitly logged", () => {
    const result = calculateTodayScore(createBlankTodayState());
    expect(result.display).toBe(false);
    expect(result.qualification).toBe("insufficient");
    expect(result.score).toBe(0);
  });

  it("distinguishes explicit zero from unknown", () => {
    const today = createBlankTodayState();
    today.evidence.energy = { value: 0, state: "explicit-false" };
    const result = calculateTodayScore(today);
    expect(result.display).toBe(true);
    expect(result.knownCategories).toBe(1);
    expect(result.score).toBe(0);
    expect(result.direction).toContain("not a verdict");
  });

  it("uses eight two-point categories and evidence-aware qualification", () => {
    const today = createBlankTodayState();
    for (const category of TODAY_CATEGORIES) {
      today.evidence[category] = { value: 2, state: "logged" };
    }
    expect(calculateTodayScore(today)).toMatchObject({
      score: 16,
      maxScore: 16,
      knownCategories: 8,
      qualification: "qualified"
    });
  });

  it("derives readiness without treating missing as low", () => {
    const today = createBlankTodayState();
    expect(readinessBand(today)).toBe("unknown");
    today.evidence.energy = { value: 0, state: "logged" };
    expect(readinessBand(today)).toBe("low");
    today.evidence.energy = { value: 2, state: "logged" };
    expect(readinessBand(today)).toBe("strong");
  });
});
