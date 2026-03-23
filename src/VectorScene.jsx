import React from "react";

const CENTER = 210;

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

function baseGrid(scale = 28) {
  const elements = [];
  for (let i = 14; i <= 406; i += scale) {
    elements.push(`<line class="grid-line" x1="${i}" y1="14" x2="${i}" y2="406" />`);
    elements.push(`<line class="grid-line" x1="14" y1="${i}" x2="406" y2="${i}" />`);
  }
  elements.push(`<line class="axis-line" x1="14" y1="${CENTER}" x2="406" y2="${CENTER}" />`);
  elements.push(`<line class="axis-line" x1="${CENTER}" y1="14" x2="${CENTER}" y2="406" />`);
  elements.push(`<circle class="origin-dot" cx="${CENTER}" cy="${CENTER}" r="4" />`);
  elements.push(`<text class="label-text" x="${CENTER + 8}" y="${CENTER - 10}">origin</text>`);
  return elements;
}

function pointToCanvas(x, y, scale = 28) {
  return {
    x: CENTER + x * scale,
    y: CENTER - y * scale
  };
}

function vectorMarkup(vector, className, markerId, label, scale = 28) {
  const point = pointToCanvas(vector.x, vector.y, scale);
  return `
    <line class="${className}" x1="${CENTER}" y1="${CENTER}" x2="${point.x}" y2="${point.y}" marker-end="url(#${markerId})" />
    <circle class="point-dot" cx="${point.x}" cy="${point.y}" r="4.5" />
    <text class="label-text" x="${point.x + 10}" y="${point.y - 8}">${label} (${formatNumber(vector.x)}, ${formatNumber(vector.y)})</text>
  `;
}

function helperLineMarkup(from, to, scale = 28) {
  const start = pointToCanvas(from.x, from.y, scale);
  const end = pointToCanvas(to.x, to.y, scale);
  return `<line class="helper-line" x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" />`;
}

function linePath(fn, minX, maxX, step, scaleX = 28, scaleY = 28) {
  const commands = [];
  for (let x = minX; x <= maxX + 1e-9; x += step) {
    const y = fn(x);
    const px = CENTER + x * scaleX;
    const py = CENTER - y * scaleY;
    commands.push(`${commands.length === 0 ? "M" : "L"} ${px} ${py}`);
  }
  return commands.join(" ");
}

function functionScene(drawing) {
  const elements = baseGrid(28);
  elements.push(defsBlock());
  elements.push(
    `<path class="curve-line" d="${linePath((x) => drawing.m * x + drawing.c, -6, 6, 0.25)}" />`
  );
  const point = pointToCanvas(drawing.x, drawing.y);
  elements.push(`<circle class="highlight-dot" cx="${point.x}" cy="${point.y}" r="5" />`);
  elements.push(
    `<text class="label-text" x="${point.x + 10}" y="${point.y - 10}">(${formatNumber(drawing.x)}, ${formatNumber(drawing.y)})</text>`
  );
  return elements.join("");
}

function vectorScene(drawing) {
  const elements = baseGrid(28);
  elements.push(defsBlock());
  elements.push(vectorMarkup(drawing.a, "vector-a", "marker-a", "v"));
  return elements.join("");
}

function dotScene(drawing) {
  const elements = baseGrid(28);
  elements.push(defsBlock());
  elements.push(vectorMarkup(drawing.a, "vector-a", "marker-a", "A"));
  elements.push(vectorMarkup(drawing.b, "vector-b", "marker-b", "B"));
  return elements.join("");
}

function matrixScene(drawing) {
  const scale = 20;
  const elements = baseGrid(scale);
  elements.push(defsBlock());
  if (drawing.showBasis && drawing.e1 && drawing.e2) {
    elements.push(vectorMarkup(drawing.e1, "basis-a", "marker-a", "T(e1)", scale));
    elements.push(vectorMarkup(drawing.e2, "basis-b", "marker-b", "T(e2)", scale));
  }
  elements.push(vectorMarkup(drawing.v, "vector-b", "marker-b", "v", scale));
  elements.push(vectorMarkup(drawing.t, "vector-a", "marker-a", "Av", scale));
  return elements.join("");
}

function projectionScene(drawing) {
  const elements = baseGrid(28);
  elements.push(defsBlock());
  elements.push(vectorMarkup(drawing.a, "vector-a", "marker-a", "A"));
  elements.push(vectorMarkup(drawing.b, "vector-b", "marker-b", "B"));
  elements.push(vectorMarkup(drawing.p, "projection-line", "marker-p", "proj"));
  elements.push(helperLineMarkup(drawing.b, drawing.p));
  return elements.join("");
}

function curveScene(drawing) {
  const elements = baseGrid(28);
  elements.push(defsBlock());
  elements.push(
    `<path class="curve-line" d="${linePath((x) => 0.18 * x * x - 0.8 * x + 1.2, -4, 8, 0.1)}" />`
  );
  const point = pointToCanvas(drawing.x0, drawing.y0);
  const tangentFn = (x) => drawing.slope * (x - drawing.x0) + drawing.y0;
  elements.push(`<path class="tangent-line" d="${linePath(tangentFn, -4, 8, 0.2)}" />`);
  elements.push(`<circle class="highlight-dot" cx="${point.x}" cy="${point.y}" r="5" />`);
  elements.push(
    `<text class="label-text" x="${point.x + 10}" y="${point.y - 10}">x = ${formatNumber(drawing.x0)}</text>`
  );
  return elements.join("");
}

function contourCircle(radius) {
  return `<circle class="contour-ring" cx="${CENTER}" cy="${CENTER}" r="${radius}" />`;
}

function contourScene(drawing) {
  const scale = 24;
  const elements = baseGrid(scale);
  elements.push(defsBlock());
  [24, 48, 72, 96].forEach((radius) => {
    elements.push(contourCircle(radius));
  });
  const point = pointToCanvas(drawing.point.x, drawing.point.y, scale);
  const gradientEnd = pointToCanvas(
    drawing.point.x + drawing.gradient.x / 4,
    drawing.point.y + drawing.gradient.y / 4,
    scale
  );
  elements.push(`<circle class="highlight-dot" cx="${point.x}" cy="${point.y}" r="5" />`);
  elements.push(
    `<line class="gradient-line" x1="${point.x}" y1="${point.y}" x2="${gradientEnd.x}" y2="${gradientEnd.y}" marker-end="url(#marker-a)" />`
  );
  elements.push(
    `<text class="label-text" x="${point.x + 10}" y="${point.y - 10}">∇f</text>`
  );
  return elements.join("");
}

function probabilityScene(drawing) {
  const headsHeight = 260 * drawing.p;
  const tailsHeight = 260 * drawing.q;
  return `
    <svg viewBox="0 0 420 420" aria-label="Probability bars">
      <rect class="chart-bg" x="40" y="40" width="340" height="300" rx="22" />
      <line class="axis-line" x1="70" y1="320" x2="350" y2="320" />
      <rect class="bar-a" x="110" y="${320 - headsHeight}" width="70" height="${headsHeight}" rx="14" />
      <rect class="bar-b" x="240" y="${320 - tailsHeight}" width="70" height="${tailsHeight}" rx="14" />
      <text class="label-text" x="118" y="350">Heads</text>
      <text class="label-text" x="250" y="350">Tails</text>
      <text class="label-text" x="108" y="${320 - headsHeight - 12}">${formatNumber(drawing.p)}</text>
      <text class="label-text" x="248" y="${320 - tailsHeight - 12}">${formatNumber(drawing.q)}</text>
    </svg>
  `;
}

function meanScene(drawing) {
  const min = 0;
  const max = 10;
  const scale = 28;
  const toX = (value) => 70 + ((value - min) / (max - min)) * 280;
  const lines = [];
  lines.push(`<rect class="chart-bg" x="40" y="100" width="340" height="180" rx="22" />`);
  lines.push(`<line class="axis-line" x1="70" y1="190" x2="350" y2="190" />`);
  for (let tick = 0; tick <= 10; tick += 2) {
    const x = toX(tick);
    lines.push(`<line class="grid-line" x1="${x}" y1="178" x2="${x}" y2="202" />`);
    lines.push(`<text class="label-text" x="${x - 6}" y="225">${tick}</text>`);
  }
  drawing.values.forEach((value, index) => {
    const x = toX(value);
    lines.push(`<circle class="${index % 2 === 0 ? "point-a" : "point-b"}" cx="${x}" cy="190" r="7" />`);
  });
  const meanX = toX(drawing.mean);
  lines.push(`<line class="mean-line" x1="${meanX}" y1="120" x2="${meanX}" y2="260" />`);
  lines.push(`<text class="label-text" x="${meanX - 22}" y="116">mean</text>`);
  return `<svg viewBox="0 0 420 420" aria-label="Mean on a number line">${lines.join("")}</svg>`;
}

function regressionScene(drawing) {
  const left = 60;
  const bottom = 340;
  const width = 300;
  const height = 260;
  const toX = (x) => left + ((x - 0) / 5) * width;
  const toY = (y) => bottom - ((y - 0) / 7) * height;
  const elements = [];
  elements.push(`<rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />`);
  elements.push(`<line class="axis-line" x1="${left}" y1="${bottom}" x2="${left + width}" y2="${bottom}" />`);
  elements.push(`<line class="axis-line" x1="${left}" y1="${bottom}" x2="${left}" y2="${bottom - height}" />`);
  for (let tick = 1; tick <= 4; tick += 1) {
    elements.push(`<line class="grid-line" x1="${toX(tick)}" y1="${bottom - height}" x2="${toX(tick)}" y2="${bottom}" />`);
    elements.push(`<text class="label-text" x="${toX(tick) - 4}" y="${bottom + 22}">${tick}</text>`);
  }
  for (let tick = 1; tick <= 6; tick += 1) {
    elements.push(`<line class="grid-line" x1="${left}" y1="${toY(tick)}" x2="${left + width}" y2="${toY(tick)}" />`);
    elements.push(`<text class="label-text" x="${left - 24}" y="${toY(tick) + 4}">${tick}</text>`);
  }
  drawing.points.forEach((point) => {
    elements.push(`<circle class="point-b" cx="${toX(point.x)}" cy="${toY(point.y)}" r="6" />`);
  });
  const path = linePath(
    (x) => drawing.m * x + drawing.b,
    0,
    5,
    0.1,
    width / 5,
    height / 7
  )
    .replaceAll(`${CENTER}`, `${left}`)
    .replaceAll(" 210", ` ${bottom}`);
  const lineCommands = [];
  for (let x = 0; x <= 5.001; x += 0.1) {
    const y = drawing.m * x + drawing.b;
    lineCommands.push(`${lineCommands.length === 0 ? "M" : "L"} ${toX(x)} ${toY(y)}`);
  }
  elements.push(`<path class="regression-line" d="${lineCommands.join(" ")}" />`);
  return `<svg viewBox="0 0 420 420" aria-label="Regression line fit">${elements.join("")}</svg>`;
}

function buildScene(drawing) {
  if (drawing.type === "vectors") {
    return vectorScene(drawing);
  }
  if (drawing.type === "dot") {
    return dotScene(drawing);
  }
  if (drawing.type === "projection") {
    return projectionScene(drawing);
  }
  if (drawing.type === "matrix") {
    return matrixScene(drawing);
  }
  if (drawing.type === "functionLine") {
    return functionScene(drawing);
  }
  if (drawing.type === "curve") {
    return curveScene(drawing);
  }
  if (drawing.type === "contour") {
    return contourScene(drawing);
  }
  if (drawing.type === "probability") {
    return probabilityScene(drawing);
  }
  if (drawing.type === "mean") {
    return meanScene(drawing);
  }
  if (drawing.type === "regression") {
    return regressionScene(drawing);
  }
  return `<svg viewBox="0 0 420 420" aria-label="Concept visual">${baseGrid(28).join("")}</svg>`;
}

function formatNumber(value) {
  return Number(value).toFixed(2).replace(/\.00$/, "");
}

export default function VectorScene({ drawing }) {
  const markup = buildScene(drawing);
  if (markup.startsWith("<svg")) {
    return <div dangerouslySetInnerHTML={{ __html: markup }} />;
  }

  return (
    <svg
      viewBox="0 0 420 420"
      aria-label="Interactive math graph"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
