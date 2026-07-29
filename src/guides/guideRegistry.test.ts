import { describe, expect, it } from "vitest";
import { buildGuideSteps, buildSmartCheckInSteps } from "./guideRegistry";
import type { GuideBuildContext } from "./types";

const base = (local = "2026-07-29T08:00:00"): GuideBuildContext => ({
  now: new Date(`${local}-04:00`),
  timeZone: "America/New_York",
  rolloverMode: "after_sleep_4am",
  evidence: { satisfied: {} }
});

describe("data-driven guide registry", () => {
  it("preserves ordered conditional steps across all full guide families", () => {
    const morning = buildGuideSteps("morning", base()).map((step) => step.title);
    const afternoon = buildGuideSteps("afternoon", base("2026-07-29T13:00:00")).map(
      (step) => step.title
    );
    const evening = buildGuideSteps("evening", base("2026-07-29T20:00:00")).map(
      (step) => step.title
    );
    const weekly = buildGuideSteps("weekly", base("2026-08-02T17:00:00")).map(
      (step) => step.title
    );
    expect(morning.slice(0, 4)).toEqual([
      "Life Checks",
      "Current effects",
      "Morning Start",
      "Body readiness"
    ]);
    expect(afternoon).toContain("Presence and connection");
    expect(evening.slice(-3)).toEqual(["Night closeout", "Daily review", "Today Command forecast"]);
    expect(weekly.slice(-2)).toEqual(["Weekly Growth Focus", "Weekly Rhythm"]);
  });

  it("includes Saturday context and a real due private follow-up only when eligible", () => {
    const saturday = base("2026-08-01T13:00:00");
    saturday.evidence.privateFollowUp = {
      eventId: "synthetic-event",
      dueAt: "2026-08-01T16:00:00.000Z",
      lateAt: "2026-08-01T17:00:00.000Z",
      staleAt: "2026-08-01T19:00:00.000Z"
    };
    const ids = buildGuideSteps("afternoon", saturday).map((step) => step.id);
    expect(ids).toContain("afternoon:saturday-boundary");
    expect(ids).toContain("afternoon:private-follow-up");
  });

  it("uses a Today fallback instead of completing an empty guide", () => {
    const context = base();
    for (const key of [
      "core-state",
      "current-effects",
      "morning-start",
      "body-readiness",
      "environment",
      "mission",
      "faith",
      "last-night",
      "caffeine",
      "therapy",
      "energy-mood",
      "fatherhood",
      "forecast"
    ]) {
      context.evidence.satisfied[key] = true;
    }
    expect(buildGuideSteps("morning", context).map((step) => step.id)).toEqual([
      "morning:today-check-in"
    ]);
  });

  it("caps Smart Check-In at three high-value refresh steps", () => {
    const steps = buildSmartCheckInSteps("afternoon", base("2026-07-29T15:00:00"));
    expect(steps).toHaveLength(3);
    expect(steps.every((step) => step.guideFamily === "smart-check-in")).toBe(true);
    expect(steps.map((step) => step.title)).toContain("Life Checks");
  });
});
