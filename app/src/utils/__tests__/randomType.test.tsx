import React, { useEffect } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Typing from '../../Components/TypingMenu/Typing';
import { useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';  // Import jest-dom matchers

// Polyfill fetch for Jest environment
import 'whatwg-fetch'; // Add this line to polyfill fetch in Jest tests

// Mock the useLocation hook from react-router-dom
jest.mock('react-router-dom', () => ({
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

  it('should render the start button', () => {
    // Render the component
    render(<Typing />);
  
    // Get all elements with the text "Click here to start typing"
    const startButtons = screen.queryAllByText(/Click here to start typing/i);
  
    // Assert that at least one of the elements is in the document
    expect(startButtons.length).toBeGreaterThan(0);
  });
  
  
});
