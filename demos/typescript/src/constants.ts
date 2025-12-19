export const ROUTES = {
  LOGIN: '/',
  HOME: '/home',
  ERROR: '/error',
  NOT_FOUND: '*',
  CALLBACK: '/oauth/callback',
} as const;
export const ENDPOINTS = {
  OAUTH: import.meta.env.VITE_OAUTH_ENDPOINT || '/api/oauth',
} as const;
