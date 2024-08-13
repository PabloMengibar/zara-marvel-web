import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from './SearchBar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('SEARCH CHARACTERS...')).toBeInTheDocument();
  });

  it('displays "Favorites" title when showFavorites is true', () => {
    render(
      <MemoryRouter>
        <SearchBar showFavorites={true} />
      </MemoryRouter>
    );
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('does not display "Favorites" title when showFavorites is false', () => {
    render(
      <MemoryRouter>
        <SearchBar showFavorites={false} />
      </MemoryRouter>
    );
    expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
  });

  it('updates query state on input change', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('SEARCH CHARACTERS...');
    fireEvent.change(input, { target: { value: 'Spider' } });
    expect(input.value).toBe('Spider');
  });

  it('navigates to search results on form submit', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('SEARCH CHARACTERS...');
    fireEvent.change(input, { target: { value: 'Spider' } });
    fireEvent.submit(input);
    expect(mockNavigate).toHaveBeenCalledWith('/?search=Spider');
  });

  it('trims whitespace from query before navigating', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('SEARCH CHARACTERS...');
    fireEvent.change(input, { target: { value: '  Spider  ' } });
    fireEvent.submit(input);
    expect(mockNavigate).toHaveBeenCalledWith('/?search=Spider');
  });

  it('does not navigate on submit if query is empty', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('SEARCH CHARACTERS...');
    fireEvent.submit(input);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

});