import { describe, expect, it } from "vitest";
import { createBlankAppState, type AppState } from "../state/model";
import { MemoryIndexedStateStore, MemoryKeyValueStore } from "./adapters";
import { fullBackupJson, prepareBackupText } from "./fullBackup";
import { INDEXED_DB_KEYS, STORAGE_KEYS } from "./keys";
import { VerifiedRestoreCoordinator } from "./verifiedRestore";

class FailNextPutStore extends MemoryIndexedStateStore {
  failNextActivePut = false;

  override async put<T>(key: string, value: T): Promise<void> {
    if (this.failNextActivePut && key === INDEXED_DB_KEYS.active) {
      this.failNextActivePut = false;
      throw new Error("Synthetic IndexedDB failure.");
    }
    await super.put(key, value);
  }
}

function stateWithDay(date: string, note: string): AppState {
  const state = createBlankAppState();
  state.days[date] = {
    _updatedAt: `${date}T12:00:00.000Z`,
    note
  };
  state._inputUpdatedAt = `${date}T12:00:00.000Z`;
  return state;
}

describe("verified restore transaction", () => {
  it("cancel performs zero durable writes", async () => {
    const local = new MemoryKeyValueStore({ untouched: "yes" });
    const indexed = new MemoryIndexedStateStore();
    const current = stateWithDay("2043-01-01", "current");
    const prepared = await prepareBackupText(await fullBackupJson(stateWithDay("2043-01-02", "new")));
    const coordinator = new VerifiedRestoreCoordinator(local, indexed);

    const beforeLocal = local.snapshot();
    const beforeIndexed = indexed.snapshot();
    const result = await coordinator.execute(prepared, "cancel", current);

    expect(result.status).toBe("cancelled");
    expect(local.snapshot()).toEqual(beforeLocal);
    expect(indexed.snapshot()).toEqual(beforeIndexed);
  });

  it("replace dual-writes, verifies, and completes only after boot verification", async () => {
    const local = new MemoryKeyValueStore();
    const indexed = new MemoryIndexedStateStore();
    const current = stateWithDay("2043-02-01", "current");
    const imported = stateWithDay("2043-02-02", "replacement");
    const prepared = await prepareBackupText(await fullBackupJson(imported));
    let active = current;
    const coordinator = new VerifiedRestoreCoordinator(local, indexed, (state) => {
      active = state;
    });

    const result = await coordinator.execute(prepared, "replace", current);
    expect(result.status).toBe("pending-reload-verification");
    expect(Object.keys(active.days)).toEqual(["2043-02-02"]);
    expect(local.getItem(STORAGE_KEYS.restorePending)).not.toBeNull();

    const verified = await coordinator.verifyPendingOnBoot();
    expect(Object.keys(verified?.days ?? {})).toEqual(["2043-02-02"]);
    expect(local.getItem(STORAGE_KEYS.restorePending)).toBeNull();
    expect(local.getItem(STORAGE_KEYS.restoreSession)).toBeNull();
  });

  it("merge preserves trusted and imported history", async () => {
    const local = new MemoryKeyValueStore();
    const indexed = new MemoryIndexedStateStore();
    const current = stateWithDay("2043-03-01", "current");
    const imported = stateWithDay("2043-03-02", "imported");
    const prepared = await prepareBackupText(await fullBackupJson(imported));
    const coordinator = new VerifiedRestoreCoordinator(local, indexed);

    const result = await coordinator.execute(prepared, "merge", current);
    expect(Object.keys(result.state.days)).toEqual(["2043-03-01", "2043-03-02"]);
  });

  it("rolls both stores back exactly when the second durable write fails", async () => {
    const current = stateWithDay("2043-04-01", "current");
    const exactPrimary = JSON.stringify(current);
    const local = new MemoryKeyValueStore({ [STORAGE_KEYS.primary]: exactPrimary });
    const indexed = new FailNextPutStore();
    await indexed.put(INDEXED_DB_KEYS.active, current);
    const exactIndexed = indexed.snapshot();
    const prepared = await prepareBackupText(
      await fullBackupJson(stateWithDay("2043-04-02", "replacement"))
    );
    const coordinator = new VerifiedRestoreCoordinator(local, indexed);
    indexed.failNextActivePut = true;

    await expect(coordinator.execute(prepared, "replace", current)).rejects.toThrow(
      "Synthetic IndexedDB failure"
    );

    expect(local.getItem(STORAGE_KEYS.primary)).toBe(exactPrimary);
    expect(indexed.snapshot()).toEqual(exactIndexed);
    expect(local.getItem(STORAGE_KEYS.restorePending)).toBeNull();
  });
});
