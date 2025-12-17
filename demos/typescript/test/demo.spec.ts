import { test, expect } from '@playwright/test';

test.describe('Demo', () => {
  test('should display login page correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'AuthFlow SDK' })).toBeVisible();
    await expect(page.getByText('Multi-provider authentication demo')).toBeVisible();
    await expect(page.getByText('Continue with GitHub')).toBeVisible();
    await expect(page.getByText('Continue with Google')).toBeVisible();
  });

  test('should display home page correctly', async ({ page }) => {
    await page.goto('/home');

    await expect(page.getByText('Hello, World!')).toBeVisible();
  });

  test('should display error page correctly', async ({ page }) => {
    await page.goto('/error');

    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Something went wrong')).toBeVisible();
  });

  test('should display 404 page for unknown routes', async ({ page }) => {
    await page.goto('/unknown-route');

    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
  });

  test('should redirect to GitHub OAuth when clicking GitHub button', async ({ page }) => {
    await page.goto('/');

    const githubButton = page.getByText('Continue with GitHub');

    await expect(githubButton).toBeVisible();

    await githubButton.click();

    await expect(page).toHaveURL(/github\.com\/login\/oauth\/authorize/);
  });

  test('should redirect to Google OAuth when clicking Google button', async ({ page }) => {
    await page.goto('/');

    const googleButton = page.getByText('Continue with Google');

    await expect(googleButton).toBeVisible();

    await googleButton.click();

    await expect(page).toHaveURL(/accounts\.google\.com\/o\/oauth2\/v2\/auth/);
  });

  test('should handle OAuth callback and display user info', async ({ page }) => {
    await page.goto('/oauth/callback?code=mock_code&state=github');

    await expect(page).toHaveURL('/home');
    await expect(page.getByText('Hello, World!')).toBeVisible();
  });

  test('should handle authentication error and redirect to error page', async ({ page }) => {
    await page.goto('/oauth/callback?code=invalid_code&state=github');

    await expect(page).toHaveURL('/error');
    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Something went wrong')).toBeVisible();
  });

  test('should handle navigation between pages', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'AuthFlow SDK' })).toBeVisible();

    await page.goto('/home');

    await expect(page.getByText('Hello, World!')).toBeVisible();

    await page.goto('/error');

    await expect(page.getByText('Error')).toBeVisible();

    await page.goto('/nonexistent');

    await expect(page.getByText('404')).toBeVisible();
  });

  test('should handle Google OAuth callback', async ({ page }) => {
    await page.goto('/oauth/callback?code=mock_google_code&state=google');

    await expect(page).toHaveURL('/home');
    await expect(page.getByText('Hello, World!')).toBeVisible();
  });

  test('should show loading state during authentication', async ({ page }) => {
    await page.goto('/oauth/callback?code=mock_code&state=github');

    await expect(page.getByText('Authenticating...')).toBeVisible();
  });
});
