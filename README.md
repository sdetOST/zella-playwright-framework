# 🏆 Zella Blinds - World-Class Playwright TypeScript Automation Framework

An enterprise-grade, Test-Driven Development (TDD) UI automation framework built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern for testing [Zella Blinds](https://zellablinds.com/).

---

## 🌟 Framework Highlights

- **Unified Configuration**: Single centralized environment manager (`src/config/environment.ts` and `playwright.config.ts`) dynamically supporting multi-browser configurations (`chromium`, `firefox`, `webkit`), environment endpoints, credentials, viewports, timeouts, and retries.
- **Page Object Model (POM)**:
  - Strongly typed locators and resilient web-first interactions encapsulated in an extensible `BasePage`.
  - Component objects (`HeaderNav`, `Footer`) separated from view pages (`HomePage`, `EmployeePage`, `ContactPage`, `FreeEstimatePage`, `ProductsPage`).
- **Test-Driven Development (TDD) Architecture**:
  - Test suites designed as executable acceptance specifications using the **Arrange-Act-Assert (AAA)** pattern.
  - Custom Playwright fixture (`src/fixtures/testFixture.ts`) injecting pre-initialized page objects directly into test functions.
- **Flawless Type Safety**: Strict TypeScript compiler configuration with path aliases (`@config`, `@pages`, `@fixtures`, `@data`, `@utils`).
- **Enterprise Reporting & Traceability**:
  - Out-of-the-box HTML report (`playwright show-report`).
  - Automatic screenshots on failure, video recordings, trace on first retry, and formatted console logs.
- **CI/CD Ready**: Fully configured GitHub Actions workflow (`.github/workflows/playwright.yml`).

---

## 📁 Project Architecture

```
zella-playwright-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml            # Automated CI/CD workflow
├── src/
│   ├── config/
│   │   └── environment.ts            # Centralized environment & browser configuration
│   ├── data/
│   │   └── testData.ts               # Test data fixtures, routes, and validation strings
│   ├── fixtures/
│   │   └── testFixture.ts            # Custom Playwright test fixture (test.extend)
│   ├── pages/
│   │   ├── BasePage.ts               # Core base page with resilient automation utilities
│   │   ├── HomePage.ts               # Home page object (Hero, CTA, Testimonials)
│   │   ├── EmployeePage.ts           # Password-protected employee portal gate
│   │   ├── ContactPage.ts            # Contact Us inquiry form & store info
│   │   ├── FreeEstimatePage.ts       # Free estimation form page object
│   │   ├── ProductsPage.ts           # Product catalog (Zebra, Roller, Custom-Print)
│   │   └── components/
│   │       ├── HeaderNav.ts          # Global header navigation component
│   │       └── Footer.ts             # Global footer component
│   └── utils/
│       ├── logger.ts                 # Formatted timestamped step logger
│       └── testHelpers.ts            # Helper methods (random email, phone generator)
├── tests/
│   ├── auth/
│   │   └── employeeAuth.spec.ts      # TDD specs for Employee password gate
│   ├── contact/
│   │   └── contactForm.spec.ts       # TDD specs for Contact form validation & entry
│   ├── estimate/
│   │   └── freeEstimate.spec.ts      # TDD specs for Free Estimate form
│   ├── navigation/
│   │   └── siteNavigation.spec.ts    # TDD specs for Site navigation & links
│   └── products/
│       └── productCatalog.spec.ts    # TDD specs for Product catalog categories
├── .env.example                      # Environment variables template
├── .env.qa                           # QA environment configuration
├── package.json                      # NPM dependencies & test execution scripts
├── playwright.config.ts              # Unified Playwright configuration
├── tsconfig.json                     # Strict TypeScript compiler options
└── README.md                         # Complete framework documentation
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18 or higher recommended; v20 LTS supported)
- npm (v9 or higher)

### 2. Installation

Navigate into the framework root and install dependencies:
```bash
cd zella-playwright-framework
npm install
```

Install the Playwright browser binaries:
```bash
npx playwright install chromium
# Or install all browsers:
# npx playwright install
```

### 3. Environment Variables Setup

Copy `.env.example` to `.env.qa` (already pre-configured with Zella Blinds QA credentials):
```bash
cp .env.example .env.qa
```

Environment variables supported:
| Variable | Description | Default |
| :--- | :--- | :--- |
| `ZELLA_QA_URL` | Base QA URL | `https://zellablinds.com/` |
| `ZELLA_PASSWORD` | Password for protected areas | `NewHartford20@%` |
| `BROWSER` | Browser to run (`chromium`, `firefox`, `webkit`, `all`) | `chromium` |
| `HEADLESS` | Run in headless mode (`true` / `false`) | `true` |
| `DEFAULT_TIMEOUT` | Test timeout in milliseconds | `30000` |
| `NAVIGATION_TIMEOUT` | Navigation timeout in milliseconds | `30000` |

---

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Specific Browsers
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run Tests in Headed Mode (Watch Browser Live)
```bash
npm run test:headed
```

### Run Specific Test Suites
```bash
# Employee Portal Authentication (Password Gate)
npm run test:auth

# Contact Us Form & Validations
npm run test:contact

# Site Navigation & Routing
npm run test:navigation

# Free Estimate Form
npm run test:estimate

# Product Catalog
npm run test:products
```

### Check TypeScript Types
```bash
npm run typecheck
```

### View Test Report
```bash
npm run test:report
```

---

## 📐 Test-Driven Development (TDD) Pattern

Tests in this framework are formulated using the **Arrange, Act, Assert (AAA)** pattern with dependency injection via `testFixture.ts`:

```typescript
import { test, expect } from '../../src/fixtures/testFixture';

test.describe('Feature Acceptance Specification', () => {
  test('should satisfy acceptance criteria', async ({ contactPage, headerNav }) => {
    // 1. ARRANGE
    await contactPage.open();

    // 2. ACT
    await contactPage.fillContactForm({
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '6803162022',
      email: 'jane@example.com',
      message: 'Consultation request'
    });

    // 3. ASSERT
    await expect(contactPage.firstNameInput).toHaveValue('Jane');
    await expect(contactPage.submitButton).toBeVisible();
  });
});
```

---

## 🛠️ CI/CD Integration

The framework includes a GitHub Actions configuration in `.github/workflows/playwright.yml`. It runs automatically on pushes and pull requests to `main`/`master`, installs required dependencies, runs tests across browsers, and publishes artifacts retaining the HTML report for 30 days.
