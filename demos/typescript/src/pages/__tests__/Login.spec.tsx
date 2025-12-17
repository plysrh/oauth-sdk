import { describe, it, expect } from 'vitest';
import { screen, fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Login from '../Login';

function renderWithRouter(component: ReactElement, initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
}

describe('Login Component', () => {
  it('should render login page correctly', () => {
    renderWithRouter(<Login />, [ROUTES.LOGIN]);

    expect(screen.getByText('OAuth SDK')).toBeInTheDocument();
    expect(screen.getByText('Multi-provider authentication demo')).toBeInTheDocument();
    expect(screen.getByText('Continue with GitHub')).toBeInTheDocument();
    expect(screen.getByText('Continue with Google')).toBeInTheDocument();
  });

  it('should handle oauth login', async () => {
    renderWithRouter(<Login />, [ROUTES.LOGIN]);

    fireEvent.click(screen.getByText('Continue with GitHub'));

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/oauth',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'github' })
      }
    );
  });
});
