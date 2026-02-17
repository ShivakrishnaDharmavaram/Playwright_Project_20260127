import { test, expect } from '@playwright/test';

test('Handle new tab', async ({ context, page }) => {
    const url = "https://demoqa.com/";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/demosite/i);

    // Identify Alerts, Frame & Windows card and click on it
    await page.click('div.card-body h5:has-text("Alerts, Frame & Windows")'); // or css like this a[href="/alertsWindows"] div h5 or text selector like this: text=Alerts, Frame & Windows
    await expect(page).toHaveTitle(/demosite/i);
    await expect(page).toHaveURL(/.*alertsWindows/);
    //--------------------------------------------------------------------------
    

    // Identify Browser Windows card and click on it
    await page.click('li#item-0 span:has-text("Browser Windows")');
    await expect(page).toHaveURL(/.*browser-windows/);

    //Click on "New Tab" button and wait for new tab to open
    const [newTab] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page (tab) to open
        page.click('button#tabButton') // Click the button that opens a new tab
    ]);

    // Wait for the new page to load and content
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(/.*sample/); // Validate URL of new tab
    console.log("New Tab title: ", await newTab.title());
    console.log("New Tab URL: ", newTab.url());

    await newTab.waitForTimeout(3000);

    // Validate content in new tab
    const heading = await newTab.locator('h1#sampleHeading').textContent();
    console.log("Heading in new tab: ", heading);
    expect(heading).toBe('This is a sample page');

    await newTab.close(); // Close the new tab
    console.log("New Tab closed, back to original page");

    //switch back to original page and validate title (no separate action needed to switch back in Playwright unlike Selenium)
    //page.bringToFront(); // Not needed, but can be used to ensure original page is in focus
    const originalTitle = await page.title();
    console.log('Original Page Title:', originalTitle);
    
    await page.waitForTimeout(3000);
    await page.close();
});


//Run in terminal: npx playwright test tests/07_alert_frame_window/03_new_tab.spec.js --headed