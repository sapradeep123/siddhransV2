# Current site audit

Scope: production release `20261024-071724` (live at siddhrans.vackya.com) against the previous release `20261023-105401`, the repository, and the company material that exists in the repo (`docs/PHASE1_DISCOVERY.md`, `CONTENT_APPROVALS.md`). The original company-profile PDF and use-case deck are **not on this server**; where they are quoted below the source is the discovery document that summarised them. Measurements were taken in Chromium (1440 px and 390 px) on both releases.

## 1. Headline finding
The 24 Oct redesign did what the brief asked ("electronics-led") but over-corrected. On the homepage, **about 62 % of vertical space is hardware** (hero, PCB, firmware, VLSI, lifecycle, IoT, utilities, safety), **about 6 % is AI at all** (one vision band) and the whole software/AI/security/cloud story is squeezed into one 11 % section. AI/ML as a business capability is effectively invisible above the fold.

## 2. Measurements

| Metric | 23 Oct release | Current | Change |
|---|---|---|---|
| Homepage height, desktop 1440 | 11,178 px | 15,138 px | **+35 %** |
| Homepage height, mobile 390 | 15,332 px | 17,529 px | +14 % (already long) |
| Sections | 8 | 12 | +4 |
| Images on homepage | 24 | 22 | similar |
| Services | 8 | 13 (5 electronics listed first) | +5, AI is #8 |
| Use cases listed AI-first? | interleaved | 15 electronics, then 5 software/AI | AI demoted |

Current homepage section weights (desktop height, % of page): hero 7 %, PCB 7 %, firmware 9 %, VLSI 8 %, product lifecycle 7 %, Industrial IoT 9 %, smart utilities 7 %, AI vision 6 %, safety 8 %, "software, AI, security, cloud" 11 %, product portfolio 9 %, systems built 7 %.

## 3. Where the last redesign went wrong

### 3.1 Over-emphasised electronics and embedded
- Hero headline, eyebrow, lede, chips ("PCB", "FW", "IoT"), marquee and imagery are all hardware. The only AI mention in the hero is the phrase "supported by AI".
- Nine of twelve homepage sections are hardware or IoT. Four of them (firmware, utilities, vision, safety) reuse the same "heading + two images + link" layout.
- Footer "Services" column lists **six electronics services and no AI, software, security or cloud link**. Primary navigation has no AI entry at all.
- Contact form "area of interest" lists electronics first; site description, `keywords` and OG image are hardware-only. Search engines and link previews now describe a hardware company.
- VLSI has a full homepage section (8 %) and a service page although the evidence for it is the weakest in the company (no evidence in any supplied material; wording is "scoped per engagement").

### 3.2 AI/ML visibility reduced
- The AI service page is unchanged (8 bullets, 5 steps, a generic "data wall" stock photo) but is now service **08 of 13**, behind five hardware pages.
- There is no page or section for agents, copilots, RAG, document intelligence or AI-enabled applications. The existing page lists them as bullets only.
- No AI visual exists on the homepage other than the capsule-counting vision image. There are no software-interface visuals for AI (copilot, document extraction, dashboards).
- AI use cases (vehicle detection, label inspection, product-data enrichment, NLP) are listed 16-20 with generic stock images (data wall, analyst monitors, fibre patch panel); the NLP data-leak card is illustrated with network cables.

### 3.3 Enterprise software pushed down
- The 15 named delivered systems, the **only evidence in the company material classed as delivered**, appear in the last two homepage sections (16 % of the page) after nine hardware sections.
- Products, LMS and Talent case studies still exist but are no longer reachable from the hero or the first screens.
- Nav label "Solutions" for the software portfolio is ambiguous after the repositioning.

### 3.4 Useful content removed or diminished vs the 23 Oct release
| Item | Status now |
|---|---|
| "One partner across the whole technology lifecycle" (8-stage lifecycle) | Removed from home (still on /services/) |
| Industries bento (education, manufacturing, healthcare, energy, water, talent, logistics, retail) | Removed from home |
| "Working with us / extended engineering team" + leadership snippet | Removed from home (leadership still on About) |
| Hero trust bar "15 named systems" | Dropped from hero |
| Hero chips "Applied AI", "Secure by design" | Replaced by PCB / Firmware |
| Capability showcase: embedded as one of five; AI and software equal weight | Showcase now software-only, below nine hardware sections |
| About page opening paragraph on software history and "Modernise" principle | Rewritten / replaced |
| Cybersecurity and cloud: visible in hero lede and chips | Only a 4-panel accordion low on the page |

### 3.5 Length, repetition and imbalance
- 15,138 px desktop / 17,529 px mobile is roughly **21 phone screens** (17,529 ÷ 844). The previous release was already 18. Target in this plan: 10 or fewer.
- Repeated pattern: eyebrow → large H2 (3-4 lines) → one-line lede → two images → pill + link. Used 6 times. Section tone alternates dark / white / dark / mist; the five white or mist sections (PCB, VLSI, lifecycle, utilities, vision) are what reads as **"pale"**: the supplied product shots have white backgrounds and sit on white or mist, so the page loses contrast and depth.
- Homepage imagery is almost entirely hardware, infographics or product shots; there is no software UI, no workflow diagram and no people or plant context. Much of it is AI-generated concept art or white-background product shots, mixed with stock photographs, which reads like a catalogue rather than an engineering practice.

### 3.6 Hardware not connected to AI applications
Hardware sections end at "dashboard" or "alerts". Nothing says what the intelligence layer is (anomaly detection model, copilot for technicians, RAG over manuals, predictive maintenance, vision model) or that the same team builds the application, data pipeline and model. The one genuinely differentiating story, **AI that spans the app and the machine**, is the least visible message on the site.

## 4. What is strong and must be kept
- Honest labelling system (Systems built / Engineering capability / Engineering solutions / Scoped per engagement; Designed system / Proposed solution / Capability example) enforced by tests.
- Logo integrity gate, accessibility (axe 0 violations), static export, contact API, release/rollback process.
- Prepared images: ESP32 breadboard, motor vibration board, pump infographic and real pump photo, architecture diagram, label mismatch, capsule vision, gas meter, PCB inspection photos, etc. All remain valuable for the AI-meets-machines and electronics sections.
- Concept-UI components (`concept.tsx`: LMS, Talent, Billing, POS, Ops) are the only software visuals and should be reused and extended for AI.
- Content guardrails (no ISO, clients, testimonials, unverified percentages, etc.).

## 5. Evidence constraints that shape any redesign
From the company profile as summarised in `PHASE1_DISCOVERY.md`:
- **Delivered:** 15 named software systems since 2016 (LMS, 3 Talent platforms, GST Billing, POS, Restaurant, Catering, Gym Master, Project Management, Salon, Cargo, Dialysis, Film Event, Inventory). No client mapping or usage numbers.
- **Capability, not deployments:** AI/ML, RPA, data, cybersecurity, cloud and managed services are "designed, prototyped and applied on engagement"; the profile itself says "we do not claim production AI deployments".
- **Embedded/IoT/AI-vision examples** come only from a deck whose own slide 2 says its source is historical Bheeshmaa Business Services documents with "no claim of Siddhrans project ownership". Several figures are unverified; client names and images are not publishable.
- **Not on the profile at all:** PCB design, VLSI, FPGA, edge AI as services.
- Still gated: client names, testimonials, ISO history, "6 sectors".
Implication: **"AI is our strongest differentiator" is a strategic judgement, not yet a documented fact.** The site can say AI is the lead capability and the lens through which we engineer; it cannot say we have deployed AI at scale until proof exists (see AI_CAPABILITIES_PLAN.md).

## 6. Quick-win defects independent of strategy
- Footer services column and nav omit AI/software/security/cloud.
- `site.description`, `keywords`, OG image, JSON-LD describe hardware only.
- AI service page image (`data-wall`) is stock monitors; no AI-specific visual.
- Vehicle-detection image shows a legible real number plate (privacy risk); gas-meter and label images show third-party marks (RCT METERview, SITEX, SUPER TECH).
- Hero caption/chips overlap the infographic on tablet (fixed once, still tight).
- 13 services with `n / 13` numbering is a long list for a visitor; no grouping on the services hub beyond two headings.

## 7. Addendum (revision 2): review of repositories and company material
Searched the server for Siddhrans-related material before proposing any new showcase work.

| Source | Finding |
|---|---|
| This repository (`siddhransV2`, 11 commits, branches `main` and `electronics-repositioning`) | Only source of company facts: `docs/PHASE1_DISCOVERY.md`, `PHASE2_DESIGN.md`, `CONTENT_APPROVALS.md`, `IMAGE_REGISTER.md`, `IMAGE_INVENTORY.md`, content files, tests. No other Siddhrans repository exists here |
| Company profile PDF, use-case deck (PPTX) | **Not on this server** (the discovery work was done on another machine). Facts are available only as summarised in the discovery document |
| Supplied images (`/root/siddhrans/Pics`: Pradeep Pics, GPT Pics, Missed Pics) | 40 files; artefacts of vision output, edge prototypes and IoT systems; provenance not documented (see IMAGE_INVENTORY.md) |
| Saved briefs and approvals | The briefs given to Claude Code on this server cover deployment, SMTP, email design, images and positioning; they contain **no project records, client evidence or AI delivery information** |
| Other projects on this VPS (xsainik, hataka, cyberlabs, Tier0, GIS, trade, defence and others) | They contain **no Siddhrans references**. They appear to be separate websites/projects. They were **not opened or used**. If any of them is Siddhrans work and may be described publicly, say so: it could supply AI proof without building anything |
| Approval status | Items in `CONTENT_APPROVALS.md` remain open (client names, testimonials, ISO history, "6 sectors", Bheeshmaa provenance). No approval has been recorded that would let the site claim a delivered AI project |

**Count discrepancy found and resolved:** the profile names 15 systems; the site listed 16 names because it showed "Online training programmes" as a system. The company confirmed it belongs to the LMS offering, so the count is exactly 15 (SERVICE_PRODUCT_MAPPING §3). The site code still needs this correction at implementation.

**Conclusion:** the evidence base is the profile's capability statements, the 15 delivered systems, the supplied deck-derived examples (provenance unconfirmed) and the supplied images. It supports an AI-led *capability* presentation with honest labels, and does not support claims of completed AI deployments.
