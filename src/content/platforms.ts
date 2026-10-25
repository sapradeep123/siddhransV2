// Software, AI and automation platforms shown on the service pages. Descriptions follow the owner's brief only;
// no customers, volumes, results or certifications. Visuals are concept UIs with illustrative data.
export type VisualKey =
  | 'inventreDash' | 'inventreFlow' | 'erpOps' | 'erpSync' | 'cyberRange' | 'gcseLms'
  | 'projActual' | 'kpiBoard' | 'dataFlow'
  | 'khubera' | 'vackya' | 'recruiti' | 'vendorBilling' | 'noticeSplit';

export interface PlatformBlock {
  id: string;
  name: string;
  tag: string;
  title: string;
  text: string;
  points: string[];
  visuals: VisualKey[];
}

export interface PlatformSection { eyebrow: string; title: string; lede: string; blocks: PlatformBlock[] }

export const platformSections: Record<string, PlatformSection> = {
  'enterprise-software-engineering': {
    eyebrow: 'Selected software platforms',
    title: 'Platforms we have engineered.',
    lede: 'Four larger platforms, from inventory and ERP to cyber training and education. Screens are concept UI with illustrative data.',
    blocks: [
      { id: 'inventre', name: 'Inventre', tag: 'Inventory & operations platform', title: 'Inventre: inventory management, from purchase to stock to bill.',
        text: 'A broad inventory and operations platform that gives end-to-end visibility from procurement through the warehouse to the customer order.',
        points: ['Inventory management and warehouse operations', 'Procurement with RFQ and RFP support where applicable', 'Vendor management and supplier delivery tracking', 'GRN, returns and damages handling', 'Client order handling and billing flows', 'Projection versus actuals for performance management'],
        visuals: ['inventreDash', 'inventreFlow'] },
      { id: 'erpnext', name: 'ERPNext', tag: 'ERP implementation & integration', title: 'ERPNext implementation with a fast communication layer.',
        text: 'ERPNext implementation and customisation, with a high-speed data saving, transfer and communication layer built around it so business systems stay in step.',
        points: ['ERPNext implementation and customisation', 'Fast data saving, transfer and communication layer', 'Business process integration', 'Transaction and operations support', 'Reporting and data flow'],
        visuals: ['erpOps', 'erpSync'] },
      { id: 'cyberlabs', name: 'Cyberlabs', tag: 'Cyber training platform', title: 'Cyberlabs: a cyber range, drills and courses in one package.',
        text: 'A substantial software platform for practical cyber learning and training, combining a cyber range, cyber drills and cyber courses into a full training and practice package.',
        points: ['Cyber range for hands-on practice', 'Cyber drills and exercises', 'Cyber courses and learning paths', 'A complete training and practice package'],
        visuals: ['cyberRange'] },
      { id: 'gcse', name: 'GCSE Path', tag: 'Education platform', title: 'GCSE Path: a learning platform for GCSE students in London.',
        text: 'A learning management system for GCSE students in London, bringing subjects, lessons, practice and progress together.',
        points: ['LMS built for GCSE students in London', 'Subjects, lessons and practice in one place', 'Progress and homework tracking'],
        visuals: ['gcseLms'] },
    ],
  },
  'data-analytics-integration': {
    eyebrow: 'Operational data in practice',
    title: 'From transactions to decisions.',
    lede: 'The reporting and integration layers behind our inventory and ERP work. Screens are concept UI with illustrative data.',
    blocks: [
      { id: 'reporting', name: 'Reporting & analytics', tag: 'Inventre reporting', title: 'Operational dashboards and projection versus actuals.',
        text: 'Inventory, warehouse, vendor and order analytics that put planned and actual performance side by side for the people running operations.',
        points: ['Projection versus actuals for performance management', 'Inventory, warehouse and vendor analytics', 'Order and delivery visibility', 'Operational dashboards and business visibility'],
        visuals: ['kpiBoard', 'projActual'] },
      { id: 'integration', name: 'Integration & data movement', tag: 'ERPNext and system-to-system', title: 'System-to-system data movement you can see and trust.',
        text: 'Integration between ERPNext and surrounding systems, and the flow of procurement, warehouse and delivery data into one reporting view.',
        points: ['ERPNext integration and operational reporting', 'System-to-system data movement', 'Procurement, warehouse and delivery data flow', 'An integration monitor for transfers, retries and exceptions'],
        visuals: ['dataFlow', 'erpSync'] },
    ],
  },
  'ai-ml-intelligent-automation': {
    eyebrow: 'Selected AI solutions',
    title: 'AI platforms for decisions, conversations and hiring.',
    lede: 'Three platforms built around AI. Screens are concept UI with illustrative data.',
    blocks: [
      { id: 'khubera', name: 'Khubera', tag: 'Multi-agent decision platform', title: 'Khubera: rules and AI agents supporting shareholder decisions.',
        text: 'A multi-agent rule and AI decision-making platform for shareholders, combining fixed rules with AI reasoning and keeping people in the approval chain.',
        points: ['Multiple agents reason over rules and documents', 'Rules plus AI actions', 'Recommendations with sources attached', 'Approval and governance steps, with a record of each decision'],
        visuals: ['khubera'] },
      { id: 'vackya', name: 'Vackya', tag: 'Voice bot platform', title: 'Vackya: a voice bot for sales leads and business conversations.',
        text: 'A voice bot platform for operational improvement, sales lead handling and business interaction workflows.',
        points: ['Voice bot workflows for business interactions', 'Sales lead capture and handling', 'Conversation and follow-up management', 'Operational improvement through automated calls'],
        visuals: ['vackya'] },
      { id: 'recruiti', name: 'Recruiti 360', tag: 'Recruitment platform', title: 'Recruiti 360: the recruitment process, end to end.',
        text: 'A complete recruitment process platform, from collecting the requirement to placement, coordinating multiple sub-vendors along the way.',
        points: ['Requirement collection', 'Scouting and sourcing', 'Candidate management', 'Placement workflow', 'Multiple sub-vendor connection and coordination'],
        visuals: ['recruiti'] },
    ],
  },
  'rpa-business-automation': {
    eyebrow: 'Delivered automation',
    title: 'Automation that handles the routine and hands over the exceptions.',
    lede: 'Two delivered automations. Screens are concept UI with illustrative data.',
    blocks: [
      { id: 'billing', name: 'Vendor billing', tag: 'Continuous automation', title: 'Continuous vendor billing automation.',
        text: 'Vendor bills are read, matched to the client purchase order and prepared for ordering, with exceptions routed to a person.',
        points: ['OCR from vendor billing and invoice input', 'Conversion and mapping to the client PO', 'Order preparation and placement support', 'Exception handling', 'Human review where necessary'],
        visuals: ['vendorBilling'] },
      { id: 'notices', name: 'Notices', tag: 'Document automation', title: 'Department notices: split, check and dispatch.',
        text: 'One combined file from several departments is split into individual notices, checked, and dispatched to the right people.',
        points: ['Receive one combined file from multiple departments', 'Split it into individual notices', 'Identify missing or low-confidence files', 'Human-in-the-loop review', 'Dispatch to individuals'],
        visuals: ['noticeSplit'] },
    ],
  },
};

/** Flat list for the Services and Products & Solutions pages. Delivered by Siddhrans (owner-confirmed). Not part of the fifteen-system portfolio count. */
export const platformList = Object.entries(platformSections).flatMap(([slug, sec]) =>
  slug === 'data-analytics-integration' ? [] : sec.blocks.map((b) => ({ id: b.id, name: b.name, tag: b.tag, text: b.text, slug, href: `/services/${slug}/#${b.id}` })),
);
