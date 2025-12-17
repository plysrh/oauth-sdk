import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

describe('NotFound Component', () => {
  it('should render 404 message', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    render(<NotFound />);

    const heading = screen.getByText('404');

    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-gray-600', 'mb-4');
  });
});
