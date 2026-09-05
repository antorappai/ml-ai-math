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

  it("migrates completed v3 Foundations lessons into guided steps", () => {
    const previous = {
      version: 3,
      completedLevels: { "numbers-signs": { basics: true, core: true, advanced: true } },
      quizScores: {}, incorrectAttempts: {}, formulaConfidence: {}, pythonExercises: {}, projects: {}
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v3": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(Object.keys(migrated.completedSteps["numbers-signs"])).toHaveLength(7);
    expect(Object.values(migrated.completedSteps["numbers-signs"]).every(Boolean)).toBe(true);
  });

  it("preserves v4 guided progress and maps newly guided completed lessons", () => {
    const previous = {
      version: 4,
      completedLevels: { "gradients-directional-change": { basics: true, core: true, advanced: true } },
      completedSteps: { "numbers-signs": { start: true } },
      guidedCheckAttempts: { check: { attempts: 1, correct: true } }
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v4": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(migrated.completedSteps["numbers-signs"].start).toBe(true);
    expect(Object.keys(migrated.completedSteps["gradients-directional-change"])).toHaveLength(7);
    expect(migrated.guidedCheckAttempts).toEqual(previous.guidedCheckAttempts);
  });

  it("maps completed v5 bridge lessons into their new guided steps", () => {
    const previous = {
      version: 5,
      completedLevels: { "loss-functions": { basics: true, core: true, advanced: true } },
      completedSteps: { "gradients-directional-change": { start: true } }
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v5": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(Object.keys(migrated.completedSteps["loss-functions"])).toHaveLength(7);
    expect(migrated.completedSteps["gradients-directional-change"].start).toBe(true);
  });

  it("maps completed v6 calculus lessons into their new guided steps", () => {
    const previous = {
      version: 6,
      completedLevels: { "jacobian-matrices": { basics: true, core: true, advanced: true } },
      completedSteps: { "loss-functions": { start: true } }
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v6": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(Object.keys(migrated.completedSteps["jacobian-matrices"])).toHaveLength(7);
    expect(migrated.completedSteps["loss-functions"].start).toBe(true);
  });

  it("maps completed v7 linear-algebra lessons into their new guided steps", () => {
    const previous = {
      version: 7,
      completedLevels: { "eigenvalues-eigenvectors": { basics: true, core: true, advanced: true } },
      completedSteps: { "jacobian-matrices": { start: true } }
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v7": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(Object.keys(migrated.completedSteps["eigenvalues-eigenvectors"])).toHaveLength(7);
    expect(migrated.completedSteps["jacobian-matrices"].start).toBe(true);
  });

  it("maps completed v8 probability lessons into their new guided steps", () => {
    const previous = {
      version: 8,
      completedLevels: { "bayes-theorem": { basics: true, core: true, advanced: true } },
      completedSteps: { "eigenvalues-eigenvectors": { start: true } }
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v8": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(Object.keys(migrated.completedSteps["bayes-theorem"])).toHaveLength(7);
    expect(migrated.completedSteps["eigenvalues-eigenvectors"].start).toBe(true);
  });

  it("maps completed v9 distribution lessons into their new guided steps", () => {
    const previous = { version: 9, completedLevels: { "standard-deviation": { basics: true, core: true, advanced: true } }, completedSteps: { "bayes-theorem": { start: true } } };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v9": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(Object.keys(migrated.completedSteps["standard-deviation"])).toHaveLength(7);
    expect(migrated.completedSteps["bayes-theorem"].start).toBe(true);
  });

  it("maps completed v10 Classical ML lessons into their new guided steps", () => {
    const previous = { version: 10, completedLevels: { "ml-workflow": { basics: true, core: true, advanced: true } }, completedSteps: { "standard-deviation": { start: true } } };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v10": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    expect(Object.keys(migrated.completedSteps["ml-workflow"])).toHaveLength(7);
    expect(migrated.completedSteps["standard-deviation"].start).toBe(true);
  });

  it("maps a legacy lesson id into the new curriculum", () => {
    expect(migrateMastery(fakeStorage({ "ml-math-last-lesson": "eigen" })).lastVisited).toEqual({ lessonId: "eigenvalues-eigenvectors", level: "basics" });
  });

  it("recommends the first incomplete lesson in curriculum order", () => {
    const state = emptyMastery();
    state.completedLevels["numbers-signs"] = { basics: true };
    expect(getRecommendedLesson(state)).toEqual({ lessonId: "numbers-signs", level: "start" });
  });

  it("ranks weak skills by incorrect attempts", () => {
    const state = emptyMastery();
    state.incorrectAttempts = { a: { skill: "notation", count: 3 }, b: { skill: "calculation", count: 1 } };
    expect(getWeakSkills(state)[0]).toEqual({ skill: "notation", count: 3 });
  });
});

describe("Deep Learning progress migration", () => {
  const ids = ["tensors-perceptrons", "activations-losses", "forward-backprop", "deep-optimization-regularization", "cnn-convolution", "sequence-models", "attention-transformers"];
  it("maps every completed v11 lesson and preserves all other saved work", () => {
    const previous = {
      ...emptyMastery(), version: 11,
      completedLevels: Object.fromEntries(ids.map((id) => [id, { basics: true, core: true, advanced: true }])),
      completedSteps: { "numbers-signs": { start: true }, "forward-backprop": { "your-turn": false } },
      guidedCheckAttempts: { prior: { attempts: 2, correct: false } },
      quizScores: { prior: { score: 4, total: 5 } }, incorrectAttempts: { prior: { count: 1, skill: "concept" } },
      formulaConfidence: { backprop: "confident" }, pythonExercises: { autograd: true }, projects: { "deep-capstone": true },
      lastVisited: { lessonId: "forward-backprop", level: "core" }
    };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v11": JSON.stringify(previous) }));
    expect(migrated.version).toBe(12);
    for (const id of ids) {
      expect(Object.keys(migrated.completedSteps[id])).toHaveLength(7);
      expect(migrated.completedSteps[id].recap).toBe(true);
    }
    expect(migrated.completedSteps["forward-backprop"]["your-turn"]).toBe(false);
    expect(migrated.completedSteps["numbers-signs"]).toEqual({ start: true });
    for (const field of ["completedLevels", "guidedCheckAttempts", "quizScores", "incorrectAttempts", "formulaConfidence", "pythonExercises", "projects", "lastVisited", "legacyExposure"]) expect(migrated[field]).toEqual(previous[field]);
    expect(migrateMastery(fakeStorage({ [STORAGE_KEY]: JSON.stringify(migrated) }))).toEqual(migrated);
  });
  it("does not mark a partially completed legacy lesson as fully visited", () => {
    const previous = { version: 11, completedLevels: { "cnn-convolution": { basics: true } }, completedSteps: { "cnn-convolution": { start: true } } };
    const migrated = migrateMastery(fakeStorage({ "ml-mastery-progress-v11": JSON.stringify(previous) }));
    expect(migrated.completedSteps["cnn-convolution"]).toEqual({ start: true });
    expect(migrated.completedLevels).toEqual(previous.completedLevels);
  });
});
