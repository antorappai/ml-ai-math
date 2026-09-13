# Deep Learning Fundamentals + PyTorch
## Master's Prep Curriculum Based on the Learner's Actual Questions and Doubts

## Purpose

This unit is not meant to be a generic deep-learning chapter.

It is designed around the learner's real progression of questions and confusions:

- How does deep learning connect to Linear and Logistic Regression?
- What exactly is a neuron?
- Where does the perceptron fit?
- What is the difference between an ANN, MLP, deep neural network, and Transformer?
- Who decides the number of layers?
- Does training create the layers?
- What exactly gets learned during training?
- What is a hidden layer?
- Is an attention head a neuron?
- Is multi-head attention another hidden layer?
- Where does attention sit inside a Transformer layer?
- Who decides how many attention heads a Transformer has?
- What happens when an LLM predicts the wrong answer?
- Does correcting an LLM in a chat trigger backpropagation?
- How does an LLM generate next-token probabilities?
- Where do Softmax, Sigmoid, and ReLU fit?
- What does "black box" actually mean?
- Can deep learning and attention be used for stock-market prediction?
- What are loss functions, optimizers, weight initialization, and model-generalization techniques?
- How does all of this look in PyTorch?

The teaching philosophy is:

```text
Old Knowledge
    ↓
Reconnect it
    ↓
New Concept
    ↓
Small Numerical Example
    ↓
PyTorch Code
    ↓
Real-World Connection
    ↓
Master's-Level Understanding
```

---

# 1. Start from What We Already Know

Before deep learning, recall the common machine-learning pipeline:

```text
Data
 ↓
Features X
 ↓
Model
 ↓
Prediction ŷ
 ↓
Compare with actual value y
 ↓
Calculate error/loss
 ↓
Adjust model
 ↓
Repeat
```

This already appeared in:

- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forest
- AdaBoost
- Gradient Boosting
- K-Means

Deep learning does not replace this logic.

It expands the model into a much larger trainable function.

---

# 2. Linear Regression Is the Starting Bridge

Recall:

$$
\hat{y}=wx+b
$$

Where:

- $x$ = input
- $w$ = weight / slope
- $b$ = bias / intercept
- $\hat{y}$ = prediction

Example:

$$
\hat{y}=5x+40
$$

If $x$ is study hours:

- weight $5$ means each extra hour increases the predicted grade by 5
- bias $40$ is the predicted grade when study hours are zero

For multiple features:

$$
\hat{y}
=
w_1x_1+w_2x_2+w_3x_3+b
$$

Example features:

```text
x1 = study hours
x2 = attendance
x3 = assignments completed
```

This is already almost the calculation performed inside a neural-network neuron.

---

# 3. Perceptron: The Missing Historical Step

A perceptron is one of the earliest neural-network units.

It calculates:

$$
z=w_1x_1+w_2x_2+\cdots+w_nx_n+b
$$

Then it applies a hard threshold:

$$
f(z)=
\begin{cases}
1 & z>0\\
0 & z\le0
\end{cases}
$$

Conceptually:

```text
Inputs
 ↓
Weights
 ↓
Weighted Sum
 ↓
Threshold
 ↓
0 or 1
```

This matters because the progression is:

```text
Perceptron
   ↓
Modern Artificial Neuron
   ↓
ANN
   ↓
MLP
   ↓
Deep Neural Network
   ↓
Specialized Architectures
```

---

# 4. Artificial Neuron

A modern artificial neuron still starts with:

$$
z=Wx+b
$$

But instead of using only a hard threshold, it applies an activation function:

$$
a=f(z)
$$

So:

```text
Inputs
 ↓
Weights + Bias
 ↓
Wx + b
 ↓
Activation Function
 ↓
Neuron Output
```

Important connection:

```text
Multiple Linear Regression
        ↓
      Wx + b
        ↓
 Activation Function
        ↓
 Artificial Neuron
```

---

# 5. Logistic Regression Is Very Close to One Neuron

Logistic regression calculates:

$$
z=Wx+b
$$

Then:

$$
\sigma(z)
=
\frac{1}{1+e^{-z}}
$$

This gives a probability between 0 and 1.

So:

```text
Inputs
 ↓
Wx + b
 ↓
Sigmoid
 ↓
Probability
```

This is essentially the same structure as a single artificial neuron used for binary classification.

That is why deep learning should not feel like a totally new subject.

It is built on mathematical ideas already seen in regression.

---

# 6. ANN, MLP, and Deep Neural Network

## ANN

ANN means:

**Artificial Neural Network**

An ANN is a network of connected artificial neurons.

```text
Input Layer
    ↓
Hidden Layer
    ↓
Output Layer
```

A layer is not one neuron.

A layer usually contains many neurons.

Example:

```text
Hidden Layer
├── Neuron 1
├── Neuron 2
├── Neuron 3
└── Neuron 4
```

---

## MLP

MLP means:

**Multi-Layer Perceptron**

Despite the historical name, modern MLPs use modern activation functions such as ReLU.

Example:

```text
3 Input Features
       ↓
Hidden Layer: 8 Neurons
       ↓
Hidden Layer: 4 Neurons
       ↓
Output Layer: 1 Neuron
```

---

## Deep Neural Network

When several learned hidden layers are stacked:

```text
Input
 ↓
Hidden Layer 1
 ↓
Hidden Layer 2
 ↓
Hidden Layer 3
 ↓
Hidden Layer 4
 ↓
Output
```

we call it a deep neural network.

The word **deep** refers mainly to the number of learned layers.

---

# 7. Who Decides the Layers?

This was an important learner question.

The standard training process does **not** normally invent the number of layers.

Humans/researchers decide the architecture first.

Before training, they choose things such as:

```text
Number of Layers
Number of Neurons per Layer
Activation Functions
Embedding Size
Number of Attention Heads
Context Length
Optimizer
Learning Rate
```

These are architectural choices or hyperparameters.

During training, the model learns:

```text
Weights
Biases
Attention Q/K/V matrices
Internal representations
Patterns in the data
```

So remember:

> Architecture is designed. Parameters are learned.

Or:

```text
Humans choose the skeleton.
Training learns the behavior.
```

---

# 8. Activation Functions

Activation functions give neural networks nonlinearity.

Without nonlinear activation functions, many stacked linear layers could collapse into another linear transformation.

---

## 8.1 ReLU

$$
ReLU(x)=\max(0,x)
$$

Examples:

```text
-5 → 0
-2 → 0
 0 → 0
 3 → 3
 8 → 8
```

Typical use:

```text
Hidden Layers
```

Mental shortcut:

> ReLU is commonly used inside the network.

---

## 8.2 Sigmoid

$$
\sigma(x)
=
\frac{1}{1+e^{-x}}
$$

Range:

$$
0<\sigma(x)<1
$$

Typical use:

```text
Binary Classification Probability
```

Examples:

```text
Spam / Not Spam
Pass / Fail
Fraud / Not Fraud
```

---

## 8.3 Softmax

Softmax is used when there are several possible classes.

$$
Softmax(z_i)
=
\frac{e^{z_i}}
{\sum_j e^{z_j}}
$$

Example raw logits:

```text
Cat  = 2.0
Dog  = 1.0
Bird = 0.1
```

After Softmax:

```text
Cat  ≈ 0.66
Dog  ≈ 0.24
Bird ≈ 0.10
```

The probabilities sum to 1.

---

## 8.4 Quick Memory Rule

```text
Hidden layers
→ ReLU

Binary probability
→ Sigmoid

Several mutually exclusive classes
→ Softmax
```

---

# 9. Forward Propagation

Forward propagation means:

> Use the current weights to calculate a prediction.

Example:

$$
Z_1=XW_1+b_1
$$

$$
A_1=ReLU(Z_1)
$$

$$
Z_2=A_1W_2+b_2
$$

Then perhaps:

$$
\hat{y}=\sigma(Z_2)
$$

for binary classification.

Conceptually:

```text
Input
 ↓
Layer
 ↓
Activation
 ↓
Layer
 ↓
Prediction
```

---

# 10. Loss Functions

After a prediction, the model asks:

> How wrong was I?

The answer is calculated by a loss function.

The optimizer later tries to reduce that loss.

---

## 10.1 Mean Squared Error

Common for regression:

$$
MSE
=
\frac{1}{n}
\sum_{i=1}^{n}
(y_i-\hat{y}_i)^2
$$

Example:

```text
Actual = 100
Prediction = 95

Error = 5
Squared Error = 25
```

Why square?

- negative errors become positive
- large errors receive a stronger penalty
- the function is convenient for optimization

PyTorch:

```python
loss_fn = nn.MSELoss()
```

---

## 10.2 Mean Absolute Error

$$
MAE
=
\frac{1}{n}
\sum_{i=1}^{n}
|y_i-\hat{y}_i|
$$

MAE is usually less sensitive to extreme outliers than MSE.

---

## 10.3 Binary Cross-Entropy

Used for binary classification.

$$
L
=
-\left[
y\log(p)+(1-y)\log(1-p)
\right]
$$

PyTorch commonly uses:

```python
loss_fn = nn.BCEWithLogitsLoss()
```

This combines:

```text
Sigmoid
+
Binary Cross-Entropy
```

Important PyTorch rule:

> Do not manually apply Sigmoid before `BCEWithLogitsLoss()`.

---

## 10.4 Cross-Entropy Loss

Used for multiclass classification.

Typical flow:

```text
Raw Logits
 ↓
Softmax-related calculation
 ↓
Compare with true class
 ↓
Cross-Entropy Loss
```

PyTorch:

```python
loss_fn = nn.CrossEntropyLoss()
```

Important:

> Give `CrossEntropyLoss` raw logits. Do not manually Softmax them first.

---

## 10.5 Loss Cheat Sheet

| Problem | Model Output | Common Loss |
|---|---|---|
| Regression | number | MSE / MAE |
| Binary Classification | one logit | BCEWithLogitsLoss |
| Multiclass Classification | one logit per class | CrossEntropyLoss |

---

# 11. Gradient Descent

Once the model knows the loss, it asks:

> Which direction should the weights move to reduce the loss?

Basic rule:

$$
w_{new}
=
w_{old}
-
\eta
\frac{\partial L}{\partial w}
$$

Where:

- $w$ = weight
- $L$ = loss
- $\eta$ = learning rate
- $\frac{\partial L}{\partial w}$ = gradient

Mental model:

```text
Old Weight
 ↓
Gradient says which direction increases loss
 ↓
Move opposite direction
 ↓
New Weight
```

---

# 12. Backpropagation vs Gradient Descent

This distinction caused some confusion and should be explicit.

```text
Forward Propagation
=
Make prediction
```

```text
Loss Function
=
Measure how wrong it was
```

```text
Backpropagation
=
Calculate gradients for parameters
```

```text
Optimizer / Gradient Descent
=
Use those gradients to update parameters
```

Backpropagation and optimization are not the same thing.

---

# 13. Does Correcting an LLM Trigger Backpropagation?

No — not in a normal chat.

If an LLM answers incorrectly and the learner says:

```text
"No, that is wrong."
```

the normal process is:

```text
Original Prompt
 ↓
LLM Response
 ↓
User Correction
 ↓
Correction becomes new context
 ↓
LLM generates another response
```

The model weights normally stay fixed during that conversation.

This is called **inference**.

Training is different:

```text
Input
 ↓
Prediction
 ↓
Compare with target
 ↓
Loss
 ↓
Backpropagation
 ↓
Optimizer
 ↓
Update weights
```

So:

```text
Chat Correction
= Context changes

Training
= Weights change
```

Important memory rule:

> Inference uses learned weights. Training changes learned weights.

---

# 14. How an LLM Generates the Next Token

At inference time:

```text
Text
 ↓
Tokenization
 ↓
Token Embeddings
 ↓
Transformer Layers
 ↓
Output Logits
 ↓
Softmax
 ↓
Next-Token Probabilities
 ↓
Choose/Sample Token
 ↓
Append Token
 ↓
Repeat
```

Example:

```text
"The capital of France is"
```

The model may generate logits:

```text
Paris   8.2
London  3.1
Rome    2.7
Berlin  2.4
```

Softmax converts these into probabilities such as:

```text
Paris   0.95
London  0.02
Rome    0.015
Berlin  0.01
```

The model then selects or samples the next token.

So:

$$
\text{Logits}
\rightarrow
Softmax
\rightarrow
P(\text{next token})
$$

---

# 15. What Is the "Black Box"?

The architecture is not a mystery.

Researchers know:

- how many layers exist
- what equations are used
- where attention is
- how gradients are calculated
- how parameters are updated

The black-box problem is more about interpretation.

After training, it can be difficult to explain exactly:

> Why did this particular combination of billions of weights produce this particular behavior?

A concept may be distributed across:

- many neurons
- many layers
- many attention heads
- many vector directions

So:

```text
Architecture
= understood

Math
= understood

Training algorithm
= understood

Every learned internal concept
= not fully interpretable
```

---

# 16. Optimizers

Optimizers use gradients to update parameters.

---

## 16.1 SGD

```python
optimizer = torch.optim.SGD(
    model.parameters(),
    lr=0.01
)
```

Simple concept:

$$
w_{new}
=
w_{old}
-
\eta\nabla L
$$

---

## 16.2 SGD with Momentum

Momentum carries some previous update direction forward.

```python
optimizer = torch.optim.SGD(
    model.parameters(),
    lr=0.01,
    momentum=0.9
)
```

Conceptually:

```text
Current Gradient
+
Previous Movement
=
Smoother Update
```

---

## 16.3 RMSprop

RMSprop adapts update sizes based on recent gradient magnitudes.

Historically popular in recurrent networks.

---

## 16.4 Adam

Adam combines:

- adaptive learning rates
- momentum-like behavior

```python
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001
)
```

---

## 16.5 AdamW

```python
optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=0.001,
    weight_decay=0.01
)
```

AdamW is widely used in modern deep learning and Transformer training.

---

# 17. Weight Initialization

Before training, weights must have starting values.

If all weights were exactly zero, neurons in the same layer would begin identically and learn identically.

We need symmetry breaking.

---

## Xavier / Glorot

Often associated with Tanh or Sigmoid-like activations.

```python
nn.init.xavier_uniform_(layer.weight)
```

---

## He / Kaiming

Designed especially for ReLU-style networks.

A simplified variance idea:

$$
Var(w)
\approx
\frac{2}{n_{in}}
$$

PyTorch:

```python
nn.init.kaiming_uniform_(
    layer.weight,
    nonlinearity="relu"
)
```

---

# 18. MLP in PyTorch

Example:

Predict whether a student passes.

Features:

```text
study hours
attendance
assignment completion
```

Input:

```python
import torch

X = torch.tensor([
    [5.0, 0.90, 0.80],
    [2.0, 0.60, 0.50],
    [8.0, 0.95, 0.90],
    [1.0, 0.50, 0.40],
    [6.0, 0.85, 0.75]
], dtype=torch.float32)

y = torch.tensor([
    [1.0],
    [0.0],
    [1.0],
    [0.0],
    [1.0]
])
```

Network:

```python
import torch.nn as nn

class StudentMLP(nn.Module):

    def __init__(self):
        super().__init__()

        self.layer1 = nn.Linear(3, 8)
        self.relu1 = nn.ReLU()

        self.layer2 = nn.Linear(8, 4)
        self.relu2 = nn.ReLU()

        self.output = nn.Linear(4, 1)

    def forward(self, x):

        x = self.layer1(x)
        x = self.relu1(x)

        x = self.layer2(x)
        x = self.relu2(x)

        x = self.output(x)

        return x
```

Map:

```text
3 Features
 ↓
8 Neurons
 ↓
ReLU
 ↓
4 Neurons
 ↓
ReLU
 ↓
1 Logit
```

Loss and optimizer:

```python
loss_fn = nn.BCEWithLogitsLoss()

optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001
)
```

Training:

```python
for epoch in range(100):

    optimizer.zero_grad()

    logits = model(X)

    loss = loss_fn(logits, y)

    loss.backward()

    optimizer.step()
```

This tiny loop contains almost the whole deep-learning training idea.

---

# 19. Generalization

Generalization means:

> The model performs well on data it did not see during training.

This is more important than memorizing the training data.

---

## Underfitting

```text
Training Accuracy = 65%
Validation Accuracy = 63%
```

Likely:

```text
High Bias
```

---

## Overfitting

```text
Training Accuracy = 99%
Validation Accuracy = 72%
```

Likely:

```text
High Variance
```

---

# 20. Generalization Techniques

## Train / Validation / Test

```text
Training
→ learn parameters

Validation
→ tune choices

Test
→ final evaluation
```

---

## Early Stopping

If:

```text
Training Loss ↓
Validation Loss ↑
```

training may have gone too far.

Stop before overfitting worsens.

---

## Dropout

Randomly disable some neurons during training.

```python
self.dropout = nn.Dropout(p=0.3)
```

Mental model:

```text
Normal:
○ ○ ○ ○ ○ ○

One training step:
○ X ○ ○ X ○
```

This discourages overdependence on particular neurons.

---

## Weight Decay

```python
optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=0.001,
    weight_decay=0.01
)
```

Discourages excessively large weights.

---

## L1 Regularization

$$
\lambda\sum|w|
$$

Can encourage sparsity.

---

## L2 Regularization

$$
\lambda\sum w^2
$$

Discourages large weights.

---

## Data Augmentation

Images:

```text
rotate
crop
flip
brightness change
```

Time series:

```text
windowing
careful noise injection
domain-safe transformations
```

---

## Batch Normalization

```python
nn.BatchNorm1d(...)
```

Helps stabilize activations during training.

---

## Layer Normalization

Common in Transformers.

---

## Smaller Model

Sometimes:

```text
fewer layers
fewer neurons
fewer parameters
```

generalizes better.

---

# 21. Attention: Where Does It Actually Fit?

The learner asked several variations of:

- Is an attention head a neuron?
- Is it like a sub-node?
- Is it another hidden layer?
- Does each layer contain multi-head attention?

Correct mental model:

```text
Transformer Layer
│
├── Multi-Head Attention Block
│   ├── Attention Head 1
│   ├── Attention Head 2
│   ├── Attention Head 3
│   └── Attention Head N
│
├── Add + Normalize
│
├── Feed-Forward Neural Network
│   ├── Linear Layer
│   ├── Activation
│   └── Linear Layer
│
└── Add + Normalize
```

An attention head is:

> a parallel attention calculation inside the attention block.

It is not:

- a neuron
- a normal hidden layer
- a sub-neuron

---

# 22. Hidden Layers vs Attention Heads

Use this memory rule:

```text
Layers
=
depth
```

```text
Attention Heads
=
parallel perspectives inside an attention layer
```

Normal network:

```text
Layer 1
 ↓
Layer 2
 ↓
Layer 3
```

Multi-head attention inside one Transformer layer:

```text
          Attention Block
      ┌────┬────┬────┬────┐
      H1   H2   H3   H4
      └────┴────┴────┴────┘
             ↓
        Combined Output
```

---

# 23. Q, K, and V

For one attention head:

$$
Q=XW_Q
$$

$$
K=XW_K
$$

$$
V=XW_V
$$

Then:

$$
Attention(Q,K,V)
=
Softmax
\left(
\frac{QK^T}{\sqrt{d_k}}
\right)V
$$

Mental interpretation:

```text
Query
= What am I looking for?

Key
= What does each position offer?

Value
= What information should I actually use?
```

---

# 24. Stock-Market Example for Multi-Head Attention

Suppose we have:

| Day | Return | Volume Change | RSI |
|---|---:|---:|---:|
| 1 | +1% | +5% | 52 |
| 2 | +2% | +20% | 58 |
| 3 | -1% | +40% | 61 |
| 4 | +3% | +10% | 67 |
| 5 | -2% | -15% | 55 |

Goal:

```text
Predict whether Day 6 goes UP or DOWN
```

Input matrix:

$$
X=
\begin{bmatrix}
0.01 & 0.05 & 52\\
0.02 & 0.20 & 58\\
-0.01 & 0.40 & 61\\
0.03 & 0.10 & 67\\
-0.02 & -0.15 & 55
\end{bmatrix}
$$

Now suppose the model uses three attention heads.

One head might learn to focus strongly on recent movement:

```text
Day 1 → 0.05
Day 2 → 0.10
Day 3 → 0.10
Day 4 → 0.30
Day 5 → 0.45
```

Another might learn a volume relationship:

```text
Day 3 receives strong attention
because volume changed +40%
```

Another may learn longer-term interactions between price and RSI.

Important:

> These roles are not manually assigned.

Training learns whatever patterns are useful.

---

# 25. Who Decides the Number of Attention Heads?

Humans/researchers choose the head count before training.

Example:

```text
Embedding Dimension = 512
Attention Heads = 8
```

Then each head usually works with:

$$
512/8=64
$$

dimensions.

So:

```text
512-dimensional representation
 ↓
8 heads
 ↓
64 dimensions per head
```

Training learns the Q, K, V weights inside those heads.

Again:

```text
Head count
= architecture / hyperparameter

Head behavior
= learned
```

---

# 26. GPT and Transformer Architecture

The conceptual hierarchy is:

```text
GPT
 ↓
Many Transformer Layers
 ↓
Each Transformer Layer
 ├── Multi-Head Attention
 ├── Feed-Forward Neural Network
 ├── Residual Connections
 └── Normalization
```

And underneath all of it are still:

```text
Matrix Multiplication
Weights
Biases
Activations
Loss
Gradients
Backpropagation
Optimization
```

So GPT did not escape neural networks.

It is a very large, specialized deep neural network.

---

# 27. Deep-Learning Family Map

```text
Machine Learning
│
└── Neural Networks
    │
    ├── Perceptron
    │
    ├── Artificial Neuron
    │
    ├── ANN
    │
    ├── MLP
    │
    └── Deep Neural Networks
         │
         ├── MLP
         │
         ├── CNN
         │    └── Images
         │
         ├── RNN
         │    └── Sequences
         │
         ├── LSTM / GRU
         │    └── Better sequence memory
         │
         └── Transformer
              │
              ├── Multi-Head Attention
              │
              ├── Feed-Forward Network
              │
              ├── Residual Connections
              │
              └── Normalization
```

---

# 28. Full Learning Map

```text
LINEAR REGRESSION
      ↓
   Wx + b
      ↓
PERCEPTRON
      ↓
ARTIFICIAL NEURON
      ↓
ACTIVATION FUNCTIONS
      ↓
ANN
      ↓
MLP
      ↓
DEEP NEURAL NETWORK
      ↓
FORWARD PROPAGATION
      ↓
LOSS
      ↓
BACKPROPAGATION
      ↓
OPTIMIZER
      ↓
UPDATED WEIGHTS
      ↓
GENERALIZATION
      ↓
CNN / RNN / LSTM
      ↓
ATTENTION
      ↓
MULTI-HEAD ATTENTION
      ↓
TRANSFORMER
      ↓
LLM
```

---

# 29. PyTorch Learning Prompts for an AI Textbook Agent

## Prompt 1: One Neuron

Create a beginner-friendly PyTorch exercise using two features. First calculate $z=Wx+b$ manually. Then reproduce the same result with PyTorch tensors. Apply ReLU and explain every line.

## Prompt 2: Logistic Regression Connection

Create a tiny binary-classification dataset. Show how $Wx+b$ followed by Sigmoid corresponds conceptually to logistic regression and a single artificial neuron.

## Prompt 3: MLP

Build a PyTorch MLP with:

```text
3 inputs
8 hidden neurons
4 hidden neurons
1 output
```

Explain:

- every layer
- every tensor shape
- why ReLU is used
- why the output is a logit

## Prompt 4: Loss Functions

Use tiny predictions and targets to compare:

- MSE
- MAE
- BCE
- Cross-Entropy

Explain why each loss is used for different problem types.

## Prompt 5: Optimizers

Train the same MLP using:

- SGD
- SGD with Momentum
- Adam
- AdamW

Plot training and validation loss.

Ask:

> Which converges fastest? Which generalizes best?

## Prompt 6: Weight Initialization

Compare:

- default initialization
- Xavier
- Kaiming

Use a ReLU network.

Explain why Kaiming is designed for ReLU.

## Prompt 7: Overfitting

Create an oversized network on a tiny dataset.

Show:

```text
Training Loss ↓
Validation Loss ↑
```

Then add:

- dropout
- weight decay
- early stopping

Compare the results.

## Prompt 8: Stock Time-Series Attention

Create a PyTorch MultiheadAttention example using a 5-day synthetic stock sequence with:

- returns
- volume change
- RSI

Explain:

- tensor shape
- embedding
- attention heads
- attention weights
- why different heads can focus on different relationships

## Prompt 9: LLM Next-Token Prediction

Create a conceptual notebook that demonstrates:

```text
tokens
→ logits
→ softmax
→ token probabilities
```

Use a tiny toy vocabulary and manually calculate Softmax.

Clearly explain that this is inference and does not update model weights.

---

# 30. Learner Doubts the Textbook Must Explicitly Answer

The generated textbook must directly answer these questions:

1. Is deep learning just a more complex version of ideas from regression?
2. What came first: perceptron or ANN?
3. Is a neuron the same thing as a layer?
4. Is an MLP an ANN?
5. When does a network become "deep"?
6. Who decides the number of hidden layers?
7. Does training create new layers?
8. What exactly is learned during training?
9. What is a parameter?
10. What is a hyperparameter?
11. What does a loss function actually measure?
12. How is loss different from accuracy?
13. What is the difference between backpropagation and gradient descent?
14. What exactly does an optimizer do?
15. Why can't all weights start at zero?
16. Why are Xavier and Kaiming initializations needed?
17. Why does ReLU usually go inside hidden layers?
18. When do we use Sigmoid?
19. When do we use Softmax?
20. What exactly is a logit?
21. What is generalization?
22. Why can training accuracy be excellent while validation accuracy is bad?
23. How do dropout and weight decay help?
24. Is an attention head a neuron?
25. Is multi-head attention another hidden layer?
26. Where exactly is attention inside a Transformer layer?
27. Who decides how many attention heads exist?
28. What do Q, K, and V mean conceptually?
29. How can attention be used on stock-market time series?
30. Does telling an LLM "you are wrong" trigger backpropagation?
31. What changes during inference?
32. How does an LLM create next-token probabilities?
33. Where is Softmax used in an LLM?
34. Why are neural networks described as black boxes if we know the architecture?
35. How do Perceptron → ANN → MLP → Transformer → LLM connect?

---

# 31. Curriculum Rules for the Textbook Agent

When turning this curriculum into a textbook:

1. Never introduce a new deep-learning term without connecting it to something already learned.
2. Explain concepts in simple language before mathematical language.
3. Every important formula must be rendered using LaTeX.
4. Explain every symbol in each formula.
5. Use small numerical examples before larger code examples.
6. Give a PyTorch implementation after the conceptual explanation.
7. Always show tensor shapes.
8. Explain why each activation/loss/optimizer was chosen.
9. Include "Common Confusion" boxes based on the learner doubts above.
10. Include "Connection to What You Already Know" boxes.
11. Include "Master's-Level Note" sections for deeper theory.
12. Add short recall questions after each major topic.
13. Add MCQs that test conceptual distinctions, not rote memorization.
14. Include at least one practical exercise for each major section.
15. Revisit overfitting and generalization multiple times.
16. Do not jump to Transformers before MLP, loss, gradients, optimization, and generalization are established.
17. When teaching attention, explicitly say that attention heads are not neurons and are not separate hidden layers.
18. When teaching LLMs, distinguish training from inference.
19. Use the stock-market example as one recurring sequence-model example.
20. Use the student pass/fail dataset as the recurring MLP example.
21. End each chapter with a concept map.
22. Preserve the learner's progression of questions rather than rearranging everything into an overly abstract academic sequence.
23. Explain "why" before asking the learner to memorize "what".
24. Whenever code uses a PyTorch function such as `nn.Linear`, `loss.backward()`, or `optimizer.step()`, explain what mathematical operation it represents.
25. Do not skip historical/conceptual steps such as perceptron, ANN, and MLP.

---

# 32. Final Mental Model

```text
Humans choose architecture
        ↓
Weights are initialized
        ↓
Data enters network
        ↓
Forward propagation
        ↓
Prediction
        ↓
Loss
        ↓
Backpropagation
        ↓
Gradients
        ↓
Optimizer
        ↓
Weights updated
        ↓
Repeat across batches and epochs
        ↓
Evaluate on unseen data
        ↓
Improve generalization
```

For Transformers:

```text
Input Tokens
     ↓
Embeddings
     ↓
Transformer Layer
 ├── Multi-Head Attention
 │    ├── Head 1
 │    ├── Head 2
 │    └── Head N
 ├── Feed-Forward Neural Network
 ├── Residual Connections
 └── Normalization
     ↓
More Transformer Layers
     ↓
Logits
     ↓
Softmax
     ↓
Next-Token Probabilities
```

Final principle:

> Deep learning is not a collection of disconnected buzzwords. It is one connected training system: representations flow forward, loss measures error, gradients flow backward, optimizers update weights, and architecture determines how those computations are organized.
