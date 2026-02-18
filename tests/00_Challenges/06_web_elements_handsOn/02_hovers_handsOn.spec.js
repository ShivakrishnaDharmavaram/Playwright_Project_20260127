import {test, expect} from '@playwright/test';

test('Hover over images and verify captions', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await expect(page).toHaveTitle(/The Internet/i);
    const figures = page.locator('.figure');

    for (let i = 0; i < await figures.count(); i++) {
        const figure = figures.nth(i);
        await figure.hover();
        await page.waitForTimeout(500); // Wait for the caption to appear
        const caption = figure.locator('.figcaption');
        await expect(caption).toBeVisible();
        const captionText = await caption.textContent();
        console.log(`Caption for image ${i + 1}: ${captionText.trim()}`);
    }
    //timeout to observe the result before closing the browser
    await page.waitForTimeout(3000);
});


//Dated: 2024-06-17
// run in terminal: npx playwright test tests/00_Challenges/06_web_elements_handsOn/02_hovers_handsOn.spec.js --headed