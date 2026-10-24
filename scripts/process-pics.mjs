// Builds responsive AVIF / WebP / JPEG derivatives in public/img from the supplied originals
// (Pics/Pradeep Pics, Pics/GPT Pics) and from the Pexels originals already registered in docs/IMAGE_REGISTER.md.
// Originals are only ever read. Nothing is upscaled: the widest output is the native width of the crop.
// Usage: node scripts/process-pics.mjs [PICS_DIR] [--only=name,name]  (--only keeps the other entries of images.generated.ts)
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ARGS = process.argv.slice(2);
const PICS = ARGS.find((a) => !a.startsWith('--')) ?? '/root/siddhrans/Pics';
const ONLY = ARGS.find((a) => a.startsWith('--only='))?.slice(7).split(',');
const OUT = path.join(ROOT, 'public', 'img');
const PRA = (f) => path.join(PICS, 'Pradeep Pics', f);
const GPT = (f) => path.join(PICS, 'GPT Pics', f);
const MISS = (f) => path.join(PICS, 'Missed Pics', f);
const STOCK = (id) => path.join(ROOT, 'assets-src', `p${id}.jpg`);
const WIDTHS = [480, 800, 1200, 1600];

// crop = [left, top, right, bottom] as fractions of the (orientation-corrected) original.
// fix: gamma (lift shadows), wb (limited gray-world white balance), denoise (median 3x3 for small, JPEG-compressed originals), sharpen (sigma)
const JOBS = [
  // --- real photographs (licensed stock already on the site, re-cut from higher-quality originals)
  { name: 'hw-pcb-inspection', src: STOCK(35290693), crop: [0, 0.17, 1, 0.873], fix: { gamma: 1.25, sharpen: 0.7 } },
  { name: 'hw-solder-board', src: STOCK(37426135), crop: [0.12, 0.08, 0.88, 0.88], fix: { wb: true, sharpen: 0.7 } },
  { name: 'hw-pcb-aoi', src: STOCK(37426135), crop: [0.14, 0.52, 0.62, 0.83], fix: { sharpen: 0.6 } }, // board close-up for the inspection showcase
  { name: 'hw-bench-soldering', src: STOCK(3912983), crop: [0, 0.18, 0.62, 0.95], fix: { gamma: 1.55, sharpen: 0.6 } },
  // --- reference photographs supplied by Siddhrans (small, JPEG-compressed: no enlargement)
  { name: 'ref-water-sensor-boat', src: PRA('Water Quality Monitoring.jpg'), crop: [0, 0, 1, 1], fix: { denoise: true, sharpen: 0.5 } },
  { name: 'ref-water-field-sites', src: PRA('Water-Quality-monitoring-system-1.webp'), crop: [0, 0, 1, 1], fix: { denoise: true, sharpen: 0.5 } },
  // --- AI-generated concept visuals supplied by Siddhrans
  { name: 'ai-wearable-pulse', src: PRA('Wearable Pulse Sensor Prototype Close-Up.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.9 } },
  { name: 'ai-ecg-handheld', src: PRA('Portable ECG Monitor in Clinical Setting.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ai-iot-chiller', src: PRA('IoT Chiller Monitoring on Industrial Rooftop.png'), crop: [0, 0, 1, 1], fix: { gamma: 1.12, sharpen: 0.5 } },
  { name: 'ai-iot-warehouse', src: PRA('Smart Warehouse IoT Operations.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ai-coldchain-truck', src: PRA('ColdChain Condition Monitoring Truck.webp'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ai-cleanroom-access', src: PRA('High-Security Cleanroom Entry Control.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ai-vision-capsules', src: PRA('AI Vision Capsule Counting Line - Smart Factory Quality Intelligence.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ai-powder-mixing', src: PRA('API_Mixture.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ai-drone-endurance', src: PRA('Adaptive Drone Endurance.jpg'), crop: [0, 0, 1, 1], fix: { denoise: true, sharpen: 0.5 } },
  // --- detail crops from GPT concept posters: only the product artwork; the poster headline and the
  //     (malformed) logo are cropped out, no text is retained.
  // (gas-meter and vibration poster crops were tried and rejected: the artwork cannot be cut free of poster text)
  { name: 'gpt-medical-kit', src: GPT('ChatGPT Image Oct 17, 2026, 05_46_16 PM-6.png'), crop: [0, 0.37, 0.57, 0.77], fix: { sharpen: 0.5 } },
  // --- second supplied batch ("Missed Pics"); small originals are used at native width only
  { name: 'ref-pump-infographic', src: MISS('Vibration & machine-health monitoring2.jpg'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ref-pump-installation', src: MISS('Vibration & machine-health monitoring.png'), crop: [0.095, 0, 0.985, 0.905], fix: { sharpen: 0.6 } }, // edge bands of the screenshot cropped off
  { name: 'ref-esp32-breadboard', src: MISS('Theatre air-cooler optimisation2.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ref-motor-vibration-board', src: MISS('Theatre air-cooler optimisation1.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
  { name: 'ref-iot-architecture', src: MISS('WaterAirCooler.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.3 } },
  { name: 'ref-gas-meter-phone', src: MISS('Gas-meter digitisation retrofit.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.4 } },
  { name: 'ref-gas-meter-standalone', src: MISS('Gas-meter digitisation retrofit2.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.4 } },
  { name: 'ref-label-mismatch', src: MISS('Product-label inspection1.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.3 } },
  { name: 'ref-vehicle-detection', src: MISS('Vehicle detection & classification.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.4 } },
  { name: 'ref-safety-sos', src: MISS('Industrial safety & environmental alerts2.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.4 } },
  { name: 'ref-access-watch', src: MISS('Industrial safety & environmental alerts.png'), crop: [0, 0, 1, 1], fix: { sharpen: 0.5 } },
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const report = [];
let meta = {};
const genPath = path.join(ROOT, 'src', 'content', 'images.generated.ts');
if (ONLY && fs.existsSync(genPath)) meta = JSON.parse(fs.readFileSync(genPath, 'utf8').match(/= (\{[\s\S]*\}) as const/)[1]);
fs.mkdirSync(OUT, { recursive: true });

for (const j of JOBS) {
  if (ONLY && !ONLY.includes(j.name)) continue;
  // never reuse earlier output: delete every old variant of this image, then rebuild from the source bytes
  for (const f of fs.readdirSync(OUT)) if (new RegExp(`^${j.name}-\\d+\\.(avif|webp|jpg)$`).test(f)) fs.unlinkSync(path.join(OUT, f));
  const version = crypto.createHash('sha1').update(fs.readFileSync(j.src)).digest('hex').slice(0, 8);
  const base = sharp(j.src, { failOn: 'none' }).rotate();
  const m0 = await base.clone().metadata();
  // metadata() after rotate() still reports the stored size; resolve the displayed size from the orientation tag.
  const swap = (m0.orientation ?? 1) >= 5;
  const W0 = swap ? m0.height : m0.width, H0 = swap ? m0.width : m0.height;
  const [l, t, r, b] = j.crop;
  const region = { left: Math.round(l * W0), top: Math.round(t * H0), width: Math.round((r - l) * W0), height: Math.round((b - t) * H0) };
  const cropBuf = await sharp(await base.clone().toBuffer()).extract(region).toBuffer();
  let stage = sharp(cropBuf);
  const notes = [];
  if (j.fix.denoise) { stage = stage.median(3); notes.push('median-3 denoise'); }
  if (j.fix.wb) {
    const s = await sharp(cropBuf).stats();
    const [R, G, B] = s.channels.slice(0, 3).map((c) => c.mean); const avg = (R + G + B) / 3;
    const gains = [R, G, B].map((c) => clamp(avg / c, 0.94, 1.06));
    stage = stage.linear(gains, [0, 0, 0]); notes.push(`white balance gains ${gains.map((g) => g.toFixed(3)).join('/')}`);
  }
  if (j.fix.gamma) { stage = stage.gamma(j.fix.gamma); notes.push(`shadow lift gamma ${j.fix.gamma}`); }
  const corrected = await stage.toBuffer();
  const cw = region.width, ch = region.height;
  const widths = WIDTHS.filter((w) => w <= cw);
  if (!widths.length || widths[widths.length - 1] * 1.1 < cw) widths.push(Math.min(cw, 1600));
  const uniq = [...new Set(widths)].sort((a, c) => a - c);
  for (const w of uniq) {
    const h = Math.round((w * ch) / cw);
    const img = sharp(corrected).resize({ width: w, height: h, kernel: 'lanczos3', withoutEnlargement: true }).sharpen({ sigma: j.fix.sharpen ?? 0.5, m1: 0.5, m2: 1.0 });
    await img.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(OUT, `${j.name}-${w}.avif`));
    await img.clone().webp({ quality: 76, effort: 5 }).toFile(path.join(OUT, `${j.name}-${w}.webp`));
    await img.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, `${j.name}-${w}.jpg`));
  }
  meta[j.name] = { w: cw, h: ch, widths: uniq, v: version };
  const sz = (e) => Math.round(uniq.reduce((a, w) => a + fs.statSync(path.join(OUT, `${j.name}-${w}.${e}`)).size, 0) / 1024);
  report.push({ name: j.name, crop: `${cw}x${ch}`, widths: uniq.join('/'), notes: notes.join(', ') || 'none', kb: `avif ${sz('avif')} / webp ${sz('webp')} / jpg ${sz('jpg')} KB (all widths)` });
  console.log(j.name.padEnd(24), `${cw}x${ch}`, uniq.join('/'), notes.join(', ') || '-');
}

fs.writeFileSync(
  path.join(ROOT, 'src', 'content', 'images.generated.ts'),
  `// Generated by scripts/process-pics.mjs. Do not edit.\nexport const processedMeta = ${JSON.stringify(meta, null, 2)} as const satisfies Record<string, { w: number; h: number; widths: readonly number[]; v?: string }>;\n`,
);
if (!ONLY) fs.writeFileSync(path.join(ROOT, 'docs', 'image-processing-report.json'), JSON.stringify(report, null, 2));
