import { cloneState, isUnknownRecord, type AppState, type UnknownRecord } from "../state/model";
import { migrateState } from "../state/migrations";

function canonicalValue(value: unknown, omitVolatile: boolean): unknown {
  if (Array.isArray(value)) return value.map((item) => canonicalValue(item, omitVolatile));
  if (!isUnknownRecord(value)) return value;

  const result: UnknownRecord = {};
  for (const key of Object.keys(value).sort()) {
    if (key === "seed") continue;
    if (omitVolatile && ["_savedAt", "_restoreTransactionId"].includes(key)) continue;
    result[key] = canonicalValue(value[key], omitVolatile);
  }
  return result;
}

export function stateForStorage(state: AppState): AppState {
  return canonicalValue(migrateState(cloneState(state)), false) as AppState;
}

export function canonicalStateJson(state: AppState): string {
  return JSON.stringify(canonicalValue(stateForStorage(state), true));
}

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function canonicalRestoreSignature(state: AppState): Promise<string> {
  return sha256Hex(canonicalStateJson(state));
}

export function storageJson(state: AppState): string {
  return JSON.stringify(stateForStorage(state));
}
