import React, { useEffect, useId, useRef, useState } from "react";

const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -8;
const Y_MAX = 8;
const HEIGHT = 360;
const PADDING = { top: 24, right: 24, bottom: 48, left: 52 };

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function equation(slope, intercept) {
  const slopePart = slope === 1 ? "x" : slope === -1 ? "−x" : slope < 0 ? `−${formatNumber(Math.abs(slope))}x` : `${formatNumber(slope)}x`;
  if (intercept === 0) return `y = ${slopePart}`;
  return `y = ${slopePart} ${intercept > 0 ? "+" : "−"} ${formatNumber(Math.abs(intercept))}`;
}

export default function SlopeExplorer() {
  const rootRef = useRef(null);
  const clipId = useId().replaceAll(":", "");
  const [width, setWidth] = useState(640);
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);
  const [inputX, setInputX] = useState(2);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const resize = new ResizeObserver(([entry]) => setWidth(Math.max(300, Math.round(entry.contentRect.width))));
    resize.observe(node);
    return () => resize.disconnect();
  }, []);

  const plotWidth = width - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const xScale = (x) => PADDING.left + ((x - X_MIN) / (X_MAX - X_MIN)) * plotWidth;
  const yScale = (y) => PADDING.top + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * plotHeight;
  const outputY = slope * inputX + intercept;
  const xTicks = [-4, -2, 0, 2, 4];
  const yTicks = [-8, -4, 0, 4, 8];
  const direction = slope > 0 ? "rises" : slope < 0 ? "falls" : "stays flat";
  const slopeMeaning = slope === 0
    ? "When x increases, y does not change."
    : `When x increases by 1, y ${direction} by ${formatNumber(Math.abs(slope))}.`;

  return (
    <section className="slope-explorer" ref={rootRef} aria-labelledby="slope-explorer-title">
      <header>
        <div><p className="section-label">Interactive graph</p><h3 id="slope-explorer-title">Move the line and watch the rule change</h3></div>
        <strong className="live-equation" aria-live="polite">{equation(slope, intercept)}</strong>
      </header>

      <div className="slope-controls">
        <label>
          <span>Slope <strong>{formatNumber(slope)}</strong></span>
          <input type="range" min="-2" max="2" step="0.5" value={slope} onChange={(event) => setSlope(Number(event.target.value))} aria-label="Slope" />
          <small>Controls steepness and direction</small>
        </label>
        <label>
          <span>Starting height <strong>{formatNumber(intercept)}</strong></span>
          <input type="range" min="-3" max="3" step="1" value={intercept} onChange={(event) => setIntercept(Number(event.target.value))} aria-label="Starting height" />
          <small>Where the line crosses the y-axis</small>
        </label>
        <label>
          <span>Try input x <strong>{formatNumber(inputX)}</strong></span>
          <input type="range" min="-2" max="2" step="1" value={inputX} onChange={(event) => setInputX(Number(event.target.value))} aria-label="Input x" />
          <small>Moves the point along the line</small>
        </label>
      </div>

      <svg viewBox={`0 0 ${width} ${HEIGHT}`} role="img" aria-labelledby={`${clipId}-title ${clipId}-desc`}>
        <title id={`${clipId}-title`}>Interactive graph of {equation(slope, intercept)}</title>
        <desc id={`${clipId}-desc`}>{slopeMeaning} The selected input {formatNumber(inputX)} gives output {formatNumber(outputY)}.</desc>
        <defs><clipPath id={clipId}><rect x={PADDING.left} y={PADDING.top} width={plotWidth} height={plotHeight} /></clipPath></defs>
        <rect className="graph-frame" x={PADDING.left} y={PADDING.top} width={plotWidth} height={plotHeight} />
        {xTicks.map((tick) => <line className="graph-grid" x1={xScale(tick)} x2={xScale(tick)} y1={PADDING.top} y2={HEIGHT - PADDING.bottom} key={`x-grid-${tick}`} />)}
        {yTicks.map((tick) => <line className="graph-grid" x1={PADDING.left} x2={width - PADDING.right} y1={yScale(tick)} y2={yScale(tick)} key={`y-grid-${tick}`} />)}
        <line className="graph-axis" x1={PADDING.left} x2={width - PADDING.right} y1={yScale(0)} y2={yScale(0)} />
        <line className="graph-axis" x1={xScale(0)} x2={xScale(0)} y1={PADDING.top} y2={HEIGHT - PADDING.bottom} />
        {xTicks.map((tick) => <text className="graph-tick" x={xScale(tick)} y={HEIGHT - PADDING.bottom + 20} textAnchor="middle" key={`x-label-${tick}`}>{tick}</text>)}
        {yTicks.filter(Boolean).map((tick) => <text className="graph-tick" x={PADDING.left - 10} y={yScale(tick) + 4} textAnchor="end" key={`y-label-${tick}`}>{tick}</text>)}
        <text className="graph-axis-title" x={width - PADDING.right} y={HEIGHT - 10} textAnchor="end">input x</text>
        <text className="graph-axis-title" x={PADDING.left} y={14}>output y</text>
        <g clipPath={`url(#${clipId})`}>
          <line className="slope-line" x1={xScale(X_MIN)} y1={yScale(slope * X_MIN + intercept)} x2={xScale(X_MAX)} y2={yScale(slope * X_MAX + intercept)} />
          <line className="intercept-guide" x1={xScale(0)} y1={yScale(0)} x2={xScale(0)} y2={yScale(intercept)} />
          <circle className="intercept-point" cx={xScale(0)} cy={yScale(intercept)} r="5" />
          <line className="input-guide" x1={xScale(inputX)} x2={xScale(inputX)} y1={yScale(0)} y2={yScale(outputY)} />
          <circle className="selected-point" cx={xScale(inputX)} cy={yScale(outputY)} r="7" />
        </g>
        <text className="point-label" x={Math.min(width - PADDING.right - 6, xScale(inputX) + 12)} y={Math.max(PADDING.top + 16, yScale(outputY) - 12)} textAnchor={inputX > 1 ? "end" : "start"}>({formatNumber(inputX)}, {formatNumber(outputY)})</text>
      </svg>

      <div className="slope-reading" aria-live="polite">
        <p><strong>Read the movement:</strong> {slopeMeaning}</p>
        <p><strong>Read the point:</strong> when x is {formatNumber(inputX)}, y is {formatNumber(outputY)}.</p>
      </div>
    </section>
  );
}
