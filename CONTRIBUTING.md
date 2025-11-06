# Contributing to PlayWrightMCP

Thanks for considering contributing! This document explains the preferred workflow for changes, tests and pull requests.

## Quick start

1. Fork the repository and clone your fork.
2. Create a feature branch:

```bash
git checkout -b feat/my-feature
```

3. Make your changes, add tests where appropriate, and run the test suite locally:

```bash
npm ci
npx playwright install --with-deps
npm run test
```

4. If your change affects test reporting, generate the Allure report locally:

```bash
npm run test:allure
npx allure open allure-report
```

5. Commit and push your branch and open a Pull Request against `main`.

## Coding guidelines

- Use the project's existing code style. Keep JavaScript files ES modules (import/export) as used in the repo.
- Small, focused commits with clear messages are preferred.
- Add or update tests for new behavior.

## Tests and reporting

- Tests use `@playwright/test`. Run them with `npm run test` (or `npx playwright test`).
- Allure reporting is set up (via `allure-playwright`). Use `npm run test:allure` to run tests and generate a report in `allure-report/`.

## Issue and PR templates

If you add or modify workflow behaviour, please document changes in the PR description and ensure the CI workflows pass.

## Code of conduct

Please be respectful in comments and PR discussions. This project follows the standard open-source community norms.
