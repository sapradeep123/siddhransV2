// Entry point: `node server/index.mjs` (see server/.env.example and docs/DEPLOYMENT.md).
import { buildTransport, createContactServer, createRateLimiter } from './contact.mjs';

const env = process.env;
const mailTo = env.MAIL_TO ?? 'gururaj.n@siddhrans.com';
const mailFrom = env.MAIL_FROM;
if (!mailFrom) { console.error('MAIL_FROM is required, e.g. MAIL_FROM="Siddhrans Website <website@siddhrans.com>"'); process.exit(1); }

const server = createContactServer({
  transport: buildTransport(env),
  mailTo,
  mailFrom,
  siteUrl: env.SITE_URL ?? 'https://siddhrans.com', // public origin for the logo and links in the email
  limiter: createRateLimiter({ max: Number(env.RATE_LIMIT_MAX ?? 5), windowMs: Number(env.RATE_WINDOW_MS ?? 15 * 60 * 1000) }),
  trustProxy: env.TRUST_PROXY === 'true',
  log: (m) => console.log(new Date().toISOString(), m),
});
const port = Number(env.PORT ?? 8787);
const host = env.HOST ?? '127.0.0.1';
server.listen(port, host, () => console.log(`contact API listening on http://${host}:${port}/api/contact`));
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => server.close(() => process.exit(0)));
