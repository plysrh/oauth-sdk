export const ROUTES = {
  LOGIN: '/',
  HOME: '/home',
  ERROR: '/error',
  CALLBACK: '/oauth/callback',
} as const;
export const AUTH_CONFIG = {
  GITHUB: {
    CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID || 'demo-client-id',
    CLIENT_SECRET: import.meta.env.VITE_GITHUB_CLIENT_SECRET || 'demo-secret',
    REDIRECT_URI: import.meta.env.VITE_GITHUB_REDIRECT_URI || 'http://localhost:5173/oauth/callback',
  },
  GOOGLE: {
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo-client-id',
    CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || 'demo-secret',
    REDIRECT_URI: import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5173/oauth/callback',
  },
} as const;
