# Content migration map (revision 2)

> Aligned to the approved pillars and the 7-section home (HOMEPAGE_PREVIEW.md). Service-by-service and product-by-product detail is in **SERVICE_PRODUCT_MAPPING.md**; this file covers content blocks, metadata and images.

Legend: **Retain** keep as is · **Restore** bring back (adapted) from the 23 Oct release · **Rewrite** same place, new copy · **Consolidate** merge several items into one · **Move** relocate, content unchanged · **Hold** keep out until approved.
Nothing is deleted; every current URL stays live.

## 1. Homepage
| Item (23 Oct release / current) | Action | Destination (new section) |
|---|---|---|
| Hero H1 "From Circuit Design to Intelligent Systems." | **Rewrite** | S1 "AI-Led Engineering. From Software to Smart Machines." |
| Hero chips (PCB / FW / AI) and marquee | **Rewrite** / remove | S1 pillar chips; marquee removed (decorative) |
| Hero trust "15 named systems / Since 2016 / Founder-led" (23 Oct) | **Restore** | S1 trust strip |
| Capability showcase panels: AI, software, cybersecurity, cloud (23 Oct and current) | **Consolidate** | AI → S2; software → S3; cybersecurity and cloud → S6 tiles |
| RPA / Data / Managed bento | **Consolidate** | RPA → S2 #7; Data, Managed → S6 tiles |
| Product portfolio (laptop + phone concept UIs) | **Restore to prominence** | S3 stage |
| "Fifteen named systems" four-family list | **Restore to prominence** (all 15 names visible) | S3 tabs + chips |
| Case studies (LMS, Talent) | **Restore** link visibility | S3 CTA |
| Industrial IoT section + architecture diagram | **Retain** | S4 |
| AI vision (label mismatch + capsules) | **Retain** | S2 #6 and S4 card 2 |
| Smart utilities (gas meter) | **Retain** (condensed) | S4 card 3 |
| PCB section | **Consolidate** | S5 item + image strip; full text on PCB page |
| Embedded firmware section (ESP32 + motor images) | **Consolidate** | S5 item + image strip |
| VLSI section and flow | **Consolidate** | S5 qualified item; flow stays on the VLSI page |
| Product lifecycle (6 steps) | **Move** | `/services/electronic-product-development/` (already there) |
| Safety / access section (SOS, access watch) | **Move** | `/engineering-use-cases/`, `/industries/`, cybersecurity page |
| Lifecycle "one partner across the whole technology lifecycle" (23 Oct) | **Consolidate** | One sentence in S6; full version on `/services/` |
| Industries bento (23 Oct) | **Restore** as chip row | S6 |
| "Working with us / extended team" + leadership (23 Oct) | **Consolidate** | S6 managed-services tile; leadership on About |
| Status legend (new) | **New** | S7 |

## 2. Navigation and footer
| Item | Action |
|---|---|
| Nav (Services, Use Cases, Industries, Solutions, Case Studies, About) | **Rewrite** to AI & Automation · Software · Embedded · Cloud & Security · Industries · Work · About (SITEMAP §1); old labels remain as dropdown entries and hub pages |
| Footer services column (6 electronics links) | **Rewrite** to AI & Automation · Software · Embedded · Cloud & Security · Company; all 13 services linked |
| Footer CTA heading and link text | **Retain** (tests depend on it) |
| Footer note about image provenance | **Retain** |

## 3. Service pages
| Page | Action |
|---|---|
| `ai-ml-intelligent-automation` | **Rewrite/expand** (pillar 1 flagship): becomes the long-form AI capability page; AI-specific visual replaces `data-wall` stock |
| `rpa-business-automation` | **Move** under AI pillar as "Intelligent automation", copy retained |
| `enterprise-software-engineering` | **Retain**; add "AI-enabled applications" section (capability) |
| `data-analytics-integration` | **Retain** under software |
| `cybersecurity`, `cloud-infrastructure`, `managed-technology-services` | **Retain**; add "built on" cross-links from every pillar |
| `embedded-systems-industrial-iot`, `embedded-firmware-microcontrollers`, `pcb-hardware-engineering`, `electronic-product-development`, `vlsi-semiconductor-design`, `edge-ai-intelligent-electronics` | **Retain** content; add "Where AI goes" box to each; order after AI and software in the hub |
| New `/ai/` hub; sub-pages only if the content gate passes | **New** (AI_CAPABILITIES_PLAN §6) |

## 4. Use cases, industries, case studies, products, About, contact
| Item | Action |
|---|---|
| 20 use cases, titles/status labels | **Retain** unchanged |
| Ordering | **Rewrite**: AI-meets-machines and AI/software first, then electronics; track filter added |
| AI use-case imagery (analyst monitors, data wall, fibre patch) | **Rewrite**: replace with original concept UIs/diagrams |
| Vehicle-detection image with legible plate | **Hold** until the founders approve a blur/replacement |
| Industries page | **Rewrite** to group by industry with AI + software + hardware lines; **Restore** education/talent/retail prominence |
| Products, Case studies (LMS, Talent) | **Retain**; **Restore** hero/nav visibility |
| Secure examination environment (proposed) | **Retain**; use as the cross-pillar story (software + cloud + security) on home Section 6/7 |
| About | **Restore** software-first origin; add "taking intelligence into machines"; **Retain** leadership |
| Contact copy and form | **Rewrite** area list AI-first (API list already supports all values) |
| Image credits | **Retain** + keep the "supplied images" table |

## 5. Metadata
| Item | Action |
|---|---|
| `site.tagline`, `site.description`, `keywords` | **Rewrite** (AI + software + electronics) |
| OG image `og-default.jpg` | **Rewrite** (software/AI + device composite) |
| JSON-LD description | **Rewrite** |
| Per-page descriptions | **Rewrite** electronics-heavy ones (services hub, industries, about, contact) |

## 6. Prepared images (all retained, none overwritten)
| Image | New home |
|---|---|
| `ref-label-mismatch`, `ai-vision-capsules` | Home S2/S4; AI vision pages |
| `ref-pump-installation`, `ref-pump-infographic`, `ref-iot-architecture` | Home S4; IoT page |
| `ref-esp32-breadboard`, `ref-motor-vibration-board` | Home S4 hardware strip; firmware / product dev pages; use cases |
| `ref-gas-meter-phone`, `ref-gas-meter-standalone` | Home S4 card; use case |
| `ref-safety-sos`, `ref-access-watch` | Use cases, industries, cybersecurity page |
| `hw-pcb-inspection`, `hw-solder-board`, `hw-bench-soldering` | Home S5; PCB/firmware pages |
| `ai-wearable-pulse`, `ai-ecg-handheld`, `ai-iot-chiller`, `ai-iot-warehouse`, `ai-coldchain-truck`, `ai-cleanroom-access`, `ai-powder-mixing`, `ai-drone-endurance`, `gpt-medical-kit` | Use cases, industries, service pages |
| Pexels stock (dev-team, data-wall, interview, lecture etc.) | Stay on software/case-study pages only |
| `ref-vehicle-detection` | Hold (plate) |

## 7. Hold list (unchanged)
Client names, testimonials, ISO history, "6 sectors", performance/ROI figures, SAP/ERP case material.

## 8. Risk of loss
Docs for every removed homepage block already exist as a page or service page, and the 23 Oct release remains on the server and in git history (`electronics-repositioning` branch plus earlier commits). Rollback: `scripts/deploy/rollback.sh`.
