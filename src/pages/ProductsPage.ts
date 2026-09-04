import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for Zella Blinds Product Categories (Blinds, Shades, Zebra, Roller, Custom-Print)
 */
export class ProductsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly zebraFilter: Locator;
  readonly rollerFilter: Locator;
  readonly customPrintFilter: Locator;

  constructor(page: Page) {
    super(page, 'ProductsPage');

    this.pageHeading = page.locator('h1').first();
    this.zebraFilter = page.getByRole('link', { name: /zebra/i }).first();
    this.rollerFilter = page.getByRole('link', { name: /roller/i }).first();
    this.customPrintFilter = page.getByRole('link', { name: /custom-print/i }).first();
  }

  /**
   * Opens main Blinds & Shades catalog page
   */
  async openBlindsAndShades(): Promise<this> {
    await this.navigate('/blinds-shades');
    await this.waitForPageLoaded();
    return this;
  }

  /**
   * Opens Zebra blinds subpage
   */
  async openZebra(): Promise<this> {
    await this.navigate('/zebra');
    await this.waitForPageLoaded();
    return this;
  }

  /**
   * Opens Roller blinds subpage
   */
  async openRoller(): Promise<this> {
    await this.navigate('/roller');
    await this.waitForPageLoaded();
    return this;
  }

  /**
   * Opens Custom Print blinds subpage
   */
  async openCustomPrint(): Promise<this> {
    await this.navigate('/custom-print');
    await this.waitForPageLoaded();
    return this;
  }

  /**
   * Asserts header content is present
   */
  async assertCatalogLoaded(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }
}
