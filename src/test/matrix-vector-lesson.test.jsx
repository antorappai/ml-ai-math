import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import { lessonById } from "../content/index.js";
import { matrixVectorChecks } from "../content/matrixVectorLesson.js";

describe("matrix–vector teaching trial", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/lessons/matrix-vector-multiplication/start";
  });

  it("diagnoses omitted contributions and sign errors, and recalculates changed inputs", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "Build a row dot product" }));
    const input = lab.getByRole("spinbutton", { name: "Your predicted row output" });
    const submit = lab.getByRole("button", { name: "Check row output" });
    expect(submit).toBeDisabled();
    fireEvent.change(input, { target: { value: "6" } });
    fireEvent.click(submit);
    expect(lab.getByText(/first coordinate's contribution only/)).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Try this row again" }));
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Output 2 · row 2" }));
    expect(input).toHaveValue(null);
    expect(lab.queryByRole("status", { name: "Row prediction feedback" })).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "15" } });
    fireEvent.click(submit);
    expect(lab.getByText(/A negative contribution became positive/)).toBeInTheDocument();
    fireEvent.change(lab.getByRole("slider", { name: /First input coordinate/ }), { target: { value: "4" } });
    expect(submit).toBeDisabled();
    expect(lab.queryByRole("status", { name: "Row prediction feedback" })).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "8" } });
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    fireEvent.change(lab.getByRole("slider", { name: /Second input coordinate/ }), { target: { value: "0" } });
    fireEvent.change(input, { target: { value: "-4" } });
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
  });

  it("retains the visual transformations and explains a diagonal-only calculation mistake", async () => {
    render(<App />);
    await screen.findByRole("heading", { name: "How can one calculation produce several outputs?" });
    expect(screen.getByRole("img", { name: "Input vector 2, 1 transforms to 4, 1" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Swap x and y" }));
    expect(screen.getByRole("img", { name: "Input vector 2, 1 transforms to 1, 2" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Add y into x" }));
    expect(screen.getByRole("img", { name: "Input vector 2, 1 transforms to 3, 1" })).toBeInTheDocument();
    const check = within(document.querySelector("#reading-matrix-vector-multiplication-worked-example .guided-check"));
    fireEvent.click(check.getByRole("button", { name: /\[6, 12\]/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getAllByText(matrixVectorChecks[2].optionExplanations[0])).toHaveLength(2);
    expect(check.getByText("Why the correct answer works:")).toBeInTheDocument();
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });

  it("offers the new exam and marks through the existing practice route", async () => {
    window.location.hash = "#/lessons/matrix-vector-multiplication/practice";
    render(<App />);
    await screen.findByRole("heading", { name: "Test the whole lesson" });
    expect(screen.getAllByRole("button", { name: "Reveal worked answer and marking guide" })).toHaveLength(5);
    const exam = within(screen.getByRole("heading", { name: "A. Calculate and explain an update · 5 marks" }).closest("article"));
    const input = exam.getByRole("textbox", { name: "Your working and explanation" });
    fireEvent.change(input, { target: { value: "[0,11] plus column 3 [-1,3] gives [-1,14]." } });
    fireEvent.click(exam.getByRole("button", { name: "Reveal worked answer and marking guide" }));
    expect(exam.getByText("1 mark: identifies the third-column change.")).toBeInTheDocument();
    expect(input).toHaveValue("[0,11] plus column 3 [-1,3] gives [-1,14].");
  });

  it("strictly validates prose formulas and every option's explanation", () => {
    const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
    const formulas = strings(lessonById["matrix-vector-multiplication"]).flatMap((value) => [...value.matchAll(/\\\(([\s\S]*?)\\\)/g)].map((match) => match[1]));
    expect(formulas.length).toBeGreaterThan(0);
    for (const formula of formulas) expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), formula).not.toThrow();
    for (const question of matrixVectorChecks) {
      expect(question.optionExplanations).toHaveLength(question.options.length);
      expect(question.optionExplanations.every((explanation) => typeof explanation === "string" && explanation.length > 20)).toBe(true);
    }
  });
});
