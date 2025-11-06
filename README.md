# PlayWrightMCP — README

[![Playwright Allure CI](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright-allure.yml/badge.svg)](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright-allure.yml)
[![Playwright CI](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright.yml/badge.svg)](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright.yml)

This repository contains Playwright tests (JavaScript) and Page Object Model classes for the Sauce Demo site, plus Allure reporting configuration and scripts.

> Note about fonts: GitHub renders README.md with GitHub's default fonts and sanitizes inline styles — it's not possible to reliably embed custom web fonts. This README focuses on clean structure, readable headings and code blocks which display well across viewers.

## Web test context (canonical)

You are a Playwright test generator that writes JavaScript tests using `@playwright/test`.

Guidelines:
- You will be given a scenario and must generate a Playwright test implementing it.
- Do not produce code from the scenario alone. Instead, run every step one-by-one using the Playwright MCP tools and capture the message history of actions taken.
- Only after all steps are completed, emit the final Playwright JavaScript test file that uses `@playwright/test`.
- Save generated test files under the `tests/` directory.
- Execute the generated test(s) and iterate until all tests pass.

## Scenario & deliverables (clear checklist)

Task: create an end-to-end Playwright test (JavaScript) for Sauce Demo and set up reporting.

Requirements:
1. Page Object Model
  - Create separate page classes/files (for example: `LoginPage`, `InventoryPage`, `CartPage`).
2. Login
  - Navigate to: `https://www.saucedemo.com/`
  - Username: `standard_user`
  - Password: `secret_sauce`
3. Inventory actions
  - Add every item on the inventory page to the cart.
  - Record the title of each product added.
4. Cart verification
  - Navigate to: `https://www.saucedemo.com/cart.html`
  - Verify the number of items matches what was added.
  - Verify the cart contains the same product titles (order-insensitive comparison allowed).
5. Reporting
  - Install and configure Allure reporting (e.g., `allure-playwright`).
  - Ensure running tests produces `allure-results/`.
  - Provide commands or npm scripts to generate and open the HTML Allure report.
6. Deliverables
  - Page object files under `src/pages/` (or a similar structure).
  - Playwright test file under `tests/`.
  - `playwright.config.js` updated to include the Allure reporter.
  - `package.json` scripts for running tests and generating/opening the Allure report (for example: `test`, `test:allure`, `allure:open`).
  - Update `README.md` documenting the web test context, the scenario, run commands, and how to generate/open the Allure report.
7. Validation
  - Run the tests locally and iterate until they pass.
  - Commit code and include brief notes in the README describing validation and report generation.

## What I added / changed

- Page object classes (under `src/pages/`):
  - `LoginPage.js` — provides `goto()` and `login(user, pass)` methods.
  - `InventoryPage.js` — provides `addAllToCart()` which clicks Add-to-cart for every visible item and returns an array of titles, plus `gotoCart()`.
  - `CartPage.js` — provides `getCartItemTitles()` to read product titles from the cart.

- Test file:
  - `tests/saucedemo.spec.js` — uses the POM classes, logs in, adds all inventory items to the cart, collects titles, navigates to the cart and verifies the item count and set of titles.

- Playwright config:
  - `playwright.config.js` — reporter updated to use both the HTML reporter and the Allure reporter:
    ```js
    reporter: [ ['html'], ['allure-playwright'] ],
    ```

- Package changes (`package.json`):
  - Added dev dependencies: `allure-playwright` and `allure-commandline` (upgraded to latest).
  - Added convenience npm scripts:
    - `test` — runs Playwright tests (`playwright test`).
    - `allure:generate` — generate Allure HTML report from `allure-results` to `allure-report`.
    - `allure:open` — open the generated Allure report.
    - `test:allure` — run tests and then generate the Allure report in one command.

    ### Files of interest

    - `src/pages/LoginPage.js` — POM for login page
    - `src/pages/InventoryPage.js` — POM for inventory operations
    - `src/pages/CartPage.js` — POM for cart operations
    - `tests/saucedemo.spec.js` — main test exercising the scenario
    - `playwright.config.js` — Playwright configuration (reporters, projects)
    - `package.json` — scripts and devDependencies (includes allure packages)
    - `README.md` — this document

## Commands I ran here (for reproducibility)

Install Allure packages (dev deps):

```bash
npm i -D allure-playwright allure-commandline@latest
```

Run the Playwright tests (this produces `allure-results/` when `allure-playwright` reporter is active):

```bash
npx playwright test --workers=1
```

Generate the Allure report (HTML output in `./allure-report`):

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the report (serves it locally and opens browser):

```bash
npm run allure:open
```

Or use the convenience script added to `package.json`:

```bash
npm run test:allure
```

## Where artifacts are

- Raw Allure result files: `./allure-results`
- Generated Allure HTML report: `./allure-report`

## Examples

- Run the test suite locally:

```bash
npm ci
npx playwright install --with-deps
npm run test
```

- Generate and open the Allure report:

```bash
npm run test:allure
npm run allure:open
```

- Preview custom fonts locally (this won't change GitHub's README font):

Open `docs/preview.html` in your browser (double-click or run `open docs/preview.html` on macOS).

## Contributing

See `CONTRIBUTING.md` for guidelines on creating PRs, running tests and generating reports.

## Notes, warnings, and fixes

- While generating the report earlier, there were JSON schema warnings about an `uuid` field. To address that I upgraded `allure-commandline` to the latest version and regenerated the report. After upgrade the CLI generated the report without those warnings.
- The test sorts titles before comparison to avoid order sensitivity.
- Tests were run during development to validate the setup. All created tests passed in my runs.

## Next suggested improvements (optional)

- Add a GitHub Actions workflow to run `npm run test:allure` and publish `allure-report` as an artifact.
- Add metadata to Allure results from tests (labels, severity, test case IDs) using the `allure-playwright` annotations or API.
- Add CI-friendly headless run configuration or containerized test runner if required.

## Contact / Notes

If you want any of the optional improvements implemented (CI, metadata, extra tests), say which one and I'll add it.

---
Generated and added by the automated assistant as requested.
