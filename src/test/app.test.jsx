import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App.jsx";

describe("routed application", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/dashboard";
  });

  it("renders the dashboard launchpad", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", { name: /Learn the math/i })).toBeInTheDocument();
    expect(screen.getByText(/From symbols to transformers/i)).toBeInTheDocument();
  });

  it("renders a lesson formula tab without crashing", async () => {
    window.location.hash = "#/lessons/eigen-pca/basics";
    render(<App />);
    fireEvent.click(await screen.findByRole("tab", { name: "Formal math" }));
    expect(await screen.findByText("Eigen equation")).toBeInTheDocument();
    expect(document.querySelector(".katex")).toBeInTheDocument();
  });
});
