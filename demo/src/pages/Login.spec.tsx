import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { MOCK_URLS, MOCK_USER } from '../utils.spec';

vi.mock('@plysrh88/authflow', () => ({
  AuthFlow: class MockAuthFlow {
    getLoginUrl(provider: string) {
      return MOCK_URLS[provider.toUpperCase() as keyof typeof MOCK_URLS];
    }

    async handleCallback() {
      return {
        id: MOCK_USER.ID,
        name: MOCK_USER.NAME,
        email: MOCK_USER.EMAIL,
        avatar: MOCK_USER.AVATAR,
        provider: MOCK_USER.PROVIDER,
      };
    }
  },
}));

import Login from './Login';
import { renderWithRouter } from '../components.spec';

describe('Login Component', () => {
  it('should render login page correctly', () => {
    renderWithRouter(<Login />);

    expect(screen.getByText('AuthFlow SDK')).toBeInTheDocument();
    expect(screen.getByText('Multi-provider authentication demo')).toBeInTheDocument();
    expect(screen.getByText('Continue with GitHub')).toBeInTheDocument();
    expect(screen.getByText('Continue with Google')).toBeInTheDocument();
  });

  it('should handle provider login clicks', () => {
    renderWithRouter(<Login />);

    fireEvent.click(screen.getByText('Continue with GitHub'));

    expect(window.location.assign).toHaveBeenCalledWith(MOCK_URLS.GITHUB);

    fireEvent.click(screen.getByText('Continue with Google'));

    expect(window.location.assign).toHaveBeenCalledWith(MOCK_URLS.GOOGLE);
  });
});
