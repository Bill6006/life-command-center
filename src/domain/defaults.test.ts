import { describe, expect, it } from "vitest";
import { createBlankShellState } from "./defaults";

describe("blank shell state", () => {
  it("contains no seeded days, domains, logs, or profile", () => {
    const state = createBlankShellState();

    expect(state.days).toEqual({});
    expect(state.domains).toEqual({});
    expect(state.logs).toEqual([]);
    expect(JSON.stringify(state)).not.toMatch(/profile|daughter|resumeSummary/);
  });

  it("returns an independent object", () => {
    expect(createBlankShellState()).not.toBe(createBlankShellState());
  });
});
