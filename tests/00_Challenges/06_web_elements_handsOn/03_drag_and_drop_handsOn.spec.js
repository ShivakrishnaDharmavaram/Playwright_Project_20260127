import {test, expect} from '@playwright/test';

test('Drag and Drop Example', async ({page}) => {
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#24-drag-and-drop";
    await page.goto(url);
    await page.setViewportSize({width: 1024, height: 768});
    await expect(page).toHaveTitle(/Playwright/i);

    const draggable = page.locator('#dragItem');
    const droppable = page.locator('#dropZone');
    const message = page.locator('#dragMsg');

    //Message before drag and drop
    const initialMessageText = await message.textContent();
    console.log("Initial message text: ", initialMessageText.trim());
    expect(initialMessageText.trim()).toBe('—');
    //Perform drag and drop
    await draggable.dragTo(droppable);
    console.log("Dragged the element to the target");
    await page.waitForTimeout(2000); // Wait for the message to update after drag and drop

    //Validate the message
    const messageText = await message.textContent();
    console.log("Message text: ", messageText.trim());
    expect(messageText.trim()).toBe('Dropped: Drag Me');
    await page.close();
    console.log("Page closed");
});

//Run in terminal: npx playwright test tests/00_Challenges/06_web_elements_handsOn/03_drag_and_drop_handsOn.spec.js --headed