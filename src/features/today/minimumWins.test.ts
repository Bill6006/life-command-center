import { describe, expect, it } from "vitest";
import {
  buildMinimumWinPlan,
  coverMinimumWinsFromMove,
  removeMoveCoverage,
  updateMinimumWin
} from "./minimumWins";
import { createBlankTodayState, type MoveRecord } from "./types";

describe("Minimum Wins", () => {
  it("selects exactly three whole-day wins with balanced lanes", () => {
    const plan = buildMinimumWinPlan(
      createBlankTodayState(),
      "2026-07-29",
      new Date("2026-07-29T12:00:00.000Z")
    );
    expect(plan.wins).toHaveLength(3);
    expect(plan.wins.map((win) => win.lane)).toEqual(["protect", "future", "connection"]);
    expect(new Set(plan.wins.map((win) => win.family)).size).toBe(3);
  });

  it("uses a support substitution when explicit emotional evidence is at the floor", () => {
    const today = createBlankTodayState();
    today.evidence.emotional = { value: 0, state: "logged" };
    const plan = buildMinimumWinPlan(today, "2026-07-29");
    expect(plan.wins[1].family).toBe("support");
    expect(plan.wins[1].tier).toBe("floor");
  });

  it("keeps manual Done distinct from automatic Covered", () => {
    const plan = buildMinimumWinPlan(createBlankTodayState(), "2026-07-29");
    const manual = updateMinimumWin(plan, plan.wins[0].id, "manual-done");
    expect(manual.wins[0].status).toBe("manual-done");
    expect(manual.wins[0].proofSource).toBe("manual confirmation");

    const move: MoveRecord = {
      id: "synthetic-move",
      candidateId: "readiness-ladder",
      family: plan.wins[0].family,
      lane: "protect",
      title: "Synthetic completed command",
      context: "home",
      status: "completed",
      startedAt: "2026-07-29T12:00:00.000Z",
      updatedAt: "2026-07-29T12:05:00.000Z",
      completedAt: "2026-07-29T12:05:00.000Z"
    };
    const covered = coverMinimumWinsFromMove(plan, move);
    expect(covered.wins[0].status).toBe("covered");
    expect(covered.wins[0].coveredByMoveId).toBe(move.id);
    expect(removeMoveCoverage(covered, move.id).wins[0].status).toBe("open");
  });

  it("does not auto-complete a win from an unrelated action", () => {
    const plan = buildMinimumWinPlan(createBlankTodayState(), "2026-07-29");
    const unrelated: MoveRecord = {
      id: "unrelated",
      candidateId: "unrelated",
      family: "unrelated",
      lane: "protect",
      title: "Unrelated checkbox",
      context: "home",
      status: "completed",
      startedAt: "2026-07-29T12:00:00.000Z",
      updatedAt: "2026-07-29T12:05:00.000Z",
      completedAt: "2026-07-29T12:05:00.000Z"
    };
    expect(coverMinimumWinsFromMove(plan, unrelated)).toEqual(plan);
  });
});
