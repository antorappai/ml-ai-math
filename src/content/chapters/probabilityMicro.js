import { topic } from "../phase1Helpers.js";

const C = "probability-statistics";
const s = (title, prompt, steps, answer, interpretation) => [title, prompt, steps, answer, interpretation];

const make = (order, c) => topic({
  chapterId: C,
  order,
  analogy: c.analogy || "A precise way to describe uncertainty",
  termExample: c.example,
  nonExample: c.non || `A vague guess without the conditions of ${c.term} is not a valid example.`,
  plain: c.plain || c.definition,
  realTitle: c.realTitle || "A real decision under uncertainty",
  realBody: c.real,
  wrong: c.wrong || `The value can be interpreted without checking what ${c.term} means.`,
  correction: c.correction || `State the definition, conditions, and scale before interpreting ${c.term}.`,
  formulas: c.formulas || [],
  ...c
});

export const probabilityLessons = [
  make(1, {
    id: "experiments-outcomes-events",
    title: "Experiments, Outcomes, Sample Spaces & Events",
    term: "event",
    definition: "An event is the outcome or group of outcomes we care about inside all the things that could happen.",
    analogy: "The sample space is the whole menu; an event is the set of items matching your question",
    example: "For a die, S={1,2,3,4,5,6}; the event 'even' is A={2,4,6}.",
    non: "The experiment, one outcome, the full sample space, and an event are four different ideas.",
    realTitle: "Will Sports Day be rained out?",
    real: "The school is deciding whether to move Sports Day indoors. Tomorrow is uncertain: it may be dry or rainy. Probability starts by being precise about the experiment, the possible outcomes, and the event we actually care about: rain during the event.",
    ml: "ML also begins with uncertain outcomes: a message may be spam or not spam, an image may belong to one of several classes, and a language model considers several possible next tokens.",
    wrong: "A sample space is the result that happened.",
    correction: "An outcome is one result. The sample space contains every possible result. An event selects the result or results relevant to the question.",
    samples: [
      s("Start with a real uncertainty", "Sports Day can be Dry or Rainy. Write the sample space and the event A='Rainy'.", ["List every possible outcome: Dry and Rainy.", "Put them in the sample space S.", "Select the outcome that matches the event A."], "S={Dry,Rainy}; A={Rainy}", "Probability becomes easier once we first say exactly what can happen and what question we are asking."),
      s("Use a clean mathematical example", "Roll one fair die. Give one outcome, the sample space, and the event 'even'.", ["One outcome could be 4.", "The complete sample space is S={1,2,3,4,5,6}.", "The even event keeps 2, 4, and 6."], "Outcome=4; S={1,2,3,4,5,6}; A={2,4,6}", "An event is a subset of the sample space, not a new kind of outcome."),
      s("See the same structure in classification", "A classifier can output Cat, Dog, or Bird. What is the sample space, and what event represents 'not Cat'?", ["List every possible class label.", "The event 'not Cat' keeps the labels other than Cat."], "S={Cat,Dog,Bird}; A={Dog,Bird}", "Class labels can be treated as possible outcomes, and events let us group the outcomes relevant to a decision.")
    ]
  }),

  make(2, {
    id: "set-operations-counting",
    title: "Events as Sets: AND, OR & NOT",
    prerequisites: ["experiments-outcomes-events"],
    requiredTermIds: ["experiments-outcomes-events"],
    term: "event intersection",
    definition: "The intersection A∩B contains the outcomes that satisfy A AND B at the same time.",
    analogy: "Two overlapping circles: the overlap is where both conditions are true",
    example: "For a die, A=even={2,4,6} and B=>3={4,5,6}, so A∩B={4,6}.",
    realTitle: "Who needs both messages?",
    real: "Imagine the school is sending two notices: one to Grade 5 families and one to bus users. Some families belong to both groups. If you do not understand overlap, you can double-count people or send the wrong message.",
    ml: "The same AND, OR, and NOT logic appears in data filtering, confusion matrices, label conditions, and evaluation subsets.",
    wrong: "Union means AND and intersection means OR.",
    correction: "Intersection ∩ means AND. Union ∪ means OR. Complement means NOT.",
    samples: [
      s("Find the overlap", "Let A={Ana,Ben,Cara} be bus users and B={Ben,Cara,Dev} be Grade 5. Who is in A∩B?", ["Look for names appearing in both sets."], "A∩B={Ben,Cara}", "The intersection keeps only the cases satisfying both conditions."),
      s("Avoid double-counting", "A has 30 students, B has 20, and 8 are in both. How many are in A∪B?", ["Add 30+20=50.", "The 8 shared students were counted twice.", "Subtract the overlap once: 50-8."], "42", "The union contains everyone in either group, but each person should be counted once."),
      s("Connect it to model evaluation", "A=actual positives and B=predicted positives. What does A∩B represent?", ["A means the case truly belongs to the positive class.", "B means the model predicted positive.", "Their overlap satisfies both conditions."], "True positives", "A confusion matrix is built from set relationships between actual and predicted events.")
    ]
  }),

  make(3, {
    id: "probability-rules",
    title: "Probability Rules, Complements & Independence",
    prerequisites: ["set-operations-counting", "fractions-ratios-percentages"],
    requiredTermIds: ["experiments-outcomes-events"],
    term: "probability",
    definition: "Probability is a number from 0 to 1 describing how likely an event is under a stated model.",
    analogy: "All available probability is one whole pie shared across the possible outcomes",
    example: "P(even on a fair die)=3/6=0.5=50%.",
    non: "A probability of 1.4 or -0.2 is invalid.",
    realTitle: "Your flight is usually on time",
    real: "Suppose your flight is on time 82% of the time. You immediately know the chance of it not being on time is 18%. Probability rules let us move from one known chance to related chances without inventing new information.",
    ml: "Classifiers produce probabilities, binary models use complements, and probabilistic models must respect rules such as probabilities staying between 0 and 1.",
    wrong: "Independent and mutually exclusive mean the same thing.",
    correction: "Mutually exclusive events cannot happen together. Independent events can happen together, but learning one happened does not change the probability of the other.",
    samples: [
      s("Use the complement", "A flight has P(on time)=0.82. Find P(not on time).", ["All possibilities total 1.", "Subtract 0.82 from 1."], "0.18", "Once an event and its complement cover all possibilities, knowing one gives the other immediately."),
      s("Spot dependence", "A bag has 3 red and 2 blue balls. You draw one blue ball and do not replace it. Does the probability of blue on the next draw stay 2/5?", ["Before drawing, blue probability is 2/5.", "After removing a blue ball, 1 blue remains among 4 balls.", "The new probability is 1/4."], "No; the events are dependent", "The first draw changed the second probability, so the events are not independent."),
      s("Check a model output", "A three-class model outputs [0.70, 0.20, 0.10]. Is this a valid class-probability distribution?", ["Check every value lies between 0 and 1.", "Add the probabilities: 0.70+0.20+0.10."], "Yes; they sum to 1", "A classifier can distribute one whole unit of probability across mutually exclusive classes.")
    ]
  }),

  make(4, {
    id: "conditional-probability",
    title: "Conditional Probability: What Changes After New Information?",
    prerequisites: ["probability-rules"],
    requiredTermIds: ["probability-rules"],
    term: "conditional probability",
    definition: "Conditional probability asks how likely A is after we restrict attention to cases where B is already known to be true.",
    analogy: "Zoom into only the B cases, then ask how many of those are also A",
    example: "P(late|rain) reads 'probability of being late given that it rained'.",
    non: "P(A|B) is generally not the same question as P(B|A).",
    realTitle: "Rain changes the bus-delay question",
    real: "Suppose school buses are late on some mornings. If you learn that it rained heavily, you should not keep using all mornings as your reference group. You zoom into rainy mornings and ask how often buses were late inside that smaller group.",
    ml: "Classification is conditional reasoning: a model estimates something like P(label|observed features), such as P(spam|words in the email).",
    wrong: "Conditional probability keeps the original denominator.",
    correction: "Conditioning changes the reference group. The denominator becomes the cases where the condition is true.",
    samples: [
      s("Change the denominator", "Among 30 rainy school mornings, 18 had a late bus. Estimate P(late|rain).", ["Ignore mornings that were not rainy.", "Use the 30 rainy mornings as the denominator.", "Divide 18 by 30."], "0.60", "Given that it rained, the estimated chance of a late bus is 60%."),
      s("Do not reverse the condition", "Among 100 students, 20 play basketball and 10 of those 20 are tall. What is P(tall|basketball)?", ["Condition on basketball players only.", "There are 20 basketball players.", "10 of them are tall."], "10/20=0.5", "This says half of basketball players are tall; it does not tell us what fraction of tall students play basketball."),
      s("Turn the idea into prediction", "Among 200 emails containing the word 'winner', 150 were spam. Estimate P(spam|winner).", ["Restrict attention to emails containing 'winner'.", "Count how many of those were spam.", "Divide 150 by 200."], "0.75", "A classifier does the same kind of conditioning using many features at once rather than one word alone.")
    ]
  }),

  make(5, {
    id: "bayes-theorem",
    title: "Bayes' Theorem: Reverse the Condition",
    prerequisites: ["conditional-probability"],
    requiredTermIds: ["conditional-probability"],
    term: "Bayes' theorem",
    definition: "Bayes' theorem updates a prior belief after evidence arrives and lets us correctly reverse a conditional probability.",
    analogy: "Start with what was plausible before, observe evidence, then update what is plausible now",
    example: "P(positive|disease) is not the same as P(disease|positive).",
    non: "A highly accurate medical test does not automatically mean a positive result gives the same probability of actually having a rare disease.",
    realTitle: "The 99%-accurate-test trap",
    real: "A rare disease affects only a small part of the population. You test positive on a very good test. It is tempting to say, 'Then I must have a 99% chance of the disease.' That ignores how rare the disease was before the test and how many false positives appear among healthy people.",
    ml: "Bayesian inference and Naive Bayes combine prior class probabilities with evidence likelihoods to update beliefs after data is observed.",
    formulas: ["bayes"],
    wrong: "P(A|B) and P(B|A) can be swapped because they contain the same two events.",
    correction: "They ask different questions. Bayes' theorem is the rule that reverses the condition while accounting for the prior and the overall evidence rate.",
    samples: [
      s("See the base-rate effect with people, not symbols", "In 10,000 people, 1% have a disease. The test catches 99% of diseased people and falsely flags 5% of healthy people. Roughly what fraction of positive tests are true disease cases?", ["About 100 people have the disease; about 99 test positive.", "About 9,900 are healthy; about 495 falsely test positive.", "Total positives are about 99+495=594.", "True disease among positives is about 99/594."], "About 16.7%", "Even a strong test can produce many false positives when the condition is rare. The prior matters."),
      s("Use Bayes' formula directly", "P(B|A)=0.8, P(A)=0.1, and P(B)=0.2. Find P(A|B).", ["Multiply likelihood and prior: 0.8×0.1=0.08.", "Divide by evidence probability 0.2."], "0.4", "The posterior combines what we believed before with how compatible the new evidence is with A."),
      s("Use Bayes for spam evidence", "Suppose P(spam)=0.20, P('free'|spam)=0.60, and P('free')=0.18. Find P(spam|'free').", ["Multiply 0.60×0.20=0.12.", "Divide by 0.18."], "About 0.667", "Seeing the word 'free' raises the spam probability from the 20% prior to about 66.7% in this simplified model.")
    ]
  }),

  make(6, {
    id: "random-variables",
    title: "Random Variables: Turn Uncertain Outcomes into Numbers",
    prerequisites: ["experiments-outcomes-events"],
    requiredTermIds: ["experiments-outcomes-events"],
    term: "random variable",
    definition: "A random variable is a fixed rule that assigns a numerical value to each possible outcome of an uncertain experiment.",
    analogy: "A translator that converts raw outcomes into numbers we can calculate with",
    example: "For two coin flips, X=head count maps HH→2, HT→1, TH→1, TT→0.",
    non: "The mapping itself is not randomly changing; the uncertainty is in which outcome occurs.",
    realTitle: "How many buses will be late tomorrow?",
    real: "The exact pattern of late and on-time buses tomorrow is uncertain. Instead of carrying around every possible pattern, define X as the number of late buses. Many different raw outcomes can now map to the same useful number.",
    ml: "Targets, prediction errors, rewards, noise, and hidden quantities are commonly modeled as random variables.",
    wrong: "A random variable is just a number selected at random.",
    correction: "It is a function. The outcome is uncertain, while the rule that maps each outcome to a number is fixed.",
    samples: [
      s("Compress many outcomes into one useful number", "Three bus routes can each be Late or On time. Let X=number of late buses. What values can X take?", ["The minimum is no late buses: 0.", "The maximum is all three late: 3.", "Counts in between are also possible."], "X∈{0,1,2,3}", "A numerical random variable can summarize many detailed outcome patterns."),
      s("See the mapping explicitly", "Flip two coins and let X=number of heads. Map HH, HT, TH, TT to X.", ["HH has 2 heads.", "HT has 1 head.", "TH has 1 head.", "TT has 0 heads."], "HH→2, HT→1, TH→1, TT→0", "Different outcomes can map to the same random-variable value."),
      s("Recognize a target as a random variable", "A model predicts how many days remain until a customer cancels. What can the target Y represent?", ["The cancellation time is uncertain before it occurs.", "Represent the future number of days as a numerical variable Y."], "Y = days until cancellation", "ML often treats the target we want to predict as a random variable whose value is not yet known.")
    ]
  }),

  make(7, {
    id: "probability-mass-function",
    title: "Probability Mass Function (PMF)",
    prerequisites: ["random-variables"],
    requiredTermIds: ["random-variables"],
    term: "probability mass function (PMF)",
    definition: "A PMF assigns an exact probability to each possible value of a discrete, countable random variable.",
    analogy: "Each possible count gets its own labelled box of probability mass",
    example: "For two fair coin flips, P(X=0)=0.25, P(X=1)=0.50, P(X=2)=0.25.",
    non: "A PMF is not the right tool for exact values of a continuous measurement such as waiting time or height.",
    realTitle: "How many support tickets arrive next hour?",
    real: "A help desk may receive 0, 1, 2, 3, or more tickets in the next hour. Historical data can assign a probability to each count. That collection of probabilities is a discrete probability distribution; a PMF is the rule or table that stores it.",
    ml: "A classifier's probabilities across discrete class labels behave like a PMF: each class gets probability mass and the total is 1.",
    wrong: "PMF is just another name for any probability curve.",
    correction: "A PMF is for discrete values. Every probability must be between 0 and 1, and the probabilities over all possible values must sum to 1.",
    samples: [
      s("Check a ticket-count model", "A model says P(X=0)=0.2, P(X=1)=0.5, P(X=2)=0.3. Is this a valid PMF?", ["Check each probability is between 0 and 1.", "Add 0.2+0.5+0.3."], "Yes; the total is 1", "A valid PMF allocates all available probability mass across the discrete values."),
      s("Build the heads-count PMF", "For two fair coin flips, find P(X=1) when X is the number of heads.", ["The equally likely outcomes are HH, HT, TH, TT.", "Exactly one head occurs in HT and TH.", "Two of four outcomes work."], "P(X=1)=2/4=0.5", "The PMF groups detailed outcomes by the numerical value of the random variable."),
      s("Read class probabilities as discrete mass", "A model outputs Cat=0.70, Dog=0.20, Bird=0.10. What probability mass is assigned to Dog?", ["Find the discrete value 'Dog'.", "Read the probability assigned to that value."], "0.20", "Class probabilities form a discrete distribution over the possible labels.")
    ]
  }),

  make(8, {
    id: "probability-density-function",
    title: "Probability Density Function (PDF)",
    prerequisites: ["random-variables", "functions-domain-range"],
    requiredTermIds: ["random-variables", "functions-domain-range"],
    term: "probability density function (PDF)",
    definition: "A PDF describes a continuous random variable; probability comes from area under the density curve across an interval.",
    analogy: "Probability is spread like paint across a continuous number line; you measure how much paint lies across a region",
    example: "If waiting time is uniform from 0 to 10 minutes, the probability of waiting from 2 to 5 minutes is the area over that interval.",
    non: "For a continuous variable, the curve height at exactly x is not the probability that X equals exactly x.",
    realTitle: "The bus could arrive at 4.2 minutes, 4.21 minutes, 4.213...",
    real: "Waiting time is not limited to a few countable choices. Between 4 and 5 minutes there are infinitely many possible values. So instead of attaching probability to each exact point, we assign density and recover probability from areas over intervals.",
    ml: "Gaussian noise models, continuous likelihoods, regression uncertainty, and many generative models use probability densities.",
    wrong: "The height of a PDF is itself a probability and therefore can never exceed 1.",
    correction: "Area is probability. A density height can exceed 1 if the region is narrow enough that the total area still equals 1.",
    samples: [
      s("Turn width into probability", "Waiting time is uniform from 0 to 10 minutes. Find P(2≤X≤5).", ["The total interval has width 10, so uniform density is 1/10.", "The requested interval has width 3.", "Area = 3×1/10."], "0.30", "For continuous variables, probability is the area covering the requested interval."),
      s("Separate density height from probability", "X is uniform from 0 to 0.5, so the density height is 2. Is that invalid because 2>1?", ["The interval width is 0.5.", "Total area is width×height=0.5×2=1."], "No; it is a valid density", "Density is not probability at one point; only total area must equal 1."),
      s("Connect density to model noise", "A regression model assumes prediction errors are concentrated near 0 and become less dense farther away. What does the density represent?", ["Treat error as a continuous random variable.", "Higher density near 0 means small errors are more compatible with the model.", "Probability for a range of errors comes from area."], "A continuous model of prediction error", "Likelihood-based regression often uses a density to describe how plausible different continuous errors are.")
    ]
  }),

  make(9, {
    id: "cumulative-distribution-function",
    title: "Cumulative Distribution Function (CDF)",
    prerequisites: ["probability-mass-function", "probability-density-function"],
    requiredTermIds: ["probability-mass-function", "probability-density-function"],
    term: "cumulative distribution function (CDF)",
    definition: "A CDF gives the probability that a random variable is less than or equal to a chosen cutoff.",
    analogy: "A running probability total that can only stay level or grow as you move to the right",
    example: "F(30)=P(X≤30) can mean the probability a delivery arrives within 30 minutes.",
    non: "F(x) is not only the probability of exactly x; it includes everything at or below x.",
    realTitle: "Will the delivery arrive within 30 minutes?",
    real: "A customer usually does not care about the density at exactly 29.73 minutes. They care whether the delivery arrives by a deadline. The CDF answers that kind of threshold question directly by accumulating all probability up to the cutoff.",
    ml: "CDFs support percentiles, quantiles, anomaly thresholds, risk cutoffs, and sampling from distributions.",
    wrong: "A CDF is a separate type of random distribution unrelated to the PMF or PDF.",
    correction: "Every random variable has a CDF. It accumulates probability whether the underlying distribution is discrete or continuous.",
    samples: [
      s("Accumulate discrete probability", "P(X=0)=0.2, P(X=1)=0.5, P(X=2)=0.3. Find F(1).", ["F(1)=P(X≤1).", "Include the mass at 0 and 1.", "Add 0.2+0.5."], "0.7", "Seventy percent of the distribution lies at or below 1."),
      s("Read a service-level promise", "A delivery-time CDF gives F(30)=0.92. Interpret it.", ["CDF means P(X≤x).", "Substitute x=30."], "About 92% of deliveries arrive within 30 minutes", "CDF values are naturally interpreted as 'by this cutoff' probabilities."),
      s("Turn a CDF into an anomaly cutoff", "A transaction score x has F(x)=0.995. What does that suggest about its position?", ["F(x)=0.995 means 99.5% of modeled scores are at or below x.", "Only about 0.5% are above it."], "x is in the extreme upper tail", "Anomaly systems often flag observations lying beyond very high or very low quantile cutoffs.")
    ]
  }),

  make(10, {
    id: "expected-value",
    title: "Expected Value: What Happens on Average in the Long Run?",
    prerequisites: ["random-variables", "summation-subscripts-sets"],
    requiredTermIds: ["random-variables"],
    term: "expected value",
    definition: "Expected value is the probability-weighted long-run average of a random variable.",
    analogy: "Repeat the uncertain situation many times, keep the average result, and imagine the random noise smoothing out",
    example: "A fair die has expected value 3.5 even though you can never roll 3.5 on one throw.",
    non: "Expected value is not a promise about the next outcome and does not have to be one of the possible individual outcomes.",
    realTitle: "How much will refunds cost per order?",
    real: "A food-delivery company may refund £20 on a small fraction of orders and £0 on most orders. No single order costs the company the average amount, but across thousands of orders the average refund cost becomes crucial for pricing and budgeting.",
    ml: "Training objectives often minimize expected loss: the model should perform well on average across the data distribution, not only on one example.",
    formulas: ["expected-value"],
    wrong: "Expected value tells you the most likely next outcome.",
    correction: "Expectation is a weighted long-run average. The next outcome may be very different from that average.",
    samples: [
      s("Budget for refunds", "A company refunds £20 with probability 0.10 and £0 otherwise. What is the expected refund cost per order?", ["Weight £20 by 0.10: 20×0.10=2.", "Weight £0 by 0.90: 0.", "Add the weighted outcomes."], "£2 per order", "No individual order has a £2 refund, but over many orders the average refund cost approaches £2."),
      s("See why expectation need not be possible", "A fair die has outcomes 1 to 6. Compute its expected value.", ["Add the equally weighted outcomes: (1+2+3+4+5+6)/6.", "The sum is 21; divide by 6."], "3.5", "Expectation describes the center of repeated outcomes, not a value that must be observable in one trial."),
      s("Compute expected model loss", "A model has loss 0.1 on an easy case with probability 0.9 and loss 2.0 on a hard case with probability 0.1. Find expected loss.", ["Weight 0.1 by 0.9 to get 0.09.", "Weight 2.0 by 0.1 to get 0.20.", "Add them."], "0.29", "Expected loss summarizes average model cost across uncertain kinds of examples.")
    ]
  }),

  make(11, {
    id: "variance-population-sample",
    title: "Population & Sample Variance",
    prerequisites: ["expected-value"],
    requiredTermIds: ["expected-value"],
    term: "variance",
    definition: "Variance measures spread by averaging squared distances from the mean.",
    analogy: "The mean tells you where the group is centered; variance tells you how loosely or tightly the values are scattered around it",
    example: "Delivery times 29,30,31 and 10,30,50 have the same mean 30 but very different variance.",
    non: "Variance is not in the original measurement units; the units are squared.",
    realTitle: "Two buses average 8:00 AM — but only one is reliable",
    real: "Bus A arrives around 7:59, 8:00, and 8:01. Bus B sometimes arrives at 7:40 and sometimes at 8:20. Their average can be identical, yet your experience is completely different. Variance is what the mean cannot tell you: how much the values move around.",
    ml: "Variance appears in feature spread, noise, estimator uncertainty, cross-validation stability, and the bias-variance view of generalization.",
    formulas: ["variance", "sample-variance"],
    wrong: "If two datasets have the same mean, they behave essentially the same.",
    correction: "The mean only describes center. Variance reveals whether observations stay near that center or spread far away.",
    samples: [
      s("Calculate a tiny population variance", "The population values are 1 and 3. Find the variance.", ["Mean=(1+3)/2=2.", "Deviations are -1 and +1.", "Square them: 1 and 1.", "Average the squared deviations."], "1", "Squaring prevents positive and negative deviations from cancelling."),
      s("See the sample correction", "For sample values 2,4,6, the squared deviations from the mean 4 are 4,0,4. What is sample variance?", ["Sum squared deviations: 8.", "There are n=3 sampled values.", "For sample variance divide by n-1=2."], "4", "Using n-1 corrects the tendency of a sample to underestimate population spread."),
      s("Compare model stability", "Model A has validation accuracies 89%,90%,91%. Model B has 75%,90%,105% in a toy score scale with the same mean. Which has higher variance?", ["Both are centered near the same value.", "Model B's results are much farther from the center."], "Model B", "Two models can have similar average performance but very different stability across samples or folds.")
    ]
  }),

  make(12, {
    id: "standard-deviation",
    title: "Standard Deviation: Spread Back in Understandable Units",
    prerequisites: ["variance-population-sample"],
    requiredTermIds: ["variance-population-sample"],
    term: "standard deviation",
    definition: "Standard deviation is the non-negative square root of variance, returning spread to the original measurement units.",
    analogy: "Variance measures spread in squared units; standard deviation converts the answer back into the units you actually use",
    example: "Variance 16 minutes² gives standard deviation 4 minutes.",
    non: "Standard deviation cannot be negative.",
    realTitle: "Four minutes of variation means something; 16 minutes² does not",
    real: "If your commute averages 30 minutes, hearing that the variance is 16 minutes² is mathematically correct but awkward. Taking the square root gives a standard deviation of 4 minutes, which is immediately easier to interpret in the same units as the commute itself.",
    ml: "Standard deviation supports feature standardization, Gaussian models, anomaly detection, uncertainty reporting, and weight initialization.",
    formulas: ["standard-deviation", "sample-variance"],
    wrong: "Variance and standard deviation are interchangeable names for the same number.",
    correction: "Standard deviation is the square root of variance. It has the same units as the original data; variance has squared units.",
    samples: [
      s("Return to the original units", "Variance is 16 minutes². Find standard deviation.", ["Take the non-negative square root of 16."], "4 minutes", "Standard deviation expresses typical spread on the original measurement scale."),
      s("Compare consistency", "Service A has standard deviation 2 minutes; Service B has standard deviation 12 minutes. Their mean times are equal. Which is more consistent?", ["Smaller standard deviation means values stay closer to the mean."], "Service A", "Standard deviation makes spread comparisons easy when both variables use the same units."),
      s("Read feature spread before scaling", "A feature has mean 50 and standard deviation 10. A value of 60 is how far above the mean in raw units?", ["Subtract the mean: 60-50."], "10 units, which is one standard deviation", "Standardization uses standard deviation as a natural ruler for comparing values measured on different scales.")
    ]
  }),

  make(13, {
    id: "bernoulli-binomial",
    title: "Bernoulli & Binomial: One Yes/No Trial vs Many",
    prerequisites: ["probability-mass-function"],
    requiredTermIds: ["probability-mass-function"],
    term: "binomial distribution",
    definition: "A binomial random variable counts successes across a fixed number of independent Bernoulli trials with the same success probability.",
    analogy: "Bernoulli asks what happened once; binomial asks how many successes happened after repeating the same kind of trial",
    example: "One click/no-click event is Bernoulli; the number of clicks across ten independent trials can be binomial.",
    non: "If the success probability changes from trial to trial, the simple binomial model's assumptions are not satisfied.",
    realTitle: "One free throw is different from ten free throws",
    real: "For one basketball shot, the outcome is success or failure: a Bernoulli trial. If the same player takes ten comparable independent shots, a new question appears: how many shots go in? That count is what the binomial distribution models.",
    ml: "Binary labels connect naturally to Bernoulli likelihoods; repeated counts of independent binary outcomes connect to binomial models.",
    formulas: ["binomial"],
    wrong: "Bernoulli and binomial are two names for the exact same random variable.",
    correction: "Bernoulli models one binary trial. Binomial counts the number of successes across multiple Bernoulli trials.",
    samples: [
      s("Start with the easiest binomial event", "A player makes each shot with p=0.5. For 3 independent shots, what is P(X=3)?", ["All three shots must succeed.", "Multiply 0.5×0.5×0.5."], "0.125", "When every trial must succeed, the combination count is one."),
      s("Count the different ways", "For n=3 and p=0.5, find P(X=2).", ["Exactly two successes can occur as SSF, SFS, or FSS: 3 arrangements.", "Each arrangement has probability 0.5³=0.125.", "Multiply 3×0.125."], "0.375", "The binomial coefficient counts how many trial sequences produce the same success count."),
      s("Connect Bernoulli to binary classification", "A model predicts P(y=1)=0.8 for one example. If the true label is y=1, what Bernoulli probability did the model assign to the observed label?", ["The observed outcome is success y=1.", "Read the model's probability for that outcome."], "0.8", "Binary classification likelihoods can be written using the Bernoulli distribution.")
    ]
  }),

  make(14, {
    id: "normal-z-scores",
    title: "Normal Distributions & Z-Scores",
    prerequisites: ["standard-deviation"],
    requiredTermIds: ["standard-deviation"],
    term: "z-score",
    definition: "A z-score tells you how many standard deviations a value lies above or below the mean.",
    analogy: "Replace the original measurement units with a common ruler made of standard deviations",
    example: "z=2 means two standard deviations above the mean; z=-1 means one standard deviation below it.",
    non: "A negative z-score is not an error; it means the value lies below the mean.",
    realTitle: "Is 85 a great score? It depends on the test",
    real: "An 85 on an easy test may be ordinary while an 85 on a difficult test may be exceptional. Raw scores alone do not show relative position. A z-score compares the score with its own group's mean and spread.",
    ml: "Z-scores support feature standardization and anomaly detection, while normal distributions are common models for measurement noise and residual variation.",
    formulas: ["z-score", "standard-deviation"],
    wrong: "Every real dataset follows a perfect bell curve.",
    correction: "The normal distribution is useful and common, but it is a model or approximation whose fit should be checked rather than assumed blindly.",
    samples: [
      s("Measure relative position", "A score is 85, the mean is 70, and standard deviation is 5. Find z.", ["Subtract the mean: 85-70=15.", "Divide by 5."], "z=3", "The score is three standard deviations above the group mean."),
      s("Compare two different tests", "Test A: score 80, mean 70, sd 5. Test B: score 90, mean 80, sd 10. Which performance is stronger relative to its group?", ["Test A z=(80-70)/5=2.", "Test B z=(90-80)/10=1.", "Compare the standardized positions."], "Test A", "Standardization allows fairer comparison when raw scales or spreads differ."),
      s("Use z as an anomaly signal", "A sensor is standardized to mean 0 and sd 1. A new reading has z=4. What does that suggest?", ["The reading is four standard deviations above the mean.", "Values that far from the center are unusual under a normal-like model."], "It may be an anomaly worth checking", "Many anomaly detectors use standardized distance as one signal of unusual behavior.")
    ]
  }),

  make(15, {
    id: "covariance-correlation",
    title: "Covariance, Correlation & the Causation Trap",
    prerequisites: ["variance-population-sample", "vector-arithmetic"],
    requiredTermIds: ["variance-population-sample"],
    term: "correlation",
    definition: "Correlation is a standardized number from -1 to 1 describing the direction and strength of a linear relationship between two variables.",
    analogy: "A score for whether two quantities tend to rise together, move oppositely, or show little straight-line relationship",
    example: "Correlation near +1 means strong positive linear co-movement; near -1 means strong negative linear co-movement.",
    non: "Zero correlation does not prove independence, and high correlation does not prove causation.",
    realTitle: "Ice-cream sales do not cause drowning",
    real: "On hot days, both ice-cream sales and swimming activity rise. Drowning incidents may therefore rise at the same time as ice-cream sales. A strong correlation can appear even though buying ice cream is not the causal mechanism; temperature is influencing both.",
    ml: "Correlation and covariance help inspect features, diagnose multicollinearity, build covariance matrices, and motivate methods such as PCA.",
    formulas: ["covariance", "correlation"],
    wrong: "A strong correlation proves that changing X will cause Y to change.",
    correction: "Correlation describes association, not causal mechanism. Confounding variables and indirect relationships can create strong correlations.",
    samples: [
      s("Standardize covariance", "Covariance is 6, σx=2, and σy=3. Find correlation.", ["Multiply the standard deviations: 2×3=6.", "Divide covariance 6 by 6."], "r=1", "This calculation gives perfect positive linear association."),
      s("Recognize redundancy", "Height measured in centimeters and the same height measured in inches will have correlation very close to what value?", ["One measurement is almost an exact linear rescaling of the other.", "When one rises, the other rises proportionally."], "+1", "Highly correlated features may carry nearly duplicate information."),
      s("Avoid the causation mistake", "A dataset shows strong positive correlation between ice-cream sales and drowning incidents. What conclusion is justified?", ["The variables move together in the observed data.", "Look for possible confounders such as temperature or season."], "They are associated; causation is not established", "Exploratory correlations are useful signals, but causal claims require stronger design and evidence.")
    ]
  }),

  make(16, {
    id: "sampling-estimators-clt",
    title: "Sampling, Estimators & Central Limit Intuition",
    prerequisites: ["normal-z-scores", "expected-value"],
    requiredTermIds: ["expected-value", "variance-population-sample"],
    term: "estimator",
    definition: "An estimator is a rule that uses sample data to estimate an unknown property of a larger population.",
    analogy: "Taste one spoonful of soup to estimate the whole pot, while remembering a different spoonful may taste slightly different",
    example: "The sample mean x̄ estimates the population mean μ.",
    non: "One sample statistic is not guaranteed to equal the population parameter exactly.",
    realTitle: "You cannot ask every parent in the country",
    real: "A survey wants to estimate what thousands of people think, but it can only contact a sample. Another random sample would not give exactly the same result. Statistical inference is about learning from the sample while being honest about that sample-to-sample variation.",
    ml: "Training batches, validation scores, cross-validation results, and test metrics are all computed from samples and therefore contain sampling noise.",
    wrong: "If a model scores 92% on one test sample, its true future accuracy is exactly 92%.",
    correction: "A test score is an estimate of performance on a wider population of future cases. Different samples can give different estimates.",
    samples: [
      s("Estimate from a small sample", "Sample values are 2, 4, and 9. Use the sample mean to estimate the population mean.", ["Add the observations: 2+4+9=15.", "Divide by n=3."], "x̄=5", "The sample mean is our estimate; another sample would usually produce a somewhat different value."),
      s("See why sample size matters", "Which estimate is usually more stable: a mean from 20 independent observations or from 20,000 comparable observations?", ["Both are samples from the same wider population.", "Larger samples average over more individual randomness."], "The estimate from 20,000 observations", "Sampling variability generally shrinks as sample size grows."),
      s("Interpret validation accuracy as an estimate", "Model A scores 92% on 20 validation examples; Model B scores 92% on 20,000. Which 92% is more precise as an estimate?", ["The point estimates are equal.", "The much larger sample has less sampling variability."], "Model B's estimate", "A metric without sample-size context can give a false sense of certainty.")
    ]
  }),

  make(17, {
    id: "confidence-intervals",
    title: "Confidence Intervals & Model Evaluation Uncertainty",
    prerequisites: ["sampling-estimators-clt"],
    requiredTermIds: ["sampling-estimators-clt", "standard-deviation"],
    term: "confidence interval",
    definition: "A confidence interval is a range produced by a repeated-sampling method designed to capture the unknown population parameter at a stated long-run rate.",
    analogy: "A point estimate gives one best number; an interval shows how uncertain that estimate is",
    example: "An estimate of 50 with margin 4 gives the interval [46,54].",
    non: "For a frequentist interval already calculated, we do not say the fixed parameter now has a 95% probability of being inside that particular interval.",
    realTitle: "92% accuracy is not equally convincing on 20 and 20,000 cases",
    real: "Two models can report the same accuracy while having very different amounts of evidence behind that number. An interval forces us to show uncertainty instead of presenting a sample estimate as if it were the exact truth about future performance.",
    ml: "Confidence intervals help report uncertainty around accuracy, AUC, coefficients, experiment effects, and differences between competing models.",
    wrong: "A larger point estimate always proves one model is better than another.",
    correction: "Compare uncertainty as well as the point estimates. Small samples can produce noisy differences that disappear with more data.",
    samples: [
      s("Build the interval", "An estimate is 50 with margin of error 4. Give the interval.", ["Subtract 4 from 50 for the lower endpoint.", "Add 4 to 50 for the upper endpoint."], "[46,54]", "The interval communicates a range of values compatible with the estimator's sampling uncertainty under its assumptions."),
      s("Compare two uncertain estimates", "Model A accuracy is 90%±2%; Model B is 91%±5%. Can you confidently declare B better from these intervals alone?", ["A spans roughly 88% to 92%.", "B spans roughly 86% to 96%.", "The plausible ranges overlap substantially."], "No", "A one-point advantage is not persuasive when the uncertainty is much larger than the difference."),
      s("State the frequentist meaning carefully", "A method produces 95% confidence intervals. What does 95% describe?", ["Imagine repeating the whole sampling procedure many times.", "Each repetition produces a new interval.", "About 95% of those intervals capture the fixed true parameter under the method's assumptions."], "The long-run coverage of the procedure", "Confidence is a property of the interval-generating procedure, not a probability assigned to a fixed parameter after one interval is observed.")
    ]
  })
].map((lesson, index) => ({ ...lesson, order: index + 1 }));
