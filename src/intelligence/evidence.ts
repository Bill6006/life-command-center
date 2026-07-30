import type {
  ForecastContext,
  ForecastContextInput,
  ForecastPeriod,
  ForecastSignalId,
  ForecastSignals,
  QualifiedSignal
} from "./types";
import { FORECAST_SIGNAL_IDS } from "./types";

const KNOWN_SOURCES = new Set(["explicit-false", "logged", "auto-observed", "inferred", "trusted"]);

export function qualifySignal(
  input: Partial<QualifiedSignal> | number | null | undefined
): QualifiedSignal {
  if (typeof input === "number" && Number.isFinite(input)) {
    return { value: input, source: "logged", known: true };
  }
  if (!input || typeof input !== "object") {
    return { value: null, source: "unknown", known: false };
  }
  const source = KNOWN_SOURCES.has(String(input.source))
    ? (input.source as QualifiedSignal["source"])
    : "unknown";
  const value =
    typeof input.value === "number" && Number.isFinite(input.value) ? input.value : null;
  return {
    value,
    source,
    known: value !== null && source !== "unknown"
  };
}

export function periodForMinute(minuteOfDay: number): ForecastPeriod {
  if (minuteOfDay >= 300 && minuteOfDay < 720) return "morning";
  if (minuteOfDay >= 720 && minuteOfDay < 1020) return "afternoon";
  return "evening";
}

function buildSignals(
  input: ForecastContextInput["signals"]
): ForecastSignals {
  return Object.fromEntries(
    FORECAST_SIGNAL_IDS.map((id: ForecastSignalId) => [id, qualifySignal(input?.[id])])
  ) as ForecastSignals;
}

export function buildForecastContext(input: ForecastContextInput): ForecastContext {
  const minuteOfDay = input.now.getHours() * 60 + input.now.getMinutes();
  return {
    version: "forecast-context-v1",
    dateKey: input.dateKey,
    nowIso: input.now.toISOString(),
    minuteOfDay,
    period: periodForMinute(minuteOfDay),
    place: input.place,
    availableMinutes:
      typeof input.availableMinutes === "number" ? Math.max(0, input.availableMinutes) : null,
    privacyAvailable:
      typeof input.privacyAvailable === "boolean" ? input.privacyAvailable : null,
    needFood: typeof input.needFood === "boolean" ? input.needFood : null,
    recoveryRisk: qualifySignal(input.recoveryRisk),
    signals: buildSignals(input.signals),
    protectiveCount: Math.max(0, Math.trunc(input.protectiveCount ?? 0)),
    riskCount: Math.max(0, Math.trunc(input.riskCount ?? 0)),
    effectiveEvidenceDays: Math.max(0, Math.trunc(input.effectiveEvidenceDays ?? 0)),
    completedCandidateIds: [...(input.completedCandidateIds ?? [])],
    completedFamilies: [...(input.completedFamilies ?? [])],
    activeFamilies: [...(input.activeFamilies ?? [])],
    dismissedCandidateIds: [...(input.dismissedCandidateIds ?? [])],
    constraints: structuredClone(input.constraints ?? []),
    weeklyFocus: input.weeklyFocus ?? null
  };
}
