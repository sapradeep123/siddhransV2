import { test, expect } from '@playwright/test';
import nodemailer from 'nodemailer';
import { createContactServer } from '../server/contact.mjs';

// Full path: browser form -> static server -> /api proxy -> contact API -> (captured) SMTP message.
test('enquiry travels from the form to an email addressed to the company', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'one full-stack run is enough');
  const sent: { to: string; replyTo: string; subject: string; text: string }[] = [];
  const json = nodemailer.createTransport({ jsonTransport: true });
  const server = createContactServer({ transport: { sendMail: async (m: never) => { sent.push(m); return json.sendMail(m); } }, mailTo: 'gururaj.n@siddhrans.com', mailFrom: 'Siddhrans Website <website@siddhrans.com>' });
  await new Promise<void>((r) => server.listen(Number(process.env.TEST_API_PORT ?? 8787), '127.0.0.1', r));
  try {
    await page.goto('/contact/');
    await page.getByLabel('Name', { exact: true }).fill('Asha Rao');
    await page.getByLabel('Work email').fill('asha@example.com');
    await page.getByLabel('Organisation').fill('Acme Pharma');
    await page.getByLabel('Area of interest').selectOption('Embedded systems & industrial IoT');
    await page.getByLabel('How can we help?').fill('We want to monitor vibration on our packaging line motors.');
    await page.getByLabel(/I agree that/).check();
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    await expect(page.getByTestId('sent')).toBeVisible();
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toBe('gururaj.n@siddhrans.com');
    expect(sent[0].replyTo).toContain('asha@example.com');
    expect(sent[0].subject).toBe('New Website Enquiry | Embedded systems & industrial IoT | Siddhrans');
    expect(sent[0].text).toContain('vibration on our packaging line motors');
    expect(sent[0].text).toContain('Acme Pharma');
  } finally {
    await new Promise((r) => server.close(r));
  }
});
