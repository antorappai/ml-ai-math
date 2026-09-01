import { describe, expect, it } from "vitest";
import { emptyMastery, getRecommendedLesson, getWeakSkills, migrateMastery, STORAGE_KEY } from "../state/mastery.js";

function fakeStorage(values = {}) {
  return { getItem: (key) => values[key] ?? null };
}

describe("mastery state", () => {
  it("migrates a compatible saved state", () => {
    const saved = { ...emptyMastery(), completedLevels: { "math-language": { basics: true } } };
    expect(migrateMastery(fakeStorage({ [STORAGE_KEY]: JSON.stringify(saved) })).completedLevels).toEqual(saved.completedLevels);
  });

  it("maps a legacy lesson id into the new curriculum", () => {
    expect(migrateMastery(fakeStorage({ "ml-math-last-lesson": "eigen" })).lastVisited).toEqual({ lessonId: "eigen-pca", level: "basics" });
  });

  it("recommends the first incomplete level in curriculum order", () => {
    const state = emptyMastery();
    state.completedLevels["math-language"] = { basics: true };
    expect(getRecommendedLesson(state)).toEqual({ lessonId: "math-language", level: "core" });
  });

  it("ranks weak skills by incorrect attempts", () => {
    const state = emptyMastery();
    state.incorrectAttempts = { a: { skill: "notation", count: 3 }, b: { skill: "calculation", count: 1 } };
    expect(getWeakSkills(state)[0]).toEqual({ skill: "notation", count: 3 });
  });
});
