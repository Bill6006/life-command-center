import {
  cloneState,
  isUnknownRecord,
  type AppState,
  type DayRecord,
  type UnknownRecord
} from "../../state/model";
import type {
  DomainFieldPrimitive,
  DomainFieldRecord,
  DomainFieldScope,
  DomainId,
  DomainStorageKey,
  WorkWinRecord
} from "./types";

const EMPTY_FIELD: DomainFieldRecord = {
  value: null,
  evidenceState: "unknown"
};

function phase7Record(value: unknown): UnknownRecord {
  if (!isUnknownRecord(value)) return {};
  return isUnknownRecord(value.phase7) ? value.phase7 : {};
}

function fieldsRecord(value: unknown): UnknownRecord {
  const phase7 = phase7Record(value);
  return isUnknownRecord(phase7.fields) ? phase7.fields : {};
}

export function parseDomainField(value: unknown): DomainFieldRecord {
  if (!isUnknownRecord(value)) return EMPTY_FIELD;
  const primitive = value.value;
  const validPrimitive =
    primitive === null ||
    typeof primitive === "boolean" ||
    typeof primitive === "number" ||
    typeof primitive === "string";
  const evidenceState = [
    "unknown",
    "explicit-false",
    "logged",
    "auto-observed",
    "inferred",
    "trusted"
  ].includes(String(value.evidenceState))
    ? (value.evidenceState as DomainFieldRecord["evidenceState"])
    : "unknown";
  return {
    value: validPrimitive ? primitive : null,
    evidenceState,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : undefined
  };
}

function dayDomainRoot(state: AppState, dateKey: string, domain: DomainId): UnknownRecord {
  const day = state.days[dateKey];
  if (!isUnknownRecord(day?.domainCheckIns)) return {};
  return isUnknownRecord(day.domainCheckIns[domain]) ? day.domainCheckIns[domain] : {};
}

export function readDomainField(
  state: AppState,
  dateKey: string,
  domain: DomainId,
  storageKey: DomainStorageKey,
  scope: DomainFieldScope,
  fieldId: string
): DomainFieldRecord {
  const owner =
    scope === "day" ? dayDomainRoot(state, dateKey, domain) : state.domains[storageKey];
  return parseDomainField(fieldsRecord(owner)[fieldId]);
}

function fieldEvidence(value: DomainFieldPrimitive): DomainFieldRecord["evidenceState"] {
  if (value === null || value === "") return "unknown";
  if (value === false) return "explicit-false";
  return "logged";
}

export function writeDomainField(
  state: AppState,
  input: {
    dateKey: string;
    domain: DomainId;
    storageKey: DomainStorageKey;
    scope: DomainFieldScope;
    fieldId: string;
    value: DomainFieldPrimitive;
    now?: Date;
  }
) {
  const timestamp = (input.now ?? new Date()).toISOString();
  const nextField: DomainFieldRecord = {
    value: input.value,
    evidenceState: fieldEvidence(input.value),
    updatedAt: timestamp
  };

  if (input.scope === "day") {
    const existingDay: DayRecord = state.days[input.dateKey] ?? {};
    const existingCheckIns = isUnknownRecord(existingDay.domainCheckIns)
      ? existingDay.domainCheckIns
      : {};
    const domainCandidate = existingCheckIns[input.domain];
    const existingDomain: UnknownRecord = isUnknownRecord(domainCandidate)
      ? domainCandidate
      : {};
    const existingPhase7 = phase7Record(existingDomain);
    const fields = fieldsRecord(existingDomain);
    state.days[input.dateKey] = {
      ...existingDay,
      domainCheckIns: {
        ...existingCheckIns,
        [input.domain]: {
          ...existingDomain,
          phase7: {
            ...existingPhase7,
            fields: {
              ...fields,
              [input.fieldId]: nextField
            }
          }
        }
      },
      _inputUpdatedAt: timestamp,
      _updatedAt: timestamp
    };
    return;
  }

  const existingDomain = isUnknownRecord(state.domains[input.storageKey])
    ? state.domains[input.storageKey]
    : {};
  const existingPhase7 = phase7Record(existingDomain);
  const fields = fieldsRecord(existingDomain);
  state.domains[input.storageKey] = {
    ...existingDomain,
    phase7: {
      ...existingPhase7,
      fields: {
        ...fields,
        [input.fieldId]: nextField
      }
    }
  };
  state._domainUpdatedAt[input.storageKey] = timestamp;
}

export function domainEvidenceSummary(
  state: AppState,
  dateKey: string,
  domain: DomainId,
  storageKey: DomainStorageKey,
  fieldIds: readonly { id: string; scope: DomainFieldScope }[]
) {
  const records = fieldIds.map((field) =>
    readDomainField(state, dateKey, domain, storageKey, field.scope, field.id)
  );
  const known = records.filter((field) => field.evidenceState !== "unknown").length;
  return {
    known,
    total: records.length,
    label: known === 0 ? "Blank by design" : `${known} of ${records.length} inputs logged`
  };
}

export function readPhase7Domain(state: AppState, storageKey: DomainStorageKey): UnknownRecord {
  return phase7Record(state.domains[storageKey]);
}

export function writePhase7DomainValue(
  state: AppState,
  storageKey: DomainStorageKey,
  key: string,
  value: unknown,
  now = new Date()
) {
  const timestamp = now.toISOString();
  const existingDomain = isUnknownRecord(state.domains[storageKey])
    ? state.domains[storageKey]
    : {};
  const existingPhase7 = phase7Record(existingDomain);
  state.domains[storageKey] = {
    ...existingDomain,
    phase7: {
      ...existingPhase7,
      [key]: cloneState(value)
    }
  };
  state._domainUpdatedAt[storageKey] = timestamp;
}

function bounded(value: unknown, maximum = 2400) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export function parseWorkWins(value: unknown): WorkWinRecord[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!isUnknownRecord(item) || typeof item.id !== "string") return [];
    const evidenceStatus = ["unverified", "observed", "verified"].includes(
      String(item.evidenceStatus)
    )
      ? (item.evidenceStatus as WorkWinRecord["evidenceStatus"])
      : "unverified";
    const status = item.status === "complete" ? "complete" : "draft";
    return [
      {
        id: item.id,
        technology: bounded(item.technology, 160),
        issue: bounded(item.issue),
        action: bounded(item.action),
        result: bounded(item.result),
        evidenceStatus,
        sensitive: item.sensitive !== false,
        status,
        createdAt: bounded(item.createdAt, 64),
        updatedAt: bounded(item.updatedAt, 64)
      }
    ];
  });
}

export function readWorkWins(state: AppState): WorkWinRecord[] {
  return parseWorkWins(readPhase7Domain(state, "azure").workWins);
}

export function addWorkWin(state: AppState, record: WorkWinRecord) {
  const wins = readWorkWins(state);
  writePhase7DomainValue(state, "azure", "workWins", [...wins, cloneState(record)]);
}

export function sanitizedWorkWin(record: WorkWinRecord) {
  return {
    id: record.id,
    technology: record.technology,
    action: record.action,
    result: record.sensitive ? "" : record.result,
    evidenceStatus: record.evidenceStatus,
    status: record.status
  };
}

export function sevenDayMovementRates(state: AppState, dateKey: string) {
  const dateKeys = Object.keys(state.days)
    .filter((key) => key <= dateKey)
    .sort()
    .slice(-7);
  let movement = 0;
  let movementDays = 0;
  let starter = 0;
  let recovery = 0;
  let levelDays = 0;
  for (const key of dateKeys) {
    const completed = readDomainField(
      state,
      key,
      "health",
      "health",
      "day",
      "movementCompleted"
    );
    const level = readDomainField(
      state,
      key,
      "health",
      "health",
      "day",
      "movementLevel"
    );
    if (completed.evidenceState !== "unknown") {
      movementDays += 1;
      if (completed.value === true) movement += 1;
    }
    if (level.evidenceState !== "unknown") {
      levelDays += 1;
      if (level.value === "starter" || level.value === "planned") starter += 1;
      if (level.value === "recovery" || level.value === "micro") recovery += 1;
    }
  }
  const rate = (value: number, denominator: number) =>
    denominator ? Math.round((value / denominator) * 100) : null;
  return {
    days: Math.max(movementDays, levelDays),
    movement: rate(movement, movementDays),
    starter: rate(starter, levelDays),
    lift: rate(movement, movementDays),
    recovery: rate(recovery, levelDays)
  };
}
