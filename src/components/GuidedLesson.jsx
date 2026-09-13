import LessonNavigation from "./LessonNavigation.jsx";
import CourseSidebar from "./CourseSidebar.jsx";
import { adjacentLessons, lessonStart } from "../utils/lessonNavigation.js";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { formulaById, lessonById } from "../content/index.js";
import { useMastery } from "../state/mastery.js";
import { BlockMath, InlineMath, MathText } from "./Math.jsx";
import FormulaCard from "./FormulaCard.jsx";
import { CurvatureExplorer, JacobianExplorer, LearningRateExplorer, LossExplorer, MatrixVectorExplorer, TangentExplorer, UnitVectorExplorer } from "./BridgeExplorers.jsx";
import GradientExplorer from "./GradientExplorer.jsx";
import GuidedCheck from "./GuidedCheck.jsx";
import { BasisExplorer, DeterminantExplorer, EigenvectorExplorer, InverseSystemExplorer, PcaExplorer } from "./LinearAlgebraExplorers.jsx";
import { BayesExplorer, ConditionalExplorer, ProbabilityRuleExplorer, SampleSpaceExplorer, SetOverlapExplorer } from "./ProbabilityExplorers.jsx";
import { CdfExplorer, ExpectedValueExplorer, PdfExplorer, PmfExplorer, RandomVariableExplorer, StandardDeviationExplorer, VarianceExplorer } from "./DistributionExplorers.jsx";
import SlopeExplorer from "./SlopeExplorer.jsx";

function lessonStartPath(lessonId) {
  return `/lessons/${lessonId}/${lessonById[lessonId]?.beginnerSteps?.length ? "start" : "study"}`;
}

function WorkedExample({ example, label = "Worked example" }) {
  if (!example) return null;
  return (
    <article className="guided-example">
      <p className="section-label">{label}</p>
      <h3>{example.title}</h3>
      <p className="example-question"><MathText>{example.prompt}</MathText></p>
      <ol>
        {example.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p><MathText>{step}</MathText></p></li>)}
      </ol>
      <div className="guided-answer"><span>Answer</span><strong><MathText>{example.answer}</MathText></strong></div>
      <p><strong>What it means:</strong> <MathText>{example.realWorldMeaning || example.interpretation}</MathText></p>
    </article>
  );
}

function FormulaCompanion({ step, lesson }) {
  if (!step.widget || !step.notation) return null;
  return <aside className="formula-companion" aria-label="Formula behind this interactive graph">
    <div><p className="section-label">Formula behind this graph</p><BlockMath>{step.notation.latex}</BlockMath><p>{step.notation.readAs}</p></div>
    <nav aria-label="Formula companion links">
      <Link to={`/lessons/${lesson.id}/math-to-ml`}>Decode every symbol →</Link>
      {step.formulaIds?.length > 0 && <Link to={`/lessons/${lesson.id}/formula`}>Open full reference →</Link>}
    </nav>
  </aside>;
}

function ReasonedWalkthrough({ items, label }) {
  return <section className="reasoned-walkthrough" aria-label={label}>
    <p className="section-label">Work through the small numbers</p>
    <ol>{items.map((item, index) => <li key={`${index}-${item.action}`}>
      <span>{index + 1}</span>
      <div><strong><MathText>{item.action}</MathText></strong><p><span>Why:</span> <MathText>{item.reason}</MathText></p></div>
    </li>)}</ol>
  </section>;
}

function QuantityList({ items, label, valueLabel }) {
  return <section className="guided-quantities" aria-label={label}>
    <p className="section-label">{valueLabel}</p>
    <dl>{items.map((item) => <div key={`${item.label}-${item.value}`}>
      <dt><MathText>{item.label}</MathText></dt><dd><strong><MathText>{item.value}</MathText></strong><span><MathText>{item.meaning}</MathText></span></dd>
    </div>)}</dl>
  </section>;
}

function EverydayStory({ everyday }) {
  return <div className="teaching-journey everyday-journey">
    <section className="story-panel"><span>Picture this</span><h3>{everyday.title}</h3>{everyday.setup.map((paragraph) => <p key={paragraph}><MathText>{paragraph}</MathText></p>)}</section>
    <QuantityList items={everyday.quantities} label="Quantities in the everyday example" valueLabel="Name what we know" />
    <ReasonedWalkthrough items={everyday.walkthrough} label="Everyday example walkthrough" />
    <aside className="journey-takeaway"><p className="section-label">What the answer tells us</p><p><MathText>{everyday.takeaway}</MathText></p></aside>
  </div>;
}

function MlBridge({ bridge }) {
  return <div className="teaching-journey ml-journey">
    <section className="ml-connection-panel"><p className="section-label">The same idea in machine learning</p><p><MathText>{bridge.task}</MathText></p></section>
    <section className="ml-terms" aria-labelledby="ml-terms-title">
      <p className="section-label" id="ml-terms-title">New ML words, decoded</p>
      <div>{bridge.terms.map((item) => <article key={item.id}>
        <h3>{item.name}</h3><p><MathText>{item.definition}</MathText></p>
        <Link to={`/lessons/${item.lessonId}/plain-idea`}>{item.state === "preview" ? "You will learn this later" : "Review this idea"} →</Link>
      </article>)}</div>
    </section>
    <section className="ml-mapping" aria-labelledby="ml-mapping-title">
      <p className="section-label" id="ml-mapping-title">Match the maths to the model</p>
      <dl>{bridge.mapping.map((item) => <div key={`${item.math}-${item.ml}`}><dt><MathText>{item.math}</MathText></dt><dd><MathText>{item.ml}</MathText></dd></div>)}</dl>
    </section>
    <ReasonedWalkthrough items={bridge.walkthrough} label="Machine-learning example walkthrough" />
    <aside className="journey-takeaway"><p className="section-label">Why the model cares</p><p><MathText>{bridge.takeaway}</MathText></p></aside>
  </div>;
}

function StepBody({ step, lesson }) {
  if (step.type === "orientation") return (
    <>
      <div className="lesson-goal"><span>By the end, you will be able to</span><strong>{step.goal}</strong></div>
      {step.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}><MathText>{paragraph}</MathText></p>)}
      <div className="orientation-list">
        <div><span>Time</span><strong>About 10 minutes</strong></div>
        <div><span>Math level</span><strong>Beginner</strong></div>
        <div><span>How to learn</span><strong>Read, try, then explain</strong></div>
      </div>
      {step.prerequisites.length > 0 && <div className="quiet-note"><strong>Helpful first:</strong> {step.prerequisites.map((id, index) => <React.Fragment key={id}>{index > 0 && ", "}<Link to={lessonStartPath(id)}>{lessonById[id]?.title || id}</Link></React.Fragment>)}</div>}
    </>
  );

  if (step.type === "scenario") return (
    <>
      <EverydayStory everyday={step.everyday} />
      <GuidedCheck question={step.check} compact />
    </>
  );

  if (step.type === "concept") return (
    <>
      {step.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}><MathText>{paragraph}</MathText></p>)}
      <div className="word-list">
        {step.vocabulary.map((term) => <article key={term.id}><h3>{term.name}</h3><p><MathText>{term.definition}</MathText></p><p><strong>Think of it like:</strong> <MathText>{term.analogy}</MathText></p><details><summary>See an example and a non-example</summary><p><strong>Example:</strong> <MathText>{term.example}</MathText></p><p><strong>Not an example:</strong> <MathText>{term.nonExample}</MathText></p></details></article>)}
      </div>
      {step.widget === "slope-explorer" && <SlopeExplorer />}
      {step.widget === "gradient-explorer" && <GradientExplorer />}
      {step.widget === "unit-vector-explorer" && <UnitVectorExplorer />}
      {step.widget === "matrix-vector-explorer" && <MatrixVectorExplorer />}
      {step.widget === "tangent-explorer" && <TangentExplorer />}
      {step.widget === "loss-explorer" && <LossExplorer />}
      {step.widget === "jacobian-explorer" && <JacobianExplorer />}
      {step.widget === "curvature-explorer" && <CurvatureExplorer />}
      {step.widget === "learning-rate-explorer" && <LearningRateExplorer />}
      {step.widget === "determinant-explorer" && <DeterminantExplorer />}
      {step.widget === "inverse-system-explorer" && <InverseSystemExplorer />}
      {step.widget === "basis-explorer" && <BasisExplorer />}
      {step.widget === "eigenvector-explorer" && <EigenvectorExplorer />}
      {step.widget === "pca-explorer" && <PcaExplorer />}
      {step.widget === "sample-space-explorer" && <SampleSpaceExplorer />}
      {step.widget === "set-overlap-explorer" && <SetOverlapExplorer />}
      {step.widget === "probability-rule-explorer" && <ProbabilityRuleExplorer />}
      {step.widget === "conditional-explorer" && <ConditionalExplorer />}
      {step.widget === "bayes-explorer" && <BayesExplorer />}
      {step.widget === "random-variable-explorer" && <RandomVariableExplorer />}
      {step.widget === "pmf-explorer" && <PmfExplorer />}
      {step.widget === "pdf-explorer" && <PdfExplorer />}
      {step.widget === "cdf-explorer" && <CdfExplorer />}
      {step.widget === "expected-value-explorer" && <ExpectedValueExplorer />}
      {step.widget === "variance-explorer" && <VarianceExplorer />}
      {step.widget === "standard-deviation-explorer" && <StandardDeviationExplorer />}
      <FormulaCompanion step={step} lesson={lesson} />
      <GuidedCheck question={step.check} compact />
    </>
  );

  if (step.type === "worked-example") return (
    <>{step.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}><MathText>{paragraph}</MathText></p>)}<WorkedExample example={step.example} /><GuidedCheck question={step.check} compact /></>
  );

  if (step.type === "check") return <>{step.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}><MathText>{paragraph}</MathText></p>)}<GuidedCheck question={step.check} /></>;

  if (step.type === "notation") return (
    <>
      {step.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}><MathText>{paragraph}</MathText></p>)}
      <section className="notation-panel">
        <BlockMath className="notation-expression">{step.notation.latex}</BlockMath>
        <p><strong>Read aloud:</strong> {step.notation.readAs}</p>
        <dl>{step.notation.symbols.map(([symbol, meaning]) => <div key={symbol}><dt><InlineMath>{symbol}</InlineMath></dt><dd>{meaning}</dd></div>)}</dl>
      </section>
      <MlBridge bridge={step.mlBridge} />
      <GuidedCheck question={step.check} compact />
      {step.formulaIds.length > 0 && <details className="deeper-detail"><summary>Explore the full formula reference</summary><div>{step.formulaIds.map((id) => <FormulaCard formula={formulaById[id]} compact key={id} />)}</div></details>}
    </>
  );

  return (
    <>
      {step.body.map((paragraph, index) => <p key={`${index}-${paragraph}`}><MathText>{paragraph}</MathText></p>)}
      <div className="misconception-note"><strong>A useful correction</strong><p><s><MathText>{step.misconception.wrong}</MathText></s></p><p><MathText>{step.misconception.correction}</MathText></p></div>
      <div className="recap-checks">{step.recapQuestions.map((question) => <GuidedCheck question={question} compact key={question.id} />)}</div>
      <div className="next-options">
        <Link to={`/lessons/${lesson.id}/practice`}>More practice</Link>
        {Object.values(lesson.levels).some((level) => level.pythonLab) && <Link to={`/lessons/${lesson.id}/python`}>Try the Python companion</Link>}
        {Object.values(lesson.levels).some((level) => level.formulaIds?.length) && <Link to={`/lessons/${lesson.id}/formula`}>Open formula reference</Link>}
      </div>
    </>
  );
}

export default function GuidedLesson({ lesson, chapter, stepId }) {
  const [outlineOpen, setOutlineOpen] = useState(false);
  const { mastery, visitStep, completeLesson } = useMastery();
  const { next: nextLesson } = adjacentLessons(lesson);
  const steps = lesson.beginnerSteps;
  const [activeId, setActiveId] = useState(stepId);
  const visitRef = useRef(visitStep);
  visitRef.current = visitStep;
  const stepIndex = steps.findIndex((step) => step.id === activeId) < 0 ? 0 : steps.findIndex((step) => step.id === activeId);
  const step = steps[stepIndex];
  const previous = steps[stepIndex - 1];
  const next = steps[stepIndex + 1];
  const completedCount = steps.filter((item) => mastery.completedSteps?.[lesson.id]?.[item.id]).length;

  const jump = (id) => document.getElementById(`reading-${lesson.id}-${id}`)?.scrollIntoView?.({ block: "start", behavior: "instant" });
  useEffect(() => {
    setActiveId(stepId);
    visitRef.current(lesson.id, stepId);
    jump(stepId);
  }, [lesson.id, stepId]);

  useEffect(() => {
    let frame;
    let last = stepId;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = steps[0].id;
        for (const item of steps) {
          if (document.getElementById(`reading-${lesson.id}-${item.id}`)?.getBoundingClientRect().top <= 150) current = item.id;
        }
        if (current !== last) {
          last = current;
          setActiveId(current);
          visitRef.current(lesson.id, current);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [lesson.id, steps, stepId]);

  return (
    <div className="guided-lesson-shell scrolling-lesson">
      <header className="guided-lesson-header">
        <div className="guided-breadcrumb"><Link to="/dashboard">All units</Link><span>/</span><span>{chapter.shortTitle}</span></div>
        <div className="guided-title-row"><div><p>Lesson {lesson.order} of {chapter.lessonIds.length}</p><h1>{lesson.title}</h1></div><button type="button" className="outline-button" onClick={() => setOutlineOpen((value) => !value)} aria-expanded={outlineOpen} aria-controls="lesson-outline">Lesson outline</button></div>
        <div className="guided-progress" aria-label={`${completedCount} of ${steps.length} lesson steps visited`}><span style={{ width: `${(completedCount / steps.length) * 100}%` }} /></div>
      </header>

      <LessonNavigation lesson={lesson} />
      <div className="guided-lesson-layout">
        <aside id="lesson-outline" className={`lesson-outline ${outlineOpen ? "open" : ""}`} aria-label="Lesson steps">
          <CourseSidebar currentChapterId={chapter.id} currentLessonId={lesson.id} />
          <p>Lesson steps</p>
          <ol>{steps.map((item, index) => <li key={item.id}><Link className={`${item.id === step.id ? "active" : ""} ${mastery.completedSteps?.[lesson.id]?.[item.id] ? "visited" : ""}`} to={`/lessons/${lesson.id}/${item.id}`} onClick={() => { setOutlineOpen(false); jump(item.id); }}><span>{mastery.completedSteps?.[lesson.id]?.[item.id] ? "✓" : index + 1}</span>{item.title}</Link></li>)}</ol>
        </aside>

        <article className="guided-step">
          {steps.map((item, index) => <section className="lesson-reading-section" id={`reading-${lesson.id}-${item.id}`} key={`${lesson.id}-${item.id}`} aria-labelledby={`reading-title-${lesson.id}-${item.id}`}>
            <header><p className="step-count">Step {index + 1} of {steps.length}</p><h2 id={`reading-title-${lesson.id}-${item.id}`}>{item.title}</h2></header>
            <div className="guided-step-content"><StepBody step={item} lesson={lesson} /></div>
          </section>)}
          {<aside className="next-lesson-preview"><strong>{nextLesson ? "Up next" : "End of the course"}</strong><p>{nextLesson ? nextLesson.title : "You can revisit lessons, practise, or explore the Python examples."}</p>{nextLesson && nextLesson.chapterId !== lesson.chapterId && <p>You have reached the end of this unit. Continue into the next unit.</p>}</aside>}
          {next && <div className="reading-finish"><Link className="button" to={nextLesson ? lessonStart(nextLesson) : "/dashboard"} onClick={() => completeLesson(lesson.id)}>{nextLesson ? "Finish & next lesson →" : "Finish course →"}</Link></div>}
          <nav className="step-navigation" aria-label="Lesson step navigation">
            {previous ? <Link className="back" to={`/lessons/${lesson.id}/${previous.id}`}>← Back</Link> : <Link className="back" to="/dashboard">← All units</Link>}
            {next ? <Link className="skip" to={`/lessons/${lesson.id}/${next.id}`}>Skip for now</Link> : <span>You can return to any step.</span>}
            {next ? <Link className="next" to={`/lessons/${lesson.id}/${next.id}`}>Next →</Link> : <Link className="next" to={nextLesson ? lessonStart(nextLesson) : "/dashboard"} onClick={() => completeLesson(lesson.id)}>{nextLesson ? "Finish & next lesson →" : "Finish course →"}</Link>}
          </nav>
        </article>
      </div>
    </div>
  );
}
