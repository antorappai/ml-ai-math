import React, { useId, useState } from "react";
import { MathText } from "./Math.jsx";
import DotProductExplorer from "./DotProductExplorer.jsx";
import DeliveryPredictionLab from "./DeliveryPredictionLab.jsx";
import MatrixCellExplorer from "./MatrixCellExplorer.jsx";
import RowDotPredictionLab from "./RowDotPredictionLab.jsx";
import MatrixProductCellLab from "./MatrixProductCellLab.jsx";
import { TransposeAddressLab, SymmetryPairLab } from "./TransposeExplorers.jsx";
import DeterminantPredictionLab from "./DeterminantPredictionLab.jsx";
import RankNullExplorer from "./RankNullExplorer.jsx";

function WrittenExercise({ exercise }) {
  const inputId = useId();
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  return <article className="written-exercise">
    <h3>{exercise.title}</h3>
    <p><MathText>{exercise.prompt}</MathText></p>
    <label htmlFor={inputId}>Your working and explanation</label>
    <textarea id={inputId} value={answer} onChange={(event) => setAnswer(event.target.value)} rows={4} placeholder="Try it here or on paper before revealing the solution." />
    <details className="exercise-hint"><summary>Show a hint</summary><p><MathText>{exercise.hint}</MathText></p></details>
    <button type="button" className="button secondary" aria-expanded={revealed} aria-controls={`${inputId}-solution`} onClick={() => setRevealed((value) => !value)}>{revealed ? "Hide worked answer" : "Reveal worked answer and marking guide"}</button>
    {revealed && <div id={`${inputId}-solution`} className="written-solution">
      <ol>{exercise.steps.map((step) => <li key={step}><MathText>{step}</MathText></li>)}</ol>
      <p><strong>Answer:</strong> <MathText>{exercise.answer}</MathText></p>
      <p><strong>Mark your work</strong></p>
      <ul>{exercise.marking.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul>
      <p><strong>Watch for:</strong> <MathText>{exercise.commonTrap}</MathText></p>
    </div>}
  </article>;
}

export default function LessonReading({ step }) {
  return <>
    {step.activity === "delivery-prediction" && <DeliveryPredictionLab />}
    {step.activity === "matrix-cell" && <MatrixCellExplorer />}
    {step.activity === "row-dot-prediction" && <RowDotPredictionLab />}
    {step.activity === "matrix-product-cell" && <MatrixProductCellLab />}
    {step.activity === "transpose-address" && <TransposeAddressLab />}
    {step.activity === "symmetry-pairs" && <SymmetryPairLab />}
    {step.activity === "determinant-prediction" && <DeterminantPredictionLab />}
    {step.activity === "rank-null-explorer" && <RankNullExplorer />}
    {(step.reading || []).map((section) => section.optional
      ? <details className="deeper-detail authored-reading" key={section.title}><summary>{section.title}</summary><div>{section.paragraphs.map((paragraph) => <p key={paragraph}><MathText>{paragraph}</MathText></p>)}</div></details>
      : <section className="authored-reading" key={section.title}><h3>{section.title}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}><MathText>{paragraph}</MathText></p>)}{section.visual === "dot-product" && <DotProductExplorer />}</section>)}
    {step.exercises?.length > 0 && <div className="written-exercises">{step.exercises.map((exercise) => <WrittenExercise key={exercise.id} exercise={exercise} />)}<p className="quiet-note">Written responses stay here while this lesson is open. Copy any notes you want to keep before leaving or reloading.</p></div>}
  </>;
}
