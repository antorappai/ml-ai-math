# ML Math Studio — Beginner-First Roadmap

Last updated: 2026-10-01

## Single-lesson teaching trial — 2026-10-01

The **Dot Product, Angle & Cosine** lesson in the original app now uses an authored delivery-cost narrative, explicit feature units, signed contributions, a geometric explanation, a cosine-ranking reversal, and a small linear prediction model. Its seven existing section IDs remain compatible with navigation and saved progress. New MCQs use new IDs so earlier attempts are not reinterpreted.

The trial adds an angle/length explorer, three written practice questions, and a 10-mark mini-exam with hints, worked answers, common traps, and self-assessment marking guides. Written drafts last while the page is mounted; they are not saved or automatically graded. The Python companion recreates the delivery calculation using ordinary arithmetic. Optional ML reasoning explains feature scaling, unit normalization, and the relationship between cosine and distance for unit vectors.

The five trial MCQs now include authored explanations for every correct and incorrect option. Guided checks and the practice assessment show reasoning for the selected answer and offer an expandable comparison of all options after submission. A delivery prediction activity lets learners change distance and mass, enter a predicted bill, and receive feedback about omitted contributions or a missing/doubled baseline. Changing the activity inputs clears the previous answer and feedback so the next prediction is a fresh attempt.

This is an editorial trial awaiting learner feedback, not a course-wide quality approval or a guarantee of exam coverage. Prior automated completion records demonstrate structural coverage; they do not establish that explanations are sufficiently clear or deep. Review this lesson's teaching before applying the approach to other lessons. The separate `study-guide-v2` has not been edited.

## Next lesson rewritten: Matrix Anatomy, Dimensions & Types — 2026-10-01

At the user's request to improve lessons one by one, the next lesson now follows a three-student marks table through matrix shapes, entry addresses, structural types, feature order, and row-wise ML predictions. It includes a clickable cell-address activity with feedback on swapped indices, five MCQs with per-option explanations, three written practice questions, a 10-mark mini-exam, and a prepared Python companion using the same data. Optional depth discusses axis conventions, semantic errors that shape checks miss, and feature redundancy.

Existing lesson and section IDs remain compatible with saved navigation. New authored MCQs use distinct IDs. Continue one lesson per review cycle rather than treating structural coverage as teaching approval.

The new companion raises the Python Library coverage to 45 lessons, including 39 with browser execution and 7 with notebooks (one has both). These are authored/configured counts; the matrix companion was executed independently with Python for its default data and added-student exercise.

## Third lesson rewritten: Matrix–Vector Multiplication — 2026-10-01

The third authored lesson connects the marks table to one dot product per output row. It explains shape compatibility from coordinate pairing, preserves separate outputs, works through signed integer contributions, and derives the weighted-column view and its use for predicting input changes. ML examples distinguish observations from output units, add a shared bias to each prediction, and discuss flat arrays versus explicit columns in optional depth.

The new row-output prediction activity diagnoses omitted contributions and lost signs; changing the row or input clears stale attempts. The existing geometric explorer remains, with authored explanations for stretch, swap, and shear. Five MCQs have per-option feedback, and three written practice questions plus a 10-mark mini-exam have worked answers and marking guides. The Python companion uses explicit row loops and rejects mismatched input dimensions.

The user requests interactive elements where they improve the explanation; each future lesson should include them when they clarify its concept.

## Fourth lesson rewritten: Matrix–Matrix Multiplication — 2026-10-01

The fourth authored lesson prices the same cafe orders at two shops, using matching item quantities and price columns to give each output cell a meaning and units. It derives product dimensions from row–column pairing, connects the column view to matrix–vector multiplication, and explains noncommutativity through both arithmetic and successive transformations. The ML bridge uses the existing student marks to calculate two output scores and add per-output biases. Optional depth covers weight layouts, feature alignment, broadcasting, nonlinear layers, and NumPy operators.

An interactive bill table highlights the chosen row and column, asks for a predicted cell, and diagnoses missing item contributions or use of a price row instead of a column. Changing a shop price clears stale results and supports predicting the effect on a whole output column. Five authored MCQs explain every option; three written exercises and a 10-mark mini-exam include hints, worked answers, common traps, and self-assessment marks. The Python companion follows explicit row–column loops and validates dimensions.

Validation: all 105 app tests pass, including five new lesson tests for prediction feedback, changed prices, written practice, option reasoning, and formula rendering. The production build succeeds. The Python companion was executed independently for its default output, changed-price exercise, transformation products, feature reorder, and invalid-dimension checks. Browser appearance has not been visually verified.

## Fifth lesson rewritten: Transpose & Symmetric Matrices — 2026-10-01

The fifth authored lesson reorganises the familiar student marks from student-by-subject to subject-by-student, keeping labels and values intact. It explains index exchange, rectangular shapes, double transposes, row and column vectors, and symmetry through every mirrored pair. The product-transpose rule is justified by dimensions and individual scalar sums. The ML bridge builds both feature and observation Gram matrices using three small observations; optional depth distinguishes covariance, positive semidefiniteness, and invertibility, and explains NumPy's one-dimensional transpose behaviour.

Two activities support the explanation. The address activity diagnoses keeping an original address instead of exchanging indices, and can restore the layout with a second transpose. The symmetry activity lets learners independently change a mirrored pair and a diagonal value, predict symmetry, and repair the pair. Changes clear stale answers and feedback. Five authored MCQs explain every option. Three written practice exercises and a 10-mark mini-exam include hints, worked answers, traps, and self-assessment marking guides. The plain-Python companion reproduces the marks transpose, symmetry change, and both Gram products.

Validation: all 111 app tests pass, including six new lesson tests for address feedback, restored labels, symmetry changes and repairs, option reasoning, written practice, and formula rendering. The production build succeeds. The Python companion was executed independently with its hidden checks, mirrored-entry exercise, negative diagonal change, and product-transpose verification. Browser appearance has not been visually verified.

## Sixth lesson rewritten: Determinants & Geometric Collapse — 2026-10-01

The sixth authored lesson follows a unit square into a parallelogram, connects its image sides to matrix columns, and separates signed determinant, ordinary area, and orientation. It exhibits distinct inputs merging under a singular map, distinguishing line collapse from collapse to a point. The ML bridge demonstrates redundant output coordinates while distinguishing information loss from task usefulness. Optional depth explains why determinant magnitude alone does not establish numerical stability. Core practice covers signed entries, lost directions, and area scales through composition.

The existing live matrix graph remains and now identifies point collapse correctly. A prediction activity provides six transformation cases, asks for a signed determinant, transformed patch area, and geometric interpretation, and diagnoses lost signs, negative ordinary areas, or a missing original-area multiplier. Changing cases or patch area clears stale guesses and feedback. Five authored MCQs explain every option; three written exercises and a 10-mark mini-exam include hints, worked answers, common traps, and self-assessment marking guides. A new plain-Python companion reproduces the area and lost-direction calculations, bringing configured Python coverage to 46 lessons, including 40 browser labs and 7 notebooks (one lesson has both).

Validation: all 117 app tests pass, including six new lesson tests covering patch-area changes, sign feedback, compression, line and point collapse, the retained graph, written practice, and formula rendering. The production build succeeds. The Python companion's printed output was compared with its authored expected output, and its hidden checks, changed-input exercise, column images, composition determinant, and merging-input examples were executed independently. Browser appearance has not been visually verified.

## First three-lesson batch — 2026-10-01

The user approved batches of three to reduce repeated setup, review, and verification overhead. Use the established teaching structure, keep optional depth compact, reuse useful interactions, and run one full test/build check per batch. This replaces the earlier one-lesson-per-turn workflow; learners can still review lessons individually.

- **Matrix Inverses & Systems of Equations** now recovers cafe prices by elimination and inverse, verifies forward substitution, distinguishes inconsistent systems from solution families, and fits a tiny intercept/slope model. The existing equation-intersection graph is retained and explicitly explained. Optional depth distinguishes numerical solving, least squares, and pseudoinverses.
- **Rank, Column Space & Null Space** now connects dependent sensor readouts to reachable output directions and invisible input changes. It works through square and rectangular examples, particular solutions plus null directions, and identical predictions from different weight vectors. A new activity reuses the existing explorer shell to compare a dependent map, identity, and zero map under the same input displacement.
- **Standard Basis & Coordinates** now reconstructs a destination using horizontal and diagonal directions, explains independence and spanning, and connects unique coordinates to absence of null-space freedom. The existing basis explorer is retained with a sequence that restores the same destination after changing the basis and updating coefficients. Optional depth explains orthonormal dot-product coordinates and geometry in a skew basis.

Each lesson has five MCQs with reasoning for every option, three written exercises, and a 10-mark mini-exam with hints, worked answers, traps, and self-assessment marking guides. Shared authoring code keeps the seven navigation IDs stable. Three plain-Python companions reproduce the examples; rank and basis add two new companions, bringing configured coverage to 48 lessons, including 42 browser labs and 7 notebooks (one lesson has both).

Validation covers 124 app tests, including seven new batch tests. The full suite passed 123 checks and identified an incorrect selector in one new test; after correcting the selector, all seven batch tests passed in a focused rerun. The production build succeeds. All three Python companions were executed independently, with printed output compared to authored expectations, hidden checks run, and changed-input exercises verified. Browser appearance has not been visually verified.

There are now nine rewritten Linear Algebra lessons; the other ten retain their existing teaching content. **Change of Basis** is next. Continue in batches of three unless the user steers the scope differently.

## Cloud continuation notes — 2026-10-01

The user asked about continuing this work in the cloud. These notes prepare the continuation; they do not indicate that a cloud task has started or that local changes have been published.

Repository: `antorappai/ml-ai-math`. Preserve the completed nine lesson rewrites and their shared feedback/reading components before starting remote work. The separate, pre-existing untracked `study-guide-v2/` is outside the current rewrite scope. Cloud work must start from a branch containing the latest lesson edits, not an older remote snapshot.

Next batch: `change-of-basis`, `composition-matrix-powers`, and `eigenvalues-eigenvectors`. Continue improving the original app under `src/`. Use approachable, descriptive teaching with concrete examples, then bounded master's-level ML reasoning. Decode each main formula using a read-aloud explanation, symbol meanings, and a numerical example. Keep optional depth compact. Each lesson needs five MCQs explaining every option, three written exercises, and a 10-mark topic mini-exam with hints, worked answers, common traps, and self-assessment marks. Reuse interactions when useful and add a new one only when it clarifies the concept.

Preserve existing lesson IDs, seven guided section IDs, navigation, and saved progress; give newly authored MCQs distinct IDs. See `recoveryLessons.js` for the recent batch structure and the earlier authored lesson files for reference. Validate numerical examples and execute changed Python companions independently. Run the full app tests and production build once per batch; repair failures and rerun affected checks as needed. Report actual verification and avoid claiming browser visual inspection without doing it. Use short progress updates and a concise final with the three lesson links and updated rewrite count.

Environment commands: `npm ci`, `npm test`, `npm run build`. The root is a Vite/React project. No service secrets are needed for this lesson-authoring batch.

## Product goal

Help learners who are not confident with school mathematics understand the ideas behind machine learning without getting lost in notation. Every guided lesson teaches one idea at a time through a familiar situation, small numbers, plain language, and optional deeper material.

## Current curriculum status

| Chapter | Guided lessons | Total | Status |
| --- | ---: | ---: | --- |
| Math Language & Foundations | 9 | 9 | Complete |
| Linear Algebra for Representations | 19 | 19 | Complete |
| Calculus & Optimization | 12 | 12 | Complete |
| Probability & Statistics | 17 | 17 | Complete |
| Classical Machine Learning | 9 | 9 | Complete |
| Deep Learning Fundamentals + PyTorch | 8 | 8 | Complete |
| **Total** | **74** | **74** | Complete |

## Guided lesson standard

All guided lessons use the stable seven-step sequence:

1. Start here — goal and prerequisites.
2. See it in everyday life — a familiar situation, named quantities, a small-number walkthrough, and an interpretation.
3. Understand the main idea — vocabulary, examples, and an optional interactive widget.
4. Follow one worked example — each operation explains why it is useful.
5. Try one small check — supportive feedback; navigation is never blocked.
6. Connect the notation to ML — symbols decoded, ML terms defined, quantities mapped, and a model-focused example.
7. Recap — three retrieval questions and suggested next actions.

The shared content contract lives in `src/content/foundationGuides.js` and `src/content/guidedEnhancements.js`. The reusable rendering surface is `src/components/GuidedLesson.jsx`.

## Quality and audit rules

Each guided lesson must have:

- an everyday setup with at least two concrete quantities;
- a reason attached to every walkthrough step;
- an ML task, at least two defined ML terms, a maths-to-ML mapping, and a reasoned walkthrough;
- valid preview/review links for introduced terms;
- no repeated concept-definition paragraphs;
- no unexplained beginner copy using “obvious,” “trivial,” or “simply.”

The machine-readable audit contains one entry per guided lesson in `GUIDED_CONTENT_AUDIT`. Valid editorial states are `todo`, `drafted`, `reviewed`, and `done`. All 74 guided entries are marked `done`, including the eight Deep Learning lessons. Their reviewed teaching content is in `src/content/deepLearningGuides.js`; the audit records everyday explanations, numeric examples, ML explanations, term definitions, duplication review, and final content review.

## Remaining work

### Deep Learning migration — complete

- Tensors, Perceptrons & Dense Layers
- Activation Functions & Losses
- Forward Propagation & Backpropagation
- Deep Optimizers, Initialization & Regularization
- PyTorch MLPs, Training & Inference
- Convolutional Neural Networks
- Embeddings, RNNs & LSTMs
- Attention & Transformer Mathematics

All eight now have the seven-step structure, concrete quantities, reasoned numeric examples, supportive checks, symbol mappings, and recaps. Tensor, activation, backpropagation, regularization, PyTorch, inference, convolution, sequence, embedding, attention, and transformer are introduced in plain language before the guided calculations. Original level content, formulas, projects, Python labs, exercises, routes, and widgets are preserved. No lesson migrations remain.

### Verification completed — 2026-09-05

- `npm test`: **72 tests passed** across all six test files.
- `npm run build`: production build passed. Dependency warnings about ignored React Router `use client` directives are non-blocking.
- `git diff --check`: passed.
- Automated route tests render all seven steps for each Deep Learning lesson and verify Python/formula companion links. Legacy `study`/`basics`/`core`/`advanced` aliases redirect to the guided start.
- Navigation tests cover Back/Next/Skip, outline links, and browser back/forward. Migration tests cover v11 completion, partial completion, existing step overrides, retained scores/labs/projects, and reloading v12 state; earlier migration tests still pass.
- The test harness allows up to five seconds for asynchronous route rendering after one-second timeouts occurred on the busy test host. No navigation behavior was changed.

### Formula rendering audit — 2026-09-05

- All 74 guided notation panels and their symbol keys now use explicit LaTeX from `src/content/guidedNotation.js`, rendered by the same KaTeX components as the reference library. Widget formula companions use this rendering too.
- Fixed the literal `yhat` in the Linear Regression From Math To Model example. Its story, quantity list, and worked example now render a proper prediction hat using authored inline LaTeX.
- Added a shared inline-math renderer for authored formulas in lesson prose, checks, practice solutions, reference explanations, and Python companion explanations. Executable code remains code; ordinary prose is not heuristically interpreted as mathematics.
- Strict KaTeX validation passes for all 74 guided formulas, all 71 canonical reference formulas, and their symbol keys. Rendering tests cover every guided notation page and widget formula companion, reject math error markup, and check the regression prediction hat.
- Visually verified the regression worked example and full notation panel in the local browser. Plain-language read-aloud explanations remain alongside typeset formulas.
- No progress schema, lesson IDs, routes, numerical answers, or Python programs changed in this formula-rendering update.

### Classical ML teaching refinement — 2026-09-05

All nine Classical ML guides now use authored everyday examples and ML calculations from `src/content/classicalMlGuides.js`, rather than reusing advanced examples for the beginner ML connection. Each has named quantities, an explicit reason for each operation, a model setup, a quantities-to-model mapping, and three checks aligned with the example.

The regression journey now calculates a delivery prediction of 13 coins, compares it with an observed 15 coins to find a residual of 2, then squares that error to get 4. Other lessons cover a training/validation/test split, score-to-probability-to-decision flow, neighbour voting, Naive Bayes scores and normalization, tree voting, boundary scores and margins, one K-means iteration, and validation-based model selection. Equations use authored inline LaTeX. The regression walkthrough was also checked visually in the local browser.

Original levels, advanced examples, formula references, Python labs, projects, and saved progress remain intact. New guided checks use separate IDs; older recorded attempts remain stored. The nine lesson audit entries retain their completed status after this content review.

### Navigation and Python organization — 2026-09-05

- Guided lessons and formula/practice/Python pages now share direct resource links, a chapter lesson chooser, and previous/next lesson links.
- The recap's finish action records completion and opens the next lesson, including across chapter boundaries. The final course lesson finishes at the dashboard.
- Visiting a guided step stores its ID in the additive `lastGuidedSteps` map. Returning from a resource page resumes that step instead of restarting the lesson. Existing v12 data defaults safely when this optional map is absent; no old progress is cleared.
- The Python library at `#/python` groups lessons by chapter and filters examples by built-in execution or Colab notebooks. Lesson pages group distinct examples by introductory/core/deeper material, show expected output, and retain editor contents when a group is closed. Repeated examples are shown once, with their existing progress keys retained.

| Chapter | Lessons with explained Python | Built-in runner | Colab notebooks |
| --- | ---: | ---: | ---: |
| Foundations | 2 / 9 | 2 | 0 |
| Linear Algebra | 11 / 19 | 11 | 0 |
| Calculus | 5 / 12 | 5 | 0 |
| Probability | 10 / 17 | 10 | 0 |
| Classical ML | 8 / 9 | 8 | 0 |
| Deep Learning | 8 / 8 | 2 | 7 |
| **Total** | **44 / 74** | **38** | **7** |

One lesson offers both execution locations. There are **44 distinct per-lesson examples** after deduplicating repeated level entries; 30 lessons have no Python lab. Counts describe authored content and configured execution locations, not a fresh execution of every lab. The built-in feature runs editable Python code using Pyodide.

Suggested next content additions: short labs for loss functions, conditional probability, and model selection. Add them when they clarify the mathematical idea; not every elementary lesson needs code.

### Deep Learning Fundamentals + PyTorch refresh — 2026-09-13

- Reframed the Deep Learning unit around the supplied learner-question curriculum: the bridge from linear and logistic regression to perceptrons and MLPs; architecture choices versus learned parameters; activation, loss, forward propagation, gradient descent, and backpropagation; generalization; CNNs, sequence models, attention, and transformers.
- Added **PyTorch MLPs, Training & Inference** between optimization and CNNs. It walks through the full tensor → logits → loss → `backward()` → optimizer update loop, distinguishes training from ordinary LLM chat inference, and includes an existing prepared PyTorch notebook companion.
- Expanded transformer guidance to define attention heads as parallel calculations inside an attention block, distinguish them from hidden layers, and explain how head count is chosen while Q/K/V weights are learned.
- Saved progress now uses `ml-mastery-progress-v13`. The v12 migration retains all saved steps, checks, labs, projects, and resume position; the new PyTorch lesson starts uncompleted. Earlier migrations remain supported.
- The machine-readable guided audit now records all eight Deep Learning lessons as complete. Total guided lesson count: **74**. Remaining guided lesson migrations: **0**.

### Continuous Deep Learning guide — 2026-09-13

- Replaced the main Deep Learning unit journey with the supplied **Deep Learning Fundamentals + PyTorch** notes as one continuous 32-section guide. The sticky left menu jumps to each numbered section and follows the reader while scrolling.
- The notes are stored unchanged in `src/content/guides/deep_learning_pytorch_curriculum_chat_context.md`. Displayed equations are converted to KaTeX from their authored LaTeX.
- Existing Python and PyTorch resources remain available inside the relevant sections: neurons and tensors, activations, backpropagation, optimizers, the PyTorch MLP training loop, attention, CNNs, and sequence models. Existing direct lesson, formula, practice, project, and Python-library routes remain compatible for saved links and progress.
- Dashboard and old Deep Learning chapter URLs now open the continuous guide rather than a sequence of separate lesson pages.
- Rewrote the guide's framing so it teaches the concepts directly. It no longer refers to a learner's questions, doubts, or an AI textbook agent; the final practice and review sections are now natural parts of the learning sequence.
- Added the missing optimization-and-regularization clarifications: a numerical gradient update, an explicit separation between optimization and regularization, and bias–variance examples that show too little, useful, and too much regularization.
- Added five compact interactive MCQs directly to the optimizer and generalization sections, covering a gradient update, backpropagation's role, regularization, overfitting, and evaluation-time dropout.
- Expanded the continuous guide for learners without maths or programming experience: artificial weights are connected to biological synapses, sigmoid is explained as a binary probability, deep layers are explained as simple-to-complex feature building, vanishing gradients are traced through their effect on learning, and BatchNorm is explained before its formal terminology. Added one compact MCQ for each of those five ideas.

### Chapter-first homepage — 2026-09-05

- All six chapters now appear as clickable boxes above the continue-learning panel, with lesson counts and saved completion counts. Foundations lessons remain available on their chapter page.
- Desktop preview confirms all six boxes fit together. Responsive CSS uses two columns on smaller screens; a phone-size visual preview was not completed.
- Validation: 72 tests passed and the production build passed.

### Remaining release work

- Check responsive layout and keyboard focus in a real browser for story cards, term links, formula references, widgets, and Python companions. This session's UI checks ran in jsdom, not a visual browser.
- Release through the existing GitHub Pages workflow on `main`. The deployment result is recorded in GitHub Actions; the site target is https://antorappai.github.io/ml-ai-math/.
- **Remaining lesson migrations: 0.**

## Progress and compatibility

Saved progress now uses `ml-mastery-progress-v12`. The v11 migration maps fully completed Deep Learning levels into their seven guided step IDs, retaining existing explicit step states and all other saved progress. Partial legacy completion is preserved without marking every step visited. The earlier v2–v10 migrations remain supported. Existing formula, practice, project, and Python routes remain separate from the guided journey.

## Design rules

Keep the warm neutral background, readable dark text, muted green accent, restrained borders, comfortable reading width, and minimal motion. Prefer clear teaching structure over decorative density. New graphs or Python labs should be added only when they clarify a concept and can be kept small enough for a beginner to explore.

### NLP study unit — 2026-09-09

- Added the supplied `classical_nlp_study_guide.md` unchanged as a separate NLP study unit, accessible from the homepage at `#/nlp`.
- Its 17 numbered sections and Final Mental Model are presented as 18 individually navigable sections, with previous/next links and Markdown tables and examples.
- No additional teaching content, labs, or assessments were authored. The existing 73 guided lessons and saved progress remain unchanged.

### NLP scrolling layout — 2026-09-09

- The full NLP guide now reads continuously downward, with a sticky section menu on the left and a highlight for the current section. Existing section URLs jump to the corresponding heading.
- On narrow screens the section menu appears above the guide. Source content and existing mastery data are unchanged.
- Validation: 74 tests passed, production build passed, and desktop sidebar/deep-link layout visually verified.

### Scrolling lessons and course sidebar — 2026-09-09

- All 74 guided lessons now render their seven existing sections as one continuous reading page, with a sticky sidebar for units, lessons, and section links.
- Existing step URLs jump to their section. Scrolling updates the current section and existing visit/resume progress; rendering all sections does not automatically mark them visited. Explicit finish actions still complete a lesson and continue to the next.
- Check controls use unique rendered IDs when a question appears again in the recap. All existing teaching content, widgets, labs, and resource routes are preserved.
- Validation: 75 tests passed, production build passed, desktop reading/sidebar layout visually verified. NLP retains its continuous guide layout.

### Runnable project examples — 2026-09-12

- Each of the 13 project cards now includes a small editable Python example that runs in the browser. The examples introduce the core calculation behind the project, from vector similarity and gradient descent to CNN output shapes and attention-weighted values.
- Python remains lazy-loaded: opening a project does not start a runtime; it starts only when the learner clicks **Run code**. The deeper PyTorch work remains in the existing prepared notebooks.
- Validation: 76 tests passed and the production build passed.

### Formula reference trial: Gradient — 2026-09-12

- The Gradient formula now begins with a plain-language explanation, a small loss-setting example, and a sign guide for positive, negative, and zero partial changes before displaying the formula.
- This is a single-formula trial. Apply the same pre-formula pattern to other references only after reviewing it.
- Validation: 77 tests passed and the production build passed.

### Formula reference expansion — 2026-09-12

- Extended the Gradient trial to all 71 Formula Library entries. Every full reference now opens with the formula's purpose, a small concrete example, a pre-formula symbol guide, and sign or condition notes.
- Compact formula cards inside lessons remain concise; the expanded preparation appears in the dedicated Formula Library where learners need it.
- Validation: 78 tests passed and the production build passed.

### Direct unit entry — 2026-09-12

- Unit boxes on the homepage now open the next unfinished lesson directly. Its unit is expanded and highlighted in the scrolling lesson's course sidebar, removing the separate chapter lesson-list page.
- Existing `#/chapters/:chapterId` links redirect to the same next unfinished lesson, so old links continue to work. Lesson navigation now links back to the all-units dashboard rather than the removed chapter landing page.
- Validation: 79 tests passed and the production build passed.

### Clear current-unit state — 2026-09-12

- Homepage unit cards now say **Open unit**, and the selected unit has a clear green edge and highlighted heading in the scrolling lesson sidebar.
- Validation: 79 tests passed and the production build passed.

### Formula rendering audit — 2026-09-13

- Moved all 71 Formula Library expressions to raw LaTeX strings so JavaScript cannot consume LaTeX commands such as `\\sum`, `\\frac`, or `\\hat{y}`.
- Fixed the Deep Learning Markdown path so its 33 display equations and 16 inline equations reach KaTeX. Inline notation, including prediction hats, no longer disappears during Markdown parsing.
- Added strict KaTeX and rendered-page coverage for every reference formula, all guided notation, and all Deep Learning formulas.
