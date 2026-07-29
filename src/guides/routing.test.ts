import { describe, expect, it, vi } from "vitest";
import { buildGuideSteps, stepMap } from "./guideRegistry";
import { routeGuideStep } from "./routing";
import { startGuide } from "./session";
import { createBlankGuideState, type GuideBuildContext } from "./types";

const context: GuideBuildContext = {
  now: new Date("2026-07-29T08:00:00.000-04:00"),
  timeZone: "America/New_York",
  rolloverMode: "after_sleep_4am",
  evidence: { satisfied: {} }
};

describe("guide routing", () => {
  it("navigates, focuses, scrolls, and highlights a stable target", () => {
    const steps = buildGuideSteps("morning", context);
    const session = startGuide(createBlankGuideState(), "morning", steps, context).state.active!;
    const target = document.createElement("button");
    target.focus = vi.fn();
    target.scrollIntoView = vi.fn();
    const navigate = vi.fn();
    const result = routeGuideStep(session, stepMap(steps), {
      navigate,
      findTarget: () => target
    });
    expect(result.ok).toBe(true);
    expect(navigate).toHaveBeenCalledWith("today");
    expect(target.dataset.guideTarget).toBe("active");
    expect(target.scrollIntoView).toHaveBeenCalled();
  });

  it("returns a recoverable error when a target is unavailable", () => {
    const steps = buildGuideSteps("morning", context);
    const session = startGuide(createBlankGuideState(), "morning", steps, context).state.active!;
    const result = routeGuideStep(session, stepMap(steps), {
      navigate: vi.fn(),
      findTarget: () => null
    });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("Expected unavailable route.");
    expect(result.reason).toContain("progress is still saved");
  });
});
