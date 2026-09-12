import React from "react";
import { BlockMath, InlineMath, MathText } from "./Math.jsx";

function FormulaIntuition({ formula }) {
  const introduction = formula.beforeFormula || {
    title: `What does ${formula.label.toLowerCase()} help you do?`,
    explanation: formula.purpose,
    example: formula.beginnerExample
  };
  const signNotes = formula.beforeFormula?.signGuide?.map(([sign, meaning]) => `${sign}: ${meaning}`)
    || [...formula.assumptions, ...formula.signs];

  return <section className="formula-intuition" aria-label={`Before the ${formula.label} formula`}>
    <p className="eyebrow">Before the formula</p>
    <h4>{introduction.title}</h4>
    <p>{introduction.explanation}</p>
    <p><strong>Tiny example:</strong> <MathText>{introduction.example}</MathText></p>
    <div className="formula-preview-grid">
      <section><h5>Symbols to notice</h5><dl>{formula.symbols.map(([symbol, meaning]) => <div key={`${formula.id}-preview-${symbol}`}><dt><InlineMath>{symbol}</InlineMath></dt><dd>{meaning}</dd></div>)}</dl></section>
      <section><h5>Signs & conditions</h5><ul>{signNotes.map((note) => <li key={note}><MathText>{note}</MathText></li>)}</ul></section>
    </div>
  </section>;
}

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
      {!compact && <FormulaIntuition formula={formula} />}
      <BlockMath>{formula.latex}</BlockMath>
      <p className="read-aloud"><strong>Read aloud:</strong> {formula.readAs}.</p>
      <p>{formula.purpose}</p>

      {compact && <div className="symbol-grid">
        {formula.symbols.map(([symbol, meaning]) => (
          <div className="symbol-item" key={`${formula.id}-${symbol}`}>
            <InlineMath>{symbol}</InlineMath>
            <span>{meaning}</span>
          </div>
        ))}
      </div>}

      {!compact && (
        <div className="formula-detail-grid">
          <section>
            <h4>Beginner example</h4>
            <p><MathText>{formula.beginnerExample}</MathText></p>
          </section>
          <section>
            <h4>How to process it</h4>
            <ol>{formula.derivation.map((step) => <li key={step}><MathText>{step}</MathText></li>)}</ol>
          </section>
          <section>
            <h4>Common mistakes</h4>
            <ul>{formula.mistakes.map((item) => <li key={item}><MathText>{item}</MathText></li>)}</ul>
          </section>
        </div>
      )}
    </article>
  );
}
