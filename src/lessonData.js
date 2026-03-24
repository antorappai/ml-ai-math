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
    topics: ["Probability", "Statistics", "Bayes", "Distributions"]
  },
  {
    key: "modeling",
    title: "5. Modeling Bridge",
    purpose:
      "Connect the math to an actual predictive model before moving on to more advanced ML.",
    mlConnection:
      "Linear regression is the cleanest first example of linear algebra, calculus, and statistics working together.",
    topics: ["Linear Regression", "Gradient Descent", "Logistic Regression", "Backprop"]
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
    label: "Distributions",
    navDescription: "How uncertainty is shaped, not just how large it is.",
    subtitle:
      "A distribution tells you how probability mass or density is spread across possible values.",
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
      "A distribution answers more than 'how likely is one event?'. It answers 'how is uncertainty spread across all possible values?'",
    symbolGuide: [
      { symbol: "μ", meaning: "Mean, the center of the distribution." },
      { symbol: "σ", meaning: "Standard deviation, the spread." },
      { symbol: "N(μ, σ²)", meaning: "Normal distribution with mean μ and variance σ²." }
    ],
    simpleExplanation:
      "A distribution is a map of where values are likely to appear and how tightly or loosely they cluster.",
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
      "Interpret how unusual a value is."
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

const lessonEnhancements = {
  functions: {
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
  matrices: {
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
      "You should be able to explain what determinant sign and size say about the transformation."
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
      "In ML, one dense layer of a neural network is matrix multiplication followed by a bias and activation."
    ],
    goDeeper: [
      "Think of a matrix as a transformation machine, not a table to memorize.",
      "Practice seeing matrix multiplication as mixing input coordinates into new coordinates."
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
      "Not using transformed basis vectors to reconstruct the entire map."
    ],
    examAngles: [
      "You may be asked to identify a transformation from the images of e1 and e2.",
      "You may be asked whether a rule is linear by checking additivity and scaling behavior.",
      "You should be able to recognize scaling, shear, reflection, and projection patterns."
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
  dot: {
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
  probability: {
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
  statistics: {
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
  "gradient-descent": {
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
  }
};

const defaultEnhancement = {
  realLifeExamples: [],
  goDeeper: [],
  extraPractice: [],
  extraMcqs: [],
  advancedExplanation: "",
  commonMistakes: [],
  examAngles: [],
  visualAnalogy: null
};

export const lessons = baseLessons.map((lesson) => ({
  ...defaultEnhancement,
  ...lesson,
  ...(lessonEnhancements[lesson.key] || {}),
  extraPractice: (lessonEnhancements[lesson.key]?.extraPractice || []).map(normalizeExtraPractice)
}));

function normalizeExtraPractice(item) {
  return {
    ...item,
    steps: item.steps || [
      "Identify the core idea from this topic.",
      item.answer
    ]
  };
}
