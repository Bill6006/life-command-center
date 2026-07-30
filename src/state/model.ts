export const CURRENT_SCHEMA_VERSION = "v1-modular-storage";
export const LEGACY_SCHEMA_VERSION = "v289-phase64s-verified-restore-foundation";
export const APP_TIME_ZONE = "America/New_York";
export const APP_TIME_ZONE_LABEL = "Eastern Time";

export type UnknownRecord = Record<string, unknown>;

export interface AppSettings extends UnknownRecord {
  activeTab: string;
  dayRolloverMode: string;
  timeZone: string;
  timeZoneLabel: string;
  guides: UnknownRecord;
}

export interface DayRecord extends UnknownRecord {
  _updatedAt?: string;
  _inputUpdatedAt?: string;
  _logged?: UnknownRecord;
  forecastActions?: unknown[];
  minimumWins?: unknown[];
}

export interface DomainState extends UnknownRecord {
  azure: UnknownRecord;
  learning: UnknownRecord;
  money: UnknownRecord;
  childGrowth: UnknownRecord;
  faith: UnknownRecord;
  health: UnknownRecord;
  pattern: UnknownRecord;
  social: UnknownRecord;
  therapy: UnknownRecord;
  vision: UnknownRecord;
  environment: UnknownRecord;
  weeklyAnchors: UnknownRecord;
}

export interface AppState extends UnknownRecord {
  schemaVersion: string;
  settings: AppSettings;
  days: Record<string, DayRecord>;
  domains: DomainState;
  logs: unknown[];
  _domainUpdatedAt: Record<string, string>;
  _savedAt?: string;
  _inputUpdatedAt?: string;
}

export function createBlankAppState(): AppState {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    settings: {
      activeTab: "today",
      dayRolloverMode: "after_sleep_4am",
      timeZone: APP_TIME_ZONE,
      timeZoneLabel: APP_TIME_ZONE_LABEL,
      guides: {}
    },
    days: {},
    domains: {
      azure: {},
      learning: {},
      money: {},
      childGrowth: {},
      faith: {},
      health: {},
      pattern: {},
      social: {},
      therapy: {},
      vision: {},
      environment: {},
      weeklyAnchors: {}
    },
    logs: [],
    _domainUpdatedAt: {}
  };
}

export function isUnknownRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function cloneState<T>(value: T): T {
  return structuredClone(value);
}
