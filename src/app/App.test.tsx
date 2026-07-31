import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { buildGuideSteps } from "../guides/guideRegistry";
import { startGuide } from "../guides/session";
import { createBlankGuideState, type GuideBuildContext } from "../guides/types";
import { createBlankAppState } from "../state/model";
import { STORAGE_KEYS } from "../storage/keys";
import { App } from "./App";

describe("application shell", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/today";
  });

  it("shows the privacy-safe first-run message after blank storage loads", async () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Life Command Center home" })).toBeInTheDocument();
    expect(
      await screen.findByText("This rebuild starts empty on purpose.")
    ).toBeInTheDocument();
    const skipLink = screen.getByRole("link", { name: "Skip to main content" });
    expect(skipLink).toHaveAttribute(
      "href",
      "#main-content"
    );
    fireEvent.click(skipLink);
    expect(document.getElementById("main-content")).toHaveFocus();
    expect(window.location.hash).toBe("#/today");
    expect(
      within(screen.getByRole("navigation", { name: "Command center areas" })).getAllByRole(
        "button"
      )
    ).toHaveLength(12);
  });

  it("hides the fresh-workspace card after saved history loads", async () => {
    const root = createBlankAppState();
    root.days["2046-03-23"] = {
      _updatedAt: "2046-03-23T12:00:00.000Z",
      note: "Synthetic restored history"
    };
    window.localStorage.setItem(STORAGE_KEYS.primary, JSON.stringify(root));

    render(<App />);

    expect(await screen.findByText("Saved locally")).toBeInTheDocument();
    expect(
      screen.queryByText("This rebuild starts empty on purpose.")
    ).not.toBeInTheDocument();
  });

  it("routes between registered tabs using the hash", async () => {
    render(<App />);

    fireEvent.click(
      within(screen.getByRole("navigation", { name: "Command center areas" })).getByRole("button", {
        name: "Data"
      })
    );

    expect(window.location.hash).toBe("#/data");
    expect(
      await screen.findByRole("heading", {
        name: "Keep recovery close and exports intentional."
      })
    ).toBeInTheDocument();
  });

  it("keeps deep diagnostics on demand on the Data screen", async () => {
    window.location.hash = "#/data";
    render(<App />);

    expect(
      await screen.findByText("Not run. No deep diagnostic work has executed.")
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Run Phase 68 acceptance" })
    );

    expect(await screen.findByText("YELLOW")).toBeInTheDocument();
    expect(
      screen.getByText("11 of 11 automated groups passed")
    ).toBeInTheDocument();
  });

  it("keeps an explicit domain deep link instead of replacing it with the saved tab", async () => {
    const root = createBlankAppState();
    root.settings.activeTab = "today";
    window.localStorage.setItem(STORAGE_KEYS.primary, JSON.stringify(root));
    window.location.hash = "#/health";

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "Match the plan to current readiness." })
    ).toBeInTheDocument();
    expect(window.location.hash).toBe("#/health");
  });

  it("renders every planned domain through the authoritative navigation", async () => {
    render(<App />);
    await screen.findByText("Saved locally");
    const navigation = within(screen.getByRole("navigation", { name: "Command center areas" }));
    const screens = [
      ["Health", "Match the plan to current readiness."],
      ["Pattern", "Separate timing, effects, and uncertainty."],
      ["Therapy", "Name the state without turning it into a verdict."],
      ["Azure", "Turn practice into defensible proof."],
      ["Father", "Notice, connect, teach, and repair."],
      ["Faith", "Keep the next faithful action visible."],
      ["Money", "See the next useful financial decision."],
      ["Love/Social", "Choose presence over pressure."],
      ["Week", "Protect direction from daily noise."],
      ["Vision", "Keep direction visible without forcing urgency."]
    ] as const;

    for (const [tab, heading] of screens) {
      fireEvent.click(navigation.getByRole("button", { name: tab }));
      expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("persists a domain input across an application reload", async () => {
    window.location.hash = "#/health";
    const first = render(<App />);
    await screen.findByText("Saved locally");
    fireEvent.change(
      screen.getByRole("combobox", { name: "Energy 0–10 · unknown is separate" }),
      { target: { value: "7" } }
    );
    await waitFor(() =>
      expect(
        screen.getByRole("combobox", { name: "Energy 0–10 · unknown is separate" })
      ).toHaveValue("7")
    );
    await waitFor(() => expect(screen.getByText("Autosave: saved")).toBeInTheDocument());
    first.unmount();

    render(<App />);
    expect(
      await screen.findByRole("combobox", { name: "Energy 0–10 · unknown is separate" })
    ).toHaveValue("7");
  });

  it("connects the Work Win review queue to the shared durable state", async () => {
    window.location.hash = "#/azure";
    render(<App />);
    await screen.findByText("Saved locally");
    fireEvent.change(screen.getByRole("textbox", { name: "Technology" }), {
      target: { value: "Synthetic platform" }
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Action Private" }), {
      target: { value: "Completed a synthetic troubleshooting step." }
    });
    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));

    expect(await screen.findByText("1 local record(s)")).toBeInTheDocument();
    expect(screen.getByText("Sensitive local details hidden in this review card.")).toBeInTheDocument();
  });

  it("keeps Quick Mode separate from full guides", async () => {
    render(<App />);
    await screen.findByText("Saved locally");
    fireEvent.click(screen.getByRole("button", { name: "Start Quick Mode" }));
    expect(await screen.findByText("Reduced check-in is active.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start .* Guide/ })).toBeDisabled();
  });

  it("resumes a persisted active guide after reload", async () => {
    const context: GuideBuildContext = {
      now: new Date(),
      timeZone: "America/New_York",
      rolloverMode: "after_sleep_4am",
      evidence: { satisfied: {} }
    };
    const steps = buildGuideSteps("afternoon", context);
    const started = startGuide(createBlankGuideState(), "afternoon", steps, context, true);
    if (!started.ok) throw new Error("Synthetic guide did not start.");
    const root = createBlankAppState();
    root.settings.guides = started.state;
    root.settings.activeTab = started.state.active!.activeTab;
    window.localStorage.setItem(STORAGE_KEYS.primary, JSON.stringify(root));

    render(<App />);

    expect(await screen.findByRole("region", { name: "Life Checks" })).toBeInTheDocument();
    await waitFor(() =>
      expect(document.getElementById("guide-target-core-state")).toHaveAttribute(
        "data-guide-target",
        "active"
      )
    );
  });

  it("updates Today Score and changes the command in driving context", async () => {
    render(<App />);
    await screen.findByText("Saved locally");
    const energy = screen.getByRole("group", { name: "Energy" });
    fireEvent.click(within(energy).getByRole("button", { name: "Steady" }));
    await waitFor(() =>
      expect(within(screen.getByRole("status", { name: "Today Score" })).getByText("2")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: "Driving" }));
    expect(await screen.findByRole("heading", { name: "Protect the drive" })).toBeInTheDocument();
    expect(screen.getByText(/Do not interact with this screen/)).toBeInTheDocument();
  });

  it("runs the visible move lifecycle and structured Can't now sheet", async () => {
    render(<App />);
    await screen.findByText("Saved locally");
    fireEvent.click(screen.getByRole("button", { name: "Try this" }));
    expect(await screen.findByText(/Active move · started/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Pause here" }));
    expect(await screen.findByRole("button", { name: "Resume" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Resume" }));

    fireEvent.click(screen.getByRole("button", { name: "Can't now" }));
    const dialog = await screen.findByRole("dialog", {
      name: "What makes this a “can't now”?"
    });
    fireEvent.click(within(dialog).getByLabelText("I need privacy"));
    fireEvent.click(within(dialog).getByRole("button", { name: "Save constraint" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.queryByText(/Active move ·/i)).not.toBeInTheDocument();
  });

  it("traps modal focus, closes on Escape, and restores the trigger", async () => {
    render(<App />);
    await screen.findByText("Saved locally");
    fireEvent.click(screen.getByRole("button", { name: "Try this" }));
    await screen.findByText(/Active move · started/i);
    const trigger = screen.getByRole("button", { name: "Can't now" });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", {
      name: "What makes this a “can't now”?"
    });
    const close = within(dialog).getByRole("button", { name: "Close Can't now" });
    await waitFor(() => expect(close).toHaveFocus());

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(within(dialog).getByRole("button", { name: "Save constraint" })).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});
