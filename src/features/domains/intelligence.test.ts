import { describe, expect, it } from "vitest";
import { createBlankAppState } from "../../state/model";
import { buildStateIntelligenceProjection } from "./intelligence";
import { writeDomainField, writePhase7DomainValue } from "./state";

describe("Phase 7 state-to-intelligence adapter", () => {
  it("keeps a blank install provisional with source-qualified inputs unknown", () => {
    const state = createBlankAppState();
    const result = buildStateIntelligenceProjection(
      state,
      "2042-02-03",
      new Date("2042-02-03T15:00:00.000Z")
    );

    expect(result.capacity.provisional).toBe(true);
    expect(result.context.signals.energy.known).toBe(false);
    expect(result.context.effectiveEvidenceDays).toBe(0);
  });

  it("reuses domain evidence and the user-confirmed Weekly Focus in the Phase 6 engine", () => {
    const state = createBlankAppState();
    for (const [domain, storageKey, fieldId, value] of [
      ["health", "health", "energy", 8],
      ["azure", "azure", "focus", 7],
      ["azure", "azure", "drive", 7],
      ["health", "health", "recoveryRisk", 20]
    ] as const) {
      writeDomainField(state, {
        dateKey: "2042-02-03",
        domain,
        storageKey,
        scope: "day",
        fieldId,
        value,
        now: new Date("2042-02-03T15:00:00.000Z")
      });
    }
    writePhase7DomainValue(state, "weeklyAnchors", "weeklyFocusRecords", [
      {
        weekKey: "2042-02-03",
        selected: "career",
        confirmedAt: "2042-02-03T15:01:00.000Z"
      }
    ]);

    const result = buildStateIntelligenceProjection(
      state,
      "2042-02-03",
      new Date("2042-02-03T15:02:00.000Z")
    );

    expect(result.context.signals.energy).toMatchObject({
      value: 8,
      source: "logged",
      known: true
    });
    expect(result.context.weeklyFocus).toBe("career");
    expect(result.capacity.provisional).toBe(false);
    expect(result.context.effectiveEvidenceDays).toBe(1);
  });
});
