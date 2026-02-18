import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage.js';
import { MailPage } from '../pages/MailPage.js';
import { HomePage } from '../pages/HomePage.js';

dotenv.config();

test('Yahoo Login using POM with login() method', async ({ page }) => {
    const url = "https://login.yahoo.com/";
    const userId = process.env.YAHOO_USERNAME;
    const password = process.env.YAHOO_PASSWORD;

    const loginPage = new LoginPage(page);
    const mailPage = new MailPage(page);

    await loginPage.navigate(url);
    await expect(page).toHaveTitle(/Yahoo/i);

    // Single method for login
    await loginPage.login(userId, password);

    const currentUrl = await loginPage.getCurrentUrl();
    console.log("URL after login:", currentUrl);

    await expect(currentUrl).toMatch(/login\.yahoo\.com|yahoo\.com/);

    // After login, click on the mail link and verify navigation to mail page
    await mailPage.navigateToMail();
    
    //validate new tab title and url
    const newTabTitle = await mailPage.newTab.title();
    const newTabUrl = await mailPage.newTab.url();
    console.log("New Tab Title: ", newTabTitle);
    console.log("New Tab URL: ", newTabUrl);
    await expect(newTabTitle).toMatch(/Yahoo Mail/i);
    await expect(newTabUrl).toMatch(/mail\.yahoo\.com/);

    await mailPage.navigateBackToHome();
    await expect(page).toHaveTitle(/Yahoo/i);

    //Navigate to home page and verify user is logged in by checking the presence of profile menu
    const homePage = new HomePage(page);
    await homePage.isUserLoggedIn();
    
    const signOutText = await homePage.getSignOutText();
    console.log("Sign Out Text: ", signOutText);
    await expect(signOutText).toMatch(/Sign out/i);

    // Sign out after verification
    await homePage.signOut();
    await expect(page).toHaveURL(/yahoo\.com/);

    //close the browser after the test
    await page.close();
});

// Run in terminal: npx playwright test tests/09_Yahoo_POM/POM/tests/LoginTest.spec.js --headed