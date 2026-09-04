import { Page, Locator, expect } from '@playwright/test';
import { createLogger, Logger } from '../utils/logger';

/**
 * BasePage: Core abstract foundation for all Page Objects in the framework.
 * Implements resilient Playwright interactions, web-first waits, and structured step logging.
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger: Logger;

  constructor(page: Page, contextName: string) {
    this.page = page;
    this.logger = createLogger(contextName);
  }

  /**
   * Navigates to a target relative or absolute URL
   */
  async navigate(path = '/'): Promise<this> {
    this.logger.step(`Navigating to URL path: ${path}`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    return this;
  }

  /**
   * Waits for page load state and network stabilization
   */
  async waitForPageLoaded(): Promise<void> {
    this.logger.info('Waiting for DOM content loaded...');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Returns current URL string
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Returns page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Resilient element click with auto-wait and logging
   */
  async clickElement(locator: Locator, description = 'element'): Promise<this> {
    this.logger.info(`Clicking on ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
    return this;
  }

  /**
   * Resilient input filling with auto-wait, clearing, and logging
   */
  async fillField(locator: Locator, value: string, description = 'input field'): Promise<this> {
    this.logger.info(`Filling ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
    return this;
  }

  /**
   * Clears an input field
   */
  async clearField(locator: Locator, description = 'input field'): Promise<this> {
    this.logger.info(`Clearing ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.fill('');
    return this;
  }

  /**
   * Checks element visibility without throwing on negative checks
   */
  async isElementVisible(locator: Locator, timeout = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Retrieves text content of an element
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() || '';
  }

  /**
   * Captures full page screenshot and returns buffer
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    this.logger.info(`Capturing screenshot: ${name}`);
    return await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  /**
   * Asserts current URL contains expected substring
   */
  async assertUrlContains(subString: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(subString));
  }
}
