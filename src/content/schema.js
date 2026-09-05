export const LEVELS = ["basics", "core", "advanced"];

export function defineFormula(formula) {
  return formula;
}

export function defineLesson(lesson) {
  return lesson;
}

export function defineChapter(chapter) {
  return chapter;
}

export function defineProject(project) {
  return project;
}

export function mcq(id, prompt, options, answerIndex, explanation, skill = "concept") {
  return {
    id,
    type: "mcq",
    prompt,
    options,
    answerIndex,
    explanation,
    skill
  };
}

export function shortAnswer(id, prompt, acceptedAnswers, explanation, skill = "calculation") {
  return {
    id,
    type: "short",
    prompt,
    acceptedAnswers,
    explanation,
    skill
  };
}

export function level({
  title,
  summary,
  concepts,
  formulaIds = [],
  example,
  pythonLab = null,
  questions = [],
  examNotes = [],
  ...teachingContent
}) {
  return { title, summary, concepts, formulaIds, example, pythonLab, questions, examNotes, ...teachingContent };
}

export function validateCurriculum(chapters, lessons, formulas, projects) {
  const errors = [];
  const questionIds = new Set();
  const chapterIds = new Set(chapters.map((chapter) => chapter.id));
  const lessonIds = new Set(lessons.map((lesson) => lesson.id));
  const formulaIds = new Set(Object.keys(formulas));
  const projectIds = new Set(projects.map((project) => project.id));
  const introducedTerms = new Set();

  for (const lesson of lessons) {
    if (!chapterIds.has(lesson.chapterId)) {
      errors.push(`Lesson ${lesson.id} references missing chapter ${lesson.chapterId}.`);
    }
    for (const prerequisite of lesson.prerequisites || []) {
      if (!lessonIds.has(prerequisite)) {
        errors.push(`Lesson ${lesson.id} references missing prerequisite ${prerequisite}.`);
      }
    }
    if (!lesson.scenario?.title || !lesson.scenario?.body || !lesson.scenario?.mlParallel) {
      errors.push(`Lesson ${lesson.id} is missing a real-world scenario or ML connection.`);
    }
    for (const levelKey of LEVELS) {
      const content = lesson.levels?.[levelKey];
      if (!content) {
        errors.push(`Lesson ${lesson.id} is missing ${levelKey} content.`);
        continue;
      }
      for (const formulaId of content.formulaIds || []) {
        if (!formulaIds.has(formulaId)) {
          errors.push(`Lesson ${lesson.id}/${levelKey} references missing formula ${formulaId}.`);
        }
      }
      if (content.pythonLab) {
        for (const field of ["code", "output", "mathToCode", "commonTrap", "exercise"]) {
          if (!content.pythonLab[field]) errors.push(`Python lab for ${lesson.id}/${levelKey} is missing ${field}.`);
        }
        if (!content.pythonLab.exercise.prompt) errors.push(`Python lab for ${lesson.id}/${levelKey} is missing an exercise prompt.`);
      }
      for (const question of content.questions || []) {
        if (questionIds.has(question.id)) errors.push(`Question id ${question.id} is duplicated.`);
        questionIds.add(question.id);
        if (question.type === "mcq" && (!Array.isArray(question.options) || question.answerIndex < 0 || question.answerIndex >= question.options.length)) {
          errors.push(`Question ${question.id} has an invalid answer definition.`);
        }
        if (!question.explanation) errors.push(`Question ${question.id} is missing answer feedback.`);
      }
      if (lesson.beginnerFirst) {
        for (const field of ["objectives", "vocabulary", "explanationSections", "workedExamples", "misconceptions", "calculationProblems", "examQuestions"]) {
          if (!content[field]?.length) errors.push(`Beginner-first lesson ${lesson.id}/${levelKey} is missing ${field}.`);
        }
        if (!content.realWorldScenario || !content.mlScenario || !content.readinessCheck) errors.push(`Beginner-first lesson ${lesson.id}/${levelKey} is missing scenario or readiness content.`);
        for (const example of content.workedExamples || []) {
          for (const field of ["situation", "quantityMap", "realWorldMeaning", "mlParallel"]) {
            if (!example[field] || (Array.isArray(example[field]) && !example[field].length)) errors.push(`Worked example ${lesson.id}/${levelKey}/${example.title} is missing ${field}.`);
          }
          if (!example.situation?.title || !example.situation?.story) errors.push(`Worked example ${lesson.id}/${levelKey}/${example.title} has an incomplete situation.`);
        }
      }
    }
    if (lesson.beginnerFirst) {
      if (lesson.beginnerSteps?.length) {
        const requiredStepTypes = ["orientation", "scenario", "concept", "worked-example", "check", "notation", "recap"];
        if (lesson.beginnerSteps.length !== requiredStepTypes.length) errors.push(`Guided lesson ${lesson.id} must contain seven steps.`);
        for (const [index, stepType] of requiredStepTypes.entries()) {
          const step = lesson.beginnerSteps[index];
          if (!step?.id || !step?.title || step.type !== stepType) errors.push(`Guided lesson ${lesson.id} is missing step ${stepType}.`);
        }
        const notationStep = lesson.beginnerSteps.find((step) => step.type === "notation");
        if (!notationStep?.notation?.latex || !notationStep?.notation?.expression || !notationStep?.notation?.readAs || !notationStep?.notation?.symbols?.length || !notationStep?.mlExample) {
          errors.push(`Guided lesson ${lesson.id} needs notation guidance and an ML example.`);
        }
        const scenarioStep = lesson.beginnerSteps.find((step) => step.type === "scenario");
        const everyday = scenarioStep?.everyday;
        if (!everyday?.title || everyday?.setup?.length < 2 || everyday?.quantities?.length < 2 || !everyday?.walkthrough?.length || !everyday?.takeaway) {
          errors.push(`Guided lesson ${lesson.id} needs a complete everyday explanation.`);
        }
        for (const quantity of everyday?.quantities || []) {
          if (!quantity.label || !quantity.value || !quantity.meaning) errors.push(`Guided lesson ${lesson.id} has an incomplete everyday quantity.`);
        }
        for (const item of everyday?.walkthrough || []) {
          if (!item.action || !item.reason) errors.push(`Guided lesson ${lesson.id} has an everyday step without a reason.`);
        }
        const mlBridge = notationStep?.mlBridge;
        if (!mlBridge?.task || !mlBridge?.terms?.length || !mlBridge?.mapping?.length || !mlBridge?.walkthrough?.length || !mlBridge?.takeaway) {
          errors.push(`Guided lesson ${lesson.id} needs a complete ML bridge.`);
        }
        for (const term of mlBridge?.terms || []) {
          if (!term.name || !term.definition || !["preview", "review"].includes(term.state)) errors.push(`Guided lesson ${lesson.id} has an incomplete ML term definition.`);
          if (term.lessonId && !lessonIds.has(term.lessonId)) errors.push(`Guided lesson ${lesson.id} links ML term ${term.name} to missing lesson ${term.lessonId}.`);
        }
        for (const mapping of mlBridge?.mapping || []) if (!mapping.math || !mapping.ml) errors.push(`Guided lesson ${lesson.id} has an incomplete math-to-ML mapping.`);
        for (const item of mlBridge?.walkthrough || []) if (!item.action || !item.reason) errors.push(`Guided lesson ${lesson.id} has an ML step without a reason.`);
        const guidedTeachingCopy = JSON.stringify({ everyday, mlBridge });
        if (/\b(obvious|trivial|simply)\b/i.test(guidedTeachingCopy)) errors.push(`Guided lesson ${lesson.id} contains discouraged beginner copy.`);
        const conceptStep = lesson.beginnerSteps.find((step) => step.type === "concept");
        if (new Set(conceptStep?.body || []).size !== (conceptStep?.body || []).length) errors.push(`Guided lesson ${lesson.id} repeats its main definition.`);
        const workedStep = lesson.beginnerSteps.find((step) => step.type === "worked-example");
        if (!workedStep?.example) errors.push(`Guided lesson ${lesson.id} needs an everyday worked example.`);
      }
      const total = (field) => LEVELS.reduce((count, key) => count + (lesson.levels[key][field]?.length || 0), 0);
      if (total("questions") < 5 || total("calculationProblems") < 5 || total("examQuestions") < 3) errors.push(`Beginner-first lesson ${lesson.id} does not meet practice minimums.`);
      for (const termId of lesson.levels.basics.requiredTermIds || []) if (!introducedTerms.has(termId)) errors.push(`Lesson ${lesson.id} requires term ${termId} before it is introduced.`);
      for (const term of lesson.vocabulary || []) {
        for (const field of ["definition", "analogy", "example", "nonExample", "mlConnection"]) if (!term[field]) errors.push(`Term ${term.id} is missing ${field}.`);
        introducedTerms.add(term.id);
      }
    }
    for (const projectId of lesson.projectIds || []) {
      if (!projectIds.has(projectId)) {
        errors.push(`Lesson ${lesson.id} references missing project ${projectId}.`);
      }
    }
  }

  for (const chapter of chapters) {
    for (const lessonId of chapter.lessonIds) {
      if (!lessonIds.has(lessonId)) {
        errors.push(`Chapter ${chapter.id} references missing lesson ${lessonId}.`);
      }
    }
  }

  for (const formula of Object.values(formulas)) {
    for (const field of ["latex", "readAs", "purpose", "symbols", "assumptions", "beginnerExample", "derivation", "signs", "mistakes"]) {
      if (!formula[field] || (Array.isArray(formula[field]) && !formula[field].length)) errors.push(`Formula ${formula.id} is missing ${field}.`);
    }
  }

  for (const project of projects) {
    if (!chapterIds.has(project.chapterId)) errors.push(`Project ${project.id} references missing chapter ${project.chapterId}.`);
  }

  if (errors.length) {
    throw new Error(`Curriculum validation failed:\n${errors.join("\n")}`);
  }

  return true;
}
