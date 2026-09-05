import React, { useEffect, useId, useRef, useState } from "react";

export function useMeasuredWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(300, Math.round(entry.contentRect.width))));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

export function number(value) {
  const clean = Math.abs(value) < 0.005 ? 0 : value;
  return Number.isInteger(clean) ? String(clean) : clean.toFixed(2).replace(/0$/, "");
}

export function ExplorerShell({ label, title, value, rootRef, children, reading }) {
  return <section className="slope-explorer bridge-explorer" ref={rootRef} aria-labelledby={`${label}-heading`}>
    <header><div><p className="section-label">Interactive graph</p><h3 id={`${label}-heading`}>{title}</h3></div><strong className="live-equation" aria-live="polite">{value}</strong></header>
    {children}
    <div className="slope-reading" aria-live="polite">{reading}</div>
  </section>;
}

export function UnitVectorExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const id = useId().replaceAll(":", "");
  const [x, setX] = useState(3);
  const [y, setY] = useState(4);
  const magnitude = Math.hypot(x, y);
  const unit = magnitude ? [x / magnitude, y / magnitude] : [0, 0];
  const height = 330, pad = 42, domain = 5;
  const sx = (v) => width / 2 + v * ((width - pad * 2) / (domain * 2));
  const sy = (v) => height / 2 - v * ((height - pad * 2) / (domain * 2));
  return <ExplorerShell label={id} title="Keep the direction, remove the distance" value={`‖v‖ = ${number(magnitude)}`} rootRef={rootRef}
    reading={<><p><strong>Original:</strong> v = [{x}, {y}] has length {number(magnitude)}.</p><p><strong>Normalized:</strong> u = [{number(unit[0])}, {number(unit[1])}] has the same direction and length 1.</p></>}>
    <div className="slope-controls two-controls">
      <label><span>Horizontal x <strong>{x}</strong></span><input aria-label="Vector x" type="range" min="-4" max="4" step="1" value={x} onChange={(e) => setX(Number(e.target.value))} /><small>Moves the arrow left or right</small></label>
      <label><span>Vertical y <strong>{y}</strong></span><input aria-label="Vector y" type="range" min="-4" max="4" step="1" value={y} onChange={(e) => setY(Number(e.target.value))} /><small>Moves the arrow down or up</small></label>
    </div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Vector ${x}, ${y} and its unit vector`}>
      <defs><marker id={`${id}-long`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="gradient-arrow-head" /></marker><marker id={`${id}-unit`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="direction-arrow-head" /></marker></defs>
      <rect className="graph-frame" x={pad} y={pad / 2} width={width - pad * 2} height={height - pad} />
      <line className="graph-axis" x1={pad} x2={width - pad} y1={sy(0)} y2={sy(0)} /><line className="graph-axis" x1={sx(0)} x2={sx(0)} y1={pad / 2} y2={height - pad / 2} />
      {magnitude > 0 && <><line className="gradient-arrow" x1={sx(0)} y1={sy(0)} x2={sx(x)} y2={sy(y)} markerEnd={`url(#${id}-long)`} /><line className="direction-arrow solid" x1={sx(0)} y1={sy(0)} x2={sx(unit[0])} y2={sy(unit[1])} markerEnd={`url(#${id}-unit)`} /></>}
      <text className="point-label" x={sx(x)} y={sy(y) - 12} textAnchor="middle">v</text><text className="point-label warm" x={sx(unit[0]) + 12} y={sy(unit[1]) + 16}>u</text>
    </svg>
  </ExplorerShell>;
}

export function MatrixVectorExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const id = useId().replaceAll(":", "");
  const [x, setX] = useState(2), [y, setY] = useState(1), [mode, setMode] = useState("stretch");
  const matrices = { stretch: [[2, 0], [0, 1]], swap: [[0, 1], [1, 0]], shear: [[1, 1], [0, 1]] };
  const A = matrices[mode], out = [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y];
  const height = 330, pad = 42, domain = 5, sx = (v) => width / 2 + v * ((width - pad * 2) / 10), sy = (v) => height / 2 - v * ((height - pad * 2) / 10);
  return <ExplorerShell label={id} title="Send a vector through a matrix" value={`Av = [${out.join(", ")}]`} rootRef={rootRef}
    reading={<><p><strong>Input:</strong> v = [{x}, {y}]. Each row of A asks one weighted question.</p><p><strong>Output:</strong> [{out.join(", ")}]. The green arrow shows where the rule sends v.</p></>}>
    <div className="explorer-choice" aria-label="Transformation"><button type="button" aria-pressed={mode === "stretch"} onClick={() => setMode("stretch")}>Stretch x</button><button type="button" aria-pressed={mode === "swap"} onClick={() => setMode("swap")}>Swap x and y</button><button type="button" aria-pressed={mode === "shear"} onClick={() => setMode("shear")}>Add y into x</button></div>
    <div className="slope-controls two-controls"><label><span>Input x <strong>{x}</strong></span><input aria-label="Matrix input x" type="range" min="-2" max="2" step="1" value={x} onChange={(e) => setX(Number(e.target.value))} /></label><label><span>Input y <strong>{y}</strong></span><input aria-label="Matrix input y" type="range" min="-2" max="2" step="1" value={y} onChange={(e) => setY(Number(e.target.value))} /></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Input vector ${x}, ${y} transforms to ${out[0]}, ${out[1]}`}>
      <defs><marker id={`${id}-in`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="direction-arrow-head" /></marker><marker id={`${id}-out`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="gradient-arrow-head" /></marker></defs>
      <rect className="graph-frame" x={pad} y={pad / 2} width={width - pad * 2} height={height - pad} /><line className="graph-axis" x1={pad} x2={width - pad} y1={sy(0)} y2={sy(0)} /><line className="graph-axis" x1={sx(0)} x2={sx(0)} y1={pad / 2} y2={height - pad / 2} />
      <line className="direction-arrow solid" x1={sx(0)} y1={sy(0)} x2={sx(x)} y2={sy(y)} markerEnd={`url(#${id}-in)`} /><line className="gradient-arrow" x1={sx(0)} y1={sy(0)} x2={sx(out[0])} y2={sy(out[1])} markerEnd={`url(#${id}-out)`} />
      <text className="point-label warm" x={sx(x)} y={sy(y) - 12} textAnchor="middle">input v</text><text className="point-label" x={sx(out[0])} y={sy(out[1]) + 18} textAnchor="middle">output Av</text>
    </svg>
  </ExplorerShell>;
}

export function TangentExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const id = useId().replaceAll(":", "");
  const [a, setA] = useState(1.5);
  const height = 330, left = 45, right = 18, top = 18, bottom = 42;
  const sx = (x) => left + ((x + 3) / 6) * (width - left - right), sy = (y) => top + ((9 - y) / 10) * (height - top - bottom);
  const points = Array.from({ length: 61 }, (_, i) => -3 + i / 10), path = points.map((x, i) => `${i ? "L" : "M"}${sx(x)} ${sy(x * x)}`).join(" ");
  const slope = 2 * a, tangent = (x) => a * a + slope * (x - a);
  return <ExplorerShell label="tangent" title="Move the tangent along the curve" value={`slope = ${number(slope)}`} rootRef={rootRef}
    reading={<><p><strong>At x = {number(a)}:</strong> the curve is at y = {number(a * a)}.</p><p><strong>Tangent:</strong> its slope is {number(slope)}. At x = 0, the tangent is flat—a stationary point.</p></>}>
    <div className="slope-controls one-control"><label><span>Point on curve x <strong>{number(a)}</strong></span><input aria-label="Tangent point x" type="range" min="-2.5" max="2.5" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} /><small>Move to zero to find the minimum</small></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Curve y equals x squared with tangent slope ${number(slope)}`}><defs><clipPath id={`${id}-clip`}><rect x={left} y={top} width={width - left - right} height={height - top - bottom} /></clipPath></defs><rect className="graph-frame" x={left} y={top} width={width - left - right} height={height - top - bottom} /><line className="graph-axis" x1={left} x2={width - right} y1={sy(0)} y2={sy(0)} /><line className="graph-axis" x1={sx(0)} x2={sx(0)} y1={top} y2={height - bottom} /><g clipPath={`url(#${id}-clip)`}><path className="curve-line" d={path} /><line className="tangent-line" x1={sx(-3)} y1={sy(tangent(-3))} x2={sx(3)} y2={sy(tangent(3))} /><circle className="selected-point" cx={sx(a)} cy={sy(a * a)} r="7" /></g><text className="graph-axis-title" x={width - right} y={height - 12} textAnchor="end">input x</text><text className="graph-axis-title" x={left} y={13}>output y</text></svg>
  </ExplorerShell>;
}

export function LossExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const [target, setTarget] = useState(5), [prediction, setPrediction] = useState(3);
  const residual = target - prediction, loss = residual * residual, height = 260, left = 44, right = 18, top = 18, bottom = 42;
  const sx = (v) => left + (v / 10) * (width - left - right), sy = (v) => top + ((25 - v) / 25) * (height - top - bottom);
  const curve = Array.from({ length: 101 }, (_, i) => i / 10).map((p, i) => `${i ? "L" : "M"}${sx(p)} ${sy(Math.min(25, (target - p) ** 2))}`).join(" ");
  return <ExplorerShell label="loss" title="Move the prediction and watch the penalty" value={`loss = ${number(loss)}`} rootRef={rootRef}
    reading={<><p><strong>Miss:</strong> target {target} − prediction {prediction} = {residual}.</p><p><strong>Squared loss:</strong> {number(residual)}² = {number(loss)}. Farther predictions rise faster.</p></>}>
    <div className="slope-controls two-controls"><label><span>Target y <strong>{target}</strong></span><input aria-label="Loss target" type="range" min="1" max="9" step="1" value={target} onChange={(e) => setTarget(Number(e.target.value))} /></label><label><span>Prediction ŷ <strong>{prediction}</strong></span><input aria-label="Loss prediction" type="range" min="0" max="10" step="0.5" value={prediction} onChange={(e) => setPrediction(Number(e.target.value))} /></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Squared loss ${number(loss)} for prediction ${prediction} and target ${target}`}><rect className="graph-frame" x={left} y={top} width={width - left - right} height={height - top - bottom} /><line className="graph-axis" x1={left} x2={width - right} y1={sy(0)} y2={sy(0)} /><path className="curve-line" d={curve} /><line className="target-guide" x1={sx(target)} x2={sx(target)} y1={top} y2={sy(0)} /><circle className="selected-point" cx={sx(prediction)} cy={sy(Math.min(25, loss))} r="7" /><text className="point-label" x={sx(target)} y={top + 15} textAnchor="middle">target</text><text className="graph-axis-title" x={width - right} y={height - 12} textAnchor="end">prediction ŷ</text><text className="graph-axis-title" x={left} y={13}>loss</text></svg>
  </ExplorerShell>;
}

export function JacobianExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const id = useId().replaceAll(":", "");
  const [x, setX] = useState(1), [y, setY] = useState(1);
  const J = [[2 * x, -1], [1, 2 * y]];
  const height = 320, pad = 45, scale = Math.min((width - pad * 2) / 10, (height - pad * 2) / 8), cx = width / 2, cy = height / 2;
  const point = (a, b) => [cx + a * scale, cy - b * scale];
  const xMove = point(J[0][0], J[1][0]), yMove = point(J[0][1], J[1][1]);
  return <ExplorerShell label={id} title="See what each Jacobian column does" value={`J = [[${J[0].join(", ")}], [${J[1].join(", ")}]]`} rootRef={rootRef}
    reading={<><p><strong>First column:</strong> a tiny x-move changes the outputs in direction [{J[0][0]}, {J[1][0]}].</p><p><strong>Second column:</strong> a tiny y-move changes them in direction [{J[0][1]}, {J[1][1]}].</p></>}>
    <div className="slope-controls two-controls"><label><span>Location x <strong>{x}</strong></span><input aria-label="Jacobian location x" type="range" min="-2" max="2" step="0.5" value={x} onChange={(e) => setX(Number(e.target.value))} /></label><label><span>Location y <strong>{y}</strong></span><input aria-label="Jacobian location y" type="range" min="-2" max="2" step="0.5" value={y} onChange={(e) => setY(Number(e.target.value))} /></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Jacobian at ${x}, ${y}`}><defs><marker id={`${id}-x`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="gradient-arrow-head" /></marker><marker id={`${id}-y`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="direction-arrow-head" /></marker></defs><rect className="graph-frame" x={pad} y={pad / 2} width={width - pad * 2} height={height - pad} /><line className="graph-axis" x1={pad} x2={width - pad} y1={cy} y2={cy} /><line className="graph-axis" x1={cx} x2={cx} y1={pad / 2} y2={height - pad / 2} /><line className="gradient-arrow" x1={cx} y1={cy} x2={xMove[0]} y2={xMove[1]} markerEnd={`url(#${id}-x)`} /><line className="direction-arrow solid" x1={cx} y1={cy} x2={yMove[0]} y2={yMove[1]} markerEnd={`url(#${id}-y)`} /><text className="point-label" x={xMove[0]} y={xMove[1] - 12} textAnchor="middle">change from x</text><text className="point-label warm" x={yMove[0]} y={yMove[1] + 18} textAnchor="middle">change from y</text></svg>
  </ExplorerShell>;
}

export function CurvatureExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const [shape, setShape] = useState("bowl");
  const signs = { bowl: [1, 1], hill: [-1, -1], saddle: [1, -1] }[shape];
  const names = { bowl: "minimum", hill: "maximum", saddle: "saddle point" };
  const height = 280, gap = 26, panelWidth = (width - gap) / 2, top = 20, bottom = 38;
  const curvePath = (panel, sign) => Array.from({ length: 41 }, (_, i) => -2 + i / 10).map((v, i) => {
    const px = panel * (panelWidth + gap) + 28 + ((v + 2) / 4) * (panelWidth - 44);
    const value = sign * v * v;
    const py = top + ((5 - value) / 10) * (height - top - bottom);
    return `${i ? "L" : "M"}${px} ${py}`;
  }).join(" ");
  return <ExplorerShell label="curvature" title="Compare curvature in two directions" value={names[shape]} rootRef={rootRef}
    reading={<><p><strong>x direction:</strong> curvature is {signs[0] > 0 ? "upward" : "downward"}.</p><p><strong>y direction:</strong> curvature is {signs[1] > 0 ? "upward" : "downward"}. Together they form a {names[shape]}.</p></>}>
    <div className="explorer-choice" aria-label="Surface shape"><button type="button" aria-pressed={shape === "bowl"} onClick={() => setShape("bowl")}>Bowl</button><button type="button" aria-pressed={shape === "hill"} onClick={() => setShape("hill")}>Hill</button><button type="button" aria-pressed={shape === "saddle"} onClick={() => setShape("saddle")}>Saddle</button></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${names[shape]} curvature`}><rect className="graph-frame" x="1" y={top} width={panelWidth - 2} height={height - top - bottom} /><rect className="graph-frame" x={panelWidth + gap + 1} y={top} width={panelWidth - 2} height={height - top - bottom} /><path className="curve-line" d={curvePath(0, signs[0])} /><path className="curve-line warm-curve" d={curvePath(1, signs[1])} /><text className="graph-axis-title" x={panelWidth / 2} y={height - 12} textAnchor="middle">slice along x</text><text className="graph-axis-title" x={panelWidth + gap + panelWidth / 2} y={height - 12} textAnchor="middle">slice along y</text></svg>
  </ExplorerShell>;
}

export function LearningRateExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const [rate, setRate] = useState(0.2);
  const values = [4];
  for (let i = 0; i < 8; i += 1) values.push(values.at(-1) - rate * 2 * values.at(-1));
  const status = rate < 0.1 ? "slow but steady" : rate < 0.75 ? "converging" : rate < 1 ? "oscillating inward" : rate === 1 ? "stuck oscillating" : "diverging";
  const height = 300, left = 44, right = 18, top = 18, bottom = 42, sx = (v) => left + ((v + 5) / 10) * (width - left - right), sy = (v) => top + ((25 - v) / 25) * (height - top - bottom);
  const curve = Array.from({ length: 101 }, (_, i) => -5 + i / 10).map((v, i) => `${i ? "L" : "M"}${sx(v)} ${sy(v * v)}`).join(" ");
  const visible = values.filter((v) => Math.abs(v) <= 5);
  return <ExplorerShell label="learning-rate" title="Change the step size and watch training" value={`${number(rate)} · ${status}`} rootRef={rootRef}
    reading={<><p><strong>Update:</strong> start at w = 4 and repeatedly subtract η × 2w.</p><p><strong>Result:</strong> after eight steps w = {number(values.at(-1))}. This learning rate is {status}.</p></>}>
    <div className="slope-controls one-control"><label><span>Learning rate η <strong>{number(rate)}</strong></span><input aria-label="Learning rate" type="range" min="0.05" max="1.1" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value))} /><small>Try 0.05, 0.5, 0.9, and 1.1</small></label></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Gradient descent is ${status} at learning rate ${number(rate)}`}><rect className="graph-frame" x={left} y={top} width={width - left - right} height={height - top - bottom} /><path className="curve-line" d={curve} /><polyline className="descent-path" points={visible.map((v) => `${sx(v)},${sy(v * v)}`).join(" ")} />{visible.map((v, i) => <circle className={i ? "descent-step" : "descent-start"} cx={sx(v)} cy={sy(v * v)} r={i ? 5 : 7} key={`${i}-${v}`} />)}<text className="graph-axis-title" x={width - right} y={height - 12} textAnchor="end">parameter w</text><text className="graph-axis-title" x={left} y={13}>loss</text></svg>
  </ExplorerShell>;
}
