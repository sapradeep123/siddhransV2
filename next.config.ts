import type { NextConfig } from 'next';

// Static export: every page is prerendered to plain HTML in `out/` and can be served by nginx.
// The only dynamic piece is the contact API (server/), reverse-proxied at /api/contact.
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};
export default config;
