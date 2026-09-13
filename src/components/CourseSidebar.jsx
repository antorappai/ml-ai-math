import React from "react";
import { Link } from "react-router-dom";
import { chapters, lessonById } from "../content/index.js";
import { nlpSections } from "../content/nlpGuide.js";
import { lessonStart } from "../utils/lessonNavigation.js";
import "./CourseSidebar.css";

function NlpUnit({ currentChapterId, currentLessonId }) {
  const isCurrentUnit = currentChapterId === "nlp";
  return (
    <details className={isCurrentUnit ? "current-unit" : ""} open={isCurrentUnit}>
      <summary>
        <span>NLP</span>
        <small>{nlpSections.length}</small>
      </summary>
      <div className="course-sidebar-lessons">
        {nlpSections.map((section, index) => {
          const isCurrentLesson = isCurrentUnit && section.id === currentLessonId;
          return (
            <Link
              key={section.id}
              to={`/nlp/${section.id}`}
              aria-current={isCurrentLesson ? "page" : undefined}
              className={isCurrentLesson ? "current-lesson-link" : ""}
            >
              <span className="course-lesson-number">{index + 1}</span>
              <span>{section.title}</span>
            </Link>
          );
        })}
      </div>
    </details>
  );
}

export default function CourseSidebar({ currentChapterId, currentLessonId }) {
  return (
    <nav className="course-sidebar" aria-label="Course units and lessons">
      <p className="course-sidebar-label">Course units</p>
      {chapters.map((unit) => {
        const isCurrentUnit = unit.id === currentChapterId;
        return (
          <React.Fragment key={unit.id}>
            {unit.id === "deep-learning" && <NlpUnit currentChapterId={currentChapterId} currentLessonId={currentLessonId} />}
            <details className={isCurrentUnit ? "current-unit" : ""} open={isCurrentUnit}>
              <summary>
                <span>{unit.shortTitle}</span>
                <small>{unit.lessonIds.length}</small>
              </summary>
              <div className="course-sidebar-lessons">
                {unit.lessonIds.map((id, index) => {
                  const target = lessonById[id];
                  if (!target) return null;
                  const isCurrentLesson = id === currentLessonId;
                  return (
                    <Link
                      key={id}
                      to={lessonStart(target)}
                      aria-current={isCurrentLesson ? "page" : undefined}
                      className={isCurrentLesson ? "current-lesson-link" : ""}
                    >
                      <span className="course-lesson-number">{index + 1}</span>
                      <span>{target.title}</span>
                    </Link>
                  );
                })}
              </div>
            </details>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
