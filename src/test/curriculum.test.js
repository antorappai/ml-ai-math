import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { describe, expect, it } from "vitest";
import { chapters, coursePacks, formulaList, getChapterLessons, getLessonQuestions, lessonById, lessons, projects } from "../content/index.js";

describe("curriculum integrity", () => {
  it("contains the full progressive roadmap", () => {
    expect(chapters.map((chapter) => chapter.id)).toEqual([
      "foundations", "linear-algebra", "calculus-optimization", "probability-statistics", "classical-ml", "deep-learning"
    ]);
    expect(lessons.length).toBeGreaterThanOrEqual(30);
    for (const lesson of lessons) expect(Object.keys(lesson.levels)).toEqual(["basics", "core", "advanced"]);
    for (const chapter of chapters) {
      const questionCount = getChapterLessons(chapter.id).flatMap(getLessonQuestions).length;
      expect(questionCount).toBeGreaterThanOrEqual(10);
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
