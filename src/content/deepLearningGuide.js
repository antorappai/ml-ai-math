import source from "./guides/deep_learning_pytorch_curriculum_chat_context.md?raw";

export const deepLearningIntroduction = source.split(/^# 1\. /m)[0];

export const deepLearningSections = Array.from(
  source.matchAll(/^# (\d+)\. (.+)\n([\s\S]*?)(?=^# \d+\. |$(?![\s\S]))/gm),
  (match) => ({ id: match[1], title: `${match[1]}. ${match[2]}`, markdown: `# ${match[1]}. ${match[2]}\n${match[3]}` })
);

export function prepareDeepMarkdown(markdown) {
  return markdown
    .replace(/\$\$\s*\n?([\s\S]*?)\n?\s*\$\$/g, (_, latex) => `\n\n\`\`\`math\n${latex.trim()}\n\`\`\`\n\n`)
    .replace(/(^|[^$])\$([^$\n]+?)\$(?!\$)/g, (_, before, latex) => `${before}\\(${latex}\\)`);
}
