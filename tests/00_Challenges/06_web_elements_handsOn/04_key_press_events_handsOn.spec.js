import {test, expect} from '@playwright/test';

test('Key Press Events Example', async ({page}) => {
    const url = "https://the-internet.herokuapp.com/key_presses";
    await page.goto(url);
    await page.setViewportSize({width: 1024, height: 768});
    await expect(page).toHaveTitle(/The Internet/i);

    const inputField = page.locator('#target');
    const resultText = page.locator('#result');

    //Press a key (e.g., 'A') in the input field
    await inputField.press('A');
    console.log("Pressed key: A");

    //Validate the result
    const result = await resultText.textContent();
    console.log("Result text: ", result.trim());
    expect(result.trim()).toBe('You entered: A');

    //Press backspace key
    await inputField.press('Backspace');
    console.log("Pressed key: Backspace");

    //Validate the result after pressing backspace
    const resultAfterBackspace = await resultText.textContent();
    console.log("Result text after backspace: ", resultAfterBackspace.trim());
    expect(resultAfterBackspace.trim()).toBe('You entered: BACK_SPACE');

    await page.close();
    console.log("Page closed");
});

//Dated: 2024-06-17

//Run in terminal: npx playwright test tests/00_Challenges/06_web_elements_handsOn/04_key_press_events_handsOn.spec.js --headed
