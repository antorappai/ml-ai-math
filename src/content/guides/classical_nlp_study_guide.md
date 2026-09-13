# Natural Language Processing: From Words to Transformers

Natural Language Processing (NLP) is how we make human language usable by a computer.

The important idea is not to memorize a list of algorithms. It is to understand the problem each generation of NLP was trying to solve.

A useful map is:

```text
Human language
    ↓
Tokens
    ↓
Numerical representation
    ↓
Language clues and context
    ↓
A model
    ↓
A language task
    ↓
Evaluation
```

Classical NLP mostly asks humans to design useful text features and then lets a statistical model learn from them. Modern neural NLP learns more of the representation automatically. The two are connected rather than separate worlds.

This unit deliberately comes before Deep Learning. You will first understand the language problems. The Deep Learning unit then explains the neural machinery used to solve them at larger scale.

---

## 1. NLP: The Big Picture

**NLP = Natural Language Processing.**

Language is easy for people to read, but a machine-learning model cannot directly calculate with:

```text
The student reads a book.
```

The sentence must eventually become numbers.

A classical pipeline might look like:

```text
"The movie was excellent"
        ↓
Tokenise
        ↓
[the, movie, was, excellent]
        ↓
TF-IDF vector
        ↓
Logistic Regression
        ↓
Positive
```

A sequence-labelling pipeline might instead look like:

```text
Barack Obama visited India
        ↓
Tokens + word/context features
        ↓
HMM or CRF
        ↓
Barack/B-PER Obama/I-PER visited/O India/B-LOC
```

So before choosing an NLP model, ask two questions:

1. **What is the input representation?**
2. **What kind of output do I need?**

Common outputs include:

- one label for a whole document: spam / not spam
- one label for each token: noun / verb / adjective
- entity spans: person / place / organisation
- a selected word meaning
- extracted facts
- generated text

### A short historical map

```text
Rules
  ↓
Counts and probabilities
  ↓
BoW / TF-IDF / N-grams
  ↓
HMM / CRF
  ↓
Dense embeddings
  ↓
RNN / LSTM
  ↓
Attention
  ↓
Transformers / LLMs
```

The old methods are still worth learning because they make the core ideas visible: features, context, probability, sequence structure, ambiguity, and evaluation.

**Key idea:** NLP is not one algorithm. It is a collection of ways to represent language and solve language tasks.

---

## 2. Tokens and Pre-processing

The starting point is raw text:

```text
The student reads a book.
```

### Tokenisation

Tokenisation splits text into units called **tokens**.

```text
["The", "student", "reads", "a", "book", "."]
```

A token does not have to be a whole word. Modern language models often use word pieces or subword tokens.

The important distinction is:

```text
text  = the original character sequence
token = one unit the model will process
```

### Lowercasing

```text
The → the
```

This can reduce vocabulary size, but it may remove useful information. `US` and `us`, for example, are not always the same thing.

### Stopwords

Very common words such as `the`, `a`, `is`, and `of` are sometimes removed.

But removal is task-dependent:

```text
not good
```

Removing `not` would reverse the meaning.

### Stemming

Stemming chops words down using rough rules:

```text
studies, studying, studied → studi
```

It is fast, but the result may not be a real word.

### Lemmatization

Lemmatization tries to recover a proper dictionary form:

```text
studies, studying, studied → study
```

It uses more linguistic information than stemming.

### Sentence segmentation

A paragraph can also be split into sentences:

```text
The student reads. The teacher explains.
```

becomes two sentence units.

### Why preprocessing is not automatic cleaning

Do not think:

> more cleaning = better NLP

A preprocessing step is useful only if it removes irrelevant variation without destroying information needed by the task.

**Key idea:** preprocessing changes the representation. Every change should have a reason.

---

## 3. Turning Text into Numbers: One-Hot, Bag-of-Words, TF-IDF and N-grams

A classical machine-learning model needs numerical features.

### One-hot encoding

Suppose the vocabulary is:

```text
[cat, dog, book]
```

Then:

```text
cat  → [1, 0, 0]
dog  → [0, 1, 0]
book → [0, 0, 1]
```

This identifies each word, but it says nothing about meaning. The distance between `cat` and `dog` is not automatically smaller than the distance between `cat` and `book`.

### Bag-of-Words

**BoW = Bag-of-Words.**

For a document, count vocabulary words:

```text
Sentence:   cat sleeps cat
Vocabulary: [cat, dog, sleeps]
Vector:     [ 2,   0,      1]
```

The vector is useful because a classifier can now multiply those feature values by learned weights.

What BoW loses is most word order:

```text
dog bites man
man bites dog
```

can contain the same words even though the meaning is very different.

### TF-IDF

**TF-IDF = Term Frequency-Inverse Document Frequency.**

BoW asks:

> How often does this word occur here?

TF-IDF adds another question:

> Is this word distinctive, or does it occur everywhere?

A simplified form is:

```text
TF-IDF(term, document) = TF × IDF
```

where:

```text
TF  = frequency of the term in this document
IDF = log(total documents / documents containing the term)
```

If `the` occurs in almost every document, its IDF is small. A rarer word such as `photosynthesis` may receive a larger weight in a biology document collection.

### N-grams

An N-gram keeps a short sequence of neighbouring tokens.

For:

```text
not very good
```

unigrams are:

```text
not
very
good
```

bigrams include:

```text
not very
very good
```

trigrams include:

```text
not very good
```

N-grams recover some local word order, but the feature space grows quickly.

### Sparse vectors

BoW and TF-IDF usually create **sparse vectors**: vectors with many zero values.

A vocabulary may contain 50,000 terms, while one email uses only 100 of them. Most of the 50,000 positions are therefore zero.

That sounds wasteful, but classical algorithms such as Logistic Regression and SVM can work very well with sparse text vectors.

**Key idea:** classical representation usually tells the model which words or phrases occurred; it does not yet give the model a rich learned concept of meaning.

---

## 4. Context, Co-occurrence and Distributional Meaning

Words become easier to interpret when we look at their neighbours.

Consider:

```text
The bank approved my loan.
```

and:

```text
The fisherman sat on the bank beside the river.
```

The word `bank` is the same, but its surrounding words are different.

### Context window

A **context window** chooses how many nearby tokens to inspect.

For:

```text
The bank approved my loan
```

with `bank` as the target word, a window of one word might use:

```text
The [bank] approved
```

A larger window might use:

```text
The [bank] approved my loan
```

Window size is a modelling choice. Small windows often capture local grammatical or semantic relationships; larger windows capture broader topical information.

### Co-occurrence

Co-occurrence records which words appear near each other.

Financial contexts may include:

```text
bank + loan
bank + money
bank + account
```

River contexts may include:

```text
bank + river
bank + water
bank + fishing
```

This leads to the **distributional idea**:

> Words that occur in similar contexts often have related meanings.

This idea becomes extremely important later because dense word embeddings such as Word2Vec are learned from context patterns.

### Context is not the same as a feature

**Context** is the surrounding information.

A **feature** is a measurable clue extracted from that information.

Example:

```text
Current word: Obama
Previous word: Barack
Next word: visited
Starts with capital letter: yes
Suffix: -a
```

A CRF can use these features. A neural model may instead learn useful internal features automatically from vectors.

**Key idea:** context is where the information comes from; features are how a model receives that information.

---

## 5. Grammar Matters: Part-of-Speech Tagging

**POS = Part of Speech.**

POS tagging assigns a grammatical role to each token:

```text
The/DET student/NOUN reads/VERB books/NOUN
```

Common tags include:

| Tag | Meaning |
|---|---|
| NOUN | person, place, thing, or idea |
| VERB | action or state |
| ADJ | adjective |
| ADV | adverb |
| DET | determiner such as `the` or `a` |
| PRON | pronoun such as `he` or `they` |
| ADP / PREP | preposition or adposition |

Why does POS matter?

Because the same surface word can play different roles:

```text
I read a book.       → book = NOUN
I will book a hotel. → book = VERB
```

The tagger must use context, not just the word itself.

POS information can support:

- grammar checking
- parsing
- named entity recognition
- information extraction
- word-sense disambiguation
- text-to-speech

### How tagging becomes a machine-learning problem

Input:

```text
The student reads
```

Desired output:

```text
DET NOUN VERB
```

This is a **sequence-labelling** problem because each token needs a label and neighbouring labels are related.

That is why HMMs and CRFs appear later in this unit.

### Do modern transformers still need grammar?

Modern transformers do not usually require a person to supply POS tags before every task. They can learn many grammatical patterns from data.

But POS remains useful for understanding language structure, analysing model behaviour, building smaller systems, and understanding what older sequence models were explicitly trying to capture.

**Key idea:** grammar gives names to structural patterns that models need to recognise, whether those patterns are hand-engineered or learned internally.

---

## 6. Syntax, Parsing and Semantic Roles

POS tells us the job of one word. **Parsing** asks how words relate to one another.

### Constituency parsing

Constituency parsing groups words into phrases:

```text
[The student] [reads [a book]]
```

It asks questions such as:

- Which words form the noun phrase?
- Which words form the verb phrase?

### Dependency parsing

Dependency parsing connects words directly:

```text
student → subject of reads
book    → object of reads
```

This makes relationships such as subject, object, modifier, and possession explicit.

### Semantic Role Labelling

**SRL = Semantic Role Labelling.**

SRL goes one level beyond grammatical structure and asks what role a phrase plays in an event.

Example:

```text
The student opened the box with a key.
```

Possible roles:

```text
student → Agent: who performed the action?
box     → Patient/Theme: what was affected?
key     → Instrument: what was used?
```

Other roles include Location, Recipient, Source, Destination, and Experiencer.

Notice the distinction:

```text
POS: student = NOUN
Dependency: student = subject of opened
Semantic role: student = Agent
```

These are different layers of description.

### Why this matters in NLP

Parsing and semantic roles support:

- question answering
- information extraction
- relationship extraction
- grammar tools
- summarisation
- understanding who did what to whom

**Key idea:** language has structure above the individual word. NLP often needs relationships, not just word counts.

---

## 7. Lexical Semantics and WordNet

**Lexical semantics** studies word meaning and relationships between words.

### Synonymy

Words with similar meanings:

```text
student ≈ learner
large ≈ big
```

### Antonymy

Words with contrasting meanings:

```text
hot ↔ cold
good ↔ bad
```

### Hypernyms and hyponyms

A **hypernym** is a broader category. A **hyponym** is a more specific member.

```text
animal → dog
vehicle → car
```

`animal` is a hypernym of `dog`; `dog` is a hyponym of `animal`.

### Polysemy

One word has several related meanings:

```text
head of a person
head of a department
head of a table
```

### Homonymy

The same written or spoken form has unrelated meanings:

```text
bank = financial institution
bank = land beside a river
```

### WordNet

**WordNet** is a structured lexical database.

Instead of storing only words, it groups meanings into **synsets**: sets of synonymous word senses.

A simplified picture is:

```text
word
 ↓
possible senses / synsets
 ↓
relationships to other synsets
```

WordNet stores relationships such as:

- synonymy
- antonymy
- hypernymy
- hyponymy

Why is this useful?

A classical NLP system may not have learned enough from a small dataset to know that `dog` and `animal` are related. WordNet gives it an external structure of lexical knowledge.

**Key idea:** WordNet represents meanings and relationships explicitly; an embedding represents meaning indirectly through learned numbers.

---

## 8. Word Sense Disambiguation and the Lesk Algorithm

**WSD = Word Sense Disambiguation.**

WSD chooses the intended meaning of an ambiguous word using context.

Example:

```text
The bank approved my loan.
```

The likely sense is:

```text
bank → financial institution
```

But:

```text
The fisherman sat on the bank of the river.
```

suggests:

```text
bank → riverside
```

### The Lesk algorithm

Lesk is a classical dictionary-based WSD method.

The idea is simple:

1. collect the context words around the ambiguous word
2. retrieve the dictionary gloss for each possible sense
3. count overlap between context words and gloss words
4. choose the sense with the largest overlap

Suppose WordNet gives two simplified glosses:

```text
Financial bank:
financial institution, money, deposit, loan

River bank:
land beside river, water, shore
```

Sentence context:

```text
approved loan money
```

Overlap:

```text
financial sense → loan, money = 2 matches
river sense     → 0 matches
```

So Lesk chooses the financial sense.

A simplified score is:

```text
score(sense) = number of shared words between context and gloss
```

### Why Lesk can fail

Dictionary glosses are short. The context may use synonyms rather than exact matching words.

For example, `cash` may strongly suggest a financial bank even if the gloss contains only `money`.

This is one reason dense semantic representations later became useful: similarity does not have to depend on exact word overlap.

### What Lesk teaches us

Lesk is important even if we later use neural models because it exposes the central WSD problem:

> compare the current context with alternative meanings.

Modern contextual embeddings solve a much richer version of the same problem.

**Key idea:** WSD is about choosing meaning from context; Lesk does it with dictionary overlap rather than learned neural representations.

---

## 9. Classical Text Classification: Naive Bayes, Logistic Regression and SVM

Suppose the task is sentiment classification:

```text
"The movie was excellent" → Positive
"The movie was terrible"  → Negative
```

The text is first converted into features such as TF-IDF. A classifier then learns from those feature vectors.

### Naive Bayes

Naive Bayes asks:

```text
Which class makes these observed words most probable?
```

A simplified form is:

```text
score(class)
∝ P(class) × P(word1 | class) × P(word2 | class) × ...
```

It is called **naive** because it treats features as conditionally independent given the class.

That assumption is not literally true for language, but the model can still work surprisingly well.

### Logistic Regression

Logistic Regression learns one weight for each feature:

```text
z = w1x1 + w2x2 + ... + b
```

Then sigmoid converts the score into a probability for a binary class.

In a TF-IDF sentiment model, a large positive learned weight for `excellent` might push the prediction toward Positive, while `terrible` pushes it the other way.

### Support Vector Machine

An SVM tries to find a separating boundary with a wide margin between classes.

Text data are often high-dimensional and sparse, which is a setting where linear SVMs can be strong baselines.

### Same representation, different model

This is important:

```text
TF-IDF
  ↓
Naive Bayes
or Logistic Regression
or SVM
```

The representation and model are separate choices.

A poor representation can limit a good classifier. A strong representation can make a simple classifier surprisingly effective.

### Tiny scikit-learn example

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

texts = ["excellent movie", "terrible movie", "excellent acting", "terrible acting"]
y = [1, 0, 1, 0]

vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X = vectorizer.fit_transform(texts)

model = LogisticRegression().fit(X, y)
print(model.predict(vectorizer.transform(["excellent acting"])))
```

**Key idea:** classical text classification usually separates representation from prediction: first create text features, then fit a classifier.

---

## 10. Hidden Markov Models for Sequence Labelling

A document classifier gives one label to a whole document. POS tagging needs one label per token.

Example:

```text
Words: The   student   reads
Tags:  DET   NOUN      VERB
```

This is where sequence models become useful.

### HMM = Hidden Markov Model

The words are **observed**.

The tags are **hidden states** we want to infer.

An HMM uses two central probabilities.

### Emission probability

How likely is the observed word if the hidden tag is known?

```text
P(student | NOUN)
```

### Transition probability

How likely is the next tag given the previous tag?

```text
P(NOUN | DET)
```

The model combines them across the whole sentence.

A simplified sequence score is:

```text
P(tags, words)
= product of transition probabilities
  × product of emission probabilities
```

In practice we usually work with log probabilities so multiplication becomes addition and tiny numbers are easier to handle.

### Why sequence information matters

Suppose `book` could be a noun or verb.

In:

```text
the book
```

`DET → NOUN` is common.

In:

```text
will book
```

`MODAL → VERB` is more plausible.

The tag sequence provides information beyond the current word.

### Viterbi intuition

There may be many possible tag sequences. The **Viterbi algorithm** efficiently finds the highest-probability path through them instead of enumerating every sequence independently.

**Key idea:** HMM combines what each tag tends to emit with which tags tend to follow one another.

---

## 11. Conditional Random Fields, BIO Tags and Named Entity Recognition

**CRF = Conditional Random Field.**

Like an HMM, a CRF predicts a sequence of labels. But it approaches the problem differently.

An HMM models how hidden states generate observations.

A CRF directly scores:

```text
P(label sequence | observed words and features)
```

This lets us use many overlapping features without having to build a full generative model of the words.

Possible CRF features include:

```text
current word
previous word
next word
capitalisation
prefix
suffix
word shape
POS information
neighbouring label transitions
```

### Simplified CRF score

For a candidate label sequence:

```text
sequence score
= sum of observation-feature scores
  + sum of label-transition scores
```

The model prefers the complete label sequence with the strongest score after normalization.

### Named Entity Recognition

**NER = Named Entity Recognition.**

NER finds spans such as people, organisations, places, dates, and products.

Example:

```text
Barack Obama visited New Delhi.
```

### BIO tagging

BIO makes multi-token entities explicit:

```text
B = beginning of an entity
I = inside an entity
O = outside an entity
```

So:

```text
Barack/B-PER
Obama/I-PER
visited/O
New/B-LOC
Delhi/I-LOC
```

Why is a sequence model useful here?

Because `I-PER` should normally continue a person entity. It should not randomly appear after an unrelated `O` without a valid beginning.

### HMM vs CRF

| HMM | CRF |
|---|---|
| generative | discriminative |
| models tag transitions and word emissions | models label sequence given observed features |
| stronger independence assumptions | can combine many overlapping features |
| elegant probabilistic sequence model | flexible feature-based sequence labeller |

**Key idea:** CRF does not label every word independently; it scores how well the entire label sequence fits the observed sentence.

---

## 12. NLP Tasks and Evaluation

Different NLP tasks require different evaluation measures.

### Text classification

```text
Email → Spam
Review → Positive
Article → Sports
```

### POS tagging

```text
The/DET student/NOUN reads/VERB
```

### Named Entity Recognition

```text
Antony/PERSON works at OSC/ORGANISATION in Sri Lanka/LOCATION
```

### Word Sense Disambiguation

```text
bank → financial institution
```

### Information extraction

```text
The student bought a laptop for $800.
```

could become:

```text
buyer = student
item  = laptop
price = $800
```

### Accuracy

```text
accuracy = correct predictions / all predictions
```

Accuracy can be misleading when one class dominates.

### Precision

Of the items predicted positive, how many were truly positive?

```text
precision = TP / (TP + FP)
```

### Recall

Of all truly positive items, how many did the model find?

```text
recall = TP / (TP + FN)
```

### F1 score

F1 balances precision and recall:

```text
F1 = 2 × precision × recall / (precision + recall)
```

### Sequence evaluation

For NER, token accuracy alone can hide poor entity spans. Entity-level precision, recall, and F1 are often more meaningful.

For example, predicting only `Obama` instead of the full entity `Barack Obama` should not be treated exactly like a perfect entity extraction.

**Key idea:** evaluation must match the real task. A convenient metric is not automatically the right metric.

---

## 13. From Sparse Vectors to Dense Embeddings

BoW and TF-IDF vectors can be huge and sparse.

A dense embedding does something different:

```text
cat  → [ 0.21, -0.44, 0.81, ... ]
dog  → [ 0.18, -0.39, 0.76, ... ]
book → [-0.62,  0.11, 0.09, ... ]
```

Instead of one dimension per vocabulary word, an embedding uses a smaller number of learned dimensions.

### Word2Vec idea

Word2Vec made the distributional idea practical at large scale:

> learn a word representation from the words that appear around it.

Two common training views are:

```text
CBOW: surrounding words → predict centre word
Skip-gram: centre word → predict surrounding words
```

The important concept is not the name. It is that **context prediction forces useful geometry to emerge in the vectors**.

### Why vectors help

Once words are vectors, we can compare them mathematically.

Suppose:

```text
u = [1, 2]
v = [2, 1]
```

Their dot product is:

```text
u · v = 1×2 + 2×1 = 4
```

The dot product becomes large when two vectors point strongly in similar directions and have substantial magnitude.

Cosine similarity removes the magnitude effect:

```text
cosine similarity = (u · v) / (||u|| ||v||)
```

This is why the Linear Algebra unit matters for NLP: vectors, dot products, norms, and matrix multiplication become the language of learned representations.

### Element-wise multiplication is different

Do not confuse:

```text
dot product:      [1,2] · [2,1] = 4
element-wise:     [1,2] * [2,1] = [2,2]
```

Both are vector operations, but they answer different mathematical questions.

### Word embeddings vs contextual embeddings

Classic Word2Vec gives one main vector for a word type:

```text
bank → one learned vector
```

A transformer creates a **contextual representation** for each occurrence:

```text
bank in "bank approved loan"
≠
bank in "river bank"
```

The same token can therefore have a different internal vector depending on context.

**Key idea:** embeddings move NLP from sparse identity/count features toward learned geometry of meaning and context.

---

## 14. Sequence Models: RNNs and LSTMs

A sentence is ordered. The meaning of a token often depends on what came before it.

A recurrent neural network (RNN) processes a sequence one step at a time while carrying a hidden state.

A simplified recurrence is:

```text
h_t = activation(Wx_t + Uh_(t-1) + b)
```

Read it as:

```text
new memory
= current input contribution
+ previous memory contribution
+ bias
then activation
```

### Why recurrence was useful

BoW ignores most order. An RNN can represent:

```text
not good
```

differently from:

```text
good
```

because the state changes as the tokens arrive.

### The long-range problem

During training, gradients must travel backward through many time steps.

If each step repeatedly multiplies the gradient by values smaller than 1, the signal can become tiny:

```text
0.5 × 0.5 × 0.5 × ...
```

This is the **vanishing-gradient problem**.

### LSTM

**LSTM = Long Short-Term Memory.**

An LSTM adds a memory cell and learned gates controlling information flow.

You can think of the gates as learned questions such as:

```text
What old information should I keep?
What should I forget?
What new information should I write?
What part of memory should I expose now?
```

This gives a more controlled path for long-range information and gradients.

### Why RNNs still matter conceptually

Transformers largely replaced recurrent architectures in large language models, but RNNs teach the core sequence problem very clearly:

> how do I carry information from earlier tokens into later decisions?

The transformer answers the same broad problem in a different way: instead of compressing the past through one recurrent state, attention lets positions directly retrieve relevant information from other positions.

**Key idea:** RNNs carry context through time; attention later lets tokens access context more directly.

---

## 15. Attention, Transformers and the Bridge to Deep Learning

This is where the NLP story meets the Deep Learning unit.

Suppose the sentence is:

```text
The animal did not cross the street because it was tired.
```

To interpret `it`, the model should connect that token with relevant earlier information.

Attention creates a learned way to decide which positions matter most to the current position.

### Query, Key, Value intuition

For one token:

```text
Query = what am I looking for?
Key   = what information could match that request?
Value = what information should be retrieved if it matches?
```

The mathematical pattern is:

```text
query · key
    ↓
similarity scores
    ↓
softmax
    ↓
attention weights
    ↓
weighted combination of values
```

For two simple scalar values 2 and 6 with attention weights 0.75 and 0.25:

```text
0.75×2 + 0.25×6 = 3
```

The output is a mixture weighted by relevance.

### Multi-head attention

One attention head is one parallel attention calculation.

Several heads allow different learned matching patterns to exist at the same time.

Important:

> A head is **not** a neuron, and each neuron does not contain multiple attention heads.

Multi-head attention is a larger module inside a transformer block.

### Transformer block

A simplified transformer block contains:

```text
input token representations
        ↓
multi-head attention
        ↓
residual connection + normalization
        ↓
feed-forward neural network
        ↓
residual connection + normalization
        ↓
updated token representations
```

The block is repeated many times.

### Why this changed NLP

Earlier sequence models passed information step by step:

```text
word 1 → word 2 → word 3 → word 4
```

Self-attention lets a token directly compare itself with many other positions in the sequence.

This makes long-range relationships easier to model and makes training highly parallelizable.

### Causal language modelling

GPT-style language models are trained to predict the next token.

During causal self-attention, a token must not see future tokens. A **causal mask** blocks those positions.

The training idea is:

```text
previous tokens
      ↓
transformer
      ↓
logits for next token
      ↓
softmax / cross-entropy objective
```

### What comes next

At this point you know the NLP problem:

- how language becomes tokens
- how classical text becomes sparse vectors
- why context matters
- why grammar and word meaning matter
- how HMMs and CRFs model sequences
- why embeddings were a major change
- why recurrent models tried to carry context
- why attention gives more direct access to context

The **Deep Learning** unit now explains the machinery underneath this modern NLP stack in more detail:

```text
artificial neuron
→ layers / MLPs
→ activations and loss
→ forward pass
→ backpropagation
→ optimizers
→ initialization and regularization
→ embeddings and sequence networks
→ attention and transformer mathematics
→ PyTorch training and inference
```

So the transition is:

```text
NLP asks:        What language problem are we solving?
Deep Learning:   How does the neural machinery learn to solve it?
```

That distinction will keep the two units connected without repeating the same lesson twice.

**Final map:**

```text
RAW LANGUAGE
    ↓
TOKENISATION
    ↓
CLASSICAL REPRESENTATION
BoW / TF-IDF / N-grams
    ↓
CONTEXT + LANGUAGE STRUCTURE
co-occurrence / POS / parsing / WordNet / WSD
    ↓
CLASSICAL MODELS
Naive Bayes / Logistic / SVM / HMM / CRF
    ↓
DENSE REPRESENTATIONS
embeddings
    ↓
NEURAL SEQUENCE MODELS
RNN / LSTM
    ↓
ATTENTION
    ↓
TRANSFORMERS
    ↓
DEEP LEARNING UNIT
architecture, training, optimization and PyTorch
```
