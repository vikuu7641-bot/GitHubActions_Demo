# Amazon Playwright Automation Assignment

This project demonstrates a Playwright-based end-to-end validation for Amazon shopping flow using the Page Object Model (POM).

## Features
- Search, select product, and add to cart
- Validate cart content and quantity changes
- Stop before final order placement to comply with the assignment requirement
- Uses Playwright HTML report and failure screenshots/video/trace
- Reusable page objects for maintainability

## Project structure
- `pages/` — reusable page objects
- `tests/` — Playwright test specs
- `TestData/` — static test data
- `playwright.config.ts` — Playwright configuration
- `package.json` — project scripts and dependencies

## Setup
1. Install Node.js 18+
2. In the project folder, run:
   npm install

## Run tests
- Full suite:
  npm test

- Headed mode:
  npm run test:headed

- Show HTML report:
  npm run report

## Important note
This assignment intentionally does not place any real order. If Amazon shows a CAPTCHA, OTP, or verification prompt, the test stops before checkout completion instead of bypassing Amazon security checks.
