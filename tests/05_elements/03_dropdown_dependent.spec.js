import { test, expect } from '@playwright/test';

test('Dependent Dropdown Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#21-dependent-dropdown";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------

    // Locate parent and child dropdowns
    const countryDropdown = page.locator('#countrySelect');
    const cityDropdown = page.locator('#citySelect');

    // Validate all countries in parent dropdown
    const countries = await countryDropdown.locator('option').allTextContents();
    console.log('Available countries:', countries);
    expect(countries).toEqual(['Select Country', 'India', 'USA', 'UK']); // Expected sequence

    // await page.waitForTimeout(2000);

    // Select country: India
    await countryDropdown.selectOption({ label: 'India' });
    console.log('Selected country: India');

    // await page.waitForTimeout(2000); // wait for dependent dropdown to update // demo purpose

    // Validate cities loaded for India
    const indianCities = await cityDropdown.locator('option').allTextContents();
    console.log('Cities for India:', indianCities);
    expect(indianCities).toEqual(['Mumbai', 'Delhi', 'Bangalore']); // Expected sequence

    // Select city: Bangalore
    await cityDropdown.selectOption({ label: 'Bangalore' });
    console.log('Selected city: Bangalore');

    // Validate selected values
    const selectedCountry = await countryDropdown.inputValue();
    const selectedCity = await cityDropdown.inputValue();
    console.log(`Selected Country: ${selectedCountry}, Selected City: ${selectedCity}`);
    expect(selectedCountry).toBe('India');
    expect(selectedCity).toBe('Bangalore');

    // -------------------------------------
    // await page.waitForTimeout(3000);

    await page.close();
});

/*
Notes:
- Used selectOption() for both parent and child dropdowns.
- Validated all options in both dropdowns using allTextContents().
- Dependent dropdown updates dynamically based on parent selection.
- Added waitForTimeout() for clarity during demo.

Assignments:
1. Select USA and validate its cities (e.g., New York, Chicago).
2. Print both dropdown options before and after selection.
3. Take a screenshot after selecting country and city.

Quiz:
Q1. How do you handle dependent dropdowns in Playwright?
A. Use selectOption() for parent, then validate child options after dynamic update.
B. Use click() only.
C. Use hover() for both dropdowns.
D. Use keyboard.type() for values.
Correct Answer: A
Explanation: selectOption() updates the parent dropdown, then validate and select from child dropdown.

Interview Questions:
Q1. How do you ensure the child dropdown is updated before interacting?
Answer: Use waitForSelector() or expect(locator).toHaveText() for child options after parent selection.

Q2. How do you validate dynamic dropdown contents in Playwright?
Answer: Use locator('option').allTextContents() and compare with expected list after parent selection.
*/