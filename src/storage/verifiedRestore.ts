import { cloneState, type AppState } from "../state/model";
import { migrateState } from "../state/migrations";
import type { IndexedStateStore, KeyValueStore } from "./adapters";
import { canonicalRestoreSignature, storageJson } from "./canonical";
import { prepareBackupText, type PreparedBackup } from "./fullBackup";
import { INDEXED_DB_KEYS, STORAGE_KEYS } from "./keys";
import { mergeStates } from "./merge";

export type RestoreMode = "replace" | "merge" | "cancel";

interface RestoreMarker {
  transactionId: string;
  expectedSignature: string;
  mode: Exclude<RestoreMode, "cancel">;
  startedAt: string;
}

interface RestoreSnapshot {
  transactionId: string;
  primary: string | null;
  indexedActive: AppState | null;
}

interface RestoreSessionReference {
  transactionId: string;
  snapshotKey: string;
}

export interface RestoreResult {
  status: "cancelled" | "pending-reload-verification";
  transactionId?: string;
  state: AppState;
}

function transactionId() {
  return `restore-${Date.now().toString(36)}-${crypto.randomUUID()}`;
}

function preImportKey(id: string) {
  return `${INDEXED_DB_KEYS.preImportPrefix}${id}`;
}

export class VerifiedRestoreCoordinator {
  constructor(
    private readonly local: KeyValueStore,
    private readonly indexed: IndexedStateStore,
    private readonly setActiveState: (state: AppState) => void = () => undefined
  ) {}

  prepare(text: string): Promise<PreparedBackup> {
    return prepareBackupText(text);
  }

  private async exactSnapshot(id: string): Promise<RestoreSnapshot> {
    return {
      transactionId: id,
      primary: this.local.getItem(STORAGE_KEYS.primary),
      indexedActive: await this.indexed.get<AppState>(INDEXED_DB_KEYS.active)
    };
  }

  private async clearTransaction(snapshotKey?: string): Promise<void> {
    if (snapshotKey) {
      try {
        await this.indexed.delete(snapshotKey);
      } catch {
        // A stale rollback snapshot is inert once both active layers verify.
      }
    }
    this.local.removeItem(STORAGE_KEYS.restorePending);
    this.local.removeItem(STORAGE_KEYS.restoreSession);
  }

  private async rollbackExact(
    snapshot: RestoreSnapshot,
    snapshotKey?: string
  ): Promise<void> {
    if (snapshot.primary === null) this.local.removeItem(STORAGE_KEYS.primary);
    else this.local.setItem(STORAGE_KEYS.primary, snapshot.primary);

    if (snapshot.indexedActive === null) {
      await this.indexed.delete(INDEXED_DB_KEYS.active);
    } else {
      await this.indexed.put(INDEXED_DB_KEYS.active, snapshot.indexedActive);
    }

    await this.clearTransaction(snapshotKey);
  }

  async execute(
    prepared: PreparedBackup,
    mode: RestoreMode,
    currentInput: AppState
  ): Promise<RestoreResult> {
    const current = migrateState(currentInput);
    if (mode === "cancel") return { status: "cancelled", state: current };

    const target =
      mode === "merge"
        ? mergeStates(current, prepared.state)
        : migrateState(cloneState(prepared.state));
    const id = transactionId();
    const snapshot = await this.exactSnapshot(id);
    const snapshotKey = preImportKey(id);
    const expectedSignature = await canonicalRestoreSignature(target);
    const marker: RestoreMarker = {
      transactionId: id,
      expectedSignature,
      mode,
      startedAt: new Date().toISOString()
    };

    try {
      await this.indexed.put(snapshotKey, snapshot);
      const session: RestoreSessionReference = {
        transactionId: id,
        snapshotKey
      };
      this.local.setItem(STORAGE_KEYS.restoreSession, JSON.stringify(session));
      this.local.setItem(STORAGE_KEYS.restorePending, JSON.stringify(marker));

      this.local.setItem(STORAGE_KEYS.primary, storageJson(target));
      const primaryRead = this.local.getItem(STORAGE_KEYS.primary);
      if (!primaryRead) throw new Error("Primary restore write could not be read back.");
      const primaryState = migrateState(JSON.parse(primaryRead));
      if ((await canonicalRestoreSignature(primaryState)) !== expectedSignature) {
        throw new Error("Primary restore signature mismatch.");
      }

      await this.indexed.put(INDEXED_DB_KEYS.active, target);
      const indexedRead = await this.indexed.get<AppState>(INDEXED_DB_KEYS.active);
      if (!indexedRead) throw new Error("IndexedDB restore write could not be read back.");
      if ((await canonicalRestoreSignature(indexedRead)) !== expectedSignature) {
        throw new Error("IndexedDB restore signature mismatch.");
      }

      this.setActiveState(cloneState(target));
      return {
        status: "pending-reload-verification",
        transactionId: id,
        state: target
      };
    } catch (error) {
      await this.rollbackExact(snapshot, snapshotKey);
      throw error;
    }
  }

  async verifyPendingOnBoot(): Promise<AppState | null> {
    const markerText = this.local.getItem(STORAGE_KEYS.restorePending);
    const sessionText = this.local.getItem(STORAGE_KEYS.restoreSession);
    if (!markerText) return null;
    if (!sessionText) throw new Error("Restore rollback session is missing.");

    const marker = JSON.parse(markerText) as RestoreMarker;
    const session = JSON.parse(sessionText) as
      | RestoreSessionReference
      | RestoreSnapshot;
    const snapshotKey =
      "snapshotKey" in session && typeof session.snapshotKey === "string"
        ? session.snapshotKey
        : undefined;
    try {
      if (marker.transactionId !== session.transactionId) {
        throw new Error("Restore transaction identity mismatch.");
      }
      const primaryText = this.local.getItem(STORAGE_KEYS.primary);
      const indexedState = await this.indexed.get<AppState>(INDEXED_DB_KEYS.active);
      if (!primaryText || !indexedState) throw new Error("Restored state is missing after reload.");
      const primaryState = migrateState(JSON.parse(primaryText));
      const primarySignature = await canonicalRestoreSignature(primaryState);
      const indexedSignature = await canonicalRestoreSignature(indexedState);
      if (
        primarySignature !== marker.expectedSignature ||
        indexedSignature !== marker.expectedSignature
      ) {
        throw new Error("Restored state failed reload verification.");
      }
      this.setActiveState(cloneState(primaryState));
      await this.clearTransaction(snapshotKey);
      return primaryState;
    } catch (error) {
      const snapshot = snapshotKey
        ? await this.indexed.get<RestoreSnapshot>(snapshotKey)
        : (session as RestoreSnapshot);
      if (snapshot) {
        await this.rollbackExact(snapshot, snapshotKey);
      }
      throw error;
    }
  }
}
