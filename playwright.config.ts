import { defineConfig, devices, Page } from '@playwright/test';

export default defineConfig({
  timeout: 190000,
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    outputDir: 'test-results/'
  },
  projects: [
    {
      name: 'app-simplenight',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
        baseURL: 'https://app.simplenight.com/'
      },
    },
  ],
});

export async function clearSiteData(page: Page) {
  const context = page.context();
  await context.clearCookies();
  await context.clearPermissions();
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.evaluate(async () => {
    const dbs = await window.indexedDB.databases();
    dbs.forEach(db => window.indexedDB.deleteDatabase(db.name!));
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
  });
  await context.storageState({ path: 'storageState.json' });
}