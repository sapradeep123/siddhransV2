// Original line illustrations (no third-party artwork). Output is static markup built from literals only.
// Original line illustrations (no third-party artwork). kind -> inline SVG. light=true for paper backgrounds.
export type IllustrationKind = 'flow' | 'chart' | 'loop' | 'logistics' | 'drone' | 'vision' | 'safety' | 'hvac' | 'sensor';
export const illustration = (kind: IllustrationKind, light = false, label = ''): string => {
  const c = light ? '#14171B' : '#E9E8E2', a = light ? '#009040' : '#F8E000', dim = light ? '#9A9684' : '#4A525A';
  const g: Record<IllustrationKind, string> = {
    flow: `<rect x="24" y="76" width="68" height="48" fill="none" stroke="${c}" stroke-width="2"/><rect x="126" y="76" width="68" height="48" fill="none" stroke="${c}" stroke-width="2"/><path d="M92 100h34M194 100h24" stroke="${a}" stroke-width="2.5"/><path d="M120 94l8 6-8 6M212 94l8 6-8 6" fill="none" stroke="${a}" stroke-width="2.5"/><path d="M252 70l32 30-32 30-32-30z" fill="none" stroke="${c}" stroke-width="2"/><path d="M58 76V40h200M284 100h0" stroke="${dim}" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/><circle cx="58" cy="40" r="4" fill="${a}"/><path d="M252 130v34h-194V124" stroke="${dim}" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>`,
    chart: `<path d="M36 164h252M36 164V36" stroke="${c}" stroke-width="2" fill="none"/>${[0, 1, 2, 3, 4, 5].map((i: number) => `<rect x="${58 + i * 38}" y="${150 - [30, 52, 40, 78, 64, 98][i]}" width="22" height="${[30, 52, 40, 78, 64, 98][i] + 14}" fill="${i === 5 ? a : 'none'}" stroke="${c}" stroke-width="2"/>`).join('')}<path d="M58 116L96 92l38 20 38-44 38 14 38-40" stroke="${a}" stroke-width="2.5" fill="none"/>`,
    loop: `<circle cx="160" cy="100" r="58" fill="none" stroke="${dim}" stroke-width="1.5" stroke-dasharray="5 5"/>${[0, 1, 2, 3, 4].map((i: number) => { const t = -Math.PI / 2 + i * 2 * Math.PI / 5; return `<circle cx="${(160 + 58 * Math.cos(t)).toFixed(1)}" cy="${(100 + 58 * Math.sin(t)).toFixed(1)}" r="9" fill="${i === 0 ? a : '#1B2026'}" stroke="${c}" stroke-width="2"/>`; }).join('')}<path d="M150 100h20M164 94l6 6-6 6" stroke="${c}" stroke-width="2" fill="none"/>`,
    logistics: `<rect x="40" y="82" width="140" height="64" fill="none" stroke="${c}" stroke-width="2"/><path d="M180 100h42l24 24v22h-66z" fill="none" stroke="${c}" stroke-width="2"/><circle cx="82" cy="150" r="12" fill="#1B2026" stroke="${c}" stroke-width="2"/><circle cx="216" cy="150" r="12" fill="#1B2026" stroke="${c}" stroke-width="2"/><path d="M60 114h100M60 128h60" stroke="${dim}" stroke-width="1.5"/><path d="M110 28a18 18 0 0 1 18 18c0 14-18 30-18 30S92 60 92 46a18 18 0 0 1 18-18z" fill="none" stroke="${a}" stroke-width="2.5"/><circle cx="110" cy="46" r="5" fill="${a}"/>`,
    drone: `<rect x="132" y="86" width="56" height="22" fill="none" stroke="${c}" stroke-width="2"/><path d="M132 92L84 66M188 92l48-26M132 102l-48 28M188 102l48 28" stroke="${c}" stroke-width="2"/>${[[84, 66], [236, 66], [84, 130], [236, 130]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="24" ry="6" fill="none" stroke="${a}" stroke-width="2"/>`).join('')}<path d="M160 112v52M140 112l-14 52M180 112l14 52" stroke="${dim}" stroke-width="1.5" stroke-dasharray="4 4"/>`,
    vision: `<rect x="40" y="36" width="240" height="128" fill="none" stroke="${c}" stroke-width="2"/><path d="M40 60V36h24M280 60V36h-24M40 140v24h24M280 140v24h-24" stroke="${a}" stroke-width="3" fill="none"/><rect x="88" y="84" width="64" height="44" fill="none" stroke="${a}" stroke-width="2.5"/><rect x="176" y="70" width="70" height="56" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="5 4"/><path d="M88 78h30" stroke="${a}" stroke-width="3"/>`,
    safety: `<path d="M160 36l62 106H98z" fill="none" stroke="${c}" stroke-width="2.5"/><path d="M160 76v36" stroke="${a}" stroke-width="5"/><circle cx="160" cy="128" r="4" fill="${a}"/><path d="M70 100a90 90 0 0 1 18-44M250 100a90 90 0 0 0-18-44M44 112a120 120 0 0 1 22-60M276 112a120 120 0 0 0-22-60" stroke="${dim}" stroke-width="1.5" fill="none"/>`,
    hvac: `<circle cx="140" cy="100" r="46" fill="none" stroke="${c}" stroke-width="2"/><path d="M140 100c0-30 22-34 22-20M140 100c26 14 38-4 24-10M140 100c-26 14-12 38 0 26" fill="none" stroke="${a}" stroke-width="2.5"/><circle cx="140" cy="100" r="5" fill="${a}"/><rect x="232" y="44" width="16" height="84" rx="8" fill="none" stroke="${c}" stroke-width="2"/><circle cx="240" cy="138" r="14" fill="none" stroke="${c}" stroke-width="2"/><path d="M240 64v68" stroke="${a}" stroke-width="3"/>`,
    sensor: `<circle cx="160" cy="100" r="9" fill="${a}"/><path d="M138 78a30 30 0 0 0 0 44M182 78a30 30 0 0 1 0 44M122 62a52 52 0 0 0 0 76M198 62a52 52 0 0 1 0 76" stroke="${c}" stroke-width="2" fill="none"/>`,
  };
  return `<svg class="ill${light ? ' light' : ''}" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" role="${label ? 'img' : 'presentation'}" ${label ? `aria-label="${label}"` : 'aria-hidden="true"'} focusable="false">${g[kind]}</svg>`;
};

const FR = (b: string) => `<svg viewBox="0 0 320 170" role="presentation" aria-hidden="true" focusable="false"><rect x="1" y="1" width="318" height="168" fill="#F5F3EC" stroke="#CBC7B9"/><rect x="1" y="1" width="318" height="22" fill="#14171B"/><circle cx="14" cy="12" r="3" fill="#F8E000"/><rect x="26" y="9" width="46" height="6" fill="#4A525A"/>${b}</svg>`;
export const interfaceSchematics: Record<'lms' | 'talent' | 'ops' | 'sector', string> = {
  lms: FR('<rect x="12" y="34" width="190" height="124" fill="#fff" stroke="#CBC7B9"/><rect x="22" y="44" width="90" height="8" fill="#14171B"/>' + [0,1,2,3,4].map(i=>`<rect x="22" y="${64+i*18}" width="${[150,130,160,110,140][i]}" height="8" fill="${i===1?'#009040':'#CBC7B9'}"/>`).join('') + '<rect x="214" y="34" width="94" height="58" fill="#fff" stroke="#CBC7B9"/><circle cx="261" cy="63" r="20" fill="none" stroke="#009040" stroke-width="8"/><rect x="214" y="100" width="94" height="58" fill="#fff" stroke="#CBC7B9"/>' + [0,1,2,3].map(i=>`<rect x="${224+i*20}" y="${146-[14,26,18,34][i]}" width="12" height="${[14,26,18,34][i]}" fill="#14171B"/>`).join('')),
  talent: FR([0,1,2,3,4,5].map(i=>`<g><rect x="${12+(i%3)*102}" y="${34+Math.floor(i/3)*64}" width="96" height="58" fill="#fff" stroke="#CBC7B9"/><circle cx="${32+(i%3)*102}" cy="${54+Math.floor(i/3)*64}" r="11" fill="${i===0?'#F8E000':'#CBC7B9'}"/><rect x="${50+(i%3)*102}" y="${48+Math.floor(i/3)*64}" width="40" height="6" fill="#14171B"/><rect x="${50+(i%3)*102}" y="${60+Math.floor(i/3)*64}" width="30" height="5" fill="#BDB9A9"/><rect x="${20+(i%3)*102}" y="${76+Math.floor(i/3)*64}" width="${[60,72,50][i%3]}" height="6" fill="#009040" opacity=".8"/></g>`).join('')),
  ops: FR('<rect x="12" y="34" width="296" height="16" fill="#ECE9DF"/>' + [0,1,2,3,4,5].map(i=>`<g><rect x="12" y="${54+i*17}" width="296" height="14" fill="${i%2?'#fff':'#F5F3EC'}" stroke="#E2DFD2"/><rect x="20" y="${58+i*17}" width="${[60,80,50,70,64,56][i]}" height="5" fill="#14171B"/><rect x="150" y="${58+i*17}" width="40" height="5" fill="#BDB9A9"/><rect x="${240+(i%3)*8}" y="${58+i*17}" width="${[40,30,46,34,40,28][i]}" height="5" fill="${i===2?'#F8E000':'#009040'}"/></g>`).join('') + '<rect x="12" y="34" width="60" height="16" fill="#14171B"/>'),
  sector: FR('<rect x="12" y="34" width="296" height="124" fill="#fff" stroke="#CBC7B9"/>' + [0,1,2,3,4,5,6].map(i=>`<rect x="${12+i*42.3}" y="34" width="42" height="18" fill="#ECE9DF" stroke="#E2DFD2"/>`).join('') + [0,1,2,3,4].map(r=>[0,1,2,3,4,5,6].map(c=>`<rect x="${12+c*42.3}" y="${52+r*21.2}" width="42" height="21" fill="${(r*7+c)%9===0?'#F8E000':(r*7+c)%11===0?'#009040':'#fff'}" stroke="#E2DFD2" opacity="${(r*7+c)%9===0||(r*7+c)%11===0?.9:1}"/>`).join('')).join('')),
};

const plate = (i: number, dark: boolean) => {
  const y = 56 + i * 84;
  const top = `210,${y} 360,${y + 52} 210,${y + 104} 60,${y + 52}`;
  const L = `60,${y + 52} 210,${y + 104} 210,${y + 116} 60,${y + 64}`;
  const R = `210,${y + 104} 360,${y + 52} 360,${y + 64} 210,${y + 116}`;
  return `<g><polygon points="${L}" fill="#DDD9CB" stroke="#14171B" stroke-width="1.4"/><polygon points="${R}" fill="#C9C5B6" stroke="#14171B" stroke-width="1.4"/>
  <polygon class="plate" style="animation-delay:${(5 - i) * .18}s" points="${top}" fill="${dark ? '#14171B' : '#fff'}" stroke="#14171B" stroke-width="1.6"/>
  <text x="210" y="${y + 57}" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="13" font-weight="500" fill="${dark ? '#F8E000' : '#14171B'}">0${i + 1}</text></g>`;
};
export const stackSvg = `<svg viewBox="0 0 400 610" role="img" aria-labelledby="stk-t" focusable="false">
<title id="stk-t">Capability stack: six technology layers, with security running through every layer and managed services keeping every layer running</title>
<rect x="40" y="36" width="340" height="560" rx="10" fill="none" stroke="#14171B" stroke-width="1.2" stroke-dasharray="5 5"/>
<text x="210" y="22" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="10" letter-spacing=".6" fill="#646A72">MANAGED SERVICES — KEEP EVERY LAYER RUNNING</text>
<line x1="22" y1="70" x2="22" y2="570" stroke="#009040" stroke-width="5"/>
${[70,150,230,310,390,470,550].map((y: number) => `<line x1="14" y1="${y}" x2="30" y2="${y}" stroke="#009040" stroke-width="2"/>`).join('')}
<text transform="translate(8,320) rotate(-90)" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="10.5" letter-spacing="1.2" fill="#00763A">SECURITY — THROUGH EVERY LAYER</text>
${[5, 4, 3, 2, 1, 0].map((i) => plate(i, i === 5)).join('')}
</svg>`;

/* ---------- icons for the sensor-to-decision chain ---------- */
export const chainIcons = {
  sense: '<svg viewBox="0 0 70 70" aria-hidden="true"><circle cx="35" cy="35" r="5"/><path d="M24 24a15 15 0 0 0 0 22M46 24a15 15 0 0 1 0 22M16 16a27 27 0 0 0 0 38M54 16a27 27 0 0 1 0 38"/></svg>',
  control: '<svg viewBox="0 0 70 70" aria-hidden="true"><rect x="22" y="22" width="26" height="26"/><path d="M28 22v-8M35 22v-8M42 22v-8M28 48v8M35 48v8M42 48v8M22 28h-8M22 35h-8M22 42h-8M48 28h8M48 35h8M48 42h8"/></svg>',
  connect: '<svg viewBox="0 0 70 70" aria-hidden="true"><circle cx="16" cy="46" r="5"/><circle cx="35" cy="22" r="5"/><circle cx="54" cy="46" r="5"/><path d="M19 42l13-16M38 26l13 16M21 46h28"/></svg>',
  analyse: '<svg viewBox="0 0 70 70" aria-hidden="true"><path d="M14 14v42h42"/><path d="M20 46l10-12 9 6 13-20"/></svg>',
  act: '<svg viewBox="0 0 70 70" aria-hidden="true"><path d="M14 35h30M36 26l10 9-10 9"/><path d="M54 18v34"/></svg>',
};
