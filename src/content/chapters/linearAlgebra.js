import { check, codeLab, progressiveLesson } from "../lessonBuilder.js";

export const linearAlgebraLessons = [
  progressiveLesson({
    id: "vectors-geometry",
    chapterId: "linear-algebra",
    order: 1,
    title: "Vectors, Magnitude & Similarity",
    subtitle: "Represent observations as directions and sizes, then compare them geometrically.",
    prerequisites: ["math-language"],
    tags: ["vectors", "embeddings"],
    scenario: { title: "A customer profile", body: "Coordinates can store preferences for price, quality, and speed.", mlParallel: "Feature vectors and embeddings represent users, products, words, and model states." },
    mlConnection: "Nearly every ML input, parameter set, embedding, and gradient is a vector.",
    projectIds: ["vector-search-mini"],
    basics: {
      summary: "A vector combines several related numbers into one mathematical object.",
      concepts: ["Coordinates describe components.", "Magnitude describes size.", "Direction and size are different properties."],
      formulaIds: ["vector-magnitude"],
      example: { title: "Length of movement", prompt: "Find the magnitude of (3,4).", steps: ["Square 3 and 4.", "Add to get 25.", "Take square root."], answer: "5", interpretation: "The diagonal trip is five units long." },
      pythonLab: codeLab({ title: "Vector magnitude in NumPy", goal: "Compute vector length.", code: "import numpy as np\nv = np.array([3.0, 4.0])\nprint(np.linalg.norm(v))", output: "5.0", explanation: "np.linalg.norm implements Euclidean magnitude.", packages: ["numpy"] }),
      questions: [check("vectors-b1", "What does vector magnitude describe?", ["Only direction", "Size or length", "Number of dimensions only", "Probability"], 1, "Magnitude is the vector's length.")],
      examNotes: ["For 2D vectors, look for familiar right triangles."]
    },
    core: {
      summary: "Normalize vectors and use dot products to compare alignment.",
      concepts: ["Unit vectors remove scale.", "Dot product combines matching coordinates.", "Cosine similarity compares direction."],
      formulaIds: ["unit-vector", "distance", "dot-product"],
      example: { title: "Preference match", prompt: "Compute dot product of (1,2) and (3,4).", steps: ["Multiply 1*3 and 2*4.", "Add 3+8."], answer: "11", interpretation: "A larger positive score indicates stronger aligned features, subject to scale." },
      questions: [check("vectors-c1", "What does a zero dot product mean for nonzero vectors?", ["Same direction", "Perpendicular", "Same length", "One is negative"], 1, "Zero dot product means orthogonality.")],
      examNotes: ["Separate raw dot product from cosine similarity, which divides out magnitude."]
    },
    advanced: {
      summary: "Connect vectors to high-dimensional embeddings and geometry-dependent models.",
      concepts: ["Distance can become less informative in very high dimensions.", "Feature scaling changes distance and dot products.", "Embedding geometry encodes learned relationships."],
      formulaIds: ["distance", "dot-product", "unit-vector"],
      example: { title: "Scale distortion", prompt: "Why can income dominate age in Euclidean distance?", steps: ["Income may vary by tens of thousands.", "Age may vary by tens.", "Squared income differences dominate."], answer: "Features are on incompatible scales", interpretation: "Standardization changes the geometry seen by the model." },
      questions: [check("vectors-a1", "Why normalize embeddings for cosine search?", ["To remove direction", "To compare direction without raw magnitude", "To make every coordinate positive", "To reduce dimension"], 1, "Unit normalization isolates directional similarity.")],
      examNotes: ["Always inspect dimensions and scaling assumptions in distance questions."]
    }
  }),
  progressiveLesson({
    id: "matrices-operations",
    chapterId: "linear-algebra",
    order: 2,
    title: "Matrices, Shapes & Multiplication",
    subtitle: "Treat matrices as data tables and transformation machines.",
    prerequisites: ["vectors-geometry"],
    tags: ["matrices", "shapes"],
    scenario: { title: "Students by subjects", body: "Rows can represent students and columns can represent subject scores.", mlParallel: "An ML dataset is usually samples by features; a weight matrix transforms features into new representations." },
    mlConnection: "Training data, layer weights, covariance, and batched predictions are matrix operations.",
    basics: {
      summary: "Read rows, columns, entries, shapes, and common matrix types.",
      concepts: ["Shape is rows by columns.", "Identity leaves vectors unchanged.", "Diagonal matrices scale coordinates independently."],
      formulaIds: ["matrix-shape", "transpose"],
      example: { title: "Read shape", prompt: "What is the shape of [[1,2,3],[4,5,6]]?", steps: ["Count two rows.", "Count three columns."], answer: "2 by 3", interpretation: "Two observations, three features in dataset language." },
      pythonLab: codeLab({ title: "Shapes and transpose", goal: "Inspect a data matrix.", code: "import numpy as np\nA = np.array([[1,2,3],[4,5,6]])\nprint(A.shape)\nprint(A.T)", output: "(2, 3)\n[[1 4]\n [2 5]\n [3 6]]", explanation: "Transpose swaps sample and feature axes.", packages: ["numpy"] }),
      questions: [check("matrices-b1", "What is the shape of a matrix with 4 rows and 2 columns?", ["2x4", "4x2", "8x1", "4"], 1, "Matrix dimensions are rows first.")],
      examNotes: ["Write shapes beside matrices before any operation."]
    },
    core: {
      summary: "Multiply matrices by matching rows to columns.",
      concepts: ["Inner dimensions must match.", "Output keeps outer dimensions.", "Matrix multiplication is not commutative."],
      formulaIds: ["matrix-product"],
      example: { title: "Predict output shape", prompt: "Multiply shapes 5x3 and 3x2.", steps: ["Inner 3s match.", "Keep outer 5 and 2."], answer: "5 by 2", interpretation: "Five samples become two output features." },
      questions: [check("matrices-c1", "If A is 2x3 and B is 3x4, what is AB?", ["2x4", "3x3", "4x2", "Undefined"], 0, "Inner dimensions match and outer dimensions remain.")],
      examNotes: ["Order matters: AB and BA may have different shapes or one may be undefined."]
    },
    advanced: {
      summary: "Reason about rank, inverse, determinant, and numerical stability.",
      concepts: ["Rank counts independent directions.", "A singular square matrix loses information.", "Conditioning describes sensitivity to small input changes."],
      formulaIds: ["determinant", "matrix-product"],
      example: { title: "Detect collapse", prompt: "Find determinant of [[1,2],[2,4]].", steps: ["Compute 1*4-2*2.", "Result is zero."], answer: "0", interpretation: "One row is redundant; the transformation collapses dimension." },
      questions: [check("matrices-a1", "What does determinant zero imply for a square matrix?", ["It is identity", "It is singular and not invertible", "All entries are zero", "It is orthogonal"], 1, "Zero determinant indicates geometric collapse and no inverse.")],
      examNotes: ["Link determinant, rank, null space, and invertibility as one information-loss story."]
    }
  }),
  progressiveLesson({
    id: "linear-transformations",
    chapterId: "linear-algebra",
    order: 3,
    title: "Linear Transformations, Basis & Spaces",
    subtitle: "Understand how matrices reshape a whole space and how coordinates depend on a basis.",
    prerequisites: ["matrices-operations"],
    tags: ["transformations", "basis", "rank"],
    scenario: { title: "Changing map coordinates", body: "The same physical location can be described using north-east coordinates or directions aligned to roads.", mlParallel: "Feature transformations and learned layers represent the same information in new coordinate systems." },
    mlConnection: "Layers, projections, PCA, and feature maps are transformations between representations.",
    basics: {
      summary: "A linear transformation preserves vector addition and scaling.",
      concepts: ["The origin stays fixed.", "Basis vectors determine the entire transformation.", "Scaling, rotation, reflection, and shear can be linear."],
      formulaIds: ["linear-transform"],
      example: { title: "Scale a point", prompt: "Apply diag(2,3) to (1,-1).", steps: ["Scale x by 2.", "Scale y by 3."], answer: "(2,-3)", interpretation: "The space stretches differently along each axis." },
      questions: [check("transform-b1", "Which rule cannot be linear?", ["Rotation", "Scaling", "Adding a fixed translation", "Reflection"], 2, "A fixed translation moves the origin.")],
      examNotes: ["Test T(0)=0 first when deciding whether a map is linear."]
    },
    core: {
      summary: "Describe vectors in different bases and understand column and null spaces.",
      concepts: ["Coordinates change while the underlying vector stays the same.", "Column space contains reachable outputs.", "Null space contains inputs sent to zero."],
      formulaIds: ["linear-transform", "matrix-product"],
      example: { title: "Coordinates in a basis", prompt: "Express (2,0) using b1=(1,1), b2=(1,-1).", steps: ["Solve c1+c2=2.", "Solve c1-c2=0."], answer: "coordinates (1,1)", interpretation: "One copy of each basis vector builds the same vector." },
      questions: [check("transform-c1", "What does a nonzero null-space vector represent?", ["An input direction lost by the transformation", "An eigenvalue", "A row of A", "A probability"], 0, "Null-space directions map to zero.")],
      examNotes: ["Do not confuse a vector with its coordinate list in a chosen basis."]
    },
    advanced: {
      summary: "Connect rank-nullity, projections, and composition to representation learning.",
      concepts: ["Rank-nullity accounts for preserved and lost input dimensions.", "Projection keeps selected directions and removes others.", "Composed transformations multiply in reverse application order."],
      formulaIds: ["linear-transform", "matrix-product", "determinant"],
      example: { title: "Compose transformations", prompt: "If A acts first and B second, what matrix acts overall?", steps: ["Output after A is Av.", "Apply B to get B(Av)."], answer: "BA", interpretation: "Matrix order follows function composition from inside outward." },
      questions: [check("transform-a1", "For A:R^5 to R^3 with rank 3, what is nullity?", ["2", "3", "5", "8"], 0, "Rank-nullity gives 5=3+nullity.")],
      examNotes: ["Write input dimension = rank + nullity before calculating."]
    }
  }),
  progressiveLesson({
    id: "eigen-pca",
    chapterId: "linear-algebra",
    order: 4,
    title: "Eigenvalues, Eigendecomposition & PCA",
    subtitle: "Find special transformation directions and use them to understand data variance.",
    prerequisites: ["linear-transformations"],
    tags: ["eigen", "pca", "dimensionality-reduction"],
    scenario: { title: "A stretched cloud of points", body: "A point cloud may spread mostly along one diagonal direction and only slightly across it.", mlParallel: "PCA finds high-variance directions and represents data with fewer coordinates." },
    mlConnection: "Eigenvectors underpin PCA, covariance analysis, stability, and spectral methods.",
    projectIds: ["pca-mini"],
    basics: {
      summary: "An eigenvector keeps its line; the eigenvalue says how it scales.",
      concepts: ["Not every vector is an eigenvector.", "Negative eigenvalues flip direction.", "Zero eigenvalues signal collapse along a direction."],
      formulaIds: ["eigen-equation"],
      example: { title: "Read a diagonal matrix", prompt: "For diag(4,1), identify eigenvalues along the axes.", steps: ["The x-axis scales by 4.", "The y-axis scales by 1."], answer: "4 and 1", interpretation: "Coordinate axes are already eigenvector directions." },
      pythonLab: codeLab({ title: "Eigenvalues in NumPy", goal: "Compute eigenpairs.", code: "import numpy as np\nA = np.array([[4.,0.],[0.,1.]])\nvalues, vectors = np.linalg.eig(A)\nprint(values)\nprint(vectors)", output: "[4. 1.]\n[[1. 0.]\n [0. 1.]]", explanation: "Columns of vectors correspond to entries in values.", packages: ["numpy"] }),
      questions: [check("eigen-b1", "What does eigenvalue lambda measure?", ["Matrix size", "Scale along its eigenvector", "Number of rows", "Probability"], 1, "Lambda is the scaling factor for that special direction.")],
      examNotes: ["Check Av is a scalar multiple of v before calling v an eigenvector."]
    },
    core: {
      summary: "Solve eigenvalues and reconstruct diagonalizable matrices.",
      concepts: ["Characteristic equation finds eigenvalues.", "Null spaces find matching eigenvectors.", "Eigendecomposition simplifies powers."],
      formulaIds: ["characteristic-equation", "eigendecomposition"],
      example: { title: "Find diagonal eigenvalues", prompt: "Solve eigenvalues of diag(3,2).", steps: ["Form (3-lambda)(2-lambda)=0.", "Set each factor to zero."], answer: "3 and 2", interpretation: "Diagonal entries are eigenvalues for a diagonal matrix." },
      questions: [check("eigen-c1", "What does Lambda contain in A=C Lambda C^-1?", ["Eigenvectors", "Eigenvalues on its diagonal", "Raw data", "Loss values"], 1, "Lambda stores eigenvalues in the order matching C's eigenvectors.")],
      examNotes: ["Keep eigenvector columns aligned with their eigenvalues."]
    },
    advanced: {
      summary: "Connect covariance eigenvectors to principal components and information retention.",
      concepts: ["Covariance describes joint spread.", "PCA orders directions by explained variance.", "Standardization matters when feature units differ."],
      formulaIds: ["covariance", "eigen-equation", "eigendecomposition"],
      example: { title: "Choose a component", prompt: "Eigenvalues are 8, 1, and 0.2. Which first component is retained?", steps: ["Compare variance captured.", "Select eigenvector associated with 8."], answer: "The eigenvector for lambda=8", interpretation: "It captures the largest spread direction." },
      questions: [check("eigen-a1", "Why can PCA fail without scaling?", ["PCA requires labels", "Large-unit features can dominate covariance", "Eigenvalues become probabilities", "Matrices cannot be centered"], 1, "Feature scale changes measured variance.")],
      examNotes: ["PCA questions usually combine centering, covariance, eigenpairs, and explained variance."]
    }
  })
];
