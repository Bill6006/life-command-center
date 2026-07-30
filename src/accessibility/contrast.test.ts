import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";

describe("visual accessibility tokens", () => {
  it.each([
    ["primary text", "#f4f6f8", "#050b14"],
    ["soft text", "#a9b5c5", "#050b14"],
    ["muted text", "#78879b", "#050b14"],
    ["gold label", "#e9ae48", "#050b14"],
    ["primary button", "#15120d", "#e9ae48"]
  ])("%s meets WCAG AA normal-text contrast", (_label, foreground, background) => {
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
