export const lessons = [
  {
    key: "vectors",
    label: "Vectors",
    navDescription: "Arrows that show direction and size.",
    subtitle:
      "This is the first building block. If embeddings or gradients sound scary, start here.",
    visualTitle: "Change the arrow and see its parts update.",
    visualDescription:
      "Slide left-right and up-down values. The picture changes first, so the coordinates never feel detached from the idea.",
    beginnerNote:
      "If you skipped advanced school math, this is where you catch up. A vector is just a direction with a size attached to it.",
    symbolGuide: [
      { symbol: "(x, y)", meaning: "A pair of values. First is sideways movement, second is up-down movement." },
      { symbol: "-", meaning: "A minus sign means move left or move down." },
      { symbol: "|v|", meaning: "This usually means the length or size of vector v." }
    ],
    simpleExplanation:
      "A vector is like a travel instruction on a map. It tells you how far to go sideways and how far to go up or down, like saying 3 steps right and 2 steps up.",
    formula: "v = (x, y)",
    formulaMeaning:
      "Meaning: one number tells the sideways move and the other tells the vertical move.",
    mlUseCase:
      "In ML, inputs, embeddings, and weights are often stored as vectors. A user profile or sentence can be represented as a long list of numbers in the same way.",
    intuition:
      "Ask: where is this thing pointing, and how strong is the push?",
    examShortcuts: [
      "Zero vector means no movement.",
      "Positive x means right, negative x means left.",
      "Positive y means up, negative y means down."
    ],
    bigPicture:
      "Vectors are the language of ML. Once this feels natural, later topics stop looking like random formulas and start looking like operations on arrows or lists of numbers.",
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
        "Because many ML objects are easiest to store and compare as lists of numbers, and vectors are the clean math idea behind those lists."
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
        metrics: [
          `x = ${ax}`,
          `y = ${ay}`,
          `Length ≈ ${formatNumber(magnitude)}`
        ],
        exampleSteps: [
          `Start with v = (${ax}, ${ay}).`,
          `The horizontal move is ${ax}, so the arrow goes ${ax >= 0 ? "right" : "left"}.`,
          `The vertical move is ${ay}, so the arrow goes ${ay >= 0 ? "up" : "down"}.`,
          `Together, those two pieces make one full direction arrow.`
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
    key: "dot",
    label: "Dot Product",
    navDescription: "One number that measures alignment.",
    subtitle:
      "This is the first place many learners panic because of the symbol. The meaning is simpler than it looks.",
    visualTitle: "Turn one vector and watch the score change.",
    visualDescription:
      "As B rotates, notice how the dot product gets bigger when the arrows help each other and smaller when they stop helping.",
    beginnerNote:
      "Forget the formula for a moment. Dot product is just a score for how much one direction supports another.",
    symbolGuide: [
      { symbol: "·", meaning: "This dot means dot product. It is not normal multiplication, even though it uses multiplication inside." },
      { symbol: "≈", meaning: "This means approximately equal to, not exactly equal to." },
      { symbol: "0", meaning: "A dot product of zero means sideways relationship, not 'nothing exists'." }
    ],
    simpleExplanation:
      "Imagine two people pushing a box. The dot product asks: how much is one person's push actually helping in the direction of the other person's push?",
    formula: "A · B = x1x2 + y1y2",
    formulaMeaning:
      "Meaning: multiply matching parts and add them to get one alignment score.",
    mlUseCase:
      "Search, recommendations, and language models use dot products to compare patterns. One vector can represent what the user wants, another can represent an item, and the score says how well they match.",
    intuition:
      "Ask: are these two directions helping each other, ignoring each other, or fighting each other?",
    examShortcuts: [
      "Dot > 0 means mostly same direction.",
      "Dot = 0 means perpendicular.",
      "Dot < 0 means mostly opposite direction."
    ],
    bigPicture:
      "Dot product is one of the fastest bridges into real ML because it powers similarity, ranking, linear models, and attention-like scoring.",
    mcq: {
      question: "What does a negative dot product usually mean?",
      options: [
        "The vectors point against each other",
        "The vectors are identical",
        "The vectors are perpendicular",
        "The vectors have no length"
      ],
      correctIndex: 0,
      explanation: "Correct. A negative score means they push in opposite overall directions."
    },
    problem: {
      prompt: "If A = (1, 2) and B = (3, 4), what is A · B?",
      answers: ["11"],
      success: "Correct. 1×3 + 2×4 = 11."
    },
    conceptQuestion: {
      prompt: "Why can dot product be useful even when the vectors are very long?",
      answer:
        "Because it compresses many matching coordinate comparisons into one number that still tells you whether the patterns align."
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
        metrics: [
          `A · B = ${formatNumber(dot)}`,
          `Angle ≈ ${betweenDeg}°`,
          alignmentLabel(dot)
        ],
        exampleSteps: [
          `Write A = (${ax}, ${ay}).`,
          `Read B from the graph as about (${formatNumber(bx)}, ${formatNumber(by)}).`,
          `Multiply matching parts: ${ax}×${formatNumber(bx)} and ${ay}×${formatNumber(by)}.`,
          `Add those two results to get the final alignment score.`
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
    key: "projection",
    label: "Projection",
    navDescription: "The useful shadow on a chosen direction.",
    subtitle:
      "Projection helps you separate what matters in one direction from what spills sideways.",
    visualTitle: "See B cast a shadow onto A.",
    visualDescription:
      "The green arrow is the part of B that truly lies along A. The dashed line is the part that does not help in A's direction.",
    beginnerNote:
      "Projection sounds advanced, but the core idea is ordinary: keep the helpful part, drop the sideways part.",
    symbolGuide: [
      { symbol: "projA(B)", meaning: "Read this as 'projection of B onto A'." },
      { symbol: "/", meaning: "This slash means divide by." },
      { symbol: "A · A", meaning: "Dot product of A with itself. Here it helps scale the answer correctly." }
    ],
    simpleExplanation:
      "Imagine a shadow falling on a road. Projection is the part of one movement that actually lands on the road's direction.",
    formula: "projA(B) = (A · B / A · A) A",
    formulaMeaning:
      "Meaning: measure how much of B points along A, then rebuild only that along-A part.",
    mlUseCase:
      "Projection shows up in regression, dimensionality reduction, and optimization because models often need to keep the useful direction and ignore the sideways noise.",
    intuition:
      "Ask: if B shines onto A like a shadow, how much of B really follows A?",
    examShortcuts: [
      "Projection zero usually means perpendicular vectors.",
      "Projection keeps the along-direction part only.",
      "The leftover piece is the sideways error or residual."
    ],
    bigPicture:
      "Projection is a geometry idea with huge ML consequences. It helps explain signal, residuals, best-fit lines, and lower-dimensional representations.",
    mcq: {
      question: "If B is perpendicular to A, what happens to the projection of B onto A?",
      options: [
        "It becomes larger than B",
        "It becomes the zero vector",
        "It becomes negative infinity",
        "It stays unchanged"
      ],
      correctIndex: 1,
      explanation: "Correct. No along-A component means no shadow on A."
    },
    problem: {
      prompt: "Project (2, 5) onto the x-axis. What vector do you get?",
      answers: ["(2,0)", "2,0", "[2,0]"],
      success: "Correct. On the x-axis, you keep the horizontal part and drop the vertical part."
    },
    conceptQuestion: {
      prompt: "Why does projection matter in regression?",
      answer:
        "Because regression tries to keep the part of the output that can be explained by the chosen predictors and leave the unexplained part as residual error."
    },
    controls: [
      { id: "ax", label: "A horizontal", min: -6, max: 6, step: 1, value: 5 },
      { id: "ay", label: "A vertical", min: -6, max: 6, step: 1, value: 1 },
      { id: "bx", label: "B horizontal", min: -6, max: 6, step: 1, value: 2 },
      { id: "by", label: "B vertical", min: -6, max: 6, step: 1, value: 5 }
    ],
    calculate(values) {
      const ax = Number(values.ax);
      const ay = Number(values.ay);
      const bx = Number(values.bx);
      const by = Number(values.by);
      const denom = ax * ax + ay * ay;
      const scale = denom === 0 ? 0 : (ax * bx + ay * by) / denom;
      const px = scale * ax;
      const py = scale * ay;
      const residualX = bx - px;
      const residualY = by - py;
      return {
        metrics: [
          `Shadow ≈ (${formatNumber(px)}, ${formatNumber(py)})`,
          `Residual ≈ (${formatNumber(residualX)}, ${formatNumber(residualY)})`,
          denom === 0 ? "A is zero" : `Scale ≈ ${formatNumber(scale)}`
        ],
        exampleSteps: [
          `Start with A = (${ax}, ${ay}) and B = (${bx}, ${by}).`,
          `Work out how much B points in A's direction.`,
          `Keep only that along-A part, which is about (${formatNumber(px)}, ${formatNumber(py)}).`,
          `The leftover sideways part is about (${formatNumber(residualX)}, ${formatNumber(residualY)}).`
        ],
        insight:
          denom === 0
            ? "Projection needs a direction first, so A cannot be the zero vector."
            : `The green arrow is B's useful shadow on A, and the dashed segment is what gets left out.`,
        drawing: {
          type: "projection",
          a: { x: ax, y: ay },
          b: { x: bx, y: by },
          p: { x: px, y: py }
        }
      };
    }
  }
];

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
