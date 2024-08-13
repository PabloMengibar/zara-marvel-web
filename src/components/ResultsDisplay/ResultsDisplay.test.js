import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsDisplay from './ResultsDisplay';

jest.mock('../CharacterList/CharacterList', () => {
  return function DummyCharacterList() {
    return <div data-testid="character-list"></div>;
  };
});

jest.mock('../LoadingSpinner/LoadingSpinner', () => {
  return function DummyLoadingSpinner() {
    return <div data-testid="loading-spinner"></div>;
  };
});

describe('ResultsDisplay', () => {
  const mockCharacters = [
    { id: 1, name: 'Deadpool' },
    { id: 2, name: 'Wolverine' },
  ];
  const mockOnCharacterClick = jest.fn();

  it('should renders LoadingSpinner when isLoading is true', () => {
    render(<ResultsDisplay isLoading={true} characters={[]} onCharacterClick={mockOnCharacterClick} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should renders CharacterList and results count when isLoading is false', () => {
    render(<ResultsDisplay isLoading={false} characters={mockCharacters} onCharacterClick={mockOnCharacterClick} />);
    expect(screen.getByTestId('character-list')).toBeInTheDocument();
    expect(screen.getByText('2 Results')).toBeInTheDocument();
  });

  it('should displays correct number of results', () => {
    render(<ResultsDisplay isLoading={false} characters={mockCharacters} onCharacterClick={mockOnCharacterClick} />);
    expect(screen.getByText('2 Results')).toBeInTheDocument();
  });

  it('should not render results when isLoading is true', () => {
    render(<ResultsDisplay isLoading={true} characters={mockCharacters} onCharacterClick={mockOnCharacterClick} />);
    expect(screen.queryByText('2 Results')).not.toBeInTheDocument();
  });
});