import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locators
  readonly navigationMenu: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly logo: Locator;
  readonly getStartedButton: Locator;
  readonly docsSideNav: Locator;

  constructor(page: Page) {
    super(page);
    this.navigationMenu = page.locator('nav[aria-label="Main"]');
    this.searchBox = page.locator('button[aria-label*="Search"]');
    this.searchButton = page.locator('button[aria-label*="Search"]');
    this.logo = page.locator('img[alt="Playwright logo"]');
    this.getStartedButton = page.locator('text=Get started');
    this.docsSideNav = page.locator('.menu__list');
  }

  /**
   * Navigate to home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Search for documentation
   */
  async searchDocs(searchTerm: string): Promise<void> {
    // Click on the search button to open search
    await this.clickElement(this.searchButton);
    // Wait for search input to appear and fill it
    const searchInput = this.page.locator('input[type="search"]');
    await this.waitForElement(searchInput);
    await this.fillInput(searchInput, searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Click Get Started button
   */
  async clickGetStarted(): Promise<void> {
    await this.clickElement(this.getStartedButton);
  }

  /**
   * Verify home page is loaded
   */
  async verifyHomePageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.logo);
  }

  /**
   * Get all navigation menu items
   */
  async getNavigationItems(): Promise<string[]> {
    const menuItems = await this.navigationMenu.locator('a').allTextContents();
    return menuItems;
  }

  /**
   * Navigate to specific docs section
   */
  async navigateToDocsSection(sectionName: string): Promise<void> {
    const sectionLink = this.docsSideNav.locator(`text=${sectionName}`);
    await this.clickElement(sectionLink);
  }
}