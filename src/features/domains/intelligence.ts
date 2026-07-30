import {
  buildIntelligenceProjection,
  resolveWeeklyFocus,
  weekKeyForDate,
  type ForecastContextInput,
  type QualifiedSignal,
  type WeeklyFocusRecord
} from "../../intelligence";
import { isUnknownRecord, type AppState } from "../../state/model";
import { parseTodayState } from "../today/types";
import { readDomainField, readPhase7Domain } from "./state";
import type { DomainId, DomainStorageKey } from "./types";

function qualifiedNumber(
  state: AppState,
  dateKey: string,
  domain: DomainId,
  storageKey: DomainStorageKey,
  fieldId: string
): QualifiedSignal | undefined {
  const field = readDomainField(state, dateKey, domain, storageKey, "day", fieldId);
  if (typeof field.value !== "number" || field.evidenceState === "unknown") return undefined;
  return {
    value: field.value,
    source: field.evidenceState,
    known: true
  };
}

function firstQualified(...signals: Array<QualifiedSignal | undefined>) {
  return signals.find(Boolean);
}

export function parseWeeklyFocusRecords(value: unknown): WeeklyFocusRecord[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!isUnknownRecord(entry)) return [];
    if (
      typeof entry.weekKey !== "string" ||
      typeof entry.confirmedAt !== "string" ||
      ![
        "career",
        "body-training",
        "money",
        "home",
        "presence-social",
        "faith-meaning",
        "recovery"
      ].includes(String(entry.selected))
    ) {
      return [];
    }
    return [
      {
        weekKey: entry.weekKey,
        selected: entry.selected as WeeklyFocusRecord["selected"],
        confirmedAt: entry.confirmedAt
      }
    ];
  });
}

export function weeklyFocusRecords(state: AppState) {
  return parseWeeklyFocusRecords(readPhase7Domain(state, "weeklyAnchors").weeklyFocusRecords);
}

function effectiveEvidenceDays(state: AppState, dateKey: string) {
  return Object.keys(state.days)
    .filter((key) => key <= dateKey)
    .filter((key) => {
      const day = state.days[key];
      if (!isUnknownRecord(day.domainCheckIns)) return false;
      return Object.values(day.domainCheckIns).some((domain) => {
        if (!isUnknownRecord(domain) || !isUnknownRecord(domain.phase7)) return false;
        if (!isUnknownRecord(domain.phase7.fields)) return false;
        return Object.values(domain.phase7.fields).some(
          (field) => isUnknownRecord(field) && field.evidenceState !== "unknown"
        );
      });
    }).length;
}

export function buildStateIntelligenceProjection(
  state: AppState,
  dateKey: string,
  now = new Date()
) {
  const today = parseTodayState(state.days[dateKey]?.today);
  const records = weeklyFocusRecords(state);
  const focus = resolveWeeklyFocus(records, weekKeyForDate(now));
  const completed = today.moveHistory.filter((move) => move.status === "completed");
  const input: ForecastContextInput = {
    dateKey,
    now,
    place: today.context,
    signals: {
      energy: firstQualified(
        qualifiedNumber(state, dateKey, "health", "health", "energy"),
        qualifiedNumber(state, dateKey, "pattern", "pattern", "energy")
      ),
      mood: firstQualified(
        qualifiedNumber(state, dateKey, "therapy", "therapy", "mood"),
        qualifiedNumber(state, dateKey, "pattern", "pattern", "mood")
      ),
      focus: qualifiedNumber(state, dateKey, "azure", "azure", "focus"),
      drive: qualifiedNumber(state, dateKey, "azure", "azure", "drive"),
      irritability: qualifiedNumber(
        state,
        dateKey,
        "therapy",
        "therapy",
        "irritability"
      ),
      overwhelm: qualifiedNumber(state, dateKey, "therapy", "therapy", "overwhelm"),
      sleepHours: firstQualified(
        qualifiedNumber(state, dateKey, "pattern", "pattern", "sleepHours"),
        qualifiedNumber(state, dateKey, "health", "health", "sleepHours")
      )
    },
    recoveryRisk: qualifiedNumber(state, dateKey, "health", "health", "recoveryRisk"),
    protectiveCount: Object.values(today.evidence).filter((entry) => entry.value === 2).length,
    riskCount: Object.values(today.evidence).filter((entry) => entry.value === 0).length,
    effectiveEvidenceDays: effectiveEvidenceDays(state, dateKey),
    completedCandidateIds: completed.map((move) => move.candidateId),
    completedFamilies: completed.map((move) => move.family),
    activeFamilies: today.activeMove ? [today.activeMove.family] : [],
    dismissedCandidateIds: today.dismissedCandidateIds,
    constraints: today.constraints,
    weeklyFocus: focus.selected
  };
  return buildIntelligenceProjection(input);
}
