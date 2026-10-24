# Visual design plan (revision 2)

> Revision 2: AI leads visuals; software interfaces become a main visual language; hardware images stay but move to sections 4-5. Home tone rhythm (revision 3): ink · navy · warm with a navy portfolio panel · ink with green glow · graphite · navy · brand-green gradient.

Problem statement from feedback: the site feels **pale, repetitive and imbalanced**. The audit confirms the causes: five light sections of white-background product shots, one repeated section layout, near-total hardware imagery, and no software or AI visuals.
Direction: **"precision instrument"**: a confident dark-led interface for the AI story, warm white for software evidence, and engineering detail where hardware appears. Evolve the existing V3 system; do not rebuild it.

## 1. Brand constants (unchanged)
- Official logo, byte-identical (SHA-256 gate), on a light plate; tagline legibility rules unchanged.
- Brand colours: green `#009040` (text/buttons on light use `#00743A`), bright green `#19C46E` on dark, yellow `#F8E000` for the single primary CTA.
- Fonts: Bricolage Grotesque (display), Instrument Sans (body), JetBrains Mono (labels). They already read as engineered and modern; keep.

## 2. Colour and tone
| Token | Use |
|---|---|
| Deep ink `#050A14` / `#0A1326` | Hero, AI, machines, foundation. Becomes the dominant surface |
| Midnight blue `#12213F`-`#1B2E55` | Cards on dark, gradient steps |
| Warm white `#FAFAF7` (new, replaces cool mist `#F3F6FB` for large areas) | Software section only; warmer paper tone avoids the "pale clinical" look |
| Green glow (radial, 10-18 % opacity) | Signal motif behind AI visuals |
| Cyan `#3DD6F5` | Data highlights only (graphs, signal lines) |
| Yellow | One CTA per screen, status "Engineering solutions" |
Rules: tone rhythm dark, dark, light, dark, light, navy, dark; no more than two adjacent sections in the same tone; only two light sections on the home page; light sections never contain white-background images without a framed card (see §4).

## 3. Typography and spacing
- Keep the scale; tighten the display H1 range (`clamp(40px, 4.6vw, 76px)`) and cap H2s at two lines on desktop with `max-width: 16ch`.
- Section padding from `clamp(80px,10vw,150px)` to **`clamp(56px,7vw,104px)`**; heading-to-content gap 32-40 px; this alone removes roughly 15 % of page height.
- Text blocks: ledes ≤ 58ch; body ≥ 16 px on phones; mono labels 12 px with AA contrast.

## 4. Component variety (to break the repeated "heading + two images" pattern)
| Component | Used for | Notes |
|---|---|---|
| **Capability explorer** (list + panel, accordion on phones) | S2 AI | Existing `ServiceShowcase` logic can be adapted |
| **Product family stage** (tabs + device mock-ups + system chips) | S3 software | Existing `ProductExplorer`, condensed |
| **Intelligence-stack hero composite** | Hero | Three tiles with a signal line |
| **Concept interface frames** (copilot, document extraction, dashboard) | AI + software | New HTML/CSS, "Concept UI · illustrative data" badge, same style as `concept.tsx` |
| **Animated workflow diagram** (SVG: agent loop, RAG, edge pipeline) | AI hub, home S2 | Original; reduced-motion safe |
| **Device frames** (laptop/phone/tablet) | Software, AI apps | Existing |
| **Sensor → model → action cards** | AI meets machines | Same internal pattern, three images |
| **Bento grid** | Foundations, industries | Mixed sizes, icon-led, no stock photos |
| **Evidence legend strip** | Home S6, hub pages | Five status chips with one-line definitions |
| **Facts row** | Hero and S6 | Only verifiable facts |
| **Framed product-shot card** | White-background images | Rounded dark frame with 16-24 px padding and soft shadow so white images read as objects on a dark field, not pale slabs |

## 5. Imagery policy
Balance on the home page: **AI and software interfaces dominate** (copilot concept, document extraction, LMS/Talent/Billing/POS/Operations device mock-ups: about 6), 2 workflow/architecture diagrams, about 5 machine and industrial images, about 3 electronics images, 0 stock photographs.
- **Do:** original interfaces and diagrams; the prepared hardware and IoT images; real photographs where they exist; consistent corner radius (28 px), shadow and caption style; every non-project image keeps the "Illustrative image · …" caption.
- **Do not:** invented client dashboards or logos; generic "AI brain/robot/network" stock; real number plates; third-party brand marks; stretching or cropping hardware (use contain-fit on white-background shots).
- **Create (design work, not demos):** copilot interface, document-extraction interface, RAG/agent/edge diagrams, an AI-assist panel on the LMS concept, four Foundations illustrations. All carry "Concept" or "Illustrative" labels. Optional later: real photographs of the team, bench or office.
- Prepared images are reused, none removed or overwritten.

## 6. Motion and interaction
Keep existing reveal and parallax at low intensity; add one signature motion (signal pulse travelling the hero line and the AI workflow diagram); all disabled under `prefers-reduced-motion`; tabs/accordions keyboard accessible; no autoplay video.

## 7. Responsive behaviour
| Breakpoint | Behaviour |
|---|---|
| Desktop ≥ 1181 | Two-column sections, explorer side by side, composite hero right |
| Tablet 641-1180 | Single column for copy, 2-up cards, hero composite below copy at 70 % width, explorer as tabs |
| Phone ≤ 640 | Sticky CTA after hero; accordions for AI list; tabs for machines; chip carousels; diagrams scroll inside their own region; images use contain-fit where they carry annotations |
Image delivery: AVIF/WebP/JPEG with hashed `?v=` URLs (already built); lazy loading below the fold; hero image preloaded with fetch priority.

## 8. Performance and accessibility budget
Homepage transfer ≤ 700 KB images on first view; LCP ≤ 2.5 s mobile on simulated 4G; keep axe at 0 violations and WCAG 2.2 AA; contrast checked for green on dark and on warm white; all diagrams have text alternatives.

## 9. Delivery approach
1. Build components and the new home in a branch; screenshot review at 1440 / 820 / 390.
2. Run the existing test suite (adjusted for nav/footer/ordering changes only).
3. Deploy with the existing release script; rollback stays one command.
