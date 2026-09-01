import { check, codeLab, progressiveLesson } from "../lessonBuilder.js";

const notebookLab = (config) => codeLab({ runtime: "notebook", packages: ["torch"], ...config });

export const deepLearningLessons = [
  progressiveLesson({
    id: "tensors-perceptrons",
    chapterId: "deep-learning",
    order: 1,
    title: "Tensors, Perceptrons & Dense Layers",
    subtitle: "Move from one weighted decision to batched neural-network layers.",
    prerequisites: ["matrices-operations", "logistic-classification"],
    tags: ["tensors", "perceptron", "dense-layer"],
    scenario: { title: "A committee of weighted signals", body: "Each signal votes with a different strength, and a threshold or activation turns the total into a response.", mlParallel: "A neuron computes a weighted sum; a layer computes many neurons at once." },
    mlConnection: "Dense neural layers are matrix transformations plus biases and nonlinear activations.",
    projectIds: ["mlp-mini", "deep-capstone"],
    basics: {
      summary: "A perceptron combines inputs, weights, and bias before making a decision.",
      concepts: ["Weights control feature influence.", "Bias shifts the decision boundary.", "One neuron creates one linear boundary before activation."],
      formulaIds: ["neuron"],
      example: { title: "Compute a neuron", prompt: "x=(2,1), w=(3,-1), b=2. Find z.", steps: ["Dot product is 6-1=5.", "Add bias 2."], answer: "z=7", interpretation: "Positive and negative weights push the score in opposite directions." },
      pythonLab: codeLab({ title: "Dense layer with NumPy", goal: "Compute a batched linear layer.", code: "import numpy as np\nX = np.array([[1.,2.],[3.,4.]])\nW = np.array([[.5,-1.],[1.,.25]])\nb = np.array([.1,.2])\nprint(X @ W + b)", output: "[[ 2.6  -0.3 ]\n [ 5.6  -1.8 ]]", explanation: "Rows are examples, columns are features, and output columns are neurons.", packages: ["numpy"] }),
      questions: [check("tensor-b1", "What does a dense layer compute before activation?", ["Only a bias", "A matrix product plus bias", "A probability table only", "A tree split"], 1, "The pre-activation is W x plus b, vectorized over neurons and batches.")],
      examNotes: ["Write every tensor shape before multiplying."]
    },
    core: {
      summary: "Understand tensor axes, batches, parameters, and forward propagation.",
      concepts: ["A tensor generalizes vectors and matrices to more axes.", "Batch dimension groups examples.", "Parameters are learned; activations are intermediate values."],
      formulaIds: ["neuron", "matrix-product"],
      example: { title: "Layer shape", prompt: "Batch X is 32x10 and W is 10x5. What is XW shape?", steps: ["Inner 10s match.", "Keep batch 32 and output 5."], answer: "32x5", interpretation: "The layer maps ten features to five activations for each example." },
      pythonLab: notebookLab({ title: "PyTorch dense layer", goal: "Create tensors and a Linear module.", code: "import torch\nlayer = torch.nn.Linear(10, 5)\nX = torch.randn(32, 10)\ny = layer(X)\nprint(y.shape)", output: "torch.Size([32, 5])", explanation: "PyTorch stores trainable weights and bias inside the module.", notebookPath: "notebooks/deep-learning-foundations.ipynb" }),
      questions: [check("tensor-c1", "Which dimension usually indexes examples in a 2D batch?", ["The first dimension", "The last dimension always", "No dimension", "Only the weight dimension"], 0, "The common convention is batch by features.")],
      examNotes: ["Distinguish parameter tensors from data and activation tensors."]
    },
    advanced: {
      summary: "Reason about vectorization, broadcasting, memory layout, and computational graphs.",
      concepts: ["Vectorization replaces Python loops with tensor kernels.", "Broadcasting expands compatible singleton dimensions.", "Autograd records operations needed for gradients."],
      formulaIds: ["neuron", "backprop", "matrix-product"],
      example: { title: "Bias broadcasting", prompt: "Why can a length-5 bias be added to a 32x5 activation matrix?", steps: ["Bias matches output-feature dimension.", "It is reused across 32 rows."], answer: "Broadcasting", interpretation: "Each example receives the same learned bias." },
      questions: [check("tensor-a1", "Why use vectorized tensor operations?", ["They remove mathematics", "They use optimized parallel kernels and simplify code", "They prevent gradients", "They require one feature"], 1, "Vectorization is both computationally efficient and mathematically direct.")],
      examNotes: ["When broadcasting, state which axis is expanded."]
    }
  }),
  progressiveLesson({
    id: "activations-losses",
    chapterId: "deep-learning",
    order: 2,
    title: "Activation Functions & Losses",
    subtitle: "Understand why neural networks need nonlinearity and task-appropriate objectives.",
    prerequisites: ["tensors-perceptrons", "optimization-loss"],
    tags: ["relu", "softmax", "loss"],
    scenario: { title: "Different response curves", body: "Some sensors respond linearly, some switch on past a threshold, and some saturate near a maximum.", mlParallel: "Activations shape representation and gradient flow; losses define what the network learns to improve." },
    mlConnection: "Activation and loss choices control expressiveness, output meaning, and training behaviour.",
    basics: {
      summary: "Nonlinear activations let stacked layers represent nonlinear relationships.",
      concepts: ["ReLU clips negative values to zero.", "Sigmoid maps one score to zero-to-one.", "Softmax maps several scores to probabilities summing to one."],
      formulaIds: ["relu", "sigmoid", "softmax"],
      example: { title: "Apply ReLU", prompt: "Apply ReLU to (-2,0,3).", steps: ["Replace negative values with zero.", "Keep nonnegative values."], answer: "(0,0,3)", interpretation: "ReLU gates negative pre-activations." },
      pythonLab: codeLab({ title: "Activation functions", goal: "Compute ReLU and stable softmax with NumPy.", code: "import numpy as np\nz = np.array([-2., 0., 3.])\nprint(np.maximum(0, z))\nshifted = z - z.max()\np = np.exp(shifted) / np.exp(shifted).sum()\nprint(np.round(p, 3))", output: "[0. 0. 3.]\n[0.006 0.047 0.946]", explanation: "Subtracting the maximum improves softmax numerical stability.", packages: ["numpy"] }),
      questions: [check("activation-b1", "Why is nonlinearity needed between dense layers?", ["To make matrices square", "Otherwise stacked linear layers remain one linear map", "To remove all bias", "To guarantee probabilities"], 1, "Composing linear maps without nonlinearities is still linear.")],
      examNotes: ["Match activation to output meaning: sigmoid binary, softmax multiclass."]
    },
    core: {
      summary: "Match MSE and cross-entropy to outputs and understand logits.",
      concepts: ["MSE is natural for continuous regression.", "Cross-entropy measures correct-class probability quality.", "Framework losses often combine softmax and log for stability."],
      formulaIds: ["mse", "binary-cross-entropy", "multiclass-cross-entropy"],
      example: { title: "Confident mistake", prompt: "Why does cross-entropy heavily punish p=.001 for the true class?", steps: ["Take -log(.001).", "Tiny probabilities have large negative logs."], answer: "The loss is large", interpretation: "Confidence in the wrong answer is costly." },
      questions: [check("activation-c1", "What should usually be passed to PyTorch CrossEntropyLoss?", ["Softmax probabilities", "Raw logits", "Class names as strings", "Only gradients"], 1, "The loss applies stable log-softmax internally.")],
      examNotes: ["Check whether a library loss expects logits or probabilities."]
    },
    advanced: {
      summary: "Reason about saturation, dead ReLUs, class imbalance, and alternative losses.",
      concepts: ["Saturated sigmoid/tanh produce small gradients.", "ReLU units can become inactive.", "Weighted or focal losses can emphasize rare or hard examples."],
      formulaIds: ["relu", "sigmoid", "multiclass-cross-entropy"],
      example: { title: "Vanishing sigmoid gradient", prompt: "What happens when sigmoid input is very large?", steps: ["Output approaches one.", "Curve becomes nearly flat."], answer: "Gradient becomes very small", interpretation: "Earlier layers receive weak update signals." },
      questions: [check("activation-a1", "What is a dead ReLU?", ["A unit outputting zero across inputs and receiving no useful gradient", "A perfect classifier", "A softmax class", "A missing label"], 0, "Persistent negative pre-activations can stop ReLU learning.")],
      examNotes: ["Discuss both forward output and backward derivative behaviour."]
    }
  }),
  progressiveLesson({
    id: "forward-backprop",
    chapterId: "deep-learning",
    order: 3,
    title: "Forward Propagation & Backpropagation",
    subtitle: "Trace values forward and gradients backward through a computational graph.",
    prerequisites: ["activations-losses", "multivariable-gradients"],
    tags: ["forward-pass", "backprop", "autograd"],
    scenario: { title: "Tracing responsibility", body: "A final project score depends on several assignments; to improve it, you trace how each assignment contributes.", mlParallel: "Backprop traces how every parameter contributes to final loss." },
    mlConnection: "Backpropagation is the efficient chain-rule algorithm that trains neural networks.",
    basics: {
      summary: "Forward pass computes predictions and loss; backward pass computes gradients.",
      concepts: ["Intermediate activations are saved for derivatives.", "Gradients flow opposite the dependency direction.", "Parameters update only after gradients are known."],
      formulaIds: ["chain-rule", "backprop"],
      example: { title: "One chain", prompt: "L depends on a, a on z, z on w. How find dL/dw?", steps: ["Find dL/da.", "Multiply by da/dz.", "Multiply by dz/dw."], answer: "Product of local derivatives", interpretation: "Each local effect transmits sensitivity backward." },
      questions: [check("backprop-b1", "What direction do values and gradients travel?", ["Both forward", "Values forward, gradients backward", "Values backward, gradients forward", "Neither"], 1, "The computation and its sensitivities travel in opposite directions.")],
      examNotes: ["Draw the dependency graph before differentiating."]
    },
    core: {
      summary: "Compute layer gradients and distinguish parameter, activation, and input gradients.",
      concepts: ["Weight gradients include input activations.", "Bias gradients sum across batch examples.", "Gradient accumulation must be cleared between optimizer steps in PyTorch."],
      formulaIds: ["backprop", "matrix-product", "gradient-descent"],
      example: { title: "Local gradient product", prompt: "dL/da=2, da/dz=.25, dz/dw=8. Find dL/dw.", steps: ["Multiply 2*.25*8."], answer: "4", interpretation: "One small local derivative can reduce the total signal." },
      pythonLab: notebookLab({ title: "Autograd inspection", goal: "Compare automatic and manual gradients.", code: "import torch\nw = torch.tensor(3.0, requires_grad=True)\nx = torch.tensor(2.0)\nloss = (w*x - 5)**2\nloss.backward()\nprint(w.grad)", output: "tensor(4.)", explanation: "The derivative is 2(wx-5)x = 4 at w=3, x=2.", notebookPath: "notebooks/backprop-autograd.ipynb" }),
      questions: [check("backprop-c1", "Why call optimizer.zero_grad in a normal PyTorch loop?", ["To delete weights", "Because gradients accumulate by default", "To reset data", "To apply softmax"], 1, "PyTorch adds new gradients to existing .grad values.")],
      examNotes: ["Track tensor shapes for every gradient, not just scalar algebra."]
    },
    advanced: {
      summary: "Diagnose vanishing/exploding gradients and understand reverse-mode automatic differentiation.",
      concepts: ["Deep chains multiply many Jacobians.", "Reverse mode efficiently differentiates one scalar loss with respect to many parameters.", "Gradient checking catches implementation errors."],
      formulaIds: ["backprop", "chain-rule", "gradient"],
      example: { title: "Vanishing chain", prompt: "What happens when twenty local derivatives are about .5?", steps: ["Multiply .5 repeatedly.", "The product becomes tiny."], answer: "The gradient vanishes", interpretation: "Early layers learn slowly." },
      questions: [check("backprop-a1", "Why is reverse mode suitable for neural networks?", ["Many outputs and one parameter", "One scalar loss and many parameters", "No derivatives", "Only linear functions"], 1, "Reverse mode reuses backward computations from one scalar objective.")],
      examNotes: ["Separate vanishing gradient causes from ordinary convergence near a minimum."]
    }
  }),
  progressiveLesson({
    id: "deep-optimization-regularization",
    chapterId: "deep-learning",
    order: 4,
    title: "Deep Optimizers, Initialization & Regularization",
    subtitle: "Make training stable and improve generalization beyond plain gradient descent.",
    prerequisites: ["forward-backprop", "model-selection-generalization"],
    tags: ["adam", "dropout", "initialization", "batch-normalization"],
    scenario: { title: "Training a large team", body: "Good starting roles, steady feedback, and safeguards against memorization help a team learn reliably.", mlParallel: "Initialization, optimizer state, normalization, and regularization shape neural training." },
    mlConnection: "Most practical deep-learning failures are optimization or generalization failures, not missing architecture ideas.",
    basics: {
      summary: "Initialize weights sensibly and monitor train versus validation loss.",
      concepts: ["All-zero weights prevent hidden neurons from learning different roles.", "Random initialization breaks symmetry.", "Validation gaps reveal overfitting."],
      formulaIds: ["gradient-descent", "ridge"],
      example: { title: "Symmetry problem", prompt: "Why not initialize all hidden weights identically?", steps: ["Neurons receive equal signals.", "They receive equal gradients."], answer: "They remain redundant", interpretation: "Randomness lets units specialize." },
      questions: [check("deepopt-b1", "What does weight decay discourage?", ["Large weights", "All biases", "Validation data", "Batching"], 0, "Weight decay is an L2-style pressure toward smaller weights.")],
      examNotes: ["Plot both training and validation curves."]
    },
    core: {
      summary: "Compare SGD, momentum, RMSProp, and Adam.",
      concepts: ["Momentum accumulates directional velocity.", "RMSProp adapts using squared-gradient history.", "Adam combines momentum-like first moments with adaptive second moments."],
      formulaIds: ["gradient-descent"],
      example: { title: "Optimizer state", prompt: "Why can Adam take different-sized steps for two parameters?", steps: ["Their gradient histories differ.", "Adam rescales using estimated moments."], answer: "Adaptive per-parameter scaling", interpretation: "One global learning rate still interacts with local history." },
      pythonLab: notebookLab({ title: "Compare optimizers", goal: "Train one model with SGD and Adam.", code: "import torch\nmodel = torch.nn.Linear(4, 1)\nsgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)\nadam = torch.optim.Adam(model.parameters(), lr=0.001)\nprint(type(sgd).__name__, type(adam).__name__)", output: "SGD Adam", explanation: "The notebook compares their loss curves under controlled seeds.", notebookPath: "notebooks/optimizers-regularization.ipynb" }),
      questions: [check("deepopt-c1", "What does momentum add to SGD?", ["Label smoothing", "A velocity based on past gradients", "More classes", "A test set"], 1, "Momentum carries directional history through updates.")],
      examNotes: ["Optimizer names do not remove the need to tune learning rate."]
    },
    advanced: {
      summary: "Use dropout, normalization, schedules, clipping, and early stopping with correct train/eval behaviour.",
      concepts: ["Dropout randomly removes activations during training only.", "Batch normalization uses batch statistics during training and stored statistics during evaluation.", "Gradient clipping limits exploding updates."],
      formulaIds: ["gradient-descent", "standard-deviation"],
      example: { title: "Train versus evaluation mode", prompt: "Why call model.eval before validation?", steps: ["Disable dropout randomness.", "Use stored normalization statistics."], answer: "To obtain correct deterministic evaluation behaviour", interpretation: "Some layers behave differently by mode." },
      questions: [check("deepopt-a1", "What does gradient clipping primarily address?", ["Exploding gradients", "Missing labels", "Class imbalance", "Small datasets only"], 0, "Clipping caps gradient norm or values before update.")],
      examNotes: ["State whether a technique targets optimization, generalization, or both."]
    }
  }),
  progressiveLesson({
    id: "cnn-convolution",
    chapterId: "deep-learning",
    order: 5,
    title: "Convolutional Neural Networks",
    subtitle: "Use local receptive fields and shared kernels to learn spatial patterns.",
    prerequisites: ["tensors-perceptrons", "activations-losses"],
    tags: ["cnn", "convolution", "images"],
    scenario: { title: "Sliding pattern detector", body: "The same edge pattern can appear anywhere in an image, so one detector is reused across locations.", mlParallel: "Convolution shares kernel weights and preserves spatial organization." },
    mlConnection: "CNNs remain foundational for images, audio spectrograms, and spatial feature extraction.",
    projectIds: ["cnn-mini"],
    basics: {
      summary: "A kernel slides over local patches and produces a feature map.",
      concepts: ["Local connectivity reduces parameters.", "Weight sharing detects the same pattern across locations.", "Channels store different feature types."],
      formulaIds: ["convolution"],
      example: { title: "Output size", prompt: "Input width 5, kernel 3, stride 1, no padding. Output width?", steps: ["Compute 5-3+1."], answer: "3", interpretation: "Only three full kernel placements fit." },
      questions: [check("cnn-b1", "Why share kernel weights?", ["To detect the same pattern across positions", "To remove all channels", "To avoid matrices", "To guarantee rotation invariance"], 0, "Shared weights create translation-aware pattern detection.")],
      examNotes: ["Write input, kernel, padding, and stride before output-shape arithmetic."]
    },
    core: {
      summary: "Track channels, padding, stride, pooling, and receptive fields.",
      concepts: ["Padding can preserve spatial size.", "Stride downsamples.", "Deeper units see larger receptive fields."],
      formulaIds: ["convolution", "matrix-product"],
      example: { title: "Same padding", prompt: "Why use padding 1 with a 3x3 kernel and stride 1?", steps: ["One pixel is added each side.", "Spatial output size matches input."], answer: "To preserve width and height", interpretation: "Boundary information is retained longer." },
      pythonLab: notebookLab({ title: "CNN shapes in PyTorch", goal: "Build and inspect a convolution layer.", code: "import torch\nconv = torch.nn.Conv2d(3, 16, kernel_size=3, padding=1)\nX = torch.randn(8, 3, 32, 32)\nprint(conv(X).shape)", output: "torch.Size([8, 16, 32, 32])", explanation: "Batch stays 8, output channels become 16, and padding preserves spatial size.", notebookPath: "notebooks/cnn-fundamentals.ipynb" }),
      questions: [check("cnn-c1", "What does Conv2d out_channels control?", ["Batch size", "Number of learned output feature maps", "Image width", "Kernel stride only"], 1, "Each output channel has learned kernels across input channels.")],
      examNotes: ["Use framework tensor order explicitly: often N,C,H,W."]
    },
    advanced: {
      summary: "Understand residual connections, transfer learning, augmentation, and interpretability limits.",
      concepts: ["Residual connections improve gradient flow.", "Pretrained features reduce data requirements.", "Augmentation encodes desired invariances."],
      formulaIds: ["convolution", "backprop"],
      example: { title: "Residual block", prompt: "Why add x to F(x)?", steps: ["Provide an identity path.", "Gradients can bypass difficult transformations."], answer: "Easier optimization and information flow", interpretation: "The block learns a residual correction." },
      questions: [check("cnn-a1", "What is transfer learning?", ["Training without data", "Starting from features learned on another task", "Removing all convolutions", "Using only test images"], 1, "Pretrained representations are adapted to a new task.")],
      examNotes: ["Explain which parameters are frozen and which are fine-tuned."]
    }
  }),
  progressiveLesson({
    id: "sequence-models",
    chapterId: "deep-learning",
    order: 6,
    title: "Embeddings, RNNs & LSTMs",
    subtitle: "Represent discrete tokens and carry information through ordered sequences.",
    prerequisites: ["forward-backprop", "vectors-geometry"],
    tags: ["embeddings", "rnn", "lstm", "sequences"],
    scenario: { title: "Reading a sentence", body: "The meaning of a word depends on words that came before it and sometimes much earlier context.", mlParallel: "Sequence models update a hidden state while processing ordered tokens." },
    mlConnection: "Embeddings and recurrent models establish the concepts later used by attention and transformers.",
    basics: {
      summary: "Embeddings map discrete IDs to learned vectors; RNNs update a state over time.",
      concepts: ["Token IDs are not meaningful numeric distances.", "Embedding rows are learned representations.", "The same recurrent weights are reused at every time step."],
      formulaIds: ["rnn", "vector-magnitude"],
      example: { title: "Embedding lookup", prompt: "What does token ID 7 select?", steps: ["Use 7 as a row index.", "Return that learned vector."], answer: "Embedding row 7", interpretation: "The ID itself is an address, not a quantity." },
      questions: [check("sequence-b1", "Why not feed raw word IDs as continuous values?", ["IDs imply false numeric ordering and distance", "IDs are always negative", "Models require images", "It removes labels"], 0, "Embedding lookup learns geometry instead of assuming ID arithmetic.")],
      examNotes: ["Track sequence length, batch, and embedding dimensions separately."]
    },
    core: {
      summary: "Understand hidden states, backpropagation through time, and LSTM gates.",
      concepts: ["RNN gradients traverse repeated time steps.", "Vanishing gradients harm long-range learning.", "LSTM gates regulate stored and forgotten information."],
      formulaIds: ["rnn", "backprop", "sigmoid"],
      example: { title: "Long dependency", prompt: "Why can a plain RNN forget a signal from 100 steps earlier?", steps: ["Gradients multiply through many recurrent transitions.", "Factors below one shrink exponentially."], answer: "Vanishing gradients", interpretation: "LSTM introduces a more controlled memory path." },
      pythonLab: notebookLab({ title: "Embedding and LSTM shapes", goal: "Build a sequence encoder.", code: "import torch\nembed = torch.nn.Embedding(1000, 32)\nlstm = torch.nn.LSTM(32, 64, batch_first=True)\ntokens = torch.randint(0, 1000, (8, 20))\nout, state = lstm(embed(tokens))\nprint(out.shape)", output: "torch.Size([8, 20, 64])", explanation: "Each of 20 positions receives a 64-dimensional hidden representation.", notebookPath: "notebooks/sequence-models.ipynb" }),
      questions: [check("sequence-c1", "What does an LSTM forget gate control?", ["Which old cell information is retained", "Number of classes", "Image padding", "Test split"], 0, "The forget gate scales previous cell-state content.")],
      examNotes: ["Distinguish hidden state from cell state in LSTM diagrams."]
    },
    advanced: {
      summary: "Use bidirectionality, masking, packed sequences, and sequence-level evaluation correctly.",
      concepts: ["Bidirectional models use future context and are unsuitable for causal generation.", "Padding masks prevent fake tokens affecting results.", "Teacher forcing creates train-inference differences."],
      formulaIds: ["rnn", "multiclass-cross-entropy"],
      example: { title: "Causal constraint", prompt: "Why cannot a bidirectional encoder generate the next token causally?", steps: ["Backward direction sees future tokens.", "Generation must not access them."], answer: "It leaks future context", interpretation: "Architecture must respect the prediction setup." },
      questions: [check("sequence-a1", "What should a padding mask do?", ["Give padding high attention", "Prevent padded positions contributing", "Change labels", "Increase sequence length"], 1, "Padding exists for shape alignment and should not behave like data.")],
      examNotes: ["State whether the task permits future context."]
    }
  }),
  progressiveLesson({
    id: "attention-transformers",
    chapterId: "deep-learning",
    order: 7,
    title: "Attention & Transformer Mathematics",
    subtitle: "Connect embeddings, dot products, softmax, residual paths, and token mixing.",
    prerequisites: ["sequence-models", "eigen-pca", "activations-losses"],
    tags: ["attention", "transformers", "qkv"],
    scenario: { title: "Looking up relevant context", body: "When answering a question, you scan notes for passages that best match what you need, then combine their information.", mlParallel: "Queries match keys to create weights used to mix value vectors." },
    mlConnection: "Transformers power modern language, vision, and multimodal models through attention and repeated representation updates.",
    projectIds: ["attention-mini", "deep-capstone"],
    basics: {
      summary: "Attention compares queries with keys and mixes values using normalized weights.",
      concepts: ["Query asks what information is needed.", "Key represents what can be matched.", "Value contains information to retrieve."],
      formulaIds: ["attention", "dot-product", "softmax"],
      example: { title: "Attention weights", prompt: "Scores are much larger for token A than B. What does softmax do?", steps: ["Exponentiate scores.", "Normalize to sum one."], answer: "Assigns A a larger mixing weight", interpretation: "Similarity changes information flow." },
      questions: [check("attention-b1", "What is multiplied by attention weights?", ["Queries", "Values", "Labels", "Learning rates"], 1, "Scores come from queries and keys; weights mix values.")],
      examNotes: ["Write the four stages: score, scale, softmax, value mix."]
    },
    core: {
      summary: "Track Q/K/V shapes, masks, multi-head attention, and positional information.",
      concepts: ["Scaling by square root d_k stabilizes score magnitude.", "Causal masks block future positions.", "Multiple heads learn different matching subspaces."],
      formulaIds: ["attention", "matrix-product", "softmax"],
      example: { title: "Attention matrix shape", prompt: "Q is Lq by d and K is Lk by d. What is QK transpose shape?", steps: ["K transpose is d by Lk.", "Multiply Lq by d with d by Lk."], answer: "Lq by Lk", interpretation: "Every query gets one score for every key." },
      pythonLab: notebookLab({ title: "Single-head attention", goal: "Implement scaled dot-product attention with PyTorch tensors.", code: "import torch\nQ = torch.randn(2, 4, 8)\nK = torch.randn(2, 4, 8)\nV = torch.randn(2, 4, 8)\nscores = Q @ K.transpose(-2, -1) / (8 ** 0.5)\nweights = torch.softmax(scores, dim=-1)\nout = weights @ V\nprint(out.shape)", output: "torch.Size([2, 4, 8])", explanation: "Each of four query positions receives a weighted combination of four value vectors.", notebookPath: "notebooks/attention-transformers.ipynb" }),
      questions: [check("attention-c1", "Why divide scores by square root d_k?", ["To remove softmax", "To keep dot-product scale from growing too large", "To change sequence length", "To add positions"], 1, "Unscaled high-dimensional dot products can push softmax into saturation.")],
      examNotes: ["Annotate batch, heads, sequence length, and head dimension on every tensor."]
    },
    advanced: {
      summary: "Understand transformer blocks, residual streams, normalization, language-model objectives, and complexity.",
      concepts: ["Residual connections preserve a shared representation stream.", "Feed-forward layers transform each position independently between attention steps.", "Self-attention has quadratic sequence-length cost in its score matrix."],
      formulaIds: ["attention", "multiclass-cross-entropy", "backprop"],
      example: { title: "Quadratic attention", prompt: "What happens to score-matrix entries if sequence length doubles?", steps: ["Score matrix is L by L.", "Doubling each dimension multiplies entries by four."], answer: "Approximately four times as many", interpretation: "Long context creates memory and compute pressure." },
      questions: [check("attention-a1", "What does a causal mask enforce?", ["Every token sees future tokens", "A token cannot attend to future positions", "All attention weights are equal", "Values are removed"], 1, "Autoregressive prediction must not use unseen future tokens.")],
      examNotes: ["Separate architectural flow from training objective and decoding procedure."]
    }
  })
];
