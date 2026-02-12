import {test, expect} from '@playwright/test';

test('Shadow DOM Button Test', async ({ page }) => {
    // Navigate to the page with Shadow DOM
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#17-shadow";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000); // demo purpose

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    // Locate the shadow host element
    const shadowHost = page.locator('#shadowHost');
    await expect(shadowHost).toBeVisible();

    // Access the shadow root and locate the button inside it
    const shadowButton = shadowHost.locator('button');
    await expect(shadowButton).toBeVisible();

    // Click the button inside the shadow DOM
    await shadowButton.click();
    console.log('Clicked the button inside Shadow DOM');
    await page.waitForTimeout(2000); // demo purpose

    // // There is no need to switch context for Shadow DOM in Playwright, as it handles it seamlessly with the locator API. We can directly interact with elements inside Shadow DOM using the same locator methods.
    // const shadowButton1 =page.locator('button#shadowButton');
    // await shadowButton1.click();
    // console.log('Clicked the button inside Shadow DOM directly using locator');

    // Validate the message displayed after clicking the button
    const messageDiv = page.locator('#shadowMsg');
    await expect(messageDiv).toHaveText('Shadow DOM button clicked');
    console.log('Validated the message after clicking the button');


    await page.close();
});

/*
Notes:
- Shadow DOM allows encapsulation of elements, making them inaccessible through regular DOM selectors.
- Playwright provides built-in support to interact with elements inside Shadow DOM using the locator API.
- In this test, we first locate the shadow host and then directly locate the button inside it without needing special handling for Shadow DOM.
- After clicking the button, we validate that the expected message is displayed, confirming that the interaction was successful.
- To run this test in headed mode, use the command:
  npx playwright test tests/05_elements/07_shadow_DOM_button.spec.js --headed
- This will allow you to see the browser actions and verify that interactions with Shadow DOM are working as expected.
*/