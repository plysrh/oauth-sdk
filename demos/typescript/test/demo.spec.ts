import { test, expect } from '@playwright/test';

test.describe('Demo', () => {
  test('should display login page correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'OAuth SDK TypeScript Demo' })).toBeVisible();
    await expect(page.getByText('Multi-provider authentication')).toBeVisible();
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

  test('should handle navigation between pages', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'OAuth SDK TypeScript Demo' })).toBeVisible();

    await page.goto('/home');

    await expect(page.getByText('Hello, World!')).toBeVisible();

    await page.goto('/error');

    await expect(page.getByText('Error')).toBeVisible();

    await page.goto('/unknown-route');

    await expect(page.getByText('404')).toBeVisible();
  });

  test('should redirect to GitHub OAuth when clicking GitHub button', async ({ page }) => {
    await page.goto('/');

    const githubButton = page.getByText('Continue with GitHub');

    await expect(githubButton).toBeVisible();

    await githubButton.click();

    await expect(page).toHaveURL('/oauth/callback?code=test-code&state=github');
  });

  test.skip('should redirect to Google OAuth when clicking Google button', async ({ page }) => {
    await page.goto('/');

    const googleButton = page.getByText('Continue with Google');

    await expect(googleButton).toBeVisible();

    await googleButton.click();

    await expect(page).toHaveURL(/accounts\.google\.com\/o\/oauth2\/v2\/auth/);
  });

  test('should handle OAuth callback and redirect to the home page', async ({ page }) => {
    await page.goto('/oauth/callback?code=test-code&state=github');

    await expect(page).toHaveURL('/home');
    await expect(page.getByText('Hello, World!')).toBeVisible();
  });
});
