import React from "react";
import { MathText } from "./Math.jsx";

export default function QuestionFeedback({ question, chosen }) {
  const explanations = question.optionExplanations;
  if (!explanations || explanations.length !== question.options.length) return <p><MathText>{question.explanation}</MathText></p>;
  const answered = Number.isInteger(chosen) && chosen >= 0 && chosen < question.options.length;
  return <div className="question-reasoning">
    {answered ? <p><strong>Your choice:</strong> <MathText>{explanations[chosen]}</MathText></p> : <p><MathText>{question.explanation}</MathText></p>}
    {answered && chosen !== question.answerIndex && <p><strong>Why the correct answer works:</strong> <MathText>{explanations[question.answerIndex]}</MathText></p>}
    <details className="choice-explanations"><summary>Why each choice is right or wrong</summary>
      <ul>{question.options.map((option, index) => <li key={option}>
        <strong>{String.fromCharCode(65 + index)}. <MathText>{option}</MathText> — {index === question.answerIndex ? "Correct" : "Incorrect"}</strong>
        <p><MathText>{explanations[index]}</MathText></p>
      </li>)}</ul>
    </details>
  </div>;
}
