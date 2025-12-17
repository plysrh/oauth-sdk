import type { AuthConfig, Provider, User, AuthProvider } from './types';
import { GitHubProvider } from './modules/github';
import { GoogleProvider } from './modules/google';

/**
 * Main Auth class for handling multi-provider OAuth authentication.
 * 
 * @example
 * ```typescript
 * const auth = new Auth({
 *   github: {
 *     clientId: 'your-github-client-id',
 *     clientSecret: 'your-github-client-secret'
 *   },
 *   google: {
 *     clientId: 'your-google-client-id',
 *     clientSecret: 'your-google-client-secret'
 *   }
 * });
 * 
 * // Get login URL
 * const loginUrl = auth.getLoginUrl('github');
 * 
 * // Handle OAuth callback
 * const user = await auth.handleCallback('github', code);
 * ```
 */
export class Auth {
  private providers: Map<Provider, AuthProvider> = new Map();

  /**
   * Initialize Auth with provider configurations.
   * @param config - Configuration object containing provider settings
   */
  constructor(config: AuthConfig) {
    if (config.github) {
      this.providers.set('github', new GitHubProvider(config.github));
    }
    if (config.google) {
      this.providers.set('google', new GoogleProvider(config.google));
    }
  }

  /**
   * Generate OAuth authorization URL for a specific provider.
   * @param provider - OAuth provider ('github' or 'google')
   * @param state - Optional state parameter for CSRF protection
   * @returns Authorization URL to redirect users to
   * @throws Error if provider is not configured
   */
  getLoginUrl(provider: Provider, state?: string): string {
    const providerInstance = this.providers.get(provider);

    if (!providerInstance) {
      throw new Error(`Provider ${provider} not configured`);
    }

    return providerInstance.getLoginUrl(state);
  }

  /**
   * Handle OAuth callback by exchanging authorization code for user information.
   * @param provider - OAuth provider that initiated the callback
   * @param code - Authorization code received from OAuth callback
   * @returns Promise resolving to authenticated user information
   * @throws Error if provider is not configured or token exchange fails
   */
  async handleCallback(provider: Provider, code: string): Promise<User> {
    const providerInstance = this.providers.get(provider);

    if (!providerInstance) {
      throw new Error(`Provider ${provider} not configured`);
    }

    const tokens = await providerInstance.exchangeCodeForToken(code);

    return providerInstance.getUserInfo(tokens.accessToken);
  }

  /**
   * Validate an existing access token and retrieve user information.
   * @param provider - OAuth provider that issued the token
   * @param accessToken - Valid access token to validate
   * @returns Promise resolving to user information
   * @throws Error if provider is not configured or token is invalid
   */
  async validateToken(provider: Provider, accessToken: string): Promise<User> {
    const providerInstance = this.providers.get(provider);

    if (!providerInstance) {
      throw new Error(`Provider ${provider} not configured`);
    }

    return providerInstance.getUserInfo(accessToken);
  }
}
