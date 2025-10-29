import { Browser, BrowserContext, Page } from '@playwright/test';

export class BrowserUtils {
  /**
   * Setup browser context with custom settings
   */
  static async setupContext(
    browser: Browser,
    options: {
      viewport?: { width: number; height: number };
      userAgent?: string;
      locale?: string;
      timezoneId?: string;
      permissions?: string[];
      geolocation?: { latitude: number; longitude: number };
    } = {}
  ): Promise<BrowserContext> {
    const context = await browser.newContext({
      viewport: options.viewport || { width: 1920, height: 1080 },
      userAgent: options.userAgent,
      locale: options.locale || 'en-US',
      timezoneId: options.timezoneId || 'America/New_York',
      permissions: options.permissions || [],
      geolocation: options.geolocation
    });

    return context;
  }

  /**
   * Handle browser alerts
   */
  static async handleAlert(page: Page, action: 'accept' | 'dismiss' = 'accept', promptText?: string): Promise<void> {
    page.once('dialog', async dialog => {
      if (dialog.type() === 'prompt' && promptText) {
        await dialog.accept(promptText);
      } else if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   * Set browser cookies
   */
  static async setCookies(context: BrowserContext, cookies: Array<{
    name: string;
    value: string;
    domain?: string;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
  }>): Promise<void> {
    await context.addCookies(cookies);
  }

  /**
   * Clear browser data
   */
  static async clearBrowserData(context: BrowserContext): Promise<void> {
    await context.clearCookies();
    await context.clearPermissions();
  }

  /**
   * Emulate network conditions
   */
  static async emulateNetworkConditions(
    page: Page,
    conditions: {
      offline?: boolean;
      downloadThroughput?: number;
      uploadThroughput?: number;
      latency?: number;
    }
  ): Promise<void> {
    const client = await page.context().newCDPSession(page);
    
    if (conditions.offline) {
      await client.send('Network.emulateNetworkConditions', {
        offline: true,
        downloadThroughput: 0,
        uploadThroughput: 0,
        latency: 0
      });
    } else {
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: conditions.downloadThroughput || -1,
        uploadThroughput: conditions.uploadThroughput || -1,
        latency: conditions.latency || 0
      });
    }
  }

  /**
   * Take full page screenshot
   */
  static async takeFullPageScreenshot(page: Page, path: string): Promise<void> {
    await page.screenshot({
      path,
      fullPage: true,
      type: 'png'
    });
  }

  /**
   * Generate PDF from page
   */
  static async generatePDF(page: Page, path: string, options?: {
    format?: 'A4' | 'Letter';
    landscape?: boolean;
    margin?: { top?: string; right?: string; bottom?: string; left?: string };
  }): Promise<void> {
    await page.pdf({
      path,
      format: options?.format || 'A4',
      landscape: options?.landscape || false,
      margin: options?.margin || { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
    });
  }
}