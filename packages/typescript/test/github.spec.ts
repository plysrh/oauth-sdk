import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitHubProvider } from '../src/modules/github';

// Mock fetch
global.fetch = vi.fn();

describe('GitHubProvider', () => {
  let provider: GitHubProvider;

  beforeEach(() => {
    provider = new GitHubProvider({
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
    });
    vi.clearAllMocks();
  });

  describe('getLoginUrl', () => {
    it('should generate correct login URL', () => {
      const url = provider.getLoginUrl();
      expect(url).toContain('https://github.com/login/oauth/authorize');
      expect(url).toContain('client_id=test-client-id');
      expect(url).toContain('scope=user%3Aemail');
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
        token_type: 'bearer',
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await provider.exchangeCodeForToken('test-code');

      expect(fetch).toHaveBeenCalledWith(
        'https://github.com/login/oauth/access_token',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Accept': 'application/json',
          }),
        }),
      );

      expect(result).toEqual({
        accessToken: 'test-token',
        tokenType: 'bearer',
      });
    });
  });

  describe('getUserInfo', () => {
    it('should fetch user information', async () => {
      const mockUserData = {
        id: 123,
        login: 'testuser',
        name: 'Test User',
        email: 'test@example.com',
        avatar_url: 'https://avatar.url',
      };

      const mockEmailData = [
        { email: 'test@example.com', primary: true },
      ];

      vi.mocked(fetch)
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockUserData),
        } as Response)
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockEmailData),
        } as Response);

      const result = await provider.getUserInfo('test-token');

      expect(result).toEqual({
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        avatar: 'https://avatar.url',
        provider: 'github',
      });
    });
  });
});