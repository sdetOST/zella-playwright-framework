import { test, expect } from '../../src/fixtures/testFixture';

test.describe('Global Navigation - Cross-Page Routing & Header (TDD)', () => {
  test.beforeEach(async ({ homePage }) => {
    // ARRANGE: Start at Home Page
    await homePage.open();
  });

  test('TC-NAV-001: should display Home hero banner and CTAs', {
    tag: '@smoke',
  }, async ({ homePage }) => {
    // ASSERT: Verify Hero section
    await expect(homePage.heroHeading).toBeVisible();
    await expect(homePage.getStartedButton).toBeVisible();
    await expect(homePage.learnMoreButton).toBeVisible();
  });

  test('TC-NAV-002: should navigate to Contact page via "Get Started" hero CTA', {
    tag: '@smoke',
  }, async ({ homePage }) => {
    // ACT: Click Get Started (which opens contact page)
    const newPage = await homePage.clickGetStarted();

    // ASSERT
    expect(newPage.url()).toContain('/contact');
    await expect(newPage.locator('h1')).toBeVisible();
    await newPage.close();
  });

  test('TC-NAV-003: should navigate to Blinds & Shades via "Learn More" hero CTA', {
    tag: '@smoke',
  }, async ({ homePage }) => {
    // ACT: Click Learn More (which opens blinds-shades page)
    const newPage = await homePage.clickLearnMore();

    // ASSERT
    expect(newPage.url()).toContain('/blinds-shades');
    await expect(newPage.locator('h1').first()).toBeVisible();
    await newPage.close();
  });

  test('TC-NAV-004: should navigate to Services page via header nav menu', {
    tag: '@smoke',
  }, async ({ headerNav, page }) => {
    // ACT
    await headerNav.clickServices();

    // ASSERT
    await page.waitForURL('**/services');
    expect(page.url()).toContain('/services');
  });

  test('TC-NAV-005: should navigate to Free Estimate page via header nav menu', {
    tag: '@smoke',
  }, async ({ headerNav, estimatePage, page }) => {
    // ACT
    await headerNav.clickFreeEstimate();

    // ASSERT
    await page.waitForURL('**/free-estimate');
    await expect(estimatePage.heading).toBeVisible();
  });
});
