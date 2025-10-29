import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BrowserUtils } from '../utils/BrowserUtils';

// Define custom fixtures
type TestFixtures = {
  homePage: HomePage;
  browserUtils: BrowserUtils;
  authenticatedPage: Page;
};

// Extend base test with custom fixtures
export const test = base.extend<TestFixtures>({
  // Home page fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // Browser utilities fixture
  browserUtils: async ({ }, use) => {
    const browserUtils = new BrowserUtils();
    await use(browserUtils);
  },

  // Authenticated page fixture - automatically logs in before each test
  authenticatedPage: async ({ page }, use) => {
    // Add authentication logic here
    // Example: await page.goto('/login');
    // await page.fill('[data-testid="email"]', 'test@example.com');
    // await page.fill('[data-testid="password"]', 'password123');
    // await page.click('[data-testid="login-button"]');
    // await page.waitForURL('/dashboard');
    
    await use(page);
  },
});

export { expect } from '@playwright/test';