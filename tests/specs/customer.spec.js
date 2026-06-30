const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const CustomerPage = require('../pages/customerPage');
const testData = require('../fixtures/testData.json');

test.describe('SAP C4C Customer Management', () => {
  let loginPage;
  let customerPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);

    await loginPage.goto();
    await loginPage.login(testData.credentials.username, testData.credentials.password);
    await customerPage.goto();
  });

  test('should display customer list page', async () => {
    const isLoaded = await customerPage.isDashboardLoaded();
    expect(isLoaded).toBe(true);
  });

  test('should create a new customer', async () => {
    await customerPage.createCustomer(testData.customer);
    const isSuccessShown = await customerPage.isSuccessMessageShown();
    expect(isSuccessShown).toBe(true);
  });
});