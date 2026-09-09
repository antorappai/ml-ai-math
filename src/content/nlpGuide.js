import source from './guides/classical_nlp_study_guide.md?raw';

export const nlpIntroduction = source.split(/^## /m)[0];
export const nlpSections = Array.from(source.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm), (match, index) => ({
  id: String(index + 1),
  title: match[1],
  markdown: `## ${match[1]}\n${match[2]}`,
}));
