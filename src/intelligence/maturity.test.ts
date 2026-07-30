import { describe, expect, it } from "vitest";
import { calculateMaturityTruth } from "./maturity";

describe("maturity truth separation", () => {
  it("does not turn built capability into adoption or outcome evidence", () => {
    const truth = calculateMaturityTruth({
      capability: { passedChecks: 4, totalChecks: 4 },
      adoption: { meaningfulUses: 0, eligibleOpportunities: 8 },
      outcome: { qualifiedSamples: 0, positiveSamples: 0 }
    });
    expect(truth.capability.level).toBe("built");
    expect(truth.adoption.level).toBe("not-observed");
    expect(truth.outcome.level).toBe("insufficient");
  });

  it("does not rewrite independent use or evidence when capability is absent", () => {
    const truth = calculateMaturityTruth({
      capability: { passedChecks: 0, totalChecks: 4 },
      adoption: { meaningfulUses: 4, eligibleOpportunities: 6 },
      outcome: {
        qualifiedSamples: 3,
        positiveSamples: 2,
        observedLift: 2.5
      }
    });
    expect(truth.capability.level).toBe("not-built");
    expect(truth.adoption.level).toBe("established");
    expect(truth.outcome.level).toBe("qualified");
  });

  it("keeps one positive outcome as an early signal rather than proof", () => {
    const truth = calculateMaturityTruth({
      capability: { passedChecks: 2, totalChecks: 4 },
      adoption: { meaningfulUses: 1, eligibleOpportunities: 5 },
      outcome: {
        qualifiedSamples: 1,
        positiveSamples: 1,
        observedLift: 4
      }
    });
    expect(truth.capability.level).toBe("partial");
    expect(truth.adoption.level).toBe("emerging");
    expect(truth.outcome.level).toBe("early-signal");
    expect(truth.reasons.join(" ")).toContain("not proof");
    expect(truth).not.toHaveProperty("overallScore");
  });
});
