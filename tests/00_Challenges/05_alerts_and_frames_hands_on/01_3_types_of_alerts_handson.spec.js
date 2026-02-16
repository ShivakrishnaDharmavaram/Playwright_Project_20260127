import { test, expect } from '@playwright/test';

test('Alerts example1', async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/javascript_alerts";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page).toHaveTitle(/The Internet/i);

    // page.on(eventName, callback);   // syntax

    page.once('dialog', async dialogParam => {
        console.log("Dialog type: ", dialogParam.type()); // simple, confirm, prompt
        console.log("Dialog Message: ", dialogParam.message());
        await page.waitForTimeout(4000);
        await dialogParam.accept(); // accept() for OK, dismiss() for Cancel
        await page.locator('#result').waitFor({ state: 'visible' });
        const resultText = await page.locator('#result').textContent();
        console.log("Result after accepting simple alert: ", resultText);
    });

    await page.click('button[onclick="jsAlert()"]'); // trigger simple alert
    console.log("Event handled for simple alert");
    
    //---------------------------------------------------------------------------------------
    // Handle confirm alert 
    page.once('dialog', async dialogParam => {
        console.log("Dialog type: ", dialogParam.type());
        console.log("Dialog Message: ", dialogParam.message());
        await page.waitForTimeout(4000);
        await dialogParam.dismiss(); // dismiss() for Cancel
        await page.locator('#result').waitFor({ state: 'visible' });
        const resultText = await page.locator('#result').textContent();
        console.log("Result after dismissing confirm alert: ", resultText);
    });

    await page.click('button[onclick="jsConfirm()"]'); // trigger confirm alert
    console.log("Event handled for confirm alert");

    //---------------------------------------------------------------------------------------
    // Handle prompt alert
    page.once('dialog', async dialogParam => {
        console.log("Dialog type: ", dialogParam.type());
        console.log("Dialog Message: ", dialogParam.message());
        await page.waitForTimeout(4000);
        await dialogParam.accept('Playwright'); // send input and accept prompt
        // await page.locator('#result').waitFor({ state: 'visible' });
        const resultText = await page.locator('#result').textContent();
        console.log("Result after accepting prompt alert: ", resultText);
    });

    await page.click('button[onclick="jsPrompt()"]'); // trigger prompt alert
    console.log("Event handled for prompt alert");

    await page.close();
});

    // How to run this test in headed mode?
    // Command: npx playwright test tests/00_Challenges/05_alerts_and_frames_hands_on/01_3_types_of_alerts_handson.spec.js --headed

