import React from "react";

function defsBlock() {
  return `
    <defs>
      <marker id="marker-a" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"></path>
      </marker>
      <marker id="marker-b" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L8,3 z" fill="#c58a2e"></path>
      </marker>
      <marker id="marker-p" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L8,3 z" fill="#0b3f39"></path>
      </marker>
    </defs>
  `;
}

function vectorMarkup(vector, className, markerId, label, center, scale) {
  const x = center + vector.x * scale;
  const y = center - vector.y * scale;
  return `
    <line class="${className}" x1="${center}" y1="${center}" x2="${x}" y2="${y}" marker-end="url(#${markerId})" />
    <circle class="point-dot" cx="${x}" cy="${y}" r="4.5" />
    <text class="label-text" x="${x + 10}" y="${y - 8}">${label} (${formatNumber(vector.x)}, ${formatNumber(vector.y)})</text>
  `;
}

function helperLineMarkup(from, to, center, scale) {
  const x1 = center + from.x * scale;
  const y1 = center - from.y * scale;
  const x2 = center + to.x * scale;
  const y2 = center - to.y * scale;
  return `<line class="helper-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
}

function buildScene(drawing) {
  const elements = [];
  const center = 210;
  const scale = 28;

  for (let i = 14; i <= 406; i += scale) {
    elements.push(`<line class="grid-line" x1="${i}" y1="14" x2="${i}" y2="406" />`);
    elements.push(`<line class="grid-line" x1="14" y1="${i}" x2="406" y2="${i}" />`);
  }

  elements.push(`<line class="axis-line" x1="14" y1="${center}" x2="406" y2="${center}" />`);
  elements.push(`<line class="axis-line" x1="${center}" y1="14" x2="${center}" y2="406" />`);
  elements.push(`<circle class="origin-dot" cx="${center}" cy="${center}" r="4" />`);
  elements.push(`<text class="label-text" x="${center + 8}" y="${center - 10}">origin</text>`);
  elements.push(defsBlock());

  if (drawing.type === "vectors") {
    elements.push(vectorMarkup(drawing.a, "vector-a", "marker-a", "v", center, scale));
  }

  if (drawing.type === "dot") {
    elements.push(vectorMarkup(drawing.a, "vector-a", "marker-a", "A", center, scale));
    elements.push(vectorMarkup(drawing.b, "vector-b", "marker-b", "B", center, scale));
  }

  if (drawing.type === "projection") {
    elements.push(vectorMarkup(drawing.a, "vector-a", "marker-a", "A", center, scale));
    elements.push(vectorMarkup(drawing.b, "vector-b", "marker-b", "B", center, scale));
    elements.push(vectorMarkup(drawing.p, "projection-line", "marker-p", "proj", center, scale));
    elements.push(helperLineMarkup(drawing.b, drawing.p, center, scale));
  }

  return elements.join("");
}

function formatNumber(value) {
  return Number(value).toFixed(2).replace(/\.00$/, "");
}

export default function VectorScene({ drawing }) {
  return (
    <svg
      viewBox="0 0 420 420"
      aria-label="Interactive vector graph"
      dangerouslySetInnerHTML={{ __html: buildScene(drawing) }}
    />
  );
}
