# PlayWrightMCP — README

[![Playwright Allure CI](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright-allure.yml/badge.svg)](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright-allure.yml)
[![Playwright CI](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright.yml/badge.svg)](https://github.com/sharatsathyanarayan/playwrightmcp/actions/workflows/playwright.yml)

This repository contains Playwright tests (JavaScript) and Page Object Model classes for the Sauce Demo site, plus Allure reporting configuration and scripts.

## Web test context (from `testcontext/webtestcontext.txt`)

you are a playwright test generator using javascript
you are given a scenario and you need to generate playwright test for it
DO NOT generate code on scenario alone
Do run every step one by one using the tools provided by playwright MCP
Only after all steps are completed emit the playwright javascript that uses @playwright/test based on message history
save the generated test file under tests directory
execute the test file and iterate until all the tests passes

## User prompts / important requests (history)

1. Generate the Playwright test using JavaScript for the following scenario:
   - Use Page Object Model and generate separate classes
   - Navigate to `https://www.saucedemo.com/` using username `standard_user` and password `secret_sauce`
   - Add to cart all items on the page and keep and note of all the titles added
   - Go to cart page `https://www.saucedemo.com/cart.html` and verify the same products and number of products have been added

2. Add Allure report package and generate Allure report (install, configure, generate, open)

3. Add a README.md file with webtestcontext and the prompts and all the changes.

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
