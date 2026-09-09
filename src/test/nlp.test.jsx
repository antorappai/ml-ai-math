import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NlpPage from '../pages/NlpPage.jsx';
import source from '../content/guides/classical_nlp_study_guide.md?raw';
import { nlpIntroduction, nlpSections } from '../content/nlpGuide.js';

describe('NLP study unit', () => {
  it('preserves the complete source across its sections', () => {
    expect(nlpSections).toHaveLength(18);
    expect(nlpIntroduction + nlpSections.map(section => section.markdown).join('')).toBe(source);
  });
  it('shows the full guide and jumps from the sidebar without hiding sections', () => {
    const scroll = vi.fn();
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scroll;
    try {
      render(<MemoryRouter initialEntries={['/nlp/2']}><Routes><Route path="/nlp/:sectionId" element={<NlpPage />} /></Routes></MemoryRouter>);
      expect(document.querySelectorAll('.nlp-reading-section')).toHaveLength(18);
      expect(scroll).toHaveBeenCalled();
      fireEvent.click(screen.getByRole('link', { name: '3. Historical Timeline' }));
      expect(scroll.mock.instances.at(-1).id).toBe('nlp-section-3');
      expect(screen.getByRole('heading', { name: '2. The Classical NLP Pipeline' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Final Mental Model' })).toBeInTheDocument();
      expect(screen.getAllByRole('table').length).toBeGreaterThan(0);
    } finally { Element.prototype.scrollIntoView = original; }
  });
});
