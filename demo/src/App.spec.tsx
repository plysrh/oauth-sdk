import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';

vi.mock('@plysrh88/authflow', () => ({
  AuthFlow: class MockAuthFlow {
    getLoginUrl() { return 'mock-url'; }
    async handleCallback() { return {}; }
  },
}));

import { ROUTES } from './constants.spec';
import { renderWithFullRouter } from './components.spec';

describe('App Routing', () => {
  it('should render correct pages for each route', () => {
    renderWithFullRouter();

    expect(screen.getByText('AuthFlow SDK')).toBeInTheDocument();

    renderWithFullRouter([ROUTES.HOME]);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();

    renderWithFullRouter([ROUTES.ERROR]);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    renderWithFullRouter(['/unknown']);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
