import React, { useDeferredValue, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FormulaCard from "../components/FormulaCard.jsx";
import { formulaList, lessons } from "../content/index.js";
import { lessonStart } from "../utils/lessonNavigation.js";
import { useMastery } from "../state/mastery.js";

function usesFormula(lesson, formulaId) {
  return Object.values(lesson.levels || {}).some((level) => level.formulaIds?.includes(formulaId));
}

export default function FormulaLibraryPage() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const query = useDeferredValue(search.toLowerCase());
  const { mastery, setFormulaConfidence } = useMastery();
  const focus = params.get("focus");
  const categories = ["All", ...new Set(formulaList.map((formula) => formula.category))];
  const relatedLessons = useMemo(() => Object.fromEntries(formulaList.map((formula) => [
    formula.id,
    lessons.filter((lesson) => usesFormula(lesson, formula.id)).slice(0, 5)
  ])), []);

  const filtered = formulaList.filter((formula) => {
    const searchable = [
      formula.label,
      formula.purpose,
      formula.id,
      formula.readAs,
      ...formula.symbols.flat(),
      ...formula.mistakes
    ].join(" ").toLowerCase();
    return (category === "All" || formula.category === category) && (!query || searchable.includes(query));
  });
  const ordered = focus ? [...filtered].sort((a, b) => a.id === focus ? -1 : b.id === focus ? 1 : 0) : filtered;

  return <div className="page library-page">
    <header className="page-title">
      <p className="eyebrow">Formula learning reference</p>
      <h1>Read the maths instead of memorising symbols</h1>
      <p>Use this page when a formula looks unfamiliar. First understand what problem it solves, then say it aloud, decode every symbol, put numbers into it, and finally calculate it.</p>
    </header>

    <section className="plain-section-heading">
      <p className="eyebrow">How to use a formula card</p>
      <h2>Meaning → symbols → example → calculation</h2>
      <p><strong>1.</strong> Ask what the formula is trying to measure. <strong>2.</strong> Name every symbol. <strong>3.</strong> Match the symbols to the tiny example. <strong>4.</strong> Follow the calculation steps. <strong>5.</strong> Check the common trap before using it in an exam or model.</p>
    </section>

    <div className="filter-bar">
      <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search gradient, variance, x, sigma, attention..." />
      <select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      <span>{ordered.length} formulas</span>
    </div>

    <div className="library-list">{ordered.map((formula) => <div className={focus === formula.id ? "focused-formula" : ""} key={formula.id}>
      <FormulaCard formula={formula} />
      {relatedLessons[formula.id]?.length > 0 && <div className="linked-projects">
        <h3>Where you meet this in the course</h3>
        <p>Open a lesson if you want the story and ML context before returning to the notation.</p>
        {relatedLessons[formula.id].map((lesson) => <Link to={lessonStart(lesson)} key={lesson.id}>{lesson.title}</Link>)}
      </div>}
      <div className="confidence-row">
        <span>Can I explain this formula in my own words?</span>
        {["learning", "practising", "confident"].map((value) => <button className={mastery.formulaConfidence[formula.id] === value ? "active" : ""} type="button" onClick={() => setFormulaConfidence(formula.id, value)} key={value}>{value}</button>)}
      </div>
    </div>)}</div>
  </div>;
}
