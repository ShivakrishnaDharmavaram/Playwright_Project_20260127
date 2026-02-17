import {test, expect} from '@playwright/test';

test('Modal Open, Validate and Close Example', async ({page}) => {
    //const url = "https://www.lambdatest.com/selenium-playground/window-popup-modal-demo";
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#16-modal";
    await page.goto(url);
    await page.setViewportSize({width: 1024, height: 768});
    //validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    //---------------------------------------------------------------------------

    //Locate modal open button and modal elements
    const openModalButton = page.locator('#openModalBtn');
    const modal = page.locator('#sampleModal');
    const modalHeader = modal.locator('#modalTitle');
    const modalCloseBtn = modal.locator('.closeModal');

    //Click the button to open the modal
    await openModalButton.click();
    console.log("Clicked on Open Modal button");

    //Wait for the modal to be visible
    await expect(modal).toBeVisible();
    console.log("Modal is visible");

    //Validate modal header text
    const headerText = await modalHeader.textContent();
    console.log("Modal header text: ", headerText.trim());
    expect(headerText.trim()).toContain('Modal content');

    //Close the modal
    await modalCloseBtn.click();
    console.log("Clicked on Close Modal button");
    
    //Validate modal is hidden
    await expect(modal).toBeHidden();
    console.log("Modal is closed");

    //---------------------------------------------------------------------------

    await page.close();
    console.log("Page closed");
});

//Run in terminal: npx playwright test tests/07_alert_frame_window/05_modal.spec.js --headed