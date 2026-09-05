import LessonNavigation from "../components/LessonNavigation.jsx";
import { pythonExamples } from "../utils/lessonNavigation.js";
import { MathText } from "../components/Math.jsx";
import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Assessment from "../components/Assessment.jsx";
import FormulaCard from "../components/FormulaCard.jsx";
import RevealProblems from "../components/RevealProblems.jsx";
import PythonPlayground from "../PythonPlayground.jsx";
import GuidedLesson from "../components/GuidedLesson.jsx";
import { chapterById, formulaById, lessonById, projectById } from "../content/index.js";
import { LEVELS } from "../content/schema.js";
import { useMastery } from "../state/mastery.js";

function studyPath(lessonId) {
  return `/lessons/${lessonId}/${lessonById[lessonId]?.beginnerSteps?.length ? "start" : "study"}`;
}

function NotebookLab({ lab }) {
  const colabUrl = `https://colab.research.google.com/github/antorappai/ml-ai-math/blob/main/${lab.notebookPath}`;
  return <article className="notebook-lab"><p className="eyebrow">PyTorch notebook</p><h3>{lab.title}</h3><p>{lab.goal}</p><pre><code>{lab.code}</code></pre><h4>Expected output</h4><pre className="expected-output"><code>{lab.output}</code></pre><a className="button" href={colabUrl} target="_blank" rel="noreferrer">Open prepared notebook in Colab ↗</a></article>;
}

function LessonHeader({ lesson, chapter, mode }) {
  return <>
    <div className="lesson-breadcrumb"><Link to={`/chapters/${chapter.id}`}>{chapter.shortTitle}</Link><span>/</span><span>{lesson.title}</span></div>
    <header className="lesson-hero simple-lesson-hero"><div><p className="eyebrow">Lesson {lesson.order}</p><h1>{lesson.title}</h1><p>{lesson.subtitle}</p></div></header>
    <LessonNavigation lesson={lesson} mode={mode} />
  </>;
}

function WorkedExample({ example }) {
  if (!example) return null;
  return <article className="worked-example inline-worked-example"><p className="eyebrow">Worked example</p><h3>{example.title}</h3>
    {example.situation && <div className="example-story"><strong>In the real world: {example.situation.title}</strong><p>{example.situation.story}</p>{example.quantityMap?.map((item) => <p key={item.quantity}><strong>{item.quantity}:</strong> {item.meaning}</p>)}</div>}
    <p className="example-prompt"><MathText>{example.prompt}</MathText></p><ol>{example.steps.map((step) => <li key={step}><MathText>{step}</MathText></li>)}</ol><div className="answer-block"><strong>Answer</strong><span><MathText>{example.answer}</MathText></span></div><p><strong>What this means in the story:</strong> <MathText>{example.realWorldMeaning || example.interpretation}</MathText></p>{example.mlParallel && <div className="example-ml"><strong>ML parallel:</strong> <MathText>{example.mlParallel}</MathText></div>}</article>;
}

function StudyGuide({ lesson, mastery, completeLesson }) {
  const basics = lesson.levels.basics;
  const vocabulary = lesson.vocabulary || basics.vocabulary || [];
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

    {misconceptions.length > 0 && <section className="simple-mistakes"><p className="eyebrow">Common mistakes</p>{misconceptions.map((item) => <article key={item.wrong}><p><strong>Do not think:</strong> {item.wrong}</p><p><strong>Correct idea:</strong> {item.correction}</p></article>)}</section>}

    <div className="lesson-complete-row"><div><strong>{complete ? "Lesson completed" : "Ready to move on?"}</strong><p>{complete ? "You can return to practice whenever you need a refresher." : "Mark this lesson complete when you can explain the main example in your own words."}</p></div><button type="button" onClick={() => completeLesson(lesson.id)}>{complete ? "Completed ✓" : "Mark lesson complete"}</button></div>
    <div className="study-next-actions"><Link className="button" to={`/lessons/${lesson.id}/practice`}>Start practice questions</Link>{LEVELS.some((level) => lesson.levels[level].pythonLab) && <Link className="button secondary" to={`/lessons/${lesson.id}/python`}>Open Python lab</Link>}</div>
  </div>;
}

function FormulaView({ lesson }) {
  const formulaIds = [...new Set(LEVELS.flatMap((level) => lesson.levels[level].formulaIds || []))];
  const formulas = formulaIds.map((id) => formulaById[id]).filter(Boolean);
  if (!formulas.length) return <Navigate to={studyPath(lesson.id)} replace />;

  return <div className="formula-guide"><header className="plain-section-heading"><p className="eyebrow">Formula explained</p><h2>Read the maths without guessing</h2><p>Start with the concrete example from the study guide. Then use these cards to decode every symbol, condition, sign, and common exam trap.</p></header><div className="formula-stack">{formulas.map((formula) => <FormulaCard formula={formula} key={formula.id} />)}</div></div>;
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
  const labs = pythonExamples(lesson);
  if (!labs.length) return <Navigate to={studyPath(lesson.id)} replace />;

  const labels = { basics: "Start here", core: "Build on the idea", advanced: "Go deeper" };
  return <div className="python-guide">
    <header className="plain-section-heading"><p className="eyebrow">Python companion</p><h2>Turn this lesson into code</h2><p>{labs.length} distinct {labs.length === 1 ? "example" : "examples"}, grouped from introductory to deeper work. Open a group to read the explanation and try its code.</p><Link to="/python">Browse all Python examples →</Link></header>
    {labs.map(({ level, levels, lab }, index) => <details className="python-example-group" key={`${lesson.id}-${level}`} open={index === 0}>
      <summary><span>{labels[level]} · {lab.title}</span><span className="python-location">{lab.runtime === "notebook" ? "Colab notebook" : "Runs in this app"}</span></summary>
      <section className="python-section"><header className="content-intro"><h3>{lab.title}</h3><p>{lab.goal}</p>{levels.length > 1 && <p className="muted">Shared across {levels.join(", ")} — shown once.</p>}
        <div className="code-connection"><strong>Math to code</strong><span><MathText>{lab.mathToCode}</MathText></span></div>
        {lab.explanation !== lab.mathToCode && <p><strong>What the code does:</strong> <MathText>{lab.explanation}</MathText></p>}
        <p><strong>Common trap:</strong> <MathText>{lab.commonTrap}</MathText></p><p><strong>Try this:</strong> <MathText>{lab.exercise?.prompt}</MathText></p>
      </header>
      {lab.runtime === "notebook" ? <NotebookLab lab={lab} /> : <><h4>Expected output</h4><pre className="expected-output"><code>{lab.output}</code></pre><PythonPlayground lessonKey={`${lesson.id}-${level}`} initialCode={lab.code} expectedOutput={lab.output} packages={lab.packages} hiddenTests={lab.hiddenTests} onComplete={() => levels.forEach((item) => completePython(`${lesson.id}-${item}`))} /></>}
      </section>
    </details>)}
  </div>;
}

export default function LessonPage() {
  const { lessonId, level: view = "study" } = useParams();
  const lesson = lessonById[lessonId];
  const { mastery, visit, completeLesson, completePython } = useMastery();
  const mode = view === "formula" || view === "practice" || view === "python" ? view : "study";

  useEffect(() => {
    if (!lesson) return;
    if (!lesson.beginnerSteps?.length || ["formula", "practice", "python"].includes(view)) visit(lesson.id, view);
  }, [lesson?.id, view]);

  if (!lesson) return <Navigate to="/dashboard" replace />;
  const chapter = chapterById[lesson.chapterId];
  const guidedSteps = lesson.beginnerSteps || [];
  const guidedStep = guidedSteps.find((step) => step.id === view);
  const legacyStudyAliases = new Set(["study", "basics", "core", "advanced"]);
  if (guidedSteps.length && legacyStudyAliases.has(view)) return <Navigate to={`/lessons/${lesson.id}/${guidedSteps[0].id}`} replace />;
  if (guidedSteps.length && guidedStep) return <div className="page guided-lesson-page"><GuidedLesson lesson={lesson} chapter={chapter} stepId={guidedStep.id} /></div>;
  if (guidedSteps.length && !["formula", "practice", "python"].includes(view)) return <Navigate to={`/lessons/${lesson.id}/${guidedSteps[0].id}`} replace />;
  const hasPython = LEVELS.some((level) => lesson.levels[level].pythonLab);
  const hasFormulas = LEVELS.some((level) => lesson.levels[level].formulaIds?.length);

  return <div className="page lesson-page simple-lesson-page">
    <LessonHeader lesson={lesson} chapter={chapter} mode={mode} hasFormulas={hasFormulas} hasPython={hasPython} />
    {lesson.prerequisites.length > 0 && <aside className="prerequisite-strip"><strong>Study first</strong>{lesson.prerequisites.map((id) => <Link to={studyPath(id)} key={id}>{lessonById[id]?.title || id}</Link>)}</aside>}
    {mode === "study" && <StudyGuide lesson={lesson} mastery={mastery} completeLesson={completeLesson} />}
    {mode === "formula" && <FormulaView lesson={lesson} />}
    {mode === "practice" && <PracticeView lesson={lesson} />}
    {mode === "python" && <PythonView lesson={lesson} completePython={completePython} />}
  </div>;
}
