import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { buildEnquiryEmail, buildSubject, esc } from './email.mjs';
import { createContactServer } from './contact.mjs';

const SITE = 'https://siddhrans.vackya.com';
const full = { name: 'Asha Rao', email: 'asha@example.com', org: 'Acme Industries', phone: '+91 98765 43210', area: 'Enterprise software', message: 'Line one.\nLine two with <b>tags</b> & "quotes".' };
const at = new Date('2026-10-23T09:42:00Z');
const build = (d = full) => buildEnquiryEmail(d, { siteUrl: SITE, receivedAt: at });

test('subject follows "New Website Enquiry | <area> | Siddhrans" and is sanitised', () => {
  assert.equal(build().subject, 'New Website Enquiry | Enterprise software | Siddhrans');
  assert.equal(buildSubject('A | B\r\nBcc: x@evil.test'), 'New Website Enquiry | A B Bcc: x@evil.test | Siddhrans');
  assert.doesNotMatch(buildSubject('x\r\ny'), /[\r\n]/);
});

test('html contains real values, original logo URL, reply button, footer and IST time', () => {
  const { html } = build();
  for (const s of ['Asha Rao', 'asha@example.com', 'Acme Industries', '+91 98765 43210', 'Enterprise software', '23 Oct 2026, 3:12 PM IST',
    `src="${SITE}/brand/Siddhrans_Logo.png"`, 'alt="Siddhrans InfoTech"', 'New business enquiry', 'Website enquiry', 'Reply to enquiry',
    'mailto:asha@example.com?subject=', 'Siddhrans InfoTech Pvt Ltd', 'Bengaluru, India', '+91 89712 34343', '+91 99024 06387',
    'This is an automated notification generated from the Siddhrans website contact form.']) assert.ok(html.includes(s), s);
  assert.doesNotMatch(html, /<script|javascript:|@keyframes|<link /i);
});

test('visitor content is escaped (no HTML injection) and line breaks survive', () => {
  const evil = { ...full, name: '<img src=x onerror=alert(1)>', org: '"><script>alert(1)</script>', message: '<script>alert(1)</script>\nsecond line' };
  const { html, text } = build(evil);
  assert.doesNotMatch(html, /<script>alert|<img src=x/i);
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;<br>second line'));
  assert.ok(text.includes('<script>alert(1)</script>\nsecond line')); // plain text is literal, never rendered
  assert.equal(esc(`<>&"'`), '&lt;&gt;&amp;&quot;&#39;');
});

test('missing optional fields are omitted, never invented', () => {
  const { html, text } = build({ ...full, org: '', phone: '' });
  assert.doesNotMatch(html, />Phone</); assert.doesNotMatch(html, />Organisation</);
  assert.doesNotMatch(text, /^Phone: {3,}|^Organisation: /m);
  assert.doesNotMatch(html + text, /undefined|null|N\/A|\bTBD\b/);
});

test('mailto link is properly encoded', () => {
  const { html } = build({ ...full, email: 'a+b&c@ex.com' });
  assert.ok(html.includes('mailto:a%2Bb%26c@ex.com?subject='));
});

test('plain-text alternative carries the same enquiry', () => {
  const { text } = build();
  for (const s of ['Name:             Asha Rao', 'Email:            asha@example.com', 'Phone:            +91 98765 43210', 'Organisation:     Acme Industries', 'Area of interest: Enterprise software', 'Line one.']) assert.ok(text.includes(s), s);
});

test('server sends multipart html+text with correct From, To, Reply-To and subject', async () => {
  const sent = [];
  const transport = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' });
  const spy = { sendMail: async (m) => { sent.push(await transport.sendMail(m)); } };
  const server = createContactServer({ transport: spy, mailTo: 'gururaj.n@siddhrans.com', mailFrom: 'info@khubera.in', siteUrl: SITE, now: () => at });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const res = await fetch(`http://127.0.0.1:${server.address().port}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...full, area: 'Enterprise software', consent: true, website: '' }) });
  assert.equal(res.status, 200);
  await new Promise((r) => server.close(r));
  const raw = sent[0].message.toString();
  assert.match(raw, /^From: info@khubera\.in$/m);
  assert.match(raw, /^To: gururaj\.n@siddhrans\.com$/m);
  assert.match(raw, /^Reply-To: Asha Rao <asha@example\.com>$/m);
  assert.match(raw, /^Subject: New Website Enquiry \| Enterprise software \| Siddhrans$/m);
  assert.match(raw, /Content-Type: multipart\/alternative/);
  assert.match(raw, /Content-Type: text\/plain/); assert.match(raw, /Content-Type: text\/html/);
});
