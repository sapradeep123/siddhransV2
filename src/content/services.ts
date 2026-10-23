// Service pages. Source: company profile PDF (p5-p16) and, for embedded/IoT, the engineering deck.
// Status labels follow the profile: software = delivered; data = evidenced in delivered work;
// AI, RPA, security, cloud, managed = engineering capability; embedded = engineering solutions.
import type { PhotoName } from './images';
import type { IllKind } from './usecases';

export type ServiceStatus = 'built' | 'capability' | 'evidenced' | 'solutions';
export const serviceStatusLabel: Record<ServiceStatus, string> = {
  built: 'Systems built',
  capability: 'Engineering capability',
  evidenced: 'Evidenced in built systems',
  solutions: 'Engineering solutions',
};

export interface Service {
  slug: string;
  n: string;
  title: string;
  short: string;
  intro: string;
  status: ServiceStatus;
  photo: PhotoName;
  photoPos?: string;
  ill?: 'flow' | 'chart' | 'loop';
  tileBlurb: string;
  stepsTitle: string;
  steps: [string, string][];
  listTitle: string;
  list: string[];
  groups?: { title: string; text: string }[];
  groupsTitle?: string;
  note?: string;
  cta: string;
}

export const services: Service[] = [
  {
    slug: 'enterprise-software-engineering', n: '01', title: 'Enterprise Software Engineering', short: 'Enterprise Software',
    intro: 'Every organisation runs on processes its software was never built for. We build the systems that fit the work: applications, portals, workflow and operational systems, engineered, database-backed and in production use.',
    status: 'built', photo: 'code-screen', tileBlurb: 'Portals, mobile, LMS, billing, workflow.',
    stepsTitle: 'From business problem to production system',
    steps: [['Discover', 'Understand the process and the people who run it.'], ['Design', 'Model the data, workflow and integrations.'], ['Build', 'Engineer the application, database and reporting.'], ['Operate', 'Support, upgrade and enhance what we build.']],
    listTitle: 'What we engineer',
    list: ['Enterprise applications & business portals', 'Web & mobile engineering', 'Workflow & approval systems', 'Training & examination platforms', 'Billing, POS & operational systems', 'Database applications & reporting', 'API & systems integration', 'Legacy application modernisation'],
    note: 'Backed by fifteen named systems built since 2016, from Siddhrans LMS and the Talent platforms to GST Billing, POS and sector systems.',
    cta: 'Tell us about the system you need.',
  },
  {
    slug: 'ai-ml-intelligent-automation', n: '02', title: 'AI, ML & Intelligent Automation', short: 'AI, ML & Intelligent Automation',
    intro: 'AI earns its place when it is wired into data, process and oversight. That integration, not the model, is the engineering problem. We build AI into real workflows, with people in the loop.',
    status: 'capability', photo: 'ai-network', photoPos: '50% 55%', tileBlurb: 'Copilots, document intelligence, analytics.',
    stepsTitle: 'How applied AI is put together',
    steps: [['Data & documents', 'Enterprise sources feed the system.'], ['Retrieval & models', 'Knowledge retrieval plus machine learning.'], ['Agents & copilots', 'Task execution for multi-step work.'], ['Workflow action', 'Results flow into systems and approvals.'], ['Human oversight', 'Exceptions and control stay with people.']],
    listTitle: 'What we engineer with AI',
    list: ['Generative AI applications for business tasks', 'AI assistants & role-specific copilots', 'Multi-agent solutions for multi-step work', 'Intelligent document processing', 'Natural-language interfaces to systems', 'Enterprise knowledge retrieval', 'Predictive analytics & decision support', 'AI-enabled workflow, with people in the loop'],
    note: 'Status: engineering capability, designed, prototyped and applied on engagement on top of our delivered software and automation platforms. We do not claim production AI deployments we cannot evidence.',
    cta: 'Discuss where AI could earn its place in your workflow.',
  },
  {
    slug: 'rpa-business-automation', n: '03', title: 'RPA & Business Automation', short: 'RPA & Business Automation',
    intro: 'Automate the work that should not require human repetition. RPA here is not "bots"; it is the discipline of turning a process into a controlled system.',
    status: 'capability', photo: 'factory-corridor', ill: 'flow', tileBlurb: 'Workflow, approvals, system-to-system flows.',
    stepsTitle: 'Turning a process into a controlled system',
    steps: [['Process', 'Map the work as it actually happens.'], ['Rules', 'Write down the decisions the work depends on.'], ['Workflow', 'Sequence steps, owners and approvals.'], ['Integration', 'Connect the systems the work passes through.'], ['Automation', 'Let the system carry the repetition.'], ['Exception', 'People handle only what needs judgement.']],
    listTitle: 'Where it applies',
    list: ['Approval & document workflows', 'Data movement between systems', 'API-driven & integration automation', 'Business-rule & repetitive-process automation', 'Operational & back-office automation', 'System-to-system handoffs'],
    note: 'Status: engineering capability, built on our delivered workflow, billing and operational systems.',
    cta: 'Tell us which process is costing you the most time.',
  },
  {
    slug: 'cybersecurity', n: '04', title: 'Cybersecurity & Secure Engineering', short: 'Cybersecurity',
    intro: 'Security as an engineering discipline. We treat protection as layers of concrete controls, not a product badge, and it decides whether the other disciplines can be trusted.',
    status: 'capability', photo: 'fibre-patch', tileBlurb: 'Assess, harden, monitor, remediate.',
    stepsTitle: 'Defence in layers',
    steps: [['Identity & access', 'Authentication, access controls, secure access.'], ['Endpoint & OS', 'Server and OS hardening, patch and vulnerability management.'], ['Network', 'Firewall and security configuration, network isolation.'], ['Application', 'Secure engineering, controlled environments.'], ['Data', 'Secure databases, backup, access discipline.'], ['Monitoring', 'Logging, monitoring, audit trails.'], ['Recovery', 'Disaster recovery, security remediation.']],
    listTitle: 'Scope',
    list: ['Security assessment', 'Hardening and configuration', 'Monitoring and logging', 'Vulnerability and patch management', 'Access control and secure access', 'Remediation and recovery'],
    note: 'Our scope is assessment, hardening, configuration, monitoring and remediation. We make no claims of a security operations centre or accreditation.',
    cta: 'Ask us to review your security posture.',
  },
  {
    slug: 'cloud-infrastructure', n: '05', title: 'Cloud, Server & Infrastructure', short: 'Cloud & Infrastructure',
    intro: 'The layer everything else depends on: administered, modernised and watched, not just installed. We design, migrate and operate on-premise and cloud infrastructure.',
    status: 'capability', photo: 'datacentre-aisle', tileBlurb: 'Servers, migration, backup, availability.',
    stepsTitle: 'From assessment to optimisation',
    steps: [['Assess', 'Inventory servers, OS versions, risks.'], ['Architect', 'Design the target state, on-premise or cloud.'], ['Migrate', 'Move systems, data and services safely.'], ['Secure', 'Harden, patch and control access.'], ['Operate', 'Administer production day to day.'], ['Monitor', 'Watch health, backups and capacity.'], ['Optimise', 'Improve performance and cost.']],
    listTitle: 'Administration & engineering',
    list: ['Windows & Linux server administration', 'Server & OS upgrades, infrastructure migration', 'Cloud migration & configuration', 'Database administration', 'Backup / restore & disaster recovery', 'High availability & performance optimisation', 'Monitoring & production administration', 'Infrastructure automation'],
    cta: 'Tell us about the infrastructure you need to modernise.',
  },
  {
    slug: 'data-analytics-integration', n: '06', title: 'Data, Analytics & Integration', short: 'Data, Analytics & Integration',
    intro: 'From systems of record to decisions. Data work starts where our software already lives: billing, inventory, training and operational records.',
    status: 'evidenced', photo: 'code-screen', ill: 'chart', photoPos: '70% 40%', tileBlurb: 'APIs, dashboards, reporting.',
    stepsTitle: 'From records to action',
    steps: [['Systems', 'Billing, POS, LMS, inventory and talent platforms create the records.'], ['Data', 'Extraction, cleaning and transformation into usable structures.'], ['Integration', 'APIs and system-to-system flows that remove re-keying.'], ['Intelligence', 'Dashboards, analytics and reporting over live operations.'], ['Action', 'Decisions, alerts and automated follow-through.']],
    listTitle: 'Capability',
    list: ['Data engineering & transformation', 'API & systems integration', 'Operational dashboards & business analytics'],
    groupsTitle: 'Evidenced in our delivered work',
    groups: [{ title: 'Database-backed operational systems', text: 'Transactional systems with structured records.' }, { title: 'GST-compliant billing & records', text: 'Billing and records engineered for Indian tax requirements.' }, { title: 'Result processing & reporting in the LMS', text: 'Assessment results and learner reporting.' }],
    cta: 'Tell us which data you want to turn into decisions.',
  },
  {
    slug: 'embedded-systems-industrial-iot', n: '07', title: 'Embedded Systems & Industrial IoT', short: 'Embedded Systems & Industrial IoT',
    intro: 'We engineer the whole chain between a physical signal and a business decision: sensors, embedded controllers, connectivity, secure backends, dashboards and alerts.',
    status: 'solutions', photo: 'solder-bench', photoPos: '50% 60%', tileBlurb: 'Sensing, controllers, connectivity, dashboards and alerts.',
    stepsTitle: 'Engineering gates, not guesses',
    steps: [['Define', 'Measurable outcome, environment and constraints.'], ['Prototype', 'Prove the sensing and control on real equipment.'], ['Validate', 'Calibrate with domain engineers; test before trusting.'], ['Integrate', 'Connect to your systems and secure the data path.'], ['Operate', 'Monitor, support and improve in production.']],
    listTitle: 'What we engineer',
    list: ['Sensor integration: level, weight, vibration, temperature, humidity, pressure, particle, air and water quality, optical and pulse sensing', 'Controllers & firmware: low-power embedded controllers, ESP32 and Arduino-class boards, signal processing, local control logic', 'Wireless & telemetry: Bluetooth LE, Wi-Fi, GSM, LoRaWAN, NB-IoT and LTE-M, with RFID, NFC and beacon identification', 'Gateways & edge logic: thresholds and rules close to the equipment', 'Backends & dashboards: secure APIs, web and mobile dashboards, alerting, audit logs, reporting', 'Analytics & ML: pattern analysis and deviation detection, validated with domain engineers'],
    note: 'Examples on this site are engineering reference material shown to illustrate capability. They are labelled as designed systems, proposed solutions or capability examples, and are not presented as completed Siddhrans projects.',
    cta: 'Have a machine, process or site you want to instrument?',
  },
  {
    slug: 'managed-technology-services', n: '08', title: 'Managed Technology Services', short: 'Managed Technology Services',
    intro: 'An extended engineering team, not a ticket queue. The team that built the system is the team best placed to run it.',
    status: 'capability', photo: 'datacentre-aisle', ill: 'loop', photoPos: '30% 50%', tileBlurb: 'Run, support, improve.',
    stepsTitle: 'Plan, build, run, support, improve',
    steps: [['Plan', 'Define the outcome and the architecture.'], ['Build', 'Engineer and integrate.'], ['Run', 'Administer production day to day.'], ['Support', 'Application, database and incident support.'], ['Improve', 'Continuous improvement feeds the next plan.']],
    listTitle: 'What we take responsibility for',
    list: ['Infrastructure & server administration', 'Application & database support', 'Software upgrades & enhancement', 'Security remediation', 'Monitoring & backup oversight', 'Incident support', 'Automation of routine operations', 'Performance optimisation', 'Technology consulting', 'Continuous improvement'],
    note: 'The engagement model is shaped per client, from defined support windows to a standing engineering arrangement.',
    cta: 'Talk to us about the support model that suits you.',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export type { IllKind };
