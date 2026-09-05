import React from "react";
import { Link } from "react-router-dom";
import { chapters, getChapterLessons, lessonById, lessons } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

function guidedLessonComplete(mastery, lesson) {
  return lesson.beginnerSteps?.every((step) => mastery.completedSteps?.[lesson.id]?.[step.id]);
}

export default function DashboardPage() {
  const { mastery, recommendation } = useMastery();
  const guidedLessons = lessons.filter((lesson) => lesson.beginnerSteps?.length);
  const next = lessonById[recommendation.lessonId];
  const nextStep = next.beginnerSteps?.find((step) => step.id === recommendation.level);
  const completedGuidedLessons = guidedLessons.filter((lesson) => guidedLessonComplete(mastery, lesson)).length;
  const visitedGuidedSteps = guidedLessons.reduce((count, lesson) => count + lesson.beginnerSteps.filter((step) => mastery.completedSteps?.[lesson.id]?.[step.id]).length, 0);
  const totalGuidedSteps = guidedLessons.reduce((count, lesson) => count + lesson.beginnerSteps.length, 0);
  const nextPath = next.beginnerSteps?.length ? `/lessons/${next.id}/${nextStep?.id || "start"}` : `/lessons/${next.id}/study`;

  return (
    <div className="page learning-home chapter-first-home">
      <header className="learning-home-heading">
        <p className="section-label">ML Math Studio</p>
        <h1>Learn the maths behind machine learning.</h1>
        <p>Choose any chapter. Each lesson takes you from an everyday example to the maths and its ML application.</p>
      </header>

      <section className="home-chapters" aria-labelledby="chapters-title">
        <h2 id="chapters-title">Choose a chapter</h2>
        <div className="home-chapter-grid">
          {chapters.map((chapter, index) => {
            const chapterLessons = getChapterLessons(chapter.id);
            const complete = chapterLessons.filter((lesson) => guidedLessonComplete(mastery, lesson)).length;
            return <Link className="home-chapter-box" to={`/chapters/${chapter.id}`} key={chapter.id}>
              <div className="home-chapter-meta"><span>Chapter {index + 1}</span><span>{chapterLessons.length} lessons</span></div>
              <h3>{chapter.shortTitle}</h3>
              <p>{chapter.purpose}</p>
              <div className="home-chapter-footer"><span>{complete ? `${complete}/${chapterLessons.length} completed` : "Explore lessons"}</span><span aria-hidden="true">→</span></div>
            </Link>;
          })}
        </div>
      </section>

      <section className="continue-panel" aria-labelledby="continue-title">
        <div>
          <p className="section-label">Your next step</p>
          <h2 id="continue-title">{next.title}</h2>
          <p>{nextStep?.title || next.subtitle}</p>
          <Link className="button primary-action" to={nextPath}>{visitedGuidedSteps ? "Continue lesson" : "Start with the first lesson"}</Link>
        </div>
        <div className="foundation-progress">
          <span>Overall progress</span>
          <strong>{completedGuidedLessons} of {guidedLessons.length} lessons</strong>
          <div><i style={{ width: `${(visitedGuidedSteps / totalGuidedSteps) * 100}%` }} /></div>
          <small>{visitedGuidedSteps} of {totalGuidedSteps} small steps visited</small>
        </div>
      </section>
    </div>
  );
}
