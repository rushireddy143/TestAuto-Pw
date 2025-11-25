const { chromium } = require('playwright');

(async () => {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || 'yPn2ecvxaEvAezyyqyLd';
  const localFlag = process.env.BROWSERSTACK_LOCAL === 'true' ? 'true' : 'false';
  const targetUrl = process.env.BROWSERSTACK_URL || 'https://www.yahoo.com';
  const rawBrowser = (process.env.BROWSERSTACK_BROWSER || 'chrome').toLowerCase();

  if (!username) {
    console.error('Missing BROWSERSTACK_USERNAME environment variable. Set it and re-run.');
    process.exit(1);
    return;
  }

  // Map friendly names to BrowserStack Playwright accepted values.
  const browserMap = {
    chrome: 'chrome',
    edge: 'edge',
    firefox: 'playwright-firefox',
    webkit: 'playwright-webkit',
    chromium: 'playwright-chromium'
  };

  const mappedBrowser = browserMap[rawBrowser];
  if (!mappedBrowser) {
    console.error(`Invalid BROWSERSTACK_BROWSER value '${rawBrowser}'. Use one of: ${Object.keys(browserMap).join(', ')}`);
    process.exit(1);
    return;
  }

  const caps = {
    browser: mappedBrowser,
    os: 'windows',
    osVersion: '11',
    buildName: 'playwright-browserstack-sample',
    sessionName: `Sample ${rawBrowser} navigation`,
    local: localFlag,
    networkLogs: 'true',
    'browserstack.username': username,
    'browserstack.accessKey': accessKey
  };

  const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;

  console.log('Connecting with capabilities:', caps);

  let browser;
  try {
    browser = await chromium.connect(wsEndpoint);
    const context = browser.contexts()[0] || await browser.newContext();
    const page = await context.newPage();
    await page.goto(targetUrl);
    const title = await page.title();
    console.log('Page title:', title);
    await page.waitForTimeout(1500);
  } catch (err) {
    console.error('BrowserStack session error:', err);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
