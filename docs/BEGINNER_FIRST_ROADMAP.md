# ML Math Studio — Beginner-First Roadmap

Last updated: 2026-09-05

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
| Deep Learning | 7 | 7 | Complete |
| **Total** | **73** | **73** | Complete |

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

The machine-readable audit contains one entry per guided lesson in `GUIDED_CONTENT_AUDIT`. Valid editorial states are `todo`, `drafted`, `reviewed`, and `done`. All 73 guided entries are marked `done`, including the seven Deep Learning lessons. Their reviewed teaching content is in `src/content/deepLearningGuides.js`; the audit records everyday explanations, numeric examples, ML explanations, term definitions, duplication review, and final content review.

## Remaining work

### Deep Learning migration — complete

- Tensors, Perceptrons & Dense Layers
- Activation Functions & Losses
- Forward Propagation & Backpropagation
- Deep Optimizers, Initialization & Regularization
- Convolutional Neural Networks
- Embeddings, RNNs & LSTMs
- Attention & Transformer Mathematics

All seven now have the seven-step structure, concrete quantities, reasoned numeric examples, supportive checks, symbol mappings, and recaps. Tensor, activation, backpropagation, regularization, convolution, sequence, embedding, attention, and transformer are introduced in plain language before the guided calculations. Original level content, formulas, projects, Python labs, exercises, routes, and widgets are preserved. No lesson migrations remain.

### Verification completed — 2026-09-05

- `npm test`: **72 tests passed** across all six test files.
- `npm run build`: production build passed. Dependency warnings about ignored React Router `use client` directives are non-blocking.
- `git diff --check`: passed.
- Automated route tests render all seven steps for each Deep Learning lesson and verify Python/formula companion links. Legacy `study`/`basics`/`core`/`advanced` aliases redirect to the guided start.
- Navigation tests cover Back/Next/Skip, outline links, and browser back/forward. Migration tests cover v11 completion, partial completion, existing step overrides, retained scores/labs/projects, and reloading v12 state; earlier migration tests still pass.
- The test harness allows up to five seconds for asynchronous route rendering after one-second timeouts occurred on the busy test host. No navigation behavior was changed.

### Formula rendering audit — 2026-09-05

- All 73 guided notation panels and their symbol keys now use explicit LaTeX from `src/content/guidedNotation.js`, rendered by the same KaTeX components as the reference library. Widget formula companions use this rendering too.
- Fixed the literal `yhat` in the Linear Regression From Math To Model example. Its story, quantity list, and worked example now render a proper prediction hat using authored inline LaTeX.
- Added a shared inline-math renderer for authored formulas in lesson prose, checks, practice solutions, reference explanations, and Python companion explanations. Executable code remains code; ordinary prose is not heuristically interpreted as mathematics.
- Strict KaTeX validation passes for all 73 guided formulas, all 71 canonical reference formulas, and their symbol keys. Rendering tests cover every guided notation page and widget formula companion, reject math error markup, and check the regression prediction hat.
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
| Deep Learning | 7 / 7 | 2 | 6 |
| **Total** | **43 / 73** | **38** | **6** |

One lesson offers both execution locations. There are **44 distinct per-lesson examples** after deduplicating repeated level entries; 30 lessons have no Python lab. Counts describe authored content and configured execution locations, not a fresh execution of every lab. The built-in feature runs editable Python code using Pyodide.

Suggested next content additions: short labs for loss functions, conditional probability, and model selection. Add them when they clarify the mathematical idea; not every elementary lesson needs code.

### Remaining release work

- Check responsive layout and keyboard focus in a real browser for story cards, term links, formula references, widgets, and Python companions. This session's UI checks ran in jsdom, not a visual browser.
- Release through the existing GitHub Pages workflow on `main`. The deployment result is recorded in GitHub Actions; the site target is https://antorappai.github.io/ml-ai-math/.
- **Remaining lesson migrations: 0.**

## Progress and compatibility

Saved progress now uses `ml-mastery-progress-v12`. The v11 migration maps fully completed Deep Learning levels into their seven guided step IDs, retaining existing explicit step states and all other saved progress. Partial legacy completion is preserved without marking every step visited. The earlier v2–v10 migrations remain supported. Existing formula, practice, project, and Python routes remain separate from the guided journey.

## Design rules

Keep the warm neutral background, readable dark text, muted green accent, restrained borders, comfortable reading width, and minimal motion. Prefer clear teaching structure over decorative density. New graphs or Python labs should be added only when they clarify a concept and can be kept small enough for a beginner to explore.
