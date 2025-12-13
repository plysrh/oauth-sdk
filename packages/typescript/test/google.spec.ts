import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoogleProvider } from '../src/modules/google';

// Mock fetch
global.fetch = vi.fn();

describe('GoogleProvider', () => {
  let provider: GoogleProvider;

  beforeEach(() => {
    provider = new GoogleProvider({
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
    });
    vi.clearAllMocks();
  });

  describe('getLoginUrl', () => {
    it('should generate correct login URL', () => {
      const url = provider.getLoginUrl();
      expect(url).toContain('https://accounts.google.com/o/oauth2/v2/auth');
      expect(url).toContain('client_id=test-client-id');
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
      const mockResponse = {
        access_token: 'test-token',
        refresh_token: 'refresh-token',
        expires_in: 3600,
        token_type: 'Bearer',
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await provider.exchangeCodeForToken('test-code');

      expect(fetch).toHaveBeenCalledWith(
        'https://oauth2.googleapis.com/token',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }),
      );

      expect(result).toEqual({
        accessToken: 'test-token',
        refreshToken: 'refresh-token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      });
    });
  });

  describe('getUserInfo', () => {
    it('should fetch user information', async () => {
      const mockUserData = {
        id: '123456789',
        email: 'test@gmail.com',
        name: 'Test User',
        picture: 'https://avatar.url',
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockUserData),
      } as Response);

      const result = await provider.getUserInfo('test-token');

      expect(fetch).toHaveBeenCalledWith(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        expect.objectContaining({
          headers: { Authorization: 'Bearer test-token' },
        }),
      );

      expect(result).toEqual({
        id: '123456789',
        email: 'test@gmail.com',
        name: 'Test User',
        avatar: 'https://avatar.url',
        provider: 'google',
      });
    });
  });
});