import React, { useState } from "react";
import { ExplorerShell, number, useMeasuredWidth } from "./BridgeExplorers.jsx";

export function SampleSpaceExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [selected, setSelected] = useState([2, 4, 6]);
  const toggle = (outcome) => setSelected((current) => current.includes(outcome) ? current.filter((item) => item !== outcome) : [...current, outcome].sort());
  return <ExplorerShell label="sample-space" title="Build an event from all possible outcomes" value={`P(A) = ${selected.length}/6`} rootRef={rootRef} reading={<><p><strong>Sample space S:</strong> all six possible die results.</p><p><strong>Event A:</strong> {'{'}{selected.join(", ")}{'}'} contains {selected.length} of those outcomes.</p></>}>
    <div className="outcome-grid" aria-label="Die sample space">{[1,2,3,4,5,6].map((outcome) => <button type="button" aria-pressed={selected.includes(outcome)} onClick={() => toggle(outcome)} key={outcome}><span>{outcome}</span><small>{selected.includes(outcome) ? "in event A" : "outside A"}</small></button>)}</div>
  </ExplorerShell>;
}

export function SetOverlapExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [onlyA, setOnlyA] = useState(3), [both, setBoth] = useState(2), [onlyB, setOnlyB] = useState(4);
  const countA = onlyA + both, countB = onlyB + both, union = onlyA + both + onlyB;
  return <ExplorerShell label="set-overlap" title="Count the overlap only once" value={`|A ∪ B| = ${union}`} rootRef={rootRef} reading={<><p><strong>Add:</strong> |A| + |B| = {countA} + {countB} = {countA + countB}.</p><p><strong>Correct:</strong> subtract the shared {both} once, giving {union} distinct outcomes.</p></>}>
    <div className="slope-controls three-controls"><label><span>Only A <strong>{onlyA}</strong></span><input aria-label="Only set A" type="range" min="0" max="6" value={onlyA} onChange={(e)=>setOnlyA(Number(e.target.value))} /></label><label><span>Both A and B <strong>{both}</strong></span><input aria-label="Set overlap" type="range" min="0" max="6" value={both} onChange={(e)=>setBoth(Number(e.target.value))} /></label><label><span>Only B <strong>{onlyB}</strong></span><input aria-label="Only set B" type="range" min="0" max="6" value={onlyB} onChange={(e)=>setOnlyB(Number(e.target.value))} /></label></div>
    <div className="venn-visual" role="img" aria-label={`Set A has ${countA}, set B has ${countB}, overlap ${both}`}><div className="venn-a"><span>{onlyA}</span></div><div className="venn-overlap"><span>{both}</span></div><div className="venn-b"><span>{onlyB}</span></div></div>
  </ExplorerShell>;
}

export function ProbabilityRuleExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [probability, setProbability] = useState(0.3), complement = 1 - probability;
  return <ExplorerShell label="probability-rule" title="Split the whole into A and not A" value={`P(not A) = ${number(complement)}`} rootRef={rootRef} reading={<><p><strong>Event A:</strong> takes {Math.round(probability * 100)}% of all probability.</p><p><strong>Everything else:</strong> 100% − {Math.round(probability * 100)}% = {Math.round(complement * 100)}%.</p></>}>
    <div className="slope-controls one-control"><label><span>Probability P(A) <strong>{number(probability)}</strong></span><input aria-label="Event probability" type="range" min="0" max="1" step="0.05" value={probability} onChange={(e)=>setProbability(Number(e.target.value))} /></label></div>
    <div className="probability-bar" role="img" aria-label={`${Math.round(probability*100)} percent event A and ${Math.round(complement*100)} percent not A`}><div style={{width:`${probability*100}%`}}>A</div><div style={{width:`${complement*100}%`}}>not A</div></div>
  </ExplorerShell>;
}

export function ConditionalExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [groupB, setGroupB] = useState(20), [both, setBoth] = useState(12);
  const safeBoth = Math.min(both, groupB), result = groupB ? safeBoth / groupB : 0;
  const changeGroup = (value) => { setGroupB(value); setBoth((current) => Math.min(current, value)); };
  return <ExplorerShell label="conditional" title="Conditioning changes the denominator" value={`P(A | B) = ${safeBoth}/${groupB} = ${number(result)}`} rootRef={rootRef} reading={<><p><strong>Before “given B”:</strong> the full population contains 100 cases.</p><p><strong>After “given B”:</strong> keep only {groupB} B-cases; {safeBoth} of them also belong to A.</p></>}>
    <div className="slope-controls two-controls"><label><span>Cases in B <strong>{groupB}</strong></span><input aria-label="Conditional group size" type="range" min="5" max="100" step="5" value={groupB} onChange={(e)=>changeGroup(Number(e.target.value))} /></label><label><span>Cases in A and B <strong>{safeBoth}</strong></span><input aria-label="Conditional shared cases" type="range" min="0" max={groupB} step="1" value={safeBoth} onChange={(e)=>setBoth(Number(e.target.value))} /></label></div>
    <div className="conditioning-visual"><div><span>All cases</span><i style={{width:"100%"}} /></div><div><span>Keep B</span><i style={{width:`${groupB}%`}} /></div><div><span>A within B</span><i className="warm" style={{width:`${safeBoth}%`}} /></div></div>
  </ExplorerShell>;
}

export function BayesExplorer() {
  const [rootRef] = useMeasuredWidth();
  const [prior, setPrior] = useState(10), [sensitivity, setSensitivity] = useState(80), [falsePositiveRate, setFalsePositiveRate] = useState(10);
  const trueCases = prior * 10, otherCases = 1000 - trueCases, truePositives = trueCases * sensitivity / 100, falsePositives = otherCases * falsePositiveRate / 100;
  const positives = truePositives + falsePositives, posterior = positives ? truePositives / positives : 0;
  return <ExplorerShell label="bayes" title="Update a prior after positive evidence" value={`P(cause | positive) = ${Math.round(posterior * 100)}%`} rootRef={rootRef} reading={<><p><strong>Out of 1,000:</strong> about {number(truePositives)} true cases test positive and {number(falsePositives)} other cases also test positive.</p><p><strong>Among positives:</strong> {number(truePositives)} of {number(positives)} come from the true cause, giving {Math.round(posterior*100)}%.</p></>}>
    <div className="slope-controls three-controls"><label><span>Prior rate <strong>{prior}%</strong></span><input aria-label="Bayes prior" type="range" min="1" max="50" value={prior} onChange={(e)=>setPrior(Number(e.target.value))} /></label><label><span>True-positive rate <strong>{sensitivity}%</strong></span><input aria-label="Bayes sensitivity" type="range" min="50" max="100" step="5" value={sensitivity} onChange={(e)=>setSensitivity(Number(e.target.value))} /></label><label><span>False-positive rate <strong>{falsePositiveRate}%</strong></span><input aria-label="Bayes false positive rate" type="range" min="1" max="30" value={falsePositiveRate} onChange={(e)=>setFalsePositiveRate(Number(e.target.value))} /></label></div>
    <div className="bayes-counts" role="img" aria-label={`${number(truePositives)} true positives and ${number(falsePositives)} false positives`}><div style={{flex:truePositives}}><strong>{number(truePositives)}</strong><span>true positives</span></div><div style={{flex:falsePositives}}><strong>{number(falsePositives)}</strong><span>false positives</span></div></div>
  </ExplorerShell>;
}
