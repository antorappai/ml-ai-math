import { defineLesson, level } from "./schema.js";
import { buildExamQuestions, buildFoundationQuestions, buildProblems } from "./questionBank.js";
import { buildBeginnerSteps } from "./foundationGuides.js";

export const vocab = (id, name, definition, analogy, example, nonExample, mlConnection, prerequisites = []) => ({
  id, name, definition, analogy, example, nonExample, mlConnection, prerequisites,
  nonExampleReason: `${nonExample} does not match this definition: ${definition}`
});

export const worked = (title, prompt, steps, answer, interpretation) => ({ title, prompt, steps, answer, interpretation });
export const misconception = (wrong, correction) => ({ wrong, correction });

function connectExampleToStory(example, seed, term) {
  return {
    ...example,
    situation: example.situation || { title: seed.realWorld.title, story: seed.realWorld.body },
    quantityMap: example.quantityMap || [{
      quantity: term.name,
      meaning: `This is the mathematical quantity being worked out in the ${seed.realWorld.title.toLowerCase()} situation.`
    }],
    realWorldMeaning: example.realWorldMeaning || `${example.interpretation} In this situation, that result is what helps someone make a decision instead of guessing.`,
    mlParallel: example.mlParallel || seed.ml
  };
}

function makeExplanation(levelKey, seed, term) {
  if (levelKey === "basics") return [
    { heading: "Start with the idea", body: seed.plain },
    { heading: `What ${term.name} means`, body: `${term.definition} Think of it like ${term.analogy.toLowerCase()}` },
    { heading: "Example and boundary", body: `${term.example} By contrast, ${term.nonExample} This falls outside the definition above.` }
  ];
  if (levelKey === "core") return [
    { heading: "Turn intuition into a method", body: seed.core || `Use the definition deliberately: identify the quantities, preserve their signs and units, then apply the operation in order.` },
    { heading: "Read the notation", body: seed.notationGuide || `Read each symbol as an instruction. Do not calculate until you can say what every part represents.` },
    { heading: "Check the result", body: `Ask whether the size, sign, units, and direction agree with the original situation.` }
  ];
  return [
    { heading: "Master's bridge", body: seed.advanced || seed.ml },
    { heading: "Assumptions and edge cases", body: seed.edgeCases || `The definition only works as stated when its assumptions are satisfied; always check dimensions, domains, and zero cases.` },
    { heading: "Explain, do not only calculate", body: `A graduate-level answer connects the formal result back to data, model behaviour, or uncertainty.` }
  ];
}

export function beginnerLesson(seed) {
  const term = seed.vocabulary[0];
  const examples = seed.examples.map((example) => connectExampleToStory(example, seed, term));
  const questions = buildFoundationQuestions(seed.id, seed.vocabulary, seed.misconceptions[0], seed.ml);
  const problems = buildProblems(seed.id, examples, seed.vocabulary, seed.ml);
  const exams = buildExamQuestions(seed.id, examples, seed.misconceptions[0]);
  const beginnerSteps = buildBeginnerSteps(seed, examples, questions);
  const levelConfigs = [
    { key: "basics", q: questions.slice(0, 2), p: problems.slice(0, 1), exam: exams[0] },
    { key: "core", q: questions.slice(2, 4), p: problems.slice(1, 3), exam: exams[1] },
    { key: "advanced", q: questions.slice(4), p: problems.slice(3), exam: exams[2] }
  ];

  return defineLesson({
    id: seed.id,
    slug: seed.id,
    beginnerFirst: true,
    chapterId: seed.chapterId,
    order: seed.order,
    title: seed.title,
    subtitle: seed.subtitle,
    prerequisites: seed.prerequisites || [],
    tags: seed.tags || [],
    scenario: { title: seed.realWorld.title, body: seed.realWorld.body, mlParallel: seed.ml },
    mlConnection: seed.ml,
    vocabulary: seed.vocabulary,
    beginnerSteps,
    projectIds: seed.projectIds || [],
    levels: Object.fromEntries(levelConfigs.map(({ key, q, p, exam }, index) => [key, level({
      title: key[0].toUpperCase() + key.slice(1),
      summary: [seed.plain, seed.core || `Apply ${term.name} correctly and explain the result.`, seed.advanced || seed.ml][index],
      concepts: makeExplanation(key, seed, term).map((section) => section.body),
      formulaIds: seed.formulaIds || [],
      example: examples[index],
      pythonLab: seed.pythonLabs?.[key] || null,
      questions: q,
      examNotes: ["Define the quantities before calculating.", "Show each step and preserve signs, units, and dimensions.", "Interpret the answer in the original context."],
      objectives: [index === 0 ? `Explain ${term.name} in ordinary language.` : `Use ${term.name} in a formal problem.`, `Recognize a correct example and a non-example.`, `Connect ${term.name} to machine learning.`],
      introducedTermIds: key === "basics" ? seed.vocabulary.map((item) => item.id) : [],
      requiredTermIds: seed.requiredTermIds || [],
      vocabulary: seed.vocabulary,
      explanationSections: makeExplanation(key, seed, term),
      realWorldScenario: seed.realWorld,
      mlScenario: { title: `${term.name} in ML`, body: seed.ml },
      workedExamples: [examples[index]],
      misconceptions: seed.misconceptions,
      calculationProblems: p,
      examQuestions: [exam],
      readinessCheck: { prompt: `Can you define ${term.name}, identify it in an example, and explain its ML role without reading the answer?`, answer: `${term.definition} ${seed.ml}` }
    })]))
  });
}
