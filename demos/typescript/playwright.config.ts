import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: ['./.env', './.env.test', './.env.local'] });

const ENV_VARS = {
  CI: process.env.CI === 'true',
  USE_MOCK_BACKEND: process.env.USE_MOCK_BACKEND === 'true',
} as const;
const URLS = {
  FRONTEND: 'http://localhost:5173',
  BACKEND: 'http://localhost:3000/api/oauth',
  MOCK_BACKEND: 'http://localhost:3000/api/oauth',
} as const;
const COMMANDS = {
  DEV: 'npm run vercel:dev',
  MOCK_BACKEND: 'npm run test:e2e:mock',
} as const;

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !ENV_VARS.CI,
  retries: 0,
  workers: ENV_VARS.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: URLS.FRONTEND,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },

    },
  ],
  webServer: [
    {
      command: COMMANDS.DEV,
      url: URLS.FRONTEND,
      reuseExistingServer: !ENV_VARS.CI,
    },
    {
      command: ENV_VARS.USE_MOCK_BACKEND ? COMMANDS.MOCK_BACKEND : COMMANDS.DEV,
      url: ENV_VARS.USE_MOCK_BACKEND ? URLS.MOCK_BACKEND : URLS.BACKEND,
      reuseExistingServer: !ENV_VARS.CI,
    },
  ],
});
