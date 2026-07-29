import { describe, expect, it } from "vitest";
import { TAB_IDS, TAB_REGISTRY } from "./tabRegistry";

describe("tab registry", () => {
  it("maps the twelve authoritative tabs once", () => {
    expect(TAB_REGISTRY).toHaveLength(12);
    expect(new Set(TAB_REGISTRY.map((tab) => tab.id)).size).toBe(12);
    expect(TAB_REGISTRY.map((tab) => tab.id)).toEqual(TAB_IDS);
  });
});
