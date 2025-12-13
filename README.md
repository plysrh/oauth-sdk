# AuthFlow SDK

A unified authentication SDK supporting multiple OAuth providers with a consistent API across different programming languages.

## 🚀 Features

- 🔐 **Unified API** for multiple OAuth providers
- 🌐 **Zero dependencies** - uses native fetch API
- 📱 **Multiple flows** - web, API, and CLI support
- 🔒 **Type-safe** - full TypeScript support
- ⚡ **Lightweight** - minimal bundle size
- 🌍 **Multi-language** - consistent API across languages

## 📦 Installation

```bash
npm install @plysrh88/authflow
```

## 🔑 Supported Providers

- ✅ **GitHub OAuth** - Complete OAuth2 flow
- ✅ **Google OAuth2** - OpenID Connect support
- 🔄 **More providers** - Coming soon...

## 🚀 Quick Start

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
const loginUrl = auth.getLoginUrl('github')

// Handle OAuth callback
const user = await auth.handleCallback('github', code)
console.log(user) // { id, email, name, avatar, provider }
```

## 📚 API Reference

### AuthFlow Class

```typescript
const auth = new AuthFlow(config: AuthConfig)
```

### Methods

- `getLoginUrl(provider, state?)` - Generate OAuth login URL
- `handleCallback(provider, code)` - Exchange code for user data
- `validateToken(provider, token)` - Validate existing access token

### User Object

```typescript
{
  id: string        // User ID from provider
  email: string     // User email address
  name: string      // User display name
  avatar?: string   // User avatar URL
  provider: string  // OAuth provider name
}
```

## 📦 Packages

| Language | Package | Status | Installation |
|----------|---------|--------|--------------|
| **TypeScript** | [`@plysrh88/authflow`](./packages/typescript) | ✅ **Published** | `npm install @plysrh88/authflow` |
| **Elixir** | [`authflow_elixir`](./packages/elixir) | 🔄 **Planned** | Coming soon |
| **Rust** | [`authflow-rust`](./packages/rust) | 🔄 **Planned** | Coming soon |
| **Go** | [`authflow-go`](./packages/golang) | 🔄 **Planned** | Coming soon |

## 🎯 Demo

See the [`demo/`](./demo) directory for a complete React implementation example.
