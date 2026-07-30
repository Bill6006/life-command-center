import { describe, expect, it } from "vitest";
import {
  confirmWeeklyFocus,
  resolveWeeklyFocus,
  suggestWeeklyFocus,
  weekKeyForDate
} from "./weeklyFocus";

describe("Weekly Growth Focus", () => {
  it("uses Monday week keys", () => {
    expect(weekKeyForDate(new Date(2026, 6, 29, 12))).toBe("2026-07-27");
  });

  it("keeps the current user choice authoritative", () => {
    const records = [
      { weekKey: "2026-07-27", selected: "career" as const, confirmedAt: "2026-07-27T12:00:00Z" }
    ];
    const resolution = resolveWeeklyFocus(records, "2026-07-27", {
      recoveryRisk: 100
    });
    expect(resolution.selected).toBe("career");
    expect(resolution.suggestion).toBe("recovery");
    expect(resolution.source).toBe("current-user-choice");
  });

  it("carries the last user choice into a new week", () => {
    const resolution = resolveWeeklyFocus(
      [{ weekKey: "2026-07-20", selected: "money", confirmedAt: "2026-07-20T12:00:00Z" }],
      "2026-07-27"
    );
    expect(resolution.selected).toBe("money");
    expect(resolution.source).toBe("carried-user-choice");
  });

  it("never promotes the suggestion into an unconfirmed choice", () => {
    const resolution = resolveWeeklyFocus([], "2026-07-27", { recoveryRisk: 100 });
    expect(resolution.selected).toBeNull();
    expect(resolution.suggestion).toBe("recovery");
  });

  it("updates only the selected week", () => {
    const next = confirmWeeklyFocus(
      [{ weekKey: "2026-07-20", selected: "home", confirmedAt: "old" }],
      "2026-07-27",
      "career",
      new Date("2026-07-27T12:00:00Z")
    );
    expect(next).toHaveLength(2);
    expect(next[1].selected).toBe("career");
  });

  it("makes suggestion ties deterministic", () => {
    expect(suggestWeeklyFocus().domain).toBe("body-training");
  });
});
