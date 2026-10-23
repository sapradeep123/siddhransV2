# Siddhrans InfoTech website

Corporate website for Siddhrans InfoTech Pvt Ltd (Bengaluru): Next.js 16 + TypeScript, exported as a static site, plus a small SMTP-backed contact API.

## Layout
- `src/app` pages (static export, trailing-slash routes), `src/components`, `src/content` (all copy and company facts)
- `public/brand/Siddhrans_Logo.png` the official logo, **never modified** (SHA-256 `9bfd52b5…dfa7`, enforced by `npm run verify:logo` and the e2e suite)
- `public/img` optimised WebP photographs (licensed stock, see `docs/IMAGE_REGISTER.md`)
- `server/` contact API (Node + nodemailer, no database)
- `tests/` Playwright end-to-end, accessibility and content-guardrail tests; `scripts/` tooling
- `docs/` discovery, design, content approvals, image register, deployment and test report

## Commands
```
npm install
npm run dev            # local development
npm run build          # static export to out/
npm run verify:logo    # logo hash gate
npm run test:api       # contact API unit tests
npm run test:e2e       # Playwright (uses installed Microsoft Edge; run build first)
npm run lighthouse     # Lighthouse performance / accessibility / SEO / best practices
npm run check          # everything above except Lighthouse
```
Deployment is documented in `docs/DEPLOYMENT.md`. Nothing here deploys automatically.
