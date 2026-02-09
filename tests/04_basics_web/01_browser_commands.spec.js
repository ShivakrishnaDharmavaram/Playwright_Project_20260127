import { test, expect } from '@playwright/test';

test('browser commands', async ({ page }) => {

  await page.goto('https://www.wikipedia.org/');
  await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wikipedia/);

//   Navigate to herokuapp
    await page.goto('https://the-internet.herokuapp.com/');
    // await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)

    // Go back to previous page
    await page.goBack();
    await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)  

    // Go forward to next page
    await page.goForward();
    await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)

    // Reload the current page
    await page.reload();
    await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)   

    // retrieve current URL
    const currentURL = page.url();
    console.log('Current URL is: ' + currentURL);

    // retrieve page content
    const pageContent = await page.content();
    console.log('Page content length: ' + pageContent.length);

    // retrieve window handle - not directly available in Playwright
    // but we can retrieve the page object which represents a single tab or window
    console.log('Page object: ' + page);

    // minimize browser window - not directly available in Playwright
    // but we can set viewport size to a small value to simulate minimized window
    await page.setViewportSize({ width: 300, height: 200 });
    await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)

    // resize browser window - set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)

    // close browser window - closes the page
    // await page.close();
    //Even I am not closing the window, the test will end and the browser will close automatically. So no need to explicitly close the page or browser in most cases.
});
