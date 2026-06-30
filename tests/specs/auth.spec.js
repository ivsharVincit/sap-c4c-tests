const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const testData = require('../fixtures/testData.json');

test.describe('SAP C4C Authentication', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display login page', async () => {
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });

  test('should login with valid credentials', async () => {
    await loginPage.login(testData.credentials.username, testData.credentials.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid@company.com', 'wrongpassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  test('should logout successfully', async () => {
    await loginPage.login(testData.credentials.username, testData.credentials.password);
    let isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);

    await loginPage.logout();
    let isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBe(true);
  });
});