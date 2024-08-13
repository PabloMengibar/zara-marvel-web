import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from './CharacterCard';

jest.mock('../FavoriteButton/FavoriteButton', () => 'mock-favorite-button');

describe('CharacterCard', () => {
  const character = {
    name: 'Deadpool',
    thumbnail: {
      path: 'https://example.com/deadpool',
      extension: 'jpg'
    }
  };
  
  const onClickMock = jest.fn();

  beforeEach(() => {
    onClickMock.mockClear();
  });

  it('should render character name', () => {
    render(<CharacterCard character={character} onClick={onClickMock} />);
    
    const characterName = screen.getByText(/Deadpool/i);
    expect(characterName).toBeInTheDocument();
  });

  it('should render character image with correct src and alt attributes', () => {
    render(<CharacterCard character={character} onClick={onClickMock} />);
    
    const characterImage = screen.getByAltText(/Deadpool/i);
    expect(characterImage).toHaveAttribute('src', 'https://example.com/deadpool.jpg');
    expect(characterImage).toHaveAttribute('alt', 'Deadpool');
  });

  it('should call onClick when the card is clicked', () => {
    render(<CharacterCard character={character} onClick={onClickMock} />);
    
    const characterCard = screen.getByRole('img', { name: /Deadpool/i }).parentElement; 
    fireEvent.click(characterCard);
    
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
