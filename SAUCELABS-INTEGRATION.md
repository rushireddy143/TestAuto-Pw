# Sauce Labs Integration Guide

This guide explains how to run your Playwright tests on Sauce Labs cloud platform for comprehensive cross-browser and cross-platform testing.

## 🌐 What is Sauce Labs?

Sauce Labs is a cloud-based testing platform that provides:
- 📱 Real devices and browsers
- 🌍 Multiple operating systems (Windows, macOS, Linux, iOS, Android)
- 🚀 Parallel test execution (up to 100+ concurrent tests)
- 📊 Detailed test analytics and reporting
- 🎥 Video recordings and screenshots
- 📝 Comprehensive test logs

## 🎯 Supported Platforms

Our Sauce Labs configuration tests on:

### Desktop Browsers
- ✅ **Chrome** on Windows 11
- ✅ **Firefox** on Windows 11
- ✅ **Safari** on macOS 13
- ✅ **Edge** on Windows 11

### Mobile Browsers
- ✅ **Chrome** on Android (Google Pixel 6)
- ✅ **Safari** on iOS (iPhone 13 Simulator)

## 🔧 Setup Instructions

### 1. Get Sauce Labs Account

1. Sign up at [https://saucelabs.com](https://saucelabs.com)
2. Free trial available with limited concurrent sessions
3. Note your username and access key from Account Settings

### 2. Configure Credentials

#### For GitHub Actions:

1. Go to your repository on GitHub
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Add two secrets:
   - Name: `SAUCE_USERNAME`, Value: Your Sauce Labs username
   - Name: `SAUCE_ACCESS_KEY`, Value: Your Sauce Labs access key

#### For Azure DevOps:

1. Go to your Azure DevOps project
2. Navigate to **Pipelines → Library**
3. Create a new variable group or add to existing:
   - Variable: `SAUCE_USERNAME`, Value: Your Sauce Labs username
   - Variable: `SAUCE_ACCESS_KEY`, Value: Your Sauce Labs access key (mark as secret)

### 3. Configuration Files

We've created the following files:

#### `playwright.saucelabs.config.ts`
- Playwright configuration for Sauce Labs
- Defines browser and platform combinations
- Automatically detects Sauce Labs credentials
- Falls back to local browsers if credentials missing

#### GitHub Actions: `.github/workflows/saucelabs.yml`
- Runs tests on Sauce Labs via GitHub Actions
- Tests all 6 platform/browser combinations
- Publishes results and notifications

#### Azure DevOps: `azure-pipelines-saucelabs.yml`
- Runs tests on Sauce Labs via Azure Pipelines
- Parallel execution across all platforms
- Teams notifications with results

## 🚀 Running Tests

### Local Execution with Sauce Labs

```bash
# Set environment variables (Windows PowerShell)
$env:SAUCE_USERNAME="your-username"
$env:SAUCE_ACCESS_KEY="your-access-key"

# Run tests on specific Sauce Labs browser
npx playwright test --config=playwright.saucelabs.config.ts --project=saucelabs-chrome-windows

# Run all Sauce Labs tests
npx playwright test --config=playwright.saucelabs.config.ts
```

```bash
# Set environment variables (Linux/macOS)
export SAUCE_USERNAME="your-username"
export SAUCE_ACCESS_KEY="your-access-key"

# Run tests
npx playwright test --config=playwright.saucelabs.config.ts
```

### GitHub Actions

#### Automatic Triggers:
- Push to `main`, `develop`, or `test` branches
- Pull requests to `main` or `develop`
- Scheduled: Daily at 9 PM IST

#### Manual Trigger:
1. Go to **Actions** tab
2. Select **Sauce Labs - Playwright Tests**
3. Click **Run workflow**
4. Select region (us-west-1 or eu-central-1)
5. Click **Run workflow**

### Azure DevOps

#### Setup Pipeline:
1. Go to **Pipelines → New Pipeline**
2. Select your repository
3. Choose **Existing Azure Pipelines YAML file**
4. Select `/azure-pipelines-saucelabs.yml`
5. Save and run

#### Manual Trigger:
1. Go to **Pipelines**
2. Select **Sauce Labs Playwright Tests**
3. Click **Run pipeline**

## 📊 Viewing Results

### Sauce Labs Dashboard

1. Login to [https://app.saucelabs.com](https://app.saucelabs.com)
2. Go to **Automated → Test Results**
3. View detailed logs, videos, and screenshots for each test
4. Filter by:
   - Browser type
   - Platform
   - Test status (passed/failed)
   - Time range

### Test Artifacts

#### GitHub Actions:
- Navigate to workflow run
- Scroll to **Artifacts** section
- Download:
  - Test results
  - Screenshots
  - Videos
  - HTML reports

#### Azure DevOps:
- Go to pipeline run
- Click **Published** tab
- Download artifacts:
  - Test results
  - Screenshots
  - HTML reports

## 🔍 Sauce Labs Features

### Video Recording
Every test execution is recorded and available in Sauce Labs dashboard:
- Full session replay
- Synchronized with test commands
- Downloadable in MP4 format

### Screenshots
Automatic screenshots captured on:
- Test failures
- Each test step (optional)
- Available in Sauce Labs dashboard

### Network Logs
- HTTP requests and responses
- Response times
- Status codes
- Headers and payloads

### Console Logs
- Browser console messages
- JavaScript errors
- Warnings and info logs

### Performance Metrics
- Page load times
- Resource loading times
- JavaScript execution times
- Network performance

## 💰 Pricing & Limits

### Free Trial
- Limited concurrent sessions (usually 2-5)
- 30-day trial period
- Access to all browsers and platforms

### Paid Plans
- Increased concurrency (10, 25, 50, 100+)
- Extended video retention
- Priority support
- Advanced analytics

### Current Configuration
- **Parallel tests**: 6 (one per platform)
- **Timeout**: 60 minutes per job
- **Retry**: 2 retries on failure (CI only)

## 🔐 Security Best Practices

1. ✅ **Never commit credentials** to repository
2. ✅ Use GitHub Secrets or Azure DevOps secure variables
3. ✅ Rotate access keys periodically
4. ✅ Use separate accounts for different environments
5. ✅ Enable IP whitelisting (if available in your plan)
6. ✅ Monitor usage in Sauce Labs dashboard

## 🐛 Troubleshooting

### Common Issues

#### "Authentication failed"
**Cause:** Invalid credentials  
**Solution:** Verify `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` are correct

#### "Max concurrency reached"
**Cause:** Too many tests running simultaneously  
**Solution:** Reduce parallel workers or upgrade Sauce Labs plan

#### "Browser timeout"
**Cause:** Test taking too long to execute  
**Solution:** Increase timeout in config or optimize test performance

#### "Connection refused"
**Cause:** Network connectivity issues  
**Solution:** Check firewall settings, verify Sauce Labs status

### Debug Mode

Run tests with debug logging:

```bash
DEBUG=pw:api npx playwright test --config=playwright.saucelabs.config.ts
```

### Check Sauce Labs Status

Visit: [https://status.saucelabs.com](https://status.saucelabs.com)

## 📈 Best Practices

1. ✅ **Group similar tests** to run on same platform
2. ✅ **Use descriptive test names** for easy identification in Sauce Labs
3. ✅ **Tag tests** with metadata for better filtering
4. ✅ **Keep tests independent** for reliable parallel execution
5. ✅ **Monitor concurrency usage** to optimize costs
6. ✅ **Review failed tests** in Sauce Labs dashboard
7. ✅ **Use retries wisely** to handle flaky tests
8. ✅ **Clean up test data** after each test run

## 🔄 Fallback Strategy

If Sauce Labs credentials are not available:
- Tests automatically fall back to local browsers
- Config uses standard Playwright browser setup
- No code changes required

## 📚 Additional Resources

- [Sauce Labs Documentation](https://docs.saucelabs.com)
- [Playwright + Sauce Labs Guide](https://docs.saucelabs.com/web-apps/automated-testing/playwright/)
- [Sauce Labs Platform Configurator](https://saucelabs.com/platform/platform-configurator)
- [Sauce Labs Status Page](https://status.saucelabs.com)
- [Sauce Labs Community](https://community.saucelabs.com)

## 🆘 Support

### Sauce Labs Support
- Email: support@saucelabs.com
- Community Forum: [https://community.saucelabs.com](https://community.saucelabs.com)
- Status Page: [https://status.saucelabs.com](https://status.saucelabs.com)

### Project Support
- Check CI/CD-INTEGRATION.md for general CI/CD guidance
- Review test logs in GitHub Actions or Azure DevOps
- Consult Sauce Labs dashboard for detailed test information

---

**Last Updated:** November 2025  
**Maintained by:** Automation Team