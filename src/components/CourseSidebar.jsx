import React from "react";
import { Link } from "react-router-dom";
import { chapters, lessonById } from "../content/index.js";
import { nlpSections } from "../content/nlpGuide.js";
import { lessonStart } from "../utils/lessonNavigation.js";
import "./CourseSidebar.css";

function buildUnits() {
  return chapters.flatMap((chapter) => {
    const chapterUnit = {
      id: chapter.id,
      title: chapter.shortTitle,
      count: chapter.lessonIds.length,
      startPath: lessonStart(lessonById[chapter.lessonIds[0]]),
      items: chapter.lessonIds.map((id, index) => ({
        id,
        number: index + 1,
        title: lessonById[id]?.title || id,
        path: lessonStart(lessonById[id])
      }))
    };

    if (chapter.id !== "deep-learning") return [chapterUnit];

    return [
      {
        id: "nlp",
        title: "NLP",
        count: nlpSections.length,
        startPath: "/nlp/1",
        items: nlpSections.map((section, index) => ({
          id: section.id,
          number: index + 1,
          title: section.title,
          path: `/nlp/${section.id}`
        }))
      },
      chapterUnit
    ];
  });
}

const courseUnits = buildUnits();

function CompactCourseSidebar({ currentChapterId }) {
  const currentUnit = courseUnits.find((unit) => unit.id === currentChapterId) || courseUnits[0];

  return (
    <nav className="course-sidebar course-sidebar-compact" aria-label="Course unit navigation">
      <p className="course-sidebar-label">Course</p>
      <details className="course-unit-picker">
        <summary>
          <span>{currentUnit.title}</span>
          <small>Change unit</small>
        </summary>
        <div className="course-unit-options">
          {courseUnits.map((unit) => (
            <Link
              key={unit.id}
              to={unit.startPath}
              aria-current={unit.id === currentChapterId ? "page" : undefined}
            >
              <span>{unit.title}</span>
              <small>{unit.count}</small>
            </Link>
          ))}
        </div>
      </details>
    </nav>
  );
}

export default function CourseSidebar({ currentChapterId, currentLessonId, compact = false }) {
  if (compact) return <CompactCourseSidebar currentChapterId={currentChapterId} />;

  return (
    <nav className="course-sidebar course-sidebar-full" aria-label="Course units and lessons">
      <p className="course-sidebar-label">Course units</p>
      {courseUnits.map((unit) => {
        const isCurrentUnit = unit.id === currentChapterId;
        return (
          <details className={isCurrentUnit ? "current-unit" : ""} key={unit.id} open={isCurrentUnit}>
            <summary>
              <span>{unit.title}</span>
              <small>{unit.count}</small>
            </summary>
            <div className="course-sidebar-lessons">
              {unit.items.map((item) => {
                const isCurrentLesson = isCurrentUnit && item.id === currentLessonId;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    aria-current={isCurrentLesson ? "page" : undefined}
                    className={isCurrentLesson ? "current-lesson-link" : ""}
                  >
                    <span className="course-lesson-number">{item.number}</span>
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </nav>
  );
}
