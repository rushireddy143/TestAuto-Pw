# CI/CD Integration Guide

This repository is integrated with both **GitHub Actions** and **Azure DevOps** for automated Playwright testing.

## 🚀 GitHub Actions Workflows

### 1. Main Playwright Tests (`playwright.yml`)
**Triggers:**
- Push to `main`, `develop`, `test` branches
- Pull requests to `main`, `develop`
- Scheduled: Daily at 9 PM IST (3:30 PM UTC)
- Manual trigger via workflow_dispatch

**Features:**
- ✅ Tests on 3 browsers: Chromium, Firefox, WebKit (Safari)
- ✅ Tests on Node.js versions: 18, 20
- ✅ Matrix strategy for parallel execution
- ✅ Uploads test reports and artifacts
- ✅ Deploys HTML report to GitHub Pages
- ✅ Microsoft Teams notifications (success/failure)

**Artifacts:**
- Test reports (HTML, JSON, JUnit)
- Screenshots and videos on failure
- Retained for 30 days

### 2. Simple Tests (`simple-tests.yml`)
**Purpose:** Basic workflow for quick testing
- Runs on push/PR to main
- Tests with Chromium only
- Faster execution for quick feedback

### 3. Chrome Tests (`chrome-tests.yml`)
**Purpose:** Focused testing for specific test files
- Triggered when `chromebrowser.spec.ts` or `test-3.spec.ts` change
- Chromium browser only
- Quick validation for specific test changes

### 4. PR Comments (`pr-comment.yml`)
**Purpose:** Automatic PR comments with test results
- Posts test summary on pull requests
- Shows pass/fail status with emojis
- Links to detailed workflow results

## 🔵 Azure DevOps Pipelines

### 1. Advanced Pipeline (`azure-pipelines.yml`)
**Features:**
- Multi-stage pipeline (Test → Publish)
- Uses reusable templates
- Separate jobs per browser
- Comprehensive reporting

### 2. Simple Pipeline (`azure-pipelines-simple.yml`) - Recommended
**Features:**
- Single pipeline with matrix strategy
- Tests all 3 browsers in parallel
- Teams notification integration
- JUnit test results
- HTML report publishing
- Screenshot artifacts on failure

**Triggers:**
- Push to `main`, `develop`, `test` branches
- Pull requests to `main`, `develop`
- Scheduled: Daily at 9 PM IST

## 📊 Test Reports

### GitHub Actions
- **HTML Report:** Available on GitHub Pages after workflow completion
- **Artifacts:** Downloadable from workflow run page
- **Test Results:** Displayed in workflow summary

### Azure DevOps
- **Test Results:** Published to Azure DevOps Test Plans
- **HTML Report:** Available in Pipeline artifacts
- **Screenshots:** Uploaded as artifacts on test failure

## 🔔 Notifications

### Microsoft Teams Integration
Both platforms support Teams notifications:

**Setup:**
1. Create an incoming webhook in your Teams channel:
   - Go to Teams channel → ... → Connectors
   - Search for "Incoming Webhook"
   - Configure and copy webhook URL

2. Add webhook as secret:
   - **GitHub:** Repository → Settings → Secrets → `TEAMS_WEBHOOK_URL`
   - **Azure DevOps:** Pipelines → Library → Variable groups → `TEAMS_WEBHOOK_URL`

**Notifications include:**
- ✅ Success: Green card with test summary
- ❌ Failure: Red card with error details and logs link
- Repository, branch, commit, and actor information

## 🛠️ Setup Instructions

### GitHub Actions Setup
1. Workflows are automatically enabled when pushed to repository
2. To enable GitHub Pages:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - HTML reports will be deployed automatically

3. Add Teams webhook (optional):
   - Settings → Secrets and variables → Actions
   - New repository secret: `TEAMS_WEBHOOK_URL`

### Azure DevOps Setup
1. Create new pipeline:
   - Pipelines → New Pipeline
   - Select your repository
   - Choose "Existing Azure Pipelines YAML file"
   - Select `azure-pipelines-simple.yml` (recommended)

2. Add Teams webhook (optional):
   - Pipelines → Library → Variable groups
   - Add variable: `TEAMS_WEBHOOK_URL`

## 🔍 Test Execution

### Local Testing
```bash
# Run all tests
npm test

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug

# Run in UI mode
npm run test:ui

# View test report
npm run test:report
```

### GitHub Actions
- **Automatic:** Triggered by push/PR/schedule
- **Manual:** Go to Actions → Playwright Tests → Run workflow

### Azure DevOps
- **Automatic:** Triggered by push/PR/schedule
- **Manual:** Go to Pipelines → Select pipeline → Run pipeline

## 📈 Metrics & Monitoring

### Key Metrics Tracked
- ✅ Test pass/fail rate
- ⏱️ Test execution time
- 🌐 Cross-browser compatibility
- 📊 Test coverage (if configured)
- 🔄 Flaky test detection

### Reports Location
- **GitHub:** Actions tab → Workflow runs
- **Azure DevOps:** Pipelines → Runs
- **GitHub Pages:** https://[your-username].github.io/[repo-name]

## 🔧 Maintenance

### Updating Playwright
```bash
npm install @playwright/test@latest
npx playwright install
```

Then commit the updated `package.json` and `package-lock.json`.

### Updating Workflows
- GitHub Actions: Edit `.github/workflows/*.yml`
- Azure DevOps: Edit `azure-pipelines*.yml`

## 📝 Best Practices

1. ✅ Keep tests independent and isolated
2. ✅ Use meaningful test names
3. ✅ Add proper assertions
4. ✅ Handle flaky tests with retries
5. ✅ Take screenshots on failure
6. ✅ Use page object model pattern
7. ✅ Keep test data separate
8. ✅ Review test reports regularly
9. ✅ Fix failing tests immediately
10. ✅ Monitor test execution time

## 🆘 Troubleshooting

### Common Issues

**Browser not installed:**
```bash
npx playwright install
```

**Tests failing in CI but passing locally:**
- Check environment variables
- Verify CI timeout settings
- Check for timing issues (add proper waits)

**GitHub Pages not deploying:**
- Check repository settings → Pages
- Ensure workflow has proper permissions
- Verify artifact upload step succeeded

**Teams notifications not working:**
- Verify webhook URL is correct
- Check secret configuration
- Test webhook URL manually

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Pipelines Documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines)
- [Microsoft Teams Webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

---

**Last Updated:** November 2025  
**Maintained by:** Automation Team