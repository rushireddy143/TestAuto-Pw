import { defineConfig, devices } from '@playwright/test';

/**
 * Sauce Labs Configuration for Playwright Tests
 * See https://docs.saucelabs.com/web-apps/automated-testing/playwright/
 */

// Sauce Labs credentials (prefer environment variables; fallback to provided values for local runs)
const SAUCE_USERNAME = process.env.SAUCE_USERNAME || 'oauth-lrushikeswarreddy-8d501';
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY || 'e47b53ec-abff-4a92-b9e7-8bf2e2b8cf48';
const SAUCE_REGION = process.env.SAUCE_REGION || 'us-west-1'; // change to 'eu-central-1' if your account is in EU

// Check if Sauce Labs credentials are available
const useSauceLabs = SAUCE_USERNAME && SAUCE_ACCESS_KEY;

// Helper to build a properly formatted Sauce Labs Playwright wsEndpoint
function sauceWsEndpoint(caps: Record<string, any>) {
  // Sauce requires caps to be provided via the `caps` query param as a JSON-encoded string
  const capsParam = encodeURIComponent(JSON.stringify(caps));
  return `wss://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.${SAUCE_REGION}.saucelabs.com/playwright/v1?caps=${capsParam}`;
}

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 10 : 5, // Sauce Labs allows more parallel workers
  
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }],
    ['list']
  ],

  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: useSauceLabs ? [
    // Sauce Labs Desktop Browsers
    {
      name: 'saucelabs-chrome-windows',
      use: {
        ...devices['Desktop Chrome'],
        connectOptions: {
          wsEndpoint: sauceWsEndpoint({
            browserName: 'chromium',
            platformName: 'Windows 11',
            browserVersion: 'latest',
            'sauce:options': {
              name: 'Playwright Test - Chrome Windows',
              build: 'playwright-build-1',
            },
          }),
        },
      },
    },
    {
      name: 'saucelabs-firefox-windows',
      use: {
        ...devices['Desktop Firefox'],
        connectOptions: {
          wsEndpoint: sauceWsEndpoint({
            browserName: 'firefox',
            platformName: 'Windows 11',
            browserVersion: 'latest',
            'sauce:options': {
              name: 'Playwright Test - Firefox Windows',
              build: 'playwright-build-1',
            },
          }),
        },
      },
    },
    {
      name: 'saucelabs-webkit-mac',
      use: {
        ...devices['Desktop Safari'],
        connectOptions: {
          wsEndpoint: sauceWsEndpoint({
            browserName: 'webkit',
            platformName: 'macOS 13',
            browserVersion: 'latest',
            'sauce:options': {
              name: 'Playwright Test - Safari macOS',
              build: 'playwright-build-1',
            },
          }),
        },
      },
    },
    {
      name: 'saucelabs-edge-windows',
      use: {
        ...devices['Desktop Edge'],
        connectOptions: {
          wsEndpoint: sauceWsEndpoint({
            browserName: 'chromium',
            platformName: 'Windows 11',
            browserVersion: 'latest',
            'sauce:options': {
              name: 'Playwright Test - Edge Windows',
              build: 'playwright-build-1',
            },
          }),
        },
      },
    },
    // Sauce Labs Mobile Browsers
    {
      name: 'saucelabs-mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        connectOptions: {
          wsEndpoint: sauceWsEndpoint({
            browserName: 'chromium',
            platformName: 'Android',
            'sauce:options': {
              name: 'Playwright Test - Chrome Android',
              build: 'playwright-build-1',
              deviceName: 'Google Pixel.*',
            },
          }),
        },
      },
    },
    {
      name: 'saucelabs-mobile-safari',
      use: {
        ...devices['iPhone 13'],
        connectOptions: {
          wsEndpoint: sauceWsEndpoint({
            browserName: 'webkit',
            platformName: 'iOS',
            'sauce:options': {
              name: 'Playwright Test - Safari iOS',
              build: 'playwright-build-1',
              deviceName: 'iPhone.*',
            },
          }),
        },
      },
    },
  ] : [
    // Local browsers (fallback when Sauce Labs credentials are not available)
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
