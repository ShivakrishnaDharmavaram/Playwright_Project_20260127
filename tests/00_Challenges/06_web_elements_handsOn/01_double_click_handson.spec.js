import {test, expect} from '@playwright/test';

test('Double Click Example', async ({page}) => {
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#23-double-click";
    await page.goto(url);
    await page.setViewportSize({width: 1024, height: 768});
    await expect(page).toHaveTitle(/Playwright/i);

    const button = page.locator('#doubleClickBtn');
    const message = page.locator('#doubleClickMsg');

    //Message before double click
    const initialMessageText = await message.textContent();
    console.log("Initial message text: ", initialMessageText.trim());
    expect(initialMessageText.trim()).toBe('—');

    //Double click the button
    await button.dblclick();
    console.log("Double clicked on the button");

    await page.waitForTimeout(2000); // Wait for the message to update after double click

    //Validate the message
    const messageText = await message.textContent();
    console.log("Message text: ", messageText.trim());
    expect(messageText.trim()).toBe('Button double-clicked');

    await page.close();
    console.log("Page closed");
});

//Dated: 2024-06-17
//Run in terminal: npx playwright test tests/00_Challenges/06_web_elements_handsOn/01_double_click_handson.spec.js --headed