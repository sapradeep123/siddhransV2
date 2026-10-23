import { defineConfig } from '@playwright/test';

// Uses the locally installed Microsoft Edge (no browser download). Run `npm run build` first.
const use = { channel: 'msedge' as const, baseURL: 'http://127.0.0.1:4173', reducedMotion: 'reduce' as const };
export default defineConfig({
  testDir: 'tests',
  timeout: 60_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  reporter: [['list'], ['json', { outputFile: 'reports/e2e.json' }]],
  webServer: { command: 'node scripts/serve-static.mjs out', url: 'http://127.0.0.1:4173/', reuseExistingServer: false, timeout: 30_000, env: { API_PROXY: 'http://127.0.0.1:8787' } },
  projects: [
    { name: 'desktop', use: { ...use, viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { ...use, viewport: { width: 820, height: 1180 }, hasTouch: true } },
    { name: 'mobile', use: { ...use, viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
  ],
});
