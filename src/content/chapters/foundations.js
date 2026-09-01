import { check, codeLab, progressiveLesson } from "../lessonBuilder.js";

export const foundationLessons = [
  progressiveLesson({
    id: "math-language",
    chapterId: "foundations",
    order: 1,
    title: "Math Language Survival Kit",
    subtitle: "Read symbols, indices, powers, roots, fractions, sets, and summations without freezing.",
    tags: ["notation", "prerequisite"],
    scenario: {
      title: "A formula is a compressed instruction",
      body: "A recipe uses symbols like cups and teaspoons to compress a process. Mathematics does the same with variables and operators.",
      mlParallel: "ML papers compress datasets, parameters, and repeated operations into notation. Decoding the symbols is the first skill."
    },
    mlConnection: "Every model equation uses indices, sums, powers, vectors, and function notation.",
    basics: {
      summary: "Learn the signs before trying to solve the equation.",
      concepts: ["Variables are named quantities.", "Subscripts identify positions; exponents describe repeated multiplication.", "Fractions mean division and brackets control order."],
      formulaIds: ["summation"],
      example: { title: "Read a sum", prompt: "Expand the sum of x_i from i=1 to 3.", steps: ["Set i to 1, then 2, then 3.", "Write x_1+x_2+x_3."], answer: "x_1+x_2+x_3", interpretation: "Sigma is a compact loop." },
      pythonLab: codeLab({ title: "Math symbols as Python", goal: "Connect variables and a loop to summation notation.", code: "values = [2, 4, 6]\ntotal = sum(values)\nprint(total)", output: "12", explanation: "Python's sum performs the same repeated addition as sigma notation.", hiddenTests: "assert total == 12\nassert len(values) == 3" }),
      questions: [check("math-language-b1", "What does x_3 mean?", ["x cubed", "The third indexed x value", "Three times x", "x divided by 3"], 1, "A subscript labels a position; it is not an exponent.", "notation")],
      examNotes: ["Circle the operator, limits, and indexed quantity before calculating."]
    },
    core: {
      summary: "Translate between symbolic expressions and ordinary language.",
      concepts: ["The equals sign states equality, not an instruction to calculate.", "Absolute value measures distance from zero.", "Set notation describes collections and conditions."],
      formulaIds: ["summation", "logarithm"],
      example: { title: "Decode indexed notation", prompt: "Evaluate the sum of i squared from i=1 to 3.", steps: ["Substitute 1, 2, and 3.", "Compute 1+4+9."], answer: "14", interpretation: "The index controls which terms are generated." },
      questions: [check("math-language-c1", "What does the vertical bar in P(A|B) mean?", ["Divide A by B", "A or B", "A given B", "A excludes B"], 2, "The bar introduces a condition: work under the information that B occurred.", "notation")],
      examNotes: ["Rewrite unfamiliar notation in words before manipulating it."]
    },
    advanced: {
      summary: "Read nested notation used in optimization and probability.",
      concepts: ["A function can accept vectors and return scalars or vectors.", "Superscripts may label layers rather than powers.", "Quantifiers and conditions define when a statement is valid."],
      formulaIds: ["summation", "gradient"],
      example: { title: "Read a gradient coordinate", prompt: "Explain partial L over partial w_j.", steps: ["L is the loss.", "w_j is weight j.", "The expression measures local loss sensitivity to that weight."], answer: "Sensitivity of loss to weight j", interpretation: "Derivative notation is a question about change." },
      questions: [
        check("math-language-a1", "In W^(2), what might the superscript mean in a neural network?", ["Always W squared", "The second layer", "Two divided by W", "A probability"], 1, "Layer superscripts often label position, so context matters.", "notation"),
        check("math-language-a2", "What does an index i usually do inside a summation?", ["Acts as a running position", "Makes every term negative", "Means infinity", "Changes addition to division"], 0, "The index takes each allowed position in turn and generates the terms to add.", "notation")
      ],
      examNotes: ["Do not assume every superscript is an exponent; inspect how the course defines it."]
    }
  }),
  progressiveLesson({
    id: "functions-graphs",
    chapterId: "foundations",
    order: 2,
    title: "Functions, Equations & Graphs",
    subtitle: "See equations as input-output rules and graphs as pictures of model behaviour.",
    prerequisites: ["math-language"],
    tags: ["functions", "graphs"],
    scenario: { title: "Taxi fare", body: "A taxi starts with a fixed fee and adds a constant charge per kilometre.", mlParallel: "A linear model combines feature contributions with a baseline in the same way." },
    mlConnection: "Prediction rules, activations, losses, and learning curves are all functions.",
    basics: {
      summary: "A function accepts an input and produces one defined output.",
      concepts: ["Domain means allowed inputs.", "Range means possible outputs.", "Slope is change in output divided by change in input."],
      formulaIds: ["linear-function"],
      example: { title: "Predict a fare", prompt: "Use f(x)=3x+5 for x=4.", steps: ["Multiply 3 by 4.", "Add 5."], answer: "17", interpretation: "Slope is cost per kilometre; intercept is the starting fee." },
      pythonLab: codeLab({ title: "Function in Python", goal: "Turn a mathematical rule into code.", code: "def fare(x):\n    return 3 * x + 5\n\nprint(fare(4))", output: "17", explanation: "The return line is the formula written as Python." }),
      questions: [check("functions-b1", "In f(x)=2x+7, what is 7?", ["Input", "Slope", "Intercept", "Output always"], 2, "Seven is the output when x=0.")],
      examNotes: ["Write slope and intercept before substituting numbers."]
    },
    core: {
      summary: "Compare linear, polynomial, exponential, and logarithmic shapes.",
      concepts: ["Nonlinear functions have changing slope.", "Inverse functions undo each other.", "Composition feeds one function into another."],
      formulaIds: ["linear-function", "logarithm"],
      example: { title: "Compose two rules", prompt: "If g(x)=2x and f(x)=x+1, find f(g(3)).", steps: ["Compute g(3)=6.", "Compute f(6)=7."], answer: "7", interpretation: "Order matters in composed model layers." },
      questions: [check("functions-c1", "Why are logarithms common in ML losses?", ["They make all values positive", "They convert products into sums and strongly penalize tiny probabilities", "They remove data", "They always linearize a dataset"], 1, "Logs make likelihood products manageable and punish low correct-class probabilities.")],
      examNotes: ["For composition, work from the innermost function outward."]
    },
    advanced: {
      summary: "Use functions to reason about model families and transformations.",
      concepts: ["Piecewise functions use different rules in different regions.", "Monotonic functions preserve ordering.", "A model is a parameterized family of functions."],
      formulaIds: ["linear-function", "sigmoid", "relu"],
      example: { title: "Compare activations", prompt: "Compare ReLU and sigmoid at a large positive input.", steps: ["ReLU returns the input.", "Sigmoid approaches 1."], answer: "ReLU grows; sigmoid saturates", interpretation: "Function shape changes gradient flow." },
      questions: [check("functions-a1", "What does saturation mean for sigmoid?", ["The output grows without bound", "The curve becomes nearly flat and gradients become small", "The function is undefined", "The output becomes negative"], 1, "At large magnitude inputs, sigmoid is nearly flat.")],
      examNotes: ["Sketch rough shape, intercepts, and slope behaviour before algebra."]
    }
  }),
  progressiveLesson({
    id: "algebra-logs",
    chapterId: "foundations",
    order: 3,
    title: "Algebra, Powers & Logarithms",
    subtitle: "Manipulate the expressions that appear in probability, loss functions, and learning rules.",
    prerequisites: ["math-language", "functions-graphs"],
    tags: ["algebra", "logs"],
    scenario: { title: "Repeated growth", body: "Money growing by a percentage compounds through powers; finding elapsed time requires a logarithm.", mlParallel: "Likelihoods multiply, log-likelihoods add, and gradients differentiate powers." },
    mlConnection: "Exponents and logarithms power softmax, sigmoid, cross-entropy, Gaussian densities, and learning-rate schedules.",
    basics: {
      summary: "Use inverse operations to isolate unknowns.",
      concepts: ["Whatever operation is applied to one side must preserve equality.", "Negative exponents create reciprocals.", "Roots undo powers."],
      formulaIds: ["logarithm"],
      example: { title: "Solve a linear equation", prompt: "Solve 3x+5=17.", steps: ["Subtract 5.", "Divide by 3."], answer: "x=4", interpretation: "Reverse operations in reverse order." },
      questions: [check("algebra-b1", "What is x^(-1)?", ["-x", "1/x", "x-1", "zero"], 1, "A power of negative one means reciprocal.")],
      examNotes: ["Keep an equals sign on every algebra line."]
    },
    core: {
      summary: "Work confidently with exponent and logarithm rules.",
      concepts: ["Multiplying equal bases adds exponents.", "Log of a product becomes a sum.", "Natural log uses base e."],
      formulaIds: ["logarithm"],
      example: { title: "Solve an exponential equation", prompt: "Solve 2^x=8.", steps: ["Recognize 8=2^3.", "Match exponents."], answer: "x=3", interpretation: "A logarithm asks for this exponent directly." },
      questions: [check("algebra-c1", "Which identity is correct?", ["log(ab)=log a log b", "log(ab)=log a+log b", "log(a+b)=log a+log b", "log a=1/a"], 1, "Logarithms turn products into sums.")],
      examNotes: ["Log rules apply to products and powers, not ordinary sums."]
    },
    advanced: {
      summary: "Connect log identities to numerical stability and probabilistic objectives.",
      concepts: ["Products of many probabilities underflow numerically.", "Log-sum-exp stabilizes exponentials.", "Convexity of common losses affects optimization."],
      formulaIds: ["logarithm", "binary-cross-entropy", "softmax"],
      example: { title: "Log likelihood", prompt: "Why maximize sum log p_i instead of product p_i?", steps: ["Log converts the product to a sum.", "The ordering of solutions is preserved because log is increasing."], answer: "It is easier and numerically safer", interpretation: "The mathematics and computation align." },
      questions: [check("algebra-a1", "Why is log monotonicity useful for likelihood?", ["It changes the best parameters", "It preserves which probability product is largest", "It removes all errors", "It makes probabilities exceed one"], 1, "A strictly increasing transform preserves the maximizing argument.")],
      examNotes: ["State domain restrictions before simplifying logarithms."]
    }
  })
];
