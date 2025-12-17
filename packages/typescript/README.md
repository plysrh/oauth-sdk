# @plysrh88/oauth-sdk

[![npm version](https://badge.fury.io/js/@plysrh88%2Foauth-sdk.svg)](https://www.npmjs.com/package/@plysrh88/oauth-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A unified authentication SDK for TypeScript/JavaScript supporting multiple OAuth providers.

## Installation

```bash
npm install @plysrh88/oauth-sdk
```

## Quick Start

```typescript
import { Auth } from '@plysrh88/oauth-sdk';

const auth = new Auth({
  github: {
    clientId: 'your-github-client-id',
    clientSecret: 'your-github-client-secret',
    redirectUri: 'your-github-redirect-uri',
  },
  google: {
    clientId: 'your-google-client-id', 
    clientSecret: 'your-google-client-secret',
    redirectUri: 'your-google-redirect-uri',
  }
})
// Get login URL
const loginUrl = auth.getLoginUrl('github');
// Handle OAuth callback
const user = await auth.handleCallback('github', code);

console.log(user) // { id, email, name, avatar, provider }
```

## Features

- **Unified API** for multiple OAuth providers
- **Automatic token handling** and user data retrieval
- **Backend focused** - designed for server-side usage
- **Zero dependencies** - uses native fetch
- **TypeScript first** with full type safety
- **Modular architecture** with provider-specific implementations
- **Configurable** with environment variables support
- **Comprehensive JSDoc documentation**
- **Fully tested** with unit and integration tests

## Supported Providers

- **GitHub OAuth** - Complete OAuth2 flow
- **Google OAuth2** - OpenID Connect support
- More providers coming soon...

## API Reference

### Auth

```typescript
const auth = new Auth(config: AuthConfig)
```

### Methods

- `getLoginUrl(provider, state?)` - Generate OAuth login URL
- `handleCallback(provider, code)` - Exchange code for user data
- `validateToken(provider, token)` - Validate existing access token

### Types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: Provider;
}

type Provider = 'github' | 'google';

interface AuthConfig {
  github?: GitHubConfig;
  google?: GoogleConfig;
}

interface GitHubConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
}

interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
}
```

## Examples

### Backend API Integration

```typescript
import { Auth } from '@plysrh88/oauth-sdk';

const auth = new Auth({
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: 'http://localhost/oauth/callback',
  },
});

app.post('/oauth/login', (request, response) => {
  const { provider } = request.body;
  const loginUrl = auth.getLoginUrl(provider);

  response.json({ loginUrl });
});

app.post('/oauth/callback', async (request, response) => {
  const { provider, code } = request.body;
  
  try {
    const user = await auth.handleCallback(provider, code);

    response.json({ user });
  } catch (error) {
    response.status(400).json({ error: 'Authentication failed' });
  }
});
```

### Serverless Function (Vercel)

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Auth } from '@plysrh88/oauth-sdk';

const auth = new Auth({
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: 'http://localhost/oauth/callback',
  }
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { provider, code } = request.body;
  
  if (!code) {
    const loginUrl = auth.getLoginUrl(provider);

    return response.json({ loginUrl });
  }
  
  try {
    const user = await auth.handleCallback(provider, code);

    response.json({ user });
  } catch (error) {
    response.status(400).json({ error: 'Authentication failed' });
  }
}
```
