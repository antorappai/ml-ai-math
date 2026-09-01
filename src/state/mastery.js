import React, { createContext, useContext, useEffect, useState } from "react";
import { chapters, lessonById, lessons } from "../content/index.js";

export const STORAGE_KEY = "ml-mastery-progress-v3";
export const MASTERY_VERSION = 3;
const PREVIOUS_STORAGE_KEY = "ml-mastery-progress-v2";
const LEGACY_PHASE_ONE_IDS = new Set([
  "math-language", "functions-graphs", "algebra-logs", "vectors-geometry", "matrices-operations",
  "linear-transformations", "eigen-pca", "derivatives-rates", "multivariable-gradients", "optimization-loss",
  "probability-events-bayes", "random-variables-distributions", "statistics-spread", "sampling-inference"
]);
const PHASE_ONE_REPLACEMENTS = {
  "math-language": "numbers-signs",
  "functions-graphs": "functions-domain-range",
  "algebra-logs": "variables-expressions",
  "vectors-geometry": "scalars-vectors-tensors",
  "matrices-operations": "matrix-anatomy-types",
  "linear-transformations": "linear-transformations",
  "eigen-pca": "eigenvalues-eigenvectors",
  "derivatives-rates": "change-slope-limits",
  "multivariable-gradients": "partial-derivatives",
  "optimization-loss": "loss-functions",
  "probability-events-bayes": "experiments-outcomes-events",
  "random-variables-distributions": "random-variables",
  "statistics-spread": "expected-value",
  "sampling-inference": "sampling-estimators-clt"
};
const LEGACY_LESSON_MAP = {
  functions: "functions-domain-range", vectors: "scalars-vectors-tensors", "matrix-basics": "matrix-anatomy-types", matrices: "matrix-anatomy-types",
  transformations: "linear-transformations", basis: "basis-coordinates", composition: "composition-matrix-powers", "inverse-spaces": "inverse-systems",
  dot: "dot-product-angle", derivatives: "change-slope-limits", multivariable: "partial-derivatives", "vector-valued": "scalar-vector-functions",
  probability: "experiments-outcomes-events", "random-variables": "random-variables", binomial: "bernoulli-binomial",
  statistics: "expected-value", regression: "linear-regression-ml", bayes: "bayes-theorem", distributions: "probability-mass-function",
  eigen: "eigenvalues-eigenvectors", eigendecomp: "eigendecomposition", "gradient-descent": "gradient-descent-learning-rate", logistic: "logistic-classification", backprop: "forward-backprop"
};

export function emptyMastery() {
  return {
    version: MASTERY_VERSION,
    completedLevels: {},
    quizScores: {},
    incorrectAttempts: {},
    formulaConfidence: {},
    pythonExercises: {},
    projects: {},
    legacyExposure: {},
    lastVisited: null
  };
}

export function migrateMastery(storage = window.localStorage) {
  const base = emptyMastery();
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    if (parsed && parsed.version === MASTERY_VERSION) return { ...base, ...parsed };
  } catch {
    // Invalid prior state is safer to ignore than to block the app.
  }

  try {
    const previous = JSON.parse(storage.getItem(PREVIOUS_STORAGE_KEY));
    if (previous?.version === 2) {
      const completedLevels = Object.fromEntries(
        Object.entries(previous.completedLevels || {}).filter(([lessonId]) => !LEGACY_PHASE_ONE_IDS.has(lessonId))
      );
      const legacyExposure = Object.fromEntries(
        Object.entries(previous.completedLevels || {}).filter(([lessonId]) => LEGACY_PHASE_ONE_IDS.has(lessonId))
      );
      const oldLastLesson = previous.lastVisited?.lessonId;
      const mappedLastLesson = PHASE_ONE_REPLACEMENTS[oldLastLesson] || (lessonById[oldLastLesson] ? oldLastLesson : null);
      return {
        ...base,
        ...previous,
        version: MASTERY_VERSION,
        completedLevels,
        legacyExposure,
        lastVisited: mappedLastLesson ? { lessonId: mappedLastLesson, level: previous.lastVisited?.level || "basics" } : null
      };
    }
  } catch {
    // Fall through to the oldest single-lesson preference.
  }

  const legacyLesson = storage.getItem("ml-math-last-lesson");
  const migratedLesson = lessonById[legacyLesson] ? legacyLesson : LEGACY_LESSON_MAP[legacyLesson];
  if (migratedLesson) base.lastVisited = { lessonId: migratedLesson, level: "basics" };
  return base;
}

export function getWeakSkills(state) {
  const counts = {};
  for (const attempt of Object.values(state.incorrectAttempts)) {
    counts[attempt.skill || "concept"] = (counts[attempt.skill || "concept"] || 0) + (attempt.count || 1);
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([skill, count]) => ({ skill, count }));
}

export function getRecommendedLesson(state) {
  for (const chapter of chapters) {
    for (const lessonId of chapter.lessonIds) {
      const completed = state.completedLevels[lessonId] || {};
      if (!["basics", "core", "advanced"].every((level) => completed[level])) return { lessonId, level: "study" };
    }
  }
  return { lessonId: lessons[0].id, level: "study" };
}

const MasteryContext = createContext(null);

export function MasteryProvider({ children }) {
  const [mastery, setMastery] = useState(() => typeof window === "undefined" ? emptyMastery() : migrateMastery());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mastery));
  }, [mastery]);

  const update = (recipe) => setMastery((current) => recipe(current));
  const api = {
    mastery,
    weakSkills: getWeakSkills(mastery),
    recommendation: getRecommendedLesson(mastery),
    visit(lessonId, level) {
      update((state) => ({ ...state, lastVisited: { lessonId, level } }));
    },
    completeLevel(lessonId, level) {
      update((state) => ({ ...state, completedLevels: { ...state.completedLevels, [lessonId]: { ...state.completedLevels[lessonId], [level]: true } } }));
    },
    completeLesson(lessonId) {
      update((state) => ({ ...state, completedLevels: { ...state.completedLevels, [lessonId]: { basics: true, core: true, advanced: true } } }));
    },
    recordAnswer(question, correct) {
      update((state) => {
        const key = question.id;
        const incorrectAttempts = { ...state.incorrectAttempts };
        if (!correct) incorrectAttempts[key] = { skill: question.skill, count: (incorrectAttempts[key]?.count || 0) + 1 };
        return { ...state, incorrectAttempts };
      });
    },
    recordScore(testId, score, total) {
      update((state) => ({ ...state, quizScores: { ...state.quizScores, [testId]: { score, total, takenAt: Date.now() } } }));
    },
    setFormulaConfidence(formulaId, confidence) {
      update((state) => ({ ...state, formulaConfidence: { ...state.formulaConfidence, [formulaId]: confidence } }));
    },
    completePython(exerciseId) {
      update((state) => ({ ...state, pythonExercises: { ...state.pythonExercises, [exerciseId]: true } }));
    },
    completeProject(projectId) {
      update((state) => ({ ...state, projects: { ...state.projects, [projectId]: true } }));
    }
  };

  return React.createElement(MasteryContext.Provider, { value: api }, children);
}

export function useMastery() {
  const context = useContext(MasteryContext);
  if (!context) throw new Error("useMastery must be used inside MasteryProvider");
  return context;
}
