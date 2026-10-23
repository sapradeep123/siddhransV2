// Single source of truth for company facts. Every value comes from the company profile PDF
// (contact, leadership, history) or is marked as pending verification.
export const site = {
  name: 'Siddhrans InfoTech Pvt Ltd',
  short: 'Siddhrans InfoTech',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://siddhrans.com',
  tagline: 'Technology Engineering, AI & Cybersecurity Partner',
  description:
    'Siddhrans InfoTech Pvt Ltd is a Bengaluru engineering company: enterprise software, AI and automation, cybersecurity, cloud and infrastructure, and embedded and industrial IoT systems.',
  phone: { display: '+91 89712 34343', tel: '+918971234343' },
  // Both numbers are supplied by the company. Keep the first (profile) number first.
  phones: [
    { display: '+91 89712 34343', tel: '+918971234343' },
    { display: '+91 99024 06387', tel: '+919902406387' },
  ],
  // Proposed enquiry recipient (profile contact); confirm before go-live.
  email: 'gururaj.n@siddhrans.com',
  city: 'Bengaluru',
  country: 'India',
  founded: 2016,
  leadership: [
    { name: 'Gururaj N', role: 'Founder & CEO' },
    { name: 'Pavithra H.B', role: 'Co-Founder, VP & CHRO' },
  ],
} as const;

export const nav = [
  { href: '/services/', label: 'Services' },
  { href: '/products/', label: 'Solutions' },
  { href: '/industries/', label: 'Industries' },
  { href: '/engineering-use-cases/', label: 'Engineering Use Cases' },
  { href: '/case-studies/', label: 'Case Studies' },
  { href: '/about/', label: 'About' },
] as const;

export const lifecycle = [
  ['Discover', 'Understand the business problem before touching technology.'],
  ['Design', 'Architect the solution that fits — not the one that is fashionable.'],
  ['Build', 'Engineer applications, platforms and integrations.'],
  ['Automate', 'Apply AI, agents, workflow and RPA where they earn their place.'],
  ['Secure', 'Protect applications, infrastructure, identities and data.'],
  ['Modernise', 'Upgrade legacy applications, servers and infrastructure.'],
  ['Operate', 'Administer, monitor and support production environments.'],
  ['Optimise', 'Improve performance, reliability and cost.'],
] as const;
