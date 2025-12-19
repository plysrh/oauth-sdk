# OAuth SDK TypeScript Demo

React application demonstrating the usage of OAuth SDK with multiple OAuth providers.

## Technologies

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **React Router v7** (routing)
- **@plysrh88/oauth-sdk** (authentication)

## Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

```bash
cp .env.example .env
# Edit .env with your real client IDs and redirect URIs
```

**Required variables:**

- `GITHUB_CLIENT_ID` - GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth app client secret
- `GITHUB_REDIRECT_URI` - GitHub OAuth redirect URI
- `GOOGLE_CLIENT_ID` - Google OAuth app client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth app client secret
- `GOOGLE_REDIRECT_URI` - Google OAuth redirect URI

1. **Configure OAuth Apps:**

### GitHub OAuth App

- URL: https://github.com/settings/applications/new
- Redirect URI: `http://localhost:5173/oauth/callback`

### Google OAuth App  

- URL: https://console.cloud.google.com/apis/credentials
- Redirect URI: `http://localhost:5173/oauth/callback`

4. **Run:**

```bash
npm run vercel:dev
```

Visit: http://localhost:5173/

## Deploy on Vercel

### 1. Automatic Setup

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/plysrh/oauth-sdk&project-name=oauth-sdk-demo-typescript&repository-name=oauth-sdk)

### 2. Manual Setup

1. **Connect repository** in Vercel dashboard
2. **Configure environment variables** in Vercel:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GITHUB_REDIRECT_URI`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI`

3. **Update OAuth Apps** with production URLs:

   - GitHub: `https://oauth-sdk-demo-typescript.vercel.app/`
   - Google: `https://your-app.vercel.app/`

### 3. Advanced Configuration

The `vercel.json` file includes:

- **SPA routing**: Rewrites for React Router

## Features

- Login with GitHub and Google
- Automatic OAuth callback handling
- Multi-page routing (Login, Home, Error, 404)
- Responsive UI with Tailwind CSS
- State management with React hooks
- TypeScript for type safety
- Environment variables for configuration
- Comprehensive test coverage
- Automatic deployment on Vercel

## Authentication Flow

1. User clicks "Continue with GitHub/Google"
2. Redirect to OAuth provider
3. User authorizes the application
4. Automatic callback with authorization code
5. SDK exchanges code for access token
6. SDK retrieves user information
7. Redirect to home page with success message

## Tests

```bash
npm run test          # Unit tests (Vitest)
npm run test:ci       # CI tests (Vitest)
npm run test:ui       # Unit tests with UI
npm run test:e2e      # E2E tests (Playwright)
npm run test:e2e:ui   # E2E tests with UI
```
