# Classical NLP Study Guide

This guide explains the main ideas in classical Natural Language Processing (NLP), where they fit, what they are used for, and how the mathematics begins.

The focus is on understanding the map first. The mathematics is introduced only when it helps explain the method.

---

## 1. What Is NLP?

**NLP = Natural Language Processing.**

NLP is the area of Artificial Intelligence that allows computers to work with human language such as emails, reviews, documents, questions, and messages.

A computer cannot directly calculate with:

```text
The student reads a book.
```

NLP converts the sentence into a form that a computer can analyse.

```text
Human language
      ↓
Tokens and features
      ↓
Numbers
      ↓
Classical model
      ↓
Prediction or labels
```

The main idea is:

> NLP converts language into useful representations so a machine-learning model can learn patterns from it.

---

## 2. The Classical NLP Pipeline

```text
RAW TEXT
"The student reads a book."
        ↓
PRE-PROCESSING
Tokenisation, lowercasing, cleaning
        ↓
TEXT REPRESENTATION
Bag-of-Words, TF-IDF, N-grams
        ↓
LANGUAGE CLUES
Context, co-occurrence, word shape, POS information
        ↓
LEXICAL SEMANTICS
Synonyms, antonyms, polysemy, homonymy, WordNet
        ↓
CLASSICAL MODEL
Rules, Naive Bayes, Logistic Regression, SVM, HMM, or CRF
        ↓
NLP TASK
Classification, tagging, entity recognition, or word-sense selection
        ↓
OUTPUT
Positive, spam, noun, person, location, and so on
        ↓
EVALUATION
Accuracy, precision, recall, and F1 score
```

There are two common paths inside this map.

### Document classification

```text
Text
  ↓
BoW or TF-IDF
  ↓
Naive Bayes, Logistic Regression, or SVM
  ↓
One label for the whole document
```

Example:

```text
"The movie was excellent."
→ Positive
```

### Sequence labelling

```text
Text
  ↓
Tokens and word features
  ↓
HMM or CRF
  ↓
One label for each token
```

Example:

```text
The/DET student/NOUN reads/VERB
```

---

## 3. Historical Timeline

The dates below are approximate milestone years. Most NLP techniques were developed over several papers and several years rather than invented on one exact day.

| Period | Milestone | What changed |
|---|---|---|
| 1950s-1960s | Early machine translation and rule systems | Researchers began writing grammar and translation rules for computers. |
| 1964-1966 | ELIZA and pattern matching | A computer could imitate conversation using simple rules and substitutions. |
| 1960s-1970s | Chomskyan and formal grammar approaches | Researchers tried to describe language using formal grammatical structures. |
| 1970s-1980s | Statistical methods and Hidden Markov Models | Systems began learning probabilities from language data. |
| 1980s-1990s | Statistical POS tagging | Probabilistic models became useful for assigning grammatical tags. |
| 1990s | Corpus-based NLP and machine learning | Larger text collections and statistical features became central. |
| 1990s-2000s | Maximum Entropy and feature-based models | Systems combined many manually designed word and context features. |
| 2001 | Conditional Random Fields | CRFs provided a strong method for sequence labelling using features and label transitions. |
| 2000s | Better search, classification, and information extraction | BoW, TF-IDF, n-grams, SVMs, and other statistical methods became widely used. |
| 2003 | Neural word representations became influential | Neural methods began learning dense numerical representations of words. |
| 2013 | Word2Vec | Word vectors were learned from surrounding-word context at large scale. |
| 2014-2015 | Sequence-to-sequence encoder-decoder models | Neural networks learned to convert one sequence into another, such as translation. |
| 2014-2017 | Attention mechanisms | Models could focus on relevant parts of the input instead of compressing everything into one vector. |
| 1997 and 2010s | LSTM and RNN sequence models | Neural models learned sequence information using a hidden state and memory gates. |
| 2017 | Transformer architecture | Self-attention replaced recurrence as the main way to model relationships between tokens. |
| 2018 onward | BERT, GPT, and large language models | Transformer models were trained on very large text collections and adapted to many tasks. |

### The classical part of the timeline

For your current learning, the important classical section is:

```text
Rules
  ↓
Statistics and probabilities
  ↓
BoW, TF-IDF, and N-grams
  ↓
HMM
  ↓
CRF
```

RNNs, LSTMs, Word2Vec, encoder-decoder networks, and transformers come after the classical foundation.

---

## 4. Raw Text

Raw text is the original sentence written by a person.

```text
The student reads a book.
```

At this point the sentence is still a string of characters. It is meaningful to a human, but it is not yet a numerical input for a classical model.

---

## 5. Pre-processing

Pre-processing prepares the text for later analysis.

### Tokenisation

Tokenisation splits text into smaller pieces called tokens.

```text
The student reads a book.
```

becomes:

```text
["The", "student", "reads", "a", "book", "."]
```

### Lowercasing

```text
"The" → "the"
```

This prevents the system from treating `The` and `the` as separate features.

### Stopword removal

Stopwords are very common words such as `the`, `is`, `a`, `and`, and `of`.

They may be removed when they add little information, but this depends on the task. Removing `not` from `not good` would reverse the meaning.

### Stemming

Stemming cuts words down roughly.

```text
studies, studying, studied → studi
```

It is fast but may produce an incomplete word.

### Lemmatization

Lemmatization uses language knowledge to find the proper base form.

```text
studies, studying, studied → study
```

### Sentence segmentation

This splits a paragraph into individual sentences.

```text
The student reads. The teacher explains.
```

becomes two sentences.

---

## 6. Text Representation

Machine-learning models need numerical inputs. Text representation converts words or documents into numbers.

### Bag-of-Words

**BoW = Bag-of-Words.**

It creates a vocabulary and counts how often each word appears.

```text
Sentence:   the cat sleeps
Vocabulary: [cat, dog, sleeps]
Vector:     [ 1,  0,     1]
```

The `1` means the word appeared. The `0` means it did not appear.

#### Advantages

- Simple and easy to understand
- Fast to calculate
- Useful for basic classification

#### Limitations

- Ignores most word order
- Does not understand meaning
- Does not naturally understand synonyms
- Can create many zeros, called sparsity

### One-hot encoding

One-hot encoding represents one word using one `1` and many `0`s.

```text
Vocabulary: [cat, dog, book]

cat  → [1, 0, 0]
dog  → [0, 1, 0]
book → [0, 0, 1]
```

It identifies the word, but it does not show that `cat` and `dog` are more similar than `cat` and `book`.

### TF-IDF

**TF-IDF = Term Frequency-Inverse Document Frequency.**

TF-IDF gives a high value to a word that appears often in one document but is uncommon across the document collection.

The basic formula is:

```text
TF-IDF = TF × IDF
```

Where:

```text
TF = how often the word appears in this document
```

One common simplified IDF formula is:

```text
IDF = log(total number of documents / documents containing the word)
```

If `the` appears in almost every document, its IDF is low. If `football` appears mainly in sports documents, its IDF is higher in a sports collection.

#### Advantages

- Highlights distinctive words
- Often useful for search and classification
- More informative than simple word counts

#### Limitations

- Does not truly understand meaning
- Mostly ignores long-range word order
- Does not automatically solve synonyms
- Produces sparse vectors

### N-grams

An N-gram is a sequence of `N` consecutive tokens.

For:

```text
The student reads books
```

Unigrams contain one word:

```text
The, student, reads, books
```

Bigrams contain two words:

```text
The student
student reads
reads books
```

Trigrams contain three words:

```text
The student reads
student reads books
```

N-grams preserve a small amount of word order and help capture phrases such as `not good` or `machine learning`.

#### Advantages

- Captures short phrases
- Preserves limited word order
- Useful for simple language patterns

#### Limitations

- Large numbers of possible combinations
- Many combinations are rare
- Does not handle long context well

---

## 7. Context and Language Clues

In classical NLP, **context means the surrounding information used to interpret a word**.

Example:

```text
The bank approved my loan.
```

The context around `bank` includes:

```text
The, approved, my, loan
```

### Context window

A context window defines how many nearby words the system examines.

```text
The bank approved my loan.
    ↑
```

A small window may use only `The` and `approved`. A larger window may include `my` and `loan` as well.

The window size is chosen by the developer.

### Co-occurrence

Co-occurrence means recording which words appear near each other.

Financial examples:

```text
bank + loan
bank + account
bank + money
```

River examples:

```text
bank + river
bank + water
bank + fishing
```

The system can use these counts to estimate which sense of `bank` is more likely.

### Basic probability

The model can compare probabilities such as:

```text
P(financial meaning | loan, account)
P(river meaning | water, fishing)
```

It chooses the interpretation with the higher probability.

### Word features

Features are clues recorded about a word.

```text
current word = Obama
previous word = Barack
next word = visited
starts with a capital letter = yes
```

Context is the surrounding information. Features are the measurable clues used to represent that information.

---

## 8. Lexical Semantics and Word Meaning

**Lexical semantics** means the study of word meaning and relationships between words.

This sits after basic context clues because it gives the system a structured way to reason about meanings, not only nearby-word counts.

### Synonymy

Synonyms have similar meanings.

```text
student ≈ learner
big ≈ large
```

They are rarely perfectly interchangeable in every sentence, but they are semantically related.

### Antonymy

Antonyms have opposite meanings.

```text
hot ↔ cold
good ↔ bad
```

### Polysemy

Polysemy means one word has several **related** meanings.

```text
head of a person
head of a department
head of a table
```

These meanings differ, but all retain the broad idea of being at the top, front, or in charge.

### Homonymy

Homonymy means the same spelling or sound has **unrelated** meanings.

```text
bank = financial institution
bank = land beside a river
```

```text
bat = flying animal
bat = sports equipment
```

### Hypernyms and hyponyms

A **hypernym** is a broader category. A **hyponym** is a more specific example.

```text
animal → dog
vehicle → car
```

Here, `animal` is a hypernym of `dog`, and `dog` is a hyponym of `animal`.

### WordNet

**WordNet** is a structured lexical database. It stores words as meanings called **synsets** and records relationships such as synonyms, antonyms, hypernyms, and hyponyms.

```text
dog → animal
car → vehicle
```

WordNet gives a classical NLP system a source of language knowledge beyond the exact training document.

### Lesk Algorithm

The **Lesk algorithm** is a classical, dictionary-based method for Word Sense Disambiguation.

It compares the words in the sentence context with the words in each possible dictionary definition, called a **gloss**.

Example:

```text
The bank approved my loan.
```

Possible WordNet senses might have glosses containing:

```text
Financial bank gloss:
financial institution, money, deposit, loan

River bank gloss:
land beside a river, water, shore
```

The context contains `loan`, which overlaps with the financial gloss. The financial sense therefore receives the higher overlap score.

Simplified Lesk score:

```text
score(sense) = number of shared words between
               context and dictionary gloss
```

The sense with the largest overlap is selected.

Lesk does not learn neural vectors and does not require a large labelled training dataset. It depends on the quality of the dictionary glosses and the amount of word overlap.

### Word Sense Disambiguation

**WSD = Word Sense Disambiguation.**

WSD chooses the correct meaning of an ambiguous word from the sentence context.

```text
The bank approved my loan.
```

The nearby words `approved` and `loan` support:

```text
bank → financial institution
```

But in:

```text
The fisherman sat on the bank of the river.
```

the words `fisherman` and `river` support:

```text
bank → riverside
```

Classical WSD methods include WordNet, Lesk, co-occurrence counts, and supervised classification.

---

## 9. POS Tagging

**POS = Part of Speech.**

POS tagging identifies the grammatical job of each word.

```text
The/DET student/NOUN reads/VERB books/NOUN
```

Common tags include:

| Tag | Meaning |
|---|---|
| NOUN | Person, place, thing, or idea |
| VERB | Action or state |
| ADJ | Adjective |
| ADV | Adverb |
| DET | Determiner such as `the` or `a` |
| PRON | Pronoun such as `he` or `they` |
| PREP | Preposition such as `in` or `on` |

The word `book` can have different roles:

```text
I will book a hotel. → book = VERB
I read a book.       → book = NOUN
```

The tagger uses the surrounding context to choose the correct role.

POS tagging is useful for grammar checking, parsing, information extraction, word-sense disambiguation, and text-to-speech.

---

## 10. Parsing

Parsing analyses how words are grouped or related.

### Constituency parsing

Constituency parsing groups words into phrases.

```text
[The student] [reads [a book]]
```

### Dependency parsing

Dependency parsing shows relationships between individual words.

```text
student → subject of reads
book    → object of reads
```

Parsing helps answer questions such as:

- Who performed the action?
- What did they act on?
- Which adjective describes which noun?

---

## 11. Rule-Based NLP

Rule-based systems use manually written language rules.

Example:

```text
If a word comes after "will", it may be a verb.
If a word comes after "the", it may be a noun.
```

### Advantages

- Easy to explain
- No large training dataset required
- Useful for predictable and controlled language

### Limitations

- Rules take time to write
- Language has many exceptions
- Rules can conflict with one another
- The system does not adapt easily to new language

Rule-based systems are useful for grammar checkers, keyword extraction, and controlled business rules. Modern tools often combine rules with statistical or neural methods.

---

## 12. Classical Machine-Learning Models

### Naive Bayes

Naive Bayes is a probability-based classifier.

It may compare:

```text
P(Positive | words)
P(Negative | words)
```

The model chooses the larger probability.

It is called `naive` because it assumes the features are independent, even though words are often related.

It is fast and useful for spam detection, sentiment analysis, and document classification.

### Logistic Regression

Logistic Regression combines features into a weighted score.

```text
score = w₁x₁ + w₂x₂ + ... + b
```

Where:

- `x` is a feature value
- `w` is the learned importance of that feature
- `b` is the bias or starting value

The score is converted into a probability between 0 and 1.

It works well with TF-IDF features and is a strong classical baseline for text classification.

### SVM

**SVM = Support Vector Machine.**

An SVM tries to find a boundary separating classes in feature space.

```text
Positive reviews | Negative reviews
```

SVMs work well with high-dimensional, sparse text vectors such as TF-IDF.

### HMM

**HMM = Hidden Markov Model.**

An HMM is useful for sequence problems such as POS tagging.

The words are observed, but the correct labels are hidden.

```text
Words:  The student reads
Tags:   DET  NOUN    VERB
```

HMM uses two important probabilities.

#### Emission probability

How likely is a word given a tag?

```text
P(student | NOUN)
```

#### Transition probability

How likely is one tag after another?

```text
P(NOUN | DET)
```

The HMM chooses the tag sequence with the highest combined probability.

### CRF

**CRF = Conditional Random Field.**

CRF is a classical sequence-labelling model.

Example:

```text
Barack Obama visited India.
```

Output:

```text
Barack/PERSON Obama/PERSON visited/O India/LOCATION
```

CRF uses:

- The current word
- Previous and next words
- Capitalisation
- Prefixes and suffixes
- Word shape
- Context features
- Relationships between neighbouring labels

A simplified score is:

```text
sequence score
= word and context feature scores
  + label transition scores
```

The CRF chooses the complete label sequence with the highest score.

For Named Entity Recognition, CRFs often use the **BIO tagging scheme**:

```text
B-PER  → beginning of a person entity
I-PER  → inside a person entity
B-LOC  → beginning of a location entity
I-LOC  → inside a location entity
O      → outside an entity
```

For:

```text
Barack Obama visited New Delhi.
```

the labels might be:

```text
Barack/B-PER Obama/I-PER visited/O New/B-LOC Delhi/I-LOC
```

The transition structure makes sensible sequences more likely. For example, `I-PER` should normally follow `B-PER` or another `I-PER`, not `O`.

This is important because it does not label every word completely independently. It asks which labels make the most sense together.

---

## 13. Main Classical NLP Tasks

### Text classification

Assign one label to a complete text.

```text
Email → Spam
Review → Positive
Article → Sports
```

Common models include Naive Bayes, Logistic Regression, and SVM.

### POS tagging

Assign a grammatical label to every word.

```text
The/DET student/NOUN reads/VERB
```

Common models include rules, HMM, and CRF.

### Named Entity Recognition

**NER = Named Entity Recognition.**

NER finds people, places, organisations, dates, and other entities.

```text
Antony works at OSC in Sri Lanka.
```

```text
Antony → PERSON
OSC → ORGANISATION
Sri Lanka → LOCATION
```

### Word Sense Disambiguation

WSD chooses the correct meaning of an ambiguous word.

```text
The bank approved my loan.
```

Here, `bank` means a financial institution.

In:

```text
The fisherman sat on the bank of the river.
```

`bank` means the land beside a river.

Classical methods include Lesk, WordNet, co-occurrence, and supervised classification.

### Information extraction

Information extraction converts text into structured information.

```text
The student bought a laptop for $800.
```

Possible result:

```text
person = student
item = laptop
price = $800
```

### Thematic Roles and Semantic Role Labelling

**SRL = Semantic Role Labelling.** It identifies the semantic role played by each phrase in relation to an action or event.

Example:

```text
The student opened the book with a key.
```

Possible roles:

```text
student → Agent: who performed the action?
book    → Patient or Theme: what was affected?
key     → Instrument: what was used?
```

Common thematic roles include:

| Role | Meaning |
|---|---|
| Agent | The person or thing performing the action |
| Patient | The person or thing affected by the action |
| Theme | The thing being moved, discussed, or experienced |
| Instrument | The object used to perform the action |
| Location | Where the event occurs |
| Recipient | The person receiving something |

Thematic roles go beyond POS tags. POS tells us that `student` is a noun; a thematic role tells us that the student is the **Agent** of `opened`.

### Rule-Based and Template-Based Generation

Classical NLP can also generate text using handwritten rules and templates.

Template:

```text
The {student} scored {score} in {subject}.
```

Filled with data:

```text
The Maya scored 92 in mathematics.
```

The system uses predefined sentence structures and fills their slots with values. It does not generate by sampling from learned neural representations.

#### Advantages

- Predictable output
- Easy to control
- Useful for reports, alerts, and fixed business messages
- Low risk of inventing information

#### Limitations

- Repetitive language
- Limited flexibility
- Requires humans to write the templates and rules
- Struggles with unexpected input

---

## 14. Evaluation

Evaluation measures how well the model performs on data it has not seen before.

### Accuracy

```text
Accuracy = correct predictions / total predictions
```

If a model gets 90 predictions correct out of 100:

```text
Accuracy = 90 / 100 = 0.90 = 90%
```

### Precision

Of everything the model predicted as positive, how much was actually positive?

```text
Precision = true positives / predicted positives
```

### Recall

Of all the genuinely positive examples, how many did the model find?

```text
Recall = true positives / actual positives
```

### F1 score

F1 combines precision and recall.

```text
F1 = 2 × precision × recall
     -------------------------
     precision + recall
```

F1 is useful when both false positives and false negatives matter.

---

## 15. The Classical NLP Map in One View

```text
RAW TEXT
"The student reads a book."
        ↓
PRE-PROCESSING
Tokenisation, lowercasing, stopword decisions,
stemming, lemmatisation, sentence splitting
        ↓
TEXT REPRESENTATION
BoW, one-hot encoding, TF-IDF, N-grams
        ↓
LANGUAGE CLUES
Context windows, co-occurrence, word shape,
POS information, parsing relationships
        ↓
LEXICAL SEMANTICS
Synonyms, antonyms, polysemy, homonymy,
hypernyms, WordNet, word-sense disambiguation
        ↓
CLASSICAL MODELS
Rules, Naive Bayes, Logistic Regression,
SVM, HMM, CRF
        ↓
NLP TASKS
Classification, POS tagging, NER,
word-sense disambiguation, information extraction
        ↓
OUTPUT
Class labels, token labels, entities,
selected meanings, or extracted facts
        ↓
EVALUATION
Accuracy, precision, recall, F1 score
```

### What Each Stage Does

#### 1. Raw text: the original language

This is the sentence, email, review, or document written by a person.

```text
The student reads a book.
```

At this point, the computer has text, but it does not yet have a useful numerical representation.

#### 2. Pre-processing: prepare the text

The system cleans and separates the text.

```text
"The student reads a book."
```

may become:

```text
["the", "student", "reads", "a", "book"]
```

This stage may include tokenisation, lowercasing, punctuation handling, stopword decisions, stemming, and lemmatisation.

The purpose is to make the text more consistent before creating features.

#### 3. Text representation: turn text into numbers

Classical models need numerical inputs. This stage converts the tokens into numbers using methods such as:

```text
Bag-of-Words → counts words
TF-IDF       → weights distinctive words
N-grams      → records short word sequences
```

Example:

```text
"student reads book"
→ [1, 1, 1, 0, ...]
```

The result is a feature vector that a model can calculate with.

#### 4. Language clues: add useful information

The numerical representation alone may not capture enough language information. The system can add clues such as:

```text
nearby words
previous and next tokens
co-occurrence counts
capitalisation
prefixes and suffixes
POS tags
parsing relationships
```

For example, in:

```text
The bank approved my loan.
```

the words `approved` and `loan` provide context suggesting that `bank` means a financial institution.

#### 5. Lexical semantics: connect words to meanings

This layer handles meaning relationships that are important when the same word may have multiple senses, or when different words are related.

```text
Synonym:   student ≈ learner
Antonym:   good ↔ bad
Polysemy:  head of a person / head of a department
Homonymy:  bank as money / bank beside a river
```

WordNet and context-based methods help a classical system choose a suitable sense.

#### 6. Classical model: learn the pattern

The model uses the numerical features and language clues to learn a task.

```text
Naive Bayes         → probability-based classification
Logistic Regression → weighted feature scores
SVM                 → separates classes with a boundary
HMM                 → predicts a sequence using probabilities
CRF                 → predicts a sequence using features and label relationships
```

The model is trained using examples. For instance:

```text
"The movie was excellent." → Positive
"The movie was terrible."  → Negative
```

#### 7. NLP task: decide what the system is doing

The same text features can support different tasks.

```text
Classification            → label the whole document
POS tagging               → label each word grammatically
Named Entity Recognition  → find people, places, and organisations
Word Sense Disambiguation → choose the correct meaning
Information Extraction    → pull facts into structured fields
```

#### 8. Output: produce the result

The output depends on the task.

For classification:

```text
"The movie was excellent."
→ Positive
```

For POS tagging:

```text
The/DET student/NOUN reads/VERB
```

For Named Entity Recognition:

```text
India/LOCATION
```

#### 9. Evaluation: measure quality

The model is tested on examples it did not use for training.

```text
Prediction compared with the correct answer
                 ↓
Accuracy, precision, recall, or F1 score
```

This tells us whether the model has learned useful patterns or is making too many mistakes.

### One Complete Example

Suppose the task is to identify people and places:

```text
Barack Obama visited India.
```

```text
1. Raw text
   The original sentence.

2. Pre-processing
   Technique: word tokenisation and punctuation handling
   ["Barack", "Obama", "visited", "India", "."]
   We keep capital letters because they are useful NER features.

3. Text representation
   Technique: token-level feature extraction, not BoW or TF-IDF.
   Each token becomes a row of features such as:
   word identity, lower-case form, capitalisation,
   suffix, previous word, and next word.

4. Language clues
   Techniques: context window, word-shape features,
   co-occurrence patterns, and gazetteer or training-data clues.
   Barack and Obama are capitalised and occur together.
   India is capitalised and occurs after the verb "visited".

5. Lexical semantics, where available
   Technique: named-entity lexicon or WordNet-style knowledge base.
   India may be known as a country/location.

6. Classical model
   Technique: Conditional Random Field (CRF).
   It scores possible label sequences using token features
   plus label-transition scores.

7. Output
   Barack/PERSON Obama/PERSON visited/O India/LOCATION

8. Evaluation
   Techniques: precision, recall, and F1 score for NER.
   Compare the predicted entity labels with the correct labels.
```

### Worked Example: `Barack Obama visited India.`

This example is a **Named Entity Recognition** task.

**NER = Named Entity Recognition.** It assigns an entity label to each token. A simple label set is:

```text
PERSON   → a person's name
LOCATION → a place name
O        → not an entity of interest
```

For this task, a classical **CRF** is a better fit than Bag-of-Words or TF-IDF. BoW and TF-IDF represent a whole document and are commonly used for document classification. A CRF needs useful features for each individual token.

#### Step 1. Raw text

```text
Barack Obama visited India.
```

#### Step 2. Tokenisation

```text
["Barack", "Obama", "visited", "India", "."]
```

Each token will receive one label.

#### Step 3. Candidate labels

The model considers possible labels for each word.

| Token | Possible labels |
|---|---|
| Barack | PERSON, LOCATION, O |
| Obama | PERSON, LOCATION, O |
| visited | PERSON, LOCATION, O |
| India | PERSON, LOCATION, O |
| . | O |

The CRF does not decide immediately. It collects evidence first.

#### Step 4. Features and context clues

The CRF turns each token and its nearby context into features.

| Token | Example feature clues |
|---|---|
| Barack | capitalised; first word; next word is capitalised; appears in people-name training examples |
| Obama | capitalised; previous word is capitalised; next word is `visited`; often follows a first name |
| visited | lower-case; ends in `ed`; previous and next words are capitalised; often behaves like a verb |
| India | capitalised; previous word is a likely verb; appears in location-name training examples |
| . | punctuation |

The word context is especially useful here:

```text
Barack Obama
```

looks like two adjacent name tokens, while:

```text
visited India
```

looks like an action followed by a place.

#### Step 5. Feature scores

During training, the CRF learns a weight for each useful feature. The values below are **illustrative only**. A real model learns them from labelled training data.

For `Barack`:

```text
capitalised                 → supports PERSON: +1.2
next word capitalised       → supports PERSON: +1.5
word seen as a person name  → supports PERSON: +2.0
```

So a simplified feature score for:

```text
Barack = PERSON
```

is:

```text
1.2 + 1.5 + 2.0 = 4.7
```

For `India`:

```text
capitalised                   → supports LOCATION: +1.0
appears in location examples  → supports LOCATION: +2.4
previous word is a verb        → supports LOCATION: +0.8
```

Simplified score:

```text
India = LOCATION
1.0 + 2.4 + 0.8 = 4.2
```

#### Step 6. Label-transition scores

The CRF also learns whether neighbouring labels make sense together.

Illustrative transition scores:

```text
PERSON   → PERSON   = +1.6
PERSON   → O        = +0.7
O        → LOCATION = +1.1
LOCATION → O        = +0.5
```

This gives extra support to:

```text
Barack/PERSON Obama/PERSON
```

because two adjacent words can belong to one person's name.

#### Step 7. Score the whole sequence

The CRF scores a complete candidate label sequence, rather than choosing each token independently.

Candidate A:

```text
Barack/PERSON Obama/PERSON visited/O India/LOCATION ./O
```

Its simplified sequence score is:

```text
feature scores for each token
+ transition scores between labels
```

Using short illustrative values:

```text
Barack/PERSON      = 4.7
Obama/PERSON       = 4.5
visited/O          = 3.8
India/LOCATION     = 4.2
./O                 = 2.0

PERSON → PERSON    = 1.6
PERSON → O         = 0.7
O → LOCATION       = 1.1
LOCATION → O       = 0.5

Total score = 4.7 + 4.5 + 3.8 + 4.2 + 2.0
            + 1.6 + 0.7 + 1.1 + 0.5
            = 23.1
```

Candidate B might incorrectly label `India` as a person:

```text
Barack/PERSON Obama/PERSON visited/O India/PERSON ./O
```

It may receive lower feature and transition support:

```text
India/PERSON       = 0.8
O → PERSON         = 0.2
```

The rest remains the same, giving:

```text
Total score = 19.0
```

Because `23.1` is greater than `19.0`, the CRF chooses Candidate A.

#### Step 8. Final output

```text
Barack/PERSON
Obama/PERSON
visited/O
India/LOCATION
./O
```

#### Step 9. Evaluation

The prediction is compared with a human-labelled test sentence.

```text
Correct labels:   PERSON PERSON O LOCATION O
Predicted labels: PERSON PERSON O LOCATION O
```

For this one example, every label is correct. Across a full test dataset, we would calculate precision, recall, and F1 for entity labels.

### What Techniques Were Used Here?

```text
Tokenisation
→ split the sentence into tokens

Context features
→ use nearby words, capitalisation, suffixes, and position

Classical supervised learning
→ learn feature weights from labelled examples

CRF
→ score the entire sequence of entity labels

Viterbi decoding
→ efficiently find the highest-scoring label sequence

Evaluation
→ compare predictions with true labels using precision, recall, and F1
```

The important conclusion is:

> In classical NER, the CRF does not understand names like a human. It learns that certain word features, surrounding words, and neighbouring labels repeatedly match people and locations in labelled training data.

### The Map in Plain English

```text
Take the original text.
Prepare it.
Turn it into numbers.
Add clues about nearby words and grammar.
Use word-meaning relationships when meaning is ambiguous.
Give the features to a suitable model.
Ask the model to predict something.
Measure how correct the prediction is.
```

---

## 16. Exam and MCQ Recognition

These are common question patterns and the concept they are testing.

### WordNet

**Question pattern:** What is WordNet's primary function?

**Correct idea:** WordNet is a structured lexical database that groups words into synonym sets, called synsets, and connects them through semantic relationships such as hypernymy and hyponymy.

```text
WordNet → synsets + semantic relations
```

### Lesk

**Question pattern:** How does the classic Lesk algorithm perform WSD?

**Correct idea:** It chooses the sense whose dictionary gloss has the greatest word overlap with the surrounding context.

```text
Lesk → context words compared with dictionary glosses
```

### CRF

**Question pattern:** What is the key advantage of a CRF in NER or POS tagging?

**Correct idea:** A CRF models dependencies between neighbouring output labels and scores the whole sequence, producing more consistent label combinations.

```text
CRF → feature scores + label transitions + global sequence consistency
```

In BIO tagging, this helps prevent unlikely sequences such as an `I-PER` tag appearing without a suitable person-entity beginning.

### Thematic Roles

**Question pattern:** What is the purpose of thematic roles in SRL?

**Correct idea:** They identify semantic functions such as who performs an action, what is affected, where it happens, or what instrument is used.

```text
Agent → performs the action
Patient or Theme → affected by or involved in the action
```

### Rule-Based and Template-Based Generation

**Question pattern:** What characterises rule-based or template-based text generation?

**Correct idea:** It generates text by filling predefined sentence structures with variable values using handcrafted rules.

```text
Template + data values → generated sentence
```

It is not the same as statistical sampling or neural text generation.

## 17. Master's-Level Preparation

You do not need to memorise every algorithm immediately. For Master's-level preparation, aim to understand each layer at three levels: **what it does**, **the basic mathematics**, and **when it fails**.

| Area | Know the core idea | Go one level deeper | Be able to discuss |
|---|---|---|---|
| Tokenisation and cleaning | How text becomes tokens | Why lowercasing, stopword removal, stemming, and lemmatisation can change results | Why `not` should often be kept; how different tokenisers affect vocabulary |
| BoW and TF-IDF | How a document becomes a vector | Sparsity, vocabulary size, TF-IDF formula, IDF using logarithms | Why BoW loses order and TF-IDF does not understand meaning |
| N-grams and context | How short word sequences add local context | Choice of window size and bigram/trigram feature growth | Why `not good` matters; why long context remains difficult |
| Lexical semantics | Synonyms, antonyms, polysemy, homonymy | Synsets, WordNet, hypernyms, hyponyms, Lesk overlap | Why word meaning depends on context; limits of dictionary methods |
| POS and parsing | Word roles and relationships | Tag sets, constituency versus dependency parsing | Why `book` can be a noun or verb; subject, verb, and object extraction |
| Naive Bayes | Classification using probability | Conditional probability, priors, likelihoods, log probabilities | The independence assumption and when it is unrealistic |
| Logistic Regression and SVM | Classification from text vectors | Weighted sums, sigmoid probability, decision boundaries, regularisation | Why sparse TF-IDF works well; how model weights can be interpreted |
| HMM | Sequence labelling using probabilities | Emission and transition probabilities; Viterbi decoding | The Markov assumption and limited long-distance context |
| CRF | Sequence labelling using features and label transitions | Feature functions, sequence score, conditional probability, Viterbi decoding | Why CRF labels a whole sequence rather than each word independently |
| Evaluation | How to measure a model | Confusion matrix, precision, recall, F1, macro versus micro averages | Why accuracy can mislead with imbalanced data |

### Mathematics to Learn for Classical NLP

Focus on these in order:

```text
1. Counts and frequency
2. Vectors and sparse matrices
3. Conditional probability
4. Bayes' theorem
5. Logarithms and log probabilities
6. Weighted sums and the sigmoid function
7. Dynamic programming, especially Viterbi decoding
8. Evaluation metrics and confusion matrices
```

You do not need advanced calculus for the first pass through classical NLP. Probability, vectors, basic linear algebra, and optimisation intuition matter more.

### What You Should Be Able to Do

By the end of this classical NLP section, you should be able to:

- Explain why a computer needs text representation.
- Build and compare BoW and TF-IDF features.
- Explain what sparsity is and why it matters.
- Use bigrams to capture a phrase such as `not good`.
- Describe context windows and co-occurrence.
- Explain the difference between polysemy and homonymy.
- Explain how WordNet and Lesk help with word-sense disambiguation.
- Explain the difference between document classification and sequence labelling.
- Describe HMM emission and transition probabilities.
- Explain why CRF uses both word features and label transitions.
- Evaluate a classifier using precision, recall, and F1.

### After Classical NLP

Once this foundation is clear, the natural next progression is:

```text
Word embeddings and Word2Vec
        ↓
RNNs, LSTMs, and GRUs
        ↓
Attention and encoder-decoder models
        ↓
Transformers
        ↓
BERT, GPT, fine-tuning, and modern NLP evaluation
```

## Final Mental Model

Remember the purpose of each stage:

```text
Pre-processing
→ prepares the words

Representation
→ converts words into numbers

Context and features
→ provide useful clues

Model
→ learns patterns from the clues

Output
→ gives a prediction or label

Evaluation
→ measures whether the prediction is good
```

The most important classical NLP idea is:

> Convert text into measurable features, give those features to a suitable statistical model, and use the model to predict a class, meaning, or label.
