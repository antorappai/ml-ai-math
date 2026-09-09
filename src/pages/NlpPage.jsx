import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { nlpIntroduction, nlpSections } from '../content/nlpGuide.js';

export default function NlpPage() {
  const { sectionId } = useParams();
  const [active, setActive] = useState(sectionId || '1');
  const valid = !sectionId || nlpSections.some(section => section.id === sectionId);
  const jump = (id) => document.getElementById(`nlp-section-${id}`)?.scrollIntoView?.({ block: 'start', behavior: 'instant' });
  useEffect(() => {
    if (sectionId) jump(sectionId);
    else window.scrollTo?.(0, 0);
  }, [sectionId]);
  useEffect(() => {
    let frame;
    const update = () => {
      let current = nlpSections[0].id;
      for (const section of nlpSections) {
        if (document.getElementById(`nlp-section-${section.id}`)?.getBoundingClientRect().top <= 150) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);
  if (!valid) return <Navigate to="/nlp" replace />;
  return <div className="page nlp-page">
    <Link to="/dashboard">← All units</Link>
    <div className="nlp-reading-layout">
      <nav className="nlp-sidebar" aria-label="NLP sections">
        <h2>Sections</h2>
        {nlpSections.map(section => <Link key={section.id} to={`/nlp/${section.id}`} aria-current={active === section.id ? 'location' : undefined} onClick={() => jump(section.id)}>{section.title}</Link>)}
      </nav>
      <article className="nlp-markdown">
        <Markdown remarkPlugins={[remarkGfm]}>{nlpIntroduction}</Markdown>
        {nlpSections.map(section => <section id={`nlp-section-${section.id}`} key={section.id} className="nlp-reading-section">
          <Markdown remarkPlugins={[remarkGfm]}>{section.markdown}</Markdown>
        </section>)}
        <Link to="/dashboard">Back to all units →</Link>
      </article>
    </div>
  </div>;
}
