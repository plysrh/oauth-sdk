# @plysrh88/authflow

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
  id: string
  email: string
  name: string
  avatar?: string
  provider: Provider
}

type Provider = 'github' | 'google'

interface AuthConfig {
  github?: GitHubConfig
  google?: GoogleConfig
}

interface GitHubConfig {
  clientId: string
  clientSecret: string
  redirectUri?: string
}

interface GoogleConfig {
  clientId: string
  clientSecret: string
  redirectUri?: string
}
```
