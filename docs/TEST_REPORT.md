# Test report: Siddhrans InfoTech website

Run on 2026-10-23 against the production build (`npm run build` → `out/`), served locally with the same security headers and compression that `docs/DEPLOYMENT.md` specifies. Browser: installed Microsoft Edge (Chromium) via Playwright 1.64.

## Summary
| Check | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | pass |
| Next.js production build (22 static pages) | pass |
| Logo integrity (`npm run verify:logo`) | **pass**: `public/` and `out/` copies match SHA-256 `9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7`; the committed git blob matches too |
| Contact API unit tests (`node --test`) | **9 / 9 pass** |
| Playwright end-to-end suite | **279 passed, 0 failed, 3 skipped** (93 tests × desktop 1440, tablet 820, mobile 390) |
| axe-core accessibility (WCAG 2 A/AA, 2.1 A/AA, **2.2 AA**, best-practice rules), all 18 pages × 3 viewports | **0 violations** |
| Lighthouse, desktop, 9 key pages | Performance 99–100, Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse, mobile (simulated slow 4G, 4× CPU), 9 key pages | Performance **90–99**, Accessibility 100, Best Practices 100, SEO 100 |

Full Lighthouse table: `docs/LIGHTHOUSE.md` (mobile LCP 2.0–3.6 s, CLS 0, TBT ≤ 50 ms; pages transfer 370–600 KB). Scores vary by a few points between runs.

The 3 skips are intentional: the mobile-menu test does not apply at desktop width (1), and the full-stack form test runs once, on desktop (2).

## What the end-to-end suite covers
- **Every page** (10 pages + 8 service pages): HTTP 200, exactly one `h1`, unique title, no horizontal overflow, no broken images, every image has `alt`, **no console errors or warnings, no failed or 4xx/5xx requests**.
- **SEO**: meta description, canonical URL, Open Graph title and image, `lang="en-IN"`, valid Organization JSON-LD on every page; `robots.txt` and `sitemap.xml` list every page.
- **Links**: site-wide crawl of all internal links (all return 200); every in-page `#anchor` resolves to an element.
- **Logo**: served file hashes to the approved SHA-256; renders at native 2200×1109, aspect ratio within 0.3 % of the original, no CSS filter or transform, the full artwork box lies inside its clipping container on header, footer and contact/about pages at all three viewports.
- **Navigation**: every top-level link reaches its page; the mobile menu opens, marks the current page, closes with Escape and returns focus to its button; skip link is the first tab stop and works; visible focus outline (≥ 2 px) on every tab stop tested; custom 404 page with HTTP 404.
- **Contact form**: required-field and email validation with focus moved to the first error and `aria-invalid`/`role="alert"`; loading state (disabled button) then success message; server error (502) shows direct email and phone and keeps what the visitor typed; rate-limit (429) message; network failure message; honeypot field hidden from users and keyboard order; tel/mailto links use the profile details.
- **Full stack** (desktop): a real browser submits the form through the static server's `/api` proxy to the actual contact API, and the test asserts the email that would be sent: recipient `gururaj.n@siddhrans.com`, reply-to, subject by area, body text.
- **Use-case library**: filtering by status, live count, and "All" restores all 20.
- **Content guardrails** (fail the build if broken): none of ISO, Bheeshmaa, testimonials, named clients, 40 % / 97 % / 15–20 %, "6 sectors", "sold to a US company", SAP ECC, Claude/Anthropic/Co-Authored appears in visible text or alt/title/aria/meta attributes on any page; every photograph is captioned "Illustrative image" and the footer says photographs are not project photographs; use cases are never described as deployed client work.

## Contact API unit tests
Valid enquiry emailed with reply-to; invalid fields → 400 with errors and nothing sent; honeypot → silent success, nothing sent; header-injection attempts neutralised; rate limit → 429 with `Retry-After`; per-client limiting via `X-Forwarded-For` only when the proxy is trusted; oversized body → 413, malformed JSON → 400, wrong method → 405, wrong content type → 415, unknown route → 404; SMTP failure → 502 without leaking details; field trimming and area defaulting.

## Defects found and fixed during testing
1. Client-router prefetch files returned 404 on a plain static host (console errors on every page) → the site now uses plain links; no router payload requests exist.
2. Horizontal overflow (191 px) on the mobile Embedded & IoT page from a three-column grid set inline → moved to responsive CSS.
3. Footer headings skipped heading levels (axe `heading-order`) → footer headings are now level 2.
4. Oversized request bodies reset the connection instead of returning 413 → the API now drains and answers 413.
5. Page-hero status labels had low contrast on dark photographs → light outline/background added.
6. Mobile Lighthouse performance 74–84 → 90+: removed Archivo's width axis (88 KB → 35 KB font), added brotli/gzip and immutable caching in the test server (mirrors the nginx config), added 720 px image variants.
7. Stale compression cache in the test server served an old page after a rebuild → cache keyed by file modification time.

## Not tested / limitations
- Only Chromium (Microsoft Edge) was exercised; Firefox and Safari were not run.
- No real SMTP delivery: the form path is tested end to end up to the message handed to the mail transport. Send one real enquiry after deployment.
- No manual screen-reader pass; automated axe checks only (they cannot cover everything in WCAG 2.2).
- Lighthouse ran against a local server with simulated throttling, not the production host or a CDN.
- The deployment steps in `docs/DEPLOYMENT.md` have not been executed.

## Reproduce
```
npm ci && npm run build
npm run verify:logo && npm run test:api && npm run test:e2e
npm run lighthouse        # writes docs/LIGHTHOUSE.md
npm run screenshots       # needs `npm run serve` running; writes docs/screenshots/ (git-ignored)
```
