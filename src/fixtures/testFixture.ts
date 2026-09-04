import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { EmployeePage } from '../pages/EmployeePage';
import { ContactPage } from '../pages/ContactPage';
import { FreeEstimatePage } from '../pages/FreeEstimatePage';
import { ProductsPage } from '../pages/ProductsPage';
import { HeaderNav } from '../pages/components/HeaderNav';
import { config } from '../config/environment';

/**
 * Declares the fixture types for all Page Objects in the framework
 */
export interface TestPages {
  homePage: HomePage;
  employeePage: EmployeePage;
  contactPage: ContactPage;
  estimatePage: FreeEstimatePage;
  productsPage: ProductsPage;
  headerNav: HeaderNav;
  appConfig: typeof config;
}

/**
 * Custom Playwright test fixture extending base test with pre-initialized Page Objects.
 * Enables clean, TDD-driven test specifications with automatic dependency injection.
 */
export const test = baseTest.extend<TestPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  estimatePage: async ({ page }, use) => {
    await use(new FreeEstimatePage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  headerNav: async ({ page }, use) => {
    await use(new HeaderNav(page));
  },
  appConfig: async ({}, use) => {
    await use(config);
  },
});

export { expect };
