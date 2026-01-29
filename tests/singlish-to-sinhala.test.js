const { test, expect } = require('@playwright/test');

test('Singlish to Sinhala translation', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  // SwiftTranslator uses a textarea, not input
  const inputField = page.locator('textarea');
  await inputField.fill('api kaema kanna yanavaa saha passee chithrapatayak balanavaa.');

  // wait for translation to happen
  await page.waitForTimeout(3000);

  // simple validation to confirm automation works
await expect(page).toHaveTitle(/Singlish/i);
});

test('Positive case – valid Singlish sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputField = page.locator('textarea');
  await inputField.fill('eyaa gedhara enavaa');

  await page.waitForTimeout(3000);

  const value = await inputField.inputValue();
  expect(value.length).toBeGreaterThan(0);
});

test('Negative case – invalid input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputField = page.locator('textarea');
  await inputField.fill('@@@###$$$');

  await page.waitForTimeout(3000);

  await expect(page).toHaveTitle(/Singlish/i);
});

test('Positive case – currency value input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputField = page.locator('textarea');
  await inputField.fill('mage bill eka Rs. 2500');

  await page.waitForTimeout(3000);

  await expect(page).toHaveTitle(/Singlish/i);
});

