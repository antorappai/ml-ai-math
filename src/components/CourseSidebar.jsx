import React from "react";
import { Link } from "react-router-dom";
import { chapters, lessonById } from "../content/index.js";
import { lessonStart } from "../utils/lessonNavigation.js";
import "./CourseSidebar.css";

export default function CourseSidebar({ currentChapterId, currentLessonId }) {
  return (
    <nav className="course-sidebar" aria-label="Course units and lessons">
      <p className="course-sidebar-label">Course units</p>
      {chapters.map((unit) => {
        const isCurrentUnit = unit.id === currentChapterId;
        return (
          <details className={isCurrentUnit ? "current-unit" : ""} key={unit.id} open={isCurrentUnit}>
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
        );
      })}
      <div className="course-sidebar-extra">
        <Link to="/nlp">NLP study guide →</Link>
      </div>
    </nav>
  );
}
