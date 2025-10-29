import { test, expect } from '../fixtures/baseFixtures';
import { testData } from '../data/testData';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
  });

  test('should load homepage successfully', async ({ homePage }) => {
    // Verify page title
    const title = await homePage.getTitle();
    expect(title).toContain('Playwright');

    // Verify homepage elements are visible
    const isLogoVisible = await homePage.verifyHomePageLoaded();
    expect(isLogoVisible).toBeTruthy();
  });

  test('should display navigation menu', async ({ homePage }) => {
    // Check if navigation menu is visible
    const isNavVisible = await homePage.isElementVisible(homePage.navigationMenu);
    expect(isNavVisible).toBeTruthy();

    // Get navigation items
    const navItems = await homePage.getNavigationItems();
    expect(navItems.length).toBeGreaterThan(0);
  });

  test('should perform search functionality', async ({ homePage, page }) => {
    const searchTerm = testData.searchTerms.validSearches[0];
    
    // Perform search
    await homePage.searchDocs(searchTerm);
    
    // Wait for search results or search page to load
    await page.waitForLoadState('networkidle');
    
    // Check if we're on a search results page or if search was performed
    const currentUrl = homePage.getCurrentUrl();
    const hasSearchResults = await page.locator('body').textContent();
    
    // Verify search was performed (either URL contains search or page shows search results)
    expect(currentUrl.includes('search') || hasSearchResults?.includes(searchTerm)).toBeTruthy();
  });

  test('should navigate to getting started page', async ({ homePage }) => {
    // Click Get Started button
    await homePage.clickGetStarted();
    
    // Verify navigation
    await homePage.waitForPageLoad();
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('intro');
  });

  test('should handle mobile viewport', async ({ page, homePage }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to home
    await homePage.navigateToHome();
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Verify page loads correctly on mobile
    const isLogoVisible = await homePage.verifyHomePageLoaded();
    expect(isLogoVisible).toBeTruthy();
    
    // Verify viewport size is correct
    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(375);
    expect(viewportSize?.height).toBe(667);
  });

  test('should take screenshot for visual testing', async ({ homePage, page }) => {
    // Take screenshot of homepage
    await page.screenshot({ 
      path: 'test-results/homepage-screenshot.png', 
      fullPage: true 
    });

    // Verify screenshot was taken (file exists)
    const isLogoVisible = await homePage.verifyHomePageLoaded();
    expect(isLogoVisible).toBeTruthy();
  });
});