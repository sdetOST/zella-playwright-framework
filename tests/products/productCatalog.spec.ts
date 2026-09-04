import { test, expect } from '../../src/fixtures/testFixture';

test.describe('Product Catalog - Window Treatments (TDD)', () => {
  test('TC-PROD-001: should navigate to main Blinds & Shades catalog page', async ({
    productsPage,
    page,
  }) => {
    // ACT
    await productsPage.openBlindsAndShades();

    // ASSERT
    await productsPage.assertUrlContains('/blinds-shades');
    await productsPage.assertCatalogLoaded();
  });

  test('TC-PROD-002: should load Zebra Blinds product category', async ({
    productsPage,
    page,
  }) => {
    // ACT
    await productsPage.openZebra();

    // ASSERT
    await productsPage.assertUrlContains('/zebra');
    await expect(page).toHaveTitle(/Zella Blinds/i);
  });

  test('TC-PROD-003: should load Roller Blinds product category', async ({
    productsPage,
    page,
  }) => {
    // ACT
    await productsPage.openRoller();

    // ASSERT
    await productsPage.assertUrlContains('/roller');
    await expect(page).toHaveTitle(/Zella Blinds/i);
  });

  test('TC-PROD-004: should load Custom-Print Blinds product category', async ({
    productsPage,
    page,
  }) => {
    // ACT
    await productsPage.openCustomPrint();

    // ASSERT
    await productsPage.assertUrlContains('/custom-print');
    await expect(page).toHaveTitle(/Zella Blinds/i);
  });
});
