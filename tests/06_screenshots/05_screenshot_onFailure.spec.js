const {test, expect} = require('@playwright/test');

test('Take screenshot on failure', async ({page}) => {
    await page.goto('https://www.wikipedia.org/');

    //Enabled screenshot in playwright.config.js as 'only-on-failure', to capture screenshot automatically if the test fails, it will save it to the test-results directory.
    await expect(page).toHaveTitle(/WIKI/); // This assertion is intentionally incorrect to trigger a failure and capture a screenshot
});

//Run in terminal: npx playwright test tests/06_screenshots/05_screenshot_onFailure.spec.js --headed