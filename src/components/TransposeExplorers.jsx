import React, { useId, useState } from "react";
import { studentMarks } from "../content/matrixAnatomyLesson.js";

const tasks = [[1, 0], [2, 1], [0, 1]];

export function TransposeAddressLab() {
  const id = useId();
  const [taskIndex, setTaskIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState(false);
  const [row, column] = tasks[taskIndex];
  const { values, students, subjects } = studentMarks;
  const targetValue = values[row][column];
  const correct = selected?.[0] === column && selected?.[1] === row;
  const originalAddress = selected?.[0] === row && selected?.[1] === column;

  function reset(nextTask = taskIndex) {
    setTaskIndex(nextTask); setSelected(null); setSubmitted(false); setRestored(false);
  }

  return <section className="transpose-lab" aria-labelledby={`${id}-title`}>
    <p className="section-label">Move an entry while keeping its meaning</p>
    <h3 id={`${id}-title`}>Find the mark after transposing</h3>
    <p>Where does X<sub>{row + 1},{column + 1}</sub> move in Xᵀ? It is {students[row]}'s {subjects[column]} mark, {targetValue}. Select its new address in the second table before checking. Mathematical indices start at 1.</p>
    <div className="transpose-tables">
      <div className="matrix-table-scroll"><table><caption>X · 3 student rows × 2 subject columns</caption>
        <thead><tr><th scope="col">Student / subject</th>{subjects.map((subject, j) => <th scope="col" key={subject}>{j + 1} · {subject}</th>)}</tr></thead>
        <tbody>{values.map((entries, i) => <tr key={i}><th scope="row">{i + 1} · {students[i]}</th>{entries.map((value, j) => <td key={j} className={i === row && j === column ? "transpose-highlight" : ""}>{value}{i === row && j === column && <span className="transpose-target"> · target</span>}</td>)}</tr>)}</tbody>
      </table></div>
      <div className="matrix-table-scroll"><table><caption>Xᵀ · 2 subject rows × 3 student columns</caption>
        <thead><tr><th scope="col">Subject / student</th>{students.map((student, j) => <th scope="col" key={student}>{j + 1} · {student}</th>)}</tr></thead>
        <tbody>{subjects.map((subject, i) => <tr key={subject}><th scope="row">{i + 1} · {subject}</th>{students.map((_, j) => <td key={j}><button type="button" disabled={submitted} className={`matrix-cell ${selected?.[0] === i && selected?.[1] === j ? "selected" : ""}`} aria-pressed={selected?.[0] === i && selected?.[1] === j} aria-label={`Transpose row ${i + 1}, column ${j + 1}: ${subject}, ${students[j]}`} onClick={() => setSelected([i, j])}>{submitted && i === column && j === row ? targetValue : "?"}</button></td>)}</tr>)}</tbody>
      </table></div>
    </div>
    {selected && !submitted && <p aria-live="polite">Selected new address: row {selected[0] + 1}, column {selected[1] + 1}.</p>}
    {!submitted && <button type="button" disabled={!selected} onClick={() => setSubmitted(true)}>Check transposed address</button>}
    {submitted && <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-label="Transpose address feedback">
      <strong>{correct ? "That’s right." : "Follow both labels to their new axes."}</strong>
      <p>{correct ? "You exchanged the row and column positions while keeping the same mark."
        : originalAddress ? "You kept the original address. The original row becomes a column, and the original column becomes a row."
          : `That cell describes ${students[selected[1]]}'s ${subjects[selected[0]]} mark. Follow ${students[row]} and ${subjects[column]} to their intersection instead.`}</p>
      <p>X<sub>{row + 1},{column + 1}</sub> = {targetValue} moves to (Xᵀ)<sub>{column + 1},{row + 1}</sub> = {targetValue}. {subjects[column]} is now row {column + 1}; {students[row]} is now column {row + 1}.</p>
      <div className="button-row"><button type="button" className="button secondary" onClick={() => reset()}>Try this address again</button><button type="button" onClick={() => reset((taskIndex + 1) % tasks.length)}>Try another entry</button></div>
    </div>}
    <button type="button" className="button secondary transpose-again" aria-expanded={restored} aria-controls={`${id}-restored`} onClick={() => setRestored((value) => !value)}>{restored ? "Hide restored layout" : "Transpose again"}</button>
    {restored && <div id={`${id}-restored`}>
      <p>The subject rows become subject columns again. The student columns become student rows. (Xᵀ)ᵀ = X: every entry returns to its original address.</p>
      <div className="matrix-table-scroll"><table><caption>Restored X · 3 student rows × 2 subject columns</caption><thead><tr><th scope="col">Student</th>{subjects.map((subject) => <th scope="col" key={subject}>{subject}</th>)}</tr></thead><tbody>{values.map((entries, i) => <tr key={i}><th scope="row">{students[i]}</th>{entries.map((value, j) => <td key={j}>{value}</td>)}</tr>)}</tbody></table></div>
    </div>}
  </section>;
}

export function SymmetryPairLab() {
  const id = useId();
  const [upper, setUpper] = useState(4);
  const [lower, setLower] = useState(4);
  const [diagonal, setDiagonal] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const symmetric = upper === lower;
  const correct = answer === symmetric;
  const matrix = [[1, upper, 2], [lower, diagonal, 3], [2, 3, 5]];
  const transpose = matrix[0].map((_, j) => matrix.map((row) => row[j]));
  const controls = [{ name: "S₁₂: row 1, column 2", value: upper, update: setUpper }, { name: "S₂₁: row 2, column 1", value: lower, update: setLower }, { name: "S₂₂: diagonal entry", value: diagonal, update: setDiagonal }];
  function clearAttempt() { setAnswer(null); setSubmitted(false); }

  return <section className="symmetry-lab" aria-labelledby={`${id}-title`}>
    <p className="section-label">Change an entry, then test the whole matrix</p>
    <h3 id={`${id}-title`}>Does every mirrored pair agree?</h3>
    <p>Compare S with Sᵀ. Change one of the mirrored entries independently, or change the diagonal. Decide whether the matrix is symmetric before checking. Changing a value clears your previous answer.</p>
    <div className="transpose-tables">{[{ name: "S", values: matrix }, { name: "Sᵀ", values: transpose }].map((table) => <div className="matrix-table-scroll" key={table.name}><table><caption>{table.name} · 3 × 3</caption><thead><tr><th scope="col">Row / column</th>{[1, 2, 3].map((j) => <th scope="col" key={j}>{j}</th>)}</tr></thead><tbody>{table.values.map((row, i) => <tr key={i}><th scope="row">{i + 1}</th>{row.map((value, j) => <td key={j} className={(i === 0 && j === 1) || (i === 1 && j === 0) ? "transpose-highlight" : ""}>{value}</td>)}</tr>)}</tbody></table></div>)}</div>
    <div className="symmetry-controls">{controls.map((control, index) => <div key={control.name}><label htmlFor={`${id}-entry-${index}`}>{control.name}<output>{control.value}</output></label><input id={`${id}-entry-${index}`} type="range" min="-2" max="6" step="1" value={control.value} onChange={(event) => { control.update(Number(event.target.value)); clearAttempt(); }} /></div>)}</div>
    <div className="row-dot-choice" role="group" aria-label="Is S symmetric?">{[{ label: "Yes, S is symmetric", value: true }, { label: "No, S is not symmetric", value: false }].map((choice) => <button type="button" key={choice.label} aria-pressed={answer === choice.value} onClick={() => { setAnswer(choice.value); setSubmitted(false); }}>{choice.label}</button>)}</div>
    <button type="button" className="symmetry-check" disabled={answer === null} onClick={() => setSubmitted(true)}>Check symmetry</button>
    {submitted && <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-label="Symmetry feedback">
      <strong>{correct ? "That’s right." : "Check all three off-diagonal pairs."}</strong>
      <p>{symmetric ? "Every mirrored pair agrees, so S = Sᵀ. The diagonal values stay at their own addresses and need not be equal to each other."
        : "The highlighted mirrored pair differs, so S and Sᵀ differ at those addresses. Being square and having other matching pairs is not enough."}</p>
      <ul><li>S₁₂ = {upper} and S₂₁ = {lower}: {symmetric ? "equal" : "unequal"}.</li><li>S₁₃ = S₃₁ = 2.</li><li>S₂₃ = S₃₂ = 3.</li></ul>
      <p>S₂₂ = {diagonal} stays in place under the exchange. Changing it alone does not break symmetry.</p>
    </div>}
    <button type="button" className="button secondary symmetry-repair" onClick={() => { setLower(upper); clearAttempt(); }}>Match the mirrored entry</button>
    <p>The repair button copies S₁₂ into S₂₁. Then check symmetry again and explain why this single change works for this matrix.</p>
  </section>;
}
