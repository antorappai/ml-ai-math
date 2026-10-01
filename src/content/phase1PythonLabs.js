import { codeLab } from "./lessonBuilder.js";
import { recoveryPythonLabs } from "./recoveryPythonLabs.js";

const labs = {
  "determinant-collapse": codeLab({
    title: "Calculate signed area and exhibit a lost direction", goal: "Compute a 2 × 2 determinant, apply its absolute area scale, and show distinct inputs merging under a singular map.",
    code: "def determinant2(A):\n    if len(A) != 2 or any(len(row) != 2 for row in A):\n        raise ValueError('This formula requires a 2 by 2 matrix')\n    a, b = A[0]\n    c, d = A[1]\n    return a * d - b * c\n\ndef apply2(A, v):\n    if len(A) != 2 or any(len(row) != 2 for row in A) or len(v) != 2:\n        raise ValueError('Use a 2 by 2 matrix and a two-entry vector')\n    return [row[0] * v[0] + row[1] * v[1] for row in A]\n\nA = [[2, 1], [1, 3]]\noriginal_area = 3\nsigned_scale = determinant2(A)\nprint('Signed scale:', signed_scale)\nprint('Transformed area:', abs(signed_scale) * original_area)\nreflection = [[0, 1], [1, 0]]\nprint('Reflection signed scale:', determinant2(reflection))\nprint('Reflection area:', abs(determinant2(reflection)) * original_area)\n\nM = [[1, 2], [2, 4]]\nx = [3, 1]\nother = [1, 2]\ndifference = [x[i] - other[i] for i in range(2)]\nprint('Collapse determinant:', determinant2(M))\nprint('First output:', apply2(M, x))\nprint('Other output:', apply2(M, other))\nprint('Lost difference output:', apply2(M, difference))",
    output: "Signed scale: 5\nTransformed area: 15\nReflection signed scale: -1\nReflection area: 3\nCollapse determinant: 0\nFirst output: [5, 10]\nOther output: [5, 10]\nLost difference output: [0, 0]",
    explanation: "The signed determinant keeps orientation information; abs(signed_scale) converts it into an ordinary area multiplier. M sends two distinct inputs to [5, 10], and sends their nonzero difference to zero, exhibiting information loss.",
    mathToCode: "a * d - b * c is the 2 × 2 determinant formula. Each apply2 row forms one output coordinate, so the Python vector lists represent column-shaped inputs mathematically. abs does not change the stored signed determinant.",
    commonTrap: "The ad − bc formula only applies to 2 × 2 matrices. A negative determinant does not make a negative ordinary area, and a zero determinant does not force all output vectors to zero.",
    exercise: { prompt: "Change A[1][1] from 3 to 4. Predict the new signed scale 7 and patch area 21 before running. Explain why the reflection and collapse outputs stay the same." },
    hiddenTests: "assert determinant2([[1, 0], [0, 1]]) == 1\nassert determinant2([[2, 1], [1, -1]]) == -3\nassert determinant2([[1, 2], [0, 1]]) == 1\nassert determinant2([[1, 0], [0, 0.5]]) == 0.5\nassert determinant2([[0, 0], [0, 0]]) == 0\nassert apply2(M, x) == apply2(M, other)\nassert difference != [0, 0] and apply2(M, difference) == [0, 0]\nfor invalid in [[], [[1, 2, 3], [4, 5, 6]], [[1, 2], [3]]]:\n    try:\n        determinant2(invalid)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError('The 2 by 2 formula must reject other shapes')"
  }),
  "matrix-anatomy-types": codeLab({
    title: "Read the marks matrix in Python", goal: "Connect row/column addresses to Python indexing, then calculate one prediction per student.",
    code: "marks = [[60, 80], [70, 90], [50, 75]]\nrows = len(marks)\ncolumns = len(marks[0])\nprint((rows, columns))\nprint(marks[1][0])\n\ncomputing_marks = []\npredictions = []\nfor row in marks:\n    computing_marks.append(row[1])\n    prediction = 0.3 * row[0] + 0.2 * row[1] + 8\n    predictions.append(prediction)\n\nprint(computing_marks)\nprint(predictions)",
    output: "(3, 2)\n70\n[80, 90, 75]\n[42.0, 47.0, 38.0]", explanation: "Each inner list is one student row. The loop reads Computing from each row and applies the same two feature weights plus one baseline to each student.",
    mathToCode: "Mathematical X₂₁ becomes marks[1][0] because Python counts from zero. len(marks) counts rows; len(marks[0]) counts columns in this rectangular table.", commonTrap: "len(marks) is the number of rows, not the total number of entries. Keep Maths before Computing in every row.",
    exercise: { prompt: "Append [65, 85] for a fourth student before counting rows. Predict the new shape (4, 2) and the added prediction 44.5 before running." },
    hiddenTests: "assert all(len(row) == columns for row in marks)\nassert len(predictions) == rows\nassert len(computing_marks) == rows"
  }),
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
    title: "Calculate every row before collecting the outputs", goal: "Reproduce [10, 9] transparently, then use the same procedure for the three student predictions.",
    code: "def matrix_vector(matrix, vector):\n    outputs = []\n    for row in matrix:\n        if len(row) != len(vector):\n            raise ValueError('Each row must match the vector length')\n        total = 0\n        for column in range(len(vector)):\n            total += row[column] * vector[column]\n        outputs.append(total)\n    return outputs\n\nA = [[2, 1], [-1, 3]]\nv = [3, 4]\nprint(matrix_vector(A, v))\n\nX = [[60, 80], [70, 90], [50, 75]]\nw = [0.3, 0.2]\nscores = matrix_vector(X, w)\nprint(scores)\npredictions = []\nfor score in scores:\n    predictions.append(score + 8)\nprint(predictions)",
    output: "[10, 9]\n[34.0, 39.0, 30.0]\n[42.0, 47.0, 38.0]", explanation: "The inner loop adds paired products within one row. The outer loop appends one output for each row. Adding 8 to every student score completes the illustrative prediction rule.",
    mathToCode: "row[column] * vector[column] is one paired product Aᵢⱼvⱼ. total sums the input positions j within row i; outputs keeps the separate row results. The explicit length check prevents silently omitting inputs.",
    commonTrap: "Calling Python's zip on unequal-length lists silently stops at the shorter list. Validate dimensions before using it for a dot product.", exercise: { prompt: "Change only v[0] from 3 to 4. Predict the new first output list [12, 8] before running; the student scores stay the same because their inputs have not changed." },
    hiddenTests: "assert matrix_vector([[1, 0], [0, 1]], [3, 4]) == [3, 4]\nassert matrix_vector([[1, -2], [0, 3], [2, 1]], [4, 2]) == [0, 6, 10]\ntry:\n    matrix_vector([[1, 2]], [1, 2, 3])\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('Mismatched dimensions must be rejected')"
  }),
  "matrix-matrix-multiplication": codeLab({
    title: "Build a bill table with row–column loops", goal: "Recreate the cafe bills and the two student outputs, while checking the shared dimension.",
    code: "def matrix_multiply(A, B):\n    if not A or not B or not A[0] or not B[0]:\n        raise ValueError('Use non-empty matrices')\n    shared = len(A[0])\n    columns = len(B[0])\n    if any(len(row) != shared for row in A):\n        raise ValueError('A must be rectangular')\n    if any(len(row) != columns for row in B):\n        raise ValueError('B must be rectangular')\n    if shared != len(B):\n        raise ValueError('Inner dimensions must match')\n    result = []\n    for i in range(len(A)):\n        output_row = []\n        for j in range(columns):\n            total = 0\n            for k in range(shared):\n                total += A[i][k] * B[k][j]\n            output_row.append(total)\n        result.append(output_row)\n    return result\n\nA = [[2, 1], [1, 3]]\nB = [[3, 4], [2, 1]]\nprint(matrix_multiply(A, B))\nprint(matrix_multiply(B, A))\n\nX = [[60, 80], [70, 90], [50, 75]]\nW = [[0.3, 0.1], [0.2, 0.4]]\nscores = matrix_multiply(X, W)\nbias = [8, 5]\npredictions = [[score + bias[j] for j, score in enumerate(row)] for row in scores]\nprint(scores)\nprint(predictions)",
    output: "[[8, 9], [9, 7]]\n[[10, 15], [5, 5]]\n[[34.0, 38.0], [39.0, 43.0], [30.0, 35.0]]\n[[42.0, 43.0], [47.0, 48.0], [38.0, 40.0]]",
    explanation: "The i loop selects an output row, j selects its column, and k adds the shared item or feature contributions. Reversing the cafe matrices changes the output. In the ML example, bias[j] adds the baseline belonging to each output column.",
    mathToCode: "A[i][k] * B[k][j] implements AᵢₖBₖⱼ with Python's zero-based indices. total adds over k; output_row collects the separate columns j. The three loops mirror Cᵢⱼ = sum over k of AᵢₖBₖⱼ.",
    commonTrap: "A matching total entry count is not enough: A's column count must equal B's row count, and each shared position must refer to the same item or feature.",
    exercise: { prompt: "Change B[0][0] from 3 to 5. Predict the cafe AB output [[12, 9], [11, 7]] before running. Only shop 1's output column changes; the student scores stay the same." },
    hiddenTests: "assert matrix_multiply([[1, -2], [0, 3]], [[2, 1], [1, -1]]) == [[0, 3], [3, -3]]\nassert matrix_multiply([[2, 1], [1, 3], [0, 2]], [[3, 4], [2, 1]]) == [[8, 9], [9, 7], [4, 2]]\nassert matrix_multiply([[1, 2, 3]], [[1], [0], [-1]]) == [[-2]]\nfor left, right in [([[1, 2]], [[1, 2]]), ([[1], [2, 3]], [[1]]), ([[1, 2]], [[1, 2], [3]]), ([], [[1]])]:\n    try:\n        matrix_multiply(left, right)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError('Invalid matrix shapes must be rejected')"
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
    title: "Rebuild the delivery prediction in Python", goal: "See every contribution before combining them into the same 21-coin prediction as the lesson.",
    code: "distance_km = 4\nmass_kg = 2\ndistance_weight = 3\nmass_weight = 2\nbias = 5\n\ndistance_contribution = distance_km * distance_weight\nmass_contribution = mass_kg * mass_weight\ndot_product = distance_contribution + mass_contribution\nprediction = dot_product + bias\n\nprint(distance_contribution)\nprint(mass_contribution)\nprint(dot_product)\nprint(prediction)",
    output: "12\n4\n16\n21", explanation: "The first two outputs are contributions in coins. Their sum is the dot product; adding the bias gives the predicted bill.", mathToCode: "distance_km * distance_weight + mass_kg * mass_weight is xᵀw. Adding bias implements prediction = xᵀw + b.", commonTrap: "Adding distance to mass before multiplying mixes units and loses the correct feature–weight pairing.", exercise: { prompt: "Change distance_km to 5, keeping everything else fixed. Predict all four outputs before running: the bill should increase by the distance weight, 3 coins." },
    hiddenTests: "assert dot_product == distance_contribution + mass_contribution\nassert prediction == dot_product + bias"
  }),
  "unit-vectors-normalization": codeLab({
    title: "Keep direction, remove size", goal: "Turn a route direction into a unit vector before comparing it with another route.",
    code: "import numpy as np\nv = np.array([3.0, 4.0])\nu = v / np.linalg.norm(v)\nprint(np.round(u, 2))\nprint(np.linalg.norm(u))",
    output: "[0.6 0.8]\n1.0", explanation: "Dividing by length keeps the direction but makes its length exactly one.", mathToCode: "np.linalg.norm(v) is ||v||, and v / norm(v) is the unit-vector formula.", commonTrap: "Normalizing the zero vector is undefined because its length is zero.", exercise: { prompt: "Replace v with [5.0, 12.0] and verify the new vector still has length one." }, packages: ["numpy"]
  }),
  "transpose-symmetry": codeLab({
    title: "Follow the exchanged indices in Python", goal: "Transpose the student marks, break a mirrored pair, and build the two ML Gram matrices.",
    code: "def transpose(A):\n    if not A or not A[0]:\n        raise ValueError('Use a non-empty matrix')\n    columns = len(A[0])\n    if any(len(row) != columns for row in A):\n        raise ValueError('Every row must have the same length')\n    result = []\n    for j in range(columns):\n        new_row = []\n        for i in range(len(A)):\n            new_row.append(A[i][j])\n        result.append(new_row)\n    return result\n\ndef is_symmetric(A):\n    return A == transpose(A)\n\ndef feature_gram(Z):\n    features = transpose(Z)\n    result = []\n    for left in features:\n        output_row = []\n        for right in features:\n            total = 0\n            for k in range(len(left)):\n                total += left[k] * right[k]\n            output_row.append(total)\n        result.append(output_row)\n    return result\n\nX = [[60, 80], [70, 90], [50, 75]]\nprint(transpose(X))\nprint(transpose(transpose(X)) == X)\nS = [[1, 4, 2], [4, 0, 3], [2, 3, 5]]\nprint(is_symmetric(S))\nS[0][1] = 6\nprint(is_symmetric(S))\nZ = [[1, 2], [2, 0], [0, 1]]\nprint(feature_gram(Z))\nprint(feature_gram(transpose(Z)))",
    output: "[[60, 70, 50], [80, 90, 75]]\nTrue\nTrue\nFalse\n[[5, 2], [2, 5]]\n[[5, 2, 2], [2, 4, 0], [2, 0, 1]]",
    explanation: "The transpose's new row j copies the original column j. Equality with the transpose tests every address, so changing only S₁₂ breaks symmetry. feature_gram compares the original columns; feeding it transpose(Z) compares Z's observation rows instead.",
    mathToCode: "new_row.append(A[i][j]) moves mathematical Aᵢⱼ into the new row j, column i; Python indices start at zero. feature_gram(Z) implements ZᵀZ by summing column-pair products over observations k.",
    commonTrap: "Python nested lists have no .T attribute. For a two-dimensional NumPy array, .T performs this exchange; transposing a one-dimensional NumPy array does not create a row or column shape.",
    exercise: { prompt: "After S[0][1] = 6, add S[1][0] = 6 before checking symmetry again. Predict which False changes to True, and explain why the diagonal may still be [1, 0, 5]." },
    hiddenTests: "assert transpose([[1, -2, 0], [3, 4, 5]]) == [[1, 3], [-2, 4], [0, 5]]\nassert not is_symmetric(X)\nassert is_symmetric([[2, -1], [-1, 5]])\nassert not is_symmetric([[0, 4, 7], [4, 0, 2], [7, 3, 0]])\nassert feature_gram(Z) == [[5, 2], [2, 5]]\nassert is_symmetric(feature_gram(Z))\nassert is_symmetric(feature_gram(transpose(Z)))\nfor invalid in [[], [[]], [[1, 2], [3]]]:\n    try:\n        transpose(invalid)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError('Empty or ragged matrices must be rejected')"
  }),
  ...recoveryPythonLabs,
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
