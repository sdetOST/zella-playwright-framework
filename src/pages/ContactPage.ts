import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message?: string;
}

/**
 * Page Object for Zella Blinds Contact Us Page
 */
export class ContactPage extends BasePage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly fieldRequiredErrors: Locator;

  // Contact Details
  readonly hoursHeading: Locator;
  readonly contactEmail: Locator;
  readonly newYorkPhone: Locator;
  readonly texasPhone: Locator;

  constructor(page: Page) {
    super(page, 'ContactPage');

    this.heading = page.getByRole('heading', { name: /Contact Us/i });
    this.firstNameInput = page.getByPlaceholder(/Enter Your Name/i);
    this.lastNameInput = page.getByPlaceholder(/Enter Your Last Name/i);
    this.phoneInput = page.getByPlaceholder(/Enter Your Phone Number/i);
    this.emailInput = page.getByPlaceholder(/Enter Your Email Address/i);
    this.messageTextarea = page.getByPlaceholder(/Enter your message/i);
    this.submitButton = page.getByRole('button', { name: /Submit/i });
    this.fieldRequiredErrors = page.getByText('This field is required');

    this.hoursHeading = page.getByRole('heading', { name: /Hours Of Operation/i });
    this.contactEmail = page.getByText(/contact@zellablinds.com/i);
    this.newYorkPhone = page.getByText(/\(\s*6\s*8\s*0\s*\)\s*3\s*1\s*6\s*2\s*0\s*2\s*2/);
    this.texasPhone = page.getByText(/\(\s*7\s*1\s*3\s*\)\s*2\s*0\s*8\s*6\s*6\s*2\s*0/);
  }

  /**
   * Opens Contact page and awaits island hydration
   */
  async open(): Promise<this> {
    await this.navigate('/contact');
    await this.waitForPageLoaded();
    await this.page.waitForLoadState('networkidle');
    return this;
  }

  /**
   * Fills contact form fields without submitting
   */
  async fillContactForm(data: ContactFormData): Promise<this> {
    this.logger.step(`Filling contact form for ${data.firstName} ${data.lastName}`);
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
   * Submits complete contact form
   */
  async submitForm(data: ContactFormData): Promise<this> {
    await this.fillContactForm(data);
    await this.submit();
    return this;
  }

  /**
   * Asserts required attributes on mandatory form inputs
   */
  async assertRequiredFields(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
  }
}
