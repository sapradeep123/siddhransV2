import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { LOGO_SHA256, PAGES } from './pages';

// Domain the site was built for (same variable as scripts/deploy/release.sh); defaults to the source default.
const SITE_URL = (process.env.SITE_URL ?? 'https://siddhrans.com').replace(/\/$/, '');

/** Scroll through the page so lazy images load, then wait for decode. */
async function settle(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => i.decode().catch(() => undefined)));
  });
}

function collectProblems(page: Page) {
  const problems: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problems.push(`console ${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  // ERR_ABORTED is the router cancelling speculative link prefetches; it is not a defect.
  page.on('requestfailed', (r) => { const t = r.failure()?.errorText ?? ''; if (!t.includes('ERR_ABORTED')) problems.push(`request failed: ${r.url()} ${t}`); });
  page.on('response', (r) => { if (r.status() >= 400) problems.push(`HTTP ${r.status()}: ${r.url()}`); });
  return problems;
}

test.describe('every page', () => {
  for (const path of PAGES) {
    test(`renders cleanly: ${path}`, async ({ page }) => {
      const problems = collectProblems(page);
      const res = await page.goto(path, { waitUntil: 'networkidle' });
      expect(res?.status()).toBe(200);
      await settle(page);

      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toBeVisible();
      expect((await page.title()).length).toBeGreaterThan(10);
      // layout: no horizontal overflow
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'horizontal overflow (px)').toBeLessThanOrEqual(0);
      // images: all loaded, all have alt attribute
      const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
      expect(broken, 'broken images').toEqual([]);
      const noAlt = await page.evaluate(() => [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.src));
      expect(noAlt, 'images without alt attribute').toEqual([]);
      expect(problems, 'console / network problems').toEqual([]);
    });

    test(`SEO metadata: ${path}`, async ({ page }) => {
      await page.goto(path);
      const meta = (sel: string) => page.locator(sel).first().getAttribute('content');
      expect(((await meta('meta[name="description"]')) ?? '').length).toBeGreaterThan(50);
      expect(((await page.locator('link[rel="canonical"]').getAttribute('href')) ?? '').startsWith(`${SITE_URL}/`), 'canonical uses SITE_URL').toBe(true);
      expect(await meta('meta[property="og:title"]')).toBeTruthy();
      expect(await meta('meta[property="og:image"]')).toMatch(/og-default\.jpg$/);
      expect(await page.locator('html').getAttribute('lang')).toBe('en-IN');
      const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? '{}');
      expect(ld['@type']).toBe('Organization');
    });

    test(`accessibility (axe, WCAG 2.2 AA rules): ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      await settle(page);
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
      const summary = r.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
      expect(summary).toEqual([]);
    });
  }
});

test('all internal links resolve (site-wide crawl)', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const p of PAGES) {
    await page.goto(p);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''));
    hrefs.filter((h) => h.startsWith('/') && !h.startsWith('//')).forEach((h) => seen.add(h.split('#')[0] || '/'));
  }
  const bad: string[] = [];
  for (const h of seen) { const r = await request.get(h); if (r.status() !== 200) bad.push(`${r.status()} ${h}`); }
  expect(bad).toEqual([]);
  expect(seen.size).toBeGreaterThan(15);
});

test('in-page anchors point at existing elements', async ({ page }) => {
  const bad: string[] = [];
  for (const p of PAGES) {
    await page.goto(p);
    const anchors = await page.$$eval('a[href*="#"]', (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? ''));
    for (const a of anchors) {
      const [path, id] = a.split('#');
      if (!id) continue;
      const target = path && path !== p ? path : p;
      await page.goto(target);
      if ((await page.locator(`[id="${id}"]`).count()) === 0) bad.push(`${p} -> ${a}`);
      await page.goto(p);
    }
  }
  expect([...new Set(bad)]).toEqual([]);
});

test('robots.txt and sitemap.xml list every page', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  const sm = await (await request.get('/sitemap.xml')).text();
  for (const p of PAGES) expect(sm, p).toContain(`${SITE_URL}${p}`);
});

test.describe('original logo', () => {
  test('served file is byte-identical to the approved master', async ({ request }) => {
    const body = await (await request.get('/brand/Siddhrans_Logo.png')).body();
    expect(createHash('sha256').update(body).digest('hex')).toBe(LOGO_SHA256);
  });

  for (const path of ['/', '/contact/', '/about/']) {
    test(`renders unaltered, in proportion and fully visible: ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      const logos = await page.evaluate(() => [...document.querySelectorAll('.logo img')].map((i) => {
        const bb = i.getBoundingClientRect(); const cb = (i.parentElement as HTMLElement).getBoundingClientRect(); const cs = getComputedStyle(i);
        return { nat: [(i as HTMLImageElement).naturalWidth, (i as HTMLImageElement).naturalHeight], ratio: bb.width / bb.height, filter: cs.filter, transform: cs.transform, objectFit: cs.objectFit,
          inside: bb.left + (bb.width * 200) / 2200 >= cb.left - 0.5 && bb.left + (bb.width * 1996) / 2200 <= cb.right + 0.5 && bb.top + (bb.height * 332) / 1109 >= cb.top - 0.5 && bb.top + (bb.height * 784) / 1109 <= cb.bottom + 0.5, w: cb.width };
      }));
      expect(logos.length).toBeGreaterThanOrEqual(2);
      for (const l of logos) {
        expect(l.nat).toEqual([2200, 1109]);
        expect(Math.abs(l.ratio - 2200 / 1109)).toBeLessThan(0.006);
        expect(l.filter).toBe('none');
        expect(l.transform).toBe('none');
        expect(l.inside, 'visible artwork must lie fully inside its container').toBe(true);
      }
      const header = logos[0];
      expect(header.w, 'header logo width').toBeGreaterThanOrEqual(150);
    });
  }
});

test.describe('navigation', () => {
  test('primary navigation reaches every top-level page', async ({ page, isMobile }) => {
    await page.goto('/');
    const targets = [['AI & Automation', /\/services\/ai-ml-intelligent-automation\/$/], ['Software', /\/services\/enterprise-software-engineering\/$/], ['Embedded', /\/services\/embedded-systems-industrial-iot\/$/], ['Cloud & Security', /\/services\/cybersecurity\/$/], ['Industries', /\/industries\/$/], ['Solutions', /\/products\/$/], ['Use Cases', /\/engineering-use-cases\/$/], ['About', /\/about\/$/]] as const;
    for (const [label, url] of targets) {
      await page.goto('/');
      if (isMobile || (page.viewportSize()?.width ?? 0) <= 1280) await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: new RegExp(`${label}$`) }).first().click();
      await expect(page).toHaveURL(url);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('mobile menu opens, traps nothing, closes with Escape and marks the current page', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 2000) > 1280, 'menu is collapsed only below 1281px');
    await page.goto('/about/');
    const btn = page.getByRole('button', { name: 'Open menu' });
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    await btn.click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: /About$/ })).toHaveAttribute('aria-current', 'page');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  });

  test('skip link is the first tab stop and moves focus to main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('keyboard focus is always visible on interactive elements', async ({ page }) => {
    await page.goto('/contact/');
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('Tab');
      const ok = await page.evaluate(() => { const el = document.activeElement as HTMLElement; if (!el || el === document.body) return true; const cs = getComputedStyle(el); return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2; });
      expect(ok, `focus indicator on tab stop ${i + 1}`).toBe(true);
    }
  });

  test('unknown routes show the custom 404 page', async ({ page }) => {
    const res = await page.goto('/does-not-exist/');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();
  });
});

test.describe('contact form', () => {
  const fill = async (page: Page) => {
    await page.getByLabel('Name', { exact: true }).fill('Asha Rao');
    await page.getByLabel('Work email').fill('asha@example.com');
    await page.getByLabel('How can we help?').fill('We need a security review of our servers.');
    await page.getByLabel(/I agree that/).check();
  };

  test('validates required fields, focuses the first error and announces errors', async ({ page }) => {
    await page.goto('/contact/');
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(page.locator('form').getByRole('alert')).toHaveCount(4);
    await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
    await expect(page.getByLabel('Name', { exact: true })).toHaveAttribute('aria-invalid', 'true');
    await page.getByLabel('Name', { exact: true }).fill('A');
    await page.getByLabel('Work email').fill('not-an-email');
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  });

  test('submits to the API, shows a loading state, then a success message', async ({ page }) => {
    let posted: Record<string, unknown> | undefined;
    await page.route('**/api/contact', async (route) => {
      posted = route.request().postDataJSON();
      await new Promise((r) => setTimeout(r, 400));
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.goto('/contact/');
    await fill(page);
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    await expect(page.getByTestId('sent')).toBeVisible();
    expect(posted).toMatchObject({ name: 'Asha Rao', email: 'asha@example.com', consent: true, website: '' });
  });

  test('shows a helpful error with direct contact details when the server fails', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ status: 502, contentType: 'application/json', body: '{"ok":false}' }));
    await page.goto('/contact/');
    await fill(page);
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    const err = page.getByTestId('send-error');
    await expect(err).toBeVisible();
    await expect(err.getByRole('link', { name: '+91 89712 34343' })).toBeVisible();
    await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Asha Rao'); // input kept
  });

  test('explains rate limiting and handles a network failure', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ status: 429, contentType: 'application/json', body: '{"ok":false}' }));
    await page.goto('/contact/');
    await fill(page);
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(page.getByTestId('send-error')).toContainText('Too many enquiries');
    await page.unroute('**/api/contact');
    await page.route('**/api/contact', (route) => route.abort('failed'));
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(page.getByTestId('send-error')).toContainText('could not reach the server');
  });

  test('honeypot field is hidden from users and keyboard order', async ({ page }) => {
    await page.goto('/contact/');
    const hp = page.locator('input[name="website"]');
    await expect(hp).toHaveAttribute('tabindex', '-1');
    expect(await hp.evaluate((e) => e.closest('[aria-hidden="true"]') !== null)).toBe(true);
  });

  test('email and telephone links use the profile details', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.locator('aside a[href="tel:+918971234343"]')).toBeVisible();
    await expect(page.locator('aside a[href="mailto:gururaj.n@siddhrans.com"]')).toBeVisible();
  });
});

test('use-case library filters by status and keeps an accurate count', async ({ page }) => {
  await page.goto('/engineering-use-cases/');
  await expect(page.getByTestId('uc-count')).toHaveText('Showing 20 of 20');
  await page.getByRole('button', { name: 'Proposed solution' }).click();
  await expect(page.getByRole('button', { name: 'Proposed solution' })).toHaveAttribute('aria-pressed', 'true');
  const n = await page.locator('article.uc').count();
  expect(n).toBe(5);
  await expect(page.getByTestId('uc-count')).toHaveText(`Showing ${n} of 20`);
  for (const t of await page.locator('article.uc .pill').allTextContents()) expect(t).toBe('Proposed Solution');
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.locator('article.uc')).toHaveCount(20);
});

test.describe('content guardrails (claims that must never appear publicly)', () => {
  const BANNED = [/\bISO\b/i, /9001/, /Bheeshmaa/i, /testimonial/i, /Indian Air Force/i, /EAOTA/i, /Saptha/i, /AutoCare/i, /Portal HR/i, /Blackhorse/i, /Moon Computers/i, /\b40\s?%/, /\b97\s?%/, /15\s?[–-]\s?20\s?%/, /\bsix sectors\b/i, /\b6 sectors\b/i, /sold to a US/i, /Co-Authored/i, /Claude|Anthropic/i, /\bSAP ECC\b/, /Coca/i];
  for (const path of PAGES) {
    test(`no unapproved claims: ${path}`, async ({ page }) => {
      await page.goto(path);
      const text = await page.locator('body').innerText();
      // visible text plus the human-readable attributes (alt, title, aria-label, meta content)
      const attrs = (await page.evaluate(() => [...document.querySelectorAll('[alt],[title],[aria-label],meta[content]')].map((e) => ['alt', 'title', 'aria-label', 'content'].map((a) => e.getAttribute(a) ?? '').join(' ')).join(' | ')));
      for (const re of BANNED) { expect(text, String(re)).not.toMatch(re); expect(attrs, `attributes ${re}`).not.toMatch(re); }
    });
  }

  test('every photograph is captioned as illustrative stock, never a project photo', async ({ page }) => {
    for (const p of ['/', '/services/', '/about/', '/products/', '/case-studies/', '/services/embedded-systems-industrial-iot/']) {
      await page.goto(p);
      expect(await page.locator('.photo__cap').count(), p).toBeGreaterThan(0);
      for (const t of await page.locator('.photo__cap').allTextContents()) expect(t).toMatch(/Illustrative image/);
    }
    await page.goto('/');
    await expect(page.locator('footer')).toContainText('Image type does not indicate project status');
  });

  test('use cases separate project status from image provenance', async ({ page }) => {
    await page.goto('/engineering-use-cases/');
    const text = await page.locator('main').innerText();
    expect(text).toMatch(/designs, develops and delivers engineering solutions/i);
    expect(text).not.toMatch(/deployed at|installed at|our clients?|for our customer/i);
  });
});
