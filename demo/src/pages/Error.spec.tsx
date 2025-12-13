import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error Component', () => {
  it('should render error message', () => {
    render(<Error />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    render(<Error />);

    const heading = screen.getByText('Error');

    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-red-600', 'mb-4');
  });
});
