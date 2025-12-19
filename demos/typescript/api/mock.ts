import type { Request, Response } from 'express';

export default async function handler(request: Request, response: Response) {
  if (request.method === 'OPTIONS') {
    return response
      .status(200)
      .json({ message: 'Preflight request successful' });
  }

  if (request.method !== 'POST') {
    return response
      .status(405)
      .json({ error: 'Method not allowed' });
  }

  const { provider, code } = request.body;

  console.log('REQUEST_BODY', JSON.stringify(request.body), provider, code);

  if (!provider) {
    return response
      .status(400)
      .json({ error: 'Missing provider' });
  }

  // If no code, return login URL for initial OAuth flow
  if (!code) {
    return response
      .status(200)
      .json({ loginUrl: `/oauth/callback?code=test-code&state=github` });
  }

  // If code exists, handle OAuth callback
  const user = {
    id: 123,
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://avatar.url',
    provider: 'github',
  };

  return response
    .status(200)
    .json({ user });
}
