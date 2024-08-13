import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { useFavorites } from '../../context/FavoritesContext';
import { useLocation, useNavigate } from 'react-router-dom';

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../FavoriteIcon/FavoriteIcon', () => {
  return function MockFavoriteIcon({ className }) {
    return <div data-testid="favorite-icon" className={className} />;
  };
});

describe('Header', () => {
  const mockFavorites = [{ id: 1 }, { id: 2 }];
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useFavorites.mockReturnValue({ favorites: mockFavorites });
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ search: '' });
  });

  it('should renders the Marvel logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Marvel Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should displays the correct number of favorites', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const favoritesCount = screen.getByText('2');
    expect(favoritesCount).toBeInTheDocument();
  });

  it('should navigates to home page when logo is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Marvel Logo');
    fireEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should toggles to favorites view when button is clicked and not showing favorites', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const favoritesButton = screen.getByRole('button');
    fireEvent.click(favoritesButton);
    expect(mockNavigate).toHaveBeenCalledWith('/?favorites=true');
  });

  it('should toggles to main view when button is clicked and showing favorites', () => {
    useLocation.mockReturnValue({ search: '?favorites=true' });
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const favoritesButton = screen.getByRole('button');
    fireEvent.click(favoritesButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should renders the FavoriteIcon component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const favoriteIcon = screen.getByTestId('favorite-icon');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveClass('heart-icon');
  });
});