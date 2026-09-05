import React, { useState } from "react";
import { ExplorerShell, number, useMeasuredWidth } from "./BridgeExplorers.jsx";

const PMF = [0.2, 0.5, 0.3];

export function RandomVariableExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [mode, setMode] = useState("heads");
  const outcomes = ["HH", "HT", "TH", "TT"];
  const value = (item) => mode === "heads" ? [...item].filter((x)=>x==="H").length : item === "HH" || item === "TT" ? 1 : 0;
  return <ExplorerShell label="random-variable" title="Map outcomes to useful numbers" value={mode === "heads" ? "X = number of heads" : "X = matching flips"} rootRef={rootRef} reading={<><p><strong>Outcomes:</strong> HH, HT, TH, and TT remain the uncertain results.</p><p><strong>Random variable:</strong> the rule turns each result into a number; different outcomes may share a value.</p></>}><div className="explorer-choice"><button type="button" aria-pressed={mode === "heads"} onClick={()=>setMode("heads")}>Count heads</button><button type="button" aria-pressed={mode === "match"} onClick={()=>setMode("match")}>Do flips match?</button></div><div className="mapping-grid">{outcomes.map((item)=><div key={item}><strong>{item}</strong><span>→</span><b>{value(item)}</b></div>)}</div></ExplorerShell>;
}

export function PmfExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [p0, setP0] = useState(.2), [p1, setP1] = useState(.5);
  const safeP1 = Math.min(p1, 1-p0), values = [p0, safeP1, 1-p0-safeP1];
  return <ExplorerShell label="pmf" title="Move probability mass between exact values" value={`total = ${number(values.reduce((a,b)=>a+b,0))}`} rootRef={rootRef} reading={<><p><strong>Each bar:</strong> gives P(X = x) for one exact value.</p><p><strong>Valid PMF:</strong> every bar is non-negative and together they total one.</p></>}><div className="slope-controls two-controls"><label><span>P(X=0) <strong>{number(p0)}</strong></span><input aria-label="PMF probability zero" type="range" min="0" max="1" step=".1" value={p0} onChange={(e)=>{const v=Number(e.target.value);setP0(v);setP1((x)=>Math.min(x,1-v));}} /></label><label><span>P(X=1) <strong>{number(safeP1)}</strong></span><input aria-label="PMF probability one" type="range" min="0" max={1-p0} step=".1" value={safeP1} onChange={(e)=>setP1(Number(e.target.value))} /></label></div><BarDistribution values={values} /></ExplorerShell>;
}

function BarDistribution({ values, cumulative = false }) {
  const shown = cumulative ? values.map((_,i)=>values.slice(0,i+1).reduce((a,b)=>a+b,0)) : values;
  return <div className="distribution-bars" role="img" aria-label={`${cumulative ? "Cumulative" : "Probability"} bars ${shown.map(number).join(", ")}`}>{shown.map((value,index)=><div key={index}><span style={{height:`${value*150}px`}}><i>{number(value)}</i></span><b>{index}</b></div>)}</div>;
}

export function PdfExplorer() {
  const [rootRef, width] = useMeasuredWidth();
  const [a, setA] = useState(1), [b, setB] = useState(3), left=45, right=20, height=240, base=190, sx=(x)=>left+x/4*(width-left-right);
  const low=Math.min(a,b), high=Math.max(a,b), probability=(high-low)/4;
  return <ExplorerShell label="pdf" title="Probability is area across an interval" value={`P(${low} ≤ X ≤ ${high}) = ${number(probability)}`} rootRef={rootRef} reading={<><p><strong>Density:</strong> height is 1/4 from 0 to 4 minutes.</p><p><strong>Area:</strong> width {high-low} × height 1/4 = {number(probability)} probability.</p></>}><div className="slope-controls two-controls"><label><span>Start a <strong>{a}</strong></span><input aria-label="PDF interval start" type="range" min="0" max="4" step=".5" value={a} onChange={(e)=>setA(Number(e.target.value))} /></label><label><span>End b <strong>{b}</strong></span><input aria-label="PDF interval end" type="range" min="0" max="4" step=".5" value={b} onChange={(e)=>setB(Number(e.target.value))} /></label></div><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Uniform density with selected probability ${number(probability)}`}><rect className="graph-frame" x={left} y="20" width={width-left-right} height="170" /><rect className="density-all" x={sx(0)} y="70" width={sx(4)-sx(0)} height="120" /><rect className="density-selected" x={sx(low)} y="70" width={sx(high)-sx(low)} height="120" /><line className="graph-axis" x1={left} x2={width-right} y1={base} y2={base} /><text className="graph-axis-title" x={width-right} y="220" textAnchor="end">waiting time</text></svg></ExplorerShell>;
}

export function CdfExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [cutoff, setCutoff] = useState(1), cumulative=PMF.slice(0,cutoff+1).reduce((a,b)=>a+b,0);
  return <ExplorerShell label="cdf" title="Move the cutoff and accumulate everything to its left" value={`F(${cutoff}) = ${number(cumulative)}`} rootRef={rootRef} reading={<><p><strong>Cutoff:</strong> X ≤ {cutoff} includes values {Array.from({length:cutoff+1},(_,i)=>i).join(", ")}.</p><p><strong>Running total:</strong> their probability masses add to {number(cumulative)}.</p></>}><div className="explorer-choice">{[0,1,2].map((x)=><button type="button" aria-pressed={cutoff===x} onClick={()=>setCutoff(x)} key={x}>Cutoff {x}</button>)}</div><BarDistribution values={PMF} cumulative /></ExplorerShell>;
}

export function ExpectedValueExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [winChance,setWinChance]=useState(.2), expectation=10*winChance-3*(1-winChance);
  return <ExplorerShell label="expected" title="Weight each outcome by how often it occurs" value={`E[X] = ${number(expectation)}`} rootRef={rootRef} reading={<><p><strong>Win part:</strong> 10 × {number(winChance)} = {number(10*winChance)}.</p><p><strong>Loss part:</strong> −3 × {number(1-winChance)} = {number(-3*(1-winChance))}; add both parts for the long-run average.</p></>}><div className="slope-controls one-control"><label><span>Chance of winning 10 <strong>{Math.round(winChance*100)}%</strong></span><input aria-label="Expected value win probability" type="range" min="0" max="1" step=".05" value={winChance} onChange={(e)=>setWinChance(Number(e.target.value))} /></label></div><div className="number-line" role="img" aria-label={`Expected value ${number(expectation)}`}><i style={{left:`${((expectation+3)/13)*100}%`}} /><span>−3</span><span>long-run center</span><span>10</span></div></ExplorerShell>;
}

export function VarianceExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [spread,setSpread]=useState(2), values=[5-spread,5,5+spread], variance=2*spread*spread/3;
  return <ExplorerShell label="variance" title="Move values away from the mean and watch spread grow" value={`variance = ${number(variance)}`} rootRef={rootRef} reading={<><p><strong>Values:</strong> [{values.join(", ")}] keep the same mean of 5.</p><p><strong>Spread:</strong> squared distances are {spread*spread}, 0, and {spread*spread}; their average is {number(variance)}.</p></>}><div className="slope-controls one-control"><label><span>Distance from mean <strong>{spread}</strong></span><input aria-label="Variance spread" type="range" min="0" max="5" step="1" value={spread} onChange={(e)=>setSpread(Number(e.target.value))} /></label></div><div className="spread-line" role="img" aria-label={`Values ${values.join(", ")} around mean 5`}>{values.map((value,i)=><i style={{left:`${value*10}%`}} key={i}><b>{value}</b></i>)}<span style={{left:"50%"}}>mean 5</span></div></ExplorerShell>;
}

export function StandardDeviationExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [variance,setVariance]=useState(9), deviation=Math.sqrt(variance);
  return <ExplorerShell label="standard-deviation" title="Take the square root to return to familiar units" value={`standard deviation = ${number(deviation)}`} rootRef={rootRef} reading={<><p><strong>Variance:</strong> {variance} is measured in squared units.</p><p><strong>Standard deviation:</strong> √{variance} = {number(deviation)} in the original units.</p></>}><div className="slope-controls one-control"><label><span>Variance <strong>{variance}</strong></span><input aria-label="Variance for standard deviation" type="range" min="0" max="25" step="1" value={variance} onChange={(e)=>setVariance(Number(e.target.value))} /></label></div><div className="unit-conversion"><div><strong>{variance}</strong><span>squared units</span></div><b>√</b><div><strong>{number(deviation)}</strong><span>original units</span></div></div></ExplorerShell>;
}
