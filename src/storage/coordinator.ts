import { createBlankAppState, type AppState, type DayRecord } from "../state/model";
import { migrateState } from "../state/migrations";
import { stateForStorage, storageJson } from "./canonical";
import type { IndexedStateStore, KeyValueStore } from "./adapters";
import { INDEXED_DB_KEYS, isLegacyGrowthRecoveryKey, STORAGE_KEYS } from "./keys";
import {
  mergeRecoveryCandidates,
  mergeStates,
  type RecoveryCandidate
} from "./merge";

function parseState(value: string | null): AppState | null {
  if (!value) return null;
  try {
    return migrateState(JSON.parse(value));
  } catch {
    return null;
  }
}

export class StorageCoordinator {
  constructor(
    readonly local: KeyValueStore,
    readonly indexed: IndexedStateStore
  ) {}

  async load(): Promise<{ state: AppState; sources: string[]; recovered: boolean }> {
    const candidates: RecoveryCandidate[] = [];
    const add = (source: string, value: string | null) => {
      const state = parseState(value);
      if (state) candidates.push({ source, state });
    };

    add("primary", this.local.getItem(STORAGE_KEYS.primary));
    add("latest-backup", this.local.getItem(STORAGE_KEYS.latestBackup));
    add("last-good", this.local.getItem(STORAGE_KEYS.lastGood));
    add("session", this.local.getItem(STORAGE_KEYS.sessionBackup));
    add("critical", this.local.getItem(STORAGE_KEYS.criticalRecovery));

    for (const key of this.local.keys()) {
      if (isLegacyGrowthRecoveryKey(key)) add("growth-recovery", this.local.getItem(key));
      if (!key.startsWith(STORAGE_KEYS.dayCachePrefix)) continue;
      const raw = this.local.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw) as { date?: unknown; data?: unknown };
        if (typeof parsed.date !== "string" || typeof parsed.data !== "object") continue;
        const state = createBlankAppState();
        state.days[parsed.date] = parsed.data as DayRecord;
        candidates.push({ source: `day-cache:${parsed.date}`, state });
      } catch {
        // Corrupt recovery candidates are ignored in favor of readable layers.
      }
    }

    for (const [source, key] of [
      ["indexed-active", INDEXED_DB_KEYS.active],
      ["indexed-latest", INDEXED_DB_KEYS.latest],
      ["indexed-last-good", INDEXED_DB_KEYS.lastGood]
    ] as const) {
      const value = await this.indexed.get<unknown>(key);
      if (value) {
        try {
          candidates.push({ source, state: migrateState(value) });
        } catch {
          // Continue through independent layers.
        }
      }
    }

    const merged = mergeRecoveryCandidates(candidates);
    if (!merged) return { state: createBlankAppState(), sources: [], recovered: false };
    return {
      state: merged,
      sources: [...new Set(candidates.map((candidate) => candidate.source))],
      recovered: !candidates.some((candidate) => candidate.source === "primary")
    };
  }

  async save(input: AppState, now = new Date()): Promise<AppState> {
    const state = stateForStorage(migrateState(input));
    state._savedAt = now.toISOString();
    const json = storageJson(state);
    this.local.setItem(STORAGE_KEYS.primary, json);
    await this.indexed.put(INDEXED_DB_KEYS.active, state);
    this.local.setItem(STORAGE_KEYS.lastGood, json);
    this.local.setItem(STORAGE_KEYS.sessionBackup, json);
    await this.indexed.put(INDEXED_DB_KEYS.lastGood, state);
    return state;
  }

  async saveLatestBackup(input: AppState): Promise<void> {
    const state = stateForStorage(migrateState(input));
    const json = storageJson(state);
    this.local.setItem(STORAGE_KEYS.latestBackup, json);
    await this.indexed.put(INDEXED_DB_KEYS.backupLatest, state);
  }

  saveDayCache(date: string, day: DayRecord): void {
    this.local.setItem(
      `${STORAGE_KEYS.dayCachePrefix}${date}`,
      JSON.stringify({ date, data: day })
    );
    const dayKeys = this.local
      .keys()
      .filter((key) => key.startsWith(STORAGE_KEYS.dayCachePrefix))
      .sort()
      .reverse();
    for (const key of dayKeys.slice(7)) this.local.removeItem(key);
  }

  mergeWithTrusted(trusted: AppState, incoming: AppState): AppState {
    return mergeStates(trusted, incoming);
  }
}
