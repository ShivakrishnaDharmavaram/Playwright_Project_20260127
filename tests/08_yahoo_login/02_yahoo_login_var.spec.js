import {test, expect} from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

const url = process.env.YAHOO_LOGIN_URL || "https://login.yahoo.com/";
const username = process.env.YAHOO_USERNAME;
const password = process.env.YAHOO_PASSWORD;

test('Yahoo login test', async ({page}) => {
    // const mailLink = page.locator('a[href*="mail.yahoo.com"]').first();
    const mailLink = page.locator('#ybarMailLink');
    
    await page.goto(url);
    await page.setViewportSize({width: 1024, height: 768});
    await expect(page).toHaveTitle(/Yahoo/i);
    await expect(page.locator('input[name="username"]')).toBeVisible();

    const usernameId = page.locator('#login-username');
    const yahooPassword = page.locator('#login-passwd');
    const signInButton = page.locator('#login-signin');
    

    const heading = await page.locator('h1').textContent();
    console.log("Heading in page: ", heading);

    // Fill in the username and password fields and submit the form
    await usernameId.fill(username);
    await signInButton.click();
    // await usernameId.press('Enter');

    // Wait for the password field to appear
    await page.waitForSelector('input[name="password"]', {state: 'visible'});
    await yahooPassword.fill(password);
    await yahooPassword.press('Enter');

    // if yahoo redirects to fingerprint sign in, click "Not now" and proceed
    await page.waitForLoadState('domcontentloaded');
    const currentURL = page.url();
    console.log("Current URL after login attempt: ", currentURL);
    if (currentURL.includes('yahoo.com/enable-fingerprint')) {
        console.log("Redirected to enable fingerprint page, clicking on 'Not now' button");
        await page.getByRole('button', { name: /Not now/i }).click();
        await page.waitForLoadState('domcontentloaded');
    } else {
        console.log("No redirection, checking if logged in successfully");
        await expect(mailLink).toBeVisible({ timeout: 15000 });
        console.log("User is logged in successfully");
    }


    //after login, click on check your email/mail link and verify navigation to mail page
    await expect(mailLink).toBeVisible({ timeout: 15000 });
    await expect(mailLink).toHaveAttribute('href', /mail\.yahoo\.com/i);
    const mailHref = await mailLink.getAttribute('href');
    await mailLink.click();
    await page.goto(mailHref || 'https://mail.yahoo.com/');
    await page.waitForLoadState('domcontentloaded');
    const mailURL = page.url();
    console.log("Current URL after navigating to Yahoo Mail: ", mailURL);
    expect(mailURL).toContain('mail.yahoo.com');
});

//Run in terminal: npx playwright test tests/08_yahoo_login/02_yahoo_login_2.spec.js --headed