// Service pages. Source: company profile PDF (p5-p16) and, for embedded/IoT, the engineering deck.
// Status labels follow the profile: software = delivered; data = evidenced in delivered work;
// AI, RPA, security, cloud, managed = engineering capability; embedded = engineering solutions.
import type { PhotoName } from './images';
import type { IllKind } from './usecases';

export type ServiceStatus = 'built' | 'capability' | 'evidenced' | 'solutions' | 'scoped';
export const serviceStatusLabel: Record<ServiceStatus, string> = {
  built: 'Systems built',
  capability: 'Engineering capability',
  evidenced: 'Evidenced in built systems',
  solutions: 'Engineering solutions',
  scoped: 'Scoped per engagement',
};

export type Pillar = 'ai' | 'software' | 'embedded' | 'foundations';
export const pillarMeta: Record<Pillar, { n: string; label: string; short: string; blurb: string }> = {
  ai: { n: '01', label: 'AI & Intelligent Automation', short: 'AI & Automation', blurb: 'Agents, copilots, document intelligence, predictive models and intelligent workflow, connected to your data and your people.' },
  software: { n: '02', label: 'Software & Digital Engineering', short: 'Software', blurb: 'Enterprise software and digital applications built since 2016, and the data and integration beneath them.' },
  embedded: { n: '03', label: 'Embedded & Intelligent Electronics', short: 'Embedded', blurb: 'Industrial IoT, edge AI, firmware, PCB and product development, with VLSI design support scoped per engagement.' },
  foundations: { n: '04', label: 'Foundations: cloud, security & managed services', short: 'Cloud & Security', blurb: 'The cloud, cybersecurity and managed operations that every pillar depends on.' },
};
export const pillarOrder: Pillar[] = ['ai', 'software', 'embedded', 'foundations'];

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
  track: 'electronics' | 'software';
  pillar: Pillar;
  art?: 'vlsi';
  note?: string;
  cta: string;
}

export const services: Service[] = [
  {
    slug: 'pcb-hardware-engineering', track: 'electronics', n: '08', pillar: 'embedded', title: 'PCB Design & Hardware Engineering', short: 'PCB & Hardware',
    intro: 'A product is only as dependable as the board under it. We design the circuits and printed circuit boards that carry sensors, controllers and connectivity, with build, test and firmware bring-up in mind from the first schematic.',
    status: 'solutions', photo: 'hw-pcb-inspection', photoPos: '50% 60%', tileBlurb: 'Schematics, PCB layout, power and board bring-up.',
    stepsTitle: 'From requirement to a board that works',
    steps: [['Requirements', 'Interfaces, power budget, environment, form factor and cost target.'], ['Schematic', 'Circuit capture and component selection.'], ['PCB layout', 'Placement, routing, stack-up and design-for-manufacture checks.'], ['Assembly support', 'Fabrication files, bill of materials and prototype build.'], ['Bring-up', 'Power-up, debug and test of the first boards.']],
    listTitle: 'What we engineer',
    list: ['Hardware architecture: sensing chain, controller, power, interfaces, form factor', 'Schematic design and component selection', 'Sensor, microcontroller and wireless-module boards', 'Power supply, battery and low-power design', 'PCB layout with design-for-manufacture and design-for-test in mind', 'Prototype assembly support and board bring-up', 'Debug headers, test points and production-test planning'],
    note: 'Status: engineering solutions. Board designs shown on this site are reference examples. This page describes design and engineering services; it does not claim a manufacturing facility, certifications or production volumes.',
    cta: 'Have a board to design, revise or bring up?',
  },
  {
    slug: 'embedded-firmware-microcontrollers', track: 'electronics', n: '07', pillar: 'embedded', title: 'Embedded Firmware & Microcontrollers', short: 'Embedded Firmware',
    intro: 'Firmware is where hardware becomes behaviour. We write the code that reads sensors, controls actuators and talks to the network on low-power microcontrollers, and we test it on the real board.',
    status: 'solutions', photo: 'hw-bench-soldering', photoPos: '40% 50%', tileBlurb: 'Microcontroller firmware, drivers, signal processing, wireless.',
    stepsTitle: 'From first blink to field-ready firmware',
    steps: [['Bring-up', 'Clocks, power, peripherals and a first sign of life.'], ['Drivers', 'Sensors, displays, storage and communication interfaces.'], ['Application', 'Signal processing, control logic and state handling.'], ['Connectivity', 'Wireless links and a secure path to the backend.'], ['Test', 'Bench and field testing against the specification.']],
    listTitle: 'What we engineer',
    list: ['Firmware for low-power microcontrollers, including ESP32 and Arduino-class boards', 'Sensor drivers and signal processing', 'Local control logic and thresholds close to the machine', 'Wireless: Bluetooth LE, Wi-Fi, GSM, LoRaWAN, NB-IoT and LTE-M', 'Power management for battery-operated devices', 'Data logging and device-to-backend communication', 'Debugging and test on the real board'],
    note: 'Status: engineering solutions. Firmware examples on this site are reference material, not a list of shipped products.',
    cta: 'Tell us about the device your firmware needs to run on.',
  },
  {
    slug: 'vlsi-semiconductor-design', track: 'electronics', n: '10', pillar: 'embedded', title: 'VLSI & Semiconductor Design Support', short: 'VLSI & Semiconductor', art: 'vlsi',
    intro: 'Digital design and verification support for teams building FPGA- and chip-based products. This page describes the scope we engage on, not a track record: it claims no fabricated silicon.',
    status: 'scoped', photo: 'hw-solder-board', photoPos: '50% 45%', tileBlurb: 'RTL, verification, FPGA prototyping and board-level integration.',
    stepsTitle: 'From specification to a validated digital design',
    steps: [['Specification', 'Functions, interfaces, performance and constraints.'], ['Architecture & RTL', 'Block design and RTL coding.'], ['Verification', 'Test benches and simulation against the specification.'], ['FPGA prototype', 'Run the design on an FPGA board and measure it.'], ['Integration', 'Board-level integration and firmware bring-up.']],
    listTitle: 'Scope of engagement',
    list: ['RTL design and functional-verification support (Verilog / SystemVerilog)', 'Test benches and simulation-based verification', 'FPGA prototyping and hardware validation of digital designs', 'Firmware and software bring-up on FPGA and SoC targets', 'Board-level integration of programmable and custom devices', 'Design documentation and review'],
    note: 'Status: scoped per engagement. Siddhrans does not claim chip fabrication, silicon tape-outs, completed ASICs, foundry partnerships or a manufacturing facility. Scope, tools and team are confirmed in the proposal for each engagement.',
    cta: 'Describe the design you need help with.',
  },
  {
    slug: 'electronic-product-development', track: 'electronics', n: '09', pillar: 'embedded', title: 'Electronic Product Design, Prototyping & Validation', short: 'Product Development',
    intro: 'We take an electronic product from concept to a validated prototype: hardware, firmware and the application around it, designed together so that nothing is thrown over a wall.',
    status: 'solutions', photo: 'ai-wearable-pulse', photoPos: '55% 50%', tileBlurb: 'Concept to validated prototype, hardware and firmware together.',
    stepsTitle: 'The product development lifecycle',
    steps: [['Concept', 'Outcome, environment and constraints.'], ['Architecture', 'Sensing, controller, power and connectivity.'], ['Schematic & PCB', 'Circuit and board design.'], ['Firmware', 'Code that runs on the board.'], ['Prototype', 'Assemble and prove on real equipment.'], ['Validate', 'Test, calibrate and iterate.']],
    listTitle: 'What we engineer',
    list: ['Concept and feasibility for sensing and control products', 'Hardware and firmware co-design', 'Working prototypes for field trials', 'Bench validation and calibration with domain engineers', 'Test planning and documentation', 'Companion mobile, web and cloud applications', 'Hand-over of design files and documentation'],
    note: 'Status: engineering solutions. The wearable and medical-electronics images on this site are AI-generated concept visuals, not photographs of delivered products.',
    cta: 'Have a product idea that needs a working prototype?',
  },
  {
    slug: 'edge-ai-intelligent-electronics', track: 'electronics', n: '06', pillar: 'embedded', title: 'Edge AI & Intelligent Electronics', short: 'Edge AI',
    intro: 'Put the intelligence where the signal is. We apply pattern analysis, machine learning and computer vision close to sensors, cameras and machines, validated with the engineers who know the process.',
    status: 'capability', photo: 'ai-vision-capsules', tileBlurb: 'Vision, anomaly detection and ML close to the machine.',
    stepsTitle: 'How edge intelligence is put together',
    steps: [['Signal', 'Sensors and cameras produce the raw data.'], ['Features', 'Filter and extract what matters on the device or gateway.'], ['Model', 'Rules or machine-learning models, trained on real data.'], ['Decision', 'Local action, alert or hand-off to the backend.'], ['Oversight', 'People review exceptions and validate results.']],
    listTitle: 'What we engineer',
    list: ['Signal-pattern analysis and deviation detection on sensor data', 'Machine-health and anomaly detection from vibration and current', 'Computer-vision inspection and counting at the line', 'Object detection and classification from camera feeds', 'Model selection and validation with domain engineers', 'Edge-to-backend data paths with human oversight'],
    note: 'Status: engineering capability. Edge AI examples on this site carry their own project status; images may be representative, and no deployment results or figures from source material are republished.',
    cta: 'Tell us which signal or camera feed you want to understand.',
  },
  {
    slug: 'enterprise-software-engineering', track: 'software', n: '03', pillar: 'software', title: 'Enterprise Software Engineering', short: 'Enterprise Software',
    intro: 'Every organisation runs on processes its software was never built for. We build the systems that fit the work: applications, portals, workflow and operational systems, engineered, database-backed and in production use.',
    status: 'built', photo: 'dev-team', tileBlurb: 'Portals, mobile, LMS, billing, workflow.',
    stepsTitle: 'From business problem to production system',
    steps: [['Discover', 'Understand the process and the people who run it.'], ['Design', 'Model the data, workflow and integrations.'], ['Build', 'Engineer the application, database and reporting.'], ['Operate', 'Support, upgrade and enhance what we build.']],
    listTitle: 'What we engineer',
    list: ['Enterprise applications & business portals', 'Web & mobile engineering', 'Workflow & approval systems', 'Training & examination platforms', 'Billing, POS & operational systems', 'Database applications & reporting', 'API & systems integration', 'Legacy application modernisation'],
    note: 'Backed by fifteen named systems built since 2016, from Siddhrans LMS and the Talent platforms to GST Billing, POS and sector systems.',
    cta: 'Tell us about the system you need.',
  },
  {
    slug: 'ai-ml-intelligent-automation', track: 'software', n: '01', pillar: 'ai', title: 'AI, ML & Intelligent Automation', short: 'AI, ML & Intelligent Automation',
    intro: 'AI earns its place when it is wired into data, process and oversight. That integration, not the model, is the engineering problem. We build AI into real workflows, with people in the loop.',
    status: 'capability', photo: 'data-wall', tileBlurb: 'Copilots, document intelligence, analytics.',
    stepsTitle: 'How applied AI is put together',
    steps: [['Data & documents', 'Enterprise sources feed the system.'], ['Retrieval & models', 'Knowledge retrieval plus machine learning.'], ['Agents & copilots', 'Task execution for multi-step work.'], ['Workflow action', 'Results flow into systems and approvals.'], ['Human oversight', 'Exceptions and control stay with people.']],
    listTitle: 'What we engineer with AI',
    list: ['Generative AI applications for business tasks', 'AI assistants & role-specific copilots', 'Multi-agent solutions for multi-step work', 'Intelligent document processing', 'Natural-language interfaces to systems', 'Enterprise knowledge retrieval', 'Predictive analytics & decision support', 'AI-enabled workflow, with people in the loop'],
    note: 'Status: engineering capability, designed, prototyped and applied on engagement on top of our delivered software and automation platforms. We do not claim production AI deployments we cannot evidence.',
    cta: 'Discuss where AI could earn its place in your workflow.',
  },
  {
    slug: 'rpa-business-automation', track: 'software', n: '02', pillar: 'ai', title: 'RPA & Business Automation', short: 'RPA & Business Automation',
    intro: 'Automate the work that should not require human repetition. RPA here is not "bots"; it is the discipline of turning a process into a controlled system.',
    status: 'capability', photo: 'automation-line', ill: 'flow', tileBlurb: 'Workflow, approvals, system-to-system flows.',
    stepsTitle: 'Turning a process into a controlled system',
    steps: [['Process', 'Map the work as it actually happens.'], ['Rules', 'Write down the decisions the work depends on.'], ['Workflow', 'Sequence steps, owners and approvals.'], ['Integration', 'Connect the systems the work passes through.'], ['Automation', 'Let the system carry the repetition.'], ['Exception', 'People handle only what needs judgement.']],
    listTitle: 'Where it applies',
    list: ['Approval & document workflows', 'Data movement between systems', 'API-driven & integration automation', 'Business-rule & repetitive-process automation', 'Operational & back-office automation', 'System-to-system handoffs'],
    note: 'Status: engineering capability, built on our delivered workflow, billing and operational systems.',
    cta: 'Tell us which process is costing you the most time.',
  },
  {
    slug: 'cybersecurity', track: 'software', n: '11', pillar: 'foundations', title: 'Cybersecurity & Secure Engineering', short: 'Cybersecurity',
    intro: 'Security as an engineering discipline. We treat protection as layers of concrete controls, not a product badge, and it decides whether the other disciplines can be trusted.',
    status: 'capability', photo: 'access-reader', tileBlurb: 'Assess, harden, monitor, remediate.',
    stepsTitle: 'Defence in layers',
    steps: [['Identity & access', 'Authentication, access controls, secure access.'], ['Endpoint & OS', 'Server and OS hardening, patch and vulnerability management.'], ['Network', 'Firewall and security configuration, network isolation.'], ['Application', 'Secure engineering, controlled environments.'], ['Data', 'Secure databases, backup, access discipline.'], ['Monitoring', 'Logging, monitoring, audit trails.'], ['Recovery', 'Disaster recovery, security remediation.']],
    listTitle: 'Scope',
    list: ['Security assessment', 'Hardening and configuration', 'Monitoring and logging', 'Vulnerability and patch management', 'Access control and secure access', 'Remediation and recovery'],
    note: 'Our scope is assessment, hardening, configuration, monitoring and remediation. We make no claims of a security operations centre or accreditation.',
    cta: 'Ask us to review your security posture.',
  },
  {
    slug: 'cloud-infrastructure', track: 'software', n: '12', pillar: 'foundations', title: 'Cloud, Server & Infrastructure', short: 'Cloud & Infrastructure',
    intro: 'The layer everything else depends on: administered, modernised and watched, not just installed. We design, migrate and operate on-premise and cloud infrastructure.',
    status: 'capability', photo: 'fibre-patch', tileBlurb: 'Servers, migration, backup, availability.',
    stepsTitle: 'From assessment to optimisation',
    steps: [['Assess', 'Inventory servers, OS versions, risks.'], ['Architect', 'Design the target state, on-premise or cloud.'], ['Migrate', 'Move systems, data and services safely.'], ['Secure', 'Harden, patch and control access.'], ['Operate', 'Administer production day to day.'], ['Monitor', 'Watch health, backups and capacity.'], ['Optimise', 'Improve performance and cost.']],
    listTitle: 'Administration & engineering',
    list: ['Windows & Linux server administration', 'Server & OS upgrades, infrastructure migration', 'Cloud migration & configuration', 'Database administration', 'Backup / restore & disaster recovery', 'High availability & performance optimisation', 'Monitoring & production administration', 'Infrastructure automation'],
    cta: 'Tell us about the infrastructure you need to modernise.',
  },
  {
    slug: 'data-analytics-integration', track: 'software', n: '04', pillar: 'software', title: 'Data, Analytics & Integration', short: 'Data, Analytics & Integration',
    intro: 'From systems of record to decisions. Data work starts where our software already lives: billing, inventory, training and operational records.',
    status: 'evidenced', photo: 'analyst-dashboards', ill: 'chart', tileBlurb: 'APIs, dashboards, reporting.',
    stepsTitle: 'From records to action',
    steps: [['Systems', 'Billing, POS, LMS, inventory and talent platforms create the records.'], ['Data', 'Extraction, cleaning and transformation into usable structures.'], ['Integration', 'APIs and system-to-system flows that remove re-keying.'], ['Intelligence', 'Dashboards, analytics and reporting over live operations.'], ['Action', 'Decisions, alerts and automated follow-through.']],
    listTitle: 'Capability',
    list: ['Data engineering & transformation', 'API & systems integration', 'Operational dashboards & business analytics'],
    groupsTitle: 'Evidenced in our delivered work',
    groups: [{ title: 'Database-backed operational systems', text: 'Transactional systems with structured records.' }, { title: 'GST-compliant billing & records', text: 'Billing and records engineered for Indian tax requirements.' }, { title: 'Result processing & reporting in the LMS', text: 'Assessment results and learner reporting.' }],
    cta: 'Tell us which data you want to turn into decisions.',
  },
  {
    slug: 'embedded-systems-industrial-iot', track: 'electronics', n: '05', pillar: 'embedded', title: 'Industrial IoT & Connected Devices', short: 'Industrial IoT',
    intro: 'We engineer the whole chain between a physical signal and a decision: sensors, embedded controllers, connectivity, secure backends, dashboards and alerts, for machines, buildings, utilities and logistics.',
    status: 'solutions', photo: 'ai-iot-chiller', tileBlurb: 'Sensing, controllers, connectivity, dashboards and alerts.',
    stepsTitle: 'Engineering gates, not guesses',
    steps: [['Define', 'Measurable outcome, environment and constraints.'], ['Prototype', 'Prove the sensing and control on real equipment.'], ['Validate', 'Calibrate with domain engineers; test before trusting.'], ['Integrate', 'Connect to your systems and secure the data path.'], ['Operate', 'Monitor, support and improve in production.']],
    listTitle: 'What we engineer',
    list: ['Sensor integration: level, weight, vibration, temperature, humidity, pressure, particle, air and water quality, optical and pulse sensing', 'Controllers & firmware: low-power embedded controllers, ESP32 and Arduino-class boards, signal processing, local control logic', 'Wireless & telemetry: Bluetooth LE, Wi-Fi, GSM, LoRaWAN, NB-IoT and LTE-M, with RFID, NFC and beacon identification', 'Gateways & edge logic: thresholds and rules close to the equipment', 'Backends & dashboards: secure APIs, web and mobile dashboards, alerting, audit logs, reporting', 'Analytics & ML: pattern analysis and deviation detection, validated with domain engineers'],
    note: 'Examples on this site are engineering reference material shown to illustrate capability. They are labelled as designed systems, proposed solutions or capability examples, and are not presented as completed Siddhrans projects.',
    cta: 'Have a machine, process or site you want to instrument?',
  },
  {
    slug: 'managed-technology-services', track: 'software', n: '13', pillar: 'foundations', title: 'Managed Technology Services', short: 'Managed Technology Services',
    intro: 'An extended engineering team, not a ticket queue. The team that built the system is the team best placed to run it.',
    status: 'capability', photo: 'dev-pair', ill: 'loop', tileBlurb: 'Run, support, improve.',
    stepsTitle: 'Plan, build, run, support, improve',
    steps: [['Plan', 'Define the outcome and the architecture.'], ['Build', 'Engineer and integrate.'], ['Run', 'Administer production day to day.'], ['Support', 'Application, database and incident support.'], ['Improve', 'Continuous improvement feeds the next plan.']],
    listTitle: 'What we take responsibility for',
    list: ['Infrastructure & server administration', 'Application & database support', 'Software upgrades & enhancement', 'Security remediation', 'Monitoring & backup oversight', 'Incident support', 'Automation of routine operations', 'Performance optimisation', 'Technology consulting', 'Continuous improvement'],
    note: 'The engagement model is shaped per client, from defined support windows to a standing engineering arrangement.',
    cta: 'Talk to us about the support model that suits you.',
  },
];

services.sort((a, b) => a.n.localeCompare(b.n));
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export type { IllKind };
