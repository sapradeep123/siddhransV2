import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { createContactServer, createRateLimiter, validate } from './contact.mjs';

const good = { name: 'Asha Rao', email: 'asha@example.com', org: 'Acme', phone: '', area: 'Cybersecurity', message: 'We need a security review of our servers.', consent: true, website: '' };

async function start(opts = {}) {
  const sent = [];
  const base = nodemailer.createTransport({ jsonTransport: true });
  const transport = { sendMail: async (m) => { if (opts.fail) throw Object.assign(new Error('smtp down'), { code: 'ECONNECTION' }); sent.push(m); return base.sendMail(m); } };
  const server = createContactServer({ transport, mailTo: 'to@example.com', mailFrom: 'web@example.com', limiter: opts.limiter, trustProxy: opts.trustProxy });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${server.address().port}`;
  return { sent, url, close: () => new Promise((r) => server.close(r)) };
}
const post = (url, body, headers = {}) => fetch(`${url}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('valid enquiry is emailed to the recipient with reply-to', async () => {
  const s = await start();
  const r = await post(s.url, good);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
  assert.equal(s.sent.length, 1);
  assert.equal(s.sent[0].to, 'to@example.com');
  assert.match(s.sent[0].replyTo, /asha@example\.com/);
  assert.match(s.sent[0].text, /security review/);
  await s.close();
});

test('invalid fields return 400 with field errors and send nothing', async () => {
  const s = await start();
  const r = await post(s.url, { ...good, name: '', email: 'nope', message: 'short', consent: false });
  assert.equal(r.status, 400);
  const j = await r.json();
  assert.deepEqual(Object.keys(j.errors).sort(), ['consent', 'email', 'message', 'name']);
  assert.equal(s.sent.length, 0);
  await s.close();
});

test('honeypot submissions get a silent success and send nothing', async () => {
  const s = await start();
  const r = await post(s.url, { ...good, website: 'http://spam.example' });
  assert.equal(r.status, 200);
  assert.equal(s.sent.length, 0);
  await s.close();
});

test('header injection attempts are neutralised', async () => {
  const s = await start();
  await post(s.url, { ...good, name: 'Eve\r\nBcc: victim@example.com', email: 'eve@example.com', area: 'x\r\nBcc: v@example.com' });
  assert.equal(s.sent.length, 1);
  assert.doesNotMatch(s.sent[0].replyTo, /[\r\n]/);
  assert.doesNotMatch(s.sent[0].subject, /[\r\n]/);
  assert.equal(s.sent[0].bcc, undefined);
  await s.close();
});

test('rate limit returns 429 after the allowed number of requests', async () => {
  const s = await start({ limiter: createRateLimiter({ max: 2 }) });
  assert.equal((await post(s.url, good)).status, 200);
  assert.equal((await post(s.url, good)).status, 200);
  const r = await post(s.url, good);
  assert.equal(r.status, 429);
  assert.equal(r.headers.get('retry-after'), '900');
  await s.close();
});

test('rate limiting keys on X-Forwarded-For only when the proxy is trusted', async () => {
  const s = await start({ limiter: createRateLimiter({ max: 1 }), trustProxy: true });
  assert.equal((await post(s.url, good, { 'X-Forwarded-For': '203.0.113.1' })).status, 200);
  assert.equal((await post(s.url, good, { 'X-Forwarded-For': '203.0.113.2' })).status, 200);
  assert.equal((await post(s.url, good, { 'X-Forwarded-For': '203.0.113.1' })).status, 429);
  await s.close();
});

test('oversized, malformed, wrong-method and wrong-type requests are rejected', async () => {
  const s = await start();
  assert.equal((await post(s.url, 'x'.repeat(30 * 1024))).status, 413);
  assert.equal((await post(s.url, '{not json')).status, 400);
  assert.equal((await fetch(`${s.url}/api/contact`)).status, 405);
  assert.equal((await post(s.url, 'a=b', { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await fetch(`${s.url}/other`)).status, 404);
  assert.equal(s.sent.length, 0);
  await s.close();
});

test('SMTP failure returns 502 without leaking details', async () => {
  const s = await start({ fail: true });
  const r = await post(s.url, good);
  assert.equal(r.status, 502);
  assert.deepEqual(await r.json(), { ok: false, error: 'send_failed' });
  await s.close();
});

test('validate trims, clamps and defaults the area', () => {
  const { data, ok } = validate({ ...good, name: '  Asha  ', area: 'Not a real area' });
  assert.equal(ok, true);
  assert.equal(data.name, 'Asha');
  assert.equal(data.area, 'Something else');
});
