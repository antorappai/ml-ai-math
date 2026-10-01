import React, { useId, useState } from "react";
import { BlockMath } from "./Math.jsx";

const matrix = [[2, 1], [-1, 3]];

export default function RowDotPredictionLab() {
  const id = useId();
  const [vector, setVector] = useState([3, 4]);
  const [row, setRow] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const coefficients = matrix[row];
  const products = coefficients.map((coefficient, index) => coefficient * vector[index]);
  const result = products[0] + products[1];
  const numericAnswer = Number(answer);
  const validAnswer = answer.trim() !== "" && Number.isFinite(numericAnswer);
  const correct = validAnswer && numericAnswer === result;
  const feedback = correct ? "You paired both entries of this row with the matching input coordinates and added their contributions."
    : numericAnswer === products[0] ? "That is the first coordinate's contribution only. Include the second paired product before adding."
      : numericAnswer === products[1] ? "That is the second coordinate's contribution only. Include the first paired product too."
        : products.some((product) => product < 0) && numericAnswer === Math.abs(products[0]) + Math.abs(products[1]) ? "A negative contribution became positive in your total. Keep its sign when you add the paired products."
          : "Use the selected matrix row, multiply matching positions, then add the two products. The other row belongs to a different output.";

  function clearAttempt() {
    setAnswer("");
    setSubmitted(false);
  }

  function updateCoordinate(index, value) {
    setVector((current) => current.map((coordinate, position) => position === index ? Number(value) : coordinate));
    clearAttempt();
  }

  return <section className="row-dot-lab" aria-labelledby={`${id}-title`}>
    <p className="section-label">Predict one row before revealing its sum</p>
    <h3 id={`${id}-title`}>Build a row dot product</h3>
    <p>A is a 2 × 2 matrix. Choose an output row and change the two input coordinates. Calculate its output before checking. Each new row or input clears the previous attempt.</p>
    <div className="row-dot-choice" role="group" aria-label="Choose output row">{matrix.map((_, index) => <button key={index} type="button" aria-pressed={row === index} onClick={() => { setRow(index); clearAttempt(); }}>Output {index + 1} · row {index + 1}</button>)}</div>
    <div className="matrix-table-scroll"><table><caption>A: each row contains the coefficients for one output</caption><thead><tr><th scope="col">Output row</th><th scope="col">Coefficient of v₁</th><th scope="col">Coefficient of v₂</th></tr></thead>
      <tbody>{matrix.map((values, index) => <tr key={index} className={row === index ? "selected-row" : ""}><th scope="row">Output {index + 1}{row === index ? " · selected" : ""}</th>{values.map((value, column) => <td key={column}>{value < 0 ? `−${Math.abs(value)}` : value}</td>)}</tr>)}</tbody>
    </table></div>
    <div className="row-dot-controls">{vector.map((value, index) => <div key={index}><label htmlFor={`${id}-input-${index}`}>{index === 0 ? "First input coordinate" : "Second input coordinate"}<output>{value}</output></label><input id={`${id}-input-${index}`} type="range" min="-3" max="5" step="1" value={value} onChange={(event) => updateCoordinate(index, event.target.value)} /></div>)}</div>
    <p><strong>Input column:</strong> [{vector.join(", ")}] · <strong>Selected row:</strong> [{coefficients.join(", ")}]</p>
    <BlockMath>{`y_${row + 1}=(${coefficients[0]})\\times(${vector[0]})+(${coefficients[1]})\\times(${vector[1]})`}</BlockMath>
    <form onSubmit={(event) => { event.preventDefault(); if (validAnswer) setSubmitted(true); }}>
      <label htmlFor={`${id}-answer`}>Your predicted row output</label>
      <div className="prediction-answer-row"><input id={`${id}-answer`} type="number" step="any" value={answer} onChange={(event) => { setAnswer(event.target.value); setSubmitted(false); }} /><button type="submit" disabled={!validAnswer}>Check row output</button></div>
    </form>
    {submitted && <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-label="Row prediction feedback">
      <strong>{correct ? "That’s right." : "Let’s check the contributions."}</strong><p>{feedback}</p>
      <ol><li>First input: {coefficients[0]} × {vector[0]} = {products[0]}.</li><li>Second input: {coefficients[1]} × {vector[1]} = {products[1]}.</li><li>Add within row {row + 1}: {products[0]} + ({products[1]}) = <strong>{result}</strong>.</li></ol>
      <p>Holding the other input fixed, increasing v₁ by 1 changes this output by {coefficients[0]}; increasing v₂ by 1 changes it by {coefficients[1]}. Try that change to check the coefficient's effect.</p>
      <button type="button" className="button secondary" onClick={clearAttempt}>Try this row again</button>
    </div>}
  </section>;
}
