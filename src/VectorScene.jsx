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

function basisScene(drawing) {
  const scale = 28;
  const elements = baseGrid(scale);
  elements.push(defsBlock());
  elements.push(vectorMarkup(drawing.b1, "basis-a", "marker-a", "b1", scale));
  elements.push(vectorMarkup(drawing.b2, "basis-b", "marker-b", "b2", scale));
  elements.push(vectorMarkup(drawing.v, "vector-a", "marker-p", "v", scale));
  return elements.join("");
}

function matrixTypesScene() {
  return `
    <svg viewBox="0 0 420 420" aria-label="Matrix types overview">
      <rect class="chart-bg" x="36" y="36" width="348" height="348" rx="24" />
      <text class="label-text" x="62" y="82">Identity</text>
      <text class="label-text" x="210" y="82">Diagonal</text>
      <text class="label-text" x="64" y="230">Zero</text>
      <text class="label-text" x="206" y="230">Rectangular</text>

      <rect x="60" y="98" width="92" height="92" rx="14" fill="rgba(15,118,110,0.08)" stroke="rgba(15,118,110,0.35)" />
      <rect x="190" y="98" width="92" height="92" rx="14" fill="rgba(197,138,46,0.10)" stroke="rgba(197,138,46,0.45)" />
      <rect x="60" y="246" width="92" height="92" rx="14" fill="rgba(25,50,41,0.06)" stroke="rgba(25,50,41,0.30)" />
      <rect x="190" y="246" width="132" height="92" rx="14" fill="rgba(15,118,110,0.06)" stroke="rgba(15,118,110,0.30)" />

      <text class="label-text" x="88" y="135">[1 0]</text>
      <text class="label-text" x="88" y="165">[0 1]</text>
      <text class="label-text" x="215" y="135">[2 0]</text>
      <text class="label-text" x="215" y="165">[0 5]</text>
      <text class="label-text" x="90" y="283">[0 0]</text>
      <text class="label-text" x="90" y="313">[0 0]</text>
      <text class="label-text" x="217" y="283">[1 2 3]</text>
      <text class="label-text" x="217" y="313">[4 5 6]</text>

      <text class="label-text" x="58" y="360">Read shape first: rows × columns</text>
    </svg>
  `;
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

function discreteRvScene(drawing) {
  const zeroHeight = 240 * (1 - drawing.p);
  const oneHeight = 240 * drawing.p;
  const expectedX = 120 + drawing.p * 160;
  return `
    <svg viewBox="0 0 420 420" aria-label="Discrete random variable">
      <rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />
      <line class="axis-line" x1="90" y1="320" x2="330" y2="320" />
      <rect class="bar-b" x="118" y="${320 - zeroHeight}" width="62" height="${zeroHeight}" rx="12" />
      <rect class="bar-a" x="238" y="${320 - oneHeight}" width="62" height="${oneHeight}" rx="12" />
      <text class="label-text" x="142" y="348">X = 0</text>
      <text class="label-text" x="262" y="348">X = 1</text>
      <text class="label-text" x="124" y="${320 - zeroHeight - 12}">${formatNumber(1 - drawing.p)}</text>
      <text class="label-text" x="250" y="${320 - oneHeight - 12}">${formatNumber(drawing.p)}</text>
      <line class="mean-line" x1="${expectedX}" y1="90" x2="${expectedX}" y2="320" />
      <text class="label-text" x="${expectedX - 18}" y="84">E[X]</text>
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
  const lineCommands = [];
  for (let x = 0; x <= 5.001; x += 0.1) {
    const y = drawing.m * x + drawing.b;
    lineCommands.push(`${lineCommands.length === 0 ? "M" : "L"} ${toX(x)} ${toY(y)}`);
  }
  elements.push(`<path class="regression-line" d="${lineCommands.join(" ")}" />`);
  return `<svg viewBox="0 0 420 420" aria-label="Regression line fit">${elements.join("")}</svg>`;
}

function bayesScene(drawing) {
  const diseased = 280 * drawing.prior;
  const healthy = 280 * (1 - drawing.prior);
  const truePositive = 240 * (drawing.truePositive / Math.max(drawing.truePositive + drawing.falsePositive, 0.001));
  const falsePositive = 240 - truePositive;
  return `
    <svg viewBox="0 0 420 420" aria-label="Bayes evidence split">
      <rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />
      <text class="label-text" x="62" y="82">Population split</text>
      <rect class="bar-a" x="70" y="110" width="${diseased}" height="44" rx="12" />
      <rect class="bar-b" x="${70 + diseased}" y="110" width="${healthy}" height="44" rx="12" />
      <text class="label-text" x="74" y="180">Among positive tests</text>
      <rect class="bar-a" x="70" y="208" width="${truePositive}" height="44" rx="12" />
      <rect class="bar-b" x="${70 + truePositive}" y="208" width="${falsePositive}" height="44" rx="12" />
      <text class="label-text" x="72" y="300">Posterior ≈ ${formatNumber(drawing.posterior)}</text>
      <text class="label-text" x="74" y="104">disease</text>
      <text class="label-text" x="${70 + diseased + 8}" y="104">no disease</text>
      <text class="label-text" x="74" y="202">true positive</text>
      <text class="label-text" x="${70 + truePositive + 8}" y="202">false positive</text>
    </svg>
  `;
}

function distributionScene(drawing) {
  const left = 60;
  const bottom = 330;
  const width = 300;
  const height = 230;
  const toX = (x) => left + ((x + 4) / 8) * width;
  const toY = (y) => bottom - y * height;
  const density = (x) => {
    const z = (x - drawing.mu) / drawing.sigma;
    return Math.exp(-0.5 * z * z);
  };
  const commands = [];
  for (let x = -4; x <= 4.001; x += 0.1) {
    const px = toX(x);
    const py = toY(density(x));
    commands.push(`${commands.length === 0 ? "M" : "L"} ${px} ${py}`);
  }
  const meanX = toX(drawing.mu);
  return `
    <svg viewBox="0 0 420 420" aria-label="Distribution curve">
      <rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />
      <line class="axis-line" x1="${left}" y1="${bottom}" x2="${left + width}" y2="${bottom}" />
      <path class="curve-line" d="${commands.join(" ")}" />
      <line class="mean-line" x1="${meanX}" y1="90" x2="${meanX}" y2="${bottom}" />
      <text class="label-text" x="${meanX - 10}" y="84">μ</text>
      <text class="label-text" x="72" y="345">spread = ${formatNumber(drawing.sigma)}</text>
    </svg>
  `;
}

function binomialCoeff(n, r) {
  let top = 1;
  let bottom = 1;
  for (let i = 1; i <= r; i += 1) {
    top *= n - (r - i);
    bottom *= i;
  }
  return top / bottom;
}

function binomialScene(drawing) {
  const values = [];
  for (let x = 0; x <= drawing.n; x += 1) {
    values.push(binomialCoeff(drawing.n, x) * drawing.p ** x * (1 - drawing.p) ** (drawing.n - x));
  }
  const maxValue = Math.max(...values, 0.001);
  const left = 70;
  const bottom = 330;
  const width = 270;
  const barWidth = 38;
  const gap = 16;
  const elements = [];
  elements.push(`<rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />`);
  elements.push(`<line class="axis-line" x1="${left}" y1="${bottom}" x2="${left + width}" y2="${bottom}" />`);
  values.forEach((value, x) => {
    const height = 190 * (value / maxValue);
    const xPos = left + x * (barWidth + gap);
    const barClass = x <= drawing.k ? "bar-a" : "bar-b";
    elements.push(`<rect class="${barClass}" x="${xPos}" y="${bottom - height}" width="${barWidth}" height="${height}" rx="10" />`);
    elements.push(`<text class="label-text" x="${xPos + 12}" y="${bottom + 20}">${x}</text>`);
  });
  elements.push(`<text class="label-text" x="70" y="88">P(X ≤ ${drawing.k}) highlighted</text>`);
  return `<svg viewBox="0 0 420 420" aria-label="Binomial distribution">${elements.join("")}</svg>`;
}

function pcaScene() {
  return `
    <svg viewBox="0 0 420 420" aria-label="PCA intuition">
      <rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />
      <ellipse cx="210" cy="200" rx="110" ry="48" fill="rgba(15,118,110,0.08)" stroke="rgba(15,118,110,0.4)" stroke-width="3" transform="rotate(-24 210 200)" />
      <line class="regression-line" x1="110" y1="250" x2="315" y2="155" />
      <line class="helper-line" x1="170" y1="105" x2="247" y2="290" />
      <text class="label-text" x="278" y="148">1st principal component</text>
      <text class="label-text" x="84" y="320">keep strongest spread direction</text>
    </svg>
  `;
}

function decompositionScene() {
  return `
    <svg viewBox="0 0 420 420" aria-label="Eigen decomposition idea">
      ${defsBlock()}
      <rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />
      <rect x="66" y="150" width="58" height="58" rx="12" fill="rgba(197,138,46,0.18)" stroke="rgba(197,138,46,0.55)" />
      <rect x="182" y="150" width="58" height="58" rx="12" fill="rgba(15,118,110,0.12)" stroke="rgba(15,118,110,0.55)" />
      <rect x="298" y="150" width="58" height="58" rx="12" fill="rgba(25,50,41,0.10)" stroke="rgba(25,50,41,0.45)" />
      <text class="label-text" x="88" y="184">C</text>
      <text class="label-text" x="204" y="184">D</text>
      <text class="label-text" x="308" y="184">C^-1</text>
      <line class="gradient-line" x1="126" y1="179" x2="175" y2="179" marker-end="url(#marker-a)" />
      <line class="gradient-line" x1="242" y1="179" x2="291" y2="179" marker-end="url(#marker-a)" />
      <text class="label-text" x="72" y="110">change into eigenvector basis</text>
      <text class="label-text" x="192" y="110">scale diagonally</text>
      <text class="label-text" x="268" y="250">change back</text>
      <text class="label-text" x="70" y="296">A = C D C^-1</text>
      <text class="label-text" x="70" y="324">D is simple because it only scales along eigen directions</text>
    </svg>
  `;
}

function parametricScene(drawing) {
  const elements = baseGrid(28);
  elements.push(defsBlock());
  const commands = [];
  for (let t = 0; t <= Math.PI * 2 + 0.001; t += 0.05) {
    const x = Math.cos(t);
    const y = Math.sin(t);
    const point = pointToCanvas(x * 4, y * 4, 28);
    commands.push(`${commands.length === 0 ? "M" : "L"} ${point.x} ${point.y}`);
  }
  elements.push(`<path class="curve-line" d="${commands.join(" ")}" />`);
  const point = pointToCanvas(drawing.x * 4, drawing.y * 4, 28);
  elements.push(`<line class="vector-a" x1="${CENTER}" y1="${CENTER}" x2="${point.x}" y2="${point.y}" marker-end="url(#marker-a)" />`);
  elements.push(`<circle class="highlight-dot" cx="${point.x}" cy="${point.y}" r="5" />`);
  elements.push(`<text class="label-text" x="${point.x + 10}" y="${point.y - 10}">r(t)</text>`);
  return elements.join("");
}

function descentScene(drawing) {
  const elements = baseGrid(28);
  elements.push(defsBlock());
  elements.push(
    `<path class="curve-line" d="${linePath((x) => 0.18 * x * x - 0.8 * x + 1.2, -4, 8, 0.1)}" />`
  );
  const current = pointToCanvas(drawing.x0, drawing.y0);
  const next = pointToCanvas(drawing.nextX, drawing.nextY);
  elements.push(`<circle class="point-b" cx="${current.x}" cy="${current.y}" r="5" />`);
  elements.push(`<circle class="highlight-dot" cx="${next.x}" cy="${next.y}" r="5" />`);
  elements.push(`<line class="gradient-line" x1="${current.x}" y1="${current.y}" x2="${next.x}" y2="${next.y}" marker-end="url(#marker-a)" />`);
  elements.push(`<text class="label-text" x="${current.x + 10}" y="${current.y - 10}">current</text>`);
  elements.push(`<text class="label-text" x="${next.x + 10}" y="${next.y - 10}">next</text>`);
  return elements.join("");
}

function sigmoidScene(drawing) {
  const left = 60;
  const bottom = 340;
  const width = 300;
  const height = 260;
  const toX = (x) => left + ((x + 6) / 12) * width;
  const toY = (y) => bottom - y * height;
  const commands = [];
  for (let z = -6; z <= 6.001; z += 0.1) {
    const p = 1 / (1 + Math.exp(-z));
    commands.push(`${commands.length === 0 ? "M" : "L"} ${toX(z)} ${toY(p)}`);
  }
  const pointX = toX(drawing.z);
  const pointY = toY(drawing.p);
  return `
    <svg viewBox="0 0 420 420" aria-label="Sigmoid curve">
      <rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />
      <line class="axis-line" x1="${left}" y1="${bottom}" x2="${left + width}" y2="${bottom}" />
      <line class="axis-line" x1="${left}" y1="${bottom}" x2="${left}" y2="${bottom - height}" />
      <path class="curve-line" d="${commands.join(" ")}" />
      <circle class="highlight-dot" cx="${pointX}" cy="${pointY}" r="5" />
      <line class="helper-line" x1="${pointX}" y1="${pointY}" x2="${pointX}" y2="${bottom}" />
      <text class="label-text" x="${pointX + 8}" y="${pointY - 10}">p ≈ ${formatNumber(drawing.p)}</text>
    </svg>
  `;
}

function networkScene(drawing) {
  return `
    <svg viewBox="0 0 420 420" aria-label="Neural unit diagram">
      <rect class="chart-bg" x="40" y="40" width="340" height="320" rx="22" />
      <circle class="point-b" cx="100" cy="150" r="24" />
      <circle class="point-b" cx="100" cy="250" r="24" />
      <circle class="highlight-dot" cx="300" cy="200" r="32" />
      <line class="gradient-line" x1="124" y1="150" x2="268" y2="188" />
      <line class="gradient-line" x1="124" y1="250" x2="268" y2="212" />
      <text class="label-text" x="84" y="156">x1</text>
      <text class="label-text" x="84" y="256">x2</text>
      <text class="label-text" x="287" y="206">a</text>
      <text class="label-text" x="150" y="146">w1 = ${formatNumber(drawing.w1)}</text>
      <text class="label-text" x="150" y="244">w2 = ${formatNumber(drawing.w2)}</text>
      <text class="label-text" x="68" y="315">z = ${formatNumber(drawing.z)} | ReLU(z) = ${formatNumber(drawing.a)}</text>
    </svg>
  `;
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
  if (drawing.type === "matrixTypes") {
    return matrixTypesScene();
  }
  if (drawing.type === "basis") {
    return basisScene(drawing);
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
  if (drawing.type === "discreteRV") {
    return discreteRvScene(drawing);
  }
  if (drawing.type === "mean") {
    return meanScene(drawing);
  }
  if (drawing.type === "regression") {
    return regressionScene(drawing);
  }
  if (drawing.type === "bayes") {
    return bayesScene(drawing);
  }
  if (drawing.type === "distribution") {
    return distributionScene(drawing);
  }
  if (drawing.type === "binomial") {
    return binomialScene(drawing);
  }
  if (drawing.type === "pca") {
    return pcaScene(drawing);
  }
  if (drawing.type === "decomposition") {
    return decompositionScene(drawing);
  }
  if (drawing.type === "parametric") {
    return parametricScene(drawing);
  }
  if (drawing.type === "descent") {
    return descentScene(drawing);
  }
  if (drawing.type === "sigmoid") {
    return sigmoidScene(drawing);
  }
  if (drawing.type === "network") {
    return networkScene(drawing);
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
