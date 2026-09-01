import React from "react";
import { Link } from "react-router-dom";
import { chapterById, projects } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

export default function ProjectsPage() {
  const { mastery, completeProject } = useMastery();
  return <div className="page projects-page"><header className="page-title"><p className="eyebrow">Evidence of understanding</p><h1>Projects & capstones</h1><p>Projects force the complete loop: define the problem, connect math to code, evaluate honestly, and explain the result.</p></header><div className="project-grid">{projects.map((project) => { const done = mastery.projects[project.id]; return <article className={`project-card ${done ? "complete" : ""}`} key={project.id}><div><span>{chapterById[project.chapterId]?.shortTitle}</span></div><h2>{project.title}</h2><p>{project.summary}</p><h3>Deliverables</h3><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><div className="skill-pills">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><button type="button" onClick={() => completeProject(project.id)}>{done ? "✓ Completed" : "Mark project complete"}</button></article>; })}</div><section className="capstone-note"><h2>Prepared PyTorch notebooks</h2><p>Deep-learning lesson pages link directly to versioned Colab notebooks so larger experiments run outside the browser while their mathematics stays connected to the study guide.</p><Link to="/chapters/deep-learning">Open Deep Learning chapter →</Link></section></div>;
}
