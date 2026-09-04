import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Component Object for the Global Footer
 */
export class Footer extends BasePage {
  readonly footerContainer: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    super(page, 'Footer');
    this.footerContainer = page.locator('footer, [class*="footer"]');
    this.copyrightText = page.locator('text=/©|Zella Blinds|All rights reserved/i').first();
  }
}
