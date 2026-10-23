import { test, expect } from '@playwright/test';
import { PAGES } from './pages';

const PHONES = [['+91 89712 34343', 'tel:+918971234343'], ['+91 99024 06387', 'tel:+919902406387']] as const;

test.describe('footer', () => {
  for (const path of PAGES) {
    test(`structure, contacts and header clearance: ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(900);
      const footer = page.locator('#site-footer');
      await expect(footer).toBeInViewport();

      // call to action, columns and bottom bar
      await expect(footer.getByRole('heading', { name: "Let's engineer what comes next." })).toBeVisible();
      await expect(footer.getByRole('link', { name: /Start a conversation/ })).toHaveAttribute('href', '/contact/');
      for (const h of ['Services', 'Explore', 'Get in touch']) await expect(footer.getByRole('heading', { name: h, exact: true })).toBeVisible();
      await expect(footer.getByRole('link', { name: /View all services/ })).toHaveAttribute('href', '/services/');
      for (const [label, href] of [['Products & Solutions', '/products/'], ['Industries', '/industries/'], ['Case Studies', '/case-studies/'], ['About', '/about/'], ['Contact', '/contact/'], ['Privacy Policy', '/privacy/'], ['Image Credits', '/image-credits/']] as const) {
        await expect(footer.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href);
      }
      for (const [text, href] of PHONES) await expect(footer.getByRole('link', { name: text })).toHaveAttribute('href', href);
      await expect(footer.getByRole('link', { name: 'gururaj.n@siddhrans.com' })).toHaveAttribute('href', 'mailto:gururaj.n@siddhrans.com');
      await expect(footer).toContainText('Bengaluru, India');
      await expect(footer).toContainText(`© ${new Date().getFullYear()}`);

      // the floating header must not sit over the footer, and the two logos must never overlap
      const r = await page.evaluate(() => {
        const nav = document.querySelector('header.nav') as HTMLElement; const navBar = nav.querySelector('.nav__bar') as HTMLElement;
        const cs = getComputedStyle(nav); const hidden = nav.classList.contains('nav--away') && parseFloat(cs.opacity) < 0.05 && cs.pointerEvents === 'none';
        const f = (document.querySelector('#site-footer') as HTMLElement).getBoundingClientRect(); const nb = navBar.getBoundingClientRect();
        const fl = (document.querySelector('#site-footer .logo') as HTMLElement).getBoundingClientRect(); const nl = (document.querySelector('header.nav .logo') as HTMLElement).getBoundingClientRect();
        const overlap = !(nl.right <= fl.left || nl.left >= fl.right || nl.bottom <= fl.top || nl.top >= fl.bottom);
        const overFooter = nb.bottom > f.top && nb.top < f.bottom;
        return { hidden, overlap, overFooter, footerLogoVisible: fl.width > 100 && fl.height > 20, cta: (document.querySelector('.fcta') as HTMLElement).getBoundingClientRect().height };
      });
      expect(r.hidden || !r.overFooter, 'floating header must be hidden or clear of the footer').toBe(true);
      expect(r.overlap && !r.hidden, 'header logo must not overlap the footer logo').toBe(false);
      expect(r.footerLogoVisible).toBe(true);
      expect(r.cta).toBeGreaterThan(120);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('header returns when scrolling back up', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(800);
    await expect(page.locator('header.nav')).toHaveClass(/nav--away/);
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
    await expect(page.locator('header.nav')).not.toHaveClass(/nav--away/);
  });

  test('both telephone links are valid tel: URIs with the full international number', async ({ page }) => {
    await page.goto('/contact/');
    const hrefs = await page.locator('a[href^="tel:"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
    expect(hrefs.sort()).toEqual(['tel:+918971234343', 'tel:+919902406387']);
    for (const h of hrefs) expect(h).toMatch(/^tel:\+91\d{10}$/);
  });

  test('contact page shows both numbers (and the original number is kept first)', async ({ page }) => {
    await page.goto('/contact/');
    const aside = page.locator('aside[aria-label="Contact details"]');
    const links = aside.locator('a[href^="tel:"]');
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveText('+91 89712 34343');
    await expect(links.nth(1)).toHaveText('+91 99024 06387');
    await expect(aside.getByRole('link', { name: 'gururaj.n@siddhrans.com' })).toBeVisible();
  });

  test('structured data lists both telephone numbers', async ({ page }) => {
    await page.goto('/');
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? '{}');
    expect(ld.telephone).toEqual(['+918971234343', '+919902406387']);
  });

  test('footer links are keyboard reachable with visible focus', async ({ page }) => {
    await page.goto('/about/', { waitUntil: 'networkidle' });
    await page.locator('#site-footer a[href="/products/"]').focus();
    const ok = await page.evaluate(() => { const cs = getComputedStyle(document.activeElement as HTMLElement); return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2; });
    expect(ok).toBe(true);
  });
});
