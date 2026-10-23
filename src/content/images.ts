// Licensed stock photographs (Pexels licence). See docs/IMAGE_REGISTER.md for source and checks.
// Never present these as Siddhrans project photographs.
export type PhotoName =
  | 'factory-corridor' | 'pharma-line' | 'water-treatment' | 'solder-bench' | 'solder-board' | 'fibre-patch'
  | 'substation' | 'solar-farm' | 'vitals-monitor' | 'analyst-dashboards' | 'biometric-scan' | 'automation-line'
  | 'lecture-hall' | 'virtual-lesson' | 'exam-omr' | 'tablet-study' | 'interview-panel' | 'handshake'
  | 'interview-clipboard' | 'film-set' | 'film-crew' | 'sports-training' | 'dev-team' | 'dev-pair' | 'data-wall'
  | 'access-reader' | 'warehouse-scan' | 'pcb-microscope';

// [width, height] of each optimised source (only the ratio matters).
export const photoDims: Record<PhotoName, [number, number]> = {
  'factory-corridor': [3, 2], 'pharma-line': [3, 2], 'water-treatment': [2400, 1348], 'solder-bench': [3, 2],
  'solder-board': [3, 1], 'fibre-patch': [3, 2], substation: [3, 2], 'solar-farm': [3, 2], 'vitals-monitor': [2400, 4270],
  'analyst-dashboards': [2400, 1602], 'biometric-scan': [2400, 1602], 'automation-line': [4, 3], 'lecture-hall': [3, 2],
  'virtual-lesson': [3, 2], 'exam-omr': [4, 3], 'tablet-study': [3, 2], 'interview-panel': [3, 2], handshake: [3, 2],
  'interview-clipboard': [3, 2], 'film-set': [3, 2], 'film-crew': [3, 2], 'sports-training': [1967, 1392],
  'dev-team': [3, 2], 'dev-pair': [2400, 1602], 'data-wall': [3, 2], 'access-reader': [3, 2], 'warehouse-scan': [3, 2],
  'pcb-microscope': [2268, 4032],
};

export const photoAlt: Record<PhotoName, string> = {
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

export const photoCaption: Record<PhotoName, string> = {
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
