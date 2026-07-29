import { describe, expect, it, vi } from "vitest";
import { GuideAutomationOwner } from "./automation";

describe("guide automation ownership", () => {
  it("deduplicates timers and cleans timer/listener ownership", () => {
    const host = {
      setInterval: vi.fn(() => 7 as unknown as ReturnType<typeof setInterval>),
      clearInterval: vi.fn(),
      addVisibilityListener: vi.fn(),
      removeVisibilityListener: vi.fn()
    };
    const owner = new GuideAutomationOwner(host, vi.fn());
    owner.start();
    owner.start();
    expect(host.setInterval).toHaveBeenCalledTimes(1);
    expect(host.addVisibilityListener).toHaveBeenCalledTimes(1);
    owner.stop();
    expect(host.clearInterval).toHaveBeenCalledTimes(1);
    expect(host.removeVisibilityListener).toHaveBeenCalledTimes(1);
  });

  it("rechecks eligibility on visibility changes without creating a second timer", () => {
    let listener = () => {};
    const recompute = vi.fn();
    const host = {
      setInterval: vi.fn(() => 8 as unknown as ReturnType<typeof setInterval>),
      clearInterval: vi.fn(),
      addVisibilityListener: vi.fn((callback: () => void) => {
        listener = callback;
      }),
      removeVisibilityListener: vi.fn()
    };
    const owner = new GuideAutomationOwner(host, recompute);
    owner.start();
    listener();
    owner.start();
    expect(recompute).toHaveBeenCalledTimes(1);
    expect(host.setInterval).toHaveBeenCalledTimes(1);
  });
});
