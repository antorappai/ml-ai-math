import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { describe, expect, it } from "vitest";
import { chapters, coursePacks, formulaList, getChapterLessons, getLessonQuestions, lessonById, lessons, projects, terminology } from "../content/index.js";
import { CONTENT_AUDIT_STATES, GUIDED_CONTENT_AUDIT, GUIDED_LESSON_IDS } from "../content/guidedEnhancements.js";

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

  it("gives Foundations and the first ML bridge complete guided structure", () => {
    const bridgeIds = [
      "scalars-vectors-tensors", "vector-arithmetic", "vector-magnitude-distance", "dot-product-angle",
      "matrix-anatomy-types", "linear-transformations", "change-slope-limits", "derivative-definition",
      "partial-derivatives", "gradients-directional-change", "chain-rule-computational-graphs", "gradient-descent-learning-rate",
      "unit-vectors-normalization", "matrix-vector-multiplication", "derivative-rules", "tangents-stationary-points",
      "scalar-vector-functions", "loss-functions", "jacobian-matrices", "hessians-convexity",
      "matrix-matrix-multiplication", "transpose-symmetry", "determinant-collapse", "inverse-systems",
      "rank-column-null", "basis-coordinates", "change-of-basis", "composition-matrix-powers",
      "eigenvalues-eigenvectors", "eigendecomposition", "covariance-matrices-pca",
      "experiments-outcomes-events", "set-operations-counting", "probability-rules", "conditional-probability", "bayes-theorem",
      "random-variables", "probability-mass-function", "probability-density-function", "cumulative-distribution-function",
      "expected-value", "variance-population-sample", "standard-deviation", "bernoulli-binomial",
      "normal-z-scores", "covariance-correlation", "sampling-estimators-clt", "confidence-intervals",
      "ml-workflow", "linear-regression-ml", "logistic-classification", "knn-distance", "naive-bayes",
      "trees-ensembles", "support-vector-machines", "clustering-unsupervised", "model-selection-generalization"
    ];
    const foundationLessons = getChapterLessons("foundations");
    const guidedLessons = [...foundationLessons, ...bridgeIds.map((id) => lessonById[id]), ...getChapterLessons("deep-learning")];
    expect(foundationLessons).toHaveLength(9);
    expect(guidedLessons).toHaveLength(73);
    for (const lesson of guidedLessons) {
      expect(lesson.beginnerSteps.map((step) => step.type)).toEqual([
        "orientation", "scenario", "concept", "worked-example", "check", "notation", "recap"
      ]);
      expect(new Set(lesson.beginnerSteps.map((step) => step.id)).size).toBe(7);
      expect(lesson.beginnerSteps.find((step) => step.type === "worked-example").example).toBeTruthy();
      const notation = lesson.beginnerSteps.find((step) => step.type === "notation");
      expect(notation.notation.readAs).toBeTruthy();
      expect(notation.notation.symbols.length).toBeGreaterThan(0);
      expect(notation.mlExample).toBeTruthy();
      expect(lesson.beginnerSteps.filter((step) => step.check).length).toBeGreaterThanOrEqual(4);
      expect(lesson.beginnerSteps.find((step) => step.type === "recap").recapQuestions).toHaveLength(3);
      const interactiveStep = lesson.beginnerSteps.find((step) => step.widget);
      if (interactiveStep) {
        expect(interactiveStep.notation?.expression).toBeTruthy();
        expect(interactiveStep.notation?.readAs).toBeTruthy();
        expect(Array.isArray(interactiveStep.formulaIds)).toBe(true);
      }
    }
    expect(lessons.filter((lesson) => lesson.beginnerSteps?.length)).toHaveLength(73);
    expect(lessonById["graphs-slope-intercept"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("slope-explorer");
    expect(lessonById["gradients-directional-change"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("gradient-explorer");
    expect(lessonById["unit-vectors-normalization"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("unit-vector-explorer");
    expect(lessonById["matrix-vector-multiplication"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("matrix-vector-explorer");
    expect(lessonById["tangents-stationary-points"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("tangent-explorer");
    expect(lessonById["loss-functions"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("loss-explorer");
    expect(lessonById["jacobian-matrices"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("jacobian-explorer");
    expect(lessonById["hessians-convexity"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("curvature-explorer");
    expect(lessonById["gradient-descent-learning-rate"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("learning-rate-explorer");
    expect(getChapterLessons("calculus-optimization").every((lesson) => lesson.beginnerSteps?.length === 7)).toBe(true);
    expect(getChapterLessons("linear-algebra").every((lesson) => lesson.beginnerSteps?.length === 7)).toBe(true);
    expect(getChapterLessons("probability-statistics").every((lesson) => lesson.beginnerSteps?.length === 7)).toBe(true);
    expect(getChapterLessons("classical-ml").every((lesson) => lesson.beginnerSteps?.length === 7)).toBe(true);
    expect(lessonById["determinant-collapse"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("determinant-explorer");
    expect(lessonById["inverse-systems"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("inverse-system-explorer");
    expect(lessonById["basis-coordinates"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("basis-explorer");
    expect(lessonById["eigenvalues-eigenvectors"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("eigenvector-explorer");
    expect(lessonById["covariance-matrices-pca"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("pca-explorer");
    expect(lessonById["experiments-outcomes-events"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("sample-space-explorer");
    expect(lessonById["set-operations-counting"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("set-overlap-explorer");
    expect(lessonById["probability-rules"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("probability-rule-explorer");
    expect(lessonById["conditional-probability"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("conditional-explorer");
    expect(lessonById["bayes-theorem"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("bayes-explorer");
    expect(lessonById["random-variables"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("random-variable-explorer");
    expect(lessonById["probability-mass-function"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("pmf-explorer");
    expect(lessonById["probability-density-function"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("pdf-explorer");
    expect(lessonById["cumulative-distribution-function"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("cdf-explorer");
    expect(lessonById["expected-value"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("expected-value-explorer");
    expect(lessonById["variance-population-sample"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("variance-explorer");
    expect(lessonById["standard-deviation"].beginnerSteps.find((step) => step.id === "plain-idea").widget).toBe("standard-deviation-explorer");
  });

  it("keeps all guided everyday stories and ML bridges at the completed teaching standard", () => {
    expect(GUIDED_LESSON_IDS).toHaveLength(73);
    expect(new Set(GUIDED_LESSON_IDS).size).toBe(73);
    expect(Object.keys(GUIDED_CONTENT_AUDIT)).toEqual(GUIDED_LESSON_IDS);
    for (const lessonId of GUIDED_LESSON_IDS) {
      const lesson = lessonById[lessonId];
      const everyday = lesson.beginnerSteps.find((step) => step.type === "scenario").everyday;
      const concept = lesson.beginnerSteps.find((step) => step.type === "concept");
      const bridge = lesson.beginnerSteps.find((step) => step.type === "notation").mlBridge;
      expect(everyday.setup.length).toBeGreaterThanOrEqual(2);
      expect(everyday.quantities.length).toBeGreaterThanOrEqual(2);
      expect(everyday.walkthrough.every((item) => item.action && item.reason)).toBe(true);
      expect(JSON.stringify(everyday.quantities)).toMatch(/[0-9₀-₉⁰-⁹]/);
      expect(bridge.terms.length).toBeGreaterThanOrEqual(2);
      expect(bridge.terms.every((item) => item.definition && item.lessonId && ["preview", "review"].includes(item.state))).toBe(true);
      expect(bridge.mapping.length).toBeGreaterThanOrEqual(2);
      expect(bridge.walkthrough.every((item) => item.action && item.reason)).toBe(true);
      expect(JSON.stringify(bridge.mapping)).toMatch(/[0-9₀-₉⁰-⁹]/);
      expect(new Set(concept.body).size).toBe(concept.body.length);
      expect(JSON.stringify({ everyday, bridge })).not.toMatch(/\b(obvious|trivial|simply)\b/i);
      for (const [field, status] of Object.entries(GUIDED_CONTENT_AUDIT[lessonId])) {
        if (field === "chapterId") continue;
        expect(CONTENT_AUDIT_STATES).toContain(status);
        expect(status).toBe("done");
      }
    }
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

describe("Deep Learning teaching audit", () => {
  it("provides explicit reasons, quantities, definitions, and working review links", () => {
    for (const lesson of getChapterLessons("deep-learning")) {
      expect(lesson.beginnerSteps).toHaveLength(7);
      const [start, story, concept, worked, , notation] = lesson.beginnerSteps;
      expect(start.body[0].length).toBeGreaterThan(100);
      expect(story.everyday.quantities.length).toBeGreaterThanOrEqual(2);
      expect(worked.example.walkthrough.every(({ action, reason }) => action && reason)).toBe(true);
      expect(notation.mlBridge.walkthrough.every(({ action, reason }) => action && reason)).toBe(true);
      for (const term of notation.mlBridge.terms) expect(lessonById[term.lessonId].beginnerSteps.some((step) => step.id === "plain-idea")).toBe(true);
      expect(concept.vocabulary.every((term) => term.definition && term.example && term.nonExample)).toBe(true);
      expect(notation.formulaIds).toEqual([...new Set(Object.values(lesson.levels).flatMap((level) => level.formulaIds))]);
      expect(Object.values(lesson.levels).some((level) => level.pythonLab)).toBe(true);
      expect(GUIDED_CONTENT_AUDIT[lesson.id].chapterId).toBe("deep-learning");
    }
  });
});
