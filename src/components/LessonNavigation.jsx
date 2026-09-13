import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { chapterById, lessonById } from "../content/index.js";
import { useMastery } from "../state/mastery.js";
import { lessonStart, resumeStudy } from "../utils/lessonNavigation.js";
import "./LessonNavigation.css";

export default function LessonNavigation({ lesson, mode = "study" }) {
  const navigate = useNavigate();
  const { mastery } = useMastery();
  const chapter = chapterById[lesson.chapterId];
  const chapterLessonIndex = chapter.lessonIds.indexOf(lesson.id);
  const previousId = chapter.lessonIds[chapterLessonIndex - 1];
  const nextId = chapter.lessonIds[chapterLessonIndex + 1];
  const previous = previousId ? lessonById[previousId] : null;
  const next = nextId ? lessonById[nextId] : null;
  const hasPython = Object.values(lesson.levels).some((level) => level.pythonLab);
  const hasFormulas = Object.values(lesson.levels).some((level) => level.formulaIds?.length);

  return (
    <div className="lesson-navigation-hub">
      <nav className="lesson-view-links" aria-label="Lesson views">
        <Link aria-current={mode === "study" ? "page" : undefined} to={resumeStudy(lesson, mastery)}>Study</Link>
        {hasFormulas && <Link aria-current={mode === "formula" ? "page" : undefined} to={`/lessons/${lesson.id}/formula`}>Formula</Link>}
        <Link aria-current={mode === "practice" ? "page" : undefined} to={`/lessons/${lesson.id}/practice`}>Practice & exam</Link>
        {hasPython && <Link aria-current={mode === "python" ? "page" : undefined} to={`/lessons/${lesson.id}/python`}>Python</Link>}
      </nav>

      <div className="lesson-switcher">
        <div className="lesson-switcher-side">
          {previous ? <Link to={lessonStart(previous)} title={previous.title}>← Previous lesson</Link> : <span className="lesson-nav-empty" aria-hidden="true" />}
        </div>

        <label className="lesson-jump">
          <span>Jump to lesson</span>
          <select aria-label="Jump to lesson" value={lesson.id} onChange={(event) => navigate(lessonStart(lessonById[event.target.value]))}>
            {chapter.lessonIds.map((id, index) => <option key={id} value={id}>{index + 1}. {lessonById[id].title}</option>)}
          </select>
        </label>

        <div className="lesson-switcher-side">
          {next ? <Link to={lessonStart(next)} title={next.title}>Next lesson →</Link> : <span className="lesson-nav-empty" aria-hidden="true" />}
        </div>

        <p className="lesson-position">Lesson {chapterLessonIndex + 1} of {chapter.lessonIds.length} · {chapter.shortTitle}</p>
      </div>
    </div>
  );
}
