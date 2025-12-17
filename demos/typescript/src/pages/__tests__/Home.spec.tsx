import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home Component', () => {
  it('should render Hello, World! message', () => {
    render(<Home />);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    render(<Home />);

    const heading = screen.getByText('Hello, World!');

    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-green-600', 'mb-4');
  });
});
