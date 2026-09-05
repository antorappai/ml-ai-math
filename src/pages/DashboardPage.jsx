import React from "react";
import { Link } from "react-router-dom";
import { chapters, getChapterLessons, lessonById, lessons } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

function guidedLessonComplete(mastery, lesson) {
  return lesson.beginnerSteps?.every((step) => mastery.completedSteps?.[lesson.id]?.[step.id]);
}

export default function DashboardPage() {
  const { mastery, recommendation } = useMastery();
  const foundations = chapters.find((chapter) => chapter.id === "foundations");
  const foundationLessons = getChapterLessons(foundations.id);
  const laterChapters = chapters.filter((chapter) => chapter.id !== foundations.id);
  const guidedLessons = lessons.filter((lesson) => lesson.beginnerSteps?.length);
  const next = lessonById[recommendation.lessonId];
  const nextStep = next.beginnerSteps?.find((step) => step.id === recommendation.level);
  const completedLessons = foundationLessons.filter((lesson) => guidedLessonComplete(mastery, lesson)).length;
  const completedGuidedLessons = guidedLessons.filter((lesson) => guidedLessonComplete(mastery, lesson)).length;
  const visitedGuidedSteps = guidedLessons.reduce((count, lesson) => count + lesson.beginnerSteps.filter((step) => mastery.completedSteps?.[lesson.id]?.[step.id]).length, 0);
  const totalGuidedSteps = guidedLessons.reduce((count, lesson) => count + lesson.beginnerSteps.length, 0);
  const nextPath = next.beginnerSteps?.length ? `/lessons/${next.id}/${nextStep?.id || "start"}` : `/lessons/${next.id}/study`;

  return (
    <div className="page learning-home">
      <header className="learning-home-heading">
        <p className="section-label">Your learning path</p>
        <h1>Learn the maths behind machine learning—one idea at a time.</h1>
        <p>Every Foundations lesson begins with an everyday example. Symbols and ML applications come after the idea makes sense.</p>
      </header>

      <section className="continue-panel" aria-labelledby="continue-title">
        <div>
          <p className="section-label">Continue learning</p>
          <h2 id="continue-title">{next.title}</h2>
          <p>{nextStep?.title || next.subtitle}</p>
          <Link className="button primary-action" to={nextPath}>{visitedGuidedSteps ? "Continue lesson" : "Start with the first lesson"}</Link>
        </div>
        <div className="foundation-progress">
          <span>Guided-path progress</span>
          <strong>{completedGuidedLessons} of {guidedLessons.length} lessons</strong>
          <div><i style={{ width: `${(visitedGuidedSteps / totalGuidedSteps) * 100}%` }} /></div>
          <small>{visitedGuidedSteps} of {totalGuidedSteps} small steps visited · Foundations {completedLessons}/{foundationLessons.length}</small>
        </div>
      </section>

      <section className="foundation-roadmap" aria-labelledby="roadmap-title">
        <div className="quiet-section-heading"><div><p className="section-label">Start from the beginning</p><h2 id="roadmap-title">Foundations roadmap</h2></div><p>Nine short lessons build the language needed for later ML topics.</p></div>
        <ol className="roadmap-list">
          {foundationLessons.map((lesson, index) => {
            const completed = guidedLessonComplete(mastery, lesson);
            const currentStep = lesson.beginnerSteps.find((step) => !mastery.completedSteps?.[lesson.id]?.[step.id]) || lesson.beginnerSteps[0];
            const lessonVisited = lesson.beginnerSteps.filter((step) => mastery.completedSteps?.[lesson.id]?.[step.id]).length;
            return (
              <li key={lesson.id} className={completed ? "complete" : ""}>
                <Link to={`/lessons/${lesson.id}/${currentStep.id}`}>
                  <span className="roadmap-number">{completed ? "✓" : index + 1}</span>
                  <div><h3>{lesson.title}</h3><p>{lesson.subtitle}</p></div>
                  <small>{completed ? "Completed" : lessonVisited ? `${lessonVisited}/7 steps` : "Not started"}</small>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="later-learning" aria-labelledby="later-title">
        <div className="quiet-section-heading"><div><p className="section-label">When you feel ready</p><h2 id="later-title">Continue into ML mathematics</h2></div><p>These chapters remain available, but Foundations is the recommended starting point.</p></div>
        <div className="later-chapter-grid">
          {laterChapters.map((chapter) => <Link to={`/chapters/${chapter.id}`} key={chapter.id}><span>Phase {chapter.phase}</span><h3>{chapter.shortTitle}</h3><p>{chapter.purpose}</p></Link>)}
        </div>
      </section>
    </div>
  );
}
