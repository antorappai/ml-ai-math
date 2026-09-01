import React from "react";
import { Link } from "react-router-dom";
import { chapters, formulaList, lessonById } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

const essentials = ["vector-magnitude", "dot-product", "matrix-product", "determinant", "derivative-definition", "gradient", "expected-value", "variance", "standard-deviation", "z-score", "bayes", "linear-regression", "sigmoid", "backprop", "attention"];

export default function DashboardPage() {
  const { mastery, recommendation, weakSkills } = useMastery();
  const next = lessonById[recommendation.lessonId];
  const completed = Object.values(mastery.completedLevels).reduce((total, levels) => total + Object.values(levels).filter(Boolean).length, 0);
  const total = chapters.reduce((sum, chapter) => sum + chapter.lessonIds.length * 3, 0);

  return (
    <div className="page dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <p className="eyebrow light">Master's-level ML, built from the ground up</p>
          <h1>Learn the math.<br />Build the model.<br /><em>Explain both.</em></h1>
          <p>Start with plain-language intuition, decode real mathematical notation, implement it in Python, then prove your understanding through exams and projects.</p>
          <div className="button-row">
            <Link className="button primary light-button" to={`/lessons/${next.id}/${recommendation.level}`}>Continue: {next.title}</Link>
            <Link className="button ghost-light" to="/practice">Take a mixed mock</Link>
          </div>
        </div>
        <aside className="progress-orbit">
          <span>Current mastery</span>
          <strong>{Math.round((completed / total) * 100)}%</strong>
          <div className="progress-track"><i style={{ width: `${(completed / total) * 100}%` }} /></div>
          <p>{completed} of {total} lesson levels completed</p>
        </aside>
      </section>

      <section className="start-grid">
        <article className="start-card featured">
          <span className="card-index">01</span><p className="eyebrow">Recommended next</p>
          <h2>{next.title}</h2><p>{next.subtitle}</p>
          <Link to={`/lessons/${next.id}/${recommendation.level}`}>Open {recommendation.level} level →</Link>
        </article>
        <article className="start-card">
          <span className="card-index">02</span><p className="eyebrow">Python practice</p>
          <h2>Math becomes code</h2><p>Run NumPy and scikit-learn in-browser; use prepared Colab notebooks for PyTorch.</p>
          <Link to="/chapters/classical-ml">Start coding →</Link>
        </article>
        <article className="start-card">
          <span className="card-index">03</span><p className="eyebrow">Weak-area coach</p>
          <h2>{weakSkills.length ? weakSkills[0].skill : "Build your first signal"}</h2>
          <p>{weakSkills.length ? `${weakSkills[0].count} incorrect attempt(s) detected here.` : "Complete checks and the studio will identify what to revise."}</p>
          <Link to="/practice">Open revision set →</Link>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="section-heading"><div><p className="eyebrow">Progressive roadmap</p><h2>From symbols to transformers</h2></div><p>Basics → Core → Advanced inside every topic.</p></div>
        <div className="chapter-grid">
          {chapters.map((chapter) => {
            const chapterDone = chapter.lessonIds.reduce((sum, id) => sum + Object.values(mastery.completedLevels[id] || {}).filter(Boolean).length, 0);
            const chapterTotal = chapter.lessonIds.length * 3;
            return <Link className={`chapter-card accent-${chapter.accent}`} to={`/chapters/${chapter.id}`} key={chapter.id}><span>Phase {chapter.phase}</span><h3>{chapter.title}</h3><p>{chapter.purpose}</p><div className="mini-progress"><i style={{ width: `${(chapterDone / chapterTotal) * 100}%` }} /></div><small>{chapterDone}/{chapterTotal} levels</small></Link>;
          })}
        </div>
      </section>

      <section className="dashboard-section formula-checklist">
        <div className="section-heading"><div><p className="eyebrow">Foundation audit</p><h2>Core formula checklist</h2></div><Link to="/formulas">Search all {formulaList.length} formulas →</Link></div>
        <div className="checklist-grid">
          {essentials.map((id) => {
            const formula = formulaList.find((item) => item.id === id);
            const confident = mastery.formulaConfidence[id];
            return <Link to={`/formulas?focus=${id}`} key={id} className="checklist-item"><span className={confident ? "checked" : ""}>{confident ? "✓" : "○"}</span><div><strong>{formula.label}</strong><small>{formula.category} · {confident || "not rated"}</small></div></Link>;
          })}
        </div>
      </section>

      <section className="outcome-banner"><p className="eyebrow light">What this prepares you for</p><h2>Read graduate ML notation, solve exam questions, implement models, and defend your decisions.</h2><div><Link className="button light-button" to="/projects">Browse guided projects</Link><Link className="button ghost-light" to="/course-packs/masters-math-core">Open course pack</Link></div></section>
    </div>
  );
}

