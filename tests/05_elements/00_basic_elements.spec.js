import { test, expect } from '@playwright/test';

test('button example', async ({ page }) => {

  await page.goto('https://dd-demo-tau.vercel.app/web_elements.html');
  await page.waitForTimeout(3000);

  await expect(page).toHaveTitle(/Playwright/);

  // await page.getByRole('button', { name: 'Click Me' }).click();   
// name: /click me/i  for ignore case and whitespace
// getByRole() works when aria role is defined in the element as role="button" attribute

  // Scroll to the button section
  const btnClickMe = page.locator('#clickBtn'); // locate button using id selector (css selector)
  await btnClickMe.scrollIntoViewIfNeeded(); // scroll to the button if needed
  await page.waitForTimeout(2000);

  await btnClickMe.click();

  await expect (page.locator('#buttonMsg')).toHaveText('Click Me button clicked');

  await page.waitForTimeout(2000);
  
  await page.close();

});


test.skip('link example', async ({ page }) => {

  await page.goto('https://dd-demo-tau.vercel.app/web_elements.html');
  // await page.waitForTimeout(1000);

  await expect(page).toHaveTitle(/Playwright/);

  // Scroll to the button section
  // const locLink = page.getByRole("link", { name: 'Go to Text Input'});
  // const locLink = page.getByRole('link', { name: 'Go to Text Input'});
  // const locLink = page.getByText('Go to Text Input'); // entire text
  // const locLink = page.getByText('Go to Text'); // partial text also works
  // const locLink = page.getByText('Go to Text', { exact: false }); // partial text also works
  // const locLink = page.getByText('Go to Text', { exact: true }); // partial text will not work

    // const locLink = page.locator('#internalLink'); // locate using id selector (css selector)

  // chaining
  const locLink = page.locator("#mainContent").locator("section[id='13-links']").getByRole('link', { name: 'Go to Text Input'});
    
  await locLink.scrollIntoViewIfNeeded(); // scroll to the element if needed
  await page.waitForTimeout(3000);

  await locLink.click();

  

  await page.waitForTimeout(2000);
  
  await page.close();

});

// Notes 
// ways to locate the link element


