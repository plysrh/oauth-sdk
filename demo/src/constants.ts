export const ROUTES = {
  LOGIN: '/',
  HOME: '/home',
  ERROR: '/error',
} as const;

export const AUTH_CONFIG = {
  GITHUB: {
    CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID || 'demo-client-id',
    CLIENT_SECRET: import.meta.env.VITE_GITHUB_CLIENT_SECRET || 'demo-secret',
  },
  GOOGLE: {
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo-client-id',
    CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || 'demo-secret',
  },
} as const;
