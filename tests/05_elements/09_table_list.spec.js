import { test, expect } from '@playwright/test';

test('Table and List Interaction Example', async ({ page }) => {

    // Set URL and navigate
    const url = "https://dd-demo-tau.vercel.app/web_elements.html#15-tables-lists";
    await page.goto(url);
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(3000);

    // Validate page title
    await expect(page).toHaveTitle(/Playwright/i);

    await page.waitForTimeout(2000);
    // ------------------------------------
    // TABLE ACTIONS & VALIDATIONS
    const table = page.locator('#sampleTable');

    // Validate table is visible
    await expect(table).toBeVisible();

    // Get all rows
    const rows = await table.locator('tr').all();
    console.log(`Total rows in table: ${rows.length}`);
    expect(rows.length).toBeGreaterThan(1); // At least header + data rows

    console.log('Printing entire table:');
    for (const row of rows) {
        const cells = await row.locator('th, td').allTextContents();
        console.log(cells.join(' | '));
    }

    // Validate header row contains expected columns
    const headerCells = await rows[0].locator('th').allTextContents();
    console.log('Header:', headerCells);
    expect(headerCells).toEqual(['Name', 'Age']); 

    // Validate a specific cell value (e.g., first data row, first column)
    const firstCell = await rows[1].locator('td').nth(0).textContent();
    console.log('First cell value:', firstCell.trim());
    expect(firstCell.trim()).not.toBe('');

    await page.waitForTimeout(2000);

    // ------------------------------------
    // LIST ACTIONS & VALIDATIONS
    const listItems = await page.locator('#sampleList li').allTextContents();
    console.log('List items:', listItems);
    expect(listItems.length).toBeGreaterThan(0);

    // Validate specific item exists
    expect(listItems).toContain('Item 1'); // Example validation

    // Print list items
    console.log('Printing list items:');
    listItems.forEach(item => console.log(item));

    // -------------------------------------
    await page.waitForTimeout(3000);

    await page.close();
});