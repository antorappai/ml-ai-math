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
    <p className="eyebrow">Understand it before memorising it</p>
    <h4>{introduction.title}</h4>
    <p>{introduction.explanation}</p>
    <p><strong>Anchor example:</strong> <MathText>{introduction.example}</MathText></p>
    <div className="formula-preview-grid">
      <section>
        <h5>Symbol-by-symbol reminder</h5>
        <p>Read each symbol as a named quantity, not as a mysterious letter.</p>
        <dl>{formula.symbols.map(([symbol, meaning]) => <div key={`${formula.id}-preview-${symbol}`}><dt><InlineMath>{symbol}</InlineMath></dt><dd>{meaning}</dd></div>)}</dl>
      </section>
      <section>
        <h5>Conditions and sign clues</h5>
        <ul>{signNotes.map((note) => <li key={note}><MathText>{note}</MathText></li>)}</ul>
      </section>
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

      <section aria-label={`${formula.label} notation`}>
        <p className="eyebrow">Now read the notation</p>
        <BlockMath>{formula.latex}</BlockMath>
        <p className="read-aloud"><strong>Say it aloud:</strong> {formula.readAs}.</p>
        <p><strong>What the whole formula is doing:</strong> {formula.purpose}</p>
      </section>

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
            <h4>Put numbers into it</h4>
            <p><MathText>{formula.beginnerExample}</MathText></p>
            <p><strong>Reminder:</strong> go back to the symbol box and match each number or quantity in this example to its symbol before calculating.</p>
          </section>
          <section>
            <h4>Calculate it step by step</h4>
            <ol>{formula.derivation.map((step) => <li key={step}><MathText>{step}</MathText></li>)}</ol>
          </section>
          <section>
            <h4>Common trap</h4>
            <ul>{formula.mistakes.map((item) => <li key={item}><MathText>{item}</MathText></li>)}</ul>
          </section>
        </div>
      )}
    </article>
  );
}
