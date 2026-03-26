export const curriculumStages = [
  {
    key: "foundation",
    title: "1. Math Language & Functions",
    purpose:
      "Learn how to read symbols, expressions, graphs, and simple rules so later topics do not feel like a foreign language.",
    mlConnection:
      "You need this for loss curves, feature scaling, activations, and even just reading equations in papers.",
    topics: ["Functions & Graphs"]
  },
  {
    key: "linear-algebra",
    title: "2. Linear Algebra Core",
    purpose:
      "Understand how data, embeddings, and model weights are represented and transformed.",
    mlConnection:
      "Vectors, matrices, dot products, and linear transformations show up everywhere in ML.",
    topics: [
      "Vectors",
      "Matrix Basics & Types",
      "Matrices & Multiplication",
      "Linear Transformations",
      "Basis & Coordinates",
      "Composition & Matrix Powers",
      "Inverse, Rank & Spaces",
      "Dot Product",
      "Eigenvalues & PCA Intuition",
      "Eigen Decomposition"
    ]
  },
  {
    key: "calculus",
    title: "3. Calculus For Learning",
    purpose:
      "See how models improve by following slopes and gradients.",
    mlConnection:
      "Derivatives, partial derivatives, and gradients are the language of optimization and backpropagation.",
    topics: ["Derivatives", "Multivariable Calculus", "Vector-Valued Functions"]
  },
  {
    key: "probability",
    title: "4. Probability & Statistics",
    purpose:
      "Reason about uncertainty, averages, spread, and noisy data.",
    mlConnection:
      "Classification confidence, likelihood, model evaluation, and generalization all depend on probability and statistics.",
    topics: [
      "Probability Basics",
      "Random Variables & Expected Value",
      "Binomial & Cumulative Probability",
      "Statistics: Mean & Spread",
      "Conditional Probability & Bayes",
      "PDFs, Normal & Standard Normal"
    ]
  },
  {
    key: "modeling",
    title: "5. Modeling Bridge",
    purpose:
      "Connect the math to an actual predictive model before moving on to more advanced ML.",
    mlConnection:
      "Linear regression is the cleanest first example of linear algebra, calculus, and statistics working together.",
    topics: ["Linear Regression", "Gradient Descent", "Logistic Regression", "Backprop"]
  },
  {
    key: "python",
    title: "6. Python For Exams",
    purpose:
      "Practice the programming side of the same math topics so code questions feel connected instead of separate.",
    mlConnection:
      "Python is the working language for ML, and many exams test whether you can express math ideas with code.",
    topics: [
      "Python Basics For Math",
      "NumPy Arrays, Vectors & Matrices",
      "Linear Algebra In Python",
      "Probability & Statistics In Python",
      "Functions, Gradients & Plotting In Python"
    ]
  }
];

export const futureModules = [
  "SVD and singular values",
  "Regularization and bias-variance tradeoff",
  "Convex optimization",
  "Attention and transformer math",
  "Information theory",
  "Advanced probability inequalities"
];

export const foundationChecklist = [
  {
    id: "magnitude",
    title: "Vector magnitude",
    description: "Know how long a vector is and why magnitude matters before similarity and normalization.",
    tags: ["magnitude"]
  },
  {
    id: "distance",
    title: "Distance intuition",
    description: "Read distance as the size of the difference between two points or vectors.",
    tags: ["distance"]
  },
  {
    id: "unit-vector",
    title: "Unit vectors",
    description: "Understand direction without scale so normalization and cosine ideas make sense.",
    tags: ["unit-vector"]
  },
  {
    id: "transpose",
    title: "Transpose",
    description: "Recognize how rows and columns swap and why transpose keeps showing up in matrix formulas.",
    tags: ["transpose"]
  },
  {
    id: "determinant",
    title: "Determinant and invertibility",
    description: "Read determinant as a geometric test for collapse, scaling, and reversibility.",
    tags: ["determinant"]
  },
  {
    id: "coordinate-change",
    title: "Basis and coordinates",
    description: "Separate the vector itself from the coordinate system used to describe it.",
    tags: ["coordinate-change"]
  },
  {
    id: "gradient-basics",
    title: "Gradient basics",
    description: "Decode derivative notation, partial derivatives, and gradient direction before optimization.",
    tags: ["gradient-basics"]
  },
  {
    id: "z-score",
    title: "Z-scores and spread",
    description: "Understand center, standard deviation, and standardized distance for statistics and distributions.",
    tags: ["z-score"]
  }
];

export const dashboardTopicCards = [
  {
    key: "foundation",
    title: "Math Language",
    summary: "Start by learning how graphs, symbols, and formulas behave before touching heavier ML notation.",
    lessonKeys: ["functions"]
  },
  {
    key: "linear-algebra",
    title: "Linear Algebra Core",
    summary: "Data, embeddings, matrix transformations, determinants, eigen ideas, and geometric reasoning live here.",
    lessonKeys: ["vectors", "matrix-basics", "matrices", "dot", "eigen"]
  },
  {
    key: "calculus",
    title: "Calculus For Learning",
    summary: "Slopes, partial derivatives, gradients, and update rules explain how models improve.",
    lessonKeys: ["derivatives", "multivariable", "gradient-descent"]
  },
  {
    key: "probability",
    title: "Probability And Statistics",
    summary: "Uncertainty, random variables, expectation, spread, z-scores, and Bayes all connect to ML evaluation and inference.",
    lessonKeys: ["probability", "random-variables", "statistics", "bayes", "distributions"]
  },
  {
    key: "modeling",
    title: "Modeling Bridge",
    summary: "Regression, logistic models, and backprop show how the earlier math becomes actual ML.",
    lessonKeys: ["regression", "logistic", "backprop"]
  },
  {
    key: "python",
    title: "Python Practice",
    summary: "Translate the same math into code so exam questions and ML workflows feel connected instead of separate.",
    lessonKeys: ["python-basics", "python-linear-algebra", "python-probability", "python-functions-gradients"]
  }
];

export const prepOutcomes = [
  "Read ML math notation without freezing on symbols.",
  "Move from intuitive explanations to formulas and then to exam questions.",
  "Translate vectors, matrices, probability, and gradients into Python.",
  "Recognize what each topic is actually doing in ML."
];

export const notationStarterKit = [
  {
    symbol: "||v||",
    readAs: "Read as: magnitude or length of v",
    meaning: "This tells you how long the vector is. It is about size, not direction."
  },
  {
    symbol: "v / ||v||",
    readAs: "Read as: normalize v",
    meaning: "This rescales a vector to length 1 while keeping the same direction."
  },
  {
    symbol: "A^T",
    readAs: "Read as: A transpose",
    meaning: "Rows become columns. This is one of the most common matrix notations in ML."
  },
  {
    symbol: "det(A)",
    readAs: "Read as: determinant of A",
    meaning: "This helps you tell whether a transformation stretches, flips, or collapses space."
  },
  {
    symbol: "P(A | B)",
    readAs: "Read as: probability of A given B",
    meaning: "This means you are updating your probability after learning that B happened."
  },
  {
    symbol: "E[X]",
    readAs: "Read as: expected value of X",
    meaning: "This is the weighted average or long-run average of a random variable."
  },
  {
    symbol: "N(μ, σ²)",
    readAs: "Read as: normal with mean mu and variance sigma squared",
    meaning: "This names a normal distribution by its center and spread."
  },
  {
    symbol: "∂f/∂x",
    readAs: "Read as: partial derivative of f with respect to x",
    meaning: "This asks how f changes when x moves and the other variables stay fixed."
  },
  {
    symbol: "∇f",
    readAs: "Read as: gradient of f",
    meaning: "This collects all partial derivatives into one vector showing steepest increase."
  },
  {
    symbol: "Av = λv",
    readAs: "Read as: A v equals lambda v",
    meaning: "This says v keeps its direction under A and only gets scaled by lambda."
  },
  {
    symbol: "A = C D C^-1",
    readAs: "Read as: A equals C D C inverse",
    meaning: "This is eigendecomposition: change basis, scale simply, then change back."
  },
  {
    symbol: "η",
    readAs: "Read as: eta, the learning rate",
    meaning: "This controls how big each gradient-descent step is."
  }
];

const baseLessons = [
  {
    key: "functions",
    order: 1,
    stage: "Foundation",
    difficulty: "Essential",
    label: "Functions & Graphs",
    navDescription: "Read equations as input-output machines.",
    subtitle:
      "Start here if formulas still feel intimidating. A function is just a rule that turns an input into an output.",
    learningPurpose:
      "Before linear algebra or calculus, you need to read expressions and graphs without freezing.",
    whyThisBefore:
      "You should study this first because derivatives, loss curves, and probability densities are all functions.",
    prerequisites: ["None"],
    mlPurpose:
      "ML models are functions: they take inputs like features or tokens and produce outputs like scores, probabilities, or predictions.",
    visualTitle: "Move slope, intercept, and input value.",
    visualDescription:
      "The line changes as you move the sliders. This lets you connect the graph, the formula, and the output at one chosen input.",
    beginnerNote:
      "When you see something like f(x), read it as 'the output when the input is x', not as a scary symbol.",
    symbolGuide: [
      { symbol: "f(x)", meaning: "The output of a rule when the input is x." },
      { symbol: "m", meaning: "The slope. It tells you how fast the output changes." },
      { symbol: "c", meaning: "The intercept. It is the starting value when x = 0." }
    ],
    simpleExplanation:
      "A function is like a machine. You feed in a value, the machine follows one rule, and it gives you one output.",
    formula: "f(x) = mx + c",
    formulaMeaning:
      "Meaning: start at c, then add m times the input x.",
    mlUseCase:
      "Loss functions, activation functions, and regression models all map inputs to outputs. If you can read a function, you can read a big part of ML notation.",
    intuition:
      "Ask: if I increase the input a little, what should happen to the output?",
    examShortcuts: [
      "Positive slope means the graph goes up as x increases.",
      "Negative slope means the graph goes down as x increases.",
      "The intercept is where the graph crosses the y-axis."
    ],
    bigPicture:
      "Functions are the entry point to everything else. In ML, a model is ultimately a function from data to prediction.",
    examReadiness: [
      "Read a formula and identify the changing input.",
      "Read a graph and identify slope and intercept.",
      "Plug in a value quickly without panicking about notation."
    ],
    mcq: {
      question: "If f(x) = 3x + 2, what does the 2 represent?",
      options: [
        "The starting value when x = 0",
        "The slope",
        "The input",
        "The output"
      ],
      correctIndex: 0,
      explanation: "Correct. The constant term is the intercept, the output when x is 0."
    },
    problem: {
      prompt: "If f(x) = 2x + 1, what is f(3)?",
      answers: ["7"],
      success: "Correct. Put x = 3 into the rule: 2×3 + 1 = 7."
    },
    conceptQuestion: {
      prompt: "Why do graphs matter if you already have the formula?",
      answer:
        "Because the graph shows the behavior at a glance: where the output grows, shrinks, or stays flat."
    },
    controls: [
      { id: "m", label: "Slope", min: -3, max: 3, step: 0.5, value: 1.5 },
      { id: "c", label: "Intercept", min: -4, max: 4, step: 1, value: 1 },
      { id: "x", label: "Input x", min: -5, max: 5, step: 1, value: 2 }
    ],
    calculate(values) {
      const m = Number(values.m);
      const c = Number(values.c);
      const x = Number(values.x);
      const y = m * x + c;
      return {
        metrics: [`Slope = ${formatNumber(m)}`, `Intercept = ${formatNumber(c)}`, `f(${x}) = ${formatNumber(y)}`],
        exampleSteps: [
          `Write the rule: f(x) = ${formatNumber(m)}x + ${formatNumber(c)}.`,
          `Substitute x = ${x}.`,
          `Compute ${formatNumber(m)} × ${x} = ${formatNumber(m * x)}.`,
          `Add the intercept to get f(${x}) = ${formatNumber(y)}.`
        ],
        insight:
          m > 0
            ? "The graph rises as you move right, so bigger inputs usually give bigger outputs."
            : m < 0
              ? "The graph falls as you move right, so bigger inputs usually give smaller outputs."
              : "The slope is zero, so the output stays constant no matter what x is.",
        drawing: {
          type: "functionLine",
          m,
          c,
          x,
          y
        }
      };
    }
  },
  {
    key: "vectors",
    order: 2,
    stage: "Linear Algebra",
    difficulty: "Essential",
    label: "Vectors",
    navDescription: "Arrows that carry direction and size.",
    subtitle:
      "This is the first true ML object. Inputs, embeddings, gradients, and weights are often vectors.",
    learningPurpose:
      "Learn to treat a list of numbers as one geometric object, not just a random row of values.",
    whyThisBefore:
      "Study vectors before matrices and dot products because those later ideas are built out of vectors.",
    prerequisites: ["Functions & Graphs"],
    mlPurpose:
      "A sentence embedding, a user profile, or a gradient update is usually stored as a vector.",
    visualTitle: "Move the arrow and watch its coordinates change.",
    visualDescription:
      "The graph shows the vector as a direction arrow. The coordinates tell you how much it moves horizontally and vertically.",
    beginnerNote:
      "A vector is not magic. It is just one object that combines several coordinates into one direction and size.",
    symbolGuide: [
      { symbol: "(x, y)", meaning: "A pair of coordinates. First sideways, then vertical." },
      { symbol: "|v|", meaning: "The length or size of vector v." },
      { symbol: "-", meaning: "Negative coordinates move left or down." }
    ],
    simpleExplanation:
      "A vector is like a travel instruction on a map: go this far right or left, and this far up or down.",
    formula: "v = (x, y)",
    formulaMeaning:
      "Meaning: the vector is built from one horizontal part and one vertical part.",
    mlUseCase:
      "Feature vectors, embeddings, and parameter updates all use the same core idea: many numbers acting together as one object.",
    intuition:
      "Ask: where is this object pointing, and how strong is that push?",
    examShortcuts: [
      "Zero vector means no movement.",
      "Positive x means right, negative x means left.",
      "Positive y means up, negative y means down."
    ],
    bigPicture:
      "Vectors are the basic unit of representation in ML. Once vectors make sense, many later formulas become much less scary.",
    examReadiness: [
      "Read coordinates quickly.",
      "Recognize direction changes from signs.",
      "Know that length and direction are both part of a vector."
    ],
    mcq: {
      question: "If v = (4, -2), what does the -2 tell you?",
      options: [
        "Move 2 units down",
        "Move 2 units up",
        "Move 2 units right",
        "Ignore the value"
      ],
      correctIndex: 0,
      explanation: "Correct. A negative vertical value means downward movement."
    },
    problem: {
      prompt: "For v = (3, 4), what is the vertical part?",
      answers: ["4"],
      success: "Correct. The second number is the vertical part."
    },
    conceptQuestion: {
      prompt: "Why do vectors matter in ML at all?",
      answer:
        "Because many ML objects are easiest to store and compare as lists of numbers, and vectors are the math idea behind those lists."
    },
    controls: [
      { id: "ax", label: "Horizontal", min: -6, max: 6, step: 1, value: 3 },
      { id: "ay", label: "Vertical", min: -6, max: 6, step: 1, value: 2 }
    ],
    calculate(values) {
      const ax = Number(values.ax);
      const ay = Number(values.ay);
      const magnitude = Math.hypot(ax, ay);
      return {
        metrics: [`x = ${ax}`, `y = ${ay}`, `Length ≈ ${formatNumber(magnitude)}`],
        exampleSteps: [
          `Start with v = (${ax}, ${ay}).`,
          `The horizontal move is ${ax}, so the arrow goes ${ax >= 0 ? "right" : "left"}.`,
          `The vertical move is ${ay}, so the arrow goes ${ay >= 0 ? "up" : "down"}.`,
          `Together, those pieces form one vector with length about ${formatNumber(magnitude)}.`
        ],
        insight:
          magnitude === 0
            ? "This is the zero vector. It means no movement at all."
            : `This vector goes ${directionText(ax, ay)} and has total length about ${formatNumber(magnitude)}.`,
        drawing: {
          type: "vectors",
          a: { x: ax, y: ay }
        }
      };
    }
  },
  {
    key: "matrix-basics",
    order: 3,
    stage: "Linear Algebra",
    difficulty: "Core",
    label: "Matrix Basics & Types",
    navDescription: "Learn what matrices are before what they do.",
    subtitle:
      "This lesson covers the matrix language that exam questions assume you already know: rows, columns, size, and common matrix types.",
    learningPurpose:
      "Understand the basic structure of matrices so multiplication and transformations stop feeling like a jump.",
    whyThisBefore:
      "Study this before matrix multiplication because exam questions often start with dimensions and matrix types before asking for calculations.",
    prerequisites: ["Vectors"],
    mlPurpose:
      "Matrices store parameters, data blocks, covariance information, and transformation rules throughout ML.",
    visualTitle: "See common matrix types side by side.",
    visualDescription:
      "The visual compares a few common matrix types so the structure becomes recognizable on sight.",
    beginnerNote:
      "A matrix is just a rectangular arrangement of numbers. The hard part is not the box itself. The hard part is learning what that box is being used for.",
    symbolGuide: [
      { symbol: "m × n", meaning: "m rows and n columns." },
      { symbol: "square matrix", meaning: "Same number of rows and columns." },
      { symbol: "I", meaning: "Identity matrix, the do-nothing square matrix." }
    ],
    simpleExplanation:
      "A matrix is like a well-organized table of numbers. Different table shapes and patterns have different mathematical meanings.",
    formula: "A is m × n",
    formulaMeaning:
      "Meaning: A has m rows and n columns.",
    mlUseCase:
      "Weights in a neural layer, data arranged by samples and features, and covariance tables are all naturally stored as matrices.",
    intuition:
      "Ask: how many rows and columns are there, and what kind of matrix pattern am I seeing?",
    examShortcuts: [
      "Rows go horizontally, columns go vertically.",
      "Diagonal entries run from top-left to bottom-right.",
      "Identity leaves vectors unchanged when dimensions match."
    ],
    bigPicture:
      "You need this lesson so later matrix operations feel like acting on a familiar object, not a mystery box.",
    examReadiness: [
      "Identify matrix dimensions quickly.",
      "Recognize identity, diagonal, zero, and square matrices.",
      "Know when two matrices can even be multiplied."
    ],
    advancedExample: {
      title: "Read a matrix before operating on it.",
      steps: [
        "Take A = [[2, 0], [0, 3]].",
        "It has 2 rows and 2 columns, so it is a 2 × 2 square matrix.",
        "Its only nonzero entries are on the diagonal, so it is diagonal.",
        "That pattern already tells you it scales coordinates instead of mixing them."
      ]
    },
    examQuestions: [
      {
        prompt: "What type of matrix is [[1, 0], [0, 1]] and why is it important?",
        answer: "It is the identity matrix, and it acts like the do-nothing transformation.",
        explanation: "Identity is the neutral matrix for multiplication when dimensions match.",
        steps: [
          "Notice the diagonal entries are 1.",
          "Notice all off-diagonal entries are 0.",
          "That is the standard identity pattern.",
          "It leaves vectors unchanged when multiplied."
        ]
      },
      {
        prompt: "Why can a 2 × 3 matrix not be added to a 3 × 2 matrix?",
        answer: "Because matrix addition requires the same shape.",
        explanation: "Addition combines matching entries, so the row-column layout must match exactly.",
        steps: [
          "Read the first matrix shape as 2 × 3.",
          "Read the second matrix shape as 3 × 2.",
          "Compare row and column counts.",
          "Because the shapes differ, entrywise addition is not defined."
        ]
      }
    ],
    mcq: {
      question: "What does it mean if a matrix is 2 × 3?",
      options: [
        "It has 2 rows and 3 columns",
        "It has 2 columns and 3 rows",
        "It has 5 entries only",
        "It must be diagonal"
      ],
      correctIndex: 0,
      explanation: "Correct. Matrix size is read as rows × columns."
    },
    problem: {
      prompt: "What are the dimensions of [[1, 2, 3], [4, 5, 6]]?",
      answers: ["2x3", "2×3", "2 x 3"],
      success: "Correct. There are 2 rows and 3 columns, so the matrix is 2 × 3."
    },
    conceptQuestion: {
      prompt: "Why do matrix types matter before multiplication?",
      answer:
        "Because the shape and pattern of a matrix often tell you what operations make sense and what geometric effect to expect."
    },
    controls: [],
    calculate() {
      return {
        metrics: ["Rows × columns", "Identity, diagonal, zero", "Shape controls operations"],
        exampleSteps: [
          "Count rows first, then columns.",
          "Check if the matrix is square.",
          "Look for diagonal or identity patterns.",
          "Use that structure to predict what the matrix is likely to do."
        ],
        insight:
          "Many exam mistakes come from skipping the basic step of reading a matrix's shape and type before calculating.",
        drawing: {
          type: "matrixTypes"
        }
      };
    }
  },
  {
    key: "matrices",
    order: 4,
    stage: "Linear Algebra",
    difficulty: "Core",
    label: "Matrices & Multiplication",
    navDescription: "Machines that remix vectors.",
    subtitle:
      "A matrix takes a vector in and sends a new vector out. That is already most of the intuition you need.",
    learningPurpose:
      "See matrix multiplication as a transformation rule, not just a grid of numbers to memorize.",
    whyThisBefore:
      "Study multiplication after basic matrix language so rows, columns, and dimensions already feel normal.",
    prerequisites: ["Vectors", "Matrix Basics & Types"],
    mlPurpose:
      "A dense neural-network layer is basically matrix multiplication plus a bias and nonlinearity.",
    visualTitle: "Change the matrix and see how the vector moves.",
    visualDescription:
      "The gold arrow is the original vector. The teal arrow is the transformed vector after multiplication by the matrix.",
    beginnerNote:
      "A matrix is best thought of as a machine for changing vectors. Do not start by trying to memorize index formulas.",
    symbolGuide: [
      { symbol: "A", meaning: "The matrix, the transformation machine." },
      { symbol: "Av", meaning: "Apply matrix A to vector v." },
      { symbol: "[[a, b], [c, d]]", meaning: "A 2×2 matrix with four entries." }
    ],
    simpleExplanation:
      "A matrix is like a control panel for stretching, squeezing, flipping, or mixing directions.",
    formula: "Av = [[a, b], [c, d]] [x, y]^T",
    formulaMeaning:
      "Meaning: the matrix combines the old coordinates to produce new coordinates.",
    mlUseCase:
      "When a model transforms features into hidden representations, matrices are doing the work under the hood.",
    intuition:
      "Ask: how is this machine changing the input direction and size?",
    examShortcuts: [
      "Identity matrix leaves vectors unchanged.",
      "Diagonal matrices scale coordinates separately.",
      "Matrix multiplication produces a new vector, not a list of unrelated numbers."
    ],
    bigPicture:
      "Matrices let ML models transform representations. Without them, there is no practical way to move from raw inputs to learned features.",
    examReadiness: [
      "Multiply a 2×2 matrix by a 2D vector.",
      "Spot identity and scaling matrices quickly.",
      "Interpret the result as a changed vector."
    ],
    mcq: {
      question: "What does the identity matrix do to a vector?",
      options: [
        "Leaves it unchanged",
        "Rotates it 90 degrees",
        "Turns it into zero",
        "Always doubles it"
      ],
      correctIndex: 0,
      explanation: "Correct. The identity matrix acts like a do-nothing transformation."
    },
    problem: {
      prompt: "If A = [[1, 2], [0, 1]] and v = (3, 1), what is Av?",
      answers: ["(5,1)", "[5,1]", "5,1"],
      success: "Correct. The new vector is (1×3 + 2×1, 0×3 + 1×1) = (5, 1)."
    },
    conceptQuestion: {
      prompt: "Why is matrix multiplication more useful than a single number multiplication?",
      answer:
        "Because a matrix can mix coordinates together, not just scale everything equally."
    },
    controls: [
      { id: "a", label: "a", min: -2, max: 3, step: 1, value: 1 },
      { id: "b", label: "b", min: -2, max: 3, step: 1, value: 2 },
      { id: "c", label: "c", min: -2, max: 3, step: 1, value: 0 },
      { id: "d", label: "d", min: -2, max: 3, step: 1, value: 1 },
      { id: "vx", label: "Vector x", min: -4, max: 4, step: 1, value: 3 },
      { id: "vy", label: "Vector y", min: -4, max: 4, step: 1, value: 1 }
    ],
    calculate(values) {
      const a = Number(values.a);
      const b = Number(values.b);
      const c = Number(values.c);
      const d = Number(values.d);
      const vx = Number(values.vx);
      const vy = Number(values.vy);
      const tx = a * vx + b * vy;
      const ty = c * vx + d * vy;
      return {
        metrics: [`Input = (${vx}, ${vy})`, `Output = (${tx}, ${ty})`, `det ≈ ${formatNumber(a * d - b * c)}`],
        exampleSteps: [
          `Write A = [[${a}, ${b}], [${c}, ${d}]] and v = (${vx}, ${vy}).`,
          `First output coordinate: ${a}×${vx} + ${b}×${vy} = ${tx}.`,
          `Second output coordinate: ${c}×${vx} + ${d}×${vy} = ${ty}.`,
          `So Av = (${tx}, ${ty}).`
        ],
        insight:
          `The matrix turns the input vector (${vx}, ${vy}) into (${tx}, ${ty}), so it is acting like a coordinate-remixing machine.`,
        drawing: {
          type: "matrix",
          matrix: { a, b, c, d },
          v: { x: vx, y: vy },
          t: { x: tx, y: ty },
          showBasis: false
        }
      };
    }
  },
  {
    key: "transformations",
    order: 4,
    stage: "Linear Algebra",
    difficulty: "Core",
    label: "Linear Transformations",
    navDescription: "See what a matrix does to space itself.",
    subtitle:
      "Now shift the viewpoint: not just one vector changing, but the whole coordinate system being transformed.",
    learningPurpose:
      "Move from 'matrix as table' to 'matrix as action on space'. That is the more useful mental model for ML.",
    whyThisBefore:
      "Study this after basic matrix multiplication so the geometry of layers, projections, and embeddings becomes clearer.",
    prerequisites: ["Vectors", "Matrices & Multiplication"],
    mlPurpose:
      "A learned linear layer changes the whole representation space, not just one data point.",
    visualTitle: "Watch the basis vectors move.",
    visualDescription:
      "The teal and gold basis arrows show what the matrix does to the coordinate axes. That tells you what it will do to every vector.",
    beginnerNote:
      "A linear transformation is not a random trick. It is a consistent rule for moving every vector in a structured way.",
    symbolGuide: [
      { symbol: "T(v)", meaning: "The output after transformation T acts on vector v." },
      { symbol: "T(v) = Av", meaning: "In finite dimensions, many linear transformations can be written as matrix multiplication." },
      { symbol: "basis", meaning: "Reference directions used to describe all other vectors." }
    ],
    simpleExplanation:
      "A linear transformation is a rule that moves the whole space in an organized way: stretching, rotating, shearing, or flipping.",
    formula: "T(v) = Av",
    formulaMeaning:
      "Meaning: the transformation T can be represented by a matrix A acting on vector v.",
    mlUseCase:
      "Word embeddings, hidden layers, and feature maps all rely on transformations that move data into more useful spaces.",
    intuition:
      "Ask: what is this transformation doing to the basic directions, and what does that imply for every vector?",
    examShortcuts: [
      "Know what identity, scaling, and shear look like.",
      "If you know where basis vectors go, you know the whole transformation.",
      "Linear transformations preserve straightness and origin structure."
    ],
    bigPicture:
      "Linear transformations are the geometric side of matrices. This is the viewpoint that makes neural layers and feature maps feel coherent.",
    examReadiness: [
      "Interpret a matrix as a transformation.",
      "Use transformed basis vectors to reason about the whole space.",
      "Recognize common transformations from matrix entries."
    ],
    mcq: {
      question: "If a transformation doubles every vector, what kind of effect is that?",
      options: [
        "Uniform scaling",
        "Projection",
        "Reflection across a line",
        "Permutation"
      ],
      correctIndex: 0,
      explanation: "Correct. Every direction keeps its line but the size doubles."
    },
    problem: {
      prompt: "If A = [[2, 1], [0, 1]], what is A(1, 0)?",
      answers: ["(2,0)", "[2,0]", "2,0"],
      success: "Correct. The first basis vector goes to the first column: (2, 0)."
    },
    conceptQuestion: {
      prompt: "Why do basis vectors matter so much here?",
      answer:
        "Because once you know what happens to the basis, you know what happens to all combinations of those basis directions."
    },
    controls: [
      { id: "a", label: "a", min: -2, max: 3, step: 1, value: 2 },
      { id: "b", label: "b", min: -2, max: 3, step: 1, value: 1 },
      { id: "c", label: "c", min: -2, max: 3, step: 1, value: 0 },
      { id: "d", label: "d", min: -2, max: 3, step: 1, value: 1 },
      { id: "vx", label: "Vector x", min: -4, max: 4, step: 1, value: 1 },
      { id: "vy", label: "Vector y", min: -4, max: 4, step: 1, value: 2 }
    ],
    calculate(values) {
      const a = Number(values.a);
      const b = Number(values.b);
      const c = Number(values.c);
      const d = Number(values.d);
      const vx = Number(values.vx);
      const vy = Number(values.vy);
      const tx = a * vx + b * vy;
      const ty = c * vx + d * vy;
      const e1 = { x: a, y: c };
      const e2 = { x: b, y: d };
      return {
        metrics: [`T(e1) = (${a}, ${c})`, `T(e2) = (${b}, ${d})`, `T(v) = (${tx}, ${ty})`],
        exampleSteps: [
          `The first basis vector e1 = (1, 0) moves to (${a}, ${c}).`,
          `The second basis vector e2 = (0, 1) moves to (${b}, ${d}).`,
          `Your chosen vector is v = (${vx}, ${vy}).`,
          `Applying the transformation gives T(v) = (${tx}, ${ty}).`
        ],
        insight:
          `This matrix changes the basis directions to (${a}, ${c}) and (${b}, ${d}), so the whole space is being reshaped in that pattern.`,
        drawing: {
          type: "matrix",
          matrix: { a, b, c, d },
          v: { x: vx, y: vy },
          t: { x: tx, y: ty },
          e1,
          e2,
          showBasis: true
        }
      };
    }
  },
  {
    key: "basis",
    order: 5,
    stage: "Linear Algebra",
    difficulty: "Advanced Core",
    label: "Basis & Coordinates",
    navDescription: "Same vector, different descriptions.",
    subtitle:
      "This is where many exam questions stop being scary: a vector can stay the same while its coordinates change with the basis.",
    learningPurpose:
      "Understand basis vectors as the reference directions used to describe every other vector.",
    whyThisBefore:
      "Study this before eigendecomposition because diagonalization and change-of-basis ideas depend on reading vectors in different coordinate systems.",
    prerequisites: ["Vectors", "Linear Transformations"],
    mlPurpose:
      "Change of basis is the language behind diagonalization, PCA coordinates, and many representation-learning ideas in ML.",
    visualTitle: "See one vector described in a different basis.",
    visualDescription:
      "The teal arrow is the actual vector. The gold and olive arrows are the basis directions used to describe it.",
    beginnerNote:
      "A basis is just a set of building directions. Coordinates tell you how much of each building direction you need.",
    symbolGuide: [
      { symbol: "e1, e2", meaning: "Standard basis directions (1, 0) and (0, 1)." },
      { symbol: "b1, b2", meaning: "A different basis chosen for the same space." },
      { symbol: "v = c1b1 + c2b2", meaning: "The vector is built from basis vectors with coordinates c1 and c2." }
    ],
    simpleExplanation:
      "Coordinates are not the vector itself. They are just the instructions for rebuilding that vector from the chosen basis.",
    formula: "v = c1b1 + c2b2",
    formulaMeaning:
      "Meaning: use c1 copies of the first basis vector and c2 copies of the second basis vector to rebuild v.",
    mlUseCase:
      "Many ML methods become easier after moving data into a better basis, especially when directions become more informative or easier to separate.",
    intuition:
      "Ask: what building directions am I allowed to use, and how much of each one do I need?",
    examShortcuts: [
      "In standard basis, the coordinates are the usual x and y values.",
      "Same vector, different basis means the geometry stays the same but the coordinates can change.",
      "Solve for coordinates by writing the vector as a combination of the basis vectors."
    ],
    bigPicture:
      "This is the doorway to understanding change of basis, diagonalization, and why eigenvectors can simplify a transformation.",
    examReadiness: [
      "Read standard-basis coordinates instantly.",
      "Solve simple non-standard basis coordinate questions.",
      "Explain why coordinates depend on the basis choice."
    ],
    advancedExample: {
      title: "Coordinates of (2, 0) in the basis {(1, 1), (1, -1)}.",
      steps: [
        "Write (2, 0) = a(1, 1) + b(1, -1).",
        "That gives the system a + b = 2 and a - b = 0.",
        "Solve to get a = 1 and b = 1.",
        "So the coordinates in that basis are (1, 1)."
      ]
    },
    examQuestions: [
      {
        prompt: "What are the coordinates of (4, -2) in the standard basis {(1, 0), (0, 1)}?",
        answer: "(4, -2).",
        explanation: "In the standard basis, the coordinates are already the usual horizontal and vertical components.",
        steps: [
          "Standard basis uses e1 = (1, 0) and e2 = (0, 1).",
          "The vector already says how much of e1 and e2 you need.",
          "That is 4 copies of e1 and -2 copies of e2.",
          "So the coordinates are (4, -2)."
        ]
      },
      {
        prompt: "Why can the same vector have different coordinates in a different basis?",
        answer: "Because coordinates describe the vector relative to the chosen basis, not absolutely.",
        explanation: "Changing the basis changes the building directions, so the rebuilding instructions change too.",
        steps: [
          "Fix the geometric vector in space.",
          "Change the basis directions used to describe it.",
          "Recompute how much of each new basis vector is needed.",
          "The vector stays the same, but the coordinate description changes."
        ]
      }
    ],
    mcq: {
      question: "What changes when you switch to a different basis?",
      options: [
        "The coordinate description",
        "The actual geometric vector",
        "The dimension of the plane",
        "The meaning of addition"
      ],
      correctIndex: 0,
      explanation: "Correct. The vector stays the same, but its coordinates depend on the basis."
    },
    problem: {
      prompt: "In the basis {(1, 1), (1, -1)}, what are the coordinates of (2, 0)?",
      answers: ["(1,1)", "[1,1]", "1,1"],
      success: "Correct. (2, 0) = 1(1, 1) + 1(1, -1)."
    },
    conceptQuestion: {
      prompt: "Why is standard basis not the only valid basis?",
      answer:
        "Because any set of independent vectors that spans the space can be used as building directions."
    },
    controls: [
      { id: "vx", label: "Vector x", min: -4, max: 4, step: 1, value: 2 },
      { id: "vy", label: "Vector y", min: -4, max: 4, step: 1, value: 0 }
    ],
    calculate(values) {
      const vx = Number(values.vx);
      const vy = Number(values.vy);
      const c1 = (vx + vy) / 2;
      const c2 = (vx - vy) / 2;
      return {
        metrics: [
          `Vector = (${vx}, ${vy})`,
          `Std coords = (${vx}, ${vy})`,
          `Tilted basis coords = (${formatNumber(c1)}, ${formatNumber(c2)})`
        ],
        exampleSteps: [
          `Use the tilted basis b1 = (1, 1) and b2 = (1, -1).`,
          `Write (${vx}, ${vy}) = c1(1, 1) + c2(1, -1).`,
          `That gives c1 + c2 = ${vx} and c1 - c2 = ${vy}.`,
          `Solving gives c1 = ${formatNumber(c1)} and c2 = ${formatNumber(c2)}.`
        ],
        insight:
          `The vector stays (${vx}, ${vy}), but in the tilted basis its coordinates become (${formatNumber(c1)}, ${formatNumber(c2)}).`,
        drawing: {
          type: "basis",
          v: { x: vx, y: vy },
          b1: { x: 1, y: 1 },
          b2: { x: 1, y: -1 }
        }
      };
    }
  },
  {
    key: "composition",
    order: 6,
    stage: "Linear Algebra",
    difficulty: "Advanced Core",
    label: "Composition & Matrix Powers",
    navDescription: "Apply one transformation after another.",
    subtitle:
      "This is where transformations become processes: one map after another, or the same map repeated many times.",
    learningPurpose:
      "Understand that composition means stacking transformations, and matrix powers mean repeating the same one.",
    whyThisBefore:
      "Study this before eigendecomposition because one major use of diagonalization is making repeated matrix powers easier.",
    prerequisites: ["Matrices & Multiplication", "Linear Transformations"],
    mlPurpose:
      "Deep models compose many transformations, and repeated matrix action appears in iterative systems, graph methods, and dynamical updates.",
    visualTitle: "Repeat the same scaling transformation.",
    visualDescription:
      "The original vector is shown first, then the transformed vector after applying the same matrix multiple times.",
    beginnerNote:
      "Composition is just doing one operation and then feeding the result into the next one.",
    symbolGuide: [
      { symbol: "T2(T1(v))", meaning: "Apply T1 first, then apply T2 to the result." },
      { symbol: "(BA)v", meaning: "Matrix B acts after matrix A, so order matters." },
      { symbol: "A^n", meaning: "Apply the same matrix A repeatedly n times." }
    ],
    simpleExplanation:
      "Matrix composition is like a chain of filters. Matrix powers are the special case where the same filter is used again and again.",
    formula: "T2(T1(v)) = (BA)v",
    formulaMeaning:
      "Meaning: do A first, then B. Repeating the same transformation gives A^2, A^3, and so on.",
    mlUseCase:
      "Layered models, iterative optimization steps, and repeated transition rules all depend on composition.",
    intuition:
      "Ask: what happens after one step, and what keeps happening if I repeat the rule?",
    examShortcuts: [
      "Order matters: BA is usually not the same as AB.",
      "A^2 means A·A and A^3 means A·A·A.",
      "For a scaling matrix sI, repeating it n times gives s^n I."
    ],
    bigPicture:
      "Composition turns single transformations into systems. This is the linear algebra version of building a multi-step model.",
    examReadiness: [
      "Multiply two matrices in the right order.",
      "Compute simple matrix powers.",
      "Describe the geometric effect of repeated scaling."
    ],
    advancedExample: {
      title: "Scale first, then shear.",
      steps: [
        "Let A = [[2, 0], [0, 2]] and B = [[1, 1], [0, 1]].",
        "Apply A first to double the vector in every direction.",
        "Then apply B to shear the doubled output.",
        "That combined transformation is BA, not AB."
      ]
    },
    examQuestions: [
      {
        prompt: "If A = [[2, 0], [0, 2]], what are A^2 and A^3?",
        answer: "A^2 = [[4, 0], [0, 4]] and A^3 = [[8, 0], [0, 8]].",
        explanation: "Each multiplication doubles the scaling again, so the scale factor becomes 2^2 and 2^3.",
        steps: [
          "Recognize A as 2I.",
          "Square the scale factor to get A^2 = 4I.",
          "Cube the scale factor to get A^3 = 8I.",
          "Write those as diagonal matrices."
        ]
      },
      {
        prompt: "What is the geometric effect of applying A = [[2, 0], [0, 2]] three times?",
        answer: "Every vector is scaled by 8, so the whole space expands uniformly by a factor of 8.",
        explanation: "Each application doubles lengths, so three applications multiply lengths by 2 × 2 × 2.",
        steps: [
          "After one step, lengths double.",
          "After two steps, lengths are multiplied by 4.",
          "After three steps, lengths are multiplied by 8.",
          "The effect is uniform scaling by 8."
        ]
      }
    ],
    mcq: {
      question: "What does A^3 mean for a matrix A?",
      options: [
        "Apply A three times",
        "Add A to itself three times only",
        "Take the determinant three times",
        "Transpose A and multiply once"
      ],
      correctIndex: 0,
      explanation: "Correct. A^3 means A·A·A, so the same transformation is applied three times."
    },
    problem: {
      prompt: "If A = [[2, 0], [0, 2]] and v = (1, 1), what is A^3v?",
      answers: ["(8,8)", "[8,8]", "8,8"],
      success: "Correct. A^3 = 8I, so A^3(1, 1) = (8, 8)."
    },
    conceptQuestion: {
      prompt: "Why does order matter in composition?",
      answer:
        "Because the output of the first transformation becomes the input of the second, so switching the order usually changes the final result."
    },
    controls: [
      { id: "scale", label: "Scale factor", min: 1, max: 3, step: 0.5, value: 2 },
      { id: "power", label: "Repeat count", min: 1, max: 3, step: 1, value: 2 },
      { id: "vx", label: "Vector x", min: -3, max: 3, step: 1, value: 1 },
      { id: "vy", label: "Vector y", min: -3, max: 3, step: 1, value: 1 }
    ],
    calculate(values) {
      const scale = Number(values.scale);
      const power = Number(values.power);
      const vx = Number(values.vx);
      const vy = Number(values.vy);
      const totalScale = scale ** power;
      const tx = totalScale * vx;
      const ty = totalScale * vy;
      return {
        metrics: [
          `A = ${formatNumber(scale)}I`,
          `A^${power} scale = ${formatNumber(totalScale)}`,
          `A^${power}v = (${formatNumber(tx)}, ${formatNumber(ty)})`
        ],
        exampleSteps: [
          `Start with A = ${formatNumber(scale)}I, so one application scales every vector by ${formatNumber(scale)}.`,
          `Repeating A ${power} times gives A^${power} = ${formatNumber(totalScale)}I.`,
          `Apply that to v = (${vx}, ${vy}).`,
          `So the final output is (${formatNumber(tx)}, ${formatNumber(ty)}).`
        ],
        insight:
          `Repeating a scaling matrix multiplies the scale factor, so ${formatNumber(scale)} used ${power} times becomes ${formatNumber(totalScale)}.`,
        drawing: {
          type: "matrix",
          matrix: { a: totalScale, b: 0, c: 0, d: totalScale },
          v: { x: vx, y: vy },
          t: { x: tx, y: ty },
          e1: { x: totalScale, y: 0 },
          e2: { x: 0, y: totalScale },
          showBasis: true
        }
      };
    }
  },
  {
    key: "inverse-spaces",
    order: 7,
    stage: "Linear Algebra",
    difficulty: "Advanced Core",
    label: "Inverse, Rank & Spaces",
    navDescription: "Know when a matrix loses information.",
    subtitle:
      "This topic ties together invertibility, rank, column space, and null space into one exam-ready picture.",
    learningPurpose:
      "Understand how a matrix can preserve information, collapse information, or fail to reverse cleanly.",
    whyThisBefore:
      "Study this before advanced eigendecomposition questions because invertibility and rank tell you what a matrix can and cannot do.",
    prerequisites: ["Matrices & Multiplication", "Linear Transformations", "Basis & Coordinates"],
    mlPurpose:
      "Rank and invertibility matter for solving systems, understanding feature redundancy, and seeing when a transformation throws information away.",
    visualTitle: "Change the matrix and watch whether space collapses.",
    visualDescription:
      "The basis vectors show whether the transformation keeps two independent directions or crushes them into fewer directions.",
    beginnerNote:
      "If a matrix crushes the plane onto a line, you cannot recover the original input uniquely. That is the heart of inverse and null-space intuition.",
    symbolGuide: [
      { symbol: "A^-1", meaning: "The inverse matrix, if it exists." },
      { symbol: "rank(A)", meaning: "How many independent output directions remain." },
      { symbol: "Null(A)", meaning: "Inputs sent to zero by A." }
    ],
    simpleExplanation:
      "An inverse exists when the matrix does not lose information. Rank tells how many independent directions survive. Null space tells which directions get crushed away.",
    formula: "det(A) ≠ 0 => A is invertible",
    formulaMeaning:
      "Meaning: for a 2 × 2 matrix, nonzero determinant means the transformation keeps two independent directions and can be reversed.",
    mlUseCase:
      "This helps explain why redundant features, collapsed dimensions, and singular covariance-like matrices are important in ML.",
    intuition:
      "Ask: does this matrix keep the space full, or does it flatten some directions away?",
    examShortcuts: [
      "det ≠ 0 means inverse exists for 2 × 2 matrices.",
      "rank 2 means full 2D output, rank 1 means collapse to a line, rank 0 means zero map.",
      "Nontrivial null space means some nonzero vectors are sent to zero."
    ],
    bigPicture:
      "This lesson explains when a transformation preserves information and when it destroys it.",
    examReadiness: [
      "Check invertibility quickly in 2 × 2 cases.",
      "Interpret rank geometrically.",
      "Explain column space and null space in plain language."
    ],
    advancedExample: {
      title: "Full rank versus collapsed rank.",
      steps: [
        "If A = [[1, 0], [0, 1]], the columns stay independent and rank is 2.",
        "If A = [[1, 2], [2, 4]], the second column is a multiple of the first.",
        "That means the output directions collapse to one line, so rank is 1.",
        "A collapsed direction creates a nontrivial null space and destroys invertibility."
      ]
    },
    examQuestions: [
      {
        prompt: "What does it mean geometrically if rank(A) = 1 for a 2 × 2 matrix?",
        answer: "The transformation collapses the plane onto a line.",
        explanation: "Only one independent output direction survives, so the full 2D space is no longer preserved.",
        steps: [
          "Start in a 2D input space.",
          "Ask how many independent output directions remain.",
          "If only one remains, all outputs lie on one line.",
          "That is geometric rank 1."
        ]
      },
      {
        prompt: "Why does a nontrivial null space block invertibility?",
        answer: "Because different inputs can map to the same output, especially zero, so you cannot reverse the transformation uniquely.",
        explanation: "An inverse needs one output to come from exactly one input.",
        steps: [
          "Suppose some nonzero vector v satisfies Av = 0.",
          "But the zero vector also maps to 0.",
          "So two different inputs give the same output.",
          "That destroys one-to-one reversibility."
        ]
      }
    ],
    mcq: {
      question: "What does a nonzero determinant suggest for a 2 × 2 matrix?",
      options: [
        "The matrix is invertible",
        "The matrix is zero",
        "The matrix has rank 0",
        "The null space is the whole plane"
      ],
      correctIndex: 0,
      explanation: "Correct. In 2D, nonzero determinant means the transformation does not collapse area and is invertible."
    },
    problem: {
      prompt: "If A = [[1, 0], [0, 1]], what is rank(A)?",
      answers: ["2"],
      success: "Correct. The identity keeps both independent directions, so rank(A) = 2."
    },
    conceptQuestion: {
      prompt: "What is the plain-language difference between column space and null space?",
      answer:
        "Column space is what outputs the matrix can create. Null space is which input directions disappear to zero."
    },
    controls: [
      { id: "a", label: "a", min: -2, max: 3, step: 1, value: 1 },
      { id: "b", label: "b", min: -2, max: 3, step: 1, value: 0 },
      { id: "c", label: "c", min: -2, max: 3, step: 1, value: 0 },
      { id: "d", label: "d", min: -2, max: 3, step: 1, value: 1 }
    ],
    calculate(values) {
      const a = Number(values.a);
      const b = Number(values.b);
      const c = Number(values.c);
      const d = Number(values.d);
      const det = a * d - b * c;
      const isZero = a === 0 && b === 0 && c === 0 && d === 0;
      const rank = isZero ? 0 : det !== 0 ? 2 : 1;
      const invertible = det !== 0;
      const e1 = { x: a, y: c };
      const e2 = { x: b, y: d };
      return {
        metrics: [
          `det = ${formatNumber(det)}`,
          `rank ≈ ${rank}`,
          invertible ? "Inverse exists" : "Not invertible"
        ],
        exampleSteps: [
          `Read the columns as (${a}, ${c}) and (${b}, ${d}).`,
          `Compute det = ${a}×${d} - ${b}×${c} = ${formatNumber(det)}.`,
          invertible
            ? "Because the determinant is nonzero, the columns stay independent and the matrix is invertible."
            : rank === 1
              ? "Because the determinant is zero but the matrix is not all zero, the columns collapse to one direction and rank is 1."
              : "All entries are zero, so the output is always zero and rank is 0.",
          `That means the current matrix has rank ${rank}.`
        ],
        insight:
          invertible
            ? "Both directions survive independently, so the transformation keeps full 2D information."
            : "At least one direction is being crushed away, so some information is lost.",
        drawing: {
          type: "matrix",
          matrix: { a, b, c, d },
          v: { x: 1, y: 1 },
          t: { x: a + b, y: c + d },
          e1,
          e2,
          showBasis: true
        }
      };
    }
  },
  {
    key: "dot",
    order: 8,
    stage: "Linear Algebra",
    difficulty: "Core",
    label: "Dot Product",
    navDescription: "One score for alignment.",
    subtitle:
      "This is where vector geometry becomes useful for similarity, relevance, and matching.",
    learningPurpose:
      "Learn how one number can summarize whether two directions support each other.",
    whyThisBefore:
      "Study this before probability models and regression because similarity and weighted sums are everywhere in ML.",
    prerequisites: ["Vectors"],
    mlPurpose:
      "Recommendations, search, embeddings, and attention-like scoring rely heavily on dot products.",
    visualTitle: "Rotate one vector against another.",
    visualDescription:
      "When the vectors line up, the score grows. When they go sideways, it shrinks to zero. When they oppose each other, it goes negative.",
    beginnerNote:
      "Forget the symbol for a moment. Dot product is just a score for directional agreement.",
    symbolGuide: [
      { symbol: "·", meaning: "Dot product, not ordinary multiplication." },
      { symbol: "≈", meaning: "Approximately equal." },
      { symbol: "0", meaning: "A score of zero means the vectors are sideways to each other." }
    ],
    simpleExplanation:
      "Imagine two people pushing the same object. The dot product measures how much one push helps in the direction of the other push.",
    formula: "A · B = x1x2 + y1y2",
    formulaMeaning:
      "Meaning: multiply matching coordinates and add them to get one alignment score.",
    mlUseCase:
      "Similarity search and recommendation systems often compare vectors with a dot product because it turns many coordinates into one useful score.",
    intuition:
      "Ask: are these two directions helping each other, ignoring each other, or fighting each other?",
    examShortcuts: [
      "Dot > 0 means mostly same direction.",
      "Dot = 0 means perpendicular.",
      "Dot < 0 means mostly opposite direction."
    ],
    bigPicture:
      "Dot product is one of the fastest bridges into real ML because it powers similarity, scoring, and many linear-model calculations.",
    examReadiness: [
      "Compute a dot product quickly.",
      "Interpret positive, zero, and negative values.",
      "Connect dot product to angle and alignment."
    ],
    mcq: {
      question: "What does a negative dot product usually mean?",
      options: [
        "The vectors point against each other",
        "The vectors are identical",
        "The vectors are perpendicular",
        "The vectors have no length"
      ],
      correctIndex: 0,
      explanation: "Correct. A negative score means the directions oppose each other overall."
    },
    problem: {
      prompt: "If A = (1, 2) and B = (3, 4), what is A · B?",
      answers: ["11"],
      success: "Correct. 1×3 + 2×4 = 11."
    },
    conceptQuestion: {
      prompt: "Why is dot product useful even in very high dimensions?",
      answer:
        "Because it compresses many coordinate comparisons into one number that still reflects overall alignment."
    },
    controls: [
      { id: "ax", label: "A horizontal", min: -6, max: 6, step: 1, value: 4 },
      { id: "ay", label: "A vertical", min: -6, max: 6, step: 1, value: 2 },
      { id: "bmag", label: "B length", min: 1, max: 8, step: 0.5, value: 5 },
      { id: "bangle", label: "B angle", min: 0, max: 360, step: 5, value: 35 }
    ],
    calculate(values) {
      const ax = Number(values.ax);
      const ay = Number(values.ay);
      const bmag = Number(values.bmag);
      const angleDeg = Number(values.bangle);
      const angleRad = (angleDeg * Math.PI) / 180;
      const bx = bmag * Math.cos(angleRad);
      const by = bmag * Math.sin(angleRad);
      const dot = ax * bx + ay * by;
      const magA = Math.hypot(ax, ay);
      const magB = Math.hypot(bx, by);
      const cosTheta = magA === 0 || magB === 0 ? 0 : clamp(dot / (magA * magB), -1, 1);
      const betweenDeg = Math.round((Math.acos(cosTheta) * 180) / Math.PI);
      return {
        metrics: [`A · B = ${formatNumber(dot)}`, `Angle ≈ ${betweenDeg}°`, alignmentLabel(dot)],
        exampleSteps: [
          `Write A = (${ax}, ${ay}).`,
          `Read B from the graph as about (${formatNumber(bx)}, ${formatNumber(by)}).`,
          `Multiply matching parts and add them together.`,
          `The final dot product is about ${formatNumber(dot)}.`
        ],
        insight:
          dot > 0
            ? "These vectors are helping each other overall."
            : dot < 0
              ? "These vectors are pushing against each other overall."
              : "These vectors are sideways to each other, so the help is zero.",
        drawing: {
          type: "dot",
          a: { x: ax, y: ay },
          b: { x: bx, y: by }
        }
      };
    }
  },
  {
    key: "derivatives",
    order: 6,
    stage: "Calculus",
    difficulty: "Core",
    label: "Derivatives",
    navDescription: "How fast a function is changing.",
    subtitle:
      "Calculus starts to matter when you stop asking for a value and start asking how that value changes.",
    learningPurpose:
      "Understand slope as a local rate of change rather than a memorized symbol.",
    whyThisBefore:
      "Study derivatives before multivariable calculus because gradients are built from partial derivatives.",
    prerequisites: ["Functions & Graphs"],
    mlPurpose:
      "Training a model means moving parameters in directions that reduce loss, and derivatives tell you which direction helps.",
    visualTitle: "Move the point and watch the tangent slope change.",
    visualDescription:
      "The curve stays fixed while the tangent line changes at your selected point. That slope is the derivative there.",
    beginnerNote:
      "A derivative is not just a formula trick. It is the best local answer to: how steep is the graph right here?",
    symbolGuide: [
      { symbol: "f'(x)", meaning: "Derivative of f at x, the local slope." },
      { symbol: "tangent", meaning: "A line that just touches the curve at the chosen point locally." },
      { symbol: "slope", meaning: "How much y changes when x changes a little." }
    ],
    simpleExplanation:
      "The derivative is the steepness of a graph at one exact point.",
    formula: "f'(x) = slope of the tangent line",
    formulaMeaning:
      "Meaning: it tells you how fast the output is changing right now, not on average over a big interval.",
    mlUseCase:
      "Loss minimization uses derivatives to decide whether a parameter should increase or decrease.",
    intuition:
      "Ask: if I move a tiny bit to the right, does the output rise, fall, or stay flat?",
    examShortcuts: [
      "Positive derivative means increasing.",
      "Negative derivative means decreasing.",
      "Derivative near zero means locally flat."
    ],
    bigPicture:
      "Derivatives are the first step from static formulas to learning dynamics. This is where optimization begins.",
    examReadiness: [
      "Connect derivative sign to graph behavior.",
      "Recognize flat points and steep points.",
      "Compute simple derivatives like x^2 -> 2x."
    ],
    mcq: {
      question: "If the derivative at a point is negative, what does that mean nearby?",
      options: [
        "The function is falling as x increases",
        "The function is always below zero",
        "The function is constant",
        "The function is undefined everywhere"
      ],
      correctIndex: 0,
      explanation: "Correct. A negative derivative means the graph is decreasing locally."
    },
    problem: {
      prompt: "If f(x) = x², what is f'(3)?",
      answers: ["6"],
      success: "Correct. For f(x) = x², the derivative is 2x, so at x = 3 the slope is 6."
    },
    conceptQuestion: {
      prompt: "Why is local slope enough to help training?",
      answer:
        "Because optimization usually moves in many small steps, and each step only needs local information about whether loss goes up or down."
    },
    controls: [{ id: "x0", label: "Point x", min: -4, max: 8, step: 0.5, value: 2 }],
    calculate(values) {
      const x0 = Number(values.x0);
      const y0 = curveValue(x0);
      const slope = curveSlope(x0);
      return {
        metrics: [`x = ${formatNumber(x0)}`, `f(x) ≈ ${formatNumber(y0)}`, `Slope ≈ ${formatNumber(slope)}`],
        exampleSteps: [
          `Pick the point x = ${formatNumber(x0)} on the curve.`,
          `Read the function value there: about ${formatNumber(y0)}.`,
          `The tangent line at that point has slope about ${formatNumber(slope)}.`,
          `That slope is the derivative at x = ${formatNumber(x0)}.`
        ],
        insight:
          slope > 0
            ? "The function is increasing at this point."
            : slope < 0
              ? "The function is decreasing at this point."
              : "The graph is locally flat at this point.",
        drawing: {
          type: "curve",
          x0,
          y0,
          slope
        }
      };
    }
  },
  {
    key: "multivariable",
    order: 7,
    stage: "Calculus",
    difficulty: "Advanced Core",
    label: "Multivariable Calculus",
    navDescription: "Gradients for functions with many inputs.",
    subtitle:
      "ML losses depend on many parameters, so one-variable calculus is not enough. You need gradients.",
    learningPurpose:
      "Understand the gradient as the direction of steepest increase for a function of many variables.",
    whyThisBefore:
      "Study this before serious optimization or neural networks because backpropagation is built on multivariable derivatives.",
    prerequisites: ["Functions & Graphs", "Derivatives", "Vectors"],
    mlPurpose:
      "Real models have many parameters. The gradient tells you how each parameter affects loss and where to move next.",
    visualTitle: "Move the point on the contour plot.",
    visualDescription:
      "The circles are level sets of the function. The arrow shows the gradient at the chosen point.",
    beginnerNote:
      "The gradient is just the many-variable version of slope. Instead of one slope number, you get a direction vector.",
    symbolGuide: [
      { symbol: "∂f/∂x", meaning: "Partial derivative with respect to x." },
      { symbol: "∂f/∂y", meaning: "Partial derivative with respect to y." },
      { symbol: "∇f", meaning: "The gradient vector, collecting the partial derivatives." }
    ],
    simpleExplanation:
      "When a function depends on many inputs, the gradient tells you the uphill direction and how steep that uphill direction is.",
    formula: "∇f = (∂f/∂x, ∂f/∂y)",
    formulaMeaning:
      "Meaning: the gradient is a vector made from the partial derivatives.",
    mlUseCase:
      "Gradient descent and backpropagation use the gradient to update model weights.",
    intuition:
      "Ask: if I stand on this landscape, which direction is steepest uphill?",
    examShortcuts: [
      "Gradient points uphill.",
      "Negative gradient points downhill.",
      "At minima, gradients are often near zero."
    ],
    bigPicture:
      "This is one of the most important math ideas in ML. If you understand gradients, training algorithms stop feeling mysterious.",
    examReadiness: [
      "Compute simple gradients like for x² + y².",
      "Interpret gradient direction geometrically.",
      "Know why negative gradient is used for minimization."
    ],
    mcq: {
      question: "What does the negative gradient point toward?",
      options: [
        "Steepest decrease",
        "Steepest increase",
        "A random direction",
        "Always the x-axis"
      ],
      correctIndex: 0,
      explanation: "Correct. The gradient points uphill, so the negative gradient points downhill."
    },
    problem: {
      prompt: "For f(x, y) = x² + y², what is ∇f at (1, 2)?",
      answers: ["(2,4)", "[2,4]", "2,4"],
      success: "Correct. The gradient is (2x, 2y), so at (1, 2) it is (2, 4)."
    },
    conceptQuestion: {
      prompt: "Why is the gradient a vector instead of a single number?",
      answer:
        "Because with many inputs, the function can change differently in different directions, so you need a full direction-and-size answer."
    },
    controls: [
      { id: "px", label: "Point x", min: -4, max: 4, step: 1, value: 2 },
      { id: "py", label: "Point y", min: -4, max: 4, step: 1, value: 1 }
    ],
    calculate(values) {
      const px = Number(values.px);
      const py = Number(values.py);
      const gx = 2 * px;
      const gy = 2 * py;
      const value = px * px + py * py;
      return {
        metrics: [`Point = (${px}, ${py})`, `f ≈ ${formatNumber(value)}`, `∇f = (${gx}, ${gy})`],
        exampleSteps: [
          `Start with f(x, y) = x² + y².`,
          `Differentiate with respect to x to get 2x.`,
          `Differentiate with respect to y to get 2y.`,
          `At (${px}, ${py}), the gradient is (${gx}, ${gy}).`
        ],
        insight:
          `The gradient arrow points away from the center because this bowl-shaped function increases as you move outward.`,
        drawing: {
          type: "contour",
          point: { x: px, y: py },
          gradient: { x: gx, y: gy }
        }
      };
    }
  },
  {
    key: "vector-valued",
    order: 14,
    stage: "Calculus",
    difficulty: "Advanced Core",
    label: "Vector-Valued Functions",
    navDescription: "Functions whose output is a vector.",
    subtitle:
      "Instead of outputting one number, these functions output a whole vector. That makes them ideal for describing paths and motion.",
    learningPurpose:
      "Understand that one input can trace a full path when the output is a vector of coordinates.",
    whyThisBefore:
      "Study this after multivariable calculus because gradients, trajectories, and many ML embeddings involve vector outputs instead of single numbers.",
    prerequisites: ["Functions & Graphs", "Vectors", "Multivariable Calculus"],
    mlPurpose:
      "Vector-valued functions appear in trajectories, embeddings, feature maps, and any model that outputs multiple coordinates together.",
    visualTitle: "Trace a vector-valued path as t changes.",
    visualDescription:
      "The curve is the full path. The highlighted point and arrow show the output vector at one chosen input value t.",
    beginnerNote:
      "A vector-valued function is still one rule. The only difference is that the output is a vector instead of one number.",
    symbolGuide: [
      { symbol: "r(t)", meaning: "A vector-valued function of t." },
      { symbol: "(x(t), y(t))", meaning: "The output has coordinate functions." },
      { symbol: "t", meaning: "The input parameter that moves you along the path." }
    ],
    simpleExplanation:
      "A vector-valued function tells you where you are on a path for each input value t.",
    formula: "r(t) = (x(t), y(t))",
    formulaMeaning:
      "Meaning: the horizontal and vertical coordinates both depend on the same input t.",
    mlUseCase:
      "This matters whenever a system outputs multiple related values together, such as coordinates, trajectories, or high-dimensional embeddings.",
    intuition:
      "Ask: as t changes, where does the output vector move in space?",
    examShortcuts: [
      "One input, many coordinated outputs.",
      "Plug t into each component separately.",
      "The full function traces a path, not just one number line."
    ],
    bigPicture:
      "Vector-valued functions connect ordinary functions to motion, geometry, and higher-dimensional model outputs.",
    examReadiness: [
      "Evaluate a vector-valued function at a specific t.",
      "Explain the difference between scalar output and vector output.",
      "Interpret a path traced by a parameter."
    ],
    advancedExample: {
      title: "Evaluate and interpret r(t) = (t, t^2).",
      steps: [
        "At t = 2, the output is (2, 4).",
        "At t = -1, the output is (-1, 1).",
        "As t changes, the outputs trace a parabola in the plane.",
        "This shows how one parameter can control an entire geometric path."
      ]
    },
    examQuestions: [
      {
        prompt: "What is the output of r(t) = (t, t^2) at t = 3?",
        answer: "(3, 9).",
        explanation: "Plug the same t-value into both components.",
        steps: [
          "Take the first component x(t) = t and substitute t = 3 to get 3.",
          "Take the second component y(t) = t^2 and substitute t = 3 to get 9.",
          "Combine the component outputs.",
          "So r(3) = (3, 9)."
        ]
      },
      {
        prompt: "Why is a vector-valued function more than just two separate functions?",
        answer: "Because the components are tied together by the same input parameter and jointly describe one path or output object.",
        explanation: "The power comes from coordinating the outputs, not just listing them separately.",
        steps: [
          "Notice one parameter feeds every component.",
          "Each component changes together as that parameter moves.",
          "The combined output is a vector or path point.",
          "So the object is one coordinated function."
        ]
      }
    ],
    mcq: {
      question: "What is different about a vector-valued function compared with an ordinary scalar-valued function?",
      options: [
        "Its output is a vector instead of one number",
        "It has no input",
        "It cannot be graphed",
        "It is always linear"
      ],
      correctIndex: 0,
      explanation: "Correct. The main change is that the output has multiple coordinates together."
    },
    problem: {
      prompt: "If r(t) = (t, t²), what is r(2)?",
      answers: ["(2,4)", "[2,4]", "2,4"],
      success: "Correct. Plug t = 2 into both components to get (2, 4)."
    },
    conceptQuestion: {
      prompt: "Why are vector-valued functions useful?",
      answer:
        "Because one changing input can control a full multi-coordinate output, which is perfect for paths, geometry, and multi-output systems."
    },
    controls: [{ id: "t", label: "Parameter t", min: 0, max: 6.25, step: 0.25, value: 1 }],
    calculate(values) {
      const t = Number(values.t);
      const x = Math.cos(t);
      const y = Math.sin(t);
      return {
        metrics: [`t = ${formatNumber(t)}`, `x(t) ≈ ${formatNumber(x)}`, `y(t) ≈ ${formatNumber(y)}`],
        exampleSteps: [
          `Take r(t) = (cos t, sin t).`,
          `At t = ${formatNumber(t)}, compute cos t ≈ ${formatNumber(x)}.`,
          `Then compute sin t ≈ ${formatNumber(y)}.`,
          `So r(${formatNumber(t)}) ≈ (${formatNumber(x)}, ${formatNumber(y)}).`
        ],
        insight:
          "As t moves, the output vector traces a circle. The vector-valued function is describing a path, not just one value.",
        drawing: {
          type: "parametric",
          t,
          x,
          y
        }
      };
    }
  },
  {
    key: "probability",
    order: 8,
    stage: "Probability",
    difficulty: "Core",
    label: "Probability Basics",
    navDescription: "A language for uncertainty.",
    subtitle:
      "Probability helps you reason when outcomes are not known yet but still have structure.",
    learningPurpose:
      "Stop treating uncertainty as hand-wavy and start treating it as something you can calculate.",
    whyThisBefore:
      "Study probability before statistics because statistics builds on probabilistic thinking about data and uncertainty.",
    prerequisites: ["Functions & Graphs"],
    mlPurpose:
      "Classification scores, likelihoods, model confidence, and Bayesian ideas all depend on probability.",
    visualTitle: "Change the chance of heads.",
    visualDescription:
      "The bars show how probability mass moves between heads and tails as you change p.",
    beginnerNote:
      "Probability is not just guessing. It is a careful way to describe uncertainty before the result is observed.",
    symbolGuide: [
      { symbol: "P(A)", meaning: "Probability of event A." },
      { symbol: "0 ≤ P(A) ≤ 1", meaning: "Probabilities must stay between 0 and 1." },
      { symbol: "1 - p", meaning: "The remaining probability after p is taken away from the whole 1." }
    ],
    simpleExplanation:
      "Probability measures how likely something is, on a scale from impossible to certain.",
    formula: "P(tails) = 1 - P(heads)",
    formulaMeaning:
      "Meaning: if heads and tails are the only outcomes, their probabilities must add up to 1.",
    mlUseCase:
      "A model that says 'spam probability = 0.9' is making a probabilistic statement about uncertainty.",
    intuition:
      "Ask: how much of my belief goes to this event, and how much must be left for the alternatives?",
    examShortcuts: [
      "Probabilities must lie between 0 and 1.",
      "Mutually exclusive full outcomes add to 1.",
      "A larger probability means a more likely event, not a guaranteed one."
    ],
    bigPicture:
      "Probability gives ML a disciplined way to talk about uncertainty instead of pretending every prediction is certain.",
    examReadiness: [
      "Check whether a stated probability is valid.",
      "Use complements quickly.",
      "Interpret model confidence without overreading it."
    ],
    mcq: {
      question: "Which value cannot be a probability?",
      options: ["0.2", "0.75", "1.2", "0"],
      correctIndex: 2,
      explanation: "Correct. A probability cannot be larger than 1."
    },
    problem: {
      prompt: "If P(heads) = 0.7, what is P(tails)?",
      answers: ["0.3", ".3"],
      success: "Correct. With only two outcomes, tails gets the remaining probability: 1 - 0.7 = 0.3."
    },
    conceptQuestion: {
      prompt: "Why is probability useful in ML instead of just a yes/no label?",
      answer:
        "Because real predictions often involve uncertainty, and probability lets a model express confidence instead of pretending it is always sure."
    },
    controls: [{ id: "p", label: "P(heads)", min: 0.05, max: 0.95, step: 0.05, value: 0.7 }],
    calculate(values) {
      const p = Number(values.p);
      const q = 1 - p;
      return {
        metrics: [`P(heads) = ${formatNumber(p)}`, `P(tails) = ${formatNumber(q)}`, `Total = ${formatNumber(p + q)}`],
        exampleSteps: [
          `Start with P(heads) = ${formatNumber(p)}.`,
          `Heads and tails are the only outcomes, so the total must be 1.`,
          `Subtract from 1: 1 - ${formatNumber(p)} = ${formatNumber(q)}.`,
          `So P(tails) = ${formatNumber(q)}.`
        ],
        insight:
          p > 0.5
            ? "The coin is biased toward heads in this model."
            : p < 0.5
              ? "The coin is biased toward tails in this model."
              : "This is a fair coin model.",
        drawing: {
          type: "probability",
          p,
          q
        }
      };
    }
  },
  {
    key: "random-variables",
    order: 16,
    stage: "Probability",
    difficulty: "Core",
    label: "Random Variables & Expected Value",
    navDescription: "Turn uncertain outcomes into numbers.",
    subtitle:
      "This is where probability becomes more useful: outcomes are mapped to numbers, and expected value tells you the long-run average.",
    learningPurpose:
      "Understand what a random variable is and why expected value is a weighted average, not a guaranteed outcome.",
    whyThisBefore:
      "Study this before binomial and advanced distributions because those topics are all built from random-variable thinking.",
    prerequisites: ["Probability Basics"],
    mlPurpose:
      "Expected value and random variables appear in losses, probabilistic models, reward functions, and uncertainty calculations.",
    visualTitle: "See a simple discrete random variable and its average value.",
    visualDescription:
      "The bars show the probabilities of X = 0 and X = 1, and the vertical line marks the expected value.",
    beginnerNote:
      "A random variable is not a random number appearing from nowhere. It is a rule that assigns a number to each outcome.",
    symbolGuide: [
      { symbol: "X", meaning: "A random variable." },
      { symbol: "P(X = x)", meaning: "Probability that X takes value x." },
      { symbol: "E[X]", meaning: "Expected value, the probability-weighted average." }
    ],
    simpleExplanation:
      "A random variable assigns numbers to uncertain outcomes. Expected value tells you the average value you would expect over many repeats.",
    formula: "E[X] = Σ x P(X = x)",
    formulaMeaning:
      "Meaning: multiply each possible value by its probability and add the results.",
    mlUseCase:
      "Expected value appears in expected loss, expected reward, and many probability-based model calculations.",
    intuition:
      "Ask: if I repeated this many times, what average number would I keep seeing?",
    examShortcuts: [
      "Expected value is a weighted average.",
      "Expected value does not need to be one of the actual outcomes.",
      "A random variable is a function from outcomes to numbers."
    ],
    bigPicture:
      "This is the step from basic chance language into the real machinery of probability and statistics.",
    examReadiness: [
      "Identify a random variable from a story.",
      "Compute simple expected values.",
      "Explain why expectation is an average, not a guaranteed result."
    ],
    advancedExample: {
      title: "Expected value of a Bernoulli random variable.",
      steps: [
        "Let X = 1 for success and X = 0 for failure.",
        "Suppose P(X = 1) = p and P(X = 0) = 1 - p.",
        "Then E[X] = 1·p + 0·(1 - p) = p.",
        "So the expected value equals the success probability."
      ]
    },
    examQuestions: [
      {
        prompt: "If X takes values 0 and 1 with probabilities 0.3 and 0.7, what is E[X]?",
        answer: "0.7.",
        explanation: "This is the Bernoulli weighted average: 0·0.3 + 1·0.7.",
        steps: [
          "Write E[X] = Σ xP(X = x).",
          "Multiply 0 by 0.3.",
          "Multiply 1 by 0.7.",
          "Add to get 0.7."
        ]
      },
      {
        prompt: "Why can expected value be different from the most likely outcome?",
        answer: "Because expectation averages all outcomes using their probabilities, instead of choosing the single most likely one.",
        explanation: "Expectation summarizes the long-run average, not the most common single event.",
        steps: [
          "List all outcomes and probabilities.",
          "Weight every outcome by its probability.",
          "Average across the whole distribution.",
          "Compare that with just picking the most likely outcome."
        ]
      }
    ],
    mcq: {
      question: "What does expected value represent best?",
      options: [
        "The long-run weighted average",
        "The guaranteed outcome",
        "The largest outcome only",
        "The number of trials"
      ],
      correctIndex: 0,
      explanation: "Correct. Expected value is the probability-weighted average over many repeats."
    },
    problem: {
      prompt: "If X = 1 with probability 0.7 and X = 0 with probability 0.3, what is E[X]?",
      answers: ["0.7", ".7"],
      success: "Correct. E[X] = 1·0.7 + 0·0.3 = 0.7."
    },
    conceptQuestion: {
      prompt: "Why is expected value useful even if that exact number never occurs in one trial?",
      answer:
        "Because it summarizes the average behavior of the random variable across many repetitions."
    },
    controls: [{ id: "p", label: "P(X = 1)", min: 0.05, max: 0.95, step: 0.05, value: 0.6 }],
    calculate(values) {
      const p = Number(values.p);
      const expectation = p;
      const variance = p * (1 - p);
      return {
        metrics: [`P(X = 1) = ${formatNumber(p)}`, `E[X] = ${formatNumber(expectation)}`, `Var(X) ≈ ${formatNumber(variance)}`],
        exampleSteps: [
          "Treat X as a Bernoulli random variable taking values 0 and 1.",
          `Write E[X] = 0·${formatNumber(1 - p)} + 1·${formatNumber(p)}.`,
          `That simplifies to ${formatNumber(p)}.`,
          `So the expected value is ${formatNumber(expectation)}.`
        ],
        insight:
          "The expected value moves with the success probability because the long-run average reward goes up as success becomes more likely.",
        drawing: {
          type: "discreteRV",
          p
        }
      };
    }
  },
  {
    key: "binomial",
    order: 17,
    stage: "Probability",
    difficulty: "Advanced Core",
    label: "Binomial & Cumulative Probability",
    navDescription: "Count successes across repeated trials.",
    subtitle:
      "This is the standard exam topic for repeated yes/no experiments and cumulative chance questions.",
    learningPurpose:
      "Understand how binomial probability models repeated independent trials and how cumulative probability adds ranges of outcomes.",
    whyThisBefore:
      "Study this after random variables because the binomial distribution is a structured random variable counting successes.",
    prerequisites: ["Probability Basics", "Random Variables & Expected Value"],
    mlPurpose:
      "Binomial-style reasoning appears whenever you count repeated successes, estimate event frequencies, or reason about classification outcomes over many trials.",
    visualTitle: "See the binomial bars and cumulative probability together.",
    visualDescription:
      "The bars show the probability of each possible number of successes. The highlighted bars are the cumulative probability up to k.",
    beginnerNote:
      "Binomial does not mean 'hard formula first'. It means repeated trials with the same success probability and a count of how many successes happened.",
    symbolGuide: [
      { symbol: "X ~ Bin(n, p)", meaning: "X counts successes in n independent trials with success chance p." },
      { symbol: "P(X = x)", meaning: "Probability of exactly x successes." },
      { symbol: "P(X ≤ k)", meaning: "Cumulative probability up to k successes." }
    ],
    simpleExplanation:
      "A binomial random variable counts how many successes happen in a fixed number of repeated yes/no trials.",
    formula: "P(X = x) = nCx p^x (1 - p)^(n - x)",
    formulaMeaning:
      "Meaning: choose which trials succeed, then multiply by the probability pattern for that number of successes and failures.",
    mlUseCase:
      "This helps when reasoning about repeated classification successes, sampling behavior, and confidence across repeated events.",
    intuition:
      "Ask: how likely is exactly x successes, and how likely is up to or at least some threshold of successes?",
    examShortcuts: [
      "Exactly means one binomial term.",
      "Cumulative means add multiple terms.",
      "Check that trials are independent and success probability stays the same."
    ],
    bigPicture:
      "This lesson turns raw repeated-trial questions into a clean probability model you can solve systematically.",
    examReadiness: [
      "Recognize binomial setups quickly.",
      "Compute an exact binomial probability.",
      "Compute a cumulative probability by summing relevant bars."
    ],
    advancedExample: {
      title: "Exact and cumulative probability for four trials.",
      steps: [
        "Suppose X counts successes in 4 trials with success probability p = 0.5.",
        "Compute exact probabilities for X = 0, 1, 2, 3, 4 using the binomial formula.",
        "To get P(X ≤ 2), add the bars for X = 0, X = 1, and X = 2.",
        "Cumulative probability is a sum of exact probabilities."
      ]
    },
    examQuestions: [
      {
        prompt: "In 4 fair trials, what is P(X = 2) for the number of successes?",
        answer: "6/16 = 0.375.",
        explanation: "Use nCx p^x (1 - p)^(n - x) with n = 4, x = 2, and p = 0.5.",
        steps: [
          "Compute 4C2 = 6.",
          "Use p^2 = 0.25 and (1 - p)^2 = 0.25.",
          "Multiply 6 × 0.25 × 0.25.",
          "That gives 0.375."
        ]
      },
      {
        prompt: "What does cumulative probability P(X ≤ k) mean in words?",
        answer: "The probability of getting k or fewer successes.",
        explanation: "It adds all exact probabilities from 0 successes up through k successes.",
        steps: [
          "Write the exact outcomes included.",
          "Start at X = 0.",
          "Add every exact probability up to X = k.",
          "Interpret the sum as 'k or fewer'."
        ]
      }
    ],
    mcq: {
      question: "What does binomial probability require?",
      options: [
        "Independent repeated trials with the same success probability",
        "Different probabilities every trial",
        "Only one trial",
        "A continuous random variable"
      ],
      correctIndex: 0,
      explanation: "Correct. That repeated independent same-p setup is what makes the binomial model work."
    },
    problem: {
      prompt: "If X ~ Bin(4, 0.5), what is P(X = 2)?",
      answers: ["0.375", ".375", "3/8"],
      success: "Correct. P(X = 2) = 4C2(0.5)^2(0.5)^2 = 6/16 = 0.375."
    },
    conceptQuestion: {
      prompt: "Why is cumulative probability often more useful than one exact probability?",
      answer:
        "Because many practical questions ask for thresholds or ranges, like at most k or at least k, not exactly one count."
    },
    controls: [
      { id: "p", label: "Success probability p", min: 0.1, max: 0.9, step: 0.1, value: 0.5 },
      { id: "k", label: "Cumulative cutoff k", min: 0, max: 4, step: 1, value: 2 }
    ],
    calculate(values) {
      const p = Number(values.p);
      const k = Number(values.k);
      const n = 4;
      const exactTwo = binomialProbability(n, 2, p);
      let cumulative = 0;
      for (let x = 0; x <= k; x += 1) {
        cumulative += binomialProbability(n, x, p);
      }
      return {
        metrics: [
          `n = ${n}, p = ${formatNumber(p)}`,
          `P(X = 2) ≈ ${formatNumber(exactTwo)}`,
          `P(X ≤ ${k}) ≈ ${formatNumber(cumulative)}`
        ],
        exampleSteps: [
          `Treat X as Bin(${n}, ${formatNumber(p)}).`,
          `For exact probability, use the binomial formula for X = 2.`,
          `For cumulative probability, add the probabilities from X = 0 up to X = ${k}.`,
          `That gives P(X ≤ ${k}) ≈ ${formatNumber(cumulative)}.`
        ],
        insight:
          "Cumulative probability grows as you include more bars, because you are adding more allowed outcomes.",
        drawing: {
          type: "binomial",
          n,
          p,
          k
        }
      };
    }
  },
  {
    key: "statistics",
    order: 9,
    stage: "Probability",
    difficulty: "Core",
    label: "Statistics: Mean & Spread",
    navDescription: "Summarize data without drowning in it.",
    subtitle:
      "Statistics turns a noisy collection of values into interpretable summaries like center and spread.",
    learningPurpose:
      "Learn what average and variability tell you about data before jumping into models.",
    whyThisBefore:
      "Study statistics before regression and evaluation because models are trained and judged on data summaries and error patterns.",
    prerequisites: ["Probability Basics"],
    mlPurpose:
      "Feature normalization, model evaluation, and uncertainty about data all depend on averages and spread.",
    visualTitle: "Move the sample values and watch the mean shift.",
    visualDescription:
      "The points are data values on a number line. The highlighted marker shows their mean.",
    beginnerNote:
      "The mean tells you the center of the data. Spread tells you whether values cluster tightly or are all over the place.",
    symbolGuide: [
      { symbol: "x̄", meaning: "Sample mean, the average value." },
      { symbol: "variance", meaning: "A measure of spread around the mean." },
      { symbol: "n", meaning: "Number of data points." }
    ],
    simpleExplanation:
      "Statistics is about summarizing data. The mean shows the center, and spread shows how far values wander from that center.",
    formula: "x̄ = (x1 + x2 + x3) / 3",
    formulaMeaning:
      "Meaning: add the values and divide by how many values you have.",
    mlUseCase:
      "Averages and spread matter in feature scaling, error analysis, and understanding how noisy a dataset is.",
    intuition:
      "Ask: where is the center of these values, and how tightly or loosely do they cluster around it?",
    examShortcuts: [
      "Mean = total divided by count.",
      "Large spread means values are not tightly clustered.",
      "Outliers can pull the mean."
    ],
    bigPicture:
      "Statistics connects probability to real data. This is where theory meets observed samples.",
    examReadiness: [
      "Compute means quickly.",
      "Interpret high and low spread.",
      "Understand why averages alone are not enough."
    ],
    mcq: {
      question: "If a dataset has large variance, what does that mean?",
      options: [
        "Values are spread far from the mean",
        "All values are equal",
        "The mean must be zero",
        "The sample size is 1"
      ],
      correctIndex: 0,
      explanation: "Correct. Larger variance means greater spread around the center."
    },
    problem: {
      prompt: "If the data are 2, 4, and 6, what is the mean?",
      answers: ["4"],
      success: "Correct. The mean is (2 + 4 + 6) / 3 = 4."
    },
    conceptQuestion: {
      prompt: "Why is spread important if you already know the mean?",
      answer:
        "Because two datasets can have the same mean but very different behavior depending on how tightly or loosely the values cluster around that mean."
    },
    controls: [
      { id: "x1", label: "Value 1", min: 0, max: 10, step: 1, value: 2 },
      { id: "x2", label: "Value 2", min: 0, max: 10, step: 1, value: 4 },
      { id: "x3", label: "Value 3", min: 0, max: 10, step: 1, value: 7 }
    ],
    calculate(values) {
      const x1 = Number(values.x1);
      const x2 = Number(values.x2);
      const x3 = Number(values.x3);
      const mean = (x1 + x2 + x3) / 3;
      const variance = ((x1 - mean) ** 2 + (x2 - mean) ** 2 + (x3 - mean) ** 2) / 3;
      return {
        metrics: [`Mean ≈ ${formatNumber(mean)}`, `Variance ≈ ${formatNumber(variance)}`, `Range = ${Math.max(x1, x2, x3) - Math.min(x1, x2, x3)}`],
        exampleSteps: [
          `Add the data: ${x1} + ${x2} + ${x3} = ${x1 + x2 + x3}.`,
          `Divide by 3 to get the mean: ${formatNumber(mean)}.`,
          `Measure how far each value is from the mean.`,
          `Average those squared distances to get variance about ${formatNumber(variance)}.`
        ],
        insight:
          variance > 5
            ? "These values are fairly spread out."
            : "These values are relatively clustered around their mean.",
        drawing: {
          type: "mean",
          values: [x1, x2, x3],
          mean
        }
      };
    }
  },
  {
    key: "regression",
    order: 10,
    stage: "Modeling",
    difficulty: "Bridge Topic",
    label: "Linear Regression",
    navDescription: "Where the earlier math starts working together.",
    subtitle:
      "This is the first model where linear algebra, calculus, and statistics all meet in one place.",
    learningPurpose:
      "See how the math you studied feeds directly into a predictive model.",
    whyThisBefore:
      "Study this after linear algebra, calculus, and statistics so the model feels like a synthesis instead of a new wall of symbols.",
    prerequisites: ["Functions & Graphs", "Matrices & Multiplication", "Derivatives", "Statistics: Mean & Spread"],
    mlPurpose:
      "Linear regression is a foundational predictive model and a clean starting point for loss, optimization, and evaluation.",
    visualTitle: "Adjust the line against the data.",
    visualDescription:
      "The scatter points stay fixed while your prediction line changes. The error tells you how well the line fits the data.",
    beginnerNote:
      "Regression is just fitting a rule to data. It asks: which line best summarizes the pattern between input and output?",
    symbolGuide: [
      { symbol: "ŷ", meaning: "Predicted output." },
      { symbol: "y = mx + b", meaning: "A straight-line model with slope m and intercept b." },
      { symbol: "residual", meaning: "Actual value minus predicted value." }
    ],
    simpleExplanation:
      "Linear regression draws the best straight line it can through the relationship between input and output.",
    formula: "ŷ = mx + b",
    formulaMeaning:
      "Meaning: predict output using a straight-line rule with slope m and intercept b.",
    mlUseCase:
      "This is the first real ML-style predictive model many students learn. It teaches fitting, prediction, residuals, and loss.",
    intuition:
      "Ask: does this line capture the trend of the data, or are the errors still large?",
    examShortcuts: [
      "Residual = actual - predicted.",
      "Smaller squared errors usually mean a better fit.",
      "Slope tells how prediction changes with the input."
    ],
    bigPicture:
      "Linear regression is the first place where the earlier math becomes a full modeling workflow: represent, predict, measure error, improve.",
    examReadiness: [
      "Use a line to make predictions quickly.",
      "Compute residuals.",
      "Explain why a better-fitting line has lower error."
    ],
    advancedExample: {
      title: "Compare two candidate regression lines by MSE.",
      steps: [
        "Take the same dataset and evaluate line A and line B.",
        "Compute each residual: actual - predicted.",
        "Square the residuals so negative and positive misses do not cancel.",
        "Average the squared residuals. The line with smaller MSE is the better fit under squared-error loss."
      ]
    },
    examQuestions: [
      {
        prompt: "A line predicts 5 when the actual value is 8. What is the residual?",
        answer: "Residual = actual - predicted = 8 - 5 = 3."
      },
      {
        prompt: "Why is linear regression considered a linear model even if the data are noisy?",
        answer: "Because the prediction rule is linear in the parameters and input features."
      }
    ],
    mcq: {
      question: "If a fitted line has very large residuals, what does that usually mean?",
      options: [
        "The line is not fitting the data well",
        "The model is perfect",
        "The slope must be zero",
        "The data are guaranteed linear"
      ],
      correctIndex: 0,
      explanation: "Correct. Large residuals mean the predictions are far from the actual values."
    },
    problem: {
      prompt: "If ŷ = 2x + 1, what is the predicted value when x = 4?",
      answers: ["9"],
      success: "Correct. Substitute x = 4: 2×4 + 1 = 9."
    },
    conceptQuestion: {
      prompt: "Why is linear regression such a useful first ML model?",
      answer:
        "Because it is simple enough to understand fully while still teaching the main ML workflow: represent data, predict, measure error, and improve the fit."
    },
    controls: [
      { id: "m", label: "Slope", min: 0, max: 2.5, step: 0.1, value: 1.2 },
      { id: "b", label: "Intercept", min: 0, max: 3, step: 0.1, value: 0.8 }
    ],
    calculate(values) {
      const m = Number(values.m);
      const b = Number(values.b);
      const points = [
        { x: 1, y: 2.1 },
        { x: 2, y: 3.2 },
        { x: 3, y: 4.9 },
        { x: 4, y: 6.1 }
      ];
      const mse =
        points.reduce((total, point) => total + (point.y - (m * point.x + b)) ** 2, 0) / points.length;
      return {
        metrics: [`Slope = ${formatNumber(m)}`, `Intercept = ${formatNumber(b)}`, `MSE ≈ ${formatNumber(mse)}`],
        exampleSteps: [
          `Use the model ŷ = ${formatNumber(m)}x + ${formatNumber(b)}.`,
          `For each data point, compute the predicted value.`,
          `Find each residual: actual - predicted.`,
          `Square and average the residuals to get MSE ≈ ${formatNumber(mse)}.`
        ],
        insight:
          mse < 0.25
            ? "This line fits the points fairly well."
            : mse < 1
              ? "This line catches the trend but still misses some points noticeably."
              : "This line is not matching the data trend very well yet.",
        drawing: {
          type: "regression",
          m,
          b,
          points
        }
      };
    }
  },
  {
    key: "bayes",
    order: 11,
    stage: "Probability",
    difficulty: "Advanced Core",
    label: "Conditional Probability & Bayes",
    navDescription: "Update belief when evidence arrives.",
    subtitle:
      "Bayes rule matters when new evidence changes what you believe about a class or hypothesis.",
    learningPurpose:
      "Understand how prior belief and evidence combine into a posterior probability.",
    whyThisBefore:
      "Study this before advanced probabilistic models because it is the core rule behind evidence-based updating.",
    prerequisites: ["Probability Basics", "Statistics: Mean & Spread"],
    mlPurpose:
      "Bayesian classifiers, spam filters, medical-test reasoning, and posterior inference all depend on this logic.",
    visualTitle: "Move prior, sensitivity, and false-positive rate.",
    visualDescription:
      "The visual shows how a positive test is built from true positives and false positives, which is what Bayes rule has to separate.",
    beginnerNote:
      "Bayes rule answers a specific question: once I see evidence, how should I update my belief?",
    symbolGuide: [
      { symbol: "P(A|B)", meaning: "Probability of A given B." },
      { symbol: "prior", meaning: "Belief before seeing the new evidence." },
      { symbol: "posterior", meaning: "Updated belief after seeing the evidence." }
    ],
    simpleExplanation:
      "Bayes rule is a belief update rule. Start with an initial belief, then adjust it based on how strongly the evidence supports or misleads you.",
    formula: "P(A|B) = P(B|A)P(A) / P(B)",
    formulaMeaning:
      "Meaning: posterior = likelihood × prior, then normalize by how common the evidence is overall.",
    mlUseCase:
      "Naive Bayes classification and many probabilistic models rely on updating class probabilities when features are observed.",
    intuition:
      "Ask: after I see this evidence, should my belief go up a little, a lot, or barely at all?",
    examShortcuts: [
      "Posterior is not the same as likelihood.",
      "Rare events can still dominate if evidence is very strong.",
      "False positives matter because they inflate the evidence pool."
    ],
    bigPicture:
      "Bayes rule is one of the cleanest bridges between probability theory and decision-making under uncertainty.",
    examReadiness: [
      "Distinguish prior, likelihood, evidence, and posterior.",
      "Compute simple posteriors numerically.",
      "Avoid confusing P(A|B) with P(B|A)."
    ],
    advancedExample: {
      title: "Medical-test style posterior update.",
      steps: [
        "Suppose disease prevalence is low, but the test is very sensitive.",
        "Compute true positives and false positives separately.",
        "Add them to get all positive tests.",
        "Posterior disease probability is the true-positive part divided by all positives."
      ]
    },
    examQuestions: [
      {
        prompt: "Why can a test with high sensitivity still give a modest posterior probability?",
        answer: "Because if the condition is rare or the false-positive rate is not tiny, many positives can still come from non-cases."
      },
      {
        prompt: "What is the main conceptual difference between prior and posterior?",
        answer: "The prior is before evidence; the posterior is after evidence."
      }
    ],
    mcq: {
      question: "Which quantity is the updated belief after observing evidence?",
      options: ["Posterior", "Prior", "Likelihood only", "Feature vector"],
      correctIndex: 0,
      explanation: "Correct. The posterior is the updated belief after the evidence is observed."
    },
    problem: {
      prompt: "If prior = 0.1, sensitivity = 0.9, and false-positive rate = 0.2, what is P(disease | positive)?",
      answers: ["0.33", ".33", "0.333", ".333", "1/3"],
      success: "Correct. Posterior = 0.09 / (0.09 + 0.18) = 0.333..., about 0.33."
    },
    conceptQuestion: {
      prompt: "Why does Bayes rule matter so much in classification?",
      answer:
        "Because classification often means choosing the most likely class after observing evidence, which is exactly what posterior probability describes."
    },
    controls: [
      { id: "prior", label: "Prior", min: 0.05, max: 0.5, step: 0.05, value: 0.1 },
      { id: "sens", label: "Sensitivity", min: 0.5, max: 0.95, step: 0.05, value: 0.9 },
      { id: "fpr", label: "False positive rate", min: 0.05, max: 0.5, step: 0.05, value: 0.2 }
    ],
    calculate(values) {
      const prior = Number(values.prior);
      const sens = Number(values.sens);
      const fpr = Number(values.fpr);
      const truePositive = sens * prior;
      const falsePositive = fpr * (1 - prior);
      const posterior = truePositive / (truePositive + falsePositive);
      return {
        metrics: [
          `Prior = ${formatNumber(prior)}`,
          `P(+|disease) = ${formatNumber(sens)}`,
          `Posterior ≈ ${formatNumber(posterior)}`
        ],
        exampleSteps: [
          `True positive mass = ${formatNumber(sens)} × ${formatNumber(prior)} = ${formatNumber(truePositive)}.`,
          `False positive mass = ${formatNumber(fpr)} × ${formatNumber(1 - prior)} = ${formatNumber(falsePositive)}.`,
          `All positive mass = ${formatNumber(truePositive + falsePositive)}.`,
          `Posterior = ${formatNumber(truePositive)} / ${formatNumber(truePositive + falsePositive)} ≈ ${formatNumber(posterior)}.`
        ],
        insight:
          posterior > prior
            ? "The evidence increases belief in the hypothesis."
            : "The evidence is not strong enough to raise belief much above the prior.",
        drawing: {
          type: "bayes",
          prior,
          sens,
          fpr,
          posterior,
          truePositive,
          falsePositive
        }
      };
    }
  },
  {
    key: "distributions",
    order: 12,
    stage: "Probability",
    difficulty: "Advanced Core",
    label: "PDFs, Normal & Standard Normal",
    navDescription: "How uncertainty is shaped, not just how large it is.",
    subtitle:
      "This is the course-style probability block: probability density functions, normal distribution, and standard normal thinking.",
    learningPurpose:
      "Move from single-event probabilities to full uncertainty profiles over many possible outcomes.",
    whyThisBefore:
      "Study distributions before statistical inference and probabilistic modeling because they describe the shape of uncertainty itself.",
    prerequisites: ["Probability Basics"],
    mlPurpose:
      "Gaussian assumptions, likelihoods, normalization, anomaly detection, and many generative models depend on distributions.",
    visualTitle: "Change the mean and spread of the bell curve.",
    visualDescription:
      "The center moves with the mean and the curve widens or narrows with the standard deviation.",
    beginnerNote:
      "A distribution answers more than 'how likely is one event?'. It answers 'how is uncertainty spread across all possible values?'. For continuous variables, the curve is a density, not the probability of one exact point.",
    symbolGuide: [
      { symbol: "μ", meaning: "Mean, the center of the distribution." },
      { symbol: "σ", meaning: "Standard deviation, the spread." },
      { symbol: "N(μ, σ²)", meaning: "Normal distribution with mean μ and variance σ²." },
      { symbol: "N(0, 1)", meaning: "Standard normal distribution." }
    ],
    simpleExplanation:
      "A distribution is a map of where values are likely to appear and how tightly or loosely they cluster. The normal distribution is the most famous example, and standard normal is its cleaned-up z-score version.",
    formula: "z = (x - μ) / σ",
    formulaMeaning:
      "Meaning: z-score tells you how many standard deviations a value is from the mean.",
    mlUseCase:
      "Normal distributions appear in modeling noise, standardized features, and many probabilistic assumptions used in ML.",
    intuition:
      "Ask: where is the center, how wide is the spread, and how surprising is a value far from the center?",
    examShortcuts: [
      "Larger σ means wider spread.",
      "z = 0 means the value is exactly at the mean.",
      "Large |z| means the value is far from the center."
    ],
    bigPicture:
      "Distributions let you reason about whole uncertainty patterns, not just isolated event chances.",
    examReadiness: [
      "Compute z-scores.",
      "Read the effect of μ and σ on curve shape.",
      "Interpret how unusual a value is.",
      "Know that standard normal means μ = 0 and σ = 1."
    ],
    advancedExample: {
      title: "Use z-scores to compare values from different scales.",
      steps: [
        "Take two raw values from different contexts.",
        "Convert each to a z-score using its own mean and standard deviation.",
        "Compare the standardized values.",
        "The larger z-score is the more extreme value relative to its own distribution."
      ]
    },
    examQuestions: [
      {
        prompt: "If σ increases while μ stays fixed, what happens to the curve?",
        answer: "It spreads out and becomes flatter."
      },
      {
        prompt: "What does a z-score of 2 mean?",
        answer: "The value is two standard deviations above the mean."
      }
    ],
    mcq: {
      question: "What happens when standard deviation increases?",
      options: [
        "The distribution spreads out",
        "The mean becomes zero",
        "All probabilities become equal",
        "The curve disappears"
      ],
      correctIndex: 0,
      explanation: "Correct. Larger standard deviation means more spread."
    },
    problem: {
      prompt: "If the mean is 50 and the standard deviation is 10, what is the z-score of 70?",
      answers: ["2", "2.0"],
      success: "Correct. z = (70 - 50) / 10 = 2."
    },
    conceptQuestion: {
      prompt: "Why do distributions matter more than just averages?",
      answer:
        "Because two datasets can share the same mean but behave very differently if their uncertainty is shaped differently."
    },
    controls: [
      { id: "mu", label: "Mean μ", min: -2, max: 2, step: 0.5, value: 0 },
      { id: "sigma", label: "Std dev σ", min: 0.5, max: 2.5, step: 0.25, value: 1 }
    ],
    calculate(values) {
      const mu = Number(values.mu);
      const sigma = Number(values.sigma);
      const x = mu + sigma;
      const z = (x - mu) / sigma;
      return {
        metrics: [`μ = ${formatNumber(mu)}`, `σ = ${formatNumber(sigma)}`, `z(μ + σ) = ${formatNumber(z)}`],
        exampleSteps: [
          `Set the mean to ${formatNumber(mu)} and standard deviation to ${formatNumber(sigma)}.`,
          `One standard deviation above the mean is x = μ + σ = ${formatNumber(x)}.`,
          `Compute z = (${formatNumber(x)} - ${formatNumber(mu)}) / ${formatNumber(sigma)}.`,
          `So the z-score is ${formatNumber(z)}.`
        ],
        insight:
          sigma > 1.5
            ? "The uncertainty is relatively spread out."
            : "The uncertainty is relatively concentrated around the center.",
        drawing: {
          type: "distribution",
          mu,
          sigma
        }
      };
    }
  },
  {
    key: "eigen",
    order: 13,
    stage: "Linear Algebra",
    difficulty: "Advanced Core",
    label: "Eigenvalues & PCA Intuition",
    navDescription: "Special directions that only stretch.",
    subtitle:
      "This is the doorway to PCA and dimensionality reduction.",
    learningPurpose:
      "Understand that some transformations have special directions that keep their direction and only change size.",
    whyThisBefore:
      "Study this after matrices and transformations because eigen ideas only make sense once transformations feel natural.",
    prerequisites: ["Matrices & Multiplication", "Linear Transformations"],
    mlPurpose:
      "PCA, covariance analysis, spectral methods, and many compression ideas rely on eigenvalues and eigenvectors.",
    visualTitle: "See the main spread direction in an ellipse.",
    visualDescription:
      "The long axis is the principal direction. PCA keeps the directions with the largest spread and often drops weaker ones.",
    beginnerNote:
      "An eigenvector is a direction a transformation does not bend away from itself. It may stretch or shrink, but it stays on the same line.",
    symbolGuide: [
      { symbol: "Av = λv", meaning: "v is an eigenvector and λ is its eigenvalue." },
      { symbol: "λ", meaning: "How much that special direction is scaled." },
      { symbol: "principal component", meaning: "A direction of strong variation kept by PCA." }
    ],
    simpleExplanation:
      "Some directions are special. A transformation may stretch them, but it does not rotate them off their own line.",
    formula: "Av = λv",
    formulaMeaning:
      "Meaning: after applying A, the vector v still points along the same direction, only scaled by λ.",
    mlUseCase:
      "PCA finds strong variation directions in data so you can compress or visualize it more efficiently.",
    intuition:
      "Ask: which directions survive the transformation without changing their line?",
    examShortcuts: [
      "Eigenvectors keep their direction.",
      "Eigenvalues tell the scale factor on that direction.",
      "PCA keeps directions of large variance."
    ],
    bigPicture:
      "Eigen ideas turn linear algebra into data compression and structure discovery.",
    examReadiness: [
      "Recognize the meaning of Av = λv.",
      "Interpret large eigenvalues as strong scaling directions.",
      "Connect PCA to keeping the most informative directions."
    ],
    advancedExample: {
      title: "Why PCA reduces dimension.",
      steps: [
        "Find the direction where data varies the most.",
        "Project data onto that principal direction.",
        "If one direction carries much more information than the others, keep it and drop weaker directions.",
        "This preserves much of the structure with fewer numbers."
      ]
    },
    examQuestions: [
      {
        prompt: "If Av = 3v, what is the eigenvalue?",
        answer: "The eigenvalue is 3."
      },
      {
        prompt: "Why does PCA care about variance?",
        answer: "Because high-variance directions usually carry more of the dataset's structural information."
      }
    ],
    mcq: {
      question: "What stays the same for an eigenvector after transformation?",
      options: [
        "Its direction line",
        "Its exact coordinates",
        "Its length only",
        "Nothing"
      ],
      correctIndex: 0,
      explanation: "Correct. The vector can scale, but it stays on the same line."
    },
    problem: {
      prompt: "If Av = 3v, what is the eigenvalue associated with v?",
      answers: ["3", "3.0"],
      success: "Correct. The scaling factor λ is 3."
    },
    conceptQuestion: {
      prompt: "Why is PCA useful before modeling?",
      answer:
        "Because it can compress high-dimensional data into fewer informative directions and reduce noise or redundancy."
    },
    controls: [],
    calculate() {
      return {
        metrics: ["Core idea: Av = λv", "PCA keeps high-variance directions", "Compression without full collapse"],
        exampleSteps: [
          "Start with a data cloud that is stretched more in one direction than others.",
          "That dominant direction becomes the first principal component.",
          "Project points onto it to reduce dimension.",
          "Keep extra components only if they carry enough remaining variation."
        ],
        insight:
          "PCA works because some directions in data matter much more than others.",
        drawing: {
          type: "pca"
        }
      };
    }
  },
  {
    key: "eigendecomp",
    order: 16,
    stage: "Linear Algebra",
    difficulty: "Advanced Core",
    label: "Eigen Decomposition",
    navDescription: "Turn a hard matrix into an easier one.",
    subtitle:
      "This is the exam-level step where eigenvalues and eigenvectors combine into a structured factorization.",
    learningPurpose:
      "Understand why A = C D C^-1 is useful and what the matrices C and D mean.",
    whyThisBefore:
      "Study this after eigenvalues and eigenvectors because decomposition packages those ideas into a tool for simplifying repeated matrix action.",
    prerequisites: ["Basis & Coordinates", "Eigenvalues & PCA Intuition"],
    mlPurpose:
      "Diagonalization helps explain PCA, repeated linear updates, and why special coordinate systems can simplify a transformation.",
    visualTitle: "Rewrite a matrix using its eigen directions.",
    visualDescription:
      "The visual shows the idea of moving into an eigenvector basis, scaling there, and then moving back.",
    beginnerNote:
      "Eigen decomposition does not create new geometry. It rewrites the same transformation in a basis where it becomes easier to understand.",
    symbolGuide: [
      { symbol: "A = C D C^-1", meaning: "Rewrite A using eigenvectors and eigenvalues." },
      { symbol: "C", meaning: "Matrix whose columns are eigenvectors." },
      { symbol: "D", meaning: "Diagonal matrix of eigenvalues." }
    ],
    simpleExplanation:
      "Eigen decomposition changes into a smart basis where the matrix just scales along special directions.",
    formula: "A = C D C^-1",
    formulaMeaning:
      "Meaning: move into the eigenvector basis, scale by the eigenvalues, then move back to the original basis.",
    mlUseCase:
      "This is the algebra behind why covariance matrices become easier to understand in PCA.",
    intuition:
      "Ask: can I describe this transformation more simply if I choose better coordinate directions?",
    examShortcuts: [
      "D contains the eigenvalues on the diagonal.",
      "Columns of C are the matching eigenvectors.",
      "A^n becomes easier because D^n is easy to compute."
    ],
    bigPicture:
      "This is the bridge from solving isolated eigen problems to using them as a serious tool.",
    examReadiness: [
      "State what C and D represent.",
      "Build D from known eigenvalues.",
      "Explain why matrix powers become easier after diagonalization."
    ],
    advancedExample: {
      title: "Build D for A = [[1, 4], [2, 3]].",
      steps: [
        "Find the characteristic polynomial: det(A - λI) = (1 - λ)(3 - λ) - 8.",
        "That simplifies to λ^2 - 4λ - 5 = 0.",
        "Solve to get eigenvalues 5 and -1.",
        "So D can be written as diag(5, -1), assuming the eigenvectors are placed in C in that same order."
      ]
    },
    examQuestions: [
      {
        prompt: "If A = C D C^-1, what does D contain?",
        answer: "D contains the eigenvalues, usually on the diagonal.",
        explanation: "The whole point of the decomposition is that the complicated action of A becomes simple scaling inside D.",
        steps: [
          "Write the decomposition A = C D C^-1.",
          "Interpret C as the change into the eigenvector basis.",
          "Interpret D as pure scaling in that basis.",
          "Those scaling values are the eigenvalues."
        ]
      },
      {
        prompt: "Why is A^n easier to compute when A = C D C^-1?",
        answer: "Because A^n = C D^n C^-1, and D^n is easy since D is diagonal.",
        explanation: "Diagonal matrices are easy to raise to powers because you just raise each diagonal entry.",
        steps: [
          "Write A^2, A^3, and notice the middle C^-1C terms cancel.",
          "Generalize to A^n = C D^n C^-1.",
          "Use the fact that D is diagonal.",
          "Raise each diagonal eigenvalue to the nth power."
        ]
      }
    ],
    mcq: {
      question: "In A = C D C^-1, what is usually stored in C?",
      options: [
        "The eigenvectors",
        "The probabilities",
        "The gradients",
        "The matrix powers"
      ],
      correctIndex: 0,
      explanation: "Correct. The columns of C are the eigenvectors."
    },
    problem: {
      prompt: "If a matrix has eigenvalues 5 and -1, what can D be in its eigendecomposition?",
      answers: ["[[5,0],[0,-1]]", "[[ -1,0],[0,5]]", "diag(5,-1)", "diag(-1,5)"],
      success: "Correct. D is diagonal with the eigenvalues, in an order matching the eigenvectors in C."
    },
    conceptQuestion: {
      prompt: "Why does eigendecomposition feel like a change-of-basis idea?",
      answer:
        "Because it rewrites the matrix in the eigenvector basis, where the action becomes simple diagonal scaling."
    },
    controls: [],
    calculate() {
      return {
        metrics: ["C = eigenvectors", "D = eigenvalues", "A^n becomes easier"],
        exampleSteps: [
          "Find eigenvalues and eigenvectors of A.",
          "Place the eigenvectors as columns of C.",
          "Place the matching eigenvalues on the diagonal of D.",
          "Use A = C D C^-1 to analyze powers and behavior more easily."
        ],
        insight:
          "A complicated transformation can become simple diagonal scaling after moving into the right basis.",
        drawing: {
          type: "decomposition"
        }
      };
    }
  },
  {
    key: "gradient-descent",
    order: 14,
    stage: "Calculus",
    difficulty: "Advanced Core",
    label: "Gradient Descent",
    navDescription: "How models actually move downhill.",
    subtitle:
      "Once you know derivatives and gradients, this is the algorithmic step that turns math into learning.",
    learningPurpose:
      "Understand the update rule that repeatedly reduces loss.",
    whyThisBefore:
      "Study this before neural networks because training deep models is essentially a gradient-based optimization process.",
    prerequisites: ["Derivatives", "Multivariable Calculus"],
    mlPurpose:
      "Gradient descent is the basic engine behind training many ML models.",
    visualTitle: "Move the point and learning rate on the loss curve.",
    visualDescription:
      "The current point sits on the curve and the next point shows where one gradient descent step would move.",
    beginnerNote:
      "Gradient descent is just repeated downhill walking on a loss surface, using local slope information.",
    symbolGuide: [
      { symbol: "η", meaning: "Learning rate, the step size." },
      { symbol: "xnew = xold - ηf'(xold)", meaning: "Move against the slope to reduce the function." },
      { symbol: "loss", meaning: "How wrong the model currently is." }
    ],
    simpleExplanation:
      "Gradient descent updates parameters by taking small steps downhill on the loss function.",
    formula: "xnew = xold - η f'(xold)",
    formulaMeaning:
      "Meaning: move opposite the slope, scaled by the learning rate η.",
    mlUseCase:
      "Training regression, logistic regression, and neural networks all depends on optimization steps like this.",
    intuition:
      "Ask: which way is downhill, and how big should my step be?",
    examShortcuts: [
      "Negative gradient means downhill direction.",
      "Large learning rate can overshoot.",
      "Small learning rate can be very slow."
    ],
    bigPicture:
      "Gradient descent is the algorithmic heartbeat of ML training.",
    examReadiness: [
      "Apply one update step correctly.",
      "Explain the role of learning rate.",
      "Connect gradient sign to parameter movement."
    ],
    advancedExample: {
      title: "Why bad learning rates fail.",
      steps: [
        "If η is too small, progress is slow because each step barely moves.",
        "If η is too large, the update can jump past the minimum.",
        "Training then oscillates or diverges.",
        "Good optimization balances direction quality with step size."
      ]
    },
    examQuestions: [
      {
        prompt: "If the derivative is positive, which way should gradient descent move?",
        answer: "It should move left or downward in parameter space, against the positive slope."
      },
      {
        prompt: "What is the effect of doubling the learning rate, all else equal?",
        answer: "Each update becomes twice as large, which can speed learning or cause overshooting."
      }
    ],
    mcq: {
      question: "What happens if the learning rate is far too large?",
      options: [
        "The updates can overshoot the minimum",
        "Training becomes exact in one step",
        "The gradient becomes zero automatically",
        "The model stops using derivatives"
      ],
      correctIndex: 0,
      explanation: "Correct. Steps that are too large can jump over the minimum and destabilize training."
    },
    problem: {
      prompt: "If current x = 5, derivative = 2, and η = 0.1, what is the new x after one update?",
      answers: ["4.8"],
      success: "Correct. xnew = 5 - 0.1×2 = 4.8."
    },
    conceptQuestion: {
      prompt: "Why do we move in the negative gradient direction instead of the positive one?",
      answer:
        "Because the gradient points uphill, and learning usually tries to minimize loss, which means moving downhill."
    },
    controls: [
      { id: "x0", label: "Current x", min: -2, max: 8, step: 0.5, value: 5 },
      { id: "lr", label: "Learning rate η", min: 0.05, max: 0.8, step: 0.05, value: 0.2 }
    ],
    calculate(values) {
      const x0 = Number(values.x0);
      const lr = Number(values.lr);
      const y0 = curveValue(x0);
      const slope = curveSlope(x0);
      const nextX = x0 - lr * slope;
      const nextY = curveValue(nextX);
      return {
        metrics: [`Current x = ${formatNumber(x0)}`, `Slope ≈ ${formatNumber(slope)}`, `Next x ≈ ${formatNumber(nextX)}`],
        exampleSteps: [
          `Start at x = ${formatNumber(x0)} where the slope is about ${formatNumber(slope)}.`,
          `Use η = ${formatNumber(lr)}.`,
          `Compute xnew = ${formatNumber(x0)} - ${formatNumber(lr)} × ${formatNumber(slope)}.`,
          `So the next step is xnew ≈ ${formatNumber(nextX)}.`
        ],
        insight:
          `The update moves from x = ${formatNumber(x0)} to about ${formatNumber(nextX)} to lower the loss.`,
        drawing: {
          type: "descent",
          x0,
          y0,
          slope,
          nextX,
          nextY
        }
      };
    }
  },
  {
    key: "logistic",
    order: 15,
    stage: "Modeling",
    difficulty: "Advanced Core",
    label: "Logistic Regression",
    navDescription: "From scores to probabilities for classification.",
    subtitle:
      "This is the classification counterpart to linear regression.",
    learningPurpose:
      "Understand how a linear score becomes a probability for binary classification.",
    whyThisBefore:
      "Study this before neural networks because it introduces classification loss, probabilities, and nonlinear squashing in a simpler setting.",
    prerequisites: ["Functions & Graphs", "Probability Basics", "Gradient Descent"],
    mlPurpose:
      "Logistic regression is a standard baseline model for binary classification and a conceptual bridge to neural networks.",
    visualTitle: "Change the score function and watch the sigmoid output.",
    visualDescription:
      "The linear score changes the horizontal position on the sigmoid, and the sigmoid turns that score into a probability between 0 and 1.",
    beginnerNote:
      "Logistic regression is still linear in its score, but the sigmoid turns that score into a probability.",
    symbolGuide: [
      { symbol: "σ(z)", meaning: "Sigmoid applied to score z." },
      { symbol: "z = wx + b", meaning: "Linear score before squashing." },
      { symbol: "p(y=1|x)", meaning: "Predicted probability of class 1 given x." }
    ],
    simpleExplanation:
      "Logistic regression takes a straight-line score and squeezes it into a probability between 0 and 1.",
    formula: "p = 1 / (1 + e^-(wx + b))",
    formulaMeaning:
      "Meaning: compute a score wx + b, then squash it into a probability.",
    mlUseCase:
      "Spam detection, fraud checks, medical classification, and many binary decision systems use this structure.",
    intuition:
      "Ask: how strongly does the score push the prediction toward class 1 versus class 0?",
    examShortcuts: [
      "z = 0 gives probability 0.5.",
      "Large positive z gives probability near 1.",
      "Large negative z gives probability near 0."
    ],
    bigPicture:
      "Logistic regression is the first clean link between linear models and probabilistic classification.",
    examReadiness: [
      "Compute probabilities from simple scores.",
      "Interpret score sign and magnitude.",
      "Know why the output is between 0 and 1."
    ],
    advancedExample: {
      title: "Read score margins in classification.",
      steps: [
        "Compute z = wx + b for two samples.",
        "Send each score through the sigmoid.",
        "Compare the resulting probabilities.",
        "Larger positive scores mean stronger confidence toward class 1."
      ]
    },
    examQuestions: [
      {
        prompt: "What probability does logistic regression output when z = 0?",
        answer: "0.5, because the sigmoid is centered there."
      },
      {
        prompt: "Why is logistic regression better for binary labels than plain linear regression?",
        answer: "Because it outputs probabilities in [0, 1] instead of unrestricted real values."
      }
    ],
    mcq: {
      question: "If z becomes very large and positive, what happens to the logistic output?",
      options: [
        "It approaches 1",
        "It approaches -1",
        "It becomes exactly z",
        "It approaches infinity"
      ],
      correctIndex: 0,
      explanation: "Correct. The sigmoid saturates near 1 for large positive scores."
    },
    problem: {
      prompt: "If w = 1, b = 0, and x = 0, what probability does logistic regression output?",
      answers: ["0.5", ".5"],
      success: "Correct. z = 0, and sigmoid(0) = 0.5."
    },
    conceptQuestion: {
      prompt: "Why is logistic regression still called 'regression' if it does classification?",
      answer:
        "Historically, the model regresses the log-odds linearly, even though the final task is classification."
    },
    controls: [
      { id: "w", label: "Weight w", min: -3, max: 3, step: 0.5, value: 1.5 },
      { id: "b", label: "Bias b", min: -3, max: 3, step: 0.5, value: 0 },
      { id: "x", label: "Input x", min: -4, max: 4, step: 0.5, value: 1 }
    ],
    calculate(values) {
      const w = Number(values.w);
      const b = Number(values.b);
      const x = Number(values.x);
      const z = w * x + b;
      const p = 1 / (1 + Math.exp(-z));
      return {
        metrics: [`Score z = ${formatNumber(z)}`, `Probability ≈ ${formatNumber(p)}`, p > 0.5 ? "Predict class 1" : "Predict class 0"],
        exampleSteps: [
          `Compute the linear score: z = ${formatNumber(w)}×${formatNumber(x)} + ${formatNumber(b)} = ${formatNumber(z)}.`,
          `Apply the sigmoid to z.`,
          `That turns the score into a probability between 0 and 1.`,
          `The predicted probability for class 1 is about ${formatNumber(p)}.`
        ],
        insight:
          p > 0.8
            ? "The model is strongly leaning toward class 1."
            : p < 0.2
              ? "The model is strongly leaning toward class 0."
              : "The model is relatively uncertain.",
        drawing: {
          type: "sigmoid",
          w,
          b,
          x,
          z,
          p
        }
      };
    }
  },
  {
    key: "backprop",
    order: 16,
    stage: "Modeling",
    difficulty: "Advanced Core",
    label: "Neural Layer & Backprop Intuition",
    navDescription: "Where chain rule meets weight updates.",
    subtitle:
      "This is the bridge from single models to neural networks.",
    learningPurpose:
      "Understand what a neural layer computes and why gradients need to flow backward through it.",
    whyThisBefore:
      "Study this after gradients and logistic regression because backprop is basically chain rule applied through layered computations.",
    prerequisites: ["Dot Product", "Multivariable Calculus", "Gradient Descent", "Logistic Regression"],
    mlPurpose:
      "Neural networks stack weighted sums and nonlinearities, and backprop computes how loss changes with each weight.",
    visualTitle: "Change inputs and weights in one tiny neural unit.",
    visualDescription:
      "Two inputs feed one neuron. The neuron forms a weighted sum plus bias and then applies a nonlinearity.",
    beginnerNote:
      "Backprop is not magic. It is repeated chain rule through a computational graph.",
    symbolGuide: [
      { symbol: "z = w1x1 + w2x2 + b", meaning: "Weighted sum before activation." },
      { symbol: "a", meaning: "Activation, the neuron's output after nonlinearity." },
      { symbol: "∂L/∂w", meaning: "How loss changes if the weight changes." }
    ],
    simpleExplanation:
      "A neuron multiplies inputs by weights, adds them up, then passes the result through an activation function. Backprop tells each weight how it contributed to the final error.",
    formula: "z = w1x1 + w2x2 + b",
    formulaMeaning:
      "Meaning: a neural unit first computes a weighted sum before applying an activation.",
    mlUseCase:
      "Every dense layer in a neural network is built from weighted sums like this, and backprop updates those weights.",
    intuition:
      "Ask: which weights helped the prediction, which hurt it, and by how much?",
    examShortcuts: [
      "Forward pass computes outputs.",
      "Backward pass computes gradients.",
      "Chain rule links local derivatives into full loss gradients."
    ],
    bigPicture:
      "This is where linear algebra, gradients, and optimization finally become neural-network training.",
    examReadiness: [
      "Compute a simple weighted sum.",
      "Explain forward pass vs backward pass.",
      "State why chain rule is essential for deep learning."
    ],
    advancedExample: {
      title: "One local gradient inside backprop.",
      steps: [
        "Suppose L depends on output a, and a depends on z, and z depends on weight w1.",
        "Backprop multiplies local derivatives: dL/dw1 = dL/da × da/dz × dz/dw1.",
        "For a weighted sum, dz/dw1 = x1.",
        "This is why input values directly affect gradient size on incoming weights."
      ]
    },
    examQuestions: [
      {
        prompt: "What does the forward pass compute?",
        answer: "The network outputs and intermediate activations."
      },
      {
        prompt: "Why is chain rule necessary in backprop?",
        answer: "Because the loss depends on weights indirectly through many intermediate computations."
      }
    ],
    mcq: {
      question: "Which statement best describes backpropagation?",
      options: [
        "It uses chain rule to compute gradients through layers",
        "It randomly changes weights",
        "It removes all nonlinearities",
        "It only works for linear regression"
      ],
      correctIndex: 0,
      explanation: "Correct. Backpropagation is chain rule applied through the network graph."
    },
    problem: {
      prompt: "If x1 = 2, x2 = 3, w1 = 1, w2 = -1, and b = 0, what is z = w1x1 + w2x2 + b?",
      answers: ["-1"],
      success: "Correct. z = 1×2 + (-1)×3 + 0 = -1."
    },
    conceptQuestion: {
      prompt: "Why can deep networks learn complicated patterns from repeated simple layers?",
      answer:
        "Because many simple weighted transformations and nonlinearities composed together can represent much richer functions than a single layer."
    },
    controls: [
      { id: "x1", label: "Input x1", min: -3, max: 3, step: 1, value: 2 },
      { id: "x2", label: "Input x2", min: -3, max: 3, step: 1, value: 1 },
      { id: "w1", label: "Weight w1", min: -3, max: 3, step: 0.5, value: 1 },
      { id: "w2", label: "Weight w2", min: -3, max: 3, step: 0.5, value: -0.5 },
      { id: "b", label: "Bias b", min: -2, max: 2, step: 0.5, value: 0.5 }
    ],
    calculate(values) {
      const x1 = Number(values.x1);
      const x2 = Number(values.x2);
      const w1 = Number(values.w1);
      const w2 = Number(values.w2);
      const b = Number(values.b);
      const z = w1 * x1 + w2 * x2 + b;
      const a = Math.max(0, z);
      return {
        metrics: [`z = ${formatNumber(z)}`, `ReLU(z) = ${formatNumber(a)}`, `Most influential input = ${Math.abs(w1 * x1) >= Math.abs(w2 * x2) ? "x1" : "x2"}`],
        exampleSteps: [
          `Compute weighted input from x1: ${formatNumber(w1)}×${formatNumber(x1)} = ${formatNumber(w1 * x1)}.`,
          `Compute weighted input from x2: ${formatNumber(w2)}×${formatNumber(x2)} = ${formatNumber(w2 * x2)}.`,
          `Add bias ${formatNumber(b)} to get z = ${formatNumber(z)}.`,
          `Apply ReLU: a = max(0, z) = ${formatNumber(a)}.`
        ],
        insight:
          a > 0
            ? "This neuron is active after the ReLU."
            : "This neuron is inactive after the ReLU because the pre-activation is not positive.",
        drawing: {
          type: "network",
          x1,
          x2,
          w1,
          w2,
          b,
          z,
          a
        }
      };
    }
  },
  {
    key: "python-basics",
    order: 99,
    stage: "Python Programming",
    difficulty: "Essential",
    label: "Python Basics For Math",
    navDescription: "Variables, lists, loops, and simple math in code.",
    subtitle:
      "This is the starting point if your exam expects Python, but you are still getting comfortable with the language itself.",
    learningPurpose:
      "Learn the minimum Python needed to express math ideas clearly and read simple code without panic.",
    whyThisBefore:
      "Study this first in the Python chapter because later NumPy and math code assume you understand variables, lists, indexing, and print output.",
    prerequisites: ["Functions & Graphs"],
    mlPurpose:
      "Python is the main working language for ML, so even simple math ideas often show up in Python syntax first.",
    visualTitle: "Read a tiny Python program like a story.",
    visualDescription:
      "The code window shows the kind of small math program you may be asked to understand or modify in an exam.",
    beginnerNote:
      "Do not think of Python as a separate monster. It is just a way to write down the same math steps in order.",
    symbolGuide: [
      { symbol: "=", meaning: "Assign a value to a variable." },
      { symbol: "[]", meaning: "A list of items." },
      { symbol: "for", meaning: "Repeat an action over items." }
    ],
    simpleExplanation:
      "Python lets you store values, repeat steps, and print results. That is enough to start coding math ideas.",
    formula: "result = m * x + c",
    formulaMeaning:
      "Meaning: Python can compute the same rule you already saw in algebra.",
    mlUseCase:
      "This is the language layer behind all later ML libraries and code questions.",
    intuition:
      "Ask: what values are being stored, what steps are being repeated, and what gets printed at the end?",
    examShortcuts: [
      "Variables store values you can reuse later.",
      "Lists hold multiple values in one object.",
      "Loops apply the same step repeatedly."
    ],
    bigPicture:
      "Python basics turn static math into something you can compute, test, and inspect.",
    examReadiness: [
      "Read simple assignment statements.",
      "Trace a small loop by hand.",
      "Predict printed output from a short code block."
    ],
    mcq: {
      question: "What does `x = 5` mean in Python?",
      options: [
        "Store the value 5 in the variable x",
        "Check whether x equals 5 mathematically",
        "Print the value 5",
        "Create a loop of 5 steps"
      ],
      correctIndex: 0,
      explanation: "Correct. In Python, `=` assigns a value to a variable."
    },
    problem: {
      prompt: "If `m = 2`, `x = 4`, and `c = 1`, what is `m * x + c`?",
      answers: ["9"],
      success: "Correct. Python would compute 2 * 4 + 1 = 9."
    },
    conceptQuestion: {
      prompt: "Why is Python helpful when learning math for ML?",
      answer:
        "Because it lets you test examples, compute quickly, and see the same math ideas in the form used in real ML work."
    },
    controls: [],
    codeExample: {
      title: "Tiny Python Math Example",
      code: "m = 2\nx = 4\nc = 1\nresult = m * x + c\nprint(result)",
      output: "9",
      explanation: "This is the algebra rule `mx + c`, written as Python steps."
    },
    pythonCompanion: {
      goal: "Read and write very small Python programs that compute simple math expressions.",
      examUse: "Many exams ask you to predict output, fix a line of code, or compute a formula with Python variables.",
      codeTitle: "Python Companion Example",
      code: "numbers = [2, 4, 6]\ntotal = 0\nfor n in numbers:\n    total += n\nmean = total / len(numbers)\nprint(mean)",
      output: "4.0",
      explainSteps: [
        "A list called `numbers` stores three values.",
        "The loop goes through the list one number at a time.",
        "Each number is added into `total`.",
        "At the end, Python divides by the list length to get the mean."
      ],
      traps: [
        "Using `=` when you mean comparison in plain math thinking.",
        "Forgetting indentation after a `for` loop.",
        "Forgetting that list indexing in Python starts at 0."
      ],
      examTasks: [
        "Trace the output of a small code block.",
        "Compute a formula from stored variables.",
        "Read a loop and explain what it is doing."
      ]
    },
    calculate() {
      return {
        metrics: ["Variables", "Lists", "Loops"],
        exampleSteps: [
          "Store values in named variables.",
          "Use operators like +, -, *, and /.",
          "Group values into lists when needed.",
          "Use loops to repeat the same operation across many values."
        ],
        insight:
          "The first Python skill is not advanced syntax. It is learning to read the code as a sequence of math steps.",
        drawing: {
          type: "codePanel",
          title: "python basics",
          lines: ["m = 2", "x = 4", "c = 1", "print(m * x + c)"]
        }
      };
    }
  },
  {
    key: "python-numpy",
    order: 100,
    stage: "Python Programming",
    difficulty: "Core",
    label: "NumPy Arrays, Vectors & Matrices",
    navDescription: "Use Python objects that behave like math objects.",
    subtitle:
      "This lesson connects vectors and matrices to the Python library most exams and ML code use: NumPy.",
    learningPurpose:
      "Understand how arrays represent vectors and matrices in Python.",
    whyThisBefore:
      "Study this before linear algebra coding because NumPy is the standard tool for vector and matrix operations.",
    prerequisites: ["Python Basics For Math", "Vectors", "Matrix Basics & Types"],
    mlPurpose:
      "NumPy arrays are the direct coding version of the vectors and matrices used throughout ML.",
    visualTitle: "See Python arrays as vectors and matrices.",
    visualDescription:
      "The code visual shows how a one-dimensional array acts like a vector and a two-dimensional array acts like a matrix.",
    beginnerNote:
      "A NumPy array is just a clean way to store many numbers together so Python can do math with them efficiently.",
    symbolGuide: [
      { symbol: "np.array([...])", meaning: "Create a NumPy array." },
      { symbol: ".shape", meaning: "See the array dimensions." },
      { symbol: "ndim", meaning: "See how many dimensions the array has." }
    ],
    simpleExplanation:
      "NumPy lets Python treat lists of numbers as real math objects like vectors and matrices.",
    formula: "A.shape = (rows, cols)",
    formulaMeaning:
      "Meaning: NumPy can tell you the matrix size directly.",
    mlUseCase:
      "Nearly every ML workflow uses arrays to store datasets, weights, and model outputs.",
    intuition:
      "Ask: is this a 1D vector, a 2D matrix, and what is its shape?",
    examShortcuts: [
      "1D array often acts like a vector.",
      "2D array acts like a matrix.",
      "Use `.shape` to avoid guessing dimensions."
    ],
    bigPicture:
      "This lesson is where math notation turns into the actual data structure used in code.",
    examReadiness: [
      "Create arrays correctly.",
      "Read array shape quickly.",
      "Distinguish vector-like and matrix-like arrays."
    ],
    mcq: {
      question: "What does `A.shape` usually tell you for a matrix-like NumPy array?",
      options: [
        "Its dimensions",
        "Its determinant",
        "Its inverse",
        "Its gradient"
      ],
      correctIndex: 0,
      explanation: "Correct. `.shape` reports the array dimensions."
    },
    problem: {
      prompt: "If `A = np.array([[1, 2, 3], [4, 5, 6]])`, what is `A.shape`?",
      answers: ["(2,3)", "2,3", "[2,3]"],
      success: "Correct. The array has 2 rows and 3 columns, so the shape is (2, 3)."
    },
    conceptQuestion: {
      prompt: "Why is NumPy better than plain Python lists for ML math?",
      answer:
        "Because NumPy arrays are built for numerical operations, shapes, and vectorized math."
    },
    controls: [],
    codeExample: {
      title: "Create A Vector And Matrix In NumPy",
      code: "import numpy as np\n\nv = np.array([1, 2, 3])\nA = np.array([[1, 2], [3, 4]])\nprint(v)\nprint(A.shape)",
      output: "[1 2 3]\n(2, 2)",
      explanation: "This is the Python version of a vector and a 2 × 2 matrix."
    },
    pythonCompanion: {
      goal: "Use NumPy arrays to represent the same vectors and matrices you study in math lessons.",
      examUse: "Exams often ask you to create arrays, read shapes, and tell whether something is a vector or matrix.",
      codeTitle: "NumPy Companion Example",
      code: "import numpy as np\n\nvector = np.array([4, -2])\nmatrix = np.array([[2, 0], [0, 3]])\nprint(vector.shape)\nprint(matrix.shape)",
      output: "(2,)\n(2, 2)",
      explainSteps: [
        "The first array is one-dimensional, so it behaves like a vector.",
        "The second array is two-dimensional, so it behaves like a matrix.",
        "`.shape` tells you the dimensions directly.",
        "This is the code form of reading matrix and vector sizes."
      ],
      traps: [
        "Confusing `(2,)` with `(2, 1)`.",
        "Using uneven row lengths when building a matrix.",
        "Forgetting to import NumPy as `np`."
      ],
      examTasks: [
        "Create a vector and matrix with `np.array`.",
        "Read shape and dimension from code.",
        "Spot when an array is malformed for matrix work."
      ]
    },
    calculate() {
      return {
        metrics: ["np.array", "shape", "vector vs matrix"],
        exampleSteps: [
          "Import NumPy.",
          "Create a 1D array for a vector.",
          "Create a 2D array for a matrix.",
          "Use `.shape` to read dimensions safely."
        ],
        insight:
          "The coding version of linear algebra starts with representing the objects correctly.",
        drawing: {
          type: "codePanel",
          title: "numpy arrays",
          lines: ["import numpy as np", "v = np.array([1, 2])", "A = np.array([[1, 2], [3, 4]])", "print(A.shape)"]
        }
      };
    }
  },
  {
    key: "python-linear-algebra",
    order: 101,
    stage: "Python Programming",
    difficulty: "Core",
    label: "Linear Algebra In Python",
    navDescription: "Dot product, matrix multiplication, inverse, eigenvalues.",
    subtitle:
      "This lesson connects the linear algebra chapter to the Python commands most likely to appear in coding questions.",
    learningPurpose:
      "Practice the standard Python operations for matrix multiplication, inverse, determinant, and eigen analysis.",
    whyThisBefore:
      "Study this after NumPy basics so the main linear algebra operations feel like direct translations of the math.",
    prerequisites: ["NumPy Arrays, Vectors & Matrices", "Matrices & Multiplication", "Eigenvalues & PCA Intuition"],
    mlPurpose:
      "These are the exact operations behind many ML preprocessing, optimization, and decomposition steps.",
    visualTitle: "See linear algebra operations as code commands.",
    visualDescription:
      "The code panel shows the standard NumPy or `numpy.linalg` operations used for matrix math.",
    beginnerNote:
      "Do not memorize random commands. Tie each one to a math idea you already know: multiply, invert, take determinant, find eigenvalues.",
    symbolGuide: [
      { symbol: "@", meaning: "Matrix multiplication in Python." },
      { symbol: "np.linalg.inv", meaning: "Matrix inverse." },
      { symbol: "np.linalg.eig", meaning: "Eigenvalues and eigenvectors." }
    ],
    simpleExplanation:
      "Python gives direct commands for the same matrix operations you solve by hand in class.",
    formula: "Av in math <=> A @ v in Python",
    formulaMeaning:
      "Meaning: the `@` operator performs matrix multiplication.",
    mlUseCase:
      "These operations appear in transformations, covariance analysis, PCA, and many matrix-based ML steps.",
    intuition:
      "Ask: which math operation am I trying to code, and which NumPy function matches it?",
    examShortcuts: [
      "Use `@` for matrix multiplication.",
      "Use `np.linalg.det` for determinant.",
      "Use `np.linalg.eig` for eigenvalues and eigenvectors."
    ],
    bigPicture:
      "This is where linear algebra stops being a paper-only subject and becomes executable.",
    examReadiness: [
      "Read and write matrix multiplication code.",
      "Use determinant, inverse, and eig commands correctly.",
      "Interpret the returned Python output in math terms."
    ],
    mcq: {
      question: "What does `A @ v` mean in NumPy-style Python?",
      options: [
        "Matrix multiplication",
        "Elementwise multiplication only",
        "Matrix transpose",
        "Determinant"
      ],
      correctIndex: 0,
      explanation: "Correct. `@` is the matrix-multiplication operator."
    },
    problem: {
      prompt: "If `A = np.array([[1, 2], [0, 1]])` and `v = np.array([3, 1])`, what is `A @ v`?",
      answers: ["[5,1]", "(5,1)", "5,1"],
      success: "Correct. Matrix multiplication gives (5, 1)."
    },
    conceptQuestion: {
      prompt: "Why should you connect every NumPy command to a math meaning?",
      answer:
        "Because code questions become easier when you know what the command is doing mathematically instead of memorizing syntax blindly."
    },
    controls: [],
    codeExample: {
      title: "Matrix Operations In Python",
      code: "import numpy as np\n\nA = np.array([[1, 2], [0, 1]])\nv = np.array([3, 1])\nprint(A @ v)\nprint(np.linalg.det(A))",
      output: "[5 1]\n1.0",
      explanation: "This computes a matrix-vector product and the determinant of the same matrix."
    },
    pythonCompanion: {
      goal: "Translate matrix multiplication and eigenvalue questions into standard Python commands.",
      examUse: "Coding exams often ask for one line of matrix math or ask you to interpret returned values.",
      codeTitle: "Linear Algebra Python Companion",
      code: "import numpy as np\n\nA = np.array([[1, 4], [2, 3]])\nvalues, vectors = np.linalg.eig(A)\nprint(values)\nprint(vectors)",
      output: "[ 5. -1.]\n[[ 0.70710678 -0.89442719]\n [ 0.70710678  0.4472136 ]]",
      explainSteps: [
        "`np.linalg.eig(A)` returns eigenvalues and eigenvectors.",
        "The eigenvalues come as a 1D array.",
        "The eigenvectors appear as columns in the returned matrix.",
        "This matches the eigendecomposition ideas from the math lessons."
      ],
      traps: [
        "Using `*` when you really mean matrix multiplication with `@`.",
        "Assuming eigenvectors come back as rows instead of columns.",
        "Trying to invert a singular matrix."
      ],
      examTasks: [
        "Use `@` for matrix products.",
        "Use `np.linalg.det`, `inv`, and `eig` in the right setting.",
        "Explain the math meaning of Python output."
      ]
    },
    calculate() {
      return {
        metrics: ["@", "linalg.det", "linalg.eig"],
        exampleSteps: [
          "Represent the vector and matrix as arrays.",
          "Use `@` for multiplication.",
          "Use `numpy.linalg` for determinant, inverse, and eigendecomposition-related tools.",
          "Interpret the outputs in math language."
        ],
        insight:
          "The coding side becomes much simpler once each command is tied to one exact math operation.",
        drawing: {
          type: "codePanel",
          title: "linear algebra in python",
          lines: ["A @ v", "np.linalg.det(A)", "np.linalg.inv(A)", "np.linalg.eig(A)"]
        }
      };
    }
  },
  {
    key: "python-probability",
    order: 102,
    stage: "Python Programming",
    difficulty: "Core",
    label: "Probability & Statistics In Python",
    navDescription: "Simulation, averages, and distributions in code.",
    subtitle:
      "This chapter turns probability questions into Python code you can simulate and inspect.",
    learningPurpose:
      "Use Python to compute means, simulate random outcomes, and work with simple probability distributions.",
    whyThisBefore:
      "Study this after the probability lessons so the code feels like a translation of the math, not a separate subject.",
    prerequisites: ["Python Basics For Math", "Probability Basics", "Random Variables & Expected Value", "Binomial & Cumulative Probability"],
    mlPurpose:
      "Python probability code is used for simulations, summaries, and understanding uncertainty in data and models.",
    visualTitle: "See simulation and averages as code.",
    visualDescription:
      "The code panel shows a small random experiment and the kind of statistical summary students are often asked to compute.",
    beginnerNote:
      "Simulation is useful because it lets you see probability ideas play out repeatedly instead of only as formulas.",
    symbolGuide: [
      { symbol: "np.mean", meaning: "Average of values." },
      { symbol: "np.random", meaning: "Random number generation tools." },
      { symbol: "np.sum", meaning: "Add values, useful in counting successes." }
    ],
    simpleExplanation:
      "Python can simulate repeated trials and compute the same averages and probabilities you study in theory.",
    formula: "sample_mean = np.mean(data)",
    formulaMeaning:
      "Meaning: Python can compute the average directly from a list or array of values.",
    mlUseCase:
      "This is how you inspect sampled data, estimate behavior, and summarize results in real workflows.",
    intuition:
      "Ask: what am I simulating, and what summary or probability do I want from the results?",
    examShortcuts: [
      "Use `np.mean` for the mean.",
      "Use `np.random.binomial` for repeated success/failure trials.",
      "Simulation helps check intuition for probability questions."
    ],
    bigPicture:
      "Probability in Python makes uncertainty concrete because you can generate, count, and summarize outcomes directly.",
    examReadiness: [
      "Compute mean and variance-like summaries with Python tools.",
      "Simulate a binomial process.",
      "Explain what the code is estimating."
    ],
    mcq: {
      question: "Which NumPy function is most direct for computing an average?",
      options: [
        "np.mean",
        "np.linalg.eig",
        "np.shape",
        "np.eye"
      ],
      correctIndex: 0,
      explanation: "Correct. `np.mean` computes the average."
    },
    problem: {
      prompt: "If `data = np.array([2, 4, 6])`, what is `np.mean(data)`?",
      answers: ["4", "4.0"],
      success: "Correct. The average of 2, 4, and 6 is 4."
    },
    conceptQuestion: {
      prompt: "Why is simulation useful in probability learning?",
      answer:
        "Because it helps you see how repeated random experiments behave, which strengthens intuition for formulas and distributions."
    },
    controls: [],
    codeExample: {
      title: "Probability & Statistics Example",
      code: "import numpy as np\n\ndata = np.array([2, 4, 6])\nprint(np.mean(data))\nprint(np.var(data))",
      output: "4.0\n2.6666666666666665",
      explanation: "This is the coding version of computing center and spread."
    },
    pythonCompanion: {
      goal: "Use Python to simulate probability and compute simple statistics.",
      examUse: "Exams may ask you to read output from a simulation or write a line that computes a mean or binomial sample.",
      codeTitle: "Probability Python Companion",
      code: "import numpy as np\n\ntrials = np.random.binomial(n=4, p=0.5, size=10)\nprint(trials)\nprint(np.mean(trials))",
      output: "Example output: [1 2 2 3 1 4 2 2 1 3]\nExample mean: 2.1",
      explainSteps: [
        "`np.random.binomial` simulates repeated success counts.",
        "Here each sample counts successes out of 4 trials.",
        "`size=10` means ten simulated experiments.",
        "`np.mean` summarizes the average success count."
      ],
      traps: [
        "Thinking random output must match one exact fixed sequence.",
        "Confusing the number of trials `n` with the number of simulated experiments `size`.",
        "Reading one simulation as exact probability instead of as an estimate."
      ],
      examTasks: [
        "Compute a mean with NumPy.",
        "Read a simple simulation.",
        "Explain what a binomial simulation line is doing."
      ]
    },
    calculate() {
      return {
        metrics: ["np.mean", "np.var", "np.random.binomial"],
        exampleSteps: [
          "Store data in an array.",
          "Use NumPy summary functions for mean and spread.",
          "Use random-generation functions to simulate trials.",
          "Interpret output in probability language."
        ],
        insight:
          "Python lets you check probability intuition by simulating repeated trials instead of relying only on formulas.",
        drawing: {
          type: "codePanel",
          title: "probability in python",
          lines: ["np.mean(data)", "np.var(data)", "np.random.binomial(n=4, p=0.5, size=10)"]
        }
      };
    }
  },
  {
    key: "python-functions-gradients",
    order: 103,
    stage: "Python Programming",
    difficulty: "Advanced Core",
    label: "Functions, Gradients & Plotting In Python",
    navDescription: "Write functions and inspect change with code.",
    subtitle:
      "This lesson connects the calculus side of the course to basic Python function definitions, loops, and plotting-style thinking.",
    learningPurpose:
      "Write simple functions in Python and connect them to slopes, arrays of values, and gradient-style updates.",
    whyThisBefore:
      "Study this after the function and gradient lessons so the code feels like the same math process written step by step.",
    prerequisites: ["Python Basics For Math", "Derivatives", "Multivariable Calculus", "Gradient Descent"],
    mlPurpose:
      "Defining functions and updating values step by step is central to optimization, loss evaluation, and ML experimentation.",
    visualTitle: "See a function and update rule as code.",
    visualDescription:
      "The code panel shows the exact kind of Python function and gradient-style update you may be expected to read in an exam.",
    beginnerNote:
      "A Python function is just a reusable rule. It is the programming version of the function notation you already study in math.",
    symbolGuide: [
      { symbol: "def", meaning: "Define a Python function." },
      { symbol: "return", meaning: "Send a value back from the function." },
      { symbol: "x = x - lr * grad", meaning: "One gradient-style update step." }
    ],
    simpleExplanation:
      "Python functions let you code mathematical rules, and update lines let you code optimization steps.",
    formula: "x = x - lr * grad",
    formulaMeaning:
      "Meaning: take one gradient-descent-style step in Python.",
    mlUseCase:
      "This is the coding shape behind loss functions, prediction functions, and simple optimization loops.",
    intuition:
      "Ask: what rule is the function coding, and how does the update line move the value?",
    examShortcuts: [
      "Use `def` to define a reusable rule.",
      "Use `return` to give back the result.",
      "A gradient update line is just algebra written in Python syntax."
    ],
    bigPicture:
      "This lesson ties together the math of functions and gradients with the exact coding patterns used in ML work.",
    examReadiness: [
      "Read a small Python function.",
      "Trace one or two update steps manually.",
      "Explain a gradient-descent-style line of code."
    ],
    mcq: {
      question: "What does `return` do inside a Python function?",
      options: [
        "It sends the result back",
        "It repeats the loop",
        "It imports NumPy",
        "It creates a matrix"
      ],
      correctIndex: 0,
      explanation: "Correct. `return` gives the computed value back from the function."
    },
    problem: {
      prompt: "If `x = 5`, `lr = 0.1`, and `grad = 2`, what is `x - lr * grad`?",
      answers: ["4.8"],
      success: "Correct. One update step gives 5 - 0.1 * 2 = 4.8."
    },
    conceptQuestion: {
      prompt: "Why are Python functions useful in ML math?",
      answer:
        "Because they let you write reusable rules for predictions, losses, and updates instead of repeating calculations manually."
    },
    controls: [],
    codeExample: {
      title: "Function And Gradient Step Example",
      code: "def f(x):\n    return x**2\n\nx = 5\nlr = 0.1\ngrad = 2 * x\nx = x - lr * grad\nprint(x)",
      output: "4.0",
      explanation: "This combines a Python function with one gradient-descent-style update."
    },
    pythonCompanion: {
      goal: "Connect function definitions and gradient-style updates to the calculus ideas in the math chapter.",
      examUse: "Coding exams often ask you to read a small function, compute its output, or trace an update line.",
      codeTitle: "Functions & Gradients Python Companion",
      code: "def predict(x, m, c):\n    return m * x + c\n\nprint(predict(3, 2, 1))\n\nx = 5\nlr = 0.1\ngrad = 2\nx = x - lr * grad\nprint(x)",
      output: "7\n4.8",
      explainSteps: [
        "`predict` is a Python function version of the line formula mx + c.",
        "Calling `predict(3, 2, 1)` computes 2 * 3 + 1.",
        "The second part performs one gradient-style update.",
        "This is the code version of the calculus update rule."
      ],
      traps: [
        "Forgetting indentation inside a function body.",
        "Mixing `^` with `**` for powers in Python.",
        "Reading the update line backward."
      ],
      examTasks: [
        "Define a simple function with `def`.",
        "Trace one update step in code.",
        "Connect the code to the underlying math rule."
      ],
      gradedQuestion: {
        prompt:
          "Given f(x, y) = x**2 + y**2 + 2*x*y, write Python code that computes the gradient vector [df/dx, df/dy] at an input pair (x, y) and rounds each value to 2 decimal places.",
        starterCode:
          "x, y = 2.0, 3.0\n\n# Write the gradient code below\n# df_dx = ...\n# df_dy = ...\n# print([...])",
        explanation:
          "First compute the partial derivatives by hand: df/dx = 2x + 2y and df/dy = 2y + 2x. Then translate those two formulas directly into Python variables and print the rounded list.",
        solution:
          "x, y = 2.0, 3.0\n\ndf_dx = 2 * x + 2 * y\ndf_dy = 2 * y + 2 * x\n\nprint([round(df_dx, 2), round(df_dy, 2)])",
        output: "[10.0, 10.0]"
      }
    },
    calculate() {
      return {
        metrics: ["def", "return", "gradient step"],
        exampleSteps: [
          "Write a function with `def`.",
          "Return the computed value.",
          "Compute a gradient or slope value.",
          "Use it in a simple update line."
        ],
        insight:
          "The code is not new mathematics. It is the same mathematics written as a reusable sequence of steps.",
        drawing: {
          type: "codePanel",
          title: "functions & gradients",
          lines: ["def f(x):", "    return x**2", "x = x - lr * grad", "print(x)"]
        }
      };
    }
  }
];

function curveValue(x) {
  return 0.18 * x * x - 0.8 * x + 1.2;
}

function curveSlope(x) {
  return 0.36 * x - 0.8;
}

function binomialProbability(n, x, p) {
  let combination = 1;
  for (let i = 1; i <= x; i += 1) {
    combination = (combination * (n - (x - i))) / i;
  }
  return combination * p ** x * (1 - p) ** (n - x);
}

function formatNumber(value) {
  return Number(value).toFixed(2).replace(/\.00$/, "");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function alignmentLabel(dot) {
  if (dot > 0.5) {
    return "Mostly aligned";
  }
  if (dot < -0.5) {
    return "Mostly opposed";
  }
  return "Nearly sideways";
}

function directionText(x, y) {
  const horizontal = x === 0 ? "" : x > 0 ? `${Math.abs(x)} right` : `${Math.abs(x)} left`;
  const vertical = y === 0 ? "" : y > 0 ? `${Math.abs(y)} up` : `${Math.abs(y)} down`;
  return [horizontal, vertical].filter(Boolean).join(" and ");
}

const lessonEnhancements = {
  functions: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a gym charging a fixed sign-up fee plus a cost for every class you attend.",
      graphMeaning:
        "The graph shows how total cost changes as the number of classes increases. The intercept is the starting fee and the slope is the extra cost per class.",
      mlBridge:
        "ML models do the same basic thing: take an input and turn it into an output by following one rule.",
      summary(values) {
        return `Here, x = ${values.x} could mean ${values.x} classes, slope m = ${formatNumber(values.m)} is the per-class cost, and intercept c = ${formatNumber(values.c)} is the sign-up fee.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like A Real Story",
      intro:
        "Use a simple gym-pricing story: the intercept is the sign-up fee, the slope is the cost per class, and x is how many classes you take.",
      controls: [
        { label: "Slope m", meaning: "Extra cost added each time you take one more class." },
        { label: "Intercept c", meaning: "The starting fee before you take any classes." },
        { label: "Input x", meaning: "How many classes you choose." }
      ],
      summary(values, result) {
        return `If the sign-up fee is ${formatNumber(values.c)} and each class costs ${formatNumber(values.m)}, then taking ${values.x} classes gives a total cost of ${result.metrics[2].split(" = ")[1]}. That is exactly what the function is calculating.`;
      }
    },
    realLifeExamples: [
      "Taxi fare models often start with a fixed base charge plus a per-kilometer rate. That is function thinking.",
      "In ML, an activation function takes one input value and returns one output value using one clear rule."
    ],
    goDeeper: [
      "Be able to move between equation, table, and graph without treating them as separate topics.",
      "Notice whether a model's output changes fast, slowly, or not at all as the input changes."
    ],
    extraPractice: [
      {
        prompt: "If f(x) = -2x + 5, find f(-1).",
        answer: "f(-1) = -2(-1) + 5 = 7."
      },
      {
        prompt: "A gym charges a signup fee of 100 and 20 per class. Write a function for total cost after x classes.",
        answer: "C(x) = 20x + 100."
      }
    ],
    extraMcqs: [
      {
        question: "If the slope is negative, what happens as x increases?",
        options: ["The output decreases", "The output always becomes zero", "The graph becomes vertical", "The intercept disappears"],
        correctIndex: 0,
        explanation: "Correct. Negative slope means the graph falls as x increases."
      },
      {
        question: "Which part of y = mx + c is the starting value?",
        options: ["c", "m", "x", "y"],
        correctIndex: 0,
        explanation: "Correct. c is the value when x = 0."
      }
    ]
  },
  vectors: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a drone starting at one point and then moving across a map.",
      graphMeaning:
        "The arrow shows one full movement instruction: how far to go horizontally and how far to go vertically.",
      mlBridge:
        "In ML, embeddings and feature lists are stored as vectors. The graph is the 2D version of that same idea.",
      summary(values) {
        return `This arrow could mean the drone moves ${Math.abs(values.ax)} units ${Number(values.ax) >= 0 ? "east" : "west"} and ${Math.abs(values.ay)} units ${Number(values.ay) >= 0 ? "north" : "south"}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like A Map",
      intro:
        "Treat the vector like walking around a city grid: horizontal is east-west movement and vertical is north-south movement.",
      controls: [
        { label: "Horizontal x", meaning: "How far you move right or left." },
        { label: "Vertical y", meaning: "How far you move up or down." }
      ],
      summary(values, result) {
        return `If you move ${Math.abs(values.ax)} units ${Number(values.ax) >= 0 ? "right" : "left"} and ${Math.abs(values.ay)} units ${Number(values.ay) >= 0 ? "up" : "down"}, your path becomes one vector. In ML, a feature vector works the same way except each coordinate tracks one feature instead of map movement.`;
      }
    },
    realLifeExamples: [
      "A drone moving 4 meters east and 3 meters north can be described with one vector.",
      "In ML, a sentence embedding is just a very long vector representing many learned features at once."
    ],
    goDeeper: [
      "Be comfortable reading a vector both as coordinates and as direction plus magnitude.",
      "Notice that high-dimensional ML vectors follow the same logic as 2D arrows, just with more coordinates."
    ],
    extraPractice: [
      {
        prompt: "If v = (-2, 5), which quadrant is it in?",
        answer: "Second quadrant, because x is negative and y is positive."
      },
      {
        prompt: "What is the zero vector in 2D?",
        answer: "(0, 0). It represents no movement."
      }
    ],
    extraMcqs: [
      {
        question: "What is special about the zero vector?",
        options: ["It has no movement", "It always points right", "It is the longest vector", "It can only appear in calculus"],
        correctIndex: 0,
        explanation: "Correct. The zero vector represents no displacement."
      },
      {
        question: "If only the sign of every coordinate changes, what happens?",
        options: ["The vector flips to the opposite direction", "The vector stays unchanged", "The vector disappears", "The length must become zero"],
        correctIndex: 0,
        explanation: "Correct. Flipping all signs reverses the direction."
      }
    ]
  },
  "matrix-basics": {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a spreadsheet where rows represent students and columns represent features like marks, attendance, or project scores.",
      graphMeaning:
        "The visual is teaching you how to read the shape and type of a matrix before doing any operations.",
      mlBridge:
        "ML constantly stores data and parameters in matrix form, so reading the matrix itself is a basic survival skill.",
      summary() {
        return "Before solving anything, ask: how many rows, how many columns, and what special pattern do I see?";
      }
    },
    visualAnalogy: {
      title: "Read The Matrix Like A Table",
      intro:
        "Think of a matrix like a clean data table. The type tells you what kind of table it is, and the shape tells you what operations are allowed.",
      controls: [],
      summary() {
        return "This lesson is about recognition first: if you can identify the matrix shape and type quickly, the later calculations become much easier.";
      }
    },
    advancedExplanation:
      "A lot of matrix difficulty is fake difficulty caused by weak basics. If you can read dimensions, recognize common types, and remember shape rules for addition and multiplication, then many exam questions become routine instead of confusing. This is the language layer of matrix algebra.",
    commonMistakes: [
      "Mixing up rows and columns.",
      "Thinking any two matrices can be added or multiplied.",
      "Not recognizing diagonal, identity, or zero matrices on sight."
    ],
    examAngles: [
      "You may be asked to state the dimension of a matrix immediately.",
      "You may be asked to identify whether a matrix is square, diagonal, identity, or zero.",
      "You should know the shape rule for matrix multiplication: inner dimensions must match."
    ],
    realLifeExamples: [
      "A spreadsheet of students and features is naturally a matrix.",
      "A table of pairwise similarities or covariances in ML is also a matrix."
    ],
    goDeeper: [
      "Train yourself to read matrix shape before reading the entries.",
      "Notice how special patterns like diagonal or identity already hint at the matrix's behavior."
    ],
    extraPractice: [
      {
        prompt: "Is [[2, 0], [0, 5]] square, diagonal, both, or neither?",
        answer: "Both square and diagonal.",
        steps: [
          "Count rows and columns: it is 2 × 2, so it is square.",
          "Check off-diagonal entries.",
          "They are both 0, so the matrix is diagonal.",
          "Therefore it is both square and diagonal."
        ]
      },
      {
        prompt: "Can a 2 × 3 matrix multiply a 3 × 1 matrix?",
        answer: "Yes, because the inner dimensions match.",
        steps: [
          "Write the shapes as 2 × 3 and 3 × 1.",
          "Compare the inner dimensions: 3 and 3.",
          "Because they match, multiplication is defined.",
          "The result will have outer shape 2 × 1."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "Which matrix type leaves a vector unchanged when multiplied?",
        options: ["Identity matrix", "Zero matrix", "Random matrix", "Triangular matrix"],
        correctIndex: 0,
        explanation: "Correct. The identity matrix acts like the do-nothing matrix."
      },
      {
        question: "If A is 2 × 3 and B is 3 × 4, what is the shape of AB?",
        options: ["2 × 4", "3 × 3", "2 × 3", "4 × 2"],
        correctIndex: 0,
        explanation: "Correct. The inner 3s match, and the result keeps the outer dimensions 2 and 4."
      }
    ]
  },
  matrices: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a model taking two raw student features, like algebra skill and coding skill, and remixing them into two new hidden scores.",
      graphMeaning:
        "The gold vector is the original profile and the teal vector is the transformed profile after the matrix has mixed the two inputs.",
      mlBridge:
        "This is the core action of a neural-network layer: turn one representation into another by mixing features.",
      summary(values, result) {
        return `A student profile of (${values.vx}, ${values.vy}) becomes ${result.metrics[1].split(" = ")[1]} after the feature mixer acts.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like A Feature Mixer",
      intro:
        "Imagine the input vector is a student's two raw strengths, and the matrix controls how a model mixes those two strengths into a new hidden representation.",
      controls: [
        { label: "a", meaning: "How much old x contributes to new x." },
        { label: "b", meaning: "How much old y contributes to new x." },
        { label: "c", meaning: "How much old x contributes to new y." },
        { label: "d", meaning: "How much old y contributes to new y." },
        { label: "Vector x", meaning: "The first input feature value." },
        { label: "Vector y", meaning: "The second input feature value." }
      ],
      summary(values, result) {
        return `The input profile (${values.vx}, ${values.vy}) gets remixed into ${result.metrics[1].split(" = ")[1]}. That is the same basic idea as a neural-network layer: old features go in, a transformed representation comes out.`;
      }
    },
    advancedExplanation:
      "At exam level, stop seeing a matrix as four disconnected entries. The columns tell you where the basis vectors go, the determinant tells you whether area is stretched, shrunk, or collapsed, and invertibility tells you whether the transformation can be undone. That is the frame that makes eigenvectors, regression, and neural layers much easier to read.",
    commonMistakes: [
      "Treating matrix multiplication like entrywise multiplication instead of row-by-column combination.",
      "Ignoring the geometric meaning of columns and memorizing only the arithmetic rule.",
      "Forgetting that determinant 0 means the transformation squashes space onto a lower-dimensional set and loses information."
    ],
    examAngles: [
      "You may be asked to compute Av and then interpret the output geometrically.",
      "You may be asked to identify the action of a diagonal, identity, or shear matrix from its entries.",
      "You should be able to explain what determinant sign and size say about the transformation.",
      "You may be asked to do matrix-by-matrix multiplication before applying the result to a vector."
    ],
    advancedExample: {
      title: "Build a matrix from transformed basis vectors.",
      steps: [
        "Suppose T(e1) = (2, 1) and T(e2) = (3, 4).",
        "Put those output vectors in the columns of the matrix.",
        "So the matrix is A = [[2, 3], [1, 4]].",
        "Now any input vector can be transformed by multiplying with that matrix."
      ]
    },
    examQuestions: [
      {
        prompt: "A matrix sends e1 to (1, 2) and e2 to (0, 3). Write the matrix.",
        answer: "A = [[1, 0], [2, 3]].",
        explanation: "The columns of a matrix are exactly the images of the basis vectors.",
        steps: [
          "Take T(e1) = (1, 2) as the first column.",
          "Take T(e2) = (0, 3) as the second column.",
          "Place them side by side.",
          "That gives A = [[1, 0], [2, 3]]."
        ]
      },
      {
        prompt: "What does det(A) = 0 mean geometrically?",
        answer: "The transformation collapses area and is not invertible.",
        explanation: "When the determinant is zero, the output vectors become linearly dependent, so some information is lost.",
        steps: [
          "Determinant measures signed area scaling in 2D.",
          "If that scale factor is zero, all output parallelograms have zero area.",
          "That means space has been flattened onto a line or point.",
          "A flattened transformation cannot be undone uniquely."
        ]
      }
    ],
    realLifeExamples: [
      "An image filter can be thought of as a matrix-like transformation on pixel values.",
      "In ML, one dense layer of a neural network is matrix multiplication followed by a bias and activation.",
      "Stacking multiple linear layers is matrix-by-matrix multiplication in disguise."
    ],
    goDeeper: [
      "Think of a matrix as a transformation machine, not a table to memorize.",
      "Practice seeing matrix multiplication as mixing input coordinates into new coordinates.",
      "Remember that matrix-by-matrix multiplication means composing two transformation machines."
    ],
    extraPractice: [
      {
        prompt: "If A = [[2, 0], [0, 3]], what does A do geometrically?",
        answer: "It scales x by 2 and y by 3.",
        steps: [
          "Read the diagonal entries.",
          "The x-coordinate is multiplied by 2.",
          "The y-coordinate is multiplied by 3.",
          "So the transformation stretches along the axes without mixing them."
        ]
      },
      {
        prompt: "If A is the identity matrix, what is Av for any vector v?",
        answer: "Av = v.",
        steps: [
          "Identity means the diagonal entries are 1 and the off-diagonal entries are 0.",
          "Each coordinate is copied directly.",
          "No stretching, shearing, or rotation occurs.",
          "So the output equals the input."
        ]
      },
      {
        prompt: "If A = [[1, 2], [3, 4]] and v = (1, -1), find Av.",
        answer: "Av = (-1, -1).",
        steps: [
          "Compute the first coordinate: 1×1 + 2×(-1) = -1.",
          "Compute the second coordinate: 3×1 + 4×(-1) = -1.",
          "Write the result as a vector.",
          "So Av = (-1, -1)."
        ]
      },
      {
        prompt: "Compute AB if A = [[1, 2], [0, 1]] and B = [[2, 0], [1, 3]].",
        answer: "AB = [[4, 6], [1, 3]].",
        steps: [
          "Use row-by-column multiplication.",
          "First row with first column: 1×2 + 2×1 = 4.",
          "First row with second column: 1×0 + 2×3 = 6.",
          "Second row gives 0×2 + 1×1 = 1 and 0×0 + 1×3 = 3, so AB = [[4, 6], [1, 3]]."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does a diagonal matrix mainly do?",
        options: ["Scales coordinates independently", "Always rotates vectors", "Always projects to zero", "Always swaps coordinates"],
        correctIndex: 0,
        explanation: "Correct. Diagonal matrices usually scale coordinates without mixing them."
      },
      {
        question: "What do the columns of a 2×2 matrix tell you geometrically?",
        options: ["Where the basis vectors go", "The mean of the dataset", "The derivative of the function", "The probabilities of classes"],
        correctIndex: 0,
        explanation: "Correct. The columns show the transformed basis directions."
      }
    ]
  },
  transformations: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine printing a city map on a rubber sheet and then stretching or shearing the whole sheet.",
      graphMeaning:
        "The visual is not about one point only. It shows how the whole space changes when the basic horizontal and vertical directions move.",
      mlBridge:
        "ML layers also reshape whole representation spaces so that useful patterns become easier for the model to separate.",
      summary(values, result) {
        return `In this version, the map's horizontal basis becomes ${result.metrics[0].split(" = ")[1]} and the vertical basis becomes ${result.metrics[1].split(" = ")[1]}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like Reshaping A Whole Map",
      intro:
        "Instead of one point moving, imagine a whole printed map being stretched or sheared. The matrix tells you what happens to the map's basic horizontal and vertical directions.",
      controls: [
        { label: "a, c", meaning: "Where the horizontal basis direction ends up." },
        { label: "b, d", meaning: "Where the vertical basis direction ends up." },
        { label: "Vector x, Vector y", meaning: "One sample point chosen from the whole space." }
      ],
      summary(values, result) {
        return `The horizontal direction now behaves like ${result.metrics[0].split(" = ")[1]} and the vertical direction behaves like ${result.metrics[1].split(" = ")[1]}. Once you know that, you can picture how the whole space is being reshaped, not just one vector.`;
      }
    },
    advancedExplanation:
      "A linear transformation is a rule on the whole space, not just a trick for one vector. At exam level, you should connect three views instantly: the matrix entries, the moved basis vectors, and the geometric effect on every vector. This is the same viewpoint you need later for eigenvectors, PCA, and neural-network layers.",
    commonMistakes: [
      "Describing the action on one sample vector and thinking that fully explains the transformation.",
      "Forgetting that linear transformations preserve the origin and map lines to lines.",
      "Not using transformed basis vectors to reconstruct the entire map.",
      "Mistaking a shifted rule like T(x1, x2) = (x1 + 1, x2 + 2) for a linear transformation when it is actually affine."
    ],
    examAngles: [
      "You may be asked to identify a transformation from the images of e1 and e2.",
      "You may be asked whether a rule is linear by checking additivity and scaling behavior.",
      "You should be able to recognize scaling, shear, reflection, and projection patterns.",
      "You may be asked to explain why adding a constant shift breaks linearity."
    ],
    advancedExample: {
      title: "Decide the transformation from basis images.",
      steps: [
        "Suppose T(e1) = (1, 0) and T(e2) = (1, 1).",
        "The first basis direction stays fixed, but the second gets tilted toward x.",
        "That is a shear transformation.",
        "The matrix is built by placing those outputs as columns: [[1, 1], [0, 1]]."
      ]
    },
    examQuestions: [
      {
        prompt: "How can you tell from a matrix whether the origin moves?",
        answer: "For a linear transformation, the origin never moves.",
        explanation: "Linearity forces T(0) = 0, so if the origin moves, the rule is not purely linear.",
        steps: [
          "Use T(0) = T(0 + 0).",
          "By linearity, T(0 + 0) = T(0) + T(0).",
          "So T(0) must equal 0.",
          "Therefore the origin stays fixed."
        ]
      },
      {
        prompt: "Why do transformed basis vectors determine the whole transformation?",
        answer: "Because every vector is a combination of basis vectors.",
        explanation: "Once you know how the map acts on the basis, linearity tells you how it acts on any combination of them.",
        steps: [
          "Write any vector as x e1 + y e2.",
          "Apply T to that combination.",
          "Use linearity: T(x e1 + y e2) = xT(e1) + yT(e2).",
          "So knowing T(e1) and T(e2) determines every output."
        ]
      }
    ],
    realLifeExamples: [
      "Stretching a photo in one direction is a transformation of the image space.",
      "A learned feature layer in ML reshapes the whole representation space, not just one data point."
    ],
    goDeeper: [
      "Be able to explain a transformation by describing what happens to the basis vectors.",
      "Recognize that understanding the action on space is more powerful than memorizing entries."
    ],
    extraPractice: [
      {
        prompt: "If both basis vectors double, what transformation is that?",
        answer: "Uniform scaling by 2.",
        steps: [
          "Look at what happens to e1 and e2.",
          "If both directions keep their lines and double in length, every vector doubles too.",
          "That is the same scale factor in every direction.",
          "So the transformation is uniform scaling by 2."
        ]
      },
      {
        prompt: "Why can one transformation affect every point consistently?",
        answer: "Because linear transformations follow one fixed rule for the whole space.",
        steps: [
          "A linear map is defined by one matrix or one consistent rule.",
          "That rule is applied to every vector.",
          "The same basis movement governs all vectors.",
          "So the effect is globally consistent."
        ]
      },
      {
        prompt: "The matrix [[1, 1], [0, 1]] acts on space. What geometric effect should you expect?",
        answer: "A shear to the right.",
        steps: [
          "Track the basis: e1 stays (1, 0).",
          "e2 becomes (1, 1), so the vertical direction tilts toward x.",
          "That means the shape slants without pure rotation.",
          "This is the standard shear pattern."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "If T(e1) and T(e2) are known, what else is essentially known?",
        options: ["The whole linear transformation", "The dataset labels", "The loss function", "The training accuracy"],
        correctIndex: 0,
        explanation: "Correct. Knowing the transformed basis determines the full linear map."
      },
      {
        question: "Which is a common linear transformation effect?",
        options: ["Shear", "Taking a median", "Sorting values", "Random sampling"],
        correctIndex: 0,
        explanation: "Correct. Shear is a standard linear transformation."
      }
    ]
  },
  basis: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine giving walking instructions on a city map using normal east-north streets, then switching to a map where the streets run diagonally.",
      graphMeaning:
        "The teal arrow is the same trip, but the gold and olive arrows are the directions used to describe that trip.",
      mlBridge:
        "Change-of-basis ideas show up whenever ML rewrites data in more useful coordinates, such as principal-component coordinates.",
      summary(values, result) {
        return `The same vector (${values.vx}, ${values.vy}) now has tilted-basis coordinates ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like Street Directions",
      intro:
        "The input sliders pick one actual trip, but the basis arrows change the language used to describe that trip.",
      controls: [
        { label: "Vector x", meaning: "How far the trip goes in the standard horizontal direction." },
        { label: "Vector y", meaning: "How far the trip goes in the standard vertical direction." }
      ],
      summary(values, result) {
        return `The actual trip stays (${values.vx}, ${values.vy}), but the rebuilding instructions in the tilted basis become ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "Basis questions are exam favorites because they test whether you understand that coordinates depend on the chosen reference directions. In standard basis, the coordinates are obvious. In a different basis, you must solve for the coefficients that rebuild the same geometric vector. This is the mindset you need before diagonalization and eigendecomposition.",
    commonMistakes: [
      "Thinking the vector changes when only the basis changes.",
      "Mixing up the basis vectors with the coordinates.",
      "Forgetting to solve for coefficients when the basis is non-standard."
    ],
    examAngles: [
      "You may be asked to give standard-basis coordinates immediately.",
      "You may be asked to express a vector in a different basis by solving a small system.",
      "You should be able to explain the phrase 'same vector, different representation'."
    ],
    realLifeExamples: [
      "A route can be described in normal north-east directions or in diagonal street directions without changing the actual trip.",
      "In ML, PCA describes the same data point in a new coordinate system built from principal directions."
    ],
    goDeeper: [
      "Practice separating the geometry from the coordinate description.",
      "Treat a basis as a language for describing vectors."
    ],
    extraPractice: [
      {
        prompt: "What are the coordinates of (4, -2) in the standard basis?",
        answer: "(4, -2).",
        steps: [
          "Standard basis uses e1 = (1, 0) and e2 = (0, 1).",
          "Read the vector directly as horizontal and vertical components.",
          "That gives 4 in the first coordinate and -2 in the second.",
          "So the coordinates are (4, -2)."
        ]
      },
      {
        prompt: "In the basis {(1, 1), (1, -1)}, what are the coordinates of (2, 0)?",
        answer: "(1, 1).",
        steps: [
          "Write (2, 0) = a(1, 1) + b(1, -1).",
          "Solve a + b = 2 and a - b = 0.",
          "That gives a = 1 and b = 1.",
          "So the coordinates are (1, 1)."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does a basis do?",
        options: ["Provides building directions for all vectors", "Changes the dimension of the space", "Removes vector length", "Forces all coordinates to be positive"],
        correctIndex: 0,
        explanation: "Correct. A basis provides the directions used to build and describe every vector in the space."
      },
      {
        question: "If only the basis changes, what stays the same?",
        options: ["The geometric vector", "Its coordinates", "The coefficients in every basis", "The matrix entries"],
        correctIndex: 0,
        explanation: "Correct. The vector in space stays the same even if the coordinate description changes."
      }
    ]
  },
  composition: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine editing a photo by first enlarging it and then applying another effect, or repeating the same enlargement several times.",
      graphMeaning:
        "The graph shows the original vector and the result after repeating the same transformation multiple times.",
      mlBridge:
        "Deep learning layers are compositions of transformations, and repeated updates appear in iterative ML algorithms.",
      summary(values, result) {
        return `With scale ${formatNumber(values.scale)} repeated ${values.power} times, the vector ends at ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like Repeated Filters",
      intro:
        "Think of the same filter being applied over and over again. Each repetition changes the result from the previous step.",
      controls: [
        { label: "Scale factor", meaning: "How much one application stretches every vector." },
        { label: "Repeat count", meaning: "How many times the same transformation is applied." },
        { label: "Vector x / Vector y", meaning: "The starting vector before repeated transformation." }
      ],
      summary(values, result) {
        return `One step scales by ${formatNumber(values.scale)}, but ${values.power} repeated steps scale by ${result.metrics[1].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "Composition is where linear algebra starts behaving like a process. Exams often test whether you can keep the order straight, since BA means 'do A first, then B'. Matrix powers are the repeated-transformation version of this idea, and they matter because diagonalization later turns hard repeated multiplication into easy diagonal powers.",
    commonMistakes: [
      "Reversing the order of matrix multiplication in a composition question.",
      "Thinking A^2 means doubling every entry instead of multiplying A by itself.",
      "Forgetting that repeated scaling multiplies factors, not adds them."
    ],
    examAngles: [
      "You may be asked to compute A^2 or A^3 for a simple matrix.",
      "You may be asked to describe the geometry of repeated scaling.",
      "You should be able to explain why BA and AB usually differ."
    ],
    realLifeExamples: [
      "Applying the same zoom filter to an image three times is like a matrix power.",
      "A deep model composes one transformation after another instead of stopping after one step."
    ],
    goDeeper: [
      "Think carefully about what happens after one step versus many steps.",
      "Treat order as part of the meaning, not just as notation."
    ],
    extraPractice: [
      {
        prompt: "If A = [[2, 0], [0, 2]], what are A^2 and A^3?",
        answer: "A^2 = [[4, 0], [0, 4]] and A^3 = [[8, 0], [0, 8]].",
        steps: [
          "Recognize A = 2I.",
          "Square the factor 2 to get A^2 = 4I.",
          "Cube the factor 2 to get A^3 = 8I.",
          "Write each as a diagonal matrix."
        ]
      },
      {
        prompt: "What is the effect of applying A = [[2, 0], [0, 2]] three times?",
        answer: "Uniform scaling by 8.",
        steps: [
          "Each application doubles every length.",
          "Three applications give 2 × 2 × 2 = 8.",
          "Every direction keeps its line.",
          "So the whole space scales uniformly by 8."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does order BA mean?",
        options: ["Apply A first, then B", "Apply B first, then A", "Add A and B", "Square both matrices"],
        correctIndex: 0,
        explanation: "Correct. The matrix closest to the vector acts first, so BA means A acts first and then B."
      },
      {
        question: "What does A^3 mainly represent geometrically?",
        options: ["Repeating the same transformation three times", "Adding three vectors", "Taking three determinants", "Changing basis once"],
        correctIndex: 0,
        explanation: "Correct. A power means repeated application of the same matrix transformation."
      }
    ]
  },
  "inverse-spaces": {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a photo-editing tool that sometimes keeps all details and sometimes crushes the whole image into a line-like blur.",
      graphMeaning:
        "The basis arrows show whether two independent output directions survive. If they collapse together, rank drops and invertibility is lost.",
      mlBridge:
        "This is the same reason singular matrices, redundant features, and collapsed representations matter in ML.",
      summary(values, result) {
        return `For this matrix, the graph says ${result.metrics[1]} and currently ${result.metrics[2].toLowerCase()}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like Information Flow",
      intro:
        "The four matrix entries control whether the transformation keeps two independent directions or crushes them together.",
      controls: [
        { label: "a, c", meaning: "First output column direction." },
        { label: "b, d", meaning: "Second output column direction." }
      ],
      summary(values, result) {
        return `If the two columns become dependent, information collapses and the matrix stops being fully reversible. Right now: ${result.metrics[2]}.`;
      }
    },
    advancedExplanation:
      "This topic looks abstract until you translate it geometrically. Column space is the set of outputs you can produce. Null space is the set of directions you completely lose. Rank counts how many independent output directions survive. Inverse exists only when no information is lost.",
    commonMistakes: [
      "Thinking determinant, rank, null space, and inverse are unrelated ideas.",
      "Assuming rank 1 still means the matrix is reversible.",
      "Forgetting that null space is about inputs, not outputs."
    ],
    examAngles: [
      "You may be asked to read rank from geometry or determinant in 2 × 2 cases.",
      "You may be asked to describe column space and null space in words.",
      "You should be able to explain why singular means non-invertible."
    ],
    realLifeExamples: [
      "A camera projection can crush 3D depth into a 2D image and lose information.",
      "Redundant features in ML can create rank issues and unstable inverses."
    ],
    goDeeper: [
      "Link determinant zero to geometric collapse.",
      "Remember: output directions belong to column space, vanished input directions belong to null space."
    ],
    extraPractice: [
      {
        prompt: "If det(A) = 0 for a 2 × 2 matrix, what can you say about invertibility?",
        answer: "It is not invertible.",
        steps: [
          "For 2 × 2 matrices, nonzero determinant means invertible.",
          "Here the determinant is zero.",
          "So the matrix collapses area.",
          "That makes it non-invertible."
        ]
      },
      {
        prompt: "What does rank 1 mean geometrically in 2D?",
        answer: "All outputs lie on one line.",
        steps: [
          "Start with a 2D plane.",
          "Only one independent output direction survives.",
          "So every output becomes a multiple of that one direction.",
          "That means the output set is a line."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does null space contain?",
        options: ["Inputs sent to zero", "All possible outputs", "All eigenvalues", "Only inverse matrices"],
        correctIndex: 0,
        explanation: "Correct. Null space is the set of input vectors the matrix maps to the zero vector."
      },
      {
        question: "If a 2 × 2 matrix has rank 2, what is true?",
        options: ["It keeps two independent directions", "It must be the zero matrix", "Its null space is the whole plane", "It cannot have an inverse"],
        correctIndex: 0,
        explanation: "Correct. Rank 2 means full independent output directions remain in 2D."
      }
    ]
  },
  dot: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine one vector is a user's interest profile and the other is the direction of a course, product, or document.",
      graphMeaning:
        "When the arrows line up, the score rises. When they point sideways, the score falls toward zero. When they oppose each other, the score becomes negative.",
      mlBridge:
        "This is exactly how recommendation, retrieval, and search systems often score similarity.",
      summary(values, result) {
        return `With B length ${formatNumber(values.bmag)} and angle ${values.bangle}°, the current match score is ${result.metrics[0].split(" = ")[1]}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Sliders Like Matching A User To A Topic",
      intro:
        "Pretend vector A is a user's interests and vector B is the direction of one course or recommendation. The dot product tells how much they line up.",
      controls: [
        { label: "A horizontal / A vertical", meaning: "The user's current preference direction." },
        { label: "B length", meaning: "How strong the topic signal is." },
        { label: "B angle", meaning: "Which direction the topic points." }
      ],
      summary(values, result) {
        const score = result.metrics[0].split(" = ")[1];
        return `When the recommendation points in a similar direction to the user profile, the match score grows. Here the dot-product score is ${score}, so the system would read this as ${score.startsWith("-") ? "a poor match" : "some degree of alignment"}.`;
      }
    },
    realLifeExamples: [
      "If two people pull a sled in nearly the same direction, more of their effort adds together.",
      "Search systems often score how well a query vector matches a document vector using a dot product."
    ],
    goDeeper: [
      "Be able to interpret the sign and size of the dot product without immediately reaching for the formula.",
      "Connect dot product to similarity and weighted sums in high-dimensional ML settings."
    ],
    extraPractice: [
      {
        prompt: "What is the dot product of (2, 0) and (0, 5)?",
        answer: "0, because the vectors are perpendicular."
      },
      {
        prompt: "If two vectors are aligned and long, what should happen to their dot product?",
        answer: "It should be strongly positive."
      }
    ],
    extraMcqs: [
      {
        question: "What does a dot product near zero usually suggest?",
        options: ["The vectors are nearly perpendicular", "The vectors are identical", "Both vectors are zero", "The vectors must have equal lengths"],
        correctIndex: 0,
        explanation: "Correct. Near-zero dot product usually indicates near-orthogonality."
      },
      {
        question: "Why is dot product useful in recommendation systems?",
        options: ["It summarizes similarity into one score", "It removes all uncertainty", "It sorts labels alphabetically", "It guarantees fairness"],
        correctIndex: 0,
        explanation: "Correct. It compresses matching coordinates into a useful relevance score."
      }
    ]
  },
  derivatives: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine riding a bicycle on a hill and asking: how steep is the road exactly where I am right now?",
      graphMeaning:
        "The tangent line shows the local steepness at one point on the curve. That steepness is the derivative there.",
      mlBridge:
        "Training uses the same idea: derivatives tell you whether changing a parameter will increase or decrease loss.",
      summary(values, result) {
        return `At x = ${formatNumber(values.x0)}, the graph's local steepness is ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    realLifeExamples: [
      "A car's speedometer is tracking how position changes over time, which is derivative thinking.",
      "In ML, the derivative of loss with respect to a parameter tells whether that parameter should go up or down."
    ],
    goDeeper: [
      "Learn to infer derivative sign directly from a graph.",
      "Connect derivative size to sensitivity: big derivative means the output reacts strongly to small input changes."
    ],
    extraPractice: [
      {
        prompt: "If a function is flat at a point, what is its derivative there likely to be?",
        answer: "Near zero."
      },
      {
        prompt: "If f(x) = 3x², what is f'(2)?",
        answer: "f'(x) = 6x, so f'(2) = 12."
      }
    ],
    extraMcqs: [
      {
        question: "What does a derivative of zero usually mean at a point?",
        options: ["The graph is locally flat", "The function does not exist", "The graph is vertical", "The output is negative"],
        correctIndex: 0,
        explanation: "Correct. Zero derivative usually signals local flatness."
      },
      {
        question: "Why are derivatives important in ML?",
        options: ["They guide parameter updates", "They remove all data noise", "They replace vectors", "They make probability unnecessary"],
        correctIndex: 0,
        explanation: "Correct. They tell optimization how the loss changes with parameters."
      }
    ]
  },
  multivariable: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine standing on a smooth bowl-shaped hill and deciding which direction climbs fastest.",
      graphMeaning:
        "The contour rings are equal-height lines, and the gradient arrow shows the steepest uphill direction from your current position.",
      mlBridge:
        "Loss surfaces in ML work the same way. The gradient tells training which way parameters push loss upward or downward.",
      summary(values, result) {
        return `From point (${values.px}, ${values.py}), the current uphill direction is ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "At exam level, multivariable calculus is not just 'take two derivatives'. You need to know what partial derivatives measure, why the gradient is perpendicular to level curves, and why a zero gradient is only a candidate critical point rather than an automatic minimum. This is exactly the language used in optimization and backpropagation.",
    commonMistakes: [
      "Treating the gradient like a single number instead of a vector of partial derivatives.",
      "Forgetting to hold the other variables fixed when taking a partial derivative.",
      "Assuming gradient zero always means a minimum without checking the local shape."
    ],
    examAngles: [
      "You may be asked to compute a gradient and evaluate it at a point.",
      "You may be asked to explain why the negative gradient gives steepest local decrease.",
      "You should be able to interpret contour plots and relate them to gradient direction."
    ],
    advancedExample: {
      title: "Gradient on a quadratic loss surface.",
      steps: [
        "Take f(x, y) = x^2 + 4y^2.",
        "Differentiate partially: ∂f/∂x = 2x and ∂f/∂y = 8y.",
        "So the gradient is (2x, 8y).",
        "At (1, 1), the gradient is (2, 8), showing the function rises much faster in the y-direction."
      ]
    },
    examQuestions: [
      {
        prompt: "Why is the gradient perpendicular to level curves?",
        answer: "Because moving along a level curve does not change the function value, so the gradient must point in the orthogonal direction of greatest change.",
        explanation: "The gradient captures the direction where the function increases fastest, while tangent directions along a contour keep the value constant.",
        steps: [
          "A level curve keeps f constant.",
          "So tangent motion along that curve gives zero first-order change in f.",
          "The gradient stores the direction of change of f.",
          "Therefore it must be perpendicular to tangent directions of the contour."
        ]
      },
      {
        prompt: "Does ∇f = 0 guarantee a minimum?",
        answer: "No. It only gives a critical point candidate.",
        explanation: "A zero gradient can describe a minimum, maximum, or saddle point.",
        steps: [
          "Zero gradient means local first-order change disappears.",
          "But second-order shape still matters.",
          "The surface may curve upward, downward, or in mixed directions.",
          "So more analysis is needed before calling it a minimum."
        ]
      }
    ],
    realLifeExamples: [
      "A mountain landscape has many possible directions of movement, not just left and right. That is multivariable thinking.",
      "ML losses depend on many weights at the same time, so training needs gradient vectors, not single slopes."
    ],
    goDeeper: [
      "Be able to explain why the gradient is a vector and not a single number.",
      "Understand that optimization in ML happens in high-dimensional parameter spaces."
    ],
    extraPractice: [
      {
        prompt: "For f(x, y) = x² + 3y², what is ∇f?",
        answer: "(2x, 6y).",
        steps: [
          "Differentiate with respect to x while treating y as constant.",
          "That gives 2x.",
          "Differentiate with respect to y while treating x as constant.",
          "That gives 6y, so the gradient is (2x, 6y)."
        ]
      },
      {
        prompt: "At a minimum, what often happens to the gradient?",
        answer: "It becomes zero or very close to zero.",
        steps: [
          "At a smooth minimum, there is no downhill first-order direction left.",
          "That means the local slope in every coordinate direction is tiny or zero.",
          "Those partial derivatives collect into the gradient.",
          "So the gradient is often zero or close to zero."
        ]
      },
      {
        prompt: "Find ∇f at (1, -1) for f(x, y) = 3x² + xy + y².",
        answer: "∇f(1, -1) = (5, -1).",
        steps: [
          "Compute partials: ∂f/∂x = 6x + y and ∂f/∂y = x + 2y.",
          "Substitute (x, y) = (1, -1) into the first partial: 6(1) + (-1) = 5.",
          "Substitute into the second partial: 1 + 2(-1) = -1.",
          "So the gradient is (5, -1)."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does the gradient point toward?",
        options: ["Steepest increase", "Steepest decrease", "Always toward the origin", "Always along the x-axis"],
        correctIndex: 0,
        explanation: "Correct. The gradient points uphill."
      },
      {
        question: "Why do we use the negative gradient in optimization?",
        options: ["To move downhill", "To increase the loss", "To remove variables", "To create more dimensions"],
        correctIndex: 0,
        explanation: "Correct. Minimization means moving against the uphill direction."
      }
    ]
  },
  "vector-valued": {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a drone moving around a circular track. One input parameter t tells you exactly where the drone is at that moment.",
      graphMeaning:
        "The path is the full curve and the arrow is the current output vector at one chosen parameter value.",
      mlBridge:
        "This matters any time one model input controls several outputs together, including trajectories and embedding paths.",
      summary(values, result) {
        return `At t = ${formatNumber(values.t)}, the current output vector is approximately (${result.metrics[1].split('≈ ')[1]}, ${result.metrics[2].split('≈ ')[1]}).`;
      }
    },
    visualAnalogy: {
      title: "Read The Slider Like A Time Parameter",
      intro:
        "The slider is not changing one coordinate directly. It is moving one master parameter that updates every output coordinate together.",
      controls: [{ label: "Parameter t", meaning: "The shared input that moves the point along the whole path." }],
      summary(values) {
        return `Changing t changes every component of the vector together, which is why the output traces a path instead of a single number line.`;
      }
    },
    advancedExplanation:
      "This topic matters because many advanced math and ML objects are naturally vector-valued. Once the output becomes a vector, you stop thinking about one graph y = f(x) and start thinking about a moving point or path in space.",
    commonMistakes: [
      "Treating each component as unrelated instead of as one coordinated output.",
      "Forgetting to plug the same parameter into every component.",
      "Thinking the path is separate from the function rather than produced by it."
    ],
    examAngles: [
      "You may be asked to evaluate a vector-valued function at a specific parameter.",
      "You may be asked to explain what geometric path the function traces.",
      "You should be able to compare scalar-valued and vector-valued outputs clearly."
    ],
    realLifeExamples: [
      "A moving particle has one time input but a 2D or 3D position output.",
      "Trajectory prediction and path planning naturally use vector-valued functions."
    ],
    goDeeper: [
      "Treat the parameter like a timeline or controller.",
      "Remember that the curve is traced by outputs of one function, not by disconnected points."
    ],
    extraPractice: [
      {
        prompt: "If r(t) = (t, t²), what is r(-1)?",
        answer: "(-1, 1).",
        steps: [
          "Plug t = -1 into the first component to get -1.",
          "Plug t = -1 into the second component to get 1.",
          "Combine the results.",
          "So r(-1) = (-1, 1)."
        ]
      },
      {
        prompt: "What does the parameter do in a vector-valued function?",
        answer: "It controls all output coordinates together.",
        steps: [
          "Start with one input parameter t.",
          "Each component depends on the same t.",
          "As t changes, the whole output vector changes.",
          "That is why a path gets traced."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does r(t) usually describe geometrically?",
        options: ["A path or moving point", "Only one fixed number", "A probability table", "A matrix inverse"],
        correctIndex: 0,
        explanation: "Correct. A vector-valued function often traces a path in space."
      },
      {
        question: "Why is r(t) = (x(t), y(t)) still one function?",
        options: ["Because one input parameter controls the full output vector", "Because x(t) and y(t) must be equal", "Because it has no graph", "Because it is always linear"],
        correctIndex: 0,
        explanation: "Correct. One shared input controls the whole vector output."
      }
    ]
  },
  "vector-valued": {
    goal: "Represent a path in code by letting one parameter control several coordinates at once.",
    examUse: "Useful for parametric curves, motion, and vector-valued function questions.",
    codeTitle: "Vector-Valued Function In Python",
    code: "def r(t):\n    return [t, t**2]\n\nprint(r(-1))\nprint(r(2))",
    output: "[-1, 1]\n[2, 4]",
    explainSteps: [
      "The same input t is used in both coordinates.",
      "The output is a pair, not one number.",
      "Changing t moves the point along a path.",
      "This is the coding form of r(t) = (x(t), y(t))."
    ],
    traps: [
      "Using different parameters for different coordinates.",
      "Forgetting the output is a vector-like object.",
      "Thinking the function must return one scalar."
    ],
    examTasks: [
      "Define a vector-valued function.",
      "Evaluate the function at given t values.",
      "Relate the outputs to a path."
    ],
    gradedQuestions: [
      {
        prompt: "Write a Python function `r(t)` that returns `[t, 2 * t]`, then print `r(3)`.",
        starterCode: "# Define r(t)\n# Print r(3)",
        explanation: "Use one input parameter and return both coordinates together in a list.",
        solution: "def r(t):\n    return [t, 2 * t]\n\nprint(r(3))",
        output: "[3, 6]"
      }
    ]
  },
  probability: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a coin that may be fair or biased, and you want to see how belief is split between heads and tails.",
      graphMeaning:
        "The bar heights show how much probability mass is assigned to each possible outcome.",
      mlBridge:
        "Classification models also split belief across outcomes, such as spam vs not spam.",
      summary(values, result) {
        return `Right now the graph is assigning ${result.metrics[0].split(" = ")[1]} to heads and ${result.metrics[1].split(" = ")[1]} to tails.`;
      }
    },
    realLifeExamples: [
      "Weather apps saying there is a 70% chance of rain are using probability to represent uncertainty.",
      "A classifier that outputs 0.9 for spam is expressing uncertainty, not certainty."
    ],
    goDeeper: [
      "Be able to separate likelihood from certainty.",
      "Practice sanity-checking whether a claimed probability is even valid."
    ],
    extraPractice: [
      {
        prompt: "If P(A) = 0.25, what is P(not A)?",
        answer: "0.75."
      },
      {
        prompt: "Can a probability be -0.2 or 1.3?",
        answer: "No. Probabilities must be between 0 and 1."
      }
    ],
    extraMcqs: [
      {
        question: "What must the probabilities of all complete mutually exclusive outcomes sum to?",
        options: ["1", "0", "The sample size", "The mean"],
        correctIndex: 0,
        explanation: "Correct. A full probability distribution sums to 1."
      },
      {
        question: "What does a probability of 0.5 suggest?",
        options: ["Moderate uncertainty", "Impossible event", "Guaranteed event", "Negative chance"],
        correctIndex: 0,
        explanation: "Correct. 0.5 is a balanced uncertain case, not certainty."
      }
    ]
  },
  binomial: {
    goal: "Simulate repeated success counts and connect exact vs cumulative binomial questions to code.",
    examUse: "Useful for probability coding questions involving repeated Bernoulli trials.",
    codeTitle: "Binomial Simulation In Python",
    code: "import numpy as np\n\nsamples = np.random.binomial(n=4, p=0.5, size=8)\nprint(samples)\nprint(np.mean(samples <= 2))",
    output: "Output will vary.",
    explainSteps: [
      "Each sample counts successes out of 4 trials.",
      "The array stores several repeated experiments.",
      "The comparison `samples <= 2` marks cumulative events.",
      "Taking the mean estimates the cumulative probability."
    ],
    traps: [
      "Confusing `size` with the number of trials `n`.",
      "Reading one simulation as the exact theoretical probability.",
      "Mixing exact and cumulative questions."
    ],
    examTasks: [
      "Simulate binomial counts.",
      "Estimate a cumulative probability from simulation.",
      "Interpret what the code is counting."
    ],
    gradedQuestions: [
      {
        prompt: "Simulate 6 binomial samples with `n = 3` and `p = 0.5`, then print the sample array.",
        starterCode: "import numpy as np\n\n# Simulate and print the binomial samples",
        explanation: "Use `np.random.binomial` with the correct trial count, success probability, and sample size.",
        solution: "import numpy as np\n\nsamples = np.random.binomial(n=3, p=0.5, size=6)\nprint(samples)",
        output: "Output will vary."
      }
    ]
  },
  "random-variables": {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a quiz with pass = 1 and fail = 0. The random variable turns those uncertain outcomes into numbers.",
      graphMeaning:
        "The bars show the possible values of X and the expected-value line shows the long-run average score over many repeats.",
      mlBridge:
        "Expected value is everywhere in ML: expected loss, expected reward, and average predicted behavior.",
      summary(values, result) {
        return `With P(X = 1) = ${formatNumber(values.p)}, the long-run average becomes ${result.metrics[1].split(' = ')[1]}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Graph Like A Weighted Average",
      intro:
        "The random variable assigns numbers to outcomes, and expectation averages those numbers using the probabilities as weights.",
      controls: [{ label: "P(X = 1)", meaning: "How often the success outcome happens in the long run." }],
      summary(values, result) {
        return `As success becomes more likely, the expected value shifts toward 1. Right now it is ${result.metrics[1].split(' = ')[1]}.`;
      }
    },
    advancedExplanation:
      "Students often understand probability of an event but not yet the idea of a random variable. A random variable is the bridge that lets probability talk about numbers, averages, variance, and later distributions in a rigorous way.",
    commonMistakes: [
      "Thinking the random variable is the same thing as the event itself.",
      "Treating expected value like a guaranteed one-shot result.",
      "Forgetting that probabilities act as weights in the expectation formula."
    ],
    examAngles: [
      "You may be asked to define a random variable from a story.",
      "You may be asked to compute a simple expected value.",
      "You should be able to explain why expectation is an average, not a certain outcome."
    ],
    realLifeExamples: [
      "Pass/fail coded as 1 and 0 is a simple random variable.",
      "In reinforcement learning, expected reward is a core idea."
    ],
    goDeeper: [
      "Separate the outcome space from the number assigned to each outcome.",
      "Read expectation as a weighted center of the distribution."
    ],
    extraPractice: [
      {
        prompt: "If X = 2 with probability 0.4 and X = 5 with probability 0.6, what is E[X]?",
        answer: "3.8.",
        steps: [
          "Write E[X] = 2(0.4) + 5(0.6).",
          "Compute 0.8 + 3.0.",
          "Add them together.",
          "So E[X] = 3.8."
        ]
      },
      {
        prompt: "Can E[X] be a value the random variable never actually takes in one trial?",
        answer: "Yes.",
        steps: [
          "Expectation is a weighted average over many repeats.",
          "Averages need not match any single outcome.",
          "Think of the average of 0 and 1.",
          "That average can be 0.6 even if one trial is only 0 or 1."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does a random variable do?",
        options: ["Assigns numbers to outcomes", "Creates new outcomes", "Removes probabilities", "Always equals the mean"],
        correctIndex: 0,
        explanation: "Correct. A random variable maps outcomes to numbers."
      },
      {
        question: "What is expected value closest to?",
        options: ["A weighted average", "The maximum outcome", "The number of samples", "A matrix rank"],
        correctIndex: 0,
        explanation: "Correct. Expectation is the probability-weighted average."
      }
    ]
  },
  binomial: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine taking four independent quiz attempts where each one can be a success or failure.",
      graphMeaning:
        "Each bar is the probability of getting exactly that many successes, and the highlighted bars add up to a cumulative probability.",
      mlBridge:
        "This mirrors repeated independent classification outcomes and many repeated-event probability questions.",
      summary(values, result) {
        return `For the current setup, the exact middle probability is ${result.metrics[1].split('≈ ')[1]} and the cumulative probability is ${result.metrics[2].split('≈ ')[1]}.`;
      }
    },
    visualAnalogy: {
      title: "Read The Bars Like Success Counts",
      intro:
        "The x-axis is not a raw value. It is counting how many successes happened out of the repeated trials.",
      controls: [
        { label: "Success probability p", meaning: "Chance of success on each trial." },
        { label: "Cumulative cutoff k", meaning: "How many bars are included in P(X ≤ k)." }
      ],
      summary(values) {
        return `The highlighted bars answer 'k or fewer successes', while one single bar answers 'exactly x successes'.`;
      }
    },
    advancedExplanation:
      "Binomial probability is a major exam topic because it combines model recognition with calculation. First recognize the setup: fixed number of trials, same success probability, independence. Then decide whether the question asks for an exact count or a cumulative range.",
    commonMistakes: [
      "Using the binomial formula when trials are not independent or p changes.",
      "Mixing up exact probability with cumulative probability.",
      "Forgetting to sum several terms for a cumulative question."
    ],
    examAngles: [
      "You may be asked to identify whether a scenario is binomial.",
      "You may be asked for an exact probability like P(X = 2).",
      "You may be asked for a cumulative probability like P(X ≤ 2) or P(X ≥ 3)."
    ],
    realLifeExamples: [
      "Counting how many of four coin tosses land heads is a binomial setup.",
      "Counting successful classifications across repeated independent trials follows the same logic."
    ],
    goDeeper: [
      "Train yourself to separate exact versus at-most/at-least wording.",
      "Use symmetry when p = 0.5 to sanity-check results."
    ],
    extraPractice: [
      {
        prompt: "If X ~ Bin(4, 0.5), what is P(X ≤ 1)?",
        answer: "0.3125.",
        steps: [
          "Compute P(X = 0) = 0.0625.",
          "Compute P(X = 1) = 0.25.",
          "Add them for the cumulative probability.",
          "So P(X ≤ 1) = 0.3125."
        ]
      },
      {
        prompt: "What phrase in a question should make you think cumulative probability?",
        answer: "Words like at most, at least, no more than, or up to.",
        steps: [
          "Read the wording carefully.",
          "Look for range-style language.",
          "Recognize that one exact bar is not enough.",
          "That means a sum of probabilities is needed."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does P(X ≤ 2) mean?",
        options: ["At most 2 successes", "Exactly 2 successes", "At least 2 successes", "More than 2 successes only"],
        correctIndex: 0,
        explanation: "Correct. P(X ≤ 2) means 0, 1, or 2 successes."
      },
      {
        question: "Which condition is needed for a binomial model?",
        options: ["Same success probability on each trial", "Different p every time", "Continuous outcomes only", "No fixed trial count"],
        correctIndex: 0,
        explanation: "Correct. Same p on independent repeated trials is a core binomial condition."
      }
    ]
  },
  statistics: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine three quiz scores from a class and you want to see the class average and how spread out the scores are.",
      graphMeaning:
        "The points are the raw data values, and the highlighted marker shows their mean.",
      mlBridge:
        "ML uses this kind of summary all the time for feature scaling, data cleaning, and error analysis.",
      summary(values, result) {
        return `For the current sample values ${values.x1}, ${values.x2}, and ${values.x3}, the graph centers around ${result.metrics[0].split(" = ")[1]}.`;
      }
    },
    realLifeExamples: [
      "An average exam score tells the center, but you also want spread to know if students performed similarly or very differently.",
      "In ML, normalization often uses mean and spread so features are on comparable scales."
    ],
    goDeeper: [
      "Be able to explain why the same mean can hide very different datasets.",
      "Recognize when outliers distort the average."
    ],
    extraPractice: [
      {
        prompt: "Which dataset has larger spread: [4, 5, 6] or [1, 5, 9]?",
        answer: "[1, 5, 9] has larger spread."
      },
      {
        prompt: "Why can one outlier change the mean a lot?",
        answer: "Because the mean uses every value directly in the total."
      }
    ],
    extraMcqs: [
      {
        question: "Which pair can have the same mean but different variance?",
        options: ["[4, 5, 6] and [1, 5, 9]", "[3, 3, 3] and [3, 3, 3]", "[2, 2] and [2, 2]", "None of them"],
        correctIndex: 0,
        explanation: "Correct. Both have mean 5, but the spread is very different."
      },
      {
        question: "Why is variance useful?",
        options: ["It measures spread around the mean", "It gives class labels", "It computes derivatives", "It rotates vectors"],
        correctIndex: 0,
        explanation: "Correct. Variance quantifies spread."
      }
    ]
  },
  regression: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine apartment size on the x-axis and rent price on the y-axis, and you are trying to draw a line that predicts rent from size.",
      graphMeaning:
        "The scatter points are real data and the line is your model. The gap from a point to the line is the prediction error.",
      mlBridge:
        "This is the first full ML workflow: make predictions, measure error, and improve the fit.",
      summary(values, result) {
        return `With slope ${formatNumber(values.m)} and intercept ${formatNumber(values.b)}, the model currently has ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    realLifeExamples: [
      "House price prediction often starts with a regression model using size, location, and other features.",
      "In ML, linear regression is the first clean example of prediction plus error minimization."
    ],
    goDeeper: [
      "Be able to explain residuals both numerically and visually.",
      "Notice that regression is about fitting patterns, not forcing all points onto one line."
    ],
    extraPractice: [
      {
        prompt: "If a line predicts 10 and the actual value is 7, what is the residual?",
        answer: "Residual = 7 - 10 = -3."
      },
      {
        prompt: "Why do squared errors get used instead of plain residuals?",
        answer: "Because positive and negative errors would otherwise cancel."
      }
    ],
    extraMcqs: [
      {
        question: "What does a residual of 0 mean?",
        options: ["The prediction matched the actual value", "The model is useless", "The slope is zero", "The variance is zero"],
        correctIndex: 0,
        explanation: "Correct. Zero residual means perfect prediction on that point."
      },
      {
        question: "What usually indicates a better regression fit?",
        options: ["Lower error", "Higher randomness", "Bigger residuals", "Fewer features always"],
        correctIndex: 0,
        explanation: "Correct. Lower error generally means a better fit."
      }
    ]
  },
  bayes: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a medical test where some positive results are true positives and some are false positives.",
      graphMeaning:
        "The visual separates those two sources of positive tests so you can see why a positive result is not automatically strong proof.",
      mlBridge:
        "Bayesian classifiers update beliefs in exactly this way when new evidence arrives.",
      summary(values, result) {
        return `With prior ${formatNumber(values.prior)}, sensitivity ${formatNumber(values.sens)}, and false-positive rate ${formatNumber(values.fpr)}, the updated belief is ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "Bayes questions become much easier once you stop reading them as one formula and start reading them as a population split. Prior tells you how many true cases exist before the test, likelihood tells you how evidence behaves inside each group, and the posterior asks what fraction of the observed evidence really came from the target group. This is the base-rate logic many exam questions are testing.",
    commonMistakes: [
      "Confusing P(A|B) with P(B|A).",
      "Ignoring the base rate and focusing only on sensitivity.",
      "Forgetting that the evidence term includes both true positives and false positives."
    ],
    examAngles: [
      "You may be asked to compute a posterior from prevalence, sensitivity, and false-positive rate.",
      "You may be asked conceptual questions about why rare conditions can still produce low posterior probabilities.",
      "You should be able to explain Bayes with a frequency table, not just a formula."
    ],
    advancedExample: {
      title: "Frequency-table Bayes reasoning.",
      steps: [
        "Imagine 1000 people with disease prevalence 1%.",
        "That means about 10 actually have the disease and 990 do not.",
        "Apply sensitivity to the 10 diseased cases and false-positive rate to the 990 non-diseased cases.",
        "Posterior after a positive test is true positives divided by all positives."
      ]
    },
    examQuestions: [
      {
        prompt: "Why can a highly accurate test still have a low posterior on a positive result?",
        answer: "Because when the condition is rare, false positives from the large healthy group can still outnumber true positives.",
        explanation: "This is the base-rate effect. The size of the groups matters, not just the test accuracy percentages.",
        steps: [
          "Start with the prior prevalence.",
          "Separate the population into true cases and non-cases.",
          "Apply sensitivity and false-positive rate to each group.",
          "Compare how many positives come from each side."
        ]
      },
      {
        prompt: "What is the cleanest way to avoid conditional-probability confusion in Bayes problems?",
        answer: "Translate the percentages into counts in a concrete population first.",
        explanation: "Counts force you to see which group each probability applies to and make the denominator easier to interpret.",
        steps: [
          "Choose a simple population size like 1000 or 10,000.",
          "Convert each percentage into counts.",
          "Track true positives and false positives separately.",
          "Compute the posterior as a ratio of counts."
        ]
      }
    ],
    realLifeExamples: [
      "A medical test result should update your belief about disease, not replace it blindly.",
      "Spam filters update class beliefs after seeing words like 'offer' or 'discount'."
    ],
    goDeeper: [
      "Train yourself to separate P(A|B) from P(B|A), because exams and real decisions both exploit that confusion.",
      "Understand that rare-event priors can dominate the final answer."
    ],
    extraPractice: [
      {
        prompt: "If the prior is tiny and false positives are common, what happens to the posterior after a positive test?",
        answer: "It may stay modest despite the positive test.",
        steps: [
          "A tiny prior means true cases are rare to begin with.",
          "A noticeable false-positive rate creates many fake positives from the large non-case group.",
          "Those false positives enlarge the denominator in the posterior.",
          "So the positive result may not be as convincing as it first looks."
        ]
      },
      {
        prompt: "What is the evidence term in Bayes rule doing conceptually?",
        answer: "It normalizes the result so the posterior is a valid probability.",
        steps: [
          "Likelihood times prior gives an unnormalized score for the hypothesis.",
          "But probabilities must add up correctly across competing hypotheses.",
          "The evidence term rescales by the total probability of seeing the evidence.",
          "That turns the result into a proper posterior probability."
        ]
      },
      {
        prompt: "In a population of 1000, prevalence is 2%, sensitivity is 90%, and false-positive rate is 5%. How many true positives and false positives are expected?",
        answer: "About 18 true positives and 49 false positives.",
        steps: [
          "2% of 1000 is 20 true cases, leaving 980 non-cases.",
          "90% of 20 gives 18 true positives.",
          "5% of 980 gives 49 false positives.",
          "Those are the two groups that form the positive-test pool."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "Which common mistake does Bayes rule help correct?",
        options: ["Confusing reverse conditional probabilities", "Forgetting how to add vectors", "Replacing matrices with scalars", "Assuming gradients are constants"],
        correctIndex: 0,
        explanation: "Correct. People often confuse P(A|B) with P(B|A)."
      },
      {
        question: "If evidence strongly favors a hypothesis, what should usually happen to the posterior?",
        options: ["It increases", "It becomes negative", "It always becomes 1", "It disappears"],
        correctIndex: 0,
        explanation: "Correct. Strong supporting evidence should raise the posterior."
      }
    ]
  },
  distributions: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine human heights or exam scores clustering around a typical center with fewer extreme values.",
      graphMeaning:
        "The center of the bell curve is the average and the width shows how spread out the values are.",
      mlBridge:
        "Many ML assumptions about noise, errors, and standardized features rely on this shape.",
      summary(values, result) {
        return `With mean ${formatNumber(values.mu)} and spread ${formatNumber(values.sigma)}, the graph is centered at ${result.metrics[0].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "A common exam jump is moving from 'probability of one event' to 'shape of uncertainty'. For continuous variables, the curve height is density, not probability at a single exact point. You need to read mean, spread, standardization, and unusualness together. This is also the foundation for likelihood models and Gaussian assumptions in ML.",
    commonMistakes: [
      "Treating the height of a continuous density curve as the probability of one exact value.",
      "Confusing variance with standard deviation.",
      "Thinking two distributions with the same mean must behave similarly."
    ],
    examAngles: [
      "You may be asked to compute and interpret z-scores.",
      "You may be asked how changing μ or σ changes the graph.",
      "You should be ready to explain why standardization helps compare different scales."
    ],
    advancedExample: {
      title: "Compare two unusual values using z-scores.",
      steps: [
        "A score of 80 on a test with mean 70 and standard deviation 5 has z = 2.",
        "A score of 120 on a test with mean 100 and standard deviation 20 has z = 1.",
        "Even though 120 is numerically larger, the 80 is more extreme relative to its distribution.",
        "That is the point of standardization."
      ]
    },
    examQuestions: [
      {
        prompt: "Why does z-score help compare values from different units or scales?",
        answer: "Because it measures distance from the mean in standard-deviation units, not raw units.",
        explanation: "Once standardized, values from different contexts can be compared on the same relative scale.",
        steps: [
          "Subtract the mean to center the value.",
          "Divide by the standard deviation to scale the deviation.",
          "Interpret the result as relative extremeness.",
          "Then compare those standardized distances."
        ]
      },
      {
        prompt: "If two datasets have the same mean but different standard deviations, what changes?",
        answer: "Their spreads and how unusual a given raw value looks.",
        explanation: "A raw score may be ordinary in a wide distribution but extreme in a narrow one.",
        steps: [
          "Keep the center fixed.",
          "Widen or narrow the distribution using σ.",
          "Observe that the same raw difference from the mean changes in significance.",
          "So spread changes interpretation even when the mean stays fixed."
        ]
      }
    ],
    realLifeExamples: [
      "Human heights often cluster around a center with fewer extreme values, which is distribution thinking.",
      "In ML, Gaussian noise assumptions are common in modeling errors and feature behavior."
    ],
    goDeeper: [
      "Practice reading how mean and spread change the whole shape, not just a single number.",
      "Use z-scores to compare values across different scales."
    ],
    extraPractice: [
      {
        prompt: "If μ = 10 and σ = 2, what value is one standard deviation below the mean?",
        answer: "8.",
        steps: [
          "One standard deviation below the mean means μ - σ.",
          "Substitute μ = 10 and σ = 2.",
          "Compute 10 - 2.",
          "The value is 8."
        ]
      },
      {
        prompt: "What kind of value usually has a large positive z-score?",
        answer: "A value far above the mean.",
        steps: [
          "Positive z-score means the value is above the mean.",
          "Large magnitude means it is many standard deviations away.",
          "So it is not just above average, but well above average.",
          "That is why it is relatively unusual."
        ]
      },
      {
        prompt: "A value x = 65 comes from a distribution with μ = 50 and σ = 5. Compute the z-score and interpret it.",
        answer: "z = 3, so the value is 3 standard deviations above the mean.",
        steps: [
          "Use z = (x - μ) / σ.",
          "Substitute z = (65 - 50) / 5.",
          "Compute 15 / 5 = 3.",
          "Interpret that as a relatively extreme value above the center."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What stays fixed if only the standard deviation changes?",
        options: ["The center mean", "The whole curve disappears", "Every z-score becomes zero", "The x-axis labels must change"],
        correctIndex: 0,
        explanation: "Correct. Changing spread does not move the center if μ stays fixed."
      },
      {
        question: "Why are z-scores useful?",
        options: ["They standardize distance from the mean", "They always equal probability", "They replace gradients", "They are only for geometry"],
        correctIndex: 0,
        explanation: "Correct. z-scores express how far a value sits from the mean in standard-deviation units."
      }
    ]
  },
  eigen: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a cloud of data points shaped like a stretched ellipse, where one direction clearly carries more variation than the others.",
      graphMeaning:
        "The long axis is the dominant direction. PCA keeps strong directions like that and can drop weaker ones.",
      mlBridge:
        "This is how dimensionality reduction compresses data while keeping useful structure.",
      summary() {
        return "The graph is asking: which direction carries the most useful structure, and which directions can be simplified away?";
      }
    },
    advancedExplanation:
      "This topic is worth taking seriously because it is where linear algebra starts feeling like university math. An eigenvector is a direction that a transformation does not bend away from itself, and the eigenvalue tells how strongly that direction is scaled. In exams, you are often expected to move between geometry, algebra, and PCA interpretation: solve det(A - λI) = 0, find the matching vectors, and then explain what large or small eigenvalues mean for data variance or stability.",
    commonMistakes: [
      "Thinking every vector is an eigenvector.",
      "Confusing the eigenvalue λ with the eigenvector v.",
      "Forgetting that an eigenvector can flip direction when the eigenvalue is negative."
    ],
    examAngles: [
      "You may be asked to solve a 2×2 eigenvalue problem by finding det(A - λI) = 0.",
      "You may be asked to find an eigenvector after finding λ.",
      "You should be able to connect large eigenvalues to dominant PCA directions and small eigenvalues to weak variation."
    ],
    advancedExample: {
      title: "Solve a basic eigenvalue problem.",
      steps: [
        "Take A = [[3, 1], [0, 2]].",
        "Form A - λI = [[3 - λ, 1], [0, 2 - λ]].",
        "Set the determinant to zero: (3 - λ)(2 - λ) = 0, so λ = 3 or λ = 2.",
        "For each eigenvalue, solve (A - λI)v = 0 to find the corresponding eigenvector direction."
      ]
    },
    examQuestions: [
      {
        prompt: "For A = [[2, 0], [0, 5]], what are the eigenvalues and what do they mean geometrically?",
        answer: "The eigenvalues are 2 and 5; the x-axis direction is scaled by 2 and the y-axis direction is scaled by 5.",
        explanation: "A diagonal matrix reveals its eigenvalues immediately because each coordinate axis is already an eigenvector direction.",
        steps: [
          "Read the diagonal entries.",
          "For a diagonal matrix, those are the eigenvalues.",
          "The corresponding coordinate axes are the eigenvector directions.",
          "Interpret them as separate stretch factors on x and y."
        ]
      },
      {
        prompt: "Why does PCA keep the eigenvectors with the largest eigenvalues of the covariance matrix?",
        answer: "Because those directions explain the most variance in the data.",
        explanation: "In PCA, larger covariance eigenvalues mean the data spread more strongly along those eigenvector directions.",
        steps: [
          "Covariance measures how variation is distributed.",
          "Eigenvectors give the principal directions of that variation.",
          "Eigenvalues measure how much variance each direction carries.",
          "So PCA keeps the directions with the largest values first."
        ]
      }
    ],
    realLifeExamples: [
      "A stretched rubber sheet may have one strongest stretch direction. PCA looks for that kind of dominant direction in data.",
      "Recommendation and compression systems often use lower-dimensional structure found by spectral methods."
    ],
    goDeeper: [
      "Be able to explain eigenvectors geometrically before worrying about solving characteristic polynomials by hand.",
      "Understand PCA as keeping informative directions rather than as a mysterious algorithm."
    ],
    extraPractice: [
      {
        prompt: "If Av = 0.5v, does v keep its direction?",
        answer: "Yes. It keeps its line and shrinks by a factor of 0.5.",
        steps: [
          "Compare Av with v.",
          "The output is a scalar multiple of the original vector.",
          "A scalar multiple stays on the same line.",
          "Because the scalar is 0.5, the vector shrinks to half its length."
        ]
      },
      {
        prompt: "Why might PCA drop a direction with very small variance?",
        answer: "Because it often contributes little information compared with stronger directions.",
        steps: [
          "PCA ranks directions by variance captured.",
          "A very small variance means little spread of the data in that direction.",
          "Keeping it adds little information relative to its dimension cost.",
          "So it is often dropped during compression."
        ]
      },
      {
        prompt: "For A = [[4, 0], [0, 1]], which axis is the dominant PCA-like direction if this represented covariance-style scaling?",
        answer: "The x-axis, because its scaling/eigenvalue 4 is larger than 1.",
        steps: [
          "Read the scaling values on the diagonal.",
          "Larger scaling means more variation in that direction.",
          "Compare 4 versus 1.",
          "So the x-direction is dominant."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does an eigenvalue bigger than 1 usually mean geometrically?",
        options: ["Stretch along that eigenvector", "Flip to zero", "Guaranteed rotation", "Projection to the origin"],
        correctIndex: 0,
        explanation: "Correct. Values above 1 indicate expansion along that direction."
      },
      {
        question: "Why is PCA useful in ML pipelines?",
        options: ["It can reduce dimension while keeping important variation", "It always improves every model", "It replaces probability", "It makes all features independent automatically"],
        correctIndex: 0,
        explanation: "Correct. PCA is a dimension-reduction tool that preserves major variation directions."
      }
    ]
  },
  transformations: {
    goal: "Read a matrix as a transformation rule and apply it to basis vectors or ordinary vectors in code.",
    examUse: "Useful for coding questions about scaling, shear, and transformed vectors.",
    codeTitle: "Transformation As Matrix Action",
    code: "import numpy as np\n\nA = np.array([[2, 1], [0, 1]])\ne1 = np.array([1, 0])\ne2 = np.array([0, 1])\nprint(A @ e1)\nprint(A @ e2)",
    output: "[2 0]\n[1 1]",
    explainSteps: [
      "The matrix acts on vectors by multiplication.",
      "Applying it to basis vectors shows what the transformation does to the whole space.",
      "Those transformed basis vectors define the action on every other vector.",
      "This is the code version of a linear transformation."
    ],
    traps: [
      "Thinking the matrix entries act independently with no geometric meaning.",
      "Using elementwise multiplication instead of `@`.",
      "Ignoring basis-vector interpretation."
    ],
    examTasks: [
      "Apply a transformation to vectors.",
      "Use basis vectors to read matrix action.",
      "Interpret the resulting geometry."
    ],
    gradedQuestions: [
      {
        prompt: "Given `A = [[2, 0], [0, 3]]`, print `A @ [1, 1]`.",
        starterCode: "import numpy as np\n\nA = np.array([[2, 0], [0, 3]])\nv = np.array([1, 1])\n\n# Print A @ v",
        explanation: "Multiply the matrix and vector with the `@` operator.",
        solution: "import numpy as np\n\nA = np.array([[2, 0], [0, 3]])\nv = np.array([1, 1])\nprint(A @ v)",
        output: "[2 3]"
      }
    ]
  },
  basis: {
    goal: "Express coordinate changes in code so basis questions stop feeling purely abstract.",
    examUse: "Useful for basis, coordinate, and change-of-basis exam questions.",
    codeTitle: "Coordinates In A New Basis",
    code: "import numpy as np\n\nB = np.array([[1, 1], [1, -1]])\nv = np.array([2, 0])\ncoords = np.linalg.solve(B, v)\nprint(coords)",
    output: "[1. 1.]",
    explainSteps: [
      "The columns of B are the basis vectors.",
      "Solving Bc = v finds the coordinates c in that basis.",
      "The vector stays the same, but its coordinates change.",
      "This is the code version of change of basis."
    ],
    traps: [
      "Confusing the vector with its coordinate representation.",
      "Using basis vectors as rows instead of columns.",
      "Forgetting that coordinates depend on the chosen basis."
    ],
    examTasks: [
      "Compute coordinates in a nonstandard basis.",
      "Interpret the meaning of the coordinate vector.",
      "Connect solve-based code to basis equations."
    ],
    gradedQuestions: [
      {
        prompt: "Given basis matrix `B = [[1, 1], [1, -1]]` and vector `v = [2, 0]`, print the basis coordinates.",
        starterCode: "import numpy as np\n\nB = np.array([[1, 1], [1, -1]])\nv = np.array([2, 0])\n\n# Solve for the coordinates",
        explanation: "Use `np.linalg.solve(B, v)` to find the coordinate vector.",
        solution: "import numpy as np\n\nB = np.array([[1, 1], [1, -1]])\nv = np.array([2, 0])\nprint(np.linalg.solve(B, v))",
        output: "[1. 1.]"
      }
    ]
  },
  composition: {
    goal: "Code repeated matrix action so composition and matrix powers feel concrete.",
    examUse: "Useful for composition and repeated-transformation coding questions.",
    codeTitle: "Composition And Matrix Powers",
    code: "import numpy as np\n\nA = np.array([[2, 0], [0, 2]])\nprint(A @ A)\nprint(np.linalg.matrix_power(A, 3))",
    output: "[[4 0]\n [0 4]]\n[[8 0]\n [0 8]]",
    explainSteps: [
      "Multiplying A by itself once gives A squared.",
      "`matrix_power` repeats the same transformation several times.",
      "The output shows how repeated transformations scale effects.",
      "This is the code version of matrix powers."
    ],
    traps: [
      "Confusing A^n with scalar powers done entrywise.",
      "Forgetting that order matters in composition.",
      "Using plain multiplication instead of matrix multiplication."
    ],
    examTasks: [
      "Compute A squared or A cubed.",
      "Explain repeated transformation effect.",
      "Connect powers to iteration."
    ],
    gradedQuestions: [
      {
        prompt: "Given `A = [[2, 0], [0, 2]]`, print `A^3` using NumPy.",
        starterCode: "import numpy as np\n\nA = np.array([[2, 0], [0, 2]])\n\n# Print A^3",
        explanation: "Use `np.linalg.matrix_power(A, 3)` for repeated matrix multiplication.",
        solution: "import numpy as np\n\nA = np.array([[2, 0], [0, 2]])\nprint(np.linalg.matrix_power(A, 3))",
        output: "[[8 0]\n [0 8]]"
      }
    ]
  },
  "inverse-spaces": {
    goal: "Compute determinant, inverse, and rank in code and connect them to lost or preserved information.",
    examUse: "Useful for matrix invertibility and rank coding questions.",
    codeTitle: "Inverse, Determinant, And Rank",
    code: "import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nprint(np.linalg.det(A))\nprint(np.linalg.inv(A))\nprint(np.linalg.matrix_rank(A))",
    output: "-2.0000000000000004\n[[-2.   1. ]\n [ 1.5 -0.5]]\n2",
    explainSteps: [
      "Determinant tests whether the matrix collapses space.",
      "A nonzero determinant permits an inverse in the matching dimension.",
      "Rank counts how many independent directions remain.",
      "These outputs are three views of the same information structure."
    ],
    traps: [
      "Trying to invert a singular matrix.",
      "Treating determinant, rank, and inverse as unrelated.",
      "Ignoring numerical approximation in printed output."
    ],
    examTasks: [
      "Compute determinant and rank.",
      "Read whether a matrix is invertible.",
      "Connect the numeric results to geometry."
    ],
    gradedQuestions: [
      {
        prompt: "For `A = [[1, 2], [2, 4]]`, print the determinant and rank.",
        starterCode: "import numpy as np\n\nA = np.array([[1, 2], [2, 4]])\n\n# Print determinant\n# Print rank",
        explanation: "Use determinant and rank to show that the matrix collapses to one independent direction.",
        solution: "import numpy as np\n\nA = np.array([[1, 2], [2, 4]])\nprint(np.linalg.det(A))\nprint(np.linalg.matrix_rank(A))",
        output: "0.0\n1"
      }
    ]
  },
  eigendecomp: {
    goal: "See eigendecomposition as code that separates a matrix into eigenvectors and eigenvalues.",
    examUse: "Useful for decomposition and diagonalization coding questions.",
    codeTitle: "Eigendecomposition Pieces In Python",
    code: "import numpy as np\n\nA = np.array([[1, 4], [2, 3]])\nvalues, vectors = np.linalg.eig(A)\nD = np.diag(values)\nprint(D)\nprint(np.round(vectors, 3))",
    output: "[[ 5.  0.]\n [ 0. -1.]]\n[[ 0.707 -0.894]\n [ 0.707  0.447]]",
    explainSteps: [
      "Eigenvalues come from `np.linalg.eig`.",
      "Putting them on the diagonal forms D.",
      "The eigenvectors form the columns of the eigenvector matrix.",
      "This is the computational skeleton behind A = C D C^-1."
    ],
    traps: [
      "Forgetting that D is diagonal.",
      "Assuming eigenvector order is arbitrary relative to eigenvalues.",
      "Ignoring approximation in floating-point output."
    ],
    examTasks: [
      "Build D from eigenvalues.",
      "Read the eigenvector matrix.",
      "Connect code outputs to decomposition notation."
    ],
    gradedQuestions: [
      {
        prompt: "Using `values = np.array([3, 2])`, create and print the diagonal matrix D.",
        starterCode: "import numpy as np\n\nvalues = np.array([3, 2])\n\n# Build and print D",
        explanation: "Use `np.diag(values)` to place the eigenvalues on the diagonal.",
        solution: "import numpy as np\n\nvalues = np.array([3, 2])\nprint(np.diag(values))",
        output: "[[3 0]\n [0 2]]"
      }
    ]
  },
  eigendecomp: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine translating a messy machine manual into a clearer language, doing the simple work there, and then translating back.",
      graphMeaning:
        "The visual shows the idea of entering the eigenvector basis, scaling cleanly on the diagonal, and returning to the original coordinates.",
      mlBridge:
        "PCA and many spectral ML methods use exactly this kind of smarter coordinate system.",
      summary() {
        return "Eigen decomposition is about choosing the coordinate system where the transformation becomes easiest to read.";
      }
    },
    visualAnalogy: {
      title: "Read The Formula Like A Basis Switch",
      intro:
        "C changes into the eigenvector basis, D does the easy scaling work there, and C^-1 changes back.",
      controls: [],
      summary() {
        return "No sliders are needed here because the key idea is structural: move into the right basis, simplify the action, then move back.";
      }
    },
    advancedExplanation:
      "Eigendecomposition is where coordinate change and eigen analysis finally merge. Exams usually want you to know what C and D mean, how to build D from eigenvalues, and why powers like A^n become manageable after diagonalization. This is also the clean conceptual link to PCA, where the 'right basis' matters enormously.",
    commonMistakes: [
      "Putting eigenvalues into D without matching their order to the eigenvectors in C.",
      "Thinking every matrix is diagonalizable without checking.",
      "Forgetting that the whole point is a basis change, not just a new formula to memorize."
    ],
    examAngles: [
      "You may be asked what C and D represent in A = C D C^-1.",
      "You may be asked to build D from known eigenvalues.",
      "You should be able to explain why A^n becomes easier after diagonalization."
    ],
    realLifeExamples: [
      "A messy process can become easier when you describe it in the right coordinate system.",
      "In ML, PCA is valuable because it rewrites data in a basis that highlights the most informative directions."
    ],
    goDeeper: [
      "Connect eigendecomposition to change of basis, not as a separate isolated topic.",
      "Notice that diagonal matrices are easy because they act independently on each coordinate.",
      "Memorize the basic algorithm: find eigenvalues, find matching eigenvectors, build C, build D, then compute C^-1 if needed."
    ],
    extraPractice: [
      {
        prompt: "If A = C D C^-1, what does D contain?",
        answer: "The eigenvalues on the diagonal.",
        steps: [
          "Interpret C as eigenvectors.",
          "Interpret D as the action in the eigenbasis.",
          "That action is pure scaling along eigenvector directions.",
          "So D stores the eigenvalues on the diagonal."
        ]
      },
      {
        prompt: "For A = [[1, 4], [2, 3]], what diagonal matrix D can appear in an eigendecomposition?",
        answer: "D can be diag(5, -1) or diag(-1, 5), depending on the order of eigenvectors in C.",
        steps: [
          "Find det(A - λI) = λ^2 - 4λ - 5.",
          "Solve to get eigenvalues 5 and -1.",
          "Place them on the diagonal.",
          "Match the order to the eigenvectors in C."
        ]
      },
      {
        prompt: "What is the basic algorithm for building an eigendecomposition?",
        answer: "Find eigenvalues, find their eigenvectors, place eigenvectors in C, place eigenvalues in D in the same order, then use A = C D C^-1 if diagonalization is possible.",
        steps: [
          "Solve det(A - λI) = 0 to get the eigenvalues.",
          "For each eigenvalue, solve (A - λI)x = 0 to get an eigenvector.",
          "Put the eigenvectors as columns of C.",
          "Put the matching eigenvalues on the diagonal of D in the same order."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "Why is D easier to work with than A in a diagonalization?",
        options: ["Because diagonal matrices are easy to power and interpret", "Because D has no numbers", "Because D removes the eigenvectors", "Because D is always the identity"],
        correctIndex: 0,
        explanation: "Correct. Diagonal matrices are much easier to analyze, especially for repeated powers."
      },
      {
        question: "What is the main role of C^-1 in A = C D C^-1?",
        options: ["It changes into the eigenbasis or back depending on convention", "It computes probabilities", "It removes the diagonal entries", "It finds the determinant automatically"],
        correctIndex: 0,
        explanation: "Correct. The decomposition works by changing coordinate systems, doing diagonal scaling, and changing back."
      }
    ]
  },
  "gradient-descent": {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine walking downhill in fog while only feeling the local slope under your feet.",
      graphMeaning:
        "The current point is where you stand on the loss curve, and the next point shows where one update step would move you.",
      mlBridge:
        "Training algorithms repeatedly make these downhill updates to reduce model error.",
      summary(values, result) {
        return `From x = ${formatNumber(values.x0)} with learning rate ${formatNumber(values.lr)}, the next step lands at ${result.metrics[2].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "Gradient descent is simple in form but subtle in behavior. The gradient gives a local direction, the learning rate controls how far you trust that direction, and the loss surface determines whether updates settle smoothly, crawl slowly, or oscillate. In ML exams, you are often tested on update mechanics, sign logic, and why bad step sizes break training.",
    commonMistakes: [
      "Moving in the same direction as the gradient during minimization.",
      "Treating the learning rate as a harmless constant instead of a major stability choice.",
      "Assuming a zero gradient always means the global minimum has been found."
    ],
    examAngles: [
      "You may be asked to carry out one or two explicit update steps.",
      "You may be asked what happens when the learning rate is too small or too large.",
      "You should be able to connect gradient sign to parameter movement direction."
    ],
    advancedExample: {
      title: "Two-step gradient descent update.",
      steps: [
        "Suppose x0 = 4 and f'(x0) = 3 with learning rate 0.1.",
        "First update: x1 = 4 - 0.1(3) = 3.7.",
        "If the new slope is 2.4, then x2 = 3.7 - 0.1(2.4) = 3.46.",
        "This shows how repeated local steps gradually move toward lower loss."
      ]
    },
    examQuestions: [
      {
        prompt: "Why can gradient descent zig-zag or oscillate?",
        answer: "Because the learning rate is too large relative to the local curvature, so updates overshoot the valley.",
        explanation: "When steps are too aggressive, the algorithm keeps jumping across the low region instead of settling into it.",
        steps: [
          "Start near a sloped valley.",
          "Take a large step using the gradient direction.",
          "Land on the opposite side of the valley.",
          "Repeat and observe oscillation instead of smooth convergence."
        ]
      },
      {
        prompt: "What does a very small learning rate trade off against stability?",
        answer: "It improves stability but makes training much slower.",
        explanation: "Tiny steps reduce overshooting risk but require many more updates to make visible progress.",
        steps: [
          "Reduce the step size η.",
          "Each update becomes safer and smaller.",
          "The path is more controlled.",
          "But many more iterations are needed."
        ]
      }
    ],
    realLifeExamples: [
      "Trying to find the lowest point in a foggy valley by feeling the local slope is a good mental model for gradient descent.",
      "Training ML models means repeatedly reducing loss with update steps like this."
    ],
    goDeeper: [
      "Understand that optimization quality depends on both the gradient and the learning rate.",
      "Be ready to explain slow convergence, overshooting, and local flatness."
    ],
    extraPractice: [
      {
        prompt: "If the slope is negative at the current point, what sign is the update direction in gradient descent?",
        answer: "Positive, because subtracting a negative slope moves you to the right.",
        steps: [
          "Use the update xnew = xold - ηf'(xold).",
          "If the slope is negative, then f'(xold) < 0.",
          "Subtracting a negative quantity becomes addition.",
          "So the update moves in the positive direction."
        ]
      },
      {
        prompt: "Why can a tiny learning rate be frustrating in practice?",
        answer: "Because progress becomes extremely slow even when the direction is correct.",
        steps: [
          "Each step changes parameters only a little.",
          "Loss decreases, but very slowly.",
          "Many iterations are needed to cover the same distance.",
          "So training can become inefficient."
        ]
      },
      {
        prompt: "If x = 2, gradient = -4, and η = 0.25, what is the next x?",
        answer: "xnew = 3.",
        steps: [
          "Start with xnew = xold - η gradient.",
          "Substitute xnew = 2 - 0.25(-4).",
          "Compute 0.25(-4) = -1.",
          "So xnew = 2 - (-1) = 3."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What is the main job of the learning rate?",
        options: ["Set the step size", "Set the dataset size", "Set the feature count", "Set the number of classes"],
        correctIndex: 0,
        explanation: "Correct. It controls how large each optimization step is."
      },
      {
        question: "What does a zero gradient suggest?",
        options: ["No local first-order change", "The model is always perfect", "The data disappear", "The probability is undefined"],
        correctIndex: 0,
        explanation: "Correct. Zero gradient means locally flat according to first-order information."
      }
    ]
  },
  logistic: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine an email getting a spam score first, and then that score being turned into a probability of being spam.",
      graphMeaning:
        "The sigmoid curve converts a raw score into a value between 0 and 1 so it can be read like confidence.",
      mlBridge:
        "Binary classifiers use this exact shape to turn scores into probabilities before making a class decision.",
      summary(values, result) {
        return `For the current score ${result.metrics[0].split(" = ")[1]}, the graph converts it into ${result.metrics[1].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "The advanced layer of logistic regression is not the sigmoid formula itself; it is understanding score, probability, threshold, and loss as different objects. The model forms a linear score z = wx + b, converts that score into a probability through the sigmoid, and then often uses cross-entropy loss to punish confident wrong predictions. This makes logistic regression a serious bridge topic before neural networks.",
    commonMistakes: [
      "Confusing the raw score z with the final probability.",
      "Thinking the decision threshold changes the learned probability itself.",
      "Using linear-regression intuition and expecting outputs outside [0, 1] to still make sense for classification."
    ],
    examAngles: [
      "You may be asked to compute z first and only then apply the sigmoid.",
      "You may be asked to interpret the decision boundary z = 0.",
      "You should be able to explain why logistic regression is better suited to binary classification than plain linear regression."
    ],
    advancedExample: {
      title: "Score, probability, and decision boundary.",
      steps: [
        "Take z = wx + b.",
        "If z = 0, the sigmoid output is 0.5, which is the natural decision boundary.",
        "Positive z pushes the probability above 0.5; negative z pushes it below 0.5.",
        "So classification depends on the sign and size of the score before thresholding."
      ]
    },
    examQuestions: [
      {
        prompt: "Why is z = 0 the standard decision boundary in logistic regression?",
        answer: "Because sigmoid(0) = 0.5, which is the midpoint between the two classes.",
        explanation: "The boundary is easiest to express in score space: class 1 if z > 0 and class 0 if z < 0 when using a 0.5 threshold.",
        steps: [
          "Start from the sigmoid output.",
          "Check the value at z = 0.",
          "That gives probability 0.5.",
          "Use that midpoint as the default class cutoff."
        ]
      },
      {
        prompt: "Why does cross-entropy punish confident wrong predictions strongly?",
        answer: "Because predicting a probability near 1 for the wrong class means the model is confidently incorrect, which the loss treats as a major mistake.",
        explanation: "This helps training push down especially bad classification errors.",
        steps: [
          "Compare a mildly wrong prediction with a highly confident wrong prediction.",
          "Cross-entropy grows much faster for the confident error.",
          "That creates a stronger corrective gradient.",
          "So training focuses on severe mistakes."
        ]
      }
    ],
    realLifeExamples: [
      "A credit-risk system may output the probability that a borrower defaults, not just a yes/no guess.",
      "Binary ML classifiers often convert a linear score into a probability with a sigmoid."
    ],
    goDeeper: [
      "Be able to explain the difference between a score, a probability, and a final class decision threshold.",
      "Recognize logistic regression as a strong baseline model, not just a classroom exercise."
    ],
    extraPractice: [
      {
        prompt: "If z is large and negative, what kind of class prediction should you expect?",
        answer: "Probability near 0, so likely class 0.",
        steps: [
          "A large negative z sits far on the left side of the sigmoid.",
          "The sigmoid output there is close to 0.",
          "That means the model assigns very low probability to class 1.",
          "So class 0 is the likely prediction."
        ]
      },
      {
        prompt: "Why is z = 0 a special point on the sigmoid?",
        answer: "Because it maps to probability 0.5, the natural midpoint.",
        steps: [
          "Plug z = 0 into the sigmoid formula.",
          "That gives 1 / (1 + e^0) = 1 / 2.",
          "So the output is 0.5.",
          "This is why z = 0 is the default decision boundary."
        ]
      },
      {
        prompt: "If w = 2, x = -1, and b = 1, find z and say whether the model leans toward class 0 or class 1.",
        answer: "z = -1, so the model leans toward class 0.",
        steps: [
          "Compute z = wx + b = 2(-1) + 1.",
          "That gives z = -2 + 1 = -1.",
          "A negative score gives a probability below 0.5.",
          "So the prediction leans toward class 0."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What is the role of the sigmoid in logistic regression?",
        options: ["Convert a score into a probability", "Compute the derivative of every layer", "Standardize features", "Sort training data"],
        correctIndex: 0,
        explanation: "Correct. The sigmoid squashes the score into the 0-to-1 range."
      },
      {
        question: "Why is a threshold like 0.5 used?",
        options: ["To turn probability into a class decision", "To compute a dot product", "To remove the bias term", "To find eigenvectors"],
        correctIndex: 0,
        explanation: "Correct. The threshold converts probability output into a hard class label."
      }
    ]
  },
  backprop: {
    visualScenario: {
      title: "Scenario Behind The Graph",
      scenario:
        "Imagine a tiny neuron making one decision by combining two signals, such as test score and interview score, before applying an activation.",
      graphMeaning:
        "The weighted sum shows how the inputs combine, and the activation shows the neuron's final output after that combination.",
      mlBridge:
        "Backprop later asks how much each weight contributed to the final error so those weights can be updated.",
      summary(values, result) {
        return `With current inputs and weights, the neuron's pre-activation is ${result.metrics[0].split(" = ")[1]} and its output is ${result.metrics[1].split(" = ")[1]}.`;
      }
    },
    advancedExplanation:
      "The advanced view of backprop is a computation graph story. Each node contributes a local derivative, and the total gradient for an earlier weight is the product of local effects along the paths that connect that weight to the loss. This is why chain rule is central, why activations influence gradient flow, and why deep models can suffer from vanishing or exploding gradients.",
    commonMistakes: [
      "Thinking backprop is a separate algorithm unrelated to calculus.",
      "Forgetting that gradients at earlier layers depend on every later local derivative along the path.",
      "Ignoring activation derivatives and then not understanding why gradients can vanish."
    ],
    examAngles: [
      "You may be asked to compute one local gradient using chain rule.",
      "You may be asked to distinguish forward-pass quantities from backward-pass gradients.",
      "You should be able to explain why deep networks can have gradient-flow problems."
    ],
    advancedExample: {
      title: "One backprop chain-rule path.",
      steps: [
        "Suppose L depends on activation a, a depends on pre-activation z, and z = w1x1 + w2x2 + b.",
        "Then dL/dw1 = dL/da × da/dz × dz/dw1.",
        "Because dz/dw1 = x1, the input directly scales how strongly w1 feels the loss.",
        "This is the local-to-global logic repeated across the whole network."
      ]
    },
    examQuestions: [
      {
        prompt: "Why can gradients vanish in deep networks?",
        answer: "Because many small local derivatives multiplied together can shrink the final gradient dramatically.",
        explanation: "Chain rule multiplies local terms across layers, so repeated factors below 1 can quickly drive gradients toward zero.",
        steps: [
          "Write the gradient as a product of local derivatives.",
          "Notice several terms are small.",
          "Multiply many small numbers together.",
          "The result becomes tiny for early layers."
        ]
      },
      {
        prompt: "What does backprop give you after the forward pass is finished?",
        answer: "Gradients of the loss with respect to the weights and biases.",
        explanation: "Those gradients are what optimization uses to update parameters.",
        steps: [
          "Run the forward pass to compute outputs and loss.",
          "Differentiate the loss backward through the graph.",
          "Collect dL/dw and dL/db for each parameter.",
          "Use them in gradient descent or a related optimizer."
        ]
      }
    ],
    realLifeExamples: [
      "If a group project fails, you trace backward which part of the chain contributed most. That is the spirit of backpropagation.",
      "Neural-network training sends error information backward so each weight knows how it affected the loss."
    ],
    goDeeper: [
      "Be able to explain backprop as chain rule on a computation graph, not as a magical black box.",
      "Understand why local gradients multiply and why activations affect gradient flow."
    ],
    extraPractice: [
      {
        prompt: "If z = w1x1 + w2x2 + b, what is ∂z/∂w1?",
        answer: "x1.",
        steps: [
          "Differentiate z with respect to w1.",
          "Treat x1 as a constant multiplier.",
          "The term w1x1 becomes x1 after differentiation.",
          "The other terms do not depend on w1, so the derivative is x1."
        ]
      },
      {
        prompt: "Why can ReLU shut off gradient flow for a neuron?",
        answer: "Because when the pre-activation is non-positive, the local derivative can be zero.",
        steps: [
          "ReLU outputs max(0, z).",
          "When z is not positive, the output is flat in that region.",
          "A flat region has derivative 0 there.",
          "That zero local derivative blocks gradient flow through that neuron."
        ]
      },
      {
        prompt: "If dL/da = 3, da/dz = 0.5, and dz/dw1 = 2, what is dL/dw1?",
        answer: "dL/dw1 = 3.",
        steps: [
          "Use chain rule: dL/dw1 = dL/da × da/dz × dz/dw1.",
          "Substitute the numbers: 3 × 0.5 × 2.",
          "Multiply 0.5 × 2 = 1.",
          "So the final gradient is 3."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does backpropagation compute for each weight?",
        options: ["How the loss changes if the weight changes", "The dataset mean", "The class prior only", "A matrix inverse automatically"],
        correctIndex: 0,
        explanation: "Correct. Backprop computes gradients with respect to weights."
      },
      {
        question: "Why is chain rule central to backprop?",
        options: ["Because outputs depend on weights through many intermediate steps", "Because gradients are always constants", "Because neural nets are only linear", "Because probabilities must sum to 1"],
        correctIndex: 0,
        explanation: "Correct. The chain rule connects those layered dependencies."
      }
    ]
  },
  logistic: {
    goal: "Code a logistic score and probability so binary classification math feels concrete.",
    examUse: "Useful for coding questions on sigmoid outputs and classification probabilities.",
    codeTitle: "Logistic Score And Probability",
    code: "import math\n\nz = 1.5\np = 1 / (1 + math.exp(-z))\nprint(round(p, 3))",
    output: "0.818",
    explainSteps: [
      "Start with the score z.",
      "Apply the sigmoid formula to turn it into a probability-like output.",
      "The result stays between 0 and 1.",
      "This is the code version of logistic regression output."
    ],
    traps: [
      "Confusing the raw score z with the probability p.",
      "Dropping the negative sign in the exponent.",
      "Assuming the sigmoid output is already a hard class label."
    ],
    examTasks: [
      "Compute a sigmoid probability.",
      "Interpret score vs probability.",
      "Explain why the output is bounded."
    ],
    gradedQuestions: [
      {
        prompt: "Given `z = 0`, print the sigmoid output rounded to 2 decimals.",
        starterCode: "import math\n\nz = 0\n\n# Compute sigmoid(z)\n# Print the rounded result",
        explanation: "Use the sigmoid formula `1 / (1 + exp(-z))`.",
        solution: "import math\n\nz = 0\np = 1 / (1 + math.exp(-z))\nprint(round(p, 2))",
        output: "0.5"
      }
    ]
  },
  backprop: {
    goal: "Trace a tiny chain-rule path in code so backprop stops looking magical.",
    examUse: "Useful for coding questions where you compute one local gradient by hand or in code.",
    codeTitle: "Backprop Style Local Gradient",
    code: "dL_da = 3\nda_dz = 0.5\ndz_dw1 = 2\ndL_dw1 = dL_da * da_dz * dz_dw1\nprint(dL_dw1)",
    output: "3.0",
    explainSteps: [
      "Each local derivative is stored as a variable.",
      "Chain rule multiplies them in order.",
      "The result tells how the loss changes with one weight.",
      "This is a tiny code version of backpropagation."
    ],
    traps: [
      "Adding local derivatives instead of multiplying them.",
      "Confusing forward values with backward gradients.",
      "Forgetting which local derivative belongs to which link."
    ],
    examTasks: [
      "Compute one chain-rule gradient in code.",
      "Explain what each local derivative represents.",
      "Relate the result to weight updates."
    ],
    gradedQuestions: [
      {
        prompt: "If `dL_da = 2`, `da_dz = 0.25`, and `dz_dw = 8`, print `dL_dw`.",
        starterCode: "dL_da = 2\nda_dz = 0.25\ndz_dw = 8\n\n# Compute dL_dw\n# Print it",
        explanation: "Multiply the local derivatives in order using chain rule.",
        solution: "dL_da = 2\nda_dz = 0.25\ndz_dw = 8\ndL_dw = dL_da * da_dz * dz_dw\nprint(dL_dw)",
        output: "4.0"
      }
    ]
  }
};

const defaultEnhancement = {
  realLifeExamples: [],
  goDeeper: [],
  extraPractice: [],
  extraMcqs: [],
  examQuestions: [],
  advancedExplanation: "",
  commonMistakes: [],
  examAngles: [],
  importantFoundations: [],
  foundationTags: [],
  notationGuide: [],
  inlinePythonCompanion: null,
  visualAnalogy: null,
  visualScenario: null
};

const pythonBridgeMap = {
  functions: "python-basics",
  vectors: "python-numpy",
  "matrix-basics": "python-numpy",
  matrices: "python-linear-algebra",
  transformations: "python-linear-algebra",
  basis: "python-linear-algebra",
  composition: "python-linear-algebra",
  "inverse-spaces": "python-linear-algebra",
  dot: "python-linear-algebra",
  eigen: "python-linear-algebra",
  eigendecomp: "python-linear-algebra",
  derivatives: "python-functions-gradients",
  multivariable: "python-functions-gradients",
  "vector-valued": "python-functions-gradients",
  probability: "python-probability",
  "random-variables": "python-probability",
  binomial: "python-probability",
  statistics: "python-probability",
  bayes: "python-probability",
  distributions: "python-probability",
  regression: "python-functions-gradients",
  "gradient-descent": "python-functions-gradients",
  logistic: "python-functions-gradients",
  backprop: "python-functions-gradients"
};

const pythonGradedQuestionMap = {
  "python-basics": [
    {
      prompt: "Write Python code that stores the numbers 3, 5, and 7 in a list, then prints their sum.",
      starterCode:
        "# Store the values in a list\n# Find the total\n# Print the total",
      explanation:
        "The exam is checking whether you can build a list, use Python's sum logic, and print the final result clearly.",
      solution: "numbers = [3, 5, 7]\ntotal = sum(numbers)\nprint(total)",
      output: "15"
    },
    {
      prompt: "Given `m = 4`, `x = 2`, and `c = -1`, write Python code that computes `m * x + c` and prints the result.",
      starterCode:
        "m = 4\nx = 2\nc = -1\n\n# Compute the expression\n# Print the result",
      explanation:
        "This is the coding version of a direct algebra substitution question.",
      solution: "m = 4\nx = 2\nc = -1\nresult = m * x + c\nprint(result)",
      output: "7"
    }
  ],
  "python-numpy": [
    {
      prompt: "Create a NumPy vector `[4, -2, 1]` and print its shape.",
      starterCode:
        "import numpy as np\n\n# Create the vector\n# Print the shape",
      explanation:
        "The core skill is knowing how to represent a vector with `np.array` and inspect dimensions with `.shape`.",
      solution: "import numpy as np\n\nv = np.array([4, -2, 1])\nprint(v.shape)",
      output: "(3,)"
    },
    {
      prompt: "Create the matrix `[[1, 2], [3, 4], [5, 6]]` and print its shape.",
      starterCode:
        "import numpy as np\n\n# Create the matrix\n# Print the shape",
      explanation:
        "This checks whether you can tell the difference between a vector-like 1D array and a 2D matrix array.",
      solution: "import numpy as np\n\nA = np.array([[1, 2], [3, 4], [5, 6]])\nprint(A.shape)",
      output: "(3, 2)"
    }
  ],
  "python-linear-algebra": [
    {
      prompt: "Given `A = [[1, 2], [0, 1]]` and `v = [3, 1]`, write NumPy code that computes `A @ v` and prints the result.",
      starterCode:
        "import numpy as np\n\nA = np.array([[1, 2], [0, 1]])\nv = np.array([3, 1])\n\n# Compute the matrix-vector product\n# Print the result",
      explanation:
        "The exam is testing whether you know that matrix multiplication in Python uses `@`, not plain `*`.",
      solution: "import numpy as np\n\nA = np.array([[1, 2], [0, 1]])\nv = np.array([3, 1])\nprint(A @ v)",
      output: "[5 1]"
    },
    {
      prompt: "Write Python code that finds the eigenvalues of `A = [[1, 4], [2, 3]]`.",
      starterCode:
        "import numpy as np\n\nA = np.array([[1, 4], [2, 3]])\n\n# Find the eigenvalues\n# Print them",
      explanation:
        "This is a direct translation of an eigenvalue question into the standard NumPy linear algebra command.",
      solution: "import numpy as np\n\nA = np.array([[1, 4], [2, 3]])\nvalues, vectors = np.linalg.eig(A)\nprint(values)",
      output: "[ 5. -1.]"
    }
  ],
  "python-probability": [
    {
      prompt: "Write Python code that computes the mean of `[2, 4, 6, 8]` using NumPy.",
      starterCode:
        "import numpy as np\n\ndata = np.array([2, 4, 6, 8])\n\n# Compute the mean\n# Print it",
      explanation:
        "This is the coding form of a simple expected-value or average question.",
      solution: "import numpy as np\n\ndata = np.array([2, 4, 6, 8])\nprint(np.mean(data))",
      output: "5.0"
    },
    {
      prompt: "Simulate 5 binomial outcomes with `n = 4` and `p = 0.5`, then print the sample array.",
      starterCode:
        "import numpy as np\n\n# Simulate the binomial outcomes\n# Print the result",
      explanation:
        "The exact numbers can vary, so the key skill is writing the correct simulation command, not memorizing one output.",
      solution: "import numpy as np\n\nsamples = np.random.binomial(n=4, p=0.5, size=5)\nprint(samples)",
      output: "Output will vary."
    }
  ],
  "python-functions-gradients": [
    {
      prompt:
        "Given f(x, y) = x**2 + y**2 + 2*x*y, write Python code that computes the gradient vector [df/dx, df/dy] at an input pair (x, y) and rounds each value to 2 decimal places.",
      starterCode:
        "x, y = 2.0, 3.0\n\n# Write the gradient code below\n# df_dx = ...\n# df_dy = ...\n# print([...])",
      explanation:
        "First compute the partial derivatives by hand: df/dx = 2x + 2y and df/dy = 2y + 2x. Then translate those two formulas directly into Python variables and print the rounded list.",
      solution:
        "x, y = 2.0, 3.0\n\ndf_dx = 2 * x + 2 * y\ndf_dy = 2 * y + 2 * x\n\nprint([round(df_dx, 2), round(df_dy, 2)])",
      output: "[10.0, 10.0]"
    },
    {
      prompt: "Write a Python function `predict(x, m, c)` that returns `m * x + c`, then print `predict(5, 2, 1)`.",
      starterCode:
        "# Define the function\n# Print the result for x = 5, m = 2, c = 1",
      explanation:
        "This is the programming version of writing a mathematical rule and then evaluating it at a specific input.",
      solution:
        "def predict(x, m, c):\n    return m * x + c\n\nprint(predict(5, 2, 1))",
      output: "11"
    }
  ]
};

const lessonMicroFoundationMap = {
  vectors: {
    importantFoundations: [
      "Magnitude tells you the size of a vector, not just where it points.",
      "Distance between two points is the magnitude of their difference vector.",
      "A unit vector keeps direction but rescales the length to 1."
    ],
    foundationTags: ["magnitude", "distance", "unit-vector"]
  },
  matrices: {
    importantFoundations: [
      "Matrix multiplication works by matching inner dimensions, not by guessing from appearance.",
      "Each entry in the product comes from one row meeting one column.",
      "Transpose swaps rows and columns, which is why it keeps appearing in linear algebra and ML."
    ],
    foundationTags: ["transpose"]
  },
  transformations: {
    importantFoundations: [
      "A determinant tells you whether the transformation stretches, shrinks, flips, or collapses space.",
      "A nonzero determinant means the transformation can be undone in the matching dimension."
    ],
    foundationTags: ["determinant"]
  },
  basis: {
    importantFoundations: [
      "A vector stays the same object even when its coordinates change under a new basis.",
      "Coordinate change is about description, not changing the underlying geometric object."
    ],
    foundationTags: ["coordinate-change"]
  },
  composition: {
    importantFoundations: [
      "Composition means applying one transformation after another in order, not adding them together.",
      "Matrix powers are repeated applications of the same transformation."
    ]
  },
  "inverse-spaces": {
    importantFoundations: [
      "Determinant, rank, and inverse questions are really asking whether information was lost.",
      "If space collapses onto fewer directions, you cannot reverse the transformation."
    ],
    foundationTags: ["determinant"]
  },
  derivatives: {
    importantFoundations: [
      "Derivative notation can look different, but all versions are asking about local rate of change.",
      "A derivative is a slope idea before it becomes an optimization tool."
    ],
    foundationTags: ["gradient-basics"]
  },
  multivariable: {
    importantFoundations: [
      "Partial derivatives ask how the output changes when one variable moves and the others stay fixed.",
      "The gradient collects those partials into one direction-of-change vector."
    ],
    foundationTags: ["gradient-basics"]
  },
  "vector-valued": {
    importantFoundations: [
      "One parameter can control several outputs at once, which is why vector-valued functions trace paths.",
      "A vector-valued function is still one rule even though it returns multiple coordinates."
    ]
  },
  probability: {
    importantFoundations: [
      "An event is not the same thing as a random variable or a full distribution.",
      "Probability tells you belief over outcomes, not certainty about one result."
    ]
  },
  "random-variables": {
    importantFoundations: [
      "A random variable assigns numbers to outcomes so averages and spread can be computed.",
      "Expected value is a weighted average, not a guaranteed one-shot outcome."
    ]
  },
  binomial: {
    importantFoundations: [
      "Binomial questions assume a fixed number of independent trials with the same success probability.",
      "Exact probability and cumulative probability are different tasks."
    ]
  },
  statistics: {
    importantFoundations: [
      "Variance measures spread around the mean, while standard deviation puts that spread back in familiar units.",
      "A z-score tells you how far a value is from the mean in standard-deviation units."
    ],
    foundationTags: ["z-score"]
  },
  distributions: {
    importantFoundations: [
      "A distribution tells you how values are spread out, not just where the average sits.",
      "Standard normal uses z-scores so different scales can be compared cleanly."
    ],
    foundationTags: ["z-score"]
  },
  regression: {
    importantFoundations: [
      "Predictions, residuals, and error all need to be read together before optimization means anything.",
      "Regression is the first place linear algebra, calculus, and statistics visibly meet."
    ]
  },
  eigen: {
    importantFoundations: [
      "Eigenvectors are special directions that stay on their own line under the transformation.",
      "Eigenvalues tell how much those special directions are stretched or flipped."
    ]
  },
  eigendecomp: {
    importantFoundations: [
      "Eigendecomposition changes into the eigenvector basis, scales simply, then changes back.",
      "The matrix D is simple because the action in the eigenbasis becomes diagonal."
    ]
  },
  "gradient-descent": {
    importantFoundations: [
      "Gradient descent is just repeated use of slope information to reduce the loss step by step.",
      "Learning rate controls step size, not the direction of the gradient itself."
    ],
    foundationTags: ["gradient-basics"]
  },
  logistic: {
    importantFoundations: [
      "Logistic regression converts a score into a probability-like value using the sigmoid curve.",
      "The output is about class confidence, not a hard decision by itself."
    ]
  },
  backprop: {
    importantFoundations: [
      "Backprop is repeated chain rule through many connected computations.",
      "Each local derivative controls how strongly error information flows backward."
    ],
    foundationTags: ["gradient-basics"]
  }
};

const lessonNotationGuideMap = {
  vectors: [
    {
      symbol: "||v||",
      readAs: "Read as: length of vector v",
      meaning: "This is the size of the vector measured from the origin to the tip of the arrow.",
      whyItShowsUp: "It appears in magnitude, distance, normalization, cosine similarity, and gradient size."
    },
    {
      symbol: "u = v / ||v||",
      readAs: "Read as: unit vector in the direction of v",
      meaning: "This keeps the same direction but rescales the length to 1.",
      whyItShowsUp: "It matters when you care about direction more than raw size."
    },
    {
      symbol: "d(a, b) = ||a - b||",
      readAs: "Read as: distance between a and b",
      meaning: "Subtract first to get the difference vector, then take its length.",
      whyItShowsUp: "Distance shows up in clustering, nearest-neighbor methods, and error measurement."
    }
  ],
  matrices: [
    {
      symbol: "A_{ij}",
      readAs: "Read as: entry in row i, column j",
      meaning: "The first index tells you the row and the second tells you the column.",
      whyItShowsUp: "It is the standard way to talk about one exact matrix entry."
    },
    {
      symbol: "AB",
      readAs: "Read as: A times B",
      meaning: "This means matrix multiplication, not entrywise multiplication.",
      whyItShowsUp: "It represents composition of transformations and layered feature mixing."
    },
    {
      symbol: "A^T",
      readAs: "Read as: transpose of A",
      meaning: "Rows become columns and columns become rows.",
      whyItShowsUp: "Transpose appears in covariance, dot-product style formulas, and linear algebra identities."
    },
    {
      symbol: "det(A)",
      readAs: "Read as: determinant of A",
      meaning: "This tells you whether the matrix collapses space and whether an inverse is possible.",
      whyItShowsUp: "It is a quick test for invertibility and geometric collapse."
    }
  ],
  transformations: [
    {
      symbol: "T(v)",
      readAs: "Read as: the output of transformation T on vector v",
      meaning: "This is function notation, but now the input and output are vectors.",
      whyItShowsUp: "It helps you think of a matrix as a rule on the whole space."
    },
    {
      symbol: "T(e1), T(e2)",
      readAs: "Read as: images of the basis vectors",
      meaning: "These tell you where the basic horizontal and vertical directions go.",
      whyItShowsUp: "Knowing them is enough to reconstruct the whole linear transformation."
    },
    {
      symbol: "T(0) = 0",
      readAs: "Read as: the origin stays fixed",
      meaning: "Every linear transformation sends the zero vector to itself.",
      whyItShowsUp: "It is a fast exam test for whether a rule can be linear."
    }
  ],
  basis: [
    {
      symbol: "{b1, b2}",
      readAs: "Read as: a basis made of vectors b1 and b2",
      meaning: "A basis is a coordinate language for describing vectors.",
      whyItShowsUp: "Change-of-basis questions depend on separating the vector from its coordinates."
    },
    {
      symbol: "[v]_B",
      readAs: "Read as: coordinates of v in basis B",
      meaning: "This is not a new vector. It is the same vector written in a different basis language.",
      whyItShowsUp: "It appears whenever the exam asks for coordinates in a nonstandard basis."
    },
    {
      symbol: "Bc = v",
      readAs: "Read as: basis matrix times coordinates equals the vector",
      meaning: "The columns of B are basis vectors and c stores the coefficients.",
      whyItShowsUp: "This is the clean algebraic form of coordinate-finding."
    }
  ],
  "inverse-spaces": [
    {
      symbol: "A^-1",
      readAs: "Read as: inverse of A",
      meaning: "This is the matrix that undoes the action of A when it exists.",
      whyItShowsUp: "It appears in solving systems, change of basis, and reversible transformations."
    },
    {
      symbol: "rank(A)",
      readAs: "Read as: rank of A",
      meaning: "This counts how many independent output directions survive after the transformation.",
      whyItShowsUp: "Rank tells you whether information was preserved or collapsed."
    },
    {
      symbol: "Null(A)",
      readAs: "Read as: null space of A",
      meaning: "These are the vectors sent to zero by A.",
      whyItShowsUp: "Null space explains exactly which directions get lost."
    }
  ],
  derivatives: [
    {
      symbol: "f'(x)",
      readAs: "Read as: derivative of f at x",
      meaning: "This is the slope or local rate of change at that point.",
      whyItShowsUp: "It is the entry point to optimization and gradient ideas."
    },
    {
      symbol: "df/dx",
      readAs: "Read as: derivative of f with respect to x",
      meaning: "This is another notation for the same slope idea.",
      whyItShowsUp: "Exams often switch notation without warning."
    }
  ],
  multivariable: [
    {
      symbol: "∂f/∂x",
      readAs: "Read as: partial derivative with respect to x",
      meaning: "Only x is allowed to move while the other variables are held fixed.",
      whyItShowsUp: "This is the standard notation in multivariable optimization."
    },
    {
      symbol: "∇f(x, y)",
      readAs: "Read as: gradient of f at x, y",
      meaning: "This bundles the partial derivatives into one vector.",
      whyItShowsUp: "Gradients drive gradient descent and backpropagation."
    }
  ],
  probability: [
    {
      symbol: "P(A)",
      readAs: "Read as: probability of event A",
      meaning: "This is the chance that event A occurs.",
      whyItShowsUp: "It is the base notation for all probability questions."
    },
    {
      symbol: "P(A^c)",
      readAs: "Read as: probability of not A",
      meaning: "This is the complement event.",
      whyItShowsUp: "Complement logic is one of the fastest exam shortcuts."
    }
  ],
  "random-variables": [
    {
      symbol: "X",
      readAs: "Read as: random variable X",
      meaning: "This is a rule that assigns a number to each outcome.",
      whyItShowsUp: "It lets probability questions become numerical and statistical."
    },
    {
      symbol: "E[X]",
      readAs: "Read as: expected value of X",
      meaning: "This is the weighted average or long-run center of X.",
      whyItShowsUp: "It is used in loss functions, average reward, and basic statistics."
    }
  ],
  statistics: [
    {
      symbol: "μ",
      readAs: "Read as: mu, the mean",
      meaning: "This is the center of the data or distribution.",
      whyItShowsUp: "It is the reference point for spread and z-scores."
    },
    {
      symbol: "σ",
      readAs: "Read as: sigma, the standard deviation",
      meaning: "This measures typical spread around the mean in the original units.",
      whyItShowsUp: "It tells you whether a value is ordinary or unusually far from the center."
    },
    {
      symbol: "z = (x - μ) / σ",
      readAs: "Read as: z-score of x",
      meaning: "This standardizes a value by showing how many standard deviations it is from the mean.",
      whyItShowsUp: "It appears in standard normal questions and comparison across scales."
    }
  ],
  bayes: [
    {
      symbol: "P(A | B)",
      readAs: "Read as: probability of A given B",
      meaning: "This means we are working under the condition that B has already happened.",
      whyItShowsUp: "Conditional direction is the main place students get Bayes questions wrong."
    },
    {
      symbol: "P(B | A)",
      readAs: "Read as: probability of B given A",
      meaning: "This reverses the condition and is usually not equal to P(A | B).",
      whyItShowsUp: "Bayes theorem is largely about moving between these two directions."
    }
  ],
  distributions: [
    {
      symbol: "N(μ, σ²)",
      readAs: "Read as: normal with mean mu and variance sigma squared",
      meaning: "This names a normal distribution using its center and spread.",
      whyItShowsUp: "It is the standard notation for normal-distribution questions."
    },
    {
      symbol: "f(x)",
      readAs: "Read as: density at x",
      meaning: "For a continuous variable, this is a density value, not the probability at exactly one point.",
      whyItShowsUp: "Students often confuse density height with direct probability."
    }
  ],
  eigen: [
    {
      symbol: "Av = λv",
      readAs: "Read as: A v equals lambda v",
      meaning: "The matrix acts on v without changing its line, only its scale or sign.",
      whyItShowsUp: "This is the core statement of eigenvectors and eigenvalues."
    },
    {
      symbol: "det(A - λI) = 0",
      readAs: "Read as: determinant of A minus lambda I equals zero",
      meaning: "This is the characteristic equation used to find eigenvalues.",
      whyItShowsUp: "It is the standard exam starting point for eigenvalue problems."
    }
  ],
  eigendecomp: [
    {
      symbol: "A = C D C^-1",
      readAs: "Read as: A equals C D C inverse",
      meaning: "This rewrites A in the eigenvector basis where the action becomes diagonal.",
      whyItShowsUp: "It is the main decomposition formula for powers, PCA intuition, and diagonalization."
    },
    {
      symbol: "D = diag(λ1, λ2, ...)",
      readAs: "Read as: diagonal matrix of eigenvalues",
      meaning: "The diagonal stores the scaling factors in the eigenbasis.",
      whyItShowsUp: "This is what makes repeated powers easier."
    }
  ],
  "gradient-descent": [
    {
      symbol: "x_new = x_old - η ∇f",
      readAs: "Read as: new x equals old x minus eta times gradient",
      meaning: "Move opposite the gradient because the gradient points uphill.",
      whyItShowsUp: "This is the main update pattern in optimization."
    },
    {
      symbol: "η",
      readAs: "Read as: eta, learning rate",
      meaning: "This sets step size, not direction.",
      whyItShowsUp: "It controls slow progress versus overshooting."
    }
  ],
  logistic: [
    {
      symbol: "z = wx + b",
      readAs: "Read as: score z equals w x plus b",
      meaning: "This is the raw linear score before probability conversion.",
      whyItShowsUp: "It separates the score from the sigmoid output."
    },
    {
      symbol: "σ(z)",
      readAs: "Read as: sigmoid of z",
      meaning: "This maps the score into a value between 0 and 1.",
      whyItShowsUp: "It turns raw score into probability-like output for classification."
    }
  ],
  backprop: [
    {
      symbol: "dL/dw",
      readAs: "Read as: derivative of loss with respect to w",
      meaning: "This tells you how the loss changes if weight w changes a little.",
      whyItShowsUp: "It is the quantity used for weight updates."
    },
    {
      symbol: "dL/dw = dL/da · da/dz · dz/dw",
      readAs: "Read as: chain rule path for the gradient",
      meaning: "Multiply local derivatives along the path from the weight to the loss.",
      whyItShowsUp: "This is the local mechanics of backpropagation."
    }
  ]
};

const lessonExamExpansionMap = {
  vectors: {
    examQuestions: [
      {
        prompt: "Find the magnitude of v = (3, 4) and explain why this vector is a standard exam favorite.",
        answer: "The magnitude is 5.",
        explanation: "This is the classic 3-4-5 right triangle, so the vector length is easy to compute and recognize.",
        steps: [
          "Use ||v|| = sqrt(x^2 + y^2).",
          "Substitute x = 3 and y = 4.",
          "Compute sqrt(9 + 16) = sqrt(25).",
          "So the magnitude is 5."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does normalizing a vector do?",
        options: ["Keeps direction and changes length to 1", "Keeps length and changes direction", "Always makes coordinates positive", "Turns a vector into a matrix"],
        correctIndex: 0,
        explanation: "Correct. Normalization keeps direction but rescales the vector to unit length."
      }
    ]
  },
  matrices: {
    examQuestions: [
      {
        prompt: "If A is 2 × 3 and B is 3 × 2, what is the shape of AB and why?",
        answer: "AB is 2 × 2.",
        explanation: "The inner dimensions match at 3, so multiplication is defined, and the result keeps the outer dimensions.",
        steps: [
          "Write the shapes clearly: 2 × 3 and 3 × 2.",
          "Check the inner dimensions 3 and 3.",
          "Because they match, multiplication is allowed.",
          "Keep the outer dimensions 2 and 2, so AB is 2 × 2."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What happens to the shape of a 2 × 5 matrix after transpose?",
        options: ["It becomes 5 × 2", "It stays 2 × 5", "It becomes 2 × 2", "It becomes 5 × 5"],
        correctIndex: 0,
        explanation: "Correct. Transpose swaps rows and columns."
      }
    ]
  },
  transformations: {
    examQuestions: [
      {
        prompt: "Is T(x, y) = (x + 1, y + 2) linear? Explain the fastest test.",
        answer: "No. It is affine, not linear.",
        explanation: "A linear transformation must keep the origin fixed, but this rule sends (0, 0) to (1, 2).",
        steps: [
          "Test the origin first.",
          "Compute T(0, 0) = (1, 2).",
          "A linear map must satisfy T(0, 0) = (0, 0).",
          "So this rule is not linear."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "Which rule is most likely a shear?",
        options: ["One basis vector stays fixed while the other tilts", "Both basis vectors shrink to zero", "Every vector rotates by exactly 90 degrees", "All points move by the same translation"],
        correctIndex: 0,
        explanation: "Correct. A shear keeps one basis direction fixed while slanting the other."
      }
    ]
  },
  basis: {
    examQuestions: [
      {
        prompt: "Why can the same vector have different coordinates in different bases?",
        answer: "Because coordinates depend on the chosen reference directions, not on changing the vector itself.",
        explanation: "The geometric object stays the same while the description language changes.",
        steps: [
          "Separate the vector from its coordinate description.",
          "Change the basis vectors used as references.",
          "Recompute the coefficients needed in that new basis.",
          "The vector stays the same, but the coordinates change."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does [v]_B mean?",
        options: ["Coordinates of v in basis B", "The magnitude of v in basis B", "The transpose of v", "The determinant of the basis"],
        correctIndex: 0,
        explanation: "Correct. The brackets with a subscript basis denote coordinates in that basis."
      }
    ]
  },
  "inverse-spaces": {
    examQuestions: [
      {
        prompt: "Why can a matrix with determinant 0 not have an inverse?",
        answer: "Because it collapses space and loses information, so there is no unique way to recover the input.",
        explanation: "An inverse requires one-to-one behavior, but collapse means different inputs can map to the same output.",
        steps: [
          "Interpret determinant 0 as geometric collapse.",
          "Collapsed maps lose at least one independent direction.",
          "Losing information breaks one-to-one behavior.",
          "Without one-to-one behavior, an inverse cannot exist."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "If rank(A) is less than the number of columns, what must be true?",
        options: ["Some input directions are lost", "A is automatically orthogonal", "A must be diagonal", "Every vector is an eigenvector"],
        correctIndex: 0,
        explanation: "Correct. Reduced rank means some independent input directions collapse together."
      }
    ]
  },
  multivariable: {
    examQuestions: [
      {
        prompt: "For f(x, y) = x^2 + y^2, find the gradient at (1, -2).",
        answer: "The gradient is (2, -4).",
        explanation: "Differentiate with respect to each variable separately, then evaluate at the point.",
        steps: [
          "Compute ∂f/∂x = 2x and ∂f/∂y = 2y.",
          "Substitute x = 1 and y = -2.",
          "That gives (2, -4).",
          "This vector points in the direction of steepest increase."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does the gradient point toward?",
        options: ["Steepest increase", "Steepest decrease", "Always the x-axis", "The origin only"],
        correctIndex: 0,
        explanation: "Correct. The negative gradient points toward steepest decrease, so the gradient itself points uphill."
      }
    ]
  },
  "random-variables": {
    examQuestions: [
      {
        prompt: "Why can expected value be 2.5 even if the random variable never actually outputs 2.5?",
        answer: "Because expectation is a weighted average, not a guaranteed one-shot outcome.",
        explanation: "It describes the long-run center of the outcomes, not a necessarily observed single value.",
        steps: [
          "List the possible values and their probabilities.",
          "Multiply each value by its probability.",
          "Add the weighted contributions.",
          "The result can fall between actual possible outcomes."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What is the best way to think of E[X]?",
        options: ["Long-run weighted average", "Most likely single outcome always", "Largest value of X", "A probability between 0 and 1"],
        correctIndex: 0,
        explanation: "Correct. Expected value is the weighted average over outcomes."
      }
    ]
  },
  statistics: {
    examQuestions: [
      {
        prompt: "What does a z-score of -2 tell you in plain English?",
        answer: "The value is two standard deviations below the mean.",
        explanation: "The sign tells direction from the mean and the size tells standardized distance.",
        steps: [
          "Read the sign first: negative means below the mean.",
          "Read the magnitude next: 2 means two standard deviations away.",
          "Put both together.",
          "So the value is two standard deviations below the mean."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "Why is standard deviation often easier to interpret than variance?",
        options: ["It is in the original units", "It is always smaller than the mean", "It removes all outliers", "It equals the median"],
        correctIndex: 0,
        explanation: "Correct. Standard deviation is the square root of variance, so it returns to the original units."
      }
    ]
  },
  bayes: {
    examQuestions: [
      {
        prompt: "Why do students often confuse P(disease | positive) with P(positive | disease)?",
        answer: "Because the words sound similar, but the conditioning direction is reversed.",
        explanation: "Bayes questions are mostly about keeping the conditioning event and the target event in the right order.",
        steps: [
          "Read the event after the vertical bar first.",
          "That is the condition you already know happened.",
          "Then read the event before the bar as the thing you want the probability of.",
          "Reversing those roles changes the meaning completely."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "In a Bayes question, what is the denominator usually counting?",
        options: ["All ways the observed evidence can happen", "Only the true-positive path", "Only the prior probability", "Only the false-negative path"],
        correctIndex: 0,
        explanation: "Correct. The denominator totals all ways the observed evidence could occur."
      }
    ]
  },
  distributions: {
    examQuestions: [
      {
        prompt: "Why is the height of a probability density function not itself the probability at one exact point?",
        answer: "Because for continuous variables, probability comes from area under the curve over an interval, not from one exact point height.",
        explanation: "A density can be high without the probability of one exact point being nonzero.",
        steps: [
          "Separate density from probability.",
          "For a continuous variable, one exact point has probability 0.",
          "Probability is computed over intervals using area under the curve.",
          "So the graph height alone is not the probability."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does a z-score help you do?",
        options: ["Compare values across different scales", "Find eigenvectors directly", "Transpose a matrix", "Guarantee normality"],
        correctIndex: 0,
        explanation: "Correct. Z-scores put values onto the same standardized scale."
      }
    ]
  },
  eigen: {
    examQuestions: [
      {
        prompt: "For A = [[3, 0], [0, 2]], why are the coordinate axes already eigenvector directions?",
        answer: "Because the matrix scales each axis independently without mixing coordinates.",
        explanation: "Diagonal matrices act directly along the coordinate axes, which makes those axes eigenvector directions.",
        steps: [
          "Look at the matrix shape: it is diagonal.",
          "The x-coordinate gets scaled by 3 and the y-coordinate by 2.",
          "Neither axis gets mixed into the other.",
          "So each axis direction stays on its own line and is an eigenvector direction."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What is an eigenvalue telling you?",
        options: ["How much the matching eigenvector direction is scaled", "Which basis to choose always", "The determinant only", "The matrix rank only"],
        correctIndex: 0,
        explanation: "Correct. The eigenvalue gives the scale or sign flip along its eigenvector direction."
      }
    ]
  },
  eigendecomp: {
    examQuestions: [
      {
        prompt: "Why does diagonalization make A^n easier to compute?",
        answer: "Because D^n is easy to compute: you just raise each diagonal eigenvalue to the power n.",
        explanation: "The hard matrix action becomes simple independent scaling once you are in the eigenbasis.",
        steps: [
          "Rewrite A as C D C^-1.",
          "Then A^n becomes C D^n C^-1.",
          "For diagonal D, powers act entry by entry on the diagonal.",
          "So repeated matrix powers become much simpler."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What must match between C and D in A = C D C^-1?",
        options: ["Eigenvector order and eigenvalue order", "Only the determinant", "Only the trace", "Nothing needs to match"],
        correctIndex: 0,
        explanation: "Correct. Each eigenvalue in D must correspond to the matching eigenvector column in C."
      }
    ]
  },
  "gradient-descent": {
    examQuestions: [
      {
        prompt: "If the gradient is positive at the current point, which way does gradient descent move in one dimension?",
        answer: "It moves left, toward smaller x values.",
        explanation: "The update subtracts a positive gradient, so the parameter decreases.",
        steps: [
          "Start with x_new = x_old - η f'(x_old).",
          "If f'(x_old) is positive, the quantity being subtracted is positive.",
          "Subtracting a positive value makes x smaller.",
          "So the update moves left."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What is the biggest risk of choosing η too large?",
        options: ["Overshooting the minimum", "Forcing determinant to zero", "Making the gradient positive", "Removing the bias term"],
        correctIndex: 0,
        explanation: "Correct. A step size that is too large can keep jumping over the low region."
      }
    ]
  },
  logistic: {
    examQuestions: [
      {
        prompt: "Why is a negative score z enough to say the model leans toward class 0 before even computing the exact sigmoid value?",
        answer: "Because sigmoid(z) is below 0.5 whenever z is negative.",
        explanation: "The sign of the score already tells which side of the decision boundary you are on.",
        steps: [
          "Use the decision boundary z = 0.",
          "Check the sign of the score.",
          "Negative means the score is on the class-0 side of the boundary.",
          "So the predicted probability is below 0.5."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What does the bias term b mainly do in z = wx + b?",
        options: ["Shift the decision boundary", "Normalize the data automatically", "Compute the gradient", "Set the batch size"],
        correctIndex: 0,
        explanation: "Correct. The bias shifts the score and therefore shifts the decision boundary."
      }
    ]
  },
  backprop: {
    examQuestions: [
      {
        prompt: "Why does the input value x1 appear inside dL/dw1 for z = w1x1 + w2x2 + b?",
        answer: "Because z changes with w1 at a rate equal to x1, so chain rule carries that factor into the gradient.",
        explanation: "The local derivative dz/dw1 is exactly x1.",
        steps: [
          "Write z = w1x1 + w2x2 + b.",
          "Differentiate z with respect to w1.",
          "The derivative is x1.",
          "Then chain rule multiplies this local derivative into dL/dw1."
        ]
      }
    ],
    extraMcqs: [
      {
        question: "What happens if one local derivative in a chain-rule path is zero?",
        options: ["The whole product along that path becomes zero", "The final gradient becomes 1", "Backprop stops using chain rule", "The weight disappears from the model"],
        correctIndex: 0,
        explanation: "Correct. Multiplying by zero kills that path's gradient contribution."
      }
    ]
  }
};

const inlinePythonCompanionMap = {
  functions: {
    goal: "Write the same linear rule you see in algebra as a tiny Python function.",
    examUse: "Useful for code questions where you must evaluate or write a simple mathematical rule.",
    codeTitle: "Functions In Python",
    code: "def line(x, m, c):\n    return m * x + c\n\nprint(line(3, 2, 1))",
    output: "7",
    explainSteps: [
      "The function stores the rule y = mx + c.",
      "The inputs x, m, and c are the numbers from the algebra problem.",
      "The return line computes the output exactly like the formula.",
      "Calling the function plugs in actual values."
    ],
    traps: [
      "Forgetting `return` and expecting Python to output automatically.",
      "Mixing the input x with the parameters m and c.",
      "Confusing assignment with equality."
    ],
    examTasks: [
      "Write a one-line prediction rule.",
      "Evaluate a function call quickly.",
      "Explain what each parameter means."
    ],
    gradedQuestions: [
      {
        prompt: "Write a Python function `f(x)` that returns `3 * x + 2`, then print `f(4)`.",
        starterCode: "# Define f(x)\n# Print f(4)",
        explanation: "Translate the algebra rule directly into a Python function and then call it once.",
        solution: "def f(x):\n    return 3 * x + 2\n\nprint(f(4))",
        output: "14"
      }
    ]
  },
  vectors: {
    goal: "Represent a vector in NumPy and compute its magnitude and unit direction.",
    examUse: "Useful when exams ask for vector length, normalization, or basic vector manipulation in code.",
    codeTitle: "Vectors, Magnitude, And Unit Direction",
    code: "import numpy as np\n\nv = np.array([3.0, 4.0])\nmag = np.linalg.norm(v)\nunit_v = np.round(v / mag, 2)\nprint(mag)\nprint(unit_v)",
    output: "5.0\n[0.6 0.8]",
    explainSteps: [
      "The vector is stored as a NumPy array.",
      "`np.linalg.norm` computes the magnitude.",
      "Dividing by the magnitude gives a unit vector.",
      "The rounded result is easier to read in an exam."
    ],
    traps: [
      "Forgetting to convert to decimal values before dividing.",
      "Dividing by zero when the vector is the zero vector.",
      "Thinking normalization changes direction."
    ],
    examTasks: [
      "Compute magnitude from coordinates.",
      "Normalize a vector.",
      "Interpret vector code as geometry."
    ],
    gradedQuestions: [
      {
        prompt: "Create the vector `[6, 8]`, compute its magnitude, and print the result.",
        starterCode: "import numpy as np\n\n# Create the vector\n# Compute the magnitude\n# Print it",
        explanation: "Use `np.array` for the vector and `np.linalg.norm` for the magnitude.",
        solution: "import numpy as np\n\nv = np.array([6, 8])\nmag = np.linalg.norm(v)\nprint(mag)",
        output: "10.0"
      }
    ]
  },
  "matrix-basics": {
    goal: "Read matrix shape and transpose in the same code form used in linear algebra exams.",
    examUse: "Useful when exams ask for rows, columns, shapes, or transpose operations.",
    codeTitle: "Matrix Shape And Transpose",
    code: "import numpy as np\n\nA = np.array([[1, 2, 3], [4, 5, 6]])\nprint(A.shape)\nprint(A.T)",
    output: "(2, 3)\n[[1 4]\n [2 5]\n [3 6]]",
    explainSteps: [
      "The matrix has 2 rows and 3 columns.",
      "`.shape` confirms the dimensions.",
      "`A.T` flips rows into columns.",
      "This is the code version of transpose notation."
    ],
    traps: [
      "Reading shape backwards.",
      "Forgetting that transpose changes layout, not the values themselves.",
      "Using uneven row lengths."
    ],
    examTasks: [
      "Identify rows and columns from code.",
      "Print a transpose.",
      "Read dimensions without guessing."
    ],
    gradedQuestions: [
      {
        prompt: "Create the matrix `[[1, 0], [2, 3], [4, 5]]` and print its transpose.",
        starterCode: "import numpy as np\n\n# Create the matrix\n# Print the transpose",
        explanation: "Store the matrix as a 2D array and use `.T` to transpose it.",
        solution: "import numpy as np\n\nA = np.array([[1, 0], [2, 3], [4, 5]])\nprint(A.T)",
        output: "[[1 2 4]\n [0 3 5]]"
      }
    ]
  },
  matrices: {
    goal: "Translate matrix-vector and matrix-matrix multiplication directly into NumPy.",
    examUse: "Useful for coded linear transformation questions and matrix multiplication drills.",
    codeTitle: "Matrix Multiplication In Python",
    code: "import numpy as np\n\nA = np.array([[1, 2], [0, 1]])\nB = np.array([[2, 0], [1, 3]])\nv = np.array([3, 1])\nprint(A @ B)\nprint(A @ v)",
    output: "[[4 6]\n [1 3]]\n[5 1]",
    explainSteps: [
      "`@` performs matrix multiplication.",
      "The first print multiplies two matrices.",
      "The second print multiplies a matrix by a vector.",
      "Both are the code version of the same paper operation."
    ],
    traps: [
      "Using `*` instead of `@` for matrix multiplication.",
      "Ignoring dimension compatibility.",
      "Thinking matrix multiplication is commutative."
    ],
    examTasks: [
      "Write matrix multiplication with `@`.",
      "Check shapes before multiplying.",
      "Explain the output as a transformed vector or new matrix."
    ],
    gradedQuestions: [
      {
        prompt: "Given `A = [[2, 1], [0, 1]]` and `v = [4, 3]`, print `A @ v`.",
        starterCode: "import numpy as np\n\nA = np.array([[2, 1], [0, 1]])\nv = np.array([4, 3])\n\n# Print A @ v",
        explanation: "Use the matrix multiplication operator directly on the matrix and vector.",
        solution: "import numpy as np\n\nA = np.array([[2, 1], [0, 1]])\nv = np.array([4, 3])\nprint(A @ v)",
        output: "[11  3]"
      }
    ]
  },
  dot: {
    goal: "Compute dot products and read them as similarity or alignment scores in code.",
    examUse: "Useful for vector similarity, cosine-style reasoning, and matrix/vector coding questions.",
    codeTitle: "Dot Product And Alignment",
    code: "import numpy as np\n\na = np.array([2, 3])\nb = np.array([4, 1])\ndot = np.dot(a, b)\ncosine = dot / (np.linalg.norm(a) * np.linalg.norm(b))\nprint(dot)\nprint(round(cosine, 2))",
    output: "11\n0.74",
    explainSteps: [
      "`np.dot` computes the dot product.",
      "The raw dot score mixes length and alignment.",
      "Dividing by both magnitudes gives cosine-style alignment.",
      "This is how code ties back to the geometry."
    ],
    traps: [
      "Forgetting that a large dot product can come from long vectors, not just strong alignment.",
      "Dividing by zero when a vector has zero magnitude.",
      "Mixing elementwise multiply with dot product."
    ],
    examTasks: [
      "Compute a dot product in NumPy.",
      "Relate the score to alignment.",
      "Interpret when the score is zero or negative."
    ],
    gradedQuestions: [
      {
        prompt: "Create `a = [1, 2]` and `b = [3, 4]`, then print their dot product.",
        starterCode: "import numpy as np\n\n# Create the vectors\n# Print the dot product",
        explanation: "Store both vectors and use `np.dot(a, b)`.",
        solution: "import numpy as np\n\na = np.array([1, 2])\nb = np.array([3, 4])\nprint(np.dot(a, b))",
        output: "11"
      }
    ]
  },
  derivatives: {
    goal: "Write a slope rule in Python and connect derivative notation to an actual computed value.",
    examUse: "Useful when exams ask you to trace a derivative formula or compute a slope value from code.",
    codeTitle: "Derivative Rule In Python",
    code: "def df(x):\n    return 2 * x + 1\n\nprint(df(3))",
    output: "7",
    explainSteps: [
      "The derivative rule is written as a Python function.",
      "Calling `df(3)` evaluates the slope at x = 3.",
      "This is the programming version of reading f'(x).",
      "A derivative becomes a reusable computation."
    ],
    traps: [
      "Mixing the original function with its derivative rule.",
      "Using `^` instead of `**` in Python power expressions.",
      "Forgetting that the derivative is about rate of change, not the original output."
    ],
    examTasks: [
      "Write a derivative rule as code.",
      "Evaluate the slope at a point.",
      "Explain the difference between f(x) and f'(x)."
    ],
    gradedQuestions: [
      {
        prompt: "Write a Python function `df(x)` that returns `6 * x`, then print `df(2)`.",
        starterCode: "# Define df(x)\n# Print df(2)",
        explanation: "This is a direct translation of a derivative rule into code.",
        solution: "def df(x):\n    return 6 * x\n\nprint(df(2))",
        output: "12"
      }
    ]
  },
  multivariable: {
    goal: "Translate a gradient formula into Python and return the partial derivatives as a vector-like list.",
    examUse: "Useful for partial derivative, gradient, and optimization coding questions.",
    codeTitle: "Gradient Vector In Python",
    code: "x, y = 1.0, -1.0\ndf_dx = 6 * x + y\ndf_dy = x + 2 * y\nprint([df_dx, df_dy])",
    output: "[5.0, -1.0]",
    explainSteps: [
      "Each partial derivative is coded separately.",
      "The gradient is the pair of those partials.",
      "A Python list is enough to display the gradient for exam purposes.",
      "This is the code version of ∇f."
    ],
    traps: [
      "Forgetting which variable stays fixed in each partial derivative.",
      "Mixing the x and y formulas.",
      "Thinking the gradient is one number."
    ],
    examTasks: [
      "Compute partial derivatives in code.",
      "Print a gradient vector.",
      "Interpret the gradient as direction of steepest increase."
    ],
    gradedQuestions: [
      {
        prompt: "For `f(x, y) = x**2 + 3*y**2`, print the gradient at `(2, 1)`.",
        starterCode: "x, y = 2, 1\n\n# Compute df_dx and df_dy\n# Print the gradient",
        explanation: "Differentiate first: df/dx = 2x and df/dy = 6y, then substitute the numbers.",
        solution: "x, y = 2, 1\ndf_dx = 2 * x\ndf_dy = 6 * y\nprint([df_dx, df_dy])",
        output: "[4, 6]"
      }
    ]
  },
  probability: {
    goal: "Use Python to estimate an event probability from repeated random trials.",
    examUse: "Useful for simple simulation questions and event-probability coding tasks.",
    codeTitle: "Probability By Simulation",
    code: "import numpy as np\n\ntrials = np.random.randint(0, 2, size=20)\nprob_heads = np.mean(trials)\nprint(round(prob_heads, 2))",
    output: "Output will vary.",
    explainSteps: [
      "Each trial is a 0 or 1 outcome.",
      "The mean of many 0/1 trials estimates probability of 1.",
      "This turns abstract event probability into something you can inspect.",
      "Simulation supports, but does not replace, theory."
    ],
    traps: [
      "Expecting one simulation run to exactly match the true probability.",
      "Confusing one event with the long-run estimate.",
      "Reading random output as fixed."
    ],
    examTasks: [
      "Simulate a simple event.",
      "Estimate probability with a sample mean.",
      "Explain why the output can vary."
    ],
    gradedQuestions: [
      {
        prompt: "Simulate 10 fair coin tosses coded as 0/1 and print the estimated probability of heads.",
        starterCode: "import numpy as np\n\n# Simulate 10 tosses\n# Compute and print the estimate",
        explanation: "Use random 0/1 outcomes and take the mean of the results.",
        solution: "import numpy as np\n\ntosses = np.random.randint(0, 2, size=10)\nprint(np.mean(tosses))",
        output: "Output will vary."
      }
    ]
  },
  "random-variables": {
    goal: "Compute expected value from values and probabilities using NumPy arrays.",
    examUse: "Useful for coding tasks about weighted averages and discrete random variables.",
    codeTitle: "Expected Value In Python",
    code: "import numpy as np\n\nvalues = np.array([0, 1, 2])\nprobs = np.array([0.2, 0.5, 0.3])\nexpected = np.sum(values * probs)\nprint(expected)",
    output: "1.1",
    explainSteps: [
      "One array stores the possible values.",
      "Another stores their probabilities.",
      "Multiplying and summing computes the weighted average.",
      "That is the code version of expectation."
    ],
    traps: [
      "Forgetting probabilities must add to 1.",
      "Treating expectation as the most likely single value.",
      "Using plain addition instead of weighted addition."
    ],
    examTasks: [
      "Compute expected value from arrays.",
      "Read probabilities as weights.",
      "Explain why the answer can be non-integer."
    ],
    gradedQuestions: [
      {
        prompt: "Given values `[1, 4]` and probabilities `[0.25, 0.75]`, print the expected value.",
        starterCode: "import numpy as np\n\nvalues = np.array([1, 4])\nprobs = np.array([0.25, 0.75])\n\n# Compute and print E[X]",
        explanation: "Multiply each value by its probability and sum the products.",
        solution: "import numpy as np\n\nvalues = np.array([1, 4])\nprobs = np.array([0.25, 0.75])\nprint(np.sum(values * probs))",
        output: "3.25"
      }
    ]
  },
  statistics: {
    goal: "Compute mean, standard deviation, and z-scores in code so spread stops feeling abstract.",
    examUse: "Useful for statistics coding questions and standardized-data reasoning.",
    codeTitle: "Mean, Standard Deviation, And Z-Score",
    code: "import numpy as np\n\ndata = np.array([2, 4, 6, 8])\nmean = np.mean(data)\nstd = np.std(data)\nz = (6 - mean) / std\nprint(mean)\nprint(round(std, 2))\nprint(round(z, 2))",
    output: "5.0\n2.24\n0.45",
    explainSteps: [
      "The mean gives the center.",
      "Standard deviation gives the spread in the original units.",
      "A z-score standardizes one value relative to that center and spread.",
      "This is the code version of statistics formulas used in exams."
    ],
    traps: [
      "Confusing variance with standard deviation.",
      "Forgetting z-scores use subtraction and division.",
      "Ignoring that different libraries may define sample vs population spread differently."
    ],
    examTasks: [
      "Compute mean and standard deviation.",
      "Translate a z-score formula into code.",
      "Explain what a positive or negative z-score means."
    ],
    gradedQuestions: [
      {
        prompt: "For data `[10, 12, 14]`, compute the mean and print the z-score of 14 rounded to 2 decimals.",
        starterCode: "import numpy as np\n\ndata = np.array([10, 12, 14])\n\n# Compute mean and std\n# Compute z-score of 14\n# Print the rounded z-score",
        explanation: "Compute the center and spread first, then standardize 14 relative to them.",
        solution: "import numpy as np\n\ndata = np.array([10, 12, 14])\nmean = np.mean(data)\nstd = np.std(data)\nz = (14 - mean) / std\nprint(round(z, 2))",
        output: "1.22"
      }
    ]
  },
  regression: {
    goal: "Write a tiny prediction rule and measure prediction error in Python.",
    examUse: "Useful for code questions on predictions, residuals, and mean squared error.",
    codeTitle: "Regression Prediction And Error",
    code: "import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([3, 5, 7])\nm, b = 2, 1\npred = m * x + b\nmse = np.mean((y - pred) ** 2)\nprint(pred)\nprint(mse)",
    output: "[3 5 7]\n0.0",
    explainSteps: [
      "The line rule predicts outputs from inputs.",
      "Residuals are actual minus predicted values.",
      "Squaring and averaging gives MSE.",
      "This is the code version of regression fit quality."
    ],
    traps: [
      "Mixing residual direction.",
      "Forgetting to square errors for MSE.",
      "Assuming a line must fit perfectly."
    ],
    examTasks: [
      "Compute predictions from a line.",
      "Compute a residual or MSE.",
      "Interpret what lower error means."
    ],
    gradedQuestions: [
      {
        prompt: "Given `x = [1, 2]`, `y = [4, 6]`, `m = 2`, and `b = 1`, print the prediction array.",
        starterCode: "import numpy as np\n\nx = np.array([1, 2])\ny = np.array([4, 6])\nm, b = 2, 1\n\n# Compute predictions\n# Print them",
        explanation: "Use the line rule elementwise on the input array.",
        solution: "import numpy as np\n\nx = np.array([1, 2])\ny = np.array([4, 6])\nm, b = 2, 1\npred = m * x + b\nprint(pred)",
        output: "[3 5]"
      }
    ]
  },
  eigen: {
    goal: "Compute eigenvalues and eigenvectors in NumPy and match them to the math notation.",
    examUse: "Useful for eigendecomposition and PCA-style coding questions.",
    codeTitle: "Eigenvalues And Eigenvectors In Python",
    code: "import numpy as np\n\nA = np.array([[1, 4], [2, 3]])\nvalues, vectors = np.linalg.eig(A)\nprint(values)\nprint(np.round(vectors, 3))",
    output: "[ 5. -1.]\n[[ 0.707 -0.894]\n [ 0.707  0.447]]",
    explainSteps: [
      "`np.linalg.eig` returns both eigenvalues and eigenvectors.",
      "The eigenvalues come first as a 1D array.",
      "The eigenvectors appear as columns in the returned matrix.",
      "This is the code form of Av = λv."
    ],
    traps: [
      "Assuming eigenvectors are returned as rows.",
      "Expecting one fixed sign choice for every eigenvector.",
      "Forgetting that numerical output may be approximate."
    ],
    examTasks: [
      "Find eigenvalues in code.",
      "Read eigenvectors from the output matrix.",
      "Connect numerical output to the paper formula."
    ],
    gradedQuestions: [
      {
        prompt: "Find the eigenvalues of `[[3, 0], [0, 2]]` using Python and print them.",
        starterCode: "import numpy as np\n\nA = np.array([[3, 0], [0, 2]])\n\n# Find and print the eigenvalues",
        explanation: "Use the standard eigenvalue command and print the returned eigenvalue array.",
        solution: "import numpy as np\n\nA = np.array([[3, 0], [0, 2]])\nvalues, vectors = np.linalg.eig(A)\nprint(values)",
        output: "[3. 2.]"
      }
    ]
  },
  bayes: {
    goal: "Compute a posterior probability from prior, likelihood, and false-positive information in code.",
    examUse: "Useful for simple Bayes-style coding tasks and sanity checks.",
    codeTitle: "Bayes Update In Python",
    code: "prior = 0.01\nsensitivity = 0.9\nfalse_positive = 0.05\nposterior = (sensitivity * prior) / ((sensitivity * prior) + (false_positive * (1 - prior)))\nprint(round(posterior, 3))",
    output: "0.154",
    explainSteps: [
      "The numerator is the true-positive path.",
      "The denominator adds all ways to get a positive test.",
      "The result is the posterior probability after the evidence.",
      "This is Bayes written as direct computation."
    ],
    traps: [
      "Confusing prior with posterior.",
      "Forgetting the false-positive term in the denominator.",
      "Mixing conditional directions."
    ],
    examTasks: [
      "Code a Bayes update from given rates.",
      "Interpret the posterior.",
      "Explain why the denominator matters."
    ],
    gradedQuestions: [
      {
        prompt: "Using prior = 0.2, sensitivity = 0.8, and false_positive = 0.1, print the posterior rounded to 2 decimals.",
        starterCode: "prior = 0.2\nsensitivity = 0.8\nfalse_positive = 0.1\n\n# Compute posterior\n# Print rounded value",
        explanation: "Use the standard Bayes update with a numerator for true positives and a denominator for all positives.",
        solution: "prior = 0.2\nsensitivity = 0.8\nfalse_positive = 0.1\nposterior = (sensitivity * prior) / ((sensitivity * prior) + (false_positive * (1 - prior)))\nprint(round(posterior, 2))",
        output: "0.67"
      }
    ]
  },
  distributions: {
    goal: "Work with mean, standard deviation, and z-scores in the coding form used for distributions.",
    examUse: "Useful for standard normal and distribution-based coding questions.",
    codeTitle: "Distribution Parameters In Python",
    code: "mu = 10\nsigma = 2\nx = 14\nz = (x - mu) / sigma\nprint(z)",
    output: "2.0",
    explainSteps: [
      "The mean and standard deviation define the scale.",
      "The z-score converts the raw value into standardized distance.",
      "This is the main bridge to standard normal reasoning.",
      "It removes raw-unit dependence."
    ],
    traps: [
      "Confusing sigma with variance.",
      "Forgetting to subtract the mean first.",
      "Using the wrong sign."
    ],
    examTasks: [
      "Compute a z-score from distribution parameters.",
      "Interpret standardized distance.",
      "Connect N(mu, sigma^2) to code variables."
    ],
    gradedQuestions: [
      {
        prompt: "Given `mu = 50`, `sigma = 5`, and `x = 60`, print the z-score.",
        starterCode: "mu = 50\nsigma = 5\nx = 60\n\n# Compute and print the z-score",
        explanation: "Use the standard formula `(x - mu) / sigma`.",
        solution: "mu = 50\nsigma = 5\nx = 60\nprint((x - mu) / sigma)",
        output: "2.0"
      }
    ]
  },
  "gradient-descent": {
    goal: "Code one update step so optimization stops feeling abstract.",
    examUse: "Useful for questions that ask you to trace or implement a single gradient-descent step.",
    codeTitle: "One Gradient Descent Step",
    code: "x = 5.0\nlr = 0.1\ngrad = 2 * x\nx = x - lr * grad\nprint(x)",
    output: "4.0",
    explainSteps: [
      "Compute the current gradient.",
      "Multiply by the learning rate.",
      "Move opposite the gradient.",
      "Print the updated value."
    ],
    traps: [
      "Moving with the gradient instead of against it.",
      "Forgetting the learning-rate multiplier.",
      "Updating before computing the gradient."
    ],
    examTasks: [
      "Trace one descent step.",
      "Explain the role of learning rate.",
      "Connect the update to the slope."
    ],
    gradedQuestions: [
      {
        prompt: "If `x = 3`, `lr = 0.5`, and `grad = 4`, print the updated x after one descent step.",
        starterCode: "x = 3\nlr = 0.5\ngrad = 4\n\n# Update x\n# Print it",
        explanation: "Use `x = x - lr * grad` exactly once.",
        solution: "x = 3\nlr = 0.5\ngrad = 4\nx = x - lr * grad\nprint(x)",
        output: "1.0"
      }
    ]
  },
  transformations: {
    goal: "Read a matrix as a transformation rule and apply it to basis vectors or ordinary vectors in code.",
    examUse: "Useful for coding questions about scaling, shear, and transformed vectors.",
    codeTitle: "Transformation As Matrix Action",
    code: "import numpy as np\n\nA = np.array([[2, 1], [0, 1]])\ne1 = np.array([1, 0])\ne2 = np.array([0, 1])\nprint(A @ e1)\nprint(A @ e2)",
    output: "[2 0]\n[1 1]",
    explainSteps: [
      "The matrix acts on vectors by multiplication.",
      "Applying it to basis vectors shows what the transformation does to the whole space.",
      "Those transformed basis vectors define the action on every other vector.",
      "This is the code version of a linear transformation."
    ],
    traps: [
      "Thinking the matrix entries act independently with no geometric meaning.",
      "Using elementwise multiplication instead of `@`.",
      "Ignoring basis-vector interpretation."
    ],
    examTasks: [
      "Apply a transformation to vectors.",
      "Use basis vectors to read matrix action.",
      "Interpret the resulting geometry."
    ],
    gradedQuestions: [
      {
        prompt: "Given `A = [[2, 0], [0, 3]]`, print `A @ [1, 1]`.",
        starterCode: "import numpy as np\n\nA = np.array([[2, 0], [0, 3]])\nv = np.array([1, 1])\n\n# Print A @ v",
        explanation: "Multiply the matrix and vector with the `@` operator.",
        solution: "import numpy as np\n\nA = np.array([[2, 0], [0, 3]])\nv = np.array([1, 1])\nprint(A @ v)",
        output: "[2 3]"
      }
    ]
  },
  basis: {
    goal: "Express coordinate changes in code so basis questions stop feeling purely abstract.",
    examUse: "Useful for basis, coordinate, and change-of-basis exam questions.",
    codeTitle: "Coordinates In A New Basis",
    code: "import numpy as np\n\nB = np.array([[1, 1], [1, -1]])\nv = np.array([2, 0])\ncoords = np.linalg.solve(B, v)\nprint(coords)",
    output: "[1. 1.]",
    explainSteps: [
      "The columns of B are the basis vectors.",
      "Solving Bc = v finds the coordinates c in that basis.",
      "The vector stays the same, but its coordinates change.",
      "This is the code version of change of basis."
    ],
    traps: [
      "Confusing the vector with its coordinate representation.",
      "Using basis vectors as rows instead of columns.",
      "Forgetting that coordinates depend on the chosen basis."
    ],
    examTasks: [
      "Compute coordinates in a nonstandard basis.",
      "Interpret the meaning of the coordinate vector.",
      "Connect solve-based code to basis equations."
    ],
    gradedQuestions: [
      {
        prompt: "Given basis matrix `B = [[1, 1], [1, -1]]` and vector `v = [2, 0]`, print the basis coordinates.",
        starterCode: "import numpy as np\n\nB = np.array([[1, 1], [1, -1]])\nv = np.array([2, 0])\n\n# Solve for the coordinates",
        explanation: "Use `np.linalg.solve(B, v)` to find the coordinate vector.",
        solution: "import numpy as np\n\nB = np.array([[1, 1], [1, -1]])\nv = np.array([2, 0])\nprint(np.linalg.solve(B, v))",
        output: "[1. 1.]"
      }
    ]
  },
  composition: {
    goal: "Code repeated matrix action so composition and matrix powers feel concrete.",
    examUse: "Useful for composition and repeated-transformation coding questions.",
    codeTitle: "Composition And Matrix Powers",
    code: "import numpy as np\n\nA = np.array([[2, 0], [0, 2]])\nprint(A @ A)\nprint(np.linalg.matrix_power(A, 3))",
    output: "[[4 0]\n [0 4]]\n[[8 0]\n [0 8]]",
    explainSteps: [
      "Multiplying A by itself once gives A squared.",
      "`matrix_power` repeats the same transformation several times.",
      "The output shows how repeated transformations scale effects.",
      "This is the code version of matrix powers."
    ],
    traps: [
      "Confusing A^n with scalar powers done entrywise.",
      "Forgetting that order matters in composition.",
      "Using plain multiplication instead of matrix multiplication."
    ],
    examTasks: [
      "Compute A squared or A cubed.",
      "Explain repeated transformation effect.",
      "Connect powers to iteration."
    ],
    gradedQuestions: [
      {
        prompt: "Given `A = [[2, 0], [0, 2]]`, print `A^3` using NumPy.",
        starterCode: "import numpy as np\n\nA = np.array([[2, 0], [0, 2]])\n\n# Print A^3",
        explanation: "Use `np.linalg.matrix_power(A, 3)` for repeated matrix multiplication.",
        solution: "import numpy as np\n\nA = np.array([[2, 0], [0, 2]])\nprint(np.linalg.matrix_power(A, 3))",
        output: "[[8 0]\n [0 8]]"
      }
    ]
  },
  "inverse-spaces": {
    goal: "Compute determinant, inverse, and rank in code and connect them to lost or preserved information.",
    examUse: "Useful for matrix invertibility and rank coding questions.",
    codeTitle: "Inverse, Determinant, And Rank",
    code: "import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nprint(np.linalg.det(A))\nprint(np.linalg.inv(A))\nprint(np.linalg.matrix_rank(A))",
    output: "-2.0000000000000004\n[[-2.   1. ]\n [ 1.5 -0.5]]\n2",
    explainSteps: [
      "Determinant tests whether the matrix collapses space.",
      "A nonzero determinant permits an inverse in the matching dimension.",
      "Rank counts how many independent directions remain.",
      "These outputs are three views of the same information structure."
    ],
    traps: [
      "Trying to invert a singular matrix.",
      "Treating determinant, rank, and inverse as unrelated.",
      "Ignoring numerical approximation in printed output."
    ],
    examTasks: [
      "Compute determinant and rank.",
      "Read whether a matrix is invertible.",
      "Connect the numeric results to geometry."
    ],
    gradedQuestions: [
      {
        prompt: "For `A = [[1, 2], [2, 4]]`, print the determinant and rank.",
        starterCode: "import numpy as np\n\nA = np.array([[1, 2], [2, 4]])\n\n# Print determinant\n# Print rank",
        explanation: "Use determinant and rank to show that the matrix collapses to one independent direction.",
        solution: "import numpy as np\n\nA = np.array([[1, 2], [2, 4]])\nprint(np.linalg.det(A))\nprint(np.linalg.matrix_rank(A))",
        output: "0.0\n1"
      }
    ]
  },
  "vector-valued": {
    goal: "Represent a path in code by letting one parameter control several coordinates at once.",
    examUse: "Useful for parametric curves, motion, and vector-valued function questions.",
    codeTitle: "Vector-Valued Function In Python",
    code: "def r(t):\n    return [t, t**2]\n\nprint(r(-1))\nprint(r(2))",
    output: "[-1, 1]\n[2, 4]",
    explainSteps: [
      "The same input t is used in both coordinates.",
      "The output is a pair, not one number.",
      "Changing t moves the point along a path.",
      "This is the coding form of r(t) = (x(t), y(t))."
    ],
    traps: [
      "Using different parameters for different coordinates.",
      "Forgetting the output is a vector-like object.",
      "Thinking the function must return one scalar."
    ],
    examTasks: [
      "Define a vector-valued function.",
      "Evaluate the function at given t values.",
      "Relate the outputs to a path."
    ],
    gradedQuestions: [
      {
        prompt: "Write a Python function `r(t)` that returns `[t, 2 * t]`, then print `r(3)`.",
        starterCode: "# Define r(t)\n# Print r(3)",
        explanation: "Use one input parameter and return both coordinates together in a list.",
        solution: "def r(t):\n    return [t, 2 * t]\n\nprint(r(3))",
        output: "[3, 6]"
      }
    ]
  },
  binomial: {
    goal: "Simulate repeated success counts and connect exact vs cumulative binomial questions to code.",
    examUse: "Useful for probability coding questions involving repeated Bernoulli trials.",
    codeTitle: "Binomial Simulation In Python",
    code: "import numpy as np\n\nsamples = np.random.binomial(n=4, p=0.5, size=8)\nprint(samples)\nprint(np.mean(samples <= 2))",
    output: "Output will vary.",
    explainSteps: [
      "Each sample counts successes out of 4 trials.",
      "The array stores several repeated experiments.",
      "The comparison `samples <= 2` marks cumulative events.",
      "Taking the mean estimates the cumulative probability."
    ],
    traps: [
      "Confusing `size` with the number of trials `n`.",
      "Reading one simulation as the exact theoretical probability.",
      "Mixing exact and cumulative questions."
    ],
    examTasks: [
      "Simulate binomial counts.",
      "Estimate a cumulative probability from simulation.",
      "Interpret what the code is counting."
    ],
    gradedQuestions: [
      {
        prompt: "Simulate 6 binomial samples with `n = 3` and `p = 0.5`, then print the sample array.",
        starterCode: "import numpy as np\n\n# Simulate and print the binomial samples",
        explanation: "Use `np.random.binomial` with the correct trial count, success probability, and sample size.",
        solution: "import numpy as np\n\nsamples = np.random.binomial(n=3, p=0.5, size=6)\nprint(samples)",
        output: "Output will vary."
      }
    ]
  },
  eigendecomp: {
    goal: "See eigendecomposition as code that separates a matrix into eigenvectors and eigenvalues.",
    examUse: "Useful for decomposition and diagonalization coding questions.",
    codeTitle: "Eigendecomposition Pieces In Python",
    code: "import numpy as np\n\nA = np.array([[1, 4], [2, 3]])\nvalues, vectors = np.linalg.eig(A)\nD = np.diag(values)\nprint(D)\nprint(np.round(vectors, 3))",
    output: "[[ 5.  0.]\n [ 0. -1.]]\n[[ 0.707 -0.894]\n [ 0.707  0.447]]",
    explainSteps: [
      "Eigenvalues come from `np.linalg.eig`.",
      "Putting them on the diagonal forms D.",
      "The eigenvectors form the columns of the eigenvector matrix.",
      "This is the computational skeleton behind A = C D C^-1."
    ],
    traps: [
      "Forgetting that D is diagonal.",
      "Assuming eigenvector order is arbitrary relative to eigenvalues.",
      "Ignoring approximation in floating-point output."
    ],
    examTasks: [
      "Build D from eigenvalues.",
      "Read the eigenvector matrix.",
      "Connect code outputs to decomposition notation."
    ],
    gradedQuestions: [
      {
        prompt: "Using `values = np.array([3, 2])`, create and print the diagonal matrix D.",
        starterCode: "import numpy as np\n\nvalues = np.array([3, 2])\n\n# Build and print D",
        explanation: "Use `np.diag(values)` to place the eigenvalues on the diagonal.",
        solution: "import numpy as np\n\nvalues = np.array([3, 2])\nprint(np.diag(values))",
        output: "[[3 0]\n [0 2]]"
      }
    ]
  },
  logistic: {
    goal: "Code a logistic score and probability so binary classification math feels concrete.",
    examUse: "Useful for coding questions on sigmoid outputs and classification probabilities.",
    codeTitle: "Logistic Score And Probability",
    code: "import math\n\nz = 1.5\np = 1 / (1 + math.exp(-z))\nprint(round(p, 3))",
    output: "0.818",
    explainSteps: [
      "Start with the score z.",
      "Apply the sigmoid formula to turn it into a probability-like output.",
      "The result stays between 0 and 1.",
      "This is the code version of logistic regression output."
    ],
    traps: [
      "Confusing the raw score z with the probability p.",
      "Dropping the negative sign in the exponent.",
      "Assuming the sigmoid output is already a hard class label."
    ],
    examTasks: [
      "Compute a sigmoid probability.",
      "Interpret score vs probability.",
      "Explain why the output is bounded."
    ],
    gradedQuestions: [
      {
        prompt: "Given `z = 0`, print the sigmoid output rounded to 2 decimals.",
        starterCode: "import math\n\nz = 0\n\n# Compute sigmoid(z)\n# Print the rounded result",
        explanation: "Use the sigmoid formula `1 / (1 + exp(-z))`.",
        solution: "import math\n\nz = 0\np = 1 / (1 + math.exp(-z))\nprint(round(p, 2))",
        output: "0.5"
      }
    ]
  },
  backprop: {
    goal: "Trace a tiny chain-rule path in code so backprop stops looking magical.",
    examUse: "Useful for coding questions where you compute one local gradient by hand or in code.",
    codeTitle: "Backprop Style Local Gradient",
    code: "dL_da = 3\nda_dz = 0.5\ndz_dw1 = 2\ndL_dw1 = dL_da * da_dz * dz_dw1\nprint(dL_dw1)",
    output: "3.0",
    explainSteps: [
      "Each local derivative is stored as a variable.",
      "Chain rule multiplies them in order.",
      "The result tells how the loss changes with one weight.",
      "This is a tiny code version of backpropagation."
    ],
    traps: [
      "Adding local derivatives instead of multiplying them.",
      "Confusing forward values with backward gradients.",
      "Forgetting which local derivative belongs to which link."
    ],
    examTasks: [
      "Compute one chain-rule gradient in code.",
      "Explain what each local derivative represents.",
      "Relate the result to weight updates."
    ],
    gradedQuestions: [
      {
        prompt: "If `dL_da = 2`, `da_dz = 0.25`, and `dz_dw = 8`, print `dL_dw`.",
        starterCode: "dL_da = 2\nda_dz = 0.25\ndz_dw = 8\n\n# Compute dL_dw\n# Print it",
        explanation: "Multiply the local derivatives in order using chain rule.",
        solution: "dL_da = 2\nda_dz = 0.25\ndz_dw = 8\ndL_dw = dL_da * da_dz * dz_dw\nprint(dL_dw)",
        output: "4.0"
      }
    ]
  }
};

export const lessons = baseLessons.map((lesson, index) => {
  const enhancement = lessonEnhancements[lesson.key] || {};
  const microFoundations = lessonMicroFoundationMap[lesson.key] || {};
  const examExpansion = lessonExamExpansionMap[lesson.key] || {};
  const notationGuide = lessonNotationGuideMap[lesson.key] || [];

  return {
    ...defaultEnhancement,
    ...lesson,
    order: index + 1,
    ...enhancement,
    ...microFoundations,
    notationGuide: [...notationGuide],
    extraPractice: [
      ...(lesson.extraPractice || []),
      ...(enhancement.extraPractice || []),
      ...(examExpansion.extraPractice || [])
    ].map(normalizeExtraPractice),
    extraMcqs: [
      ...(lesson.extraMcqs || []),
      ...(enhancement.extraMcqs || []),
      ...(examExpansion.extraMcqs || [])
    ],
    examQuestions: [
      ...(lesson.examQuestions || []),
      ...(enhancement.examQuestions || []),
      ...(examExpansion.examQuestions || [])
    ],
    importantFoundations: [
      ...(lesson.importantFoundations || []),
      ...(enhancement.importantFoundations || []),
      ...(microFoundations.importantFoundations || [])
    ],
    foundationTags: [
      ...new Set([
        ...(lesson.foundationTags || []),
        ...(enhancement.foundationTags || []),
        ...(microFoundations.foundationTags || [])
      ])
    ],
    pythonLessonKey: pythonBridgeMap[lesson.key] || null,
    inlinePythonCompanion: inlinePythonCompanionMap[lesson.key] || null,
    pythonCompanion: lesson.pythonCompanion
      ? {
          ...lesson.pythonCompanion,
          gradedQuestions:
            pythonGradedQuestionMap[lesson.key] ||
            (lesson.pythonCompanion.gradedQuestion ? [lesson.pythonCompanion.gradedQuestion] : [])
        }
      : lesson.pythonCompanion
  };
});

function normalizeExtraPractice(item) {
  return {
    ...item,
    steps: item.steps || [
      "Identify the core idea from this topic.",
      item.answer
    ]
  };
}
