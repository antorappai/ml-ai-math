import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DeepLearningPage from "../pages/DeepLearningPage.jsx";
import source from "../content/guides/deep_learning_pytorch_curriculum_chat_context.md?raw";
import { deepLearningIntroduction, deepLearningSections } from "../content/deepLearningGuide.js";

describe("Deep Learning continuous guide", () => {
  it("preserves the supplied notes as one sectioned study guide", () => {
    expect(deepLearningSections).toHaveLength(32);
    expect(deepLearningIntroduction + deepLearningSections.map((section) => section.markdown).join("")).toBe(source);
  });

  it("shows every section, typesets formulas, and keeps embedded Python labs", () => {
    const scroll = vi.fn();
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scroll;
    try {
      render(<MemoryRouter initialEntries={["/deep-learning/18"]}><Routes><Route path="/deep-learning/:sectionId" element={<DeepLearningPage />} /></Routes></MemoryRouter>);
      expect(document.querySelectorAll(".deep-reading-section")).toHaveLength(32);
      expect(document.querySelector(".block-math .katex")).toBeTruthy();
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
