import { mcq } from "./schema.js";

const math = (latex) => `\\(${latex}\\)`;
const question = (id, prompt, options, answerIndex, explanation, optionExplanations) => ({
  ...mcq(`dot-product-trial-${id}`, prompt, options, answerIndex, explanation, "dot-product-angle"),
  optionExplanations,
});

export const dotProductChecks = [
  question("bill", "A delivery travels 4 km with a 2 kg parcel. Rates are 3 coins/km and 2 coins/kg. What is the variable charge?", ["16 coins", "12 coins", "[12, 4] coins", "11 coins"], 0,
    "Distance contributes 4 × 3 = 12 coins and mass contributes 2 × 2 = 4 coins. Add the contributions to get 16. [12, 4] still contains the two separate contributions; the dot product adds them.", [
      "Correct: 4 × 3 = 12 coins for distance and 2 × 2 = 4 coins for mass. Adding both gives 16 coins.",
      "12 coins covers the distance contribution only. The parcel mass also adds 2 × 2 = 4 coins.",
      "[12, 4] records the two correct contributions, but it is still a vector. The question asks for a total charge, so add them to get one scalar.",
      "11 adds the four input numbers, 4 + 2 + 3 + 2. Multiply each measurement by its matching rate before adding the charges.",
    ]),
  question("output", "What kind of output does a dot product of two three-coordinate vectors produce?", ["One number", "Three numbers", "Six numbers", "A three-by-three matrix"], 0,
    "There are three paired products, but their sum is one number: a scalar. The input dimension determines how many pairs you process, not how many outputs you return.", [
      "Correct: a dot product sums all paired products into one scalar, regardless of how many coordinates the input vectors have.",
      "Three numbers would be the intermediate element-by-element products. A dot product takes the extra step of summing them.",
      "Six counts the entries across both input vectors. Counting or joining entries does not perform a dot product.",
      "A three-by-three matrix can result from an outer product of two three-coordinate vectors. A dot product matches positions and sums to one number.",
    ]),
  question("negative", "What is [2, 3] · [4, −1]?", ["11", "[8, −3]", "5", "−5"], 2,
    "The paired products are 8 and −3. Their sum is 5. The minus sign belongs to the second contribution and must stay through the calculation.", [
      "11 comes from 8 + 3, losing the negative sign. The second product is 3 × (−1) = −3, so it reduces the total.",
      "[8, −3] has the right paired products, but they still need to be added. A dot product returns one scalar.",
      "Correct: 2 × 4 + 3 × (−1) = 8 − 3 = 5. The positive contribution is larger than the opposing contribution.",
      "−5 reverses the subtraction to 3 − 8. The contributions are +8 and −3, giving 8 − 3, not its negative.",
    ]),
  question("orthogonal", "Two nonzero vectors have dot product zero. What follows in Euclidean geometry?", ["They are perpendicular", "They have identical coordinates", "Their cosine is 1", "One must be the zero vector"], 0,
    "For nonzero vectors, a · b = ||a|| ||b|| cos θ. A zero dot product therefore gives cos θ = 0, so the angle is 90°. They need not have equal lengths.", [
      "Correct: both lengths are positive, so a zero dot product forces cosine to be zero. That corresponds to a 90° angle.",
      "Identical nonzero vectors have self-dot-product equal to their squared length, which is positive. They cannot have dot product zero.",
      "Cosine 1 means the nonzero vectors point in the same direction and have positive dot product. Perpendicular vectors have cosine 0.",
      "The question states both vectors are nonzero. For example, [1, 0] · [0, 1] = 0 even though neither vector is zero.",
    ]),
  question("prediction", "For x = [4, 2], w = [3, 2], and b = 5, what is the model prediction?", ["16 coins", "21 coins", "26 coins", "[12, 4, 5] coins"], 1,
    "The dot product is 4 × 3 + 2 × 2 = 16 coins. Then add the baseline of 5 coins to get 21. The bias is added once after the weighted sum.", [
      "16 coins is the correct dot product, but the prediction also includes the 5-coin baseline. Add the bias once to reach 21.",
      "Correct: 4 × 3 + 2 × 2 + 5 = 12 + 4 + 5 = 21 coins. Both feature contributions and one baseline are included.",
      "26 adds the 5-coin bias twice: 16 + 5 + 5. The model has one baseline charge, added once after the dot product.",
      "[12, 4, 5] lists the two feature contributions and the bias separately. The predicted bill is their sum, one scalar: 21 coins.",
    ]),
];
const checks = dotProductChecks;

const exercise = (id, title, prompt, hint, steps, answer, marking, commonTrap) => ({
  id: `dot-product-trial-${id}`, title, prompt, hint, steps, answer, marking, commonTrap,
});

export const dotProductPractice = [
  exercise("practice-arithmetic", "1. Work it out by hand · 3 marks",
    `Calculate ${math("[1,-2,3]\\cdot[4,5,-1]")}. Show the contribution from each coordinate, and state whether the answer is a scalar or vector.`,
    "Make three paired products. Keep each negative sign before you add.",
    ["Pair matching positions: 1 × 4 = 4, (−2) × 5 = −10, and 3 × (−1) = −3.", "Add the three contributions: 4 − 10 − 3 = −9.", "The sum is one number, so the result is a scalar."],
    "−9; a scalar", ["1 mark: correct paired products, including signs.", "1 mark: correct sum, −9.", "1 mark: identifies the scalar output."],
    "Adding the negative contributions as positive numbers gives 17. Squaring is part of the magnitude formula, not the dot-product calculation."),
  exercise("practice-angle", "2. Explain a zero result · 3 marks",
    `Calculate ${math("[1,2]\\cdot[2,-1]")} and explain the angle between these vectors. Does your answer mean they have the same meaning in an ML application?`,
    "First calculate. Then use the dot-product sign guide, remembering that neither vector is zero.",
    ["Compute 1 × 2 + 2 × (−1) = 2 − 2 = 0.", "Both vectors are nonzero, so a zero dot product means the angle is 90°: they are orthogonal.", "That is a geometric statement in this representation. It does not establish semantic equality, difference, or statistical independence."],
    "0; perpendicular; no conclusion of equal meaning", ["1 mark: dot product zero.", "1 mark: 90° / perpendicular, with the nonzero condition.", "1 mark: separates vector geometry from semantic or statistical claims."],
    "A zero score can come from cancellation. It does not require every paired product to be zero."),
  exercise("practice-cosine", "3. Compare direction fairly · 5 marks",
    `A toy query vector is ${math("\\mathbf q=[1,0]")}. Candidates are ${math("\\mathbf a=[2,0]")} and ${math("\\mathbf c=[10,10]")}. Rank them by raw dot product, then by cosine similarity. Explain the reversal.`,
    "For each candidate, calculate q · candidate and divide by ||q|| times ||candidate||. You may leave square roots exact.",
    ["Raw scores: q · a = 2 and q · c = 10. Raw dot product ranks c first.", `Lengths: ${math("\\lVert\\mathbf q\\rVert=1")}, ${math("\\lVert\\mathbf a\\rVert=2")}, and ${math("\\lVert\\mathbf c\\rVert=\\sqrt{200}=10\\sqrt2")}.`,
      `Cosines: ${math("s(\\mathbf q,\\mathbf a)=2/(1\\times2)=1")} and ${math("s(\\mathbf q,\\mathbf c)=10/(1\\times10\\sqrt2)=1/\\sqrt2\\approx0.707")}.`,
      "Cosine ranks a first: it points exactly along the query. Candidate c has a larger raw score because it is much longer, despite pointing 45° away."],
    "Raw dot: c first. Cosine: a first.", ["1 mark: both raw dot products.", "1 mark: all three lengths.", "1 mark: both cosine values.", "1 mark: correct rankings.", "1 mark: explains magnitude versus direction."],
    "Neither ranking is universally correct. The choice depends on whether magnitude should contribute to the application's score."),
];

export const dotProductExam = [
  exercise("exam-model", "A. Delivery prediction · 6 marks",
    "Without looking back: a model uses x = [6, 3] for [distance in km, mass in kg], w = [2, 4] in the matching rate units, and baseline b = 5 coins. Calculate the prediction. If only distance increases by 1 km, what changes? If the observed bill is 32 coins, calculate observed minus predicted. State one modelling assumption.",
    "Write prediction = distance contribution + mass contribution + baseline. Treat the changed distance and the observed bill as separate questions.",
    ["Distance contributes 6 × 2 = 12 coins; mass contributes 3 × 4 = 12 coins.", "Prediction = 12 + 12 + 5 = 29 coins.", "At 7 km and the same mass, prediction is 7 × 2 + 3 × 4 + 5 = 31 coins: an increase of 2 coins.", "For the original delivery, observed minus predicted = 32 − 29 = 3 coins. The model underpredicted.", "An acceptable assumption: the effect per kilometre is constant while other features are held fixed. This model also has no distance–mass interaction."],
    "29 coins; increase of 2 coins; residual +3 coins", ["2 marks: the two feature contributions.", "1 mark: prediction including bias.", "1 mark: change of 2 coins.", "1 mark: residual with the stated sign convention.", "1 mark: a concrete additive-model assumption."],
    "Residual conventions vary. Here it explicitly means observed minus predicted. A good answer names its convention."),
  exercise("exam-scaling", "B. Change units without changing predictions · 4 marks",
    "A distance-only model predicts 2x + 5 coins when x is measured in kilometres. Rewrite it using distance z measured in metres. Explain why keeping the numerical weight 2 would be wrong, then state what happens to ordinary dot products if only one coordinate is rescaled without compensating.",
    "One kilometre is 1,000 metres, so substitute x = z / 1,000.",
    ["Substitute x = z / 1,000 into 2x + 5.", "The equivalent prediction is 0.002z + 5 coins; the weight becomes 0.002 coins per metre.", "Keeping weight 2 would make the distance contribution 1,000 times larger. The baseline remains 5 coins.", "Rescaling a coordinate changes its paired product and usually changes the total dot product. Geometry and scores depend on the chosen representation."],
    "0.002z + 5; compensate the weight when changing feature units", ["1 mark: relates metres and kilometres.", "1 mark: new weight 0.002 with unchanged bias.", "1 mark: explains the 1,000-fold error.", "1 mark: explains the effect of coordinate scaling on scores."],
    "Changing one feature's units changes its direction relative to other features too. Dividing entire vectors by their lengths does not undo an arbitrary per-feature rescaling."),
];

export function buildDotProductTrial(steps) {
  const additions = {
    start: {
      title: "What should count towards a prediction?",
      goal: "Calculate and explain a weighted sum, connect it to vector angles, and choose between dot product and cosine similarity.",
      estimatedTime: "45–60 minutes with practice", mathLevel: "School maths → ML reasoning",
      body: [
        "Suppose you want to predict a delivery bill. Distance matters, and parcel mass matters, but a kilometre and a kilogram do not contribute in the same way. You need a calculation that keeps each measurement attached to its own rate, then combines the contributions. That calculation is a dot product.",
        "We will follow that bill from ordinary arithmetic into a tiny ML model. Along the way, we will see why the same operation also describes the angle between arrows—and why a large dot product can mislead you when comparing embeddings.",
        "You need multiplication, addition with negative numbers, and the vector idea of matching coordinates. For the geometry section, recall that a right triangle with legs 3 and 4 has diagonal length 5. No calculus is needed.",
        "First build confidence with the worked examples. Then cover the solutions and solve the practice questions on paper. The optional ML reasoning section asks you to explain assumptions; it does not require a long proof. The final 10-mark mini-exam is a practice set for this topic, not a claim about any particular university syllabus.",
      ],
    },
    "everyday-story": {
      title: "A delivery bill you can explain",
      everyday: {
        title: "Four kilometres, two kilograms",
        setup: ["A courier charges 3 coins for each kilometre travelled and 2 coins for each kilogram carried. Our delivery travels 4 km and carries a 2 kg parcel. Set aside any fixed booking fee for a moment: we want just the variable charge.",
          "The tempting shortcut is to add 4 and 2, then multiply by something. But those quantities have different units and different rates. We have to pair distance with the distance rate, and mass with the mass rate."],
        quantities: [
          { label: "Distance", value: "4 km", meaning: "Multiply by 3 coins per km." },
          { label: "Parcel mass", value: "2 kg", meaning: "Multiply by 2 coins per kg." },
        ],
        walkthrough: [
          { action: "Distance contribution: 4 km × 3 coins/km = 12 coins.", reason: "The kilometres cancel, so the contribution is a money amount we can add to another money amount." },
          { action: "Mass contribution: 2 kg × 2 coins/kg = 4 coins.", reason: "Pairing mass with its own rate converts this different kind of measurement into the same output unit: coins." },
          { action: "Combine the contributions: 12 + 4 = 16 coins.", reason: "Both products are now charges. Their sum answers the question about the total variable bill." },
        ],
        takeaway: "We did two different jobs: multiply to find each feature's contribution, then add to find the total. The dot product is the name for this multiply-matching-pairs-and-add operation. Keeping the feature order consistent is what makes the pairing work.",
      }, activity: "delivery-prediction", check: checks[0],
    },
    "plain-idea": {
      title: "The rule—and what its output means",
      body: [
        `Write the delivery features as ${math("\\mathbf x=[4,2]")} in the order [distance, mass], and the rates as ${math("\\mathbf w=[3,2]")} in the same order. Their dot product is ${math("\\mathbf x\\cdot\\mathbf w=4\\times3+2\\times2=16")}. Bold letters represent whole vectors. The dot names an operation; it is not a decimal point.`,
        "The intermediate products are [12, 4]. That list records the individual contributions. Adding them produces 16, one number called a scalar. This distinction matters in Python too: multiplying arrays element by element gives the list of contributions; a dot product sums them.",
        "You can have two coordinates or two thousand; the procedure stays the same. Both vectors must have the same number of coordinates. In a feature model, the positions must also carry matching meanings. [mass, distance] fed into weights ordered [distance rate, mass rate] calculates the wrong bill even though the lengths match.",
      ],
      vocabulary: [{ id: "dot-product", name: "dot product", definition: "Multiply matching coordinates of two equal-length vectors, then sum the products to obtain one scalar.", analogy: "A bill that adds quantity × rate for each item", example: "[4, 2] · [3, 2] = 12 + 4 = 16.", nonExample: "[12, 4] contains the paired products but has not yet summed them." }],
      reading: [{ title: "A second interpretation: how much do arrows line up?", paragraphs: [
        "So far we treated one vector as measurements and the other as rates. When both vectors describe directions in a common Euclidean coordinate system, the very same arithmetic has a geometric interpretation. You do not need a separate definition of dot product.",
        "Recall that cosine of an angle in a right triangle is adjacent side divided by hypotenuse. If b points horizontally, the part of a along b is length(a) × cos θ. The dot product multiplies that horizontal part by length(b); b's vertical coordinate is zero, so the vertical part contributes nothing. This gives length(a) × length(b) × cos θ. Rotating both arrows together preserves their dot product, lengths, and angle, so the interpretation also works when neither arrow is horizontal.",
        `Its geometric form is ${math("\\mathbf a\\cdot\\mathbf b=\\lVert\\mathbf a\\rVert_2\\lVert\\mathbf b\\rVert_2\\cos\\theta")}. The two lengths set the scale; the angle θ tells us about alignment. For nonzero vectors, angles less than 90° give a positive result, exactly 90° gives zero, and greater than 90° gives a negative result.`,
        "For [3, 0] and [2, 0], the arithmetic gives 6: they point the same way. For [3, 0] and [0, 2], it gives 0: they are perpendicular. For [3, 0] and [−2, 0], it gives −6: they point opposite ways. Those three simple cases make the sign rule tangible.",
        "A zero vector has dot product zero with every vector, but it has no defined direction or angle. That is why the phrase ‘zero dot product means perpendicular’ needs the nonzero condition. Also, the positive delivery bill is a weighted charge; it does not by itself establish meaningful geometric similarity between kilograms and per-kilometre rates.",
      ], visual: "dot-product" }], check: checks[1],
    },
    "worked-example": {
      title: "When contributions support and oppose",
      body: ["Positive-only bills hide an important feature of dot products: contributions can cancel. Before calculating the next example, predict whether its total will be positive, negative, or zero."],
      example: {
        title: "Keep the negative contribution",
        prompt: `Calculate ${math("[2,3]\\cdot[4,-1]")}.`,
        steps: ["Pair the first coordinates: 2 × 4 = 8. This contribution supports the total.", "Pair the second coordinates: 3 × (−1) = −3. This contribution reduces the total; do not discard the minus sign.", "Add: 8 + (−3) = 5. The positive contribution wins, but the opposing contribution still matters."],
        answer: "5", realWorldMeaning: "The dot product is positive. For these nonzero vectors in ordinary Euclidean geometry, their angle is less than 90°. In a weighted model, the second feature subtracts 3 units from the score.",
      },
      reading: [{ title: "Why cosine similarity divides by the lengths", paragraphs: [
        `Take a query ${math("\\mathbf q=[1,0]")} and two candidates ${math("\\mathbf a=[2,0]")} and ${math("\\mathbf c=[10,10]")}. The query points along the horizontal axis. Candidate a points exactly the same way; c points diagonally, 45° away. Which should be the better directional match?`,
        "Raw dot products are q · a = 2 and q · c = 10. That ranks c first. Its larger horizontal coordinate produces a bigger product even though its direction is less aligned. A dot product measures magnitude as well as direction.",
        `Solve the geometric formula for its angle factor: ${math("\\cos\\theta=(\\mathbf a\\cdot\\mathbf b)/(\\lVert\\mathbf a\\rVert_2\\lVert\\mathbf b\\rVert_2)")}. This is cosine similarity. Division removes the two vector lengths from the score.`,
        `Here ${math("\\lVert\\mathbf q\\rVert=1")}, ${math("\\lVert\\mathbf a\\rVert=2")}, and ${math("\\lVert\\mathbf c\\rVert=\\sqrt{10^2+10^2}=10\\sqrt2")}. So q with a gives 2/(1 × 2) = 1. The q-with-c score is ${math("10/(1\\times10\\sqrt2)=1/\\sqrt2\\approx0.707")}. Cosine now ranks a first, matching the directional picture.`,
        "For nonzero vectors, cosine lies between −1 and 1: 1 means same direction, 0 means perpendicular, and −1 means opposite direction. A score of 0.707 is not a 70.7% probability of relevance. It is an angle-based score. Whether it reflects useful meaning depends on the representation and the task.",
      ] }], check: checks[2],
    },
    "your-turn": {
      title: "Your turn: calculate, interpret, compare",
      body: ["Work these three questions on paper before opening the solutions. If you get stuck, use the hint to choose your next step, then try again. The marks show what a complete answer contains; you assess your work against the marking guide."],
      exercises: dotProductPractice, check: checks[3],
    },
    "math-to-ml": {
      title: "From a price rule to an ML model",
      body: [
        "The courier's rates were given to us. In machine learning, a model can estimate those coefficients from recorded deliveries and bills. A feature is an input measurement; a weight is a coefficient controlling its contribution. The dot-product calculation is the same whether the coefficients were chosen by a person or learned from data.",
        "Prediction is the calculation using current weights. Training is the process of adjusting weights using examples and a loss that measures prediction error. Taking a dot product alone does not train a model.",
      ],
      notation: { expression: "prediction = sum of matching feature–weight products + baseline", latex: String.raw`\hat y=\mathbf x^{\mathsf T}\mathbf w+b=\sum_{i=1}^{d}x_iw_i+b`,
        readAs: "The predicted output equals the sum of each feature times its matching weight, plus one baseline.",
        symbols: [[String.raw`\hat y`, "Predicted bill, in coins; the hat distinguishes a prediction from an observed value."], [String.raw`\mathbf x`, "Feature vector: [distance in km, mass in kg]."], [String.raw`\mathbf w`, "Matching weights: [coins per km, coins per kg]."], ["b", "Bias: a baseline charge added once, in coins."], [String.raw`\mathsf T`, "Transpose: if x and w are column vectors, xᵀ is a row; xᵀw is a scalar."], [String.raw`\sum_{i=1}^{d}x_iw_i`, "Multiply and add matching coordinates, from position 1 to position d. Here d = 2."]],
      },
      mlBridge: {
        task: "Predict the bill for the same 4 km, 2 kg delivery, now using a toy learned model with weights [3, 2] and a baseline of 5 coins. These numbers are supplied for this example; we have not fitted them to a real dataset.",
        terms: [{ id: "feature", name: "feature", definition: "One input measurement used for prediction, such as distance or mass.", lessonId: "scalars-vectors-tensors", state: "review" },
          { id: "weight", name: "weight and bias", definition: "A weight multiplies a feature. The bias adds a baseline independent of those feature values.", lessonId: "linear-regression-ml", state: "preview" }],
        mapping: [{ math: "x = [4, 2]", ml: "One delivery: distance first, mass second." }, { math: "w = [3, 2]", ml: "3 coins per km and 2 coins per kg in that matching order." }, { math: "b = 5", ml: "A fixed baseline of 5 coins." }],
        walkthrough: [{ action: "Calculate the two contributions: 4 × 3 = 12 and 2 × 2 = 4 coins.", reason: "Each learned coefficient says how strongly its matching feature affects this model's prediction." },
          { action: "Sum the contributions and add the bias: 12 + 4 + 5 = 21 coins.", reason: "The bias shifts the whole prediction; it is not multiplied by distance or mass." },
          { action: "Increase only distance by 1 km: 5 × 3 + 2 × 2 + 5 = 24 coins.", reason: "Holding mass fixed, one more kilometre adds exactly the distance weight, 3 coins. That is how you interpret a linear-model coefficient." }],
        takeaway: "The weights specify a model relationship, not proof of cause and effect. This model assumes additive contributions and a constant effect per unit of each feature, holding other features fixed. A real delivery price may instead use thresholds or interactions.",
      }, check: checks[4],
      reading: [{ title: "Optional ML reasoning: three assumptions worth checking", optional: true, paragraphs: [
        "First, units matter. Changing distance from kilometres to metres multiplies its feature value by 1,000. To keep the prediction unchanged, divide its coefficient by 1,000: 3 coins/km becomes 0.003 coins/metre. The formula has not learned anything new; you have changed its representation.",
        "Second, cosine normalization is different from feature scaling. Dividing a whole vector by its length removes that vector's overall magnitude. It does not undo changing only one feature's units. If a coordinate overwhelms the others, consider the feature representation before deciding which similarity measure to use.",
        `Third, unit normalization connects two common retrieval scores. For nonzero vectors define ${math("\\mathbf u=\\mathbf a/\\lVert\\mathbf a\\rVert")} and ${math("\\mathbf v=\\mathbf b/\\lVert\\mathbf b\\rVert")}. Then ${math("\\mathbf u\\cdot\\mathbf v=\\cos\\theta")}. Raw dot product on these unit vectors equals cosine on the original vectors.`,
        `There is also a useful distance connection: ${math("\\lVert\\mathbf u-\\mathbf v\\rVert_2^2=\\mathbf u\\cdot\\mathbf u+\\mathbf v\\cdot\\mathbf v-2\\mathbf u\\cdot\\mathbf v=2-2\\cos\\theta")}. The two self-dot-products are 1 because the vectors are unit length. Among nonzero, unit-normalized candidates, maximizing cosine and minimizing Euclidean distance produce the same ranking. Without normalization, that equivalence generally fails.`,
        "This is the kind of depth that helps in an ML exam: state the condition, explain why the result holds, and say when you can use it. Orthogonality also does not, by itself, establish statistical independence; that would require a probabilistic model and additional assumptions.",
      ] }],
    },
    recap: {
      title: "A short exam—and what to review afterwards",
      body: ["Close the earlier examples and allow about 12–15 minutes for this 10-mark practice set. Write your working and explanations. Then reveal each answer and award marks using the guide. These written answers are self-assessed; the app does not grade your prose.",
        "You are ready to move on when you can calculate a dot product with negative coordinates, identify its scalar output, interpret its sign with the nonzero condition, explain why cosine removes magnitude, and connect a weight to a model's prediction. If a calculation is right but its meaning is unclear, revisit the corresponding story or worked example."],
      exercises: dotProductExam,
      misconception: { wrong: "A larger dot product always means a better directional match.", correction: "A raw dot product depends on both lengths and angle. Cosine removes overall length for nonzero vectors. Decide which information your task should keep before choosing a score." },
      recapQuestions: [checks[2], checks[3], checks[4]],
      reading: [{ title: "Where this takes you next", paragraphs: ["A matrix–vector product performs one dot product per output row. A neural-network neuron uses a weighted sum plus a bias before applying an activation. Attention compares transformed vectors using dot-product scores. You already have the calculation needed for all three; their later lessons will explain the additional steps.",
        "Tomorrow, try reproducing the delivery calculation and the cosine-ranking reversal from memory. Being able to explain why the answers differ is stronger evidence of understanding than recognizing a familiar formula."] }],
    },
  };
  return steps.map((step) => ({ ...step, ...additions[step.id] }));
}
