export class MailPage {
    constructor(page) {
        this.page = page;

        // Locators for MailPage elements
        this.mailLink = page.locator('a[href*="mail.yahoo.com"]').first();
        this.profileMenu = page.locator('#ybarAccountMenuOpener');
        this.signOutButton = page.locator('#profile-signout-link');
    }

    async navigateToMail() {
        const [newTab] = await Promise.all([
            this.page.waitForEvent('popup'), // Wait for the new page (tab) to open
            this.mailLink.click()
        ]);
        await newTab.waitForLoadState();

        // Store the new tab reference as a property
        this.newTab = newTab;

        // Validate new page title and URL
        const newPageTitle = await newTab.title();
        const newPageUrl = await newTab.url();
        console.log("New page title after clicking mail link: ", newPageTitle);
        console.log("New page URL after clicking mail link: ", newPageUrl);
        // wait until page load
        await newTab.waitForLoadState('domcontentloaded');
    }

    // additional method to navigate back to home page if needed
    async navigateBackToHome() {
        await this.newTab.close(); // Close the mail tab
        await this.page.bringToFront(); // Bring the original page back to front
    }
}