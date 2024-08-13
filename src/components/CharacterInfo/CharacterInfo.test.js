import React from 'react';
import { render, screen } from '@testing-library/react';
import { CharacterInfo } from './CharacterInfo';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

jest.mock('../FavoriteButton/FavoriteButton', () => 'mock-favorite-button');

describe('CharacterInfo', () => {
  const character = {
    name: 'Deadpool',
    thumbnail: {
      path: 'https://example.com/deadpool',
      extension: 'jpg'
    },
    description: `Marvel's best character`
  };

  it('should render character name', () => {
    render(<CharacterInfo character={character} />);

    const characterName = screen.getByText(/Deadpool/i);
    expect(characterName).toBeInTheDocument();
  });

  it('should render character image with correct src and alt attributes', () => {
    render(<CharacterInfo character={character} />);

    const characterImage = screen.getByAltText(/Deadpool/i);
    expect(characterImage).toHaveAttribute('src', 'https://example.com/deadpool.jpg');
    expect(characterImage).toHaveAttribute('alt', 'Deadpool');
  });

  it('should render character description if available', () => {
    render(<CharacterInfo character={character} />);

    const characterDescription = screen.getByText(/Marvel's best character/i);
    expect(characterDescription).toBeInTheDocument();
  });

  it('should render a default message if description is not available', () => {
    const characterWithoutDescription = {
      ...character,
      description: ''
    };

    render(<CharacterInfo character={characterWithoutDescription} />);

    const defaultMessage = screen.getByText(/No description available/i);
    expect(defaultMessage).toBeInTheDocument();
  });

});
