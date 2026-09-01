import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Assessment from "../components/Assessment.jsx";
import FormulaCard from "../components/FormulaCard.jsx";
import RevealProblems from "../components/RevealProblems.jsx";
import PythonPlayground from "../PythonPlayground.jsx";
import { chapterById, formulaById, lessonById, projectById } from "../content/index.js";
import { LEVELS } from "../content/schema.js";
import { useMastery } from "../state/mastery.js";

const tabs = ["Learn", "Worked example", "Formal math", "Python", "Practice", "Exam prep"];

function NotebookLab({ lab }) {
  const colabUrl = `https://colab.research.google.com/github/antorappai/ml-ai-math/blob/main/${lab.notebookPath}`;
  return <article className="notebook-lab"><p className="eyebrow">PyTorch notebook</p><h3>{lab.title}</h3><p>{lab.goal}</p><pre><code>{lab.code}</code></pre><h4>Expected output</h4><pre className="expected-output"><code>{lab.output}</code></pre><p>{lab.explanation}</p><a className="button" href={colabUrl} target="_blank" rel="noreferrer">Open prepared notebook in Colab ↗</a></article>;
}

export default function LessonPage() {
  const { lessonId, level: levelKey } = useParams();
  const lesson = lessonById[lessonId];
  const navigate = useNavigate();
  const [tab, setTab] = useState("Learn");
  const { mastery, visit, completeLevel, completePython } = useMastery();

  useEffect(() => {
    if (lesson && LEVELS.includes(levelKey)) visit(lesson.id, levelKey);
  }, [lesson?.id, levelKey]);

  if (!lesson) return <Navigate to="/dashboard" replace />;
  if (!LEVELS.includes(levelKey)) return <Navigate to={`/lessons/${lesson.id}/basics`} replace />;
  const content = lesson.levels[levelKey];
  const chapter = chapterById[lesson.chapterId];
  const formulas = content.formulaIds.map((id) => formulaById[id]).filter(Boolean);
  const lab = content.pythonLab;
  const completed = mastery.completedLevels[lesson.id]?.[levelKey];
  const nextLevel = LEVELS[LEVELS.indexOf(levelKey) + 1];

  function markComplete() {
    completeLevel(lesson.id, levelKey);
    if (nextLevel) navigate(`/lessons/${lesson.id}/${nextLevel}`);
  }

  return (
    <div className="page lesson-page">
      <div className="lesson-breadcrumb"><Link to={`/chapters/${chapter.id}`}>{chapter.shortTitle}</Link><span>/</span><span>{lesson.title}</span></div>
      <header className="lesson-hero">
        <div><p className="eyebrow">{levelKey} · Lesson {lesson.order}</p><h1>{lesson.title}</h1><p>{lesson.subtitle}</p></div>
        <div className="level-switch" aria-label="Lesson level">{LEVELS.map((level) => <Link className={level === levelKey ? "active" : mastery.completedLevels[lesson.id]?.[level] ? "done" : ""} to={`/lessons/${lesson.id}/${level}`} key={level}>{level}</Link>)}</div>
      </header>

      {lesson.prerequisites.length > 0 && <aside className="prerequisite-strip"><strong>Prerequisites</strong>{lesson.prerequisites.map((id) => <Link to={`/lessons/${id}/basics`} key={id}>{lessonById[id]?.title || id}</Link>)}</aside>}

      <div className="lesson-tabs" role="tablist">{tabs.filter((item) => (item !== "Python" || lab) && (item !== "Formal math" || formulas.length)).map((item) => <button type="button" role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div>

      {tab === "Learn" && <div className="lesson-content-grid">
        <article className="scenario-card"><p className="eyebrow">Ordinary-life scenario</p><h2>{content.realWorldScenario?.title || lesson.scenario.title}</h2><p>{content.realWorldScenario?.body || lesson.scenario.body}</p><div className="ml-bridge"><strong>ML parallel</strong><p>{content.mlScenario?.body || lesson.scenario.mlParallel}</p></div></article>
        <article className="concept-card"><p className="eyebrow">What you will be able to do</p><h2>{content.summary}</h2><ul>{(content.objectives || content.concepts).map((concept) => <li key={concept}>{concept}</li>)}</ul></article>
        {content.vocabulary?.length > 0 && <section className="vocabulary-section"><p className="eyebrow">Words defined before use</p><h2>Vocabulary decoder</h2><div className="vocabulary-grid">{content.vocabulary.map((term) => <article className="term-card" key={term.id}><h3>{term.name}</h3><p>{term.definition}</p><dl><dt>Think of it like</dt><dd>{term.analogy}</dd><dt>Example</dt><dd>{term.example}</dd><dt>Not an example</dt><dd>{term.nonExample}</dd></dl></article>)}</div></section>}
        {content.explanationSections?.map((section) => <article className="explanation-card" key={section.heading}><p className="eyebrow">Guided explanation</p><h2>{section.heading}</h2><p>{section.body}</p></article>)}
        {content.misconceptions?.length > 0 && <article className="misconception-card"><p className="eyebrow">Common confusion</p>{content.misconceptions.map((item) => <div key={item.wrong}><p><strong>Incorrect:</strong> {item.wrong}</p><p><strong>Correct:</strong> {item.correction}</p></div>)}</article>}
        <article className="ml-connection"><p className="eyebrow light">Why ML cares</p><p>{lesson.mlConnection}</p></article>
      </div>}

      {tab === "Worked example" && <section className="worked-example-list">{(content.workedExamples || [content.example]).map((example) => <article className="worked-example" key={example.title}><p className="eyebrow">Worked example</p><h2>{example.title}</h2><p className="example-prompt">{example.prompt}</p><ol>{example.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="answer-block"><strong>Answer</strong><span>{example.answer}</span></div><p><strong>Interpretation:</strong> {example.interpretation}</p></article>)}</section>}

      {tab === "Formal math" && <section className="formula-stack"><header className="content-intro"><p className="eyebrow">Math behind this topic</p><h2>{formulas.length === 1 ? "One formal idea to own" : `${formulas.length} connected formulas`}</h2><p>The first card is the main notation for this level. Supporting cards appear only when they are required to understand the same topic. Every symbol is decoded directly beside its formula.</p></header>{formulas.map((formula, index) => <FormulaCard formula={formula} compact={index > 0} key={formula.id} />)}</section>}

      {tab === "Python" && lab && <section className="python-section"><header className="content-intro"><p className="eyebrow">Math → code</p><h2>{lab.title}</h2><p>{lab.goal}</p><div className="code-connection"><strong>Read the code mathematically</strong><span>{lab.explanation}</span></div></header>{lab.runtime === "notebook" ? <NotebookLab lab={lab} /> : <PythonPlayground lessonKey={`${lesson.id}-${levelKey}`} initialCode={lab.code} expectedOutput={lab.output} packages={lab.packages} hiddenTests={lab.hiddenTests} onComplete={() => completePython(`${lesson.id}-${levelKey}`)} />}</section>}

      {tab === "Practice" && <section><Assessment questions={content.questions} testId={`${lesson.id}-${levelKey}-practice`} title={`${content.title} quick check`} /><RevealProblems problems={content.calculationProblems} title="Calculation and interpretation practice" /></section>}

      {tab === "Exam prep" && <section className="exam-section"><article className="exam-card"><p className="eyebrow">Exam method</p><h2>What to show in your working</h2><ol>{content.examNotes.map((note) => <li key={note}>{note}</li>)}</ol></article><Assessment questions={content.questions} testId={`${lesson.id}-${levelKey}-exam`} title="Exam-style check" /><RevealProblems problems={content.examQuestions} title="Exam questions with marking steps" />{lesson.projectIds.length > 0 && <div className="linked-projects"><h3>Apply this in a project</h3>{lesson.projectIds.map((id) => <Link to="/projects" key={id}>{projectById[id]?.title}</Link>)}</div>}</section>}

      <div className="lesson-completion"><div><strong>{completed ? "Level complete" : "Ready to record this level?"}</strong><span>{completed ? "Your progress is saved in this browser." : "Complete the lesson after you can explain the example and pass the quick check."}</span></div><button type="button" onClick={markComplete}>{completed ? nextLevel ? `Continue to ${nextLevel}` : "Review complete" : nextLevel ? `Complete and open ${nextLevel}` : "Complete level"}</button></div>
    </div>
  );
}
