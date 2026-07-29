import { describe, expect, it } from "vitest";
import { buildGuideSteps, stepMap } from "./guideRegistry";
import {
  completeCurrentStep,
  reconcileRecoveredGuideState,
  skipCurrentStep,
  startGuide,
  startQuickMode,
  stopGuide
} from "./session";
import { createBlankGuideState, type GuideBuildContext } from "./types";

const context = (): GuideBuildContext => ({
  now: new Date("2026-07-29T12:00:00.000-04:00"),
  timeZone: "America/New_York",
  rolloverMode: "after_sleep_4am",
  evidence: { satisfied: { "current-effects": true } }
});

describe("guide session state machine", () => {
  it("enforces Quick Mode mutual exclusion", () => {
    const clock = context();
    const quick = startQuickMode(createBlankGuideState(), clock.now);
    expect(quick.ok).toBe(true);
    const blocked = startGuide(quick.state, "afternoon", buildGuideSteps("afternoon", clock), clock);
    expect(blocked.ok).toBe(false);

    const active = startGuide(
      createBlankGuideState(),
      "afternoon",
      buildGuideSteps("afternoon", clock),
      clock
    );
    expect(active.ok).toBe(true);
    expect(startQuickMode(active.state, clock.now).ok).toBe(false);
  });

  it("stop clears navigation without marking completion", () => {
    const clock = context();
    const active = startGuide(
      createBlankGuideState(),
      "afternoon",
      buildGuideSteps("afternoon", clock),
      clock
    );
    const stopped = stopGuide(active.state);
    expect(stopped.state.active).toBeNull();
    expect(stopped.state.completions.afternoon).toBeUndefined();
  });

  it("routes forward and atomically completes the final step", () => {
    const clock = context();
    const steps = buildGuideSteps("afternoon", clock).slice(0, 2);
    const map = stepMap(steps);
    const started = startGuide(createBlankGuideState(), "afternoon", steps, clock);
    const next = completeCurrentStep(started.state, map, new Date("2026-07-29T16:01:00.000Z"));
    expect(next.state.active?.stepIndex).toBe(1);
    const completed = skipCurrentStep(next.state, map, new Date("2026-07-29T16:02:00.000Z"));
    expect(completed.ok).toBe(true);
    expect(completed.state.active).toBeNull();
    expect(completed.state.completions.afternoon?.key).toBe("2026-07-29");
    if (!completed.ok) throw new Error("Expected guide completion.");
    expect(completed.completion).toBeDefined();
  });

  it("does not reopen a completed guide from stale recovery", () => {
    const clock = context();
    const steps = buildGuideSteps("afternoon", clock);
    const started = startGuide(createBlankGuideState(), "afternoon", steps, clock);
    const stale = started.state;
    stale.completions.afternoon = {
      key: "2026-07-29",
      completedAt: "2026-07-29T17:00:00.000Z"
    };
    expect(reconcileRecoveredGuideState(stale, clock).active).toBeNull();
  });

  it("clears a stale non-manual session but preserves an explicit manual override", () => {
    const clock = context();
    const steps = buildGuideSteps("afternoon", clock);
    const started = startGuide(createBlankGuideState(), "afternoon", steps, clock);
    const tomorrow = { ...clock, now: new Date("2026-07-30T12:00:00.000-04:00") };
    expect(reconcileRecoveredGuideState(started.state, tomorrow).active).toBeNull();

    const manual = startGuide(createBlankGuideState(), "afternoon", steps, clock, true);
    expect(reconcileRecoveredGuideState(manual.state, tomorrow).active).not.toBeNull();
  });
});
