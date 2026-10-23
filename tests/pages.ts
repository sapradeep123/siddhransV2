export const SERVICE_SLUGS = [
  'enterprise-software-engineering', 'ai-ml-intelligent-automation', 'rpa-business-automation', 'cybersecurity',
  'cloud-infrastructure', 'data-analytics-integration', 'embedded-systems-industrial-iot', 'managed-technology-services',
];
export const PAGES = [
  '/', '/services/', '/products/', '/industries/', '/engineering-use-cases/', '/case-studies/', '/about/', '/contact/', '/privacy/', '/image-credits/',
  ...SERVICE_SLUGS.map((s) => `/services/${s}/`),
];
export const LOGO_SHA256 = '9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7';
