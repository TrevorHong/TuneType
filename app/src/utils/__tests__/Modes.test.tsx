import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, MemoryRouter, Route, Routes } from 'react-router-dom';
import Modes from '../../Components/Modes/Modes';



describe('Modes Component', () => {
    // Define the renderWithPath helper function inside the test suite
    const renderWithPath = (path: string) => {
        render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="*" element={<Modes />} />
            </Routes>
            </MemoryRouter>
        );
    };
    
  
    test('renders links for Easy, Medium, and Hard when on /NormalType/Easy', () => {
      renderWithPath('/NormalType/Easy');
  
      expect(screen.getByText('Easy')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('Hard')).toBeInTheDocument();
    });
  
    test('renders links for Easy, Medium, and Hard when on /NormalType/Medium', () => {
      renderWithPath('/NormalType/Medium');
  
      expect(screen.getByText('Easy')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('Hard')).toBeInTheDocument();
    });
  
    test('renders links for Easy, Medium, and Hard when on /NormalType/Hard', () => {
      renderWithPath('/NormalType/Hard');
  
      expect(screen.getByText('Easy')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('Hard')).toBeInTheDocument();
    });
  
    test('toggles dropdown menu visibility when "Modes" is clicked', () => {
      renderWithPath('/NormalType/Easy');
  
      const modesButton = screen.getByText('Modes');
      fireEvent.click(modesButton);
  
  
      expect(screen.queryByTestId('Dropdown-container')).not.toBeInTheDocument();
    });
}
);