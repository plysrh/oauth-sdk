import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthFlow } from '../src/authflow';
import { MOCK_CONFIG, URLS, MOCK_RESPONSES, MOCK_TOKENS } from './utils.spec';

describe('AuthFlow', () => {
  let authFlow: AuthFlow;

  beforeEach(() => {
    authFlow = new AuthFlow({
      github: {
        clientId: MOCK_CONFIG.GITHUB.CLIENT_ID,
        clientSecret: MOCK_CONFIG.GITHUB.CLIENT_SECRET,
      },
      google: {
        clientId: MOCK_CONFIG.GOOGLE.CLIENT_ID,
        clientSecret: MOCK_CONFIG.GOOGLE.CLIENT_SECRET,
      },
    });
  });

  describe('getLoginUrl', () => {
    it('should generate GitHub login URL', () => {
      const url = authFlow.getLoginUrl('github');

      expect(url).toContain(URLS.GITHUB_AUTHORIZE);
      expect(url).toContain(MOCK_CONFIG.GITHUB.CLIENT_ID);
    });

    it('should generate Google login URL', () => {
      const url = authFlow.getLoginUrl('google');

      expect(url).toContain(URLS.GOOGLE_AUTHORIZE);
      expect(url).toContain(MOCK_CONFIG.GOOGLE.CLIENT_ID);
    });

    it('should throw error for unconfigured provider', () => {
      const authFlowEmpty = new AuthFlow({});

      expect(() => authFlowEmpty.getLoginUrl('github')).toThrow('Provider github not configured');
    });
  });

  describe('handleCallback', () => {
    it('should handle GitHub callback', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.TOKEN) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.USER) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.EMAIL) } as Response);

      const user = await authFlow.handleCallback('github', MOCK_TOKENS.AUTH_CODE);

      expect(user.provider).toBe('github');
      expect(user.email).toBe(MOCK_RESPONSES.GITHUB.EMAIL[0].email);
    });
  });

  describe('validateToken', () => {
    it('should validate GitHub token', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.USER) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.EMAIL) } as Response);

      const user = await authFlow.validateToken('github', MOCK_TOKENS.ACCESS_TOKEN);

      expect(user.provider).toBe('github');
      expect(user.email).toBe(MOCK_RESPONSES.GITHUB.EMAIL[0].email);
    });
  });
});
