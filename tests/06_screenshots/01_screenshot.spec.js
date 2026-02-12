import { test, expect } from '@playwright/test';

test('Screenshot test', async ({ page }) => {

  // Navigate to wikipedia
  await page.goto('https://www.wikipedia.org/');
  await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);

    // Take a screenshot of the entire page
    await page.screenshot({ path: 'screenshots/wikipedia.png' });

    // Take a screenshot of a specific element (e.g., the search input)
    const searchInput = page.locator('input[name="search"]');
    await searchInput.screenshot({ path: 'screenshots/search_input.png' });

    // close browser window - closes the page
    await page.close(); 
});

/*
Notes:
- Screenshots are saved in the 'screenshots' directory with specified filenames.
- The first screenshot captures the entire page, while the second captures only the search input element.
- Ensure the 'screenshots' directory exists or Playwright will throw an error.
- Screenshots are useful for debugging, visual validation, and reporting test results.
- To run this test, use the command:
  npx playwright test tests/06_screenshots/01_screenshot.spec.js --headed
- This will allow you to see the browser actions and verify that screenshots are taken correctly.
- You can also view the screenshots after the test execution to confirm they were captured as expected.
*/

