import React, { startTransition, useEffect, useState } from "react";
import {
  curriculumStages,
  dashboardTopicCards,
  foundationChecklist,
  futureModules,
  lessons,
  notationStarterKit,
  prepOutcomes
} from "./lessonData.js";
import PythonPlayground from "./PythonPlayground.jsx";
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
  { key: "exam", label: "Exam Prep" },
  { key: "python", label: "Python" }
];
const pythonSectionTabs = [
  { key: "explanation", label: "Explanation" },
  { key: "python", label: "Python Code" },
  { key: "exam", label: "Exam Prep" }
];

const topicAreas = ["All", ...new Set(lessons.map((lesson) => lesson.stage))];
const difficultyLevels = ["All", ...new Set(lessons.map((lesson) => lesson.difficulty))];
const firstPythonLesson = lessons.find((entry) => entry.key === "python-basics") ?? lessons[0];

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
  const [revealedExamAnswers, setRevealedExamAnswers] = useState({});
  const [problemAnswer, setProblemAnswer] = useState("");
  const [problemFeedback, setProblemFeedback] = useState("");
  const [showConceptAnswer, setShowConceptAnswer] = useState(false);
  const [revealedPythonQuestions, setRevealedPythonQuestions] = useState({});
  const [filters, setFilters] = useState({
    topic: "All",
    difficulty: "All",
    search: ""
  });
  const [lastVisitedLessonKey, setLastVisitedLessonKey] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return window.localStorage.getItem("ml-math-last-lesson");
  });

  const filteredLessons = lessons.filter((entry) => matchesLessonFilters(entry, filters));

  const lesson = lessons.find((entry) => entry.key === lessonKey);
  const currentValues = controlState[lesson.key];
  const result = lesson.calculate(currentValues);
  const linkedPythonLesson = lesson.pythonLessonKey
    ? lessons.find((entry) => entry.key === lesson.pythonLessonKey) ?? null
    : null;
  const activePythonCompanion =
    lesson.inlinePythonCompanion || lesson.pythonCompanion || linkedPythonLesson?.pythonCompanion || null;
  const pythonContentKey =
    lesson.inlinePythonCompanion || lesson.pythonCompanion
      ? lesson.key
      : linkedPythonLesson?.key || lesson.key;
  const showDeeperPythonLink = Boolean(lesson.inlinePythonCompanion && linkedPythonLesson);
  const showLinkedPythonLesson = Boolean(!lesson.inlinePythonCompanion && linkedPythonLesson && linkedPythonLesson.key !== lesson.key);
  const isPythonLesson = lesson.stage === "Python Programming";
  const hasPythonContent = Boolean(activePythonCompanion);
  const visibleSectionTabs = isPythonLesson
    ? pythonSectionTabs
    : hasPythonContent
      ? sectionTabs
      : sectionTabs.filter((tab) => tab.key !== "python");
  const startLesson = lessons[0];
  const lastVisitedLesson = lessons.find((entry) => entry.key === lastVisitedLessonKey) ?? null;
  const recommendedLesson = getRecommendedLesson(lastVisitedLessonKey);
  const checklistStatus = foundationChecklist.map((item) => ({
    ...item,
    lessonMatches: lessons.filter((entry) => item.tags.some((tag) => entry.foundationTags.includes(tag)))
  }));

  useEffect(() => {
    if (screen === "study" && typeof window !== "undefined") {
      window.localStorage.setItem("ml-math-home-seen", "true");
    }
  }, [screen]);

  useEffect(() => {
    if (screen === "study" && typeof window !== "undefined") {
      window.localStorage.setItem("ml-math-last-lesson", lessonKey);
      setLastVisitedLessonKey(lessonKey);
    }
  }, [lessonKey, screen]);

  useEffect(() => {
    if (!filteredLessons.length) {
      return;
    }
    if (!filteredLessons.some((entry) => entry.key === lessonKey)) {
      setLessonKey(filteredLessons[0].key);
    }
  }, [filters.topic, filters.difficulty, filters.search, lessonKey, filteredLessons]);

  useEffect(() => {
    if (!visibleSectionTabs.some((tab) => tab.key === studyTab)) {
      setStudyTab("explanation");
    }
  }, [studyTab, visibleSectionTabs]);

  function enterStudyGuide() {
    startTransition(() => {
      setScreen("study");
    });
  }

  function openLessonWithTab(nextKey, nextTab = "explanation") {
    startTransition(() => {
      setLessonKey(nextKey);
      setStudyTab(nextTab);
      setScreen("study");
      setMcqFeedback("");
      setSelectedMcq(null);
      setExtraMcqState({});
      setRevealedPractice({});
      setRevealedExamAnswers({});
      setProblemAnswer("");
      setProblemFeedback("");
      setShowConceptAnswer(false);
      setRevealedPythonQuestions({});
    });
  }

  function openLessonFromHome(nextKey) {
    openLessonWithTab(nextKey, "explanation");
  }

  function goHome() {
    startTransition(() => {
      setScreen("home");
    });
  }

  function openPythonPractice(nextKey = firstPythonLesson.key) {
    openLessonWithTab(nextKey, "python");
  }

  function switchLesson(nextKey) {
    openLessonWithTab(nextKey, "explanation");
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

  function revealExamAnswer(questionIndex) {
    setRevealedExamAnswers((current) => ({
      ...current,
      [questionIndex]: !current[questionIndex]
    }));
  }

  function updateFilters(nextFilters) {
    setFilters((current) => ({
      ...current,
      ...nextFilters
    }));
  }

  function resetFilters() {
    setFilters({
      topic: "All",
      difficulty: "All",
      search: ""
    });
  }

  if (screen === "home") {
    return (
      <div className="page-shell">
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">ML Math Studio</p>
            <h1>Build ML math in the right order, without missing the basics.</h1>
            <p className="hero-text">
              This is a study dashboard for ML and AI math prep. It keeps the roadmap
              ML-first, but fills in the foundational gaps that usually make learners
              get lost when formulas, vectors, gradients, and probability arrive too fast.
            </p>
            <div className="hero-pills">
              <span>Study guide</span>
              <span>Exam prep</span>
              <span>Python practice</span>
              <span>ML-focused</span>
            </div>
            <div className="home-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => openLessonWithTab(startLesson.key, "explanation")}
              >
                Start Here
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => openLessonWithTab(recommendedLesson.key, "exam")}
              >
                Exam Prep Entry
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => openPythonPractice()}
              >
                Practice Python
              </button>
            </div>
          </div>

          <div className="hero-card">
            <p className="hero-card-label">What This Dashboard Solves</p>
            <div className="steps">
              <div className="step">1. Shows where to begin.</div>
              <div className="step">2. Highlights critical foundations like magnitude, determinant, and z-score.</div>
              <div className="step">3. Connects each topic to ML and to Python practice.</div>
              <div className="step">4. Gives direct links into explanation, exam prep, and coding practice.</div>
            </div>
          </div>
        </header>

        <section className="dashboard-grid">
          <article className="dashboard-card">
            <p className="panel-label">Start Here</p>
            <h2 className="starter-title">{startLesson.label}</h2>
            <p className="starter-text">{startLesson.whyThisBefore}</p>
            <button type="button" className="primary-button" onClick={() => openLessonWithTab(startLesson.key, "explanation")}>
              Open first lesson
            </button>
          </article>

          <article className="dashboard-card">
            <p className="panel-label">Recommended Next Step</p>
            <h2 className="starter-title">{recommendedLesson.label}</h2>
            <p className="starter-text">
              {lastVisitedLesson
                ? `You last studied ${lastVisitedLesson.label}. The next sensible move is ${recommendedLesson.label}.`
                : "You have not started the roadmap yet, so the best next step is the first lesson."}
            </p>
            <div className="home-actions">
              <button type="button" className="primary-button" onClick={() => openLessonWithTab(recommendedLesson.key, "explanation")}>
                Continue study
              </button>
              <button type="button" className="secondary-button" onClick={() => openLessonWithTab(recommendedLesson.key, "exam")}>
                Open exam mode
              </button>
            </div>
          </article>

          <article className="dashboard-card">
            <p className="panel-label">Why This Sequence</p>
            <h2 className="starter-title">Linear algebra before calculus.</h2>
            <p className="starter-text">
              In ML, you first need to understand what the objects are: vectors,
              matrices, transformations, and similarity scores. Then calculus shows
              how those objects change during learning. Probability and statistics
              explain uncertainty, noise, and model confidence.
            </p>
          </article>
        </section>

        <section className="roadmap-panel">
          <div className="roadmap-header">
            <div>
              <p className="panel-label">Core ML Math Checklist</p>
              <h2 className="starter-title">Important foundations that should not be missed.</h2>
            </div>
            <p className="roadmap-text">
              This checklist exists so essential ideas like magnitude, transpose,
              determinant, z-score, and gradients are clearly covered in the roadmap.
            </p>
          </div>
          <div className="checklist-grid">
            {checklistStatus.map((item) => (
              <article key={item.id} className="checklist-card">
                <div className="checklist-head">
                  <span className="check-badge">Covered</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
                <div className="roadmap-topics">
                  {item.lessonMatches.map((match) => (
                    <button
                      key={`${item.id}-${match.key}`}
                      type="button"
                      className="topic-link"
                      onClick={() => openLessonWithTab(match.key, "explanation")}
                    >
                      {match.label}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap-panel">
          <div className="roadmap-header">
            <div>
              <p className="panel-label">Topic Launchpad</p>
              <h2 className="starter-title">Jump into the right block quickly.</h2>
            </div>
            <p className="roadmap-text">
              These cards are not just labels. Each one links directly into the lessons
              you are most likely to need for ML prep.
            </p>
          </div>
          <div className="topic-card-grid">
            {dashboardTopicCards.map((card) => (
              <article key={card.key} className="topic-launch-card">
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                <div className="roadmap-topics">
                  {card.lessonKeys.map((key) => {
                    const match = lessons.find((entry) => entry.key === key);
                    if (!match) {
                      return null;
                    }
                    return (
                      <button
                        key={`${card.key}-${match.key}`}
                        type="button"
                        className="topic-link"
                        onClick={() => openLessonWithTab(match.key, "explanation")}
                      >
                        {match.label}
                      </button>
                    );
                  })}
                </div>
                <div className="home-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => openLessonWithTab(card.lessonKeys[0], "explanation")}
                  >
                    Open topic
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap-panel">
          <div className="roadmap-header">
            <div>
              <p className="panel-label">What This Prepares You For</p>
              <h2 className="starter-title">Why this roadmap matters for ML.</h2>
            </div>
          </div>
          <div className="prep-grid">
            {prepOutcomes.map((item) => (
              <article key={item} className="prep-card">
                <p>{item}</p>
              </article>
            ))}
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
              <p className="panel-label">Notation Survival Kit</p>
              <h2 className="starter-title">Decode the symbols that usually freeze people.</h2>
            </div>
            <p className="roadmap-text">
              Use this before or during hard lessons. The point is not to memorize symbols in isolation,
              but to stop notation from blocking understanding.
            </p>
          </div>
          <div className="notation-grid">
            {notationStarterKit.map((item) => (
              <article key={item.symbol} className="notation-card">
                <strong className="notation-symbol">{item.symbol}</strong>
                <p className="notation-read">{item.readAs}</p>
                <p>{item.meaning}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap-panel">
          <div className="roadmap-header">
            <div>
              <p className="panel-label">Curriculum Roadmap</p>
              <h2 className="starter-title">What is inside the study workspace right now.</h2>
            </div>
            <p className="roadmap-text">
              Use this filtered view when you want to browse the full roadmap rather than jump in through the dashboard.
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
              <p className="panel-label">Full Lesson List</p>
              <h2 className="starter-title">Open any lesson directly.</h2>
            </div>
          </div>
          <LessonFilters
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            filteredCount={filteredLessons.length}
            totalCount={lessons.length}
          />
          <div className="future-list">
            {filteredLessons.map((item) => (
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
          {filteredLessons.length === 0 ? (
            <p className="empty-state">
              No lessons match that filter yet. Try a different topic area, difficulty, or keyword.
            </p>
          ) : null}
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
            Explanation first, then examples, practice, exam prep, and Python when needed.
          </p>
        </div>
            <div className="study-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              openPythonPractice(
                lesson.inlinePythonCompanion || lesson.pythonCompanion
                  ? lesson.key
                  : linkedPythonLesson?.key || firstPythonLesson.key
              )
            }
          >
            Practice Code
          </button>
          <button type="button" className="secondary-button" onClick={goHome}>
            Home / Roadmap
          </button>
        </div>
      </header>

      <main className="workspace">
        <aside className="lesson-nav">
          <p className="panel-label">Lessons In Order</p>
          <LessonFilters
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            filteredCount={filteredLessons.length}
            totalCount={lessons.length}
            compact
          />
          <div className="lesson-tabs">
            {filteredLessons.map((item) => (
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
          {filteredLessons.length === 0 ? (
            <p className="empty-state">
              No lessons match your current filter. Reset the filters to see the full path again.
            </p>
          ) : null}

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
            {visibleSectionTabs.map((tab) => (
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

                {lesson.notationGuide?.length ? (
                  <article className="content-card wide">
                    <p className="panel-label">Notation Decoder</p>
                    <div className="notation-grid lesson-notation-grid">
                      {lesson.notationGuide.map((item) => (
                        <div key={`${lesson.key}-${item.symbol}`} className="notation-card">
                          <strong className="notation-symbol">{item.symbol}</strong>
                          <p className="notation-read">{item.readAs}</p>
                          <p>{item.meaning}</p>
                          {item.whyItShowsUp ? <p className="notation-why">{item.whyItShowsUp}</p> : null}
                        </div>
                      ))}
                    </div>
                  </article>
                ) : null}

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

                {lesson.importantFoundations?.length ? (
                  <article className="content-card wide">
                    <p className="panel-label">Important Foundations Covered Here</p>
                    <ul className="shortcut-list">
                      {lesson.importantFoundations.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ) : null}

                {lesson.advancedExplanation ? (
                  <article className="content-card wide">
                    <p className="panel-label">Advanced Layer</p>
                    <p>{lesson.advancedExplanation}</p>
                  </article>
                ) : null}

                {lesson.commonMistakes?.length ? (
                  <article className="content-card">
                    <p className="panel-label">Common Traps</p>
                    <ul className="shortcut-list">
                      {lesson.commonMistakes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ) : null}

                {lesson.examAngles?.length ? (
                  <article className="content-card">
                    <p className="panel-label">Exam Lens</p>
                    <ul className="shortcut-list">
                      {lesson.examAngles.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ) : null}

                {lesson.pythonLessonKey ? (
                  <article className="content-card">
                    <p className="panel-label">Practice This In Python</p>
                    <p>
                      This math topic has a matching Python lesson. Use it when you want to turn
                      the idea into actual exam-style code.
                    </p>
                    <button type="button" onClick={() => openPythonPractice(lesson.pythonLessonKey)}>
                      Open linked Python lesson
                    </button>
                  </article>
                ) : null}

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

                {lesson.codeExample ? (
                  <article className="content-card wide">
                    <p className="panel-label">{lesson.codeExample.title}</p>
                    <div className="code-card">
                      <pre className="code-block">
                        <code>{lesson.codeExample.code}</code>
                      </pre>
                    </div>
                    {lesson.codeExample.output ? (
                      <div className="code-output">
                        <strong>Output</strong>
                        <pre className="code-block compact">
                          <code>{lesson.codeExample.output}</code>
                        </pre>
                      </div>
                    ) : null}
                    {lesson.codeExample.explanation ? <p>{lesson.codeExample.explanation}</p> : null}
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
                            {(item.steps?.length ?? 0) > 0 ? (
                              <div className="steps">
                                {item.steps.map((step, stepIndex) => (
                                  <div key={`${lesson.key}-practice-step-${index + 1}-${stepIndex + 1}`} className="step">
                                    {stepIndex + 1}. {step}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="steps">
                                <div className="step">1. Identify the concept the question is testing.</div>
                                <div className="step">2. Apply the main rule carefully.</div>
                                <div className="step">3. Check whether the final answer makes intuitive sense.</div>
                              </div>
                            )}
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

              {lesson.examAngles?.length ? (
                <article className="content-card">
                  <p className="panel-label">Exam Patterns To Expect</p>
                  <ul className="shortcut-list">
                    {lesson.examAngles.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ) : null}

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
                        <p className="question">
                          <strong>Q{index + 1}.</strong> {item.prompt}
                        </p>
                        <button type="button" onClick={() => revealExamAnswer(index)}>
                          {revealedExamAnswers[index] ? "Hide solution" : "Reveal solution"}
                        </button>
                        {revealedExamAnswers[index] ? (
                          <div className="revealed-solution">
                            <p className="feedback">{item.answer}</p>
                            {item.explanation ? <p>{item.explanation}</p> : null}
                            {item.steps?.length ? (
                              <div className="steps compact-steps">
                                {item.steps.map((step, stepIndex) => (
                                  <div
                                    key={`${lesson.key}-exam-step-${index + 1}-${stepIndex + 1}`}
                                    className="step"
                                  >
                                    {stepIndex + 1}. {step}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}
            </section>
          ) : null}

          {studyTab === "python" ? (
            <section className="lesson-grid">
              {activePythonCompanion ? (
                <>
                  {showLinkedPythonLesson ? (
                    <article className="content-card wide">
                      <p className="panel-label">Linked Python Lesson</p>
                      <p>
                        This topic uses the Python companion from <strong>{linkedPythonLesson.label}</strong>.
                        The code below is the practical version of the math you are studying here.
                      </p>
                      <button type="button" onClick={() => openPythonPractice(linkedPythonLesson.key)}>
                        Open full Python lesson
                      </button>
                    </article>
                  ) : null}

                  {showDeeperPythonLink ? (
                    <article className="content-card wide">
                      <p className="panel-label">Go Deeper In Python</p>
                      <p>
                        This lesson has its own Python companion here, and it also links to the deeper
                        Python lesson <strong>{linkedPythonLesson.label}</strong> for more coding practice.
                      </p>
                      <button type="button" onClick={() => openPythonPractice(linkedPythonLesson.key)}>
                        Open deeper Python lesson
                      </button>
                    </article>
                  ) : null}

                  <article className="content-card">
                    <p className="panel-label">Python Goal</p>
                    <p>{activePythonCompanion.goal}</p>
                  </article>

                  <article className="content-card">
                    <p className="panel-label">Why This Matters In Exams</p>
                    <p>{activePythonCompanion.examUse}</p>
                  </article>

                  <article className="content-card wide">
                    <p className="panel-label">{activePythonCompanion.codeTitle}</p>
                    <div className="code-card">
                      <pre className="code-block">
                        <code>{activePythonCompanion.code}</code>
                      </pre>
                    </div>
                    {activePythonCompanion.output ? (
                      <div className="code-output">
                        <strong>Output</strong>
                        <pre className="code-block compact">
                          <code>{activePythonCompanion.output}</code>
                        </pre>
                      </div>
                    ) : null}
                  </article>

                  <article className="content-card wide">
                    <p className="panel-label">Code Walkthrough</p>
                    <div className="steps">
                      {activePythonCompanion.explainSteps.map((step, index) => (
                        <div key={`${pythonContentKey}-python-step-${index + 1}`} className="step">
                          {index + 1}. {step}
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="content-card">
                    <p className="panel-label">Common Python Traps</p>
                    <ul className="shortcut-list">
                      {activePythonCompanion.traps.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>

                  <article className="content-card">
                    <p className="panel-label">Python Exam Tasks</p>
                    <ul className="shortcut-list">
                      {activePythonCompanion.examTasks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>

                  {(activePythonCompanion.gradedQuestions?.length ?? 0) > 0 ? (
                    <article className="content-card wide">
                      <p className="panel-label">Graded-Style Coding Questions</p>
                      <div className="extra-mcq-list">
                        {activePythonCompanion.gradedQuestions.map((item, index) => (
                          <div key={`${pythonContentKey}-graded-python-${index + 1}`} className="extra-mcq-card">
                            <p className="question">
                              <strong>Q{index + 1}.</strong> {item.prompt}
                            </p>
                            <div className="code-card">
                              <pre className="code-block">
                                <code>{item.starterCode}</code>
                              </pre>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedPythonQuestions((current) => ({
                                  ...current,
                                  [index]: !current[index]
                                }))
                              }
                            >
                              {revealedPythonQuestions[index] ? "Hide solution" : "Reveal solution"}
                            </button>
                            {revealedPythonQuestions[index] ? (
                              <div className="revealed-solution">
                                <p>{item.explanation}</p>
                                <div className="code-card">
                                  <pre className="code-block">
                                    <code>{item.solution}</code>
                                  </pre>
                                </div>
                                {item.output ? (
                                  <div className="code-output">
                                    <strong>Expected output</strong>
                                    <pre className="code-block compact">
                                      <code>{item.output}</code>
                                    </pre>
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </article>
                  ) : null}

                  <PythonPlayground
                    lessonKey={pythonContentKey}
                    initialCode={activePythonCompanion.code}
                  />
                </>
              ) : (
                <article className="content-card wide">
                  <p className="panel-label">Python Companion</p>
                  <p>
                    This lesson does not have a dedicated Python companion yet. The separate Python
                    chapter in the roadmap covers exam-style programming practice directly.
                  </p>
                </article>
              )}
            </section>
          ) : null}
        </section>
      </main>
    </div>
  );
}

function VisualPanel({ lesson, result, currentValues, updateControl }) {
  const visualAnalogy = lesson.visualAnalogy;
  const visualScenario = lesson.visualScenario;

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
          {visualAnalogy ? (
            <div className="visual-analogy">
              <p className="panel-label">{visualAnalogy.title}</p>
              <p>{visualAnalogy.intro}</p>
              {visualAnalogy.controls.length ? (
                <div className="control-meaning-list">
                  {visualAnalogy.controls.map((item) => (
                    <div key={`${lesson.key}-${item.label}`} className="control-meaning-card">
                      <strong>{item.label}</strong>
                      <span>{item.meaning}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <p className="visual-story">{visualAnalogy.summary(currentValues, result)}</p>
            </div>
          ) : null}
          {visualScenario ? (
            <div className="visual-scenario">
              <p className="panel-label">{visualScenario.title}</p>
              <p>{visualScenario.scenario}</p>
              <div className="control-meaning-list">
                <div className="control-meaning-card">
                  <strong>What The Graph Means</strong>
                  <span>{visualScenario.graphMeaning}</span>
                </div>
                <div className="control-meaning-card">
                  <strong>Why It Matters In ML</strong>
                  <span>{visualScenario.mlBridge}</span>
                </div>
              </div>
              {visualScenario.summary ? (
                <p className="visual-story">{visualScenario.summary(currentValues, result)}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function LessonFilters({ filters, onChange, onReset, filteredCount, totalCount, compact = false }) {
  return (
    <div className={`filter-panel ${compact ? "compact" : ""}`}>
      <div className="filter-header">
        <p className="panel-label">Browse Lessons</p>
        <span className="filter-count">
          Showing {filteredCount} of {totalCount}
        </span>
      </div>

      <label className="filter-search">
        <span>Search by lesson or keyword</span>
        <input
          type="text"
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Try vectors, Bayes, gradient..."
        />
      </label>

      <div className="filter-group">
        <span className="filter-label">Topic area</span>
        <div className="filter-chip-row">
          {topicAreas.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${filters.topic === item ? "active" : ""}`}
              onClick={() => onChange({ topic: item })}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <label className="filter-select">
          <span>Difficulty</span>
          <select
            value={filters.difficulty}
            onChange={(event) => onChange({ difficulty: event.target.value })}
          >
            {difficultyLevels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="secondary-button" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function getRecommendedLesson(lastVisitedLessonKey) {
  if (!lastVisitedLessonKey) {
    return lessons[0];
  }

  const currentIndex = lessons.findIndex((entry) => entry.key === lastVisitedLessonKey);
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return lessons[0];
  }

  return lessons[currentIndex + 1];
}

function matchesLessonFilters(lesson, filters) {
  const searchHaystack = [
    lesson.label,
    lesson.stage,
    lesson.navDescription,
    lesson.subtitle,
    lesson.mlPurpose
  ]
    .join(" ")
    .toLowerCase();

  const matchesTopic = filters.topic === "All" || lesson.stage === filters.topic;
  const matchesDifficulty =
    filters.difficulty === "All" || lesson.difficulty === filters.difficulty;
  const matchesSearch =
    filters.search.trim() === "" || searchHaystack.includes(filters.search.trim().toLowerCase());

  return matchesTopic && matchesDifficulty && matchesSearch;
}
