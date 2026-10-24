// Single source of truth for company facts. Every value comes from the company profile PDF
// (contact, leadership, history) or is marked as pending verification.
export const site = {
  name: 'Siddhrans InfoTech Pvt Ltd',
  short: 'Siddhrans InfoTech',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://siddhrans.com',
  tagline: 'AI-Led Engineering. From Software to Smart Machines.',
  description:
    'Siddhrans InfoTech, Bengaluru: AI agents, copilots and intelligent automation, enterprise software built since 2016, and embedded systems, IoT and electronics.',
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
  { href: '/services/ai-ml-intelligent-automation/', label: 'AI & Automation' },
  { href: '/services/enterprise-software-engineering/', label: 'Software' },
  { href: '/services/embedded-systems-industrial-iot/', label: 'Embedded' },
  { href: '/services/cybersecurity/', label: 'Cloud & Security' },
  { href: '/industries/', label: 'Industries' },
  { href: '/products/', label: 'Solutions' },
  { href: '/engineering-use-cases/', label: 'Use Cases' },
  { href: '/about/', label: 'About' },
] as const;

// Electronic product development lifecycle (home page and /services/electronic-product-development/).
export const productLifecycle = [
  ['Concept', 'Define the measurable outcome, environment and constraints.'],
  ['Architecture', 'Choose sensing chain, controller, power and connectivity.'],
  ['Schematic & PCB', 'Capture the circuit and lay out the board for build and test.'],
  ['Firmware', 'Write and bring up the code that runs on the board.'],
  ['Prototype', 'Assemble, power up and prove the design on real equipment.'],
  ['Validate', 'Test, calibrate with domain engineers, and iterate before trusting it.'],
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
