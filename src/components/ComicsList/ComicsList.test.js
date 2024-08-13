import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComicsList } from './ComicsList';

describe('ComicsList', () => {
  const comics = [
    {
      id: 1,
      title: 'Comic 1',
      thumbnail: { path: 'path/to/image1', extension: 'jpg' },
      dates: [{ type: 'onsaleDate', date: '2020-01-01T00:00:00Z' }],
    },
    {
      id: 2,
      title: 'Comic 2',
      thumbnail: { path: 'path/to/image2', extension: 'jpg' },
      dates: [{ type: 'onsaleDate', date: '2021-01-01T00:00:00Z' }],
    },
  ];

  it('should display loading text when loading', () => {
    render(<ComicsList comics={[]} isLoading={true} />);
    expect(screen.getByText(/loading comics.../i)).toBeInTheDocument();
  });

  it('should display a message when there are no comics', () => {
    render(<ComicsList comics={[]} isLoading={false} />);
    expect(screen.getByText(/no comics found for this character./i)).toBeInTheDocument();
  });

  it('should render the correct number of comics', () => {
    render(<ComicsList comics={comics} isLoading={false} />);
    const comicItems = screen.getAllByRole('img', { name: /comic/i });
    expect(comicItems.length).toBe(comics.length);
  });

  it('should display the correct title and year for each comic', () => {
    render(<ComicsList comics={comics} isLoading={false} />);

    comics.forEach((comic) => {
      expect(screen.getByText(comic.title)).toBeInTheDocument();
      expect(screen.getByText(new Date(comic.dates[0].date).getFullYear().toString())).toBeInTheDocument();
    });
  });

  it('should display "Unknown" if the onsale date is not available', () => {
    const comicsWithUnknownDate = [
      {
        id: 1,
        title: 'Comic 1',
        thumbnail: { path: 'path/to/image1', extension: 'jpg' },
        dates: [],
      },
    ];
    render(<ComicsList comics={comicsWithUnknownDate} isLoading={false} />);
    expect(screen.getByText(/unknown/i)).toBeInTheDocument();
  });
});
