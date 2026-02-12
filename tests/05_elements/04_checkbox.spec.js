import { test, expect } from '@playwright/test';

test('Checkbox Check/Uncheck with Message Validation', async ({ page }) => {
    //Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#6-checkbox";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);    

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);
    // ------------------------------------

    // Locate checkbox and message elements
    const subscribeChk = page.locator('#subscribeChk');
    const agreeChk = page.locator('#agreeChk');
    const messageDiv = page.locator('#checkboxMsg');

    // // Validate initial state
    // await expect(subscribeChk).not.toBeChecked();
    // await expect(agreeChk).not.toBeChecked();
    // await expect(messageDiv).toHaveText(''); // No message initially

    expect(await subscribeChk.isChecked()).toBeFalsy();
    expect(await agreeChk.isChecked()).toBeFalsy();


    // implementing if condition to check subscribe checkbox is checked or not
    if (await subscribeChk.isChecked()) {
        console.log('Subscribe checkbox is already checked');
    } else {
        await subscribeChk.check();
        console.log('Checked: Subscribe checkbox');
    }
    // //Check both checkboxes
    // await subscribeChk.check();
    // console.log('Checked: Subscribe checkbox');
    await agreeChk.check();
    console.log('Checked: Agree checkbox');

    //Assert both are checked
    expect(await subscribeChk.isChecked()).toBeTruthy();
    expect(await agreeChk.isChecked()).toBeTruthy();

    await page.waitForTimeout(2000); // demo purpose

    // Validate message after checking
    const messageText = await messageDiv.textContent();
    console.log('Message displayed:', messageText.trim());
    expect(messageText.trim()).toBe('Checked: Subscribe, Agree');

    // Uncheck one checkbox
    await subscribeChk.uncheck();
    console.log('Unchecked: Subscribe checkbox');

    // Assert states after unchecking
    expect(await subscribeChk.isChecked()).toBeFalsy();
    expect(await agreeChk.isChecked()).toBeTruthy();

    await page.waitForTimeout(2000); // demo purpose

    // Validate message after unchecking
    const updatedMessageText = await messageDiv.textContent();
    console.log('Updated message displayed:', updatedMessageText.trim());
    expect(updatedMessageText.trim()).toBe('Checked: Agree');

    // -------------------------------------
    await page.waitForTimeout(3000);
    await page.close();
});

/*
Notes:
- Used check() and uncheck() for checkbox interactions.
- Validated checkbox states using isChecked() method.
- Validated dynamic message content based on checkbox states.
- Added console logs for clarity on actions performed and messages displayed.
- Used waitForTimeout() for demonstration purposes to observe changes.
Assignments:
- Implement similar test for radio buttons and validate messages.
- Add negative test case where message should not appear if no checkboxes are checked.
- Explore using test.step() to group related actions and assertions for better reporting.
Quiz:
Q1. How do you check if a checkbox is checked in Playwright?
A. Use the isChecked() method on the checkbox locator to return a boolean indicating its state.
*/