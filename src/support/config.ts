import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  EMAIL_URL: 'https://www.centrum.cz/',
  EMAIL_USER: 'bZVpz6xqww',
  EMAIL_PASSWORD: 'D68M8w59Xu',
  BASE_URL: 'https://playwright.dev',
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: 'https://catfact.ninja/',
};
