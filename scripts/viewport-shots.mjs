// Viewport (above-the-fold) screenshots of key pages at three sizes -> docs/screenshots/viewport/.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const base = process.env.BASE_URL ?? 'http://127.0.0.1:4173';
mkdirSync('docs/screenshots/viewport', { recursive: true });
const b = await chromium.launch({ channel: 'msedge' });
for (const [vp, w, h, d] of [['desktop', 1440, 900, 1], ['tablet', 820, 1180, 1], ['mobile', 390, 844, 2]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: d });
  for (const [n, p] of [['home', '/'], ['products', '/products/'], ['case-studies', '/case-studies/']]) {
    const pg = await ctx.newPage(); await pg.goto(base + p, { waitUntil: 'networkidle' }); await pg.waitForTimeout(2200);
    await pg.screenshot({ path: `docs/screenshots/viewport/${n}-${vp}.jpg`, type: 'jpeg', quality: 80 }); await pg.close();
  }
  await ctx.close();
}
await b.close(); console.log('ok');
