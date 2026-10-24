# Image inventory: supplied folders (2026-10-24)

Originals stay untouched in `/root/siddhrans/Pics/`. Derivatives (AVIF, WebP, JPEG fallback; 480–1600 px, never upscaled) are built by `scripts/process-pics.mjs` into `public/img/`. "Type" is our visual judgement; none of the 26 shows a PCB, lab bench or chip, so electronics photography on the site comes from the already-licensed Pexels set (see IMAGE_REGISTER.md).

| ID | File (folder) | Size / weight | Subject | Type | Quality | Decision / use | Correction |
|---|---|---|---|---|---|---|---|
| P01 | AI Vision Capsule Counting Line… (Pradeep) | 1698×926, 2.0 MB | Camera over capsule conveyor with detection boxes | AI-generated | Good | **Used** `ai-vision-capsules`: Edge AI, Industrial IoT, use case 05 | sharpen 0.5 |
| P02 | API_Mixture.png | 1448×1086, 2.3 MB | Process vessels, hoppers, batch screen | AI-generated | Good | **Used** `ai-powder-mixing`: use case 04 | sharpen |
| P03 | Adaptive Drone Endurance.jpg | 719×426, 41 KB | Drones above runway, blue beams | AI-generated | Low-res, JPEG noise | **Used** `ai-drone-endurance` (native size only): use case 10 | median denoise, sharpen; no upscale |
| P04 | ApiMixtures1.jpg | 678×452 | Worker with canisters beside tanks | Stock-like photo | Low-res, generic | **Rejected**: not electronics, low-res, provenance unknown | none |
| P05 | ColdChain…Truck.webp | 1536×1024 | Refrigerated truck, GPS and BLE sensors, dashboard | AI-generated diagram | Good | **Used** `ai-coldchain-truck`: use case 13, Industries/logistics | sharpen |
| P06 | High-Security Cleanroom Entry Control.png | 1536×1024 | Cleanroom gate, face reader, occupancy display | AI-generated | Good | **Used** `ai-cleanroom-access`: use case 12, Edge AI page | sharpen |
| P07 | IoT Chiller Monitoring on Industrial Rooftop.png | 1536×1024 | Clamp-on sensors on chiller pipes, tablet | AI-generated | Good, dark shadows | **Used** `ai-iot-chiller`: IoT page hero, home IoT section, use case 08, Industries/energy | gamma 1.12, sharpen |
| P08 | IoT HVAC Chiller Energy Management.png | 1672×941 | Chiller plant with sensors | AI-generated | Good | **Rejected**: prominent third-party brand ("YORK") | n/a |
| P09 | Portable ECG Monitor in Clinical Setting.png | 1448×1086 | Handheld ECG recorder, leads, tablet trace | AI-generated | Good, soft | **Used** `ai-ecg-handheld`: use case 02, Industries/healthcare, home applications | sharpen |
| P10 | Smart Ambulance Inventory Dashboard.png | 1536×1024 | Ambulance shelves, tablet | AI-generated | Good | **Rejected**: visible third-party brands (defibrillator maker) and uniform lettering | n/a |
| P11 | Smart Gas Meter Retrofit Installation.png | 1448×1086 | Gas meter with retrofit module | AI-generated (photoreal) | Good | **Rejected**: third-party brand and label text on meter and module | n/a |
| P12 | Smart Warehouse IoT Operations.png | 1448×1086 | Warehouse aisle with data overlay | AI-generated | Good | **Used** `ai-iot-warehouse`: use case 14, home IoT section | sharpen |
| P13 | Water Quality Monitoring.jpg | 592×517, 29 KB | Prototype floating sensor boat, electronics in clear box | Real photograph | Small, slightly noisy | **Used** `ref-water-sensor-boat` at ≤592 px: use case 11, Industries/water, IoT page | median denoise, sharpen; no upscale |
| P14 | Water-Quality-monitoring-system-1.webp | 1024×333, 53 KB | Three water-monitoring field sites (collage) | Real photographs | Low-res, stitched | **Processed but not placed**: a 3:1 collage at 1024 px cannot be shown full-width without blur; kept as `ref-water-field-sites` for a constrained slot | median denoise |
| P15 | Wearable Pulse Sensor Prototype Close-Up.png | 1448×1086 | Wrist module and cabled finger sensor | AI-generated | Good, soft focus | **Used** `ai-wearable-pulse`: hero, product-development page, use case 01 | sharpen 0.9 |
| P16 | worker monitored images.jpg | 679×450 | Worker-safety montage | Composite | Low-res | **Rejected**: third-party brand (viAct), low-res | n/a |
| G17 | ChatGPT Image …05_46_12 PM-2.png | 1672×941 | Contactless powder-mixing poster | AI poster | Good | **Rejected**: baked headline, malformed Siddhrans logo | n/a |
| G18 | …13 PM-3.png | 1672×941 | Bluetooth ECG poster | AI poster | Good | **Rejected** (same) | n/a |
| G19 | …14 PM-4.png | 1672×941 | Vibration monitoring poster | AI poster | Good | **Rejected**: crop of motor could not be separated from poster text | n/a |
| G20 | …15 PM-5.png | 1672×941 | HVAC poster | AI poster | Good | **Rejected**: logo, headline and an unsubstantiated "-32 %" figure | n/a |
| G21 | …16 PM-6.png | 1672×941 | Medical-kit tracking poster | AI poster | Good | **Used as a detail crop** `gpt-medical-kit` (kit artwork only; logo, headline and UI text cropped out): use case 07 | crop, sharpen |
| G22 | …17 PM-7.png | 1672×941 | Gas-meter retrofit poster | AI poster | Good | **Rejected**: crop test failed (artwork overlaps poster text) | n/a |
| G23 | …18 PM-8.png | 1672×941 | Water-quality poster | AI poster | Good | **Rejected**: logo and headline; P13 is the better, real image | n/a |
| G24 | …20 PM-9.png | 1672×941 | Drone endurance poster | AI poster | Good | **Rejected**: unsubstantiated "+35 % endurance" figure | n/a |
| G25 | …21 PM-10.png | 1672×941 | AI vision inspection poster | AI poster | Good | **Rejected**: logo, headline, "98.7 % pass rate" | n/a |
| G26 | Siddhrans Picts.png | 1672×941 | Wearable PPG poster | AI poster | Good | **Rejected**: logo, headline; P15 is cleaner | n/a |

All GPT posters carry a re-drawn Siddhrans logo whose "INFOTECH" lettering is malformed. The approved logo is never altered (SHA-256 gate), so the posters are not used whole.

## Existing licensed stock re-cut for electronics
| Output | Source (Pexels, registered) | Treatment |
|---|---|---|
| `hw-pcb-inspection` | 35290693, 2268×4032 original re-downloaded for quality | 4:5 crop keeping technician, microscope and board; shadow lift (gamma 1.25) |
| `hw-solder-board` | 37426135, 2400×1600 original | crop on board and soldering hands; limited white balance (gains .94/1.01/1.06) |
| `hw-bench-soldering` | 3912983, 2400×1600 original | crop of the work area; shadow lift (gamma 1.55): the original is very dark |

## Section mapping
Home hero: `hw-pcb-inspection`, `ai-wearable-pulse`, `hw-solder-board`. PCB: `hw-solder-board`, `hw-pcb-inspection`, `hw-bench-soldering`. Firmware: `ai-wearable-pulse`. VLSI: original CSS/SVG flow diagram (no photo). Applications: `ai-ecg-handheld`, `ai-wearable-pulse`, `ai-iot-chiller`. IoT / Edge AI: `ai-iot-chiller`, `ai-vision-capsules`, `ai-iot-warehouse`. Service heroes: PCB `hw-pcb-inspection`; firmware `hw-bench-soldering`; VLSI `hw-solder-board`; product development `ai-wearable-pulse`; IoT `ai-iot-chiller`; Edge AI `ai-vision-capsules`. Software pages keep their existing stock.

## Corrections not performed
No upscaling (nothing is wider than its source). No AI super-resolution. No sharpening beyond a light unsharp mask (σ 0.5–0.9), and none that alters instrument or screen text. White balance only on the one real-photo PCB source with a measurable cast.
