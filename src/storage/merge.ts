import {
  cloneState,
  isUnknownRecord,
  type AppState,
  type DayRecord,
  type UnknownRecord
} from "../state/model";
import { migrateState } from "../state/migrations";

function timestamp(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function maxTimestamp(...values: unknown[]): string | undefined {
  const newest = Math.max(...values.map(timestamp));
  return newest > 0 ? new Date(newest).toISOString() : undefined;
}

function deepMerge(older: unknown, newer: unknown): unknown {
  if (!isUnknownRecord(older) || !isUnknownRecord(newer)) {
    return cloneState(newer === undefined ? older : newer);
  }
  const result: UnknownRecord = cloneState(older);
  for (const [key, value] of Object.entries(newer)) {
    result[key] = key in result ? deepMerge(result[key], value) : cloneState(value);
  }
  return result;
}

export function dayContentStamp(day: DayRecord): number {
  const stamps = [
    day._inputUpdatedAt,
    day._updatedAt,
    day.updatedAt,
    day.completedAt,
    day.dailySnapshot && isUnknownRecord(day.dailySnapshot)
      ? day.dailySnapshot.capturedAt
      : undefined
  ];
  for (const value of Object.values(day)) {
    if (isUnknownRecord(value)) {
      stamps.push(value._updatedAt, value.updatedAt, value.completedAt);
    }
  }
  return Math.max(0, ...stamps.map(timestamp));
}

function guideCompletionStamp(value: unknown): number {
  if (!isUnknownRecord(value)) return 0;
  return Math.max(
    timestamp(value.completedAt),
    timestamp(value.updatedAt),
    timestamp(value.completionTimestamp)
  );
}

function mergeGuides(trusted: unknown, incoming: unknown): UnknownRecord {
  const left = isUnknownRecord(trusted) ? trusted : {};
  const right = isUnknownRecord(incoming) ? incoming : {};
  const merged: UnknownRecord = {};
  for (const key of new Set([...Object.keys(left), ...Object.keys(right)])) {
    const leftValue = left[key];
    const rightValue = right[key];
    const newer =
      guideCompletionStamp(rightValue) >= guideCompletionStamp(leftValue)
        ? rightValue
        : leftValue;
    const older = newer === rightValue ? leftValue : rightValue;
    merged[key] = deepMerge(older, newer);
  }
  return merged;
}

function domainStamp(state: AppState, key: string): number {
  const domain = state.domains[key];
  return Math.max(
    timestamp(state._domainUpdatedAt[key]),
    isUnknownRecord(domain) ? timestamp(domain._updatedAt) : 0
  );
}

export function meaningfulStateStamp(state: AppState): number {
  const dayStamps = Object.values(state.days).map(dayContentStamp);
  const domainStamps = Object.keys(state.domains).map((key) => domainStamp(state, key));
  const guideStamps = Object.values(state.settings.guides ?? {}).map(guideCompletionStamp);
  return Math.max(
    0,
    timestamp(state._inputUpdatedAt),
    ...dayStamps,
    ...domainStamps,
    ...guideStamps
  );
}

export function stateMeaningScore(state: AppState): number {
  const dayCount = Object.keys(state.days).length;
  const domainFields = Object.values(state.domains).reduce<number>(
    (total, domain) => total + (isUnknownRecord(domain) ? Object.keys(domain).length : 0),
    0
  );
  const guideCount = Object.keys(state.settings.guides ?? {}).length;
  return dayCount * 1_000 + domainFields * 10 + guideCount;
}

export function mergeStates(trustedInput: AppState, incomingInput: AppState): AppState {
  const trusted = migrateState(trustedInput);
  const incoming = migrateState(incomingInput);
  const incomingIsNewer = meaningfulStateStamp(incoming) >= meaningfulStateStamp(trusted);
  const older = incomingIsNewer ? trusted : incoming;
  const newer = incomingIsNewer ? incoming : trusted;
  const result = deepMerge(older, newer) as AppState;

  result.days = {};
  for (const date of new Set([...Object.keys(trusted.days), ...Object.keys(incoming.days)])) {
    const left = trusted.days[date];
    const right = incoming.days[date];
    if (!left) result.days[date] = cloneState(right);
    else if (!right) result.days[date] = cloneState(left);
    else {
      const rightIsNewer = dayContentStamp(right) >= dayContentStamp(left);
      result.days[date] = deepMerge(
        rightIsNewer ? left : right,
        rightIsNewer ? right : left
      ) as DayRecord;
    }
  }

  result.domains = deepMerge(trusted.domains, incoming.domains) as AppState["domains"];
  result._domainUpdatedAt = {
    ...trusted._domainUpdatedAt,
    ...incoming._domainUpdatedAt
  };
  for (const key of new Set([...Object.keys(trusted.domains), ...Object.keys(incoming.domains)])) {
    const left = trusted.domains[key];
    const right = incoming.domains[key];
    if (!isUnknownRecord(left)) result.domains[key] = cloneState(right);
    else if (!isUnknownRecord(right)) result.domains[key] = cloneState(left);
    else {
      const rightIsNewer = domainStamp(incoming, key) >= domainStamp(trusted, key);
      result.domains[key] = deepMerge(
        rightIsNewer ? left : right,
        rightIsNewer ? right : left
      ) as UnknownRecord;
    }
    const domainUpdatedAt = maxTimestamp(
      trusted._domainUpdatedAt[key],
      incoming._domainUpdatedAt[key]
    );
    if (domainUpdatedAt) result._domainUpdatedAt[key] = domainUpdatedAt;
  }

  result.settings = deepMerge(trusted.settings, incoming.settings) as AppState["settings"];
  result.settings.guides = mergeGuides(trusted.settings.guides, incoming.settings.guides);
  result._inputUpdatedAt = maxTimestamp(trusted._inputUpdatedAt, incoming._inputUpdatedAt);

  const logMap = new Map<string, unknown>();
  for (const entry of [...trusted.logs, ...incoming.logs]) {
    logMap.set(JSON.stringify(entry), cloneState(entry));
  }
  result.logs = [...logMap.values()].slice(-500);

  return migrateState(result);
}

export interface RecoveryCandidate {
  source: string;
  state: AppState;
}

export function rankRecoveryCandidates(candidates: RecoveryCandidate[]): RecoveryCandidate[] {
  return candidates
    .map((candidate) => ({ ...candidate, state: migrateState(candidate.state) }))
    .sort((a, b) => {
      const stampDifference = meaningfulStateStamp(b.state) - meaningfulStateStamp(a.state);
      if (stampDifference !== 0) return stampDifference;
      return stateMeaningScore(b.state) - stateMeaningScore(a.state);
    });
}

export function mergeRecoveryCandidates(candidates: RecoveryCandidate[]): AppState | null {
  const ranked = rankRecoveryCandidates(candidates);
  if (ranked.length === 0) return null;
  return ranked
    .slice(1)
    .reverse()
    .reduce((state, candidate) => mergeStates(state, candidate.state), ranked[0].state);
}
