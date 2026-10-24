// Lightweight SMTP-backed contact endpoint. No database: enquiries are emailed and not stored.
// Run behind nginx at /api/contact. Configuration comes from environment variables (see .env.example).
import http from 'node:http';
import nodemailer from 'nodemailer';
import { buildEnquiryEmail } from './email.mjs';

const AREAS = ['PCB & hardware design', 'Embedded firmware & microcontrollers', 'VLSI & FPGA design support', 'Electronic product prototyping', 'Embedded systems & industrial IoT', 'Edge AI', 'Enterprise software', 'AI & automation', 'Cybersecurity', 'Cloud & infrastructure', 'Managed services', 'Something else'];
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_BODY = 20 * 1024;
const LIMITS = { name: 120, email: 200, org: 160, phone: 40, message: 5000 };

/** Remove control characters (and so any CR/LF header injection) and trim. */
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max);
const LINE_BREAKS = new RegExp('[\r\n\u2028\u2029]+', 'g');
const oneLine = (v, max) => clean(v, max).replace(LINE_BREAKS, ' ');

export function validate(input) {
  const data = {
    name: oneLine(input?.name, LIMITS.name),
    email: oneLine(input?.email, LIMITS.email),
    org: oneLine(input?.org, LIMITS.org),
    phone: oneLine(input?.phone, LIMITS.phone),
    area: AREAS.includes(input?.area) ? input.area : 'Something else',
    message: clean(input?.message, LIMITS.message),
  };
  const errors = {};
  if (!data.name) errors.name = 'Please enter your name.';
  if (!EMAIL.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.message.length < 10) errors.message = 'Please tell us a little about what you need (at least 10 characters).';
  if (input?.consent !== true) errors.consent = 'Please confirm consent so we can reply.';
  return { data, errors, ok: Object.keys(errors).length === 0 };
}

export function createRateLimiter({ max = 5, windowMs = 15 * 60 * 1000, now = () => Date.now() } = {}) {
  const hits = new Map();
  return (key) => {
    const t = now();
    const arr = (hits.get(key) ?? []).filter((x) => t - x < windowMs);
    if (arr.length >= max) { hits.set(key, arr); return false; }
    arr.push(t); hits.set(key, arr);
    if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((x) => t - x < windowMs)) hits.delete(k);
    return true;
  };
}

export function buildTransport(env = process.env) {
  if (env.MAIL_TRANSPORT === 'json') return nodemailer.createTransport({ jsonTransport: true });
  if (!env.SMTP_HOST) throw new Error('SMTP_HOST is required (or set MAIL_TRANSPORT=json for local testing).');
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT ?? 587),
    secure: env.SMTP_SECURE === 'true',
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    connectionTimeout: 10_000, socketTimeout: 15_000,
  });
}

const send = (res, status, body) => {
  const s = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Content-Length': Buffer.byteLength(s) });
  res.end(s);
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const declared = Number(req.headers['content-length'] ?? 0);
    let size = 0; let over = declared > MAX_BODY; const chunks = [];
    // Keep draining an oversized upload (so the client can read our 413) but never buffer it.
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) over = true; if (!over) chunks.push(c); });
    req.on('end', () => (over ? reject(Object.assign(new Error('too large'), { status: 413 })) : resolve(Buffer.concat(chunks).toString('utf8'))));
    req.on('error', reject);
  });
}

export function createContactServer({ transport, mailTo, mailFrom, siteUrl = 'https://siddhrans.com', limiter = createRateLimiter(), trustProxy = false, log = () => {}, now = () => new Date() } = {}) {
  if (!transport || !mailTo || !mailFrom) throw new Error('transport, mailTo and mailFrom are required');
  return http.createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (url.pathname === '/api/health') return send(res, 200, { ok: true });
    if (url.pathname !== '/api/contact') return send(res, 404, { ok: false, error: 'not_found' });
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false, error: 'method_not_allowed' }); }
    if (!String(req.headers['content-type'] ?? '').toLowerCase().startsWith('application/json')) return send(res, 415, { ok: false, error: 'unsupported_media_type' });

    const ip = (trustProxy && String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()) || req.socket.remoteAddress || 'unknown';
    if (!limiter(ip)) { log('rate_limited'); res.setHeader('Retry-After', '900'); return send(res, 429, { ok: false, error: 'rate_limited' }); }

    let input;
    try { input = JSON.parse(await readBody(req)); }
    catch (e) { return send(res, e.status === 413 ? 413 : 400, { ok: false, error: e.status === 413 ? 'too_large' : 'bad_json' }); }

    // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
    if (typeof input?.website === 'string' && input.website.trim() !== '') { log('honeypot'); return send(res, 200, { ok: true }); }

    const { data, errors, ok } = validate(input);
    if (!ok) return send(res, 400, { ok: false, errors });

    const { subject, html, text } = buildEnquiryEmail(data, { siteUrl, receivedAt: now() });
    const replyName = data.name.replace(/["<>\\]/g, '').trim() || data.email;
    try {
      await transport.sendMail({ from: mailFrom, to: mailTo, replyTo: `"${replyName}" <${data.email}>`, subject, text, html });
      log('sent');
      return send(res, 200, { ok: true });
    } catch (e) {
      log(`send_failed:${e?.code ?? 'error'}`); // never log the enquiry contents
      return send(res, 502, { ok: false, error: 'send_failed' });
    }
  });
}
