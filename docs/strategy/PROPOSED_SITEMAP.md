# Proposed sitemap and navigation (revision 2)

Principles: AI first in every list; **three pillars plus visible Foundations**; every existing URL stays live (static hosting has no server redirects); new pages only where there is real content.
Pillars: **1 AI & Intelligent Automation · 2 Software & Digital Engineering · 3 Embedded & Intelligent Electronics** (VLSI inside, qualified). **Foundations**: cloud, cybersecurity, data integration, managed services.

## 1. Primary navigation (desktop: 7 items + CTA)

| # | Label | Target | Dropdown |
|---|---|---|---|
| 1 | **AI & Automation** | `/ai/` (new hub) | AI agents & copilots · Documents & knowledge · Vision & predictive · Intelligent automation (RPA) · Edge AI |
| 2 | **Software** | `/services/enterprise-software-engineering/` | Enterprise software · AI-enabled applications · Data, analytics & integration · Products (15 systems) · Case studies |
| 3 | **Embedded** | `/services/embedded-systems-industrial-iot/` | Industrial IoT · Edge AI · Embedded firmware · PCB & hardware · Product development · VLSI design support |
| 4 | **Cloud & Security** | `/services/cybersecurity/` | Cybersecurity · Cloud & infrastructure · Data integration · Managed services |
| 5 | **Industries** | `/industries/` | |
| 6 | **Work** | `/engineering-use-cases/` | Engineering use cases · Products & solutions · Case studies |
| 7 | **About** | `/about/` | |
| CTA | **Start a project** | `/contact/` | |

Width check at the 1181 px breakpoint is a build-time item (labels are short); below 1181 px the existing full-screen menu shows the same groups. Skip link, `aria-current`, Escape-to-close and focus return are retained.
The current labels "Services", "Solutions", "Case Studies", "Engineering Use Cases" disappear from the top bar but remain as dropdown entries, hub pages and footer links. Tests that click those labels will be updated deliberately.

## 2. Service hierarchy (all 13 existing pages preserved; see SERVICE_PRODUCT_MAPPING.md)
```
/services/ (hub: all 13 grouped by pillar, AI first)
│
├─ 1 AI & INTELLIGENT AUTOMATION            hub: /ai/ (new)
│    ├─ /services/ai-ml-intelligent-automation/    flagship page (existing, expanded)
│    ├─ /services/rpa-business-automation/         intelligent automation (existing)
│    ├─ /services/edge-ai-intelligent-electronics/ edge AI (existing; cross-listed in pillar 3)
│    └─ gated sub-pages (only if the content gate passes): agents & copilots · document intelligence · vision & predictive
│
├─ 2 SOFTWARE & DIGITAL ENGINEERING
│    ├─ /services/enterprise-software-engineering/ existing (+ "AI-enabled applications" section)
│    ├─ /services/data-analytics-integration/      existing (cross-listed in Foundations)
│    ├─ /products/   (15 systems, four families)   existing
│    └─ /case-studies/ (LMS, Talent platforms)     existing
│
├─ 3 EMBEDDED & INTELLIGENT ELECTRONICS
│    ├─ /services/embedded-systems-industrial-iot/      existing
│    ├─ /services/embedded-firmware-microcontrollers/   existing
│    ├─ /services/pcb-hardware-engineering/             existing
│    ├─ /services/electronic-product-development/       existing
│    └─ /services/vlsi-semiconductor-design/            existing, "Scoped per engagement"
│
└─ FOUNDATIONS
     ├─ /services/cloud-infrastructure/            existing
     ├─ /services/cybersecurity/                   existing
     └─ /services/managed-technology-services/     existing
```
`/ai/` hub starts as a section-rich single page; sub-pages are created only when each has an existing artefact or diagram, specific content (≥ 400 words) and a status chip (AI_CAPABILITIES_PLAN §6). No URL is removed.

## 3. Other pages
| Page | Change |
|---|---|
| `/` | New 7-section home (HOMEPAGE_REDESIGN_PLAN.md, HOMEPAGE_PREVIEW.md) |
| `/engineering-use-cases/` | Same 20 entries, titles and statuses; pillar filter added (AI & automation / Software / Embedded); default order interleaves AI-meets-machines items first; AI entries get proper visuals |
| `/industries/` | Same 8 industries; each lists AI, software and hardware lines; shown as chips on the home page |
| `/products/`, `/case-studies/` | Content retained; promoted: linked from the hero, section 3 and the nav |
| `/about/` | Software-first origin restored; then AI and machines; leadership unchanged |
| `/contact/` | Form unchanged; area list AI-first |
| `/image-credits/`, `/privacy/` | Unchanged |

## 4. Footer
Five columns: **AI & Automation · Software · Embedded · Cloud & Security · Company** (About, Industries, Work, Contact, Privacy, Image credits), plus contact block. Every one of the 13 services has a footer link. The call-to-action heading "Let's engineer what comes next." and link "Start a conversation" are kept (tests depend on them).

## 5. SEO and metadata
- Title: "Siddhrans InfoTech: AI-led engineering, from software to smart machines".
- Description (≈155 chars): "AI agents, copilots and automation; enterprise software built since 2016; and embedded systems, IoT and electronics. AI-led engineering from Bengaluru."
- Keywords/JSON-LD: AI engineering, AI agents, enterprise copilots, intelligent automation, document intelligence, computer vision, custom software, enterprise applications, industrial IoT, edge AI, embedded systems, PCB design, VLSI design support.
- OG image: software/AI interface plus device composite (no logo redraw); per-pillar OG images for hubs.

## 6. Pillar page template
Hero (promise + status chip) → capability list with status chips → how we work → one reference visual → evidence/status note → "Built on" strip (Foundations: cloud · security · integration · managed) → related pillars → CTA. Pillar 3 pages add a "Where AI goes" box; pillar 1 pages add "With or without hardware".
