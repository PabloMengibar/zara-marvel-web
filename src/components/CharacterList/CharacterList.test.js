import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterList';

jest.mock('../CharacterCard/CharacterCard', () => ({ character, onClick }) => (
  <div data-testid="character-card" onClick={onClick}>
    {character.name}
  </div>
));

describe('CharacterList', () => {
  const characters = [
    { id: 1, name: 'Spider-Man', thumbnail: { path: '', extension: '' } },
    { id: 2, name: 'Deadpool', thumbnail: { path: '', extension: '' } },
    { id: 3, name: 'Wolverine', thumbnail: { path: '', extension: '' } },
  ];

  it('should render a list of characters', () => {
    render(<CharacterList characters={characters} onCharacterClick={jest.fn()} />);

    const characterCards = screen.getAllByTestId('character-card');
    expect(characterCards.length).toBe(characters.length);

    characters.forEach((character, index) => {
      expect(characterCards[index]).toHaveTextContent(character.name);
    });
  });

  it('should call onCharacterClick with the correct character ID when a character card is clicked', () => {
    const mockOnCharacterClick = jest.fn();
    render(<CharacterList characters={characters} onCharacterClick={mockOnCharacterClick} />);

    const characterCards = screen.getAllByTestId('character-card');
    characterCards[0].click();

    expect(mockOnCharacterClick).toHaveBeenCalledTimes(1);
    expect(mockOnCharacterClick).toHaveBeenCalledWith(characters[0].id);
  });

  it('should render an empty list without crashing if no characters are passed', () => {
    render(<CharacterList characters={[]} onCharacterClick={jest.fn()} />);

    const characterCards = screen.queryAllByTestId('character-card');
    expect(characterCards.length).toBe(0);
  });
});
