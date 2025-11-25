import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('verify the  title of the application', async ({page})=>{
  await page.goto("https://www.linkedin.com/");
  await expect(page).toHaveTitle(/LinkedIn/);
  // Note: LinkedIn requires authentication to access specific pages like /mynetwork/grow/
  // Use the home page or implement authentication for protected pages
});