// Tiny static server for the exported site (`out/`), used by tests and local review.
// Mirrors the nginx behaviour we deploy: directory index files, trailing-slash routes, custom 404.
import http from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'out');
const port = Number(process.env.PORT ?? 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.xml': 'application/xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };

const cache = new Map();
// Security headers mirrored from docs/DEPLOYMENT.md so the test suite exercises the same policy production will use.
const SECURITY = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-Content-Type-Options': 'nosniff',
};
const apiProxy = process.env.API_PROXY ? new URL(process.env.API_PROXY) : null; // e.g. http://127.0.0.1:8787 (mirrors the nginx /api/ proxy)

http.createServer((req, res) => {
  if (apiProxy && (req.url ?? '').startsWith('/api/')) {
    const up = http.request({ host: apiProxy.hostname, port: apiProxy.port, path: req.url, method: req.method, headers: { ...req.headers, host: apiProxy.host } }, (r) => { res.writeHead(r.statusCode ?? 502, r.headers); r.pipe(res); });
    up.on('error', () => { res.writeHead(502); res.end(); });
    return req.pipe(up);
  }
  const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
  let file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  let status = 200;
  if (!existsSync(file)) { file = join(root, '404.html'); status = 404; }
  const type = types[extname(file)] ?? 'application/octet-stream';
  const headers = { 'Content-Type': type, 'Cache-Control': path.startsWith('/_next/static/') || path.startsWith('/img/') || path.startsWith('/brand/') ? 'public, max-age=31536000, immutable' : 'no-cache', ...SECURITY, Vary: 'Accept-Encoding' };
  // Compress text like the production nginx config does (brotli / gzip); images and fonts are already compressed.
  if (/^(text\/|application\/(json|xml|javascript)|image\/svg)/.test(type) || type.startsWith('text/javascript')) {
    const ae = String(req.headers['accept-encoding'] ?? '');
    const enc = ae.includes('br') ? 'br' : ae.includes('gzip') ? 'gzip' : null;
    if (enc) {
      const key = `${enc}:${file}:${statSync(file).mtimeMs}`;
      if (!cache.has(key)) { const raw = readFileSync(file); cache.set(key, enc === 'br' ? brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }) : gzipSync(raw)); }
      const body = cache.get(key);
      res.writeHead(status, { ...headers, 'Content-Encoding': enc, 'Content-Length': body.length });
      return res.end(body);
    }
  }
  res.writeHead(status, headers);
  createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${port}`));
