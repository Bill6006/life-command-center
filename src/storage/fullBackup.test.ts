import { describe, expect, it } from "vitest";
import { createBlankAppState } from "../state/model";
import { canonicalStateJson } from "./canonical";
import { buildFullBackup, fullBackupJson, prepareBackupText } from "./fullBackup";

describe("Full Backup", () => {
  it("round-trips unknown fields and omits the legacy seed", async () => {
    const state = createBlankAppState();
    state.days["2042-01-01"] = {
      _updatedAt: "2042-01-01T12:00:00.000Z",
      unknownDayField: { sample: true }
    };
    state.unknownRoot = { sample: 12 };
    state.seed = { profile: "synthetic legacy seed" };

    const json = await fullBackupJson(state, {
      now: new Date("2042-01-02T12:00:00.000Z"),
      effectiveDate: "2042-01-02"
    });
    expect(JSON.parse(json).app).toBe("Life Command Center");
    const prepared = await prepareBackupText(json);

    expect(prepared.verified).toBe(true);
    expect(prepared.state.seed).toBeUndefined();
    expect(prepared.state.unknownRoot).toEqual({ sample: 12 });
    expect(prepared.state.days["2042-01-01"].unknownDayField).toEqual({ sample: true });
    expect(canonicalStateJson(prepared.state)).toBe(canonicalStateJson(state));
  });

  it("rejects a modified signed backup", async () => {
    const envelope = await buildFullBackup(createBlankAppState());
    envelope.state.days["2042-02-02"] = { note: "tampered synthetic value" };

    await expect(prepareBackupText(JSON.stringify(envelope))).rejects.toThrow(
      "integrity verification failed"
    );
  });

  it("accepts an unsigned synthetic legacy raw state for compatibility", async () => {
    const prepared = await prepareBackupText(
      JSON.stringify({
        _schemaVersion: "synthetic-old",
        settings: {},
        days: { "2039-01-01": { note: "synthetic" } }
      })
    );

    expect(prepared.verified).toBe(false);
    expect(prepared.state.days["2039-01-01"].note).toBe("synthetic");
  });
});
