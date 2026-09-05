import { MathText } from "./Math.jsx";
import React, { useEffect, useState } from "react";
import { useMastery } from "../state/mastery.js";

export default function Assessment({ questions, testId, title = "Quick check", limit, timedMinutes = 0 }) {
  const selectedQuestions = limit ? questions.slice(0, limit) : questions;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(timedMinutes * 60);
  const { recordAnswer, recordScore } = useMastery();

  useEffect(() => {
    if (!timedMinutes || submitted) return undefined;
    const timer = window.setInterval(() => setSecondsLeft((value) => {
      if (value <= 1) {
        window.clearInterval(timer);
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [submitted, timedMinutes]);

  useEffect(() => {
    if (timedMinutes && secondsLeft === 0 && !submitted) submit();
  }, [secondsLeft, submitted, timedMinutes]);

  const score = selectedQuestions.reduce((total, question) => total + (answers[question.id] === question.answerIndex ? 1 : 0), 0);

  function submit() {
    setSubmitted(true);
    selectedQuestions.forEach((question) => recordAnswer(question, answers[question.id] === question.answerIndex));
    recordScore(testId, score, selectedQuestions.length);
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
    setSecondsLeft(timedMinutes * 60);
  }

  return (
    <section className="assessment-card">
      <div className="section-heading">
        <div><p className="eyebrow">Assessment</p><h2>{title}</h2></div>
        {timedMinutes > 0 && <strong className="timer">{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}</strong>}
      </div>
      {selectedQuestions.map((question, index) => {
        const chosen = answers[question.id];
        const correct = chosen === question.answerIndex;
        return (
          <article className="question-card" key={question.id}>
            <p><strong>{index + 1}.</strong> <MathText>{question.prompt}</MathText></p>
            <div className="option-grid">
              {question.options.map((option, optionIndex) => (
                <button
                  type="button"
                  className={`option ${submitted && optionIndex === question.answerIndex ? "correct" : ""} ${submitted && chosen === optionIndex && !correct ? "incorrect" : ""}`}
                  onClick={() => !submitted && setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                  aria-pressed={chosen === optionIndex}
                  key={option}
                >
                  <span>{String.fromCharCode(65 + optionIndex)}</span><MathText>{option}</MathText>
                </button>
              ))}
            </div>
            {submitted && <p className={correct ? "feedback correct-text" : "feedback incorrect-text"}><strong>{correct ? "Correct." : "Not yet."}</strong> <MathText>{question.explanation}</MathText></p>}
          </article>
        );
      })}
      {submitted ? (
        <div className="score-panel"><strong>{score}/{selectedQuestions.length}</strong><span>{Math.round((score / selectedQuestions.length) * 100)}% score</span><button type="button" className="button secondary" onClick={retry}>Try again</button></div>
      ) : (
        <button type="button" onClick={submit} disabled={!selectedQuestions.length}>Submit answers</button>
      )}
    </section>
  );
}
