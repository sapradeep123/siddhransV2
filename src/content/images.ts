// Licensed stock photographs (Pexels licence) plus processed images supplied by Siddhrans (AI-generated concept visuals
// and reference photographs). See docs/IMAGE_REGISTER.md and docs/IMAGE_INVENTORY.md for source and checks.
// Never present any of these as Siddhrans project photographs.
import { processedMeta } from './images.generated';

export type ProcessedName = keyof typeof processedMeta;
/** Processed images ship AVIF + WebP + JPEG fallback at the widths listed in images.generated.ts. */
export const isProcessed = (n: string): n is ProcessedName => n in processedMeta;

export type StockName =
  | 'factory-corridor' | 'pharma-line' | 'water-treatment' | 'solder-bench' | 'solder-board' | 'fibre-patch'
  | 'substation' | 'solar-farm' | 'vitals-monitor' | 'analyst-dashboards' | 'biometric-scan' | 'automation-line'
  | 'lecture-hall' | 'virtual-lesson' | 'exam-omr' | 'tablet-study' | 'interview-panel' | 'handshake'
  | 'interview-clipboard' | 'film-set' | 'film-crew' | 'sports-training' | 'dev-team' | 'dev-pair' | 'data-wall'
  | 'access-reader' | 'warehouse-scan' | 'pcb-microscope';
export type PhotoName = StockName | ProcessedName;

// [width, height] of each optimised source (only the ratio matters).
const stockDims: Record<StockName, [number, number]> = {
  'factory-corridor': [3, 2], 'pharma-line': [3, 2], 'water-treatment': [2400, 1348], 'solder-bench': [3, 2],
  'solder-board': [3, 1], 'fibre-patch': [3, 2], substation: [3, 2], 'solar-farm': [3, 2], 'vitals-monitor': [2400, 4270],
  'analyst-dashboards': [2400, 1602], 'biometric-scan': [2400, 1602], 'automation-line': [4, 3], 'lecture-hall': [3, 2],
  'virtual-lesson': [3, 2], 'exam-omr': [4, 3], 'tablet-study': [3, 2], 'interview-panel': [3, 2], handshake: [3, 2],
  'interview-clipboard': [3, 2], 'film-set': [3, 2], 'film-crew': [3, 2], 'sports-training': [1967, 1392],
  'dev-team': [3, 2], 'dev-pair': [2400, 1602], 'data-wall': [3, 2], 'access-reader': [3, 2], 'warehouse-scan': [3, 2],
  'pcb-microscope': [2268, 4032],
};

const stockAlt: Record<StockName, string> = {
  'factory-corridor': 'Factory walkway with yellow safety markings and conveyors',
  'pharma-line': 'Pharmaceutical ampoule filling line with a glowing seal flame',
  'water-treatment': 'Aerial view of a circular water treatment tank',
  'solder-bench': 'Engineer soldering a circuit board under a work lamp',
  'solder-board': 'Soldering iron touching a green circuit board',
  'fibre-patch': 'Teal fibre-optic patch cables in a network panel',
  substation: 'Electrical substation with transmission lines',
  'solar-farm': 'Aerial view of a large solar farm',
  'vitals-monitor': 'Patient vitals monitor in a hospital',
  'analyst-dashboards': 'Analyst working at two monitors showing green data dashboards',
  'biometric-scan': 'Finger pressed on a fingerprint access reader glowing green',
  'automation-line': 'Automated assembly line with pneumatic actuators and a conveyor',
  'lecture-hall': 'University students raising their hands in a lecture hall',
  'virtual-lesson': 'Teacher giving a lesson to a pupil over a video call on a laptop',
  'exam-omr': 'Student marking an answer sheet during an examination',
  'tablet-study': 'Student working on a tablet in class',
  'interview-panel': 'Hiring panel interviewing a candidate, one panellist holding a tablet',
  handshake: 'Candidate shaking hands with a recruiter after an interview',
  'interview-clipboard': 'Interviewer reviewing a candidate profile on a clipboard',
  'film-set': 'Film crew shooting a scene on a studio set lit in red',
  'film-crew': 'Film crew in a café set with a clapperboard and boom microphone',
  'sports-training': 'Footballers in blue training kit on a pitch',
  'dev-team': 'Software team gathered around a monitor reviewing work',
  'dev-pair': 'Two developers reviewing code on a curved monitor',
  'data-wall': 'Analyst holding a tablet in front of a wall display of charts',
  'access-reader': 'Fingerprint and keypad access reader on a glass door',
  'warehouse-scan': 'Warehouse worker scanning stock with a handheld scanner and tablet',
  'pcb-microscope': 'Technician inspecting a circuit board under a microscope',
};

const stockCaption: Record<StockName, string> = {
  'factory-corridor': 'Factory interior', 'pharma-line': 'Pharmaceutical production', 'water-treatment': 'Water treatment plant',
  'solder-bench': 'Electronics bench', 'solder-board': 'Circuit-board assembly', 'fibre-patch': 'Network cabling',
  substation: 'Electrical substation', 'solar-farm': 'Solar farm', 'vitals-monitor': 'Patient monitor',
  'analyst-dashboards': 'Data dashboards', 'biometric-scan': 'Biometric access', 'automation-line': 'Automation line',
  'lecture-hall': 'Lecture hall', 'virtual-lesson': 'Online lesson', 'exam-omr': 'Examination', 'tablet-study': 'Classroom tablet',
  'interview-panel': 'Interview panel', handshake: 'Recruitment', 'interview-clipboard': 'Candidate review',
  'film-set': 'Film set', 'film-crew': 'Film crew', 'sports-training': 'Sports training', 'dev-team': 'Software team',
  'dev-pair': 'Code review', 'data-wall': 'Data wall', 'access-reader': 'Access control', 'warehouse-scan': 'Warehouse operations',
  'pcb-microscope': 'Circuit-board inspection',
};

const processedAlt: Record<ProcessedName, string> = {
  'hw-pcb-inspection': 'Technician inspecting a green circuit board under a stereo microscope at a repair bench',
  'hw-pcb-aoi': 'Close-up of a green printed circuit board with many soldered joints and a soldering iron tip at work',
  'hw-solder-board': 'Hands soldering components onto a green printed circuit board held in a helping-hands clamp',
  'hw-bench-soldering': 'Engineer soldering a small circuit board on a bench lit by a warm work lamp',
  'ref-water-sensor-boat': 'Prototype floating water-quality sensor: electronics in a clear enclosure on a small metal hull with an antenna',
  'ref-water-field-sites': 'Three water-monitoring field sites: a weir with a mast, a floating multi-probe sensor platform on blue drums, and a solar-powered monitoring station',
  'ai-wearable-pulse': 'Concept image of a wrist-worn sensor module with a cabled finger pulse sensor on a hand',
  'ai-ecg-handheld': 'Concept image of a handheld ECG recorder with a small display, lead wires and electrodes beside a tablet showing an ECG trace',
  'ai-iot-chiller': 'Concept image of wireless sensors clamped to chiller pipework with a tablet showing a chiller monitoring dashboard',
  'ai-iot-warehouse': 'Concept image of a warehouse aisle with tagged racking and an overlay of live inventory data',
  'ai-coldchain-truck': 'Concept diagram of a refrigerated truck with a GPS tracker and Bluetooth temperature sensors reporting to a cloud dashboard',
  'ai-cleanroom-access': 'Concept image of a cleanroom entry gate with a face-recognition reader and an occupancy display',
  'ai-vision-capsules': 'Concept image of a camera above a conveyor of capsules with detection boxes and a counting dashboard',
  'ai-powder-mixing': 'Concept image of stainless-steel process vessels with sensor-equipped hoppers and a batch-mixing control screen',
  'ai-drone-endurance': 'Concept image of three small drones above a runway marking with blue beams towards a landing pad',
  'gpt-medical-kit': 'Concept image of an open emergency medical kit with tagged equipment and a handheld tag reader',
  'ref-pump-infographic': 'Infographic of a blue industrial motor-pump set with vibration, temperature, acoustic and pressure sensors feeding an IoT gateway, a cloud service, a laptop dashboard and a phone',
  'ref-pump-installation': 'Two industrial pump and motor sets on a dusty plant floor, each with a gearbox and blue-capped fittings',
  'ref-esp32-breadboard': 'ESP32 breadboard prototype with labelled callouts: ESP32-WROOM-32, SSD1306 OLED display showing current and temperatures, SCT-013 current clamp, two DS18B20 temperature probes and USB power',
  'ref-motor-vibration-board': 'Small electric motor on a base plate with a vibration sensor, an ESP32 board and a display showing a vibration waveform',
  'ref-iot-architecture': 'Signal chain diagram: current clamp and temperature sensors feed an ESP32, which sends state and hours to a cooler dashboard and health alerts to a technician',
  'ref-gas-meter-phone': 'A hand holding a phone that reads an installed gas meter fitted with a wireless transmitter module',
  'ref-gas-meter-standalone': 'Diaphragm gas meter with its index counter, shown on a white background',
  'ref-label-mismatch': 'Machine-vision output comparing a work-order label with the front and back labels of a container, flagging a mismatch',
  'ref-vehicle-detection': 'Object-detection output with boxes around a car, a person and the licence plate',
  'ref-safety-sos': 'Worker-safety SOS icon beside a green warning beacon in a factory',
  'ref-access-watch': 'Stylised illustration of a worker wearing a smartwatch touching a keypad access reader',
};
// Every caption starts "Illustrative image"; the second part says what kind of image it is.
const processedCaption: Record<ProcessedName, string> = {
  'hw-pcb-inspection': 'PCB inspection', 'hw-pcb-aoi': 'Circuit-board close-up', 'hw-solder-board': 'Board assembly', 'hw-bench-soldering': 'Electronics bench',
  'ref-water-sensor-boat': 'Water-quality sensing prototype', 'ref-water-field-sites': 'Water-monitoring field hardware',
  'ai-wearable-pulse': 'AI-generated concept · wearable pulse sensor', 'ai-ecg-handheld': 'AI-generated concept · handheld ECG',
  'ai-iot-chiller': 'AI-generated concept · chiller monitoring', 'ai-iot-warehouse': 'AI-generated concept · warehouse IoT',
  'ai-coldchain-truck': 'AI-generated concept · cold chain', 'ai-cleanroom-access': 'AI-generated concept · cleanroom access',
  'ai-vision-capsules': 'AI-generated concept · vision inspection', 'ai-powder-mixing': 'AI-generated concept · powder mixing',
  'ai-drone-endurance': 'AI-generated concept · drone power', 'gpt-medical-kit': 'AI-generated concept · medical kit',
  'ref-pump-infographic': 'Pump condition-monitoring concept', 'ref-pump-installation': 'Pump installation', 'ref-esp32-breadboard': 'ESP32 sensing prototype',
  'ref-motor-vibration-board': 'Motor vibration-sensing prototype', 'ref-iot-architecture': 'Monitoring architecture', 'ref-gas-meter-phone': 'Gas-meter reading by phone',
  'ref-gas-meter-standalone': 'Gas meter', 'ref-label-mismatch': 'Label-inspection output', 'ref-vehicle-detection': 'Vehicle-detection output',
  'ref-safety-sos': 'Worker-safety alert', 'ref-access-watch': 'Wearable access control',
};

export const photoDims = { ...stockDims, ...Object.fromEntries(Object.entries(processedMeta).map(([k, v]) => [k, [v.w, v.h]])) } as Record<PhotoName, [number, number]>;
export const photoAlt = { ...stockAlt, ...processedAlt } as Record<PhotoName, string>;
export const photoCaption = { ...stockCaption, ...processedCaption } as Record<PhotoName, string>;
