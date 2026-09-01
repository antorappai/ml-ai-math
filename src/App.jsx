import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import { MasteryProvider } from "./state/mastery.js";
import DashboardPage from "./pages/DashboardPage.jsx";
import ChapterPage from "./pages/ChapterPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import FormulaLibraryPage from "./pages/FormulaLibraryPage.jsx";
import PracticePage from "./pages/PracticePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import CoursePackPage from "./pages/CoursePackPage.jsx";

export default function App() {
  return (
    <MasteryProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="chapters/:chapterId" element={<ChapterPage />} />
            <Route path="lessons/:lessonId/:level" element={<LessonPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="formulas" element={<FormulaLibraryPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="course-packs/:packId" element={<CoursePackPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </MasteryProvider>
  );
}
