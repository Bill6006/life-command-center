import { describe, expect, it } from "vitest";
import { buildIntelligenceProjection } from "./engine";
import { INTELLIGENCE_GOLDEN_FIXTURES } from "./parityFixtures";

describe("synthetic legacy intelligence golden parity", () => {
  for (const fixture of INTELLIGENCE_GOLDEN_FIXTURES) {
    it(fixture.id, () => {
      const projection = buildIntelligenceProjection(
        fixture.input,
        fixture.outcomes ?? []
      );
      expect({
        forecastScore: projection.forecast.score,
        forecastBand: projection.forecast.band,
        forecastMode: projection.forecast.mode,
        capacityBand: projection.capacity.band,
        capacityProvisional: projection.capacity.provisional,
        protectedNextLane: projection.capacity.protectedNextLane,
        primaryBottleneck: projection.bottlenecks[0].id,
        selectedCandidate: projection.selected.id,
        reachablePeak: projection.reachablePeak
      }).toEqual(fixture.expected);
    });
  }

  it("uses one fixed contract version and unique synthetic IDs", () => {
    expect(
      new Set(INTELLIGENCE_GOLDEN_FIXTURES.map((fixture) => fixture.id)).size
    ).toBe(INTELLIGENCE_GOLDEN_FIXTURES.length);
    expect(
      INTELLIGENCE_GOLDEN_FIXTURES.every(
        (fixture) => fixture.contractVersion === "phase-6-golden-v1"
      )
    ).toBe(true);
  });
});
