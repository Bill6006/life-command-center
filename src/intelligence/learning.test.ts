import { describe, expect, it } from "vitest";
import { INTELLIGENCE_CANDIDATES } from "./candidates";
import { buildForecastContext } from "./evidence";
import { buildMoveLearningProfile } from "./learning";
import type { MoveOutcomeRecord } from "./types";

const candidate = INTELLIGENCE_CANDIDATES.find(
  (item) => item.id === "future-ten"
)!;
const context = buildForecastContext({
  dateKey: "2026-07-29",
  now: new Date("2026-07-29T16:00:00Z"),
  place: "home",
  signals: { energy: 7, mood: 6, focus: 8, drive: 7 }
});

function outcome(
  occurredAt: string,
  overrides: Partial<MoveOutcomeRecord> = {}
): MoveOutcomeRecord {
  return {
    candidateId: candidate.id,
    family: candidate.family,
    occurredAt,
    started: true,
    completed: true,
    before: { energy: 5, focus: 5 },
    after: { energy: 7, focus: 8 },
    contextFeatures: {
      energy: { value: 7, source: "logged", known: true },
      mood: { value: 6, source: "logged", known: true },
      focus: { value: 8, source: "logged", known: true }
    },
    ...overrides
  };
}

describe("move learning profile", () => {
  it("keeps the predicted library range separate from observed lift", () => {
    const profile = buildMoveLearningProfile(context, candidate, [
      outcome("2026-07-20T16:00:00Z")
    ]);
    expect(profile.predictedEffect).toEqual(candidate.expectedEffect);
    expect(profile.observed.lift).not.toBeNull();
    expect(profile.observed.maturity).toBe("early-signal");
    expect(profile.reasons.join(" ")).toContain("early signal, not proof");
  });

  it("requires three qualified comparable outcomes for personal proof", () => {
    const profile = buildMoveLearningProfile(context, candidate, [
      outcome("2026-07-18T16:00:00Z"),
      outcome("2026-07-20T16:00:00Z"),
      outcome("2026-07-22T16:00:00Z")
    ]);
    expect(profile.observed).toMatchObject({
      comparableSamples: 3,
      qualifiedSamples: 3,
      maturity: "qualified"
    });
  });

  it("does not convert a feasibility rejection into observed lift", () => {
    const profile = buildMoveLearningProfile(context, candidate, [
      outcome("2026-07-20T16:00:00Z", {
        started: false,
        completed: false,
        rejectedForFeasibility: true,
        before: undefined,
        after: undefined
      })
    ]);
    expect(profile.observed).toMatchObject({
      lift: null,
      qualifiedSamples: 0,
      maturity: "insufficient"
    });
    expect(profile.completion.feasibilityRejections).toBe(1);
  });
});
