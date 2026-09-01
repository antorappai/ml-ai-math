import { defineChapter, validateCurriculum } from "./schema.js";
import { formulaList, formulas } from "./formulas.js";
import { foundationLessons } from "./chapters/foundations.js";
import { linearAlgebraLessons } from "./chapters/linearAlgebra.js";
import { calculusLessons } from "./chapters/calculus.js";
import { probabilityLessons } from "./chapters/probability.js";
import { classicalMlLessons } from "./chapters/classicalMl.js";
import { deepLearningLessons } from "./chapters/deepLearning.js";
import { projects } from "./projects.js";
import { coursePacks } from "./coursePacks.js";

const chapterDefinitions = [
  { id: "foundations", phase: 1, title: "Math Language & Foundations", shortTitle: "Foundations", purpose: "Read formulas, manipulate equations, and understand graphs without guessing.", accent: "coral", lessons: foundationLessons },
  { id: "linear-algebra", phase: 1, title: "Linear Algebra for Representations", shortTitle: "Linear Algebra", purpose: "Understand vectors, matrices, transformations, eigenvectors, and PCA.", accent: "blue", lessons: linearAlgebraLessons },
  { id: "calculus-optimization", phase: 1, title: "Calculus & Optimization", shortTitle: "Calculus", purpose: "Understand slopes, gradients, chain rule, loss functions, and learning.", accent: "gold", lessons: calculusLessons },
  { id: "probability-statistics", phase: 1, title: "Probability & Statistics", shortTitle: "Probability", purpose: "Reason about uncertainty, distributions, evidence, variation, and sampling.", accent: "green", lessons: probabilityLessons },
  { id: "classical-ml", phase: 2, title: "Classical Machine Learning", shortTitle: "Classical ML", purpose: "Connect mathematical foundations to models, evaluation, and reliable workflows.", accent: "red", lessons: classicalMlLessons },
  { id: "deep-learning", phase: 3, title: "Deep Learning", shortTitle: "Deep Learning", purpose: "Build from tensors and backpropagation to CNNs, sequences, and transformers.", accent: "navy", lessons: deepLearningLessons }
];

export const chapters = chapterDefinitions.map(({ lessons: chapterLessons, ...chapter }) =>
  defineChapter({ ...chapter, lessonIds: chapterLessons.map((lesson) => lesson.id) })
);

export const lessons = chapterDefinitions.flatMap((chapter) => chapter.lessons);
export const lessonById = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson]));
export const chapterById = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter]));
export const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));
export const formulaById = formulas;
export { coursePacks, formulaList, formulas, projects };

validateCurriculum(chapters, lessons, formulas, projects);

export function getLessonQuestions(lesson) {
  return Object.values(lesson.levels).flatMap((level) => level.questions || []);
}

export function getChapterLessons(chapterId) {
  return chapters.find((chapter) => chapter.id === chapterId)?.lessonIds.map((id) => lessonById[id]) || [];
}

