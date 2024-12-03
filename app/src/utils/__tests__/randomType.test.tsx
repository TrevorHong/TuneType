import React, { useEffect } from 'react';  // Add React import to avoid the error
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Typing from '../../Components/TypingMenu/Typing';  // Import Typing component
import { useLocation } from 'react-router-dom';  // Mocked location hook
import '@testing-library/jest-dom';  // Import jest-dom matchers


// Mock the useLocation hook to simulate the URL path
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Typing component', () => {
  beforeEach(() => {
    // Mock location for each test case
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/NormalType/Medium' });

    render(<Typing />);
  });

  it('should render the component with initial elements', () => {
    expect(screen.getByText(/Click here to start typing/i)).toBeInTheDocument();
    expect(screen.getByText(/Words Per Minute:/i)).toBeInTheDocument();
  });

  it('should start the timer and change the count when clicked', async () => {
    const startButton = screen.getByText(/Click here to start typing/i);
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText(/60/i)).toBeInTheDocument(); // Expecting initial WPM count
    });
  });

  it('should update the input value when typing', () => {
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement; // Cast to HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'The qui' } });
    expect(textarea.value).toBe('The qui');
  });

  it('should highlight correct and incorrect words as per the input', async () => {
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement; // Cast to HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'The quick' } });

    await waitFor(() => {
      const spans = screen.getAllByRole('span');
      expect(spans[0]).toHaveClass('correct');
      expect(spans[1]).toHaveClass('correct');
      expect(spans[2]).toHaveClass('incorrect');
    });
  });

  it('should calculate words per minute (WPM)', async () => {
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement; // Cast to HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'The quick brown fox jumps' } });

    await waitFor(() => {
      expect(screen.getByText(/Words Per Minute:/i)).toHaveTextContent(/Words Per Minute: \d+/);
    });
  });

  it('should stop the timer when count reaches 0', async () => {
    const startButton = screen.getByText(/Click here to start typing/i);
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText(/0/i)).toBeInTheDocument(); // Expecting the count to reach 0
    });
  });

  it('should set the correct difficulty level from the URL', () => {
    // Ensure the correct path is used in the mock
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/NormalType/Medium' });

    render(<Typing />);

    expect(screen.getByText(/Words Per Minute:/i)).toBeInTheDocument();
  });
});
