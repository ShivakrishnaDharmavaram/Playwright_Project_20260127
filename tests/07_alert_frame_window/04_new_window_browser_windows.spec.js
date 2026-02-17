import { test, expect } from '@playwright/test';

test('Handle new window', async ({ browser }) => {
    // const url = "https://demoqa.com/";
    // const url ="https://www.lambdatest.com/selenium-playground/window-popup-modal-demo";
    const url = "https://www.wikipedia.org/";
    const context1 = await browser.newContext();
    const page = await context1.newPage();
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/wikipedia/i);
    console.log("Main page URL: ", page.url());

    //---------------------------------------------------------------------------

    const url2 = "https://the-internet.herokuapp.com/";
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.waitForLoadState();

    await page2.goto(url2);
    await page2.setViewportSize({ width: 1024, height: 768 });
    // await page2.waitForTimeout(3000);

    await expect(page2).toHaveTitle(/Internet/i);
    console.log("Second page URL: ", page2.url());

    const heading = await page2.locator('h1').textContent();
    console.log("Heading in second page: ", heading);
    expect(heading).toBe('Welcome to the-internet');


    await page2.waitForTimeout(3000);

    await page2.close();
    console.log("Second page closed, back to original page");

    //---------------------------------------------------------------------------

    //Swith back to the main page
    await page.bringToFront(); // Ensure the original page is in focus-- the main page is active again.
    console.log('Main page URL:', page.url());
    await page.waitForTimeout(3000);

    await page.close();
    console.log("Main page closed");
});

//Run in terminal: npx playwright test tests/07_alert_frame_window/04_new_tab_2.spec.js --headed