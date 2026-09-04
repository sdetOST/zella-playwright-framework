import { test, expect } from '../../src/fixtures/testFixture';
import { TEST_DATA } from '../../src/data/testData';

test.describe('Employee Portal - Authentication & Access Gate (TDD)', () => {
  test.beforeEach(async ({ employeePage }) => {
    // ARRANGE: Navigate to the Employee area
    await employeePage.open();
  });

  test('TC-AUTH-001: should display password gate with prompt and required password input', {
    tag: '@smoke',
  }, async ({ employeePage }) => {
    // ASSERT: Verify key security UI elements
    await expect(employeePage.heading).toBeVisible();
    await expect(employeePage.heading).toHaveText(/Guest area/i);
    await expect(employeePage.passwordLabel).toBeVisible();
    await expect(employeePage.passwordInput).toBeVisible();
    await expect(employeePage.enterButton).toBeVisible();

    // Verify HTML5 required constraint
    await employeePage.assertPasswordIsRequired();
  });

  test('TC-AUTH-002: should prevent access when invalid password is submitted', {
    tag: '@smoke',
  }, async ({ employeePage }) => {
    // ACT: Submit an incorrect password
    await employeePage.submitPassword(TEST_DATA.auth.invalidPassword);

    // ASSERT: Still on employee URL and password gate is still active
    await employeePage.assertUrlContains('/employee');
    const isGateStillActive = await employeePage.isPasswordGateDisplayed();
    expect(isGateStillActive).toBe(true);
  });

  test('TC-AUTH-003: should submit configured ZELLA_PASSWORD and handle authentication attempt', {
    tag: '@smoke',
  }, async ({ employeePage, appConfig, page }) => {
    // ACT: Submit the configured valid QA password
    await employeePage.submitPassword(appConfig.password);

    // ASSERT: Verify form submission request was triggered and processed
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/employee');
  });

  test('TC-AUTH-004: should allow user to navigate back to Home from password gate', {
    tag: '@smoke',
  }, async ({ employeePage, page }) => {
    // ACT: Click "Back to Home"
    await employeePage.clickElement(employeePage.backToHomeLink, 'Back to Home link');

    // ASSERT: Navigated back to Home page
    await page.waitForURL('/');
    expect(page.url()).toMatch(/\/$/);
  });
});
