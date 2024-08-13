import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../../context/FavoritesContext';

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('../FavoriteIcon/FavoriteIcon', () => {
  return function MockFavoriteIcon({ isFavorite, className }) {
    return (
      <svg data-testid="favorite-icon" className={className}>
        {isFavorite ? 'Favorito' : 'No Favorito'}
      </svg>
    );
  };
});

describe('FavoriteButton', () => {
  const mockCharacter = { id: 1, name: 'Rick Sanchez' };
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders correctly when the character is not a favorite', () => {
    useFavorites.mockReturnValue({
      favorites: [],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(<FavoriteButton character={mockCharacter} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('favorite-button');

    const icon = screen.getByTestId('favorite-icon');
    expect(icon).toHaveTextContent('No Favorito');
  });

  it('should renders correctly when the character is a favorite', () => {
    useFavorites.mockReturnValue({
      favorites: [mockCharacter],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(<FavoriteButton character={mockCharacter} />);

    const icon = screen.getByTestId('favorite-icon');
    expect(icon).toHaveTextContent('Favorito');
  });

  it('should calls addFavorite when clicked and the character is not favorite', () => {
    useFavorites.mockReturnValue({
      favorites: [],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(<FavoriteButton character={mockCharacter} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockCharacter);
    expect(mockRemoveFavorite).not.toHaveBeenCalled();
  });

  it('should calls removeFavorite when clicked and the character is favorite', () => {
    useFavorites.mockReturnValue({
      favorites: [mockCharacter],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(<FavoriteButton character={mockCharacter} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockCharacter.id);
    expect(mockAddFavorite).not.toHaveBeenCalled();
  });

  it('should applies the additional class when providing', () => {
    useFavorites.mockReturnValue({
      favorites: [],
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
    });

    render(<FavoriteButton character={mockCharacter} className="test-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('favorite-button');
    expect(button).toHaveClass('test-class');

    const icon = screen.getByTestId('favorite-icon');
    expect(icon).toHaveClass('test-class');
  });
});