import { mcq } from "./schema.js";

const math = (latex) => `\\(${latex}\\)`;
const question = (id, prompt, options, answerIndex, optionExplanations) => ({
  ...mcq(`transpose-trial-${id}`, prompt, options, answerIndex, optionExplanations[answerIndex], "transpose-symmetry"),
  optionExplanations,
});

export const transposeChecks = [
  question("layout", "X has 3 student rows and 2 subject columns. What does Xᵀ contain?", ["3 student rows and 2 subject columns", "2 subject rows and 3 student columns", "The six marks sorted from smallest to largest", "New marks obtained by undoing X"], 1, [
    "That is the original layout. Transposing exchanges the row and column axes, so the subjects become rows.",
    "Correct: Xᵀ has shape 2 × 3. Each mark keeps its student–subject meaning, with subject rows and student columns.",
    "Transposing does not sort values. It moves each entry according to its row and column address, regardless of its size.",
    "A transpose rearranges entries; it does not undo a calculation or produce new marks. An inverse is a different operation.",
  ]),
  question("address", "For X = [[60, 80], [70, 90], [50, 75]], what is (Xᵀ)₁₂? Mathematical indices start at 1.", ["80", "70", "60", "90"], 1, [
    "80 is X₁₂, the original address. The transpose's address (1, 2) comes from the original address (2, 1).",
    "Correct: (Xᵀ)₁₂ = X₂₁ = 70. Nimal's Maths mark moves from row 2, column 1 to row 1, column 2.",
    "60 remains at address (1, 1) after transposing. Both indices of the requested off-diagonal address must be exchanged.",
    "90 is X₂₂ and stays at (2, 2) in Xᵀ. It is Nimal's Computing mark, whereas (Xᵀ)₁₂ asks for Maths.",
  ]),
  question("symmetric", "Which matrix is symmetric?", ["[[1, 2], [3, 1]]", "[[2, −1], [−1, 5]]", "[[1, 0, 2], [0, 1, 3]]", "[[1, 2], [0, 1]]"], 1, [
    "Equal diagonal entries do not establish symmetry. The off-diagonal pair 2 and 3 differs, so this matrix changes under transposition.",
    "Correct: the mirrored off-diagonal entries are both −1. Diagonal entries 2 and 5 stay in place and need not match each other.",
    "This matrix is 2 × 3, and its transpose is 3 × 2. Equal matrices must have the same shape, so a rectangular matrix cannot be symmetric under this definition.",
    "This is square but has unequal mirrored entries 2 and 0. Square shape permits symmetry; it does not guarantee it.",
  ]),
  question("product", "A is 2 × 3 and B is 3 × 4. Which expression equals (AB)ᵀ?", ["AᵀBᵀ", "BᵀAᵀ", "AB", "Aᵀ + Bᵀ"], 1, [
    "This keeps the original order. Aᵀ is 3 × 2 and Bᵀ is 4 × 3; their inner sizes 2 and 4 do not even match. Transposing a product reverses the factor order.",
    "Correct: Bᵀ is 4 × 3 and Aᵀ is 3 × 2, so BᵀAᵀ has shape 4 × 2, matching (AB)ᵀ. Its row–column sums are the original product's sums at exchanged addresses.",
    "AB is 2 × 4, whereas (AB)ᵀ is 4 × 2. A transpose is unchanged only in special cases, such as a symmetric square result.",
    "Aᵀ and Bᵀ have different shapes, so this sum is undefined. Transposing a product gives another product, with the factors reversed.",
  ]),
  question("gram", "Z has 3 observation rows and 2 feature columns. What does ZᵀZ organise?", ["A 3 × 3 table comparing observation rows", "A 2 × 2 table of feature-column dot products", "The inverse of Z", "A 2 × 2 covariance matrix automatically"], 1, [
    "Observation-row dot products belong to ZZᵀ, whose shape is 3 × 3. ZᵀZ pairs the feature columns of Z instead.",
    "Correct: (2 × 3)(3 × 2) gives a 2 × 2 matrix. Entry i j is the dot product of feature columns i and j across the three observations.",
    "Z is rectangular here. ZᵀZ combines column dot products; it does not undo Z or establish that an inverse exists.",
    "The raw product is a Gram matrix. Sample covariance requires centring the feature columns and scaling their cross-products by the appropriate denominator.",
  ]),
];

const exercise = (id, title, prompt, hint, steps, answer, marking, commonTrap) => ({ id: `transpose-trial-${id}`, title, prompt, hint, steps, answer, marking, commonTrap });

export const transposePractice = [
  exercise("rectangular", "1. Transpose a rectangular matrix · 4 marks",
    "Let A = [[1, −2, 0], [3, 4, 5]]. Write Aᵀ and its shape, read (Aᵀ)₂₁, and explain why transposing twice restores A.",
    "Write each original column as a new row. Use (Aᵀ)₂₁ = A₁₂ for the requested entry.",
    ["A's columns are [1, 3], [−2, 4], and [0, 5]. These become the rows of Aᵀ.", "Aᵀ = [[1, 3], [−2, 4], [0, 5]], with shape 3 × 2.", "(Aᵀ)₂₁ = A₁₂ = −2. The sign is part of the value and stays unchanged.", "The first transpose moves (i, j) to (j, i); the second moves it back to (i, j). Thus (Aᵀ)ᵀ = A."],
    "Aᵀ = [[1, 3], [−2, 4], [0, 5]]; 3 × 2; (Aᵀ)₂₁ = −2", ["1 mark: transposed entries.", "1 mark: shape.", "1 mark: requested entry.", "1 mark: explains the double index exchange."],
    "A transpose does not reverse every row or change negative signs. Copy the original columns in their original order."),
  exercise("pairs", "2. Find the pair that breaks symmetry · 4 marks",
    "S = [[0, 4, 7], [4, 0, 2], [7, 3, 0]]. Is S symmetric? Check every off-diagonal pair. Change just one entry to make it symmetric, and explain whether the zero diagonal determines your answer.",
    "Compare S₁₂ with S₂₁, S₁₃ with S₃₁, and S₂₃ with S₃₂. Diagonal addresses exchange with themselves.",
    ["S₁₂ = S₂₁ = 4, and S₁₃ = S₃₁ = 7.", "S₂₃ = 2 but S₃₂ = 3. This unequal pair means S is not symmetric.", "One valid repair is changing S₃₂ from 3 to 2. Another is changing S₂₃ from 2 to 3.", "Diagonal entries stay in place when transposed. They may be zero, positive, or negative; symmetry is decided by equality of every mirrored pair."],
    "Not symmetric; repair the 2/3 pair by changing either entry to match the other", ["1 mark: identifies both matching pairs.", "1 mark: identifies the unequal pair and correct conclusion.", "1 mark: a valid single-entry repair.", "1 mark: explains why the zero diagonal does not determine symmetry."],
    "Checking only one off-diagonal pair is insufficient for a 3 × 3 matrix. Every mirrored pair must agree."),
  exercise("product", "3. Transpose a product in the correct order · 4 marks",
    "A = [[1, 2, 0], [0, −1, 3]] and B = [[2, 1], [1, 0], [0, 2]]. Calculate AB and (AB)ᵀ. Then use BᵀAᵀ to verify the result and state its shape.",
    "AB has shape 2 × 2. Bᵀ is 2 × 3 and Aᵀ is 3 × 2, so their reversed product is also 2 × 2.",
    ["AB = [[1 × 2 + 2 × 1 + 0 × 0, 1 × 1 + 2 × 0 + 0 × 2], [0 × 2 + (−1) × 1 + 3 × 0, 0 × 1 + (−1) × 0 + 3 × 2]] = [[4, 1], [−1, 6]].", "Transposing gives (AB)ᵀ = [[4, −1], [1, 6]].", "Bᵀ = [[2, 1, 0], [1, 0, 2]] and Aᵀ = [[1, 0], [2, −1], [0, 3]]. Their row–column sums give [[4, −1], [1, 6]], agreeing with the direct transpose.", "The product shape is (2 × 3)(3 × 2) → 2 × 2. The reversal follows the transposed row and column roles, rather than assuming matrices commute."],
    "AB = [[4, 1], [−1, 6]]; (AB)ᵀ = BᵀAᵀ = [[4, −1], [1, 6]]", ["1 mark: AB.", "1 mark: direct transpose.", "1 mark: verification using BᵀAᵀ.", "1 mark: correct shapes and factor order."],
    "AᵀBᵀ is 3 × 3 here, so being defined does not make it the correct expression. Check both shape and meaning."),
];

export const transposeExam = [
  exercise("exam-marks", "A. Keep the meaning when the axes swap · 5 marks",
    "X = [[60, 80], [70, 90], [50, 75]] has rows [Maya, Nimal, Asha] and columns [Maths, Computing]. Write Xᵀ and its shape. Interpret (Xᵀ)₂₃. Read column 2 of Xᵀ and name whose values it contains. What happens after another transpose?",
    "The original subject columns become subject rows. The original student rows become student columns.",
    ["Xᵀ = [[60, 70, 50], [80, 90, 75]].", "Its shape is 2 × 3: two subject rows and three student columns.", "(Xᵀ)₂₃ = 75, Asha's Computing mark. It is the original X₃₂.", "Column 2 is [70, 90], Nimal's marks in [Maths, Computing] order.", "Transposing again gives the original 3 × 2 student-by-subject matrix X, with every mark back at its original address."],
    "[[60, 70, 50], [80, 90, 75]]; 2 × 3; Asha's Computing mark 75; Nimal's [70, 90]; double transpose restores X", ["1 mark: transpose.", "1 mark: shape with axis meanings.", "1 mark: entry value and interpretation.", "1 mark: column values and student.", "1 mark: double transpose."],
    "After transposing, row 2 means Computing rather than Nimal. Carry the axis labels along with the values."),
  exercise("exam-gram", "B. Explain a symmetric ML matrix · 5 marks",
    "Z = [[1, 2], [2, 0], [0, 1]] has three observation rows and two feature columns. Calculate ZᵀZ, interpret its (1, 2) entry, and explain why it is symmetric. State the shape of ZZᵀ. Is ZᵀZ already a sample covariance matrix?",
    "The feature columns are [1, 2, 0] and [2, 0, 1]. Their self-dot-products give the diagonal; their cross-dot-product gives the mirrored entries.",
    ["ZᵀZ has shape 2 × 2. Its diagonal entries are 1² + 2² + 0² = 5 and 2² + 0² + 1² = 5; the cross-dot-product is 1 × 2 + 2 × 0 + 0 × 1 = 2. Thus ZᵀZ = [[5, 2], [2, 5]].", "Entry (1, 2) is the dot product of the two feature columns across the observations.", "The (2, 1) entry uses the same scalar products in the opposite order. Both give 2; all mirrored pairs therefore agree.", "ZZᵀ has shape (3 × 2)(2 × 3) → 3 × 3 and compares observation rows.", "The raw Gram product is not automatically sample covariance. For the usual sample covariance, subtract each feature's mean first, then divide the centred cross-products by n − 1, here 2."],
    "ZᵀZ = [[5, 2], [2, 5]]; symmetric feature-column dot products; ZZᵀ is 3 × 3; covariance requires centring and scaling", ["1 mark: correct feature Gram matrix.", "1 mark: off-diagonal interpretation.", "1 mark: symmetry explanation.", "1 mark: observation Gram shape.", "1 mark: centring and sample-covariance scaling."],
    "A symmetric result does not establish that its entries are probabilities, correlations, or centred covariances. Identify how the matrix was constructed."),
];

export function buildTransposeTrial(steps) {
  const checks = transposeChecks;
  const additions = {
    start: {
      title: "Can we change the layout without changing the data?",
      goal: "Transpose matrices with their axis meanings intact, test symmetry, and explain why transposes appear in ML products.",
      estimatedTime: "45–60 minutes with practice", mathLevel: "School maths → ML reasoning",
      body: ["Suppose you want to compare Maths marks across students. Our marks matrix already stores that information in a column. Sometimes a calculation or display needs it in a row instead. Transposing reorganises the same entries so the question becomes easier to read or compute.",
        "The useful habit is to follow the labels as well as the numbers. A student row becomes a student column, and a subject column becomes a subject row. No mark is recalculated, sorted, or lost.",
        "We will move individual entries, transpose a complete rectangular matrix, and then ask when a square matrix looks exactly the same after this exchange. That property is symmetry. Finally, we will see how a transpose turns feature columns into the rows needed for dot-product comparisons in ML.",
        "You need matrix addresses, shapes, and row–column multiplication. Try the two interactive activities and written questions before revealing the solutions. The optional ML section adds reasoning about Gram matrices and covariance without requiring eigenvalues or calculus. The 10-mark exam is topic practice with a self-assessment guide."],
    },
    "everyday-story": {
      title: "Read the marks by subject instead of by student",
      everyday: {
        title: "The same six marks, viewed from the other axis",
        setup: ["Keep X = [[60, 80], [70, 90], [50, 75]], with student rows Maya, Nimal, Asha and subject columns Maths, Computing. The second row [70, 90] describes Nimal; the first column [60, 70, 50] describes Maths across the class.",
          "A teacher now wants a subject-by-student table. Put the original Maths column into the first row and the Computing column into the second. Use the student names as the new column labels. This produces Xᵀ = [[60, 70, 50], [80, 90, 75]]."],
        quantities: [{ label: "Original X", value: "3 × 2", meaning: "Student rows and subject columns." }, { label: "Transposed Xᵀ", value: "2 × 3", meaning: "Subject rows and student columns; still six marks." }],
        walkthrough: [{ action: "Move Nimal's Maths mark 70 from X₂₁ to (Xᵀ)₁₂.", reason: "Exchange its two address positions while retaining the student and subject labels." }, { action: "Move Asha's Computing mark 75 from X₃₂ to (Xᵀ)₂₃.", reason: "Original row 3 becomes column 3; original column 2 becomes row 2." }, { action: "Read the new Maths row: [60, 70, 50].", reason: "The original column is now a row, with the same student order and values." }],
        takeaway: "Transpose changes the layout from student-by-subject to subject-by-student. It is useful when you want to read or multiply along the other axis. It does not turn three students into two students; the student axis has moved to the columns.",
      }, check: checks[0],
    },
    "plain-idea": {
      title: "Exchange the address, keep the value",
      body: [`For any matrix A, the transpose is written ${math("A^{\\mathsf T}")}. An entry originally at row i, column j moves to row j, column i. Equivalently, to read the transpose at address (i, j), read the original at (j, i): ${math("(A^{\\mathsf T})_{ij}=A_{ji}")}.`,
        `If A has m rows and n columns, ${math("A^{\\mathsf T}")} has n rows and m columns. A 2 × 3 matrix becomes 3 × 2. A square matrix keeps its shape, but its off-diagonal values may change position.`,
        "Picture reflection across the main diagonal, the line of addresses (1, 1), (2, 2), and so on. An off-diagonal address (1, 2) exchanges with (2, 1). A diagonal address (2, 2) exchanges with itself. The reflection description also works for rectangular matrices when their shapes are exchanged.",
        "This is different from rotating the entries. A rotation can reverse an axis order; a transpose exchanges the axes and preserves each axis's order. It also differs from an inverse: transposing twice restores the layout, but applying Aᵀ after the transformation A does not generally restore the input vector."],
      vocabulary: [{ id: "transpose", name: "transpose", definition: "The matrix obtained by exchanging row and column positions without changing the values.", analogy: "Read the same labelled table from the other axis", example: "[[1, 2, 3], [4, 5, 6]] becomes [[1, 4], [2, 5], [3, 6]].", nonExample: "[[3, 2, 1], [6, 5, 4]] reverses each row; it is not the transpose." }],
      reading: [{ title: "Two short checks that prevent confusion", paragraphs: [
        `Transposing twice gives ${math("(A^{\\mathsf T})^{\\mathsf T}=A")}. Each address exchanges and then exchanges back. No invertibility condition is needed; this works for rectangular matrices too.`,
        `For an explicit column vector ${math("\\mathbf v=\\begin{bmatrix}3\\\\4\\end{bmatrix}")}, its transpose is the row ${math("\\mathbf v^{\\mathsf T}=[3,4]")}. Their shapes are 2 × 1 and 1 × 2. Thus ${math("\\mathbf v^{\\mathsf T}\\mathbf v=25")} is a 1 × 1 dot-product result, while ${math("\\mathbf v\\mathbf v^{\\mathsf T}=\\begin{bmatrix}9&12\\\\12&16\\end{bmatrix}")} is a 2 × 2 outer product. The same entries can support different operations because their orientation differs.`,
      ] }], check: checks[1],
    },
    "worked-example": {
      title: "Build the transpose one column at a time",
      body: ["Start with the shape so you know how many new rows to write. Then copy whole original columns into new rows in their existing order. This procedure is often easier to follow than trying to move all six entries mentally."],
      example: { title: "Transpose the marks table and check one address", prompt: "Find Xᵀ for X = [[60, 80], [70, 90], [50, 75]], then read (Xᵀ)₂₃.",
        steps: ["X is 3 × 2, so Xᵀ must be 2 × 3: two new rows, three entries per row.", "Original column 1 is [60, 70, 50]. Copy it as the first new row, labelled Maths.", "Original column 2 is [80, 90, 75]. Copy it as the second new row, labelled Computing.", "The column labels are now Maya, Nimal, Asha. Thus Xᵀ = [[60, 70, 50], [80, 90, 75]].", "Read row 2, column 3: 75. Check against X₃₂ = 75 in the original. Both addresses describe Asha's Computing mark."],
        answer: "Xᵀ = [[60, 70, 50], [80, 90, 75]]; (Xᵀ)₂₃ = 75", realWorldMeaning: "The teacher can compare all Computing marks by reading one row. A student's two marks now run down a column." },
      activity: "transpose-address",
      reading: [{ title: "Symmetry: when the exchange changes nothing", paragraphs: [
        `A real matrix S is symmetric when ${math("S=S^{\\mathsf T}")}. Equality requires the same shape and equal values at every address. Therefore S must be square, and every mirrored pair must satisfy ${math("S_{ij}=S_{ji}")}.`,
        "For S = [[2, −1], [−1, 5]], the diagonal values stay in place and the two −1 entries exchange. The whole matrix is unchanged. The diagonal need not be all ones, all zeros, or even equal. Negative entries are allowed.",
        "For a 3 × 3 matrix, check the three distinct off-diagonal pairs: (1, 2) with (2, 1), (1, 3) with (3, 1), and (2, 3) with (3, 2). One unequal pair is enough to disprove symmetry; showing one equal pair is not enough to establish it.",
        "A table of straight-line distances between the same three campus locations in the same row and column order is symmetric: distance from the library to the lab equals distance from the lab to the library. A table of travel times may fail this test if routes or conditions differ by direction. Symmetry is a claim about the measured relationship, not just the table's appearance.",
      ] }], check: checks[2],
    },
    "your-turn": { title: "Test every mirrored pair", body: ["Use the symmetry activity to change one entry without changing its partner, then restore the pair. After that, try the written questions. Keep a row–column shape check beside each multiplication; it is a quick way to catch a misplaced transpose."], activity: "symmetry-pairs", exercises: transposePractice, check: checks[3] },
    "math-to-ml": {
      title: "Turn feature columns into dot-product rows",
      body: ["Suppose Z = [[1, 2], [2, 0], [0, 1]] describes three observations with two numerical features each. Its feature columns are [1, 2, 0] and [2, 0, 1]. To compare these columns using matrix multiplication, we need them as rows on the left. That is exactly what Zᵀ provides.",
        "ZᵀZ collects every feature-column dot product. This is called a feature Gram matrix. It is a useful structure in linear models and other ML calculations, although it does not by itself train a model or establish feature importance. We use small numbers here to make its construction visible."],
      notation: { expression: "(A transpose) i j equals A j i; a symmetric matrix equals its transpose", latex: String.raw`(A^{\mathsf T})_{ij}=A_{ji},\qquad S=S^{\mathsf T}`, readAs: "Entry i j of A transpose comes from entry j i of A. S is symmetric when S equals S transpose.", symbols: [["A", "The original rectangular or square matrix."], ["A^{\\mathsf T}", "The same entries with rows and columns exchanged; T denotes transpose, not a numerical power."], ["i", "The requested row in the transposed matrix, corresponding to a column in the original."], ["j", "The requested column in the transposed matrix, corresponding to a row in the original."], ["S", "A square matrix whose mirrored entries all agree when it is symmetric."]] },
      mlBridge: { task: "Build the feature Gram matrix G = ZᵀZ, and compare its shape and meaning with the observation Gram matrix ZZᵀ.",
        terms: [{ id: "feature-column", name: "feature column", definition: "One measurement across all observations; transposing makes this list a row available for dot-product pairing.", lessonId: "matrix-anatomy-types", state: "review" }, { id: "gram-matrix", name: "Gram matrix", definition: "A table of pairwise dot products for a chosen collection of vectors.", lessonId: "covariance-matrices-pca", state: "preview" }],
        mapping: [{ math: "Z: 3 × 2", ml: "Three observations, two consistently ordered features." }, { math: "Zᵀ: 2 × 3", ml: "Feature rows with one entry per observation." }, { math: "ZᵀZ: 2 × 2", ml: "A feature-by-feature table of column dot products." }, { math: "ZZᵀ: 3 × 3", ml: "An observation-by-observation table of row dot products." }],
        walkthrough: [{ action: "G₁₁ = [1, 2, 0] · [1, 2, 0] = 5; G₂₂ = [2, 0, 1] · [2, 0, 1] = 5.", reason: "Each diagonal cell compares a feature column with itself, giving its squared length." }, { action: "G₁₂ = 1 × 2 + 2 × 0 + 0 × 1 = 2. G₂₁ = 2 × 1 + 0 × 2 + 1 × 0 = 2.", reason: "The same paired scalar products give equal values when their order is exchanged. This explains symmetry, rather than just observing it." }, { action: "Collect G = [[5, 2], [2, 5]]. ZZᵀ instead equals [[5, 2, 2], [2, 4, 0], [2, 0, 1]].", reason: "The first product compares two feature vectors; the second compares three observation vectors. Both are symmetric, but they answer different questions." }],
        takeaway: "A transpose chooses which collection of vectors gets compared. Raw dot products depend on scale and are not automatically probabilities, correlations, or covariances. Preserve the axis meanings before interpreting the resulting symmetric table.",
      }, check: checks[4],
      reading: [{ title: "Why transposing a product reverses the order", paragraphs: [
        `The rule is ${math("(AB)^{\\mathsf T}=B^{\\mathsf T}A^{\\mathsf T}")}. If A is m × d and B is d × p, AB is m × p. Its transpose is p × m. The reversed product has shape (p × d)(d × m), which gives that same p × m result. Keeping the original factor order generally fails this check.`,
        "The entries explain why the rule works. Cell (i, j) of (AB)ᵀ is the original product's cell (j, i): add AⱼₖBₖᵢ over shared positions k. In BᵀAᵀ, row i of Bᵀ is column i of B, and column j of Aᵀ is row j of A. Their sum uses BₖᵢAⱼₖ, the same individual scalar products. Scalar multiplication commutes here; we have not assumed that whole matrices commute.",
        `Applying this rule to G gives ${math("(Z^{\\mathsf T}Z)^{\\mathsf T}=Z^{\\mathsf T}(Z^{\\mathsf T})^{\\mathsf T}=Z^{\\mathsf T}Z")}. This is another way to establish the Gram matrix's symmetry, even when Z itself is rectangular.`,
      ] }, { title: "Optional ML depth: covariance and nonnegative quadratic forms", optional: true, paragraphs: [
        `For n observations, subtract each feature's mean to make a centred matrix ${math("Z_c")}. The usual sample covariance matrix is ${math("\\frac{1}{n-1}Z_c^{\\mathsf T}Z_c")} for n > 1. The raw ZᵀZ in our example has neither the centring nor the scaling. We will interpret covariance carefully in a later lesson.`,
        `Every real Gram matrix also satisfies ${math("\\mathbf v^{\\mathsf T}G\\mathbf v=\\lVert Z\\mathbf v\\rVert^2\\geq0")}. Read this as: combine features with any weights v, then compute the resulting vector's squared length. A sum of squares cannot be negative. This property is called positive semidefiniteness. Symmetry alone does not imply it: diag(1, −1) is symmetric but gives −1 for v = [0, 1].`,
        "Positive semidefinite does not automatically mean invertible. Repeated or redundant feature columns can make a nonzero combination disappear, giving zero squared length. We will return to this issue when studying rank and linear systems; for now, avoid treating a transpose or a symmetric shape as evidence that an inverse exists.",
        "In NumPy, A.T transposes a two-dimensional array. A one-dimensional array has only one axis, so v.T does not turn it into an explicit row or column. For column-shaped data, use an explicit shape such as v.reshape(-1, 1), then transpose that column when you need a row. Python nested lists have no .T attribute; the companion below builds the exchanged layout explicitly.",
      ] }],
    },
    recap: { title: "A short exam: positions, symmetry, and ML meaning", body: ["Allow about 12–15 minutes for this 10-mark topic practice set. Explain addresses in words, state both axis meanings, and show the dot products that support your symmetry claim. Use the marking guides to self-assess your written work.",
      "You are ready to move on when you can transpose a rectangular matrix, recover it by transposing again, check every mirrored pair in a square matrix, reverse the factors when transposing a product, and distinguish feature comparisons from observation comparisons."], exercises: transposeExam, recapQuestions: [checks[1], checks[2], checks[4]],
      misconception: { wrong: "A square matrix is symmetric, and transposing it undoes its transformation.", correction: "A square matrix is symmetric only when every mirrored pair agrees. A transpose exchanges entry positions; an inverse, when it exists, undoes a transformation. These are different operations." },
      reading: [{ title: "Next: determinant and collapse", paragraphs: ["Next we will ask how a matrix changes area and whether it collapses different input directions onto the same output. That is the role of the determinant. Shape and symmetry alone cannot answer it; we will build the idea with small two-dimensional transformations."] }],
    },
  };
  return steps.map((step) => ({ ...step, ...additions[step.id] }));
}
