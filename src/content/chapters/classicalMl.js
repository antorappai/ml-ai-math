import { check, codeLab, progressiveLesson } from "../lessonBuilder.js";

const sklearnLab = (config) => codeLab({ packages: ["numpy", "scikit-learn"], ...config });

export const classicalMlLessons = [
  progressiveLesson({
    id: "ml-workflow",
    chapterId: "classical-ml",
    order: 1,
    title: "The Machine Learning Workflow",
    subtitle: "Frame a problem, prepare data, avoid leakage, and evaluate honestly.",
    prerequisites: ["sampling-estimators-clt", "matrix-matrix-multiplication"],
    tags: ["workflow", "data", "evaluation"],
    scenario: { title: "Predicting customer churn", body: "A business wants to identify customers likely to leave next month using information available today.", mlParallel: "The prediction time determines which features are legal and which leak the future." },
    mlConnection: "A sophisticated model cannot rescue a badly framed target, leaky feature set, or dishonest test procedure.",
    projectIds: ["workflow-mini"],
    basics: {
      summary: "Separate features, targets, training, validation, and testing.",
      concepts: ["Supervised learning uses labelled targets.", "Features must be available at prediction time.", "A test set estimates future performance."],
      formulaIds: [],
      example: { title: "Spot leakage", prompt: "Can next month's cancellation date predict whether a customer cancels next month?", steps: ["Ask when the feature becomes known.", "It is known only after the outcome."], answer: "No; it leaks the target", interpretation: "The model would cheat rather than generalize." },
      pythonLab: sklearnLab({ title: "Train-test split", goal: "Create reproducible data partitions.", code: "from sklearn.model_selection import train_test_split\nX = [[1],[2],[3],[4],[5]]\ny = [0,0,0,1,1]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=7)\nprint(len(X_train), len(X_test))", output: "3 2", explanation: "random_state makes the split reproducible." }),
      questions: [check("workflow-b1", "What is data leakage?", ["Missing values", "Using information unavailable at prediction time", "A small dataset", "A low learning rate"], 1, "Leakage gives the model unfair future information.")],
      examNotes: ["State the prediction moment and target before discussing algorithms."]
    },
    core: {
      summary: "Build preprocessing pipelines and choose metrics that match the cost of errors.",
      concepts: ["Fit preprocessing only on training data.", "Categorical and numeric features need different handling.", "Class imbalance can make accuracy misleading."],
      formulaIds: ["classification-metrics"],
      example: { title: "Choose a metric", prompt: "For rare fraud, why can 99% accuracy be useless?", steps: ["Fraud may be only 1%.", "Predicting no fraud always gets 99%."], answer: "Accuracy hides failure on the positive class", interpretation: "Inspect precision, recall, PR curves, and costs." },
      questions: [check("workflow-c1", "When should a scaler be fitted?", ["On all data", "On training data only", "On test data only", "After deployment"], 1, "Fitting on all data leaks test-distribution information.")],
      examNotes: ["Use a pipeline to keep preprocessing inside each training fold."]
    },
    advanced: {
      summary: "Treat deployment shift, fairness, calibration, and reproducibility as part of model quality.",
      concepts: ["Data distributions change after deployment.", "Subgroup metrics can reveal hidden failure.", "Reproducibility requires seeds, versions, and saved preprocessing."],
      formulaIds: ["classification-metrics"],
      example: { title: "Distribution shift", prompt: "A credit model was trained before an economic shock. What should be checked?", steps: ["Compare feature and target distributions.", "Re-evaluate calibration and subgroup performance."], answer: "Data and concept drift", interpretation: "Past validation may no longer represent deployment." },
      questions: [check("workflow-a1", "Why preserve an untouched test set?", ["To train longer", "To estimate final generalization after model selection", "To scale features", "To increase labels"], 1, "Selection decisions otherwise overfit the evaluation data.")],
      examNotes: ["Evaluation assumptions are part of the answer, not an afterthought."]
    }
  }),
  progressiveLesson({
    id: "linear-regression-ml",
    chapterId: "classical-ml",
    order: 2,
    title: "Linear Regression From Math To Model",
    subtitle: "Connect weighted predictions, residuals, least squares, gradients, and regularization.",
    prerequisites: ["ml-workflow", "gradient-descent-learning-rate"],
    tags: ["regression", "least-squares"],
    scenario: { title: "House prices", body: "Size, location score, rooms, and age each contribute to an estimated price.", mlParallel: "Regression learns those feature contributions from labelled examples." },
    mlConnection: "Linear regression is the cleanest meeting point of vectors, statistics, loss, optimization, and evaluation.",
    projectIds: ["regression-mini", "classical-capstone"],
    basics: {
      summary: "Predict a continuous number using a weighted sum.",
      concepts: ["Weights describe conditional feature contributions.", "Residual equals actual minus predicted.", "Intercept is the baseline prediction."],
      formulaIds: ["linear-regression", "mse"],
      example: { title: "Make a prediction", prompt: "yhat=2x+5 for x=4.", steps: ["Multiply 2 by 4.", "Add 5."], answer: "13", interpretation: "A one-unit x increase raises prediction by two." },
      pythonLab: sklearnLab({ title: "Fit linear regression", goal: "Learn slope and intercept.", code: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\nX = np.array([[1],[2],[3],[4]])\ny = np.array([3,5,7,9])\nmodel = LinearRegression().fit(X, y)\nprint(model.coef_)\nprint(model.intercept_)\nprint(model.predict([[5]]))", output: "[2.]\n1.0\n[11.]", explanation: "The model recovers y=2x+1." }),
      questions: [check("linreg-b1", "What is a residual?", ["Weight minus feature", "Actual value minus prediction", "Mean target", "Learning rate"], 1, "Residuals are observed prediction errors.")],
      examNotes: ["Keep prediction, residual, and loss as separate quantities."]
    },
    core: {
      summary: "Minimize squared errors and interpret coefficients with care.",
      concepts: ["Least squares chooses weights minimizing MSE.", "Correlated features make individual coefficient interpretation unstable.", "Standardization changes coefficient scale."],
      formulaIds: ["linear-regression", "mse", "gradient-descent"],
      example: { title: "Compare errors", prompt: "Residuals are 1 and -3. Compute MSE.", steps: ["Square to get 1 and 9.", "Average."], answer: "5", interpretation: "Large errors receive extra weight." },
      questions: [check("linreg-c1", "Why square residuals?", ["To make labels binary", "To avoid cancellation and penalize large errors", "To remove features", "To guarantee causality"], 1, "Squaring handles signs and emphasizes large misses.")],
      examNotes: ["Check residual plots for patterns that violate linear assumptions."]
    },
    advanced: {
      summary: "Use regularization, polynomial features, diagnostics, and uncertainty-aware interpretation.",
      concepts: ["Ridge shrinks weights using an L2 penalty.", "Polynomial features keep the model linear in parameters while allowing curved inputs.", "Extrapolation outside training range is risky."],
      formulaIds: ["ridge", "linear-regression", "mse"],
      example: { title: "Regularization tradeoff", prompt: "What happens as ridge lambda increases?", steps: ["Weight penalty matters more.", "Weights shrink.", "Bias can rise while variance falls."], answer: "The model becomes more constrained", interpretation: "Some training fit is traded for stability." },
      questions: [check("linreg-a1", "Why scale features before ridge?", ["To create labels", "So the penalty treats coefficients comparably", "To remove intercept", "To force perfect fit"], 1, "Unscaled feature units distort coefficient-size penalties.")],
      examNotes: ["State whether a coefficient interpretation is associative or causal."]
    }
  }),
  progressiveLesson({
    id: "logistic-classification",
    chapterId: "classical-ml",
    order: 3,
    title: "Logistic Regression & Classification Metrics",
    subtitle: "Move from logits to probabilities, thresholds, losses, and operational decisions.",
    prerequisites: ["linear-regression-ml", "bayes-theorem"],
    tags: ["classification", "logistic-regression", "metrics"],
    scenario: { title: "Spam filtering", body: "A model scores how strongly an email resembles spam, then converts that score into probability and a decision.", mlParallel: "Logistic regression separates score, probability, threshold, and class label." },
    mlConnection: "Logistic regression is the baseline for probabilistic binary classification and neural output layers.",
    basics: {
      summary: "A logit is converted into a probability by the sigmoid.",
      concepts: ["The raw score can be any real number.", "Sigmoid maps score to zero-to-one.", "A threshold converts probability into a class decision."],
      formulaIds: ["sigmoid"],
      example: { title: "Interpret score zero", prompt: "What probability does sigmoid(0) return?", steps: ["e^0=1.", "Compute 1/(1+1)."], answer: "0.5", interpretation: "Zero logit is the midpoint, not certainty." },
      pythonLab: sklearnLab({ title: "Fit logistic regression", goal: "Train a binary classifier.", code: "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nX = np.array([[0],[1],[2],[3]])\ny = np.array([0,0,1,1])\nmodel = LogisticRegression().fit(X, y)\nprint(np.round(model.predict_proba([[1.5]]), 3))", output: "A two-class probability array near [0.5, 0.5]", explanation: "predict_proba returns probabilities in class order." }),
      questions: [check("logreg-b1", "What does a positive logit imply?", ["Probability below .5", "Probability above .5", "Guaranteed class 1", "Negative loss"], 1, "Sigmoid maps positive scores above .5.")],
      examNotes: ["Do not call the logit a probability."]
    },
    core: {
      summary: "Train with cross-entropy and evaluate threshold-dependent errors.",
      concepts: ["Cross-entropy punishes confident wrong predictions.", "Precision and recall focus on different error types.", "Changing the threshold changes the confusion matrix."],
      formulaIds: ["sigmoid", "binary-cross-entropy", "classification-metrics"],
      example: { title: "Choose recall", prompt: "Why prioritize recall for a dangerous disease screen?", steps: ["False negatives miss sick patients.", "Recall measures actual positives found."], answer: "Missing a case is costly", interpretation: "Metric choice reflects real consequences." },
      questions: [check("logreg-c1", "Which metric penalizes false negatives in its denominator?", ["Precision", "Recall", "Specificity only", "MSE"], 1, "Recall is TP/(TP+FN).")],
      examNotes: ["Write TP, FP, FN, and TN before selecting a metric formula."]
    },
    advanced: {
      summary: "Reason about regularization, calibration, ROC/PR curves, and multiclass extensions.",
      concepts: ["Probability calibration is separate from ranking quality.", "PR curves are informative for rare positives.", "One-vs-rest and softmax handle multiclass settings differently."],
      formulaIds: ["binary-cross-entropy", "classification-metrics", "softmax"],
      example: { title: "Threshold tradeoff", prompt: "What usually happens to recall when the positive threshold is lowered?", steps: ["More cases are predicted positive.", "Fewer actual positives are missed."], answer: "Recall rises, often while precision falls", interpretation: "Thresholds encode operational tradeoffs." },
      questions: [check("logreg-a1", "Can a model have strong ranking but poor calibration?", ["No", "Yes", "Only with regression", "Only with balanced classes"], 1, "Ranking and probability accuracy are distinct properties.")],
      examNotes: ["Keep model scoring, probability estimation, and business threshold separate."]
    }
  }),
  progressiveLesson({
    id: "knn-distance",
    chapterId: "classical-ml",
    order: 4,
    title: "K-Nearest Neighbours & Distance Learning",
    subtitle: "Predict from nearby examples and understand the geometry the model depends on.",
    prerequisites: ["vector-magnitude-distance", "ml-workflow"],
    tags: ["knn", "distance"],
    scenario: { title: "Ask similar customers", body: "To estimate what a new customer may prefer, look at customers with nearby profiles.", mlParallel: "KNN predicts using labels or targets of nearest training vectors." },
    mlConnection: "KNN exposes how scaling, dimensions, and distance directly shape a model.",
    basics: {
      summary: "KNN stores training data and predicts from nearby points.",
      concepts: ["Classification uses neighbour voting.", "Regression averages neighbour targets.", "Small k is flexible; large k is smoother."],
      formulaIds: ["distance"],
      example: { title: "One nearest neighbour", prompt: "The closest labelled point is class A. What does 1-NN predict?", steps: ["Find nearest point.", "Copy its class."], answer: "Class A", interpretation: "The local neighbourhood defines the prediction." },
      pythonLab: sklearnLab({ title: "KNN classifier", goal: "Fit and query nearest neighbours.", code: "from sklearn.neighbors import KNeighborsClassifier\nX = [[0],[1],[4],[5]]\ny = [0,0,1,1]\nmodel = KNeighborsClassifier(n_neighbors=3).fit(X, y)\nprint(model.predict([[3]]))", output: "[1]", explanation: "The majority among the three nearest labels determines the class." }),
      questions: [check("knn-b1", "What does K control?", ["Number of features", "Number of neighbours", "Number of classes always", "Learning rate"], 1, "K is the neighbourhood size.")],
      examNotes: ["Compute all requested distances before voting."]
    },
    core: {
      summary: "Scale features, tune k, and understand weighted neighbours.",
      concepts: ["Distance is sensitive to feature units.", "Cross-validation can choose k.", "Closer neighbours can receive larger weights."],
      formulaIds: ["distance", "z-score"],
      example: { title: "Why scale", prompt: "Income ranges to 100000 and age to 100. Which dominates raw distance?", steps: ["Compare numerical ranges.", "Income differences are far larger."], answer: "Income", interpretation: "Standardize before distance-based learning." },
      questions: [check("knn-c1", "What is a likely effect of very small k?", ["High bias and low variance", "Low bias and high variance", "No sensitivity to noise", "Linear decision boundary"], 1, "Small neighbourhoods fit local noise more easily.")],
      examNotes: ["Discuss scaling whenever distance appears."]
    },
    advanced: {
      summary: "Understand the curse of dimensionality, search cost, and metric choice.",
      concepts: ["Distances become less contrasted in high dimensions.", "Prediction can be expensive because neighbours are searched at inference time.", "Different metrics encode different geometry."],
      formulaIds: ["distance", "dot-product"],
      example: { title: "High-dimensional trouble", prompt: "Why can all points seem similarly far in many dimensions?", steps: ["Many independent coordinate differences accumulate.", "Nearest and farthest distances become less distinct."], answer: "Distance concentration", interpretation: "Feature selection or dimensionality reduction may help." },
      questions: [check("knn-a1", "Why is KNN called a lazy learner?", ["It never predicts", "It defers most computation until prediction", "It uses no data", "It has zero memory cost"], 1, "KNN stores examples rather than fitting a compact parametric rule.")],
      examNotes: ["Mention both statistical and computational effects of dimension."]
    }
  }),
  progressiveLesson({
    id: "naive-bayes",
    chapterId: "classical-ml",
    order: 5,
    title: "Naive Bayes Classification",
    subtitle: "Combine feature evidence using Bayes and a simplifying independence assumption.",
    prerequisites: ["bayes-theorem", "probability-density-function"],
    tags: ["naive-bayes", "probabilistic-model"],
    scenario: { title: "Word evidence in spam", body: "Words such as free and prize provide evidence about whether an email is spam.", mlParallel: "Naive Bayes multiplies per-feature likelihoods within each candidate class." },
    mlConnection: "It is a fast probabilistic baseline and a practical lesson in modeling assumptions.",
    basics: {
      summary: "Choose the class with the largest posterior probability.",
      concepts: ["Prior describes class frequency.", "Likelihood describes evidence within a class.", "Naive means conditionally independent features given the class."],
      formulaIds: ["bayes"],
      example: { title: "Prior effect", prompt: "If spam is rare, why can strong word evidence still need caution?", steps: ["Start with a small spam prior.", "Update using word likelihood."], answer: "The base rate still affects the posterior", interpretation: "Evidence does not erase the prior." },
      pythonLab: sklearnLab({ title: "Gaussian Naive Bayes", goal: "Fit a simple probabilistic classifier.", code: "from sklearn.naive_bayes import GaussianNB\nX = [[1,20],[2,21],[8,35],[9,40]]\ny = [0,0,1,1]\nmodel = GaussianNB().fit(X, y)\nprint(model.predict([[7,34]]))", output: "[1]", explanation: "GaussianNB models each numeric feature distribution within each class." }),
      questions: [check("nb-b1", "What is naive about Naive Bayes?", ["It ignores labels", "It assumes conditional feature independence", "It uses no probability", "It always predicts the majority"], 1, "The simplifying independence assumption is rarely exactly true.")],
      examNotes: ["Write prior times likelihood before normalizing."]
    },
    core: {
      summary: "Use log probabilities and match distribution assumptions to feature types.",
      concepts: ["Multinomial NB suits counts.", "Bernoulli NB suits binary features.", "Log probabilities prevent numerical underflow."],
      formulaIds: ["bayes", "logarithm"],
      example: { title: "Why logs", prompt: "Why add log likelihoods instead of multiplying many tiny probabilities?", steps: ["Tiny products can underflow.", "Log turns products into sums."], answer: "Numerical stability", interpretation: "The maximizing class remains the same." },
      questions: [check("nb-c1", "Which NB variant naturally suits word counts?", ["Gaussian", "Multinomial", "Linear", "K-means"], 1, "Multinomial NB is designed for count-like features.")],
      examNotes: ["State the feature distribution assumption for the selected variant."]
    },
    advanced: {
      summary: "Understand smoothing, calibration limitations, and generative classification.",
      concepts: ["Laplace smoothing prevents zero likelihoods.", "Strong dependence can distort probability estimates.", "Generative models specify class and feature distributions."],
      formulaIds: ["bayes", "expected-value"],
      example: { title: "Zero-frequency problem", prompt: "A word never appeared in class A training messages. What happens without smoothing?", steps: ["Its likelihood is zero.", "The entire product becomes zero."], answer: "Class A is eliminated", interpretation: "Smoothing avoids brittle certainty." },
      questions: [check("nb-a1", "What does Laplace smoothing do?", ["Removes priors", "Adds pseudocounts to avoid zero probabilities", "Scales features", "Builds trees"], 1, "Pseudocounts keep unseen events from forcing zero likelihood.")],
      examNotes: ["Distinguish strong classification performance from calibrated probabilities."]
    }
  }),
  progressiveLesson({
    id: "trees-ensembles",
    chapterId: "classical-ml",
    order: 6,
    title: "Decision Trees, Random Forests & Boosting",
    subtitle: "Split the feature space, measure impurity, and combine many trees.",
    prerequisites: ["ml-workflow", "bayes-theorem"],
    tags: ["trees", "ensembles"],
    scenario: { title: "A sequence of business rules", body: "Is income above a threshold? Is debt below another threshold? Each answer routes to the next decision.", mlParallel: "A decision tree learns those thresholds from data." },
    mlConnection: "Tree ensembles are strong tabular-data baselines and expose bias, variance, and feature interaction clearly.",
    projectIds: ["trees-mini"],
    basics: {
      summary: "A tree recursively splits data into more homogeneous groups.",
      concepts: ["Internal nodes test a feature threshold.", "Leaves produce predictions.", "Depth controls complexity."],
      formulaIds: ["gini"],
      example: { title: "Pure node", prompt: "All 10 samples in a node are class A. What is Gini?", steps: ["Class proportions are 1 and 0.", "Compute 1-(1^2+0^2)."], answer: "0", interpretation: "The node is perfectly pure." },
      pythonLab: sklearnLab({ title: "Decision tree", goal: "Fit a small interpretable classifier.", code: "from sklearn.tree import DecisionTreeClassifier\nX = [[1],[2],[3],[4]]\ny = [0,0,1,1]\nmodel = DecisionTreeClassifier(max_depth=1, random_state=7).fit(X, y)\nprint(model.predict([[2.5],[3.5]]))", output: "[0 1]", explanation: "The stump learns one threshold split." }),
      questions: [check("tree-b1", "What does a leaf contain?", ["Another feature only", "A prediction or class distribution", "A learning rate", "A distance matrix"], 1, "Leaves produce the model's final output.")],
      examNotes: ["Compute weighted child impurity when comparing splits."]
    },
    core: {
      summary: "Compare entropy and Gini, prune trees, and understand bagging.",
      concepts: ["Information gain measures impurity reduction.", "Deep trees overfit.", "Random forests average decorrelated trees to reduce variance."],
      formulaIds: ["entropy", "gini"],
      example: { title: "Choose a split", prompt: "Split A produces purer weighted children than split B. Which is preferred?", steps: ["Compute parent impurity.", "Compute weighted child impurity.", "Choose larger reduction."], answer: "Split A", interpretation: "The tree seeks cleaner child nodes." },
      questions: [check("tree-c1", "What problem does a random forest mainly reduce compared with one deep tree?", ["Variance", "Number of labels", "Feature scaling", "Probability range"], 0, "Averaging decorrelated trees stabilizes predictions.")],
      examNotes: ["Bagging trains models independently; boosting trains sequentially to correct errors."]
    },
    advanced: {
      summary: "Understand boosting, leakage-safe feature importance, and ensemble tradeoffs.",
      concepts: ["Boosting adds weak learners that focus on residual structure.", "Impurity importance can favour high-cardinality features.", "Permutation importance measures predictive dependence more directly."],
      formulaIds: ["entropy", "gini", "gradient-descent"],
      example: { title: "Boost residuals", prompt: "What does the next regression tree learn in gradient boosting?", steps: ["Evaluate current model loss.", "Approximate negative loss gradient with residual-like targets."], answer: "A correction to current predictions", interpretation: "Boosting performs functional gradient descent." },
      questions: [check("tree-a1", "How does boosting differ from bagging?", ["Boosting trains independent models only", "Boosting builds models sequentially to correct prior errors", "Boosting requires no labels", "Boosting is KNN"], 1, "Sequential correction is the defining idea.")],
      examNotes: ["Explain ensemble diversity and error correlation, not only tree count."]
    }
  }),
  progressiveLesson({
    id: "support-vector-machines",
    chapterId: "classical-ml",
    order: 7,
    title: "Support Vector Machines & Margins",
    subtitle: "Find a robust separating boundary and understand kernel similarity.",
    prerequisites: ["dot-product-angle", "gradient-descent-learning-rate", "logistic-classification"],
    tags: ["svm", "margin", "kernels"],
    scenario: { title: "A safety corridor", body: "Many lines may separate two groups, but the widest empty corridor offers more tolerance to small changes.", mlParallel: "SVM maximizes the margin around a decision boundary." },
    mlConnection: "SVM combines geometry, optimization, regularization, and similarity kernels.",
    basics: {
      summary: "A hyperplane separates classes using the sign of a linear score.",
      concepts: ["Support vectors are the closest influential examples.", "Margin measures boundary clearance.", "Feature scaling matters strongly."],
      formulaIds: ["svm-margin"],
      example: { title: "Read a score", prompt: "If w dot x+b is negative, which side is x on?", steps: ["Compute score sign.", "Negative selects the negative side."], answer: "Negative-class side", interpretation: "The magnitude is distance-related but not a calibrated probability." },
      pythonLab: sklearnLab({ title: "Linear SVM", goal: "Fit a maximum-margin classifier.", code: "from sklearn.svm import SVC\nX = [[0],[1],[4],[5]]\ny = [0,0,1,1]\nmodel = SVC(kernel='linear', C=1).fit(X, y)\nprint(model.predict([[3]]))", output: "[1]", explanation: "The learned boundary separates the two groups." }),
      questions: [check("svm-b1", "Which points define the SVM boundary most directly?", ["All points equally", "Support vectors", "Only test points", "Centroids"], 1, "Support vectors lie closest to the margin.")],
      examNotes: ["Interpret decision score sign separately from probability."]
    },
    core: {
      summary: "Use soft margins and understand the regularization parameter C.",
      concepts: ["Hard margins require perfect separability.", "Soft margins allow violations.", "Large C penalizes violations more strongly."],
      formulaIds: ["svm-margin", "ridge"],
      example: { title: "Change C", prompt: "What tends to happen when C becomes very large?", steps: ["Margin violations become expensive.", "The model fits training points more strictly."], answer: "Narrower margin and potentially higher variance", interpretation: "C controls fit-versus-margin tradeoff." },
      questions: [check("svm-c1", "What does a small C usually encourage?", ["Stricter fit", "Wider margin with more tolerated violations", "More classes", "No regularization"], 1, "Small C tolerates errors to favour a wider margin.")],
      examNotes: ["Connect C to regularization, not directly to kernel width."]
    },
    advanced: {
      summary: "Understand kernel similarity and the computational cost of nonlinear SVMs.",
      concepts: ["A kernel computes inner products in an implicit feature space.", "RBF gamma controls locality.", "Nonlinear SVM training scales poorly to very large datasets."],
      formulaIds: ["svm-margin", "dot-product", "distance"],
      example: { title: "RBF gamma", prompt: "What does very large gamma do?", steps: ["Similarity decays rapidly with distance.", "Each point influences a tiny region."], answer: "Creates a highly local, flexible boundary", interpretation: "Overfitting risk increases." },
      questions: [check("svm-a1", "What does the kernel trick avoid computing explicitly?", ["Labels", "High-dimensional feature coordinates", "Distances", "Loss"], 1, "The kernel supplies inner products in an implicit feature space.")],
      examNotes: ["Distinguish C from kernel parameters such as gamma."]
    }
  }),
  progressiveLesson({
    id: "clustering-unsupervised",
    chapterId: "classical-ml",
    order: 8,
    title: "Clustering & Unsupervised Learning",
    subtitle: "Find structure without labels and evaluate clusters cautiously.",
    prerequisites: ["vector-magnitude-distance", "standard-deviation"],
    tags: ["clustering", "kmeans", "unsupervised"],
    scenario: { title: "Customer segments", body: "A retailer wants to discover groups with similar behaviour before deciding how to serve them.", mlParallel: "Clustering proposes structure; humans still decide whether the groups are useful." },
    mlConnection: "Unsupervised learning explores representation, grouping, anomaly patterns, and dimensionality.",
    projectIds: ["clustering-mini"],
    basics: {
      summary: "K-means alternates assignment and centroid updates.",
      concepts: ["K is chosen in advance.", "Centroids are means of assigned points.", "Initialization can change the result."],
      formulaIds: ["kmeans", "distance"],
      example: { title: "Update a centroid", prompt: "Cluster points are 2,4,6. Find centroid.", steps: ["Add to get 12.", "Divide by 3."], answer: "4", interpretation: "A centroid is the coordinate-wise mean." },
      pythonLab: sklearnLab({ title: "K-means", goal: "Cluster simple points.", code: "import numpy as np\nfrom sklearn.cluster import KMeans\nX = np.array([[0],[1],[8],[9]])\nmodel = KMeans(n_clusters=2, random_state=7, n_init=10).fit(X)\nprint(np.sort(model.cluster_centers_.ravel()))", output: "[0.5 8.5]", explanation: "The centroids summarize the two groups." }),
      questions: [check("cluster-b1", "What is a K-means centroid?", ["A labelled example", "Mean of assigned points", "Farthest point", "Decision boundary only"], 1, "Centroids are coordinate-wise cluster means.")],
      examNotes: ["Show assignment and update as separate steps."]
    },
    core: {
      summary: "Scale data, select k, and compare clustering methods.",
      concepts: ["Elbow and silhouette are diagnostics, not proof of true groups.", "Hierarchical clustering builds a merge tree.", "DBSCAN can find irregular dense regions and noise."],
      formulaIds: ["kmeans", "z-score", "distance"],
      example: { title: "Non-spherical clusters", prompt: "Why can K-means struggle with two moon-shaped groups?", steps: ["K-means uses distance to centroids.", "Its partitions are Voronoi-like and convex."], answer: "The cluster geometry violates its assumptions", interpretation: "Algorithm choice encodes shape assumptions." },
      questions: [check("cluster-c1", "Why standardize before K-means?", ["To add labels", "To keep large-scale features from dominating distance", "To choose K automatically", "To guarantee global optimum"], 1, "K-means directly depends on Euclidean geometry.")],
      examNotes: ["Describe cluster shape and density assumptions."]
    },
    advanced: {
      summary: "Evaluate stability, representation sensitivity, and the limits of unsupervised conclusions.",
      concepts: ["Cluster labels are arbitrary identifiers.", "Different feature representations produce different groupings.", "Stability across resamples is useful evidence."],
      formulaIds: ["kmeans", "distance", "covariance"],
      example: { title: "No ground truth", prompt: "A high silhouette score gives clean separation. Does it prove business usefulness?", steps: ["Silhouette measures geometry.", "Business usefulness requires external meaning."], answer: "No", interpretation: "Internal metrics do not validate the purpose." },
      questions: [check("cluster-a1", "What does permuting cluster labels change?", ["The grouping", "Nothing about the grouping", "The distances", "The centroids always"], 1, "Cluster IDs have no inherent ordinal meaning.")],
      examNotes: ["Separate mathematical compactness from domain usefulness."]
    }
  }),
  progressiveLesson({
    id: "model-selection-generalization",
    chapterId: "classical-ml",
    order: 9,
    title: "Bias, Variance & Model Selection",
    subtitle: "Choose complexity using validation rather than training performance alone.",
    prerequisites: ["linear-regression-ml", "logistic-classification", "sampling-estimators-clt"],
    tags: ["bias-variance", "cross-validation", "hyperparameters"],
    scenario: { title: "Learning a pattern versus memorizing examples", body: "A student who memorizes exact practice questions may fail when wording changes.", mlParallel: "An overfit model performs well on training data but poorly on new samples." },
    mlConnection: "Generalization is the central goal that connects regularization, validation, complexity, and data size.",
    basics: {
      summary: "Underfitting misses structure; overfitting learns noise.",
      concepts: ["Training error alone is not enough.", "Validation guides model choices.", "Test data is reserved for final evaluation."],
      formulaIds: ["mse", "ridge"],
      example: { title: "Diagnose errors", prompt: "Training and validation errors are both high. What is likely?", steps: ["The model fails even on training data.", "It lacks fit capacity or useful features."], answer: "Underfitting / high bias", interpretation: "More complexity or better representation may help." },
      questions: [check("select-b1", "Training error low and validation error high suggests what?", ["Underfitting", "Overfitting", "Perfect calibration", "No variance"], 1, "The model fits training-specific noise.")],
      examNotes: ["Compare training and validation errors together."]
    },
    core: {
      summary: "Use cross-validation and regularization to choose hyperparameters.",
      concepts: ["Hyperparameters are selected outside ordinary fitting.", "Cross-validation averages across several splits.", "Pipelines prevent preprocessing leakage inside folds."],
      formulaIds: ["ridge", "classification-metrics"],
      example: { title: "Select lambda", prompt: "How should ridge lambda be chosen?", steps: ["Define candidate values.", "Compare cross-validation performance.", "Refit selected configuration on training data."], answer: "Using validation or cross-validation", interpretation: "Do not choose lambda using the final test set." },
      questions: [check("select-c1", "What is cross-validation mainly estimating?", ["Training speed", "Generalization across resampled validation splits", "Number of labels", "Feature count"], 1, "CV reduces dependence on one split.")],
      examNotes: ["Nest preprocessing and selection within the validation procedure."]
    },
    advanced: {
      summary: "Understand nested validation, learning curves, uncertainty, and model comparison.",
      concepts: ["Nested CV separates tuning from evaluation.", "Learning curves diagnose data versus capacity limitations.", "Small score differences may be sampling noise."],
      formulaIds: ["variance", "expected-value", "classification-metrics"],
      example: { title: "Learning curve", prompt: "Validation improves steadily as more data is added while training stays strong. What may help?", steps: ["The gap is shrinking with data.", "Variance is being reduced."], answer: "More representative training data", interpretation: "The curve suggests the model can benefit from more examples." },
      questions: [check("select-a1", "Why use nested CV?", ["To increase leakage", "To evaluate a tuning procedure without optimistic bias", "To remove all variance", "To avoid fitting models"], 1, "Outer folds evaluate choices made within inner folds.")],
      examNotes: ["Report uncertainty and practical effect size, not only the best mean score."]
    }
  })
];
