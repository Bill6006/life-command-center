import { describe, expect, it } from "vitest";
import { buildForecastContext } from "./evidence";
import {
  comparableSimilarity,
  completionProbability,
  observedOutcomeLift,
  recencyWeight,
  selectComparableRecords
} from "./optimization";
import type { MoveOutcomeRecord } from "./types";

const context = buildForecastContext({
  dateKey: "2026-07-29",
  now: new Date("2026-07-29T16:00:00Z"),
  place: "home",
  signals: { energy: 7, mood: 6, focus: 8, drive: 7 }
});

function record(overrides: Partial<MoveOutcomeRecord> = {}): MoveOutcomeRecord {
  return {
    candidateId: "future-ten",
    family: "future-focus",
    occurredAt: "2026-07-20T16:00:00Z",
    started: true,
    completed: true,
    contextFeatures: {
      energy: { value: 7, source: "logged", known: true },
      mood: { value: 6, source: "logged", known: true },
      focus: { value: 8, source: "inferred", known: true }
    },
    ...overrides
  };
}

describe("bounded personal optimization", () => {
  it("requires at least three comparable known features", () => {
    expect(
      comparableSimilarity(
        context,
        record({ contextFeatures: { energy: { value: 7, source: "logged", known: true } } })
      )
    ).toBeNull();
  });

  it("applies the contracted recency weights", () => {
    expect([recencyWeight(14), recencyWeight(45), recencyWeight(120), recencyWeight(121)]).toEqual([
      1,
      0.94,
      0.86,
      0.78
    ]);
  });

  it("limits comparable history to eight", () => {
    expect(selectComparableRecords(context, Array.from({ length: 12 }, () => record()))).toHaveLength(
      8
    );
  });

  it("requires started action and two before/after metrics for observed lift", () => {
    expect(observedOutcomeLift(record())).toBeNull();
    expect(
      observedOutcomeLift(record({ before: { energy: 4 }, after: { energy: 6 } }))
    ).toBeNull();
  });

  it("reverses adverse metrics in observed lift", () => {
    expect(
      observedOutcomeLift(
        record({
          before: { energy: 4, stress: 8 },
          after: { energy: 6, stress: 5 }
        })
      )
    ).toBeGreaterThan(0);
  });

  it("does not treat feasibility rejection as negative observed lift", () => {
    expect(
      observedOutcomeLift(record({ rejectedForFeasibility: true, started: false }))
    ).toBeNull();
  });

  it("uses the smoothed completion formula and clamps adjustments", () => {
    const probability = completionProbability(
      [
        record({ completed: true }),
        record({ completed: false }),
        record({ started: false, completed: false, rejectedForFeasibility: true })
      ],
      2,
      10
    );
    expect(probability).toBeCloseTo(3.6 / 6.85, 3);
    expect(completionProbability([], 5, 120)).toBeGreaterThanOrEqual(0.2);
  });
});
