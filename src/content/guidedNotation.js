// Explicit, reviewed LaTeX for every guided formula and its decoded symbols.
// Prose remains in the lesson guides; no heuristic conversion runs in the UI.
export const GUIDED_NOTATION = {
  "tensors-perceptrons": {
    "latex": "z=w_1x_1+w_2x_2+b",
    "symbols": [
      [
        "x_{1}, x_{2}",
        "Parcel count and distance: 2 and 1."
      ],
      [
        "w_{1}, w_{2}",
        "Influences: 3 and −1."
      ],
      [
        "b",
        "Starting score: 2."
      ],
      [
        "z",
        "Score before an activation: 7."
      ]
    ]
  },
  "activations-losses": {
    "latex": "a=\\max(0,z);\\quad L=(a-y)^2",
    "symbols": [
      [
        "z",
        "The input score, −2."
      ],
      [
        "a",
        "The activated output, 0."
      ],
      [
        "y",
        "The target, 1."
      ],
      [
        "L",
        "Squared-error loss, 1."
      ]
    ]
  },
  "forward-backprop": {
    "latex": "\\frac{dL}{dw}=\\frac{dL}{da}\\frac{da}{dw}",
    "symbols": [
      [
        "L",
        "Loss, here (a−5)²."
      ],
      [
        "a",
        "Prediction, here 2w."
      ],
      [
        "w",
        "Adjustable weight, currently 3."
      ],
      [
        "\\frac{dL}{dw}",
        "Local loss change per unit weight change, here 4."
      ]
    ]
  },
  "deep-optimization-regularization": {
    "latex": "w_{\\mathrm{new}}=w-\\eta g",
    "symbols": [
      [
        "w",
        "Current weight, 3."
      ],
      [
        "\\eta",
        "Learning rate, 0.1."
      ],
      [
        "g",
        "Current loss gradient, 4."
      ],
      [
        "w_{\\mathrm{new}}",
        "Updated weight, 2.6."
      ]
    ]
  },
  "cnn-convolution": {
    "latex": "o_i=k_1x_i+k_2x_{i+1}",
    "symbols": [
      [
        "i",
        "Starting position of the window."
      ],
      [
        "x_{i}, x_{i+1}",
        "Neighbouring pixel values."
      ],
      [
        "k_{1}, k_{2}",
        "Shared weights 1 and −1."
      ],
      [
        "o_{i}",
        "Output at that position."
      ]
    ]
  },
  "sequence-models": {
    "latex": "h_t=0.5h_{t-1}+x_t",
    "symbols": [
      [
        "t",
        "Position in the sequence."
      ],
      [
        "x_{t}",
        "Current scalar input representation."
      ],
      [
        "h_{t-1}",
        "State from the previous position."
      ],
      [
        "h_{t}",
        "Updated state; this is a toy recurrence."
      ]
    ]
  },
  "attention-transformers": {
    "latex": "\\text{output}=\\alpha_1v_1+\\alpha_2v_2",
    "symbols": [
      [
        "\\alpha_1,\\alpha_2",
        "Weights from query-key scores; here 0.5 each."
      ],
      [
        "v_{1}, v_{2}",
        "Values being mixed, here 2 and 6."
      ],
      [
        "\\text{output}",
        "The resulting representation, here 4."
      ]
    ]
  },
  "numbers-signs": {
    "latex": "-3 - 4 = -7",
    "symbols": [
      [
        "-",
        "A negative sign shows a value below zero; between values it means subtract."
      ],
      [
        "=",
        "The value on the left is the same as the value on the right."
      ]
    ]
  },
  "fractions-ratios-percentages": {
    "latex": "\\frac{3}{5}=0.6=60\\%",
    "symbols": [
      [
        "/",
        "Divide the top number by the bottom number."
      ],
      [
        "\\%",
        "Out of every one hundred."
      ]
    ]
  },
  "powers-roots-scientific": {
    "latex": "2^3=2\\times2\\times2=8",
    "symbols": [
      [
        "2",
        "The base: the number being repeated."
      ],
      [
        "3",
        "The exponent: how many copies of the base are multiplied."
      ]
    ]
  },
  "variables-expressions": {
    "latex": "y=3x+2",
    "symbols": [
      [
        "x",
        "The input value that may change."
      ],
      [
        "3",
        "The coefficient that multiplies x."
      ],
      [
        "2",
        "A fixed value called a constant."
      ]
    ]
  },
  "equations-inequalities": {
    "latex": "3x+5=17",
    "symbols": [
      [
        "x",
        "The value we want to find."
      ],
      [
        "=",
        "Both sides must remain equal."
      ],
      [
        "<\\text{ or }>",
        "One side is smaller or larger rather than exactly equal."
      ]
    ]
  },
  "functions-domain-range": {
    "latex": "f(x)=2x+1",
    "symbols": [
      [
        "f",
        "The name of the function."
      ],
      [
        "x",
        "The input supplied to the function."
      ],
      [
        "f(x)",
        "The output produced for input x."
      ]
    ]
  },
  "graphs-slope-intercept": {
    "latex": "\\text{slope}=\\frac{\\Delta y}{\\Delta x}",
    "symbols": [
      [
        "x",
        "The horizontal input."
      ],
      [
        "y",
        "The vertical output."
      ],
      [
        "\\text{slope}",
        "How much y changes when x changes by one unit."
      ],
      [
        "\\Delta y,\\Delta x",
        "Changes in output and input; delta means change."
      ]
    ]
  },
  "exponents-logarithms": {
    "latex": "\\log_2(8)=3\\quad\\text{because}\\quad2^3=8",
    "symbols": [
      [
        "\\log",
        "Ask which exponent produces the given value."
      ],
      [
        "2",
        "The base used for repeated multiplication."
      ],
      [
        "8",
        "The value we want the base to produce."
      ]
    ]
  },
  "summation-subscripts-sets": {
    "latex": "\\sum_{i=1}^{3}x_i=x_1+x_2+x_3",
    "symbols": [
      [
        "\\Sigma",
        "Add a sequence of terms."
      ],
      [
        "i",
        "The position currently being visited."
      ],
      [
        "x_{i}",
        "The x value stored at position i."
      ]
    ]
  },
  "scalars-vectors-tensors": {
    "latex": "\\mathbf{x}=[x_1,x_2,\\ldots,x_n]",
    "symbols": [
      [
        "x",
        "The name of the whole vector."
      ],
      [
        "x_{i}",
        "One value at position i."
      ],
      [
        "n",
        "The number of values in the vector."
      ]
    ]
  },
  "vector-arithmetic": {
    "latex": "(a_1,a_2)+(b_1,b_2)=(a_1+b_1,a_2+b_2)",
    "symbols": [
      [
        "a\\text{ and }b",
        "The two vectors being combined."
      ],
      [
        "{}_1\\text{ and }{}_2",
        "Labels for matching positions."
      ],
      [
        "+",
        "Combine the values in each matching position."
      ]
    ]
  },
  "vector-magnitude-distance": {
    "latex": "\\lVert\\mathbf{v}\\rVert_2=\\sqrt{v_1^2+v_2^2}",
    "symbols": [
      [
        "\\lVert\\mathbf{v}\\rVert_2",
        "The ordinary straight-line length of vector v."
      ],
      [
        "v_{1}\\text{ and }v_{2}",
        "The horizontal and vertical components."
      ],
      [
        "\\sqrt{\\phantom{x}}",
        "Take the non-negative square root."
      ]
    ]
  },
  "dot-product-angle": {
    "latex": "\\mathbf{a}\\cdot\\mathbf{b}=a_1b_1+a_2b_2",
    "symbols": [
      [
        "\\cdot",
        "The dot-product operation."
      ],
      [
        "a_{1}b_{1}",
        "The product of the first matching components."
      ],
      [
        "+",
        "Combine the component products into one number."
      ]
    ]
  },
  "matrix-anatomy-types": {
    "latex": "A\\in\\mathbb{R}^{m\\times n}",
    "symbols": [
      [
        "A",
        "The name of the matrix."
      ],
      [
        "m",
        "The number of rows."
      ],
      [
        "n",
        "The number of columns."
      ],
      [
        "a_{ij}",
        "The entry in row i and column j."
      ]
    ]
  },
  "linear-transformations": {
    "latex": "\\mathbf{y}=A\\mathbf{v}",
    "symbols": [
      [
        "A",
        "The matrix that describes the transformation."
      ],
      [
        "v",
        "The input vector."
      ],
      [
        "y",
        "The transformed output vector."
      ]
    ]
  },
  "change-slope-limits": {
    "latex": "\\lim_{x\\to a}f(x)=L",
    "symbols": [
      [
        "\\lim",
        "Look at the value being approached."
      ],
      [
        "x\\to a",
        "Move x closer and closer to a."
      ],
      [
        "L",
        "The output value being approached."
      ]
    ]
  },
  "derivative-definition": {
    "latex": "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}",
    "symbols": [
      [
        "f'(x)",
        "The instantaneous rate of change at x."
      ],
      [
        "h",
        "A small change in the input."
      ],
      [
        "f(x+h)-f(x)",
        "The matching change in the output."
      ]
    ]
  },
  "partial-derivatives": {
    "latex": "\\frac{\\partial f}{\\partial x}",
    "symbols": [
      [
        "\\partial",
        "A derivative taken with other inputs held fixed."
      ],
      [
        "f",
        "The output rule being studied."
      ],
      [
        "x",
        "The one input allowed to change."
      ]
    ]
  },
  "gradients-directional-change": {
    "latex": "\\nabla f(x,y)=\\begin{bmatrix}\\frac{\\partial f}{\\partial x}\\\\[4pt]\\frac{\\partial f}{\\partial y}\\end{bmatrix}",
    "symbols": [
      [
        "\\nabla",
        "The gradient: a vector of partial derivatives."
      ],
      [
        "\\frac{\\partial f}{\\partial x}",
        "Change in f when x changes and y stays fixed."
      ],
      [
        "\\frac{\\partial f}{\\partial y}",
        "Change in f when y changes and x stays fixed."
      ]
    ]
  },
  "chain-rule-computational-graphs": {
    "latex": "\\frac{dy}{dx}=\\frac{dy}{du}\\frac{du}{dx}",
    "symbols": [
      [
        "x",
        "The starting input."
      ],
      [
        "u",
        "An intermediate value."
      ],
      [
        "y",
        "The final output."
      ]
    ]
  },
  "gradient-descent-learning-rate": {
    "latex": "\\theta\\leftarrow\\theta-\\eta\\nabla L(\\theta)",
    "symbols": [
      [
        "\\theta",
        "The model parameters being updated."
      ],
      [
        "\\eta",
        "The learning rate that controls step size."
      ],
      [
        "\\nabla L(\\theta)",
        "The direction of steepest increase in loss."
      ]
    ]
  },
  "unit-vectors-normalization": {
    "latex": "\\mathbf{u}=\\frac{\\mathbf{v}}{\\lVert\\mathbf{v}\\rVert}",
    "symbols": [
      [
        "v",
        "The original vector."
      ],
      [
        "\\lVert\\mathbf{v}\\rVert",
        "The length of the original vector."
      ],
      [
        "u",
        "A vector in the same direction with length one."
      ]
    ]
  },
  "matrix-vector-multiplication": {
    "latex": "\\mathbf{y}=A\\mathbf{v}",
    "symbols": [
      [
        "A",
        "The matrix containing the output rules."
      ],
      [
        "v",
        "The input vector."
      ],
      [
        "y",
        "The output vector, with one value from each matrix row."
      ]
    ]
  },
  "derivative-rules": {
    "latex": "\\frac{d}{dx}x^n=nx^{n-1}",
    "symbols": [
      [
        "\\frac{d}{dx}",
        "Find the rate of change with respect to x."
      ],
      [
        "n",
        "The original exponent."
      ],
      [
        "n-1",
        "The new exponent after differentiating."
      ]
    ]
  },
  "tangents-stationary-points": {
    "latex": "f'(a)=0",
    "symbols": [
      [
        "f'",
        "The slope rule for the function."
      ],
      [
        "a",
        "The input location being checked."
      ],
      [
        "0",
        "No local rise or fall at that exact point."
      ]
    ]
  },
  "scalar-vector-functions": {
    "latex": "f:\\mathbb{R}^n\\to\\mathbb{R}",
    "symbols": [
      [
        "\\mathbb{R}^n",
        "An input containing n real numbers."
      ],
      [
        "\\to",
        "Maps the input to an output."
      ],
      [
        "\\mathbb{R}",
        "One real-number output, so the function is scalar-valued."
      ]
    ]
  },
  "loss-functions": {
    "latex": "\\text{squared error}=(y-\\hat{y})^2",
    "symbols": [
      [
        "y",
        "The target value we wanted."
      ],
      [
        "\\hat{y}",
        "The model's prediction."
      ],
      [
        "{}^2",
        "Square the miss so its sign disappears and larger misses matter more."
      ]
    ]
  },
  "jacobian-matrices": {
    "latex": "J_{ij}=\\frac{\\partial f_i}{\\partial x_j}",
    "symbols": [
      [
        "J",
        "The Jacobian matrix."
      ],
      [
        "i",
        "The output row being measured."
      ],
      [
        "j",
        "The input column being changed."
      ],
      [
        "\\frac{\\partial f_i}{\\partial x_j}",
        "One local output-input sensitivity."
      ]
    ]
  },
  "hessians-convexity": {
    "latex": "H_{ij}=\\frac{\\partial^2f}{\\partial x_i\\,\\partial x_j}",
    "symbols": [
      [
        "H",
        "The Hessian matrix of second derivatives."
      ],
      [
        "\\partial^2",
        "A rate of change of a rate of change."
      ],
      [
        "i\\text{ and }j",
        "The two input directions being compared."
      ]
    ]
  },
  "matrix-matrix-multiplication": {
    "latex": "C=AB",
    "symbols": [
      [
        "A\\text{ and }B",
        "The two matrix rules being composed."
      ],
      [
        "C",
        "The matrix containing the combined result."
      ],
      [
        "c_{ij}",
        "Row i of A dotted with column j of B."
      ]
    ]
  },
  "transpose-symmetry": {
    "latex": "(A^{\\mathsf T})_{ij}=A_{ji}",
    "symbols": [
      [
        "A^{\\mathsf T}",
        "Matrix A with rows and columns exchanged."
      ],
      [
        "i",
        "A row position."
      ],
      [
        "j",
        "A column position."
      ]
    ]
  },
  "determinant-collapse": {
    "latex": "\\det(A)=ad-bc",
    "symbols": [
      [
        "\\det(A)",
        "The signed area scale produced by A."
      ],
      [
        "ad",
        "The main diagonal product."
      ],
      [
        "bc",
        "The other diagonal product."
      ]
    ]
  },
  "inverse-systems": {
    "latex": "\\mathbf{x}=A^{-1}\\mathbf{b}",
    "symbols": [
      [
        "A^{-1}",
        "The transformation that undoes A."
      ],
      [
        "b",
        "The known output."
      ],
      [
        "x",
        "The unknown input being recovered."
      ]
    ]
  },
  "rank-column-null": {
    "latex": "\\operatorname{rank}(A)+\\operatorname{nullity}(A)=n",
    "symbols": [
      [
        "\\operatorname{rank}(A)",
        "The number of independent output directions."
      ],
      [
        "\\operatorname{nullity}(A)",
        "The number of input directions sent to zero."
      ],
      [
        "n",
        "The total number of input dimensions."
      ]
    ]
  },
  "basis-coordinates": {
    "latex": "\\mathbf{v}=c_1\\mathbf{b}_1+c_2\\mathbf{b}_2",
    "symbols": [
      [
        "b_{1}\\text{ and }b_{2}",
        "The chosen basis directions."
      ],
      [
        "c_{1}\\text{ and }c_{2}",
        "The coordinates in that basis."
      ],
      [
        "v",
        "The vector being described."
      ]
    ]
  },
  "change-of-basis": {
    "latex": "\\mathbf{v}=B[\\mathbf{v}]_B",
    "symbols": [
      [
        "B",
        "A matrix whose columns are the basis vectors."
      ],
      [
        "[\\mathbf{v}]_B",
        "Coordinates measured in basis B."
      ],
      [
        "v",
        "The unchanged geometric vector."
      ]
    ]
  },
  "composition-matrix-powers": {
    "latex": "A^3\\mathbf{v}=A(A(A\\mathbf{v}))",
    "symbols": [
      [
        "A^3",
        "Three repeated applications of A."
      ],
      [
        "v",
        "The starting vector."
      ],
      [
        "A(Av)",
        "One transformation applied after another."
      ]
    ]
  },
  "eigenvalues-eigenvectors": {
    "latex": "A\\mathbf{v}=\\lambda\\mathbf{v}",
    "symbols": [
      [
        "v",
        "A direction that is not turned by A."
      ],
      [
        "\\lambda",
        "The stretch, shrink, or flip factor."
      ],
      [
        "Av",
        "The transformed vector."
      ]
    ]
  },
  "eigendecomposition": {
    "latex": "A=P\\Lambda P^{-1}",
    "symbols": [
      [
        "P",
        "A matrix containing eigenvectors."
      ],
      [
        "\\Lambda",
        "A diagonal matrix containing eigenvalues."
      ],
      [
        "P^{-1}",
        "The change into eigenvector coordinates."
      ]
    ]
  },
  "covariance-matrices-pca": {
    "latex": "\\Sigma\\mathbf{v}=\\lambda\\mathbf{v}",
    "symbols": [
      [
        "\\Sigma",
        "The covariance matrix describing joint spread."
      ],
      [
        "v",
        "A principal direction through the data."
      ],
      [
        "\\lambda",
        "The amount of variance along that direction."
      ]
    ]
  },
  "experiments-outcomes-events": {
    "latex": "A\\subseteq S",
    "symbols": [
      [
        "S",
        "The complete set of possible outcomes."
      ],
      [
        "A",
        "The event we care about."
      ],
      [
        "\\subseteq",
        "Every outcome in A also belongs to S."
      ]
    ]
  },
  "set-operations-counting": {
    "latex": "|A\\cup B|=|A|+|B|-|A\\cap B|",
    "symbols": [
      [
        "\\cup",
        "Union: in A or B or both."
      ],
      [
        "\\cap",
        "Intersection: in both A and B."
      ],
      [
        "|A|",
        "The number of outcomes in A."
      ]
    ]
  },
  "probability-rules": {
    "latex": "P(A^{\\mathrm c})=1-P(A)",
    "symbols": [
      [
        "P(A)",
        "The probability of event A."
      ],
      [
        "A^{\\mathrm c}",
        "Every outcome outside A."
      ],
      [
        "1",
        "The total probability of all possible outcomes."
      ]
    ]
  },
  "conditional-probability": {
    "latex": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
    "symbols": [
      [
        "|",
        "Given: restrict attention to the event on the right."
      ],
      [
        "A\\cap B",
        "Cases where A and B both happen."
      ],
      [
        "P(B)",
        "The size of the new reference group."
      ]
    ]
  },
  "bayes-theorem": {
    "latex": "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}",
    "symbols": [
      [
        "P(A)",
        "The prior belief before seeing evidence."
      ],
      [
        "P(B\\mid A)",
        "How likely the evidence is when A is true."
      ],
      [
        "P(A\\mid B)",
        "The posterior belief after seeing the evidence."
      ]
    ]
  },
  "random-variables": {
    "latex": "X:S\\to\\mathbb{R}",
    "symbols": [
      [
        "X",
        "The numerical rule."
      ],
      [
        "S",
        "The sample space of outcomes."
      ],
      [
        "\\mathbb{R}",
        "The possible numerical outputs."
      ]
    ]
  },
  "probability-mass-function": {
    "latex": "p(x)=P(X=x)",
    "symbols": [
      [
        "p(x)",
        "The height of the probability bar at x."
      ],
      [
        "X",
        "The discrete random variable."
      ],
      [
        "= x",
        "One exact countable value."
      ]
    ]
  },
  "probability-density-function": {
    "latex": "P(a\\le X\\le b)=\\int_a^b f(x)\\,dx",
    "symbols": [
      [
        "f(x)",
        "The probability density height."
      ],
      [
        "a\\text{ and }b",
        "The interval boundaries."
      ],
      [
        "\\text{area}",
        "The probability assigned to the interval."
      ],
      [
        "\\int_a^b f(x)\\,dx",
        "Add density across the interval from a to b to obtain its area."
      ]
    ]
  },
  "cumulative-distribution-function": {
    "latex": "F(x)=P(X\\le x)",
    "symbols": [
      [
        "F(x)",
        "The running probability total."
      ],
      [
        "\\le",
        "Include x and every smaller value."
      ],
      [
        "P",
        "The probability accumulated so far."
      ]
    ]
  },
  "expected-value": {
    "latex": "\\mathbb{E}[X]=\\sum_x x\\,p(x)",
    "symbols": [
      [
        "\\mathbb{E}[X]",
        "The expected or long-run average value."
      ],
      [
        "\\Sigma",
        "Add across every possible value."
      ],
      [
        "x p(x)",
        "One value multiplied by its probability."
      ]
    ]
  },
  "variance-population-sample": {
    "latex": "\\operatorname{Var}(X)=\\mathbb{E}[(X-\\mu)^2]",
    "symbols": [
      [
        "\\mu",
        "The mean or center."
      ],
      [
        "X-\\mu",
        "A distance from the center."
      ],
      [
        "{}^2",
        "Square distances so signs do not cancel."
      ]
    ]
  },
  "standard-deviation": {
    "latex": "\\sigma=\\sqrt{\\operatorname{Var}(X)}",
    "symbols": [
      [
        "\\sigma",
        "Standard deviation in the original units."
      ],
      [
        "\\sqrt{\\phantom{x}}",
        "Take the non-negative square root."
      ],
      [
        "\\operatorname{Var}(X)",
        "Variance in squared units."
      ]
    ]
  },
  "bernoulli-binomial": {
    "latex": "X\\sim\\operatorname{Binomial}(n,p)",
    "symbols": [
      [
        "X",
        "The number of successes observed."
      ],
      [
        "n",
        "The fixed number of trials."
      ],
      [
        "p",
        "The probability of success on each trial."
      ]
    ]
  },
  "normal-z-scores": {
    "latex": "z=\\frac{x-\\mu}{\\sigma}",
    "symbols": [
      [
        "x",
        "The value being compared."
      ],
      [
        "\\mu",
        "The population mean or center."
      ],
      [
        "\\sigma",
        "The population standard deviation."
      ],
      [
        "z",
        "The signed distance from the mean in standard-deviation units."
      ]
    ]
  },
  "covariance-correlation": {
    "latex": "r=\\frac{\\operatorname{Cov}(X,Y)}{\\sigma_x\\sigma_y}",
    "symbols": [
      [
        "\\operatorname{Cov}(X,Y)",
        "The unscaled shared movement of X and Y."
      ],
      [
        "\\sigma_x\\text{ and }\\sigma_y",
        "The separate spreads of X and Y."
      ],
      [
        "r",
        "The standardized linear relationship from negative one to one."
      ]
    ]
  },
  "sampling-estimators-clt": {
    "latex": "\\bar{x}=\\frac{1}{n}\\sum_{i=1}^{n}x_i",
    "symbols": [
      [
        "\\bar{x}",
        "The sample mean used as an estimate."
      ],
      [
        "n",
        "The number of observations in the sample."
      ],
      [
        "x_{i}",
        "The sampled value at position i."
      ],
      [
        "\\Sigma",
        "Add all sampled values."
      ]
    ]
  },
  "confidence-intervals": {
    "latex": "\\text{estimate}\\pm\\text{margin of error}",
    "symbols": [
      [
        "\\text{estimate}",
        "The central value calculated from the sample."
      ],
      [
        "\\pm",
        "Create a lower and an upper endpoint."
      ],
      [
        "\\text{margin of error}",
        "The distance added and subtracted to express uncertainty."
      ]
    ]
  },
  "ml-workflow": {
    "latex": "\\text{data}\\longrightarrow\\text{train}\\mid\\text{validate}\\mid\\text{test}",
    "symbols": [
      [
        "\\text{train}",
        "Examples used to fit model parameters."
      ],
      [
        "\\text{validate}",
        "Examples used to compare model choices."
      ],
      [
        "\\text{test}",
        "Untouched examples used for the final estimate."
      ]
    ]
  },
  "linear-regression-ml": {
    "latex": "\\hat{y}=w_1x_1+\\cdots+w_nx_n+b",
    "symbols": [
      [
        "\\hat{y}",
        "The model's predicted number."
      ],
      [
        "x_{i}",
        "One input feature."
      ],
      [
        "w_{i}",
        "The learned influence of that feature."
      ],
      [
        "b",
        "The baseline prediction."
      ]
    ]
  },
  "logistic-classification": {
    "latex": "p=\\frac{1}{1+e^{-z}}",
    "symbols": [
      [
        "z",
        "The unrestricted model score, called a logit."
      ],
      [
        "e",
        "The exponential constant used by the curve."
      ],
      [
        "p",
        "The resulting class probability."
      ]
    ]
  },
  "knn-distance": {
    "latex": "\\text{prediction}=\\operatorname{vote}(k\\text{ nearest examples})",
    "symbols": [
      [
        "k",
        "The number of neighbours consulted."
      ],
      [
        "\\text{distance}",
        "The measured separation between feature vectors."
      ],
      [
        "\\text{vote}",
        "The class supported by the most selected neighbours."
      ]
    ]
  },
  "naive-bayes": {
    "latex": "\\operatorname{score}(c)\\propto P(c)\\prod_{j=1}^{n}P(x_j\\mid c)",
    "symbols": [
      [
        "P(c)",
        "The class probability before seeing the features."
      ],
      [
        "P(x_j\\mid c)",
        "How likely one feature is within that class."
      ],
      [
        "\\prod",
        "Multiply the feature likelihoods."
      ],
      [
        "c",
        "The candidate class."
      ],
      [
        "x_j",
        "The observed feature at position j."
      ],
      [
        "n",
        "The number of observed features."
      ]
    ]
  },
  "trees-ensembles": {
    "latex": "\\text{ensemble prediction}=\\operatorname{combine}(\\text{tree}_1,\\ldots,\\text{tree}_m)",
    "symbols": [
      [
        "\\text{tree}_i",
        "One fitted decision tree."
      ],
      [
        "m",
        "The number of trees."
      ],
      [
        "\\text{combine}",
        "Vote for classes or average numerical predictions."
      ]
    ]
  },
  "support-vector-machines": {
    "latex": "\\text{score}=\\mathbf{w}\\cdot\\mathbf{x}+b",
    "symbols": [
      [
        "x",
        "The input feature vector."
      ],
      [
        "w",
        "The vector perpendicular to the boundary."
      ],
      [
        "b",
        "The boundary's offset."
      ],
      [
        "\\text{sign}",
        "Which class side contains the example."
      ]
    ]
  },
  "clustering-unsupervised": {
    "latex": "\\text{centroid}=\\frac{1}{n}\\sum_{i=1}^{n}\\mathbf{x}_i",
    "symbols": [
      [
        "\\text{centroid}",
        "The coordinate-wise center of a cluster."
      ],
      [
        "n",
        "The number of assigned points."
      ],
      [
        "\\Sigma",
        "Add the assigned point vectors."
      ],
      [
        "\\mathbf{x}_i",
        "The point vector at position i in the cluster."
      ]
    ]
  },
  "model-selection-generalization": {
    "latex": "\\text{generalization gap}=\\text{validation error}-\\text{training error}",
    "symbols": [
      [
        "\\text{training error}",
        "Error on examples used to fit the model."
      ],
      [
        "\\text{validation error}",
        "Error on held-out examples used during selection."
      ],
      [
        "\\text{gap}",
        "A warning sign when unseen-data error is much larger."
      ]
    ]
  }
};
