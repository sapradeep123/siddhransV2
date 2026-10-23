// Logo integrity gate: the official PNG must be byte-identical to the approved master everywhere it is shipped.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

export const LOGO_SHA256 = '9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7';
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');

const targets = ['public/brand/Siddhrans_Logo.png', 'out/brand/Siddhrans_Logo.png'].filter(existsSync);
let bad = 0;
for (const t of targets) {
  const h = sha(t); const ok = h === LOGO_SHA256; if (!ok) bad++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${t}  ${h}`);
}
if (!targets.length) { console.error('no logo files found'); bad++; }
if (bad) { console.error('LOGO VERIFICATION FAILED'); process.exit(1); }
console.log(`Logo verified against approved SHA-256 ${LOGO_SHA256}`);
