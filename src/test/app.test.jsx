import React from "react";
import { render, screen } from "@testing-library/react";
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

  it("renders basics, core, advanced, and formulas on one study page", async () => {
    window.location.hash = "#/lessons/eigenvalues-eigenvectors/basics";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Basics" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Core" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Advanced" })).toBeInTheDocument();
    expect(await screen.findByText("Eigen equation")).toBeInTheDocument();
    expect(document.querySelector(".katex")).toBeInTheDocument();
  });

  it("keeps practice on a separate lesson page", async () => {
    window.location.hash = "#/lessons/eigenvalues-eigenvectors/practice";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Test the whole lesson" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Study guide" })).toBeInTheDocument();
  });
});
