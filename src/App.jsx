import React, { startTransition, useState } from "react";
import { curriculumStages, futureModules, lessons } from "./lessonData.js";
import VectorScene from "./VectorScene.jsx";

const starterGuide = [
  {
    symbol: "+",
    meaning: "Add things together."
  },
  {
    symbol: "-",
    meaning: "Subtract, or show a value goes in the negative direction."
  },
  {
    symbol: "×",
    meaning: "Multiply."
  },
  {
    symbol: "≈",
    meaning: "Approximately equal. Close, not exact."
  },
  {
    symbol: "∂ / ∇",
    meaning: "Partial derivative and gradient."
  }
];

export default function App() {
  const [lessonKey, setLessonKey] = useState(lessons[0].key);
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
  const [problemAnswer, setProblemAnswer] = useState("");
  const [problemFeedback, setProblemFeedback] = useState("");
  const [showConceptAnswer, setShowConceptAnswer] = useState(false);

  const lesson = lessons.find((entry) => entry.key === lessonKey);
  const currentValues = controlState[lesson.key];
  const result = lesson.calculate(currentValues);

  function switchLesson(nextKey) {
    startTransition(() => {
      setLessonKey(nextKey);
      setMcqFeedback("");
      setSelectedMcq(null);
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

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">ML Math Studio</p>
          <h1>Prepare for ML math in the right order.</h1>
          <p className="hero-text">
            This is built for beginners who may have skipped advanced school
            math but still want to become ready for ML or a master's-level ML
            program. The goal is not just to show formulas. The goal is to make
            each topic make sense, in sequence, with practice and ML context.
          </p>
          <div className="hero-pills">
            <span>Study order matters</span>
            <span>Beginner-first explanations</span>
            <span>Exam-style practice</span>
          </div>
        </div>

        <div className="hero-card">
          <p className="hero-card-label">Recommended Order For ML Prep</p>
          <ol>
            <li>Math language and functions</li>
            <li>Linear algebra</li>
            <li>Single-variable calculus</li>
            <li>Multivariable calculus</li>
            <li>Probability and statistics</li>
            <li>Model-specific topics like regression</li>
          </ol>
        </div>
      </header>

      <section className="starter-panel">
        <div>
          <p className="panel-label">Start Here</p>
          <h2 className="starter-title">You do not need class 11/12 math to begin.</h2>
          <p className="starter-text">
            You do need a clean sequence. For ML, linear algebra comes before
            most calculus applications because data and model parameters are
            represented as vectors and matrices. Then calculus explains learning.
            Then probability and statistics explain uncertainty and data noise.
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
            If your goal is ML readiness, do not start with isolated formulas.
            Start with representation, then change, then uncertainty, then full
            models.
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

          <section className="visual-panel">
            <div className="visual-header">
              <div>
                <p className="panel-label">2. Visual / Interactive</p>
                <h3>{lesson.visualTitle}</h3>
              </div>
              <p className="visual-description">{lesson.visualDescription}</p>
            </div>

            <div className="visual-layout">
              <div className="visual-card">
                <VectorScene drawing={result.drawing} />
              </div>

              <div className="controls-card">
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

          <section className="lesson-grid">
            <article className="content-card">
              <p className="panel-label">1. Simple Explanation</p>
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
              <p className="panel-label">3. Formula (Minimal)</p>
              <div className="formula-box">
                <p className="formula">{lesson.formula}</p>
                <p className="formula-meaning">{lesson.formulaMeaning}</p>
              </div>
            </article>

            <article className="content-card">
              <p className="panel-label">5. Real-World ML Scenario</p>
              <p>{lesson.mlUseCase}</p>
            </article>

            <article className="content-card wide">
              <p className="panel-label">4. Step-by-Step Example</p>
              <div className="steps">
                {result.exampleSteps.map((step, index) => (
                  <div key={`${lesson.key}-step-${index + 1}`} className="step">
                    {index + 1}. {step}
                  </div>
                ))}
              </div>
            </article>

            <article className="content-card">
              <p className="panel-label">6. Intuition Block</p>
              <p>{lesson.intuition}</p>
            </article>

            <article className="content-card">
              <p className="panel-label">Exam Readiness</p>
              <ul className="shortcut-list">
                {lesson.examReadiness.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="content-card">
              <p className="panel-label">7. MCQ</p>
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
              <p className="panel-label">8. Problem-Solving</p>
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
              <p className="panel-label">9. Concept Question</p>
              <p className="question">{lesson.conceptQuestion.prompt}</p>
              <button type="button" onClick={() => setShowConceptAnswer(true)}>
                Reveal answer
              </button>
              <p className="feedback">
                {showConceptAnswer ? lesson.conceptQuestion.answer : ""}
              </p>
            </article>

            <article className="content-card">
              <p className="panel-label">10. Exam Mode</p>
              <ul className="shortcut-list">
                {lesson.examShortcuts.map((shortcut) => (
                  <li key={shortcut}>{shortcut}</li>
                ))}
              </ul>
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

            <article className="content-card wide">
              <p className="panel-label">11. Connect To Big Picture</p>
              <p>{lesson.bigPicture}</p>
            </article>
          </section>
        </section>
      </main>
    </div>
  );
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}
