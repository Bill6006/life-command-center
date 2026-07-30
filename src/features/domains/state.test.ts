import { describe, expect, it } from "vitest";
import { createBlankAppState } from "../../state/model";
import {
  addWorkWin,
  domainEvidenceSummary,
  readDomainField,
  readWorkWins,
  sanitizedWorkWin,
  sevenDayMovementRates,
  writeDomainField
} from "./state";

describe("Phase 7 domain state", () => {
  it("keeps unknown distinct from explicit false and preserves extension fields", () => {
    const state = createBlankAppState();
    state.domains.health.extension = { retained: true };

    expect(
      readDomainField(state, "2042-02-03", "health", "health", "day", "sunlight")
    ).toMatchObject({ value: null, evidenceState: "unknown" });

    writeDomainField(state, {
      dateKey: "2042-02-03",
      domain: "health",
      storageKey: "health",
      scope: "day",
      fieldId: "sunlight",
      value: false,
      now: new Date("2042-02-03T15:00:00.000Z")
    });
    writeDomainField(state, {
      dateKey: "2042-02-03",
      domain: "health",
      storageKey: "health",
      scope: "durable",
      fieldId: "healthMode",
      value: "restore",
      now: new Date("2042-02-03T15:01:00.000Z")
    });

    expect(
      readDomainField(state, "2042-02-03", "health", "health", "day", "sunlight")
    ).toMatchObject({ value: false, evidenceState: "explicit-false" });
    expect(
      readDomainField(state, "2042-02-03", "health", "health", "durable", "healthMode")
    ).toMatchObject({ value: "restore", evidenceState: "logged" });
    expect(state.domains.health.extension).toEqual({ retained: true });
  });

  it("does not turn blank movement history into a zero rate", () => {
    const state = createBlankAppState();
    state.days["2042-02-03"] = { today: { synthetic: true } };

    expect(sevenDayMovementRates(state, "2042-02-03")).toEqual({
      days: 0,
      movement: null,
      starter: null,
      lift: null,
      recovery: null
    });
  });

  it("counts only source-qualified domain fields", () => {
    const state = createBlankAppState();
    writeDomainField(state, {
      dateKey: "2042-02-03",
      domain: "environment",
      storageKey: "environment",
      scope: "day",
      fieldId: "surfaceReset",
      value: true
    });

    expect(
      domainEvidenceSummary(state, "2042-02-03", "environment", "environment", [
        { id: "surfaceReset", scope: "day" },
        { id: "friction", scope: "day" }
      ])
    ).toMatchObject({ known: 1, total: 2 });
  });

  it("stores bounded Work Wins and omits sensitive result detail from the sanitized view", () => {
    const state = createBlankAppState();
    addWorkWin(state, {
      id: "work-win-synthetic-1",
      technology: "Platform service",
      issue: "Synthetic issue",
      action: "Synthetic action",
      result: "Synthetic result detail",
      evidenceStatus: "observed",
      sensitive: true,
      status: "draft",
      createdAt: "2042-02-03T15:00:00.000Z",
      updatedAt: "2042-02-03T15:00:00.000Z"
    });

    const [stored] = readWorkWins(state);
    expect(stored.result).toBe("Synthetic result detail");
    expect(sanitizedWorkWin(stored)).toMatchObject({
      technology: "Platform service",
      result: "",
      status: "draft"
    });
  });
});
