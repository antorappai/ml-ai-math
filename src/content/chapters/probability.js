import { check, codeLab, progressiveLesson } from "../lessonBuilder.js";

export const probabilityLessons = [
  progressiveLesson({
    id: "probability-events-bayes",
    chapterId: "probability-statistics",
    order: 1,
    title: "Probability, Conditional Events & Bayes",
    subtitle: "Reason about uncertainty, evidence, and reversed conditions.",
    prerequisites: ["math-language", "algebra-logs"],
    tags: ["probability", "bayes"],
    scenario: { title: "Medical testing", body: "A test can be accurate while most positive results are false when the disease is rare.", mlParallel: "Classification predictions must be interpreted with prevalence, likelihood, and evidence." },
    mlConnection: "Probabilistic classifiers, uncertainty, likelihood, and evaluation all depend on conditional probability.",
    basics: {
      summary: "Probability assigns values from zero to one to uncertain events.",
      concepts: ["Sample space contains possible outcomes.", "Complement means not A.", "Independent events do not change each other's probability."],
      formulaIds: [],
      example: { title: "Complement", prompt: "If probability of rain is .3, what is probability of no rain?", steps: ["Total probability is 1.", "Subtract .3."], answer: ".7", interpretation: "An event and its complement exhaust the sample space." },
      pythonLab: codeLab({ title: "Simulate probability", goal: "Estimate a coin probability.", code: "import numpy as np\nrng = np.random.default_rng(7)\nflips = rng.integers(0, 2, 1000)\nprint(round(flips.mean(), 2))", output: "approximately 0.5", explanation: "A fixed seed makes the simulation reproducible.", packages: ["numpy"] }),
      questions: [check("prob-b1", "What range must P(A) lie in?", ["-1 to 1", "0 to 1", "Any real number", "1 to 100"], 1, "Probabilities are bounded by zero and one.")],
      examNotes: ["List all outcomes before assigning probabilities."]
    },
    core: {
      summary: "Condition on evidence and apply Bayes theorem carefully.",
      concepts: ["P(A|B) and P(B|A) are different.", "The denominator includes every way evidence B can occur.", "Tree diagrams and frequency tables prevent base-rate mistakes."],
      formulaIds: ["bayes"],
      example: { title: "Reverse a condition", prompt: "Why is test sensitivity not the probability of disease after a positive result?", steps: ["Sensitivity is P(positive|disease).", "The question asks P(disease|positive).", "Bayes includes prevalence and false positives."], answer: "The conditioning direction is reversed", interpretation: "Base rates matter." },
      questions: [check("prob-c1", "In Bayes theorem, what is P(A)?", ["Posterior", "Prior", "Likelihood", "Evidence"], 1, "P(A) is the belief before observing B.")],
      examNotes: ["Write the words under every conditional probability before substituting."]
    },
    advanced: {
      summary: "Use total probability, odds, likelihood ratios, and calibration reasoning.",
      concepts: ["Posterior odds equal prior odds times likelihood ratio.", "Calibration compares predicted probabilities with observed frequencies.", "Independence assumptions simplify joint probabilities."],
      formulaIds: ["bayes", "logarithm"],
      example: { title: "Likelihood ratio", prompt: "Evidence is twice as likely under A as not A. What happens to prior odds?", steps: ["Likelihood ratio is 2.", "Multiply prior odds by 2."], answer: "Posterior odds double", interpretation: "Evidence scales odds rather than replacing the prior." },
      questions: [check("prob-a1", "A calibrated 0.8 classifier should be correct about how often on similar cases?", ["20%", "50%", "80%", "100%"], 2, "Calibration means predicted frequencies match observed frequencies.")],
      examNotes: ["Separate discrimination, accuracy, and calibration."]
    }
  }),
  progressiveLesson({
    id: "random-variables-distributions",
    chapterId: "probability-statistics",
    order: 2,
    title: "Random Variables, Expectation & Distributions",
    subtitle: "Turn uncertain outcomes into numerical variables with centres and shapes.",
    prerequisites: ["probability-events-bayes"],
    tags: ["random-variables", "expectation", "distributions"],
    scenario: { title: "A game of chance", body: "Each outcome has a payoff and a probability, so the long-run average can favour the player or the house.", mlParallel: "Expected loss averages model error over uncertain data." },
    mlConnection: "ML objectives are often expectations over data, labels, or model distributions.",
    basics: {
      summary: "A random variable maps uncertain outcomes to numbers.",
      concepts: ["Discrete variables have countable outcomes.", "Continuous variables are described by density.", "Expectation is a weighted average, not a guaranteed result."],
      formulaIds: ["expected-value"],
      example: { title: "House edge", prompt: "Win 10 with probability .4 and lose 8 with .6.", steps: ["Compute 10*.4=4.", "Compute -8*.6=-4.8.", "Add."], answer: "Expected value -0.8", interpretation: "The player loses .8 per play on average; the house benefits." },
      questions: [check("rv-b1", "What does negative player expected value imply?", ["Guaranteed loss every game", "Long-run average favours the house", "The probabilities are invalid", "Variance is zero"], 1, "Expectation describes long-run average, not every play.")],
      examNotes: ["Include negative signs for losses before weighting outcomes."]
    },
    core: {
      summary: "Use variance and standard deviation to describe distribution spread.",
      concepts: ["Variance averages squared deviations.", "Standard deviation returns to original units.", "Distribution shape carries more information than the mean alone."],
      formulaIds: ["expected-value", "variance", "standard-deviation"],
      example: { title: "Same mean, different risk", prompt: "Two games both have expectation zero, but one pays ±1 and one pays ±100. Which is riskier?", steps: ["Both centres match.", "The second has much larger squared deviations."], answer: "The ±100 game", interpretation: "Variance distinguishes their spread." },
      questions: [check("rv-c1", "Why square deviations in variance?", ["To make them probabilities", "To prevent positive and negative deviations cancelling", "To reduce all values", "To find the median"], 1, "Squaring preserves size while removing deviation sign.")],
      examNotes: ["State whether spread is variance or standard deviation and include units."]
    },
    advanced: {
      summary: "Work with common distributions, likelihood, and sampling behaviour.",
      concepts: ["Bernoulli models one binary trial.", "Binomial models a count of successes.", "Normal distributions arise as useful noise and approximation models."],
      formulaIds: ["binomial", "expected-value", "variance"],
      example: { title: "Check binomial assumptions", prompt: "Can changing click probability across users be modeled as one binomial experiment?", steps: ["Binomial requires constant p.", "Here p varies by user."], answer: "Not without an additional modeling assumption", interpretation: "Formula conditions matter as much as substitution." },
      questions: [check("rv-a1", "Which is required for a binomial model?", ["Changing p", "Independent trials with constant p", "Continuous outcomes", "Unknown n"], 1, "Binomial uses fixed n, independent trials, and constant p.")],
      examNotes: ["Verify distribution assumptions before using its formula."]
    }
  }),
  progressiveLesson({
    id: "statistics-spread",
    chapterId: "probability-statistics",
    order: 3,
    title: "Statistics: Centre, Spread & Standardization",
    subtitle: "Summarize samples without hiding variation, scale, or unusual values.",
    prerequisites: ["random-variables-distributions"],
    tags: ["mean", "variance", "standard-deviation", "z-score"],
    scenario: { title: "Exam scores", body: "A score of 75 means different things in an easy class and a difficult class.", mlParallel: "Standardization lets models compare features measured on different scales." },
    mlConnection: "Data summaries, scaling, residual analysis, and model evaluation rely on centre and spread.",
    projectIds: ["statistics-mini"],
    basics: {
      summary: "Mean shows centre; range, variance, and standard deviation show spread.",
      concepts: ["Outliers can pull the mean.", "Median is resistant to extreme values.", "Two datasets can share a mean and behave differently."],
      formulaIds: ["variance", "standard-deviation"],
      example: { title: "Interpret variance", prompt: "Dataset A is tightly grouped and B is widely spread with equal means. Which has larger variance?", steps: ["Compare distances from the shared mean.", "B has larger squared deviations."], answer: "Dataset B", interpretation: "The mean alone hides variability." },
      pythonLab: codeLab({ title: "Population and sample spread", goal: "Compare NumPy ddof conventions.", code: "import numpy as np\nx = np.array([2.,4.,6.])\nprint(np.var(x, ddof=0))\nprint(np.var(x, ddof=1))\nprint(np.std(x, ddof=1))", output: "2.6666666666666665\n4.0\n2.0", explanation: "ddof=0 uses population N; ddof=1 uses sample n-1.", packages: ["numpy"] }),
      questions: [check("stats-b1", "Why is standard deviation easier to interpret than variance?", ["It is always smaller", "It uses the original data units", "It ignores outliers", "It equals the mean"], 1, "Taking the square root returns to original units.")],
      examNotes: ["Write units: variance uses squared units, standard deviation uses original units."]
    },
    core: {
      summary: "Distinguish population and sample formulas and compute z-scores.",
      concepts: ["Population variance divides by N.", "Sample variance commonly divides by n-1.", "Z-score expresses distance from the mean in standard-deviation units."],
      formulaIds: ["sample-variance", "standard-deviation", "z-score"],
      example: { title: "Standardize a score", prompt: "x=70, mean=50, std=10. Find z.", steps: ["Subtract mean: 20.", "Divide by 10."], answer: "z=2", interpretation: "The score is two standard deviations above the mean." },
      questions: [check("stats-c1", "Which denominator is commonly used for sample variance?", ["n", "n-1", "n+1", "sqrt(n)"], 1, "The n-1 correction estimates population variance from a sample.")],
      examNotes: ["Identify sample versus population before choosing notation and denominator."]
    },
    advanced: {
      summary: "Use covariance, correlation, sampling, and confidence intuition responsibly.",
      concepts: ["Covariance depends on units.", "Correlation standardizes covariance.", "Sample statistics vary from sample to sample."],
      formulaIds: ["covariance", "correlation", "z-score"],
      example: { title: "Correlation trap", prompt: "Ice cream sales and drowning both rise in summer. Does correlation prove causation?", steps: ["Observe association.", "Identify temperature as a confounder."], answer: "No", interpretation: "Correlation measures linear association, not causal mechanism." },
      questions: [check("stats-a1", "What does zero covariance prove?", ["Independence always", "No linear co-movement, but not necessarily independence", "Equal means", "Zero variance"], 1, "Nonlinear dependence can exist with zero covariance.")],
      examNotes: ["State whether a relationship is association, prediction, or causation."]
    }
  }),
  progressiveLesson({
    id: "sampling-inference",
    chapterId: "probability-statistics",
    order: 4,
    title: "Sampling, Estimation & Uncertainty",
    subtitle: "Understand why statistics computed from one sample are uncertain estimates.",
    prerequisites: ["statistics-spread"],
    tags: ["sampling", "estimation", "confidence"],
    scenario: { title: "Polling a country", body: "A poll observes a small sample and uses it to estimate a much larger population.", mlParallel: "Validation performance is an estimate of future model performance, not a guarantee." },
    mlConnection: "Generalization, validation, confidence intervals, and experiment comparison require sampling reasoning.",
    basics: {
      summary: "A sample is a subset used to learn about a population.",
      concepts: ["Random sampling reduces systematic bias.", "Larger samples usually reduce estimation noise.", "A statistic is computed from a sample; a parameter describes a population."],
      formulaIds: ["standard-deviation"],
      example: { title: "Statistic or parameter", prompt: "Is the average of 100 surveyed users a statistic or parameter?", steps: ["The 100 users are a sample.", "The computed mean comes from that sample."], answer: "Statistic", interpretation: "It estimates the population mean." },
      questions: [check("sampling-b1", "What usually happens to sampling variability as sample size grows?", ["It grows", "It shrinks", "It becomes negative", "It always becomes zero"], 1, "More observations generally stabilize estimates.")],
      examNotes: ["Name the population, sample, parameter, and statistic."]
    },
    core: {
      summary: "Reason about standard error, confidence intervals, and train-validation splits.",
      concepts: ["Standard error describes variability of an estimator.", "Confidence intervals quantify estimation uncertainty.", "Repeated reuse of validation data can overfit decisions."],
      formulaIds: ["standard-deviation", "z-score"],
      example: { title: "Validation uncertainty", prompt: "Why is 92% accuracy on 20 examples less convincing than on 20,000?", steps: ["Both are point estimates.", "Small samples have more variability."], answer: "The small estimate is much less stable", interpretation: "Performance numbers need sample-size context." },
      questions: [check("sampling-c1", "What does a confidence interval communicate?", ["Guaranteed parameter location", "A procedure-based range reflecting uncertainty", "Training loss", "Feature importance"], 1, "Intervals quantify uncertainty under stated assumptions.")],
      examNotes: ["Avoid saying a frequentist parameter has a probability after the interval is observed."]
    },
    advanced: {
      summary: "Connect resampling, bootstrap intuition, hypothesis tests, and multiple comparisons to ML evaluation.",
      concepts: ["Cross-validation resamples train-validation splits.", "Bootstrap samples with replacement.", "Repeated model selection can create optimistic estimates."],
      formulaIds: ["expected-value", "variance"],
      example: { title: "Selection bias", prompt: "Why can choosing the best of 100 models on one test set be misleading?", steps: ["Random test noise affects all scores.", "Selecting the maximum favours lucky noise."], answer: "The test set has been used for selection", interpretation: "Keep a final untouched test set." },
      questions: [check("sampling-a1", "What is bootstrap sampling?", ["Sampling without replacement", "Sampling with replacement", "Using only test data", "Removing outliers"], 1, "Bootstrap repeatedly samples with replacement from observed data.")],
      examNotes: ["Separate model selection data from final unbiased evaluation data."]
    }
  })
];
