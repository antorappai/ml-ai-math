import { mcq } from "./schema.js";

const math = (latex) => `\\(${latex}\\)`;
const question = (id, prompt, options, answerIndex, optionExplanations) => ({
  ...mcq(`matrix-vector-trial-${id}`, prompt, options, answerIndex, optionExplanations[answerIndex], "matrix-vector-multiplication"),
  optionExplanations,
});

export const matrixVectorChecks = [
  question("student-outputs", "X contains 3 student rows and 2 feature columns. Multiplying it by a column of 2 feature weights gives how many weighted scores?", ["2", "3", "6", "1"], 1, [
    "Two is the number of feature contributions within each row. Each of the three rows adds its contributions into a separate score.",
    "Correct: one dot product per student row gives three scores, one for each student. Two features are combined within each score.",
    "Six counts the input entries. Matrix–vector multiplication sums the two paired contributions in each row, producing three outputs.",
    "One would combine all students into a single scalar. Here each student row produces its own dot product and remains a separate output.",
  ]),
  question("shape", "A has shape 4 × 3 and v is a 3 × 1 column vector. What is the shape of Av?", ["3 × 1", "4 × 1", "4 × 3", "1 × 4"], 1, [
    "3 × 1 is the input shape. A has four rows, and each row produces one output, so the output has four entries.",
    "Correct: each of the four rows matches the three input coordinates and sums to one number. Four such results form a 4 × 1 column.",
    "4 × 3 is A's shape. Multiplication combines the three feature contributions in every row; it does not retain all twelve entries as the output.",
    "1 × 4 is a row vector. With v supplied as a column, Av is a column with one entry per row of A: 4 × 1.",
  ]),
  question("calculation", "For A = [[2, 1], [−1, 3]] and v = [3, 4] interpreted as a column, what is Av?", ["[6, 12]", "[10, 9]", "[2, 15]", "19"], 1, [
    "[6, 12] uses only the diagonal terms 2 × 3 and 3 × 4. Include every coordinate in each row: row 1 also has 1 × 4, and row 2 has (−1) × 3.",
    "Correct: row 1 gives 2 × 3 + 1 × 4 = 10; row 2 gives (−1) × 3 + 3 × 4 = 9. Keep these as two separate outputs.",
    "[2, 15] dots the columns of A with v. For Av, dot each row of A with the input column. The columns offer a different, weighted-combination view rather than column-wise dot products.",
    "19 adds the two output values, 10 + 9. Matrix–vector multiplication collects the row results into a vector; it does not sum different outputs together.",
  ]),
  question("mismatch", "A has shape 3 × 2 and v is a 3 × 1 column vector. Can you calculate Av as written?", ["Yes: both have 3 rows", "Yes: the output is 3 × 1", "No: each row of A has 2 entries but v has 3", "Yes: discard the last entry of v"], 2, [
    "Matching row counts is not the condition. A row of A must pair every one of its two coefficients with one input coordinate; v supplies three coordinates.",
    "Predicting a possible-looking output shape does not make the row dot products valid. Check the inner dimensions before the output dimensions.",
    "Correct: the inner dimensions, 2 and 3, do not match. A's two-entry rows cannot form dot products with this three-entry column.",
    "Discarding an input changes the problem and may remove a real feature. Resolve which matrix or vector is intended before calculating.",
  ]),
  question("bias", "For the marks matrix X and weights [0.3, 0.2], Xw = [34, 39, 30]. A model adds a shared bias of 8 to each student's score. What are the predictions?", ["[42, 47, 38]", "[42, 39, 30]", "[34, 39, 30, 8]", "127"], 0, [
    "Correct: add 8 to each output: 34 + 8 = 42, 39 + 8 = 47, and 30 + 8 = 38. Each student receives one baseline in their own prediction.",
    "This adds the baseline only to the first student. A shared model bias is used once in every student's prediction.",
    "Appending the bias as another output invents a fourth prediction. The bias shifts the existing three scores instead of becoming a new student.",
    "127 adds all three final predictions together. We need a separate prediction for each student, preserving the observation order.",
  ]),
];

const exercise = (id, title, prompt, hint, steps, answer, marking, commonTrap) => ({
  id: `matrix-vector-trial-${id}`, title, prompt, hint, steps, answer, marking, commonTrap,
});

export const matrixVectorPractice = [
  exercise("calculate", "1. Keep the row results separate · 4 marks",
    "Calculate Av for A = [[1, −2], [0, 3], [2, 1]] and v = [4, 2], interpreted as a column. State the input and output shapes and interpret a zero in the output.",
    "There are three two-entry rows. Dot each row with [4, 2], keeping its sign, and collect three answers.",
    ["A is 3 × 2 and v is 2 × 1, so the output has shape 3 × 1.", "Row 1: 1 × 4 + (−2) × 2 = 4 − 4 = 0.", "Row 2: 0 × 4 + 3 × 2 = 6. Row 3: 2 × 4 + 1 × 2 = 10.", "The output is [0, 6, 10] as a column. The first zero comes from cancellation of two nonzero contributions."],
    "[0, 6, 10]; output 3 × 1", ["1 mark: compatible input shapes and output shape.", "1 mark: first row calculation.", "1 mark: remaining row calculations and ordered output.", "1 mark: explains cancellation rather than assuming zero inputs."],
    "Do not add 0 + 6 + 10 into one scalar. Those values belong to three different output positions."),
  exercise("dimensions", "2. Explain the shape condition · 3 marks",
    "A is 2 × 3. Decide whether each column can be used in Av: u is 3 × 1, and z is 2 × 1. State the output shape when defined and explain the failure when undefined.",
    "A row has three coefficients. How many input coordinates must be available to pair with them?",
    ["Au is defined: each three-entry row of A pairs with the three entries in u.", "The two row dot products produce a 2 × 1 output.", "Az is undefined: A's three-entry rows cannot pair with z's two entries."],
    "Au: defined, 2 × 1. Az: undefined.", ["1 mark: Au is defined.", "1 mark: output 2 × 1.", "1 mark: explains Az using the unequal inner dimensions."],
    "Do not use the input's row count as the output length. The number of rows in A determines how many output calculations occur."),
  exercise("columns", "3. Check the same answer by columns · 4 marks",
    "For A = [[2, 1], [−1, 3]] and v = [3, 4], calculate 3 × column 1 of A + 4 × column 2 of A. Explain why this gives the same Av as the row method.",
    "Column 1 is [2, −1] and column 2 is [1, 3]. Scale each entire column before adding matching output positions.",
    ["Three times column 1 is 3 × [2, −1] = [6, −3].", "Four times column 2 is 4 × [1, 3] = [4, 12].", "Add matching positions: [6, −3] + [4, 12] = [10, 9].", "Each output collects the same two paired products as its row dot product. The column view groups those products by input contribution instead."],
    "[10, 9]; both methods use the same paired products", ["1 mark: correct columns.", "1 mark: correct scaled columns.", "1 mark: correct output.", "1 mark: connects the grouping to row dot products."],
    "The column method scales and adds columns. Taking a dot product of each column with v is a different calculation."),
];

export const matrixVectorExam = [
  exercise("exam-linear", "A. Calculate and explain an update · 5 marks",
    "Let A = [[1, 2, −1], [0, −1, 3]] and v = [2, 1, 4] as a column. State the shapes and calculate Av. Then increase only v₃ from 4 to 5. Find the new output without recomputing every product, and explain your method.",
    "The original output uses two row dot products. Changing one input by 1 adds one copy of its matching matrix column to the output.",
    ["A has shape 2 × 3, v has shape 3 × 1, and Av has shape 2 × 1.", "First output: 1 × 2 + 2 × 1 + (−1) × 4 = 0.", "Second output: 0 × 2 + (−1) × 1 + 3 × 4 = 11, so Av = [0, 11].", "The changed input adds [0, 0, 1]. Its effect is column 3 of A, [−1, 3].", "The new output is [0, 11] + [−1, 3] = [−1, 14]. A fixed matrix responds linearly to the input change."],
    "Original [0, 11]; changed [−1, 14]", ["1 mark: compatible shapes and output shape.", "1 mark: first row calculation.", "1 mark: second row and ordered output.", "1 mark: identifies the third-column change.", "1 mark: new output with its explanation."],
    "Adding 1 to an input does not add 1 to every output. The matching column specifies how that input affects each output."),
  exercise("exam-batch", "B. Track features, observations, and bias · 5 marks",
    "X has rows [60, 80], [70, 90], [50, 75] for Maya, Nimal, Asha, in the order [Maths, Computing]. Use w = [0.3, 0.2] and shared bias 8. State the shapes of X, w, and the predictions, calculate Nimal's prediction, and explain what changes if the columns are swapped while w is left unchanged.",
    "A weight must stay attached to its feature. The bias is added once per output, after its row dot product.",
    ["X is 3 × 2, w is 2 × 1, and the prediction column is 3 × 1.", "Nimal's weighted score is 70 × 0.3 + 90 × 0.2 = 39; adding 8 gives 47.", "After the columns are swapped, Nimal's row is [90, 70]. With unchanged weights, the prediction becomes 90 × 0.3 + 70 × 0.2 + 8 = 49.", "The shape is still valid, but Computing has received the Maths coefficient and Maths the Computing coefficient.", "To preserve the original model after swapping columns, also swap weights to [0.2, 0.3]. This restores Nimal's prediction to 47."],
    "Shapes 3 × 2, 2 × 1, 3 × 1; Nimal 47; unchanged weights after swapping give 49", ["1 mark: all three shapes.", "1 mark: Nimal's original prediction.", "1 mark: changed prediction 49.", "1 mark: explains the swapped feature meanings.", "1 mark: compensating weight order [0.2, 0.3]."],
    "Dimension compatibility establishes that the calculation can run; it does not establish that it represents the intended features."),
];

export function buildMatrixVectorTrial(steps) {
  const checks = matrixVectorChecks;
  const additions = {
    start: {
      title: "How can one calculation produce several outputs?",
      goal: "Calculate a matrix–vector product, explain its dimensions and contributions, and connect it to batches of ML predictions and feature transformations.",
      estimatedTime: "50–65 minutes with practice", mathLevel: "School maths → ML reasoning",
      body: ["In the dot-product lesson, several input contributions became one number. In the matrix lesson, we kept several observations in different rows. Now put those ideas together: apply the same weight vector to every row, and keep the resulting numbers together as an output vector.",
        "The notation Av looks compact, but it stands for a collection of ordinary multiply-and-add calculations. Each row of A gets its own dot product with v. Nothing new happens to multiplication itself; the new idea is how we organise and interpret the several results.",
        "We will begin with the same three students from the previous lesson, then work through a small integer example with a negative coefficient. You will see the calculation both by rows and by columns, try predicting an output, and explain a change in one input.",
        "You need matrix shapes, consistent feature order, and dot products. The main lesson is enough for the calculation questions; optional depth explains linear changes and the distinction between dataset and transformation roles. Written practice and the 10-mark mini-exam include hints and marking guides."],
    },
    "everyday-story": {
      title: "One rule applied to all three students",
      everyday: {
        title: "Keep each student's prediction separate",
        setup: ["Recall Maya's [60, 80], Nimal's [70, 90], and Asha's [50, 75] marks, ordered [Maths, Computing]. Put those rows into X. The illustrative prediction rule from the previous lesson uses weights [0.3, 0.2] and later adds a baseline of 8.",
          "First calculate just the weighted scores, before the baseline. You could perform three separate dot products. Writing Xw tells us to do those three calculations in row order and collect their answers in a single output vector. The supplied weights illustrate the method; we have not trained or validated them."],
        quantities: [{ label: "X: student features", value: "3 × 2", meaning: "Three rows of students, with Maths and Computing in two columns." }, { label: "w: matching weights", value: "[0.3, 0.2]", meaning: "The same two weights are used for every student's row." }],
        walkthrough: [{ action: "Maya's row: 60 × 0.3 + 80 × 0.2 = 18 + 16 = 34.", reason: "A row holds one student's features. Its dot product combines just that student's contributions." }, { action: "Nimal's row gives 70 × 0.3 + 90 × 0.2 = 39; Asha's gives 50 × 0.3 + 75 × 0.2 = 30.", reason: "Repeat the same pairing rule for each observation; do not mix contributions from different rows." }, { action: "Collect Xw = [34, 39, 30] in student order.", reason: "There are three rows, so there are three outputs. Each score stays paired with the student whose row produced it." }],
        takeaway: "Matrix–vector multiplication performs one dot product per row. It produces an output vector, rather than adding every row's result into one class total. The baseline comes afterwards: it is part of the model, but not part of Xw itself.",
      }, check: checks[0],
    },
    "plain-idea": {
      title: "Why the dimensions have to match",
      body: [
        `Let A have shape ${math("m\\times d")} and v be a column with shape ${math("d\\times1")}. A has m rows; each row contains d coefficients. To take a row dot product, v must supply exactly d matching coordinates. This is why the column count of A must match the length of v.`,
        `One row dot product gives one scalar. With m rows, we collect m scalars into an ${math("m\\times1")} output column. Thus ${math("(m\\times d)(d\\times1)\\longrightarrow(m\\times1)")}. The matching d sizes explain the pairing; the m size explains the number of outputs.`,
        "For a 3 × 2 matrix and a two-entry column, the result has three entries. A three-entry column would be incompatible: each row has two coefficients, so there is no matching third coefficient. Padding, dropping, or rearranging features without a reason changes the problem.",
        "We will sometimes display a vector compactly as [3, 4]. In the mathematical product Av, interpret that list as the column [3; 4], with shape 2 × 1. Orientation matters. In software, a flat array can have shape (2,) with special rules; we will explain that when we reach the Python companion.",
      ],
      vocabulary: [{ id: "matrix-vector-multiplication", name: "matrix–vector product", definition: "The output column formed by taking the dot product of each matrix row with a compatible input column.", analogy: "Several separate weighted questions asked about the same input", example: "A 3 × 2 matrix times a 2 × 1 column gives one result for each of its three rows.", nonExample: "Keeping separate entry-by-entry products without summing each row does not finish a matrix–vector product." }],
      reading: [{ title: "Try a geometric version of the same row rule", paragraphs: ["The graph below uses a 2 × 2 matrix to transform one vector with coordinates x and y. In this setting, the two matrix rows describe the two output coordinates. They do not describe two students. The multiply-and-add procedure is the same; the meaning of the axes comes from the problem.",
        "Choose Stretch x: the matrix rows are [2, 0] and [0, 1], so the outputs are [2x, y]. Swap x and y uses rows [0, 1] and [1, 0], giving [y, x]. Add y into x uses rows [1, 1] and [0, 1], giving [x + y, y]. Predict the output before moving a control, then check the arrow."] }], check: checks[1],
    },
    "worked-example": {
      title: "Follow every contribution into its output",
      body: ["Use small integers to expose the method. The negative coefficient matters just as it did in the dot-product lesson. Before reading the steps, predict whether the second output is larger or smaller than 12."],
      example: { title: "Two row dot products, two answers", prompt: "Calculate Av for A = [[2, 1], [−1, 3]] and v = [3, 4], interpreted as a column.",
        steps: ["Check shapes: A is 2 × 2 and v is 2 × 1. Each matrix row has a matching input for both entries, so the product is defined and returns a 2 × 1 column.", "Row 1 asks the first output question: 2 × 3 + 1 × 4 = 6 + 4 = 10.", "Row 2 asks a different output question: (−1) × 3 + 3 × 4 = −3 + 12 = 9. The first feature reduces this output.", "Collect [10, 9] in row order. Do not add 10 and 9: they are separate output coordinates."],
        answer: "Av = [10, 9] as a 2 × 1 column", realWorldMeaning: "Both outputs used the same input [3, 4], but different row coefficients. The second output is smaller than 12 because its first contribution is −3." },
      activity: "row-dot-prediction",
      reading: [{ title: "The same product seen by columns", paragraphs: [
        "The row method answers: what produces each output? A column view answers: what does each input coordinate contribute across all outputs? These are two ways of grouping the same products. The superscript T below means transpose: write the displayed row list as a column.",
        `In this example, A's columns are ${math("\\mathbf c_1=[2,-1]^{\\mathsf T}")} and ${math("\\mathbf c_2=[1,3]^{\\mathsf T}")}. Input v supplies multipliers 3 and 4, so ${math("A\\mathbf v=3\\mathbf c_1+4\\mathbf c_2=[6,-3]^{\\mathsf T}+[4,12]^{\\mathsf T}=[10,9]^{\\mathsf T}")}.`,
        "The first input contributes +6 to output 1 and −3 to output 2. The second contributes +4 and +12. Adding those contributions at each output position reproduces the two row dot products. This is a weighted sum of columns, not a dot product taken separately with each column.",
        "You can use the two views to check one another. They also predict changes: increasing only v₁ by 1 adds column 1, [2, −1], to the output. Increasing only v₂ by 1 adds column 2, [1, 3]. A matrix column records how one input affects all outputs.",
      ] }], check: checks[2],
    },
    "your-turn": { title: "Your turn: calculate and explain the shape", body: ["Try the three questions without copying the worked example. Show the products for each row, keep negative signs, and describe why your output has its stated shape. Use the column question to test whether you can explain the same calculation in a different way."], exercises: matrixVectorPractice, check: checks[3] },
    "math-to-ml": {
      title: "From three dot products to a batch of predictions",
      body: ["A batch is a group of observations processed together. With the samples-by-features layout, the whole marks table X can multiply the weight column w to produce one weighted score per student. This is the same repeated calculation we began with, now written in the notation used for linear models.",
        "The model then adds its baseline to every student's weighted score. A shared bias is one parameter, but its value is included once in each observation's prediction. It is not a fourth output or a value added only to the first student."],
      notation: { expression: "each output is the sum of the matching products in one row", latex: String.raw`\mathbf y=A\mathbf v,\qquad y_i=\sum_{j=1}^{d}A_{ij}v_j`, readAs: "Output y equals matrix A times input v. Output i is the sum, over input positions j, of A's row-i coefficient times the matching input coordinate.",
        symbols: [["A", "The matrix of coefficients, with one row per output calculation."], [String.raw`\mathbf v`, "The compatible input column; it has one coordinate per column of A."], [String.raw`\mathbf y`, "The output column; it has one entry per row of A."], ["i", "Which output row we are calculating."], ["j", "Which input position we are pairing within that row."], ["d", "The number of input coordinates, equal to the column count of A."], [String.raw`\sum_{j=1}^{d}A_{ij}v_j`, "Add all d products within row i. This sums inputs within a row, not different output rows together."]] },
      mlBridge: {
        task: "For three students and two features, calculate the weighted score column Xw, then add the illustrative model's shared bias 8 to get three predictions. In this application A is the dataset X and v is the weight column w.",
        terms: [{ id: "feature", name: "feature", definition: "One input quantity, such as Maths marks, stored in a consistent column.", lessonId: "scalars-vectors-tensors", state: "review" }, { id: "weight", name: "weight", definition: "The coefficient controlling the contribution of its matching feature to a prediction.", lessonId: "dot-product-angle", state: "review" }, { id: "batch", name: "batch", definition: "Several observations processed together; here all three student rows.", lessonId: "tensors-perceptrons", state: "preview" }],
        mapping: [{ math: "X: 3 × 2", ml: "Three students, with Maths then Computing in every row." }, { math: "w: 2 × 1, values [0.3, 0.2]", ml: "Two coefficients matched to the feature columns." }, { math: "Xw: 3 × 1, values [34, 39, 30]", ml: "One weighted score for each student, before the baseline." }, { math: "b = 8", ml: "One shared parameter added to each student's weighted score." }],
        walkthrough: [{ action: "Read Xw = [34, 39, 30] as three row-wise dot products.", reason: "Each row is one observation, so the output positions retain the sample order." }, { action: "Add the baseline to each entry: [34 + 8, 39 + 8, 30 + 8] = [42, 47, 38].", reason: "Every observation uses the same complete prediction rule, including one baseline." }, { action: "If the third student's actual later score is 40, its observed-minus-predicted residual is 40 − 38 = 2.", reason: "Comparing a prediction with the corresponding target gives an error to assess. A calculated number alone does not establish accuracy." }],
        takeaway: "A matrix makes repeated predictions convenient without changing the underlying row dot products. Shape, feature order, and target alignment must all be correct. These example coefficients are supplied; training is the separate process that estimates weights from data.",
      }, check: checks[4],
      reading: [{ title: "Optional ML reasoning: what this multiplication guarantees", optional: true, paragraphs: [
        `For a fixed matrix A, an input change ${math("\\Delta\\mathbf v")} produces an output change ${math("A\\Delta\\mathbf v")}, because ${math("A(\\mathbf v+\\Delta\\mathbf v)=A\\mathbf v+A\\Delta\\mathbf v")}. Increasing one coordinate by δ therefore adds δ times its matching column. This makes the column interpretation useful rather than just another formula.`,
        "A pure matrix map sends the zero input to zero and preserves sums and scaling. Adding a nonzero fixed bias changes the zero-input output to that bias. The full map is called affine; ML often still uses the name ‘linear model’. The bias shifts the predictions without changing the effect of an input change when it stays fixed.",
        "The matrix's role determines the output meaning. In Xw, rows of X are observations and outputs are scores for those observations. In a layer-style calculation Wx, rows of W are output-unit coefficients and x describes one observation. Three rows can therefore mean three samples or three output units depending on what the matrix represents.",
        "NumPy distinguishes a flat vector with shape (d,) from an explicit column with shape (d, 1). A @ v returns shape (m,) for the flat case and (m, 1) for the column case. Both can represent the same values, but later array operations may treat their axes differently. Write down the actual shapes instead of assuming that an array displayed as a list is a mathematical column.",
        "In array code, @ requests matrix multiplication. With compatible arrays, * multiplies elements and can use broadcasting to repeat a vector across rows; it does not perform the row sums. For a NumPy matrix A and flat vector v, A * v retains a table of contributions while A @ v adds those contributions within each row. Ordinary Python lists have different operator rules, so the companion shows the arithmetic with an explicit loop first.",
      ] }],
    },
    recap: { title: "A short exam: show the reason behind the result", body: ["Allow about 12–15 minutes for this 10-mark topic practice set. Work out the shapes before the arithmetic, and explain what the output positions represent. Your written responses are self-assessed using the worked answers and marking guides.",
      "You are ready for the next lesson when you can calculate each row dot product, explain why the inner dimensions match, keep the outputs separate, and use a column to predict the effect of changing one input. For ML examples, also explain which axis counts observations and where the bias is added."],
      exercises: matrixVectorExam, recapQuestions: [checks[1], checks[2], checks[4]],
      misconception: { wrong: "Av multiplies a vector element by just the matching diagonal matrix entry.", correction: "Every output uses all the entries in its matrix row, paired with all the input coordinates. Diagonal-only multiplication works for diagonal matrices because all the other row coefficients are zero." },
      reading: [{ title: "Next: several input columns", paragraphs: ["Matrix–Matrix Multiplication will let the right-hand input contain several columns. Each column is another matrix–vector problem, and their outputs are placed side by side. The row-dot-column rule you have learned here is the foundation for that next operation."] }],
    },
  };
  return steps.map((step) => ({ ...step, ...additions[step.id] }));
}
