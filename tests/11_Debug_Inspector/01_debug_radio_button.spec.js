import {test, expect} from '@playwright/test';

test('Radio Button Selection with Message Validation', async ({ page }) => {
    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#5-radio";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    // await page.waitForTimeout(3000); // demo purpose

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    // Locate radio buttons and message div
    const maleRadio = page.locator('#maleRadio');
    const femaleRadio = page.locator('#femaleRadio');
    const messageDiv = page.locator('#radioMsg');

    // Validate initial state
    expect(await maleRadio.isChecked()).toBeFalsy();
    expect(await femaleRadio.isChecked()).toBeFalsy();

    //Check male radio button
    if(! await maleRadio.isChecked()) {
        await maleRadio.check();
        console.log('Gender selected: Male');

    } else {
        console.log('Male radio button is already selected');
    }

    // Assert Male radio is checked
    expect(await maleRadio.isChecked()).toBeTruthy();
    expect(await femaleRadio.isChecked()).toBeFalsy();

    // await page.waitForTimeout(4000); // demo purpose

    // Validate message after selecting Male
    const messageAfterMale = await messageDiv.textContent();
    console.log('Message displayed:', messageAfterMale.trim());
    // await expect(messageDiv).toHaveText(/Selected Gender: Male/i);

    //Select Female radio button
    await femaleRadio.check();
    console.log('Selected: Female radio button');// Assert Female radio is checked
    expect(await femaleRadio.isChecked()).toBeTruthy();

    // await page.waitForTimeout(4000); // demo purpose

    // Validate message after selecting Female
    const updatedMessageFemale = await messageDiv.textContent();
    console.log('Message displayed:', updatedMessageFemale.trim());
    expect(updatedMessageFemale.trim()).toBe('Selected Gender: Female');

    await page.close();
}); 

// Notes: - Used check() method to select radio buttons. - Validated the state of radio buttons using isChecked() method. - Validated the message displayed after selection to ensure correct functionality. - To run this test in headed mode, use the command: npx playwright test tests/05_elements/05_radio_button.spec.js --headed - This will allow you to see the browser actions and verify that interactions with radio buttons are working as expected. */

// # Run the test in headed mode to see the browser actions
// npx playwright test tests/11_Debug_Inspector/01_debug_radio_button.spec.js --headed
// npx playwright test 11_Debu.+/01 --headed --debug
