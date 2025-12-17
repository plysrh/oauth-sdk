export const MOCK_CONFIG = {
  GITHUB: {
    CLIENT_ID: 'github-client-id',
    CLIENT_SECRET: 'github-client-secret',
    REDIRECT_URL: 'github-redirect-url',
  },
  GOOGLE: {
    CLIENT_ID: 'google-client-id',
    CLIENT_SECRET: 'google-client-secret',
    REDIRECT_URI: 'google-redirect-url',
  },
} as const;
export const MOCK_RESPONSES = {
  GITHUB: {
    TOKEN: { access_token: 'token', token_type: 'bearer' },
    USER: { id: 123, login: 'user', name: 'User', avatar_url: 'avatar' },
    EMAIL: [{ email: 'user@example.com', primary: true }],
  },
  GOOGLE: {
    TOKEN: { access_token: 'token', token_type: 'Bearer', refresh_token: 'refresh', expires_in: 3600 },
    USER: { id: 123, email: 'user@example.com', name: 'User', picture: 'avatar' },
  },
} as const;
export const MOCK_TOKENS = {
  ACCESS_TOKEN: 'test-token',
  AUTH_CODE: 'test-code',
} as const;
