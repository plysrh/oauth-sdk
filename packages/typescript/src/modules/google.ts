import { GoogleConfig, User, TokenResponse, AuthProvider } from '../types';
import { GOOGLE_URLS, DEFAULT_REDIRECT_URI, SCOPES, TOKEN_TYPES, GRANT_TYPES, RESPONSE_TYPES } from '../constants';

/**
 * Google OAuth provider implementation.
 * 
 * Handles Google OAuth 2.0 authentication flow including:
 * - Authorization URL generation with OpenID Connect scopes
 * - Authorization code to access token exchange
 * - User information retrieval from Google API
 */
export class GoogleProvider implements AuthProvider {
  private config: GoogleConfig;

  /**
   * Initialize Google OAuth provider.
   * @param config - Google OAuth configuration with client credentials
   */
  constructor(config: GoogleConfig) {
    this.config = config;
  }

  /**
   * Generate Google OAuth authorization URL.
   * @param state - Optional state parameter for CSRF protection
   * @returns Google authorization URL with OpenID Connect parameters
   */
  getLoginUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri || DEFAULT_REDIRECT_URI,
      response_type: RESPONSE_TYPES.CODE,
      scope: SCOPES.GOOGLE,
      ...(state && { state }),
    });

    return `${GOOGLE_URLS.AUTHORIZE}?${params}`;
  }

  /**
   * Exchange Google authorization code for access token.
   * @param code - Authorization code from Google OAuth callback
   * @returns Promise resolving to token response with access and refresh tokens
   * @throws Error if token exchange fails
   */
  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const response = await fetch(GOOGLE_URLS.TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
        redirect_uri: this.config.redirectUri || DEFAULT_REDIRECT_URI,
      }),
    });
    const data = await response.json();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type || TOKEN_TYPES.BEARER_CAPS,
    };
  }

  /**
   * Fetch Google user information using access token.
   * 
   * Retrieves user profile information from Google's userinfo endpoint
   * including ID, email, name, and profile picture.
   * @param accessToken - Valid Google access token
   * @returns Promise resolving to user information
   * @throws Error if API request fails
   */
  async getUserInfo(accessToken: string): Promise<User> {
    const response = await fetch(GOOGLE_URLS.USER_INFO, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.picture,
      provider: 'google',
    };
  }
}
