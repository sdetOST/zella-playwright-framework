import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';

/**
 * Page Object for Zella Blinds Home Page
 */
export class HomePage extends BasePage {
  readonly headerNav: HeaderNav;
  readonly footer: Footer;

  // Hero Section
  readonly heroHeading: Locator;
  readonly heroSubheading: Locator;
  readonly getStartedButton: Locator;
  readonly learnMoreButton: Locator;

  // Features Section
  readonly craftingSectionHeading: Locator;
  readonly testimonialsSection: Locator;

  constructor(page: Page) {
    super(page, 'HomePage');
    this.headerNav = new HeaderNav(page);
    this.footer = new Footer(page);

    this.heroHeading = page.getByRole('heading', {
      name: /Custom Window Coverings for Every Space/i,
    });
    this.heroSubheading = page.getByText(/Expertly Designed/i);
    this.getStartedButton = page.getByRole('link', { name: /Get Started/i }).first();
    this.learnMoreButton = page.getByRole('link', { name: /Learn More/i }).first();

    this.craftingSectionHeading = page.getByRole('heading', {
      name: /Professional Crafting/i,
    });
    this.testimonialsSection = page.getByText(/transformed my home with beautiful custom blinds/i);
  }

  /**
   * Opens Home page
   */
  async open(): Promise<this> {
    await this.navigate('/');
    await this.waitForPageLoaded();
    return this;
  }

  /**
   * Clicks 'Get Started' CTA button (handles target="_blank" popup tab)
   */
  async clickGetStarted(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.clickElement(this.getStartedButton, 'Get Started button'),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  /**
   * Clicks 'Learn More' CTA button (handles target="_blank" popup tab)
   */
  async clickLearnMore(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.clickElement(this.learnMoreButton, 'Learn More button'),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}
