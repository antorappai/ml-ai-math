import React, { useDeferredValue, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormulaCard from "../components/FormulaCard.jsx";
import { formulaList } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

export default function FormulaLibraryPage() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const query = useDeferredValue(search.toLowerCase());
  const { mastery, setFormulaConfidence } = useMastery();
  const focus = params.get("focus");
  const categories = ["All", ...new Set(formulaList.map((formula) => formula.category))];
  const filtered = formulaList.filter((formula) => (category === "All" || formula.category === category) && (!query || `${formula.label} ${formula.purpose} ${formula.id}`.toLowerCase().includes(query)));
  const ordered = focus ? [...filtered].sort((a) => a.id === focus ? -1 : 1) : filtered;

  return <div className="page library-page"><header className="page-title"><p className="eyebrow">Searchable reference</p><h1>Formula Library</h1><p>Proper notation with read-aloud guidance, symbol decoding, assumptions, examples, signs, and mistakes.</p></header><div className="filter-bar"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search gradient, variance, attention..." /><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><span>{ordered.length} formulas</span></div><div className="library-list">{ordered.map((formula) => <div className={focus === formula.id ? "focused-formula" : ""} key={formula.id}><FormulaCard formula={formula} /><div className="confidence-row"><span>My confidence</span>{["learning", "practising", "confident"].map((value) => <button className={mastery.formulaConfidence[formula.id] === value ? "active" : ""} type="button" onClick={() => setFormulaConfidence(formula.id, value)} key={value}>{value}</button>)}</div></div>)}</div></div>;
}

