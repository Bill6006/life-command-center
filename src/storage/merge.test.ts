import { describe, expect, it } from "vitest";
import { createBlankAppState } from "../state/model";
import {
  mergeRecoveryCandidates,
  mergeStates,
  meaningfulStateStamp,
  rankRecoveryCandidates
} from "./merge";

describe("recovery ranking and anti-rollback merge", () => {
  it("keeps older history while accepting a newer day", () => {
    const trusted = createBlankAppState();
    trusted._inputUpdatedAt = "2040-01-02T12:00:00.000Z";
    trusted.days["2040-01-01"] = {
      _updatedAt: "2040-01-01T20:00:00.000Z",
      note: "synthetic older day"
    };

    const incoming = createBlankAppState();
    incoming._inputUpdatedAt = "2040-01-03T12:00:00.000Z";
    incoming.days["2040-01-03"] = {
      _updatedAt: "2040-01-03T20:00:00.000Z",
      note: "synthetic newer day"
    };

    const merged = mergeStates(trusted, incoming);
    expect(Object.keys(merged.days)).toEqual(["2040-01-01", "2040-01-03"]);
  });

  it("selects newer content within the same day without losing extensions", () => {
    const trusted = createBlankAppState();
    trusted.days["2040-02-01"] = {
      _updatedAt: "2040-02-01T12:00:00.000Z",
      note: "old",
      trustedExtension: true
    };
    const incoming = createBlankAppState();
    incoming.days["2040-02-01"] = {
      _updatedAt: "2040-02-01T13:00:00.000Z",
      note: "new"
    };

    const merged = mergeStates(trusted, incoming);
    expect(merged.days["2040-02-01"].note).toBe("new");
    expect(merged.days["2040-02-01"].trustedExtension).toBe(true);
  });

  it("merges global domains by their own timestamps", () => {
    const trusted = createBlankAppState();
    trusted.domains.money = { sample: "trusted", extension: "keep" };
    trusted._domainUpdatedAt.money = "2040-03-03T14:00:00.000Z";
    const incoming = createBlankAppState();
    incoming._inputUpdatedAt = "2040-03-04T14:00:00.000Z";
    incoming.domains.money = { sample: "incoming" };
    incoming._domainUpdatedAt.money = "2040-03-02T14:00:00.000Z";

    const merged = mergeStates(trusted, incoming);
    expect(merged.domains.money.sample).toBe("trusted");
    expect(merged.domains.money.extension).toBe("keep");
  });

  it("ranks meaningful input ahead of a later save-only timestamp", () => {
    const meaningful = createBlankAppState();
    meaningful._inputUpdatedAt = "2040-04-02T12:00:00.000Z";
    const saveOnly = createBlankAppState();
    saveOnly._savedAt = "2040-04-03T12:00:00.000Z";

    const ranked = rankRecoveryCandidates([
      { source: "save-only", state: saveOnly },
      { source: "meaningful", state: meaningful }
    ]);

    expect(ranked[0].source).toBe("meaningful");
    expect(meaningfulStateStamp(saveOnly)).toBe(0);
  });

  it("merges every recovery candidate instead of shrinking to the winner", () => {
    const first = createBlankAppState();
    first.days["2040-05-01"] = { _updatedAt: "2040-05-01T10:00:00.000Z" };
    const second = createBlankAppState();
    second.days["2040-05-02"] = { _updatedAt: "2040-05-02T10:00:00.000Z" };

    const merged = mergeRecoveryCandidates([
      { source: "first", state: first },
      { source: "second", state: second }
    ]);

    expect(Object.keys(merged?.days ?? {})).toHaveLength(2);
  });
});
