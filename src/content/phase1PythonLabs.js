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
  })
};

export function pythonLabsForLesson(lessonId) {
  const lab = labs[lessonId];
  return lab ? { basics: lab, core: lab, advanced: lab } : null;
}
