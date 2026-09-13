import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CourseSidebar from "../components/CourseSidebar.jsx";
import { nlpIntroduction, nlpSections } from "../content/nlpGuide.js";

const sectionChecks = {
  "1": { prompt: "What are the two choices to identify before choosing an NLP model?", options: ["The input representation and the required output", "Only the programming language", "Only the number of documents"], answer: 0, explanation: "NLP systems need both a representation of language and a clearly defined task/output." },
  "2": { prompt: "Should stopwords always be removed?", options: ["Yes", "No — it depends on the task", "Only in neural networks"], answer: 1, explanation: "A word such as 'not' can carry essential meaning, so preprocessing decisions must match the task." },
  "3": { prompt: "What does TF-IDF add beyond raw word frequency?", options: ["A measure of how distinctive a term is across documents", "A grammar tree", "A transformer layer"], answer: 0, explanation: "IDF reduces the influence of terms that occur throughout the document collection." },
  "4": { prompt: "What is the difference between context and a feature?", options: ["Context is surrounding information; a feature is a measurable clue extracted from it", "They are always identical", "A feature is always a whole sentence"], answer: 0, explanation: "The context is the source of information; features are the values supplied to a model." },
  "5": { prompt: "Why can the word 'book' receive different POS tags?", options: ["Its grammatical role changes with context", "Its spelling changes", "POS tags are random"], answer: 0, explanation: "'Book' is a noun in 'read a book' and a verb in 'book a hotel'." },
  "6": { prompt: "What does semantic role labelling add beyond POS?", options: ["The role a phrase plays in an event, such as Agent or Instrument", "Only lowercasing", "A TF-IDF weight"], answer: 0, explanation: "POS describes grammatical category; semantic roles describe participation in an event." },
  "7": { prompt: "What does WordNet group word meanings into?", options: ["Synsets", "Batches", "Attention heads"], answer: 0, explanation: "A synset represents a set of synonymous word senses and connects to other meanings through lexical relations." },
  "8": { prompt: "How does classic Lesk choose a word sense?", options: ["By maximizing overlap between context and dictionary gloss words", "By training a transformer", "By counting characters only"], answer: 0, explanation: "Lesk compares context words with the glosses of candidate senses." },
  "9": { prompt: "Can the same TF-IDF representation feed different classifiers?", options: ["Yes — for example Naive Bayes, Logistic Regression, or SVM", "No, TF-IDF only works with one model", "Only after an LSTM"], answer: 0, explanation: "Representation and classifier are separate modelling choices." },
  "10": { prompt: "What are the two central probability types in an HMM tagger?", options: ["Transition and emission probabilities", "Precision and recall", "Query and key probabilities"], answer: 0, explanation: "Transitions model tag-to-tag movement; emissions model how likely a word is under a tag." },
  "11": { prompt: "Why is a CRF useful for NER?", options: ["It scores complete label sequences and can use many overlapping features", "It labels every token independently", "It removes the need for training data"], answer: 0, explanation: "CRFs combine observation features with relationships between neighbouring labels." },
  "12": { prompt: "When both false positives and false negatives matter, which metric balances precision and recall?", options: ["F1", "Vocabulary size", "Training epoch"], answer: 0, explanation: "F1 is the harmonic mean of precision and recall." },
  "13": { prompt: "What is the key difference between a classic word embedding and a contextual embedding?", options: ["A contextual embedding can change for the same token in different sentences", "Classic embeddings contain no numbers", "Contextual embeddings are always one-dimensional"], answer: 0, explanation: "Transformer representations depend on the surrounding tokens, so 'bank' can be represented differently in financial and river contexts." },
  "14": { prompt: "What does an RNN hidden state try to carry?", options: ["Information from earlier sequence positions", "Only the final label name", "Image padding"], answer: 0, explanation: "The recurrent state summarizes previous sequence information for later steps." },
  "15": { prompt: "In attention, what do the normalized attention weights mix?", options: ["Value vectors", "Learning rates", "Target labels"], answer: 0, explanation: "Queries and keys create the scores; the resulting weights combine the values." }
};

function SectionCheck({ check }) {
  const [chosen, setChosen] = useState(null);
  if (!check) return null;
  const answered = chosen !== null;
  return (
    <section className="deep-section-checks" aria-label="Quick check">
      <p className="section-label">Quick check</p>
      <p><strong>{check.prompt}</strong></p>
      <div>
        {check.options.map((option, index) => (
          <button
            type="button"
            key={option}
            className={answered && index === check.answer ? "correct" : ""}
            onClick={() => setChosen(index)}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && <p className={chosen === check.answer ? "check-correct" : "check-retry"}>{chosen === check.answer ? "Correct. " : "Try again. "}{check.explanation}</p>}
    </section>
  );
}

export default function NlpPage() {
  const { sectionId } = useParams();
  const [active, setActive] = useState(sectionId || "1");
  const valid = !sectionId || nlpSections.some((section) => section.id === sectionId);
  const jump = (id) => document.getElementById(`nlp-section-${id}`)?.scrollIntoView?.({ block: "start", behavior: "instant" });

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  if (!valid) return <Navigate to="/nlp" replace />;

  return (
    <div className="page nlp-page">
      <Link to="/dashboard">← All units</Link>
      <div className="lesson-support-layout">
        <aside className="lesson-support-sidebar">
          <CourseSidebar currentChapterId="nlp" currentLessonId={active} />
        </aside>
        <article className="nlp-markdown lesson-support-main">
          <Markdown remarkPlugins={[remarkGfm]}>{nlpIntroduction}</Markdown>
          {nlpSections.map((section) => (
            <section id={`nlp-section-${section.id}`} key={section.id} className="nlp-reading-section">
              <Markdown remarkPlugins={[remarkGfm]}>{section.markdown}</Markdown>
              <SectionCheck check={sectionChecks[section.id]} />
            </section>
          ))}
          <div className="course-end-links">
            <Link to="/dashboard">← Back to all units</Link>
            <Link to="/deep-learning">Next unit: Deep Learning →</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
