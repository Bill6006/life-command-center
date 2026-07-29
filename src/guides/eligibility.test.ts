import { describe, expect, it } from "vitest";
import {
  followUpStatus,
  mainGuideEligibility,
  missedMorningEligibility,
  smartCheckInEligibility,
  weeklyGuideEligibility
} from "./eligibility";
import { createBlankGuideState, type GuideClockContext } from "./types";

const context = (local: string): GuideClockContext => ({
  now: new Date(`${local}-04:00`),
  timeZone: "America/New_York",
  rolloverMode: "after_sleep_4am"
});

describe("guide eligibility", () => {
  it("requires the current period and suppresses completed guides", () => {
    const state = createBlankGuideState();
    expect(mainGuideEligibility("afternoon", state, context("2026-07-29T12:00:00")).eligible).toBe(
      true
    );
    expect(mainGuideEligibility("morning", state, context("2026-07-29T12:00:00")).eligible).toBe(
      false
    );
    state.completions.afternoon = {
      key: "2026-07-29",
      completedAt: "2026-07-29T16:00:00.000Z"
    };
    expect(mainGuideEligibility("afternoon", state, context("2026-07-29T13:00:00")).eligible).toBe(
      false
    );
  });

  it("offers missed morning only after morning and only when unused", () => {
    const state = createBlankGuideState();
    expect(missedMorningEligibility(state, context("2026-07-29T11:59:59")).eligible).toBe(false);
    expect(missedMorningEligibility(state, context("2026-07-29T12:00:00")).eligible).toBe(true);
    state.usedKeys.morning = "2026-07-29";
    expect(missedMorningEligibility(state, context("2026-07-29T12:00:00")).eligible).toBe(false);
  });

  it("suppresses the current weekly window after completion", () => {
    const state = createBlankGuideState();
    const sunday = context("2026-08-02T17:00:00");
    expect(weeklyGuideEligibility(state, sunday).eligible).toBe(true);
    state.completions.weekly = {
      key: "2026-07-27",
      completedAt: sunday.now.toISOString()
    };
    expect(weeklyGuideEligibility(state, sunday).eligible).toBe(false);
  });

  it("enforces both Smart Check-In 60-minute gates", () => {
    const state = createBlankGuideState();
    const now = context("2026-07-29T15:00:00");
    expect(smartCheckInEligibility(state, now).eligible).toBe(false);
    state.completions.afternoon = {
      key: "2026-07-29",
      completedAt: "2026-07-29T17:59:59.000Z"
    };
    expect(smartCheckInEligibility(state, now).eligible).toBe(true);
    state.rangeLoggedAt.afternoon = "2026-07-29T18:30:01.000Z";
    expect(smartCheckInEligibility(state, now).eligible).toBe(false);
  });

  it("distinguishes due, late, held, stale, and complete follow-ups", () => {
    const followUp = {
      eventId: "synthetic-event",
      dueAt: "2026-07-29T16:00:00.000Z",
      lateAt: "2026-07-29T17:00:00.000Z",
      staleAt: "2026-07-29T19:00:00.000Z"
    };
    expect(followUpStatus(followUp, new Date("2026-07-29T15:59:00.000Z"))).toBe("not-due");
    expect(followUpStatus(followUp, new Date("2026-07-29T16:00:00.000Z"))).toBe("due");
    expect(followUpStatus(followUp, new Date("2026-07-29T17:00:00.000Z"))).toBe("late");
    expect(followUpStatus({ ...followUp, startedAt: followUp.dueAt }, new Date(followUp.dueAt))).toBe(
      "held"
    );
    expect(followUpStatus(followUp, new Date(followUp.staleAt))).toBe("stale");
    expect(followUpStatus({ ...followUp, completedAt: followUp.dueAt }, new Date(followUp.dueAt))).toBe(
      "complete"
    );
  });
});
