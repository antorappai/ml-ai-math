import React, { createContext, useContext, useEffect, useState } from "react";
import { chapters, lessonById, lessons } from "../content/index.js";

export const STORAGE_KEY = "ml-mastery-progress-v2";
export const MASTERY_VERSION = 2;
const LEGACY_LESSON_MAP = {
  functions: "functions-graphs", vectors: "vectors-geometry", "matrix-basics": "matrices-operations", matrices: "matrices-operations",
  transformations: "linear-transformations", basis: "linear-transformations", composition: "linear-transformations", "inverse-spaces": "linear-transformations",
  dot: "vectors-geometry", derivatives: "derivatives-rates", multivariable: "multivariable-gradients", "vector-valued": "multivariable-gradients",
  probability: "probability-events-bayes", "random-variables": "random-variables-distributions", binomial: "random-variables-distributions",
  statistics: "statistics-spread", regression: "linear-regression-ml", bayes: "probability-events-bayes", distributions: "random-variables-distributions",
  eigen: "eigen-pca", eigendecomp: "eigen-pca", "gradient-descent": "optimization-loss", logistic: "logistic-classification", backprop: "forward-backprop"
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
      if (!completed.basics) return { lessonId, level: "basics" };
      if (!completed.core) return { lessonId, level: "core" };
      if (!completed.advanced) return { lessonId, level: "advanced" };
    }
  }
  return { lessonId: lessons[0].id, level: "basics" };
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
