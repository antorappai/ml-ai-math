import React from 'react';
import { describe, it, expect } from 'vitest';
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
  it('opens sections and navigates forward with tables rendered', () => {
    render(<MemoryRouter initialEntries={['/nlp/2']}><Routes><Route path="/nlp/:sectionId" element={<NlpPage />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: '2. The Classical NLP Pipeline' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Next section →' }));
    expect(screen.getByRole('heading', { name: '3. Historical Timeline' })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← Previous section' })).toHaveAttribute('href', '/nlp/2');
  });
});
