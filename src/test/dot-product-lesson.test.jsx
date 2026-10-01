import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import { lessonById } from "../content/index.js";
import { dotProductChecks } from "../content/dotProductLesson.js";

describe("dot-product teaching trial", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/lessons/dot-product-angle/start";
  });

  it("lets learners try written work and reveal marking without replacing their answer", async () => {
    render(<App />);
    await screen.findByRole("heading", { name: "What should count towards a prediction?" });
    const section = within(document.getElementById("reading-dot-product-angle-your-turn"));
    const exercise = within(section.getByRole("heading", { name: "1. Work it out by hand · 3 marks" }).closest("article"));
    const input = exercise.getByRole("textbox", { name: "Your working and explanation" });
    fireEvent.change(input, { target: { value: "4 - 10 - 3 = -9; scalar" } });
    const reveal = exercise.getByRole("button", { name: "Reveal worked answer and marking guide" });
    expect(reveal).toHaveAttribute("aria-expanded", "false");
    expect(exercise.queryByText("Mark your work")).not.toBeInTheDocument();
    fireEvent.click(reveal);
    expect(exercise.getByText("−9; a scalar")).toBeInTheDocument();
    expect(exercise.getByText("1 mark: correct sum, −9.")).toBeInTheDocument();
    expect(input).toHaveValue("4 - 10 - 3 = -9; scalar");
    fireEvent.click(exercise.getByRole("button", { name: "Hide worked answer" }));
    expect(exercise.queryByText("Mark your work")).not.toBeInTheDocument();
    expect(input).toHaveValue("4 - 10 - 3 = -9; scalar");
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });

  it("demonstrates length-sensitive raw scores and length-invariant cosine", async () => {
    render(<App />);
    const length = await screen.findByRole("slider", { name: /Candidate length/ });
    const angle = screen.getByRole("slider", { name: /Angle between vectors/ });
    const figure = length.closest("figure");
    const score = (name) => within(figure).getByText(name).nextElementSibling.textContent;
    expect(score("Raw dot product")).toBe("2.121");
    expect(score("Cosine similarity")).toBe("0.707");
    fireEvent.change(length, { target: { value: "5" } });
    expect(score("Raw dot product")).toBe("3.536");
    expect(score("Cosine similarity")).toBe("0.707");
    fireEvent.change(angle, { target: { value: "90" } });
    expect(score("Raw dot product")).toBe("0.000");
    expect(score("Cosine similarity")).toBe("0.000");
    fireEvent.change(angle, { target: { value: "180" } });
    expect(score("Raw dot product")).toBe("-5.000");
    expect(score("Cosine similarity")).toBe("-1.000");
  });

  it("explains a specific wrong choice and lets learners retry the guided question", async () => {
    render(<App />);
    await screen.findByRole("heading", { name: "A delivery bill you can explain" });
    const section = document.getElementById("reading-dot-product-angle-everyday-story");
    const check = within(section.querySelector(".guided-check"));
    expect(check.queryByText("Why each choice is right or wrong")).not.toBeInTheDocument();
    fireEvent.click(check.getByRole("button", { name: /12 coins$/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getAllByText(dotProductChecks[0].optionExplanations[1])).toHaveLength(2);
    expect(check.getByText("Why the correct answer works:")).toBeInTheDocument();
    const comparison = check.getByText("Why each choice is right or wrong").closest("details");
    fireEvent.click(within(comparison).getByText("Why each choice is right or wrong"));
    expect(comparison).toHaveAttribute("open");
    expect(within(comparison).getAllByRole("listitem")).toHaveLength(4);
    fireEvent.click(check.getByRole("button", { name: "Try again" }));
    expect(check.queryByText("Why each choice is right or wrong")).not.toBeInTheDocument();
    fireEvent.click(check.getByRole("button", { name: /16 coins$/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getByText("That’s right.")).toBeInTheDocument();
    expect(check.queryByText("Why the correct answer works:")).not.toBeInTheDocument();
  });

  it("checks changed delivery predictions, identifies a missing baseline, and clears stale feedback", async () => {
    render(<App />);
    const input = await screen.findByRole("spinbutton", { name: "Your predicted bill (coins)" });
    const lab = within(input.closest("section"));
    const submit = lab.getByRole("button", { name: "Check my prediction" });
    expect(submit).toBeDisabled();
    expect(lab.queryByRole("status", { name: "Prediction feedback" })).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "16" } });
    fireEvent.click(submit);
    expect(lab.getByText(/You found the variable charge correctly/)).toBeInTheDocument();
    expect(lab.getByText("21 coins")).toBeInTheDocument();
    fireEvent.change(lab.getByRole("slider", { name: /Delivery distance/ }), { target: { value: "5" } });
    expect(input).toHaveValue(null);
    expect(lab.queryByRole("status", { name: "Prediction feedback" })).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "24" } });
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    expect(lab.getByText("24 coins")).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Try again" }));
    expect(submit).toBeDisabled();
    expect(lab.queryByRole("status", { name: "Prediction feedback" })).not.toBeInTheDocument();
    fireEvent.change(lab.getByRole("slider", { name: /Parcel mass/ }), { target: { value: "3" } });
    fireEvent.change(input, { target: { value: "31" } });
    fireEvent.click(submit);
    expect(lab.getByText(/You included the 5-coin baseline twice/)).toBeInTheDocument();
    expect(lab.getByText("26 coins")).toBeInTheDocument();
  });

  it("uses the same option-specific reasoning in the practice assessment", async () => {
    window.location.hash = "#/lessons/dot-product-angle/practice";
    render(<App />);
    await screen.findByRole("heading", { name: "Test the whole lesson" });
    const assessment = document.querySelector(".assessment-card");
    const first = within(assessment.querySelector(".question-card"));
    fireEvent.click(first.getByRole("button", { name: /12 coins$/ }));
    fireEvent.click(within(assessment).getByRole("button", { name: "Submit answers" }));
    expect(first.getAllByText(dotProductChecks[0].optionExplanations[1])).toHaveLength(2);
    expect(first.getByText("Why the correct answer works:")).toBeInTheDocument();
    expect(first.getByText("Why each choice is right or wrong")).toBeInTheDocument();
    fireEvent.click(within(assessment).getByRole("button", { name: "Try again" }));
    expect(first.queryByText("Why each choice is right or wrong")).not.toBeInTheDocument();
  });

  it("keeps the authored practice available through the lesson's practice link", async () => {
    window.location.hash = "#/lessons/dot-product-angle/practice";
    render(<App />);
    await screen.findByRole("heading", { name: "Test the whole lesson" });
    expect(screen.getByRole("heading", { name: "A. Delivery prediction · 6 marks" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "B. Change units without changing predictions · 4 marks" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Reveal worked answer and marking guide" })).toHaveLength(5);
    expect(screen.getByText(/Rates are 3 coins\/km and 2 coins\/kg/)).toBeInTheDocument();
  });

  it("validates inline formulas in the authored prose and hidden worked answers", () => {
    const collectStrings = (value) => typeof value === "string" ? [value]
      : value && typeof value === "object" ? Object.values(value).flatMap(collectStrings) : [];
    const strings = collectStrings(lessonById["dot-product-angle"]);
    const formulas = strings.flatMap((value) => [...value.matchAll(/\\\(([\s\S]*?)\\\)/g)].map((match) => match[1]));
    expect(formulas.length).toBeGreaterThan(20);
    for (const latex of formulas) expect(() => katex.renderToString(latex, { throwOnError: true, strict: "error" }), latex).not.toThrow();
  });
});
