import dotenv from 'dotenv';

dotenv.config({ path: ['./.env', './.env.test', './.env.local'] });

const USE_MOCK_BACKEND = process.env.USE_MOCK_BACKEND === 'true';

export const ENV_VARS = {
  GITHUB_CLIENT_ID: USE_MOCK_BACKEND ? undefined : process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: USE_MOCK_BACKEND ? undefined : process.env.GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI: USE_MOCK_BACKEND ? undefined : process.env.GITTHUB_REDIRECT_URI,
  GOOGLE_CLIENT_ID: USE_MOCK_BACKEND ? undefined : process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: USE_MOCK_BACKEND ? undefined : process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: USE_MOCK_BACKEND ? undefined : process.env.GOOGLE_REDIRECT_URI,
  USE_MOCK_BACKEND,
} as const;
export const MOCK_USER = {
  ID: '123',
  NAME: 'Test User',
  EMAIL: 'test@example.com',
  AVATAR: 'https://avatar.url',
  PROVIDER: 'github',
} as const;
