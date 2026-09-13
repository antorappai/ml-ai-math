import { topic } from "../phase1Helpers.js";

const C = "calculus-optimization";
const make = (order, c) => topic({ chapterId: C, order, ...c });
const caseOf = (prompt, steps, answer, interpretation) => [prompt, steps, answer, interpretation];

export const calculusLessons = [
  make(1, {
    id: "change-slope-limits",
    title: "Change, Slope & Limit Intuition",
    prerequisites: ["graphs-slope-intercept"],
    requiredTermIds: ["graphs-slope-intercept"],
    term: "limit",
    definition: "The value a function approaches as its input gets closer and closer to a chosen point.",
    analogy: "Watching where a car is heading even before it reaches the exact spot",
    termExample: "As x approaches 2, x² approaches 4.",
    nonExample: "A limit is not simply 'plug in the number'; sometimes the function value at that point is missing or different.",
    plain: "Calculus begins with change. Slope tells us how much output changes over an interval. A limit lets us shrink that interval until we can talk about change at one instant.",
    realTitle: "From average speed to the speedometer",
    realBody: "If a car travels 100 km in two hours, its average speed is 50 km/h. But the dashboard can show 63 km/h at one particular moment. To make 'speed at one instant' mathematically precise, imagine measuring average speed over smaller and smaller time windows around that moment. The value those measurements approach is the idea behind a limit.",
    ml: "Training asks the same local question: if a parameter changes by a tiny amount, how does the model's loss change? Limits make that question precise.",
    wrong: "To know a limit, the function must actually reach the point.",
    correction: "A limit is about nearby behaviour. The value can exist even when the function is undefined at the exact point.",
    formulas: ["derivative-definition"],
    cases: [
      caseOf("For f(x)=x², what value does f(x) approach as x approaches 2?", ["Try x=1.9: 1.9²=3.61.", "Try x=1.99: 1.99²≈3.9601.", "Try values just above 2 as well; they also move toward 4."], "4", "The nearby outputs close in on four from both sides."),
      caseOf("A car moves from 20 m to 24.1 m between t=2.0 s and t=2.1 s. What is the average speed over that tiny interval?", ["Distance change is 24.1-20=4.1 m.", "Time change is 0.1 s.", "Divide 4.1 by 0.1."], "41 m/s", "As the time interval becomes smaller, this average can approach the instantaneous speed."),
      caseOf("Why do ML optimizers care about tiny parameter changes?", ["Training does not test every possible parameter value.", "It needs a local clue about whether a small move raises or lowers loss.", "That local clue becomes a derivative or gradient."], "To decide a useful local update direction", "Calculus lets optimization learn from the shape of the loss nearby instead of searching the entire space.")
    ]
  }),

  make(2, {
    id: "derivative-definition",
    title: "Derivatives: Instantaneous Rate of Change",
    prerequisites: ["change-slope-limits"],
    requiredTermIds: ["change-slope-limits"],
    term: "derivative",
    definition: "The instantaneous rate at which output changes with input, obtained as the limit of average slopes.",
    analogy: "A speedometer reading instead of the average speed for the whole journey",
    termExample: "For f(x)=x², f′(3)=6.",
    nonExample: "f′(x) is not the same thing as f(x); one gives the function value and the other gives local change.",
    plain: "A derivative answers one simple question: if I nudge the input a tiny amount from here, how quickly will the output move, and in which direction?",
    realTitle: "The slope right here",
    realBody: "On a curved road, one slope cannot describe the whole route. At each point the road has its own local steepness. A derivative is that local steepness. Positive means the output rises as the input increases, negative means it falls, and a larger magnitude means a steeper local change.",
    ml: "For a model parameter w, dL/dw tells us how sensitive the loss L is to a tiny change in w.",
    wrong: "A negative derivative means the input itself is negative.",
    correction: "The sign describes the direction of output change, not whether the input is positive or negative.",
    formulas: ["derivative-definition"],
    cases: [
      caseOf("Use first principles to find the derivative of f(x)=x² at x=2.", ["Start with [f(2+h)-f(2)]/h.", "Substitute: [(2+h)²-4]/h.", "Expand and simplify: (4h+h²)/h=4+h.", "Let h approach zero."], "4", "Near x=2, increasing x by a very small amount changes x² at about four output units per input unit."),
      caseOf("At x=5, a function has derivative -3. What does that mean?", ["The negative sign says the function is locally decreasing.", "The magnitude 3 says the local rate is about three output units per input unit."], "A small +1 change in x would locally correspond to about -3 in output", "The derivative is a local approximation, so it is most reliable for small changes."),
      caseOf("For a loss L(w), dL/dw=8. Which direction should w move to reduce loss?", ["A positive derivative means increasing w would increase loss locally.", "Therefore move w in the opposite direction."], "Decrease w", "This single-variable idea becomes gradient descent when the model has many parameters.")
    ]
  }),

  make(3, {
    id: "derivative-rules",
    title: "Derivative Rules: Shortcuts That Preserve the Meaning",
    prerequisites: ["derivative-definition", "powers-roots-scientific"],
    requiredTermIds: ["derivative-definition"],
    term: "derivative rule",
    definition: "A proven shortcut for differentiating common function patterns without rebuilding the limit calculation every time.",
    analogy: "Using multiplication tables after understanding what multiplication means",
    termExample: "d(x³)/dx=3x² by the power rule.",
    nonExample: "Changing x³ into x² without multiplying by 3 is not the power rule.",
    plain: "The derivative still means local rate of change. The rules simply let us calculate that rate efficiently for powers, sums, products, quotients, and nested functions.",
    realTitle: "A total cost made from several moving parts",
    realBody: "Suppose total operating cost includes fuel, staff time, and maintenance. If each part changes with distance, the total rate of cost change must account for every changing part. Derivative rules tell us how those local rates combine.",
    ml: "Automatic differentiation in PyTorch applies these same rules across large computational graphs.",
    wrong: "The derivative of f(x)g(x) is f′(x)g′(x).",
    correction: "Both factors can change, so the product rule is f′g+fg′.",
    formulas: ["chain-rule"],
    cases: [
      caseOf("Differentiate 3x²+4x-7.", ["Power rule: d(3x²)/dx=6x.", "d(4x)/dx=4.", "A constant has derivative zero."], "6x+4", "Each term contributes its own local rate."),
      caseOf("Differentiate (x²)(x+1).", ["Let f=x² and g=x+1.", "Use f′g+fg′.", "Compute 2x(x+1)+x²."], "3x²+2x", "The rate changes because both factors change with x."),
      caseOf("Differentiate (2x+1)³.", ["Treat the inside as u=2x+1.", "Differentiate the outer function: 3u².", "Multiply by the inner derivative du/dx=2."], "6(2x+1)²", "Nested functions lead directly to the chain rule used in backpropagation.")
    ]
  }),

  make(4, {
    id: "tangents-stationary-points",
    title: "Tangents, Stationary Points, Maxima & Minima",
    prerequisites: ["derivative-rules"],
    requiredTermIds: ["derivative-definition"],
    term: "stationary point",
    definition: "A point where the first derivative is zero, so the function is locally flat in that direction.",
    analogy: "A flat moment on a hill: it might be the bottom, the top, or a mountain pass",
    termExample: "x=0 is stationary for f(x)=x².",
    nonExample: "Derivative zero does not automatically mean 'minimum'.",
    plain: "When the derivative reaches zero, the function has stopped rising or falling at that instant. That makes the point interesting, but we still need to inspect the surrounding shape to know whether it is a minimum, maximum, or something flatter such as an inflection or saddle.",
    realTitle: "Finding the bottom of a valley",
    realBody: "If you walk downhill, the slope becomes less negative as you approach the bottom. At the exact bottom, the slope is zero. But a mountain peak also has zero slope, and a saddle can be flat while curving differently in different directions. Zero slope is therefore a clue, not the whole answer.",
    ml: "Optimization searches for low-loss regions. Neural-network training can encounter minima, flat regions, and saddle points where the gradient is small or zero.",
    wrong: "Every stationary point is a minimum.",
    correction: "A zero first derivative only identifies a candidate. Curvature or sign changes are needed to classify it.",
    formulas: ["derivative-definition"],
    cases: [
      caseOf("Find the stationary point of f(x)=x²-4x.", ["Differentiate: f′(x)=2x-4.", "Set the derivative to zero.", "Solve 2x-4=0."], "x=2", "At x=2 the graph is locally flat."),
      caseOf("Classify the stationary point of f(x)=x² at x=0.", ["The first derivative is 2x, so it is zero at 0.", "The second derivative is 2, which is positive.", "Positive curvature means the graph bends upward."], "Minimum", "The curve behaves like a bowl around the stationary point."),
      caseOf("Why can a model have almost zero gradient without being at the best possible solution?", ["A high-dimensional loss surface can contain saddle points and very flat regions.", "The gradient only reports first-order local slope.", "It does not by itself describe all curvature directions."], "Zero or tiny gradient is not proof of a global minimum", "This is one reason optimization in deep learning is more subtle than simply 'follow the slope until it becomes zero'.")
    ]
  }),

  make(5, {
    id: "scalar-vector-functions",
    title: "Scalar-Valued & Vector-Valued Functions",
    prerequisites: ["functions-domain-range", "scalars-vectors-tensors"],
    requiredTermIds: ["functions-domain-range", "vector"],
    term: "scalar-valued function",
    definition: "A function that returns one number, even if it accepts many inputs.",
    analogy: "Many measurements going into one final score",
    termExample: "A loss L(w₁,w₂,w₃) can take three parameters and still return one number.",
    nonExample: "A neural layer returning five activations is vector-valued, not scalar-valued.",
    plain: "Before differentiating a multivariable function, always ask about shape: how many numbers go in and how many come out? One input to one output gives an ordinary derivative. Many inputs to one output lead to partial derivatives and a gradient. Many inputs to many outputs lead to a Jacobian.",
    realTitle: "One final score or several outputs",
    realBody: "A school dashboard might take attendance, assessment, and behaviour data and return one risk score. Another dashboard might return three separate indicators. The inputs can be identical while the output shape changes the kind of derivative object we need.",
    ml: "Loss functions usually return one scalar. Layers, embeddings, logits, and probability vectors usually return multiple values.",
    wrong: "A function with many inputs must have many outputs.",
    correction: "Input dimension and output dimension are separate properties.",
    formulas: ["gradient"],
    cases: [
      caseOf("Classify f(x,y)=x²+y².", ["Count the inputs: two.", "Count the outputs: the expression returns one number."], "Scalar-valued function", "This is the shape where a gradient is useful."),
      caseOf("Classify g(t)=(t,t²).", ["There is one input t.", "The function returns two output components."], "Vector-valued function", "One input can still produce several outputs."),
      caseOf("A classifier receives 20 features and returns probabilities for 10 classes. What is the function shape?", ["Input has 20 components.", "Output has 10 components."], "R²⁰ → R¹⁰", "Because both sides are vectors, local sensitivity is naturally described by a Jacobian.")
    ]
  }),

  make(6, {
    id: "partial-derivatives",
    title: "Partial Derivatives: Change One Thing at a Time",
    prerequisites: ["scalar-vector-functions", "derivative-rules"],
    requiredTermIds: ["scalar-vector-functions", "derivative-definition"],
    term: "partial derivative",
    definition: "The local rate of change with respect to one input while the other inputs are held fixed.",
    analogy: "Turning one control knob while leaving every other knob exactly where it is",
    termExample: "For f(x,y)=x²+y, ∂f/∂x=2x.",
    nonExample: "Changing x and y together is not the partial derivative with respect to x.",
    plain: "A model usually has many parameters. A partial derivative asks a controlled question: if I nudge only this one parameter and freeze the others, what happens to the output?",
    realTitle: "Two controls on the same system",
    realBody: "Imagine room comfort depends on both heater power and fan speed. To understand the heater's effect, change only the heater while holding the fan fixed. Then do the reverse. Partial derivatives separate those individual effects.",
    ml: "For loss L(w₁,w₂,...), each partial derivative tells how sensitive the loss is to one particular parameter.",
    wrong: "Holding y fixed means setting y to zero.",
    correction: "Held fixed means it stays at its current value while only the chosen variable changes.",
    formulas: ["gradient"],
    cases: [
      caseOf("For f(x,y)=x²+y²+2xy, find ∂f/∂x.", ["Treat y as a constant.", "Differentiate x² to 2x.", "Differentiate 2xy with respect to x to get 2y.", "y² contributes zero."], "2x+2y", "The answer can still contain y because y was held constant, not erased."),
      caseOf("For the same function, find ∂f/∂y.", ["Treat x as a constant.", "Differentiate y² to 2y.", "Differentiate 2xy with respect to y to get 2x."], "2y+2x", "Now we have the local sensitivity in the y direction."),
      caseOf("At (x,y)=(1,2), evaluate both partial derivatives.", ["Substitute into 2x+2y.", "Both components become 2(1)+2(2)=6."], "∂f/∂x=6 and ∂f/∂y=6", "At this point the output is equally sensitive to tiny moves along the x and y axes.")
    ]
  }),

  make(7, {
    id: "gradients-directional-change",
    title: "Gradients: Put All the Partial Derivatives Together",
    prerequisites: ["partial-derivatives", "vector-magnitude-distance"],
    requiredTermIds: ["partial-derivatives", "vector"],
    term: "gradient",
    definition: "The vector containing every first partial derivative of a scalar-valued function.",
    analogy: "A compass arrow pointing toward the steepest uphill direction",
    termExample: "For f(x,y)=x²+y², ∇f=(2x,2y).",
    nonExample: "The gradient is not the function value and it is not one partial derivative by itself.",
    plain: "A partial derivative tells what happens if one coordinate moves. The gradient collects all of those answers into one vector. Its direction points toward the steepest local increase; the negative gradient points toward the steepest local decrease.",
    realTitle: "Standing on a hill with no map",
    realBody: "Imagine standing on a hillside in fog. You can feel how the ground slopes east-west and north-south. Combine those two local slopes and you get one arrow pointing most steeply uphill. Turn that arrow around and you have the fastest local downhill direction.",
    ml: "A model may have millions of parameters. The loss gradient gives one sensitivity component for each parameter so they can be updated together.",
    wrong: "The gradient points toward the minimum.",
    correction: "The gradient points uphill. Gradient descent uses the negative gradient to move downhill.",
    formulas: ["gradient", "vector-magnitude"],
    cases: [
      caseOf("Find ∇f for f(x,y)=x²+y².", ["Compute ∂f/∂x=2x.", "Compute ∂f/∂y=2y.", "Place the partial derivatives into one vector."], "∇f=(2x,2y)", "The gradient is a vector because there is one sensitivity for each input direction."),
      caseOf("Evaluate the gradient at (3,4).", ["Substitute x=3 and y=4.", "The components become (6,8).", "Its magnitude is √(36+64)=10."], "(6,8)", "The model is more sensitive in the y direction here because the y component is larger."),
      caseOf("What direction decreases f fastest at (3,4)?", ["The gradient gives steepest increase: (6,8).", "Reverse it to get steepest decrease."], "(-6,-8)", "The direction comes from the gradient; the learning rate will decide how far to step.")
    ]
  }),

  make(8, {
    id: "loss-functions",
    title: "Loss Functions: Give the Model Something to Improve",
    prerequisites: ["scalar-vector-functions", "fractions-ratios-percentages"],
    requiredTermIds: ["scalar-vector-functions"],
    term: "loss function",
    definition: "A scalar function that turns prediction error into one number representing how undesirable the prediction is.",
    analogy: "A scoring rule where lower means 'closer to what we wanted'",
    termExample: "Squared error (y-ŷ)² penalizes a regression prediction that misses its target.",
    nonExample: "A raw class label such as cat or dog is not itself a differentiable training loss.",
    plain: "A model cannot improve from the vague instruction 'be more accurate.' It needs a numerical signal. The loss function converts each prediction into a score that tells optimization how bad the current result is.",
    realTitle: "How far did the arrow miss the target?",
    realBody: "If two arrows miss the bullseye by 1 cm and 10 cm, we need a rule that says the second miss is worse. Different loss functions encode different ideas of what counts as a serious mistake.",
    ml: "Training repeatedly computes loss, differentiates it with respect to parameters, and changes those parameters to reduce the loss.",
    wrong: "The training loss must be the same thing as the final evaluation metric.",
    correction: "Training needs a useful differentiable optimization signal; reporting can use a different metric such as accuracy, F1, or MAE.",
    formulas: ["mse", "binary-cross-entropy"],
    cases: [
      caseOf("A regression target is y=5 and the model predicts ŷ=3. Find squared error.", ["Compute the residual: 5-3=2.", "Square it: 2²."], "4", "Squaring removes the sign and penalizes larger misses more strongly."),
      caseOf("Compare residuals 1 and 3 under squared loss.", ["Square 1 to get 1.", "Square 3 to get 9."], "Losses 1 and 9", "Tripling the error makes squared loss nine times larger, so big mistakes matter much more."),
      caseOf("Why usually average loss over a batch?", ["Compute one loss per example.", "Add those losses.", "Divide by the number of examples."], "To obtain a comparable mean loss", "A mean keeps the loss scale more stable when batch size changes.")
    ]
  }),

  make(9, {
    id: "gradient-descent-learning-rate",
    title: "Gradient Descent & Learning Rate",
    prerequisites: ["loss-functions", "gradients-directional-change"],
    requiredTermIds: ["loss-functions", "gradients-directional-change"],
    term: "gradient descent",
    definition: "An iterative optimization method that moves parameters in the direction opposite the loss gradient.",
    analogy: "Walking downhill in fog: feel the slope, take a step, feel again, repeat",
    termExample: "θ←θ-η∇L subtracts a scaled gradient from the parameters.",
    nonExample: "θ←θ+η∇L follows the gradient uphill and performs gradient ascent.",
    plain: "The gradient answers 'which way is uphill?' Gradient descent turns around and moves downhill. The learning rate η answers a separate question: how big should that step be?",
    realTitle: "Downhill steps without seeing the whole valley",
    realBody: "You do not need a complete map of a mountain to walk downhill. At your current position, estimate the slope, step downward, then measure again. A tiny step is safe but slow. A huge step may jump across the valley and make things worse.",
    ml: "Neural-network optimizers such as SGD and Adam build on this same basic update idea.",
    wrong: "A bigger learning rate always means faster learning.",
    correction: "Too large a learning rate can overshoot or diverge; too small a rate can make training painfully slow.",
    formulas: ["gradient-descent"],
    cases: [
      caseOf("Update w=5 when dL/dw=2 and η=0.1.", ["Scale the gradient: 0.1×2=0.2.", "Subtract it from the current weight."], "w=4.8", "Because increasing w raises loss locally, gradient descent decreases w."),
      caseOf("Update w=5 when dL/dw=-2 and η=0.1.", ["Scale the gradient: 0.1×(-2)=-0.2.", "Subtracting a negative value increases w."], "w=5.2", "The update direction automatically flips when the slope flips."),
      caseOf("Training loss repeatedly jumps from one side of a valley to the other and starts increasing. What should you inspect first?", ["Recognize the pattern as possible overshooting.", "Check the step size used by the optimizer."], "The learning rate may be too large", "Gradient direction can be correct while the chosen step size is unstable.")
    ]
  }),

  make(10, {
    id: "chain-rule-computational-graphs",
    title: "Chain Rule, Computational Graphs & Backpropagation",
    prerequisites: ["gradient-descent-learning-rate", "derivative-rules"],
    requiredTermIds: ["gradients-directional-change"],
    term: "chain rule",
    definition: "A rule for finding the effect of one quantity on another through intermediate steps by multiplying the local derivatives along the path.",
    analogy: "Tracing how one gear turns the next gear, which turns the next",
    termExample: "If u=3x and y=u², then dy/dx=(dy/du)(du/dx)=(2u)(3).",
    nonExample: "Adding local derivatives along a single dependency chain gives the wrong total effect.",
    plain: "Neural networks are nested functions: input affects a neuron, that affects another layer, and eventually that affects loss. The chain rule connects those local effects. Backpropagation is not a different piece of mathematics; it is an efficient algorithm for applying the chain rule backward through the network.",
    realTitle: "One change travels through a whole system",
    realBody: "Pressing a car's accelerator changes engine output; engine output changes speed; speed changes stopping distance. To know how a tiny pedal change affects stopping distance, combine the sensitivity of each link in the chain. That is the chain-rule idea.",
    ml: "During backpropagation, the model starts from the loss and propagates sensitivity backward through each operation to find gradients for earlier weights.",
    wrong: "Backpropagation is a separate learning rule unrelated to calculus.",
    correction: "Backpropagation is the chain rule organized efficiently over a computational graph, with contributions added when multiple paths meet.",
    formulas: ["chain-rule", "backprop"],
    cases: [
      caseOf("Differentiate y=(3x+1)² using the chain rule.", ["Let u=3x+1.", "Outer derivative: dy/du=2u.", "Inner derivative: du/dx=3.", "Multiply and substitute u back."], "dy/dx=6(3x+1)", "The total sensitivity is the product of the local sensitivities."),
      caseOf("A dependency chain has local derivatives 2, 0.5, and 4. What is the total derivative along the chain?", ["Multiply the local derivatives: 2×0.5×4."], "4", "A small derivative such as 0.5 weakens the signal flowing through that path."),
      caseOf("Why does a neural network save intermediate activations during the forward pass?", ["Many backward derivatives depend on values created during the forward computation.", "Keeping those values avoids recomputing every intermediate result.", "Backprop can then move efficiently from loss toward earlier parameters."], "To evaluate chain-rule derivatives efficiently", "This is the practical bridge from calculus to automatic differentiation frameworks such as PyTorch.")
    ]
  }),

  make(11, {
    id: "jacobian-matrices",
    title: "Jacobians: Many Inputs, Many Outputs",
    prerequisites: ["chain-rule-computational-graphs", "scalar-vector-functions"],
    requiredTermIds: ["partial-derivatives", "scalar-vector-functions"],
    term: "Jacobian",
    definition: "A matrix containing the first partial derivative of every output component with respect to every input component.",
    analogy: "A sensitivity table showing how every control affects every display",
    termExample: "A function with 2 outputs and 3 inputs has a 2×3 Jacobian under the common output-by-input convention.",
    nonExample: "A gradient is the special many-input, one-output case; it is not always the same-shaped object as a Jacobian.",
    plain: "A derivative is one local rate. A gradient is many input sensitivities for one scalar output. A Jacobian is the full table when both the input and the output have several components.",
    realTitle: "Several controls affecting several readings",
    realBody: "Imagine an aircraft panel where throttle and flap angle affect speed, climb rate, and fuel use. One number cannot summarize all those local relationships. A matrix can: each row tracks one output and each column tracks one input.",
    ml: "Neural layers are vector-to-vector functions, so Jacobians describe their local sensitivity. Backprop usually multiplies by Jacobians without explicitly building the enormous matrices.",
    wrong: "The Jacobian is always inputs-by-outputs.",
    correction: "With the common convention used here, rows correspond to outputs and columns correspond to inputs.",
    formulas: ["gradient"],
    cases: [
      caseOf("Find the Jacobian of g(x,y)=(x+y,xy).", ["For output g₁=x+y, the partials are (1,1).", "For output g₂=xy, the partials are (y,x).", "Place each output's partials in one row."], "[[1,1],[y,x]]", "Each entry answers how one output locally responds to one input."),
      caseOf("What is the Jacobian shape for a function R³→R²?", ["There are two outputs, so use two rows.", "There are three inputs, so use three columns."], "2×3", "Shape alone tells us how many local input-output sensitivities exist."),
      caseOf("Why do deep-learning libraries usually avoid constructing every full Jacobian?", ["Modern layers can have millions of inputs and outputs.", "The complete matrix would be enormous.", "Backprop normally needs only products involving that Jacobian."], "They compute vector-Jacobian or Jacobian-vector products efficiently", "Automatic differentiation uses the structure of the graph rather than materializing every derivative entry.")
    ]
  }),

  make(12, {
    id: "hessians-convexity",
    title: "Hessians, Curvature & Convexity Intuition",
    prerequisites: ["gradients-directional-change", "jacobian-matrices"],
    requiredTermIds: ["gradients-directional-change"],
    term: "Hessian",
    definition: "The square matrix of second partial derivatives of a scalar-valued function.",
    analogy: "A curvature map showing how the slope itself changes in different directions",
    termExample: "For f(x,y)=x²+y², the Hessian is diag(2,2).",
    nonExample: "The gradient records first-order slope; it does not by itself describe curvature.",
    plain: "The gradient tells which way the surface slopes now. The Hessian asks how that gradient will change if we move. Positive curvature behaves like a bowl, negative curvature like a hilltop, and mixed signs reveal saddle behaviour.",
    realTitle: "A bowl, a hilltop, and a mountain pass",
    realBody: "At the bottom of a bowl, every direction curves upward. At the top of a hill, every direction curves downward. At a mountain pass, one direction curves upward while another curves downward. First derivatives can be zero in all three situations; curvature tells them apart.",
    ml: "Curvature helps explain why some directions allow large learning rates while others cause overshooting, and it motivates second-order optimization ideas.",
    wrong: "If the gradient is zero and curvature is positive in one direction, the point must be a minimum.",
    correction: "In many dimensions, the curvature must be non-negative in every direction to support a local minimum classification.",
    formulas: ["gradient"],
    cases: [
      caseOf("Find the Hessian of f(x,y)=x²+3y².", ["Differentiate twice with respect to x to get 2.", "Differentiate twice with respect to y to get 6.", "Mixed second derivatives are zero."], "[[2,0],[0,6]]", "Both principal curvatures are positive, so the surface is bowl-shaped."),
      caseOf("How would you interpret Hessian diag(2,-1)?", ["One direction has positive curvature.", "The other has negative curvature.", "The signs disagree."], "Indefinite Hessian; saddle behaviour", "The surface bends up in one direction and down in another."),
      caseOf("Why can a very steeply curved direction require a smaller learning rate?", ["In high curvature, the slope changes rapidly as you move.", "A large step can cross the valley and land on the other side.", "Repeating that can cause oscillation or divergence."], "Smaller steps can improve stability", "Learning rate is not just about gradient size; the local shape of the surface matters too.")
    ]
  })
];