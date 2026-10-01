import { codeLab } from "./lessonBuilder.js";

const multiplyCode = `def multiply(A, v):
    if not A or any(len(row) != len(v) for row in A):
        raise ValueError('Matrix rows must match the vector length')
    return [sum(row[j] * v[j] for j in range(len(v))) for row in A]
`;
const solveCode = `def solve2(A, rhs):
    if len(A) != 2 or any(len(row) != 2 for row in A) or len(rhs) != 2:
        raise ValueError('Use a 2 by 2 system')
    a, b = A[0]
    c, d = A[1]
    det = a * d - b * c
    if det == 0:
        raise ValueError('No unique solution: inspect consistency separately')
    return [(d * rhs[0] - b * rhs[1]) / det,
            (-c * rhs[0] + a * rhs[1]) / det]
\n${multiplyCode}`;

export const recoveryPythonLabs = {
  "inverse-systems": codeLab({ title: "Solve the prices and check the bills", goal: "Implement the small 2 × 2 recovery calculation, then solve the fitted coefficient example.",
    code: `${solveCode}\nA = [[1, 1], [2, 1]]\nb = [3, 5]\nx = solve2(A, b)\nprint(x)\nprint(multiply(A, x))\nnormal_matrix = [[3, 3], [3, 5]]\nw = solve2(normal_matrix, [9, 13])\nprint(w)\nprint(multiply([[1, 0], [1, 1], [1, 2]], w))`,
    output: "[2.0, 1.0]\n[3.0, 5.0]\n[1.0, 2.0]\n[1.0, 3.0, 5.0]", explanation: "The hand-sized solve2 formula recovers the unknown column; multiplication verifies the forward equations. The second solve recovers intercept and slope. General numerical work should use a stable solver instead of this teaching formula.", mathToCode: "The two returned expressions expand A⁻¹b for a 2 × 2 matrix. multiply computes one row dot product per known output.", commonTrap: "A zero determinant means there is no unique square-system solution; consistency still decides between no solutions and infinitely many.", exercise: { prompt: "Change b to [4, 6]. Predict prices [2, 2] before running. The fitted-model example uses different inputs and stays unchanged." },
    hiddenTests: "assert solve2([[2, 1], [1, 1]], [5, 3]) == [2, 1]\nassert solve2([[1, 2], [2, 1]], [8, 7]) == [2, 3]\nassert solve2(A, [4, 6]) == [2, 2]\ntry:\n    solve2([[1, 2], [2, 4]], [4, 8])\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError('A singular system must not return a unique solution')"
  }),
  "rank-column-null": codeLab({ title: "Move along a null direction", goal: "Verify lost input changes and identical predictions from different coefficients.",
    code: `${multiplyCode}\ndef rank2(A):\n    if len(A) != 2 or any(len(row) != 2 for row in A):\n        raise ValueError('rank2 is only for 2 by 2 examples')\n    if all(value == 0 for row in A for value in row):\n        return 0\n    det = A[0][0] * A[1][1] - A[0][1] * A[1][0]\n    return 1 if det == 0 else 2\n\nA = [[1, 2], [2, 4]]\nprint(rank2(A), 2 - rank2(A))\nprint(multiply(A, [2, -1]))\nfor t in [-1, 0, 1]:\n    x = [3 + 2 * t, 1 - t]\n    print(x, multiply(A, x))\nX = [[1, 2], [2, 4], [3, 6]]\nprint(multiply(X, [1, 0]))\nprint(multiply(X, [3, -1]))`,
    output: "1 1\n[0, 0]\n[1, 2] [5, 10]\n[3, 1] [5, 10]\n[5, 0] [5, 10]\n[1, 2, 3]\n[1, 2, 3]", explanation: "Changing t moves the input along [2, −1] while preserving the output. X maps two distinct coefficient vectors to the same predictions. rank2 is restricted to these exact 2 × 2 examples; it is not a general numerical-rank algorithm.", mathToCode: "multiply(A, [2, -1]) checks Az = 0. The input family base + t*z exhibits solutions differing by null vectors. Subtract rank from the number of input columns to obtain nullity.", commonTrap: "Do not use rank2 for rectangular matrices or treat exact equality on floating-point determinants as a general numerical-rank test.", exercise: { prompt: "Replace A with the identity [[1, 0], [0, 1]]. Predict rank 2, nullity 0, and outputs that now move with the input; the separate X predictions stay unchanged." },
    hiddenTests: "assert rank2([[1, 0], [0, 1]]) == 2\nassert rank2([[0, 0], [0, 0]]) == 0\nassert multiply([[1, 0, 1], [0, 1, 1]], [-1, -1, 1]) == [0, 0]\nassert multiply([[1, 2, 3], [2, 4, 6]], [-2, 1, 0]) == [0, 0]\nassert multiply([[1, 2, 3], [2, 4, 6]], [-3, 0, 1]) == [0, 0]\nassert multiply(X, [2, -1]) == [0, 0, 0]"
  }),
  "basis-coordinates": codeLab({ title: "Encode a recipe and decode the vector", goal: "Recover skew-basis coordinates and verify that their reconstruction gives the original vector.",
    code: `${solveCode}\nB = [[1, 1], [0, 1]]\nv = [3, 2]\ncoordinates = solve2(B, v)\nprint(coordinates)\nprint(multiply(B, coordinates))\nprint(multiply(B, v))\nother_basis = [[1, 1], [1, -1]]\nprint(solve2(other_basis, [4, 2]))`,
    output: "[1.0, 2.0]\n[3.0, 2.0]\n[5, 2]\n[3.0, 1.0]", explanation: "Basis directions are B's columns. solve2 recovers their coefficients, and multiply reconstructs the vector. Reusing the standard vector entries as skew coefficients gives a different destination.", mathToCode: "coordinates implements [v]ᴮ = B⁻¹v for this square basis; multiply(B, coordinates) implements v = B[v]ᴮ.", commonTrap: "A coefficient list must be paired with its basis matrix and column order. Raw dot products do not give general skew-basis coordinates.", exercise: { prompt: "Change v to [4, 1]. Predict skew coordinates [3, 1], reconstruction [4, 1], and incorrect unchanged-recipe reconstruction [5, 1]." },
    hiddenTests: "assert solve2(B, [4, 1]) == [3, 1]\nassert multiply(B, [-2, 3]) == [1, 3]\nassert solve2([[2, 0], [0, 1]], [4, 3]) == [2, 3]\nassert multiply(B, coordinates) == v"
  }),
};
