import React, { useState } from "react";
import { lessons } from "./lessonData.js";
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
    setLessonKey(nextKey);
    setMcqFeedback("");
    setSelectedMcq(null);
    setProblemAnswer("");
    setProblemFeedback("");
    setShowConceptAnswer(false);
  }

  function updateControl(controlId, value) {
    setControlState((current) => ({
      ...current,
      [lesson.key]: {
        ...current[lesson.key],
        [controlId]: value
      }
    }));
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
          <h1>Understand ML math without getting lost in formulas.</h1>
          <p className="hero-text">
            Built for beginners who did not come from a heavy math background.
            Learn the meaning first, decode the symbols, and only then use the
            formula.
          </p>
          <div className="hero-pills">
            <span>Beginner-first</span>
            <span>Visual before symbolic</span>
            <span>Made for ML prep</span>
          </div>
        </div>

        <div className="hero-card">
          <p className="hero-card-label">How Each Lesson Works</p>
          <ol>
            <li>Plain-English explanation</li>
            <li>Interactive picture</li>
            <li>One small formula</li>
            <li>Worked example</li>
            <li>ML use case</li>
            <li>Quick checks and shortcuts</li>
          </ol>
        </div>
      </header>

      <section className="starter-panel">
        <div>
          <p className="panel-label">Start Here</p>
          <h2 className="starter-title">No class 11/12 math background needed.</h2>
          <p className="starter-text">
            This app assumes you may be rusty on symbols, signs, and notation.
            So every lesson includes a symbol decoder and uses examples before
            abstract language.
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

      <main className="workspace">
        <aside className="lesson-nav">
          <p className="panel-label">Core Concepts</p>
          <div className="lesson-tabs">
            {lessons.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`lesson-tab ${item.key === lesson.key ? "active" : ""}`}
                onClick={() => switchLesson(item.key)}
              >
                <strong>{item.label}</strong>
                <span>{item.navDescription}</span>
              </button>
            ))}
          </div>

          <div className="nav-note">
            <p className="panel-label">Why This Works</p>
            <p>
              Many learners get stuck because math starts with symbols. This
              product starts with meaning and lets formulas arrive later.
            </p>
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
              {result.metrics.map((metric) => (
                <span key={metric} className="metric-pill">
                  {metric}
                </span>
              ))}
            </div>
          </div>

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
              <p className="panel-label">5. Real-World ML Scenario</p>
              <p>{lesson.mlUseCase}</p>
            </article>

            <article className="content-card">
              <p className="panel-label">6. Intuition Block</p>
              <p>{lesson.intuition}</p>
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

            <article className="content-card wide">
              <p className="panel-label">11. Connect to Big Picture</p>
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
