import { mcq } from "./schema.js";

const math = (latex) => `\\(${latex}\\)`;
export const cafeMatrixExample = {
  orders: [[2, 1], [1, 3]],
  prices: [[3, 4], [2, 1]],
  items: ["Sandwich", "Juice"],
  shops: ["Shop 1", "Shop 2"],
};
const question = (id, prompt, options, answerIndex, optionExplanations) => ({
  ...mcq(`matrix-matrix-trial-${id}`, prompt, options, answerIndex, optionExplanations[answerIndex], "matrix-matrix-multiplication"),
  optionExplanations,
});

export const matrixMatrixChecks = [
  question("bill", "Order 1 contains 2 sandwiches and 1 juice. Shop 2 charges 4 coins per sandwich and 1 coin per juice. What is C₁₂, the cost of order 1 at shop 2?", ["8 coins", "9 coins", "[8, 1] coins", "10 coins"], 1, [
    "8 coins covers only the sandwiches. Include the 1-coin juice contribution before adding the bill.",
    "Correct: 2 × 4 + 1 × 1 = 8 + 1 = 9 coins. The order's quantities pair with shop 2's prices.",
    "[8, 1] lists the correct item contributions, but the cell C₁₂ is one scalar bill. Add the contributions to get 9 coins.",
    "10 comes from pairing [2, 1] with the first price row [3, 4]. That row contains sandwich prices across shops. For a complete bill, pair quantities with a shop's price column instead.",
  ]),
  question("shape", "A has shape 3 × 2 and B has shape 2 × 4. What shape does AB have?", ["3 × 2", "2 × 4", "3 × 4", "4 × 3"], 2, [
    "3 × 2 is A's shape. B supplies four columns to compare with every row of A, producing four outputs per row.",
    "2 × 4 is B's shape. The shared size 2 counts paired contributions inside a cell, not output rows.",
    "Correct: A contributes three output rows, B contributes four output columns, and the matching inner size 2 determines the two products summed in each cell.",
    "4 × 3 reverses the output axes. The result keeps A's row order followed by B's column order.",
  ]),
  question("product", "For A = [[2, 1], [1, 3]] and B = [[3, 4], [2, 1]], what is AB?", ["[[6, 4], [2, 3]]", "[[8, 9], [9, 7]]", "[[10, 15], [5, 5]]", "33"], 1, [
    "This multiplies matching positions element by element. Matrix multiplication takes a row of A and a column of B, then sums the paired products for each output cell.",
    "Correct: the row–column dot products give C₁₁ = 8, C₁₂ = 9, C₂₁ = 9, C₂₂ = 7. Place each scalar in its own output cell.",
    "This is BA: it uses rows of B with columns of A. Reversing the order changes the calculation, even though both products are defined here.",
    "33 is the sum of the four output cells. AB keeps those four results arranged as a matrix; it does not sum different output positions together.",
  ]),
  question("order", "A and B are both 2 × 2 matrices. Which statement is reliable?", ["AB = BA because ordinary numbers commute", "BA is undefined because the matrices are square", "Both products are defined, but they may differ", "BA must be the negative of AB"], 2, [
    "Individual scalar products commute, but switching matrices changes which rows pair with which columns. AB and BA are generally different.",
    "Both orders have matching inner dimensions 2 and 2. Square shape makes both products defined here; it does not make them equal.",
    "Correct: both orders are dimensionally valid, but they pair different rows and columns. Some special pairs commute, so compare rather than assuming equality or inequality.",
    "There is no general sign-reversal rule. In the cafe example, AB and BA differ without being negatives of each other.",
  ]),
  question("ml-columns", "X has 3 student rows and 2 feature columns. W is 2 × 2, with one feature-weight column for each of two output scores. What does XW represent?", ["Two students with three scores each", "Three students with two weighted scores each", "One class total", "The product of matching feature entries only"], 1, [
    "This swaps the sample and output axes. The rows remain the three observations from X, and the columns correspond to the two weight columns in W.",
    "Correct: each student row meets each output's weight column. The resulting 3 × 2 matrix contains two weighted scores for every student.",
    "Each row–column pair remains a separate cell. XW does not combine all observations and outputs into one class total.",
    "Matching-entry multiplication does not perform the required sums over features. Each output cell combines both feature contributions using one weight column.",
  ]),
];

const exercise = (id, title, prompt, hint, steps, answer, marking, commonTrap) => ({
  id: `matrix-matrix-trial-${id}`, title, prompt, hint, steps, answer, marking, commonTrap,
});

export const matrixMatrixPractice = [
  exercise("cells", "1. Calculate every output cell · 4 marks",
    "Calculate AB for A = [[1, −2], [0, 3]] and B = [[2, 1], [1, −1]]. Show the row–column calculation for each cell.",
    "B's columns are [2, 1] and [1, −1]. Keep the sign in each paired product before adding.",
    ["C₁₁ = 1 × 2 + (−2) × 1 = 0.", "C₁₂ = 1 × 1 + (−2) × (−1) = 3.", "C₂₁ = 0 × 2 + 3 × 1 = 3.", "C₂₂ = 0 × 1 + 3 × (−1) = −3. The result is [[0, 3], [3, −3]]."],
    "[[0, 3], [3, −3]]", ["1 mark for each correct cell with its paired-product working."],
    "The two negatives in (−2) × (−1) make a positive contribution. A zero result can come from cancellation."),
  exercise("dimensions", "2. Check both orders before calculating · 3 marks",
    "A is 2 × 3 and B is 3 × 4. Is AB defined? State its shape. Is BA defined? Explain each decision using row–column pairing.",
    "Check the number of entries in a row of the left matrix against the number in a column of the right matrix, separately for each order.",
    ["AB is defined: A's three-entry rows pair with B's three-entry columns.", "The output keeps A's two rows and B's four columns, so its shape is 2 × 4.", "BA is undefined: B's four-entry rows cannot pair with A's two-entry columns. The inner sizes 4 and 2 differ."],
    "AB: defined, 2 × 4. BA: undefined.", ["1 mark: AB is defined with a correct reason.", "1 mark: output shape 2 × 4.", "1 mark: BA is undefined with the inner-dimension reason."],
    "AB being valid does not establish that BA is valid. A shape check belongs to the chosen order."),
  exercise("composition", "3. See why order changes a transformation · 4 marks",
    "Let A = [[2, 0], [0, 1]] stretch the first coordinate, and B = [[1, 1], [0, 1]] add the second coordinate into the first. Calculate AB and BA, then apply each combined matrix to v = [1, 1]. Explain the difference.",
    "For ABv, B acts on v first. For BAv, A acts first. You can check the combined products by doing these two-stage calculations.",
    ["AB = [[2, 2], [0, 1]] and BA = [[2, 1], [0, 1]].", "ABv = [4, 1]: B first gives [2, 1], then A doubles the first coordinate.", "BAv = [3, 1]: A first gives [2, 1], then B adds the unchanged second coordinate.", "In the first order the added coordinate is also doubled; in the second order it is added after doubling. The operations therefore produce different outputs."],
    "ABv = [4, 1]; BAv = [3, 1]", ["1 mark: AB.", "1 mark: BA.", "1 mark: both vector outputs.", "1 mark: explains the order of operations."],
    "The leftmost matrix is applied last when the product acts on a column vector. Reading AB left to right as the action order reverses the process."),
];

export const matrixMatrixExam = [
  exercise("exam-orders", "A. Price three orders at two shops · 5 marks",
    "A = [[2, 1], [1, 3], [0, 2]] records three orders in the feature order [sandwiches, juices]. B = [[3, 4], [2, 1]] records prices, with item rows in the same order and columns [shop 1, shop 2]. State the output shape, calculate AB, and explain C₃₂ in words and units.",
    "Every order row pairs with each shop's item-price column. The shared axis is item type; its order must match in both matrices.",
    ["A is 3 × 2 and B is 2 × 2, so C = AB has shape 3 × 2.", "Order 1 costs [2 × 3 + 1 × 2, 2 × 4 + 1 × 1] = [8, 9].", "Order 2 costs [1 × 3 + 3 × 2, 1 × 4 + 3 × 1] = [9, 7].", "Order 3 costs [0 × 3 + 2 × 2, 0 × 4 + 2 × 1] = [4, 2]. Thus C = [[8, 9], [9, 7], [4, 2]].", "C₃₂ = 2 coins is the cost of order 3 at shop 2. Quantities × price per item give a bill in coins."],
    "[[8, 9], [9, 7], [4, 2]]; shape 3 × 2; C₃₂ is 2 coins", ["1 mark: output shape.", "1 mark: order 1 costs.", "1 mark: order 2 costs.", "1 mark: order 3 costs.", "1 mark: C₃₂ meaning and units."],
    "Do not count shops as output rows. The result keeps order rows from A and shop columns from B."),
  exercise("exam-models", "B. Two output scores for each student · 5 marks",
    "Use X = [[60, 80], [70, 90], [50, 75]] in [Maths, Computing] order and W = [[0.3, 0.1], [0.2, 0.4]]. Each column of W is one output's weight vector. Add biases [8, 5] to the matching output columns. State the shapes, calculate Nimal's two predictions, explain W₁₂, and say how to adjust W if the feature columns of X are swapped.",
    "Nimal is row 2, [70, 90]. The first output uses [0.3, 0.2]; the second uses [0.1, 0.4]. Swapping input features changes the shared feature axis.",
    ["X is 3 × 2, W is 2 × 2, and both the weighted-score matrix and final prediction matrix are 3 × 2.", "Nimal's first weighted score is 70 × 0.3 + 90 × 0.2 = 39; adding its bias 8 gives 47.", "His second weighted score is 70 × 0.1 + 90 × 0.4 = 43; adding its bias 5 gives 48.", "W₁₂ = 0.1 is the coefficient of feature 1, Maths, for output 2.", "If X's feature columns are swapped, swap W's feature rows to [[0.2, 0.4], [0.3, 0.1]]. Keep the output columns and biases in their existing order."],
    "Shapes 3 × 2, 2 × 2, 3 × 2; Nimal [47, 48]; swap W's rows when feature columns are swapped", ["1 mark: input and output shapes.", "1 mark: first prediction 47.", "1 mark: second prediction 48.", "1 mark: W₁₂ interpretation.", "1 mark: correct compensating row swap in W."],
    "Swapping W's columns exchanges the output models. A swap of input features requires changing W's feature rows, not its output columns."),
];

export function buildMatrixMatrixTrial(steps) {
  const checks = matrixMatrixChecks;
  const additions = {
    start: {
      title: "What if every row needs more than one result?",
      goal: "Calculate and interpret a matrix product, explain its dimensions and order, and connect it to multiple ML outputs.",
      estimatedTime: "50–65 minutes with practice", mathLevel: "School maths → ML reasoning",
      body: ["In the previous lesson, every matrix row met one input column and produced one number. Now imagine that each row needs to meet several columns. We repeat the same dot-product calculation for every row–column pair and arrange the answers into a new matrix.",
        "A cafe example will make the positions concrete: rows describe orders, columns describe shops, and each output cell is a bill. We will calculate one cell carefully before filling the rest. Then we will reuse the student marks table to calculate two different weighted scores per student.",
        "You need dot products, matrix shapes, and the idea of keeping each output in its own position. The new operation is a collection of those familiar calculations. We will also see why changing the order can change the answer or make the product undefined.",
        "Try the cell-prediction activity and the written questions before revealing their answers. The 10-mark mini-exam has worked solutions and marking guides. Optional ML reasoning explains axis conventions, bias columns, and when a product can represent successive transformations."],
    },
    "everyday-story": {
      title: "The same orders priced at two shops",
      everyday: {
        title: "Every order needs a bill from each shop",
        setup: ["Order 1 contains two sandwiches and one juice; order 2 contains one sandwich and three juices. Place quantities in A = [[2, 1], [1, 3]], with sandwich counts first and juice counts second in each row.",
          "Shop 1 charges 3 coins per sandwich and 2 per juice. Shop 2 charges 4 and 1. Put these prices into B = [[3, 4], [2, 1]]: sandwich prices occupy row 1, juice prices row 2; each shop has its own column. The item order in A's columns matches the item order in B's rows."],
        quantities: [{ label: "Order quantities A", value: "2 × 2", meaning: "Order rows and item columns: sandwiches, then juices." }, { label: "Price table B", value: "2 × 2", meaning: "Item rows in the same order, with shop 1 then shop 2 as columns." }],
        walkthrough: [{ action: "Order 1 at shop 1: [2, 1] · [3, 2] = 2 × 3 + 1 × 2 = 8 coins.", reason: "Pair quantities from one order row with prices from one shop column. Both products become costs in coins." }, { action: "Order 1 at shop 2: [2, 1] · [4, 1] = 9 coins.", reason: "Keep the same order row and move to the other shop's price column." }, { action: "Order 2 costs 9 coins at shop 1 and 7 coins at shop 2.", reason: "Repeat with the second order row, comparing it with both shop columns." }, { action: "Store C = AB = [[8, 9], [9, 7]].", reason: "The output keeps order rows from A and shop columns from B, so every bill has a clear address." }],
        takeaway: "C₁₂ is order 1's bill at shop 2. Each cell is one row–column dot product, and C keeps all those scalar results in an organised table. Matching item meanings matters as well as matching item counts.",
      }, check: checks[0],
    },
    "plain-idea": {
      title: "The shared dimension connects the two tables",
      body: [
        `Suppose A has shape ${math("m\\times d")} and B has shape ${math("d\\times p")}. An A row contains d values. A B column also contains d values. This lets us pair their coordinates and take a dot product. The common size d is the shared dimension over which we add contributions.`,
        `There are m possible rows and p possible columns, so the output has shape ${math("m\\times p")}. Thus ${math("(m\\times d)(d\\times p)\\longrightarrow(m\\times p)")}. The inner sizes match to permit the calculation; the outer sizes count the output positions.`,
        "For a 3 × 2 order table and a 2 × 4 price table, there are three orders and four shops. Each bill adds two item contributions; the output has twelve separate bills in a 3 × 4 matrix. Two contributions per bill does not mean two output columns.",
        "The row–column rule is also a way to check the formula without memorising a diagram. Ask which output row you want, which output column you want, and whether their two input lists have the same length. Then ask whether matching positions have matching meanings.",
      ],
      vocabulary: [{ id: "matrix-matrix-multiplication", name: "matrix product", definition: "The matrix formed by taking a dot product for every row of the left matrix and every column of the right matrix.", analogy: "A comparison table with one result for every left-row/right-column pairing", example: "Order rows multiplied by shop-price columns give a bill for every order–shop pair.", nonExample: "Multiplying entries at matching positions without taking row–column sums is element-by-element multiplication." }],
      reading: [{ title: "Another view: several matrix–vector products", paragraphs: [
        "Take B's first column by itself. A times that column is the matrix–vector calculation from the previous lesson: one result per row of A. Repeat with B's second column, then put its output next to the first output column.",
        `Writing B's columns as ${math("\\mathbf b_1,\\ldots,\\mathbf b_p")}, we get ${math("AB=[A\\mathbf b_1,\\ldots,A\\mathbf b_p]")}. The cafe's first output column contains all order costs at shop 1; its second contains all order costs at shop 2. This view explains exactly how the previous lesson extends to several columns.`,
      ] }], check: checks[1],
    },
    "worked-example": {
      title: "Choose the row and column before multiplying",
      body: ["Work through the four cafe cells and check that each result lands in the right place. The first output index selects an order row; the second selects a shop column. Changing an index changes which input lists you must pair."],
      example: { title: "Build the complete bill matrix", prompt: "Calculate AB for A = [[2, 1], [1, 3]] and B = [[3, 4], [2, 1]].",
        steps: ["Check shapes: (2 × 2)(2 × 2) gives a 2 × 2 output, so there are four cells to calculate.", "C₁₁: row 1 [2, 1] and column 1 [3, 2] give 2 × 3 + 1 × 2 = 8.", "C₁₂: row 1 [2, 1] and column 2 [4, 1] give 2 × 4 + 1 × 1 = 9.", "C₂₁: row 2 [1, 3] and column 1 [3, 2] give 1 × 3 + 3 × 2 = 9.", "C₂₂: row 2 [1, 3] and column 2 [4, 1] give 1 × 4 + 3 × 1 = 7. Put the results into [[8, 9], [9, 7]]."],
        answer: "AB = [[8, 9], [9, 7]]", realWorldMeaning: "Order 1 is cheaper at shop 1 (8 rather than 9 coins); order 2 is cheaper at shop 2 (7 rather than 9). The table supports a separate comparison for each order." },
      activity: "matrix-product-cell",
      reading: [{ title: "Why changing order is a real change", paragraphs: [
        "In the cafe calculation, A's item columns match B's item rows. Reversing the matrices changes the axis pairing. Even if their square shapes allow BA, it does not automatically describe the same orders priced at the same shops.",
        "The arithmetic illustrates the difference: BA = [[10, 15], [5, 5]], while AB = [[8, 9], [9, 7]]. You can check the first BA cell using B's first row [3, 4] and A's first column [2, 1]: 3 × 2 + 4 × 1 = 10.",
        "For transformations, order has an intuitive meaning. If A doubles the first coordinate and B adds the second coordinate into the first, AB applies B first and A second. The addition is doubled too. BA doubles first and adds afterwards. On [1, 1], those two orders give [4, 1] and [3, 1].",
        `When compatible matrices act on a column vector v, ${math("(AB)\\mathbf v=A(B\\mathbf v)")}. Parentheses can change the grouping without changing the result. This is associativity. Exchanging A and B is a different operation, and generally changes the result: multiplication is not generally commutative. Some special matrix pairs do commute.`,
      ] }], check: checks[2],
    },
    "your-turn": { title: "Your turn: cells, shapes, and order", body: ["Work through these questions before revealing the solutions. Make your row and column choices visible, especially when entries are negative. For the transformation question, use the two-stage interpretation to check your combined matrices."], exercises: matrixMatrixPractice, check: checks[3] },
    "math-to-ml": {
      title: "Give every student two output scores",
      body: ["The earlier marks matrix X contained three students and two features. Previously it met one weight column. Now collect two weight columns into W: the first output uses [0.3, 0.2], and the second uses [0.1, 0.4]. In row form, W = [[0.3, 0.1], [0.2, 0.4]]. Its rows match the Maths and Computing feature columns in X.",
        "Each output column can represent a different linear score or output unit. The supplied numbers are illustrative coefficients, not trained estimates. The multiplication XW produces two weighted scores per student without changing the row–column method.",
        "Read the formula below as instructions for one cell. To calculate the cafe's C₁₂, hold i = 1 and j = 2 fixed. Let k visit the item positions: k = 1 gives A₁₁B₁₂ = 2 × 4; k = 2 gives A₁₂B₂₂ = 1 × 1. The sigma symbol adds these contributions to give 9. The shared index k moves during the sum; the output address i, j stays fixed."],
      notation: { expression: "output cell i j is row i of A dotted with column j of B", latex: String.raw`C=AB,\qquad C_{ij}=\sum_{k=1}^{d}A_{ik}B_{kj}`, readAs: "C equals A times B. Cell i j is the sum over shared positions k of A's row-i value times B's column-j value.",
        symbols: [["A", "Left matrix: its rows determine output rows."], ["B", "Right matrix: its columns determine output columns."], ["C", "The output matrix with one scalar per row–column pairing."], ["i", "The output row, also the selected row of A."], ["j", "The output column, also the selected column of B."], ["k", "A position along A's columns and B's rows, the shared axis."], ["d", "The length of that shared axis; each output cell adds d paired products."]] },
      mlBridge: {
        task: "Calculate S = XW for the three-student marks table, then add biases [8, 5] to the matching output columns. The input feature order is Maths, Computing, and the output order is score 1, score 2.",
        terms: [{ id: "feature", name: "feature", definition: "One input measurement stored in a consistent column of X and matched to a row of W.", lessonId: "matrix-anatomy-types", state: "review" }, { id: "output-score", name: "output score", definition: "One weighted result, defined by a column of coefficients in this layout.", lessonId: "matrix-vector-multiplication", state: "review" }, { id: "bias", name: "bias", definition: "A baseline added to an output after its feature contributions are combined.", lessonId: "dot-product-angle", state: "review" }],
        mapping: [{ math: "X: 3 × 2", ml: "Three observations with two features each." }, { math: "W: 2 × 2", ml: "Feature rows and two output-weight columns." }, { math: "S = XW: 3 × 2", ml: "Two weighted scores for each of three students." }, { math: "b = [8, 5]", ml: "Score 1 receives bias 8; score 2 receives bias 5, for every student." }],
        walkthrough: [{ action: "Maya: [60, 80] · [0.3, 0.2] = 34; [60, 80] · [0.1, 0.4] = 38.", reason: "One student row meets two output-weight columns, producing two different scores." }, { action: "Repeat for Nimal and Asha: S = [[34, 38], [39, 43], [30, 35]].", reason: "Keep observation rows and output columns separate so every score remains identifiable." }, { action: "Add matching biases: [[34 + 8, 38 + 5], [39 + 8, 43 + 5], [30 + 8, 35 + 5]] = [[42, 43], [47, 48], [38, 40]].", reason: "A shared bias for one output is reused for that output across all observations; it is not added across the wrong axis." }],
        takeaway: "XW is a useful pattern for multiple model outputs and neural-layer pre-activation scores. The multiplication supplies weighted sums; activation functions, training, and evaluation are additional steps. Two computed scores do not automatically become probabilities.",
      }, check: checks[4],
      reading: [{ title: "Optional ML reasoning: follow the axes, not just the letters", optional: true, paragraphs: [
        "The layout used here is samples-by-features multiplied by features-by-outputs. Some APIs store weights as outputs-by-features and transpose them when multiplying a batch. The learned coefficients can be equivalent even though their stored orientation differs. Inspect the convention before transferring a formula into code.",
        "The shared feature axis needs matching names as well as matching size. Swapping X's feature columns requires swapping W's feature rows to preserve all outputs. Swapping W's columns instead exchanges the output models. A dimension check cannot detect that semantic mistake.",
        `If S has n sample rows and p output columns, a per-output bias can be written explicitly as ${math("H_{ij}=S_{ij}+b_j")}. The index j selects the output's baseline, which is repeated across sample rows i. In array code this is often handled by broadcasting; write the axis meanings first so convenience does not hide a mistake.`,
        "Two successive purely linear transformations can be combined into a matrix product. A nonlinear operation between them generally prevents that collapse. This is why a neural network with activations between layers cannot generally be replaced by just multiplying all its weight matrices together.",
        "In NumPy, @ computes the row–column matrix product. For equal-shaped arrays, * multiplies entries at matching positions. For the cafe matrices that would give [[6, 4], [2, 3]], which is a valid different operation but does not calculate order bills. Operators must match the question you intend to answer.",
      ] }],
    },
    recap: { title: "A short exam: explain the output table", body: ["Allow about 12–15 minutes for this 10-mark topic practice set. State the shapes, show the shared-axis products, and name what each output position represents. Written responses are self-assessed using the worked answers and marking guides.",
      "You are ready to move on when you can calculate a selected cell, predict a whole product's shape, explain why reversing order may fail or change the result, and keep input features, observations, and model outputs aligned."], exercises: matrixMatrixExam, recapQuestions: [checks[1], checks[2], checks[4]],
      misconception: { wrong: "Matrix multiplication multiplies entries at matching positions.", correction: "Each output cell is a row of the left matrix dotted with a column of the right matrix. Element-by-element multiplication is a different operation with different output meanings." },
      reading: [{ title: "Next: transpose and symmetry", paragraphs: ["The next lesson will exchange rows and columns by transposing a matrix. You already know why that exchange affects which lists can be paired in multiplication. We will read transposed entries, track the changed shapes, and recognise matrices whose values are unchanged by the exchange."] }],
    },
  };
  return steps.map((step) => ({ ...step, ...additions[step.id] }));
}
