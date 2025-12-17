import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Callback from '../Callback';

function renderWithRouter(component: ReactElement, initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
}

describe('Callback Component', () => {
  it('should render callback page correctly', async () => {
    renderWithRouter(<Callback />, [ROUTES.CALLBACK]);

    expect(screen.getByText('Authenticating...')).toBeInTheDocument();
  });

  it('should handle oauth callback login', async () => {
    renderWithRouter(<Callback />, [`${ROUTES.CALLBACK}?code=test-code&state=github`]);

    waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/oauth',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'github', code: 'test-code' })
        }
      );
    });
  });
});
