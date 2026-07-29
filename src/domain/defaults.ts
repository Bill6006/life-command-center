export const APP_TIME_ZONE = "America/New_York";
export const APP_TIME_ZONE_LABEL = "Eastern Time";

export interface BlankShellState {
  schemaVersion: "phase2-blank-shell";
  settings: {
    activeTab: "today";
    dayRolloverMode: "after_sleep_4am";
    timeZone: typeof APP_TIME_ZONE;
    timeZoneLabel: typeof APP_TIME_ZONE_LABEL;
  };
  days: Record<string, never>;
  domains: Record<string, never>;
  logs: never[];
}

export function createBlankShellState(): BlankShellState {
  return {
    schemaVersion: "phase2-blank-shell",
    settings: {
      activeTab: "today",
      dayRolloverMode: "after_sleep_4am",
      timeZone: APP_TIME_ZONE,
      timeZoneLabel: APP_TIME_ZONE_LABEL
    },
    days: {},
    domains: {},
    logs: []
  };
}
