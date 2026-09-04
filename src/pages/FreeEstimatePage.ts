import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ContactFormData } from './ContactPage';

/**
 * Page Object for Zella Blinds Free Estimate Page
 */
export class FreeEstimatePage extends BasePage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, 'FreeEstimatePage');

    this.heading = page.getByRole('heading', { name: /Request Free Estimation/i });
    this.firstNameInput = page.getByPlaceholder(/Enter Your Name/i);
    this.lastNameInput = page.getByPlaceholder(/Enter Your Last Name/i);
    this.phoneInput = page.getByPlaceholder(/Enter Your Phone Number/i);
    this.emailInput = page.getByPlaceholder(/Enter Your Email Address/i);
    this.messageTextarea = page.getByPlaceholder(/Enter your message/i);
    this.submitButton = page.getByRole('button', { name: /Submit/i });
  }

  /**
   * Opens Free Estimate page and awaits island hydration
   */
  async open(): Promise<this> {
    await this.navigate('/free-estimate');
    await this.waitForPageLoaded();
    await this.page.waitForLoadState('networkidle');
    return this;
  }

  /**
   * Fills estimate form fields
   */
  async fillEstimateForm(data: ContactFormData): Promise<this> {
    this.logger.step(`Filling estimate form for ${data.firstName} ${data.lastName}`);
    await this.fillField(this.firstNameInput, data.firstName, 'First Name');
    await this.fillField(this.lastNameInput, data.lastName, 'Last Name');
    await this.fillField(this.phoneInput, data.phone, 'Phone Number');
    await this.fillField(this.emailInput, data.email, 'Email Address');
    if (data.message) {
      await this.fillField(this.messageTextarea, data.message, 'Message');
    }
    return this;
  }

  /**
   * Clicks Submit button
   */
  async submit(): Promise<this> {
    await this.clickElement(this.submitButton, 'Submit button');
    return this;
  }

  /**
   * Asserts all input fields are visible and interactable
   */
  async assertFormIsReady(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
