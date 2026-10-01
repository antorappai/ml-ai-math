import React, { useId, useState } from "react";
import { BlockMath } from "./Math.jsx";
import { determinantCases } from "../content/determinantLesson.js";

export default function DeterminantPredictionLab() {
  const id = useId();
  const [caseIndex, setCaseIndex] = useState(0);
  const [originalArea, setOriginalArea] = useState(3);
  const [signedAnswer, setSignedAnswer] = useState("");
  const [areaAnswer, setAreaAnswer] = useState("");
  const [meaning, setMeaning] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const example = determinantCases[caseIndex];
  const [[a, b], [c, d]] = example.matrix;
  const det = a * d - b * c;
  const expectedArea = Math.abs(det) * originalArea;
  const expectedMeaning = det === 0 ? "collapse" : det < 0 ? "reverse" : "preserve";
  const pointCollapse = a === 0 && b === 0 && c === 0 && d === 0;
  const valid = signedAnswer.trim() !== "" && areaAnswer.trim() !== "" && Number.isFinite(Number(signedAnswer)) && Number.isFinite(Number(areaAnswer)) && meaning !== "";
  const correct = Number(signedAnswer) === det && Number(areaAnswer) === expectedArea && meaning === expectedMeaning;
  const determinantFeedback = Number(signedAnswer) === det ? "Your signed determinant is correct."
    : det < 0 && Number(signedAnswer) === Math.abs(det) ? "You kept the magnitude but lost the negative sign. Keep the sign in the determinant; use the absolute value only for ordinary area."
      : "Calculate a × d, then subtract b × c. Do not add the two products or sum all four entries.";
  const areaFeedback = Number(areaAnswer) === expectedArea ? "Your ordinary area is correct."
    : Number(areaAnswer) < 0 ? "Ordinary area cannot be negative. Use the absolute determinant before multiplying the original area."
      : originalArea !== 1 && Number(areaAnswer) === Math.abs(det) ? "That is the area multiplier, or the image area of a unit square. Multiply it by this patch's original area too."
        : "Multiply the original area by the absolute determinant. The determinant alone describes a scale factor.";
  const meaningText = det === 0 ? `The image collapses to ${pointCollapse ? "a point at the origin" : "a line"}; there is no two-dimensional area or orientation left.`
    : det < 0 ? "The image reverses orientation and still spans area. A negative determinant does not mean collapse."
      : "The image preserves orientation and still spans area. Its shape and individual vector lengths may change.";
  const p = (x, y) => `${95 + x * 38},${310 - y * 38}`;

  function clearAttempt() { setSignedAnswer(""); setAreaAnswer(""); setMeaning(""); setSubmitted(false); }

  return <section className="determinant-prediction-lab" aria-labelledby={`${id}-title`}>
    <p className="section-label">Predict the signed scale and ordinary area</p>
    <h3 id={`${id}-title`}>What happens to this patch?</h3>
    <p>Choose a matrix, calculate its determinant, and predict the result for the patch. The diagram follows a unit square to show the two image directions. The numeric question uses the original patch area selected below.</p>
    <div className="row-dot-choice" role="group" aria-label="Choose a transformation">{determinantCases.map((item, index) => <button key={item.id} type="button" aria-pressed={caseIndex === index} onClick={() => { setCaseIndex(index); clearAttempt(); }}>{item.label}</button>)}</div>
    <div className="determinant-prediction-layout">
      <div><BlockMath>{`A=\\begin{bmatrix}${a}&${b}\\\\${c}&${d}\\end{bmatrix}`}</BlockMath><p><strong>First image direction:</strong> [{a}, {c}]<br /><strong>Second image direction:</strong> [{b}, {d}]</p>
        <label htmlFor={`${id}-original`}>Original patch area (square units)<output>{originalArea}</output></label><input id={`${id}-original`} type="range" min="1" max="6" step="1" value={originalArea} onChange={(event) => { setOriginalArea(Number(event.target.value)); clearAttempt(); }} />
      </div>
      <figure><svg viewBox="0 0 420 350" role="img" aria-label={`Unit square and its image under ${example.label.toLowerCase()}`}>
        <defs><marker id={`${id}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="currentColor" /></marker></defs>
        <line className="graph-axis" x1="35" y1="310" x2="395" y2="310" /><line className="graph-axis" x1="95" y1="325" x2="95" y2="35" />
        <polygon className="det-original" points={`${p(0, 0)} ${p(1, 0)} ${p(1, 1)} ${p(0, 1)}`} />
        <polygon className={`det-shape ${det === 0 ? "collapsed" : ""}`} points={`${p(0, 0)} ${p(a, c)} ${p(a + b, c + d)} ${p(b, d)}`} />
        <line className="direction-arrow solid" x1="95" y1="310" x2={95 + a * 38} y2={310 - c * 38} markerEnd={`url(#${id}-arrow)`} />
        <line className="gradient-arrow" x1="95" y1="310" x2={95 + b * 38} y2={310 - d * 38} markerEnd={`url(#${id}-arrow)`} />
        {pointCollapse && <circle className="selected-point" cx="95" cy="310" r="6" />}
        <text className="point-label" x="80" y="332">0</text>
        {!pointCollapse && <><text className="point-label" x={95 + a * 38 + 8} y={310 - c * 38 - 12}>[{a}, {c}]</text><text className="point-label" x={95 + b * 38 + 8} y={310 - d * 38 - 12}>[{b}, {d}]</text></>}
      </svg><figcaption>Dashed outline: original unit square. Solid shape: its image. Its sides are the matrix columns.</figcaption></figure>
    </div>
    <form onSubmit={(event) => { event.preventDefault(); if (valid) setSubmitted(true); }}>
      <div className="determinant-answer-fields"><div><label htmlFor={`${id}-det`}>Your signed determinant</label><input id={`${id}-det`} type="number" step="any" value={signedAnswer} onChange={(event) => { setSignedAnswer(event.target.value); setSubmitted(false); }} /></div>
        <div><label htmlFor={`${id}-area`}>Your transformed area (square units)</label><input id={`${id}-area`} type="number" step="any" value={areaAnswer} onChange={(event) => { setAreaAnswer(event.target.value); setSubmitted(false); }} /></div>
        <div><label htmlFor={`${id}-meaning`}>Geometric meaning</label><select id={`${id}-meaning`} value={meaning} onChange={(event) => { setMeaning(event.target.value); setSubmitted(false); }}><option value="">Choose a meaning</option><option value="preserve">Area remains; orientation is preserved</option><option value="reverse">Area remains; orientation is reversed</option><option value="collapse">Area collapses to zero</option></select></div>
      </div><button type="submit" disabled={!valid}>Check area prediction</button>
    </form>
    {submitted && <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-label="Determinant prediction feedback">
      <strong>{correct ? "That’s right." : "Separate the signed scale, area, and orientation."}</strong><p>{determinantFeedback}</p><p>{areaFeedback}</p>
      <ol><li>ad = {a} × {d} = {a * d}; bc = {b} × {c} = {b * c}.</li><li>det(A) = {a * d} − ({b * c}) = {det}.</li><li>New ordinary area = |{det}| × {originalArea} = <strong>{expectedArea} square units</strong>.</li></ol>
      <p>{meaning === expectedMeaning ? "Your geometric classification is correct. " : "Check the classification using the signed determinant. "}{meaningText}</p>
      <button type="button" className="button secondary" onClick={clearAttempt}>Try this prediction again</button>
    </div>}
  </section>;
}
