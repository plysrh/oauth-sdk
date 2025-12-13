import type { Page } from '@playwright/test';

const GITHUB_OAUTH_URLS = {
  AUTHORIZE: 'https://github.com/login/oauth/authorize*',
  TOKEN: 'https://github.com/login/oauth/access_token',
  USER: 'https://api.github.com/user',
  USER_EMAILS: 'https://api.github.com/user/emails',
} as const;
const GOOGLE_OAUTH_URLS = {
  AUTHORIZE: 'https://accounts.google.com/o/oauth2/v2/auth*',
  TOKEN: 'https://oauth2.googleapis.com/token',
  USER_INFO: 'https://www.googleapis.com/oauth2/v2/userinfo',
} as const;
const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
} as const;
const MOCK_DELAYS = {
  SLOW_RESPONSE: 1000,
} as const;

export const setupGitHubOAuthRoute = async (page: Page) => {
  await page.route(GITHUB_OAUTH_URLS.AUTHORIZE, route => {
    route.fulfill({
      status: HTTP_STATUS.OK,
      body: 'Mocked GitHub OAuth page',
    });
  });
};
export const setupGoogleOAuthRoute = async (page: Page) => {
  await page.route(GOOGLE_OAUTH_URLS.AUTHORIZE, route => {
    route.fulfill({
      status: HTTP_STATUS.OK,
      body: 'Mocked Google OAuth page',
    });
  });
};
export const setupOAuthMocks = async (page: Page) => {
  // GitHub OAuth mocks
  await page.route(GITHUB_OAUTH_URLS.TOKEN, route => {
    route.fulfill({
      status: HTTP_STATUS.OK,
      contentType: 'application/json',
      body: JSON.stringify({ access_token: 'mock_github_token', token_type: 'bearer' }),
    });
  });
  await page.route(GITHUB_OAUTH_URLS.USER, route => {
    route.fulfill({
      status: HTTP_STATUS.OK,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 123456,
        login: 'testuser',
        name: 'Test User',
        avatar_url: 'https://avatars.githubusercontent.com/u/123456',
      }),
    });
  });
  await page.route(GITHUB_OAUTH_URLS.USER_EMAILS, route => {
    route.fulfill({
      status: HTTP_STATUS.OK,
      contentType: 'application/json',
      body: JSON.stringify([
        { email: 'test@example.com', primary: true, verified: true },
      ]),
    });
  });

  // Google OAuth mocks
  await page.route(GOOGLE_OAUTH_URLS.TOKEN, route => {
    route.fulfill({
      status: HTTP_STATUS.OK,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'mock_google_token',
        token_type: 'Bearer',
        expires_in: 3600
      }),
    });
  });
  await page.route(GOOGLE_OAUTH_URLS.USER_INFO, route => {
    route.fulfill({
      status: HTTP_STATUS.OK,
      contentType: 'application/json',
      body: JSON.stringify({
        id: '123456789',
        email: 'test@gmail.com',
        name: 'Google User',
        picture: 'https://lh3.googleusercontent.com/a/default-user',
      }),
    });
  });
};

export const setupOAuthErrorMocks = async (page: Page) => {
  await page.route(GITHUB_OAUTH_URLS.TOKEN, route => {
    route.fulfill({
      status: HTTP_STATUS.BAD_REQUEST,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'invalid_request' }),
    });
  });
};
export const setupSlowOAuthMocks = async (page: Page) => {
  await page.route(GITHUB_OAUTH_URLS.TOKEN, route => {
    setTimeout(() => {
      route.fulfill({
        status: HTTP_STATUS.OK,
        contentType: 'application/json',
        body: JSON.stringify({ access_token: 'mock_token' }),
      });
    }, MOCK_DELAYS.SLOW_RESPONSE);
  });
};
