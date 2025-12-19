import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Auth } from '@plysrh88/oauth-sdk';
import { ENV_VARS } from './constants.js';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method === 'OPTIONS') {
    return response
      .status(200)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      .setHeader('Access-Control-Allow-Credentials', 'true')
      .json({ message: 'Preflight request successful' });
  }

  if (request.method !== 'POST') {
    return response
      .status(405)
      .setHeader('Access-Control-Allow-Origin', '*')
      .json({ error: 'Method not allowed' });
  }

  const { provider, code } = request.body;

  console.log('ENV_VARS', ENV_VARS);
  console.log('REQUEST_BODY', JSON.stringify(request.body), provider, code);

  if (!provider) {
    return response
      .status(400)
      .setHeader('Access-Control-Allow-Origin', '*')
      .json({ error: 'Missing provider' });
  }

  try {
    const auth = new Auth({
      github: {
        clientId: ENV_VARS.GITHUB_CLIENT_ID!,
        clientSecret: ENV_VARS.GITHUB_CLIENT_SECRET!,
        redirectUri: ENV_VARS.GITHUB_REDIRECT_URI!,
      },
      google: {
        clientId: ENV_VARS.GOOGLE_CLIENT_ID!,
        clientSecret: ENV_VARS.GOOGLE_CLIENT_SECRET!,
        redirectUri: ENV_VARS.GOOGLE_REDIRECT_URI!,
      },
    });

    // If no code, return login URL for initial OAuth flow
    if (!code) {
      const loginUrl = auth.getLoginUrl(provider);

      return response
        .status(200)
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({ loginUrl });
    }

    // If code exists, handle OAuth callback
    const user = await auth.handleCallback(provider, code);

    return response
      .status(200)
      .setHeader('Access-Control-Allow-Origin', '*')
      .json({ user });
  } catch (error) {
    console.error('OAuth error:', error);

    return response
      .status(401)
      .setHeader('Access-Control-Allow-Origin', '*')
      .json({ error: 'Authentication failed' });
  }
}
