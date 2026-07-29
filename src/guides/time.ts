import type { ForecastWindow, GuideClockContext, GuidePeriod } from "./types";

interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: string;
}

function partsAt(now: Date, timeZone: string): ZonedParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short"
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: Number(value("year")),
    month: Number(value("month")),
    day: Number(value("day")),
    hour: Number(value("hour")) % 24,
    minute: Number(value("minute")),
    weekday: value("weekday")
  };
}

function dateKeyFromUtcDate(date: Date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0")
  ].join("-");
}

function calendarDate(parts: ZonedParts) {
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
}

export function localDateKey(now: Date, timeZone: string): string {
  return dateKeyFromUtcDate(calendarDate(partsAt(now, timeZone)));
}

export function effectiveDateKey(context: GuideClockContext): string {
  const parts = partsAt(context.now, context.timeZone);
  const date = calendarDate(parts);
  if (context.rolloverMode === "after_sleep_4am" && parts.hour < 4) {
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return dateKeyFromUtcDate(date);
}

export function guidePeriodAt(now: Date, timeZone: string): GuidePeriod {
  const { hour } = partsAt(now, timeZone);
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  return "evening";
}

export function forecastWindowAt(now: Date, timeZone: string): ForecastWindow {
  const { hour } = partsAt(now, timeZone);
  if (hour < 4) return "after-midnight";
  if (hour < 8) return "early-morning";
  if (hour < 12) return "late-morning";
  if (hour < 14) return "early-afternoon";
  if (hour < 16) return "mid-afternoon";
  if (hour < 17) return "late-afternoon";
  if (hour < 19) return "early-evening";
  if (hour < 21) return "mid-evening";
  return "late-evening";
}

export function isSaturday(now: Date, timeZone: string): boolean {
  return partsAt(now, timeZone).weekday === "Sat";
}

export function weeklyWindow(now: Date, timeZone: string): boolean {
  const { weekday, hour } = partsAt(now, timeZone);
  return (weekday === "Sun" && hour >= 17) || (weekday === "Mon" && hour < 12);
}

export function weekKey(now: Date, timeZone: string): string {
  const parts = partsAt(now, timeZone);
  const date = calendarDate(parts);
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    parts.weekday
  );
  const daysSinceMonday = (weekdayIndex + 6) % 7;
  date.setUTCDate(date.getUTCDate() - daysSinceMonday);
  return dateKeyFromUtcDate(date);
}

export function minutesSince(timestamp: string | undefined, now: Date): number {
  if (!timestamp) return Number.POSITIVE_INFINITY;
  const parsed = Date.parse(timestamp);
  return Number.isFinite(parsed) ? (now.getTime() - parsed) / 60_000 : Number.POSITIVE_INFINITY;
}
