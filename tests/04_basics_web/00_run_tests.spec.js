import { test, expect } from '@playwright/test';

test('run tests', async ({ page }) => {

  // Navigate to wikipedia
  await page.goto('https://www.wikipedia.org/');
  await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);

    // close browser window - closes the page
    await page.close();

    // How to run this test?
    // npx playwright test tests/04_basics_web/00_run_tests.spec.js
    // by default, tests run in headless mode (without UI) for faster execution and CI environments.

    // Why use npx?
    // npx runs Playwright without needing a global installation, ensuring you use the version specified in your project. It also allows you to run Playwright commands directly from the command line without additional setup.

    // To run tests in headed mode (with browser UI), use the --headed flag:
    // This is useful for debugging and seeing the test execution in real time.
    // npx playwright test tests/04_basics_web/00_run_tests.spec.js --headed
    // or simply
    // npx playwright test tests/04_basics_web/00 --headed

    // How to run tests using npm run test?
    // Add a script in package.json like this:
    // "scripts": {
    //   "test": "playwright test"
    //   "th": "npx playwright test --headed"
    // }
    // Then run:
    // npm run th --tests/04_basics_web/00
    // or simply
    // npm run th --04_basics_web/00
    

});