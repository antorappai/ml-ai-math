import React from "react";
import { Link, useParams } from "react-router-dom";
import { chapterById, getChapterLessons } from "../content/index.js";
import { useMastery } from "../state/mastery.js";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const chapter = chapterById[chapterId];
  const { mastery } = useMastery();
  if (!chapter) return <div className="page empty-state"><h1>Chapter not found</h1><Link to="/dashboard">Return to dashboard</Link></div>;
  const lessons = getChapterLessons(chapter.id);

  return (
    <div className="page chapter-page">
      <header className={`chapter-hero accent-${chapter.accent}`}><p className="eyebrow">Phase {chapter.phase} · {lessons.length} topics</p><h1>{chapter.title}</h1><p>{chapter.purpose}</p></header>
      <section className="lesson-map">
        {lessons.map((lesson, index) => {
          const complete = mastery.completedLevels[lesson.id] || {};
          const completedCount = ["basics", "core", "advanced"].filter((level) => complete[level]).length;
          return <article className="lesson-row" key={lesson.id}><span className="lesson-number">{String(index + 1).padStart(2, "0")}</span><div className="lesson-row-copy"><p className="eyebrow">{lesson.tags.slice(0, 3).join(" · ")}</p><h2>{lesson.title}</h2><p>{lesson.subtitle}</p><div className="lesson-row-action"><Link to={`/lessons/${lesson.id}/study`}>Open lesson</Link><span>{completedCount}/3 sections complete</span></div></div>{lesson.projectIds.length > 0 && <span className="project-flag">Project linked</span>}</article>;
        })}
      </section>
      <div className="chapter-practice-link"><div><p className="eyebrow">Ready to test yourself?</p><h2>Chapter practice is kept separate from the lessons.</h2></div><Link className="button" to="/practice">Open practice</Link></div>
    </div>
  );
}
