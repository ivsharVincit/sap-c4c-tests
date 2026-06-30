async function waitForSpinner(page, timeout = 5000) {
  try {
    const spinner = '.spinner, .sapUiLoadingAnimation, [class*="loading"]';
    await page.waitForSelector(spinner, { state: 'hidden', timeout });
  } catch (error) {
    console.warn('Spinner wait timeout or not found');
  }
}

async function fillFormField(page, selector, value) {
  await page.fill(selector, value);
  await page.press(selector, 'Tab');
  await waitForSpinner(page);
}

async function clickAndWait(page, selector, waitForNavigation = false) {
  if (waitForNavigation) {
    await Promise.all([
      page.waitForNavigation(),
      page.click(selector),
    ]);
  } else {
    await page.click(selector);
    await waitForSpinner(page);
  }
}

async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `screenshots/${name}_${timestamp}.png`;
  await page.screenshot({ path: filename });
  console.log(`📸 Screenshot saved: ${filename}`);
}

module.exports = {
  waitForSpinner,
  fillFormField,
  clickAndWait,
  takeScreenshot,
};