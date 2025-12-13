import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { MOCK_USER } from '../utils.spec';

vi.mock('@plysrh88/authflow', () => ({
  AuthFlow: class MockAuthFlow {
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

import Callback from './Callback';
import { MOCK_ROUTES } from '../utils.spec';
import { renderWithRouter } from '../components.spec';

describe('Callback Component', () => {
  it('should show loading state initially', async () => {
    renderWithRouter(<Callback />, [MOCK_ROUTES.CALLBACK_WITH_PARAMS]);

    await waitFor(() => {
      expect(screen.getByText('Authenticating...')).toBeInTheDocument();
    });
  });

  it('should render callback component', async () => {
    renderWithRouter(<Callback />, [MOCK_ROUTES.CALLBACK_WITH_PARAMS]);

    await waitFor(() => {
      expect(screen.getByText('Authenticating...')).toBeInTheDocument();
    });
  });
});