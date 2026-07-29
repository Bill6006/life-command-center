import { describe, expect, it } from "vitest";
import { buildTodayCommand } from "./command";
import {
  cantNow,
  completeMove,
  pauseMove,
  recordEffectFollowUp,
  releaseCompletedMoveForPeriod,
  resumeMove,
  startMove,
  tryAnother,
  undoCompletedMove,
  undoConstraint
} from "./moveLifecycle";
import { createBlankTodayState } from "./types";

const zone = "America/New_York";
const now = new Date("2026-07-29T13:00:00.000-04:00");

describe("single-move lifecycle", () => {
  it("starts only one move and supports pause/resume", () => {
    const blank = createBlankTodayState();
    const started = startMove(blank, buildTodayCommand(blank, now).candidateId, now);
    expect(started.activeMove?.status).toBe("started");
    expect(() => startMove(started, "presence-touchpoint", now)).toThrow("Only one");
    const paused = pauseMove(started, new Date(now.getTime() + 60_000));
    expect(paused.activeMove?.status).toBe("paused");
    expect(resumeMove(paused, new Date(now.getTime() + 120_000)).activeMove?.status).toBe(
      "started"
    );
  });

  it("completes, locks the display, requests a delayed effect check, and can undo", () => {
    const blank = createBlankTodayState();
    const started = startMove(blank, buildTodayCommand(blank, now).candidateId, now);
    const completed = completeMove(started, new Date(now.getTime() + 5 * 60_000), zone);
    expect(completed.activeMove).toMatchObject({
      status: "completed",
      displayLockPeriod: "afternoon"
    });
    expect(completed.activeMove?.followUp?.status).toBe("pending");
    const undone = undoCompletedMove(completed, new Date(now.getTime() + 6 * 60_000));
    expect(undone.activeMove?.status).toBe("started");
    expect(undone.activeMove?.followUp).toBeUndefined();
  });

  it("releases a completed display lock only in a new time period", () => {
    const started = startMove(
      createBlankTodayState(),
      buildTodayCommand(createBlankTodayState(), now).candidateId,
      now
    );
    const completed = completeMove(started, now, zone);
    expect(
      releaseCompletedMoveForPeriod(
        completed,
        new Date("2026-07-29T16:59:59.000-04:00"),
        zone
      ).activeMove
    ).not.toBeNull();
    const released = releaseCompletedMoveForPeriod(
      completed,
      new Date("2026-07-29T17:00:00.000-04:00"),
      zone
    );
    expect(released.activeMove).toBeNull();
    expect(released.moveHistory).toHaveLength(1);
  });

  it("captures Can't now separately from context and without an outcome score", () => {
    const blank = createBlankTodayState();
    const started = startMove(blank, buildTodayCommand(blank, now).candidateId, now);
    const rejected = cantNow(started, "not-enough-time", "Synthetic note", now);
    expect(rejected.activeMove).toBeNull();
    expect(rejected.context).toBe("home");
    expect(rejected.constraints[0]).toMatchObject({
      reason: "not-enough-time",
      context: "home"
    });
    expect(rejected.moveHistory[0]).not.toHaveProperty("observedChange");
    const undone = undoConstraint(rejected, rejected.constraints[0].id, new Date());
    expect(undone.constraints[0].undoneAt).toBeDefined();
  });

  it("Try another dismisses without an effect outcome and starts a different candidate", () => {
    const blank = createBlankTodayState();
    const started = startMove(blank, buildTodayCommand(blank, now).candidateId, now);
    const firstId = started.activeMove?.candidateId;
    const alternative = tryAnother(started, new Date(now.getTime() + 60_000));
    expect(alternative.moveHistory[0].dismissalReason).toBe("try-another");
    expect(alternative.activeMove?.candidateId).not.toBe(firstId);
  });

  it("records an effect only after the due window", () => {
    const blank = createBlankTodayState();
    const started = startMove(blank, buildTodayCommand(blank, now).candidateId, now);
    const completed = completeMove(started, now, zone);
    expect(
      recordEffectFollowUp(completed, { energy: 2 }, new Date(now.getTime() + 59 * 60_000))
        .activeMove?.followUp?.status
    ).toBe("pending");
    const checked = recordEffectFollowUp(
      completed,
      { energy: 2, mood: 1 },
      new Date(now.getTime() + 61 * 60_000)
    );
    expect(checked.activeMove?.followUp).toMatchObject({
      status: "complete",
      observedChange: 1.5
    });
  });
});
