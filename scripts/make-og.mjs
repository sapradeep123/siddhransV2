// Builds public/og/og-default.jpg (1200x630): board-assembly photograph, navy gradient and the headline. No logo is redrawn.
import sharp from 'sharp';
const bg = await sharp('public/img/hw-solder-board-1600.jpg').resize(1200, 630, { fit: 'cover', position: 'right' }).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#050A14" stop-opacity=".96"/><stop offset=".55" stop-color="#050A14" stop-opacity=".82"/><stop offset="1" stop-color="#050A14" stop-opacity=".25"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/><rect x="64" y="96" width="64" height="6" fill="#FFD400"/>
<g font-family="DejaVu Sans, Arial, sans-serif" fill="#fff">
<text x="64" y="150" font-size="22" letter-spacing="3" fill="#19C46E">SIDDHRANS INFOTECH · BENGALURU</text>
<text x="64" y="270" font-size="68" font-weight="700">From Circuit Design</text>
<text x="64" y="350" font-size="68" font-weight="700">to Intelligent Systems.</text>
<text x="64" y="430" font-size="28" fill="#C7D0E0">Electronics, VLSI &amp; Embedded Systems Engineering</text>
<text x="64" y="560" font-size="22" fill="#C7D0E0">PCB design · Embedded firmware · Product prototyping · Industrial IoT · Edge AI</text></g></svg>`;
await sharp(bg).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og/og-default.jpg');
