import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { coursePacks, lessonById } from "../content/index.js";

export default function CoursePackPage() {
  const { packId } = useParams();
  const pack = coursePacks.find((item) => item.id === packId);
  if (!pack) return <Navigate to="/dashboard" replace />;
  return <div className="page course-pack-page"><header className="page-title"><p className="eyebrow">Optional course pack</p><h1>{pack.title}</h1><p>{pack.description}</p></header><div className="pack-list">{pack.lessonIds.map((id, index) => { const lesson = lessonById[id]; return <article key={id}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{lesson.title}</h2><p>{lesson.subtitle}</p></div><Link to={`/lessons/${id}/basics`}>Start lesson →</Link></article>; })}</div><aside className="info-strip">Course packs reorganize the universal curriculum for a specific module. They do not duplicate or weaken the main learning path.</aside></div>;
}

