import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import katex from "katex";
import App from "../App.jsx";
import GuidedLesson from "../components/GuidedLesson.jsx";
import { MathText } from "../components/Math.jsx";
import { chapterById, lessons, formulaList } from "../content/index.js";
import { GUIDED_NOTATION } from "../content/guidedNotation.js";
import { MasteryProvider } from "../state/mastery.js";

const strictRender = (latex) => katex.renderToString(latex, { throwOnError: true, strict: "error" });

describe("curriculum LaTeX rendering", () => {
  it("validates every guided and reference formula and every symbol in strict mode", () => {
    expect(Object.keys(GUIDED_NOTATION).sort()).toEqual(lessons.map((lesson) => lesson.id).sort());
    for (const formula of [...Object.values(GUIDED_NOTATION), ...formulaList]) {
      expect(formula.latex).toBeTruthy();
      for (const latex of [formula.latex, ...formula.symbols.map(([symbol]) => symbol)]) {
        expect(() => strictRender(latex), latex).not.toThrow();
      }
    }
  });

  it("renders all 73 guided notation pages and every widget formula companion with KaTeX", () => {
    for (const lesson of lessons) {
      const stepIds = ["math-to-ml", ...lesson.beginnerSteps.filter((step) => step.widget).map((step) => step.id)];
      for (const stepId of stepIds) {
        const html = renderToStaticMarkup(<MemoryRouter><MasteryProvider><GuidedLesson lesson={lesson} chapter={chapterById[lesson.chapterId]} stepId={stepId} /></MasteryProvider></MemoryRouter>);
        const doc = new DOMParser().parseFromString(html, "text/html");
        const panel = doc.querySelector(stepId === "math-to-ml" ? ".notation-panel" : ".formula-companion");
        expect(panel?.querySelector(".block-math .katex"), `${lesson.id}/${stepId}`).toBeTruthy();
        expect(doc.querySelector(".katex-error, .math-fallback")).toBeNull();
        if (stepId === "math-to-ml") {
          expect(panel.querySelectorAll("dt .katex").length).toBe(GUIDED_NOTATION[lesson.id].symbols.length);
        }
      }
    }
  }, 30000);

  it("typesets explicit inline math without interpreting prices, ordinary prose, or HTML", () => {
    const html = renderToStaticMarkup(<MathText>{String.raw`Pay $5 for \(\hat{y}=2x+5\), then use \(x=4\). <script>no</script>`}</MathText>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll(".katex")).toHaveLength(2);
    expect(doc.querySelector("mover")).toBeTruthy();
    expect(doc.body.textContent).toContain("Pay $5");
    expect(doc.querySelector("script")).toBeNull();
  });

  it("shows a real prediction hat in the regression story and worked example", async () => {
    window.location.hash = "#/lessons/linear-regression-ml/worked-example";
    render(<App />);
    await screen.findByRole("heading", { name: "Make a prediction" });
    expect(document.querySelector(".example-question mover")).toBeTruthy();
    expect(document.querySelector(".example-question").textContent).not.toContain("yhat");
    window.location.hash = "#/lessons/linear-regression-ml/everyday-story";
    await screen.findByRole("heading", { name: "See it in everyday life" });
    expect(document.querySelector(".story-panel mover")).toBeTruthy();
    expect(document.querySelector(".guided-quantities").textContent).toContain("4 kilometres");
    expect(document.querySelectorAll(".guided-quantities dl > div")).toHaveLength(3);
    expect(document.querySelector(".katex-error, .math-fallback")).toBeNull();
  });
});
