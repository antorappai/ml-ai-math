import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import { lessonById } from "../content/index.js";
import { matrixMatrixChecks } from "../content/matrixMatrixLesson.js";

describe("matrix–matrix teaching trial", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/lessons/matrix-matrix-multiplication/start";
  });

  it("diagnoses row-versus-column and omitted contributions, and builds the bill table", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "Price an order at a chosen shop" }));
    const input = lab.getByRole("spinbutton", { name: "Your predicted cell value (coins)" });
    const submit = lab.getByRole("button", { name: "Check cell value" });
    expect(submit).toBeDisabled();
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(submit);
    expect(lab.getByText(/That result uses a row of B/)).toBeInTheDocument();
    expect(lab.getByRole("button", { name: "Calculate order 1 at shop 1" })).toHaveTextContent("8");
    fireEvent.click(lab.getByRole("button", { name: "Calculate order 1 at shop 2" }));
    expect(input).toHaveValue(null);
    expect(lab.queryByRole("status", { name: "Matrix product feedback" })).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "8" } });
    fireEvent.click(submit);
    expect(lab.getByText(/pays for the sandwiches only/)).toBeInTheDocument();
    fireEvent.click(lab.getByRole("button", { name: "Try this cell again" }));
    fireEvent.change(input, { target: { value: "9" } });
    fireEvent.click(submit);
    expect(lab.getByText("That’s right.")).toBeInTheDocument();
    for (const [name, value] of [["Calculate order 2 at shop 1", "9"], ["Calculate order 2 at shop 2", "7"]]) {
      fireEvent.click(lab.getByRole("button", { name }));
      fireEvent.change(input, { target: { value } });
      fireEvent.click(submit);
      expect(lab.getByText("That’s right.")).toBeInTheDocument();
      expect(lab.getByRole("button", { name })).toHaveTextContent(value);
    }
  });

  it("clears stale results after a price change and preserves the unchanged shop calculation", async () => {
    render(<App />);
    const lab = within(await screen.findByRole("region", { name: "Price an order at a chosen shop" }));
    const input = lab.getByRole("spinbutton", { name: "Your predicted cell value (coins)" });
    const submit = lab.getByRole("button", { name: "Check cell value" });
    fireEvent.change(input, { target: { value: "8" } });
    fireEvent.click(submit);
    fireEvent.change(lab.getByRole("slider", { name: /Shop 1 sandwich price/ }), { target: { value: "5" } });
    expect(input).toHaveValue(null);
    expect(submit).toBeDisabled();
    expect(lab.queryByRole("status", { name: "Matrix product feedback" })).not.toBeInTheDocument();
    expect(lab.getByRole("button", { name: "Calculate order 1 at shop 1" })).toHaveTextContent("?");
    for (const [name, value] of [["Calculate order 1 at shop 1", "12"], ["Calculate order 2 at shop 1", "11"], ["Calculate order 1 at shop 2", "9"], ["Calculate order 2 at shop 2", "7"]]) {
      fireEvent.click(lab.getByRole("button", { name }));
      fireEvent.change(input, { target: { value } });
      fireEvent.click(submit);
      expect(lab.getByText("That’s right.")).toBeInTheDocument();
    }
  });

  it("explains elementwise multiplication and exposes all options after checking", async () => {
    render(<App />);
    await screen.findByRole("heading", { name: "What if every row needs more than one result?" });
    const check = within(document.querySelector("#reading-matrix-matrix-multiplication-worked-example .guided-check"));
    fireEvent.click(check.getByRole("button", { name: /\[\[6, 4\], \[2, 3\]\]/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getAllByText(matrixMatrixChecks[2].optionExplanations[0])).toHaveLength(2);
    expect(check.getByText("Why the correct answer works:")).toBeInTheDocument();
    expect(check.getByText("Why each choice is right or wrong")).toBeInTheDocument();
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });

  it("includes the new written practice and exam with marking guides", async () => {
    window.location.hash = "#/lessons/matrix-matrix-multiplication/practice";
    render(<App />);
    await screen.findByRole("heading", { name: "Test the whole lesson" });
    expect(screen.getAllByRole("button", { name: "Reveal worked answer and marking guide" })).toHaveLength(5);
    const exam = within(screen.getByRole("heading", { name: "B. Two output scores for each student · 5 marks" }).closest("article"));
    const input = exam.getByRole("textbox", { name: "Your working and explanation" });
    fireEvent.change(input, { target: { value: "Nimal: [47,48]. Swap feature rows of W." } });
    fireEvent.click(exam.getByRole("button", { name: "Reveal worked answer and marking guide" }));
    expect(exam.getByText("1 mark: correct compensating row swap in W.")).toBeInTheDocument();
    expect(input).toHaveValue("Nimal: [47,48]. Swap feature rows of W.");
  });

  it("strictly validates prose formulas and gives each option a reason", () => {
    const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
    const formulas = strings(lessonById["matrix-matrix-multiplication"]).flatMap((value) => [...value.matchAll(/\\\(([\s\S]*?)\\\)/g)].map((match) => match[1]));
    expect(formulas.length).toBeGreaterThan(0);
    for (const formula of formulas) expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), formula).not.toThrow();
    for (const question of matrixMatrixChecks) {
      expect(question.optionExplanations).toHaveLength(question.options.length);
      expect(question.optionExplanations.every((explanation) => typeof explanation === "string" && explanation.length > 20)).toBe(true);
    }
  });
});
