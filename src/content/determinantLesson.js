import { mcq } from "./schema.js";

const math = (latex) => `\\(${latex}\\)`;
export const determinantCases = [
  { id: "stretch", label: "Stretch and shear", matrix: [[2, 1], [0, 3]] },
  { id: "shear", label: "Shear only", matrix: [[1, 2], [0, 1]] },
  { id: "reflection", label: "Swap the coordinates", matrix: [[0, 1], [1, 0]] },
  { id: "compression", label: "Compress vertically", matrix: [[1, 0], [0, 0.5]] },
  { id: "line", label: "Collapse onto a line", matrix: [[1, 2], [2, 4]] },
  { id: "point", label: "Collapse onto a point", matrix: [[0, 0], [0, 0]] },
];
const question = (id, prompt, options, answerIndex, optionExplanations) => ({
  ...mcq(`determinant-trial-${id}`, prompt, options, answerIndex, optionExplanations[answerIndex], "determinant-collapse"), optionExplanations,
});

export const determinantChecks = [
  question("area", "A = [[2, 1], [0, 3]] transforms a patch with area 4 square units. What is the new area?", ["6 square units", "24 square units", "8 square units", "4 square units"], 1, [
    "6 is the area scale det(A) = 2 × 3 − 1 × 0. A unit square becomes area 6, but this patch starts with area 4.",
    "Correct: the area multiplier is |det(A)| = 6. Multiply by the original area: 6 × 4 = 24 square units.",
    "8 uses only the horizontal scale 2. Area accounts for both independent directions, giving a multiplier of 6 here.",
    "The shear part alone would preserve area, but this matrix also stretches the horizontal and vertical directions. Its area multiplier is 6, not 1.",
  ]),
  question("sign", "A square matrix has determinant −2. What does that tell you about its two-dimensional linear transformation?", ["It creates negative ordinary area", "It doubles area and reverses orientation", "It collapses all inputs to zero", "It is impossible because determinants cannot be negative"], 1, [
    "Ordinary area is nonnegative. The negative sign records an orientation reversal; the area multiplier is the absolute value 2.",
    "Correct: |−2| = 2 gives the area scale. The negative sign means that the ordered image directions have reversed orientation.",
    "Collapse of area requires determinant zero. This nonzero determinant means the square transformation is invertible in exact arithmetic.",
    "Negative determinants are valid. For example, swapping two coordinates has determinant −1 and reverses orientation while preserving area.",
  ]),
  question("collapse", "For A = [[1, 2], [2, 4]], A[2, 1]ᵀ and A[0, 2]ᵀ both equal [4, 8]ᵀ. What is the key conclusion?", ["The determinant is zero and distinct inputs have merged", "Every input must map to the zero vector", "The transformation is invertible because its output is nonzero", "Zero determinant means zero entries everywhere"], 0, [
    "Correct: det(A) = 1 × 4 − 2 × 2 = 0. The two distinct inputs produce the same output, so that output cannot identify which input was used.",
    "Zero determinant means loss of at least one input direction, not necessarily all outputs being zero. Here many inputs produce nonzero vectors on one line.",
    "A nonzero output does not establish an inverse. An inverse would have to recover a unique input, which is impossible when different inputs share an output.",
    "A can have all entries nonzero and still have zero determinant. Here its second column is twice its first, so the two columns do not span an area.",
  ]),
  question("one", "A = [[1, 2], [0, 1]] has determinant 1. Which statement follows?", ["A is the identity and leaves every vector unchanged", "A preserves area, but it may change lengths and angles", "A preserves the length of every vector", "A is symmetric because its determinant is positive"], 1, [
    "Determinant 1 does not specify every entry. This shear sends [0, 1] to [2, 1], so it changes that vector even though it preserves area.",
    "Correct: determinant 1 gives area preservation and no orientation reversal. The shear can still change individual vector lengths and angles.",
    "Length preservation needs more than an area scale. The vector [0, 1] has length 1, while its image [2, 1] has length √5.",
    "Symmetry requires matching mirrored entries, not a positive determinant. Here A₁₂ = 2 and A₂₁ = 0 differ.",
  ]),
  question("ml", "A 2-input, 2-output linear feature map has determinant zero. Which statement is justified?", ["Its classification accuracy must be zero", "At least one input direction is lost, but task usefulness still needs evaluation", "The model cannot output any nonzero scores", "This proves every training feature is irrelevant"], 1, [
    "The determinant describes the geometry of this square linear map. It does not determine a classifier's accuracy or the relevance of the lost direction to its target.",
    "Correct: a nonzero input change can disappear, so the original two-dimensional input cannot always be recovered. The retained representation may still be useful for a task.",
    "A singular map can produce nonzero scores. In our example the two different inputs both produce [4, 8], which lies on the retained line.",
    "The lost direction may be one combination of input features. Determinant zero does not show that each feature individually is irrelevant to prediction.",
  ]),
];

const exercise = (id, title, prompt, hint, steps, answer, marking, commonTrap) => ({ id: `determinant-trial-${id}`, title, prompt, hint, steps, answer, marking, commonTrap });
export const determinantPractice = [
  exercise("signed-area", "1. Separate sign from area · 4 marks",
    "A = [[2, 1], [1, −1]]. Calculate det(A). Find the transformed area of a 5-square-unit patch, describe orientation, and decide whether A is invertible in exact arithmetic.",
    "Keep d = −1 inside the first product. Ordinary area uses the absolute determinant; orientation uses its sign.",
    ["det(A) = 2 × (−1) − 1 × 1 = −2 − 1 = −3.", "The area multiplier is |−3| = 3, so the new area is 3 × 5 = 15 square units.", "The negative sign means orientation is reversed.", "Since det(A) is nonzero, this square linear transformation is invertible in exact arithmetic."],
    "det(A) = −3; area 15 square units; orientation reversed; invertible", ["1 mark: signed determinant.", "1 mark: transformed area.", "1 mark: orientation.", "1 mark: invertibility with its reason."],
    "Do not replace the determinant with its absolute value until you calculate ordinary area; its sign carries separate information."),
  exercise("lost-direction", "2. Show the information loss · 4 marks",
    "For A = [[1, 2], [2, 4]], calculate Au and Av for u = [2, 1]ᵀ and v = [0, 2]ᵀ. Calculate A(u − v). Explain why the outputs cannot identify the original input uniquely.",
    "The difference u − v = [2, −1]ᵀ is a nonzero input direction. Check what happens to it using row dot products.",
    ["Au = [1 × 2 + 2 × 1, 2 × 2 + 4 × 1]ᵀ = [4, 8]ᵀ.", "Av = [1 × 0 + 2 × 2, 2 × 0 + 4 × 2]ᵀ = [4, 8]ᵀ.", "A(u − v) = A[2, −1]ᵀ = [2 − 2, 4 − 4]ᵀ = [0, 0]ᵀ.", "The nonzero difference disappears. The same output [4, 8] could have come from at least these two inputs, so a unique inverse is impossible."],
    "Au = Av = [4, 8]ᵀ; A(u − v) = [0, 0]ᵀ; input information is lost", ["1 mark: Au.", "1 mark: Av.", "1 mark: the lost nonzero difference.", "1 mark: explains failure of unique recovery."],
    "Collapse onto a line is not collapse onto the origin. Every output has the form [t, 2t], and t can be nonzero."),
  exercise("composition", "3. Follow area through two stages · 4 marks",
    "Let A = [[2, 0], [0, 3]] and B = [[0, 1], [1, 0]]. A patch has original area 2 square units. Calculate det(A), det(B), and det(AB). Find its final area and orientation under AB, where B acts first.",
    "B swaps coordinates without changing ordinary area. A then stretches both directions. The signed scale factors multiply.",
    ["det(A) = 6 and det(B) = −1.", "AB = [[0, 2], [3, 0]], so det(AB) = 0 − 2 × 3 = −6, agreeing with det(A)det(B).", "The final area is |−6| × 2 = 12 square units.", "One stage reverses orientation and the other preserves it, so the combined transformation reverses orientation."],
    "det(A) = 6; det(B) = −1; det(AB) = −6; final area 12; orientation reversed", ["1 mark: both individual determinants.", "1 mark: product determinant.", "1 mark: final area.", "1 mark: final orientation with a stage-based explanation."],
    "Multiply determinant scale factors for a composition; do not add them. The product identity does not mean AB and BA are the same matrix."),
];

export const determinantExam = [
  exercise("exam-geometry", "A. Interpret a transformed patch · 5 marks",
    "A = [[3, 1], [1, 2]] acts on column vectors. State the images of e₁ = [1, 0]ᵀ and e₂ = [0, 1]ᵀ. Calculate det(A), find the transformed area of a 4-square-unit patch, and interpret the sign and whether any input direction is lost.",
    "The images of the coordinate unit vectors are the columns. Their signed parallelogram area is ad − bc.",
    ["Ae₁ = [3, 1]ᵀ and Ae₂ = [1, 2]ᵀ: these are the two columns of A.", "det(A) = 3 × 2 − 1 × 1 = 5.", "The new ordinary area is |5| × 4 = 20 square units.", "The positive sign means orientation is preserved.", "A nonzero determinant means no nonzero input direction maps to zero; this square map permits unique recovery in exact arithmetic."],
    "Column images [3, 1]ᵀ and [1, 2]ᵀ; determinant 5; area 20; orientation preserved; no direction lost", ["1 mark: both column images.", "1 mark: determinant.", "1 mark: final area.", "1 mark: sign interpretation.", "1 mark: loss/invertibility interpretation."],
    "The columns give image directions. Matrix rows instead give the coefficients used to calculate each output coordinate."),
  exercise("exam-model", "B. Diagnose a redundant representation · 5 marks",
    "A two-feature linear map uses M = [[1, 2], [2, 4]] and y = Mx for column-shaped inputs. Calculate det(M) and y for x = [3, 1]ᵀ. Give a different input with the same output. Explain the relationship between the output coordinates, and whether this alone proves the map is useless for prediction.",
    "Both output coordinates depend on t = x₁ + 2x₂, with y₂ = 2t. Find another input giving t = 5.",
    ["det(M) = 1 × 4 − 2 × 2 = 0.", "For x = [3, 1]ᵀ, t = 3 + 2 = 5, so y = [5, 10]ᵀ.", "One alternative is x = [1, 2]ᵀ, which also gives t = 5 and y = [5, 10]ᵀ.", "Every output satisfies y₂ = 2y₁. The two output coordinates contain just one independent combination of the input features.", "The map loses information and cannot recover every input. It may still preserve what a prediction task needs; evaluate it against the target and appropriate held-out data rather than inferring accuracy from its determinant."],
    "det(M) = 0; output [5, 10]ᵀ; another input [1, 2]ᵀ; redundant output coordinates; usefulness requires task evaluation", ["1 mark: zero determinant.", "1 mark: output calculation.", "1 mark: a distinct input with the same output.", "1 mark: redundant-coordinate explanation.", "1 mark: distinguishes information loss from prediction quality."],
    "Two stored output coordinates do not guarantee two independent directions of information. Count the relationships among them."),
];

export function buildDeterminantTrial(steps) {
  const checks = determinantChecks;
  const additions = {
    start: {
      title: "What happens to an entire patch of space?",
      goal: "Calculate a 2 × 2 determinant, interpret area and orientation, and explain how a square linear map can lose information.",
      estimatedTime: "50–65 minutes with practice", mathLevel: "School geometry → ML reasoning",
      body: ["Matrix–vector multiplication told us where one point or direction goes. Now imagine drawing a square on a sheet and transforming every point on it. Does it get larger, turn inside out in orientation, or become so flat that its area disappears? The determinant answers this area question with one signed number.",
        "We will follow a unit square into a parallelogram. Its two sides will be the columns of a 2 × 2 matrix, so the picture connects directly to the row–column calculations you already know. Only after the area meaning is clear will we use the short formula ad − bc.",
        "A zero result is especially important: different two-dimensional inputs can merge into the same output. We will exhibit two such inputs and then connect this loss to a linear feature representation in ML.",
        "Try the live graph, the prediction activity, and the written exercises before revealing the answers. The mini-exam has a 10-mark guide. Optional depth explains why the determinant alone is not a reliable measure of numerical stability or model quality. We focus on 2 × 2 calculations; higher dimensions receive a short conceptual introduction."],
    },
    "everyday-story": {
      title: "Stretch a patch without guessing its new area",
      everyday: { title: "A square drawn on a coordinate sheet",
        setup: ["Start with a unit square whose corners are [0, 0], [1, 0], [1, 1], and [0, 1]. It has area 1 square unit. Transform its points using A = [[2, 1], [0, 3]]. There is no translation: the origin stays at the origin.",
          "The horizontal unit direction [1, 0] becomes [2, 0], and the vertical unit direction [0, 1] becomes [1, 3]. The remaining corner [1, 1] becomes [3, 3]. The new patch is a parallelogram with a horizontal base of length 2 and perpendicular height 3."],
        quantities: [{ label: "Original area", value: "1 square unit", meaning: "Area of the coordinate unit square." }, { label: "Image side directions", value: "[2, 0] and [1, 3]", meaning: "The columns of A: the images of the two coordinate unit vectors." }, { label: "Base and perpendicular height", value: "2 and 3", meaning: "Their product gives the ordinary area of this parallelogram." }],
        walkthrough: [{ action: "Calculate Ae₁ = [2, 0] and Ae₂ = [1, 3].", reason: "The two columns tell us where the original unit sides go." }, { action: "Calculate area = base × perpendicular height = 2 × 3 = 6.", reason: "Use height perpendicular to the base, not the slanted side length √10." }, { action: "A patch that originally covered 4 square units now covers 6 × 4 = 24.", reason: "The same linear transformation applies the same area scale to the whole patch." }],
        takeaway: "The determinant here is +6: a sixfold area scale with orientation preserved. The sideways slant changes the shape, but the perpendicular height is what matters for its area.",
      }, check: checks[0],
    },
    "plain-idea": {
      title: "One number for scale, one sign for orientation",
      body: [`For ${math("A=\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}")}, the determinant is ${math("\\det(A)=ad-bc")}. The entries a, b are the top row; c, d are the bottom row. This scalar is the signed area of the parallelogram formed by columns [a, c] and [b, d].`,
        `The ordinary area scale is ${math("|\\det(A)|")}. Multiply an original area by that absolute value. A negative determinant does not create negative ordinary area; it records an orientation reversal.`,
        "Orientation describes the order of two directions. The original first unit direction points right and the second points up: turning from the first to the second is counterclockwise. For a positive determinant their images keep that orientation; for a negative determinant they reverse it. If the directions become collinear, there is no two-dimensional orientation or area left.",
        "A nonzero determinant means the two image columns still span a genuine area. A zero determinant means they lie on one line, or both vanish. The image has lost at least one independent direction; it can be a line or a single point.",
        "Use the live graph below to change each matrix entry. Watch the two column directions and the patch, then check the signed scale. A shear may change the shape while preserving area; a coordinate swap preserves area while reversing orientation."],
      vocabulary: [{ id: "determinant", name: "determinant", definition: "A signed volume scale for a square linear transformation; in two dimensions it measures signed area scale.", analogy: "A measure of how much a whole patch expands or collapses", example: "diag(2, 3) has determinant 6 and multiplies ordinary area by 6.", nonExample: "Adding every matrix entry is not a determinant and does not measure its area scale." }],
      reading: [{ title: "Four cases worth knowing", paragraphs: [
        "Identity [[1, 0], [0, 1]] has determinant 1 and changes nothing. Shear [[1, 2], [0, 1]] also has determinant 1, but sends [0, 1] to [2, 1]. Area preservation does not establish length preservation or identity.",
        "Coordinate swap [[0, 1], [1, 0]] has determinant −1: area is unchanged and orientation is reversed. Compression [[1, 0], [0, 0.5]] has determinant 0.5: area halves, but no direction disappears entirely.",
        "The matrix [[1, 2], [2, 4]] has determinant zero because its second column is twice its first. Its outputs lie on the line y₂ = 2y₁. The zero matrix also has determinant zero, but all its outputs are the origin. Zero determinant covers both kinds of collapse.",
      ] }], check: checks[1],
    },
    "worked-example": {
      title: "Calculate the determinant, then interpret it",
      body: ["Separate the arithmetic from the interpretation. First preserve the signs in ad − bc. Then use the absolute value for ordinary area and the sign for orientation. Keeping these two jobs separate prevents the common mistake of reporting a negative area."],
      example: { title: "A skewed patch with determinant five", prompt: "For A = [[2, 1], [1, 3]], calculate the determinant and transform an area of 3 square units.",
        steps: ["Read the entries by row: a = 2, b = 1, c = 1, d = 3.", "Calculate ad = 2 × 3 = 6 and bc = 1 × 1 = 1.", "Subtract: det(A) = ad − bc = 6 − 1 = 5.", "The area multiplier is |5| = 5. The original area 3 becomes 5 × 3 = 15 square units.", "The determinant is positive, so orientation is preserved. It is nonzero, so the square map has not lost a direction and is invertible in exact arithmetic."],
        answer: "det(A) = 5; new area 15 square units; orientation preserved", realWorldMeaning: "The unit sides become [2, 1] and [1, 3]. They are slanted but still span a parallelogram with area 5. For slanted sides, their lengths alone do not give the area: their angle matters too." },
      activity: "determinant-prediction", check: checks[2],
      reading: [{ title: "What collapse actually loses", paragraphs: [
        "For A = [[1, 2], [2, 4]], write an output as [x₁ + 2x₂, 2x₁ + 4x₂] = [t, 2t]. Two coordinates are stored, but one is always twice the other. The output only retains the combination t = x₁ + 2x₂.",
        "The inputs u = [2, 1] and v = [0, 2] both have t = 4, so Au = Av = [4, 8]. Their difference [2, −1] is nonzero, yet A[2, −1] = [0, 0]. Moving an input by any multiple of that lost direction does not change the output.",
        "This is why an inverse cannot recover every original input: one output would need to map back to several different inputs. A square matrix with determinant zero is called singular. A square matrix with nonzero determinant is nonsingular and has an inverse in exact arithmetic. Computing and using inverses is the next lesson.",
      ] }],
    },
    "your-turn": { title: "Your turn: area, lost directions, and composition", body: ["Show ad and bc separately when entries are signed. For the collapse question, calculate the two outputs rather than relying only on the determinant. For the composition question, track which stage reverses orientation."], exercises: determinantPractice, check: checks[3] },
    "math-to-ml": {
      title: "Two output coordinates can hold just one direction",
      body: ["Consider a two-feature linear representation y = Mx using column-shaped input x and M = [[1, 2], [2, 4]]. It looks like a two-input, two-output layer. But its second output is always twice its first, so it keeps only one independent combination of the original features.",
        "This is an information-loss question. If a target depends only on the retained combination, the representation may still help predict it. If the target needs distinctions along the lost direction, later processing of these outputs cannot recover those distinctions without additional inputs. A determinant does not measure classification accuracy."],
      notation: { expression: "det(A) = ad − bc; new area = absolute determinant × original area", latex: String.raw`\det\!\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc,\qquad S_{\mathrm{new}}=|\det(A)|S_{\mathrm{old}}`, readAs: "For a two-by-two matrix, the determinant is a times d minus b times c. New ordinary area equals the absolute determinant times the old area.", symbols: [["A", "A real 2 × 2 matrix acting on the whole two-dimensional input."], ["a,b,c,d", "Its entries read across the first row, then across the second row."], ["\\det(A)", "The signed area scale: zero means collapse; a nonzero sign specifies orientation."], ["|\\det(A)|", "The nonnegative multiplier for ordinary area."], ["S_{\\mathrm{old}},S_{\\mathrm{new}}", "The original and transformed ordinary areas, distinct from the signed scale."]] },
      mlBridge: { task: "Compare x = [3, 1]ᵀ and x′ = [1, 2]ᵀ under the same two-input map y = Mx. The weights are illustrative rather than trained coefficients.",
        terms: [{ id: "linear-map", name: "linear feature map", definition: "A matrix rule that forms output coordinates as weighted sums of input features.", lessonId: "matrix-vector-multiplication", state: "review" }, { id: "lost-direction", name: "lost input direction", definition: "A nonzero change in the input that produces no change in the output.", lessonId: "rank-column-null", state: "preview" }],
        mapping: [{ math: "M: 2 × 2", ml: "Two input features and two stored output coordinates in this column-input layout." }, { math: "det(M) = 0", ml: "The full two-dimensional input cannot always be recovered." }, { math: "y₂ = 2y₁", ml: "The second output repeats the same information at twice the scale." }],
        walkthrough: [{ action: "Mx = [3 + 2 × 1, 2 × 3 + 4 × 1]ᵀ = [5, 10]ᵀ.", reason: "Calculate one row dot product per output coordinate." }, { action: "Mx′ = [1 + 2 × 2, 2 × 1 + 4 × 2]ᵀ = [5, 10]ᵀ.", reason: "The distinct observations agree on the retained combination x₁ + 2x₂." }, { action: "Their difference is [2, −1]ᵀ and M[2, −1]ᵀ = [0, 0]ᵀ.", reason: "This exhibits the lost direction, rather than merely labelling the matrix singular." }],
        takeaway: "Two stored outputs do not guarantee two independent directions. The determinant detects full-dimensional collapse for this square linear map; whether that loss matters depends on the prediction task and evaluation data.",
      }, check: checks[4],
      reading: [{ title: "Products and transposes: connect the previous lessons", paragraphs: [
        `For compatible square matrices, ${math("\\det(AB)=\\det(A)\\det(B)")}. The first transformation scales signed area, then the second scales it again. Two orientation reversals give a positive combined sign. This determinant identity does not make the two matrix orders equal.`,
        `Transposing preserves the determinant: ${math("\\det(A^{\\mathsf T})=\\det(A)")}. In 2 × 2, the transpose swaps b and c, leaving ad − cb equal to ad − bc. This does not mean the transposed matrix moves each vector the same way.`,
        "The determinant is defined for square matrices. For an n × n map it describes signed n-dimensional volume scale; our ad − bc formula applies only to 2 × 2. A rectangular dataset such as the 3 × 2 student marks table has no ordinary determinant. Rectangular maps can still lose information, but we need rank and related tools to analyse them.",
        "In the earlier samples-by-features convention, a batch of row-shaped inputs uses X Mᵀ to implement this same column-input rule for every observation. The transpose handles the layout; the underlying loss remains. Biases translate outputs and do not restore a lost distinction: equal weighted outputs remain equal after adding the same bias.",
      ] }, { title: "Optional ML depth: determinant and numerical stability", optional: true, paragraphs: [
        "Nonzero determinant establishes invertibility in exact arithmetic. It does not tell us how sensitive recovery is to small measurement or rounding errors. For A = diag(1, 0.001), the second coordinate is compressed by 1000; recovering it multiplies an output error by 1000. A direction can be strongly compressed without vanishing exactly.",
        "Even determinant 1 can hide extreme directional imbalance: diag(1000000, 0.000001) stretches one direction a millionfold and compresses the other a millionfold. Their area scales cancel. In contrast, 0.01 times the identity shrinks both directions equally, giving a small determinant 0.0001 without the same directional imbalance. Units and overall scale also affect the determinant's magnitude.",
        "Numerical work uses quantities such as singular values and condition numbers to study directional scales and sensitivity. Do not choose a universal 'small determinant' threshold as a complete test for numerical trouble. We will introduce these tools later; here, distinguish exact loss, strong compression, and task usefulness.",
      ] }],
    },
    recap: { title: "A short exam: explain the geometry and the loss", body: ["Allow about 12–15 minutes for this 10-mark topic practice set. Include the signed determinant, ordinary area when asked, and a sentence explaining the output geometry. For information loss, show two distinct inputs or a nonzero input direction that disappears.",
      "You are ready to move on when you can calculate ad − bc, separate area from orientation, distinguish line collapse from point collapse, and explain why a singular square map cannot uniquely recover all inputs. You should also know what determinant 1 and determinant zero do not establish about a model."], exercises: determinantExam, recapQuestions: [checks[1], checks[2], checks[4]],
      misconception: { wrong: "Determinant zero means every output is zero, and a negative determinant means negative area.", correction: "Zero determinant means at least one direction is lost; outputs may still lie on a nonzero line. Ordinary area uses the absolute determinant, while the sign describes orientation." },
      reading: [{ title: "Next: inverses and systems", paragraphs: ["Next we will recover unknown inputs when a square transformation has kept all its directions. We will connect the inverse to solving equations, and see why the zero-determinant example cannot offer a unique solution for every output."] }],
    },
  };
  return steps.map((step) => ({ ...step, ...additions[step.id] }));
}
