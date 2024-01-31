import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('Go to the playwright website', async function (this: ICustomWorld) {
  const page = this.page!;
/*  const puppeteer = require('puppeteer');
let browser = await puppeteer.launch({
    executablePath: `/path/to/Chrome`,
    //...
});
  const page = await browser.newPage()*/
  await page.goto(config.BASE_URL);
  await page.locator('nav >> a >> text="Playwright"').waitFor();
});

Given('Go to the email website', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.EMAIL_URL);
});

Then('Email login page is opened', async function (this: ICustomWorld) {
  const page = this.page!;
  expect(await page.title()).toBe('Centrum.cz');
});

When('Log in as test user', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('input[name="ego_user"]').fill(config.EMAIL_USER);
  await page.locator('input[name="ego_secret"]').fill(config.EMAIL_PASSWORD);
  await page.locator('[id="email"]').locator('button[type="submit"]').click();
});

Then('Email inbox is opened', async function (this: ICustomWorld) {
  const page = this.page!;
  expect(await page.title()).toBe('Centrum mail');
  await expect(page.locator('[id="compose_button"]')).toBeVisible()
  await expect(page.locator('[class="logout-inner"]')).toBeVisible()
});

When('Log out', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('[class="logout-inner"]').click();
});

When('Write new email', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('[id="compose_button"]').click();
  await expect(page.locator('[id="recipient_rightclick_to"]')).toBeVisible()
  await page.locator('[id="recipient_rightclick_to"]').fill("Te");
  await page.getByText('stovací Email').click();
});

When('Change theme to {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const html = page.locator('html');
  const current = await html.getAttribute('data-theme');
  if (current !== mode) {
    await page.locator('nav >> button[title*="dark and light mode"]').click();
  }
  await page.waitForSelector(`html[data-theme=${mode}]`);
});

Then('We see {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(theme).toEqual(mode);
});
