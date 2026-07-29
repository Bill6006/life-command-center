import { describe, expect, it } from "vitest";
import { createBlankAppState, CURRENT_SCHEMA_VERSION } from "./model";
import { migrateState } from "./migrations";
import { appStateSchema } from "./schemas";
import { stateForStorage } from "../storage/canonical";

describe("state schemas and migrations", () => {
  it("creates a valid, privacy-neutral blank state", () => {
    const state = createBlankAppState();

    expect(appStateSchema.parse(state)).toEqual(state);
    expect(state.days).toEqual({});
    expect(state.domains.money).toEqual({});
    expect(JSON.stringify(state)).not.toContain("seed");
  });

  it("migrates a synthetic legacy root into domain namespaces", () => {
    const migrated = migrateState({
      _schemaVersion: "synthetic-old-v1",
      settings: { activeTab: "money", customSetting: "preserve-me" },
      days: { "2040-01-02": { energy: 7, customDayField: "kept" } },
      azure: { sampleSkill: "Learning" },
      money: { sampleBalance: 125 },
      faith: { sampleProgress: 2 },
      weeklyAnchors: { Monday: "Example anchor" },
      logs: [],
      unknownRoot: { nested: true }
    });

    expect(migrated.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(migrated.settings.customSetting).toBe("preserve-me");
    expect(migrated.domains.azure.sampleSkill).toBe("Learning");
    expect(migrated.domains.money.sampleBalance).toBe(125);
    expect(migrated.days["2040-01-02"].customDayField).toBe("kept");
    expect(migrated.unknownRoot).toEqual({ nested: true });
  });

  it("recognizes the legacy child-growth shape without embedding its protected key", () => {
    const migrated = migrateState({
      settings: {},
      days: {},
      exampleDependentProfile: {
        skills: { "Example skill": 2 },
        customSkills: [],
        weekly: { note: "Synthetic weekly note" }
      }
    });

    expect(migrated.domains.childGrowth.skills).toEqual({ "Example skill": 2 });
  });

  it("is idempotent and preserves unknown extensions", () => {
    const once = migrateState({
      settings: { guides: {} },
      days: { "2041-04-03": { extension: { version: 9 } } },
      domains: { extensionDomain: { enabled: true } },
      rootExtension: ["alpha"]
    });
    const twice = migrateState(once);

    expect(twice).toEqual(once);
    expect(twice.days["2041-04-03"].extension).toEqual({ version: 9 });
    expect(twice.domains.extensionDomain).toEqual({ enabled: true });
  });

  it("removes a legacy seed only from durable storage projection", () => {
    const state = migrateState({
      settings: {},
      days: {},
      seed: { profile: "synthetic legacy seed" }
    });

    expect(state.seed).toEqual({ profile: "synthetic legacy seed" });
    expect(stateForStorage(state).seed).toBeUndefined();
  });
});
