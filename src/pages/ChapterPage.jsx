import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { chapterById, getChapterLessons } from "../content/index.js";
import { useMastery } from "../state/mastery.js";
import { resumeStudy } from "../utils/lessonNavigation.js";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const chapter = chapterById[chapterId];
  const { mastery } = useMastery();
  if (!chapter) return <Navigate to="/dashboard" replace />;
  if (chapter.id === "deep-learning") return <Navigate to="/deep-learning" replace />;
  const lessons = getChapterLessons(chapter.id);
  const nextLesson = lessons.find((lesson) => !lesson.beginnerSteps?.every((step) => mastery.completedSteps?.[lesson.id]?.[step.id])) || lessons[0];
  return <Navigate to={resumeStudy(nextLesson, mastery)} replace />;
}
