# AuthFlow React Demo

React application demonstrating the usage of AuthFlow SDK with multiple OAuth providers.

## Technologies

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **React Router v7** (routing)
- **@plysrh88/authflow** (authentication)

## Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

```bash
cp .env.example .env
# Edit .env with your real client IDs
```

3. **Configure OAuth Apps:**

### GitHub OAuth App

- URL: https://github.com/settings/applications/new
- Redirect URI: `http://localhost:5173/`

### Google OAuth App  

- URL: https://console.cloud.google.com/apis/credentials
- Redirect URI: `http://localhost:5173/`

4. **Run:**

```bash
npm run dev
```

Visit: http://localhost:5173

## Deploy on Vercel

### 1. Automatic Setup

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/plysrh88/authflow-sdk&project-name=authflow-demo&repository-name=authflow-sdk)

### 2. Manual Setup

1. **Connect repository** in Vercel dashboard
2. **Configure environment variables** in Vercel:
   - `VITE_GITHUB_CLIENT_ID`
   - `VITE_GITHUB_CLIENT_SECRET`
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_GOOGLE_CLIENT_SECRET`

3. **Update OAuth Apps** with production URLs:
   - GitHub: `https://your-app.vercel.app/`
   - Google: `https://your-app.vercel.app/`

### 3. Advanced Configuration

The `vercel.json` file includes:

- **Framework detection**: Vite
- **SPA routing**: Rewrites for React Router
- **Build optimization**: Automatic configuration

## Features

- ✅ Login with GitHub and Google
- ✅ Automatic OAuth callback handling
- ✅ Multi-page routing (Login, Home, Error, 404)
- ✅ Responsive UI with Tailwind CSS
- ✅ State management with React hooks
- ✅ TypeScript for type safety
- ✅ Environment variables for configuration
- ✅ Comprehensive test coverage
- ✅ Automatic deployment on Vercel

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
npm test              # Unit tests (Vitest)
npm run test:e2e      # E2E tests (Playwright)
npm run test:ui       # Unit tests with UI
npm run test:e2e:ui   # E2E tests with UI
```
