import React, { useState } from "react";

export default function RevealProblems({ problems, title }) {
  const [revealed, setRevealed] = useState({});
  if (!problems?.length) return null;
  return <section className="reveal-problems"><div className="section-heading"><div><p className="eyebrow">Step-by-step practice</p><h2>{title}</h2></div></div>{problems.map((problem, index) => <article className="reveal-problem" key={problem.id}><p><strong>{index + 1}.</strong> {problem.prompt}</p><button type="button" className="button secondary" onClick={() => setRevealed((state) => ({ ...state, [problem.id]: !state[problem.id] }))}>{revealed[problem.id] ? "Hide solution" : "Reveal solution"}</button>{revealed[problem.id] && <div className="revealed-solution"><ol>{(problem.steps || problem.solutionSteps).map((step) => <li key={step}>{step}</li>)}</ol><p><strong>Answer:</strong> {problem.answer}</p>{problem.explanation && <p><strong>Why it matters:</strong> {problem.explanation}</p>}{problem.commonTrap && <p><strong>Common trap:</strong> {problem.commonTrap}</p>}</div>}</article>)}</section>;
}

