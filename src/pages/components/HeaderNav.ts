import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Component Object for the Global Header and Navigation
 */
export class HeaderNav extends BasePage {
  readonly logo: Locator;
  readonly navMenu: Locator;
  readonly homeLink: Locator;
  readonly servicesLink: Locator;
  readonly blindsShadesLink: Locator;
  readonly zebraLink: Locator;
  readonly rollerLink: Locator;
  readonly customPrintLink: Locator;
  readonly aboutLink: Locator;
  readonly contactLink: Locator;
  readonly freeEstimateLink: Locator;
  readonly employeeLink: Locator;

  constructor(page: Page) {
    super(page, 'HeaderNav');

    // Header locators
    this.logo = page.locator('header').getByRole('link', { name: /ZELLA BLINDS|logo/i }).first();
    this.navMenu = page.locator('header nav, header');

    // Desktop/mobile nav links
    this.homeLink = page.getByRole('link', { name: /^home$/i }).first();
    this.servicesLink = page.getByRole('link', { name: /^services$/i }).first();
    this.blindsShadesLink = page.getByRole('link', { name: /^blinds & shades$/i }).first();
    this.zebraLink = page.getByRole('link', { name: /^zebra$/i }).first();
    this.rollerLink = page.getByRole('link', { name: /^roller$/i }).first();
    this.customPrintLink = page.getByRole('link', { name: /^custom-print$/i }).first();
    this.aboutLink = page.getByRole('link', { name: /^about$/i }).first();
    this.contactLink = page.getByRole('link', { name: /^contact$/i }).first();
    this.freeEstimateLink = page.getByRole('link', { name: /^free\s+estimate$/i }).first();
    this.employeeLink = page.getByRole('link', { name: /^employee$/i }).first();
  }

  async clickHome(): Promise<void> {
    await this.clickElement(this.homeLink, 'Home link');
  }

  async clickServices(): Promise<void> {
    await this.clickElement(this.servicesLink, 'Services link');
  }

  async clickBlindsAndShades(): Promise<void> {
    await this.clickElement(this.blindsShadesLink, 'Blinds & Shades link');
  }

  async clickAbout(): Promise<void> {
    await this.clickElement(this.aboutLink, 'About link');
  }

  async clickContact(): Promise<void> {
    await this.clickElement(this.contactLink, 'Contact link');
  }

  async clickFreeEstimate(): Promise<void> {
    await this.clickElement(this.freeEstimateLink, 'Free Estimate link');
  }

  async clickEmployee(): Promise<void> {
    await this.clickElement(this.employeeLink, 'Employee link');
  }
}
