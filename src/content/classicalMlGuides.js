import { mcq } from "./schema.js";

const math = (latex) => `\\(${latex}\\)`;
const worked = (title, prompt, quantities, pairs, answer, interpretation) => ({
  title,
  prompt,
  quantities: quantities.map(([label, value, meaning]) => ({ label, value, meaning })),
  walkthrough: pairs.map(([action, reason]) => ({ action, reason })),
  steps: pairs.map(([action, reason]) => `${action} ${reason}`),
  answer,
  interpretation
});
const model = (title, prompt, mapping, pairs, answer, interpretation) => ({
  ...worked(title, prompt, [], pairs, answer, interpretation),
  mapping: [{ math: "Model setup", ml: prompt }, ...mapping.map(([math, ml]) => ({ math, ml }))]
});
const checks = (id, items) => items.map(([prompt, options, answerIndex, explanation], index) =>
  mcq(`classical-guided-${id}-${index + 1}`, prompt, options, answerIndex, explanation, "concept"));

// Guided stories supplement the original progressive levels. The aim is to make each
// algorithm answer a different question, so the unit feels like one connected journey.
export const CLASSICAL_ML_GUIDES = {
  "ml-workflow": {
    introduction: "Machine learning starts before the algorithm. First decide exactly what you want to predict, what information will exist at prediction time, and how you will test the model on examples it has never seen. A brilliant algorithm can still give a dishonest result if this setup is wrong.",
    concepts: [
      "Think of the dataset as evidence, not as one big pile you are free to reuse. Training data teaches the model. Validation data helps you choose settings. Test data is the final fresh check after those choices are finished.",
      "A feature is information given to the model. The target is the answer you want it to learn. If a feature contains information from the future, the model is effectively being shown part of the answer; that is data leakage.",
      "This lesson is the rulebook for every model that follows. Regression, trees, SVMs, KNN, and neural networks all depend on the same honest separation between learning and evaluation."
    ],
    misconception: {
      wrong: "If a model scores very highly on the data I already have, it must be good.",
      correction: "A model is useful only if it performs well on relevant unseen data. Training performance alone can reward memorization or leakage."
    },
    scenario: { title: "Practise, choose, then take a fresh test", body: "You have 10 practice cards. Use 6 to learn, 2 to compare study methods, and leave 2 unopened for a final check." },
    everydayExample: worked(
      "Give each card one job",
      "Split 10 cards into 6 learning cards, 2 comparison cards, and 2 final-test cards.",
      [["Learning cards", "6", "These teach the material."], ["Comparison cards", "2", "These help choose a study method."], ["Final-test cards", "2", "These stay unseen until the method is chosen."]],
      [[math("6+2+2=10"), "Count each card once so the groups use the whole set without overlap."], ["Choose the method using the 2 comparison cards; then open the 2 final-test cards.", "An unseen final check is more informative than another attempt on memorized answers."]],
      "6 to learn, 2 to choose, 2 for the final check",
      "Using final-test answers to choose a method would spoil their role as a fresh check."
    ),
    task: "Predict whether a customer will cancel next month, using only information available today. Features are inputs; a target is the answer being predicted.",
    mlExample: model(
      "Separate learning from evaluation",
      "For a toy dataset of 10 customers, use 6 training rows, 2 validation rows, and 2 test rows. Assume customers are independent and each appears in only one group.",
      [["6 training rows", "Fit model parameters and preprocessing using this group."], ["2 validation rows", "Compare settings without using the test answers."], ["2 test rows", "Estimate performance after choices are fixed; this tiny sample is only a teaching example."]],
      [["Fit using 6 rows and compare settings using 2 other rows.", "The model must be judged on examples it did not learn from."], ["Exclude next month's cancellation date from the input features.", "That date is unavailable today and would reveal the answer."], ["If 1 of the 2 test predictions is correct, accuracy is " + math("1/2=50\\%") + ".", "Count correct answers and divide by all test predictions; two cases are far too few for a reliable real-world estimate."]],
      "1 correct out of 2; 50% toy test accuracy",
      "The split protects evaluation from tuning decisions; the prediction time determines which inputs are valid."
    ),
    questions: checks("workflow", [["How many of the 10 cards stay untouched until the final check?", ["2", "6"], 0, "Six teach and two compare methods, leaving two for a fresh final check."], ["Where should preprocessing learn its settings?", ["Training data", "All rows, including test data"], 0, "Fitting preprocessing on training rows keeps test information out of model fitting."], ["Can a future cancellation date be used for a prediction made today?", ["Yes", "No"], 1, "It is unavailable at prediction time and leaks the target."]])
  },

  "linear-regression-ml": {
    introduction: "Linear regression is the cleanest first model because you can see every moving part. Features are multiplied by weights, those contributions are added, and the result is one numerical prediction. Training means finding weights that make those predictions miss the real values as little as possible.",
    concepts: [
      "Use linear regression when the target is a number such as price, temperature, score, or demand. The model asks how much the prediction should change when each feature changes, while the other features are accounted for.",
      "A prediction and an error are not the same thing. First compute the prediction. Then compare it with the actual value to get a residual. The loss summarizes those misses across the dataset.",
      "This model teaches a pattern that returns throughout ML: prediction rule → error → loss → optimization. Deep neural networks use the same overall loop, only with a far more flexible prediction rule."
    ],
    misconception: {
      wrong: "A fitted coefficient automatically tells me that changing that feature causes the target to change.",
      correction: "A regression coefficient describes an association inside the fitted model. Causal claims require stronger assumptions and study design."
    },
    scenario: { title: "A delivery bill with a starting fee", body: "A delivery costs 5 coins before travel and another 2 coins per kilometre. For a 4-kilometre trip, calculate the distance charge and then add the starting fee." },
    everydayExample: worked(
      "Make a prediction",
      math("\\hat{y}=2x+5") + " for " + math("x=4") + ".",
      [["Distance", "4 kilometres", "The input x."], ["Rate", "2 coins per kilometre", "The weight multiplying distance."], ["Starting fee", "5 coins", "The bias added once."]],
      [[math("2\\times4=8") + " coins for distance.", "Multiplying distance by the per-kilometre rate gives the variable part of the bill."], [math("8+5=13") + " coins in total.", "The starting fee is added once, regardless of distance."]],
      "13 coins",
      "The prediction increases by 2 coins for each additional kilometre under this rule."
    ),
    task: "Use a fitted linear rule to predict a delivery price, then compare it with an observed price. A residual is the actual price minus the prediction; squared error is the residual squared.",
    mlExample: model(
      "Prediction, residual, then loss",
      "Distance is 4 km, fitted weight is 2 coins/km, bias is 5 coins, and observed price is 15 coins.",
      [[math("x=4"), "Distance supplied to the model."], [math("w=2,\\ b=5"), "The learned rate and starting price."], [math("\\hat{y}=13,\\ y=15"), "Predicted and observed prices, respectively."]],
      [[math("\\hat{y}=2\\times4+5=13"), "Apply the learned rule to the new distance."], [math("y-\\hat{y}=15-13=2"), "The positive residual means the model predicted 2 coins too low."], [math("(y-\\hat{y})^2=2^2=4"), "Squaring measures the miss without allowing positive and negative errors to cancel."]],
      "Prediction 13; residual 2; squared error 4",
      "One example gives one squared error; averaging these errors across examples gives mean squared error."
    ),
    questions: checks("regression", [["What is the starting fee in the delivery rule?", ["5 coins", "2 coins"], 0, "The 5-coin fee is added once. The 2-coin rate is multiplied by distance."], ["Using the same rule, what is the prediction for 3 km?", ["11 coins", "15 coins"], 0, "Multiply 2 by 3 to get 6, then add 5 to get 11."], ["Actual price 15, prediction 13: what is the residual?", ["−2", "2"], 1, "Residual means actual minus predicted: 15 − 13 = 2."]])
  },

  "logistic-classification": {
    introduction: "Regression predicts a number. Classification predicts a category. Logistic regression connects the two ideas: it first builds a weighted numerical score, then squeezes that score into a probability, and only after that applies a threshold to make a yes-or-no decision.",
    concepts: [
      "Keep three objects separate: the logit is the unrestricted raw score, the sigmoid converts it to a probability, and the threshold converts that probability into a class label. Mixing these up causes a lot of confusion.",
      "The threshold is a decision rule, not part of the probability itself. A hospital screening system and a spam filter may use different thresholds even if both models output the same probability.",
      "Precision and recall exist because different mistakes have different costs. A useful classifier is not simply the one with the highest accuracy; it is the one evaluated with metrics that match the real problem."
    ],
    misconception: {
      wrong: "A predicted probability above 0.5 must always be classified as positive.",
      correction: "0.5 is a common default, not a law. The threshold should reflect the cost of false positives and false negatives."
    },
    scenario: { title: "Decide when to take an umbrella", body: "A forecast reports a 60% chance of rain. Your chosen rule is to take an umbrella whenever the chance is at least 50%. The chance and the decision are different things." },
    everydayExample: worked(
      "Compare a chance with a cutoff",
      "Rain chance is 0.6; take an umbrella when the chance is at least 0.5.",
      [["Rain chance", "0.6 = 60%", "A probability, not a guarantee."], ["Cutoff", "0.5 = 50%", "The boundary for your decision."]],
      [["Compare " + math("0.6\\ge0.5") + ".", "The cutoff translates an uncertain forecast into an action."], ["Take an umbrella.", "The rule is met even though rain is not certain."]],
      "Take the umbrella",
      "The decision depends on both the estimated chance and the chosen cutoff."
    ),
    task: "Turn an email's model score into a spam probability, then apply a decision threshold, the probability cutoff used to assign a label.",
    mlExample: model(
      "Score, probability, decision",
      "A logit, an unrestricted model score, is z=0. Use the sigmoid probability rule and classify as spam when p is at least 0.6.",
      [[math("z=0"), "Raw score; it is not itself a probability."], [math("p=0.5"), "The probability obtained from the sigmoid."], [math("0.6"), "The chosen spam cutoff."]],
      [[math("e^{-0}=1"), "Evaluate the exponential part of the sigmoid at zero."], [math("p=\\frac{1}{1+1}=0.5"), "The sigmoid converts the score into a probability."], [math("0.5<0.6") + ", so assign not spam.", "Apply the chosen threshold after calculating the probability."]],
      "Probability 0.5; decision not spam at cutoff 0.6",
      "A different cutoff could change the decision without changing the underlying probability."
    ),
    questions: checks("logistic", [["Does a 60% rain forecast guarantee rain?", ["Yes", "No"], 1, "It describes uncertainty; taking an umbrella is a separate decision."], ["Probability 0.7, cutoff 0.6: which label is chosen?", ["Spam", "Not spam"], 0, "0.7 is at least 0.6, so the stated rule chooses spam."], ["What does sigmoid turn into a probability?", ["An unrestricted score", "A final class name"], 0, "The logit is the raw score; the sigmoid maps it between zero and one."]])
  },

  "knn-distance": {
    introduction: "K-nearest neighbours takes a very different approach from regression. It does not learn one compact equation. It remembers the training examples and, when a new case arrives, asks which stored cases are most similar.",
    concepts: [
      "KNN is built directly on geometry. Represent each example as a point, measure distance to the new point, select the k closest examples, and let those neighbours vote or average their targets.",
      "Because distance uses the raw feature values, units matter. A feature measured in thousands can dominate a feature measured from zero to ten unless the features are put on comparable scales.",
      "Small k creates a very local, flexible model that can follow noise. Larger k smooths the neighbourhood. This is an early example of the bias-versus-variance tradeoff."
    ],
    misconception: {
      wrong: "KNN learns a set of model weights during training just like linear regression.",
      correction: "KNN mainly stores the training examples. Much of its computation happens later when a new example needs neighbours."
    },
    scenario: { title: "Ask people with nearby preferences", body: "Your preferred sweetness is 4 on a shared scale. Three friends prefer 3, 5, and 8. Their recommendations can be compared by how far their preferences are from yours." },
    everydayExample: worked(
      "Find the closest preferences",
      "Compare your sweetness 4 with friends at 3, 5, and 8.",
      [["Your preference", "4", "The point to compare."], ["Friends' preferences", "3, 5, 8", "Measured on the same scale."]],
      [[math("|4-3|=1,\\ |4-5|=1,\\ |4-8|=4"), "Absolute differences measure separation without negative distances."], ["The friends at 3 and 5 are equally close.", "Compare distances to identify the most similar measured preferences."]],
      "Distances 1, 1, and 4",
      "A tie in distance is possible; it should be handled by an explicit rule."
    ),
    task: "Use three nearby labelled examples to classify a new input. K-nearest neighbours stores examples and predicts from the closest ones.",
    mlExample: model(
      "Let three neighbours vote",
      "New input x=4. Training examples are (3, tea), (5, tea), (8, coffee), and (10, coffee). Choose k=3.",
      [[math("x=4"), "The new feature value."], [math("k=3"), "Number of neighbours allowed to vote."], ["Labels", "Tea or coffee are the recorded choices."]],
      [["Distances are " + math("1,1,4,6") + ".", "Compare each stored input with 4 on the same scale."], ["Select the points at 3, 5, and 8.", "These have the three smallest distances."], ["Count 2 tea votes and 1 coffee vote.", "The majority label becomes the classification."]],
      "Predict tea",
      "For several features, put them on comparable scales before distance calculations so a large unit does not dominate."
    ),
    questions: checks("knn", [["How far is 8 from 4 on this scale?", ["4", "12"], 0, "Distance is the absolute difference, |8 − 4| = 4."], ["Two tea votes and one coffee vote predict what?", ["Coffee", "Tea"], 1, "Tea has the majority of the three selected votes."], ["What does k=3 specify?", ["The number of neighbours", "The number of possible classes"], 0, "k controls how many nearby stored examples are consulted."]])
  },

  "naive-bayes": {
    introduction: "Naive Bayes does not ask which training example is closest and it does not draw a separating line first. It asks a probabilistic question: if this example belonged to each possible class, how likely would its observed evidence be? Then it combines that evidence with the class prior.",
    concepts: [
      "The prior is what you believed about the class before seeing the current features. The likelihood says how compatible the observed evidence is with that class. Bayes combines them into an updated class probability.",
      "The word naive refers to the simplifying assumption that features are conditionally independent once the class is known. That assumption is often imperfect, but the model can still work surprisingly well, especially with text-like count features.",
      "Multiplying many tiny probabilities can underflow numerically, so implementations usually add log probabilities instead. The mathematics is equivalent for choosing the largest class score."
    ],
    misconception: {
      wrong: "Naive Bayes assumes the input features are completely independent in the real world.",
      correction: "It assumes conditional independence given the class. Features may still be associated overall."
    },
    scenario: { title: "Update a guess from a coloured bead", body: "Two bags are equally likely to be chosen. Bag A has 3 red beads out of 4; bag B has 1 red bead out of 4. Seeing a red bead gives more support to bag A." },
    everydayExample: worked(
      "Combine a starting chance with evidence",
      "Each bag has starting probability 0.5; red-bead probabilities are 0.75 in A and 0.25 in B.",
      [["Starting chances", "0.5 each", "Neither bag is favoured initially."], ["Chance of red", "0.75 in A; 0.25 in B", "How well each bag explains the evidence."]],
      [[math("0.5\\times0.75=0.375") + " for A; " + math("0.5\\times0.25=0.125") + " for B.", "Multiply each starting chance by how likely the evidence is under that choice."], [math("0.375/(0.375+0.125)=0.75"), "Divide A's score by the total score to obtain its updated probability."]],
      "75% probability of bag A after seeing red",
      "The evidence favours A, but does not make B impossible."
    ),
    task: "Classify a message from word evidence. A prior is a class probability before the words are seen; a likelihood is the chance of the observed words within a class.",
    mlExample: model(
      "Score two message classes",
      "Spam and ordinary messages each have prior 0.5. In spam, P(offer)=0.8 and P(prize)=0.5. In ordinary messages these are 0.2 and 0.1. Both words are present.",
      [["Class priors", "0.5 for each class."], ["Word likelihoods", "0.8 and 0.5 for spam; 0.2 and 0.1 for ordinary messages."], ["Assumption", "Treat the two word-presence observations as conditionally independent within each class."]],
      [[math("s_{\\mathrm{spam}}=0.5\\times0.8\\times0.5=0.2"), "Combine the prior with both word likelihoods under the stated independence assumption."], [math("s_{\\mathrm{ordinary}}=0.5\\times0.2\\times0.1=0.01"), "Apply the same rule to the other class."], [math("P(\\mathrm{spam}\\mid\\mathrm{words})=\\frac{0.2}{0.2+0.01}\\approx0.952"), "Normalize both nonnegative class scores so the probabilities sum to one."]],
      "Predict spam; model probability about 95.2%",
      "This probability comes from the assumed model. Correlated words can make the independence assumption inaccurate."
    ),
    questions: checks("bayes", [["Which bag better explains a red bead?", ["Bag A", "Bag B"], 0, "Red occurs with probability 0.75 in A and 0.25 in B."], ["What is the spam score 0.5 × 0.8 × 0.5?", ["0.2", "1.8"], 0, "Multiply the prior and both likelihoods; do not add them."], ["Why divide a class score by the sum of class scores?", ["To obtain normalized probabilities", "To make the words independent"], 0, "Normalization makes probabilities sum to one; it does not establish independence."]])
  },

  "trees-ensembles": {
    introduction: "Decision trees learn by asking a sequence of simple questions. Instead of one smooth equation, the model repeatedly splits the data into smaller groups. That makes trees intuitive to inspect, but a single deep tree can become an expert at memorizing its training data.",
    concepts: [
      "A split asks a question such as whether a feature is above a threshold. Good splits make the child groups purer with respect to the target. Gini impurity and entropy are two ways of measuring that mixture.",
      "A random forest tackles the instability of one tree by training many varied trees and averaging or voting. Bagging mainly reduces variance because the trees are trained independently on varied samples and feature subsets.",
      "Boosting is different: new trees are added sequentially to correct what the current ensemble still gets wrong. This is why boosting connects naturally to residuals and gradient-based thinking."
    ],
    misconception: {
      wrong: "Random forests and boosting are basically the same because both use many trees.",
      correction: "Random forests build many trees largely independently and combine them. Boosting builds trees sequentially so later trees correct earlier errors."
    },
    scenario: { title: "Follow a packing checklist", body: "For a parcel weighing 3 kg, a checklist asks whether it weighs more than 2 kg. A yes answer chooses a sturdy box; a no answer chooses a light box." },
    everydayExample: worked(
      "Follow one decision split",
      "Parcel weight is 3 kg; the sturdy-box cutoff is more than 2 kg.",
      [["Parcel weight", "3 kg", "The measured input."], ["Split cutoff", "2 kg", "The value used by the question."]],
      [[math("3>2"), "Compare the measured feature with the cutoff."], ["Follow the yes branch to sturdy box.", "The branch leads to the checklist's decision."]],
      "Sturdy box",
      "A decision tree follows this kind of branching rule; in ML, its splits are learned from examples."
    ),
    task: "Combine three learned decision trees to classify a parcel. An ensemble is a collection of models whose predictions are combined.",
    mlExample: model(
      "Combine tree decisions",
      "For one parcel, tree 1 predicts sturdy, tree 2 predicts light, and tree 3 predicts sturdy. Use majority voting.",
      [["3 trees", "Each produces one class prediction for the same input."], ["2 sturdy votes; 1 light vote", "The predictions to combine."]],
      [["Collect sturdy, light, sturdy.", "Each fitted tree evaluates the input using its own learned splits."], [math("2>1") + ", so choose sturdy.", "The majority combines the separate class predictions into one result."]],
      "Ensemble predicts sturdy",
      "A vote can be more stable than a single tree, but trees that make the same mistakes may still be wrong together. Boosting instead builds models in sequence to correct earlier errors."
    ),
    questions: checks("trees", [["Does a 3 kg parcel satisfy 'more than 2 kg'?", ["Yes", "No"], 0, "3 is greater than 2, so follow the yes branch."], ["Votes sturdy, light, sturdy: what wins?", ["Light", "Sturdy"], 1, "Two of three trees vote sturdy."], ["Does agreement among trees guarantee correctness?", ["Yes", "No"], 1, "Different trees can share the same mistake; evaluate the combined model on unseen examples."]])
  },

  "support-vector-machines": {
    introduction: "An SVM is a boundary model, but its key idea is not merely finding any line that separates two classes. It tries to leave the widest possible safety corridor between the classes, because a boundary with breathing room is usually less sensitive to small changes in the data.",
    concepts: [
      "The examples closest to the boundary are the support vectors. They are the points that constrain where the maximum-margin boundary can sit; distant points often have little direct effect on that position.",
      "The parameter C controls how much the model is willing to tolerate margin violations. A very strict fit can create a narrow, sensitive boundary; allowing some violations can improve generalization.",
      "Kernels extend the idea to nonlinear boundaries by measuring similarity as if the data had been mapped into a richer feature space. The kernel trick avoids explicitly constructing every coordinate of that space."
    ],
    misconception: {
      wrong: "The SVM decision score is a probability.",
      correction: "The score tells which side of the boundary a point lies on and how strongly relative to that boundary. Probability calibration is a separate step."
    },
    scenario: { title: "Leave space around a dividing line", body: "On a shelf ruler, the closest small box is at position 2 and the closest large box is at position 6. Put a divider between them with equal space on both sides." },
    everydayExample: worked(
      "Centre the divider",
      "The nearest boxes on opposite sides are at 2 and 6.",
      [["Left box", "Position 2", "The nearest box in the small-box group."], ["Right box", "Position 6", "The nearest box in the large-box group."]],
      [[math("(2+6)/2=4"), "The midpoint balances the available gap on either side."], [math("4-2=2,\\ 6-4=2"), "Check the clearance from the divider to each nearest box."]],
      "Divider at 4; clearance 2 on each side",
      "Moving either nearest box can change where the widest balanced gap is found."
    ),
    task: "Classify a one-dimensional input by a separating boundary. The margin is the clearance to the nearest training examples; support vectors are the examples that constrain it.",
    mlExample: model(
      "Score a side of the boundary",
      "Class −1 has points 1 and 2; class +1 has points 6 and 7. Use score x−4. The nearest opposite-class points are 2 and 6.",
      [[math("w=1,\\ b=-4"), "These define the score wx+b and a boundary at x=4."], ["Support points 2 and 6", "These limit the clearance around this boundary."], [math("x=5"), "A new point to classify."]],
      [[math("5-4=1>0"), "The positive score places the new point on the +1 side."], [math("|2-4|=|6-4|=2"), "Measure the geometric distance to the closest training points."], ["Predict +1 for the new point at 5.", "The score's sign determines the class; its magnitude is not a probability."]],
      "Class +1; geometric margin 2",
      "The maximum-margin idea uses the nearest examples to position the boundary. This is a separable one-dimensional case; overlapping data require allowing some violations."
    ),
    questions: checks("svm", [["What is the midpoint of 2 and 6?", ["4", "8"], 0, "Add 2 and 6, then divide by 2."], ["Using score x−4, what is the score at x=5?", ["1", "−1"], 0, "5 − 4 = 1, which is on the positive side."], ["Is a positive score of 1 a guaranteed probability of 100%?", ["Yes", "No"], 1, "The score locates a point relative to the boundary; it is not a probability."]])
  },

  "clustering-unsupervised": {
    introduction: "Everything so far has used labelled targets. Clustering removes that answer column and asks a different question: does the geometry of the features suggest useful groups? That makes clustering exploratory rather than automatically predictive.",
    concepts: [
      "K-means begins with chosen centroids, assigns each point to its nearest centroid, recomputes each centroid as the mean of its assigned points, and repeats. The algorithm is simple; the interpretation is not.",
      "The number of clusters k is a choice, not a truth revealed by the universe. Elbow plots and silhouette scores can help, but they measure geometric structure rather than whether the groups are meaningful for the real problem.",
      "Feature scaling and representation matter enormously because the clusters are built from distance. Change the features or their scale and you may discover a different grouping."
    ],
    misconception: {
      wrong: "If K-means finds three clean clusters, then three real types definitely exist.",
      correction: "The result reflects the chosen features, scaling, distance, initialization, and k. Domain meaning still needs to be validated."
    },
    scenario: { title: "Group pencils by length", body: "Four pencils measure 1, 2, 8, and 9 cm. The two short pencils are close together, and the two long pencils are close together. No category labels were supplied." },
    everydayExample: worked(
      "Find two group centres",
      "Make groups [1,2] and [8,9] from four pencil lengths.",
      [["Short lengths", "1 and 2 cm", "The first group."], ["Long lengths", "8 and 9 cm", "The second group."]],
      [[math("(1+2)/2=1.5"), "Average the first group's measurements to find its centre."], [math("(8+9)/2=8.5"), "Apply the same averaging rule to the second group."]],
      "Centres 1.5 cm and 8.5 cm",
      "Group centres summarize measured similarity, without proving that the groups have useful real-world meanings."
    ),
    task: "Perform one K-means assignment and update. A centroid is a group's coordinate-wise mean. Unsupervised learning finds structure without supplied target labels.",
    mlExample: model(
      "Assign points, then update centres",
      "Inputs are 1, 2, 8, and 9. Choose two initial centroids at 1 and 9; use distance on this one-dimensional scale.",
      [["Inputs 1, 2, 8, 9", "Unlabelled measurements to group."], ["Initial centroids 1 and 9", "Starting centres, chosen before this iteration."], ["Two clusters", "A chosen setting, not a discovered guarantee about the data."]],
      [["Point 2 is distance 1 from centre 1 and distance 7 from centre 9; point 8 is closer to 9.", "Assign each point to its closest current centre."], ["The groups are [1,2] and [8,9].", "Points at the starting centres remain in their nearest groups."], [math("c_1=(1+2)/2=1.5,\\quad c_2=(8+9)/2=8.5"), "Update each centroid to the mean of the points assigned to it."]],
      "New centroids 1.5 and 8.5",
      "Repeat assignment and updating until the groups stabilize; different starting centres can give different results."
    ),
    questions: checks("clustering", [["What is the mean of pencil lengths 1 and 2?", ["1.5", "3"], 0, "Their sum is 3; divide by the two pencils."], ["Is input 2 closer to centre 1 or centre 9?", ["Centre 1", "Centre 9"], 0, "The distances are 1 and 7, respectively."], ["Do two clusters prove two meaningful customer types exist?", ["Yes", "No"], 1, "A grouping reflects the features, distance measure, and chosen settings; its meaning needs investigation."]])
  },

  "model-selection-generalization": {
    introduction: "The final question is bigger than any one algorithm: how do you know the model learned a pattern rather than memorized the training data? Generalization is the point of the whole course. Model selection is the process of choosing complexity using unseen validation data instead of rewarding training perfection.",
    concepts: [
      "Underfitting means the model cannot capture enough of the real pattern: training and validation performance are both poor. Overfitting means training performance is excellent while validation performance falls behind because the model has learned details that do not transfer.",
      "Bias and variance are two useful ways to think about this tradeoff. Simpler models tend to have more bias; highly flexible models can have more variance. Regularization, more representative data, and careful model selection help control the balance.",
      "Cross-validation repeats the train-validation idea across several splits so your conclusion does not depend too heavily on one lucky partition. The final test set should still remain untouched until the model-selection process is finished."
    ],
    misconception: {
      wrong: "The model with the lowest training error is the best model.",
      correction: "Training error measures fit to familiar examples. Model selection should be based on relevant unseen validation performance, followed by one final test evaluation."
    },
    scenario: { title: "Choose a study method using fresh questions", body: "Method A misses 0 of 10 practised questions but 4 of 10 fresh questions. Method B misses 1 practised question and 2 fresh questions. Choose based on the fresh questions." },
    everydayExample: worked(
      "Compare performance on new questions",
      "Each method is checked on 10 practised and 10 fresh questions. A makes 0/4 errors; B makes 1/2 errors, respectively.",
      [["Method A", "0 practised errors; 4 fresh errors", "Perfect recall does not transfer well here."], ["Method B", "1 practised error; 2 fresh errors", "Slightly less perfect recall, but better fresh performance."]],
      [[math("4/10=40\\%") + " fresh error for A; " + math("2/10=20\\%") + " for B.", "Use the same denominator to compare performance fairly."], ["Choose B using these fresh-question results.", "The goal is success on questions that were not used for practice."]],
      "Choose B: 20% fresh error instead of 40%",
      "The best memorizer is not necessarily the best learner."
    ),
    task: "Select model complexity using validation error. Generalization means performing well on relevant unseen examples; overfitting means learning training details that do not transfer.",
    mlExample: model(
      "Measure the gap and choose a model",
      "Model A has training error 0% and validation error 40%. Model B has training error 10% and validation error 20%, measured on the same split.",
      [["Training errors 0% and 10%", "Performance on data used to fit each model."], ["Validation errors 40% and 20%", "Performance on held-out data used to compare choices."], ["Complexity setting", "A hyperparameter: a setting chosen outside ordinary parameter fitting."]],
      [[math("40-0=40") + " percentage points for A.", "Subtract training error from validation error to measure A's gap."], [math("20-10=10") + " percentage points for B.", "Use the same calculation for B."], ["Select B, whose validation error is 20% rather than 40%.", "Prefer better held-out performance, not merely a smaller gap; then evaluate once on an untouched test set."]],
      "Select B; gaps are 40 and 10 percentage points",
      "A small gap alone does not prove a model is good: both training and validation errors might be high."
    ),
    questions: checks("selection", [["Which method misses fewer fresh questions?", ["A", "B"], 1, "B misses 2 out of 10; A misses 4 out of 10."], ["Training error 10%, validation error 20%: what is the gap?", ["10 percentage points", "30 percentage points"], 0, "Subtract training error from validation error: 20 − 10 = 10 percentage points."], ["Should you select a model only because its gap is small?", ["Yes", "No"], 1, "A model can have a small gap while performing poorly on both datasets. Compare validation performance too."]])
  }
};