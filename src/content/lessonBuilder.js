import { defineLesson, level, mcq } from "./schema.js";

export function check(id, prompt, options, answerIndex, explanation, skill = "concept") {
  return mcq(id, prompt, options, answerIndex, explanation, skill);
}

export function codeLab({ title, goal, code, output, explanation, mathToCode = explanation, commonTrap = "Changing code before you can explain what each line represents.", exercise = { prompt: "Change one input value, run the code again, and explain what changed." }, packages = [], runtime = "browser", notebookPath = null, hiddenTests = "" }) {
  return { title, goal, code, output, explanation, mathToCode, commonTrap, exercise, packages, runtime, notebookPath, hiddenTests };
}

function connectExampleToStory(example, scenario, mlConnection) {
  if (!example) return example;
  return {
    ...example,
    situation: example.situation || { title: scenario.title, story: scenario.body },
    quantityMap: example.quantityMap || [{ quantity: "The values in this calculation", meaning: "They are a small numerical version of the decision described in the situation above." }],
    realWorldMeaning: example.realWorldMeaning || `${example.interpretation} In this situation, the result tells you what to do or what to expect.`,
    mlParallel: example.mlParallel || scenario.mlParallel || mlConnection
  };
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
      basics: level({ title: "Basics", ...basics, example: connectExampleToStory(basics.example, scenario, mlConnection) }),
      core: level({ title: "Core", ...core, example: connectExampleToStory(core.example, scenario, mlConnection) }),
      advanced: level({ title: "Advanced", ...advanced, example: connectExampleToStory(advanced.example, scenario, mlConnection) })
    }
  });
}
