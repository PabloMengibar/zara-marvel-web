import React from 'react';
import { render } from '@testing-library/react';
import FavoriteIcon from './FavoriteIcon';

describe('FavoriteIcon', () => {
  it('should render with the correct class when isFavorite is true', () => {
    const { container } = render(<FavoriteIcon isFavorite={true} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('favorite-icon active');
  });

  it('should render with the correct class when isFavorite is false', () => {
    const { container } = render(<FavoriteIcon isFavorite={false} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('favorite-icon');
    expect(svg).not.toHaveClass('active');
  });

  it('should apply additional classes from the className prop', () => {
    const { container } = render(<FavoriteIcon isFavorite={false} className="additional-class" />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('favorite-icon');
    expect(svg).toHaveClass('additional-class');
  });
});
