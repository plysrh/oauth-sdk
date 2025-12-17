import { vi, beforeAll, afterAll, afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { BACKEND_ENDPOINTS } from './src/constants';

expect.extend(matchers);

const originalLocation = window.location;

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...originalLocation,
      href: 'http://localhost',
      origin: 'http://localhost',
      search: '',
      assign: vi.fn(),
      replace: vi.fn(),
    },
    writable: true,
  });

  globalThis.fetch = vi.fn().mockImplementation(async (url: string, options: RequestInit = {}) => {
    const method = options.method || 'GET';

    if (url.includes(BACKEND_ENDPOINTS.OAUTH)) {
      if (method === 'POST') {
        const body = options.body ? JSON.parse(options.body as string) : {};

        if (!body.code) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              loginUrl: `oauth-provider-authorize-url?client_id=test&redirect_uri=oauth-client-callback-url`,
            }),
          };
        }

        return {
          ok: true,
          status: 200,
          json: async () => ({
            user: {
              id: 123,
              name: 'Test User',
              email: 'test@example.com',
              avatar: 'https://avatar.url',
              provider: 'github'
            }
          }),
        };
      }

      return { ok: false, status: 405, json: async () => ({ error: 'Method not allowed' }) };
    }

    return { ok: false, status: 404, json: async () => ({ error: 'Not found' }) };
  });
});

afterAll(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});
