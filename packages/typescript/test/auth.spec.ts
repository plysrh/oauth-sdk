import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Auth } from '../src/auth';
import { OAUTH_URLS } from '../src/constants';
import { MOCK_CONFIG, MOCK_RESPONSES, MOCK_TOKENS } from './constants';

describe('Auth', () => {
  let auth: Auth;

  beforeEach(() => {
    auth = new Auth({
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
      const url = auth.getLoginUrl('github');

      expect(url).toContain(OAUTH_URLS.GITHUB_AUTHORIZE);
      expect(url).toContain(MOCK_CONFIG.GITHUB.CLIENT_ID);
    });

    it('should generate Google login URL', () => {
      const url = auth.getLoginUrl('google');

      expect(url).toContain(OAUTH_URLS.GOOGLE_AUTHORIZE);
      expect(url).toContain(MOCK_CONFIG.GOOGLE.CLIENT_ID);
    });

    it('should throw error for unconfigured provider', () => {
      const authEmpty = new Auth({});

      expect(() => authEmpty.getLoginUrl('github')).toThrow('Provider github not configured');
    });
  });

  describe('handleCallback', () => {
    it('should handle GitHub callback', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.TOKEN) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.USER) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.EMAIL) } as Response);

      const user = await auth.handleCallback('github', MOCK_TOKENS.AUTH_CODE);

      expect(user.provider).toBe('github');
      expect(user.email).toBe(MOCK_RESPONSES.GITHUB.EMAIL[0].email);
    });
  });

  describe('validateToken', () => {
    it('should validate GitHub token', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.USER) } as Response)
        .mockResolvedValueOnce({ json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.EMAIL) } as Response);

      const user = await auth.validateToken('github', MOCK_TOKENS.ACCESS_TOKEN);

      expect(user.provider).toBe('github');
      expect(user.email).toBe(MOCK_RESPONSES.GITHUB.EMAIL[0].email);
    });
  });
});
