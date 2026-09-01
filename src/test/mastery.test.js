import { describe, expect, it } from "vitest";
import { emptyMastery, getRecommendedLesson, getWeakSkills, migrateMastery, STORAGE_KEY } from "../state/mastery.js";

function fakeStorage(values = {}) {
  return { getItem: (key) => values[key] ?? null };
}

describe("mastery state", () => {
  it("migrates a compatible saved state", () => {
    const saved = { ...emptyMastery(), completedLevels: { "numbers-signs": { basics: true } } };
    expect(migrateMastery(fakeStorage({ [STORAGE_KEY]: JSON.stringify(saved) })).completedLevels).toEqual(saved.completedLevels);
  });

  it("preserves old Phase 1 study as exposure without completing replacement lessons", () => {
    const previous = {
      version: 2,
      completedLevels: { "math-language": { basics: true }, "ml-workflow": { basics: true } },
      quizScores: { prior: { score: 4, total: 5 } },
      incorrectAttempts: {}, formulaConfidence: {}, pythonExercises: {}, projects: {},
      lastVisited: { lessonId: "math-language", level: "core" }
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v2": JSON.stringify(previous) }));
    expect(migrated.completedLevels).toEqual({ "ml-workflow": { basics: true } });
    expect(migrated.legacyExposure).toEqual({ "math-language": { basics: true } });
    expect(migrated.lastVisited).toEqual({ lessonId: "numbers-signs", level: "core" });
    expect(migrated.quizScores).toEqual(previous.quizScores);
  });

  it("maps a legacy lesson id into the new curriculum", () => {
    expect(migrateMastery(fakeStorage({ "ml-math-last-lesson": "eigen" })).lastVisited).toEqual({ lessonId: "eigenvalues-eigenvectors", level: "basics" });
  });

  it("recommends the first incomplete level in curriculum order", () => {
    const state = emptyMastery();
    state.completedLevels["numbers-signs"] = { basics: true };
    expect(getRecommendedLesson(state)).toEqual({ lessonId: "numbers-signs", level: "core" });
  });

  it("ranks weak skills by incorrect attempts", () => {
    const state = emptyMastery();
    state.incorrectAttempts = { a: { skill: "notation", count: 3 }, b: { skill: "calculation", count: 1 } };
    expect(getWeakSkills(state)[0]).toEqual({ skill: "notation", count: 3 });
  });
});
