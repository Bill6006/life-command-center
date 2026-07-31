import { IDBFactory } from "fake-indexeddb";
import { describe, expect, it } from "vitest";
import { createBlankAppState } from "../state/model";
import {
  BrowserIndexedStateStore,
  MemoryIndexedStateStore,
  MemoryKeyValueStore
} from "./adapters";
import { storageJson } from "./canonical";
import { StorageCoordinator } from "./coordinator";
import { INDEXED_DB_KEYS, STORAGE_KEYS } from "./keys";

describe("storage adapters and recovery coordinator", () => {
  it("round-trips state through the real IndexedDB adapter contract", async () => {
    const store = new BrowserIndexedStateStore(
      new IDBFactory(),
      "synthetic-test-database",
      "state"
    );
    const state = createBlankAppState();
    state.unknownRoot = { preserved: true };

    await store.put(INDEXED_DB_KEYS.active, state);
    expect(await store.get(INDEXED_DB_KEYS.active)).toEqual(state);
    await store.delete(INDEXED_DB_KEYS.active);
    expect(await store.get(INDEXED_DB_KEYS.active)).toBeNull();
  });

  it("repairs a missing day from a newer day cache", async () => {
    const primary = createBlankAppState();
    primary.days["2044-01-01"] = { _updatedAt: "2044-01-01T12:00:00.000Z" };
    const local = new MemoryKeyValueStore({
      [STORAGE_KEYS.primary]: storageJson(primary),
      [`${STORAGE_KEYS.dayCachePrefix}2044-01-02`]: JSON.stringify({
        date: "2044-01-02",
        data: { _updatedAt: "2044-01-02T12:00:00.000Z", note: "recovered" }
      })
    });
    const coordinator = new StorageCoordinator(local, new MemoryIndexedStateStore());

    const loaded = await coordinator.load();
    expect(Object.keys(loaded.state.days).sort()).toEqual(["2044-01-01", "2044-01-02"]);
    expect(loaded.sources).toContain("day-cache:2044-01-02");
  });

  it("writes canonical primary and independently readable IndexedDB state", async () => {
    const local = new MemoryKeyValueStore();
    const indexed = new MemoryIndexedStateStore();
    const coordinator = new StorageCoordinator(local, indexed);
    const state = createBlankAppState();
    state.seed = { profile: "synthetic legacy seed" };

    const result = await coordinator.save(
      state,
      new Date("2044-02-02T12:00:00.000Z")
    );
    expect(result.recoveryCopiesComplete).toBe(true);
    expect(local.getItem(STORAGE_KEYS.primary)).not.toContain('"seed"');
    expect((await indexed.get<Record<string, unknown>>(INDEXED_DB_KEYS.active))?.seed).toBeUndefined();
  });

  it("does not report a save when the IndexedDB active copy cannot be read back", async () => {
    class MissingActiveReadStore extends MemoryIndexedStateStore {
      override async get<T>(key: string): Promise<T | null> {
        if (key === INDEXED_DB_KEYS.active) return null;
        return super.get<T>(key);
      }
    }

    const coordinator = new StorageCoordinator(
      new MemoryKeyValueStore(),
      new MissingActiveReadStore()
    );

    await expect(coordinator.save(createBlankAppState())).rejects.toThrow(
      "IndexedDB active save could not be read back exactly"
    );
  });

  it("prunes day caches to seven dates", () => {
    const local = new MemoryKeyValueStore();
    const coordinator = new StorageCoordinator(local, new MemoryIndexedStateStore());
    for (let day = 1; day <= 9; day += 1) {
      coordinator.saveDayCache(`2044-03-${String(day).padStart(2, "0")}`, {
        _updatedAt: `2044-03-${String(day).padStart(2, "0")}T12:00:00.000Z`
      });
    }

    const keys = local.keys().filter((key) => key.startsWith(STORAGE_KEYS.dayCachePrefix));
    expect(keys).toHaveLength(7);
    expect(keys.some((key) => key.endsWith("2044-03-01"))).toBe(false);
  });
});
