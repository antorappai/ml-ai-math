import { check, codeLab, progressiveLesson } from "../lessonBuilder.js";

const notebookLab = (config) => codeLab({ runtime: "notebook", packages: ["torch"], ...config });

export const deepLearningLessons = [
  progressiveLesson({
    id: "tensors-perceptrons",
    chapterId: "deep-learning",
    order: 1,
    title: "Neurons, Perceptrons, MLPs & Tensors",
    subtitle: "Start with one weighted neuron, then grow the same idea into dense layers, neural networks, and batched tensor calculations.",
    prerequisites: ["matrix-matrix-multiplication", "logistic-classification"],
    tags: ["neuron", "perceptron", "ann", "mlp", "tensors", "dense-layer"],
    scenario: { title: "A committee of weighted signals", body: "Several signals vote with different strengths. Their weighted contributions are added, a bias shifts the total, and a response rule turns the score into an output.", mlParallel: "An artificial neuron computes a weighted sum and activation; a dense layer repeats that calculation with many neurons." },
    mlConnection: "The same weighted-sum idea connects perceptrons, logistic regression, dense layers, MLPs, and the matrix operations used throughout deep learning.",
    projectIds: ["mlp-mini", "deep-capstone"],
    basics: {
      summary: "Understand the artificial neuron without pretending it is a realistic biological neuron.",
      concepts: [
        "The biological analogy is loose: synaptic strength resembles the idea of a numerical weight controlling influence, but an ANN is not a biological simulation.",
        "A perceptron adds weighted inputs and a bias, then uses a hard threshold. A modern artificial neuron usually uses a differentiable activation instead.",
        "Weights control how strongly each input contributes; bias shifts the score before activation."
      ],
      formulaIds: ["neuron"],
      example: { title: "Compute one neuron", prompt: "x=(2,1), w=(3,-1), b=2. Find the pre-activation z.", steps: ["Multiply and add the input contributions: 2×3 + 1×(-1) = 5.", "Add bias 2."], answer: "z=7", interpretation: "The positive weight raises the score, the negative weight lowers it, and the bias shifts the total." },
      pythonLab: codeLab({ title: "One dense calculation with NumPy", goal: "See a weighted layer as matrix multiplication plus bias.", code: "import numpy as np\nX = np.array([[1.,2.],[3.,4.]])\nW = np.array([[.5,-1.],[1.,.25]])\nb = np.array([.1,.2])\nprint(X @ W + b)", output: "[[ 2.6  -0.3 ]\n [ 5.6  -1.8 ]]", explanation: "Each row is one example; each output column belongs to one neuron." , packages: ["numpy"] }),
      questions: [check("tensor-b1", "Which artificial-neural-network quantity is most loosely comparable to synaptic connection strength?", ["A weight", "The batch size", "The class label", "The epoch number"], 0, "A weight controls how strongly an input influences an artificial neuron's score; the analogy should not be taken as biological fidelity.")],
      examNotes: ["State clearly that biological neurons motivate the analogy, not the actual ANN learning mechanism."]
    },
    core: {
      summary: "Move from one neuron to a whole dense layer and keep every tensor shape visible.",
      concepts: [
        "A dense layer contains many neurons. The layer itself is not one neuron.",
        "Each output neuron owns a different set of weights, so one input vector can produce several output values.",
        "A batch tensor groups several examples. A common 2D convention is batch × features."
      ],
      formulaIds: ["neuron", "matrix-product"],
      example: { title: "Read a layer shape", prompt: "Batch X is 32×10 and W is 10×5. What is XW shape, and what do the 5 columns mean?", steps: ["The inner dimensions 10 and 10 match.", "Keep the outer dimensions 32 and 5.", "Interpret each of the 5 columns as one output unit across the batch."], answer: "32×5; five neuron outputs for each of 32 examples", interpretation: "Matrix multiplication lets many neuron calculations run together." },
      pythonLab: notebookLab({ title: "PyTorch dense layer", goal: "Create a batched tensor and a Linear layer.", code: "import torch\nlayer = torch.nn.Linear(10, 5)\nX = torch.randn(32, 10)\ny = layer(X)\nprint(X.shape, y.shape)", output: "torch.Size([32, 10]) torch.Size([32, 5])", explanation: "The layer stores trainable weights and bias; the batch dimension remains 32.", notebookPath: "notebooks/deep-learning-foundations.ipynb" }),
      questions: [check("tensor-c1", "A dense layer has 5 output units. What does that mean?", ["It contains five neurons producing five outputs", "It is one neuron with five names", "It requires five training examples", "It has no weights"], 0, "Each output unit has its own learned weight vector and bias.")],
      examNotes: ["Write tensor shapes and say what each axis means before multiplying."]
    },
    advanced: {
      summary: "Place ANN, MLP, deep network, vectorization, broadcasting, and autograd into one mental model.",
      concepts: [
        "ANN is the broad term for a network of artificial neurons. An MLP is a feed-forward ANN made from stacked dense layers and nonlinear activations.",
        "Deep usually means several learned hidden layers between input and output; training learns parameter values inside an architecture chosen by people.",
        "Vectorization replaces repeated Python loops with tensor operations; broadcasting reuses compatible values such as one bias vector across a batch; autograd records operations needed for gradients."
      ],
      formulaIds: ["neuron", "matrix-product", "backprop"],
      example: { title: "Recognize an MLP", prompt: "A network has widths 3 → 8 → 4 → 1 with ReLU between hidden layers. What are the 8 and 4?", steps: ["Treat 3 as input features and 1 as output width.", "The 8 and 4 are hidden-layer widths.", "Each width tells how many neurons are in that dense layer."], answer: "Two hidden dense layers with 8 and 4 neurons", interpretation: "The MLP architecture is chosen before training; training adjusts the weights and biases inside it." },
      questions: [check("tensor-a1", "Which statement is correct?", ["A tensor is another kind of neuron", "An MLP stacks dense neural layers", "Every ANN is a biological simulation", "A layer is always one neuron"], 1, "An MLP is a feed-forward ANN built from stacked dense layers and activations.")],
      examNotes: ["Keep architecture, parameter tensors, activations, and data tensors conceptually separate."]
    }
  }),

  progressiveLesson({
    id: "activations-losses",
    chapterId: "deep-learning",
    order: 2,
    title: "Activation Functions, Logits & Losses",
    subtitle: "See why nonlinear activations create expressive networks and why loss is a separate score of prediction quality.",
    prerequisites: ["tensors-perceptrons", "gradient-descent-learning-rate"],
    tags: ["relu", "sigmoid", "softmax", "logits", "loss"],
    scenario: { title: "Response rule versus error score", body: "A controller decides how a system responds to an input, while a separate score measures how far the resulting behaviour is from the target.", mlParallel: "An activation shapes a neuron's output; a loss measures how undesirable the prediction is." },
    mlConnection: "Nonlinearity lets deep networks represent complex functions, while task-appropriate losses provide the scalar objective used for learning.",
    basics: {
      summary: "Understand why stacking only linear layers is not enough.",
      concepts: [
        "Without nonlinear activations, several dense linear layers collapse mathematically into one linear transformation.",
        "ReLU returns max(0,z), creating a bend at zero and allowing the network to build nonlinear piecewise representations.",
        "Activation is applied to a unit's score; loss is calculated by comparing model output with the target."
      ],
      formulaIds: ["relu", "sigmoid"],
      example: { title: "Apply ReLU", prompt: "Apply ReLU to (-2,0,3).", steps: ["Replace negative values with zero.", "Keep nonnegative values."], answer: "(0,0,3)", interpretation: "The activation changes the response rule; it does not itself measure correctness." },
      pythonLab: codeLab({ title: "Activation functions", goal: "Compute ReLU and stable softmax with NumPy.", code: "import numpy as np\nz = np.array([-2., 0., 3.])\nprint(np.maximum(0, z))\nshifted = z - z.max()\np = np.exp(shifted) / np.exp(shifted).sum()\nprint(np.round(p, 3))", output: "[0. 0. 3.]\n[0.006 0.047 0.946]", explanation: "ReLU shapes hidden activations; softmax converts several logits into normalized probabilities.", packages: ["numpy"] }),
      questions: [check("activation-b1", "Why place nonlinear activations between dense layers?", ["Otherwise stacked linear layers remain one linear map", "To make all matrices square", "To remove weights", "To guarantee zero loss"], 0, "The nonlinearity is what lets stacked layers represent more than one linear transformation.")],
      examNotes: ["Be able to explain why depth without nonlinearity does not buy expressive power."]
    },
    core: {
      summary: "Separate raw logits, probabilities, predictions, and loss.",
      concepts: [
        "A logit is an unrestricted output score. Sigmoid can convert one binary logit into a probability; softmax converts several class logits into probabilities summing to one.",
        "MSE is common for continuous regression; cross-entropy is common for classification and heavily penalizes confident wrong predictions.",
        "Library losses may expect raw logits rather than probabilities for numerical stability."
      ],
      formulaIds: ["mse", "binary-cross-entropy", "multiclass-cross-entropy", "softmax"],
      example: { title: "Confident mistake", prompt: "The true class receives probability 0.001. Why is cross-entropy large?", steps: ["Use −log(0.001).", "Very small correct-class probability produces a large positive penalty."], answer: "The model was confidently wrong", interpretation: "Cross-entropy does more than check the final class label; it cares about the probability assigned to the correct answer." },
      questions: [check("activation-c1", "What should usually be passed to PyTorch CrossEntropyLoss?", ["Raw logits", "Softmax probabilities", "Only gradients", "Class names as strings"], 0, "CrossEntropyLoss performs a stable log-softmax internally.")],
      examNotes: ["Always check whether the framework loss expects logits or probabilities."]
    },
    advanced: {
      summary: "Connect activation choice to gradient flow and class-imbalance decisions.",
      concepts: [
        "Sigmoid and tanh saturate at large magnitudes, where their slopes become small and gradients can weaken.",
        "A ReLU unit can become inactive if it remains on the negative side and receives no useful gradient.",
        "Weighted cross-entropy or focal-style losses can put more emphasis on rare or difficult examples."
      ],
      formulaIds: ["relu", "sigmoid", "multiclass-cross-entropy"],
      example: { title: "Vanishing sigmoid gradient", prompt: "What happens to sigmoid's derivative when its input becomes very large positive or negative?", steps: ["The output approaches 1 or 0.", "The curve becomes nearly flat."], answer: "The gradient becomes very small", interpretation: "Earlier parameters can receive a weak learning signal through saturated activations." },
      questions: [check("activation-a1", "What is a dead ReLU?", ["A unit staying at zero and receiving no useful gradient", "A perfect classifier", "A softmax category", "A tensor with no batch"], 0, "Persistent negative pre-activations can keep the ReLU output and gradient at zero.")],
      examNotes: ["Discuss both the forward output and backward derivative of an activation."]
    }
  }),

  progressiveLesson({
    id: "forward-backprop",
    chapterId: "deep-learning",
    order: 3,
    title: "Forward Propagation, Backpropagation & Gradients",
    subtitle: "Follow values forward, compute loss, then use the chain rule backward to calculate a gradient for every parameter.",
    prerequisites: ["activations-losses", "chain-rule-computational-graphs"],
    tags: ["forward-pass", "backprop", "gradient", "autograd"],
    scenario: { title: "Trace responsibility through a chain", body: "A final result depends on several earlier calculations. To improve it, trace how a small change in each earlier quantity would affect the final error.", mlParallel: "Backpropagation calculates how each parameter affects final loss." },
    mlConnection: "Backpropagation is the chain rule organized efficiently across a neural network; an optimizer uses the resulting gradients afterward.",
    basics: {
      summary: "Keep four stages separate: forward pass, loss, backpropagation, optimizer update.",
      concepts: [
        "Forward pass computes activations, prediction, and loss.",
        "Backpropagation works from the loss backward through dependencies to calculate parameter gradients.",
        "Backpropagation does not update weights; the optimizer performs that later step."
      ],
      formulaIds: ["chain-rule", "backprop"],
      example: { title: "One derivative chain", prompt: "L depends on a, a on z, and z on w. How do we find dL/dw?", steps: ["Find dL/da.", "Multiply by da/dz.", "Multiply by dz/dw."], answer: "dL/dw=(dL/da)(da/dz)(dz/dw)", interpretation: "Each local derivative transmits sensitivity one step backward." },
      questions: [check("backprop-b1", "Which statement is correct?", ["Backpropagation changes weights directly", "Backpropagation calculates gradients; the optimizer changes weights", "The forward pass computes gradients only", "Loss is calculated after optimizer.step"], 1, "Gradient calculation and parameter updating are separate stages.")],
      examNotes: ["Write the computation graph or dependency chain before differentiating."]
    },
    core: {
      summary: "Calculate a small gradient manually, then inspect the same idea with PyTorch autograd.",
      concepts: [
        "The sign of a gradient tells which local direction increases the loss; the magnitude measures local sensitivity.",
        "Parameter gradients have the same shapes as their parameters.",
        "PyTorch accumulates gradients in .grad by default, so training loops normally clear them before the next backward pass."
      ],
      formulaIds: ["backprop", "gradient-descent", "matrix-product"],
      example: { title: "Local gradient product", prompt: "dL/da=2, da/dz=0.25, dz/dw=8. Find dL/dw.", steps: ["Multiply the local derivatives: 2×0.25×8."], answer: "4", interpretation: "A small local derivative can shrink the signal; large repeated factors can amplify it." },
      pythonLab: notebookLab({ title: "Autograd inspection", goal: "Compare an automatic gradient with the manual derivative.", code: "import torch\nw = torch.tensor(3.0, requires_grad=True)\nx = torch.tensor(2.0)\nloss = (w*x - 5)**2\nloss.backward()\nprint(w.grad)", output: "tensor(4.)", explanation: "At w=3 and x=2, dL/dw = 2(wx−5)x = 4.", notebookPath: "notebooks/backprop-autograd.ipynb" }),
      questions: [check("backprop-c1", "Why is optimizer.zero_grad() normally called before a new training step?", ["PyTorch gradients accumulate by default", "It deletes the model", "It applies softmax", "It changes labels"], 0, "Without clearing .grad, the next backward pass adds new gradients to the old ones.")],
      examNotes: ["Track gradient signs, values, and tensor shapes."]
    },
    advanced: {
      summary: "Understand vanishing/exploding gradients and why reverse-mode autodiff suits neural networks.",
      concepts: [
        "Deep backpropagation multiplies many local derivatives or Jacobian products.",
        "Repeated factors below one can make early-layer gradients vanish; large factors can make them explode.",
        "Reverse-mode automatic differentiation is efficient when one scalar loss depends on many parameters."
      ],
      formulaIds: ["backprop", "chain-rule", "gradient"],
      example: { title: "Vanishing chain", prompt: "Twenty local derivative factors are each about 0.5. What happens to their product?", steps: ["Multiply 0.5 repeatedly.", "The result becomes extremely small."], answer: "The gradient vanishes", interpretation: "Parameters far back in the chain may learn very slowly." },
      questions: [check("backprop-a1", "Why is reverse-mode autodiff suitable for most neural-network training?", ["There is one scalar loss and many parameters", "There are no parameters", "Only linear functions can be differentiated", "It requires one input feature"], 0, "Reverse mode efficiently reuses backward calculations from a scalar objective to many parameters.")],
      examNotes: ["Do not confuse vanishing gradients with the normal small gradient near a genuine optimum."]
    }
  }),

  progressiveLesson({
    id: "deep-optimization-regularization",
    chapterId: "deep-learning",
    order: 4,
    title: "Optimizers, Initialization, Regularization & Generalization",
    subtitle: "Give each training technique a clear job: start weights well, move them well, stabilize learning, and avoid memorizing the training set.",
    prerequisites: ["forward-backprop", "model-selection-generalization"],
    tags: ["sgd", "adam", "xavier", "he", "dropout", "weight-decay", "generalization"],
    scenario: { title: "Start well, step well, and avoid memorizing the route", body: "A learner needs a sensible starting point, a useful rule for responding to feedback, and a way to check that the skill works on fresh problems rather than only familiar ones.", mlParallel: "Initialization, optimizers, stabilization, and regularization solve different training problems." },
    mlConnection: "Deep-learning reliability depends as much on initialization, optimization, and generalization as on architecture choice.",
    basics: {
      summary: "Understand why zero hidden weights fail and when Xavier versus He initialization is useful.",
      concepts: [
        "Identical hidden weights preserve symmetry: identical neurons receive identical signals and gradients, so they fail to specialize.",
        "Xavier/Glorot initialization scales random weights using fan-in and fan-out and is commonly associated with tanh or sigmoid-style networks.",
        "He/Kaiming initialization scales weights mainly from fan-in and is designed for ReLU-family activations; zero biases are generally fine when weights already break symmetry."
      ],
      formulaIds: ["gradient-descent", "standard-deviation"],
      example: { title: "Choose an initialization", prompt: "You are building a ReLU MLP. Which is a sensible default idea: identical zero hidden weights or He/Kaiming-style random weights?", steps: ["ReLU networks need hidden units to begin differently.", "He/Kaiming scaling is designed for rectifier activations."], answer: "He/Kaiming-style random weights", interpretation: "Initialization should preserve useful signal scale while breaking symmetry." },
      questions: [check("deepopt-b1", "Which initialization is especially associated with ReLU-family activations?", ["He/Kaiming", "All-zero hidden weights", "No initialization", "A confusion matrix"], 0, "He/Kaiming initialization was designed around rectifier-style activations.")],
      examNotes: ["Know the reason for random initialization, not only the names Xavier and He."]
    },
    core: {
      summary: "Compare SGD, momentum, RMSProp, and Adam as different ways to turn gradients into updates.",
      concepts: [
        "SGD follows the current gradient using one learning rate.",
        "Momentum carries a running velocity, smoothing noisy directions and building speed along consistent directions.",
        "RMSProp uses squared-gradient history for adaptive scaling; Adam combines momentum-like first moments with adaptive second moments."
      ],
      formulaIds: ["gradient-descent"],
      example: { title: "Optimizer state", prompt: "Why can Adam take different effective step sizes for two parameters even with one global learning rate?", steps: ["The parameters have different gradient histories.", "Adam rescales updates using estimated first and second moments."], answer: "Adaptive per-parameter scaling", interpretation: "Adam changes how gradient information is used; it does not remove the need for a sensible learning rate." },
      pythonLab: notebookLab({ title: "Compare optimizers", goal: "Inspect SGD with momentum and Adam on the same parameter set.", code: "import torch\nmodel = torch.nn.Linear(4, 1)\nsgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)\nadam = torch.optim.Adam(model.parameters(), lr=0.001)\nprint(type(sgd).__name__, type(adam).__name__)", output: "SGD Adam", explanation: "The optimizers keep different internal state and usually need different learning-rate tuning.", notebookPath: "notebooks/optimizers-regularization.ipynb" }),
      questions: [check("deepopt-c1", "What does momentum add to plain SGD?", ["A running velocity based on past gradients", "A new class label", "A larger test set", "A softmax layer automatically"], 0, "Momentum carries directional history across updates.")],
      examNotes: ["Optimizer choice and learning-rate choice are separate decisions."]
    },
    advanced: {
      summary: "Separate stabilization from regularization and judge success by validation performance.",
      concepts: [
        "Weight decay discourages large weights; dropout randomly removes activations during training; data augmentation creates useful input variation; early stopping keeps a checkpoint before validation performance deteriorates.",
        "Batch normalization changes behaviour between training and evaluation because it uses batch statistics during training and stored running statistics at evaluation.",
        "Gradient clipping primarily addresses exploding updates; train/validation curves reveal whether optimization is improving training fit while generalization is getting worse."
      ],
      formulaIds: ["gradient-descent", "ridge", "standard-deviation"],
      example: { title: "Recognize overfitting", prompt: "Training loss keeps falling, but validation loss starts rising. What is the main warning?", steps: ["Training fit is still improving.", "Held-out performance is getting worse."], answer: "Overfitting", interpretation: "Generalization, not the lowest training loss, is the real goal." },
      questions: [check("deepopt-a1", "Which technique primarily limits exploding gradients?", ["Gradient clipping", "Dropout", "Softmax", "Xavier initialization only"], 0, "Clipping limits gradient norm or values before the update.")],
      examNotes: ["For each technique, state whether it targets initialization, optimization, numerical stability, regularization, or evaluation."]
    }
  }),

  progressiveLesson({
    id: "pytorch-training-loop",
    chapterId: "deep-learning",
    order: 5,
    title: "PyTorch MLPs: Batches, Epochs, Training & Inference",
    subtitle: "Build a small MLP and map every line of the training loop to the maths you already know.",
    prerequisites: ["deep-optimization-regularization", "logistic-classification"],
    tags: ["pytorch", "mlp", "batch", "epoch", "training-loop", "inference"],
    scenario: { title: "Practise, receive feedback, then perform", body: "During practice, feedback changes a musician's technique. During the performance, the learned technique is used without running the whole practice routine after every note.", mlParallel: "Training changes parameters; inference uses fixed learned parameters." },
    mlConnection: "PyTorch exposes the exact cycle: batch → forward pass → loss → backward gradients → optimizer update, repeated across epochs.",
    projectIds: ["mlp-mini", "deep-capstone"],
    basics: {
      summary: "Separate architecture choices from the parameters that training learns.",
      concepts: [
        "An MLP might be designed as 3 inputs → 8 hidden units → ReLU → 4 hidden units → ReLU → 1 output. Those layer widths and activations are architecture choices.",
        "torch.nn.Linear creates weight and bias parameters; training changes their numerical values, not usually the number of layers.",
        "A batch is a group of examples processed together; an epoch is one pass through the training dataset."
      ],
      formulaIds: ["neuron", "binary-cross-entropy"],
      example: { title: "Choose structure, learn numbers", prompt: "A binary MLP has widths 3 → 8 → 4 → 1. What is chosen before training, and what is learned?", steps: ["Choose the layer sizes and activations.", "Let training adjust the weights and biases inside those layers."], answer: "Architecture is chosen; parameters are learned", interpretation: "Training tunes the numbers inside the model rather than normally inventing the architecture." },
      questions: [check("pytorch-b1", "Which quantity normally changes during training?", ["Weights and biases", "The chosen number of layers every batch", "The meaning of the labels", "The number of input features"], 0, "Gradient-based training updates trainable parameters.")],
      examNotes: ["Use architecture, parameter, batch, and epoch as separate terms."]
    },
    core: {
      summary: "Read the five visible operations in one normal PyTorch training step.",
      concepts: [
        "optimizer.zero_grad() clears old accumulated gradients.",
        "logits=model(X) performs the forward pass; loss=loss_fn(logits,y) produces the scalar objective.",
        "loss.backward() calculates gradients; optimizer.step() changes parameters using those gradients."
      ],
      formulaIds: ["gradient-descent", "binary-cross-entropy", "backprop"],
      example: { title: "One gradient update", prompt: "A weight is 3, gradient is 4, and learning rate is 0.1. Find the plain gradient-descent update.", steps: ["Scale the gradient: 0.1×4=0.4.", "Move opposite the positive gradient: 3−0.4=2.6."], answer: "2.6", interpretation: "The optimizer uses the gradient that backpropagation calculated." },
      pythonLab: notebookLab({ title: "PyTorch MLP training step", goal: "Read the complete order of one binary MLP update.", code: "import torch\nimport torch.nn as nn\n\nX = torch.tensor([[5., .9, .8], [2., .6, .5]])\ny = torch.tensor([[1.], [0.]])\nmodel = nn.Sequential(nn.Linear(3, 8), nn.ReLU(), nn.Linear(8, 1))\nloss_fn = nn.BCEWithLogitsLoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\n\noptimizer.zero_grad()\nlogits = model(X)\nloss = loss_fn(logits, y)\nloss.backward()\noptimizer.step()\nprint(logits.shape, loss.ndim)", output: "torch.Size([2, 1]) 0", explanation: "Two examples produce two logits; the scalar loss drives one backward pass and optimizer update.", notebookPath: "notebooks/deep-learning-foundations.ipynb" }),
      questions: [check("pytorch-c1", "What directly changes trainable parameters in a normal PyTorch step?", ["optimizer.step()", "loss.backward()", "model(X)", "model.eval()"], 0, "backward calculates gradients; optimizer.step uses them to update parameters.")],
      examNotes: ["Know the order zero_grad → forward → loss → backward → step."]
    },
    advanced: {
      summary: "Switch correctly from training to validation and inference, including the LLM connection.",
      concepts: [
        "model.train() enables training behaviour such as dropout; model.eval() uses evaluation behaviour for layers such as dropout and batch normalization.",
        "torch.no_grad() avoids building a gradient graph during ordinary inference.",
        "A normal user correction in an LLM chat changes the next context; it does not normally run a training loop or immediately modify the model's stored weights."
      ],
      formulaIds: ["softmax", "multiclass-cross-entropy"],
      example: { title: "Training versus inference", prompt: "A trained model receives a new input during deployment. What should happen to its weights during ordinary inference?", steps: ["Run the forward pass using the stored parameter values.", "Do not call backward or optimizer.step."], answer: "The weights stay fixed", interpretation: "Inference uses what training has already learned." },
      questions: [check("pytorch-a1", "Does model(X) by itself train the network?", ["No, it only runs a forward pass", "Yes, it always updates weights", "Only if X has two rows", "Only with ReLU"], 0, "Training needs loss calculation, backward gradients, and an optimizer update in addition to the forward pass.")],
      examNotes: ["Training changes weights; inference uses fixed weights."]
    }
  }),

  progressiveLesson({
    id: "cnn-convolution",
    chapterId: "deep-learning",
    order: 6,
    title: "Convolutional Neural Networks",
    subtitle: "Reuse small learned filters across space so the network can detect local patterns without a separate dense weight for every pixel location.",
    prerequisites: ["tensors-perceptrons", "activations-losses"],
    tags: ["cnn", "convolution", "images", "feature-maps"],
    scenario: { title: "Sliding pattern detector", body: "The same local edge can appear in different locations, so reuse one detector instead of inventing a different rule for every position.", mlParallel: "A convolution shares kernel weights across spatial positions and preserves local structure." },
    mlConnection: "CNNs are ordinary weighted neural computations arranged with local connectivity and weight sharing for spatial data.",
    projectIds: ["cnn-mini"],
    basics: {
      summary: "Understand kernel, local patch, weight sharing, and feature map.",
      concepts: [
        "A convolution output is still a weighted sum, but it uses only a local patch of the input.",
        "The same kernel weights are reused at different positions, reducing parameters and allowing one learned pattern to be detected across the image.",
        "The grid of responses from one filter is a feature map."
      ],
      formulaIds: ["convolution"],
      example: { title: "Output size", prompt: "Input width 5, kernel width 3, stride 1, no padding. What is output width?", steps: ["Count full placements: 5−3+1."], answer: "3", interpretation: "The local filter can begin in three valid positions." },
      questions: [check("cnn-b1", "Why share kernel weights across image positions?", ["To detect the same local pattern in different locations", "To guarantee rotation invariance", "To remove activations", "To avoid training"], 0, "Weight sharing encodes the idea that a useful local pattern can occur in different places.")],
      examNotes: ["Relate convolution back to the weighted-sum neuron calculation."]
    },
    core: {
      summary: "Track channels, stride, padding, and receptive field using explicit tensor shapes.",
      concepts: [
        "Input channels carry measurement types such as RGB; output channels correspond to different learned filters/features.",
        "Stride controls how far the kernel moves; padding adds border values and can preserve spatial dimensions.",
        "Deeper activations receive information from larger receptive fields because earlier feature maps already summarize neighbourhoods."
      ],
      formulaIds: ["convolution", "matrix-product"],
      example: { title: "Same spatial size", prompt: "Why does a 3×3 kernel with stride 1 often use padding 1?", steps: ["Add one border position on each side.", "The effective width and height allow an output at every original position."], answer: "To preserve width and height", interpretation: "Padding changes boundary handling without changing the learned kernel size." },
      pythonLab: notebookLab({ title: "CNN shapes in PyTorch", goal: "Inspect batch, channel, height, and width axes.", code: "import torch\nconv = torch.nn.Conv2d(3, 16, kernel_size=3, padding=1)\nX = torch.randn(8, 3, 32, 32)\nY = conv(X)\nprint(X.shape, Y.shape)", output: "torch.Size([8, 3, 32, 32]) torch.Size([8, 16, 32, 32])", explanation: "Batch remains 8, output channels become 16, and padding keeps 32×32 spatial size.", notebookPath: "notebooks/cnn-fundamentals.ipynb" }),
      questions: [check("cnn-c1", "What does Conv2d out_channels control?", ["Number of learned output feature maps", "Batch size", "Image width only", "Training epochs"], 0, "Each output channel is produced by learned kernels spanning the input channels.")],
      examNotes: ["Write N,C,H,W explicitly when using PyTorch image tensors."]
    },
    advanced: {
      summary: "Connect residual paths, transfer learning, and augmentation to optimization and generalization.",
      concepts: [
        "Residual connections add an identity path so information and gradients can bypass a difficult transformation.",
        "Transfer learning starts from representations learned on another dataset or task, then freezes or fine-tunes selected parameters.",
        "Data augmentation injects desired invariances by showing transformed training examples."
      ],
      formulaIds: ["convolution", "backprop"],
      example: { title: "Residual block", prompt: "Why add input x back to transformed output F(x)?", steps: ["Provide an identity route.", "Let the block learn a correction instead of rebuilding the whole representation."], answer: "Improved information and gradient flow", interpretation: "Residual networks made very deep CNNs easier to optimize." },
      questions: [check("cnn-a1", "What is transfer learning?", ["Starting from parameters or features learned on another task", "Training without data", "Removing all convolution layers", "Using only test images"], 0, "Pretrained representations can be adapted rather than learned entirely from scratch.")],
      examNotes: ["State which parameters are frozen and which are fine-tuned."]
    }
  }),

  progressiveLesson({
    id: "sequence-models",
    chapterId: "deep-learning",
    order: 7,
    title: "Embeddings, RNNs, LSTMs & Sequence Memory",
    subtitle: "Turn token IDs into learned vectors, carry a hidden state through time, and see why long recurrent paths motivated attention.",
    prerequisites: ["forward-backprop", "vector-magnitude-distance"],
    tags: ["embeddings", "rnn", "lstm", "bptt", "sequences"],
    scenario: { title: "Read information in order", body: "The interpretation of the current item may depend on what came earlier, so the model needs a representation that carries context forward through the sequence.", mlParallel: "RNNs repeatedly update a hidden state as they process ordered token representations." },
    mlConnection: "Embeddings and recurrent models build the sequence concepts that attention and transformers later reorganize.",
    basics: {
      summary: "Distinguish token IDs from embeddings and understand recurrent hidden state.",
      concepts: [
        "A token ID is an index, not a meaningful numerical magnitude; an embedding lookup returns a learned vector for that ID.",
        "An RNN reuses the same update rule at every time step.",
        "The next hidden state depends on both the current token representation and the previous hidden state, so order can matter."
      ],
      formulaIds: ["rnn", "vector-magnitude"],
      example: { title: "Embedding lookup", prompt: "What does token ID 7 do in an embedding layer?", steps: ["Use 7 as a row index.", "Return the learned vector stored in row 7."], answer: "It selects embedding row 7", interpretation: "The ID is an address; the learned vector is the representation used by the network." },
      questions: [check("sequence-b1", "Why not treat raw token IDs as continuous numeric values?", ["Their numbering would imply fake order and distance", "Token IDs are always negative", "RNNs cannot use numbers", "It would remove labels"], 0, "ID numbering is arbitrary; embeddings learn a useful geometry instead.")],
      examNotes: ["Track batch, sequence length, and embedding dimension separately."]
    },
    core: {
      summary: "Understand backpropagation through time and why LSTM gates help long-range learning.",
      concepts: [
        "Backpropagation through time unfolds the repeated RNN update and applies ordinary backpropagation across time steps.",
        "Long chains of recurrent derivatives can vanish or explode.",
        "LSTMs add a cell state plus input, forget, and output gates to create a more controlled memory pathway."
      ],
      formulaIds: ["rnn", "backprop", "sigmoid"],
      example: { title: "Long dependency", prompt: "Why can a plain RNN struggle to learn a signal from 100 steps earlier?", steps: ["Backpropagation crosses many repeated recurrent transformations.", "Repeated derivative factors can shrink the signal drastically."], answer: "Vanishing gradients", interpretation: "LSTM-style memory paths were designed to make long-range information easier to preserve and train." },
      pythonLab: notebookLab({ title: "Embedding and LSTM shapes", goal: "Follow token IDs into embeddings and recurrent outputs.", code: "import torch\nembed = torch.nn.Embedding(1000, 32)\nlstm = torch.nn.LSTM(32, 64, batch_first=True)\ntokens = torch.randint(0, 1000, (8, 20))\nembedded = embed(tokens)\nout, state = lstm(embedded)\nprint(embedded.shape, out.shape)", output: "torch.Size([8, 20, 32]) torch.Size([8, 20, 64])", explanation: "Every one of 20 token positions receives a 32D embedding and a 64D recurrent output.", notebookPath: "notebooks/sequence-models.ipynb" }),
      questions: [check("sequence-c1", "What does an LSTM forget gate control?", ["How much previous cell-state information is retained", "The number of classes", "Image padding", "The train-test split"], 0, "The forget gate scales information carried from the previous cell state.")],
      examNotes: ["Distinguish hidden state from cell state in an LSTM."]
    },
    advanced: {
      summary: "See the transition from recurrence to attention and keep causal constraints clear.",
      concepts: [
        "Bidirectional recurrent models can use future context, so they are unsuitable for causal next-token generation where future tokens are unavailable.",
        "Padding masks stop fake padding positions from contributing to sequence calculations.",
        "Attention changes the information path: instead of routing all context only through the previous hidden state, a token can directly mix information from other relevant token representations."
      ],
      formulaIds: ["rnn", "multiclass-cross-entropy"],
      example: { title: "Why attention helps the path length", prompt: "A useful word occurred 80 tokens ago. What is the conceptual difference between a plain RNN and attention?", steps: ["The RNN carries influence through many sequential hidden-state updates.", "Attention can create a direct content-dependent connection to the earlier representation."], answer: "Attention shortens the information path between distant tokens", interpretation: "This does not make attention perfect, but it changes how sequence information can be accessed." },
      questions: [check("sequence-a1", "What should a padding mask do?", ["Prevent padded positions contributing", "Give padding high attention", "Create new labels", "Increase sequence length"], 0, "Padding exists for shape alignment and should not behave like real data.")],
      examNotes: ["State whether a sequence task permits future context."]
    }
  }),

  progressiveLesson({
    id: "attention-transformers",
    chapterId: "deep-learning",
    order: 8,
    title: "Attention, Multi-Head Attention & Transformers",
    subtitle: "Build the transformer from Q/K/V matching, value mixing, multiple heads, feed-forward MLPs, residual paths, and repeated blocks.",
    prerequisites: ["sequence-models", "dot-product-angle", "activations-losses"],
    tags: ["attention", "multi-head", "transformer", "qkv", "language-model"],
    scenario: { title: "Consult relevant notes from several perspectives", body: "To answer one question, several researchers can scan the same notes using different matching strategies, combine useful information, and pass the result into another processing stage.", mlParallel: "Attention heads perform parallel Q/K/V matching and value mixing inside a transformer block." },
    mlConnection: "Transformers are neural networks built from repeated attention-and-MLP blocks trained with the same weights, losses, backpropagation, and optimization principles already learned.",
    projectIds: ["attention-mini", "deep-capstone"],
    basics: {
      summary: "Understand Q, K, V and one complete attention head before discussing multiple heads.",
      concepts: [
        "Query represents what a token position is looking for; keys represent what positions offer for matching; values contain the information that may be mixed.",
        "One attention head computes query-key dot products, applies scaling and softmax, then mixes value vectors with those normalized weights.",
        "Q, K, and V are produced by learned linear projections of token representations."
      ],
      formulaIds: ["attention", "dot-product", "softmax"],
      example: { title: "One tiny attention head", prompt: "q=[1,0], k1=[1,0], k2=[0,1]. Which key receives the larger score?", steps: ["q·k1=1.", "q·k2=0.", "Softmax therefore gives key 1 more weight."], answer: "Key 1", interpretation: "Q/K matching determines relevance weights; the weights are then applied to values." },
      questions: [check("attention-b1", "Which objects are actually multiplied by the final attention weights?", ["Value vectors", "Target labels", "Learning rates", "Loss gradients"], 0, "Queries and keys create the scores; normalized weights mix the values.")],
      examNotes: ["Memorize the conceptual order: QK score → scale → softmax → weighted V mixture."]
    },
    core: {
      summary: "Place multiple heads correctly inside one transformer block and track tensor shapes.",
      concepts: [
        "An attention head is one parallel attention calculation, not a neuron and not an entire transformer layer.",
        "Multi-head attention runs several heads with different learned projections, concatenates their outputs, and projects the result back to the model width.",
        "A transformer block contains multi-head attention plus feed-forward MLP processing, residual connections, and normalization."
      ],
      formulaIds: ["attention", "matrix-product", "softmax"],
      example: { title: "Attention score-matrix shape", prompt: "Q is Lq×d and K is Lk×d. What is QKᵀ shape?", steps: ["Kᵀ has shape d×Lk.", "Multiply Lq×d by d×Lk."], answer: "Lq×Lk", interpretation: "Every query position receives one score for every key position." },
      pythonLab: notebookLab({ title: "Single-head attention", goal: "Implement scaled dot-product attention and inspect its shape.", code: "import torch\nQ = torch.randn(2, 4, 8)\nK = torch.randn(2, 4, 8)\nV = torch.randn(2, 4, 8)\nscores = Q @ K.transpose(-2, -1) / (8 ** 0.5)\nweights = torch.softmax(scores, dim=-1)\nout = weights @ V\nprint(scores.shape, out.shape)", output: "torch.Size([2, 4, 4]) torch.Size([2, 4, 8])", explanation: "Each of four query positions scores four key positions, then receives an 8D weighted value mixture.", notebookPath: "notebooks/attention-transformers.ipynb" }),
      questions: [check("attention-c1", "Where does multi-head attention sit in the transformer mental model?", ["Inside each transformer block", "Inside every individual neuron", "Outside the network after training", "Only in the loss function"], 0, "A transformer block contains multi-head attention along with an MLP, residual paths, and normalization.")],
      examNotes: ["Annotate batch, head count, sequence length, head dimension, and model dimension."]
    },
    advanced: {
      summary: "Follow a token through repeated transformer blocks into next-token logits and understand causal masking and quadratic attention cost.",
      concepts: [
        "Token IDs become embeddings plus position information; repeated transformer blocks update those token representations through attention and per-position MLPs.",
        "A causal mask prevents a position from attending to future positions during autoregressive next-token training or generation.",
        "The final representation is projected to vocabulary logits; softmax gives next-token probabilities. The attention score matrix scales quadratically with sequence length."
      ],
      formulaIds: ["attention", "multiclass-cross-entropy", "backprop", "softmax"],
      example: { title: "Transformer versus ordinary MLP", prompt: "Why is a transformer not best described as 'a normal neural network with one attention layer on top'?", steps: ["Each transformer block contains attention and an ordinary feed-forward neural network.", "Many such blocks are stacked repeatedly.", "Attention is integrated into the architecture at every block rather than added once at the end."], answer: "A transformer is a repeated attention-and-MLP neural-network architecture", interpretation: "It still learns through ordinary parameters, loss, backpropagation, and optimizers." },
      questions: [check("attention-a1", "What does a causal mask enforce in an autoregressive transformer?", ["A token cannot attend to future positions", "Every token must attend equally", "Values are deleted", "The model has only one head"], 0, "Next-token prediction must not use tokens that have not occurred yet.")],
      examNotes: ["Keep architecture, training objective, and decoding procedure as separate ideas."]
    }
  })
];
