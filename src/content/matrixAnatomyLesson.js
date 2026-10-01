import { mcq } from "./schema.js";

const math = (latex) => `\\(${latex}\\)`;
export const studentMarks = {
  students: ["Maya", "Nimal", "Asha"],
  subjects: ["Maths", "Computing"],
  values: [[60, 80], [70, 90], [50, 75]],
};
const question = (id, prompt, options, answerIndex, optionExplanations) => ({
  ...mcq(`matrix-anatomy-trial-${id}`, prompt, options, answerIndex, optionExplanations[answerIndex], "matrix-anatomy-types"),
  optionExplanations,
});

export const matrixAnatomyChecks = [
  question("shape", "A table records 3 students, one per row, and 2 subjects, one per column. What is its matrix shape?", ["2 × 3", "3 × 2", "6 × 1", "3 + 2"], 1, [
    "2 × 3 swaps the axes. Shape lists rows first: there are 3 student rows and 2 subject columns.",
    "Correct: 3 rows followed by 2 columns gives 3 × 2. The six marks keep their student–subject arrangement.",
    "6 × 1 describes a single column. Six is the total number of entries here, but our table arranges them into 3 rows and 2 columns.",
    "3 + 2 adds the axis sizes. A matrix shape records both sizes in order; it is not their sum.",
  ]),
  question("entry", "For X = [[60, 80], [70, 90], [50, 75]], what is X₂₁ using mathematical indexing from 1?", ["80", "90", "70", "50"], 2, [
    "80 is row 1, column 2: X₁₂. You swapped the row and column indices.",
    "90 is row 2, column 2: X₂₂. X₂₁ asks for the first column of that second row.",
    "Correct: the first index selects row 2, [70, 90], and the second selects column 1. The entry is 70.",
    "50 is row 3, column 1. Mathematical row 2 is Python row index 1; starting your mathematical count at zero moves you to the wrong row.",
  ]),
  question("identity", "Which matrix is the 2 × 2 identity?", ["[[1, 1], [1, 1]]", "[[1, 0], [0, 1]]", "[[2, 0], [0, 2]]", "[[0, 0], [0, 0]]"], 1, [
    "Ones everywhere mix coordinates when used in multiplication. An identity has ones on the main diagonal and zeros elsewhere.",
    "Correct: each diagonal 1 keeps its matching coordinate, and the off-diagonal zeros contribute nothing from the other coordinate.",
    "This is a diagonal matrix that doubles both coordinates. It changes a vector instead of preserving it.",
    "This is the zero matrix. Used as a transformation, it sends every compatible vector to zero instead of preserving it.",
  ]),
  question("rectangular", "Does [[60, 80], [70], [50, 75]] form an ordinary numeric matrix as written?", ["Yes: it contains 5 numbers", "Yes: it has 3 rows", "No: the rows have different lengths", "No: matrices must be square"], 2, [
    "Counting numbers does not establish a rectangular layout. Row 2 has one entry while the other rows have two.",
    "Having three rows is only part of the requirement. Every row must contain the same number of columns.",
    "Correct: an ordinary matrix has a fixed number of columns in every row. The missing second entry needs an explicit treatment before this is a rectangular numeric matrix.",
    "Matrices may be rectangular, such as 3 × 2. This example fails because the row lengths differ, not because the number of rows differs from the number of columns.",
  ]),
  question("ml-shape", "In a samples-by-features convention, X has shape 100 × 4. What does this tell you?", ["100 features for each of 4 samples", "400 samples", "100 samples with 4 features each", "The model has 100 layers"], 2, [
    "This reverses the stated convention. Rows count samples and columns count features, so it is 100 samples and 4 features.",
    "400 is the number of entries, 100 × 4. There are 100 observations; each contributes four feature values.",
    "Correct: the 100 rows represent observations and the 4 columns represent consistently ordered input features.",
    "Dataset shape describes its observation and feature axes. It does not tell you how many layers a model has.",
  ]),
];

const exercise = (id, title, prompt, hint, steps, answer, marking, commonTrap) => ({
  id: `matrix-anatomy-trial-${id}`, title, prompt, hint, steps, answer, marking, commonTrap,
});

export const matrixAnatomyPractice = [
  exercise("read", "1. Read a matrix precisely · 4 marks",
    "For X = [[60, 80], [70, 90], [50, 75]], state its shape, number of entries, second row, and X₃₂. Indices start at 1.",
    "Count rows before columns. Then select the requested row and column separately.",
    ["Three rows and two entries per row give shape 3 × 2.", "There are 3 × 2 = 6 scalar entries.", "The second row is [70, 90].", "X₃₂ is the second entry of the third row: 75."],
    "3 × 2; 6 entries; [70, 90]; 75", ["1 mark: shape 3 × 2.", "1 mark: six entries.", "1 mark: second row [70, 90].", "1 mark: X₃₂ = 75."],
    "Shape and entry count answer different questions. A 2 × 3 matrix also has six entries but a different arrangement."),
  exercise("types", "2. Classify without overclaiming · 4 marks",
    "Classify A = [[2, 0], [0, 0]] and B = [[0, 0, 0], [0, 0, 0]] as square, diagonal, identity, or zero matrices. More than one label may apply. State their shapes.",
    "Square means equal row and column counts. Diagonal requires zeros off the main diagonal; diagonal entries may themselves be zero.",
    ["A has shape 2 × 2: it is square and diagonal.", "A is neither identity (its diagonal is not all ones) nor zero (its first entry is 2).", "B has shape 2 × 3 and every entry is zero: it is a rectangular zero matrix.", "Under this lesson's square-diagonal convention, B is neither square, diagonal, nor identity."],
    "A: 2 × 2, square and diagonal. B: 2 × 3, zero.", ["1 mark: A's shape.", "1 mark: A's correct labels and exclusions.", "1 mark: B's shape.", "1 mark: B's zero classification and rectangular interpretation."],
    "A diagonal matrix can contain zeros on the diagonal. A zero matrix can be rectangular."),
  exercise("axes", "3. Keep the dataset meaning · 4 marks",
    "The marks matrix has Maths first and Computing second. A new student's row arrives as [85, 65] in the order [Computing, Maths]. What row should you append, what is the new shape, and why does appending it unchanged cause a problem?",
    "Match feature names before matching positions. One new student changes the number of rows.",
    ["Reorder the new student's values into the dataset's order: [Maths, Computing] = [65, 85].", "Appending one row changes shape from 3 × 2 to 4 × 2.", "The unchanged [85, 65] would label 85 as Maths and 65 as Computing, misassigning the feature meanings.", "Matching dimensions alone does not catch this error: both possible rows have two entries."],
    "Append [65, 85]; new shape 4 × 2", ["1 mark: correctly reordered row.", "1 mark: new shape 4 × 2.", "1 mark: describes the incorrect meanings if unchanged.", "1 mark: explains why a shape check alone misses the mistake."],
    "Do not sort feature values numerically. Reorder them by the agreed column names."),
];

export const matrixAnatomyExam = [
  exercise("exam-structure", "A. Describe a dataset · 5 marks",
    "A hospital records 120 visits, with age, temperature, and pulse as input features. Each row represents a visit. State the input matrix shape and entry count. What does X₁₇,₂ mean? What is the shape after adding one visit? Explain why diagnosis labels should be kept separately from these inputs when diagnosis is the target.",
    "Use the given axis convention. The second feature is temperature; the target is what the model is supposed to predict.",
    ["Input shape is 120 × 3: 120 visits, three features per visit.", "There are 120 × 3 = 360 feature entries.", "X₁₇,₂ is the temperature recorded for visit 17.", "Adding one visit gives shape 121 × 3.", "The diagnosis is the prediction target. Supplying the true diagnosis among the inputs would reveal the answer the model is meant to learn to predict."],
    "120 × 3; 360; visit 17's temperature; 121 × 3; keep the target separate", ["1 mark: original shape.", "1 mark: entry count.", "1 mark: entry interpretation.", "1 mark: new shape.", "1 mark: explains target leakage in this setup."],
    "A row represents one visit here, which need not be one unique patient. Name the observation unit before describing the sample count."),
  exercise("exam-prediction", "B. Use a row without losing its meaning · 5 marks",
    "For the three-student marks matrix X, an illustrative model predicts a future assessment score as 0.3 × Maths + 0.2 × Computing + 8. Predict Nimal's score, then all three scores in row order. State the number of feature weights and output predictions. Does receiving a numeric prediction show that the model is accurate?",
    "Nimal is row 2, [70, 90]. Reuse the dot product for each row, adding the baseline once per student.",
    ["Nimal: 0.3 × 70 + 0.2 × 90 + 8 = 21 + 18 + 8 = 47.", "Maya: 0.3 × 60 + 0.2 × 80 + 8 = 42; Asha: 0.3 × 50 + 0.2 × 75 + 8 = 38.", "In row order [Maya, Nimal, Asha], predictions are [42, 47, 38].", "There are two feature weights and three output predictions, plus one shared scalar baseline.", "Computing predictions establishes that the calculation works. Accuracy needs comparison with actual future scores on appropriate held-out data."],
    "Nimal: 47; predictions [42, 47, 38]; 2 feature weights and 3 outputs", ["1 mark: Nimal's prediction with working.", "1 mark: all three predictions in correct row order.", "1 mark: two weights.", "1 mark: three predictions.", "1 mark: explains how accuracy would be assessed."],
    "The input has six entries, but the model makes one prediction per row, not one per entry. These supplied coefficients illustrate the calculation; they have not been trained or validated."),
];

export function buildMatrixAnatomyTrial(steps) {
  const checks = matrixAnatomyChecks;
  const additions = {
    start: {
      title: "How do we keep many observations organised?",
      goal: "Read matrix shapes and entries, recognise useful matrix types, and explain what each axis means in an ML dataset.",
      estimatedTime: "40–55 minutes with practice", mathLevel: "School maths → ML reasoning",
      body: ["A vector can hold one student's marks. What happens when we have a whole class? We could keep separate lists, but then it is easy to mix up whose mark belongs to which subject. A matrix gives those numbers a shared arrangement: one student per row, one subject per column.",
        "That arrangement is doing useful work before we calculate anything. It lets us ask for one student's profile, compare one subject across students, and check whether an incoming record has the right number and order of features. In ML, a shape error often means that the model has misunderstood this arrangement.",
        "We will build one small marks table, read its notation, and distinguish rectangular, square, diagonal, identity, and zero matrices. Then we will reuse the previous dot-product lesson to see how a row becomes a prediction. General matrix multiplication comes in the next lesson.",
        "You need ordered vectors, counting, and ordinary arithmetic. Try the interactive cell tasks and written questions before revealing their answers. The optional deeper section looks at what shape checks can and cannot establish. The mini-exam is topic practice with a marking guide, rather than a claim about a particular university syllabus."],
    },
    "everyday-story": {
      title: "Three students, two subjects",
      everyday: {
        title: "A marks table with a promise about each position",
        setup: ["Maya scored 60 in Maths and 80 in Computing. Nimal scored 70 and 90; Asha scored 50 and 75. All marks are out of 100. We choose the row order Maya, Nimal, Asha, and the column order Maths, Computing.",
          "Write each student's two marks together, then place the three student rows one beneath another. The resulting matrix is X = [[60, 80], [70, 90], [50, 75]]. Its numbers carry meaning because the axis labels stay consistent."],
        quantities: [{ label: "Student rows", value: "3", meaning: "Each row describes one student in the agreed subject order." }, { label: "Subject columns", value: "2", meaning: "Each column records one subject across all three students." }],
        walkthrough: [{ action: "Count the rows: Maya, Nimal, Asha gives 3.", reason: "The row axis answers how many student observations we have." },
          { action: "Count the columns in every row: Maths and Computing gives 2.", reason: "Each observation must follow the same two-feature layout." },
          { action: "State shape as 3 × 2, and entry count as 3 × 2 = 6.", reason: "Shape preserves both axis sizes and their order. Entry count describes how many scalar values fill that arrangement." }],
        takeaway: "Saying 'six numbers' loses the arrangement. A 2 × 3 matrix also has six numbers, but it has different row and column positions. For a dataset, always say what those positions represent as well as giving the shape.",
      }, activity: "matrix-cell", check: checks[0],
    },
    "plain-idea": {
      title: "Read the address of a number",
      body: ["A matrix is a rectangular arrangement of values. Rectangular means every row has the same number of entries. It does not require equal numbers of rows and columns. Our 3 × 2 marks table is a valid matrix.",
        `The notation ${math("X_{ij}")} is a cell address: row i, column j. Thus ${math("X_{21}=70")} means row 2, column 1, which is Nimal's Maths mark. The row index comes first in both the shape and the entry address.`,
        "A row collects several features for one student. A column collects the same feature for several students. Reading row 2 gives [70, 90]; reading column 2 gives [80, 90, 75]. These are different questions about the same table.",
        "Mathematical indexing usually starts at 1. Python lists and NumPy arrays start at 0. Mathematical X₂₁ therefore corresponds to X[1][0] for nested Python lists, or X[1, 0] for a NumPy array. Write down which convention you are using before looking up an entry."],
      vocabulary: [{ id: "matrix", name: "matrix", definition: "A rectangular arrangement with a fixed number of rows and columns.", analogy: "A table whose positions have agreed meanings", example: "[[60, 80], [70, 90], [50, 75]] has shape 3 × 2.", nonExample: "[[60, 80], [70]] has unequal row lengths and needs an explicit treatment of the missing entry." }],
      reading: [{ title: "What if a mark is missing?", paragraphs: ["An absent Computing mark does not make Nimal's profile a one-feature observation. The dataset still has two feature positions. Keep the second position and represent the missing value explicitly in a way your tools support, such as a missing-value marker before appropriate preprocessing.",
        "Putting zero there without explanation changes the meaning: zero marks and an unrecorded mark describe different situations. A model needs an intentional missing-data strategy. We will study those choices later; here the lesson is to keep the layout and the meaning visible."] }], check: checks[1],
    },
    "worked-example": {
      title: "Matrix types describe structure",
      body: ["A matrix can have more than one structural label. 'Square' describes its shape. 'Diagonal' describes where nonzero entries may occur. 'Identity' specifies particular values. Learn what each label guarantees before using it in a calculation."],
      example: { title: "Recognise the identity by checking every position", prompt: "Classify I = [[1, 0], [0, 1]], then see what it does to the vector [3, 4].",
        steps: ["There are two rows and two columns, so I is a 2 × 2 square matrix.", "The main diagonal runs from top left to bottom right. Both entries are 1; the two off-diagonal entries are 0. This makes I the identity.", "Use one row-dot-vector calculation per output: [1, 0] · [3, 4] = 3, and [0, 1] · [3, 4] = 4.", "Collect the two outputs as [3, 4]. Each row selects its matching coordinate without adding the other one."],
        answer: "Square, diagonal, and identity; output [3, 4]", realWorldMeaning: "The identity preserves a compatible vector. It does not have ones everywhere; its off-diagonal zeros are part of what makes preservation work." },
      reading: [{ title: "Compare four structures", paragraphs: [
        `A square matrix has the same number of rows and columns. For example, ${math("\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}")} is 2 × 2. Being square does not make it identity, diagonal, or automatically invertible.`,
        `For this lesson, a diagonal matrix is square with zeros off its main diagonal. In ${math("D=\\begin{bmatrix}2&0\\\\0&0.5\\end{bmatrix}")}, the diagonal values may differ. Applied to [3, 4], its row-dot-vector outputs are [6, 2]: it scales the coordinates separately. Diagonal entries may also be zero.`,
        `The identity ${math("I_2=\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}")} is a special diagonal matrix with all diagonal entries equal to 1. The subscript 2 names its size: 2 × 2.`,
        `A zero matrix has every entry zero and can be rectangular: ${math("0_{2\\times3}=\\begin{bmatrix}0&0&0\\\\0&0&0\\end{bmatrix}")}. It has shape 2 × 3 even though all six values happen to be the same.`,
        "The word 'type' here describes a mathematical structure. In code, a data type such as integer or floating point answers a different question about how individual values are stored. A floating-point array can still be an identity matrix.",
      ] }], check: checks[2],
    },
    "your-turn": { title: "Your turn: addresses, types, and feature order", body: ["Try these questions on paper or in the answer boxes. Use a hint if you are stuck; reveal the worked answer after you have chosen an approach. Award yourself marks for both the result and its explanation."], exercises: matrixAnatomyPractice, check: checks[3] },
    "math-to-ml": {
      title: "A dataset is a matrix with named axes",
      body: ["Use each student's Maths and Computing marks as two inputs for predicting a later assessment score. In the convention used here, each row is one observation, also called a sample, and each column is one input feature. Feature order must match the weights in the model.",
        "The later assessment score is the target we want to predict. Keep those observed targets separate from the input features. A numeric table does not decide which values should be inputs; the prediction question determines that role."],
      notation: { expression: "X has n sample rows and d feature columns", latex: String.raw`X\in\mathbb R^{n\times d},\qquad X_{ij}=\text{feature }j\text{ of sample }i`, readAs: "X is a matrix of real numbers with n rows and d columns. Entry i j is feature j of sample i.",
        symbols: [["X", "The complete input dataset, with a fixed feature order."], ["n", "Number of sample rows; n = 3 in our marks table."], ["d", "Number of feature columns; d = 2 here."], [String.raw`\mathbb R`, "Real-number values, which can include integers, decimals, and negatives."], [String.raw`X_{ij}`, "The value at row i and column j; the indices identify positions, not multiplication."]] },
      mlBridge: {
        task: "Use the 3 × 2 marks matrix to calculate three illustrative predictions, one per student. The supplied rule is future score = 0.3 × Maths + 0.2 × Computing + 8. These coefficients are examples, not fitted or validated estimates.",
        terms: [{ id: "sample", name: "sample / observation", definition: "One recorded case. Here it is one student, represented by one row.", lessonId: "scalars-vectors-tensors", state: "review" }, { id: "feature", name: "feature", definition: "One input quantity consistently recorded across observations. Here the two features are Maths and Computing marks.", lessonId: "scalars-vectors-tensors", state: "review" }, { id: "target", name: "target", definition: "The outcome the model is meant to predict, such as the later assessment score.", lessonId: "linear-regression-ml", state: "preview" }],
        mapping: [{ math: "X: 3 × 2", ml: "Three students with two input features each." }, { math: "Row 2: [70, 90]", ml: "Nimal's Maths and Computing marks in the agreed order." }, { math: "w = [0.3, 0.2], b = 8", ml: "Two matching feature coefficients and one shared baseline." }],
        walkthrough: [{ action: "Maya: 60 × 0.3 + 80 × 0.2 + 8 = 42.", reason: "Apply the familiar dot product to the first feature row, then add the baseline once." }, { action: "Nimal: 70 × 0.3 + 90 × 0.2 + 8 = 47; Asha: 50 × 0.3 + 75 × 0.2 + 8 = 38.", reason: "Reuse the same coefficients for each observation. The rows have a consistent feature layout." }, { action: "Collect predictions [42, 47, 38] in the row order Maya, Nimal, Asha.", reason: "Each output must remain paired with the student it describes; otherwise comparison with actual scores is wrong." }],
        takeaway: "Two columns require two feature weights; three rows produce three predictions. The bias is shared across predictions. Matrix–vector multiplication will collect these row-wise dot products into one operation in the next lesson.",
      }, check: checks[4],
      reading: [{ title: "Optional ML reasoning: shape checks are only the first check", optional: true, paragraphs: [
        "The samples-by-features convention is common, but an array does not intrinsically know what a row means. Some methods use the opposite orientation. Read the convention in the problem or API before interpreting a shape; n and d are names we assigned to these axes.",
        "A shape check detects a row with too few features. It cannot detect two correctly sized columns that have silently exchanged meanings. Units, feature names, missing-value conventions, and observation order must stay consistent too. The same issue applies when pairing predictions with their target values.",
        "Dimensions also describe storage rather than independent information. A second column that exactly duplicates the first increases the feature count but adds no new information. Likewise, a square matrix whose second row is twice its first is square but loses an independent direction. Rank and invertibility will explain that distinction later.",
        `Looking ahead: writing each input as a column, ${math("X")} has shape ${math("n\\times d")}, weights have shape ${math("d\\times1")}, and ${math("X\\mathbf w")} has shape ${math("n\\times1")}. The d coordinates within each row become one dot-product result. The n rows give n results. This is the reason behind the output shape, rather than a rule to memorise in isolation.`,
      ] }],
    },
    recap: { title: "A short matrix exam—and a useful readiness check", body: ["Allow about 12–15 minutes for this 10-mark topic practice set. Close the earlier examples, show your working, and explain axis meanings as well as shapes. Written answers are self-assessed using the marking guide.",
      "Before moving on, check that you can locate an entry, distinguish a shape from an entry count, explain a row and a column in context, and recognise identity, diagonal, and zero structures. You should also be able to explain why consistent feature order matters even when the dimensions are correct."],
      exercises: matrixAnatomyExam, recapQuestions: [checks[0], checks[1], checks[4]],
      misconception: { wrong: "A 3 × 2 matrix has three columns and two rows.", correction: "Shape lists rows first, then columns. In our dataset, three rows mean three students and two columns mean two input features." },
      reading: [{ title: "Next: one dot product per output", paragraphs: ["You now know how a matrix keeps a collection of vectors organised. In Matrix–Vector Multiplication, we will calculate how each row combines with a shared vector, track the output shape, and distinguish a dataset matrix from a transformation matrix. Being able to name the two axes makes that next calculation much easier to follow."] }],
    },
  };
  return steps.map((step) => ({ ...step, ...additions[step.id] }));
}
