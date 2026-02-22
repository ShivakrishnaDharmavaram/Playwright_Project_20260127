import { test, expect } from '@playwright/test';
import { fail } from 'node:assert';

// All tests in this file run serially (stop after first failure)
test.describe.configure({ mode: 'serial' });

test.describe('Profile Wizard Flow @serial', () => {
  test('TC01 - Start wizard', async ({ page }) => {
    console.log("step1")
    const url = 'https://demo.playwright.dev/todomvc';
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(url);
    await page.waitForTimeout(200);
    await expect(page).toHaveTitle(/TodoMVC/);
    await page.close();
    // fail("Test failure");
  });

  test('TC03 - Submit and verify', async () => { console.log("step3") });
  test('TC02 - Fill step 2', async () => { console.log("step2") });
});

test.describe('Suite2 @dependsOn', () => {
  test('TC04 - Start wizard', async ({ page }) => {
    console.log("step4")
    const url = 'https://demo.playwright.dev/todomvc';
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(url);
    await page.waitForTimeout(200);
    await expect(page).toHaveTitle(/TodoMVC/);
    await page.close();
    fail("Test failure"); // This will cause the next test to be skipped due to dependency
  });
  test('TC05 - Fill step 2', async () => { console.log("step5") });
});


/*
# Run just this serial suite
npx playwright test --grep '@serial'  tests/09_Grouping/03_serial_flow.spec.js

it will execute in a sequence as it appears
*/