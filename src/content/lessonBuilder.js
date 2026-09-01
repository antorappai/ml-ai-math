import { defineLesson, level, mcq } from "./schema.js";

export function check(id, prompt, options, answerIndex, explanation, skill = "concept") {
  return mcq(id, prompt, options, answerIndex, explanation, skill);
}

export function codeLab({ title, goal, code, output, explanation, packages = [], runtime = "browser", notebookPath = null, hiddenTests = "" }) {
  return { title, goal, code, output, explanation, packages, runtime, notebookPath, hiddenTests };
}

export function progressiveLesson({
  id,
  chapterId,
  order,
  title,
  subtitle,
  prerequisites = [],
  tags = [],
  scenario,
  mlConnection,
  basics,
  core,
  advanced,
  projectIds = []
}) {
  return defineLesson({
    id,
    slug: id,
    chapterId,
    order,
    title,
    subtitle,
    prerequisites,
    tags,
    scenario,
    mlConnection,
    projectIds,
    levels: {
      basics: level({ title: "Basics", ...basics }),
      core: level({ title: "Core", ...core }),
      advanced: level({ title: "Advanced", ...advanced })
    }
  });
}
