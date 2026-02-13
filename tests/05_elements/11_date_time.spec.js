import { test, expect } from '@playwright/test';

test('Date, Time, DateTime, Month, and Week Input Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#10-datetime";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Locators for inputs and message
    const dateInput = page.locator('#dateField');
    const timeInput = page.locator('#timeField');
    const dateTimeInput = page.locator('#datetimeField');
    const monthInput = page.locator('#monthField');
    const weekInput = page.locator('#weekField');
    const messageDiv = page.locator('#dateTimeMsg');

    // Input values for demo
    const dateValue = '2026-02-13';            // YYYY-MM-DD
    const timeValue = '10:30';                 // HH:MM
    const dateTimeValue = '2026-02-13T10:30';  // YYYY-MM-DDTHH:MM
    const monthValue = '2026-02';              // YYYY-MM
    const weekValue = '2026-W07';              // YYYY-W##

    // Fill date
    await dateInput.fill(dateValue);
    console.log(`Entered Date: ${dateValue}`);

    // Fill time
    await timeInput.fill(timeValue);
    console.log(`Entered Time: ${timeValue}`);

    // Fill date & time
    await dateTimeInput.fill(dateTimeValue);
    console.log(`Entered DateTime: ${dateTimeValue}`);

    // Fill month
    await monthInput.fill(monthValue);
    console.log(`Entered Month: ${monthValue}`);

    // Fill week
    await weekInput.fill(weekValue);
    console.log(`Entered Week: ${weekValue}`);

    await page.waitForTimeout(2000);

    // Validate message after inputs
    const messageText = await messageDiv.textContent();
    console.log('Message displayed:', messageText.trim());
    expect(messageText.trim()).toContain(`Date: ${dateValue}`);
    expect(messageText.trim()).toContain(`Time: ${timeValue}`);
    expect(messageText.trim()).toContain(`DateTime: ${dateTimeValue}`);
    expect(messageText.trim()).toContain(`Month: ${monthValue}`);
    expect(messageText.trim()).toContain(`Week: ${weekValue}`);

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});