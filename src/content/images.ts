// Licensed stock photographs (Pexels licence). See docs/IMAGE_REGISTER.md for source and checks.
// Never present these as Siddhrans project photographs.
export type PhotoName =
  | 'hero-robotics' | 'factory-corridor' | 'pharma-line' | 'water-treatment' | 'solder-bench' | 'solder-board'
  | 'code-screen' | 'ai-network' | 'datacentre-aisle' | 'fibre-patch' | 'substation' | 'solar-farm'
  | 'vitals-monitor' | 'lab-porthole';

// [width, height] ratio of each source (hero and a few others store real pixel sizes).
export const photoDims: Record<PhotoName, [number, number]> = {
  'hero-robotics': [2400, 1347], 'factory-corridor': [3, 2], 'pharma-line': [3, 2], 'water-treatment': [2400, 1348],
  'solder-bench': [3, 2], 'solder-board': [3, 1], 'code-screen': [3, 2], 'ai-network': [2, 3],
  'datacentre-aisle': [3, 2], 'fibre-patch': [3, 2], substation: [3, 2], 'solar-farm': [3, 2],
  'vitals-monitor': [2400, 4270], 'lab-porthole': [3, 2],
};

export const photoAlt: Record<PhotoName, string> = {
  'hero-robotics': 'A robotic arm placing a sample tray inside a blue-lit automation cell',
  'factory-corridor': 'Factory walkway with yellow safety markings and conveyors',
  'pharma-line': 'Pharmaceutical ampoule filling line with a glowing seal flame',
  'water-treatment': 'Aerial view of a circular water treatment tank',
  'solder-bench': 'Engineer soldering a circuit board under a work lamp',
  'solder-board': 'Soldering iron touching a green circuit board',
  'code-screen': 'Source code on a dark monitor',
  'ai-network': 'Abstract glowing network of connected points',
  'datacentre-aisle': 'Aisle of server cabinets in a data centre',
  'fibre-patch': 'Teal fibre-optic patch cables in a network panel',
  substation: 'Electrical substation with transmission lines',
  'solar-farm': 'Aerial view of a large solar farm',
  'vitals-monitor': 'Patient vitals monitor in a hospital',
  'lab-porthole': 'A technician in a laboratory seen through a round porthole window',
};

export const photoCaption: Record<PhotoName, string> = {
  'hero-robotics': 'Robotic laboratory automation',
  'factory-corridor': 'Factory interior',
  'pharma-line': 'Pharmaceutical production',
  'water-treatment': 'Water treatment plant',
  'solder-bench': 'Electronics bench',
  'solder-board': 'Circuit-board assembly',
  'code-screen': 'Source code',
  'ai-network': 'Abstract network',
  'datacentre-aisle': 'Data-centre aisle',
  'fibre-patch': 'Network cabling',
  substation: 'Electrical substation',
  'solar-farm': 'Solar farm',
  'vitals-monitor': 'Patient monitor',
  'lab-porthole': 'Laboratory',
};
