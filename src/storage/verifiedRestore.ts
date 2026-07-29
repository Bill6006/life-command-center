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

interface RestoreSession {
  transactionId: string;
  primary: string | null;
  indexedActive: AppState | null;
}

export interface RestoreResult {
  status: "cancelled" | "pending-reload-verification";
  transactionId?: string;
  state: AppState;
}

function transactionId() {
  return `restore-${Date.now().toString(36)}-${crypto.randomUUID()}`;
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

  private async exactSnapshot(id: string): Promise<RestoreSession> {
    return {
      transactionId: id,
      primary: this.local.getItem(STORAGE_KEYS.primary),
      indexedActive: await this.indexed.get<AppState>(INDEXED_DB_KEYS.active)
    };
  }

  private async rollbackExact(session: RestoreSession): Promise<void> {
    if (session.primary === null) this.local.removeItem(STORAGE_KEYS.primary);
    else this.local.setItem(STORAGE_KEYS.primary, session.primary);

    if (session.indexedActive === null) await this.indexed.delete(INDEXED_DB_KEYS.active);
    else await this.indexed.put(INDEXED_DB_KEYS.active, session.indexedActive);

    this.local.removeItem(STORAGE_KEYS.restorePending);
    this.local.removeItem(STORAGE_KEYS.restoreSession);
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
    const expectedSignature = await canonicalRestoreSignature(target);
    const marker: RestoreMarker = {
      transactionId: id,
      expectedSignature,
      mode,
      startedAt: new Date().toISOString()
    };

    this.local.setItem(STORAGE_KEYS.restoreSession, JSON.stringify(snapshot));
    this.local.setItem(STORAGE_KEYS.restorePending, JSON.stringify(marker));

    try {
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
      await this.rollbackExact(snapshot);
      throw error;
    }
  }

  async verifyPendingOnBoot(): Promise<AppState | null> {
    const markerText = this.local.getItem(STORAGE_KEYS.restorePending);
    const sessionText = this.local.getItem(STORAGE_KEYS.restoreSession);
    if (!markerText) return null;
    if (!sessionText) throw new Error("Restore rollback session is missing.");

    const marker = JSON.parse(markerText) as RestoreMarker;
    const session = JSON.parse(sessionText) as RestoreSession;
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
      this.local.removeItem(STORAGE_KEYS.restorePending);
      this.local.removeItem(STORAGE_KEYS.restoreSession);
      return primaryState;
    } catch (error) {
      await this.rollbackExact(session);
      throw error;
    }
  }
}
