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

