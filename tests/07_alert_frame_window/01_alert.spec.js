import { test, expect } from '@playwright/test';
import path from 'path';

test.skip('Alerts example1', async ({ page }) => {

    const url = path.join(__dirname, '..', '..', 'files', 'SamplePage.html');
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/Wallchart/);

    await page.waitForTimeout(1000);

    // page.on(eventName, callback);   // syntax
    page.on('dialog', async dialogParam => {
        console.log("Dialog type: ", dialogParam.type()); // simple, confirm, prompt
        console.log("Dialog Message: ", dialogParam.message());
        await page.waitForTimeout(4000);    
        await dialogParam.accept(); // accept() for OK, dismiss() for Cancel
    });

    await page.dblclick('#salert'); // trigger simple alert
    console.log("Event handled for simple alert");
    await page.waitForTimeout(1000);

    await page.dblclick('#calert'); // trigger confirm alert
    console.log("Event handled for confirm alert");

    await page.dblclick('#palert'); // trigger prompt alert
    console.log("you entered: ", await page.locator("#inputname").textContent());
    console.log("Event handled for prompt alert");

    await page.close();
});


test.skip('Alerts example2', async ({ page }) => {

    const url = path.join(__dirname, '..', '..', 'files', 'SamplePage.html');
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/Wallchart/);

    await page.waitForTimeout(3000);

    page.on('dialog', async dialog => {
        console.log("Dialog type: ", dialog.type()); 
        console.log("Dialog message: ", dialog.message()); 
        
        await page.waitForTimeout(4000);

        if(dialog.type() === 'alert')
        {
             await dialog.accept(); 
        } else if (dialog.type() === 'confirm')
        {
            await dialog.dismiss(); 
        } else if (dialog.type() === 'prompt')
        {
            await dialog.accept("Virat Kohli");
        } 
        
    });

    await page.dblclick('#salert'); // trigger simple alert
    console.log("Event handled for simple alert");
    
    await page.dblclick('#calert'); // trigger confirm alert
    console.log("Event handled for confirm alert");

    await page.dblclick('#palert'); // trigger confirm alert
    console.log("you entered: ", await page.locator("#inputname").textContent());
    console.log("Event handled for prompt alert");


    await page.close();

});


test('Alerts example3', async ({ page }) => {

    const url = path.join(__dirname, '..', '..', 'files', 'SamplePage.html');
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    await expect(page).toHaveTitle(/Wallchart/);

    await page.waitForTimeout(3000);

    page.once('dialog', async dialog => {
        console.log("Dialog type: ", dialog.type()); 
        console.log("Dialog message: ", dialog.message()); 
        
        await page.waitForTimeout(4000);

        await dialog.accept();
    });
    await page.dblclick('#salert'); // trigger simple alert
    console.log("Event handled for simple alert");
    
    // ----------------------------------------------
    
    page.once('dialog', async dialog => {
        console.log("Dialog type: ", dialog.type()); 
        console.log("Dialog message: ", dialog.message()); 
        
        await page.waitForTimeout(4000);

        await dialog.dismiss();
    });
    await page.dblclick('#calert'); // trigger confirm alert
    console.log("Event handled for confirm alert");
    
    // ----------------------------------------------
    
    page.once('dialog', async dialog => {
        console.log("Dialog type: ", dialog.type()); 
        console.log("Dialog message: ", dialog.message()); 
        
        await page.waitForTimeout(4000);

        await dialog.accept("Virat Kohli");
    });

    await page.dblclick('#palert'); // trigger confirm alert
    console.log("you entered: ", await page.locator("#inputname").textContent());
    console.log("Event handled for prompt alert");


    await page.close();

});

//how to run this test in headed mode?
//npx playwright test tests/07_alert_frame_window/01_alert.spec.js --headed