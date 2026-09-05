import React, { useId, useState } from "react";
import { ExplorerShell, number, useMeasuredWidth } from "./BridgeExplorers.jsx";

function arrowMarker(id, className) {
  return <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className={className} /></marker>;
}

export function DeterminantExplorer() {
  const [rootRef, width] = useMeasuredWidth(), id = useId().replaceAll(":", "");
  const [a, setA] = useState(2), [b, setB] = useState(1), [c, setC] = useState(0), [d, setD] = useState(2);
  const det = a * d - b * c, height = 320, scale = Math.min((width - 80) / 10, 24), cx = width / 2, cy = height / 2;
  const p = (x, y) => `${cx + x * scale},${cy - y * scale}`;
  return <ExplorerShell label={id} title="Watch a matrix scale and collapse area" value={`det(A) = ${det}`} rootRef={rootRef} reading={<><p><strong>Area scale:</strong> a unit square becomes area {Math.abs(det)}.</p><p><strong>Meaning:</strong> {det === 0 ? "The shape collapses to a line, so information is lost." : det < 0 ? "Area is scaled and orientation flips." : "Area is scaled without an orientation flip."}</p></>}>
    <div className="matrix-control-grid">{[["a", a, setA], ["b", b, setB], ["c", c, setC], ["d", d, setD]].map(([label, value, setter]) => <label key={label}><span>{label} <strong>{value}</strong></span><input aria-label={`Matrix ${label}`} type="range" min="-2" max="2" step="1" value={value} onChange={(e) => setter(Number(e.target.value))} /></label>)}</div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Parallelogram with determinant ${det}`}><rect className="graph-frame" x="30" y="20" width={width - 60} height={height - 40} /><line className="graph-axis" x1="30" x2={width - 30} y1={cy} y2={cy} /><line className="graph-axis" x1={cx} x2={cx} y1="20" y2={height - 20} /><polygon className={`det-shape ${det === 0 ? "collapsed" : ""}`} points={`${p(0, 0)} ${p(a, c)} ${p(a + b, c + d)} ${p(b, d)}`} /><text className="point-label" x={cx} y="34" textAnchor="middle">columns of A form the sides</text></svg>
  </ExplorerShell>;
}

export function InverseSystemExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const [b1, setB1] = useState(4), [b2, setB2] = useState(2);
  const solution = [(b1 + b2) / 2, (b1 - b2) / 2], height = 310, left = 42, right = 20, top = 20, bottom = 38;
  const sx = (x) => left + ((x + 5) / 10) * (width - left - right), sy = (y) => top + ((5 - y) / 10) * (height - top - bottom);
  return <ExplorerShell label="inverse-system" title="Move the equations and recover their shared solution" value={`x = [${number(solution[0])}, ${number(solution[1])}]`} rootRef={rootRef} reading={<><p><strong>System:</strong> x + y = {b1} and x − y = {b2}.</p><p><strong>Inverse result:</strong> both equations agree at ({number(solution[0])}, {number(solution[1])}).</p></>}>
    <div className="slope-controls two-controls"><label><span>First output b₁ <strong>{b1}</strong></span><input aria-label="System output one" type="range" min="-4" max="4" step="1" value={b1} onChange={(e) => setB1(Number(e.target.value))} /></label><label><span>Second output b₂ <strong>{b2}</strong></span><input aria-label="System output two" type="range" min="-4" max="4" step="1" value={b2} onChange={(e) => setB2(Number(e.target.value))} /></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Two equations intersect at ${solution.join(", ")}`}><rect className="graph-frame" x={left} y={top} width={width - left - right} height={height - top - bottom} /><line className="graph-axis" x1={left} x2={width - right} y1={sy(0)} y2={sy(0)} /><line className="graph-axis" x1={sx(0)} x2={sx(0)} y1={top} y2={height - bottom} /><line className="curve-line thin" x1={sx(-5)} y1={sy(b1 + 5)} x2={sx(5)} y2={sy(b1 - 5)} /><line className="tangent-line solid" x1={sx(-5)} y1={sy(-5 - b2)} x2={sx(5)} y2={sy(5 - b2)} /><circle className="selected-point" cx={sx(solution[0])} cy={sy(solution[1])} r="7" /></svg>
  </ExplorerShell>;
}

export function BasisExplorer() {
  const [rootRef, width] = useMeasuredWidth(), id = useId().replaceAll(":", "");
  const [c1, setC1] = useState(2), [c2, setC2] = useState(1), [skew, setSkew] = useState(false);
  const b1 = [1, 0], b2 = skew ? [1, 1] : [0, 1], v = [c1 * b1[0] + c2 * b2[0], c1 * b1[1] + c2 * b2[1]];
  const height = 310, scale = 34, cx = width / 2, cy = height / 2, p = (q) => [cx + q[0] * scale, cy - q[1] * scale];
  return <ExplorerShell label={id} title="Change the measuring directions, not the vector recipe" value={`v = [${v.join(", ")}]`} rootRef={rootRef} reading={<><p><strong>Coordinates:</strong> [{c1}, {c2}] mean {c1} copies of b₁ plus {c2} copies of b₂.</p><p><strong>Ordinary vector:</strong> that recipe produces [{v.join(", ")}].</p></>}>
    <div className="explorer-choice"><button type="button" aria-pressed={!skew} onClick={() => setSkew(false)}>Standard basis</button><button type="button" aria-pressed={skew} onClick={() => setSkew(true)}>Skew basis</button></div><div className="slope-controls two-controls"><label><span>Coordinate c₁ <strong>{c1}</strong></span><input aria-label="Basis coordinate one" type="range" min="-3" max="3" step="1" value={c1} onChange={(e) => setC1(Number(e.target.value))} /></label><label><span>Coordinate c₂ <strong>{c2}</strong></span><input aria-label="Basis coordinate two" type="range" min="-3" max="3" step="1" value={c2} onChange={(e) => setC2(Number(e.target.value))} /></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Vector ${v.join(", ")} in the selected basis`}><defs>{arrowMarker(`${id}-b`, "direction-arrow-head")}{arrowMarker(`${id}-v`, "gradient-arrow-head")}</defs><rect className="graph-frame" x="30" y="20" width={width - 60} height={height - 40} /><line className="direction-arrow solid" x1={cx} y1={cy} x2={p(b1)[0]} y2={p(b1)[1]} markerEnd={`url(#${id}-b)`} /><line className="direction-arrow solid" x1={cx} y1={cy} x2={p(b2)[0]} y2={p(b2)[1]} markerEnd={`url(#${id}-b)`} /><line className="gradient-arrow" x1={cx} y1={cy} x2={p(v)[0]} y2={p(v)[1]} markerEnd={`url(#${id}-v)`} /><text className="point-label" x={p(v)[0]} y={p(v)[1] - 12}>v</text></svg>
  </ExplorerShell>;
}

export function EigenvectorExplorer() {
  const [rootRef, width] = useMeasuredWidth(), id = useId().replaceAll(":", "");
  const [angle, setAngle] = useState(45), radians = angle * Math.PI / 180, input = [2 * Math.cos(radians), 2 * Math.sin(radians)], output = [2 * input[0], 0.5 * input[1]];
  const aligned = angle % 90 === 0, height = 310, scale = 45, cx = width / 2, cy = height / 2, p = (q) => [cx + q[0] * scale, cy - q[1] * scale];
  return <ExplorerShell label={id} title="Rotate the vector and find directions that do not turn" value={aligned ? "eigenvector direction" : "direction changes"} rootRef={rootRef} reading={<><p><strong>Input:</strong> angle {angle}°. The matrix stretches x by 2 and shrinks y by 0.5.</p><p><strong>Result:</strong> {aligned ? "The output stays on the same line, so this is an eigenvector direction." : "The output turns away from the input, so this direction is not an eigenvector."}</p></>}>
    <div className="slope-controls one-control"><label><span>Input direction <strong>{angle}°</strong></span><input aria-label="Eigenvector angle" type="range" min="0" max="180" step="15" value={angle} onChange={(e) => setAngle(Number(e.target.value))} /><small>Try 0°, 90°, and angles between them</small></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={aligned ? "Eigenvector direction found" : "Vector direction changes"}><defs>{arrowMarker(`${id}-in`, "direction-arrow-head")}{arrowMarker(`${id}-out`, "gradient-arrow-head")}</defs><rect className="graph-frame" x="30" y="20" width={width - 60} height={height - 40} /><line className="graph-axis" x1="30" x2={width - 30} y1={cy} y2={cy} /><line className="graph-axis" x1={cx} x2={cx} y1="20" y2={height - 20} /><line className="direction-arrow solid" x1={cx} y1={cy} x2={p(input)[0]} y2={p(input)[1]} markerEnd={`url(#${id}-in)`} /><line className="gradient-arrow" x1={cx} y1={cy} x2={p(output)[0]} y2={p(output)[1]} markerEnd={`url(#${id}-out)`} /></svg>
  </ExplorerShell>;
}

const PCA_POINTS = [[-3,-2.4],[-2.5,-2.1],[-2,-1.2],[-1.3,-1.4],[-.8,-.3],[0,.2],[.6,.4],[1.1,1.4],[1.8,1.3],[2.4,2.3],[3,2.5]];
export function PcaExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const [angle, setAngle] = useState(45), radians = angle * Math.PI / 180, u = [Math.cos(radians), Math.sin(radians)];
  const projections = PCA_POINTS.map(([x,y]) => x*u[0]+y*u[1]), mean = projections.reduce((a,b)=>a+b,0)/projections.length, variance = projections.reduce((sum,v)=>sum+(v-mean)**2,0)/projections.length;
  const height = 320, scale = Math.min((width - 80) / 9, 38), cx = width / 2, cy = height / 2, p = (x,y) => [cx+x*scale,cy-y*scale];
  return <ExplorerShell label="pca" title="Rotate one line and preserve as much spread as possible" value={`kept variance = ${number(variance)}`} rootRef={rootRef} reading={<><p><strong>Projection:</strong> every point is summarized by its position along the line.</p><p><strong>PCA goal:</strong> rotate toward the largest kept variance. This cloud is strongest near 45°.</p></>}>
    <div className="slope-controls one-control"><label><span>Projection direction <strong>{angle}°</strong></span><input aria-label="PCA direction" type="range" min="0" max="180" step="5" value={angle} onChange={(e)=>setAngle(Number(e.target.value))} /><small>Compare 0°, 45°, and 90°</small></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`PCA direction ${angle} degrees keeps variance ${number(variance)}`}><rect className="graph-frame" x="30" y="20" width={width-60} height={height-40} /><line className="pca-axis" x1={p(-4*u[0],-4*u[1])[0]} y1={p(-4*u[0],-4*u[1])[1]} x2={p(4*u[0],4*u[1])[0]} y2={p(4*u[0],4*u[1])[1]} />{PCA_POINTS.map(([x,y],i)=><circle className="data-point" cx={p(x,y)[0]} cy={p(x,y)[1]} r="5" key={i} />)}</svg>
  </ExplorerShell>;
}
