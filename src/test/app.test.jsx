import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../App.jsx";

describe("routed application", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = "#/dashboard";
  });

  it("renders the dashboard launchpad", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", { name: /Learn the maths behind machine learning/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Foundations roadmap" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Start with the first lesson/i })).toHaveAttribute("href", "#/lessons/numbers-signs/start");
  });

  it("renders a guided Foundations lesson with direct step navigation", async () => {
    window.location.hash = "#/lessons/numbers-signs/start";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Start here" })).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 7")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Lesson step navigation" })).getByRole("link", { name: /^Next/ })).toHaveAttribute("href", "#/lessons/numbers-signs/everyday-story");
    expect(screen.getByRole("navigation", { name: "Lesson step navigation" })).toBeInTheDocument();
  });

  it("keeps guided checks supportive and does not lock Next", async () => {
    window.location.hash = "#/lessons/numbers-signs/everyday-story";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "See it in everyday life" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /A quantity used to count/i }));
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expect(await screen.findByText("That’s right.")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Lesson step navigation" })).getByRole("link", { name: /^Next/ })).toHaveAttribute("href", "#/lessons/numbers-signs/plain-idea");
  });

  it("expands an everyday story into quantities, reasons, and a takeaway", async () => {
    window.location.hash = "#/lessons/conditional-probability/everyday-story";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "See it in everyday life" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Quantities in the everyday example" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Everyday example walkthrough" })).toBeInTheDocument();
    expect(screen.getByText("What the answer tells us")).toBeInTheDocument();
    expect(screen.getAllByText("Why:").length).toBeGreaterThan(0);
    expect(screen.getByText(/12\/20=0.6/)).toBeInTheDocument();
  });

  it("defines unfamiliar ML terms and links previews without blocking progress", async () => {
    window.location.hash = "#/lessons/numbers-signs/math-to-ml";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Connect the notation to ML" })).toBeInTheDocument();
    expect(screen.getByText("New ML words, decoded")).toBeInTheDocument();
    expect(screen.getByText(/An arrow of numbers showing the direction in which a value increases fastest/i)).toBeInTheDocument();
    expect(screen.getByText("Match the maths to the model")).toBeInTheDocument();
    expect(screen.getByText("Why the model cares")).toBeInTheDocument();
    const gradientPreview = screen.getAllByRole("link", { name: "You will learn this later →" }).find((link) => link.getAttribute("href") === "#/lessons/gradients-directional-change/plain-idea");
    expect(gradientPreview).toBeTruthy();
    expect(within(screen.getByRole("navigation", { name: "Lesson step navigation" })).getByRole("link", { name: /^Next/ })).toHaveAttribute("href", "#/lessons/numbers-signs/recap");
  });

  it("redirects old Foundations study links to the guided start", async () => {
    window.location.hash = "#/lessons/numbers-signs/study";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Start here" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#/lessons/numbers-signs/start");
  });

  it("lets beginners change slope, intercept, and a point on the graph", async () => {
    window.location.hash = "#/lessons/graphs-slope-intercept/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Move the line and watch the rule change" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Interactive graph of y = x/i })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Slope"), { target: { value: "-1.5" } });
    fireEvent.change(screen.getByLabelText("Starting height"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("Input x"), { target: { value: "-2" } });
    expect(screen.getByText("y = −1.5x + 2")).toBeInTheDocument();
    expect(screen.getByText(/when x is -2, y is 5/i)).toBeInTheDocument();
    expect(screen.getByText("Formula behind this graph")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Decode every symbol →" })).toHaveAttribute("href", "#/lessons/graphs-slope-intercept/math-to-ml");
    expect(screen.getByRole("link", { name: "Open full reference →" })).toHaveAttribute("href", "#/lessons/graphs-slope-intercept/formula");
  });

  it("redirects an old gradient study link into the new guided lesson", async () => {
    window.location.hash = "#/lessons/gradients-directional-change/study";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Start here" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#/lessons/gradients-directional-change/start");
  });

  it("lets learners explore gradient direction and keeps the Python companion", async () => {
    window.location.hash = "#/lessons/gradients-directional-change/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Choose a point and test a direction" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Contour map for f of x y/i })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Position x"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Position y"), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText("Test direction in degrees"), { target: { value: "180" } });
    expect(screen.getByText(/f = 9 and ∇f = \[6, 0\]/i)).toBeInTheDocument();
    expect(screen.getByText(/change is -6, so it points downhill/i)).toBeInTheDocument();

    window.location.hash = "#/lessons/gradients-directional-change/recap";
    expect(await screen.findByRole("link", { name: "Try the Python companion" })).toHaveAttribute("href", "#/lessons/gradients-directional-change/python");
  });

  it("normalizes a vector without changing its direction", async () => {
    window.location.hash = "#/lessons/unit-vectors-normalization/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Keep the direction, remove the distance" })).toBeInTheDocument();
    expect(screen.getByText(/u = \[0.6, 0.8\] has the same direction and length 1/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Vector x"), { target: { value: "0" } });
    expect(screen.getByRole("img", { name: "Vector 0, 4 and its unit vector" })).toBeInTheDocument();
  });

  it("shows how a matrix transforms an input vector", async () => {
    window.location.hash = "#/lessons/matrix-vector-multiplication/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Send a vector through a matrix" })).toBeInTheDocument();
    expect(screen.getByText("Av = [4, 1]")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Swap x and y" }));
    expect(screen.getByText("Av = [1, 2]")).toBeInTheDocument();
  });

  it("makes tangent slope and squared loss explorable", async () => {
    window.location.hash = "#/lessons/tangents-stationary-points/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Move the tangent along the curve" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Tangent point x"), { target: { value: "0" } });
    expect(screen.getByText("slope = 0")).toBeInTheDocument();

    window.location.hash = "#/lessons/loss-functions/plain-idea";
    expect(await screen.findByRole("heading", { name: "Move the prediction and watch the penalty" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Loss prediction"), { target: { value: "5" } });
    expect(screen.getByText("loss = 0")).toBeInTheDocument();
  });

  it("explores Jacobians, curvature, and gradient-descent step size", async () => {
    window.location.hash = "#/lessons/jacobian-matrices/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "See what each Jacobian column does" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Jacobian location x"), { target: { value: "2" } });
    expect(screen.getByText("J = [[4, -1], [1, 2]]")).toBeInTheDocument();

    window.location.hash = "#/lessons/hessians-convexity/plain-idea";
    expect(await screen.findByRole("heading", { name: "Compare curvature in two directions" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Saddle" }));
    expect(screen.getByText("saddle point")).toBeInTheDocument();

    window.location.hash = "#/lessons/gradient-descent-learning-rate/plain-idea";
    expect(await screen.findByRole("heading", { name: "Change the step size and watch training" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Learning rate"), { target: { value: "1.1" } });
    expect(screen.getByText("1.1 · diverging")).toBeInTheDocument();
  });

  it("explores determinant, inverse, basis, eigenvectors, and PCA", async () => {
    window.location.hash = "#/lessons/determinant-collapse/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Watch a matrix scale and collapse area" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Matrix d"), { target: { value: "0" } });
    expect(screen.getByText("det(A) = 0")).toBeInTheDocument();

    window.location.hash = "#/lessons/inverse-systems/plain-idea";
    expect(await screen.findByRole("heading", { name: "Move the equations and recover their shared solution" })).toBeInTheDocument();
    expect(screen.getByText("x = [3, 1]")).toBeInTheDocument();

    window.location.hash = "#/lessons/basis-coordinates/plain-idea";
    expect(await screen.findByRole("heading", { name: "Change the measuring directions, not the vector recipe" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Skew basis" }));
    expect(screen.getByText("v = [3, 1]")).toBeInTheDocument();

    window.location.hash = "#/lessons/eigenvalues-eigenvectors/plain-idea";
    expect(await screen.findByRole("heading", { name: "Rotate the vector and find directions that do not turn" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Eigenvector angle"), { target: { value: "0" } });
    expect(screen.getByText("eigenvector direction")).toBeInTheDocument();

    window.location.hash = "#/lessons/covariance-matrices-pca/plain-idea";
    expect(await screen.findByRole("heading", { name: "Rotate one line and preserve as much spread as possible" })).toBeInTheDocument();
    expect(screen.getByLabelText("PCA direction")).toHaveValue("45");
  });

  it("explores sample spaces, set overlap, probability, conditioning, and Bayes", async () => {
    window.location.hash = "#/lessons/experiments-outcomes-events/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Build an event from all possible outcomes" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "1outside A" }));
    expect(screen.getByText("P(A) = 4/6")).toBeInTheDocument();

    window.location.hash = "#/lessons/set-operations-counting/plain-idea";
    expect(await screen.findByRole("heading", { name: "Count the overlap only once" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Set overlap"), { target: { value: "3" } });
    expect(screen.getByText("|A ∪ B| = 10")).toBeInTheDocument();

    window.location.hash = "#/lessons/probability-rules/plain-idea";
    expect(await screen.findByRole("heading", { name: "Split the whole into A and not A" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Event probability"), { target: { value: "0.4" } });
    expect(screen.getByText("P(not A) = 0.6")).toBeInTheDocument();

    window.location.hash = "#/lessons/conditional-probability/plain-idea";
    expect(await screen.findByRole("heading", { name: "Conditioning changes the denominator" })).toBeInTheDocument();
    expect(screen.getByText("P(A | B) = 12/20 = 0.6")).toBeInTheDocument();

    window.location.hash = "#/lessons/bayes-theorem/plain-idea";
    expect(await screen.findByRole("heading", { name: "Update a prior after positive evidence" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Bayes prior"), { target: { value: "20" } });
    expect(screen.getByText("P(cause | positive) = 67%")).toBeInTheDocument();
  });

  it("connects random variables, distributions, expectation, and spread", async () => {
    window.location.hash = "#/lessons/random-variables/plain-idea";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Map outcomes to useful numbers" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Do flips match?" }));
    expect(screen.getByText("X = matching flips")).toBeInTheDocument();

    window.location.hash = "#/lessons/probability-mass-function/plain-idea";
    expect(await screen.findByRole("heading", { name: "Move probability mass between exact values" })).toBeInTheDocument();
    expect(screen.getByText("total = 1")).toBeInTheDocument();

    window.location.hash = "#/lessons/probability-density-function/plain-idea";
    expect(await screen.findByRole("heading", { name: "Probability is area across an interval" })).toBeInTheDocument();
    expect(screen.getByText("P(1 ≤ X ≤ 3) = 0.5")).toBeInTheDocument();

    window.location.hash = "#/lessons/cumulative-distribution-function/plain-idea";
    expect(await screen.findByRole("heading", { name: "Move the cutoff and accumulate everything to its left" })).toBeInTheDocument();
    expect(screen.getByText("F(1) = 0.7")).toBeInTheDocument();

    window.location.hash = "#/lessons/expected-value/plain-idea";
    expect(await screen.findByRole("heading", { name: "Weight each outcome by how often it occurs" })).toBeInTheDocument();
    expect(screen.getByText("E[X] = -0.4")).toBeInTheDocument();

    window.location.hash = "#/lessons/variance-population-sample/plain-idea";
    expect(await screen.findByRole("heading", { name: "Move values away from the mean and watch spread grow" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Variance spread"), { target: { value: "3" } });
    expect(screen.getByText("variance = 6")).toBeInTheDocument();

    window.location.hash = "#/lessons/standard-deviation/plain-idea";
    expect(await screen.findByRole("heading", { name: "Take the square root to return to familiar units" })).toBeInTheDocument();
    expect(screen.getByText("standard deviation = 3")).toBeInTheDocument();
  });

  it("moves the remaining probability lessons into the guided journey and keeps Python", async () => {
    window.location.hash = "#/lessons/normal-z-scores/basics";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Start here" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#/lessons/normal-z-scores/start");
    window.location.hash = "#/lessons/normal-z-scores/recap";
    expect(await screen.findByRole("link", { name: "Try the Python companion" })).toHaveAttribute("href", "#/lessons/normal-z-scores/python");
  });

  it("guides Classical ML lessons while preserving labs, formulas, and old links", async () => {
    window.location.hash = "#/lessons/ml-workflow/study";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Start here" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#/lessons/ml-workflow/start");
    window.location.hash = "#/lessons/ml-workflow/math-to-ml";
    expect(await screen.findByText("New ML words, decoded")).toBeInTheDocument();
    expect(screen.getByText(/Using information during training that would not be available/i)).toBeInTheDocument();
    expect(screen.getByText("Explore the full formula reference")).toBeInTheDocument();
    window.location.hash = "#/lessons/ml-workflow/recap";
    expect(await screen.findByRole("link", { name: "Try the Python companion" })).toHaveAttribute("href", "#/lessons/ml-workflow/python");
  });

  it("keeps formula decoding in its own lesson tab", async () => {
    window.location.hash = "#/lessons/eigenvalues-eigenvectors/formula";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Read the maths without guessing" })).toBeInTheDocument();
    expect(screen.getByText("Eigen equation")).toBeInTheDocument();
    expect(document.querySelector(".katex")).toBeInTheDocument();
  });

  it("keeps practice on a separate lesson page", async () => {
    window.location.hash = "#/lessons/eigenvalues-eigenvectors/practice";
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Test the whole lesson" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Study guide" })).toBeInTheDocument();
  });
});

describe("Deep Learning guided routes", () => {
  beforeEach(() => window.localStorage.clear());
  const ids = ["tensors-perceptrons", "activations-losses", "forward-backprop", "deep-optimization-regularization", "cnn-convolution", "sequence-models", "attention-transformers"];
  it.each(ids)("renders every step and keeps companion routes for %s", async (id) => {
    window.location.hash = `#/lessons/${id}/start`;
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Start here" })).toBeInTheDocument();
    for (const [step, title] of [["everyday-story", "See it in everyday life"], ["plain-idea", "Understand the main idea"], ["worked-example", "Follow one worked example"], ["your-turn", "Try one small check"], ["math-to-ml", "Connect the notation to ML"], ["recap", "Recap and choose what comes next"]]) {
      window.location.hash = `#/lessons/${id}/${step}`;
      expect(await screen.findByRole("heading", { name: title })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Try the Python companion" })).toHaveAttribute("href", `#/lessons/${id}/python`);
    expect(screen.getByRole("link", { name: "Open formula reference" })).toHaveAttribute("href", `#/lessons/${id}/formula`);
  }, 20000);
  it.each(["study", "basics", "core", "advanced"])("redirects legacy %s links into Deep Learning guidance", async (alias) => {
    window.location.hash = `#/lessons/attention-transformers/${alias}`;
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Start here" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#/lessons/attention-transformers/start");
  });
});


it("allows Deep Learning Next, Back, Skip, outline, and browser-history navigation", async () => {
  window.localStorage.clear();
  window.location.hash = "#/lessons/forward-backprop/start";
  render(<App />);
  await screen.findByRole("heading", { name: "Start here" });
  fireEvent.click(screen.getByRole("link", { name: "Next →" }));
  await screen.findByRole("heading", { name: "See it in everyday life" });
  fireEvent.click(screen.getByRole("link", { name: "← Back" }));
  await screen.findByRole("heading", { name: "Start here" });
  fireEvent.click(screen.getByRole("link", { name: "Skip for now" }));
  await screen.findByRole("heading", { name: "See it in everyday life" });
  fireEvent.click(screen.getByRole("button", { name: "Lesson outline" }));
  fireEvent.click(screen.getByRole("link", { name: /Connect the notation to ML/ }));
  await screen.findByRole("heading", { name: "Connect the notation to ML" });
  window.history.back();
  expect(await screen.findByRole("heading", { name: "See it in everyday life" })).toBeInTheDocument();
  window.history.forward();
  expect(await screen.findByRole("heading", { name: "Connect the notation to ML" })).toBeInTheDocument();
}, 20000);
