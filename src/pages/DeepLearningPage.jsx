import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlockMath, MathText } from "../components/Math.jsx";
import PythonPlayground from "../PythonPlayground.jsx";
import { deepLearningIntroduction, deepLearningSections, prepareDeepMarkdown } from "../content/deepLearningGuide.js";
import { lessonById } from "../content/index.js";
import { pythonExamples } from "../utils/lessonNavigation.js";

const sectionLabs = {
  "4": ["tensors-perceptrons"],
  "8": ["activations-losses"],
  "12": ["forward-backprop"],
  "16": ["deep-optimization-regularization"],
  "18": ["pytorch-training-loop"],
  "21": ["attention-transformers"],
  "27": ["cnn-convolution", "sequence-models"]
};

const sectionChecks = {
  "4": [
    { prompt: "In an artificial neural network, what is the closest parallel to a biological synapse becoming stronger?", options: ["Increasing a connection weight through training", "Adding a new layer every time", "Changing a label from 0 to 1"], answer: 0, explanation: "A weight is the adjustable strength of a model connection. Training can increase or decrease it." }
  ],
  "5": [
    { prompt: "Why is sigmoid useful for a pass/fail prediction?", options: ["It turns a score into a probability from 0 to 1", "It always returns exactly 0 or 1", "It removes the need for training"], answer: 0, explanation: "Binary classification has two outcomes. Sigmoid expresses the model's score as a probability for one of them." }
  ],
  "6": [
    { prompt: "What do earlier layers in an image network usually learn first?", options: ["Simple patterns such as edges and lines", "Complete objects such as faces", "The final class label"], answer: 0, explanation: "Later layers combine simple patterns from earlier layers into more complex features." }
  ],
  "12": [
    { prompt: "What happens when a gradient becomes extremely small in an early layer?", options: ["Its weights can update only by a tiny amount, so learning slows", "The model immediately learns faster", "The layer gains more neurons"], answer: 0, explanation: "A very small gradient creates a very small update. This is the vanishing-gradient problem." }
  ],
  "16": [
    { prompt: "A weight is 0.8, its gradient is 0.4, and the learning rate is 0.1. What is the next weight after one gradient-descent step?", options: ["0.76", "0.84", "0.4"], answer: 0, explanation: "Subtract the scaled gradient: 0.8 − 0.1 × 0.4 = 0.76." },
    { prompt: "What does backpropagation provide to an optimizer?", options: ["A gradient for each parameter", "A new network architecture", "A validation score only"], answer: 0, explanation: "Backpropagation calculates gradients; the optimizer uses them to update parameters." }
  ],
  "20": [
    { prompt: "Which question is regularization trying to answer?", options: ["How can training loss fall fastest?", "How can the model avoid fitting training details too specifically?", "How can more layers be created during training?"], answer: 1, explanation: "Regularization aims for useful performance on unseen data, not only the smallest training loss." },
    { prompt: "Training accuracy is 99% and validation accuracy is 70%. What is the most likely issue?", options: ["Underfitting", "Overfitting", "A perfect generalization result"], answer: 1, explanation: "A large gap between training and validation performance is a common sign of overfitting." },
    { prompt: "What does model.eval() do to dropout?", options: ["Keeps it active", "Disables it for evaluation", "Turns it into weight decay"], answer: 1, explanation: "Dropout is a training-time regularization technique and is disabled during evaluation." },
    { prompt: "What is BatchNorm mainly trying to do during training?", options: ["Keep layer values on a more manageable scale", "Turn every output into a binary label", "Remove the need for an optimizer"], answer: 0, explanation: "BatchNorm stabilizes the values passed between layers so training is easier to manage." }
  ]
};

function SectionChecks({ checks }) {
  const [answers, setAnswers] = useState({});
  if (!checks?.length) return null;
  return <section className="deep-section-checks" aria-label="Quick checks">
    <p className="section-label">Quick checks</p>
    <h3>Check the idea before moving on</h3>
    {checks.map((check, index) => {
      const chosen = answers[index];
      const answered = chosen !== undefined;
      return <article key={check.prompt}>
        <p><strong>{index + 1}. {check.prompt}</strong></p>
        <div>{check.options.map((option, optionIndex) => <button type="button" className={answered && optionIndex === check.answer ? "correct" : ""} onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} key={option}>{option}</button>)}</div>
        {answered && <p className={chosen === check.answer ? "check-correct" : "check-retry"}>{chosen === check.answer ? "Correct. " : "Try again. "}{check.explanation}</p>}
      </article>;
    })}
  </section>;
}

function Text({ children }) {
  return <MathText>{React.Children.toArray(children).filter((child) => typeof child === "string").join("")}</MathText>;
}

const markdownComponents = {
  h1: ({ children }) => <h1><Text>{children}</Text></h1>,
  h2: ({ children }) => <h2><Text>{children}</Text></h2>,
  h3: ({ children }) => <h3><Text>{children}</Text></h3>,
  h4: ({ children }) => <h4><Text>{children}</Text></h4>,
  p: ({ children }) => <p><Text>{children}</Text></p>,
  li: ({ children }) => <li><Text>{children}</Text></li>,
  th: ({ children }) => <th><Text>{children}</Text></th>,
  td: ({ children }) => <td><Text>{children}</Text></td>,
  pre: ({ children }) => {
    const code = React.Children.toArray(children)[0];
    if (code?.props?.className === "language-math") return <BlockMath>{String(code.props.children).trim()}</BlockMath>;
    return <pre>{children}</pre>;
  }
};

function PythonLab({ lessonId }) {
  const lesson = lessonById[lessonId];
  const labs = pythonExamples(lesson);
  if (!labs.length) return null;
  return <section className="deep-python-labs" aria-label={`${lesson.title} Python examples`}>
    <p className="section-label">Keep the Python connection</p>
    <h3>{lesson.title} in Python</h3>
    {labs.map(({ level, lab }) => <details key={`${lessonId}-${level}`}>
      <summary>{lab.title} <span>{lab.runtime === "notebook" ? "Colab notebook" : "Runs here"}</span></summary>
      <p>{lab.goal}</p>
      <p><strong>Math to code:</strong> <MathText>{lab.mathToCode}</MathText></p>
      {lab.runtime === "notebook" ? <>
        <pre><code>{lab.code}</code></pre>
        <a className="button" href={`https://colab.research.google.com/github/antorappai/ml-ai-math/blob/main/${lab.notebookPath}`} target="_blank" rel="noreferrer">Open prepared notebook in Colab ↗</a>
      </> : <PythonPlayground lessonKey={`deep-guide-${lessonId}-${level}`} initialCode={lab.code} expectedOutput={lab.output} packages={lab.packages} hiddenTests={lab.hiddenTests} />}
    </details>)}
  </section>;
}

export default function DeepLearningPage() {
  const { sectionId } = useParams();
  const [active, setActive] = useState(sectionId || "1");
  const valid = !sectionId || deepLearningSections.some((section) => section.id === sectionId);
  const jump = (id) => document.getElementById(`deep-learning-section-${id}`)?.scrollIntoView?.({ block: "start", behavior: "instant" });

  useEffect(() => {
    if (sectionId) jump(sectionId);
    else window.scrollTo?.(0, 0);
  }, [sectionId]);

  useEffect(() => {
    let frame;
    const update = () => {
      let current = deepLearningSections[0].id;
      for (const section of deepLearningSections) {
        if (document.getElementById(`deep-learning-section-${section.id}`)?.getBoundingClientRect().top <= 150) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  if (!valid) return <Navigate to="/deep-learning" replace />;
  return <div className="page deep-learning-page">
    <Link to="/dashboard">← All units</Link>
    <div className="deep-reading-layout">
      <nav className="deep-sidebar" aria-label="Deep Learning sections">
        <h2>Deep Learning</h2>
        {deepLearningSections.map((section) => <Link key={section.id} to={`/deep-learning/${section.id}`} aria-current={active === section.id ? "location" : undefined} onClick={() => jump(section.id)}>{section.title}</Link>)}
      </nav>
      <article className="deep-markdown">
        <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{prepareDeepMarkdown(deepLearningIntroduction)}</Markdown>
        {deepLearningSections.map((section) => <section id={`deep-learning-section-${section.id}`} key={section.id} className="deep-reading-section">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{prepareDeepMarkdown(section.markdown)}</Markdown>
          <SectionChecks checks={sectionChecks[section.id]} />
          {(sectionLabs[section.id] || []).map((lessonId) => <PythonLab key={lessonId} lessonId={lessonId} />)}
        </section>)}
        <Link to="/dashboard">Back to all units →</Link>
      </article>
    </div>
  </div>;
}
