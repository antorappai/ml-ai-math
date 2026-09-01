import React from "react";
import { Link, useParams } from "react-router-dom";
import Assessment from "../components/Assessment.jsx";
import { chapterById, getChapterLessons, getLessonQuestions } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const chapter = chapterById[chapterId];
  const { mastery } = useMastery();
  if (!chapter) return <div className="page empty-state"><h1>Chapter not found</h1><Link to="/dashboard">Return to dashboard</Link></div>;
  const lessons = getChapterLessons(chapter.id);
  const questions = lessons.flatMap(getLessonQuestions);

  return (
    <div className="page chapter-page">
      <header className={`chapter-hero accent-${chapter.accent}`}><p className="eyebrow">Phase {chapter.phase} · {lessons.length} topics</p><h1>{chapter.title}</h1><p>{chapter.purpose}</p></header>
      <section className="lesson-map">
        {lessons.map((lesson, index) => {
          const complete = mastery.completedLevels[lesson.id] || {};
          return <article className="lesson-row" key={lesson.id}><span className="lesson-number">{String(index + 1).padStart(2, "0")}</span><div className="lesson-row-copy"><p className="eyebrow">{lesson.tags.slice(0, 3).join(" · ")}</p><h2>{lesson.title}</h2><p>{lesson.subtitle}</p><div className="level-links">{["basics", "core", "advanced"].map((level) => <Link className={complete[level] ? "level-complete" : ""} to={`/lessons/${lesson.id}/${level}`} key={level}>{complete[level] ? "✓ " : ""}{level}</Link>)}</div></div>{lesson.projectIds.length > 0 && <span className="project-flag">Project linked</span>}</article>;
        })}
      </section>
      <Assessment questions={questions} limit={10} testId={`chapter-${chapter.id}`} title={`${chapter.shortTitle} chapter test`} />
    </div>
  );
}

