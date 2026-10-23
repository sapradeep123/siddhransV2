# Siddhrans website: image register (V2 design preview)

All photographs are stock images from **Pexels**, used under the [Pexels licence](https://www.pexels.com/license/) (checked 2026-10-23): free for commercial use, attribution not required (credit given anyway on the site), modification allowed. Not allowed: selling unaltered copies, implying endorsement by people or brands, redistributing on other stock platforms, using an image as part of a trademark or business name.

**None of these is a Siddhrans project photograph.** Every photograph on the site carries an "Illustrative image" caption and the footer says so. Line drawings (capability illustrations, interface schematics, signal chain, capability stack) are original SVG made for this project.

Source files: `site/assets-src/pexels-<id>.jpg` (original downloads, not served). Optimised copies: `site/design-preview/img/<name>-{480,960,1600}.webp` (WebP, quality 72). Script: `site/tools/optimize-images.py`.

Photographer names are the usernames embedded in Pexels download file names and were not confirmed on each photo page, so treat them as "to verify". Pexels does not require attribution, so a wrong name has no licence consequence, but I would correct them before launch.

| Name | Pexels ID / URL | Photographer (per file name) | Subject | Third-party logos? | Intended pages |
|---|---|---|---|---|---|
| hero-robotics | [32778341](https://www.pexels.com/photo/advanced-robotic-automation-in-laboratory-32778341/) | Youn Seung Jin | Robotic arm and sample tray in a blue-lit automation cell | None visible | Home hero |
| factory-corridor | [34718930](https://www.pexels.com/photo/industrial-factory-interior-with-conveyor-34718930/) | yetkin-agac | Factory walkway with conveyors, yellow safety lines | None legible | Home (Embedded band), Embedded page, use cases |
| pharma-line | [37650270](https://www.pexels.com/photo/pharmaceutical-production-line-in-action-37650270/) | elementsinteractive | Ampoule filling and sealing line, gloved hand | None | Home (teaser, industries), Use Cases hero, use cases |
| water-treatment | [24802113](https://www.pexels.com/photo/aerial-view-of-a-water-purification-facility-24802113/) | alshreef | Aerial view of a circular water treatment tank | None | Home and Embedded (industries), use cases |
| solder-bench | [3912983](https://www.pexels.com/photo/mechanical-engineer-soldering-in-workshop-3912983/) | thisisengineering | Engineer soldering under a lamp (back of head only) | None | Home tile, Services, Embedded hero |
| solder-board | [37426135](https://www.pexels.com/photo/technician-soldering-circuit-board-in-lab-37426135/) | Maiksax | Soldering iron on a green circuit board. **Cropped** to the lower half to remove an emblem on the technician's coat | None after crop | Embedded page, About band, use cases |
| code-screen | [6424584](https://www.pexels.com/photo/programming-code-on-screen-6424584/) | Nemuel Sereti | Source code on a dark monitor | None (generic editor UI) | Home tile, Services, Products hero, use cases |
| ai-network | [8386437](https://www.pexels.com/photo/robot-s-hand-on-a-blue-background-8386437/) | Tara Winstead | Robotic hand touching a glowing network. May be a composite or render; not confirmed | None | Home tile, Services, use cases |
| datacentre-aisle | [4508751](https://www.pexels.com/photo/server-racks-on-data-center-4508751/) | brett-sayles | Aisle of server cabinets | None legible | Home tile and CTA, Services hero |
| fibre-patch | [4373998](https://www.pexels.com/photo/fiber-optic-device-with-many-connected-cables-4373998/) | brett-sayles | Teal fibre-optic patch cables | None | Home tile, Services, Contact, use cases |
| substation | [25537595](https://www.pexels.com/photo/iron-poles-in-sunlight-25537595/) | Kris Møklebust (verify) | Electrical substation and power lines | None | Home teaser, Embedded page, use cases |
| solar-farm | [35105444](https://www.pexels.com/photo/expansive-solar-farm-in-vietnam-s-ninh-thuan-province-35105444/) | Quang Nguyen Vinh | Aerial view of a solar farm | None | Home (industries), use cases |
| vitals-monitor | [28782186](https://www.pexels.com/photo/medical-monitor-displaying-heart-rate-and-vitals-28782186/) | not identified (verify) | Patient vitals monitor, close-up | None visible | Home (industries), Embedded page, use cases |
| lab-porthole | [37839843](https://www.pexels.com/photo/scientist-working-in-modern-laboratory-37839843/) | Lefteris Betsis | Laboratory seen through a round window; person not identifiable | None | About hero, use cases |

## Candidates rejected on inspection
- 29320998 (industrial robot): a third-party institution logo is visible on the arm.
- 37426135, 38145576 (soldering): emblem on the technician's coat. 37426135 is used only after cropping.
- 12519455 (truck interior): partial company lettering on the vehicle.
- 27099094 (refrigerated trailers): vehicle lettering and refrigeration-unit branding.
- 15470542 (Arduino on breadboard): "Arduino" logo on the board.
- 36169774 (chip close-up): legible chip manufacturer markings.
- 34207359, 36522025, 11951215, 16544056, 18471441 (robot arms): manufacturer lettering or banners possible or visible.
- All images from the supplied presentation (AI-generated renders, third-party diagrams, Bheeshmaa slides, third-party brands, a redrawn Siddhrans logo on black): not used; see `docs/PHASE2_DESIGN.md` section 4.

## Not covered by a photograph
Cold chain, logistics, drone / aerospace R&D, vision, safety and HVAC use cases use original line illustrations because no suitable licensed photograph without third-party branding was found. Genuine Siddhrans project photographs are very welcome as replacements: send them with permission to publish and I will add them with a "Project photograph" label.

## Performance (home page, Edge, full scroll)
13 images, **445 KB** on a 1440 px desktop and **322 KB** on a 390 px phone at 2x. All images carry width and height attributes, use `srcset` with 480, 960 and 1600 px variants, and lazy-load except the hero (`fetchpriority="high"`).
