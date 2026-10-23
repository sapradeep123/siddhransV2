# Siddhrans InfoTech — Phase 1 Discovery Report

Date: 2026-10-23 · Status: **awaiting approval (Gate 1)** · No application code written, no production changes, nothing installed.

---

## 0. Headline findings (read these first)

1. **The live site is currently blank.** `siddhrans.com` 301-redirects to `https://cyyberaix.in/`. That page is a Vite + React single-page app. In my tests (curl and Edge) the main JS bundle was truncated: the server declares 398,140 bytes but delivered 97,932, so React never mounts and the page renders empty. I did not touch the server. This may be intermittent, so please check it yourself.
2. **There is no website source repository on this machine.** `C:\Projects\Siddhrans` holds only the 3 supplied files and an empty `Basic Info` folder. I found only the *built* output on the live server (hashed JS/CSS). "Preserve existing working features and integrations" cannot be assessed until you supply the source or server access (see Q1).
3. **Domain oddity:** the company site is served from `cyyberaix.in`, a different name. Is that deliberate (a sister brand)? We need to know the canonical domain before writing canonical URLs, Open Graph tags and the sitemap.
4. **Logo: the PNG is transparent and has large empty padding.** It is 2200×1109 (RGBA); the artwork fills roughly 80% of the width and 40% of the height. The tagline "Easy Success with Excellent Consulting" is **black**, so the logo must sit on a light surface. Never place it on a dark header. Details in §3.
5. **Most of the engineering use-case deck is not Siddhrans-owned work.** The deck's own slide 2 says so, and a companion evidence register (found in `Downloads\Siddhrans Profile\Others`) confirms the originals were written by *Bheeshmaa Business Services* (historical) and that "no approval has been given for any item". These items must not appear as Siddhrans case studies. See §6.
6. **Supplied filenames differ from your brief.** Actual files are `Siddhrans_Logo.png`, `NewKSiddhrans InfoTech Pvt Ltd — Company Profile.pdf` and `17Oct-…Use_Cases.pptx`, with no "(1)" or "(2)" suffix. I treated them as the intended files.

**Logo SHA-256 (supplied master, recorded before any copy):**
`9BFD52B5AA328B90DC5C0CA9A7E7B8966746787EA22B5688E6F902E56FB7DFA7` (115,303 bytes)

---

## 1. Current website assessment

| Area | Finding |
|---|---|
| Domain / hosting | `siddhrans.com` → 301 (LiteSpeed) → `cyyberaix.in`, served by nginx 1.24 on Ubuntu. Assets last modified 2026-08-17. Security headers present: `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`. |
| Stack | Vite + React SPA, single route `/`, about 98 KB JS in the portion I received (398 KB declared) and 110 KB CSS. Fonts: Space Grotesk, Inter, IBM Plex Mono (Google Fonts). Theme colour `#14171B` (dark). |
| Pages / routes | One route only. I found no multi-page structure in the bundle. |
| SEO | `<div id="root">` is empty in the served HTML, so crawlers get only the title and meta description. `robots.txt` and `sitemap.xml` return **HTTP 200 with the SPA's HTML**, so neither is a real file. No Open Graph tags seen. |
| Contact mechanisms | No form element, email address or phone number found in the bundle text. I could not render the page, so I could not confirm what is on screen. **Unknown. Needs source or your input.** |
| Branding | Dark theme `#14171B` plus favicon `./brand/favicon.png` (26 KB). I could not confirm whether this is the official logo or a derived mark. The site tagline ("Technology Engineering, AI & Cybersecurity Partner") matches the company profile. A dark theme clashes with the black-tagline logo. |
| Responsiveness / a11y / performance | **Not measurable.** The page does not render. Screenshots at 1440 and 390 px are blank cream (`C:\Users\srira\AppData\Local\Temp\claude\C--Projects-Siddhrans\e53fcf82-d22b-43f7-b6c4-9c492a28c419\scratchpad\live\desktop.png` and `mobile.png`). |
| Console | `net::ERR_CONTENT_LENGTH_MISMATCH` on the JS bundle (the truncation above). |

**Incremental modernisation vs rebuild:** with no source, incremental work is impossible. Recommended path is a **new project in a separate folder** that leaves the old site untouched. It would be built to a static output that can replace the current files on the VPS at your own deployment gate.

---

## 2. Claude Code tooling audit

Method: checked local config (`~/.claude/settings.json`, `~/.claude.json`, plugin marketplace folders), the global Python and Node toolchain, and the official-marketplace plugin list. **I did not verify vendor sites, licences or pricing online.** The points below on licences, costs and data sharing come from my prior knowledge and must be confirmed before any install.

| Tool | Installed? | Equivalent already available? | Assessment | Recommendation |
|---|---|---|---|---|
| **Playwright** | Python package 1.58.0 is installed globally. **Browser binaries are not** (`chromium_headless_shell-1208` is missing). Edge launches fine via `channel="msedge"`, which I used for the screenshots. An official `playwright` plugin is listed in the marketplace but not enabled. Node `playwright@1.64.1` is not installed in any project. | None for repeatable tests. The Chrome extension tools are manual only. | Apache-2.0, no cost, local execution, no data sent out. Directly serves §9 (screenshots, overflow, forms, keyboard, console). | **Adopt.** Add `@playwright/test` as a project devDependency and use the installed Edge or Chrome channel to avoid a ~150 MB browser download. **Needs your approval.** |
| **21st MCP (21st.dev Magic)** | Not installed | `frontend-design` skill and official plugin already available. Hand-built components or the shadcn/ui CLI (MIT, copies source locally) are alternatives. | Hosted service with an API key and paid tiers. Sends prompts to a third party. Components arrive in a generic style that conflicts with "distinctive, not generic". | **Not recommended.** Use `frontend-design` plus hand-written components. Revisit only if you want it. |
| **Graphify** | Not installed | Plan and Explore agents suffice. | A greenfield site of roughly 30–50 files does not justify a knowledge graph. | **Skip** (optional later). |
| **Compound Engineering** | Not installed; not in the official marketplace | Built-in Plan agent, `code-review`, `feature-dev` and `code-simplifier` plugins. | Adds a workflow layer I can't verify as compatible with your setup. | **Skip.** The approval gates in your brief already structure the process. |
| **Harvey** | Not installed | n/a | As far as I know, Harvey is a **legal-AI** product, not a sales-workflow tool. Possible name mix-up. There is no demonstrable need for this site. | **Skip.** Tell me if you meant something else. |
| **Lighthouse** (needed for §9) | Not checked | — | Runs from Chrome DevTools or `npx lighthouse`. | Approve `lighthouse` as a dev tool at Phase 4. |

Smallest effective toolchain: **Playwright (+ Lighthouse) only**, with existing skills for design.

---

## 3. Logo handling plan (acceptance criterion)

- The master stays untouched at `C:\Projects\Siddhrans\Siddhrans_Logo.png`. At Phase 3 it is copied byte-for-byte to `public/brand/Siddhrans_Logo.png` and the SHA-256 compared with the hash above. A Playwright test will re-hash the *served* file and also assert the rendered aspect ratio equals 2200:1109 (±0.5%).
- **Padding:** about 8–9% of the width is transparent on each side and about 30% of the height above and below. To get a legible header size without altering pixels I propose a fixed-height container with `overflow: hidden` and negative margins that only hides the *transparent* margin. This is a display-container change, not an image change. **I need your OK on this** because it visually trims empty pixels, even though no visible artwork is cut. The alternative is to show the whole image, which would make the logo look small and the header very tall.
- **Background:** always on white or near-white (`#FFFFFF`/off-white). No dark header, no filters, no blend modes.
- **Minimum size:** the tagline needs about ≥ 220 px logo width to stay readable, which means a mobile header at roughly 64 px of visible logo height (to be tested).
- **Favicon:** not generated. The current site's favicon is untouched. Per your rule I will ask before creating any derived asset.

---

## 4. Content inventory (from the Company Profile PDF, 18 pages, all text extracted)

| # | Content block | Source | Website use |
|---|---|---|---|
| 1 | Positioning: "Technology Engineering, AI & Cybersecurity Partner"; Build · Automate · Secure · Modernise · Operate | PDF p1 | Home hero |
| 2 | Context: applications, data, AI, automation, infrastructure, security are interdependent | p2 | Home intro |
| 3 | 8-stage lifecycle: Discover → Design → Build → Automate → Secure → Modernise → Operate → Optimise | p3 | Home "How we work" |
| 4 | Company story: began 2016 as a Bengaluru software practice; now Siddhrans InfoTech Pvt Ltd | p4 | About |
| 5 | Stats: 2016; "15+" named systems; "6" sectors | p4 | About (see discrepancy D2) |
| 6 | Leadership: Gururaj N (Founder & CEO); Pavithra H.B (Co-Founder, VP & CHRO) | p4 | Leadership |
| 7 | 7 capability areas (AI/ML; RPA; Enterprise Software; Data/Analytics/Integration; Cloud/Server/Infra; Cybersecurity; Managed Services) | p5 | Services hub |
| 8 | Enterprise Software + 15 named delivered systems in 4 groups | p6 | Services, Products |
| 9 | Track record timeline 2016 / 2016–2020 / Today | p7 | About |
| 10 | Case study: Siddhrans LMS | p8 | Case Studies |
| 11 | Case study: Talent Sandalwood / Workforce / Sports Force | p9 | Case Studies |
| 12 | AI & Intelligent Automation (capability) | p10 | Service page |
| 13 | RPA & Process Automation (capability) | p11 | Service page |
| 14 | Data, Analytics & Integration | p12 | Service page |
| 15 | Cybersecurity, 7 layers (capability) | p13 | Service page |
| 16 | Cloud, Server & Infrastructure | p14 | Service page |
| 17 | Proposed solution: secure examination environment | p15 | Solutions (labelled *Proposed*) |
| 18 | Managed Technology Services | p16 | Service page |
| 19 | Clients by sector (named), 3 testimonials, ISO note | p17 | Gated, see §5 |
| 20 | Why Siddhrans; contact: +91 8971234343, gururaj.n@siddhrans.com, Bengaluru | p18 | Contact |
| 21 | 26 engineering use cases (IoT, embedded, medical electronics, AI/vision, ERP) | PPTX slides 3–26 | Engineering Use Cases (gated, see §6) |

**Visual review limit:** the PDF has no embedded images (vector layout), and I've extracted its full text. For the PPTX I've extracted all text from 26 slides (there are no speaker notes), but I **haven't yet visually reviewed its 33 embedded images**. The `GPT Pics` folder name suggests many are AI-generated, so they would be labelled illustrative. I'll complete that review before Phase 2.

---

## 5. Claim and provenance matrix (company profile)

Status key: **D** delivered/in-production per company profile · **C** general capability · **P** proposed · **A** needs your approval before publishing.

| Claim | Class | Note / action |
|---|---|---|
| Practice founded 2016, Bengaluru | D | OK. Incorporation date of the Pvt Ltd isn't given, so avoid stating one. |
| 15 named systems built (LMS, 3 Talent, GST Billing, POS, Restaurant, Catering, Gym Master, PMS, Salon, Cargo, Dialysis, Film Event, Inventory) | D | I counted exactly 15. Profile says "in production use" but gives no client mapping or evidence. Phrase as "systems built", not usage numbers. |
| "6 sectors served" | **A** | The profile lists 5 (education, logistics, healthcare, events, retail). Confirm the sixth (D2). |
| AI/ML, RPA, Data, Cloud, Cybersecurity, Managed Services | C | The profile itself says "designed, prototyped and applied on engagement… we do not claim production AI deployments". Must carry the same wording. No SOC, accreditation or deployment claims. |
| Secure examination environment | P | Profile says "solution architecture, not a completed deployment". Label *Proposed*. |
| Named clients (Indian Air Force, EAOTA Cargo, Safest Fire & Safety, Saptha Events, Film Society of Bhubaneswar, AutoCare/Yukon Cars, Portal HR, B.R. Shetty Foundation, Pinks n Blues, Finesse Granite, Little Genius, Saikrupa Dental, Blackhorse Services, Moon Computers) | **A** | Client names and logos need written permission. Indian Air Force in particular. Also confirm these relationships belong to the Pvt Ltd or its predecessors. |
| Testimonials (Anand Kumar B, 2019; Portal HR Services, 2019; Dr Soni Rani, AutoCare) | **A** | Named quotes need consent. Two are dated 2019. |
| ISO 9001:2015 | **A / restricted** | Certified 2019–2020 **as Siddhrans Technologies LLP**. The profile says re-certification under the Pvt Ltd is "a separate, current decision". **Do not show an ISO badge or say "ISO certified".** At most: "previously ISO 9001:2015 certified (2019–2020)" if you approve. |
| "Fantastic work…" and "It feels as if we have gained an internal team…" | **A** | See testimonials. |
| Contact: phone, email | verified in PDF | See D3. No street address and no social accounts exist in the sources, so none will be published. |

---

## 6. Engineering use-case deck (PPTX) — provenance

Slide 2 of the deck states: *"Branding: Siddhrans Infotech. Source provenance: Bheeshmaa documents. No claim of Siddhrans project ownership is implied."* The evidence register lists nine source files, all authored by Bheeshmaa Business Services.

| Class | Slides | Items |
|---|---|---|
| Reported implementation / client case (source-reported, unverified) | 3, 4, 7, 15–19 | Contactless powder mixing (prototype "sold to a US company"), handheld ECG, secure lab tracking, vehicle detection (40% faster reporting), label inspection, product-data enrichment, NLP sentiment (bank PoC), NLP data-leak prevention |
| Designed / prototyped | 5, 6, 8 | PPG wearable (accuracy unverified), vibration monitoring, smart factory quality |
| Proposal / concept | 9–13 | Gas meter (50-unit PoC), medical kit (50-kit pilot), HVAC EMS, theatre cooler, drone endurance (15–20% *target*, not measured) |
| Catalogue solution (no project evidence) | 14, 20–22 | Water quality, cold chain, warehouse, industrial safety |
| Historic portfolio (profile-sourced, client-linked) | 23–26 | Supplier portal + SAP ECC, manufacturing ERP, hospital management, learning management |

**Recommended website treatment (pending your answer to Q2):** present all of these as **"Engineering Use Cases"**, meaning capability illustrations. Each gets a visible tag such as *Concept*, *Prototype (reported)* or *Catalogue solution*. They would not appear as Siddhrans case studies, and I'd use no performance numbers (40%, 97%, 15–20%, ROI) because the evidence register itself flags them as unverified or conflicting. Real, named case studies would be limited to the LMS and Talent platforms from the company profile.

**Conflicts flagged inside the sources** (from the register): ROI figures conflict across documents; the gas proposal contradicts itself on cost saving and certification; slide 7/15–19 images are "originally branded Bheeshmaa"; the label-inspection sample image shows a third-party brand (needs approval); the PPG "97% accuracy" has no stated metric.

**Illustrative imagery:** AI-generated pictures from the `GPT Pics` and `Pradeep Pics` folders would carry an "Illustrative image" caption. They are not project photographs.

---

## 7. Proposed sitemap

```
/                              Home
/about                         About Us  (story, timeline, Leadership section)
/services                      Services hub (lifecycle + 7 disciplines)
  /services/enterprise-software-engineering
  /services/ai-ml-intelligent-automation
  /services/rpa-business-automation
  /services/cybersecurity
  /services/cloud-infrastructure
  /services/data-analytics-integration
  /services/embedded-systems-industrial-iot     ← sourced from the use-case deck only
  /services/managed-technology-services
/products                      Products & Solutions (15 named systems; Proposed exam-environment solution)
/industries                    Industries (grouped by what the sources support)
/engineering-use-cases         Use-case library, filter by domain, evidence tag on every item
/case-studies                  Siddhrans LMS · Talent platforms (profile-backed only)
/contact                       Contact Us (form + verified phone/email)
/privacy                       Privacy notice (needed for the form)
/sitemap.xml  /robots.txt
```
Leadership is a section within About, not a separate page, since only two people are named and no bios were supplied. Clients and testimonials stay off the site until approved (§5).

**Gap to flag:** the profile does not describe *Embedded Systems & Industrial IoT* as a Siddhrans service. Those capabilities come only from the Bheeshmaa-sourced deck. I'll include the page only if you confirm Siddhrans offers this (Q2).

---

## 8. Recommended architecture

- **Next.js (App Router) + TypeScript with static export** (`output: 'export'`), prerendering every page to plain HTML. This fixes the main weakness of today's empty-root SPA, and static files can be served by the existing nginx. Alternative: **Astro**, which is lighter still. I recommend Next.js only because your brief names it and it matches the existing React skills.
- Plain CSS (modules and tokens), semantic HTML, `next/font`, and `<Image>`-style optimisation done at build time. No UI framework, no database, no Python.
- **Contact form:** a static export has no server. Options: (a) a tiny Node endpoint on your VPS that sends SMTP mail to the verified address, with honeypot and rate limit, no data stored (recommended); (b) a third-party form service (sends enquiries outside your infrastructure); (c) `mailto:` only (no real form). Needs your decision (Q4).
- Metadata: per-page titles/descriptions, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD `Organization` using only verified facts.
- Testing: Playwright + Lighthouse, as in §2.
- Design direction (for Phase 2): off-white and graphite base with the logo's green (sampled ≈ `#009040`) and yellow (≈ `#F8E000`) used as small accents only, such as rules, markers and one CTA colour. Engineering line-diagrams for the lifecycle and the AI/RPA/security layers instead of stock photos. Fonts to be chosen in Phase 2 (the current site's Space Grotesk, Inter and IBM Plex Mono are a reasonable starting point).

---

## 9. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Live site blank / truncated JS | Visitors see nothing today | Raise with whoever manages the VPS; independent of this project |
| No source for the old site | Existing integrations (forms, analytics) unknown | Q1 |
| Bheeshmaa provenance | False ownership claim, reputational/legal risk | Gating and labels in §6; written confirmation (Q2) |
| ISO badge, client names, testimonials | Misrepresentation or breach of confidence | Excluded until approved (§5) |
| Logo has black text and transparent padding | Illegible on dark surfaces; small in header | Light header, container-based sizing (§3) |
| Domain mismatch (`siddhrans.com` vs `cyyberaix.in`) | Wrong canonical/OG URLs, redirect SEO | Q3 |
| AI-generated imagery | Mistaken for real projects | "Illustrative" labelling |

---

## 10. Open questions (need your answers to proceed)

1. **Old site source / contact setup:** Where is the repo or server copy (is it on the VPS)? What currently handles enquiries, analytics, and email?
2. **Bheeshmaa relationship:** Is Bheeshmaa Business Services an earlier name, an affiliate or a partner of Siddhrans? May those projects be published, and as what (Siddhrans work, or "capability examples")? Does Siddhrans want an Embedded/IoT service page at all?
3. **Domain:** Is `cyyberaix.in` intended, or should `siddhrans.com` be canonical (and `cyyberaix.in` redirect to it)?
4. **Contact form:** Option (a), (b) or (c) from §8? Is `gururaj.n@siddhrans.com` the right inbox for enquiries, or is there a general address? Is a Bengaluru address publishable?
5. **Sources of truth:** The "6 sectors" stat (D2), whether to show the ISO history line, and whether any client names, logos or testimonials are cleared for publication.
6. **Logo container:** approve hiding the transparent padding with a CSS container (§3)?
7. **Tooling approvals:** install `@playwright/test` (and Lighthouse later) in the new project folder?
8. **Embedded images:** OK to use the AI-generated pictures in `Downloads\Siddhrans Profile\GPT Pics` and `Pradeep Pics` as labelled illustrations? Do you know their licensing or source?

**Discrepancy list:** D1 filename suffixes; D2 "6 sectors" vs 5 listed; D3 only a personal email (`gururaj.n@`) appears in the sources, no generic contact address.

---

## Gate 1

I will not begin Phase 2 (visual design direction) until you approve this report and answer at least Q1–Q4.
