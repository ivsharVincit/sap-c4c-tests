const BasePage = require('./basePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageHeader = 'h1, .page-title, [class*="title"]';
    this.customersLink = 'a:has-text("Customers"), a[href*="customer"]';
    this.ordersLink = 'a:has-text("Orders"), a[href*="order"]';
    this.salesLink = 'a:has-text("Sales"), a[href*="sales"]';
  }

  async goto() {
    await this.page.goto('/');
    await this.waitForLoadingFinished();
  }

  async getPageTitle() {
    return await this.getElementText(this.pageHeader);
  }

  async navigateToCustomers() {
    await this.click(this.customersLink);
    await this.waitForLoadingFinished();
  }

  async navigateToOrders() {
    await this.click(this.ordersLink);
    await this.waitForLoadingFinished();
  }

  async navigateToSales() {
    await this.click(this.salesLink);
    await this.waitForLoadingFinished();
  }

  async isDashboardLoaded() {
    return await this.isElementVisible(this.pageHeader);
  }
}

module.exports = DashboardPage;