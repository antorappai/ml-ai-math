import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App.jsx";
import { lessonById, lessons } from "../content/index.js";
import { adjacentLessons, pythonExamples } from "../utils/lessonNavigation.js";
import { STORAGE_KEY } from "../state/mastery.js";

beforeEach(() => window.localStorage.clear());

describe("lesson navigation and grouped Python", () => {
  it("returns from a Python companion to the exact guided step", async () => {
    window.location.hash = "#/lessons/linear-regression-ml/worked-example";
    render(<App />);
    await screen.findByRole("heading", { name: "Follow one worked example" });
    fireEvent.click(screen.getByRole("link", { name: "Python lab" }));
    await screen.findByRole("heading", { name: "Turn this lesson into code" });
    expect(screen.getByRole("link", { name: "Study guide" })).toHaveAttribute("href", "#/lessons/linear-regression-ml/worked-example");
    fireEvent.click(screen.getByRole("link", { name: "Study guide" }));
    expect(await screen.findByRole("heading", { name: "Follow one worked example" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).lastGuidedSteps["linear-regression-ml"]).toBe("worked-example");
  });

  it("finishes a unit and continues into the next unit without returning to the dashboard", async () => {
    window.location.hash = "#/lessons/summation-subscripts-sets/recap";
    render(<App />);
    await screen.findByRole("heading", { name: "Recap and choose what comes next" });
    const finish = screen.getByRole("link", { name: "Finish & next lesson →" });
    expect(finish).toHaveAttribute("href", "#/lessons/scalars-vectors-tensors/start");
    fireEvent.click(finish);
    await screen.findByRole("heading", { name: "Start here" });
    expect(window.location.hash).toBe("#/lessons/scalars-vectors-tensors/start");
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(Object.values(state.completedSteps["summation-subscripts-sets"])).toEqual(Array(7).fill(true));
    expect(state.completedLevels["summation-subscripts-sets"]).toEqual({ basics: true, core: true, advanced: true });
  });

  it("provides a lesson chooser on resource pages", async () => {
    window.location.hash = "#/lessons/tensors-perceptrons/formula";
    render(<App />);
    await screen.findByRole("heading", { name: "Read the maths without guessing" });
    fireEvent.change(screen.getByLabelText("Jump to lesson"), { target: { value: "cnn-convolution" } });
    await screen.findByRole("heading", { name: "Start here" });
    expect(window.location.hash).toBe("#/lessons/cnn-convolution/start");
  });

  it("has correct previous and next links throughout all 73 lessons", () => {
    for (let index = 0; index < lessons.length; index++) {
      expect(adjacentLessons(lessons[index])).toEqual({ previous: lessons[index - 1], next: lessons[index + 1] });
    }
  });

  it("ends the final lesson safely and records completion", async () => {
    window.location.hash = "#/lessons/attention-transformers/recap";
    render(<App />);
    await screen.findByRole("heading", { name: "Recap and choose what comes next" });
    fireEvent.click(screen.getByRole("link", { name: "Finish course →" }));
    await screen.findByRole("heading", { name: /Learn the maths behind machine learning/i });
    expect(Object.values(JSON.parse(localStorage.getItem(STORAGE_KEY)).completedSteps["attention-transformers"]).every(Boolean)).toBe(true);
  });

  it("groups the Python library by chapter and filters by execution location", async () => {
    window.location.hash = "#/python";
    render(<App />);
    await screen.findByRole("heading", { name: "Learn the maths, then run it" });
    expect(screen.getByRole("status")).toHaveTextContent("43 lessons");
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(6);
    fireEvent.change(screen.getByLabelText("Show examples"), { target: { value: "browser" } });
    expect(screen.getByRole("status")).toHaveTextContent("38 lessons");
    fireEvent.change(screen.getByLabelText("Show examples"), { target: { value: "notebook" } });
    expect(screen.getByRole("status")).toHaveTextContent("6 lessons");
  });

  it("keeps grouped editors mounted when closed and distinguishes notebooks from runnable examples", async () => {
    window.location.hash = "#/lessons/tensors-perceptrons/python";
    render(<App />);
    await screen.findByRole("heading", { name: "Turn this lesson into code" });
    const editor = screen.getByLabelText("Editable code");
    fireEvent.change(editor, { target: { value: "print('my changes')" } });
    const groups = document.querySelectorAll(".python-example-group");
    expect(groups).toHaveLength(2);
    expect(groups[0].open).toBe(true);
    expect(groups[1].open).toBe(false);
    groups[0].open = false;
    groups[0].open = true;
    expect(editor).toHaveValue("print('my changes')");
    expect(screen.getByRole("link", { name: "Browse all Python examples →" })).toHaveAttribute("href", "#/python");
    expect(document.querySelector('a[href*="colab.research.google.com"]')).toBeTruthy();
    expect(pythonExamples(lessonById["functions-domain-range"])).toHaveLength(1);
    expect(pythonExamples(lessonById["functions-domain-range"])[0].levels).toHaveLength(3);
  });
});
