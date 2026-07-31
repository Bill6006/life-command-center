import {
  APP_TIME_ZONE,
  APP_TIME_ZONE_LABEL,
  cloneState,
  createBlankAppState,
  CURRENT_SCHEMA_VERSION,
  isUnknownRecord,
  type AppState,
  type UnknownRecord
} from "./model";
import { appStateSchema } from "./schemas";

export interface Migration {
  id: string;
  applies: (state: UnknownRecord) => boolean;
  run: (state: UnknownRecord) => UnknownRecord;
}

const knownRootKeys = new Set([
  "schemaVersion",
  "_schemaVersion",
  "settings",
  "days",
  "domains",
  "logs",
  "_domainUpdatedAt",
  "_savedAt",
  "_inputUpdatedAt",
  "azure",
  "learning",
  "money",
  "faith",
  "health",
  "pattern",
  "social",
  "therapy",
  "vision",
  "environment",
  "weeklyAnchors",
  "theme",
  "seed"
]);

function findLegacyChildGrowth(state: UnknownRecord): UnknownRecord {
  for (const [key, value] of Object.entries(state)) {
    if (knownRootKeys.has(key) || !isUnknownRecord(value)) continue;
    const hasSkills = isUnknownRecord(value.skills);
    const hasCustomSkills = Array.isArray(value.customSkills);
    const hasWeekly = isUnknownRecord(value.weekly);
    if (hasSkills && hasCustomSkills && hasWeekly) return value;
  }
  return {};
}

function record(value: unknown): UnknownRecord {
  return isUnknownRecord(value) ? value : {};
}

function isLegacyMinimumWinsRecord(value: unknown): value is UnknownRecord {
  return isUnknownRecord(value) && Array.isArray(value.items);
}

function normalizeLegacyMinimumWins(state: UnknownRecord): UnknownRecord {
  const days = record(state.days);
  let changed = false;
  const normalizedDays: UnknownRecord = {};

  for (const [dateKey, value] of Object.entries(days)) {
    if (!isUnknownRecord(value) || !isLegacyMinimumWinsRecord(value.minimumWins)) {
      normalizedDays[dateKey] = value;
      continue;
    }

    /*
     * The protected legacy app stored one daily minimum-wins record containing
     * metadata, items, and a parallel status map. Keep that record intact as a
     * single compatibility entry: flattening its items would detach manual
     * completion and automatic coverage evidence from their keyed statuses.
     */
    normalizedDays[dateKey] = {
      ...value,
      minimumWins: [value.minimumWins]
    };
    changed = true;
  }

  return changed ? { ...state, days: normalizedDays } : state;
}

function legacyRootToDomains(state: UnknownRecord): UnknownRecord {
  const domains = record(state.domains);
  return {
    ...state,
    domains: {
      ...domains,
      azure: record(domains.azure ?? state.azure),
      learning: record(domains.learning ?? state.learning),
      money: record(domains.money ?? state.money),
      childGrowth: record(domains.childGrowth ?? findLegacyChildGrowth(state)),
      faith: record(domains.faith ?? state.faith),
      health: record(domains.health ?? state.health),
      pattern: record(domains.pattern ?? state.pattern),
      social: record(domains.social ?? state.social),
      therapy: record(domains.therapy ?? state.therapy),
      vision: record(domains.vision ?? state.vision),
      environment: record(domains.environment ?? state.environment),
      weeklyAnchors: record(domains.weeklyAnchors ?? state.weeklyAnchors)
    }
  };
}

function normalizeCurrentShape(state: UnknownRecord): UnknownRecord {
  const blank = createBlankAppState();
  const settings = record(state.settings);
  const domains = record(state.domains);
  const legacySchema =
    typeof state.schemaVersion === "string"
      ? state.schemaVersion
      : typeof state._schemaVersion === "string"
        ? state._schemaVersion
        : "legacy-unversioned";

  return {
    ...state,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    settings: {
      ...blank.settings,
      ...settings,
      activeTab: typeof settings.activeTab === "string" ? settings.activeTab : "today",
      autoBackupEnabled:
        typeof settings.autoBackupEnabled === "boolean"
          ? settings.autoBackupEnabled
          : true,
      autoBackupMinutes:
        typeof settings.autoBackupMinutes === "number" &&
        settings.autoBackupMinutes >= 5 &&
        settings.autoBackupMinutes <= 1440
          ? settings.autoBackupMinutes
          : 30,
      dayRolloverMode:
        typeof settings.dayRolloverMode === "string"
          ? settings.dayRolloverMode
          : "after_sleep_4am",
      timeZone: APP_TIME_ZONE,
      timeZoneLabel: APP_TIME_ZONE_LABEL,
      guides: record(settings.guides),
      migratedFromSchema:
        typeof settings.migratedFromSchema === "string"
          ? settings.migratedFromSchema
          : legacySchema
    },
    days: record(state.days),
    domains: {
      ...blank.domains,
      ...domains
    },
    logs: Array.isArray(state.logs) ? state.logs : [],
    _domainUpdatedAt: record(state._domainUpdatedAt)
  };
}

export const migrationRegistry: readonly Migration[] = [
  {
    id: "legacy-minimum-wins-array",
    applies: (state) =>
      Object.values(record(state.days)).some(
        (day) =>
          isUnknownRecord(day) && isLegacyMinimumWinsRecord(day.minimumWins)
      ),
    run: normalizeLegacyMinimumWins
  },
  {
    id: "legacy-root-domains",
    applies: (state) => !isUnknownRecord(state.domains),
    run: legacyRootToDomains
  },
  {
    id: "normalize-current-shape",
    applies: (state) => state.schemaVersion !== CURRENT_SCHEMA_VERSION,
    run: normalizeCurrentShape
  },
  {
    id: "repair-current-shape",
    applies: () => true,
    run: normalizeCurrentShape
  }
];

export function unwrapStateCandidate(input: unknown): unknown {
  if (!isUnknownRecord(input)) return input;
  if (isUnknownRecord(input.state)) return input.state;
  if (isUnknownRecord(input.data) && input.exportType === "Full Backup") return input.data;
  return input;
}

export function migrateState(input: unknown): AppState {
  const unwrapped = unwrapStateCandidate(input);
  if (!isUnknownRecord(unwrapped)) {
    throw new Error("State must be a JSON object.");
  }

  let state: UnknownRecord = cloneState(unwrapped);
  for (const migration of migrationRegistry) {
    if (migration.applies(state)) state = migration.run(state);
  }

  return appStateSchema.parse(state) as AppState;
}
