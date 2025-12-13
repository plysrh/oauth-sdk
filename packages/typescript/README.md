# @plysrh88/authflow

[![npm version](https://badge.fury.io/js/@plysrh88%2Fauthflow.svg)](https://www.npmjs.com/package/@plysrh88/authflow)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A unified authentication SDK for TypeScript/JavaScript supporting multiple OAuth providers.

## Installation

```bash
npm install @plysrh88/authflow
```

## Quick Start

```typescript
import { AuthFlow } from '@plysrh88/authflow'

const auth = new AuthFlow({
  github: {
    clientId: 'your-github-client-id',
    clientSecret: 'your-github-client-secret'
  },
  google: {
    clientId: 'your-google-client-id', 
    clientSecret: 'your-google-client-secret'
  }
})
// Get login URL
const loginUrl = auth.getLoginUrl('github');
// Handle OAuth callback
const user = await auth.handleCallback('github', code);

console.log(user) // { id, email, name, avatar, provider }
```

## Features

- 🔐 **Unified API** for multiple OAuth providers
- 🔄 **Automatic token handling** and user data retrieval
- 📱 **Multiple flows** - web, API, CLI support
- 🌍 **Zero dependencies** - uses native fetch
- ⚡ **TypeScript first** with full type safety
- 🏗️ **Modular architecture** with provider-specific implementations
- 🔧 **Configurable** with environment variables support
- 📚 **Comprehensive JSDoc documentation**
- ✅ **Fully tested** with unit and integration tests

## Supported Providers

- **GitHub OAuth** - Complete OAuth2 flow
- **Google OAuth2** - OpenID Connect support
- More providers coming soon...

## API Reference

### AuthFlow

```typescript
const auth = new AuthFlow(config: AuthConfig)
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

### React Integration

```typescript
import { useState, useEffect } from 'react';
import { AuthFlow } from '@plysrh88/authflow';

function LoginComponent() {
  const [auth] = useState(() => new AuthFlow({
    github: {
      clientId: process.env.VITE_GITHUB_CLIENT_ID!,
      clientSecret: process.env.VITE_GITHUB_CLIENT_SECRET!,
      redirectUri: process.env.VITE_GITHUB_REDIRECT_URI,
    }
  }))

  const handleLogin = () => {
    const url = auth.getLoginUrl('github');

    window.location.href = url;
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      auth.handleCallback('github', code)
        .then(user => console.log('Logged in:', user))
        .catch(err => console.error('Login failed:', err));
    }
  }, []);

  return <button onClick={handleLogin}>Login with GitHub</button>;
}
```
