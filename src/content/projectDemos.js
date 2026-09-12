export const projectDemos = {
  "vector-search-mini": { title: "Rank products by similarity", code: "products = {'tea': (1, 0), 'coffee': (0.8, 0.2), 'book': (0, 1)}\nquery = (1, 0)\ndef score(vector): return sum(a * b for a, b in zip(query, vector))\nprint(max(products, key=lambda name: score(products[name])))", output: "tea" },
  "pca-mini": { title: "Center two measurements", code: "heights = [160, 170, 180]\nmean = sum(heights) / len(heights)\nprint([value - mean for value in heights])", output: "[-10.0, 0.0, 10.0]" },
  "optimization-mini": { title: "Take gradient-descent steps", code: "theta = 6.0\nfor _ in range(3):\n    theta -= 0.2 * (2 * theta)\nprint(round(theta, 3))", output: "1.296" },
  "statistics-mini": { title: "Find a mean", code: "values = [4, 6, 8]\nprint(sum(values) / len(values))", output: "6.0" },
  "workflow-mini": { title: "Make a safe split", code: "rows = list(range(10))\ntrain, test = rows[:8], rows[8:]\nprint(len(train), len(test))", output: "8 2" },
  "regression-mini": { title: "Make a linear prediction", code: "size = 3\nweight, bias = 20, 5\nprint(weight * size + bias)", output: "65" },
  "trees-mini": { title: "Use a simple decision rule", code: "score = 82\nlabel = 'pass' if score >= 50 else 'review'\nprint(label)", output: "pass" },
  "clustering-mini": { title: "Measure a simple distance", code: "a, b = (1, 2), (4, 6)\ndistance_squared = sum((x - y) ** 2 for x, y in zip(a, b))\nprint(distance_squared)", output: "25" },
  "classical-capstone": { title: "Compare two errors", code: "errors = [2, -1, 3]\nmse = sum(error ** 2 for error in errors) / len(errors)\nprint(round(mse, 3))", output: "4.667" },
  "mlp-mini": { title: "Check a tensor-like shape", code: "batch, features, hidden = 4, 3, 2\nprint((batch, hidden))", output: "(4, 2)" },
  "cnn-mini": { title: "Calculate a convolution output size", code: "image, kernel = 28, 3\nprint(image - kernel + 1)", output: "26" },
  "attention-mini": { title: "Weight values with attention", code: "weights = [0.25, 0.75]\nvalues = [2, 6]\nprint(sum(w * v for w, v in zip(weights, values)))", output: "5.0" },
  "deep-capstone": { title: "Track a validation result", code: "validation_losses = [0.8, 0.5, 0.4]\nprint(min(validation_losses))", output: "0.4" }
};
