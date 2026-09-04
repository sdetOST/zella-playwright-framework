import { test, expect } from '../../src/fixtures/testFixture';
import { TestHelpers } from '../../src/utils/testHelpers';

test.describe('Contact Us - Form Interactions & Validations (TDD)', () => {
  test.beforeEach(async ({ contactPage }) => {
    // ARRANGE: Navigate to Contact page
    await contactPage.open();
  });

  test('TC-CONTACT-001: should load Contact page with heading, form fields, and operational info', {
    tag: '@smoke',
  }, async ({ contactPage }) => {
    // ASSERT: Verify primary elements
    await expect(contactPage.heading).toBeVisible();
    await expect(contactPage.firstNameInput).toBeVisible();
    await expect(contactPage.lastNameInput).toBeVisible();
    await expect(contactPage.phoneInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.submitButton).toBeVisible();

    // Verify operational hours & phone numbers
    await expect(contactPage.hoursHeading).toBeVisible();
    await expect(contactPage.newYorkPhone).toBeVisible();
  });

  test('TC-CONTACT-002: should populate contact form fields with valid customer inquiry data', {
    tag: '@smoke',
  }, async ({ contactPage }) => {
    // ARRANGE
    const uniqueEmail = TestHelpers.generateRandomEmail('zella_qa');
    const formData = {
      firstName: 'Samantha',
      lastName: 'Miller',
      phone: '6803162022',
      email: uniqueEmail,
      message: 'Interested in motorized zebra blinds for 5 windows.',
    };

    // ACT
    await contactPage.fillContactForm(formData);

    // ASSERT
    await expect(contactPage.firstNameInput).toHaveValue(formData.firstName);
    await expect(contactPage.lastNameInput).toHaveValue(formData.lastName);
    await expect(contactPage.phoneInput).toHaveValue(formData.phone);
    await expect(contactPage.emailInput).toHaveValue(formData.email);
    await expect(contactPage.messageTextarea).toHaveValue(formData.message);
  });

  test('TC-CONTACT-003: should display validation errors when required fields are submitted empty', {
    tag: '@smoke',
  }, async ({ contactPage }) => {
    // ACT: Submit blank form
    await contactPage.submit();

    // ASSERT: Form displays "This field is required" error messages for missing mandatory inputs
    await expect(contactPage.fieldRequiredErrors.first()).toBeVisible();
    const count = await contactPage.fieldRequiredErrors.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
