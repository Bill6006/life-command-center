import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

describe("application shell", () => {
  beforeEach(() => {
    window.location.hash = "#/today";
  });

  it("shows the privacy-safe first-run message", () => {
    render(<App />);

    expect(screen.getByText("This rebuild starts empty on purpose.")).toBeInTheDocument();
    expect(screen.getByText("12 of 12")).toBeInTheDocument();
  });

  it("routes between registered tabs using the hash", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Data" }));

    expect(window.location.hash).toBe("#/data");
    expect(await screen.findByText("Your state stays yours.")).toBeInTheDocument();
  });
});
