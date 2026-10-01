import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import { lessonById } from "../content/index.js";
import { recoveryLessons } from "../content/recoveryLessons.js";

describe("recovery, rank and basis lesson batch", () => {
  beforeEach(() => window.localStorage.clear());

  it("retains the inverse graph and explains the wrong transpose-as-inverse choice", async () => {
    window.location.hash = "#/lessons/inverse-systems/start";
    render(<App />);
    const graph = within(await screen.findByRole("region", { name: "Move the equations and recover their shared solution" }));
    expect(graph.getByText("x = [3, 1]")).toBeInTheDocument();
    fireEvent.change(graph.getByRole("slider", { name: "System output one" }), { target: { value: "2" } });
    expect(graph.getByRole("img", { name: "Two equations intersect at 2, 0" })).toBeInTheDocument();
    const check = within(document.querySelector("#reading-inverse-systems-plain-idea .guided-check"));
    fireEvent.click(check.getByRole("button", { name: /A⁻¹ always equals Aᵀ$/ }));
    fireEvent.click(check.getByRole("button", { name: "Check my answer" }));
    expect(check.getAllByText(recoveryLessons["inverse-systems"].checks[1].optionExplanations[2])).toHaveLength(2);
    expect(check.getByText("Why the correct answer works:")).toBeInTheDocument();
  });

  it("shows a null displacement disappearing, surviving, or losing every direction", async () => {
    window.location.hash = "#/lessons/rank-column-null/start";
    render(<App />);
    const graph = within(await screen.findByRole("region", { name: "Move an input along a possible null direction" }));
    fireEvent.change(graph.getByRole("slider", { name: /Input displacement t/ }), { target: { value: "1" } });
    expect(graph.getByRole("img", { name: "Input 5, 0 maps to output 5, 10" })).toBeInTheDocument();
    expect(graph.getByText("rank 1 · nullity 1")).toBeInTheDocument();
    fireEvent.click(graph.getByRole("button", { name: "Independent columns" }));
    expect(graph.getByRole("img", { name: "Input 5, 0 maps to output 5, 0" })).toBeInTheDocument();
    expect(graph.getByText("rank 2 · nullity 0")).toBeInTheDocument();
    fireEvent.click(graph.getByRole("button", { name: "Zero map" }));
    expect(graph.getByRole("img", { name: "Input 5, 0 maps to output 0, 0" })).toBeInTheDocument();
    expect(graph.getByText("rank 0 · nullity 2")).toBeInTheDocument();
    expect(graph.getByText(/loses both independent input directions/)).toBeInTheDocument();
  });

  it("reconstructs the same destination after changing basis and updating coordinates", async () => {
    window.location.hash = "#/lessons/basis-coordinates/start";
    render(<App />);
    const graph = within(await screen.findByRole("region", { name: "Change the measuring directions, not the vector recipe" }));
    fireEvent.change(graph.getByRole("slider", { name: "Basis coordinate one" }), { target: { value: "3" } });
    fireEvent.change(graph.getByRole("slider", { name: "Basis coordinate two" }), { target: { value: "2" } });
    expect(graph.getByRole("img", { name: "Vector 3, 2 in the selected basis" })).toBeInTheDocument();
    fireEvent.click(graph.getByRole("button", { name: "Skew basis" }));
    expect(graph.getByRole("img", { name: "Vector 5, 2 in the selected basis" })).toBeInTheDocument();
    fireEvent.change(graph.getByRole("slider", { name: "Basis coordinate one" }), { target: { value: "1" } });
    expect(graph.getByRole("img", { name: "Vector 3, 2 in the selected basis" })).toBeInTheDocument();
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });

  for (const [id, pack] of Object.entries(recoveryLessons)) {
    it(`offers authored written practice and marking for ${id}`, async () => {
      window.location.hash = `#/lessons/${id}/practice`;
      render(<App />);
      await screen.findByRole("heading", { name: "Test the whole lesson" });
      expect(screen.getAllByRole("button", { name: "Reveal worked answer and marking guide" })).toHaveLength(5);
      const exam = within(screen.getByRole("heading", { name: pack.exam[1].title }).closest("article"));
      const input = exam.getByRole("textbox", { name: "Your working and explanation" });
      fireEvent.change(input, { target: { value: "My attempt before revealing the worked answer." } });
      fireEvent.click(exam.getByRole("button", { name: "Reveal worked answer and marking guide" }));
      expect(exam.getByText(pack.exam[1].marking[0])).toBeInTheDocument();
      expect(input).toHaveValue("My attempt before revealing the worked answer.");
    });
  }

  it("keeps stable sections and strictly renders all authored formulas and symbols", () => {
    const strings = (value) => typeof value === "string" ? [value] : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
    for (const [id, pack] of Object.entries(recoveryLessons)) {
      const lesson = lessonById[id];
      expect(lesson.beginnerSteps.map((step) => step.id)).toEqual(["start", "everyday-story", "plain-idea", "worked-example", "your-turn", "math-to-ml", "recap"]);
      for (const formula of strings(lesson).flatMap((value) => [...value.matchAll(/\\\(([\s\S]*?)\\\)/g)].map((match) => match[1]))) expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), formula).not.toThrow();
      const notation = lesson.beginnerSteps.find((step) => step.id === "math-to-ml").notation;
      for (const formula of [notation.latex, ...notation.symbols.map(([symbol]) => symbol)]) expect(() => katex.renderToString(formula, { throwOnError: true, strict: "error" }), formula).not.toThrow();
      expect(pack.checks).toHaveLength(5);
      for (const check of pack.checks) {
        expect(check.optionExplanations).toHaveLength(check.options.length);
        expect(check.optionExplanations.every((reason) => reason.length > 20)).toBe(true);
      }
    }
  });
});
