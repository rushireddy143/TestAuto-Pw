# Playwright Test Automation Framework

A comprehensive test automation framework built with Playwright and TypeScript for cross-browser testing.

## Features

- **TypeScript Support**: Full TypeScript integration for better code quality and IDE support
- **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit browsers
- **Page Object Model**: Clean and maintainable test architecture
- **Custom Fixtures**: Reusable test fixtures for common functionality
- **Utility Functions**: Helper functions for common test operations
- **Test Data Management**: Centralized test data configuration
- **Multiple Reporters**: HTML, JSON, and JUnit reporting
- **Screenshots & Videos**: Automatic capture on test failures
- **API Testing**: Built-in support for API testing
- **Mobile Testing**: Mobile browser emulation support

## Project Structure

```
├── .github/
│   └── copilot-instructions.md    # GitHub Copilot instructions
├── data/
│   └── testData.ts                # Test data configuration
├── fixtures/
│   └── baseFixtures.ts            # Custom test fixtures
├── pages/
│   ├── BasePage.ts                # Base page object class
│   └── HomePage.ts                # Home page object
├── tests/
│   ├── homepage.spec.ts           # Homepage tests
│   └── api.spec.ts                # API tests
├── utils/
│   ├── TestHelpers.ts             # Test utility functions
│   └── BrowserUtils.ts            # Browser-specific utilities
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies
└── tsconfig.json                  # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-automation-framework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install:browsers
```

### Running Tests

#### Run all tests:
```bash
npm test
```

#### Run tests in headed mode:
```bash
npm run test:headed
```

#### Run tests with UI mode:
```bash
npm run test:ui
```

#### Run tests in debug mode:
```bash
npm run test:debug
```

#### Run tests for specific browser:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

#### Run mobile tests:
```bash
npm run test:mobile
```

#### Generate test code:
```bash
npm run codegen
```

#### View test report:
```bash
npm run test:report
```

## Configuration

### Playwright Configuration

The main configuration is in `playwright.config.ts`. Key settings include:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled by default
- **Retries**: 2 retries on CI, 0 locally
- **Reporters**: HTML, JSON, JUnit
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Trace**: Captured on first retry

### Browser Projects

The framework is configured to run tests across multiple browser projects:

- **Chromium**: Desktop Chrome simulation
- **Firefox**: Desktop Firefox simulation
- **WebKit**: Desktop Safari simulation
- **Mobile Chrome**: Pixel 5 emulation
- **Mobile Safari**: iPhone 12 emulation

### TypeScript Configuration

TypeScript is configured with:

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Enabled
- **Path Mapping**: Configured for clean imports

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '../fixtures/baseFixtures';

test.describe('Feature Tests', () => {
  test('should perform action', async ({ page }) => {
    await page.goto('/');
    // Test implementation
  });
});
```

### Using Page Objects

```typescript
test('should use page object', async ({ homePage }) => {
  await homePage.navigateToHome();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
});
```

### Using Test Data

```typescript
import { testData } from '../data/testData';

test('should use test data', async ({ page }) => {
  await page.fill('[data-testid="email"]', testData.users.validUser.email);
});
```

### API Testing

```typescript
test('should test API', async ({ request }) => {
  const response = await request.get('/api/users');
  expect(response.status()).toBe(200);
});
```

## Best Practices

### Test Organization

- Group related tests using `test.describe()`
- Use descriptive test names
- Keep tests independent and atomic
- Use proper setup and teardown

### Page Objects

- Inherit from `BasePage` for common functionality
- Use meaningful locator names
- Implement reusable methods
- Keep page-specific logic in page objects

### Assertions

- Use Playwright's built-in assertions
- Prefer `toBeVisible()` over `toBeTruthy()`
- Use soft assertions when appropriate
- Add meaningful assertion messages

### Test Data

- Use the centralized test data configuration
- Generate dynamic test data when needed
- Avoid hardcoded values in tests
- Use environment variables for sensitive data

## Utilities

### TestHelpers

Common utility functions:
- `generateRandomString()`: Generate random strings
- `generateRandomEmail()`: Generate test email addresses
- `waitForCondition()`: Wait for custom conditions
- `retry()`: Retry failed operations

### BrowserUtils

Browser-specific utilities:
- `setupContext()`: Configure browser context
- `handleAlert()`: Handle browser dialogs
- `setCookies()`: Manage cookies
- `emulateNetworkConditions()`: Simulate network conditions

## Reporting

The framework generates multiple types of reports:

- **HTML Report**: Interactive web-based report
- **JSON Report**: Machine-readable results
- **JUnit Report**: XML format for CI integration

Reports are generated in the `playwright-report` directory.

## CI/CD Integration

The framework is configured for CI environments:

- Retries enabled on CI
- Optimized for parallel execution
- Multiple report formats
- Screenshots and videos on failure

## Troubleshooting

### Common Issues

1. **Browser not found**: Run `npm run install:browsers`
2. **TypeScript errors**: Check `tsconfig.json` configuration
3. **Test timeouts**: Adjust timeout values in `playwright.config.ts`
4. **Flaky tests**: Use proper wait strategies and assertions

### Debug Mode

Use debug mode to troubleshoot tests:
```bash
npm run test:debug
```

This opens the Playwright Inspector for step-by-step debugging.

## Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update documentation
4. Follow TypeScript best practices
5. Use meaningful commit messages

## License

MIT License - see LICENSE file for details.