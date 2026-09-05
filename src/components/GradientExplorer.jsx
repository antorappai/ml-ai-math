import React, { useEffect, useId, useRef, useState } from "react";

const DOMAIN = 4;
const HEIGHT = 420;
const TOP = 24;
const BOTTOM = 48;

function formatNumber(value) {
  const rounded = Math.abs(value) < 0.05 ? 0 : value;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export default function GradientExplorer() {
  const rootRef = useRef(null);
  const id = useId().replaceAll(":", "");
  const [width, setWidth] = useState(640);
  const [x, setX] = useState(2);
  const [y, setY] = useState(1);
  const [angle, setAngle] = useState(180);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const resize = new ResizeObserver(([entry]) => setWidth(Math.max(300, Math.round(entry.contentRect.width))));
    resize.observe(node);
    return () => resize.disconnect();
  }, []);

  const plotSize = Math.min(width - 24, HEIGHT - TOP - BOTTOM);
  const left = (width - plotSize) / 2;
  const scale = plotSize / (DOMAIN * 2);
  const sx = (value) => left + (value + DOMAIN) * scale;
  const sy = (value) => TOP + (DOMAIN - value) * scale;
  const gradient = [2 * x, 2 * y];
  const gradientLength = Math.hypot(...gradient);
  const radians = angle * Math.PI / 180;
  const direction = [Math.cos(radians), Math.sin(radians)];
  const directionalChange = gradient[0] * direction[0] + gradient[1] * direction[1];
  const value = x * x + y * y;
  const arrowLength = 1.25;
  const gradientUnit = gradientLength === 0 ? [0, 0] : gradient.map((component) => component / gradientLength);
  const ticks = [-4, -2, 0, 2, 4];
  const changeMeaning = directionalChange > 0.05 ? "uphill" : directionalChange < -0.05 ? "downhill" : "nearly level";

  return (
    <section className="slope-explorer gradient-explorer" ref={rootRef} aria-labelledby={`${id}-heading`}>
      <header>
        <div><p className="section-label">Interactive contour map</p><h3 id={`${id}-heading`}>Choose a point and test a direction</h3></div>
        <strong className="live-equation" aria-live="polite">f(x, y) = x² + y²</strong>
      </header>

      <div className="slope-controls">
        <label>
          <span>Position x <strong>{formatNumber(x)}</strong></span>
          <input type="range" min="-3" max="3" step="0.5" value={x} onChange={(event) => setX(Number(event.target.value))} aria-label="Position x" />
          <small>Moves left and right</small>
        </label>
        <label>
          <span>Position y <strong>{formatNumber(y)}</strong></span>
          <input type="range" min="-3" max="3" step="0.5" value={y} onChange={(event) => setY(Number(event.target.value))} aria-label="Position y" />
          <small>Moves down and up</small>
        </label>
        <label>
          <span>Test direction <strong>{angle}°</strong></span>
          <input type="range" min="0" max="315" step="45" value={angle} onChange={(event) => setAngle(Number(event.target.value))} aria-label="Test direction in degrees" />
          <small>Rotates the dashed arrow</small>
        </label>
      </div>

      <svg viewBox={`0 0 ${width} ${HEIGHT}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Contour map for f of x y equals x squared plus y squared</title>
        <desc id={`${id}-desc`}>At point {formatNumber(x)}, {formatNumber(y)}, the gradient is {formatNumber(gradient[0])}, {formatNumber(gradient[1])}. The chosen direction produces {changeMeaning} change.</desc>
        <defs>
          <clipPath id={`${id}-clip`}><rect x={left} y={TOP} width={plotSize} height={plotSize} /></clipPath>
          <marker id={`${id}-uphill`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" className="gradient-arrow-head" /></marker>
          <marker id={`${id}-chosen`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" className="direction-arrow-head" /></marker>
        </defs>
        <rect className="graph-frame" x={left} y={TOP} width={plotSize} height={plotSize} />
        <g clipPath={`url(#${id}-clip)`}>
          {ticks.map((tick) => <line className="graph-grid" x1={sx(tick)} x2={sx(tick)} y1={TOP} y2={TOP + plotSize} key={`x-${tick}`} />)}
          {ticks.map((tick) => <line className="graph-grid" x1={left} x2={left + plotSize} y1={sy(tick)} y2={sy(tick)} key={`y-${tick}`} />)}
          {[1, 2, 3].map((radius) => <circle className="contour-line" cx={sx(0)} cy={sy(0)} r={radius * scale} key={radius} />)}
          <line className="graph-axis" x1={left} x2={left + plotSize} y1={sy(0)} y2={sy(0)} />
          <line className="graph-axis" x1={sx(0)} x2={sx(0)} y1={TOP} y2={TOP + plotSize} />
          {gradientLength > 0 && <line className="gradient-arrow" x1={sx(x)} y1={sy(y)} x2={sx(x + gradientUnit[0] * arrowLength)} y2={sy(y + gradientUnit[1] * arrowLength)} markerEnd={`url(#${id}-uphill)`} />}
          <line className="direction-arrow" x1={sx(x)} y1={sy(y)} x2={sx(x + direction[0] * arrowLength)} y2={sy(y + direction[1] * arrowLength)} markerEnd={`url(#${id}-chosen)`} />
          <circle className="selected-point" cx={sx(x)} cy={sy(y)} r="7" />
        </g>
        {ticks.map((tick) => <text className="graph-tick" x={sx(tick)} y={TOP + plotSize + 20} textAnchor="middle" key={`xl-${tick}`}>{tick}</text>)}
        {ticks.filter(Boolean).map((tick) => <text className="graph-tick" x={left - 10} y={sy(tick) + 4} textAnchor="end" key={`yl-${tick}`}>{tick}</text>)}
        <text className="graph-axis-title" x={left + plotSize} y={TOP + plotSize + 40} textAnchor="end">x position</text>
        <text className="graph-axis-title" x={left} y={14}>y position</text>
      </svg>

      <div className="gradient-legend" aria-label="Graph legend">
        <span><i className="gradient-key" />Gradient: steepest uphill</span>
        <span><i className="direction-key" />Direction you are testing</span>
      </div>
      <div className="slope-reading" aria-live="polite">
        <p><strong>At this point:</strong> f = {formatNumber(value)} and ∇f = [{formatNumber(gradient[0])}, {formatNumber(gradient[1])}].</p>
        <p><strong>Along your arrow:</strong> change is {formatNumber(directionalChange)}, so it points {changeMeaning}. The negative gradient points fastest downhill.</p>
      </div>
    </section>
  );
}
