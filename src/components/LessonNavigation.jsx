import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { chapterById, lessonById } from "../content/index.js";
import { useMastery } from "../state/mastery.js";
import { adjacentLessons, lessonStart, resumeStudy } from "../utils/lessonNavigation.js";

export default function LessonNavigation({ lesson, mode = "study" }) {
  const navigate = useNavigate();
  const { mastery } = useMastery();
  const chapter = chapterById[lesson.chapterId];
  const { previous, next } = adjacentLessons(lesson);
  const hasPython = Object.values(lesson.levels).some((level) => level.pythonLab);
  const hasFormulas = Object.values(lesson.levels).some((level) => level.formulaIds?.length);
  return <div className="lesson-navigation-hub">
    <nav className="lesson-view-links" aria-label="Lesson pages">
      <Link aria-current={mode === "study" ? "page" : undefined} to={resumeStudy(lesson, mastery)}>Study guide</Link>
      {hasFormulas && <Link aria-current={mode === "formula" ? "page" : undefined} to={`/lessons/${lesson.id}/formula`}>Formula explained</Link>}
      <Link aria-current={mode === "practice" ? "page" : undefined} to={`/lessons/${lesson.id}/practice`}>Practice & exam</Link>
      {hasPython && <Link aria-current={mode === "python" ? "page" : undefined} to={`/lessons/${lesson.id}/python`}>Python lab</Link>}
    </nav>
    <div className="lesson-switcher">
      <Link to={`/chapters/${chapter.id}`}>All lessons in {chapter.shortTitle}</Link>
      <label>Jump to lesson<select aria-label="Jump to lesson" value={lesson.id} onChange={(event) => navigate(lessonStart(lessonById[event.target.value]))}>
        {chapter.lessonIds.map((id, index) => <option key={id} value={id}>{index + 1}. {lessonById[id].title}</option>)}
      </select></label>
      <nav aria-label="Between lessons">
        {previous && <Link to={lessonStart(previous)} title={previous.title}>← Previous lesson</Link>}
        {next && <Link to={lessonStart(next)} title={next.title}>Next lesson →</Link>}
      </nav>
    </div>
  </div>;
}
