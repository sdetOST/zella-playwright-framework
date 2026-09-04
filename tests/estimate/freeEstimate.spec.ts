import { test, expect } from '../../src/fixtures/testFixture';
import { TEST_DATA } from '../../src/data/testData';

test.describe('Free Estimate - Estimation Request Form (TDD)', () => {
  test.beforeEach(async ({ estimatePage }) => {
    // ARRANGE: Navigate to Free Estimate page
    await estimatePage.open();
  });

  test('TC-ESTIMATE-001: should display Free Estimate form with all interactive elements', async ({
    estimatePage,
  }) => {
    // ASSERT: Verify form readiness
    await estimatePage.assertFormIsReady();
  });

  test('TC-ESTIMATE-002: should populate estimate request fields accurately', async ({
    estimatePage,
  }) => {
    // ARRANGE
    const estimateData = TEST_DATA.freeEstimateForm.validEstimate;

    // ACT
    await estimatePage.fillEstimateForm(estimateData);

    // ASSERT
    await expect(estimatePage.firstNameInput).toHaveValue(estimateData.firstName);
    await expect(estimatePage.lastNameInput).toHaveValue(estimateData.lastName);
    await expect(estimatePage.phoneInput).toHaveValue(estimateData.phone);
    await expect(estimatePage.emailInput).toHaveValue(estimateData.email);
    await expect(estimatePage.messageTextarea).toHaveValue(estimateData.message);
  });
});
