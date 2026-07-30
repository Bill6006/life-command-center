import { describe, expect, it } from "vitest";
import { createBlankAppState } from "../state/model";
import { runPhase68Acceptance } from "./phase68";

const NOW = new Date("2042-06-01T12:00:00.000Z");

describe("Phase 68 acceptance", () => {
  it("passes all structural groups but remains YELLOW without external verification", async () => {
    const result = await runPhase68Acceptance(createBlankAppState(), {
      now: NOW,
      effectiveDate: "2042-06-01"
    });

    expect(result.groups.map((group) => group.id)).toEqual([
      "fresh",
      "migration",
      "time",
      "command",
      "feedback",
      "career",
      "truth",
      "regression",
      "mobile",
      "tuning",
      "performance"
    ]);
    expect(result.automatedPassed).toBe(true);
    expect(result.decision).toBe("YELLOW");
    expect(result.externalVerificationComplete).toBe(false);
  });

  it("allows GREEN only when the separate external gate is confirmed", async () => {
    const result = await runPhase68Acceptance(createBlankAppState(), {
      now: NOW,
      effectiveDate: "2042-06-01",
      externalVerificationComplete: true
    });

    expect(result.decision).toBe("GREEN");
    expect(result.reasons).toContain(
      "GREEN is never claimed from in-app automation alone."
    );
  });
});
