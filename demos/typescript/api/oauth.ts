import type { VercelRequest, VercelResponse } from '@vercel/node';
// import { Auth } from '@plysrh88/oauth-sdk';
// import { ENV_VARS } from './constants';

// const auth = new Auth({
//   github: {
//     clientId: ENV_VARS.GITHUB_CLIENT_ID!,
//     clientSecret: ENV_VARS.GITHUB_CLIENT_SECRET!,
//     redirectUri: ENV_VARS.GITHUB_REDIRECT_URI!,
//   },
//   google: {
//     clientId: ENV_VARS.GOOGLE_CLIENT_ID!,
//     clientSecret: ENV_VARS.GOOGLE_CLIENT_SECRET!,
//     redirectUri: ENV_VARS.GOOGLE_REDIRECT_URI!,
//   },
// });

// export default async function handler(request: VercelRequest, response: VercelResponse) {
//   if (request.method !== 'POST') {
//     return response.status(405).json({ error: 'Method not allowed' });
//   }

//   const { provider, code } = request.body;

//   if (!provider) {
//     return response.status(400).json({ error: 'Missing provider' });
//   }

//   try {
//     // If no code, return login URL for initial OAuth flow
//     if (!code) {
//       const loginUrl = auth.getLoginUrl(provider);

//       return response.status(200).json({ loginUrl });
//     }

//     // If code exists, handle OAuth callback
//     const user = await auth.handleCallback(provider, code);

//     response.status(200).json({ user });
//   } catch (error) {
//     console.error('OAuth error:', error);
//     response.status(500).json({ error: 'Authentication failed' });
//   }
// }

export default function handler(_request: VercelRequest, response: VercelResponse) {
  response.status(200).json({ message: 'OAuth backend is running.' });
}
