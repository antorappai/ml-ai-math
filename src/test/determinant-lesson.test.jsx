import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import { lessonById } from "../content/index.js";
import { determinantChecks } from "../content/determinantLesson.js";

function enterPrediction(lab, determinant, area, meaning) {
  fireEvent.change(lab.getByRole("spinbutton", { name: "Your signed determinant" }), { target: { value: determinant } });
  fireEvent.change(lab.getByRole("spinbutton", { name: "Your transformed area (square units)" }), { target: { value: area } });
  fireEvent.change(lab.getByRole("combobox", { name: "Geometric meaning" }), { target: { value: meaning } });
  fireEvent.click(lab.getByRole("button", { name: "Check area prediction" }));
}

describe("determinant teaching trial", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/lessons/determinant-collapse/start";
  });

  it("distinguishes an area multiplier from the patch area and resets a changed task", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "What happens to this patch?" }));
    const submit = lab.getByRole("button", { name: "Check area prediction" });
    expect(submit).toBeDisabled();
    enterPrediction(lab, "6", "6", "preserve");
    expect(lab.getByText(/That is the area multiplier/)).toBeInTheDocument();
    enterPrediction(lab, "6", "18", "preserve");
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.change(lab.getByRole("slider", { name: /Original patch area/ }), { target: { value: "4" } });
    expect(submit).toBeDisabled();
    expect(lab.queryByRole("status", { name: "Determinant prediction feedback" })).not.toBeInTheDocument();
    expect(lab.getByRole("spinbutton", { name: "Your signed determinant" })).toHaveValue(null);
    enterPrediction(lab, "6", "24", "preserve");
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
  });

  it("diagnoses lost orientation signs and negative ordinary areas, then checks compression", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "What happens to this patch?" }));
    fireEvent.click(lab.getByRole("button", { name: "Swap the coordinates" }));
    enterPrediction(lab, "1", "-3", "preserve");
    expect(lab.getByText(/lost the negative sign/)).toBeInTheDocument();
    expect(lab.getByText(/Ordinary area cannot be negative/)).toBeInTheDocument();
    enterPrediction(lab, "-1", "3", "reverse");
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Compress vertically" }));
    expect(lab.getByRole("button", { name: "Check area prediction" })).toBeDisabled();
    enterPrediction(lab, "0.5", "1.5", "preserve");
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
  });

  it("distinguishes line collapse, point collapse, and an area-preserving shear", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "What happens to this patch?" }));
    fireEvent.click(lab.getByRole("button", { name: "Collapse onto a line" }));
    enterPrediction(lab, "0", "0", "collapse");
    expect(lab.getByRole("status", { name: "Determinant prediction feedback" })).toHaveTextContent("collapses to a line");
    fireEvent.click(lab.getByRole("button", { name: "Collapse onto a point" }));
    enterPrediction(lab, "0", "0", "collapse");
    expect(lab.getByRole("status", { name: "Determinant prediction feedback" })).toHaveTextContent("collapses to a point at the origin");
    fireEvent.click(lab.getByRole("button", { name: "Shear only" }));
    enterPrediction(lab, "1", "3", "preserve");
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
  });

  it("retains the live matrix graph and handles its zero-matrix point correctly", async () => {
    render(<App />);
    const graph = within(await screen.findByRole("region", { name: "Watch a matrix scale and collapse area" }));
    expect(graph.getByRole("img", { name: "Parallelogram with determinant 4" })).toBeInTheDocument();
    for (const label of ["Matrix a", "Matrix b", "Matrix c", "Matrix d"]) fireEvent.change(graph.getByRole("slider", { name: label }), { target: { value: "0" } });
    expect(graph.getByText(/a point at the origin/)).toBeInTheDocument();
    expect(graph.getByRole("img", { name: "Parallelogram with determinant 0" }).querySelector("circle")).not.toBeNull();
    const check = within(document.querySelector("#reading-determinant-collapse-plain-idea .guided-check"));
    fireEvent.click(check.getByRole("button", { name: /negative ordinary area/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getAllByText(determinantChecks[1].optionExplanations[0])).toHaveLength(2);
    expect(check.getByText("Why the correct answer works:")).toBeInTheDocument();
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });

  it("offers written exam answers and marking without replacing a learner's working", async () => {
    window.location.hash = "#/lessons/determinant-collapse/practice";
    render(<App />);
    await screen.findByRole("heading", { name: "Test the whole lesson" });
    expect(screen.getAllByRole("button", { name: "Reveal worked answer and marking guide" })).toHaveLength(5);
    const exam = within(screen.getByRole("heading", { name: "B. Diagnose a redundant representation · 5 marks" }).closest("article"));
    const input = exam.getByRole("textbox", { name: "Your working and explanation" });
    fireEvent.change(input, { target: { value: "[3,1] and [1,2] both give [5,10]; usefulness depends on the target." } });
    fireEvent.click(exam.getByRole("button", { name: "Reveal worked answer and marking guide" }));
    expect(exam.getByText("1 mark: distinguishes information loss from prediction quality.")).toBeInTheDocument();
    expect(input).toHaveValue("[3,1] and [1,2] both give [5,10]; usefulness depends on the target.");
  });

  it("strictly validates authored formulas and explanations for all answer options", () => {
    const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
    const lesson = lessonById["determinant-collapse"];
    const formulas = strings(lesson).flatMap((value) => [...value.matchAll(/\\\(([\s\S]*?)\\\)/g)].map((match) => match[1]));
    expect(formulas.length).toBeGreaterThan(0);
    for (const formula of formulas) expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), formula).not.toThrow();
    for (const question of determinantChecks) {
      expect(question.optionExplanations).toHaveLength(question.options.length);
      expect(question.optionExplanations.every((explanation) => typeof explanation === "string" && explanation.length > 20)).toBe(true);
    }
    expect(lesson.beginnerSteps.map((step) => step.id)).toEqual(["start", "everyday-story", "plain-idea", "worked-example", "your-turn", "math-to-ml", "recap"]);
  });
});
