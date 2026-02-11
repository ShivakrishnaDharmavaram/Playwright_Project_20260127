import { test, expect } from '@playwright/test';

test('Multi-Select Dropdown Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#8-multiselect";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    // await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    // await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate multi-select dropdown
    const multiSelect = page.locator('#multiSelectField');

    // Validate all available options and sequence
    const allOptions = await multiSelect.locator('option').allTextContents();
    console.log('Available options:', allOptions);
    expect(allOptions).toEqual(['Apple', 'Banana', 'Mango']); // Expected sequence

    // await page.waitForTimeout(3000);

    // Select multiple options by value
    await multiSelect.selectOption(['Apple', 'Mango']);
    console.log('Selected options: Apple and Mango');

    // await page.waitForTimeout(3000);

    // Validate selected values
    const selectedValues = await multiSelect.evaluate(el => Array.from(el.selectedOptions).map(opt => opt.text));
    console.log('Currently selected values:', selectedValues);
    expect(selectedValues).toEqual(['Apple', 'Mango']);

    // -------------------------------------
    // await page.waitForTimeout(3000);

    await page.close();
});

/*
Notes:
- Used selectOption() with an array to select multiple options.
- Used locator('option').allTextContents() to validate all options and sequence.
- Used evaluate() to retrieve selected option texts for validation.
- Added waitForTimeout() for clarity during demo.

Assignments:
1. Select all options (Apple, Banana, Mango) and validate the selected values.
2. Print both option labels and values for selected items.
3. Take a screenshot after selecting multiple options.

Quiz:
Q1. How do you select multiple options in a multi-select dropdown using Playwright?
A. selectOption(['value1', 'value2'])
B. selectMultiple()
C. chooseOptions()
D. multiSelect()
Correct Answer: A
Explanation: Pass an array of values or labels to selectOption() for multi-select dropdowns.

Interview Questions:
Q1. How do you validate the sequence of options in a dropdown using Playwright?
Answer: Use locator('option').allTextContents() and compare with expected sequence.

Q2. How do you retrieve all selected values from a multi-select dropdown?
Answer: Use evaluate() on the dropdown element to map selectedOptions to their text or value.
*/
