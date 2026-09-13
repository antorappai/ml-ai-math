import React, { useDeferredValue, useState } from "react";
import { Link } from "react-router-dom";
import { MathText } from "../components/Math.jsx";
import { chapters, lessonById } from "../content/index.js";
import { pythonExamples } from "../utils/lessonNavigation.js";

export default function PythonLibraryPage() {
  const [runtime, setRuntime] = useState("all");
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search.toLowerCase());

  const groups = chapters.map((chapter) => ({
    chapter,
    lessons: chapter.lessonIds.map((id) => {
      const lesson = lessonById[id];
      const examples = pythonExamples(lesson).filter(({ lab }) => {
        const runtimeMatch = runtime === "all" || lab.runtime === runtime;
        const searchable = [lesson.title, lesson.subtitle, lab.title, lab.goal, lab.mathToCode, lab.explanation, lab.commonTrap].join(" ").toLowerCase();
        return runtimeMatch && (!query || searchable.includes(query));
      });
      return { lesson, examples };
    }).filter((item) => item.examples.length)
  })).filter((group) => group.lessons.length);

  const lessonCount = groups.reduce((sum, group) => sum + group.lessons.length, 0);
  const labCount = groups.reduce((sum, group) => sum + group.lessons.reduce((inner, item) => inner + item.examples.length, 0), 0);

  return <div className="page python-library">
    <header className="plain-section-heading">
      <p className="eyebrow">Python learning companion</p>
      <h1>Understand the idea, then see how Python expresses it</h1>
      <p>Do not start by memorising code. Start with the mathematical idea, identify which values become variables or tensors, then read the code as another way of writing the same operation.</p>
    </header>

    <section className="plain-section-heading">
      <p className="eyebrow">A good way to use these labs</p>
      <h2>Math → code → output → experiment</h2>
      <p><strong>1.</strong> Say what the calculation should do. <strong>2.</strong> Find the matching Python expression. <strong>3.</strong> Predict the output before running it. <strong>4.</strong> Run it. <strong>5.</strong> Change one value and explain why the output changed.</p>
    </section>

    <div className="filter-bar">
      <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search vectors, regression, gradient, PyTorch..." />
      <select value={runtime} onChange={(event) => setRuntime(event.target.value)}>
        <option value="all">All Python examples</option>
        <option value="browser">Run in this app</option>
        <option value="notebook">Open in Colab</option>
      </select>
      <span>{labCount} labs across {lessonCount} lessons</span>
    </div>

    {groups.map(({ chapter, lessons }) => <section className="python-chapter-group" key={chapter.id}>
      <header className="plain-section-heading">
        <p className="eyebrow">{chapter.shortTitle}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.purpose}</p>
      </header>
      <div className="python-example-grid">{lessons.map(({ lesson, examples }) => <article key={lesson.id}>
        <h3>{lesson.title}</h3>
        <p>{lesson.subtitle}</p>
        {examples.map(({ level, levels, lab }, index) => <details className="python-example-group" key={`${lesson.id}-${level}`} open={index === 0}>
          <summary>
            <span>{lab.title}</span>
            <span className="python-location">{lab.runtime === "notebook" ? "Colab notebook" : "Runs here"}</span>
          </summary>
          <div className="python-section">
            <p><strong>What you are learning:</strong> {lab.goal}</p>
            <div className="code-connection"><strong>Math to code</strong><span><MathText>{lab.mathToCode}</MathText></span></div>
            {lab.explanation && <p><strong>What the code is doing:</strong> <MathText>{lab.explanation}</MathText></p>}
            {levels.length > 1 && <p><strong>Why it appears more than once:</strong> this same lab supports {levels.join(", ")} understanding, so it is shown once here.</p>}
            <p><strong>Common trap:</strong> <MathText>{lab.commonTrap}</MathText></p>
            <p><strong>Try changing something:</strong> <MathText>{lab.exercise?.prompt}</MathText></p>
            <Link className="button" to={`/lessons/${lesson.id}/python`}>Open the explained lab →</Link>
          </div>
        </details>)}
      </article>)}</div>
    </section>)}
  </div>;
}
