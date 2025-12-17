export const OAUTH_URLS = {
  GITHUB_AUTHORIZE: 'https://github.com/login/oauth/authorize',
  GITHUB_TOKEN: 'https://github.com/login/oauth/access_token',
  GITHUB_USER: 'https://api.github.com/user',
  GITHUB_USER_EMAILS: 'https://api.github.com/user/emails',
  GOOGLE_AUTHORIZE: 'https://accounts.google.com/o/oauth2/v2/auth',
  GOOGLE_TOKEN: 'https://oauth2.googleapis.com/token',
  GOOGLE_USER_INFO: 'https://www.googleapis.com/oauth2/v2/userinfo',
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
