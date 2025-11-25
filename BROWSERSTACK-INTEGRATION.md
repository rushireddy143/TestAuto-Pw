# BrowserStack Integration Quick Guide

This project includes a sample script `browserstack-sample.js` that connects to BrowserStack via Playwright’s `connect` API. Configure the environment variables below to run sessions from your local machine or GitHub Actions.

## Required Environment Variables
- `BROWSERSTACK_USERNAME`: Your BrowserStack username
- `BROWSERSTACK_ACCESS_KEY`: Your BrowserStack access key

## Optional Environment Variables
- `BROWSERSTACK_BROWSER`: One of `chrome`, `edge`, `firefox`, `webkit`, `chromium` (default: `chrome`)
- `BROWSERSTACK_URL`: Target URL to open (default: `https://www.example.com`)
- `BROWSERSTACK_LOCAL`: Set to `true` to enable BrowserStack Local (default: `false`)

The sample maps these values to BrowserStack’s Playwright capabilities. For Firefox/WebKit/Chromium, the script maps to `playwright-firefox`, `playwright-webkit`, and `playwright-chromium` respectively.

## Local Usage (Windows PowerShell)
Set variables for the current session and run:

```powershell
$env:BROWSERSTACK_USERNAME="<your-username>"
$env:BROWSERSTACK_ACCESS_KEY="<your-access-key>"
# Optional overrides
$env:BROWSERSTACK_BROWSER="edge"        # chrome|edge|firefox|webkit|chromium
$env:BROWSERSTACK_URL="https://www.yahoo.com"
$env:BROWSERSTACK_LOCAL="false"

node browserstack-sample.js
```

Persist variables for future sessions (close/reopen terminal after):

```powershell
setx BROWSERSTACK_USERNAME "<your-username>"
setx BROWSERSTACK_ACCESS_KEY "<your-access-key>"
```

## BrowserStack Local (optional)
If you need to access internal apps:
1. Download BrowserStackLocal from BrowserStack docs or install via npm: `npm i -g browserstack-local`
2. Start it using your access key before running the script:

```powershell
# Using the binary (path will vary)
BrowserStackLocal.exe <your-access-key>

# Or using npm package
browserstack-local --key <your-access-key>

# Then set
$env:BROWSERSTACK_LOCAL="true"
node browserstack-sample.js
```

## GitHub Actions
A workflow is provided at `.github/workflows/browserstack.yml` to run the sample on demand.

1. In your repository Settings → Secrets and variables → Actions → New repository secret:
   - `BROWSERSTACK_USERNAME`
   - `BROWSERSTACK_ACCESS_KEY`
2. Go to Actions → "BrowserStack Sample" → Run workflow.
3. Provide optional inputs (browser, url, local) as needed.

The standard Playwright CI workflow is at `.github/workflows/playwright.yml` (Chromium/Firefox/WebKit matrix). Sauce Labs runs are in `.github/workflows/saucelabs.yml`.

## Script Reference
- File: `browserstack-sample.js`
- Key environment variables consumed: `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`, `BROWSERSTACK_BROWSER`, `BROWSERSTACK_URL`, `BROWSERSTACK_LOCAL`
- The script constructs `wsEndpoint` and connects via `chromium.connect(wsEndpoint)`.
