import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/environment';

/**
 * World-class Playwright configuration reading centralized settings
 * from src/config/environment.ts
 *
 * See https://playwright.dev/docs/test-configuration
 */
const getBrowserProjects = () => {
  const projects = [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ];

  if (config.browserName === 'all') {
    return projects;
  }

  // Filter project based on browserName from config
  const matched = projects.find((p) => p.name === config.browserName);
  return matched ? [matched] : projects;
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: config.retries,
  workers: config.workers,
  timeout: config.timeout,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
  ],
  use: {
    baseURL: config.baseUrl,
    headless: config.headless,
    navigationTimeout: config.navigationTimeout,
    actionTimeout: 15000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: getBrowserProjects(),
});
