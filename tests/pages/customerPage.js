const BasePage = require('./basePage');

class CustomerPage extends BasePage {
  constructor(page) {
    super(page);
    this.createButton = 'button:has-text("Create"), button:has-text("New")';
    this.nameField = 'input[name*="name"], input[aria-label*="Name"]';
    this.emailField = 'input[type="email"]';
    this.phoneField = 'input[type="tel"]';
    this.saveButton = 'button:has-text("Save")';
    this.successMessage = '.success, .alert-success';
  }

  async goto() {
    await this.page.goto('/customers');
    await this.waitForLoadingFinished();
  }

  async clickCreateCustomer() {
    await this.click(this.createButton);
    await this.waitForLoadingFinished();
  }

  async fillCustomerForm(customerData) {
    if (customerData.name) {
      await this.fillField(this.nameField, customerData.name);
    }
    if (customerData.email) {
      await this.fillField(this.emailField, customerData.email);
    }
    if (customerData.phone) {
      await this.fillField(this.phoneField, customerData.phone);
    }
  }

  async saveCustomer() {
    await this.click(this.saveButton);
    await this.waitForLoadingFinished();
  }

  async createCustomer(customerData) {
    await this.clickCreateCustomer();
    await this.fillCustomerForm(customerData);
    await this.saveCustomer();
  }

  async isSuccessMessageShown() {
    return await this.isElementVisible(this.successMessage);
  }

  async isDashboardLoaded() {
    return await this.isElementVisible('h1, .page-title');
  }
}

module.exports = CustomerPage;