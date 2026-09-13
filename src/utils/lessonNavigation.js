import { lessons } from "../content/index.js";

export function lessonStart(lesson) {
  return `/lessons/${lesson.id}/${lesson.beginnerSteps?.[0]?.id || "study"}`;
}

export function resumeStudy(lesson, mastery) {
  const stepId = mastery.lastGuidedSteps?.[lesson.id];
  return lesson.beginnerSteps?.some((step) => step.id === stepId)
    ? `/lessons/${lesson.id}/${stepId}` : lessonStart(lesson);
}

export function adjacentLessons(lesson) {
  const index = lessons.findIndex((item) => item.id === lesson.id);
  return { previous: lessons[index - 1], next: lessons[index + 1] };
}

export function pythonExamples(lesson) {
  const examples = [];
  for (const [level, content] of Object.entries(lesson.levels)) {
    const lab = content.pythonLab;
    if (!lab) continue;
    const existing = examples.find((item) => item.lab.runtime === lab.runtime && item.lab.code === lab.code && item.lab.notebookPath === lab.notebookPath);
    if (existing) existing.levels.push(level);
    else examples.push({ level, levels: [level], lab });
  }
  return examples;
}
