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
    topics: ["Vectors", "Matrices", "Dot Product", "Linear Transformations"]
  },
  {
    key: "calculus",
    title: "3. Calculus For Learning",
    purpose:
      "See how models improve by following slopes and gradients.",
    mlConnection:
      "Derivatives, partial derivatives, and gradients are the language of optimization and backpropagation.",
    topics: ["Derivatives", "Multivariable Calculus"]
  },
  {
    key: "probability",
    title: "4. Probability & Statistics",
    purpose:
      "Reason about uncertainty, averages, spread, and noisy data.",
    mlConnection:
      "Classification confidence, likelihood, model evaluation, and generalization all depend on probability and statistics.",
    topics: ["Probability", "Statistics"]
  },
  {
    key: "modeling",
    title: "5. Modeling Bridge",
    purpose:
      "Connect the math to an actual predictive model before moving on to more advanced ML.",
    mlConnection:
      "Linear regression is the cleanest first example of linear algebra, calculus, and statistics working together.",
    topics: ["Linear Regression"]
  }
];

export const futureModules = [
  "Eigenvalues, eigenvectors, and PCA",
  "Conditional probability and Bayes rule",
  "Common probability distributions",
  "Optimization and gradient descent",
  "Logistic regression and classification loss",
  "Neural networks and backpropagation"
];

export const lessons = [
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
    key: "matrices",
    order: 3,
    stage: "Linear Algebra",
    difficulty: "Core",
    label: "Matrices & Multiplication",
    navDescription: "Machines that remix vectors.",
    subtitle:
      "A matrix takes a vector in and sends a new vector out. That is already most of the intuition you need.",
    learningPurpose:
      "See matrix multiplication as a transformation rule, not just a grid of numbers to memorize.",
    whyThisBefore:
      "Study matrices before linear transformations and regression because they encode how models change inputs.",
    prerequisites: ["Functions & Graphs", "Vectors"],
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
    key: "dot",
    order: 5,
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
  }
];

function curveValue(x) {
  return 0.18 * x * x - 0.8 * x + 1.2;
}

function curveSlope(x) {
  return 0.36 * x - 0.8;
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
