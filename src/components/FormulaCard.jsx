import React from "react";
import { BlockMath, InlineMath } from "./Math.jsx";

export default function FormulaCard({ formula, compact = false }) {
  if (!formula) return null;

  return (
    <article className={`formula-card ${compact ? "compact" : ""}`} id={`formula-${formula.id}`}>
      <header className="formula-heading">
        <div>
          <p className="eyebrow">{formula.category}</p>
          <h3>{formula.label}</h3>
        </div>
        <span className="formula-id">{formula.id}</span>
      </header>
      <BlockMath>{formula.latex}</BlockMath>
      <p className="read-aloud"><strong>Read aloud:</strong> {formula.readAs}.</p>
      <p>{formula.purpose}</p>

      <div className="symbol-grid">
        {formula.symbols.map(([symbol, meaning]) => (
          <div className="symbol-item" key={`${formula.id}-${symbol}`}>
            <InlineMath>{symbol}</InlineMath>
            <span>{meaning}</span>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="formula-detail-grid">
          <section>
            <h4>Beginner example</h4>
            <p>{formula.beginnerExample}</p>
          </section>
          <section>
            <h4>How to process it</h4>
            <ol>{formula.derivation.map((step) => <li key={step}>{step}</li>)}</ol>
          </section>
          <section>
            <h4>Signs & conditions</h4>
            <ul>{[...formula.assumptions, ...formula.signs].map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section>
            <h4>Common mistakes</h4>
            <ul>{formula.mistakes.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      )}
    </article>
  );
}
