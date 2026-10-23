// Runs Lighthouse (mobile and desktop) against the built site served locally, using the installed Edge.
// Usage: npm run build && npm run lighthouse   (writes reports/lighthouse-summary.json and docs/LIGHTHOUSE.md)
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const EDGE = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const PAGES = ['/', '/services/', '/services/embedded-systems-industrial-iot/', '/engineering-use-cases/', '/products/', '/industries/', '/case-studies/', '/about/', '/contact/'];
const base = 'http://127.0.0.1:4174';
const server = spawn(process.execPath, ['scripts/serve-static.mjs', 'out'], { env: { ...process.env, PORT: '4174' }, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1500));
const chrome = await launch({ chromePath: EDGE, chromeFlags: ['--headless=new', '--no-sandbox'] });
const rows = [];
try {
  for (const form of ['mobile', 'desktop']) {
    for (const p of PAGES) {
      const flags = { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] };
      const config = form === 'desktop' ? { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } } : undefined;
      const r = await lighthouse(base + p, flags, config);
      const c = r.lhr.categories, a = r.lhr.audits;
      const row = { form, page: p, performance: Math.round(c.performance.score * 100), accessibility: Math.round(c.accessibility.score * 100), bestPractices: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), lcpMs: Math.round(a['largest-contentful-paint'].numericValue), cls: +a['cumulative-layout-shift'].numericValue.toFixed(3), tbtMs: Math.round(a['total-blocking-time'].numericValue), bytesKB: Math.round(a['total-byte-weight'].numericValue / 1024) };
      rows.push(row); console.log(JSON.stringify(row));
    }
  }
} finally { await chrome.kill(); server.kill(); }
mkdirSync('reports', { recursive: true });
writeFileSync('reports/lighthouse-summary.json', JSON.stringify(rows, null, 2));
const md = ['# Lighthouse results', '', `Run against the built static site (\`out/\`) served locally, using Microsoft Edge, Lighthouse ${'13'}. Scores are 0-100.`, '', '| Form factor | Page | Perf | A11y | Best practices | SEO | LCP (ms) | CLS | TBT (ms) | Transfer (KB) |', '|---|---|---|---|---|---|---|---|---|---|', ...rows.map((r) => `| ${r.form} | ${r.page} | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${r.lcpMs} | ${r.cls} | ${r.tbtMs} | ${r.bytesKB} |`), ''].join('\n');
writeFileSync('docs/LIGHTHOUSE.md', md);
console.log('written reports/lighthouse-summary.json and docs/LIGHTHOUSE.md');
