export const GITHUB_URLS = {
  AUTHORIZE: 'https://github.com/login/oauth/authorize',
  TOKEN: 'https://github.com/login/oauth/access_token',
  USER: 'https://api.github.com/user',
  USER_EMAILS: 'https://api.github.com/user/emails',
} as const;
export const GOOGLE_URLS = {
  AUTHORIZE: 'https://accounts.google.com/o/oauth2/v2/auth',
  TOKEN: 'https://oauth2.googleapis.com/token',
  USER_INFO: 'https://www.googleapis.com/oauth2/v2/userinfo',
} as const;
export const DEFAULT_REDIRECT_URI = 'http://localhost:5173/oauth/callback';
export const SCOPES = {
  GITHUB: 'user:email',
  GOOGLE: 'openid email profile',
} as const;
export const TOKEN_TYPES = {
  BEARER: 'bearer',
  BEARER_CAPS: 'Bearer',
} as const;
export const GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
} as const;
export const RESPONSE_TYPES = {
  CODE: 'code',
} as const;
