import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthFlow } from '../src/authflow';

// Mock fetch
global.fetch = vi.fn();

describe('AuthFlow', () => {
  let authFlow: AuthFlow;

  beforeEach(() => {
    authFlow = new AuthFlow({
      github: {
        clientId: 'github-client-id',
        clientSecret: 'github-client-secret',
      },
      google: {
        clientId: 'google-client-id',
        clientSecret: 'google-client-secret',
      },
    });
    vi.clearAllMocks();
  });

  describe('getLoginUrl', () => {
    it('should generate GitHub login URL', () => {
      const url = authFlow.getLoginUrl('github');
      expect(url).toContain('github.com/login/oauth/authorize');
      expect(url).toContain('github-client-id');
    });

    it('should generate Google login URL', () => {
      const url = authFlow.getLoginUrl('google');
      expect(url).toContain('accounts.google.com/o/oauth2/v2/auth');
      expect(url).toContain('google-client-id');
    });

    it('should throw error for unconfigured provider', () => {
      const authFlowEmpty = new AuthFlow({});
      expect(() => authFlowEmpty.getLoginUrl('github')).toThrow('Provider github not configured');
    });
  });

  describe('handleCallback', () => {
    it('should handle GitHub callback', async () => {
      const mockTokenResponse = { access_token: 'token', token_type: 'bearer' };
      const mockUserData = { id: 123, login: 'user', name: 'User', avatar_url: 'avatar' };
      const mockEmailData = [{ email: 'user@example.com', primary: true }];

      vi.mocked(fetch)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockTokenResponse) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockUserData) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockEmailData) } as Response);

      const user = await authFlow.handleCallback('github', 'test-code');

      expect(user.provider).toBe('github');
      expect(user.email).toBe('user@example.com');
    });
  });

  describe('validateToken', () => {
    it('should validate GitHub token', async () => {
      const mockUserData = { id: 123, login: 'user', name: 'User', avatar_url: 'avatar' };
      const mockEmailData = [{ email: 'user@example.com', primary: true }];

      vi.mocked(fetch)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockUserData) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockEmailData) } as Response);

      const user = await authFlow.validateToken('github', 'test-token');

      expect(user.provider).toBe('github');
      expect(user.email).toBe('user@example.com');
    });
  });
});