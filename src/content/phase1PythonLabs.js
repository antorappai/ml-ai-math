import { codeLab } from "./lessonBuilder.js";

const labs = {
  "functions-domain-range": codeLab({
    title: "Turn a function into Python", goal: "Connect f(x) notation to a callable Python function.",
    code: "def fare(x):\n    return 3 * x + 5\n\nprint(fare(4))", output: "17",
    explanation: "The parameter x is the input; return gives the output 3x+5.", hiddenTests: "assert fare(0) == 5\nassert fare(10) == 35"
  }),
  "summation-subscripts-sets": codeLab({
    title: "Sigma notation as code", goal: "See how an indexed sum becomes a Python sum.",
    code: "values = [2, 4, 6]\ntotal = sum(values)\nprint(total)", output: "12",
    explanation: "Python's sum visits the same indexed values described by sigma notation.", hiddenTests: "assert total == 12\nassert len(values) == 3"
  }),
  "vector-magnitude-distance": codeLab({
    title: "Vector length and distance", goal: "Implement square, sum, and square root with NumPy.",
    code: "import numpy as np\nv = np.array([3.0, 4.0])\na = np.array([1.0, 2.0])\nb = np.array([4.0, 6.0])\nprint(np.linalg.norm(v))\nprint(np.linalg.norm(a - b))",
    output: "5.0\n5.0", explanation: "norm(v) computes magnitude; norm(a-b) computes distance.", packages: ["numpy"]
  }),
  "matrix-vector-multiplication": codeLab({
    title: "Matrix times vector", goal: "Match each output to one row-dot-vector calculation.",
    code: "import numpy as np\nA = np.array([[1, 2], [0, 1]])\nv = np.array([3, -1])\nprint(A @ v)",
    output: "[ 1 -1]", explanation: "The @ operator performs matrix multiplication, not entrywise multiplication.", packages: ["numpy"]
  }),
  "matrix-matrix-multiplication": codeLab({
    title: "Matrix products and shapes", goal: "Check inner dimensions before multiplying.",
    code: "import numpy as np\nA = np.array([[1, 2], [0, 1]])\nB = np.array([[2, 0], [3, 1]])\nC = A @ B\nprint(C)\nprint(C.shape)",
    output: "[[8 2]\n [3 1]]\n(2, 2)", explanation: "Every entry is a row of A dotted with a column of B.", packages: ["numpy"]
  }),
  "eigenvalues-eigenvectors": codeLab({
    title: "Compute and verify an eigenpair", goal: "Check Av=lambda v numerically.",
    code: "import numpy as np\nA = np.array([[4.0, 0.0], [0.0, 1.0]])\nvalues, vectors = np.linalg.eig(A)\nv = vectors[:, 0]\nprint(values)\nprint(np.allclose(A @ v, values[0] * v))",
    output: "[4. 1.]\nTrue", explanation: "Eigenvectors are columns matched by position with eigenvalues.", packages: ["numpy"]
  }),
  "derivative-definition": codeLab({
    title: "Approximate a derivative", goal: "Shrink a finite change to estimate instantaneous slope.",
    code: "def f(x):\n    return x ** 2\n\nx = 3.0\nh = 1e-5\napprox = (f(x + h) - f(x)) / h\nprint(round(approx, 3))",
    output: "6.0", explanation: "The difference quotient approaches the exact derivative 2x=6.", hiddenTests: "assert abs(approx - 6) < 0.001"
  }),
  "gradients-directional-change": codeLab({
    title: "A gradient function", goal: "Return one partial derivative per input variable.",
    code: "def gradient(x, y):\n    return [2 * x, 2 * y]\n\nprint(gradient(3, 4))", output: "[6, 8]",
    explanation: "The output contains partial f/partial x and partial f/partial y.", hiddenTests: "assert gradient(1, 2) == [2, 4]"
  }),
  "gradient-descent-learning-rate": codeLab({
    title: "Run gradient descent", goal: "Watch negative-gradient updates reduce x squared.",
    code: "x = 4.0\nlearning_rate = 0.1\nfor _ in range(5):\n    gradient = 2 * x\n    x = x - learning_rate * gradient\nprint(round(x, 4))",
    output: "1.3107", explanation: "The gradient chooses direction and the learning rate scales each step.", hiddenTests: "assert abs(x) < 4"
  }),
  "probability-rules": codeLab({
    title: "Estimate probability by simulation", goal: "Compare long-run frequency with theoretical probability.",
    code: "import numpy as np\nrng = np.random.default_rng(7)\nflips = rng.integers(0, 2, 1000)\nprint(round(flips.mean(), 2))",
    output: "0.51", explanation: "A fixed seed makes the experiment reproducible while frequency remains an estimate.", packages: ["numpy"]
  }),
  "expected-value": codeLab({
    title: "Calculate casino expectation", goal: "Multiply each payoff by its probability and add.",
    code: "outcomes = [10, -3]\nprobabilities = [0.2, 0.8]\nexpected = sum(x * p for x, p in zip(outcomes, probabilities))\nprint(round(expected, 2))",
    output: "-0.4", explanation: "Negative player expectation means the game favors the house by 0.4 per play.", hiddenTests: "assert abs(sum(probabilities) - 1) < 1e-9\nassert expected < 0"
  }),
  "variance-population-sample": codeLab({
    title: "Population versus sample variance", goal: "Make the N versus n-1 distinction explicit.",
    code: "import numpy as np\nx = np.array([2.0, 4.0, 6.0])\nprint(np.var(x, ddof=0))\nprint(np.var(x, ddof=1))\nprint(np.std(x, ddof=1))",
    output: "2.6666666666666665\n4.0\n2.0", explanation: "ddof=0 divides by N; ddof=1 divides by n-1; std returns to original units.", packages: ["numpy"]
  }),
  "dot-product-angle": codeLab({
    title: "Measure alignment with a dot product", goal: "Calculate how much one customer-preference vector points along another.",
    code: "import numpy as np\ncustomer = np.array([2, 3])\nproduct = np.array([4, 1])\nalignment = customer @ product\nprint(alignment)",
    output: "11", explanation: "@ multiplies matching components and adds them: 2×4 + 3×1.", mathToCode: "customer @ product is the code form of aᵀb. A larger positive result means stronger alignment.", commonTrap: "Using * here performs entry-by-entry multiplication, not the final dot product.", exercise: { prompt: "Change product to [-4, -1]. Run it and explain why the sign changes." }, packages: ["numpy"]
  }),
  "unit-vectors-normalization": codeLab({
    title: "Keep direction, remove size", goal: "Turn a route direction into a unit vector before comparing it with another route.",
    code: "import numpy as np\nv = np.array([3.0, 4.0])\nu = v / np.linalg.norm(v)\nprint(np.round(u, 2))\nprint(np.linalg.norm(u))",
    output: "[0.6 0.8]\n1.0", explanation: "Dividing by length keeps the direction but makes its length exactly one.", mathToCode: "np.linalg.norm(v) is ||v||, and v / norm(v) is the unit-vector formula.", commonTrap: "Normalizing the zero vector is undefined because its length is zero.", exercise: { prompt: "Replace v with [5.0, 12.0] and verify the new vector still has length one." }, packages: ["numpy"]
  }),
  "transpose-symmetry": codeLab({
    title: "Swap rows and columns", goal: "See how a people-by-products table becomes a products-by-people table.",
    code: "import numpy as np\nratings = np.array([[5, 2, 4], [1, 4, 3]])\nprint(ratings.T)\nprint(np.array_equal(ratings, ratings.T))",
    output: "[[5 1]\n [2 4]\n [4 3]]\nFalse", explanation: ".T swaps the row and column positions; it does not reverse or invert the matrix.", mathToCode: "ratings.T implements Aᵀ. The equality check asks whether A=Aᵀ, which defines symmetry.", commonTrap: "A transpose changes shape; it does not solve a system or undo a transformation.", exercise: { prompt: "Create a 2×2 symmetric matrix and make the equality check print True." }, packages: ["numpy"]
  }),
  "inverse-systems": codeLab({
    title: "Solve a two-condition decision", goal: "Use an inverse to recover two unknown prices from two combined bills.",
    code: "import numpy as np\nA = np.array([[1.0, 1.0], [2.0, 1.0]])\nb = np.array([3.0, 5.0])\nx = np.linalg.inv(A) @ b\nprint(x)",
    output: "[2. 1.]", explanation: "The two entries solve the two equations represented by A x = b.", mathToCode: "np.linalg.inv(A) @ b implements x=A⁻¹b when A is invertible.", commonTrap: "An inverse exists only for a square matrix that has not collapsed a direction.", exercise: { prompt: "Change b to [4.0, 6.0]. What two values now solve the system?" }, packages: ["numpy"]
  }),
  "linear-transformations": codeLab({
    title: "Transform a map direction", goal: "Apply a scaling matrix to a direction vector.",
    code: "import numpy as np\nA = np.array([[2, 0], [0, 3]])\nv = np.array([3, -1])\nprint(A @ v)",
    output: "[ 6 -3]", explanation: "The matrix doubles the east-west component and triples the north-south component.", mathToCode: "A @ v is T(v)=Av: the matrix is a rule that moves every vector consistently.", commonTrap: "Adding a constant vector is a translation, not a linear transformation.", exercise: { prompt: "Change A to [[1, 1], [0, 1]]. Describe the shear shown by the output." }, packages: ["numpy"]
  }),
  eigendecomposition: codeLab({
    title: "Rebuild a transformation from eigenparts", goal: "Verify that eigenvectors and eigenvalues can reconstruct a diagonalizable matrix.",
    code: "import numpy as np\nA = np.array([[4.0, 0.0], [0.0, 1.0]])\nvalues, C = np.linalg.eig(A)\nLambda = np.diag(values)\nreconstructed = C @ Lambda @ np.linalg.inv(C)\nprint(np.allclose(A, reconstructed))",
    output: "True", explanation: "For this matrix, C contains eigenvectors and Lambda contains their matching scales.", mathToCode: "C @ Lambda @ inv(C) implements A=CΛC⁻¹: change basis, scale, then change back.", commonTrap: "Eigenvalue order must match the columns of C.", exercise: { prompt: "Replace A with [[3.0, 0.0], [0.0, 2.0]] and verify reconstruction again." }, packages: ["numpy"]
  }),
  "covariance-matrices-pca": codeLab({
    title: "Keep the main customer pattern with PCA", goal: "Centre a small customer dataset, find its main direction, and measure retained variation.",
    code: "import numpy as np\nX = np.array([[1., 1.], [2., 2.], [3., 3.], [4., 4.]])\ncentered = X - X.mean(axis=0)\ncovariance = np.cov(centered, rowvar=False)\nvalues, vectors = np.linalg.eigh(covariance)\nfirst = np.argmax(values)\nretained = values[first] / values.sum()\nprojection = centered @ vectors[:, first]\nprint(round(retained, 2))\nprint(np.round(np.abs(projection), 3))",
    output: "1.0\n[2.121 0.707 0.707 2.121]", explanation: "The two customer measurements move together, so one principal direction retains all variation in this simplified dataset.", mathToCode: "Centering removes the average, np.cov builds C, eigh finds C's eigenpairs, and projection uses the eigenvector for the largest eigenvalue.", commonTrap: "Running PCA on unscaled features can make a large-unit measurement dominate the result.", exercise: { prompt: "Change the second column so it is not exactly equal to the first. How does retained variance change?" }, packages: ["numpy"]
  }),
  "partial-derivatives": codeLab({
    title: "Change one input while holding the other fixed", goal: "Calculate the two local effects in a two-input delivery-cost rule.",
    code: "def partials(distance, parcels):\n    return 2 * distance + 2 * parcels, 2 * parcels + 2 * distance\n\nprint(partials(3, 4))",
    output: "(14, 14)", explanation: "The function returns one derivative for distance and one for parcels at the chosen point.", mathToCode: "Each returned value is a partial derivative: change one input while treating the other as fixed.", commonTrap: "Changing both inputs at once does not isolate a partial derivative.", exercise: { prompt: "Evaluate partials(1, 5) and explain which local change each number describes." }
  }),
  "chain-rule-computational-graphs": codeLab({
    title: "Pass a change through two steps", goal: "Track how a change in an input affects a final score through an intermediate value.",
    code: "x = 3.0\nu = x ** 2\ny = 5 * u\ndy_du = 5\ndu_dx = 2 * x\ndy_dx = dy_du * du_dx\nprint(y)\nprint(dy_dx)",
    output: "45.0\n30.0", explanation: "A small change in x is multiplied by the local effect of each later step.", mathToCode: "dy_du * du_dx implements dy/dx=(dy/du)(du/dx). This is the core of backpropagation.", commonTrap: "Adding local derivatives is wrong here; chained effects multiply.", exercise: { prompt: "Change x to 2. What are y and dy_dx, and why?" }
  }),
  "bayes-theorem": codeLab({
    title: "Update a medical-screening estimate", goal: "Combine a prior rate with a test result without reversing the condition.",
    code: "test_given_condition = 0.8\nprior_condition = 0.1\npositive_test = 0.2\nposterior = test_given_condition * prior_condition / positive_test\nprint(round(posterior, 2))",
    output: "0.4", explanation: "A positive test changes the original probability; it does not automatically make the condition certain.", mathToCode: "The numerator is likelihood times prior, then division by evidence normalizes P(condition | positive test).", commonTrap: "P(condition | test) is not the same as P(test | condition).", exercise: { prompt: "Set prior_condition to 0.01. How does a rarer condition change the posterior?" }
  }),
  "probability-mass-function": codeLab({
    title: "Check a countable sales forecast", goal: "Confirm that probabilities for 0, 1, and 2 sales form a valid PMF.",
    code: "sales = [0, 1, 2]\nprobability = [0.2, 0.5, 0.3]\nprint(sum(probability))\nprint(all(0 <= p <= 1 for p in probability))",
    output: "1.0\nTrue", explanation: "A valid Probability Mass Function gives each countable outcome a probability and uses all probability mass exactly once.", mathToCode: "sum(probability)=1 implements Σₓp_X(x)=1; the second line checks each mass is valid.", commonTrap: "A PMF is for exact countable values, not every exact continuous measurement.", exercise: { prompt: "Change the final probability to 0.4. Which validity check now fails?" }
  }),
  "probability-density-function": codeLab({
    title: "Find probability from density area", goal: "Calculate the chance that a uniformly distributed wait falls within an interval.",
    code: "density = 1 / 4\nstart = 1\nend = 3\nprobability = (end - start) * density\nprint(probability)",
    output: "0.5", explanation: "For a uniform density, interval probability is rectangle width times height.", mathToCode: "(end-start)*density is the simple-area version of integrating f_X(x) from start to end.", commonTrap: "Density height is not the probability of one exact continuous value.", exercise: { prompt: "Change end to 2.5. What interval probability do you get?" }
  }),
  "cumulative-distribution-function": codeLab({
    title: "Accumulate delivery probabilities", goal: "Find the chance that a delivery takes at most one time unit.",
    code: "times = [0, 1, 2]\nprobability = [0.2, 0.5, 0.3]\ncutoff = 1\ncdf = sum(p for time, p in zip(times, probability) if time <= cutoff)\nprint(cdf)",
    output: "0.7", explanation: "The CDF adds every probability at or below the chosen cutoff.", mathToCode: "The if time <= cutoff condition implements F_X(x)=P(X≤x).", commonTrap: "A CDF is cumulative; it is not the probability of exactly the cutoff value.", exercise: { prompt: "Set cutoff to 2. Why must the output become 1.0?" }
  }),
  "standard-deviation": codeLab({
    title: "Read spread in the original unit", goal: "Measure how much delivery times vary around their average.",
    code: "import numpy as np\ntimes = np.array([2.0, 4.0, 6.0])\nprint(np.std(times, ddof=1))",
    output: "2.0", explanation: "Standard deviation is the square root of variance, so it returns to the original unit: time.", mathToCode: "np.std with ddof=1 computes sample standard deviation, using the n-1 correction.", commonTrap: "Variance is in squared units; standard deviation is the interpretable spread in original units.", exercise: { prompt: "Add a delivery time of 12. How does the spread change?" }, packages: ["numpy"]
  }),
  "normal-z-scores": codeLab({
    title: "Compare a score with its group", goal: "Express an exam score in standard-deviation units instead of raw marks.",
    code: "score = 70\nmean = 50\nstandard_deviation = 10\nz = (score - mean) / standard_deviation\nprint(z)",
    output: "2.0", explanation: "The score is two standard deviations above the group average.", mathToCode: "(score-mean)/standard_deviation is z=(x-μ)/σ. The sign tells above or below average.", commonTrap: "A negative z-score is not wrong; it means below the mean.", exercise: { prompt: "Set score to 35. Interpret the negative z-score in words." }
  }),
  "covariance-correlation": codeLab({
    title: "Standardize a shared movement", goal: "Compare how temperature and ice-cream sales move together.",
    code: "import numpy as np\ntemperature = np.array([20., 22., 24.])\nsales = np.array([10., 14., 18.])\ncorrelation = np.corrcoef(temperature, sales)[0, 1]\nprint(round(correlation, 2))",
    output: "1.0", explanation: "These simplified values move together perfectly linearly, so correlation is one.", mathToCode: "np.corrcoef standardizes covariance by both standard deviations, producing a value from -1 to 1.", commonTrap: "Correlation describes association, not proof that one variable causes the other.", exercise: { prompt: "Change the middle sales value. Does the correlation stay exactly one?" }, packages: ["numpy"]
  })
};

export function pythonLabsForLesson(lessonId) {
  const lab = labs[lessonId];
  return lab ? { basics: lab, core: lab, advanced: lab } : null;
}
