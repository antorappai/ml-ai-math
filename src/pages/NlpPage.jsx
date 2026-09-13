import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CourseSidebar from "../components/CourseSidebar.jsx";
import { nlpIntroduction, nlpSections } from "../content/nlpGuide.js";

const sectionFrames = {
  "1": {
    why: "Before choosing an NLP algorithm, you need to know what representation goes into the model and what kind of answer must come out.",
    story: "Imagine a school inbox. One system may label a whole message as urgent or routine; another may find the student name, date, and location inside the same message. The text is similar, but the task and output are different.",
    bridge: "This section gives you the map for the whole unit: text becomes a representation, a model uses that representation, and the output depends on the language task."
  },
  "2": {
    why: "Raw text is inconsistent. Tokenisation and preprocessing decide what units the model will actually see, but every cleaning choice can also remove useful information.",
    story: "In the review 'not very good', deleting the common word 'not' changes the meaning completely. Cleaning text is therefore more like editing evidence than sweeping away rubbish.",
    bridge: "These choices create the tokens that later become counts, vectors, embeddings, or transformer inputs."
  },
  "3": {
    why: "Machine-learning models calculate with numbers, not sentences. We therefore need a numerical representation of words and documents.",
    story: "Think of a shopping receipt. Bag-of-Words counts which items appear; TF-IDF also asks which items are distinctive compared with everyone else's basket; n-grams preserve short local sequences such as 'not good'.",
    bridge: "This is the classical route from language to feature vectors that can feed Logistic Regression, Naive Bayes, or SVM."
  },
  "4": {
    why: "A word by itself is often ambiguous. Nearby words provide clues about its role and meaning, and those clues can be turned into measurable features.",
    story: "The word 'bank' near 'loan' and 'approved' suggests finance; near 'river' and 'fisherman' it suggests land beside water. The surrounding words are context; counts or indicators extracted from them are features.",
    bridge: "Context windows and co-occurrence are an important stepping stone from sparse word counts toward distributional vectors and embeddings."
  },
  "5": {
    why: "Grammar tells us how a word is functioning in a particular sentence, which often changes what the system should do with it.",
    story: "In 'read a book', book is a noun. In 'book a hotel', book is a verb. The spelling is identical, but the grammatical role changes because the context changes.",
    bridge: "POS tagging turns grammatical roles into token labels and becomes useful for parsing, information extraction, and older sequence models such as HMMs and CRFs."
  },
  "6": {
    why: "Knowing that a word is a noun or verb is not enough to understand who did what to whom. Syntax and semantic roles describe relationships inside the sentence.",
    story: "In 'The teacher gave the student a laptop', grammar identifies the words, while semantic roles tell us teacher = giver, student = recipient, and laptop = thing transferred.",
    bridge: "These structures help information extraction and show why language understanding needs relationships, not just isolated word labels."
  },
  "7": {
    why: "Words have related and multiple meanings. WordNet organizes those meanings explicitly instead of treating every spelling as one flat entry.",
    story: "Think of a dictionary drawn as a network: 'car' connects to synonyms, broader categories such as 'vehicle', and narrower concepts. Each distinct meaning lives in its own sense group.",
    bridge: "WordNet gives classical NLP a structured source of lexical meaning that algorithms such as Lesk can consult."
  },
  "8": {
    why: "When one spelling has several meanings, an NLP system needs evidence from the sentence to choose the intended sense.",
    story: "For 'The bank approved my loan', compare the surrounding words with dictionary descriptions for the financial-bank sense and the river-bank sense. 'Loan' and 'approved' overlap much better with the financial meaning.",
    bridge: "Lesk makes word-sense disambiguation visible: define candidate meanings, compare each with context, then choose the best-supported sense."
  },
  "9": {
    why: "Once text has become features, we still need a model that learns how those features relate to a target label.",
    story: "A spam filter may turn each email into TF-IDF values, then let Naive Bayes, Logistic Regression, or SVM learn the boundary between spam and normal mail.",
    bridge: "Representation and classifier are separate choices: the same TF-IDF features can be tested with several classical ML models."
  },
  "10": {
    why: "Some NLP tasks predict a sequence of labels, so the current label should depend not only on the current word but also on what tends to come before it.",
    story: "In 'the student reads', seeing a determiner makes a following noun more plausible. An HMM combines that tag-to-tag expectation with how likely each word is under a tag.",
    bridge: "HMMs make two probabilities explicit: transition probabilities between hidden states and emission probabilities from states to observed words."
  },
  "11": {
    why: "Real sequence labelling often needs many overlapping clues at once and sensible relationships between neighbouring labels.",
    story: "In 'Barack Obama visited New Delhi', capitalisation, neighbouring words, word shape, and previous labels all help us produce B-PER/I-PER and B-LOC/I-LOC sequences instead of independent guesses.",
    bridge: "CRFs keep sequence structure while allowing richer features than a basic HMM, which is why they became important for tasks such as NER."
  },
  "12": {
    why: "A model can look accurate while still making the kind of mistakes that matter most. Evaluation must match the task.",
    story: "If only a few emails are spam, predicting 'not spam' for almost everything may give high accuracy. Precision asks whether spam predictions were trustworthy; recall asks how much real spam was found.",
    bridge: "Accuracy, precision, recall, and F1 connect NLP back to the model-evaluation ideas from Classical ML."
  },
  "13": {
    why: "Sparse one-hot and count vectors identify words but do not naturally place similar meanings near one another. Embeddings learn dense coordinates that can capture useful relationships.",
    story: "Imagine a map where 'cat' and 'dog' land near each other while 'airplane' is farther away. Similar usage patterns can create nearby vector positions even though the model was never handed a dictionary definition.",
    bridge: "This is where co-occurrence becomes geometry: dot products, cosine similarity, and learned vectors prepare the ground for neural NLP."
  },
  "14": {
    why: "Language arrives as a sequence, and later words can depend on information that appeared much earlier. A model therefore needs some form of memory across positions.",
    story: "When reading 'The movie I watched yesterday ... was excellent', you carry information from the earlier subject while processing the words in between. RNNs try to carry a hidden state forward; LSTMs add gates to manage that memory more carefully.",
    bridge: "RNNs and LSTMs move NLP into neural sequence modelling, while also exposing the long-range dependency and gradient problems that motivated attention."
  },
  "15": {
    why: "Recurrence forces information to travel step by step. Attention lets a token directly score which other tokens are useful for its current representation.",
    story: "In 'The animal did not cross the street because it was tired', the representation for 'it' can look back at other tokens and place more weight on the words most useful for resolving the reference.",
    bridge: "Queries and keys create relevance scores; softmax turns them into weights; those weights mix value vectors. Multi-head attention repeats this with several learned views inside a transformer block."
  }
};

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

function SectionFrame({ frame }) {
  if (!frame) return null;
  return (
    <div className="lesson-opening">
      <p className="eyebrow">Why this topic exists</p>
      <p>{frame.why}</p>
      <div className="example-story">
        <strong>Concrete language example</strong>
        <p>{frame.story}</p>
      </div>
      <div className="ml-bridge">
        <strong>Where this leads</strong>
        <p>{frame.bridge}</p>
      </div>
    </div>
  );
}

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
              <h2>{section.title}</h2>
              <SectionFrame frame={sectionFrames[section.id]} />
              <Markdown remarkPlugins={[remarkGfm]}>{section.markdown}</Markdown>
              <SectionCheck check={sectionChecks[section.id]} />
            </section>
          ))}
          <div className="course-end-links">
            <Link to="/dashboard">← Back to all units</Link>
            <Link to="/lessons/tensors-perceptrons/start">Next unit: Deep Learning →</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
