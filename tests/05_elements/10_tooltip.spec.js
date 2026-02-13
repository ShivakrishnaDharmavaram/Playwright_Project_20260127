import { test, expect } from '@playwright/test';

test('Tooltip Display and Hide Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#18-tooltip";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate elements
    const tooltipBtn = page.locator('#tooltipBtn');
    const tooltipText = page.locator('#tooltipText');
    const tooltipMsg = page.locator('#tooltipMsg');

    // Hover over button to display tooltip
    await tooltipBtn.hover();
    console.log('Hovered over Tooltip button');

    // Validate tooltip is visible
    await expect(tooltipText).toBeVisible();
    console.log('Tooltip text is visible');

    // Validate message after tooltip displayed
    const displayedMsg = await tooltipMsg.textContent();
    console.log('Message after hover:', displayedMsg.trim());
    expect(displayedMsg.trim()).toContain('Tooltip displayed');

    await page.waitForTimeout(2000);

    // Move mouse away to hide tooltip
    await page.mouse.move(0, 0);
    console.log('Moved mouse away to hide tooltip');

    // Validate tooltip is hidden
    await expect(tooltipText).toBeHidden();
    console.log('Tooltip text is hidden');

    // Validate message after tooltip hidden
    const hiddenMsg = await tooltipMsg.textContent();
    console.log('Message after hiding tooltip:', hiddenMsg.trim());
    expect(hiddenMsg.trim()).toContain('Tooltip hidden');

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});
