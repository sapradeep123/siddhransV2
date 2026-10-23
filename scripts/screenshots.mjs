// Full-page screenshots of the built site at desktop, tablet and mobile sizes -> docs/screenshots/.
// Usage: npm run build && node scripts/serve-static.mjs out & node scripts/screenshots.mjs
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:4173';
const pages = { home: '/', services: '/services/', 'service-embedded-iot': '/services/embedded-systems-industrial-iot/', 'service-cybersecurity': '/services/cybersecurity/', 'engineering-use-cases': '/engineering-use-cases/', products: '/products/', industries: '/industries/', 'case-studies': '/case-studies/', about: '/about/', contact: '/contact/', privacy: '/privacy/' };
const sizes = { desktop: [1440, 900, 1], tablet: [820, 1180, 1], mobile: [390, 844, 2] };
mkdirSync('docs/screenshots', { recursive: true });
const b = await chromium.launch({ channel: 'msedge' });
for (const [vp, [w, h, dpr]] of Object.entries(sizes)) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, reducedMotion: 'reduce' });
  for (const [name, path] of Object.entries(pages)) {
    const pg = await ctx.newPage();
    await pg.goto(base + path, { waitUntil: 'networkidle' });
    await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } scrollTo(0, 0); await Promise.all([...document.images].map((i) => i.decode().catch(() => 0))); });
    await pg.screenshot({ path: `docs/screenshots/${name}-${vp}.jpg`, type: 'jpeg', quality: 78, fullPage: true });
    await pg.close();
  }
  await ctx.close();
}
await b.close();
console.log('screenshots written to docs/screenshots');
