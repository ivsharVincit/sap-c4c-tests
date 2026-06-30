const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const DashboardPage = require('../pages/dashboardPage');
const testData = require('../fixtures/testData.json');

test.describe('SAP C4C Dashboard', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(testData.credentials.username, testData.credentials.password);
  });

  test('should display dashboard', async () => {
    await dashboardPage.goto();
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBe(true);
  });

  test('should navigate to Customers', async () => {
    await dashboardPage.goto();
    await dashboardPage.navigateToCustomers();
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBe(true);
  });
});