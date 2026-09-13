import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import katex from "katex";
import DeepLearningPage from "../pages/DeepLearningPage.jsx";
import source from "../content/guides/deep_learning_pytorch_curriculum_chat_context.md?raw";
import { deepLearningIntroduction, deepLearningSections } from "../content/deepLearningGuide.js";

describe("Deep Learning continuous guide", () => {
  it("preserves the supplied notes as one sectioned study guide", () => {
    expect(deepLearningSections).toHaveLength(32);
    expect(deepLearningIntroduction + deepLearningSections.map((section) => section.markdown).join("")).toBe(source);
  });

  it("keeps every authored Deep Learning formula valid LaTeX", () => {
    const displayMath = [...source.matchAll(/\$\$\s*\n?([\s\S]*?)\n?\s*\$\$/g)].map((match) => match[1].trim());
    const inlineMath = [...source.replace(/\$\$[\s\S]*?\$\$/g, "").matchAll(/\$([^$\n]+?)\$/g)].map((match) => match[1].trim());

    expect(displayMath).toHaveLength(33);
    expect(inlineMath).toHaveLength(16);
    for (const latex of [...displayMath, ...inlineMath]) {
      expect(() => katex.renderToString(latex, { throwOnError: true, strict: "error" }), latex).not.toThrow();
    }
  });

  it("shows every section, typesets formulas, and keeps embedded Python labs", () => {
    const scroll = vi.fn();
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scroll;
    try {
      render(<MemoryRouter initialEntries={["/deep-learning/18"]}><Routes><Route path="/deep-learning/:sectionId" element={<DeepLearningPage />} /></Routes></MemoryRouter>);
      expect(document.querySelectorAll(".deep-reading-section")).toHaveLength(32);
      expect(document.querySelectorAll(".deep-markdown .block-math")).toHaveLength(33);
      expect(document.querySelectorAll(".deep-markdown .block-math .katex")).toHaveLength(33);
      expect(document.querySelectorAll(".deep-markdown .inline-math .katex")).toHaveLength(16);
      expect(document.querySelector(".deep-markdown .katex-error, .deep-markdown .math-fallback")).toBeNull();
      expect(screen.getByText("PyTorch MLPs, Training & Inference in Python")).toBeInTheDocument();
      expect(screen.getAllByRole("region", { name: "Quick checks" })).toHaveLength(6);
      fireEvent.click(screen.getByRole("button", { name: "Increasing a connection weight through training" }));
      expect(screen.getByText(/Correct\. A weight is the adjustable strength/i)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "0.76" }));
      expect(screen.getByText(/Correct\. Subtract the scaled gradient/i)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("link", { name: "19. Generalization" }));
      expect(scroll.mock.instances.at(-1).id).toBe("deep-learning-section-19");
    } finally { Element.prototype.scrollIntoView = original; }
  });
});
