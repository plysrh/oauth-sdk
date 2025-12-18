import type { GitHubConfig, User, TokenResponse, AuthProvider } from '../types.js';
import { OAUTH_URLS, DEFAULT_REDIRECT_URI, SCOPES, TOKEN_TYPES } from '../constants.js';

/**
 * GitHub OAuth provider implementation.
 * 
 * Handles GitHub OAuth 2.0 authentication flow including:
 * - Authorization URL generation
 * - Authorization code to access token exchange
 * - User information retrieval from GitHub API
 */
export class GitHubProvider implements AuthProvider {
  private config: GitHubConfig;

  /**
   * Initialize GitHub OAuth provider.
   * @param config - GitHub OAuth configuration with client credentials
   */
  constructor(config: GitHubConfig) {
    this.config = config;
  }

  /**
   * Generate GitHub OAuth authorization URL.
   * @param state - Optional state parameter for CSRF protection
   * @returns GitHub authorization URL with required parameters
   */
  getLoginUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri || DEFAULT_REDIRECT_URI,
      scope: SCOPES.GITHUB,
      ...(state && { state }),
    });

    return `${OAUTH_URLS.GITHUB_AUTHORIZE}?${params}`;
  }

  /**
   * Exchange GitHub authorization code for access token.
   * @param code - Authorization code from GitHub OAuth callback
   * @returns Promise resolving to token response with access token
   * @throws Error if token exchange fails
   */
  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const response = await fetch(OAUTH_URLS.GITHUB_TOKEN, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
      }),
    });
    const data = await response.json();

    return {
      accessToken: data.access_token,
      tokenType: data.token_type || TOKEN_TYPES.BEARER,
    };
  }

  /**
   * Fetch GitHub user information using access token.
   * 
   * Makes parallel requests to GitHub API to get user profile and email information.
   * Prioritizes primary email address from the emails endpoint.
   * @param accessToken - Valid GitHub access token
   * @returns Promise resolving to user information
   * @throws Error if API requests fail
   */
  async getUserInfo(accessToken: string): Promise<User> {
    const [userResponse, emailResponse] = await Promise.all([
      fetch(OAUTH_URLS.GITHUB_USER, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      fetch(OAUTH_URLS.GITHUB_USER_EMAILS, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);
    const userData = await userResponse.json();
    const emailData = await emailResponse.json();
    const primaryEmail = emailData.find((email: { email: string; primary: boolean }) => email.primary)?.email;

    return {
      id: userData.id.toString(),
      email: primaryEmail || userData.email,
      name: userData.name || userData.login,
      avatar: userData.avatar_url,
      provider: 'github',
    };
  }
}
