// Footer screenshots as a visitor sees them (scrolled to the bottom, with the floating header) -> docs/screenshots/footer/.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
mkdirSync('docs/screenshots/footer', { recursive: true });
const b = await chromium.launch({ channel: 'msedge' });
for (const [vp, w, h, d] of [['desktop', 1440, 900, 1], ['tablet', 820, 1180, 1], ['mobile', 390, 844, 2]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: d });
  for (const [n, p] of [['home', '/'], ['contact', '/contact/']]) {
    const pg = await ctx.newPage(); await pg.goto(base + p, { waitUntil: 'networkidle' });
    await pg.evaluate(() => scrollTo(0, document.body.scrollHeight)); await pg.waitForTimeout(1200);
    await pg.screenshot({ path: `docs/screenshots/footer/${n}-${vp}.jpg`, type: 'jpeg', quality: 82 });
    if (vp === 'mobile') { await pg.evaluate(() => scrollBy(0, -700)); await pg.waitForTimeout(700); await pg.screenshot({ path: `docs/screenshots/footer/${n}-${vp}-2.jpg`, type: 'jpeg', quality: 82 }); }
    await pg.close();
  }
  await ctx.close();
}
await b.close(); console.log('ok');
