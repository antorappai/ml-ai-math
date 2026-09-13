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
          {(sectionLabs[section.id] || []).map((lessonId) => <PythonLab key={lessonId} lessonId={lessonId} />)}
        </section>)}
        <Link to="/dashboard">Back to all units →</Link>
      </article>
    </div>
  </div>;
}
