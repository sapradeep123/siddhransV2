// Engineering use cases: reference material, NOT a list of completed Siddhrans projects.
// Source: supplied engineering deck (slides 3-22, derived from historical Bheeshmaa documents).
// Unverified figures (40%, 97%, 15-20%, ROI, "sold to a US company", compliance claims) are intentionally omitted.
// Public labels are limited to three: nothing here may read as a delivered Siddhrans project.
import type { PhotoName } from './images';

export type UseCaseStatus = 'designed' | 'proposed' | 'capability';
export const statusLabel: Record<UseCaseStatus, string> = {
  designed: 'Designed system',
  proposed: 'Proposed solution',
  capability: 'Capability example',
};
export const statusHelp: Record<UseCaseStatus, string> = {
  designed: 'A solution that has been designed; production-scale validation is not claimed.',
  proposed: 'A planned architecture or pilot. No completed rollout is implied.',
  capability: 'An illustration of what we can engineer, not a statement of completed delivery.',
};

export type Domain = 'industrial' | 'medical' | 'utilities' | 'logistics' | 'safety' | 'ai' | 'aerospace';
export const domainLabel: Record<Domain, string> = {
  industrial: 'Industrial & manufacturing',
  medical: 'Medical & healthcare',
  utilities: 'Utilities, energy & buildings',
  logistics: 'Logistics & cold chain',
  safety: 'Safety & environment',
  ai: 'AI, vision & data',
  aerospace: 'Aerospace R&D',
};

export type IllKind = 'hvac' | 'drone' | 'vision' | 'logistics' | 'safety' | 'sensor';
export type Media = { photo: PhotoName; pos?: string; fit?: 'contain' } | { ill: IllKind };

export interface UseCase {
  title: string;
  domain: Domain;
  status: UseCaseStatus;
  outcome: string;
  flow: string[];
  media: Media;
  /** AI and software applications are listed first, then AI meets machines (embedded, IoT and electronics). */
  track: 'electronics' | 'software';
}

export const useCases: UseCase[] = [
  { title: 'Vehicle detection & classification', domain: 'ai', status: 'capability', outcome: 'Extract vehicle categories from roadway video and reduce manual report preparation.', flow: ['Object detection', 'annotation', 'number-plate reading', 'tracked vehicle output'], media: { photo: 'ref-vehicle-detection', fit: 'contain' }, track: 'software' },
  { title: 'Product-label inspection', domain: 'ai', status: 'capability', outcome: 'Verify price-tag names and sizes against packaging, reducing manual comparison.', flow: ['Image acquisition', 'computer vision / KNN model', 'feature extraction', 'automated matching'], media: { photo: 'ref-label-mismatch', fit: 'contain' }, track: 'software' },
  { title: 'AI product-data enrichment', domain: 'ai', status: 'capability', outcome: 'Improve analytics quality by filling brand and attribute gaps in product records.', flow: ['Product text', 'brand identification', 'attribute prediction', 'structured datasets'], media: { photo: 'analyst-dashboards' }, track: 'software' },
  { title: 'NLP sentiment intelligence', domain: 'ai', status: 'capability', outcome: 'Extract positive, negative and neutral signals from customer and media text.', flow: ['Text feeds', 'NLP classification', 'sentiment trends dashboard'], media: { photo: 'data-wall' }, track: 'software' },
  { title: 'NLP data-leak prevention', domain: 'ai', status: 'capability', outcome: 'Flag potentially sensitive information and suspicious messages before misuse.', flow: ['Text / email analysis', 'detection rules / NLP', 'alerting and analyst review'], media: { photo: 'fibre-patch' }, track: 'software' },
  { title: 'Wearable PPG health sensor', domain: 'medical', status: 'capability', outcome: 'Non-invasive optical sensing to support convenient physiological monitoring.', flow: ['LED photoplethysmography', 'signal processing', 'vital estimates'], media: { photo: 'ai-wearable-pulse', pos: '55% 50%' }, track: 'electronics' },
  { title: 'Handheld Bluetooth ECG', domain: 'medical', status: 'capability', outcome: 'Portable ECG readings delivered to a phone or tablet, removing the need for a dedicated display or printer.', flow: ['Palm-sized ECG hardware', 'Bluetooth', 'mobile display'], media: { photo: 'ai-ecg-handheld' }, track: 'electronics' },
  { title: 'Vibration & machine-health monitoring', domain: 'industrial', status: 'designed', outcome: 'Detect abnormal motor load and idle periods earlier and guide maintenance.', flow: ['Vibration sensors', 'signal pattern analysis', 'idle / overload classification', 'operator alerts'], media: { photo: 'ref-motor-vibration-board', fit: 'contain' }, track: 'electronics' },
  { title: 'Contactless powder mixing', domain: 'industrial', status: 'capability', outcome: 'Reduce intrusive contact during powder proportioning and mixing; improve repeatability.', flow: ['Contactless level / weight sensing', 'ratio logic', 'mixing control', 'downstream process'], media: { photo: 'ai-powder-mixing' }, track: 'electronics' },
  { title: 'Smart-factory quality intelligence', domain: 'industrial', status: 'designed', outcome: 'Identify deviations before they affect batch quality or process yield.', flow: ['Temperature / humidity / pressure / particle sensors', 'deviation analytics', 'alerts'], media: { photo: 'ai-vision-capsules' }, track: 'electronics' },
  { title: 'Gas-meter digitisation retrofit', domain: 'utilities', status: 'proposed', outcome: 'Digital readings from installed diaphragm meters without replacing the meters.', flow: ['Pulse / optical reader', 'low-power controller', 'NB-IoT / LTE-M', 'backend'], media: { photo: 'ref-gas-meter-phone', pos: '38% 50%' }, track: 'electronics' },
  { title: 'Medical-kit & asset readiness', domain: 'medical', status: 'proposed', outcome: 'Find missing or misplaced emergency assets and support audit-ready readiness checks.', flow: ['BLE + RFID / NFC tags', 'portable scanner', 'secure API', 'dashboards, alerts, audit log'], media: { photo: 'gpt-medical-kit' }, track: 'electronics' },
  { title: 'IoT HVAC energy management', domain: 'utilities', status: 'proposed', outcome: 'Control energy use while maintaining thermal comfort and operational visibility.', flow: ['Temperature / humidity / air-quality sensors', 'control board', 'EMS optimisation', 'dashboards'], media: { photo: 'ai-iot-chiller' }, track: 'electronics' },
  { title: 'Theatre air-cooler optimisation', domain: 'utilities', status: 'proposed', outcome: 'Reduce cooler electricity and water use while monitoring comfort across auditorium zones.', flow: ['ESP32 / Arduino + gateway', 'power, temperature, humidity, airflow sensors', 'blower / pump control'], media: { photo: 'ref-esp32-breadboard', fit: 'contain' }, track: 'electronics' },
  { title: 'Adaptive drone endurance', domain: 'aerospace', status: 'proposed', outcome: 'Pursue longer flight time without adding battery mass.', flow: ['Onboard environmental data', 'embedded ML / control strategy', 'motor and power optimisation'], media: { photo: 'ai-drone-endurance' }, track: 'electronics' },
  { title: 'Water-quality monitoring', domain: 'safety', status: 'capability', outcome: 'Trend water quality and alert operators to potential contamination events.', flow: ['TDS / pH / turbidity / temperature sensors', 'Wi-Fi / GSM / LoRaWAN', 'dashboards'], media: { photo: 'ref-water-sensor-boat' }, track: 'electronics' },
  { title: 'Secure laboratory access & occupancy', domain: 'industrial', status: 'capability', outcome: 'Prevent unauthorised entry; give zone-occupancy visibility and digital audit trails.', flow: ['Palm-vein + RFID identity', 'beacon tracking', 'role checks', 'occupancy rules', 'access log'], media: { photo: 'ai-cleanroom-access' }, track: 'electronics' },
  { title: 'Cold-chain condition monitoring', domain: 'logistics', status: 'capability', outcome: 'Track storage temperatures and support traceable exception records.', flow: ['Temperature sensing', 'connected logging', 'threshold alert', 'audit reporting'], media: { photo: 'ai-coldchain-truck' }, track: 'electronics' },
  { title: 'Smart warehouse & logistics', domain: 'logistics', status: 'capability', outcome: 'Improve stock visibility and movement tracking across sites.', flow: ['IoT tags / sensors', 'inventory signals', 'central events', 'dashboards'], media: { photo: 'ai-iot-warehouse' }, track: 'electronics' },
  { title: 'Industrial safety & environmental alerts', domain: 'safety', status: 'capability', outcome: 'Alert workers to monitored hazards and emergency events.', flow: ['Motion / door / air-quality inputs', 'edge gateways', 'thresholds', 'notifications and evidence log'], media: { photo: 'ref-safety-sos', pos: '52% 50%' }, track: 'electronics' },
];
