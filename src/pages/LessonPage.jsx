import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Assessment from "../components/Assessment.jsx";
import FormulaCard from "../components/FormulaCard.jsx";
import RevealProblems from "../components/RevealProblems.jsx";
import PythonPlayground from "../PythonPlayground.jsx";
import { chapterById, formulaById, lessonById, projectById } from "../content/index.js";
import { LEVELS } from "../content/schema.js";
import { useMastery } from "../state/mastery.js";

function NotebookLab({ lab }) {
  const colabUrl = `https://colab.research.google.com/github/antorappai/ml-ai-math/blob/main/${lab.notebookPath}`;
  return <article className="notebook-lab"><p className="eyebrow">PyTorch notebook</p><h3>{lab.title}</h3><p>{lab.goal}</p><pre><code>{lab.code}</code></pre><h4>Expected output</h4><pre className="expected-output"><code>{lab.output}</code></pre><p>{lab.explanation}</p><a className="button" href={colabUrl} target="_blank" rel="noreferrer">Open prepared notebook in Colab ↗</a></article>;
}

function LessonHeader({ lesson, chapter, mode, hasPython }) {
  return <>
    <div className="lesson-breadcrumb"><Link to={`/chapters/${chapter.id}`}>{chapter.shortTitle}</Link><span>/</span><span>{lesson.title}</span></div>
    <header className="lesson-hero simple-lesson-hero"><div><p className="eyebrow">Lesson {lesson.order}</p><h1>{lesson.title}</h1><p>{lesson.subtitle}</p></div></header>
    <nav className="lesson-view-links" aria-label="Lesson pages">
      <Link className={mode === "study" ? "active" : ""} to={`/lessons/${lesson.id}/study`}>Study guide</Link>
      <Link className={mode === "practice" ? "active" : ""} to={`/lessons/${lesson.id}/practice`}>Practice & exam</Link>
      {hasPython && <Link className={mode === "python" ? "active" : ""} to={`/lessons/${lesson.id}/python`}>Python lab</Link>}
    </nav>
  </>;
}

function WorkedExample({ example }) {
  if (!example) return null;
  return <article className="worked-example inline-worked-example"><p className="eyebrow">Worked example</p><h3>{example.title}</h3><p className="example-prompt">{example.prompt}</p><ol>{example.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="answer-block"><strong>Answer</strong><span>{example.answer}</span></div><p><strong>Interpretation:</strong> {example.interpretation}</p></article>;
}

function StudyGuide({ lesson, mastery, completeLesson }) {
  const basics = lesson.levels.basics;
  const vocabulary = lesson.vocabulary || basics.vocabulary || [];
  const formulaIds = [...new Set(LEVELS.flatMap((level) => lesson.levels[level].formulaIds || []))];
  const formulas = formulaIds.map((id) => formulaById[id]).filter(Boolean);
  const misconceptions = basics.misconceptions || [];
  const complete = LEVELS.every((level) => mastery.completedLevels[lesson.id]?.[level]);
  const explanationSections = LEVELS.flatMap((level) => {
    const content = lesson.levels[level];
    return content.explanationSections || (content.concepts || []).map((body, index) => ({ heading: `Key idea ${index + 1}`, body }));
  });
  const examples = LEVELS.flatMap((level) => {
    const content = lesson.levels[level];
    return content.workedExamples || (content.example ? [content.example] : []);
  });

  return <div className="study-guide">
    <section className="lesson-opening">
      <p className="eyebrow">Real-world example</p>
      <h2>{basics.realWorldScenario?.title || lesson.scenario.title}</h2>
      <p>{basics.realWorldScenario?.body || lesson.scenario.body}</p>
      <div className="ml-bridge"><strong>How the same idea appears in ML</strong><p>{basics.mlScenario?.body || lesson.scenario.mlParallel || lesson.mlConnection}</p></div>
    </section>

    {vocabulary.length > 0 && <section className="simple-vocabulary"><p className="eyebrow">Know these words first</p><h2>Vocabulary</h2>{vocabulary.map((term) => <article className="simple-term" key={term.id}><h3>{term.name}</h3><p>{term.definition}</p><p><strong>Think of it like:</strong> {term.analogy}</p><p><strong>Example:</strong> {term.example}</p><p><strong>Not an example:</strong> {term.nonExample}</p></article>)}</section>}

    <section className="lesson-explanation">
      <header className="plain-section-heading"><p className="eyebrow">Understand the idea</p><h2>Build the concept step by step</h2><p>Read each part in order. The examples become more useful as the idea builds.</p></header>
      <div className="explanation-flow">{explanationSections.map((section, index) => <article key={`${index}-${section.heading}`}><h3>{section.heading}</h3><p>{section.body}</p></article>)}</div>
      <div className="worked-example-stack">{examples.map((example) => <WorkedExample example={example} key={example.title} />)}</div>
    </section>

    {formulas.length > 0 && <section className="study-formulas"><header className="plain-section-heading"><p className="eyebrow">Formal notation</p><h2>The math for this lesson</h2><p>Read the formula, decode each symbol, then connect it to the worked examples above.</p></header><div className="formula-stack">{formulas.map((formula, index) => <FormulaCard formula={formula} compact={index > 0} key={formula.id} />)}</div></section>}

    {misconceptions.length > 0 && <section className="simple-mistakes"><p className="eyebrow">Common mistakes</p>{misconceptions.map((item) => <article key={item.wrong}><p><strong>Do not think:</strong> {item.wrong}</p><p><strong>Correct idea:</strong> {item.correction}</p></article>)}</section>}

    <div className="lesson-complete-row"><div><strong>{complete ? "Lesson completed" : "Ready to move on?"}</strong><p>{complete ? "You can return to practice whenever you need a refresher." : "Mark this lesson complete when you can explain the main example in your own words."}</p></div><button type="button" onClick={() => completeLesson(lesson.id)}>{complete ? "Completed ✓" : "Mark lesson complete"}</button></div>
    <div className="study-next-actions"><Link className="button" to={`/lessons/${lesson.id}/practice`}>Start practice questions</Link>{LEVELS.some((level) => lesson.levels[level].pythonLab) && <Link className="button secondary" to={`/lessons/${lesson.id}/python`}>Open Python lab</Link>}</div>
  </div>;
}

function PracticeView({ lesson }) {
  const questions = LEVELS.flatMap((level) => lesson.levels[level].questions || []);
  const calculationProblems = LEVELS.flatMap((level) => lesson.levels[level].calculationProblems || []);
  const examQuestions = LEVELS.flatMap((level) => lesson.levels[level].examQuestions || []);
  return <div className="practice-guide"><header className="plain-section-heading"><p className="eyebrow">Practice & exam preparation</p><h2>Test the whole lesson</h2><p>Attempt each question before revealing the solution. Use the explanation to correct your thinking, not only the final number.</p></header>
    <Assessment questions={questions} testId={`${lesson.id}-practice`} title="Quick checks" />
    <RevealProblems problems={calculationProblems} title="Calculation and interpretation" />
    <RevealProblems problems={examQuestions} title="Exam-style questions" />
    {lesson.projectIds.length > 0 && <div className="linked-projects"><h3>Apply this in a project</h3>{lesson.projectIds.map((id) => <Link to="/projects" key={id}>{projectById[id]?.title}</Link>)}</div>}
  </div>;
}

function PythonView({ lesson, completePython }) {
  const seen = new Set();
  const labs = LEVELS.flatMap((level) => {
    const lab = lesson.levels[level].pythonLab;
    if (!lab) return [];
    const key = `${lab.runtime}-${lab.notebookPath || ""}-${lab.code}`;
    if (seen.has(key)) return [];
    seen.add(key);
    return [{ level, lab }];
  });
  if (!labs.length) return <Navigate to={`/lessons/${lesson.id}/study`} replace />;

  return <div className="python-guide"><header className="plain-section-heading"><p className="eyebrow">Python companion</p><h2>Turn this lesson into code</h2><p>Each code line corresponds to a mathematical step from the study guide.</p></header>{labs.map(({ level, lab }) => <section className="python-section" key={`${level}-${lab.title}`}><header className="content-intro"><h2>{lab.title}</h2><p>{lab.goal}</p><div className="code-connection"><strong>Read the code mathematically</strong><span>{lab.explanation}</span></div></header>{lab.runtime === "notebook" ? <NotebookLab lab={lab} /> : <PythonPlayground lessonKey={`${lesson.id}-${level}`} initialCode={lab.code} expectedOutput={lab.output} packages={lab.packages} hiddenTests={lab.hiddenTests} onComplete={() => completePython(`${lesson.id}-${level}`)} />}</section>)}</div>;
}

export default function LessonPage() {
  const { lessonId, level: view = "study" } = useParams();
  const lesson = lessonById[lessonId];
  const { mastery, visit, completeLesson, completePython } = useMastery();
  const mode = view === "practice" || view === "python" ? view : "study";

  useEffect(() => {
    if (!lesson) return;
    visit(lesson.id, "study");
  }, [lesson?.id]);

  if (!lesson) return <Navigate to="/dashboard" replace />;
  const chapter = chapterById[lesson.chapterId];
  const hasPython = LEVELS.some((level) => lesson.levels[level].pythonLab);

  return <div className="page lesson-page simple-lesson-page">
    <LessonHeader lesson={lesson} chapter={chapter} mode={mode} hasPython={hasPython} />
    {lesson.prerequisites.length > 0 && <aside className="prerequisite-strip"><strong>Study first</strong>{lesson.prerequisites.map((id) => <Link to={`/lessons/${id}/study`} key={id}>{lessonById[id]?.title || id}</Link>)}</aside>}
    {mode === "study" && <StudyGuide lesson={lesson} mastery={mastery} completeLesson={completeLesson} />}
    {mode === "practice" && <PracticeView lesson={lesson} />}
    {mode === "python" && <PythonView lesson={lesson} completePython={completePython} />}
  </div>;
}
