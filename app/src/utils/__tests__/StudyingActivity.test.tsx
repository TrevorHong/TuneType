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

    // Add text and keywords via the modal
    // const textInput = screen.getByRole('textbox', { name: /text/i });
    // const keywordInput = screen.getByRole('textbox', { name: /keywords/i });
    // const submitButton = screen.getByText('Submit');

    const textInput = screen.getByPlaceholderText('Notes go here');
    expect(textInput).toBeInTheDocument();

    const keywordInput = screen.getByPlaceholderText('Keywords go here');
    expect(keywordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(textInput, { target: { value: 'This is a test example' } });
    fireEvent.change(keywordInput, { target: { value: 'test,example' } });
    fireEvent.click(submitButton);

    // Trigger removeNextKeyword
    const removeKeywordButton = screen.getByText('Remove next keyword');
    fireEvent.click(removeKeywordButton);

    const confirmErrors = screen.getByText('Okay, Got it');
    fireEvent.click(confirmErrors);

    // Assert that the first keyword was removed
    // const updatedText = screen.getByText('/This is a ____ example/i');
    // expect(updatedText).toBeInTheDocument();

    const paragraph = screen.getByRole('paragraph');
    expect(paragraph.textContent).toBe('This is a ____ example');

    // Assert that the remaining keywords have been updated
    fireEvent.click(removeKeywordButton);
    const confirmErrors2 = screen.getByText('Okay, Got it');
    fireEvent.click(confirmErrors2);
    // const finalText = screen.getByText('This is a ____ _______');
    // expect(finalText).toBeInTheDocument();

    const secondParagraph = screen.getByRole('paragraph');
    expect(secondParagraph.textContent).toBe('This is a ____ _______');

  });

  it('handles case when no keywords are left and oneMoreClick is true', () => {
    // Render the component
    render(<StudyingActivity />);

    // Open the modal to add text and keywords
    const addNotesButton = screen.getByRole('button', { name: /add or adjust notes!/i });
    fireEvent.click(addNotesButton);

    // Add text and an empty keyword list via the modal
    const textInput = screen.getByPlaceholderText('Notes go here');
    expect(textInput).toBeInTheDocument();

    const keywordInput = screen.getByPlaceholderText('Keywords go here');
    expect(keywordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(textInput, { target: { value: 'This is a test example' } });
    // fireEvent.change(keywordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    // Trigger removeNextKeyword with oneMoreClick set to true
    const removeKeywordButton = screen.getByText('Remove next keyword');
    fireEvent.click(removeKeywordButton);

    const confirmErrors = screen.getByText('Okay, Got it');
    fireEvent.click(confirmErrors);

    // fireEvent.click(removeKeywordButton);

    // Assert that oneMoreClick has been updated
    const buttonDisabled = screen.getByText('Remove next keyword');
    expect(buttonDisabled).toBeDisabled();
  });
});
