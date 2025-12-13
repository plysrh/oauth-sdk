import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitHubProvider } from '../src/modules/github';
import { MOCK_CONFIG, URLS, MOCK_RESPONSES, MOCK_TOKENS } from './utils.spec';

describe('GitHubProvider', () => {
  let provider: GitHubProvider;

  beforeEach(() => {
    provider = new GitHubProvider({
      clientId: MOCK_CONFIG.GITHUB.CLIENT_ID,
      clientSecret: MOCK_CONFIG.GITHUB.CLIENT_SECRET,
      redirectUri: MOCK_CONFIG.GITHUB.REDIRECT_URL,
    });
  });

  describe('getLoginUrl', () => {
    it('should generate correct login URL', () => {
      const url = provider.getLoginUrl();
      expect(url).toContain(URLS.GITHUB_AUTHORIZE);
      expect(url).toContain(`client_id=${MOCK_CONFIG.GITHUB.CLIENT_ID}`);
      expect(url).toContain('scope=user%3Aemail');
    });

    it('should include state parameter when provided', () => {
      const url = provider.getLoginUrl('test-state');
      expect(url).toContain('state=test-state');
    });
  });

  describe('exchangeCodeForToken', () => {
    it('should exchange code for access token', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.TOKEN),
      } as Response);

      const result = await provider.exchangeCodeForToken(MOCK_TOKENS.AUTH_CODE);

      expect(fetch).toHaveBeenCalledWith(
        URLS.GITHUB_TOKEN,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Accept': 'application/json',
          }),
        }),
      );

      expect(result).toEqual({
        accessToken: MOCK_RESPONSES.GITHUB.TOKEN.access_token,
        tokenType: MOCK_RESPONSES.GITHUB.TOKEN.token_type,
      });
    });
  });

  describe('getUserInfo', () => {
    it('should fetch user information', async () => {
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.USER),
        } as Response)
        .mockResolvedValueOnce({
          json: () => Promise.resolve(MOCK_RESPONSES.GITHUB.EMAIL),
        } as Response);

      const result = await provider.getUserInfo(MOCK_TOKENS.ACCESS_TOKEN);

      expect(result).toEqual({
        id: MOCK_RESPONSES.GITHUB.USER.id.toString(),
        email: MOCK_RESPONSES.GITHUB.EMAIL[0].email,
        name: MOCK_RESPONSES.GITHUB.USER.name,
        avatar: MOCK_RESPONSES.GITHUB.USER.avatar_url,
        provider: 'github',
      });
    });
  });
});
