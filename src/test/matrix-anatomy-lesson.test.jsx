import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import { lessonById } from "../content/index.js";
import { matrixAnatomyChecks } from "../content/matrixAnatomyLesson.js";

describe("matrix anatomy teaching trial", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/lessons/matrix-anatomy-types/start";
  });

  it("diagnoses swapped indices and starts a fresh cell task after a correct attempt", async () => {
    render(<App />);
    const explorer = within(await screen.findByRole("region", { name: "Find the mark in the matrix" }));
    expect(explorer.getByRole("button", { name: "Check selected cell" })).toBeDisabled();
    fireEvent.click(explorer.getByRole("button", { name: "Maya, Computing: 80" }));
    fireEvent.click(explorer.getByRole("button", { name: "Check selected cell" }));
    expect(explorer.getByText(/You swapped the two indices/)).toBeInTheDocument();
    expect(explorer.getByText("X[1][0]")).toBeInTheDocument();
    fireEvent.click(explorer.getByRole("button", { name: "Try this cell again" }));
    expect(explorer.queryByRole("status", { name: "Matrix cell feedback" })).not.toBeInTheDocument();
    fireEvent.click(explorer.getByRole("button", { name: "Nimal, Maths: 70" }));
    expect(explorer.getByRole("button", { name: "Nimal, Maths: 70" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(explorer.getByRole("button", { name: "Check selected cell" }));
    expect(explorer.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.click(explorer.getByRole("button", { name: "Try another cell" }));
    expect(explorer.queryByRole("status", { name: "Matrix cell feedback" })).not.toBeInTheDocument();
    expect(explorer.getByRole("button", { name: "Check selected cell" })).toBeDisabled();
    fireEvent.click(explorer.getByRole("button", { name: "Maya, Computing: 80" }));
    fireEvent.click(explorer.getByRole("button", { name: "Check selected cell" }));
    expect(explorer.getByText("That’s right.")).toBeInTheDocument();
    expect(explorer.getByText("X[0][1]")).toBeInTheDocument();
  });

  it("explains a reversed shape and preserves a written answer when revealing the exam solution", async () => {
    render(<App />);
    await screen.findByRole("heading", { name: "How do we keep many observations organised?" });
    const check = within(document.querySelector("#reading-matrix-anatomy-types-everyday-story .guided-check"));
    fireEvent.click(check.getByRole("button", { name: /2 × 3$/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getAllByText(matrixAnatomyChecks[0].optionExplanations[0])).toHaveLength(2);
    expect(check.getByText("Why the correct answer works:")).toBeInTheDocument();
    const exam = within(screen.getByRole("heading", { name: "B. Use a row without losing its meaning · 5 marks" }).closest("article"));
    const input = exam.getByRole("textbox", { name: "Your working and explanation" });
    fireEvent.change(input, { target: { value: "Nimal: 21 + 18 + 8 = 47. Need held-out scores for accuracy." } });
    fireEvent.click(exam.getByRole("button", { name: "Reveal worked answer and marking guide" }));
    expect(exam.getByText("1 mark: explains how accuracy would be assessed.")).toBeInTheDocument();
    expect(input).toHaveValue("Nimal: 21 + 18 + 8 = 47. Need held-out scores for accuracy.");
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });

  it("makes the same authored questions and written practice available on the practice route", async () => {
    window.location.hash = "#/lessons/matrix-anatomy-types/practice";
    render(<App />);
    await screen.findByRole("heading", { name: "Test the whole lesson" });
    expect(screen.getByRole("heading", { name: "A. Describe a dataset · 5 marks" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Reveal worked answer and marking guide" })).toHaveLength(5);
    const first = within(document.querySelector(".assessment-card .question-card"));
    fireEvent.click(first.getByRole("button", { name: /3 × 2$/ }));
    fireEvent.click(screen.getByRole("button", { name: "Submit answers" }));
    expect(first.getByText("Correct.")).toBeInTheDocument();
    expect(first.getByText("Why each choice is right or wrong")).toBeInTheDocument();
  });

  it("strictly validates prose formulas and the definitions behind every answer choice", () => {
    const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
    const latex = strings(lessonById["matrix-anatomy-types"]).flatMap((value) => [...value.matchAll(/\\\(([\s\S]*?)\\\)/g)].map((match) => match[1]));
    expect(latex.length).toBeGreaterThan(5);
    for (const formula of latex) expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), formula).not.toThrow();
    for (const question of matrixAnatomyChecks) {
      expect(question.optionExplanations).toHaveLength(question.options.length);
      expect(question.optionExplanations.every((explanation) => typeof explanation === "string" && explanation.length > 20)).toBe(true);
    }
  });
});
