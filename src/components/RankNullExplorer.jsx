import React, { useId, useState } from "react";
import { ExplorerShell, useMeasuredWidth } from "./BridgeExplorers.jsx";

const cases = [
  { label: "Dependent columns", matrix: [[1, 2], [2, 4]], rank: 1 },
  { label: "Independent columns", matrix: [[1, 0], [0, 1]], rank: 2 },
  { label: "Zero map", matrix: [[0, 0], [0, 0]], rank: 0 },
];
export default function RankNullExplorer() {
  const id = useId();
  const [rootRef] = useMeasuredWidth();
  const [caseIndex, setCaseIndex] = useState(0);
  const [t, setT] = useState(0);
  const current = cases[caseIndex];
  const input = [3 + 2 * t, 1 - t];
  const output = current.matrix.map((row) => row[0] * input[0] + row[1] * input[1]);
  const baseOutput = current.matrix.map((row) => row[0] * 3 + row[1]);
  const lost = current.matrix.every((row) => 2 * row[0] - row[1] === 0);
  const p = (point, origin) => [origin + point[0] * 10, 200 - point[1] * 10];
  return <ExplorerShell label={id} title="Move an input along a possible null direction" rootRef={rootRef} value={`rank ${current.rank} · nullity ${2 - current.rank}`} reading={<>
    <p><strong>Matrix:</strong> [{current.matrix[0].join(", ")}] / [{current.matrix[1].join(", ")}].</p>
    <p><strong>Input:</strong> [3, 1] + {t}[2, −1] = [{input.join(", ")}]. <strong>Output:</strong> [{output.join(", ")}].</p>
    <p>{lost ? current.rank === 0 ? "This map loses both independent input directions. Every output is zero, including along the selected direction." : "[2, −1] is a null direction. The input changes while its output stays [5, 10]; the map retains one output direction."
      : "The identity loses no input directions. Moving along [2, −1] changes the output by the same amount."}</p>
  </>}>
    <div className="row-dot-choice" role="group" aria-label="Choose a rank example">{cases.map((item, index) => <button type="button" key={item.label} aria-pressed={caseIndex === index} onClick={() => setCaseIndex(index)}>{item.label}</button>)}</div>
    <div className="slope-controls one-control"><label htmlFor={`${id}-t`}><span>Input displacement t <strong>{t}</strong></span><input id={`${id}-t`} type="range" min="-3" max="3" step="1" value={t} onChange={(event) => setT(Number(event.target.value))} /><small>Compare t = 0 with a nonzero displacement; the dashed arrows show the base input and output.</small></label></div>
    <svg viewBox="0 0 640 300" role="img" aria-label={`Input ${input.join(", ")} maps to output ${output.join(", ")}`}>
      {[160, 470].map((origin) => <g key={origin}><line className="graph-axis" x1={origin - 110} x2={origin + 130} y1="200" y2="200" /><line className="graph-axis" x1={origin} x2={origin} y1="50" y2="255" /></g>)}
      <text className="point-label" x="160" y="35" textAnchor="middle">Input plane</text><text className="point-label" x="470" y="35" textAnchor="middle">Output plane</text>
      <line className="direction-arrow" x1="160" y1="200" x2={p([3, 1], 160)[0]} y2={p([3, 1], 160)[1]} />
      <line className="gradient-arrow" x1="160" y1="200" x2={p(input, 160)[0]} y2={p(input, 160)[1]} /><circle className="selected-point" cx={p(input, 160)[0]} cy={p(input, 160)[1]} r="5" />
      <line className="direction-arrow" x1="470" y1="200" x2={p(baseOutput, 470)[0]} y2={p(baseOutput, 470)[1]} />
      <line className="gradient-arrow" x1="470" y1="200" x2={p(output, 470)[0]} y2={p(output, 470)[1]} /><circle className="selected-point" cx={p(output, 470)[0]} cy={p(output, 470)[1]} r="5" />
    </svg>
  </ExplorerShell>;
}
