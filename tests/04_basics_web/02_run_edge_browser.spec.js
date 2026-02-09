import { test, expect, chromium } from '@playwright/test';

test('browser commands', async () => {

  // in the playwright.config.js file, we have configured project to run in edge browser
  // so this test will run in edge browser
  
  // commented the entry for chromium browser to avoid duplicate runs
  // uncommented the entry for edge browser to enable run in edge browser

  // // OR we can set the browser in the test file itself
  // const { chromium } = require('playwright');
  // const browser = await chromium.launch({ channel: 'msedge' });
  // const context = await browser.newContext();
  // const page = await context.newPage();

  // useful when edge is not installed in default location
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await chromium.launch({
    channel: 'msedge',
    executablePath: edgePath,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to wikipedia
  await page.goto('https://www.wikipedia.org/');
  await page.waitForTimeout(3000);  // wait to see the action (debug/ demo purpose)
  // Expect a title "to contain" a substring. // validate that the page title contains "Wikipedia"
  await expect(page).toHaveTitle(/Wikipedia/);

    // close browser window - closes the page
    await page.close();

});
