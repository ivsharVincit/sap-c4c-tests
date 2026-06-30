const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameField = 'input[name="username"], input[id*="username"]';
    this.passwordField = 'input[name="password"], input[id*="password"]';
    this.loginButton = 'button:has-text("Log In"), button:has-text("Sign In")';
    this.logoutButton = 'button:has-text("Log Out")';
    this.errorMessage = '.error, .alert-danger, [role="alert"]';
    this.dashboardHeader = '.dashboard-header, [class*="main-content"]';
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.waitForElement(this.usernameField);
    await this.fillField(this.usernameField, username);
    await this.fillField(this.passwordField, password);
    await this.click(this.loginButton);
    await this.page.waitForNavigation({ waitUntil: 'networkidle' });
    await this.waitForLoadingFinished();
  }

  async logout() {
    await this.click(this.logoutButton);
    await this.page.waitForNavigation();
  }

  async getErrorMessage() {
    if (await this.isElementVisible(this.errorMessage)) {
      return await this.getElementText(this.errorMessage);
    }
    return null;
  }

  async isLoggedIn() {
    return await this.isElementVisible(this.dashboardHeader);
  }

  async isOnLoginPage() {
    return await this.isElementVisible(this.loginButton);
  }
}

module.exports = LoginPage;