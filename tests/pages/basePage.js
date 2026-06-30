class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async getPageTitle() {
    return this.page.title();
  }

  async isElementVisible(selector) {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  async getElementText(selector) {
    return await this.page.textContent(selector);
  }

  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async fillField(selector, value) {
    await this.page.fill(selector, value);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async waitForLoadingFinished(timeout = 5000) {
    const spinnerSelectors = [
      '.spinner',
      '.sapUiLoadingAnimation',
      '[class*="loading"]',
      '[aria-label*="Loading"]',
    ];

    for (const selector of spinnerSelectors) {
      try {
        await this.page.waitForSelector(selector, { state: 'hidden', timeout: 1000 });
      } catch {
        // Continue
      }
    }
  }
}

module.exports = BasePage;