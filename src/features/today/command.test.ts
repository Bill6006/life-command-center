import { describe, expect, it } from "vitest";
import { buildTodayCommand, MOVE_LIBRARY, rankMoveCandidates } from "./command";
import { createBlankTodayState } from "./types";

describe("Today Command", () => {
  it("changes to a non-interactive safety command while driving", () => {
    const today = createBlankTodayState();
    const home = buildTodayCommand(today);
    today.context = "driving";
    const driving = buildTodayCommand(today);
    expect(driving.candidateId).toBe("safe-driving-reset");
    expect(driving.safetyNote).toContain("Do not interact");
    expect(driving.candidateId).not.toBe(home.candidateId);
  });

  it("keeps missing readiness conservative and no-shame", () => {
    const command = buildTodayCommand(createBlankTodayState());
    expect(command.readinessBand).toBe("unknown");
    expect(command.confidence).toBe("low");
    expect(command.reasons.join(" ")).toContain("incomplete");
  });

  it("contains exactly one movement-readiness feature and no exercise prescription", () => {
    const movement = MOVE_LIBRARY.filter((candidate) => candidate.isMovementReadiness);
    expect(movement).toHaveLength(1);
    expect(movement[0].instruction).toContain("Fitbod owns exact programming");
    expect(MOVE_LIBRARY.map((candidate) => candidate.instruction).join(" ")).not.toMatch(
      /\b(?:sets|reps|dumbbell|barbell)\b/i
    );
  });

  it("filters active same-context constraints without learning a negative outcome", () => {
    const today = createBlankTodayState();
    const first = rankMoveCandidates(today, new Date("2026-07-29T12:00:00.000Z"))[0];
    today.constraints.push({
      id: "synthetic-constraint",
      candidateId: first.id,
      family: first.family,
      reason: "not-enough-time",
      context: "home",
      createdAt: "2026-07-29T12:00:00.000Z",
      expiresAt: "2026-07-29T14:00:00.000Z"
    });
    const ranked = rankMoveCandidates(today, new Date("2026-07-29T12:01:00.000Z"));
    expect(ranked.map((candidate) => candidate.id)).not.toContain(first.id);
  });

  it("is byte-stable for the same input and clock", () => {
    const today = createBlankTodayState();
    today.context = "work";
    const now = new Date("2026-07-29T15:00:00.000Z");
    expect(JSON.stringify(buildTodayCommand(today, now))).toBe(
      JSON.stringify(buildTodayCommand(today, now))
    );
  });
});
