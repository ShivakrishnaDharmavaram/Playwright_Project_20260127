export class HomePage {
    constructor(page) {
        this.page = page;

        // Locators for HomePage elements
        this.profileMenu = page.locator('#ybarAccountMenuOpener');
        this.signOutButton = page.locator('#profile-signout-link');
    }

    // Method to identify if user is logged in by checking the presence of profile menu
    async isUserLoggedIn() {
        return await this.profileMenu.hover().then(async () => {
            // move out the mouse to avoid hover state for next steps
            await this.page.mouse.move(0, 0);
            return true;
        }).catch(() => false);
    }
    
    // Method to identify and get 'sign out' text from the Profile Menu
    async getSignOutText() {
        await this.profileMenu.hover();
        const signOutText = await this.signOutButton.textContent();
        await this.page.mouse.move(0, 0); // move out the mouse to avoid hover state for next steps
        return signOutText;
    }

    async signOut() {
        await this.profileMenu.hover();
        await this.signOutButton.click();
    }
}