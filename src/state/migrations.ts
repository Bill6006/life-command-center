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
