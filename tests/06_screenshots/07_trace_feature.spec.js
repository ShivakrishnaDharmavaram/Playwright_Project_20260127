const {test, expect} = require('@playwright/test');
const {fail } = require('assert');

test('Trace Feature Test', async ({page}, testInfo) => {

    const playerName = "Sachin Tendulkar";
    await page.goto('https://www.wikipedia.org/');
    await expect(page).toHaveTitle(/Wikipedia/i);

    const searchBox = page.getByRole('searchbox', {name: 'search'});
    await searchBox.fill(playerName);
    await page.getByRole('button', {name: 'Search'}).click();

    //Validate that the heading contains the search text
    await expect(page.locator('#firstHeading')).toContainText(playerName);
    // Intentionally fail the test to capture trace
    fail("Intentional failure to capture trace");
});

// use :{
//     trace: 'retain-on-failure', // This will capture trace for all tests. You can also set it to 'on-first-retry' or 'on'
//   },

// Run in terminal: npx playwright test tests/06_screenshots/07_trace_feature.spec.js --headed


// Note: To view the trace, after running the test, go to the test-results directory and open the trace file with the Playwright Trace Viewer. You can do this by running the command: npx playwright show-trace <trace-file-path>

// Trace feature captures a detailed log of the test execution, including screenshots, DOM snapshots, console logs, and network activity. This allows you to analyze the test run and identify the root cause of failures effectively.
// In this example, we intentionally fail the test after performing some actions on the Wikipedia page. When the test fails, Playwright will capture the trace and save it to the test-results directory. You can then open the trace file with the Playwright Trace Viewer to analyze the test execution and understand why it failed.
// Note: The trace will only be captured for the failed test, and it will be saved in the test-results directory with a unique name. You can open the trace file using the Playwright Trace Viewer to analyze the test execution and identify the root cause of the failure.
// You can also configure the trace option to capture traces for all tests or only on the first retry, depending on your needs.