import { check, codeLab, progressiveLesson } from "../lessonBuilder.js";

export const calculusLessons = [
  progressiveLesson({
    id: "derivatives-rates",
    chapterId: "calculus-optimization",
    order: 1,
    title: "Limits, Derivatives & Rates Of Change",
    subtitle: "Move from average change to the local slope used by learning algorithms.",
    prerequisites: ["functions-graphs", "algebra-logs"],
    tags: ["calculus", "derivatives"],
    scenario: { title: "Speed at one instant", body: "Average speed covers an interval; a speedometer estimates how fast you are moving right now.", mlParallel: "A derivative measures how model loss changes for a tiny parameter change." },
    mlConnection: "Optimization begins with local sensitivity: which direction changes the loss and by how much?",
    basics: {
      summary: "A derivative is local slope or instantaneous rate of change.",
      concepts: ["Average rate uses two points.", "A tangent slope is local.", "Limits describe approaching a value without jumping directly there."],
      formulaIds: ["derivative-definition"],
      example: { title: "Derivative sign", prompt: "A loss curve is falling as a parameter increases. What sign is the derivative?", steps: ["Increasing input lowers output.", "Change in output over change in input is negative."], answer: "Negative", interpretation: "A negative derivative means moving right locally reduces loss." },
      pythonLab: codeLab({ title: "Numerical derivative", goal: "Approximate a slope using a small change.", code: "def f(x):\n    return x ** 2\n\nx = 3.0\nh = 1e-5\napprox = (f(x + h) - f(x)) / h\nprint(round(approx, 3))", output: "6.0", explanation: "The numerical slope approaches the exact derivative 2x=6." }),
      questions: [check("derivative-b1", "What does a negative derivative mean locally?", ["The function is increasing", "The function is decreasing", "The input is negative", "The function is undefined"], 1, "Negative slope means output falls as input increases.")],
      examNotes: ["Interpret derivative sign before doing algebra."]
    },
    core: {
      summary: "Use derivative rules to differentiate common functions efficiently.",
      concepts: ["Power, product, quotient, and chain rules avoid rebuilding every limit.", "Critical points occur where derivative is zero or undefined.", "Second derivatives describe changing slope and curvature."],
      formulaIds: ["derivative-definition", "chain-rule"],
      example: { title: "Differentiate a composition", prompt: "Differentiate (3x+1)^2.", steps: ["Outer derivative is 2(3x+1).", "Inner derivative is 3.", "Multiply."], answer: "6(3x+1)", interpretation: "Chain rule passes sensitivity through the inner calculation." },
      questions: [check("derivative-c1", "For f(x)=x^2, where is f'(x)=0?", ["x=-2", "x=0", "x=1", "Everywhere"], 1, "f'(x)=2x, so the stationary point is zero.")],
      examNotes: ["Write the outer and inner functions explicitly for chain-rule questions."]
    },
    advanced: {
      summary: "Use curvature and approximation to reason about optimization.",
      concepts: ["A zero derivative is not automatically a minimum.", "Second derivative distinguishes local curvature in one dimension.", "Taylor approximation predicts nearby function behaviour."],
      formulaIds: ["derivative-definition", "gradient-descent"],
      example: { title: "Classify stationary points", prompt: "At x0, f'=0 and f''>0. What does that suggest?", steps: ["Slope is flat.", "Positive curvature bends upward."], answer: "A local minimum", interpretation: "Curvature adds information that the first derivative lacks." },
      questions: [check("derivative-a1", "Can f'(x)=0 occur at a maximum?", ["No", "Yes", "Only for linear functions", "Only if x is negative"], 1, "Both maxima and minima can have zero first derivative.")],
      examNotes: ["State whether your conclusion is local or global."]
    }
  }),
  progressiveLesson({
    id: "multivariable-gradients",
    chapterId: "calculus-optimization",
    order: 2,
    title: "Partial Derivatives, Gradients & Chain Rule",
    subtitle: "Differentiate functions with many inputs and follow sensitivity through a computation graph.",
    prerequisites: ["derivatives-rates", "vectors-geometry"],
    tags: ["gradient", "partial-derivatives", "backprop"],
    scenario: { title: "Adjusting a recipe", body: "Taste changes when sugar moves while salt stays fixed, and separately when salt moves while sugar stays fixed.", mlParallel: "A partial derivative isolates one parameter; the gradient collects all parameter sensitivities." },
    mlConnection: "Training a model means computing derivatives with respect to many parameters at once.",
    basics: {
      summary: "A partial derivative changes one variable while holding the others fixed.",
      concepts: ["Multivariable functions depend on several inputs.", "Each partial derivative asks one local question.", "The gradient stacks those answers into a vector."],
      formulaIds: ["gradient"],
      example: { title: "Find a gradient", prompt: "For f=x^2+y^2, find the gradient.", steps: ["Differentiate with respect to x: 2x.", "Differentiate with respect to y: 2y.", "Stack them."], answer: "(2x,2y)", interpretation: "At any point, this vector points uphill fastest." },
      pythonLab: codeLab({ title: "Gradient function", goal: "Translate partial derivatives into Python.", code: "def gradient(x, y):\n    return [2*x, 2*y]\n\nprint(gradient(3, 4))", output: "[6, 8]", explanation: "Each returned coordinate is one partial derivative." }),
      questions: [check("gradient-b1", "What does partial f / partial x hold fixed?", ["x", "Every variable except x", "Nothing", "The output only"], 1, "Only x varies; other input variables are treated as constants.")],
      examNotes: ["Name the variable that moves and the variables treated as constants."]
    },
    core: {
      summary: "Use multivariable chain rule through intermediate quantities.",
      concepts: ["Computational graphs expose dependency paths.", "Local derivatives multiply along a path.", "Contributions from multiple paths add."],
      formulaIds: ["gradient", "chain-rule"],
      example: { title: "Two-path sensitivity", prompt: "If L depends on w through two separate paths, how do contributions combine?", steps: ["Differentiate each path.", "Multiply local derivatives on each path.", "Add path contributions."], answer: "Sum the path derivatives", interpretation: "Backprop is chain rule organized efficiently." },
      questions: [check("gradient-c1", "What happens to local derivatives along one chain?", ["They add", "They multiply", "They are ignored", "They become probabilities"], 1, "Chain rule multiplies local sensitivities along a dependency path.")],
      examNotes: ["Multiply along paths; add across separate paths."]
    },
    advanced: {
      summary: "Reason about Jacobians, Hessians, directional derivatives, and gradient checking.",
      concepts: ["A Jacobian handles vector outputs.", "A Hessian contains second partial derivatives.", "Finite differences can check analytic gradients."],
      formulaIds: ["gradient", "derivative-definition", "chain-rule"],
      example: { title: "Directional derivative", prompt: "How do you measure change along unit direction u?", steps: ["Compute the gradient.", "Take dot product with u."], answer: "gradient dot u", interpretation: "The gradient contains slope information for every direction." },
      questions: [check("gradient-a1", "What object contains all second partial derivatives of a scalar function?", ["Gradient", "Hessian", "Eigenvector", "Softmax"], 1, "The Hessian is the matrix of second partial derivatives.")],
      examNotes: ["Check output shapes: scalar-to-vector gradient, vector-to-matrix Jacobian."]
    }
  }),
  progressiveLesson({
    id: "optimization-loss",
    chapterId: "calculus-optimization",
    order: 3,
    title: "Loss Functions & Optimization",
    subtitle: "Understand what learning minimizes and why update rules can succeed or fail.",
    prerequisites: ["multivariable-gradients"],
    tags: ["optimization", "loss", "gradient-descent"],
    scenario: { title: "Walking downhill in fog", body: "You cannot see the whole landscape, but the local slope tells which direction descends.", mlParallel: "Gradient-based optimizers use local loss information to update millions of parameters." },
    mlConnection: "Model training is an optimization problem over a chosen loss and parameter space.",
    projectIds: ["optimization-mini"],
    basics: {
      summary: "A loss converts model mistakes into a number to reduce.",
      concepts: ["Different tasks need different losses.", "Gradient gives direction; learning rate gives step size.", "One update does not finish training."],
      formulaIds: ["gradient-descent", "mse"],
      example: { title: "One update", prompt: "theta=4, gradient=2, eta=.1. Find next theta.", steps: ["Scale gradient: .2.", "Subtract from 4."], answer: "3.8", interpretation: "The parameter moves opposite the uphill direction." },
      pythonLab: codeLab({ title: "Gradient descent loop", goal: "Minimize f(x)=x^2.", code: "x = 4.0\nlr = 0.1\nfor _ in range(5):\n    grad = 2 * x\n    x = x - lr * grad\nprint(round(x, 4))", output: "1.3107", explanation: "Repeated updates move x toward the minimum at zero." }),
      questions: [check("optim-b1", "What does the learning rate control?", ["Gradient direction", "Step size", "Number of features", "Target labels"], 1, "The gradient determines direction; eta scales the step.")],
      examNotes: ["Always include the minus sign when minimizing."]
    },
    core: {
      summary: "Compare batch, stochastic, and mini-batch updates and diagnose learning-rate behaviour.",
      concepts: ["Mini-batches trade stable gradients for computational efficiency.", "Large learning rates can diverge.", "Small learning rates can train painfully slowly."],
      formulaIds: ["gradient-descent", "mse", "binary-cross-entropy"],
      example: { title: "Read a loss curve", prompt: "Loss oscillates and grows after each epoch. What is a likely cause?", steps: ["Updates overshoot repeatedly.", "Inspect learning rate and scaling."], answer: "Learning rate may be too large", interpretation: "Loss curves are optimization diagnostics." },
      questions: [check("optim-c1", "Why use mini-batches?", ["They remove all noise", "They balance compute efficiency and gradient quality", "They eliminate learning rate", "They guarantee global optimum"], 1, "Mini-batches provide practical approximate gradients.")],
      examNotes: ["Distinguish objective choice from optimizer choice."]
    },
    advanced: {
      summary: "Understand convexity intuition, momentum, adaptive rates, and saddle points.",
      concepts: ["Convex objectives have no bad local minima.", "Momentum smooths updates using past direction.", "Adaptive optimizers rescale coordinates based on gradient history."],
      formulaIds: ["gradient-descent", "ridge"],
      example: { title: "Momentum intuition", prompt: "Why can momentum cross a shallow flat region faster?", steps: ["Past gradients accumulate velocity.", "The update retains directional memory."], answer: "It carries previous movement forward", interpretation: "Optimization uses more than the current gradient." },
      questions: [
        check("optim-a1", "Does zero gradient always mean global minimum?", ["Yes", "No; it may be a local maximum or saddle", "Only in regression", "Only with Adam"], 1, "Stationary points need further context."),
        check("optim-a2", "For a convex differentiable loss, what does a zero gradient identify?", ["A global minimum", "Always a maximum", "A missing label", "An invalid learning rate"], 0, "Convexity removes worse local minima, so a stationary point is globally minimizing.")
      ],
      examNotes: ["State assumptions when claiming convergence or global optimality."]
    }
  })
];
