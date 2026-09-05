import { MathText } from "./Math.jsx";
import React, { useState } from "react";
import { useMastery } from "../state/mastery.js";

export default function GuidedCheck({ question, compact = false }) {
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { recordGuidedCheck } = useMastery();
  if (!question) return null;
  const correct = answer === question.answerIndex;

  function checkAnswer() {
    if (answer === null) return;
    setSubmitted(true);
    recordGuidedCheck(question, correct);
  }

  function tryAgain() {
    setAnswer(null);
    setSubmitted(false);
  }

  return (
    <section className={`guided-check ${compact ? "compact" : ""}`} aria-labelledby={`check-${question.id}`}>
      <p className="section-label">Your turn</p>
      <h3 id={`check-${question.id}`}><MathText>{question.prompt}</MathText></h3>
      <div className="guided-options">
        {question.options.map((option, index) => (
          <button
            type="button"
            className={`${answer === index ? "selected" : ""} ${submitted && index === question.answerIndex ? "correct" : ""} ${submitted && answer === index && !correct ? "incorrect" : ""}`}
            onClick={() => !submitted && setAnswer(index)}
            aria-pressed={answer === index}
            key={option}
          >
            <span>{String.fromCharCode(65 + index)}</span><MathText>{option}</MathText>
          </button>
        ))}
      </div>
      {!submitted && <button type="button" className="check-button" onClick={checkAnswer} disabled={answer === null}>Check my answer</button>}
      {submitted && (
        <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status">
          <strong>{correct ? "That’s right." : "Not yet—and that is useful feedback."}</strong>
          <p><MathText>{question.explanation}</MathText></p>
          {!correct && <button type="button" className="text-button" onClick={tryAgain}>Try again</button>}
        </div>
      )}
    </section>
  );
}
