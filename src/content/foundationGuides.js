import { CLASSICAL_ML_GUIDES } from "./classicalMlGuides.js";
import { GUIDED_NOTATION } from "./guidedNotation.js";
import { DEEP_LEARNING_GUIDES } from "./deepLearningGuides.js";
import { buildEveryday, buildMlBridge } from "./guidedEnhancements.js";

export const FOUNDATION_GUIDES = {
  ...DEEP_LEARNING_GUIDES,
  "numbers-signs": {
    goal: "Read positive and negative numbers, then calculate in the correct order.",
    notation: {
      expression: "−3 − 4 = −7",
      readAs: "Start at negative three, move four more places below zero, and arrive at negative seven.",
      symbols: [["−", "A negative sign shows a value below zero; between values it means subtract."], ["=", "The value on the left is the same as the value on the right."]]
    }
  },
  "fractions-ratios-percentages": {
    goal: "Move confidently between fractions, decimals, ratios, and percentages.",
    notation: {
      expression: "3/5 = 0.6 = 60%",
      readAs: "Three out of five is the same amount as six tenths or sixty out of one hundred.",
      symbols: [["/", "Divide the top number by the bottom number."], ["%", "Out of every one hundred."]]
    }
  },
  "powers-roots-scientific": {
    goal: "Read powers and roots, and recognize very large or small numbers.",
    notation: {
      expression: "2³ = 2 × 2 × 2 = 8",
      readAs: "Two to the power of three means multiply three copies of two.",
      symbols: [["2", "The base: the number being repeated."], ["3", "The exponent: how many copies of the base are multiplied."]]
    }
  },
  "variables-expressions": {
    goal: "Treat letters as named quantities and evaluate a mathematical expression.",
    notation: {
      expression: "y = 3x + 2",
      readAs: "The output y is three times the input x, plus two.",
      symbols: [["x", "The input value that may change."], ["3", "The coefficient that multiplies x."], ["2", "A fixed value called a constant."]]
    }
  },
  "equations-inequalities": {
    goal: "Solve for an unknown value while keeping both sides balanced.",
    notation: {
      expression: "3x + 5 = 17",
      readAs: "Three copies of x, plus five, have the same value as seventeen.",
      symbols: [["x", "The value we want to find."], ["=", "Both sides must remain equal."], ["< or >", "One side is smaller or larger rather than exactly equal."]]
    }
  },
  "functions-domain-range": {
    goal: "Follow an input-output rule and identify which inputs are allowed.",
    notation: {
      expression: "f(x) = 2x + 1",
      readAs: "The function f takes input x, doubles it, and then adds one.",
      symbols: [["f", "The name of the function."], ["x", "The input supplied to the function."], ["f(x)", "The output produced for input x."]]
    }
  },
  "graphs-slope-intercept": {
    goal: "Read a graph as a story about how one quantity changes with another.",
    widget: "slope-explorer",
    notation: {
      expression: "slope = change in y / change in x",
      readAs: "Slope is the change in the output divided by the matching change in the input.",
      symbols: [["x", "The horizontal input."], ["y", "The vertical output."], ["slope", "How much y changes when x changes by one unit."]]
    }
  },
  "exponents-logarithms": {
    goal: "See logarithms as the reverse question of raising a number to a power.",
    notation: {
      expression: "log₂(8) = 3 because 2³ = 8",
      readAs: "The base-two logarithm of eight is three because three copies of two multiply to eight.",
      symbols: [["log", "Ask which exponent produces the given value."], ["2", "The base used for repeated multiplication."], ["8", "The value we want the base to produce."]]
    }
  },
  "summation-subscripts-sets": {
    goal: "Read subscripts and summation signs as compact instructions over a list.",
    notation: {
      expression: "Σ from i=1 to 3 of xᵢ = x₁ + x₂ + x₃",
      readAs: "Add each x value whose position i runs from one through three.",
      symbols: [["Σ", "Add a sequence of terms."], ["i", "The position currently being visited."], ["xᵢ", "The x value stored at position i."]]
    }
  },
  "scalars-vectors-tensors": {
    goal: "Tell the difference between one value, an ordered vector, and a multi-axis tensor.",
    notation: {
      expression: "x = [x₁, x₂, …, xₙ]",
      readAs: "The vector x contains ordered values from x one through x n.",
      symbols: [["x", "The name of the whole vector."], ["xᵢ", "One value at position i."], ["n", "The number of values in the vector."]]
    }
  },
  "vector-arithmetic": {
    goal: "Add, subtract, and scale vectors by working with matching positions.",
    notation: {
      expression: "(a₁, a₂) + (b₁, b₂) = (a₁ + b₁, a₂ + b₂)",
      readAs: "Add the first positions together, then add the second positions together.",
      symbols: [["a and b", "The two vectors being combined."], ["₁ and ₂", "Labels for matching positions."], ["+", "Combine the values in each matching position."]]
    }
  },
  "vector-magnitude-distance": {
    goal: "Measure the length of a vector and the distance between two points.",
    notation: {
      expression: "‖v‖₂ = √(v₁² + v₂²)",
      readAs: "The length of v is the square root of the sum of its squared components.",
      symbols: [["‖v‖₂", "The ordinary straight-line length of vector v."], ["v₁ and v₂", "The horizontal and vertical components."], ["√", "Take the non-negative square root."]]
    }
  },
  "dot-product-angle": {
    goal: "Use the dot product to measure how strongly two vectors point together.",
    notation: {
      expression: "a · b = a₁b₁ + a₂b₂",
      readAs: "Multiply matching components, then add those products.",
      symbols: [["·", "The dot-product operation."], ["a₁b₁", "The product of the first matching components."], ["+", "Combine the component products into one number."]]
    }
  },
  "matrix-anatomy-types": {
    goal: "Read a matrix by its rows, columns, entries, and shape.",
    notation: {
      expression: "A has shape m × n",
      readAs: "Matrix A has m rows and n columns.",
      symbols: [["A", "The name of the matrix."], ["m", "The number of rows."], ["n", "The number of columns."], ["aᵢⱼ", "The entry in row i and column j."]]
    }
  },
  "linear-transformations": {
    goal: "See a matrix as a rule that moves every vector in a consistent way.",
    notation: {
      expression: "y = Av",
      readAs: "Apply transformation A to input vector v to produce output vector y.",
      symbols: [["A", "The matrix that describes the transformation."], ["v", "The input vector."], ["y", "The transformed output vector."]]
    }
  },
  "change-slope-limits": {
    goal: "Understand a limit by watching nearby values approach a target.",
    notation: {
      expression: "lim as x → a of f(x) = L",
      readAs: "As x moves closer to a, the output f of x moves closer to L.",
      symbols: [["lim", "Look at the value being approached."], ["x → a", "Move x closer and closer to a."], ["L", "The output value being approached."]]
    }
  },
  "derivative-definition": {
    goal: "Build an instantaneous slope from average slopes over smaller intervals.",
    notation: {
      expression: "f′(x) = lim as h → 0 of [f(x+h) − f(x)] / h",
      readAs: "The derivative is the limit of output change divided by input change as that input change shrinks to zero.",
      symbols: [["f′(x)", "The instantaneous rate of change at x."], ["h", "A small change in the input."], ["f(x+h) − f(x)", "The matching change in the output."]]
    }
  },
  "partial-derivatives": {
    goal: "Measure how one input changes the output while the other inputs stay fixed.",
    notation: {
      expression: "∂f / ∂x",
      readAs: "The partial derivative of f with respect to x.",
      symbols: [["∂", "A derivative taken with other inputs held fixed."], ["f", "The output rule being studied."], ["x", "The one input allowed to change."]]
    }
  },
  "gradients-directional-change": {
    goal: "Combine partial derivatives into the arrow of steepest uphill change.",
    widget: "gradient-explorer",
    notation: {
      expression: "∇f(x, y) = [∂f/∂x, ∂f/∂y]",
      readAs: "The gradient of f is a vector containing the partial change in the x direction and the partial change in the y direction.",
      symbols: [["∇", "The gradient: a vector of partial derivatives."], ["∂f/∂x", "Change in f when x changes and y stays fixed."], ["∂f/∂y", "Change in f when y changes and x stays fixed."]]
    }
  },
  "chain-rule-computational-graphs": {
    goal: "Trace how a change passes through one calculation and then the next.",
    notation: {
      expression: "dy/dx = (dy/du)(du/dx)",
      readAs: "The effect of x on y equals the effect of u on y times the effect of x on u.",
      symbols: [["x", "The starting input."], ["u", "An intermediate value."], ["y", "The final output."]]
    }
  },
  "gradient-descent-learning-rate": {
    goal: "Update model parameters by taking controlled steps downhill.",
    widget: "learning-rate-explorer",
    notation: {
      expression: "θ ← θ − η∇L(θ)",
      readAs: "Replace the parameters with their current values minus the learning rate times the loss gradient.",
      symbols: [["θ", "The model parameters being updated."], ["η", "The learning rate that controls step size."], ["∇L(θ)", "The direction of steepest increase in loss."]]
    }
  },
  "unit-vectors-normalization": {
    goal: "Keep a vector's direction while changing its length to exactly one.",
    widget: "unit-vector-explorer",
    notation: {
      expression: "u = v / ‖v‖",
      readAs: "The unit vector u equals vector v divided by the length of v.",
      symbols: [["v", "The original vector."], ["‖v‖", "The length of the original vector."], ["u", "A vector in the same direction with length one."]]
    }
  },
  "matrix-vector-multiplication": {
    goal: "Apply every matrix row to one input vector and build a new output vector.",
    widget: "matrix-vector-explorer",
    notation: {
      expression: "y = Av",
      readAs: "Multiply matrix A by input vector v to produce output vector y.",
      symbols: [["A", "The matrix containing the output rules."], ["v", "The input vector."], ["y", "The output vector, with one value from each matrix row."]]
    }
  },
  "derivative-rules": {
    goal: "Use reliable shortcuts to find rates of change without rebuilding every limit.",
    notation: {
      expression: "d(xⁿ)/dx = nxⁿ⁻¹",
      readAs: "To differentiate x to the power n, multiply by n and reduce the exponent by one.",
      symbols: [["d/dx", "Find the rate of change with respect to x."], ["n", "The original exponent."], ["n − 1", "The new exponent after differentiating."]]
    }
  },
  "tangents-stationary-points": {
    goal: "Read a tangent slope and recognize where a curve becomes locally flat.",
    widget: "tangent-explorer",
    notation: {
      expression: "f′(a) = 0",
      readAs: "The slope of f at input a is zero, so the tangent is flat there.",
      symbols: [["f′", "The slope rule for the function."], ["a", "The input location being checked."], ["0", "No local rise or fall at that exact point."]]
    }
  },
  "scalar-vector-functions": {
    goal: "Tell whether a function returns one value or an ordered group of values.",
    notation: {
      expression: "f: ℝⁿ → ℝ",
      readAs: "Function f takes n real-number inputs and returns one real number.",
      symbols: [["ℝⁿ", "An input containing n real numbers."], ["→", "Maps the input to an output."], ["ℝ", "One real-number output, so the function is scalar-valued."]]
    }
  },
  "loss-functions": {
    goal: "Turn the size of a prediction mistake into one score that training can reduce.",
    widget: "loss-explorer",
    notation: {
      expression: "squared error = (y − ŷ)²",
      readAs: "Subtract the prediction from the target, then square that difference.",
      symbols: [["y", "The target value we wanted."], ["ŷ", "The model's prediction."], ["²", "Square the miss so its sign disappears and larger misses matter more."]]
    }
  },
  "jacobian-matrices": {
    goal: "Read a table showing how every output responds to every input.",
    widget: "jacobian-explorer",
    notation: {
      expression: "Jᵢⱼ = ∂fᵢ / ∂xⱼ",
      readAs: "Entry i j of the Jacobian measures how output i changes when input j changes.",
      symbols: [["J", "The Jacobian matrix."], ["i", "The output row being measured."], ["j", "The input column being changed."], ["∂fᵢ/∂xⱼ", "One local output-input sensitivity."]]
    }
  },
  "hessians-convexity": {
    goal: "Use curvature in every direction to distinguish a bowl from a hill or saddle.",
    widget: "curvature-explorer",
    notation: {
      expression: "Hᵢⱼ = ∂²f / ∂xᵢ∂xⱼ",
      readAs: "Entry i j of the Hessian measures how one slope changes as another input changes.",
      symbols: [["H", "The Hessian matrix of second derivatives."], ["∂²", "A rate of change of a rate of change."], ["i and j", "The two input directions being compared."]]
    }
  },
  "matrix-matrix-multiplication": {
    goal: "Combine two matrix rules by matching each output row with each input column.",
    notation: { expression: "C = AB", readAs: "Apply matrix B first, then matrix A, and store the combined rule in C.", symbols: [["A and B", "The two matrix rules being composed."], ["C", "The matrix containing the combined result."], ["cᵢⱼ", "Row i of A dotted with column j of B."]] }
  },
  "transpose-symmetry": {
    goal: "Flip rows into columns and recognize matrices unchanged by that flip.",
    notation: { expression: "(Aᵀ)ᵢⱼ = Aⱼᵢ", readAs: "Entry i j of the transpose comes from entry j i of the original matrix.", symbols: [["Aᵀ", "Matrix A with rows and columns exchanged."], ["i", "A row position."], ["j", "A column position."]] }
  },
  "determinant-collapse": {
    goal: "Read a determinant as signed area scaling and detect when space collapses.",
    widget: "determinant-explorer",
    notation: { expression: "det(A) = ad − bc", readAs: "For a two-by-two matrix, multiply the main diagonal and subtract the other diagonal product.", symbols: [["det(A)", "The signed area scale produced by A."], ["ad", "The main diagonal product."], ["bc", "The other diagonal product."]] }
  },
  "inverse-systems": {
    goal: "Undo a matrix transformation and connect that undoing to solving equations.",
    widget: "inverse-system-explorer",
    notation: { expression: "x = A⁻¹b", readAs: "Apply the inverse of A to output b to recover input x.", symbols: [["A⁻¹", "The transformation that undoes A."], ["b", "The known output."], ["x", "The unknown input being recovered."]] }
  },
  "rank-column-null": {
    goal: "Count independent output directions and identify inputs that disappear.",
    notation: { expression: "rank(A) + nullity(A) = n", readAs: "Independent output directions plus lost input directions equal the number of input dimensions.", symbols: [["rank(A)", "The number of independent output directions."], ["nullity(A)", "The number of input directions sent to zero."], ["n", "The total number of input dimensions."]] }
  },
  "basis-coordinates": {
    goal: "Describe the same vector using different measuring directions.",
    widget: "basis-explorer",
    notation: { expression: "v = c₁b₁ + c₂b₂", readAs: "Build vector v from c one copies of basis vector b one and c two copies of basis vector b two.", symbols: [["b₁ and b₂", "The chosen basis directions."], ["c₁ and c₂", "The coordinates in that basis."], ["v", "The vector being described."]] }
  },
  "change-of-basis": {
    goal: "Translate coordinates between two bases without changing the underlying vector.",
    notation: { expression: "v = B[v]ᴮ", readAs: "Multiply basis matrix B by the coordinates of v in basis B to recover the ordinary vector.", symbols: [["B", "A matrix whose columns are the basis vectors."], ["[v]ᴮ", "Coordinates measured in basis B."], ["v", "The unchanged geometric vector."]] }
  },
  "composition-matrix-powers": {
    goal: "Understand repeated matrix application as repeated transformation.",
    notation: { expression: "A³v = A(A(Av))", readAs: "Apply matrix A to v three times in sequence.", symbols: [["A³", "Three repeated applications of A."], ["v", "The starting vector."], ["A(Av)", "One transformation applied after another."]] }
  },
  "eigenvalues-eigenvectors": {
    goal: "Find special directions a transformation stretches without turning.",
    widget: "eigenvector-explorer",
    notation: { expression: "Av = λv", readAs: "Applying A to eigenvector v only scales it by eigenvalue lambda.", symbols: [["v", "A direction that is not turned by A."], ["λ", "The stretch, shrink, or flip factor."], ["Av", "The transformed vector."]] }
  },
  "eigendecomposition": {
    goal: "Break a transformation into change-of-basis, scaling, and change-back steps.",
    notation: { expression: "A = PΛP⁻¹", readAs: "Change into the eigenvector basis, scale each eigen-direction, then change back.", symbols: [["P", "A matrix containing eigenvectors."], ["Λ", "A diagonal matrix containing eigenvalues."], ["P⁻¹", "The change into eigenvector coordinates."]] }
  },
  "covariance-matrices-pca": {
    goal: "Find the direction that preserves the most variation in a cloud of data.",
    widget: "pca-explorer",
    notation: { expression: "Σv = λv", readAs: "A principal direction v is an eigenvector of the covariance matrix, with variance lambda.", symbols: [["Σ", "The covariance matrix describing joint spread."], ["v", "A principal direction through the data."], ["λ", "The amount of variance along that direction."]] }
  },
  "experiments-outcomes-events": {
    goal: "List every possible result and group the results that answer one question.",
    widget: "sample-space-explorer",
    notation: { expression: "A ⊆ S", readAs: "Event A is a selection of outcomes from sample space S.", symbols: [["S", "The complete set of possible outcomes."], ["A", "The event we care about."], ["⊆", "Every outcome in A also belongs to S."]] }
  },
  "set-operations-counting": {
    goal: "Use OR, AND, and NOT to combine groups without double-counting overlap.",
    widget: "set-overlap-explorer",
    notation: { expression: "|A ∪ B| = |A| + |B| − |A ∩ B|", readAs: "Count A and B, then subtract their shared members once because they were counted twice.", symbols: [["∪", "Union: in A or B or both."], ["∩", "Intersection: in both A and B."], ["|A|", "The number of outcomes in A."]] }
  },
  "probability-rules": {
    goal: "Represent likelihood from zero to one and calculate the chance of an event not happening.",
    widget: "probability-rule-explorer",
    notation: { expression: "P(not A) = 1 − P(A)", readAs: "The probability that A does not happen is one minus the probability that it does.", symbols: [["P(A)", "The probability of event A."], ["not A", "Every outcome outside A."], ["1", "The total probability of all possible outcomes."]] }
  },
  "conditional-probability": {
    goal: "Change the reference group after learning that another event happened.",
    widget: "conditional-explorer",
    notation: { expression: "P(A | B) = P(A ∩ B) / P(B)", readAs: "Among the cases where B happened, find the share where A also happened.", symbols: [["|", "Given: restrict attention to the event on the right."], ["A ∩ B", "Cases where A and B both happen."], ["P(B)", "The size of the new reference group."]] }
  },
  "bayes-theorem": {
    goal: "Update an initial probability after observing new evidence.",
    widget: "bayes-explorer",
    notation: { expression: "P(A | B) = P(B | A)P(A) / P(B)", readAs: "The updated chance of A equals how well A predicts evidence B, times the prior chance of A, divided by the overall chance of B.", symbols: [["P(A)", "The prior belief before seeing evidence."], ["P(B|A)", "How likely the evidence is when A is true."], ["P(A|B)", "The posterior belief after seeing the evidence."]] }
  },
  "random-variables": {
    goal: "Turn uncertain outcomes into numerical values that can be analyzed.", widget: "random-variable-explorer",
    notation: { expression: "X: S → ℝ", readAs: "Random variable X maps each outcome in sample space S to a real number.", symbols: [["X", "The numerical rule."], ["S", "The sample space of outcomes."], ["ℝ", "The possible numerical outputs."]] }
  },
  "probability-mass-function": {
    goal: "Assign probability mass to each countable value and check that the bars total one.", widget: "pmf-explorer",
    notation: { expression: "p(x) = P(X = x)", readAs: "The probability mass at x is the chance that random variable X equals exactly x.", symbols: [["p(x)", "The height of the probability bar at x."], ["X", "The discrete random variable."], ["= x", "One exact countable value."]] }
  },
  "probability-density-function": {
    goal: "Read continuous probability as area across an interval, not height at one point.", widget: "pdf-explorer",
    notation: { expression: "P(a ≤ X ≤ b) = area under f(x) from a to b", readAs: "The probability between a and b is the area under the density curve across that interval.", symbols: [["f(x)", "The probability density height."], ["a and b", "The interval boundaries."], ["area", "The probability assigned to the interval."]] }
  },
  "cumulative-distribution-function": {
    goal: "Accumulate all probability at or below a chosen cutoff.", widget: "cdf-explorer",
    notation: { expression: "F(x) = P(X ≤ x)", readAs: "The cumulative value at x is the chance that X is less than or equal to x.", symbols: [["F(x)", "The running probability total."], ["≤", "Include x and every smaller value."], ["P", "The probability accumulated so far."]] }
  },
  "expected-value": {
    goal: "Find a long-run center by weighting each possible value by its probability.", widget: "expected-value-explorer",
    notation: { expression: "E[X] = Σ x p(x)", readAs: "Multiply every possible value by its probability, then add the products.", symbols: [["E[X]", "The expected or long-run average value."], ["Σ", "Add across every possible value."], ["x p(x)", "One value multiplied by its probability."]] }
  },
  "variance-population-sample": {
    goal: "Measure spread by averaging squared distances from the mean.", widget: "variance-explorer",
    notation: { expression: "Var(X) = E[(X − μ)²]", readAs: "Variance is the expected squared distance between X and its mean mu.", symbols: [["μ", "The mean or center."], ["X − μ", "A distance from the center."], ["²", "Square distances so signs do not cancel."]] }
  },
  "standard-deviation": {
    goal: "Translate squared variance back into the original measurement units.", widget: "standard-deviation-explorer",
    notation: { expression: "σ = √Var(X)", readAs: "Standard deviation sigma is the non-negative square root of variance.", symbols: [["σ", "Standard deviation in the original units."], ["√", "Take the non-negative square root."], ["Var(X)", "Variance in squared units."]] }
  },
  "bernoulli-binomial": {
    goal: "Calculate the chance of a chosen number of successes across repeated yes-or-no trials.",
    notation: { expression: "X ~ Binomial(n, p)", readAs: "X counts successes across n independent trials, each with success probability p.", symbols: [["X", "The number of successes observed."], ["n", "The fixed number of trials."], ["p", "The probability of success on each trial."]] }
  },
  "normal-z-scores": {
    goal: "Describe how far a value lies above or below its group average in standard-deviation units.",
    notation: { expression: "z = (x − μ) / σ", readAs: "Subtract the mean from the value, then divide that distance by the standard deviation.", symbols: [["x", "The value being compared."], ["μ", "The population mean or center."], ["σ", "The population standard deviation."], ["z", "The signed distance from the mean in standard-deviation units."]] }
  },
  "covariance-correlation": {
    goal: "Describe whether two quantities move together and compare the strength on a standard scale.",
    notation: { expression: "r = Cov(X, Y) / (σₓσᵧ)", readAs: "Correlation is covariance divided by the two standard deviations.", symbols: [["Cov(X, Y)", "The unscaled shared movement of X and Y."], ["σₓ and σᵧ", "The separate spreads of X and Y."], ["r", "The standardized linear relationship from negative one to one."]] }
  },
  "sampling-estimators-clt": {
    goal: "Use a sample to estimate a population value and understand why different samples give different answers.",
    notation: { expression: "x̄ = (1/n) Σᵢ₌₁ⁿ xᵢ", readAs: "Add the n sampled values and divide by the sample size.", symbols: [["x̄", "The sample mean used as an estimate."], ["n", "The number of observations in the sample."], ["xᵢ", "The sampled value at position i."], ["Σ", "Add all sampled values."]] }
  },
  "confidence-intervals": {
    goal: "Report an estimate together with a range that honestly shows sampling uncertainty.",
    notation: { expression: "estimate ± margin of error", readAs: "Start at the sample estimate, then extend the stated margin below and above it.", symbols: [["estimate", "The central value calculated from the sample."], ["±", "Create a lower and an upper endpoint."], ["margin of error", "The distance added and subtracted to express uncertainty."]] }
  },
  "ml-workflow": {
    goal: "Frame a prediction task, separate data honestly, and recognize information that leaks from the future.",
    vocabulary: [{ id: "data-leakage", name: "data leakage", definition: "Information that would not be available when the real prediction must be made.", analogy: "Seeing tomorrow's answer before taking today's test", example: "Using next month's cancellation date to predict next month's cancellation.", nonExample: "Using a customer's current plan and current usage." }],
    notation: { expression: "data → train | validate | test", readAs: "Use one part to learn, one part to choose settings, and one untouched part for the final check.", symbols: [["train", "Examples used to fit model parameters."], ["validate", "Examples used to compare model choices."], ["test", "Untouched examples used for the final estimate."]] }
  },
  "linear-regression-ml": {
    goal: "Build a numerical prediction from feature contributions and measure how far it misses.",
    vocabulary: [{ id: "linear-regression", name: "linear regression", definition: "A model that predicts a number by adding weighted input features and a starting value.", analogy: "A bill that adds several priced items to a base charge", example: "Predicted price equals 2 times size plus 5.", nonExample: "Choosing only a category label without producing a numerical estimate." }],
    notation: { expression: "ŷ = w₁x₁ + ··· + wₙxₙ + b", readAs: "The prediction equals each feature times its weight, with all contributions added to the bias.", symbols: [["ŷ", "The model's predicted number."], ["xᵢ", "One input feature."], ["wᵢ", "The learned influence of that feature."], ["b", "The baseline prediction."]] }
  },
  "logistic-classification": {
    goal: "Turn a model score into a probability and then into a clear class decision.",
    vocabulary: [{ id: "logistic-regression", name: "logistic regression", definition: "A classifier that converts a weighted score into a probability between zero and one.", analogy: "A dial that turns an unrestricted score into a percentage-like confidence", example: "A score of zero becomes probability 0.5.", nonExample: "Treating the unrestricted score itself as a probability." }],
    notation: { expression: "p = 1 / (1 + e⁻ᶻ)", readAs: "The sigmoid turns score z into probability p between zero and one.", symbols: [["z", "The unrestricted model score, called a logit."], ["e", "The exponential constant used by the curve."], ["p", "The resulting class probability."]] }
  },
  "knn-distance": {
    goal: "Predict from nearby examples and explain why feature scale changes which neighbours appear closest.",
    vocabulary: [{ id: "nearest-neighbour", name: "nearest neighbour", definition: "A stored example whose feature vector has one of the smallest distances to a new example.", analogy: "Asking the most similar nearby customers what they chose", example: "One-nearest-neighbour copies the class of the closest training point.", nonExample: "Choosing the first row without calculating similarity." }],
    notation: { expression: "prediction = vote of k nearest examples", readAs: "Find the k smallest distances, then let their labels vote on the prediction.", symbols: [["k", "The number of neighbours consulted."], ["distance", "The measured separation between feature vectors."], ["vote", "The class supported by the most selected neighbours."]] }
  },
  "naive-bayes": {
    goal: "Combine an initial class probability with feature evidence while stating the independence assumption.",
    vocabulary: [{ id: "naive-bayes-model", name: "Naive Bayes", definition: "A classifier that combines class priors with per-feature likelihoods and assumes conditional independence.", analogy: "Several witnesses giving separate pieces of evidence", example: "Word frequencies update the probability that an email is spam.", nonExample: "Multiplying arbitrary scores without defining a probability model." }],
    notation: { expression: "score(class) ∝ P(class) × ∏ P(feature | class)", readAs: "A class score starts with its prior and multiplies the likelihood of each observed feature.", symbols: [["P(class)", "The class probability before seeing the features."], ["P(feature | class)", "How likely one feature is within that class."], ["∏", "Multiply the feature likelihoods."]] }
  },
  "trees-ensembles": {
    goal: "Follow learned decision splits and explain why combining trees can make predictions more stable.",
    vocabulary: [{ id: "decision-tree", name: "decision tree", definition: "A model that routes an example through learned yes-or-no feature tests until it reaches a prediction.", analogy: "A flowchart whose questions were chosen from data", example: "Ask whether income is above a threshold, then inspect debt.", nonExample: "A fixed list of rules that was never fitted to examples." }],
    notation: { expression: "ensemble prediction = combine(tree₁, …, treeₘ)", readAs: "Collect predictions from several trees and combine them by voting or averaging.", symbols: [["treeᵢ", "One fitted decision tree."], ["m", "The number of trees."], ["combine", "Vote for classes or average numerical predictions."]] }
  },
  "support-vector-machines": {
    goal: "Find a separating boundary with a wide safety margin and identify the examples that control it.",
    vocabulary: [{ id: "support-vector", name: "support vector", definition: "A training example close enough to the boundary to influence its position.", analogy: "The nearest fence posts holding the edges of a safety corridor", example: "Moving a support vector can move the separating line.", nonExample: "A distant point that does not affect the fitted margin." }],
    notation: { expression: "score = w · x + b", readAs: "Take the dot product of weights and features, add the bias, and use the sign to choose a side.", symbols: [["x", "The input feature vector."], ["w", "The vector perpendicular to the boundary."], ["b", "The boundary's offset."], ["sign", "Which class side contains the example."]] }
  },
  "clustering-unsupervised": {
    goal: "Group unlabelled examples by distance and explain what a cluster result can and cannot prove.",
    vocabulary: [{ id: "clustering", name: "clustering", definition: "Finding groups of similar examples without being given correct group labels.", analogy: "Sorting mixed objects into piles by their measured resemblance", example: "K-means groups customers around learned centroids.", nonExample: "Training on known category labels." }],
    notation: { expression: "centroid = (1/n) Σ points in cluster", readAs: "Add the points assigned to one cluster and divide by the number of points.", symbols: [["centroid", "The coordinate-wise center of a cluster."], ["n", "The number of assigned points."], ["Σ", "Add the assigned point vectors."]] }
  },
  "model-selection-generalization": {
    goal: "Choose model complexity using validation results instead of trusting training performance alone.",
    vocabulary: [{ id: "generalization", name: "generalization", definition: "A model's ability to perform well on relevant examples it did not train on.", analogy: "Understanding a lesson well enough to answer a newly worded question", example: "Low validation error after training on separate data.", nonExample: "Memorizing every training answer while failing on new cases." }],
    notation: { expression: "generalization gap = validation error − training error", readAs: "Subtract training error from validation error to measure how much performance worsens on unseen data.", symbols: [["training error", "Error on examples used to fit the model."], ["validation error", "Error on held-out examples used during selection."], ["gap", "A warning sign when unseen-data error is much larger."]] }
  }
};

for (const [id, additions] of Object.entries(CLASSICAL_ML_GUIDES)) {
  Object.assign(FOUNDATION_GUIDES[id], additions);
}

for (const [id, guide] of Object.entries(FOUNDATION_GUIDES)) {
  guide.notation = { ...guide.notation, ...GUIDED_NOTATION[id] };
}

export function buildBeginnerSteps(seed, examples, questions) {
  const guide = FOUNDATION_GUIDES[seed.id];
  if (!guide) return [];
  const term = seed.vocabulary[0];
  const everydayExample = examples[0];
  const mlExample = examples[2] || examples[1];
  const everyday = buildEveryday(seed, everydayExample);
  const mlBridge = buildMlBridge(seed, mlExample, everydayExample);
  const conceptBody = seed.plain === term.definition ? [seed.plain] : [seed.plain, term.definition];

  return [
    {
      id: "start",
      type: "orientation",
      title: "Start here",
      goal: guide.goal,
      body: [seed.plain],
      prerequisites: seed.prerequisites || []
    },
    {
      id: "everyday-story",
      type: "scenario",
      title: "See it in everyday life",
      everyday,
      check: questions[0]
    },
    {
      id: "plain-idea",
      type: "concept",
      title: "Understand the main idea",
      body: conceptBody,
      vocabulary: seed.vocabulary,
      widget: guide.widget,
      notation: guide.notation,
      formulaIds: seed.formulaIds || [],
      check: questions[1]
    },
    {
      id: "worked-example",
      type: "worked-example",
      title: "Follow one worked example",
      body: ["Use small numbers first. Each line explains why the next operation is useful."],
      example: everydayExample,
      check: questions[2]
    },
    {
      id: "your-turn",
      type: "check",
      title: "Try one small check",
      body: ["Choose an answer before reading the feedback. A wrong answer is a clue about what to review, not a failure."],
      check: questions[3]
    },
    {
      id: "math-to-ml",
      type: "notation",
      title: "Connect the notation to ML",
      body: ["Read the expression aloud before calculating. Then match each symbol to the quantity it represents."],
      notation: guide.notation,
      formulaIds: seed.formulaIds || [],
      mlBridge,
      mlExample,
      check: questions[4]
    },
    {
      id: "recap",
      type: "recap",
      title: "Recap and choose what comes next",
      body: [`You can now explain ${term.name} in ordinary language, recognize it in an example, and connect it to machine learning.`],
      recapQuestions: [questions[0], questions[3], questions[4]],
      misconception: seed.misconceptions[0]
    }
  ];
}

export function buildProgressiveBeginnerSteps(seed, levels) {
  const guide = FOUNDATION_GUIDES[seed.id];
  if (!guide?.vocabulary?.length) return [];
  const everydayExample = guide.everydayExample || levels.basics.example;
  const mlExample = guide.mlExample || levels.advanced.example || levels.core.example;
  const questions = guide.questions || [levels.basics.questions[0], levels.core.questions[0], levels.advanced.questions[0]];
  const formulaIds = [...new Set(Object.values(levels).flatMap((content) => content.formulaIds || []))];
  return [
    {
      id: "start", type: "orientation", title: "Start here", goal: guide.goal,
      body: [guide.introduction || levels.basics.summary], prerequisites: seed.prerequisites || []
    },
    {
      id: "everyday-story", type: "scenario", title: "See it in everyday life",
      everyday: buildEveryday({ realWorld: guide.scenario || seed.scenario }, everydayExample), check: questions[0]
    },
    {
      id: "plain-idea", type: "concept", title: "Understand the main idea",
      body: guide.concepts || levels.basics.concepts, vocabulary: guide.vocabulary, notation: guide.notation,
      formulaIds, check: questions[1]
    },
    {
      id: "worked-example", type: "worked-example", title: "Follow one worked example",
      body: ["Use the smallest useful case first. Explain what each operation contributes before moving on."],
      example: everydayExample, check: questions[0]
    },
    {
      id: "your-turn", type: "check", title: "Try one small check",
      body: ["Choose an answer before reading the feedback. A wrong answer points to the exact idea worth reviewing."],
      check: questions[1]
    },
    {
      id: "math-to-ml", type: "notation", title: "Connect the notation to ML",
      body: ["Read the expression aloud, decode its symbols, and then follow the same quantities inside a model."],
      notation: guide.notation, formulaIds,
      mlBridge: buildMlBridge({ id: seed.id, ml: guide.task || seed.mlConnection }, mlExample, everydayExample),
      mlExample, check: questions[2]
    },
    {
      id: "recap", type: "recap", title: "Recap and choose what comes next",
      body: [`You can now explain ${guide.vocabulary[0].name}, follow a small example, and connect it to a real machine-learning decision.`],
      recapQuestions: questions,
      misconception: guide.misconception || {
        wrong: "A strong result on familiar training examples proves the model will work well everywhere.",
        correction: "Check the assumptions and evaluate on relevant unseen examples before trusting the result."
      }
    }
  ];
}
