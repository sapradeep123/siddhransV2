// Records short browser videos (real motion, Edge) of the main animated experiences -> docs/videos/ (git-ignored).
import { chromium } from '@playwright/test';
import { mkdirSync, renameSync, readdirSync } from 'node:fs';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:4173';
mkdirSync('docs/videos', { recursive: true });
const b = await chromium.launch({ channel: 'msedge' });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function record(name, size, fn) {
  const ctx = await b.newContext({ viewport: size, recordVideo: { dir: 'docs/videos/tmp', size }, reducedMotion: 'no-preference', hasTouch: size.width < 600, isMobile: size.width < 600 });
  const pg = await ctx.newPage();
  await fn(pg);
  const v = pg.video();
  await ctx.close();
  renameSync(await v.path(), `docs/videos/${name}.webm`);
}
const smooth = async (pg, to, step = 40, ms = 16) => { const from = await pg.evaluate(() => scrollY); for (let y = from; y < to; y += step) { await pg.evaluate((v) => scrollTo(0, v), y); await wait(ms); } };

await record('home-desktop', { width: 1440, height: 900 }, async (pg) => {
  await pg.goto(base + '/', { waitUntil: 'networkidle' }); await wait(2600);
  await smooth(pg, 1000); await wait(900);
  await smooth(pg, 2300); await wait(1400);
  const cap = pg.locator('#capabilities'); await cap.scrollIntoViewIfNeeded(); await smooth(pg, await pg.evaluate(() => document.querySelector('#capabilities').offsetTop + 380)); await wait(900);
  for (const i of [2, 3, 4]) { await pg.locator('.sp').nth(i).hover(); await wait(1300); }
  await smooth(pg, await pg.evaluate(() => document.querySelector('#solutions').offsetTop + 500)); await wait(2400);
  await smooth(pg, await pg.evaluate(() => document.querySelector('#industries').offsetTop)); await wait(1800);
});
await record('products-explorer', { width: 1440, height: 900 }, async (pg) => {
  await pg.goto(base + '/products/', { waitUntil: 'networkidle' }); await wait(1800);
  await smooth(pg, await pg.evaluate(() => document.querySelector('#stage-panel').offsetTop - 120)); await wait(1400);
  for (const n of ['Talent & placement', 'Business operations', 'Sector systems', 'Education & training']) { await pg.getByRole('tab', { name: new RegExp(n) }).click(); await wait(1700); }
});
await record('case-studies', { width: 1440, height: 900 }, async (pg) => {
  await pg.goto(base + '/case-studies/', { waitUntil: 'networkidle' }); await wait(1800);
  await smooth(pg, 4200, 36, 16); await wait(1000);
  await smooth(pg, 8400, 40, 16); await wait(1200);
});
await record('mobile-home-menu', { width: 390, height: 844 }, async (pg) => {
  await pg.goto(base + '/', { waitUntil: 'networkidle' }); await wait(2400);
  await smooth(pg, 1300, 24, 16); await wait(800);
  await pg.evaluate(() => scrollTo(0, 0)); await wait(500);
  await pg.getByRole('button', { name: 'Open menu' }).click(); await wait(1600);
  await pg.getByRole('button', { name: 'Close menu' }).click(); await wait(900);
});
await b.close();
console.log(readdirSync('docs/videos').filter((f) => f.endsWith('.webm')).join(', '));
