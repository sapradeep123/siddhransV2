// Single source of truth for company facts. Every value comes from the company profile PDF
// (contact, leadership, history) or is marked as pending verification.
export const site = {
  name: 'Siddhrans InfoTech Pvt Ltd',
  short: 'Siddhrans InfoTech',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://siddhrans.com',
  tagline: 'Electronics, VLSI & Embedded Systems Engineering',
  description:
    'Siddhrans InfoTech, Bengaluru, designs electronic products, PCB hardware, embedded firmware and connected systems, with VLSI design support, edge AI, software and cybersecurity.',
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
  { href: '/engineering-use-cases/', label: 'Engineering Use Cases' },
  { href: '/industries/', label: 'Industries' },
  { href: '/products/', label: 'Solutions' },
  { href: '/case-studies/', label: 'Case Studies' },
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
