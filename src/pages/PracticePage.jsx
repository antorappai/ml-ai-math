import React, { useState } from "react";
import Assessment from "../components/Assessment.jsx";
import { getLessonQuestions, lessons } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

export default function PracticePage() {
  const [mode, setMode] = useState("mixed");
  const [timed, setTimed] = useState(false);
  const { mastery, weakSkills } = useMastery();
  const allQuestions = lessons.flatMap((lesson) => getLessonQuestions(lesson).map((question) => ({ ...question, lessonId: lesson.id })));
  const weakIds = new Set(Object.keys(mastery.incorrectAttempts));
  const weakQuestionSet = allQuestions.filter((question) => weakIds.has(question.id) || weakSkills.slice(0, 3).some((item) => item.skill === question.skill));
  const questions = mode === "weak" && weakQuestionSet.length ? weakQuestionSet : allQuestions;
  const limit = mode === "drill" ? 10 : mode === "weak" ? Math.min(15, questions.length) : 30;

  return <div className="page practice-page"><header className="page-title"><p className="eyebrow">Assessment centre</p><h1>Practice what exams actually test</h1><p>Notation reading, conceptual interpretation, calculations, code reasoning, and model decisions. Wrong answers feed your weak-area revision set.</p></header><div className="practice-controls"><div>{[["mixed", "30-question mock"], ["drill", "10-question drill"], ["weak", "Weak-area revision"]].map(([value, label]) => <button type="button" className={mode === value ? "active" : ""} onClick={() => setMode(value)} key={value}>{label}</button>)}</div><label><input type="checkbox" checked={timed} onChange={(event) => setTimed(event.target.checked)} /> Timed mode</label></div>{mode === "weak" && !weakQuestionSet.length && <aside className="info-strip">No weak areas recorded yet, so this set currently uses mixed questions. Incorrect attempts will automatically shape it.</aside>}<Assessment key={`${mode}-${timed}`} questions={questions} limit={limit} timedMinutes={timed ? (mode === "mixed" ? 45 : 20) : 0} testId={`practice-${mode}-${timed ? "timed" : "untimed"}`} title={mode === "mixed" ? "Mixed master's-prep mock" : mode === "drill" ? "Focused study drill" : "Personal weak-area set"} /></div>;
}

