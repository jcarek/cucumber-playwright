import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('Go to the email website', async function (this: ICustomWorld) {
  config.testID = Math.random().toString().substr(6)
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

When('Click write new email button', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('[id="compose_button"]').click();
});

Then('New email page is visible', async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator('[id="recipient_rightclick_to"]')).toBeVisible()
});

When('Fill in email', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('[id="qabook_switch_names"]').click()
  await page.locator('[id="quickabook_div"]').getByText('Testovací Email').click();
  await page.locator('[id="subject_input"]').fill(config.testID);
});

When('Send email', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('[id="qa_email_send_upper"]').click()
});

Then('Email is received', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.waitForTimeout(3000);
  await page.locator('[id="messages"]').locator('li').first().click()
  await expect(page.locator('[id="maillist"]').getByText(config.testID)).toBeVisible();
});
