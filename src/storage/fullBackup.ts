import { CURRENT_SCHEMA_VERSION, type AppState } from "../state/model";
import { migrateState } from "../state/migrations";
import { canonicalRestoreSignature, canonicalStateJson, stateForStorage } from "./canonical";

export interface FullBackupEnvelope {
  app: "Life Command Center";
  exportType: "Full Backup";
  formatVersion: 1;
  schemaVersion: string;
  generatedAt: string;
  timeZone: string;
  effectiveDate: string;
  state: AppState;
  integrity: {
    algorithm: "SHA-256";
    canonicalSignature: string;
    canonicalBytes: number;
  };
}

export interface PreparedBackup {
  state: AppState;
  verified: boolean;
  sourceSchemaVersion: string;
}

export async function buildFullBackup(
  input: AppState,
  options: { now?: Date; effectiveDate?: string } = {}
): Promise<FullBackupEnvelope> {
  const state = stateForStorage(migrateState(input));
  const now = options.now ?? new Date();
  return {
    app: "Life Command Center",
    exportType: "Full Backup",
    formatVersion: 1,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    generatedAt: now.toISOString(),
    timeZone: state.settings.timeZone,
    effectiveDate: options.effectiveDate ?? now.toISOString().slice(0, 10),
    state,
    integrity: {
      algorithm: "SHA-256",
      canonicalSignature: await canonicalRestoreSignature(state),
      canonicalBytes: new TextEncoder().encode(canonicalStateJson(state)).length
    }
  };
}

export async function fullBackupJson(
  input: AppState,
  options: { now?: Date; effectiveDate?: string } = {}
): Promise<string> {
  return JSON.stringify(await buildFullBackup(input, options), null, 2);
}

export async function prepareBackup(input: unknown): Promise<PreparedBackup> {
  if (
    typeof input === "object" &&
    input !== null &&
    "exportType" in input &&
    input.exportType === "Full Backup" &&
    "state" in input
  ) {
    const envelope = input as Partial<FullBackupEnvelope>;
    const state = migrateState(envelope.state);
    const expected = envelope.integrity?.canonicalSignature;
    if (typeof expected !== "string") throw new Error("Full Backup integrity metadata is missing.");
    const actual = await canonicalRestoreSignature(state);
    if (actual !== expected) throw new Error("Full Backup integrity verification failed.");
    return {
      state,
      verified: true,
      sourceSchemaVersion: envelope.schemaVersion ?? "unknown"
    };
  }

  const state = migrateState(input);
  return {
    state,
    verified: false,
    sourceSchemaVersion: state.settings.migratedFromSchema as string
  };
}

export async function prepareBackupText(text: string): Promise<PreparedBackup> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Backup is not valid JSON.");
  }
  return prepareBackup(parsed);
}
