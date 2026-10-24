// Builds public/og/og-default.jpg (1200x630): pump installation photograph, navy gradient and the headline. No logo is redrawn.
import sharp from 'sharp';
const bg = await sharp('public/img/ref-pump-installation-1068.jpg').resize(1200, 630, { fit: 'cover', position: 'centre' }).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#050A14" stop-opacity=".97"/><stop offset=".6" stop-color="#050A14" stop-opacity=".84"/><stop offset="1" stop-color="#050A14" stop-opacity=".35"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/><rect x="64" y="96" width="64" height="6" fill="#F8E000"/>
<g font-family="DejaVu Sans, Arial, sans-serif" fill="#fff">
<text x="64" y="150" font-size="22" letter-spacing="3" fill="#19C46E">SIDDHRANS INFOTECH · BENGALURU</text>
<text x="64" y="270" font-size="70" font-weight="700">AI-Led Engineering.</text>
<text x="64" y="352" font-size="54" font-weight="700" fill="#F8E000">From Software to Smart Machines.</text>
<text x="64" y="430" font-size="28" fill="#C7D0E0">AI · Enterprise software · Embedded systems and IoT</text>
<text x="64" y="560" font-size="22" fill="#C7D0E0">Illustrative image · Agents, copilots, automation, 15 software systems since 2016</text></g></svg>`;
await sharp(bg).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og/og-default.jpg');
