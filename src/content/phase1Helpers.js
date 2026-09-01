import { beginnerLesson, misconception, vocab, worked } from "./beginnerLessonBuilder.js";
import { pythonLabsForLesson } from "./phase1PythonLabs.js";

const MICRO_LESSON_FORMULAS = {
  "change-slope-limits": ["limit"],
  "derivative-definition": ["derivative-definition"],
  "derivative-rules": ["power-rule", "chain-rule"],
  "tangents-stationary-points": ["stationary-condition", "derivative-definition"],
  "scalar-vector-functions": ["function-types"],
  "partial-derivatives": ["partial-derivative"],
  "gradients-directional-change": ["gradient", "vector-magnitude"],
  "chain-rule-computational-graphs": ["chain-rule", "backprop"],
  "jacobian-matrices": ["jacobian"],
  "hessians-convexity": ["hessian", "gradient"],
  "experiments-outcomes-events": ["event-notation"],
  "set-operations-counting": ["set-operations"],
  "probability-rules": ["probability-rules"],
  "conditional-probability": ["conditional-probability"],
  "bayes-theorem": ["bayes", "conditional-probability"],
  "random-variables": ["random-variable-map"],
  "probability-mass-function": ["probability-mass-function"],
  "probability-density-function": ["probability-density-function"],
  "cumulative-distribution-function": ["cumulative-distribution-function"],
  "expected-value": ["expected-value"],
  "variance-population-sample": ["variance", "sample-variance"],
  "standard-deviation": ["standard-deviation", "sample-variance"],
  "bernoulli-binomial": ["binomial"],
  "normal-z-scores": ["z-score", "normal-notation", "standard-deviation"],
  "covariance-correlation": ["covariance", "correlation"],
  "sampling-estimators-clt": ["sample-mean", "variance"],
  "confidence-intervals": ["confidence-interval", "sample-mean"]
};

export function topic(config) {
  const mainTerm = vocab(config.id, config.term, config.definition, config.analogy, config.termExample, config.nonExample, config.ml, config.requiredTermIds || []);
  const vocabulary = [mainTerm, ...(config.extraVocabulary || []).map((item) => vocab(...item))];
  const sourceExamples = config.samples || config.cases.map((item, index) => sample(["Beginner case", "Core case", "ML/exam case"][index], item[0], item[1], item[2], item[3]));
  const examples = sourceExamples.map((item) => worked(item[0], item[1], item[2], item[3], item[4]));
  return beginnerLesson({
    ...config,
    subtitle: config.subtitle || config.plain,
    vocabulary,
    examples,
    formulaIds: MICRO_LESSON_FORMULAS[config.id] || config.formulas || [],
    pythonLabs: pythonLabsForLesson(config.id) || config.pythonLabs,
    misconceptions: [misconception(config.wrong, config.correction)],
    realWorld: { title: config.realTitle, body: config.realBody }
  });
}

export const sample = (title, prompt, steps, answer, interpretation) => [title, prompt, steps, answer, interpretation];
