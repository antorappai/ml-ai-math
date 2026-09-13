import { sample, topic } from "../phase1Helpers.js";

const C = "foundations";

export const foundationLessons = [
  topic({
    id: "numbers-signs",
    chapterId: C,
    order: 1,
    title: "Numbers, Signs & Order of Operations",
    term: "number",
    definition: "A quantity used to count, measure, or locate a position on a number line.",
    analogy: "A position on a road where zero is the town centre and the sign tells you which direction you travelled",
    termExample: "-3 means three units below or to the left of zero.",
    nonExample: "A minus sign by itself is an operation or direction marker, not a complete quantity.",
    plain: "Numbers tell us size. Signs tell us direction relative to zero. Order of operations tells us which calculation happens first.",
    realTitle: "Your bank account goes below zero",
    realBody: "You have 50 in your account, then a payment of 70 goes through. Your balance becomes -20. The 20 tells us the size of the amount; the negative sign tells us that we are now below zero and owe money.",
    ml: "Weights, feature values, errors, gradients, and updates can be positive or negative. The sign often tells a model whether a quantity pushes a result up or down.",
    wrong: "Negative always means bad and positive always means good.",
    correction: "A sign describes position or direction. Whether that direction is desirable depends on the situation.",
    samples: [
      sample("Follow a temperature drop", "It is 4°C in the morning and -3°C at night. How much did the temperature change?", ["Use final minus initial: -3 - 4.", "From 4 to 0 is a drop of 4.", "From 0 to -3 is another drop of 3."], "-7°C", "The negative result tells us the temperature moved downward by seven degrees."),
      sample("Why operation order matters", "A café bill is 2 + 3 × 4. Evaluate it correctly.", ["Multiplication describes three groups of four, so calculate it first.", "3×4=12.", "Then add the remaining 2."], "14", "If we ignored the order and added first, we would describe a different calculation."),
      sample("Read the direction of a model weight", "A model feature has value 5 and weight -2. What contribution does that feature make to the score?", ["Multiply the feature value by its weight.", "5×(-2)=-10.", "Read the sign as direction."], "-10", "This feature pushes the model score downward by ten units; the negative sign carries meaning, not just arithmetic.")
    ]
  }),

  topic({
    id: "fractions-ratios-percentages",
    chapterId: C,
    order: 2,
    title: "Fractions, Ratios, Percentages & Decimals",
    prerequisites: ["numbers-signs"],
    requiredTermIds: ["numbers-signs"],
    term: "fraction",
    definition: "A number describing some equal parts of a whole, written as numerator divided by denominator.",
    analogy: "Several equal slices taken from the same pizza",
    termExample: "3/4 means three of four equal parts and is the same quantity as 0.75 or 75%.",
    nonExample: "Three pieces taken from pizzas cut into different-sized pieces do not automatically represent 3/4.",
    plain: "Fractions, decimals, ratios, and percentages are different ways to describe the same relative amount.",
    realTitle: "Twenty students out of twenty-five joined the trip",
    realBody: "If 20 of 25 students join a trip, we can describe the same participation level as 20/25, 4/5, 0.8, or 80%. The notation changes; the proportion does not.",
    ml: "Probabilities, accuracy, train-test splits, class proportions, and learning rates are all ratios expressed in different forms.",
    wrong: "A larger denominator always means a larger fraction.",
    correction: "With the same numerator, a larger positive denominator means the whole was split into more, smaller pieces, so the fraction is smaller.",
    samples: [
      sample("Describe the same proportion three ways", "20 of 25 students joined a trip. Write the participation as a fraction, decimal, and percentage.", ["Start with 20/25.", "Divide 20 by 25 to get 0.8.", "Multiply by 100 to get 80%."], "20/25 = 0.8 = 80%", "These are three notations for the same relative amount."),
      sample("Take a percentage of a whole", "A dataset has 200 rows and 20% should be kept for testing. How many rows is that?", ["Convert 20% to 0.20.", "Multiply the whole by the proportion: 200×0.20."], "40 rows", "A percentage becomes useful when we turn it back into a count from a known total."),
      sample("Read accuracy as a ratio", "A classifier is correct on 87 of 100 examples. What is its accuracy?", ["Accuracy is correct predictions divided by total predictions.", "87/100=0.87.", "Convert 0.87 to a percentage."], "87%", "Accuracy is a proportion of correct outcomes, not just the number 87 by itself.")
    ]
  }),

  topic({
    id: "powers-roots-scientific",
    chapterId: C,
    order: 3,
    title: "Powers, Roots & Scientific Notation",
    prerequisites: ["fractions-ratios-percentages"],
    requiredTermIds: ["numbers-signs", "fractions-ratios-percentages"],
    term: "exponent",
    definition: "A raised number that tells how many copies of a base are multiplied together.",
    analogy: "A compact repeat-multiplication instruction",
    termExample: "2³ means 2×2×2=8.",
    nonExample: "2×3=6 is ordinary multiplication; it is not what 2³ means.",
    plain: "Powers compress repeated multiplication, roots undo powers, and scientific notation makes very large or very small scales readable.",
    realTitle: "Double the width and height of an image",
    realBody: "A 1000×1000 image has one million pixels. Doubling both dimensions to 2000×2000 does not double the number of pixels; it gives four million. Area-like quantities grow with powers.",
    ml: "Squared errors, Euclidean distance, variance, tiny learning rates, and huge parameter counts all rely on powers, roots, or scientific notation.",
    wrong: "The exponent is multiplied by the base.",
    correction: "The exponent tells us how many copies of the base are multiplied together: 3² means 3×3, not 3×2.",
    samples: [
      sample("See why scale can grow fast", "A square image is 1000 pixels by 1000 pixels. How many pixels does it contain?", ["Area-like counts multiply width by height.", "1000×1000=1,000,000.", "Recognize this as 10⁶."], "1,000,000 pixels", "Powers appear naturally when more than one dimension grows together."),
      sample("Undo a square", "Find the positive square root of 49.", ["Ask which positive number multiplied by itself gives 49.", "7×7=49."], "7", "A square root reverses squaring and returns us to the original scale."),
      sample("Read a tiny learning rate", "Write 0.0001 in scientific notation.", ["Move the decimal four places right to make 1.", "Because the original number is smaller than 1, use a negative exponent."], "1×10⁻⁴", "Scientific notation lets us see immediately that the learning rate is very small.")
    ]
  }),

  topic({
    id: "variables-expressions",
    chapterId: C,
    order: 4,
    title: "Variables & Algebraic Expressions",
    prerequisites: ["powers-roots-scientific"],
    requiredTermIds: ["numbers-signs"],
    term: "variable",
    definition: "A symbol that stands for a value that may be unknown or allowed to change.",
    analogy: "A labelled container whose value can change while the rule around it stays the same",
    termExample: "In 3x+5, x is the changing quantity, 3 is its coefficient, and 5 is a constant.",
    nonExample: "A fixed number that never changes within the problem is a constant rather than the variable we are tracking.",
    plain: "Algebra lets us name changing quantities so one rule can describe many different cases.",
    realTitle: "A taxi fare that works for every journey",
    realBody: "Suppose a taxi charges 5 to start and 3 for every kilometre. Instead of writing a new calculation for every trip, we write 3x+5, where x is the number of kilometres.",
    ml: "Features, weights, biases, predictions, and losses are represented by variables so the same model equation can work for every data example.",
    wrong: "Letters in algebra are decorative abbreviations that can be ignored.",
    correction: "Every variable stands for a defined quantity. Knowing what it represents is more important than manipulating the symbol quickly.",
    samples: [
      sample("Use one rule for a real trip", "A taxi charges 5 to start and 3 per kilometre. What does a 4 km trip cost?", ["Use the rule 3x+5.", "Substitute x=4.", "Compute 3×4+5."], "17", "The variable lets the same rule work for any journey length."),
      sample("Collect like quantities", "Simplify 2x+3x-4.", ["2x and 3x measure the same variable quantity.", "Add their coefficients: 2+3=5.", "Keep the separate constant -4."], "5x-4", "Only terms describing the same variable power can be combined directly."),
      sample("Read a model score", "For z=wx+b, use w=2, x=-3, and b=1.", ["Multiply the feature by its weight: 2×(-3)=-6.", "Add the bias 1."], "z=-5", "The same algebra used for taxi fares also describes how model inputs contribute to a score.")
    ]
  }),

  topic({
    id: "equations-inequalities",
    chapterId: C,
    order: 5,
    title: "Equations & Inequalities",
    prerequisites: ["variables-expressions"],
    requiredTermIds: ["variables-expressions"],
    term: "equation",
    definition: "A statement that two expressions have the same value.",
    analogy: "A balanced scale: whatever you do to one side must be done to the other",
    termExample: "3x+5=17 is true when x=4.",
    nonExample: "3x+5 without an equals sign is an expression, not an equation.",
    plain: "An equation asks for values that make two sides equal. An inequality asks for values that stay above, below, or within a boundary.",
    realTitle: "How far can you travel without exceeding your budget?",
    realBody: "You have 35 for a taxi. The ride costs 5 to start and 3 per kilometre. The condition 3x+5≤35 asks for every journey length you can afford, not one exact distance.",
    ml: "Decision thresholds, optimization constraints, class margins, and stopping conditions all rely on equations or inequalities.",
    wrong: "A term changes sign just because we move it across the equals sign.",
    correction: "The sign changes because we apply the same inverse operation to both sides and simplify.",
    samples: [
      sample("Solve a balance", "Solve 3x+5=17.", ["Subtract 5 from both sides so equality is preserved: 3x=12.", "Divide both sides by 3."], "x=4", "Solving is really a sequence of balanced operations, not moving symbols by magic."),
      sample("Find every affordable journey", "A taxi costs 5 plus 3 per kilometre and you have 35. Solve 3x+5≤35.", ["Subtract 5 from both sides: 3x≤30.", "Divide by positive 3, so the inequality direction stays the same."], "x≤10", "Any journey up to ten kilometres stays within the budget."),
      sample("Turn probability into a decision", "A classifier predicts class 1 when p≥0.5. What class is chosen when p=0.42?", ["Compare 0.42 with the boundary 0.5.", "0.42 is below the threshold."], "Class 0", "The model may produce a probability first; an inequality then converts it into a decision.")
    ]
  }),

  topic({
    id: "functions-domain-range",
    chapterId: C,
    order: 6,
    title: "Functions, Inputs, Outputs, Domain & Range",
    prerequisites: ["equations-inequalities"],
    requiredTermIds: ["variables-expressions", "equations-inequalities"],
    term: "function",
    definition: "A rule that assigns exactly one output to each allowed input.",
    analogy: "A machine with a consistent recipe: give it an allowed input and it returns one result",
    termExample: "f(x)=2x+1 sends input 3 to output 7.",
    nonExample: "A rule that gives two unrelated outputs for the same input without another condition is not a well-defined function.",
    plain: "A function is an input-output rule. The domain tells us which inputs are allowed; the range describes the outputs that can result.",
    realTitle: "Currency conversion is a function",
    realBody: "If one dollar converts to a fixed number of rupees at a given rate, every allowed dollar amount maps to one converted amount. The input changes; the conversion rule stays the same.",
    ml: "A machine-learning model is a function: features go in, and a prediction, probability, embedding, or score comes out.",
    wrong: "f(x) means f multiplied by x.",
    correction: "f(x) means the output produced by function f when the input is x.",
    formulas: ["linear-function"],
    samples: [
      sample("Run an input through a rule", "For f(x)=2x+1, find f(3).", ["Replace x with the input 3.", "Compute 2×3+1."], "7", "The function is the rule; 3 is one input and 7 is the corresponding output."),
      sample("Respect the allowed inputs", "For g(x)=1/x, is x=0 in the domain?", ["Try the proposed input mentally.", "It would require division by zero, which is undefined."], "No; x=0 is excluded", "A formula may exist, but not every imaginable input is necessarily allowed."),
      sample("See a model as a function", "A model receives four feature values and returns one probability. Describe its input and output.", ["Count the supplied feature values.", "Count the returned prediction value."], "4 inputs → 1 output", "Once you understand functions, a neural network is no longer mysterious at the interface level: it is still an input-output rule.")
    ]
  }),

  topic({
    id: "graphs-slope-intercept",
    chapterId: C,
    order: 7,
    title: "Coordinates, Graphs, Slope & Intercept",
    prerequisites: ["functions-domain-range"],
    requiredTermIds: ["functions-domain-range"],
    term: "slope",
    definition: "The change in vertical output divided by the corresponding change in horizontal input.",
    analogy: "The steepness of a road measured as rise or fall for each unit you move forward",
    termExample: "A slope of 3 means the output rises by 3 when the input rises by 1.",
    nonExample: "The y-intercept is a starting value, not the rate of change.",
    plain: "A graph turns a function into a picture. Slope tells us how fast and in which direction the output changes; the intercept tells us where the line starts when input is zero.",
    realTitle: "Hourly pay creates a straight-line story",
    realBody: "Suppose you receive a fixed 20 bonus plus 10 for every hour worked. The bonus is the intercept; the hourly wage is the slope. The graph lets you see both at once.",
    ml: "Linear-regression coefficients behave like slopes and the bias behaves like an intercept. Learning curves also use graphs to reveal how model behaviour changes.",
    wrong: "Slope is the height of a line.",
    correction: "Slope is a ratio of changes: vertical change divided by horizontal change.",
    formulas: ["linear-function"],
    samples: [
      sample("Read the rate from two points", "A pay graph passes through (1,30) and (3,50). What is the slope?", ["Output change is 50-30=20.", "Input change is 3-1=2.", "Divide 20 by 2."], "10", "Pay increases by ten units for every extra hour worked."),
      sample("Find the starting value", "For y=10x+20, what is the y-intercept?", ["The intercept is the output when x=0.", "Compute y=10(0)+20."], "20", "The line starts at 20 before any hours are worked."),
      sample("Interpret a regression coefficient", "A house-price model has slope -5 for distance from the city centre. What does that mean?", ["Read the sign: negative means the prediction falls as distance increases.", "Read the size: five target units per one distance unit."], "Each extra distance unit lowers predicted price by 5", "A regression coefficient is a rate of change, so its units and sign matter.")
    ]
  }),

  topic({
    id: "exponents-logarithms",
    chapterId: C,
    order: 8,
    title: "Exponents & Logarithms",
    prerequisites: ["powers-roots-scientific", "functions-domain-range"],
    requiredTermIds: ["powers-roots-scientific", "functions-domain-range"],
    term: "logarithm",
    definition: "The exponent needed on a chosen base to produce a positive number.",
    analogy: "Instead of asking 'what does repeated multiplication produce?', ask 'how many multiplication steps produced this value?'",
    termExample: "log₂(8)=3 because 2³=8.",
    nonExample: "log(0) is not a finite real number.",
    plain: "Exponentials build values through repeated multiplication. Logarithms reverse the question and recover the exponent.",
    realTitle: "How many times did the amount double?",
    realBody: "If an amount grows from 1 to 8 by repeatedly doubling, the exponential story is 2³=8. The logarithm asks the reverse question: how many doublings were needed? The answer is 3.",
    ml: "Log-likelihood and cross-entropy use logarithms because logs turn probability products into sums and make very small probabilities strongly visible in the loss.",
    wrong: "log(a+b)=log(a)+log(b).",
    correction: "Logarithms split products, not ordinary sums: log(ab)=log(a)+log(b).",
    formulas: ["logarithm"],
    samples: [
      sample("Reverse repeated doubling", "An amount doubles from 1 until it reaches 32. How many doublings occurred?", ["Write the reverse question as log₂(32).", "Ask 2 to what power equals 32.", "2×2×2×2×2=32."], "5", "A logarithm returns the exponent that generated the observed value."),
      sample("Undo a logarithm", "If ln(x)=2, solve for x.", ["Natural log uses base e.", "Undo the logarithm by exponentiating both sides with base e."], "x=e²", "Logarithms and exponentials are inverse operations."),
      sample("Why confident mistakes cost more", "Which produces the larger value of -log(p): p=0.9 or p=0.01?", ["A tiny positive probability has a very negative logarithm.", "Negating that logarithm makes a large positive penalty."], "p=0.01", "Cross-entropy punishes a model heavily when it assigns a tiny probability to the correct answer.")
    ]
  }),

  topic({
    id: "summation-subscripts-sets",
    chapterId: C,
    order: 9,
    title: "Summation, Subscripts, Sets & Notation",
    prerequisites: ["variables-expressions", "functions-domain-range"],
    requiredTermIds: ["variables-expressions"],
    term: "summation",
    definition: "A compact instruction to add a sequence of indexed terms.",
    analogy: "A loop that visits numbered items one by one and adds each value to a running total",
    termExample: "Σ from i=1 to 3 of xᵢ means x₁+x₂+x₃.",
    nonExample: "The sigma symbol Σ does not mean multiply all the terms.",
    plain: "Subscripts label positions, sets collect objects, and sigma notation compresses repeated addition into one readable instruction.",
    realTitle: "A receipt is already a summation",
    realBody: "When a receipt totals five line items, you are effectively looping through item 1, item 2, and so on, adding each price. Sigma notation is the mathematical shorthand for that same repeated action.",
    ml: "Loss functions sum errors across examples, probabilities sum over possible outcomes, and matrix calculations repeatedly sum matching components.",
    wrong: "A subscript is another kind of exponent.",
    correction: "A subscript usually labels which item or coordinate we mean; an exponent tells us about a power.",
    formulas: ["summation"],
    samples: [
      sample("Expand the shorthand", "Expand Σᵢ₌₁³ xᵢ.", ["Start at i=1.", "Write one term for i=1, i=2, and i=3.", "Join the terms with addition."], "x₁+x₂+x₃", "The lower and upper limits tell us exactly which indexed terms to include."),
      sample("Total numbered items", "Evaluate Σᵢ₌₁⁴ i.", ["Generate the values 1+2+3+4.", "Add them."], "10", "The index can itself be the quantity being added."),
      sample("Decode mean loss", "Explain (1/n)Σᵢ Lᵢ.", ["Lᵢ is the loss for example i.", "Σ adds the losses across the examples.", "Dividing by n converts the total into an average."], "Mean loss across n examples", "Once sigma notation is decoded, many ML formulas are just familiar loops written compactly.")
    ]
  })
];
