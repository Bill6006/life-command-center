import { describe, expect, it } from "vitest";
import {
  effectiveDateKey,
  forecastWindowAt,
  guidePeriodAt,
  weekKey,
  weeklyWindow
} from "./time";

const zone = "America/New_York";
const at = (local: string) => new Date(`${local}-04:00`);

describe("guide clock boundaries", () => {
  it.each([
    ["2026-07-29T00:00:00", "evening"],
    ["2026-07-29T03:59:59", "evening"],
    ["2026-07-29T04:00:00", "evening"],
    ["2026-07-29T04:59:59", "evening"],
    ["2026-07-29T05:00:00", "morning"],
    ["2026-07-29T11:59:59", "morning"],
    ["2026-07-29T12:00:00", "afternoon"],
    ["2026-07-29T16:59:59", "afternoon"],
    ["2026-07-29T17:00:00", "evening"],
    ["2026-07-29T23:59:59", "evening"]
  ])("maps %s to %s", (value, expected) => {
    expect(guidePeriodAt(at(value), zone)).toBe(expected);
  });

  it.each([
    ["2026-07-29T00:00:00", "after-midnight"],
    ["2026-07-29T03:59:59", "after-midnight"],
    ["2026-07-29T04:00:00", "early-morning"],
    ["2026-07-29T07:59:59", "early-morning"],
    ["2026-07-29T08:00:00", "late-morning"],
    ["2026-07-29T12:00:00", "early-afternoon"],
    ["2026-07-29T14:00:00", "mid-afternoon"],
    ["2026-07-29T16:00:00", "late-afternoon"],
    ["2026-07-29T17:00:00", "early-evening"],
    ["2026-07-29T19:00:00", "mid-evening"],
    ["2026-07-29T21:00:00", "late-evening"]
  ])("maps forecast window %s to %s", (value, expected) => {
    expect(forecastWindowAt(at(value), zone)).toBe(expected);
  });

  it("uses the previous effective date until the 4 AM sleep-day boundary", () => {
    expect(
      effectiveDateKey({
        now: at("2026-07-29T03:59:59"),
        timeZone: zone,
        rolloverMode: "after_sleep_4am"
      })
    ).toBe("2026-07-28");
    expect(
      effectiveDateKey({
        now: at("2026-07-29T04:00:00"),
        timeZone: zone,
        rolloverMode: "after_sleep_4am"
      })
    ).toBe("2026-07-29");
  });

  it("keeps midnight and manual-start modes on the calendar date", () => {
    for (const rolloverMode of ["midnight", "manual_start_morning"]) {
      expect(
        effectiveDateKey({ now: at("2026-07-29T03:59:59"), timeZone: zone, rolloverMode })
      ).toBe("2026-07-29");
    }
  });

  it("opens weekly automation Sunday evening through Monday morning", () => {
    expect(weeklyWindow(at("2026-08-02T16:59:59"), zone)).toBe(false);
    expect(weeklyWindow(at("2026-08-02T17:00:00"), zone)).toBe(true);
    expect(weeklyWindow(at("2026-08-03T11:59:59"), zone)).toBe(true);
    expect(weeklyWindow(at("2026-08-03T12:00:00"), zone)).toBe(false);
    expect(weekKey(at("2026-08-02T17:00:00"), zone)).toBe("2026-07-27");
    expect(weekKey(at("2026-08-03T11:59:59"), zone)).toBe("2026-08-03");
  });
});
