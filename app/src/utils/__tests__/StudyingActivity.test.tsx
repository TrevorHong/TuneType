/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudyingActivity from '../../Pages/StudyingActivity';
// import * as StudyingActivity from '../../Pages/StudyingActivity';
// src/setupTests.ts (TypeScript file)
import '@testing-library/jest-dom'; // This adds the custom matchers to Jest

describe('StudyingActivity Component', () => {
  it('removes the next keyword and updates text correctly', () => {
    // Render the component
    render(<StudyingActivity />);

    // Open the modal to add text and keywords
    const addNotesButton = screen.getByRole('button', { name: /add or adjust notes!/i });
    fireEvent.click(addNotesButton);

    // Get the text and keywords textarea in the modal
    const textInput = screen.getByPlaceholderText('Notes go here');
    expect(textInput).toBeInTheDocument();

    const keywordInput = screen.getByPlaceholderText('Keywords go here');
    expect(keywordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i })

    // Simulate adding notes, keywords and then submitting
    fireEvent.change(textInput, { target: { value: 'This is a test example' } });
    fireEvent.change(keywordInput, { target: { value: 'test,example' } });
    fireEvent.click(submitButton);

    // Simulate pressing removeNextKeyword button
    const removeKeywordButton = screen.getByText('Remove next keyword');
    fireEvent.click(removeKeywordButton);

    // Simulate pressing okay, got it button when showing errors
    const confirmErrors = screen.getByText('Okay, Got it');
    fireEvent.click(confirmErrors);

    const paragraph = screen.getByRole('paragraph');
    expect(paragraph.textContent).toBe('This is a ____ example');

    // Assert that the remaining keywords have been updated
    fireEvent.click(removeKeywordButton);
    const confirmErrors2 = screen.getByText('Okay, Got it');
    fireEvent.click(confirmErrors2);

    const secondParagraph = screen.getByRole('paragraph');
    expect(secondParagraph.textContent).toBe('This is a ____ _______');

  });

  it('handles case when no keywords are left and oneMoreClick is true', () => {
    // Render the component
    render(<StudyingActivity />);

    // Find add notes button to open the modal
    const addNotesButton = screen.getByRole('button', { name: /add or adjust notes!/i });
    fireEvent.click(addNotesButton);

    // Find the input for text, don't need keywords
    const textInput = screen.getByPlaceholderText('Notes go here');
    expect(textInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i })

    // Set empty example with no keywords
    fireEvent.change(textInput, { target: { value: 'This is a test example' } });
    fireEvent.click(submitButton);

    // Trigger removeNextKeyword 
    const removeKeywordButton = screen.getByText('Remove next keyword');
    fireEvent.click(removeKeywordButton);

    const confirmErrors = screen.getByText('Okay, Got it');
    fireEvent.click(confirmErrors);

    // Check that removeNextKeyword button is disabled
    const buttonDisabled = screen.getByText('Remove next keyword');
    expect(buttonDisabled).toBeDisabled();
  });
});
