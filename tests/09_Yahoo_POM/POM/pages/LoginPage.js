export class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators as properties
        this.usernameField = page.locator('#login-username');
        this.passwordField = page.locator('#login-passwd');
        this.signInButton = page.locator('#login-signin');
    }

    async navigate(url) {
        await this.page.goto(url);
        // Maximize the browser window for better visibility during testing
        await this.page.setViewportSize({ width: 1280, height: 800 });
        // Alternatively, you can use the following line to maximize the window if supported by the browser
        // await this.page.evaluate(() => window.moveTo(0, 0); window.resizeTo(screen.width, screen.height));

        // await this.page.setViewportSize({ width: 1280, height: 800 });
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.signInButton.click();
        // await this.page.waitForTimeout(2000);

        await this.passwordField.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getCurrentUrl() {
        return this.page.url();
    }
}