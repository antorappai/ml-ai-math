// Guided teaching material is separate from the preserved levels, labs, and exercises.
import { mcq } from "./schema.js";

const word = (id, name, definition, analogy, example, nonExample) => ({ id, name, definition, analogy, example, nonExample });
const notation = (expression, readAs, symbols) => ({ expression, readAs, symbols });
const example = (title, prompt, pairs, answer, interpretation) => ({
  title, prompt, walkthrough: pairs.map(([action, reason]) => ({ action, reason })),
  steps: pairs.map(([action, reason]) => `${action} ${reason}`), answer, interpretation
});
const question = (id, prompt, options, answerIndex, explanation) => mcq(`guided-${id}`, prompt, options, answerIndex, explanation, "concept");

export const DEEP_LEARNING_GUIDES = {
  "tensors-perceptrons": {
    goal: "Explain how one weighted artificial neuron grows into a layer, an ANN, an MLP, and a batched tensor calculation.",
    introduction: "Start with the biological analogy, but keep it loose. A biological neuron receives signals through synapses, and stronger synapses can have more influence on whether the neuron fires. An artificial neuron borrows only that broad idea: numerical inputs are multiplied by numerical weights, a bias is added, and an activation turns the resulting score into an output. Training changes those weights. It is not a biological simulation. Historically, a perceptron used a hard yes-or-no threshold. Modern neural networks usually use differentiable activations so gradients can train them. One neuron produces one output. A dense layer contains many neurons working in parallel. An artificial neural network, or ANN, connects such units. A multilayer perceptron, or MLP, is a feed-forward ANN made from stacked dense layers. A deep neural network has several learned hidden layers. Tensors are the organized blocks of numbers that carry batches, features, weights, and activations through these layers; a tensor is data, not another kind of neuron.",
    concepts: [
      "Think input → weight → weighted sum + bias → activation → output. That is the basic artificial-neuron calculation.",
      "A weight is loosely analogous to connection strength: a larger positive weight pushes the score up more strongly, while a negative weight pushes it down. Training strengthens or weakens these numerical connections by changing the weights.",
      "A layer contains many neurons. If a dense layer has 5 output units, it computes 5 different weighted sums using 5 learned sets of weights.",
      "ANN is the broad family name. An MLP is a feed-forward ANN built from dense layers. Deep usually means several hidden layers between input and output.",
      "A tensor tells you how numbers are organized. For example, 32 examples with 10 features have shape 32 by 10. The first axis is the batch; the second is the feature axis."
    ],
    vocabulary: [
      word("artificial-neuron", "artificial neuron", "A numerical unit that combines inputs using weights and a bias, then applies an activation.", "A weighted voting box", "Two inputs are multiplied by two weights, added with a bias, then passed through ReLU.", "A full biological neuron with realistic electrical and chemical behaviour."),
      word("mlp", "multilayer perceptron (MLP)", "A feed-forward neural network made from stacked dense layers and nonlinear activations.", "Several teams of weighted voters passing results forward", "A 3 → 8 → 4 → 1 network with ReLU between hidden layers.", "A single number or one isolated neuron."),
      word("tensor", "tensor", "A block of numbers organized along named axes; scalars, vectors, and matrices are lower-dimensional cases.", "A spreadsheet, or a stack of spreadsheets", "A batch of 32 RGB images can have shape 32 by 3 by 224 by 224.", "A neural-network layer by itself.")
    ],
    scenario: { title: "A committee of weighted signals", body: "Two signals vote on a decision. The first gets three times as much influence, the second pushes in the opposite direction, and a starting bias shifts the final score." },
    everydayExample: example("A weighted committee score", "Signal values are 2 and 1, their weights are 3 and −1, and the starting bias is 2.", [["Multiply 2 × 3 = 6 and 1 × (−1) = −1.", "Each input contributes according to its weight, just as one vote can carry more influence than another."], ["Add 6 − 1 + 2 = 7.", "The bias is a learned offset added after the weighted contributions."]], "Score 7", "The score tells us the combined weighted evidence before an activation decides how the unit responds."),
    mlExample: example("One neuron, then a layer", "Two examples are [2,1] and [1,2]. One neuron uses weights [3,−1] and bias 2.", [["For [2,1], compute 2 × 3 − 1 + 2 = 7.", "One row is one example going through the same neuron."], ["For [1,2], compute 1 × 3 − 2 + 2 = 3.", "The weights are shared across examples; training learns one rule that can be reused."], ["If the layer had five neurons instead of one, repeat this idea with five different weight vectors.", "A layer is a collection of neurons, not one giant neuron."]], "Scores [7,3] from one neuron; five neurons would produce five scores per example", "This is the bridge from one perceptron-like calculation to a dense layer and then to an MLP."),
    task: "Compute a neuron's weighted score, then explain how many neurons and many examples turn the same idea into matrix and tensor operations.",
    notation: notation("z = w₁x₁ + w₂x₂ + b", "Multiply each input by its weight, add the contributions, then add the bias to obtain the pre-activation score z.", [["x₁, x₂", "The input features."], ["w₁, w₂", "Learned connection strengths for those inputs."], ["b", "A learned offset called the bias."], ["z", "The score before the activation function."]]),
    questions: [
      question("tensor-story", "In the biological analogy, what is an artificial weight most loosely comparable to?", ["Synaptic connection strength", "The neuron's DNA", "The number of training examples"], 0, "The analogy is connection strength: a weight controls how strongly an input influences the artificial neuron's score."),
      question("tensor-try", "A batch contains 32 examples and each example has 10 features. What is the usual 2D input shape?", ["10 by 32", "32 by 10", "32 by 32"], 1, "Rows usually index examples and columns index features."),
      question("tensor-ml", "A dense layer has 5 output units. What does that mean?", ["The layer contains five neurons producing five outputs", "The layer is one neuron with five names", "The network has five training examples"], 0, "Each output unit has its own learned weights and produces one output for each example.")
    ],
    misconception: { wrong: "An artificial neuron is a realistic computer simulation of a biological neuron.", correction: "It is a much simpler mathematical abstraction. The useful analogy is weighted connection strength, not biological fidelity." }
  },

  "activations-losses": {
    goal: "Explain why hidden layers need nonlinear activations and why activation, logit, probability, and loss are different quantities.",
    introduction: "A dense neuron first produces a score such as z = Wx + b. That score is often called a pre-activation or, at an output layer, a logit. An activation decides how the neuron responds to that score. The important reason for nonlinear activations is that stacking only linear layers does not create a truly deeper function: several linear transformations collapse into one linear transformation. ReLU, sigmoid, tanh, and related functions introduce bends that let networks represent nonlinear patterns. Loss has a different job. It compares the model's output with the target and produces the error signal that training tries to reduce. Hidden-layer activation, output transformation, and loss are related but they are not the same thing.",
    concepts: [
      "ReLU returns max(0,z). It is common in hidden layers because it is cheap and keeps useful positive gradients over a large region.",
      "Sigmoid maps one logit to a value between 0 and 1, so it is useful for binary probabilities. Softmax turns several logits into a probability distribution whose values sum to one.",
      "Loss says how bad the prediction is. MSE is common for continuous regression. Cross-entropy is common for classification because it strongly penalizes confident probability assigned to the wrong class.",
      "The output activation must match the task and the framework loss. For example, PyTorch CrossEntropyLoss expects raw multiclass logits because it performs the stable log-softmax calculation internally.",
      "Activation affects both forward behaviour and backward gradients. Saturating sigmoid or tanh can produce tiny gradients; a ReLU stuck on the negative side can become a dead unit."
    ],
    vocabulary: [
      word("activation", "activation function", "A nonlinear rule applied to a neuron's score to produce its output.", "A response curve deciding how strongly a unit reacts", "ReLU turns −2 into 0 and keeps 3 as 3.", "The score used to judge the entire prediction."),
      word("logit", "logit", "An unrestricted model score before conversion into a probability.", "A raw exam mark before converting it to a grade band", "A binary logit of 0 becomes probability 0.5 after sigmoid.", "A number that must already lie between zero and one."),
      word("neural-loss", "loss", "A scalar score measuring how undesirable the model's prediction is for the target.", "A penalty for how far an answer misses", "Squared error of 4 means a prediction missed enough to incur four units of penalty.", "The activation function inside every hidden neuron.")
    ],
    scenario: { title: "A heater needs a response rule and a separate error score", body: "A heater cannot produce negative heat, so its controller clips negative requests to zero. Separately, you can compare the actual temperature with the target temperature to judge the error." },
    everydayExample: example("Clip the heating request", "Apply the heater rule to requests [−2,0,3].", [["Replace −2 with 0.", "The response rule refuses a negative heat request."], ["Keep 0 and 3.", "Values already at or above zero pass through unchanged."]], "[0,0,3]", "The controller changes the response; it does not yet say whether the resulting temperature is correct."),
    mlExample: example("Separate score, activation, and loss", "A hidden unit has score z=−2 and uses ReLU. Its activated output should match target y=1; use squared error for this tiny example.", [["Apply ReLU: a=max(0,−2)=0.", "The activation determines the hidden unit's output."], ["Compare with the target: a−y=0−1=−1.", "The residual measures the miss."], ["Square it: L=(−1)²=1.", "The loss converts the miss into the scalar objective that training can minimize."]], "Activation output 0; loss 1", "The activation transforms a neuron's score; the loss evaluates the resulting prediction against the target."),
    task: "Trace score → activation → prediction → loss and explain why a deep network needs nonlinear activations between linear layers.",
    notation: notation("a = max(0,z); L = (a − y)²", "Apply ReLU to score z to obtain activation a, then compare a with target y using squared error L.", [["z", "The score before activation."], ["a", "The activated output."], ["y", "The desired target."], ["L", "The scalar loss used for learning."]]),
    questions: [
      question("activation-story", "What does ReLU return for −4?", ["−4", "4", "0"], 2, "ReLU returns the larger of zero and the input."),
      question("activation-try", "If you stack several Linear layers with no nonlinear activation between them, what can the stack collapse into?", ["One larger linear transformation", "A decision tree", "A probability distribution automatically"], 0, "Composing linear transformations is still a linear transformation; nonlinear activations add expressive power."),
      question("activation-ml", "Which quantity tells training how bad the prediction was?", ["Loss", "Batch size", "Tensor rank"], 0, "The loss is the objective whose gradients are used to update parameters.")
    ],
    misconception: { wrong: "Activation and loss are two names for the same calculation.", correction: "Activation determines how a unit responds; loss judges the prediction against the target." }
  },

  "forward-backprop": {
    goal: "Follow the full learning chain: forward pass → loss → backpropagation → gradient, without confusing gradient calculation with the weight update.",
    introduction: "A neural network learns in two different directions. In the forward pass, data moves through the layers to produce a prediction and then a loss. In the backward pass, backpropagation uses the chain rule to calculate how sensitive that loss is to each weight and bias. Those sensitivities are gradients. Only after the gradients exist does an optimizer change the parameters. This separation matters: backpropagation is not the optimizer. A useful biological analogy is synaptic strengthening and weakening: an artificial weight may increase or decrease after learning. But in an ANN this change is produced by calculus and an optimization rule, not by a biologically realistic learning mechanism.",
    concepts: [
      "Forward pass: inputs → weighted sums → activations → prediction → loss.",
      "Backward pass: start from the loss and use local derivatives to work backward through the same dependency graph.",
      "The chain rule multiplies local sensitivities along one path. If several paths affect the same quantity, their gradient contributions add.",
      "A positive gradient means increasing that parameter would locally increase loss. Gradient descent therefore moves the parameter in the opposite direction.",
      "Deep networks can suffer vanishing gradients when many small derivatives multiply, or exploding gradients when repeated factors make the product very large."
    ],
    vocabulary: [
      word("backpropagation", "backpropagation", "An efficient chain-rule procedure for calculating the loss gradient of many neural-network parameters.", "Tracing responsibility backward through a chain of calculations", "Compute dL/dw by multiplying the local derivatives connecting w to L.", "The optimizer step that changes w."),
      word("gradient", "gradient", "A collection of derivatives describing how the loss changes with respect to parameters.", "An arrow showing the local uphill direction of error", "If dL/dw=4, increasing w slightly raises loss locally.", "The updated parameter value itself.")
    ],
    scenario: { title: "Trace how one change affects the final cost", body: "Each tray needs 2 scoops of flour and each scoop costs 3 coins. If the number of trays changes, flour changes first and total cost changes afterward." },
    everydayExample: example("Multiply change rates through a chain", "There are 2 scoops per tray and 3 coins per scoop.", [["One extra tray requires 2 extra scoops.", "This is the first local rate: scoops change by 2 for each tray."], ["Each extra scoop costs 3 coins, so 2 × 3 = 6 coins.", "The chain rule combines successive rates by multiplication."]], "6 coins per extra tray", "A change can travel through intermediate quantities; its total effect is built from the local effects."),
    mlExample: example("Forward first, backward second", "Input x=2, weight w=3, target y=5. Prediction a=wx and loss L=(a−y)².", [["Forward: a=3×2=6, then L=(6−5)²=1.", "We need the current intermediate values before evaluating the derivatives."], ["Backward local rates: dL/da=2(a−y)=2 and da/dw=x=2.", "Each derivative describes one link in the computational graph."], ["Chain them: dL/dw=(dL/da)(da/dw)=2×2=4.", "The result says how sensitive the loss is to the weight at this point."], ["Do not change w yet.", "Backpropagation has computed the gradient; the optimizer performs the later update."]], "dL/dw = 4", "Because the gradient is positive, a small move to a lower w should reduce this loss locally."),
    task: "Compute a weight gradient and explain which part is forward propagation, loss calculation, backpropagation, and optimization.",
    notation: notation("dL/dw = (dL/da)(da/dw)", "Multiply the loss change per output change by the output change per weight change.", [["L", "The loss."], ["a", "An intermediate activation or prediction."], ["w", "A trainable weight."], ["dL/dw", "How the loss changes locally when w changes."]]),
    questions: [
      question("backprop-story", "Two scoops per tray and 3 coins per scoop gives what total rate?", ["5 coins per tray", "6 coins per tray", "1 coin per tray"], 1, "Multiply the local rates: 2 × 3 = 6."),
      question("backprop-try", "Local derivatives are 2 and 0.5. What is their chain product?", ["1", "2.5", "4"], 0, "Multiplication gives 1."),
      question("backprop-ml", "After loss.backward() has calculated gradients, what job remains?", ["The optimizer must update parameters", "The architecture must invent new layers", "The labels must become weights"], 0, "Backprop computes gradients; an optimizer such as SGD or Adam uses them to change parameters.")
    ],
    misconception: { wrong: "Backpropagation sends one error number backward and directly changes every weight.", correction: "Backpropagation applies the chain rule to calculate a separate gradient for each parameter; the optimizer then uses those gradients to update the parameters." }
  },

  "deep-optimization-regularization": {
    goal: "Separate four jobs clearly: initialize the weights, use an optimizer to move them, stabilize training, and regularize for better generalization.",
    introduction: "Once backpropagation gives us gradients, practical training still has several separate problems to solve. Initialization chooses where the weights start. The optimizer decides how to move them after each gradient calculation. Stabilization techniques such as normalization or gradient clipping keep training numerically manageable. Regularization tries to improve generalization, meaning performance on unseen examples rather than only the training set. These ideas are related, but they solve different problems.",
    concepts: [
      "Initialization: all-zero hidden weights are bad because identical neurons receive identical gradients and stay identical. Random weights break that symmetry; zero biases are usually fine because the weights are already different.",
      "Xavier or Glorot initialization scales starting weights using fan-in and fan-out so activations do not grow or shrink too aggressively. It is commonly associated with tanh or sigmoid-style networks.",
      "He or Kaiming initialization uses a variance based mainly on fan-in and is designed for ReLU-family activations, where many negative signals are clipped.",
      "Optimizer: plain SGD follows the current gradient; momentum adds a running velocity; RMSProp adapts step sizes from squared-gradient history; Adam combines momentum-like first moments with adaptive second moments.",
      "Regularization: weight decay discourages very large weights, dropout removes random activations during training, data augmentation creates useful variation, and early stopping keeps the checkpoint that performed best on validation data.",
      "Generalization is judged on held-out data. A falling training loss with rising validation loss is a classic overfitting warning."
    ],
    vocabulary: [
      word("weight-initialization", "weight initialization", "Choosing the starting values of trainable weights before gradient-based learning begins.", "Choosing sensible starting positions before beginning a search", "He initialization is often paired with ReLU networks.", "A method that replaces backpropagation after every batch."),
      word("optimizer", "optimizer", "An update rule that turns gradients into parameter changes.", "A navigation rule deciding how to step downhill", "Adam keeps moving averages of gradient information to adapt updates.", "The loss function that scores a prediction."),
      word("regularization", "regularization", "A technique that discourages fitting training-specific noise and supports generalization.", "Practising varied questions instead of memorizing one answer sheet", "Dropout or weight decay can reduce overfitting.", "Repeatedly checking the final test set while tuning.")
    ],
    scenario: { title: "Starting point, walking rule, and anti-memorization rule", body: "Imagine learning on a landscape. You need a sensible starting point, a rule for taking downhill steps, and a way to avoid memorizing one narrow training path." },
    everydayExample: example("Take one controlled downhill step", "Current setting 3, local error gradient 4, learning rate 0.1.", [["Scale the gradient: 0.1×4=0.4.", "The learning rate controls the size of the update."], ["Move against the positive gradient: 3−0.4=2.6.", "Gradient descent tries to reduce the local error."], ["Check performance on fresh examples afterward.", "A lower training error is useful only if the learned pattern transfers."]], "New setting 2.6", "The optimizer changes the parameter; validation tells us whether the broader training choices generalize."),
    mlExample: example("Initialization, update, and validation have different jobs", "A ReLU MLP starts with He-initialized weights. One weight is currently 3 with gradient 4 and learning rate 0.1. Model A ends at training/validation loss 0.1/0.8; regularized model B ends at 0.2/0.3.", [["Start with He-style random weights rather than identical zeros.", "Randomness breaks neuron symmetry and He scaling is designed to keep ReLU signals at a useful scale."], ["Update the example weight: 3−0.1×4=2.6.", "The optimizer uses the gradient after backpropagation."], ["Compare validation losses: 0.3 for B is better than 0.8 for A.", "Regularization may sacrifice a little training fit to improve unseen-data performance."]], "Updated weight 2.6; select B from the validation comparison", "Initialization helps learning begin, optimization moves parameters, and regularization/generalization determine whether the learned solution transfers."),
    task: "Explain what Xavier/He initialization, SGD/Adam, weight decay/dropout, and validation each contribute to training.",
    notation: notation("w_new = w − ηg", "Take the current weight and subtract the learning rate times its current gradient.", [["w", "The current weight."], ["η", "The learning rate controlling step size."], ["g", "The gradient calculated by backpropagation."], ["w_new", "The updated weight produced by the optimizer rule."]]),
    questions: [
      question("deepopt-story", "Why are identical zero weights a problem for neurons in the same hidden layer?", ["They can receive identical gradients and remain redundant", "They always make the loss negative", "They remove the training data"], 0, "Symmetry prevents otherwise identical hidden units from learning different roles."),
      question("deepopt-try", "Which initialization is especially associated with ReLU-family activations?", ["He or Kaiming", "Always all zeros", "No initialization at all"], 0, "He/Kaiming scaling was designed for rectifier-style activations."),
      question("deepopt-ml", "Training loss falls while validation loss rises. What is the main warning?", ["Overfitting", "The model has no weights", "The tensor shape must be scalar"], 0, "The model is fitting training data better while transferring worse to held-out data.")
    ],
    misconception: { wrong: "Adam, He initialization, and dropout are three versions of the same training trick.", correction: "They solve different jobs: initialization chooses starting weights, Adam updates weights, and dropout regularizes the learned model." }
  },

  "pytorch-training-loop": {
    goal: "Read a complete PyTorch MLP training step and know exactly which line predicts, measures error, calculates gradients, updates weights, and performs inference.",
    introduction: "PyTorch is where the concepts become visible in code. First you define an architecture such as 3 inputs → 8 hidden neurons → ReLU → 1 output. Those layer sizes are design choices. PyTorch then creates weight and bias tensors for the layers. Training does not normally invent new layers; it changes the values inside those parameter tensors. For each batch, the model performs a forward pass, the loss function scores the prediction, backward() computes gradients, and the optimizer changes parameters. Repeating that process across the data for many epochs is training. Inference is different: the trained model performs only the forward calculation with fixed parameters.",
    concepts: [
      "Architecture is chosen before training: input size, hidden widths, number of layers, activation functions, and output shape.",
      "A batch is a subset of training examples processed together. An epoch means one pass through the training dataset, usually using many batches.",
      "The core PyTorch order is: optimizer.zero_grad() → logits=model(X) → loss=loss_fn(logits,y) → loss.backward() → optimizer.step().",
      "zero_grad clears gradients from the previous step because PyTorch accumulates them by default. backward calculates gradients. step changes the parameters.",
      "model.train() enables training-specific behaviour such as dropout. model.eval() switches those layers into evaluation behaviour. torch.no_grad() prevents unnecessary gradient tracking during ordinary inference.",
      "A correction in a normal LLM chat changes the next input context; it does not normally run this training loop or immediately modify the stored model weights."
    ],
    vocabulary: [
      word("pytorch", "PyTorch", "A Python library for tensor computation, neural-network modules, automatic differentiation, and optimization.", "A workshop containing tools for building and training networks", "torch.nn.Linear(3,8) creates a learnable dense layer from three inputs to eight outputs.", "A particular trained neural network model."),
      word("batch", "batch", "A group of training examples processed together before one optimizer update.", "Studying a small stack of questions before receiving feedback", "A batch may contain 32 images with shape 32 by 3 by 224 by 224.", "The entire model architecture."),
      word("inference", "inference", "Using fixed learned parameters to produce outputs for new inputs without a training update.", "Performing with a skill already practised", "model.eval() followed by a forward pass generates predictions.", "Calling loss.backward() and optimizer.step().")
    ],
    scenario: { title: "Practise, receive feedback, then perform", body: "A musician changes technique during rehearsal after feedback. During the concert, the learned technique is used without running another training routine after every note." },
    everydayExample: example("Practise with feedback, then perform", "A practice setting is 3, its error gradient is 4, and the chosen step size is 0.1.", [["Compute the adjustment 0.1×4=0.4.", "The step size scales the feedback."], ["Update the setting to 3−0.4=2.6.", "Practice changes the setting."], ["Use 2.6 during the performance without updating it after every note.", "Performance corresponds to inference: use what was learned."]], "Training update gives 2.6; inference uses the fixed learned setting", "Learning and using a learned model are separate modes."),
    mlExample: example("Read one PyTorch training step", "Suppose the current weight is 3, its calculated gradient is 4, and the optimizer uses learning rate 0.1.", [["optimizer.zero_grad() clears old gradient values.", "PyTorch accumulates .grad unless you reset it."], ["logits=model(X) and loss=loss_fn(logits,y) run the forward calculation and produce one scalar objective.", "The model must make a prediction before the loss can judge it."], ["loss.backward() calculates gradient 4 for the example weight.", "Autograd applies backpropagation through the recorded computation."], ["optimizer.step() applies 3−0.1×4=2.6.", "The optimizer, not backward(), changes the parameter."]], "Updated weight 2.6", "The five visible operations map directly onto the mathematical learning cycle."),
    task: "Connect every line of a PyTorch MLP training loop to forward propagation, loss, backpropagation, optimization, batches, epochs, and inference.",
    notation: notation("w_new = w − η ∂L/∂w", "Take the current weight and subtract the learning rate times the loss gradient for that weight.", [["w", "The current learned weight."], ["η", "The optimizer's learning rate."], ["∂L/∂w", "The gradient produced by backpropagation."], ["w_new", "The updated parameter value."]]),
    questions: [
      question("pytorch-story", "Which part of the analogy corresponds to inference?", ["Using the learned setting during the performance", "Changing the setting from feedback", "Calculating a new training loss after every note"], 0, "Inference uses learned parameters without performing an optimizer update."),
      question("pytorch-try", "What does loss.backward() do?", ["Calculates gradients", "Changes the number of layers", "Directly performs optimizer.step()"], 0, "backward uses autograd to populate gradients; the optimizer applies them afterward."),
      question("pytorch-ml", "What is an epoch?", ["One pass through the training dataset", "One individual neuron", "One attention head"], 0, "An epoch is one full pass through the training data, often divided into many batches.")
    ],
    misconception: { wrong: "Calling model(X) in PyTorch trains the network.", correction: "model(X) only runs the forward pass. Training also needs a loss, backward gradient calculation, and an optimizer step." }
  },

  "cnn-convolution": {
    goal: "Explain why image models use local shared filters instead of giving every pixel an unrelated dense connection, then calculate a small convolution.",
    introduction: "A normal dense layer connects every input to every output. That is useful, but images have spatial structure: neighbouring pixels matter together, and the same edge or texture can appear in many places. A convolutional neural network, or CNN, builds this assumption into the architecture. A small kernel performs a neuron-like weighted calculation on one local patch, then the same kernel is reused at the next location. The resulting numbers form a feature map. During training, the kernel weights are learned. Early filters may become useful for edges or textures; deeper layers combine local features into larger patterns.",
    concepts: [
      "Kernel or filter: a small learned weight pattern that slides across local regions.",
      "Weight sharing: use the same kernel at many positions, reducing parameter count and allowing the same learned pattern to be detected in different locations.",
      "Feature map: the grid of outputs produced by one learned filter. Several output channels mean several different learned filters or feature types.",
      "Stride controls how far the kernel moves. Padding adds border values so filters can reach the edges and, when chosen appropriately, preserve width and height.",
      "Deeper CNN units have larger receptive fields because they combine outputs that already summarize neighbouring areas."
    ],
    vocabulary: [
      word("convolution", "convolution", "In a CNN, repeatedly applying shared local filter weights to neighbouring input values.", "Sliding the same inspection window across a picture", "Filter [1,−1] applied to [2,5] gives −3.", "Learning a completely unrelated set of weights for every image location."),
      word("feature-map", "feature map", "The spatial array of responses produced by a convolutional filter.", "A map showing where a detector responded strongly", "An edge filter creates a grid of edge-response values.", "The original image labels.")
    ],
    scenario: { title: "Use the same local detector everywhere", body: "Three neighbouring shelf counts are 2, 5, and 4. Instead of inventing a new comparison at each position, reuse the rule left minus right as the window slides." },
    everydayExample: example("Slide a two-position detector", "Counts [2,5,4], filter weights [1,−1], stride 1.", [["At the first window [2,5], compute 2×1+5×(−1)=−3.", "One local weighted calculation compares the neighbouring counts."], ["Slide one step to [5,4] and compute 5−4=1.", "The same weights are reused at the next position."]], "Feature responses [−3,1]", "Weight sharing applies one learned local rule throughout the input."),
    mlExample: example("Detect a local change in a tiny image row", "Pixel intensities [2,5,4], learned filter [1,−1], stride 1, no padding.", [["Compute 2−5=−3 and then 5−4=1.", "The filter responds to the direction and size of local brightness changes."], ["There are 3−2+1=2 valid placements.", "Without padding, the filter must fit fully inside the input."], ["In a real CNN, many filters produce many output channels.", "Different learned kernels can respond to different local patterns."]], "Feature map [−3,1], width 2", "Convolution is still weighted-sum neural computation, but with local connectivity and shared weights."),
    task: "Compute a small convolution and explain kernel, stride, padding, channel, feature map, and receptive field in ordinary language.",
    notation: notation("oᵢ = k₁xᵢ + k₂xᵢ₊₁", "At each location i, multiply the local input values by the shared kernel weights and add them.", [["i", "The current starting position of the local window."], ["xᵢ, xᵢ₊₁", "Neighbouring input values."], ["k₁, k₂", "The learned shared kernel weights."], ["oᵢ", "The feature-map output at position i."]]),
    questions: [
      question("cnn-story", "What does filter [1,−1] return for local values [5,4]?", ["9", "−1", "1"], 2, "Multiply matching entries and add: 5−4=1."),
      question("cnn-try", "Why does a CNN reuse the same kernel across many positions?", ["To detect the same local pattern in different locations", "To guarantee rotation invariance", "To remove training"], 0, "Shared filters encode the idea that a useful local pattern can appear in different locations."),
      question("cnn-ml", "Are the useful edge-like filters normally typed in by the programmer?", ["No, their weights can be learned during training", "Yes, every CNN requires fixed hand-written edge filters", "Only the labels become filters"], 0, "CNN kernels are trainable parameters; useful local detectors emerge through learning.")
    ],
    misconception: { wrong: "A convolution is completely different from a neuron.", correction: "Each local convolution output is still a weighted sum plus optional bias and activation; the special idea is local connectivity and shared weights." }
  },

  "sequence-models": {
    goal: "Move from token IDs to embeddings, then understand why RNNs carry a hidden state, why LSTMs add gates, and why attention later changes the sequence path.",
    introduction: "Text and other sequences arrive in an order. A token is one item in that sequence, often a word or word piece. Token IDs are only lookup addresses; ID 20 is not twice the meaning of ID 10. An embedding table converts each ID into a learned vector. A recurrent neural network, or RNN, then processes tokens one after another, updating a hidden state that summarizes what has been seen so far. Training an RNN requires backpropagation through time, which unfolds the repeated state updates and sends gradients through many steps. Long chains can make gradients vanish or explode. An LSTM adds a cell state and learned gates that provide a more controlled memory route. These models lead naturally to attention: instead of forcing all context through one sequential state, attention can connect a token directly with other relevant token representations.",
    concepts: [
      "Embedding: map a discrete token ID to a learned vector. Similar-use tokens can develop useful geometric relationships, but the coordinates do not come with human-written meanings.",
      "RNN: reuse the same update rule at each time step. The new hidden state depends on both the current token representation and the previous hidden state, so order matters.",
      "Backpropagation through time is ordinary backpropagation applied to the unrolled recurrent steps. Long products of derivatives create vanishing/exploding-gradient problems.",
      "LSTM: maintain a separate cell state and use sigmoid-based input, forget, and output gates to control what information is written, retained, and exposed.",
      "Bidirectional sequence models can use past and future context, which is useful for encoding but invalid for causal next-token generation because future tokens are not available yet."
    ],
    vocabulary: [
      word("embedding", "embedding", "A learned vector used to represent a discrete item for neural-network calculations.", "A learned numerical description card for each token", "Token ID 7 selects row 7 of an embedding table.", "The token ID itself treated as a meaningful numerical magnitude."),
      word("hidden-state", "hidden state", "A recurrent model's running numerical representation of information carried from earlier sequence positions.", "A compact running notebook updated after every word", "h₂ depends on both x₂ and h₁.", "A permanent memory containing every earlier token exactly."),
      word("lstm", "LSTM", "A recurrent network with a cell state and learned gates that regulate information flow.", "A running notebook with learned keep, write, and reveal controls", "A forget gate near zero suppresses part of the previous cell state.", "A guarantee that arbitrarily long dependencies will always be remembered.")
    ],
    scenario: { title: "Carry information forward through an ordered list", body: "A running total changes as purchases arrive one after another. The next state depends on the current purchase and what was already remembered." },
    everydayExample: example("Update a running memory", "Start at 0; purchases cost 2 then 3 coins.", [["After the first purchase: 0+2=2.", "The state now carries information from the first item."], ["After the second: 2+3=5.", "The previous state contributes to the next state."], ["Notice that a plain total forgets order.", "A real recurrent state can encode more than a sum because its learned transformation is nonlinear and multidimensional."]], "Running total 5", "The key sequence idea is that the next state depends on earlier state plus current input."),
    mlExample: example("A tiny recurrent update", "Use scalar token representations x₁=2, x₂=3, start h₀=0, and use hₜ=0.5hₜ₋₁+xₜ.", [["h₁=0.5×0+2=2.", "The first state combines the initial memory with token 1."], ["h₂=0.5×2+3=4.", "The second state keeps half the earlier state and adds the new input."], ["Reverse the inputs: h₁=3 then h₂=0.5×3+2=3.5.", "Different order gives a different final state."], ["A real RNN replaces this scalar toy rule with vectors, matrices, a bias, and an activation.", "The toy case reveals the recurrence without hiding it in tensor notation."]], "Final state 4; reversed order gives 3.5", "RNNs encode order by repeatedly combining the current token with a state from the previous step."),
    task: "Explain token ID → embedding → recurrent hidden state → LSTM memory, and why long recurrent chains motivated attention-based models.",
    notation: notation("hₜ = 0.5hₜ₋₁ + xₜ", "For this toy recurrence, keep half the previous state and add the current token representation.", [["t", "The sequence position."], ["xₜ", "The current input representation."], ["hₜ₋₁", "The previous hidden state."], ["hₜ", "The updated hidden state."]]),
    questions: [
      question("sequence-story", "What is a token ID primarily used for?", ["Selecting a learned embedding row", "Measuring how important the token is", "Storing the final probability"], 0, "The ID is an index into a vocabulary or embedding table."),
      question("sequence-try", "Why can a plain RNN struggle with very long dependencies?", ["Gradients pass through many repeated steps and can vanish or explode", "It has no weights", "It cannot accept vectors"], 0, "Backpropagation through a long recurrent chain repeatedly multiplies derivative factors."),
      question("sequence-ml", "What important change does attention introduce compared with a purely recurrent path?", ["A token can directly combine information from other relevant token representations", "All sequence order disappears automatically", "Weights no longer need training"], 0, "Attention creates direct content-dependent connections instead of routing everything only through the previous hidden state.")
    ],
    misconception: { wrong: "An embedding is a dictionary definition stored as a vector.", correction: "It is a learned numerical representation. Its geometry can encode useful relationships, but individual coordinates are not normally human-written meanings." }
  },

  "attention-transformers": {
    goal: "Build the transformer mental model from token embeddings to Q/K/V attention, multiple heads, one transformer block, and repeated layers.",
    introduction: "A transformer is still a neural network: it uses learned weight matrices, activations, losses, backpropagation, and optimizers. What changes is how information moves between sequence positions. Start with token embeddings plus position information. Inside one transformer block, multi-head self-attention lets each token representation gather information from other relevant token representations. Then a feed-forward MLP processes each token position. Residual connections and normalization support stable information flow. The block is repeated many times. A transformer block is a layer-like module; it is not one neuron. Multi-head attention is one component inside that block; it is not something stored inside every neuron. Each attention head is one parallel Q/K/V matching-and-mixing calculation. After the final blocks, output layers produce logits such as next-token scores.",
    concepts: [
      "Q, K, and V are learned projections of token representations. Query means what this position is looking for; key means what another position offers for matching; value is the information that may be mixed into the result.",
      "One attention head computes query-key dot-product scores, scales them, applies softmax to get weights, then uses those weights to mix value vectors.",
      "Multi-head attention runs several attention heads in parallel with different learned projection matrices. Their outputs are concatenated and projected back into the model dimension. Heads can learn different relationship patterns, but their roles are not assigned by a programmer.",
      "One transformer block usually contains multi-head self-attention, residual/add-and-normalize structure, and a feed-forward MLP that acts separately on each token representation.",
      "Stacking many transformer blocks creates depth. Attention mixes information across token positions; the feed-forward MLP transforms each position's features. Both use ordinary neural-network weights learned by backpropagation.",
      "For autoregressive language modelling, a causal mask prevents a token from attending to future tokens. The final representation is converted to vocabulary logits, softmax produces next-token probabilities, and decoding chooses the next token."
    ],
    vocabulary: [
      word("attention", "attention", "A learned mechanism that scores relationships and mixes value information using normalized weights.", "Looking through notes for the most relevant passages before combining them", "A query scores two keys and gives their values weights 0.73 and 0.27.", "A proof that the model truly understands the relationship."),
      word("attention-head", "attention head", "One parallel set of Q/K/V projections followed by score, softmax, and value mixing.", "One researcher using one matching strategy to read the same set of notes", "Eight-head attention performs eight learned attention calculations in parallel.", "A neuron contained inside every token."),
      word("transformer-block", "transformer block", "A repeated neural-network module containing attention, feed-forward processing, residual paths, and normalization.", "A workshop stage where tokens exchange information and then each token is processed further", "A GPT-style model stacks many transformer blocks.", "One single attention head with no MLP or residual structure.")
    ],
    scenario: { title: "Ask several researchers to consult the same notes", body: "Each researcher looks for a different kind of relevance, combines useful passages, and then the combined result is processed before moving to the next stage." },
    everydayExample: example("Mix two estimates by relevance", "Estimates are 2 and 6 hours. Give them relevance weights 0.75 and 0.25.", [["Compute 0.75×2=1.5 and 0.25×6=1.5.", "Each weight controls how much that source contributes."], ["Add the contributions to get 3 hours.", "A weighted mixture produces a new representation influenced more by the higher-weight source."]], "3 hours", "Attention uses learned relevance weights to make this kind of weighted mixture of value vectors."),
    mlExample: example("Go from Q/K scores to a value mixture", "Use query q=[1,0], keys k₁=[1,0] and k₂=[0,1], and scalar values v₁=2, v₂=6. Ignore the scale factor for this tiny example.", [["Compute q·k₁=1 and q·k₂=0.", "Dot products measure how well this query matches each key."], ["Softmax([1,0]) gives approximate weights [0.73,0.27].", "Softmax turns the two scores into positive weights summing to one."], ["Mix the values: 0.73×2+0.27×6≈3.08.", "The weights are applied to values, not to the target labels."], ["A multi-head block repeats this process in several learned subspaces, concatenates the head outputs, and continues through the block's MLP.", "Multi-head attention is a component of a transformer block, not a separate neuron hierarchy."]], "Attention output ≈ 3.08", "Q and K determine relevance; V supplies the information. Transformer depth comes from stacking whole blocks."),
    task: "Trace tokens → embeddings → Q/K/V → attention weights → value mixture → multi-head combination → feed-forward MLP → repeated transformer blocks → output logits.",
    notation: notation("Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V", "Multiply queries by transposed keys to get relevance scores, scale them, apply softmax to obtain weights, then use those weights to mix the values.", [["Q", "Query vectors: what each position is looking for."], ["K", "Key vectors: what each position offers for matching."], ["V", "Value vectors: information available to mix."], ["dₖ", "The key dimension used to scale dot-product magnitude."], ["softmax(...)V", "Normalized attention weights multiplied by the value vectors."]]),
    questions: [
      question("attention-story", "What do Q and K primarily determine?", ["Attention scores and weights", "The target labels", "The optimizer learning rate"], 0, "Query-key matching produces the relevance scores that softmax turns into weights."),
      question("attention-try", "What is an attention head?", ["One parallel Q/K/V attention calculation", "One hidden neuron that contains many layers", "The final loss function"], 0, "A head is one attention calculation with its own learned projections."),
      question("attention-ml", "Where does multi-head attention sit in the transformer mental model?", ["As one component inside each transformer block", "Inside every individual neuron", "Outside the neural network after training"], 0, "A transformer block contains multi-head attention plus feed-forward processing, residual paths, and normalization.")
    ],
    misconception: { wrong: "A transformer is a normal neural network plus one extra attention layer placed on top.", correction: "A transformer is a neural-network architecture built from repeated blocks. Attention is integrated inside each block alongside ordinary feed-forward neural-network components." }
  }
};

const everydayQuantities = {
  "tensors-perceptrons": [["Signal 1", "2", "Weighted by +3."], ["Signal 2", "1", "Weighted by −1."], ["Bias", "2", "Added after the weighted inputs."]],
  "activations-losses": [["Pre-activation score", "−2", "The neuron's score before ReLU."], ["Target", "1", "The value used to judge the activated output."]],
  "forward-backprop": [["Flour rate", "2 scoops per tray", "The first local change rate."], ["Flour price", "3 coins per scoop", "The second local change rate."]],
  "deep-optimization-regularization": [["Current weight", "3", "The parameter being updated."], ["Gradient", "4", "Local loss increase per unit weight."], ["Learning rate", "0.1", "Scales the optimizer step."]],
  "pytorch-training-loop": [["Current weight", "3", "A learned parameter in the model."], ["Gradient", "4", "Produced by backward()."], ["Learning rate", "0.1", "Used by the optimizer update."], ["Batch", "Several examples", "Processed together before one update."]],
  "cnn-convolution": [["Local inputs", "2, 5, 4", "Ordered values being scanned."], ["Kernel", "[1, −1]", "Shared local weights reused at each position."]],
  "sequence-models": [["Token representations", "2 then 3", "Toy scalar stand-ins for embeddings."], ["Initial hidden state", "0", "Memory before reading the sequence."], ["Retention factor", "0.5", "How much previous state this toy rule keeps."]],
  "attention-transformers": [["Query", "[1, 0]", "What the current position is looking for."], ["Two keys", "[1,0], [0,1]", "Representations available for matching."], ["Values", "2 and 6", "Information to mix after scoring relevance."]]
};
for (const [id, guide] of Object.entries(DEEP_LEARNING_GUIDES)) {
  guide.everydayExample.quantities = everydayQuantities[id].map(([label, value, meaning]) => ({ label, value, meaning }));
  guide.mlExample.mapping = [{ math: "Model setup", ml: guide.mlExample.prompt }, ...guide.notation.symbols.map(([math, ml]) => ({ math, ml }))];
}
