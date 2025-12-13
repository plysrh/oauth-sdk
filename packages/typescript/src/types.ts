export interface AuthConfig {
  github?: GitHubConfig;
  google?: GoogleConfig;
}

export interface GitHubConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
}

export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType: string;
}

export type Provider = 'github' | 'google';

export interface AuthProvider {
  getLoginUrl(state?: string): string;
  exchangeCodeForToken(code: string): Promise<TokenResponse>;
  getUserInfo(accessToken: string): Promise<User>;
}
