import React, { useState } from "react";
import { Link } from "react-router-dom";
import { chapters, lessonById } from "../content/index.js";
import { pythonExamples } from "../utils/lessonNavigation.js";

export default function PythonLibraryPage() {
  const [runtime, setRuntime] = useState("all");
  const groups = chapters.map((chapter) => ({ chapter, lessons: chapter.lessonIds.map((id) => ({ lesson: lessonById[id], examples: pythonExamples(lessonById[id]).filter(({ lab }) => runtime === "all" || lab.runtime === runtime) })).filter((item) => item.examples.length) })).filter((group) => group.lessons.length);
  const count = groups.reduce((sum, group) => sum + group.lessons.length, 0);
  return <div className="page python-library">
    <header className="plain-section-heading"><p className="eyebrow">Python examples</p><h1>Learn the maths, then run it</h1><p>Browse explained examples by chapter. Run supported examples here, or open the prepared deep-learning notebooks in Colab.</p></header>
    <label className="python-runtime-filter">Show examples<select value={runtime} onChange={(event) => setRuntime(event.target.value)}><option value="all">All Python lessons</option><option value="browser">Run in this app</option><option value="notebook">Open in Colab</option></select></label>
    <p role="status">{count} lessons with Python examples</p>
    {groups.map(({ chapter, lessons }) => <section className="python-chapter-group" key={chapter.id}><h2>{chapter.title}</h2><div className="python-example-grid">{lessons.map(({ lesson, examples }) => <article key={lesson.id}><h3><Link to={`/lessons/${lesson.id}/python`}>{lesson.title}</Link></h3><ul>{examples.map(({ level, lab }) => <li key={level}>{lab.title} <span className="python-location">{lab.runtime === "notebook" ? "Colab notebook" : "Runs here"}</span></li>)}</ul></article>)}</div></section>)}
  </div>;
}
