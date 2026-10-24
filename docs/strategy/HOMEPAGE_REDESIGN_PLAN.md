# Homepage redesign plan (revision 3: after preview feedback)

> Revision 3 changes: hero shows applications + AI + machines together; AI is the strongest section (four visual families + explorer); software is a 15-system portfolio selector; "AI meets the machine" is the signature five-step flow; electronics is compact; Foundations is a layered stack; the last section is a project invitation (evidence legend moved to About/Products). Count fixed at 15. Numbers below are measured from the preview frames.

Goal: a concise, AI-led, balanced homepage of **seven sections**, with the 15 software systems substantially more visible and Foundations (cloud, security, integration, managed services) visibly restored. Exact copy and layout are in **HOMEPAGE_PREVIEW.md** (and the visual preview).

| | Now | Target |
|---|---|---|
| Sections | 12 | **7** |
| Desktop height (1440) | 15,138 px | **≈ 9,000 px** (−40 %) |
| Phone height (390) | 17,529 px (≈ 21 screens) | **≈ 9,500 px (≈ 11 screens)** |
| Distinct section layouts | 1 repeated pattern | 7 (explorer, device stage, sensor→model→action cards, photo+2×2, stack tiles, legend+form, hero composite) |

## 1. Section order, measured heights and emphasis

| # | Section | Pillar | Desktop px (as drawn) | Phone px |
|---|---|---|---|---|
| 1 | Hero: AI-Led Engineering. From Software to Smart Machines. | AI | 765 | 1,276 |
| 2 | AI & Intelligent Automation: four visual families + explorer | 1 | 1,509 | 2,267 |
| 3 | Software & Digital Engineering: 15-system portfolio selector + case studies | 2 | 1,199 | 1,993 |
| 4 | AI meets the machine: five-step flow + three application tracks | 3 (35 % AI) | 1,116 | 1,436 |
| 5 | The electronics underneath (compact, VLSI qualified) | 3 | 568 | 968 |
| 6 | Foundations: cloud, security, integration, managed (layered stack) | F | 684 | 962 |
| 7 | Start a project (enquiry invitation) + footer | all | 526 | 993 |
| | **Total** | | **≈ 6,370 (≈ 7,000 with the site's real section spacing)** | **≈ 9,900** |

Weight as drawn (desktop): **AI ≈ 42 %, software ≈ 19 %, embedded and electronics ≈ 18 %, VLSI and specialised ≈ 2 %, foundations ≈ 11 %, enquiry ≈ 8 %.** AI is intentionally the strongest. Software is below the 27 % discussed; the lever is to enlarge section 3 (AI-enabled applications panel, case-study imagery) for about +25 % page height. VLSI stays small by design (least evidence; its qualifications remain on every appearance).
Targets met: sections 12 → 7; desktop height −55 % (15,138 → ≈ 7,000); phone height −44 % (17,529 → ≈ 9,900, about 11.7 screens).

## 2. What each section does
1. **Hero:** headline kept. The composite shows an enterprise application with an AI assistant, a real pump with an anomaly flag, the ESP32 board and a vision output, labelled Applications · Intelligence · Machines, so AI, software and machines read in the first screen.
2. **AI & Intelligent Automation:** four large, visually distinct families: agents & copilots; document & knowledge intelligence; vision & industrial inspection; predictive & edge intelligence. An explorer ("More AI capabilities") holds the other verified capabilities: generative AI applications, natural-language interfaces, intelligent workflow, decision support, multi-agent solutions.
3. **Software:** interactive selector for the 15 systems; each shows the verified family description and points, a device concept UI and "Systems built". LMS and Talent case-study entries below.
4. **AI meets the machine (signature):** Sense → Firmware → AI / ML → Decision → Action with a visual per step, then tabs for condition monitoring, vision inspection and smart utilities, each with its status label; architecture diagram expandable.
5. **Electronics (compact):** four rows (PCB, firmware, product development, VLSI design support with "Scoped per engagement" and the no-tape-out, fabrication or foundry statement) and a thin image strip.
6. **Foundations:** three pillars sit on four slabs (cybersecurity, cloud, data integration, managed services); examination-environment example; industries chips.
7. **Start a project:** "Tell us what you want to make intelligent." with the enquiry form; one link, "How we label our work".

## 3. Image selection (all prepared images kept)
| Section | Images | New artwork needed |
|---|---|---|
| 1 | `ref-label-mismatch`, `ref-esp32-breadboard` | Concept copilot interface (HTML/CSS) |
| 2 | `ref-label-mismatch`, `ai-vision-capsules` (vision panel) | Agent-loop, RAG, document-extraction and prediction diagrams/UIs |
| 3 | Concept UIs already in `concept.tsx` (LMS, Talent, Billing, POS, Operations) | One "AI-assist" panel on the LMS concept |
| 4 | `ref-pump-installation`, `ref-pump-infographic`, `ref-iot-architecture`, `ref-label-mismatch`, `ai-vision-capsules`, `ref-gas-meter-phone` | none |
| 5 | `hw-pcb-inspection`, `ref-esp32-breadboard`, `ref-motor-vibration-board`, VLSI stepper | none |
| 6 | none (icons, original illustrations) | Four foundation illustrations |
| 7 | none | none |
Off the homepage but retained: `ref-safety-sos`, `ref-access-watch`, `ref-gas-meter-standalone`, `hw-solder-board`, `hw-bench-soldering`, `ai-wearable-pulse`, `ai-ecg-handheld`, `ai-iot-*`, `ai-coldchain-truck`, `ai-cleanroom-access`, `ai-powder-mixing`, `ai-drone-endurance`, `gpt-medical-kit`; `ref-vehicle-detection` held until the number plate is blurred.

## 4. Evidence chips (existing classifications kept)
Systems built · Engineering capability · Evidence in built systems · Engineering solutions · Scoped per engagement; use-case labels Designed system · Proposed solution · Capability example; image-level "Concept / Illustrative". "Prototype" is added only if the founders supply a real, dated prototype (AI_CAPABILITIES_PLAN §5). No completed AI deployment is claimed anywhere.

## 5. Tone rhythm (fixes "pale")
Ink · navy · **warm + navy portfolio panel** · ink with green glow · graphite · navy · **brand-green gradient**. One light section (with a dark panel inside it) instead of five; icon tiles and repeated cards replaced by distinct components (family cards, selector, flow, list rows, stack slabs).

## 6. Phone behaviour
Hero ≤ 1.2 screens; sections ≤ 1.3 screens. Section 2 families stack and the explorer shows three tabs; section 3 selector pills wrap above one detail panel; section 4 flow becomes a vertical numbered line and one application track shows at a time; section 5 rows with chips; section 6 slabs stack; section 7 form full width. Sticky "Start a project" bar after the hero. No horizontal page scroll (wide diagrams scroll in their own region).

## 7. What moves off the home page (nothing is deleted)
Lifecycle (stays on `/services/` and the product-development page), PCB deep-dive, firmware section, VLSI section, utilities section, safety/access section, marquee, "extended team" block. See CONTENT_MIGRATION_MAP.md.
