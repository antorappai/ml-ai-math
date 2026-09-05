import { describe, expect, it } from "vitest";
import katex from "katex";
import { CLASSICAL_ML_GUIDES } from "../content/classicalMlGuides.js";
import { getChapterLessons, lessonById } from "../content/index.js";

function strings(value) {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("Classical ML concrete guided examples", () => {
  it("uses a named everyday calculation and explicit model mapping in every lesson", () => {
    const chapterLessons = getChapterLessons("classical-ml");
    expect(Object.keys(CLASSICAL_ML_GUIDES)).toEqual(chapterLessons.map((lesson) => lesson.id));
    for (const lesson of chapterLessons) {
      const guide = CLASSICAL_ML_GUIDES[lesson.id];
      const story = lesson.beginnerSteps.find((step) => step.type === "scenario").everyday;
      const worked = lesson.beginnerSteps.find((step) => step.type === "worked-example").example;
      const bridge = lesson.beginnerSteps.find((step) => step.type === "notation").mlBridge;
      expect(worked).toBe(guide.everydayExample);
      expect(story.quantities.length).toBeGreaterThanOrEqual(2);
      expect(story.quantities.every((item) => /\d/.test(item.value))).toBe(true);
      expect(bridge.mapping).toEqual(guide.mlExample.mapping);
      expect(bridge.walkthrough).toEqual(guide.mlExample.walkthrough);
      expect(bridge.mapping.some((item) => /Small scale|Small-number rehearsal/.test(item.math))).toBe(false);
      for (const example of [guide.everydayExample, guide.mlExample]) {
        expect(example.walkthrough.length).toBeGreaterThanOrEqual(2);
        expect(example.walkthrough.every((step) => step.action && step.reason)).toBe(true);
        expect(example.steps).toEqual(example.walkthrough.map(({ action, reason }) => `${action} ${reason}`));
      }
      expect(new Set(guide.questions.map((question) => question.id)).size).toBe(3);
      expect(guide.questions.every((question) => question.options[question.answerIndex] && question.explanation)).toBe(true);
      expect(lesson.beginnerSteps.find((step) => step.type === "notation").check).toBe(guide.questions[2]);
    }
  });

  it("takes regression through prediction, residual, and squared error before deeper topics", () => {
    const bridge = lessonById["linear-regression-ml"].beginnerSteps.find((step) => step.type === "notation").mlBridge;
    expect(bridge.terms.map((term) => term.id)).toEqual(["regression", "residual", "loss"]);
    expect(bridge.walkthrough.map((step) => step.action)).toEqual([
      String.raw`\(\hat{y}=2\times4+5=13\)`,
      String.raw`\(y-\hat{y}=15-13=2\)`,
      String.raw`\((y-\hat{y})^2=2^2=4\)`
    ]);
    expect(bridge.takeaway).toContain("mean squared error");
  });

  it("validates all authored inline formulas without dropping plain-language explanations", () => {
    let count = 0;
    for (const value of strings(CLASSICAL_ML_GUIDES)) {
      for (const match of value.matchAll(/\\\(([\s\S]*?)\\\)/g)) {
        expect(() => katex.renderToString(match[1], { throwOnError: true, strict: "error" })).not.toThrow();
        count += 1;
      }
    }
    expect(count).toBeGreaterThan(40);
  });
});
