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

  it("shows the privacy-safe first-run message", () => {
    render(<App />);

    expect(screen.getByText("This rebuild starts empty on purpose.")).toBeInTheDocument();
    expect(
      within(screen.getByRole("navigation", { name: "Command center areas" })).getAllByRole(
        "button"
      )
    ).toHaveLength(12);
  });

  it("routes between registered tabs using the hash", async () => {
    render(<App />);

    fireEvent.click(
      within(screen.getByRole("navigation", { name: "Command center areas" })).getByRole("button", {
        name: "Data"
      })
    );

    expect(window.location.hash).toBe("#/data");
    expect(await screen.findByText("Your state stays yours.")).toBeInTheDocument();
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

    expect(await screen.findByRole("dialog", { name: "Life Checks" })).toBeInTheDocument();
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
});
