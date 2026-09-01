import { mcq } from "./schema.js";

const distractors = [
  "A label with no mathematical meaning",
  "A rule that is true only for neural networks",
  "A value that must always be positive"
];

export function buildFoundationQuestions(lessonId, vocabulary, misconception, mlConnection) {
  const term = vocabulary[0];
  return [
    mcq(`${lessonId}-b1`, `Which description best defines ${term.name}?`, [term.definition, ...distractors], 0, `${term.name} means ${term.definition}`, "vocabulary"),
    mcq(`${lessonId}-b2`, `Which is an example of ${term.name}?`, [term.example, term.nonExample, "An unexplained symbol", "A missing value"], 0, `${term.example} is the concrete example; ${term.nonExample} is the non-example.`, "interpretation"),
    mcq(`${lessonId}-c1`, `Which analogy best matches ${term.name}?`, [term.analogy, "A random answer with no rule", "A locked file", "A colour with no value"], 0, term.analogy, "intuition"),
    mcq(`${lessonId}-c2`, "Which statement avoids the common mistake in this lesson?", [misconception.correction, misconception.wrong, "The notation can be ignored", "Units and signs never matter"], 0, misconception.correction, "misconception"),
    mcq(`${lessonId}-a1`, `Why does ${term.name} matter in machine learning?`, [mlConnection, "It is used only to format reports", "It removes the need for data", "It guarantees every model is correct"], 0, mlConnection, "ml-connection")
  ];
}

export function buildProblems(lessonId, examples, vocabulary, mlConnection) {
  const term = vocabulary[0];
  const worked = examples.map((example, index) => ({
    id: `${lessonId}-p${index + 1}`,
    prompt: example.prompt,
    answer: example.answer,
    steps: example.steps,
    explanation: example.interpretation,
    skill: index === 0 ? "calculation" : "application"
  }));
  return [
    ...worked,
    { id: `${lessonId}-p4`, prompt: `Why is this not a correct example of ${term.name}: ${term.nonExample}?`, answer: term.nonExampleReason || `It does not satisfy the definition: ${term.definition}`, steps: ["State the definition.", "Compare the proposed example with every required part.", "Name the missing or conflicting part."], explanation: `A non-example helps mark the boundary of ${term.name}.`, skill: "interpretation" },
    { id: `${lessonId}-p5`, prompt: `Explain one place where ${term.name} appears in ML.`, answer: mlConnection, steps: ["Name the mathematical object.", "Identify the corresponding model or data operation.", "Explain what the object controls or measures."], explanation: mlConnection, skill: "ml-connection" }
  ];
}

export function buildExamQuestions(lessonId, examples, misconception) {
  return examples.map((example, index) => ({
    id: `${lessonId}-exam-${index + 1}`,
    prompt: `${example.prompt} Show your method and interpret the result.`,
    answer: example.answer,
    solutionSteps: [...example.steps, `Interpretation: ${example.interpretation}`],
    markingGuide: ["Correct setup", "Correct working", "Correct answer", "Interpretation in context"],
    commonTrap: index === 2 ? misconception.wrong : "Giving only a final number without showing the method.",
    difficulty: ["basics", "core", "advanced"][index]
  }));
}

