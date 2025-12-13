import { ROUTES } from './constants';

export const MOCK_URLS = {
  GITHUB: 'https://mock-github-url.com',
  GOOGLE: 'https://mock-google-url.com',
} as const;
export const TEST_ROUTES = {
  CALLBACK_WITH_PARAMS: '/?code=test-code&state=github',
} as const;
export const MOCK_USER = {
  ID: '123',
  NAME: 'Test User',
  EMAIL: 'test@example.com',
  AVATAR: 'https://avatar.url',
  PROVIDER: 'github',
} as const;

export class MockAuthFlow {
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
}

export { ROUTES };
