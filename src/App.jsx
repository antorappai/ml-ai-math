import React, { startTransition, useEffect, useState } from "react";
import { curriculumStages, futureModules, lessons } from "./lessonData.js";
import VectorScene from "./VectorScene.jsx";

const starterGuide = [
  { symbol: "+", meaning: "Add things together." },
  { symbol: "-", meaning: "Subtract, or show a value goes in the negative direction." },
  { symbol: "×", meaning: "Multiply." },
  { symbol: "≈", meaning: "Approximately equal. Close, not exact." },
  { symbol: "∂ / ∇", meaning: "Partial derivative and gradient." }
];

const sectionTabs = [
  { key: "explanation", label: "Explanation" },
  { key: "examples", label: "Examples" },
  { key: "practice", label: "Practice" },
  { key: "exam", label: "Exam Prep" }
];

export default function App() {
  const [screen, setScreen] = useState(() => {
    if (typeof window === "undefined") {
      return "home";
    }
    return window.localStorage.getItem("ml-math-home-seen") === "true" ? "study" : "home";
  });
  const [lessonKey, setLessonKey] = useState(lessons[0].key);
  const [studyTab, setStudyTab] = useState("explanation");
  const [controlState, setControlState] = useState(() =>
    Object.fromEntries(
      lessons.map((lesson) => [
        lesson.key,
        Object.fromEntries(lesson.controls.map((control) => [control.id, control.value]))
      ])
    )
  );
  const [mcqFeedback, setMcqFeedback] = useState("");
  const [selectedMcq, setSelectedMcq] = useState(null);
  const [extraMcqState, setExtraMcqState] = useState({});
  const [revealedPractice, setRevealedPractice] = useState({});
  const [problemAnswer, setProblemAnswer] = useState("");
  const [problemFeedback, setProblemFeedback] = useState("");
  const [showConceptAnswer, setShowConceptAnswer] = useState(false);

  const lesson = lessons.find((entry) => entry.key === lessonKey);
  const currentValues = controlState[lesson.key];
  const result = lesson.calculate(currentValues);

  useEffect(() => {
    if (screen === "study" && typeof window !== "undefined") {
      window.localStorage.setItem("ml-math-home-seen", "true");
    }
  }, [screen]);

  function enterStudyGuide() {
    startTransition(() => {
      setScreen("study");
    });
  }

  function openLessonFromHome(nextKey) {
    startTransition(() => {
      setLessonKey(nextKey);
      setStudyTab("explanation");
      setScreen("study");
      setMcqFeedback("");
      setSelectedMcq(null);
      setExtraMcqState({});
      setRevealedPractice({});
      setProblemAnswer("");
      setProblemFeedback("");
      setShowConceptAnswer(false);
    });
  }

  function goHome() {
    startTransition(() => {
      setScreen("home");
    });
  }

  function switchLesson(nextKey) {
    startTransition(() => {
      setLessonKey(nextKey);
      setStudyTab("explanation");
      setMcqFeedback("");
      setSelectedMcq(null);
      setExtraMcqState({});
      setRevealedPractice({});
      setProblemAnswer("");
      setProblemFeedback("");
      setShowConceptAnswer(false);
    });
  }

  function updateControl(controlId, value) {
    startTransition(() => {
      setControlState((current) => ({
        ...current,
        [lesson.key]: {
          ...current[lesson.key],
          [controlId]: value
        }
      }));
    });
  }

  function checkMcq(index) {
    setSelectedMcq(index);
    if (index === lesson.mcq.correctIndex) {
      setMcqFeedback(lesson.mcq.explanation);
      return;
    }
    setMcqFeedback(`Not quite. ${lesson.mcq.explanation}`);
  }

  function checkProblem() {
    const normalizedInput = normalize(problemAnswer);
    const acceptedAnswers = lesson.problem.answers.map(normalize);
    if (acceptedAnswers.includes(normalizedInput)) {
      setProblemFeedback(lesson.problem.success);
      return;
    }
    setProblemFeedback("Try again. Focus on the meaning first, then the notation.");
  }

  function checkExtraMcq(questionIndex, optionIndex, correctIndex, explanation) {
    setExtraMcqState((current) => ({
      ...current,
      [questionIndex]: {
        selected: optionIndex,
        correctIndex,
        explanation
      }
    }));
  }

  function revealPracticeSolution(questionIndex) {
    setRevealedPractice((current) => ({
      ...current,
      [questionIndex]: !current[questionIndex]
    }));
  }

  if (screen === "home") {
    return (
      <div className="page-shell">
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">ML Math Studio</p>
            <h1>Build ML math in the right order.</h1>
            <p className="hero-text">
              This is your study guide and exam-prep workspace, not just a cheat
              sheet. It is built for learners who want simple explanations, real
              order, worked examples, practice, and clear ML relevance.
            </p>
            <div className="hero-pills">
              <span>Study guide</span>
              <span>Exam prep</span>
              <span>ML-focused</span>
            </div>
            <div className="home-actions">
              <button type="button" className="primary-button" onClick={enterStudyGuide}>
                Enter Study Guide
              </button>
            </div>
          </div>

          <div className="hero-card">
            <p className="hero-card-label">How To Use This</p>
            <ol>
              <li>Read the explanation tab first.</li>
              <li>Use the examples tab to build confidence.</li>
              <li>Use practice for problem solving.</li>
              <li>Use exam prep for speed and testing.</li>
            </ol>
          </div>
        </header>

        <section className="starter-panel">
          <div>
            <p className="panel-label">Why This Sequence</p>
            <h2 className="starter-title">Linear algebra before calculus for ML.</h2>
            <p className="starter-text">
              In ML, you first need to understand what the objects are: vectors,
              matrices, transformations, similarity scores. Then calculus explains
              how those objects are updated during learning. Then probability and
              statistics explain uncertainty, data noise, and inference.
            </p>
          </div>
          <div className="symbol-strip">
            {starterGuide.map((item) => (
              <div key={item.symbol} className="symbol-chip">
                <strong>{item.symbol}</strong>
                <span>{item.meaning}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="roadmap-panel">
          <div className="roadmap-header">
            <div>
              <p className="panel-label">Curriculum Roadmap</p>
              <h2 className="starter-title">What to study first, and why.</h2>
            </div>
            <p className="roadmap-text">
              Treat this like a first-pass ML math roadmap for serious study, not
              a random collection of formulas.
            </p>
          </div>
          <div className="roadmap-grid">
            {curriculumStages.map((stage) => (
              <article key={stage.key} className="roadmap-card">
                <h3>{stage.title}</h3>
                <p>{stage.purpose}</p>
                <p className="roadmap-ml">{stage.mlConnection}</p>
                <div className="roadmap-topics">
                  {stage.topics.map((topic) => (
                    <span key={topic} className="topic-chip">
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap-panel">
          <div className="roadmap-header">
            <div>
              <p className="panel-label">Current Scope</p>
              <h2 className="starter-title">What is already inside the study workspace.</h2>
            </div>
          </div>
          <div className="future-list">
            {lessons.map((item) => (
              <button
                key={item.key}
                type="button"
                className="topic-link"
                onClick={() => openLessonFromHome(item.key)}
              >
                {item.order}. {item.label}
              </button>
            ))}
          </div>
          <div className="nav-note">
            <p className="panel-label">Still Worth Adding Later</p>
            <div className="future-list">
              {futureModules.map((item) => (
                <span key={item} className="future-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="study-header">
        <div>
          <p className="eyebrow">Study Workspace</p>
          <h1 className="study-title">ML Math Studio</h1>
          <p className="study-subtitle">
            Explanation first, then examples, then practice, then exam prep.
          </p>
        </div>
        <div className="study-actions">
          <button type="button" className="secondary-button" onClick={goHome}>
            Home / Roadmap
          </button>
        </div>
      </header>

      <main className="workspace">
        <aside className="lesson-nav">
          <p className="panel-label">Lessons In Order</p>
          <div className="lesson-tabs">
            {lessons.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`lesson-tab ${item.key === lesson.key ? "active" : ""}`}
                onClick={() => switchLesson(item.key)}
              >
                <strong>
                  {item.order}. {item.label}
                </strong>
                <span>{item.navDescription}</span>
                <small>{item.stage}</small>
              </button>
            ))}
          </div>

          <div className="nav-note">
            <p className="panel-label">After This Path</p>
            <div className="future-list">
              {futureModules.map((item) => (
                <span key={item} className="future-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <section className="lesson-stage">
          <div className="lesson-header">
            <div>
              <p className="panel-label">Current Lesson</p>
              <h2>{lesson.label}</h2>
              <p className="lesson-subtitle">{lesson.subtitle}</p>
            </div>
            <div className="lesson-metrics">
              <span className="metric-pill">Stage: {lesson.stage}</span>
              <span className="metric-pill">Order: {lesson.order}</span>
              <span className="metric-pill">Level: {lesson.difficulty}</span>
            </div>
          </div>

          <div className="section-tabs">
            {sectionTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`section-tab ${studyTab === tab.key ? "active" : ""}`}
                onClick={() => setStudyTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {studyTab === "explanation" ? (
            <>
              <section className="meta-grid">
                <article className="meta-card">
                  <p className="panel-label">Why Learn This</p>
                  <p>{lesson.learningPurpose}</p>
                </article>
                <article className="meta-card">
                  <p className="panel-label">Why In This Order</p>
                  <p>{lesson.whyThisBefore}</p>
                </article>
                <article className="meta-card">
                  <p className="panel-label">Relation To ML</p>
                  <p>{lesson.mlPurpose}</p>
                </article>
                <article className="meta-card">
                  <p className="panel-label">Learn This After</p>
                  <div className="prereq-list">
                    {lesson.prerequisites.map((item) => (
                      <span key={item} className="topic-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </section>

              <section className="primer-card">
                <p className="panel-label">Beginner Primer</p>
                <p>{lesson.beginnerNote}</p>
              </section>

              <VisualPanel
                lesson={lesson}
                result={result}
                currentValues={currentValues}
                updateControl={updateControl}
              />

              <section className="lesson-grid">
                <article className="content-card">
                  <p className="panel-label">Simple Explanation</p>
                  <p>{lesson.simpleExplanation}</p>
                </article>

                <article className="content-card">
                  <p className="panel-label">Symbol Decoder</p>
                  <div className="symbol-list">
                    {lesson.symbolGuide.map((item) => (
                      <div key={`${lesson.key}-${item.symbol}`} className="symbol-row">
                        <strong>{item.symbol}</strong>
                        <span>{item.meaning}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="content-card">
                  <p className="panel-label">Formula</p>
                  <div className="formula-box">
                    <p className="formula">{lesson.formula}</p>
                    <p className="formula-meaning">{lesson.formulaMeaning}</p>
                  </div>
                </article>

                <article className="content-card">
                  <p className="panel-label">Why It Matters In ML</p>
                  <p>{lesson.mlUseCase}</p>
                </article>

                <article className="content-card">
                  <p className="panel-label">Real-Life & ML Uses</p>
                  <ul className="shortcut-list">
                    {lesson.realLifeExamples.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="content-card wide">
                  <p className="panel-label">Intuition</p>
                  <p>{lesson.intuition}</p>
                </article>

                <article className="content-card wide">
                  <p className="panel-label">Go Deeper</p>
                  <ul className="shortcut-list">
                    {lesson.goDeeper.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="content-card wide">
                  <p className="panel-label">Big Picture</p>
                  <p>{lesson.bigPicture}</p>
                </article>
              </section>
            </>
          ) : null}

          {studyTab === "examples" ? (
            <>
              <VisualPanel
                lesson={lesson}
                result={result}
                currentValues={currentValues}
                updateControl={updateControl}
              />

              <section className="lesson-grid">
                <article className="content-card wide">
                  <p className="panel-label">Worked Example</p>
                  <div className="steps">
                    {result.exampleSteps.map((step, index) => (
                      <div key={`${lesson.key}-step-${index + 1}`} className="step">
                        {index + 1}. {step}
                      </div>
                    ))}
                  </div>
                </article>

                {lesson.advancedExample ? (
                  <article className="content-card wide">
                    <p className="panel-label">Advanced Example</p>
                    <p className="question">{lesson.advancedExample.title}</p>
                    <div className="steps">
                      {lesson.advancedExample.steps.map((step, index) => (
                        <div key={`${lesson.key}-advanced-${index + 1}`} className="step">
                          {index + 1}. {step}
                        </div>
                      ))}
                    </div>
                  </article>
                ) : null}
              </section>
            </>
          ) : null}

          {studyTab === "practice" ? (
            <section className="lesson-grid">
              <article className="content-card">
                <p className="panel-label">Problem-Solving</p>
                <p className="question">{lesson.problem.prompt}</p>
                <div className="problem-row">
                  <input
                    type="text"
                    value={problemAnswer}
                    onChange={(event) => setProblemAnswer(event.target.value)}
                    placeholder="Type your answer"
                  />
                  <button type="button" onClick={checkProblem}>
                    Check
                  </button>
                </div>
                <p className="feedback">{problemFeedback}</p>
              </article>

              <article className="content-card">
                <p className="panel-label">Concept Question</p>
                <p className="question">{lesson.conceptQuestion.prompt}</p>
                <button type="button" onClick={() => setShowConceptAnswer(true)}>
                  Reveal answer
                </button>
                <p className="feedback">
                  {showConceptAnswer ? lesson.conceptQuestion.answer : ""}
                </p>
              </article>

              <article className="content-card wide">
                <p className="panel-label">Practice Focus</p>
                <ul className="shortcut-list">
                  {lesson.examReadiness.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              {lesson.extraPractice.length > 0 ? (
                <article className="content-card wide">
                  <p className="panel-label">Practice Variations</p>
                  <div className="extra-mcq-list">
                    {lesson.extraPractice.map((item, index) => (
                      <div key={`${lesson.key}-practice-${index + 1}`} className="extra-mcq-card">
                        <p className="question">
                          <strong>Q{index + 1}.</strong> {item.prompt}
                        </p>
                        <button
                          type="button"
                          onClick={() => revealPracticeSolution(index)}
                        >
                          {revealedPractice[index] ? "Hide solution" : "Reveal solution"}
                        </button>
                        {revealedPractice[index] ? (
                          <div className="revealed-solution">
                            <p className="feedback">{item.answer}</p>
                            <div className="steps">
                              {item.steps.map((step, stepIndex) => (
                                <div key={`${lesson.key}-practice-step-${index + 1}-${stepIndex + 1}`} className="step">
                                  {stepIndex + 1}. {step}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}
            </section>
          ) : null}

          {studyTab === "exam" ? (
            <section className="lesson-grid">
              <article className="content-card">
                <p className="panel-label">MCQ</p>
                <p className="question">{lesson.mcq.question}</p>
                <div className="options">
                  {lesson.mcq.options.map((option, index) => {
                    const isCorrect = index === lesson.mcq.correctIndex;
                    const className =
                      selectedMcq == null
                        ? "option-button"
                        : selectedMcq === index && !isCorrect
                          ? "option-button incorrect"
                          : isCorrect
                            ? "option-button correct"
                            : "option-button";

                    return (
                      <button
                        key={`${lesson.key}-option-${index + 1}`}
                        type="button"
                        className={className}
                        onClick={() => checkMcq(index)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <p className="feedback">{mcqFeedback}</p>
              </article>

              <article className="content-card">
                <p className="panel-label">Exam Shortcuts</p>
                <ul className="shortcut-list">
                  {lesson.examShortcuts.map((shortcut) => (
                    <li key={shortcut}>{shortcut}</li>
                  ))}
                </ul>
              </article>

              {lesson.extraMcqs.length > 0 ? (
                <article className="content-card wide">
                  <p className="panel-label">More MCQ Variations</p>
                  <div className="extra-mcq-list">
                    {lesson.extraMcqs.map((item, questionIndex) => {
                      const state = extraMcqState[questionIndex];
                      return (
                        <div key={`${lesson.key}-extra-mcq-${questionIndex + 1}`} className="extra-mcq-card">
                          <p className="question">
                            {questionIndex + 1}. {item.question}
                          </p>
                          <div className="options">
                            {item.options.map((option, optionIndex) => {
                              const isCorrect = optionIndex === item.correctIndex;
                              const className =
                                state == null
                                  ? "option-button"
                                  : state.selected === optionIndex && !isCorrect
                                    ? "option-button incorrect"
                                    : isCorrect
                                      ? "option-button correct"
                                      : "option-button";
                              return (
                                <button
                                  key={`${lesson.key}-extra-mcq-${questionIndex + 1}-${optionIndex + 1}`}
                                  type="button"
                                  className={className}
                                  onClick={() =>
                                    checkExtraMcq(questionIndex, optionIndex, item.correctIndex, item.explanation)
                                  }
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>
                          <p className="feedback">{state ? state.explanation : ""}</p>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ) : null}

              {lesson.examQuestions ? (
                <article className="content-card wide">
                  <p className="panel-label">Exam-Style Questions</p>
                  <div className="steps">
                    {lesson.examQuestions.map((item, index) => (
                      <div key={`${lesson.key}-exam-${index + 1}`} className="step">
                        <strong>Q{index + 1}.</strong> {item.prompt}
                        <br />
                        <span>{item.answer}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}
            </section>
          ) : null}
        </section>
      </main>
    </div>
  );
}

function VisualPanel({ lesson, result, currentValues, updateControl }) {
  return (
    <section className="visual-panel">
      <div className="visual-header">
        <div>
          <p className="panel-label">Visual / Interactive</p>
          <h3>{lesson.visualTitle}</h3>
        </div>
        <p className="visual-description">{lesson.visualDescription}</p>
      </div>

      <div className="visual-layout">
        <div className="visual-card">
          <VectorScene drawing={result.drawing} />
        </div>

        <div className="controls-card">
          {lesson.controls.length > 0 ? (
            <div className="controls-grid">
              {lesson.controls.map((control) => (
                <div key={control.id} className="control-group">
                  <label htmlFor={control.id}>
                    <span>{control.label}</span>
                    <span>{currentValues[control.id]}</span>
                  </label>
                  <input
                    id={control.id}
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={currentValues[control.id]}
                    onChange={(event) => updateControl(control.id, event.target.value)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-controls">
              <p className="panel-label">Static Visual</p>
              <p>This lesson uses a concept diagram instead of sliders.</p>
            </div>
          )}
          <div className="lesson-metrics compact">
            {result.metrics.map((metric) => (
              <span key={metric} className="metric-pill">
                {metric}
              </span>
            ))}
          </div>
          <div className="visual-insight">{result.insight}</div>
        </div>
      </div>
    </section>
  );
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}
