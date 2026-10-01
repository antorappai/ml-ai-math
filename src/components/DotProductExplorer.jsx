import React, { useId, useState } from "react";

export default function DotProductExplorer() {
  const id = useId();
  const [angle, setAngle] = useState(45);
  const [length, setLength] = useState(3);
  const radians = angle * Math.PI / 180;
  const cosine = Math.cos(radians);
  const raw = length * cosine;
  const endX = 180 + raw * 28;
  const endY = 210 - length * Math.sin(radians) * 28;
  const format = (value) => (Math.abs(value) < 0.0005 ? 0 : value).toFixed(3);

  return <figure className="dot-product-explorer">
    <figcaption><strong>Try separating direction from size</strong><p>The green query is [1, 0]. Turn the gold vector, then change its length while keeping its angle fixed. Predict which score will change.</p></figcaption>
    <div className="dot-explorer-layout"><div className="dot-explorer-controls">
      <label htmlFor={`${id}-angle`}>Angle between vectors <output>{angle}°</output></label>
      <input id={`${id}-angle`} type="range" min="0" max="180" step="1" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
      <label htmlFor={`${id}-length`}>Candidate length <output>{length}</output></label>
      <input id={`${id}-length`} type="range" min="1" max="5" step="0.5" value={length} onChange={(event) => setLength(Number(event.target.value))} />
      <dl aria-live="polite"><div><dt>Raw dot product</dt><dd>{format(raw)}</dd></div><div><dt>Cosine similarity</dt><dd>{format(cosine)}</dd></div></dl>
    </div><svg viewBox="0 0 360 250" role="img" aria-label={`Query points right; candidate has length ${length} at angle ${angle} degrees`}>
      <defs><marker id={`${id}-query`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--green)" /></marker><marker id={`${id}-candidate`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--gold)" /></marker></defs>
      <line x1="20" y1="210" x2="340" y2="210" className="graph-axis" /><line x1="180" y1="235" x2="180" y2="25" className="graph-axis" />
      <line x1="180" y1="210" x2="208" y2="210" stroke="var(--green)" strokeWidth="7" markerEnd={`url(#${id}-query)`} />
      <line x1="180" y1="210" x2={endX} y2={endY} stroke="var(--gold)" strokeWidth="3" markerEnd={`url(#${id}-candidate)`} />
      <circle cx="180" cy="210" r="4" fill="var(--ink)" /><text x="186" y="235" className="graph-tick">origin</text>
    </svg></div>
    <p>At 90° both scores are zero. Beyond 90° they become negative. Length changes the raw score unless it is zero; cosine stays fixed when only length changes.</p>
  </figure>;
}
