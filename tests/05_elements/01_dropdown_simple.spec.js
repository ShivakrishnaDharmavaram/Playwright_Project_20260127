import { test, expect } from '@playwright/test';

test('Dropdown Selection Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#7-dropdown";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    // await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    // await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate dropdown
    const dropdown = page.locator('#dropdownField');

    // Select option by value
    await dropdown.selectOption({ value: 'Audi' });
    console.log('Selected option by value: Audi');

    // await page.waitForTimeout(3000);

    // Select option by label
    await dropdown.selectOption({ label: 'Tesla' });
    console.log('Selected option by label: Tesla');

    // await page.waitForTimeout(3000);

    // Validate selected option
    const selectedValue = await dropdown.inputValue();
    console.log('Currently selected value:', selectedValue);
    expect(selectedValue).toBe('Tesla');

    // -------------------------------------
    // await page.waitForTimeout(3000);

    await page.close();
});

/*
Notes:
- Used selectOption() to select dropdown values.
- selectOption() supports selection by value, label, or index.
- inputValue() retrieves the current selected value.
- Added waitForTimeout() for clarity during demo.

Assignments:
1. Select an option by index and validate the selection.
2. Print all available options from the dropdown using locator.allTextContents().
3. Take a screenshot after selecting the last option.

Quiz:
Q1. Which Playwright method is used to select an option from a dropdown?
A. chooseOption()
B. selectOption()
C. pickOption()
D. setOption()
Correct Answer: B
Explanation: selectOption() is used to select options from dropdowns.

Interview Questions:
Q1. How do you select multiple options in a multi-select dropdown using Playwright?
Answer: Pass an array of values or labels to selectOption(), e.g., selectOption(['option1', 'option2']).

Q2. How do you validate all options in a dropdown using Playwright?
Answer: Use locator.allTextContents() to retrieve all option texts and compare with expected list.
*/