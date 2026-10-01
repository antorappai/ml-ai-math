import React, { useId, useState } from "react";
import { studentMarks } from "../content/matrixAnatomyLesson.js";

const tasks = [{ row: 1, column: 0 }, { row: 0, column: 1 }, { row: 2, column: 1 }];

export default function MatrixCellExplorer() {
  const id = useId();
  const [taskIndex, setTaskIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const task = tasks[taskIndex];
  const correct = selected?.row === task.row && selected?.column === task.column;
  const targetName = `${studentMarks.students[task.row]}'s ${studentMarks.subjects[task.column]} mark`;
  const targetValue = studentMarks.values[task.row][task.column];
  const swapped = selected?.row === task.column && selected?.column === task.row;

  function reset(nextTask = taskIndex) {
    setTaskIndex(nextTask);
    setSelected(null);
    setSubmitted(false);
  }

  return <section className="matrix-cell-explorer" aria-labelledby={`${id}-title`}>
    <p className="section-label">Try reading the cell address</p>
    <h3 id={`${id}-title`}>Find the mark in the matrix</h3>
    <p>Select <strong>X<sub>{task.row + 1},{task.column + 1}</sub></strong>. Count rows first and columns second, starting at 1. Choose a cell, then check your answer.</p>
    <div className="matrix-table-scroll"><table>
      <caption>X: 3 student rows × 2 subject columns · 6 entries</caption>
      <thead><tr><th scope="col">Row / student</th>{studentMarks.subjects.map((subject, column) => <th scope="col" key={subject}>{column + 1} · {subject}</th>)}</tr></thead>
      <tbody>{studentMarks.values.map((values, row) => <tr key={studentMarks.students[row]} className={selected?.row === row ? "selected-row" : ""}>
        <th scope="row">{row + 1} · {studentMarks.students[row]}</th>
        {values.map((value, column) => {
          const isSelected = selected?.row === row && selected?.column === column;
          return <td key={column} className={selected?.column === column ? "selected-column" : ""}>
            <button type="button" disabled={submitted} className={`matrix-cell ${isSelected ? "selected" : ""}`} aria-label={`${studentMarks.students[row]}, ${studentMarks.subjects[column]}: ${value}`} aria-pressed={isSelected} onClick={() => setSelected({ row, column })}>{value}</button>
          </td>;
        })}
      </tr>)}</tbody>
    </table></div>
    {selected && !submitted && <p aria-live="polite">Selected row {selected.row + 1}, column {selected.column + 1}: {studentMarks.students[selected.row]}'s {studentMarks.subjects[selected.column]} mark.</p>}
    {!submitted && <button type="button" disabled={!selected} onClick={() => setSubmitted(true)}>Check selected cell</button>}
    {submitted && <div className={`gentle-feedback ${correct ? "correct" : "incorrect"}`} role="status" aria-label="Matrix cell feedback">
      <strong>{correct ? "That’s right." : "Check the row first, then the column."}</strong>
      <p>{correct ? `Row ${task.row + 1} is ${studentMarks.students[task.row]}, and column ${task.column + 1} is ${studentMarks.subjects[task.column]}. Their intersection gives ${targetValue}.`
        : swapped ? "You swapped the two indices. The first index selects a row; the second selects a column."
          : `You selected row ${selected.row + 1}, column ${selected.column + 1}. The requested address is row ${task.row + 1}, column ${task.column + 1}.`}</p>
      <p>The requested entry is {targetName}: <strong>{targetValue}</strong>. In a nested Python list, its address is <code>X[{task.row}][{task.column}]</code> because Python starts counting at zero.</p>
      <div className="button-row"><button type="button" className="button secondary" onClick={() => reset()}>Try this cell again</button><button type="button" onClick={() => reset((taskIndex + 1) % tasks.length)}>Try another cell</button></div>
    </div>}
  </section>;
}
