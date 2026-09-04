import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for Employee Portal (Password-Protected Gate)
 */
export class EmployeePage extends BasePage {
  // Password-gate locators
  readonly heading: Locator;
  readonly passwordLabel: Locator;
  readonly passwordInput: Locator;
  readonly enterButton: Locator;
  readonly backToHomeLink: Locator;
  readonly passwordForm: Locator;

  constructor(page: Page) {
    super(page, 'EmployeePage');

    this.heading = page.getByRole('heading', { name: /Guest area/i });
    this.passwordLabel = page.getByText(/Please enter the password to access the page/i);
    this.passwordInput = page.locator('#password');
    this.enterButton = page.getByRole('button', { name: /Enter/i });
    this.backToHomeLink = page.getByRole('link', { name: /Home/i }).first();
    this.passwordForm = page.locator('form.password-page__form');
  }

  /**
   * Opens Employee page
   */
  async open(): Promise<this> {
    await this.navigate('/employee');
    await this.waitForPageLoaded();
    return this;
  }

  /**
   * Submits a password to unlock the portal
   */
  async submitPassword(password: string): Promise<this> {
    this.logger.step(`Submitting password (length: ${password.length})`);
    await this.fillField(this.passwordInput, password, 'Password field');
    await this.clickElement(this.enterButton, 'Enter button');
    return this;
  }

  /**
   * Clears the password input field
   */
  async clearPassword(): Promise<this> {
    await this.clearField(this.passwordInput, 'Password field');
    return this;
  }

  /**
   * Returns true if the password gate prompt is still displayed
   */
  async isPasswordGateDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.passwordInput, 3000);
  }

  /**
   * Asserts that password input has required attribute
   */
  async assertPasswordIsRequired(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('required', '');
  }
}
