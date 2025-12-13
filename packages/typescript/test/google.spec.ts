import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoogleProvider } from '../src/modules/google';
import { MOCK_CONFIG, URLS, MOCK_RESPONSES, MOCK_TOKENS } from './utils.spec';

describe('GoogleProvider', () => {
  let provider: GoogleProvider;

  beforeEach(() => {
    provider = new GoogleProvider({
      clientId: MOCK_CONFIG.GOOGLE.CLIENT_ID,
      clientSecret: MOCK_CONFIG.GOOGLE.CLIENT_SECRET,
      redirectUri: MOCK_CONFIG.GOOGLE.REDIRECT_URI,
    });
  });

  describe('getLoginUrl', () => {
    it('should generate correct login URL', () => {
      const url = provider.getLoginUrl();

      expect(url).toContain(URLS.GOOGLE_AUTHORIZE);
      expect(url).toContain(`client_id=${MOCK_CONFIG.GOOGLE.CLIENT_ID}`);
      expect(url).toContain('scope=openid+email+profile');
      expect(url).toContain('response_type=code');
    });

    it('should include state parameter when provided', () => {
      const url = provider.getLoginUrl('test-state');

      expect(url).toContain('state=test-state');
    });
  });

  describe('exchangeCodeForToken', () => {
    it('should exchange code for access token', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(MOCK_RESPONSES.GOOGLE.TOKEN),
      } as Response);

      const result = await provider.exchangeCodeForToken(MOCK_TOKENS.AUTH_CODE);

      expect(fetch).toHaveBeenCalledWith(
        URLS.GOOGLE_TOKEN,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }),
      );

      expect(result).toEqual({
        accessToken: MOCK_RESPONSES.GOOGLE.TOKEN.access_token,
        refreshToken: MOCK_RESPONSES.GOOGLE.TOKEN.refresh_token,
        expiresIn: MOCK_RESPONSES.GOOGLE.TOKEN.expires_in,
        tokenType: MOCK_RESPONSES.GOOGLE.TOKEN.token_type,
      });
    });
  });

  describe('getUserInfo', () => {
    it('should fetch user information', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(MOCK_RESPONSES.GOOGLE.USER),
      } as Response);

      const result = await provider.getUserInfo(MOCK_TOKENS.ACCESS_TOKEN);

      expect(fetch).toHaveBeenCalledWith(
        URLS.GOOGLE_USER_INFO,
        expect.objectContaining({
          headers: { Authorization: `Bearer ${MOCK_TOKENS.ACCESS_TOKEN}` },
        }),
      );

      expect(result).toEqual({
        id: MOCK_RESPONSES.GOOGLE.USER.id,
        email: MOCK_RESPONSES.GOOGLE.USER.email,
        name: MOCK_RESPONSES.GOOGLE.USER.name,
        avatar: MOCK_RESPONSES.GOOGLE.USER.picture,
        provider: 'google',
      });
    });
  });
});
