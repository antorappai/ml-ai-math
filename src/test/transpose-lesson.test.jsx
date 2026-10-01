import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import { lessonById } from "../content/index.js";
import { transposeChecks } from "../content/transposeLesson.js";

describe("transpose and symmetry teaching trial", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/lessons/transpose-symmetry/start";
  });

  it("diagnoses a retained original address and moves an entry with its labels", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "Find the mark after transposing" }));
    expect(lab.getByRole("button", { name: "Check transposed address" })).toBeDisabled();
    fireEvent.click(lab.getByRole("button", { name: "Transpose row 2, column 1: Computing, Maya" }));
    fireEvent.click(lab.getByRole("button", { name: "Check transposed address" }));
    expect(lab.getByText(/You kept the original address/)).toBeInTheDocument();
    expect(lab.getByRole("button", { name: "Transpose row 1, column 2: Maths, Nimal" })).toHaveTextContent("70");
    fireEvent.click(lab.getByRole("button", { name: "Try this address again" }));
    fireEvent.click(lab.getByRole("button", { name: "Transpose row 1, column 2: Maths, Nimal" }));
    fireEvent.click(lab.getByRole("button", { name: "Check transposed address" }));
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Try another entry" }));
    expect(lab.queryByRole("status", { name: "Transpose address feedback" })).not.toBeInTheDocument();
    expect(lab.getByRole("button", { name: "Check transposed address" })).toBeDisabled();
    fireEvent.click(lab.getByRole("button", { name: "Transpose row 2, column 3: Computing, Asha" }));
    fireEvent.click(lab.getByRole("button", { name: "Check transposed address" }));
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    expect(lab.getByRole("button", { name: "Transpose row 2, column 3: Computing, Asha" })).toHaveTextContent("75");
  });

  it("shows the original layout and labels after a second transpose", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "Find the mark after transposing" }));
    const toggle = lab.getByRole("button", { name: "Transpose again" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const restored = within(lab.getByRole("table", { name: "Restored X · 3 student rows × 2 subject columns" }));
    const nimal = within(restored.getByRole("rowheader", { name: "Nimal" }).closest("tr"));
    expect(nimal.getAllByRole("cell").map((cell) => cell.textContent)).toEqual(["70", "90"]);
    fireEvent.click(lab.getByRole("button", { name: "Hide restored layout" }));
    expect(lab.queryByRole("table", { name: /Restored X/ })).not.toBeInTheDocument();
  });

  it("tests unequal mirrored entries, clears stale answers and repairs the pair", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "Does every mirrored pair agree?" }));
    const submit = lab.getByRole("button", { name: "Check symmetry" });
    expect(submit).toBeDisabled();
    fireEvent.click(lab.getByRole("button", { name: "Yes, S is symmetric" }));
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.change(lab.getByRole("slider", { name: /S₁₂: row 1, column 2/ }), { target: { value: "6" } });
    expect(submit).toBeDisabled();
    expect(lab.queryByRole("status", { name: "Symmetry feedback" })).not.toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Yes, S is symmetric" }));
    fireEvent.click(submit);
    expect(lab.getByText(/highlighted mirrored pair differs/)).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "No, S is not symmetric" }));
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Match the mirrored entry" }));
    expect(lab.getByRole("slider", { name: /S₂₁: row 2, column 1/ })).toHaveValue("6");
    expect(submit).toBeDisabled();
    fireEvent.change(lab.getByRole("slider", { name: /S₂₂: diagonal entry/ }), { target: { value: "-2" } });
    fireEvent.click(lab.getByRole("button", { name: "Yes, S is symmetric" }));
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    expect(lab.getByText(/Changing it alone does not break symmetry/)).toHaveTextContent("S₂₂ = -2");
  });

  it("explains why equal diagonal entries alone do not establish symmetry", async () => {
    render(<App />);
    await screen.findByRole("heading", { name: "Can we change the layout without changing the data?" });
    const check = within(document.querySelector("#reading-transpose-symmetry-worked-example .guided-check"));
    fireEvent.click(check.getByRole("button", { name: /\[\[1, 2\], \[3, 1\]\]/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getAllByText(transposeChecks[2].optionExplanations[0])).toHaveLength(2);
    expect(check.getByText("Why the correct answer works:")).toBeInTheDocument();
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });

  it("offers the authored exam and preserves working when revealing the marking guide", async () => {
    window.location.hash = "#/lessons/transpose-symmetry/practice";
    render(<App />);
    await screen.findByRole("heading", { name: "Test the whole lesson" });
    expect(screen.getAllByRole("button", { name: "Reveal worked answer and marking guide" })).toHaveLength(5);
    const exam = within(screen.getByRole("heading", { name: "B. Explain a symmetric ML matrix · 5 marks" }).closest("article"));
    const input = exam.getByRole("textbox", { name: "Your working and explanation" });
    fireEvent.change(input, { target: { value: "G = [[5,2],[2,5]]. Centre columns for covariance." } });
    fireEvent.click(exam.getByRole("button", { name: "Reveal worked answer and marking guide" }));
    expect(exam.getByText("1 mark: centring and sample-covariance scaling.")).toBeInTheDocument();
    expect(input).toHaveValue("G = [[5,2],[2,5]]. Centre columns for covariance.");
  });

  it("strictly validates the lesson's formulas and gives each option an explanation", () => {
    const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
    const lesson = lessonById["transpose-symmetry"];
    const formulas = strings(lesson).flatMap((value) => [...value.matchAll(/\\\(([\s\S]*?)\\\)/g)].map((match) => match[1]));
    expect(formulas.length).toBeGreaterThan(0);
    for (const formula of formulas) expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), formula).not.toThrow();
    for (const question of transposeChecks) {
      expect(question.optionExplanations).toHaveLength(question.options.length);
      expect(question.optionExplanations.every((explanation) => typeof explanation === "string" && explanation.length > 20)).toBe(true);
    }
    expect(lesson.beginnerSteps.map((step) => step.id)).toEqual(["start", "everyday-story", "plain-idea", "worked-example", "your-turn", "math-to-ml", "recap"]);
  });
});
