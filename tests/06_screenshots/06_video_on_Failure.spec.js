const {test, expect} = require('@playwright/test');

test('Take video on failure', async ({page}) => {
    await page.goto('https://www.wikipedia.org/');

    //Enabled video in playwright.config.js as 'retain-on-failure', to capture video automatically if the test fails, it will save it to the test-results directory.
    //use: {
    //     video: 'retain-on-failure', // This will record video only for failed tests and save it to the test-results directory. You can also set it to 'on', 'on-first-retry', or 'only-on-failure'
    //   },
    await expect(page).toHaveTitle(/WIKI/); // This assertion is intentionally incorrect to trigger a failure and capture a video
});

// Run in terminal: npx playwright test tests/06_screenshots/06_video_on_Failure.spec.js --headed