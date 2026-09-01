import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { describe, expect, it } from "vitest";
import { chapters, coursePacks, formulaList, getChapterLessons, getLessonQuestions, lessonById, lessons, projects, terminology } from "../content/index.js";

describe("curriculum integrity", () => {
  it("contains the full progressive roadmap", () => {
    expect(chapters.map((chapter) => chapter.id)).toEqual([
      "foundations", "linear-algebra", "calculus-optimization", "probability-statistics", "classical-ml", "deep-learning"
    ]);
    expect(lessons.length).toBe(73);
    expect(chapters.filter((chapter) => chapter.phase === 1).map((chapter) => chapter.lessonIds.length)).toEqual([9, 19, 12, 17]);
    for (const lesson of lessons) expect(Object.keys(lesson.levels)).toEqual(["basics", "core", "advanced"]);
    for (const chapter of chapters) {
      const questionCount = getChapterLessons(chapter.id).flatMap(getLessonQuestions).length;
      expect(questionCount).toBeGreaterThanOrEqual(10);
    }
  });

  it("meets the beginner-first Phase 1 teaching standard", () => {
    const phaseOneLessons = chapters.filter((chapter) => chapter.phase === 1).flatMap((chapter) => getChapterLessons(chapter.id));
    expect(phaseOneLessons).toHaveLength(57);
    for (const lesson of phaseOneLessons) {
      expect(lesson.beginnerFirst).toBe(true);
      expect(getLessonQuestions(lesson)).toHaveLength(5);
      expect(Object.values(lesson.levels).flatMap((content) => content.calculationProblems)).toHaveLength(5);
      expect(Object.values(lesson.levels).flatMap((content) => content.examQuestions)).toHaveLength(3);
      expect(lesson.vocabulary.length).toBeGreaterThan(0);
      for (const term of lesson.vocabulary) {
        for (const field of ["definition", "analogy", "example", "nonExample", "mlConnection"]) expect(term[field]).toBeTruthy();
      }
      for (const content of Object.values(lesson.levels)) {
        expect(content.realWorldScenario.body).toBeTruthy();
        expect(content.mlScenario.body).toBeTruthy();
        expect(content.workedExamples).toHaveLength(1);
        const [example] = content.workedExamples;
        expect(example.situation.title).toBeTruthy();
        expect(example.situation.story).toBeTruthy();
        expect(example.quantityMap.length).toBeGreaterThan(0);
        expect(example.realWorldMeaning).toBeTruthy();
        expect(example.mlParallel).toBeTruthy();
      }
    }
    expect(Object.keys(terminology).length).toBeGreaterThanOrEqual(57);
  });

  it("orders the required explanation chains before their dependants", () => {
    const position = (id) => lessons.findIndex((lesson) => lesson.id === id);
    const chains = [
      ["scalars-vectors-tensors", "vector-arithmetic", "matrix-anatomy-types", "linear-transformations", "eigenvalues-eigenvectors", "covariance-matrices-pca"],
      ["functions-domain-range", "graphs-slope-intercept", "change-slope-limits", "derivative-definition", "partial-derivatives", "gradients-directional-change", "chain-rule-computational-graphs"],
      ["experiments-outcomes-events", "conditional-probability", "bayes-theorem"],
      ["random-variables", "probability-mass-function", "probability-density-function", "cumulative-distribution-function"],
      ["random-variables", "expected-value", "variance-population-sample", "standard-deviation"]
    ];
    for (const chain of chains) for (let index = 1; index < chain.length; index += 1) {
      expect(position(chain[index - 1])).toBeLessThan(position(chain[index]));
    }
  });

  it("assigns formal notation to the lesson that introduces each hard concept", () => {
    const expectedOwners = {
      "scalars-vectors-tensors": "vector-notation",
      "inverse-systems": "matrix-inverse",
      "basis-coordinates": "basis-coordinates",
      "change-slope-limits": "limit",
      "partial-derivatives": "partial-derivative",
      "jacobian-matrices": "jacobian",
      "hessians-convexity": "hessian",
      "conditional-probability": "conditional-probability",
      "random-variables": "random-variable-map",
      "probability-mass-function": "probability-mass-function",
      "probability-density-function": "probability-density-function",
      "cumulative-distribution-function": "cumulative-distribution-function",
      "normal-z-scores": "normal-notation",
      "sampling-estimators-clt": "sample-mean",
      "confidence-intervals": "confidence-interval"
    };
    for (const [lessonId, formulaId] of Object.entries(expectedOwners)) {
      expect(lessonById[lessonId].levels.basics.formulaIds).toContain(formulaId);
    }
  });

  it("expands probability distribution abbreviations before using them", () => {
    expect(lessonById["probability-mass-function"].title).toBe("Probability Mass Function (PMF)");
    expect(lessonById["probability-density-function"].title).toBe("Probability Density Function (PDF)");
    expect(lessonById["cumulative-distribution-function"].title).toBe("Cumulative Distribution Function (CDF)");
    for (const lessonId of ["probability-mass-function", "probability-density-function", "cumulative-distribution-function"]) {
      expect(lessonById[lessonId].vocabulary[0].definition).toBeTruthy();
      expect(lessonById[lessonId].levels.basics.formulaIds).toHaveLength(1);
    }
  });

  it("keeps topic-specific Python companions on computational foundations", () => {
    const phaseOneLessons = chapters.filter((chapter) => chapter.phase === 1).flatMap((chapter) => getChapterLessons(chapter.id));
    const withPython = phaseOneLessons.filter((lesson) => lesson.levels.basics.pythonLab);
    expect(withPython.length).toBeGreaterThanOrEqual(28);
    for (const lessonId of ["dot-product-angle", "linear-transformations", "eigendecomposition", "covariance-matrices-pca", "partial-derivatives", "bayes-theorem", "normal-z-scores"]) {
      const lab = lessonById[lessonId].levels.basics.pythonLab;
      expect(lab.code).toBeTruthy();
      expect(lab.output).toBeTruthy();
      expect(lab.explanation).toBeTruthy();
      expect(lab.mathToCode).toBeTruthy();
      expect(lab.commonTrap).toBeTruthy();
      expect(lab.exercise.prompt).toBeTruthy();
    }
  });

  it("renders every canonical LaTeX formula without an error", () => {
    for (const formula of formulaList) {
      const rendered = katex.renderToString(formula.latex, { throwOnError: true });
      expect(rendered).toContain("katex");
      expect(formula.symbols.length).toBeGreaterThan(0);
      for (const [symbol] of formula.symbols) expect(() => katex.renderToString(symbol, { throwOnError: true })).not.toThrow();
      expect(formula.beginnerExample).toBeTruthy();
    }
  });

  it("resolves course packs, projects, and prepared notebooks", () => {
    for (const pack of coursePacks) for (const lessonId of pack.lessonIds) expect(lessonById[lessonId]).toBeTruthy();
    expect(projects.length).toBeGreaterThanOrEqual(13);
    for (const lesson of lessons) for (const content of Object.values(lesson.levels)) {
      if (content.pythonLab?.runtime === "notebook") {
        expect(fs.existsSync(path.resolve(content.pythonLab.notebookPath))).toBe(true);
      }
    }
  });
});
