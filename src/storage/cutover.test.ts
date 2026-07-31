import { describe, expect, it } from "vitest";
import { createBlankAppState, type AppState } from "../state/model";
import {
  MemoryIndexedStateStore,
  MemoryKeyValueStore,
  type KeyValueStore
} from "./adapters";
import {
  canonicalRestoreSignature,
  storageJson
} from "./canonical";
import { StorageCoordinator } from "./coordinator";
import { buildFullBackup, prepareBackupText } from "./fullBackup";
import { INDEXED_DB_KEYS, STORAGE_KEYS } from "./keys";
import { VerifiedRestoreCoordinator } from "./verifiedRestore";

class QuotaKeyValueStore implements KeyValueStore {
  private readonly values = new Map<string, string>();

  constructor(private readonly maximumCharacters: number) {}

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    const next = new Map(this.values);
    next.set(key, value);
    const characters = [...next].reduce(
      (total, [entryKey, entryValue]) =>
        total + entryKey.length + entryValue.length,
      0
    );
    if (characters > this.maximumCharacters) {
      throw new DOMException("Synthetic localStorage quota exceeded.", "QuotaExceededError");
    }
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  keys() {
    return [...this.values.keys()];
  }
}

describe("synthetic cutover rehearsal", () => {
  it("preserves day count and canonical signature through Replace and reload", async () => {
    const source = createBlankAppState();
    for (const date of ["2046-01-01", "2046-01-02", "2046-01-03"]) {
      source.days[date] = {
        _updatedAt: `${date}T12:00:00.000Z`,
        note: `synthetic-${date}`
      };
    }
    const envelope = await buildFullBackup(source, {
      now: new Date("2046-01-04T12:00:00.000Z"),
      effectiveDate: "2046-01-04"
    });
    const prepared = await prepareBackupText(JSON.stringify(envelope));
    const coordinator = new VerifiedRestoreCoordinator(
      new MemoryKeyValueStore(),
      new MemoryIndexedStateStore()
    );

    const result = await coordinator.execute(
      prepared,
      "replace",
      createBlankAppState()
    );
    expect(result.status).toBe("pending-reload-verification");
    expect(Object.keys(result.state.days)).toHaveLength(3);
    expect(await canonicalRestoreSignature(result.state)).toBe(
      envelope.integrity.canonicalSignature
    );

    const verified = await coordinator.verifyPendingOnBoot();
    expect(Object.keys(verified?.days ?? {})).toHaveLength(3);
    expect(await canonicalRestoreSignature(verified!)).toBe(
      envelope.integrity.canonicalSignature
    );

    const postCutover = await buildFullBackup(verified!, {
      now: new Date("2046-01-04T13:00:00.000Z"),
      effectiveDate: "2046-01-04"
    });
    expect(postCutover.integrity.canonicalSignature).toBe(
      envelope.integrity.canonicalSignature
    );
  });

  it("keeps a 50-day migrated restore durable when auxiliary local copies exceed quota", async () => {
    const legacyDays: Record<string, Record<string, unknown>> = {};
    for (let day = 1; day <= 50; day += 1) {
      const date = `2046-02-${String(day).padStart(2, "0")}`;
      legacyDays[date] = {
        _updatedAt: `2046-02-01T${String(day % 24).padStart(2, "0")}:00:00.000Z`,
        note: `synthetic-day-${day}-${"x".repeat(80)}`
      };
    }
    legacyDays["2046-02-01"].minimumWins = {
      date: "2046-02-01",
      version: "today_win_library_precise_caffeine_sync_v9",
      items: [
        { id: "synthetic-win", label: "Synthetic completion" }
      ],
      status: {
        "synthetic-win": {
          status: "done",
          manual: true,
          completedAt: "2046-02-01T12:00:00.000Z"
        }
      }
    };

    const prepared = await prepareBackupText(
      JSON.stringify({
        _schemaVersion: "synthetic-legacy",
        settings: {},
        days: legacyDays
      })
    );
    const targetCharacters = storageJson(prepared.state).length;
    const local = new QuotaKeyValueStore(targetCharacters * 2 + 1_000);
    const indexed = new MemoryIndexedStateStore();
    local.setItem(STORAGE_KEYS.primary, storageJson(prepared.state));
    await indexed.put(INDEXED_DB_KEYS.active, prepared.state);
    const restore = new VerifiedRestoreCoordinator(local, indexed);

    const result = await restore.execute(
      prepared,
      "replace",
      prepared.state
    );
    expect(result.status).toBe("pending-reload-verification");
    const session = JSON.parse(
      local.getItem(STORAGE_KEYS.restoreSession) ?? "null"
    ) as { snapshotKey?: string };
    expect(session.snapshotKey).toMatch(/^pre_import::restore-/);
    expect(local.getItem(STORAGE_KEYS.restoreSession)?.length).toBeLessThan(200);
    expect(await indexed.get(session.snapshotKey as string)).not.toBeNull();

    const reopenedRestore = new VerifiedRestoreCoordinator(local, indexed);
    const verified = await reopenedRestore.verifyPendingOnBoot();
    expect(Object.keys(verified?.days ?? {})).toHaveLength(50);
    expect(await indexed.get(session.snapshotKey as string)).toBeNull();

    const autosave = new StorageCoordinator(local, indexed);
    const saved = await autosave.save(
      verified as AppState,
      new Date("2046-03-23T12:00:00.000Z")
    );
    expect(saved.recoveryCopiesComplete).toBe(false);
    expect(local.getItem(STORAGE_KEYS.lastGood)).not.toBeNull();
    expect(local.getItem(STORAGE_KEYS.sessionBackup)).toBeNull();

    const primary = JSON.parse(
      local.getItem(STORAGE_KEYS.primary) ?? "null"
    ) as AppState;
    const indexedActive = await indexed.get<AppState>(INDEXED_DB_KEYS.active);
    expect(indexedActive).not.toBeNull();
    expect(await canonicalRestoreSignature(primary)).toBe(
      await canonicalRestoreSignature(indexedActive as AppState)
    );

    const reopened = await new StorageCoordinator(local, indexed).load();
    expect(Object.keys(reopened.state.days)).toHaveLength(50);
    expect(reopened.state.days["2046-02-01"].minimumWins).toEqual([
      legacyDays["2046-02-01"].minimumWins
    ]);
  });
});
