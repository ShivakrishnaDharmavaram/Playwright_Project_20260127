const { test, expect } = require('@playwright/test');

test('Video recording', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');
    await expect(page).toHaveTitle(/Wikipedia/);

    const searchInput = page.getByRole('searchbox', { name: 'search' });
    await searchInput.fill('Playwright');
    await searchInput.press('Enter');

    await page.waitForTimeout(3000); 
    // No manual video path code needed; it's handled by the config!
});


// test('Video recording', async ({ page }, testInfo) => {
//     await page.goto('https://www.wikipedia.org/');
//     await expect(page).toHaveTitle(/Wikipedia/);
//     // Perform some actions on the page (e.g., search for a term)
//     const searchInput = page.getByRole('searchbox', { name: 'search' });
//     await searchInput.fill('Playwright');
//     await searchInput.press('Enter');
//     await page.waitForTimeout(3000); // wait to see the action (debug/ demo purpose)

//     //record video of the test execution - video will be automatically saved in test-results folder after test execution
    

//     // The video will be automatically saved in the test-results folder after the test execution
//     // You can access the video path using testInfo object

//     const videoPath = testInfo.outputPath('wikipedia_test_video.webm');
//     console.log(`Video will be saved at: ${videoPath}`);
    
//     // You can also specify a custom path for the video using testInfo.outputPath() method
//     // const videoPath = testInfo.outputPath('wikipedia_test_video.webm');
//     // console.log(`Video will be saved at: ${videoPath}`);
// });

/*
Notes:
- Playwright automatically records a video of the test execution when running in headed mode.
- The video is saved in the 'test-results' directory with a unique name based on the test title and timestamp.
- To run this test, use the command:
  npx playwright test tests/06_screenshots/03_video.spec.js --headed
- After the test execution, you can find the recorded video in the 'test-results' folder and view it to see the actions performed during the test.
- Video recording is useful for debugging and analyzing test failures, as it provides a visual representation of what happened during the test run.
*/

