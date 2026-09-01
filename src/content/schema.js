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
