import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { nlpIntroduction, nlpSections } from '../content/nlpGuide.js';

export default function NlpPage() {
  const { sectionId } = useParams();
  const index = nlpSections.findIndex((section) => section.id === sectionId);
  useEffect(() => { window.scrollTo?.(0, 0); }, [sectionId]);
  if (sectionId && index < 0) return <Navigate to="/nlp" replace />;
  const section = nlpSections[index];
  return <div className="page nlp-page">
    <Link to="/dashboard">← All units</Link>
    {!section ? <>
      <div className="nlp-markdown"><Markdown remarkPlugins={[remarkGfm]}>{nlpIntroduction}</Markdown></div>
      <nav className="home-chapter-grid" aria-label="NLP sections">
        {nlpSections.map((item) => <Link className="home-chapter-box" key={item.id} to={`/nlp/${item.id}`}><h2>{item.title}</h2></Link>)}
      </nav>
    </> : <>
      <nav className="nlp-navigation" aria-label="Section navigation">
        <Link to="/nlp">All NLP sections</Link>
        {index > 0 && <Link to={`/nlp/${nlpSections[index - 1].id}`}>← Previous section</Link>}
        {index < nlpSections.length - 1 && <Link to={`/nlp/${nlpSections[index + 1].id}`}>Next section →</Link>}
      </nav>
      <article className="nlp-markdown"><Markdown remarkPlugins={[remarkGfm]}>{section.markdown.replace(/^## /, '# ')}</Markdown></article>
      <nav className="nlp-navigation" aria-label="Continue reading">
        <Link to="/nlp">All NLP sections</Link>
        {index < nlpSections.length - 1 ? <Link to={`/nlp/${nlpSections[index + 1].id}`}>Next: {nlpSections[index + 1].title} →</Link> : <Link to="/dashboard">Back to all units →</Link>}
      </nav>
    </>}
  </div>;
}
