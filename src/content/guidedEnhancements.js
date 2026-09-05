import { DEEP_LEARNING_GUIDES } from "./deepLearningGuides.js";

const CHAPTER_GUIDED_LESSONS = {
  foundations: [
    "numbers-signs", "fractions-ratios-percentages", "powers-roots-scientific", "variables-expressions",
    "equations-inequalities", "functions-domain-range", "graphs-slope-intercept", "exponents-logarithms",
    "summation-subscripts-sets"
  ],
  "linear-algebra": [
    "scalars-vectors-tensors", "vector-arithmetic", "vector-magnitude-distance", "unit-vectors-normalization",
    "dot-product-angle", "matrix-anatomy-types", "matrix-vector-multiplication", "matrix-matrix-multiplication",
    "transpose-symmetry", "determinant-collapse", "inverse-systems", "rank-column-null", "linear-transformations",
    "basis-coordinates", "change-of-basis", "composition-matrix-powers", "eigenvalues-eigenvectors",
    "eigendecomposition", "covariance-matrices-pca"
  ],
  "calculus-optimization": [
    "change-slope-limits", "derivative-definition", "derivative-rules", "tangents-stationary-points",
    "scalar-vector-functions", "partial-derivatives", "gradients-directional-change",
    "chain-rule-computational-graphs", "jacobian-matrices", "hessians-convexity", "loss-functions",
    "gradient-descent-learning-rate"
  ],
  "probability-statistics": [
    "experiments-outcomes-events", "set-operations-counting", "probability-rules", "conditional-probability",
    "bayes-theorem", "random-variables", "probability-mass-function", "probability-density-function",
    "cumulative-distribution-function", "expected-value", "variance-population-sample", "standard-deviation",
    "bernoulli-binomial", "normal-z-scores", "covariance-correlation", "sampling-estimators-clt",
    "confidence-intervals"
  ],
  "classical-ml": [
    "ml-workflow", "linear-regression-ml", "logistic-classification", "knn-distance", "naive-bayes",
    "trees-ensembles", "support-vector-machines", "clustering-unsupervised", "model-selection-generalization"
  ],
  "deep-learning": Object.keys(DEEP_LEARNING_GUIDES)
};

export const GUIDED_LESSON_IDS = Object.values(CHAPTER_GUIDED_LESSONS).flat();

const term = (name, definition, lessonId) => ({ name, definition, lessonId });

export const ML_TERM_GLOSSARY = {
  activation: term("activation", "A function turning a unit's input score into its output.", "activations-losses"),
  convolution: term("convolution", "In a CNN, applying shared filter weights to neighbouring inputs at successive positions.", "cnn-convolution"),
  sequence: term("sequence", "An ordered list of items, such as words or measurements over time.", "sequence-models"),
  transformer: term("transformer", "A neural network built from attention and per-position processing stages with position information.", "attention-transformers"),
  optimizer: term("optimizer", "A rule that uses gradients and possibly their history to adjust model parameters.", "deep-optimization-regularization"),
  model: term("model", "A rule learned from data that turns inputs into useful outputs.", "functions-domain-range"),
  feature: term("feature", "One input value supplied to a model, such as distance, age, or temperature.", "scalars-vectors-tensors"),
  weight: term("weight", "A number a model uses to control how strongly one input affects its result.", "graphs-slope-intercept"),
  prediction: term("prediction", "The output a model produces for a particular input.", "functions-domain-range"),
  error: term("error", "The difference between a model's prediction and the answer we wanted.", "loss-functions"),
  loss: term("loss", "A score that tells the model how poor its prediction was; lower is better.", "loss-functions"),
  parameter: term("parameter", "A value, such as a weight or bias, that training is allowed to adjust.", "variables-expressions"),
  training: term("training", "The repeated process of adjusting model parameters so predictions improve.", "gradient-descent-learning-rate"),
  gradient: term("gradient", "An arrow of numbers showing the direction in which a value increases fastest.", "gradients-directional-change"),
  "learning-rate": term("learning rate", "A small number controlling how far parameters move during one training update.", "gradient-descent-learning-rate"),
  classifier: term("classifier", "A model that chooses among categories, such as spam or not spam.", "probability-rules"),
  probability: term("probability", "A number from 0 to 1 describing how likely an outcome is.", "probability-rules"),
  regression: term("regression", "A modeling task that predicts a number, such as a price or temperature.", "graphs-slope-intercept"),
  bias: term("bias", "A model's adjustable starting value before feature contributions are added.", "graphs-slope-intercept"),
  normalization: term("normalization", "Rescaling values to a common size or length so raw scale does not dominate.", "unit-vectors-normalization"),
  embedding: term("embedding", "A learned vector that represents an item so similar items can be compared.", "scalars-vectors-tensors"),
  tensor: term("tensor", "An organized block of numbers with one or more axes.", "scalars-vectors-tensors"),
  "dot-product": term("dot product", "A calculation that multiplies matching vector entries and adds the results.", "dot-product-angle"),
  similarity: term("similarity", "A score describing how alike two data representations are.", "dot-product-angle"),
  "neural-layer": term("neural-network layer", "A stage that transforms a group of input numbers into a new group of numbers.", "matrix-vector-multiplication"),
  attention: term("attention", "A neural-network operation that scores which pieces of information should influence one another.", "dot-product-angle"),
  covariance: term("covariance", "A measure of whether two quantities tend to move together.", "covariance-matrices-pca"),
  pca: term("PCA", "Principal Component Analysis: a method that turns correlated features into fewer summary directions.", "covariance-matrices-pca"),
  rank: term("rank", "The number of independent information directions contained in a matrix.", "rank-column-null"),
  "least-squares": term("least squares", "A method that chooses parameters by minimizing the sum of squared prediction errors.", "loss-functions"),
  optimization: term("optimization", "The process of searching for parameter values that make a chosen score better.", "gradient-descent-learning-rate"),
  derivative: term("derivative", "A number describing how quickly an output changes when one input changes a tiny amount.", "derivative-definition"),
  "partial-derivative": term("partial derivative", "The change rate for one input while the other inputs are held fixed.", "partial-derivatives"),
  "stationary-point": term("stationary point", "A place where the local slope is zero, although it may be a minimum, maximum, or saddle.", "tangents-stationary-points"),
  backpropagation: term("backpropagation", "An efficient use of the chain rule that sends loss-change information backward through a model.", "chain-rule-computational-graphs"),
  jacobian: term("Jacobian", "A table containing every first change rate of a vector output with respect to a vector input.", "jacobian-matrices"),
  hessian: term("Hessian", "A table of second change rates that describes local curvature.", "hessians-convexity"),
  curvature: term("curvature", "A description of how quickly a slope changes and whether a surface bends like a bowl or saddle.", "hessians-convexity"),
  label: term("label", "The known category or target answer attached to a training example.", "experiments-outcomes-events"),
  likelihood: term("likelihood", "How well a proposed model or parameter value explains the observations we saw.", "bayes-theorem"),
  "bayesian-inference": term("Bayesian inference", "A method that updates an earlier belief after new evidence arrives.", "bayes-theorem"),
  "random-variable": term("random variable", "A rule that turns each uncertain outcome into a number.", "random-variables"),
  "latent-variable": term("latent variable", "A useful quantity a model assumes exists even though it is not observed directly.", "random-variables"),
  quantile: term("quantile", "A cutoff with a chosen proportion of values at or below it.", "cumulative-distribution-function"),
  "anomaly-detection": term("anomaly detection", "Finding observations that are unusually far from the pattern learned from typical data.", "standard-deviation"),
  "expected-loss": term("expected loss", "The probability-weighted average loss across possible outcomes.", "expected-value"),
  "reinforcement-learning": term("reinforcement learning", "Learning actions from rewards received while interacting with an environment.", "expected-value"),
  variance: term("variance", "The average squared distance from a mean, used to describe spread.", "variance-population-sample"),
  standardization: term("standardization", "Centering values and measuring them in standard-deviation units.", "standard-deviation"),
  "gaussian-model": term("Gaussian model", "A model that represents a continuous quantity with a bell-shaped probability distribution.", "probability-density-function"),
  "cross-entropy": term("cross-entropy", "A loss that strongly penalizes assigning a low probability to the correct category.", "loss-functions"),
  "train-test-split": term("train-test split", "Dividing data so one part teaches the model and another checks it on unseen examples.", "fractions-ratios-percentages"),
  binomial: term("binomial model", "A probability model for the number of successes in a fixed number of independent yes-or-no trials.", "bernoulli-binomial"),
  "z-score": term("z-score", "The signed number of standard deviations a value lies above or below its mean.", "normal-z-scores"),
  correlation: term("correlation", "A standardized score from −1 to 1 describing linear movement between two quantities.", "covariance-correlation"),
  estimator: term("estimator", "A rule that uses a sample to make an informed estimate about a larger population.", "sampling-estimators-clt"),
  "central-limit": term("central limit idea", "A pattern in which averages from many similar samples become approximately bell-shaped.", "sampling-estimators-clt"),
  "confidence-interval": term("confidence interval", "A range produced by a method designed to capture the unknown population value at a stated long-run rate.", "confidence-intervals"),
  "data-leakage": term("data leakage", "Using information during training that would not be available when a real prediction is made.", "ml-workflow"),
  validation: term("validation data", "Held-out examples used to compare model choices without touching the final test set.", "ml-workflow"),
  residual: term("residual", "The actual numerical target minus the model's prediction.", "linear-regression-ml"),
  regularization: term("regularization", "A constraint or penalty that discourages a model from fitting training details too aggressively.", "model-selection-generalization"),
  logit: term("logit", "An unrestricted classifier score before it is converted into a probability.", "logistic-classification"),
  threshold: term("decision threshold", "The probability cutoff used to turn a model score into a class decision.", "logistic-classification"),
  knn: term("K-nearest neighbours", "A method that predicts from the labels or targets of the closest stored examples.", "knn-distance"),
  "feature-scaling": term("feature scaling", "Putting feature values on comparable numerical scales before measuring distance or fitting a model.", "knn-distance"),
  "conditional-independence": term("conditional independence", "An assumption that features do not inform one another after the class is known.", "naive-bayes"),
  "tree-ensemble": term("tree ensemble", "A collection of decision trees whose predictions are combined.", "trees-ensembles"),
  boosting: term("boosting", "Building models in sequence so each new model corrects errors left by earlier ones.", "trees-ensembles"),
  margin: term("margin", "The empty safety region between a decision boundary and the nearest training examples.", "support-vector-machines"),
  kernel: term("kernel", "A similarity calculation that lets a model act as if data had been mapped into a richer feature space.", "support-vector-machines"),
  centroid: term("centroid", "The coordinate-wise mean of the points currently assigned to a cluster.", "clustering-unsupervised"),
  "unsupervised-learning": term("unsupervised learning", "Finding structure in data without being given correct target labels.", "clustering-unsupervised"),
  generalization: term("generalization", "Useful performance on relevant examples that were not used to fit the model.", "model-selection-generalization"),
  overfitting: term("overfitting", "Learning training-specific noise or detail that does not transfer to new examples.", "model-selection-generalization"),
  hyperparameter: term("hyperparameter", "A model setting chosen outside ordinary parameter fitting, often with validation data.", "model-selection-generalization")
};

const LESSON_TERM_IDS = {
  "tensors-perceptrons": ["tensor", "weight", "neural-layer", "activation"],
  "activations-losses": ["activation", "loss", "cross-entropy"],
  "forward-backprop": ["backpropagation", "gradient", "parameter"],
  "deep-optimization-regularization": ["optimizer", "regularization", "validation"],
  "cnn-convolution": ["convolution", "weight", "feature"],
  "sequence-models": ["sequence", "embedding", "backpropagation"],
  "attention-transformers": ["attention", "embedding", "transformer"],
  "numbers-signs": ["feature", "weight", "gradient"],
  "fractions-ratios-percentages": ["probability", "train-test-split", "learning-rate"],
  "powers-roots-scientific": ["error", "variance"],
  "variables-expressions": ["feature", "weight", "prediction", "loss"],
  "equations-inequalities": ["classifier", "optimization"],
  "functions-domain-range": ["model", "feature", "prediction"],
  "graphs-slope-intercept": ["regression", "weight", "bias"],
  "exponents-logarithms": ["cross-entropy", "probability"],
  "summation-subscripts-sets": ["loss", "error"],
  "scalars-vectors-tensors": ["feature", "parameter", "tensor"],
  "vector-arithmetic": ["parameter", "gradient", "learning-rate"],
  "vector-magnitude-distance": ["similarity", "normalization", "gradient"],
  "unit-vectors-normalization": ["embedding", "normalization", "similarity"],
  "dot-product-angle": ["dot-product", "similarity", "attention"],
  "matrix-anatomy-types": ["feature", "weight", "covariance"],
  "matrix-vector-multiplication": ["neural-layer", "weight", "feature"],
  "matrix-matrix-multiplication": ["neural-layer", "prediction"],
  "transpose-symmetry": ["covariance", "least-squares", "attention"],
  "determinant-collapse": ["covariance", "gaussian-model"],
  "inverse-systems": ["least-squares", "gaussian-model"],
  "rank-column-null": ["rank", "feature"],
  "linear-transformations": ["neural-layer", "pca", "embedding"],
  "basis-coordinates": ["feature", "embedding"],
  "change-of-basis": ["pca", "feature"],
  "composition-matrix-powers": ["neural-layer", "training"],
  "eigenvalues-eigenvectors": ["pca", "covariance"],
  eigendecomposition: ["pca", "covariance"],
  "covariance-matrices-pca": ["covariance", "pca", "feature"],
  "change-slope-limits": ["derivative", "gradient", "optimization"],
  "derivative-definition": ["derivative", "loss", "parameter"],
  "derivative-rules": ["derivative", "loss"],
  "tangents-stationary-points": ["stationary-point", "loss", "gradient"],
  "scalar-vector-functions": ["loss", "neural-layer"],
  "partial-derivatives": ["partial-derivative", "loss", "parameter"],
  "gradients-directional-change": ["gradient", "loss", "parameter"],
  "chain-rule-computational-graphs": ["backpropagation", "loss", "neural-layer"],
  "jacobian-matrices": ["jacobian", "backpropagation", "neural-layer"],
  "hessians-convexity": ["hessian", "curvature", "optimization"],
  "loss-functions": ["loss", "prediction", "training"],
  "gradient-descent-learning-rate": ["gradient", "learning-rate", "training"],
  "experiments-outcomes-events": ["label", "prediction"],
  "set-operations-counting": ["label", "classifier"],
  "probability-rules": ["classifier", "probability", "likelihood"],
  "conditional-probability": ["probability", "label", "feature"],
  "bayes-theorem": ["bayesian-inference", "likelihood", "probability"],
  "random-variables": ["random-variable", "latent-variable", "prediction"],
  "probability-mass-function": ["classifier", "probability", "label"],
  "probability-density-function": ["gaussian-model", "likelihood", "feature"],
  "cumulative-distribution-function": ["quantile", "anomaly-detection", "probability"],
  "expected-value": ["expected-loss", "reinforcement-learning", "probability"],
  "variance-population-sample": ["variance", "feature", "error"],
  "standard-deviation": ["standardization", "gaussian-model", "anomaly-detection"],
  "bernoulli-binomial": ["binomial", "classifier", "probability"],
  "normal-z-scores": ["z-score", "standardization", "anomaly-detection"],
  "covariance-correlation": ["correlation", "covariance", "feature"],
  "sampling-estimators-clt": ["estimator", "central-limit", "training"],
  "confidence-intervals": ["confidence-interval", "estimator", "prediction"],
  "ml-workflow": ["data-leakage", "validation", "training"],
  "linear-regression-ml": ["regression", "residual", "loss"],
  "logistic-classification": ["classifier", "logit", "threshold"],
  "knn-distance": ["knn", "feature-scaling", "similarity"],
  "naive-bayes": ["bayesian-inference", "likelihood", "conditional-independence"],
  "trees-ensembles": ["tree-ensemble", "boosting", "variance"],
  "support-vector-machines": ["margin", "kernel", "dot-product"],
  "clustering-unsupervised": ["unsupervised-learning", "centroid", "feature-scaling"],
  "model-selection-generalization": ["generalization", "overfitting", "hyperparameter"]
};

function explanationReason(step, index) {
  const text = step.toLowerCase();
  if (text.includes("subtract") || text.includes("difference") || text.includes("minus")) return "This isolates the change or distance between the two quantities.";
  if (text.includes("divide")) return "Division turns the total into a per-unit amount or a fair comparison.";
  if (text.includes("multiply") || text.includes("scale")) return "Multiplication applies the same rate or influence to the whole quantity.";
  if (text.includes("add") || text.includes("sum")) return "Adding combines the separate contributions into one result.";
  if (text.includes("square")) return "Squaring prevents opposite signs from cancelling and gives larger differences more influence.";
  if (text.includes("root")) return "The square root returns the result to the original measurement scale.";
  if (text.includes("list") || text.includes("count")) return "Writing the possibilities down keeps us from missing or double-counting a case.";
  if (text.includes("compare") || text.includes("check")) return "This check connects the calculated number back to the decision we need to make.";
  return index === 0 ? "This identifies the information the calculation must start from." : "This turns the previous result into the quantity the question asks for.";
}

function structuredWalkthrough(example) {
  return example.walkthrough || example.steps.map((action, index) => ({ action, reason: explanationReason(action, index) }));
}

function exampleQuantities(example, kind) {
  if (example.quantities) return example.quantities;
  const quantities = [
    {
      label: kind === "everyday" ? "Numbers we know" : "Model information",
      value: example.prompt,
      meaning: kind === "everyday" ? "These are the small, concrete quantities given by the situation." : "These values play the role of model inputs, settings, or observed results."
    },
    {
      label: kind === "everyday" ? "Result to interpret" : "Model result",
      value: example.answer,
      meaning: example.realWorldMeaning || example.interpretation
    }
  ];
  if (!/[0-9₀-₉⁰-⁹]/.test(JSON.stringify(quantities))) {
    quantities.push({
      label: "Small scale",
      value: "2 inputs → 1 result",
      meaning: "Keeping the first case this small makes every input and operation easy to follow."
    });
  }
  return quantities;
}

function termState(currentLessonId, relatedLessonId) {
  const current = GUIDED_LESSON_IDS.indexOf(currentLessonId);
  const related = GUIDED_LESSON_IDS.indexOf(relatedLessonId);
  return related !== -1 && related <= current ? "review" : "preview";
}

export function buildEveryday(seed, example) {
  return {
    title: seed.realWorld.title,
    setup: [seed.realWorld.body, `Now use the same idea in a small case: ${example.prompt}`],
    quantities: exampleQuantities(example, "everyday"),
    walkthrough: structuredWalkthrough(example),
    takeaway: example.realWorldMeaning || example.interpretation
  };
}

export function buildMlBridge(seed, example, everydayExample) {
  const terms = (LESSON_TERM_IDS[seed.id] || []).map((id) => {
    const entry = ML_TERM_GLOSSARY[id];
    return { id, ...entry, state: termState(seed.id, entry.lessonId) };
  });
  const mapping = example.mapping || exampleQuantities(example, "ml").map((item) => ({ math: item.label, ml: `${item.value} ${item.meaning}` }));
  if (!/[0-9₀-₉⁰-⁹]/.test(JSON.stringify(mapping))) {
    mapping.push({
      math: "Small-number rehearsal",
      ml: `${everydayExample.prompt} gives ${everydayExample.answer}. A model uses the same mathematical operation on its features, weights, or predictions.`
    });
  }
  return {
    task: seed.ml,
    terms,
    mapping,
    walkthrough: structuredWalkthrough(example),
    takeaway: `${example.realWorldMeaning || example.interpretation} This is how the calculation changes what the model predicts, compares, or updates.`
  };
}

const COMPLETE_AUDIT = {
  everydayExplanation: "done",
  numericExample: "done",
  mlExplanation: "done",
  termDefinitions: "done",
  duplicationReview: "done",
  finalReview: "done"
};

export const GUIDED_CONTENT_AUDIT = Object.fromEntries(
  Object.entries(CHAPTER_GUIDED_LESSONS).flatMap(([chapterId, lessonIds]) => lessonIds.map((lessonId) => [lessonId, { chapterId, ...COMPLETE_AUDIT }]))
);

export const CONTENT_AUDIT_STATES = ["todo", "drafted", "reviewed", "done"];
