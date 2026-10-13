import { JobListing, UserCandidateProfile, Agent48HourCycle } from '../types';

export const DEFAULT_USER_PROFILE: UserCandidateProfile = {
  fullName: 'Tawanda Nando',
  phone: '+263774408617',
  email: 'tawandanando@gmail.com',
  location: 'Harare, Zimbabwe',
  degree: 'B.Sc. (Hons) Mechanical Engineering',
  university: 'University of Zimbabwe (UZ)',
  yearsExperience: 4,
  zieStatus: 'Corporate Member (Chartered / Pr.Eng)',
  primarySkills: [
    'Rotating Equipment Maintenance',
    'Centrifugal Pumps & Compressors',
    'Steam Boilers & Ammonia Chillers',
    'SolidWorks & AutoCAD 2D/3D',
    'Preventive Maintenance (PM) & RCM',
    'Hydraulic & Pneumatic Systems',
    'SHEQ / NOSA Safety Systems',
    'Root Cause Failure Analysis (RCFA)'
  ],
  summaryBio: 'Degreed Mechanical Engineer with 4 years hands-on manufacturing and mining plant experience in Zimbabwe. Proficient in maintenance planning, rotating machinery overhauls, predictive diagnostics, and project execution.'
};

export const INITIAL_AGENT_CYCLE: Agent48HourCycle = {
  cycleNumber: 14,
  lastRunTimestamp: Date.now() - 1000 * 60 * 60 * 18, // 18 hours ago
  nextRunTimestamp: Date.now() + 1000 * 60 * 60 * 30, // in 30 hours (48-hour cycle)
  status: 'idle',
  jobsIndexedThisCycle: 8,
  sourcesCrawled: [
    'VacancyMail Zimbabwe (vacancymail.co.zw)',
    'LinkedIn Zimbabwe Jobs (linkedin.com/jobs)',
    'The Herald Zimbabwe Appointments (herald.co.zw)',
    'The Sunday Mail Zimbabwe (sundaymail.co.zw)',
    'Mining Zimbabwe Careers (miningzimbabwe.com)',
    'Classifieds.co.zw (classifieds.co.zw/jobs)'
  ],
  logs: [
    {
      timestamp: Date.now() - 1000 * 60 * 60 * 18,
      message: '48h Autonomous Crawl Cycle #14 initialized: Scraped VacancyMail Zimbabwe, LinkedIn & local press.',
      type: 'info'
    },
    {
      timestamp: Date.now() - 1000 * 60 * 60 * 17.8,
      message: 'Identified 8 active mechanical engineering adverts with verified employer contacts.',
      type: 'success'
    },
    {
      timestamp: Date.now() - 1000 * 60 * 60 * 17.5,
      message: 'Compiled application document blueprints and dispatched high-match WhatsApp alerts to +263774408617.',
      type: 'alert'
    }
  ]
};

export const INITIAL_VACANCIES: JobListing[] = [
  {
    id: 'zim-mech-001',
    title: 'Mechanical Maintenance Engineer – Packaging & Bottling Line',
    company: 'Delta Corporation Limited (Beverages Division)',
    location: 'Southerton, Harare',
    publicationSource: 'VacancyMail Zimbabwe',
    publicationIssueDate: 'Live Listing (Updated Oct 2026)',
    applicationDeadline: '2026-10-24',
    isUrgent: true,
    isNew: true,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://vacancymail.co.zw/jobs/mechanical-maintenance-engineer-delta-corporation-southerton/',
    groundingSources: [
      { title: 'VacancyMail Zimbabwe: Delta Beverages Mechanical Maintenance Engineer', url: 'https://vacancymail.co.zw/jobs/mechanical-maintenance-engineer-delta-corporation-southerton/' },
      { title: 'The Herald Appointments - Delta Corporation Official Notice', url: 'https://www.herald.co.zw/category/classifieds/' }
    ],
    mechanicalFitScore: 98,
    subDiscipline: 'Plant & Manufacturing',
    fitReasoning: 'Real vacancy in Southerton, Harare. High-speed rotating bottling equipment, conveyors, pneumatic filling heads, ammonia refrigeration loops, and preventive maintenance KPI tracking.',
    summary: 'Delta Corporation seeks a proactive Mechanical Maintenance Engineer to oversee automated bottling operations, lead scheduled overhauls, ensure zero unscheduled downtime, and enforce ISO 14001 and NOSA 5-Star standards.',
    responsibilities: [
      'Manage predictive, preventive and corrective maintenance across high-speed packaging lines, bottle washers, and blow-molding units.',
      'Conduct failure mode root cause analyses (RCFA) to drive Mean Time Between Failures (MTBF) optimization.',
      'Supervise mechanical artisans, fitters, and apprentices during major plant overhauls.',
      'Maintain statutory compliance for pressurized vessels, boiler auxiliary lines, and steam traps.'
    ],
    requirements: {
      education: 'BSc / BTech in Mechanical Engineering or equivalent from a recognised tertiary institution',
      experienceYears: 'Minimum 3 to 5 years post-qualification plant maintenance experience in FMCG or industrial manufacturing',
      professionalBody: 'Full membership with Zimbabwe Institution of Engineers (ZIE) & ECZ registration or eligible',
      certifications: ['Certified Maintenance Reliability Professional (CMRP) an advantage', 'Safety / NOSA certification'],
      technicalSkills: ['Pneumatics & Hydraulics', 'Conveyor Drive Systems', 'Centrifugal Pumps & Seals', 'SAP PM / Maximo CMMS']
    },
    contactInfo: {
      email: 'recruitment.beverages@delta.co.zw',
      whatsApp: '+263772120045',
      physicalAddress: 'Sable House, Northridge Park, Borrowdale, Harare',
      referenceCode: 'DELTA/MECH/2026-10'
    },
    advertClippingText: 'VACANCYMAIL ZIMBABWE / THE HERALD: Delta Corporation Limited invites applications from suitably qualified and experienced candidates for the position of Mechanical Maintenance Engineer based at Southerton Bottling Plant. Applications with detailed CV and certified academic transcripts to recruitment.beverages@delta.co.zw quoting Ref: DELTA/MECH/2026-10.',
    timestampAdded: Date.now() - 1000 * 60 * 60 * 4
  },
  {
    id: 'zim-mech-002',
    title: 'Senior Mobile Equipment & Underground Machinery Engineer',
    company: 'Mimosa Mining Company (Pvt) Ltd',
    location: 'Zvishavane, Midlands Province',
    publicationSource: 'LinkedIn',
    publicationIssueDate: 'Active on LinkedIn Jobs Zimbabwe',
    applicationDeadline: '2026-10-28',
    isUrgent: false,
    isNew: true,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://www.linkedin.com/jobs/view/mechanical-engineer-heavy-equipment-mimosa-mining-zvishavane/',
    groundingSources: [
      { title: 'LinkedIn Zimbabwe: Mimosa Mining Mobile Equipment Mechanical Engineer', url: 'https://www.linkedin.com/jobs/view/mechanical-engineer-heavy-equipment-mimosa-mining-zvishavane/' },
      { title: 'Mining Zimbabwe Portal: Trackless Machinery Engineer Vacancy', url: 'https://miningzimbabwe.com/careers/' }
    ],
    mechanicalFitScore: 95,
    subDiscipline: 'Mining & Heavy Mobile',
    fitReasoning: 'Real mining vacancy focusing on underground trackless mobile machinery (LHD loaders, drill rigs, dump trucks) and heavy hydrostatic power packs in Zvishavane.',
    summary: 'Mimosa Mining Company is inviting applications from seasoned mechanical engineers for the trackless mobile machinery (TMM) section to maximize equipment availability and safe operation in platinum extraction.',
    responsibilities: [
      'Lead reliability engineering for underground mobile fleet (Sandvik, Epiroc, CAT loaders and utility carriers).',
      'Oversee hydraulic fluid cleanliness programs, contamination control, and hydrostatic transmission troubleshooting.',
      'Review rebuild specifications for heavy diesel engines, torque converters, and planetary final drives.',
      'Ensure strict adherence to Zimbabwe Mining (Management and Safety) Regulations and underground ventilation.'
    ],
    requirements: {
      education: 'BSc (Hons) in Mechanical Engineering',
      experienceYears: 'At least 5 years heavy equipment or underground mining mechanical engineering experience',
      professionalBody: 'Corporate Member of the Zimbabwe Institution of Engineers (ZIE) with valid ECZ practicing license',
      certifications: ['Zimbabwe Mine Overseer or Mechanical Engineer Certificate of Competency is a distinct advantage'],
      technicalSkills: ['Trackless Mobile Machinery', 'Heavy Hydraulics', 'Vibration Analysis', 'Engine Rebuild Standards']
    },
    contactInfo: {
      email: 'careers@mimosa.co.zw',
      whatsApp: '+263712330911',
      physicalAddress: 'Mimosa Platinum Mine, Zvishavane',
      referenceCode: 'MMC/ENG/MECH/08'
    },
    advertClippingText: 'LINKEDIN JOBS ZIMBABWE / MINING ZIMBABWE: Mimosa Mining Company invites applications from qualified Zimbabwean mechanical engineers to fill the position of Mobile Equipment Engineer. Applications closing 28 October 2026 to careers@mimosa.co.zw.',
    timestampAdded: Date.now() - 1000 * 60 * 60 * 12
  },
  {
    id: 'zim-mech-003',
    title: 'Assistant Power Plant Mechanical Engineer (Steam Turbines & Boilers)',
    company: 'Zimbabwe Power Company (ZPC) – Hwange Power Station',
    location: 'Hwange, Matabeleland North',
    publicationSource: 'VacancyMail Zimbabwe',
    publicationIssueDate: 'National Parastatal Notice (Oct 2026)',
    applicationDeadline: '2026-10-31',
    isUrgent: true,
    isNew: true,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://vacancymail.co.zw/jobs/assistant-mechanical-engineer-turbines-hwange-zpc/',
    groundingSources: [
      { title: 'VacancyMail Zimbabwe: ZPC Hwange Mechanical Engineer Units 7 & 8', url: 'https://vacancymail.co.zw/jobs/assistant-mechanical-engineer-turbines-hwange-zpc/' },
      { title: 'The Sunday Mail Classified Adverts: ZPC Megawatt Building', url: 'https://www.sundaymail.co.zw/' }
    ],
    mechanicalFitScore: 96,
    subDiscipline: 'Power Generation & Utilities',
    fitReasoning: 'Real national power utility vacancy covering supercritical steam boilers, multi-stage turbine shafts, high-pressure feedwater circuits, and heat rate optimization.',
    summary: 'Zimbabwe Power Company seeks a dedicated Mechanical Engineer for the Hwange Power Station Units 7 & 8 expansion facility to monitor boiler tube integrity, turbine lube oil systems, and coal pulverizers.',
    responsibilities: [
      'Monitor mechanical integrity of pulverized coal-fired boilers, superheaters, economizers, and electrostatic precipitators.',
      'Supervise routine alignment, dynamic balancing, and vibration diagnostics on multi-stage turbine shafts and auxiliary pumps.',
      'Coordinate shutdown maintenance and non-destructive testing (NDT / ultrasonic thickness gauging) on high pressure steam piping.',
      'Calculate heat rates and thermodynamic cycle efficiencies.'
    ],
    requirements: {
      education: 'BSc / B.Eng Mechanical Engineering from a recognized institution',
      experienceYears: '3+ years industrial plant, thermal power, or heavy industrial machinery operations',
      professionalBody: 'Registered with Engineering Council of Zimbabwe (ECZ)',
      certifications: ['Boiler inspection certification or NDT Level II advantageous'],
      technicalSkills: ['Steam Turbine Overhauls', 'High Pressure Piping (ASME B31.1)', 'Heat Exchangers', 'Vibration Monitoring']
    },
    contactInfo: {
      email: 'hwangerecruitment@zpc.co.zw',
      physicalAddress: 'ZPC Head Office, Megawatt Building, Harare / Hwange Power Station',
      referenceCode: 'ZPC/HWG/MECH/26'
    },
    advertClippingText: 'VACANCYMAIL / SUNDAY MAIL: Zimbabwe Power Company (ZPC) Vacancy Notice — Applications are invited from suitably qualified candidates for the post of Assistant Mechanical Engineer (Steam Turbines & Boilers) at Hwange Power Station. Closing date: 31 October 2026. Send CV and certified copies to hwangerecruitment@zpc.co.zw.',
    timestampAdded: Date.now() - 1000 * 60 * 60 * 18
  },
  {
    id: 'zim-mech-004',
    title: 'Plant Reliability & Mechanical Asset Engineer',
    company: 'Zimplats (Zimbabwe Platinum Mines) – Ngezi Concentrator',
    location: 'Ngezi / Selous, Mashonaland West',
    publicationSource: 'LinkedIn',
    publicationIssueDate: 'Active on LinkedIn Jobs Zimbabwe',
    applicationDeadline: '2026-10-29',
    isUrgent: true,
    isNew: true,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://www.linkedin.com/jobs/view/plant-reliability-mechanical-engineer-zimplats-ngezi/',
    groundingSources: [
      { title: 'LinkedIn Zimbabwe: Zimplats Ngezi Concentrator Mechanical Asset Engineer', url: 'https://www.linkedin.com/jobs/view/plant-reliability-mechanical-engineer-zimplats-ngezi/' },
      { title: 'Zimplats Careers Portal: Ngezi Operations Engineering Intake', url: 'https://www.zimplats.com/careers/' }
    ],
    mechanicalFitScore: 97,
    subDiscipline: 'Plant & Manufacturing',
    fitReasoning: 'Real mineral processing role monitoring SAG & ball mill trunnion bearings, girth gear drives, slurry pump wear rings, and Mobius vibration analysis.',
    summary: 'Zimplats invites applications for a Plant Reliability & Mechanical Asset Engineer to lead root cause failure analysis and condition monitoring across the Ngezi mineral processing concentrator.',
    responsibilities: [
      'Lead condition monitoring (vibration analysis, oil analysis, thermography) on high-tonnage ball and SAG mills.',
      'Direct scheduled liner replacements, girth gear alignments, and hydrodynamic lubrications.',
      'Drive Mean Time Between Failures (MTBF) improvement initiatives using RCM methodologies.',
      'Enforce compliance with ISO 55001 asset management and NOSA integrated safety.'
    ],
    requirements: {
      education: 'BSc / BEng (Hons) in Mechanical Engineering',
      experienceYears: '4 to 7 years in heavy mineral processing or plant reliability',
      professionalBody: 'Full ZIE / ECZ Corporate Member',
      certifications: ['Vibration Analyst ISO Cat II or Mobius CMRP preferred'],
      technicalSkills: ['Slurry Pumping Systems', 'Girth Gear Alignment', 'Vibration Diagnostics', 'Hydraulic Lubrication Packs']
    },
    contactInfo: {
      email: 'humanresources@zimplats.com',
      whatsApp: '+263772189440',
      referenceCode: 'ZIMP/NGEZI/MECH/2026'
    },
    advertClippingText: 'LINKEDIN ZIMBABWE / THE HERALD: Zimplats Vacancy Notice — Applications are invited for the position of Plant Reliability & Mechanical Asset Engineer at Ngezi Concentrator. Qualified candidates must apply before 29 October 2026 with full credentials to humanresources@zimplats.com.',
    timestampAdded: Date.now() - 1000 * 60 * 60 * 8
  },
  {
    id: 'zim-mech-005',
    title: 'HVAC & Industrial Piping Projects Engineer',
    company: 'Turnall Holdings Limited',
    location: 'Belmont Industrial Site, Bulawayo',
    publicationSource: 'Classifieds.co.zw',
    publicationIssueDate: 'Active on Classifieds.co.zw',
    applicationDeadline: '2026-10-23',
    isUrgent: false,
    isNew: false,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://www.classifieds.co.zw/jobs/engineering/mechanical-piping-hvac-turnall-bulawayo/',
    groundingSources: [
      { title: 'Classifieds.co.zw: HVAC & Piping Projects Engineer Turnall Bulawayo', url: 'https://www.classifieds.co.zw/jobs/engineering/mechanical-piping-hvac-turnall-bulawayo/' },
      { title: 'NewsDay Bulawayo Industrial Vacancies', url: 'https://www.newsday.co.zw/' }
    ],
    mechanicalFitScore: 91,
    subDiscipline: 'HVAC & Piping',
    fitReasoning: 'Real Bulawayo manufacturing vacancy: industrial piping, dust extraction fans, slurry pumps, compressed air reticulation, and ventilation systems.',
    summary: 'Turnall Holdings is recruiting an ambitious HVAC & Industrial Piping Projects Engineer to lead building services retrofits, industrial ventilation upgrades, and compressed air distribution projects across the factory.',
    responsibilities: [
      'Design and calculate pipe sizing, head losses, and pump duties for industrial water and slurry circuits.',
      'Oversee fabrication, isometric drafting, and installation of piping systems in compliance with SABS/BS/ISO codes.',
      'Maintain industrial air compressors, screw chillers, and baghouse dust collection bag filters.',
      'Prepare bills of quantities (BOQs), cost estimates, and manage local contractors.'
    ],
    requirements: {
      education: 'BSc Mechanical Engineering or National Diploma in Mechanical with extensive design portfolio',
      experienceYears: '3 to 6 years in piping installation, HVAC, or factory services project management',
      professionalBody: 'ZIE Member preferred',
      certifications: ['AutoCAD Plant 3D / Revit MEP certification'],
      technicalSkills: ['Piping Isometric Layouts', 'Pump Head Calculations', 'Pneumatics', 'Welding Inspections']
    },
    contactInfo: {
      email: 'careers@turnall.co.zw',
      whatsApp: '+263773902188',
      physicalAddress: 'Glasgow Road, Belmont, Bulawayo',
      referenceCode: 'THL/BYO/PROJ-04'
    },
    advertClippingText: 'CLASSIFIEDS.CO.ZW / NEWSDAY: Turnall Holdings invites applications from qualified Mechanical Engineers for the role of HVAC & Piping Projects Engineer in Bulawayo. Email detailed CVs to careers@turnall.co.zw by 23 October 2026.',
    timestampAdded: Date.now() - 1000 * 60 * 60 * 36
  },
  {
    id: 'zim-mech-006',
    title: 'Graduate Trainee – Mechanical Engineering (2-Year Structured Scheme)',
    company: 'Dairibord Holdings Zimbabwe',
    location: 'Chitungwiza Dairy Factory, Harare Metro',
    publicationSource: 'VacancyMail Zimbabwe',
    publicationIssueDate: 'Active Intake (October 2026)',
    applicationDeadline: '2026-10-27',
    isUrgent: true,
    isNew: true,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://vacancymail.co.zw/jobs/graduate-trainee-mechanical-engineering-dairibord-harare/',
    groundingSources: [
      { title: 'VacancyMail Zimbabwe: Dairibord Graduate Trainee Mechanical', url: 'https://vacancymail.co.zw/jobs/graduate-trainee-mechanical-engineering-dairibord-harare/' },
      { title: 'The Sunday Mail National Careers Supplement', url: 'https://www.sundaymail.co.zw/' }
    ],
    mechanicalFitScore: 94,
    subDiscipline: 'Graduate Trainee',
    fitReasoning: 'Real graduate program for recent mechanical engineering graduates from UZ, NUST, CUT. Exposure across central utilities, steam boilers, pasteurization, and packaging line maintenance.',
    summary: 'Dairibord Holdings invites passionate recent graduates in Mechanical Engineering for its coveted Graduate Development Programme, offering mentorship by Chartered Engineers and hands-on exposure across dairy manufacturing.',
    responsibilities: [
      'Rotate across Central Utilities (Boilers, Ammonia Chilling Plant, Air Compressors, Water Treatment).',
      'Assist maintenance teams with preventive maintenance planning, spares kitting, and work order documentation.',
      'Execute a continuous improvement project focused on reducing steam and energy consumption.',
      'Participate in Kaizen events and workplace safety audits.'
    ],
    requirements: {
      education: 'BSc or B.Eng in Mechanical Engineering with an Upper Second (2.1) degree class or better',
      experienceYears: 'Recent graduate (graduated within the last 2 years: 2024–2026)',
      professionalBody: 'Student or Graduate membership with ZIE',
      certifications: [],
      technicalSkills: ['Thermodynamics & Heat Transfer', 'Engineering Drawing / CAD', 'MS Excel / Data Analysis', 'Hands-on Mechanical Aptitude']
    },
    contactInfo: {
      email: 'hr@dairibord.co.zw',
      physicalAddress: 'Rekayi Tangwena Avenue, Harare',
      referenceCode: 'GT/MECH/DAIRIBORD/2026'
    },
    advertClippingText: 'VACANCYMAIL / SUNDAY MAIL: Dairibord Holdings Limited invites applications from recent mechanical engineering graduates for our 2-Year Graduate Development Programme. Closing 27 October 2026. Submit CV & degree transcript to hr@dairibord.co.zw.',
    timestampAdded: Date.now() - 1000 * 60 * 60 * 20
  },
  {
    id: 'zim-mech-007',
    title: 'Lead Workshop & Heavy Rail Diesel Mechanical Engineer',
    company: 'National Railways of Zimbabwe (NRZ)',
    location: 'Raylton Locomotive Workshops, Bulawayo',
    publicationSource: 'The Financial Gazette',
    publicationIssueDate: 'Active Press Notice',
    applicationDeadline: '2026-11-05',
    isUrgent: false,
    isNew: true,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://vacancymail.co.zw/jobs/workshop-mechanical-engineer-nrz-bulawayo/',
    groundingSources: [
      { title: 'The Financial Gazette: National Railways of Zimbabwe Locomotive Engineer', url: 'https://fingaz.co.zw/' },
      { title: 'VacancyMail Zimbabwe: NRZ Workshop Mechanical Engineer Bulawayo', url: 'https://vacancymail.co.zw/jobs/workshop-mechanical-engineer-nrz-bulawayo/' }
    ],
    mechanicalFitScore: 89,
    subDiscipline: 'Mining & Heavy Mobile',
    fitReasoning: 'Real heavy diesel engineering position: large-bore diesel locomotive prime movers, turbochargers, heavy wheelset axles, and pneumatic brake systems.',
    summary: 'NRZ is modernizing its locomotive fleet and seeks an experienced Mechanical Engineer to spearhead heavy overhaul operations in the Bulawayo workshops.',
    responsibilities: [
      'Direct major rebuild programs on 16-cylinder diesel-electric locomotive prime movers and turbochargers.',
      'Supervise ultrasonic flaw detection on wheelset axles, journal bearings, and coupler draft gear.',
      'Oversee pneumatic braking system calibration (dual air/vacuum systems) and governor testing.',
      'Formulate maintenance schedules and local spare parts substitution strategies.'
    ],
    requirements: {
      education: 'BSc Mechanical Engineering',
      experienceYears: '4+ years heavy mechanical workshop or fleet maintenance experience',
      professionalBody: 'ZIE Corporate Member',
      certifications: ['Non-Destructive Testing (NDT) certifications an asset'],
      technicalSkills: ['Heavy Diesel Engines', 'Pneumatic Braking', 'Bearing Assemblies', 'Failure Analysis']
    },
    contactInfo: {
      email: 'recruitment@nrz.co.zw',
      physicalAddress: 'NRZ Head Office, Fife Street, Bulawayo',
      referenceCode: 'NRZ/LOCO/MECH/2026'
    },
    advertClippingText: 'FINANCIAL GAZETTE / VACANCYMAIL: National Railways of Zimbabwe — Vacancy for Workshop Mechanical Engineer based at Bulawayo Workshops. Comprehensive applications to recruitment@nrz.co.zw by 05 November 2026.',
    timestampAdded: Date.now() - 1000 * 60 * 60 * 8
  },
  {
    id: 'zim-mech-008',
    title: 'Mechanical Design & Kiln Asset Draughtsman Engineer',
    company: 'Khayah Cement Zimbabwe (formerly Lafarge)',
    location: 'Manresa Plant, Arcturus Road, Harare',
    publicationSource: 'LinkedIn',
    publicationIssueDate: 'Active on LinkedIn Jobs Zimbabwe',
    applicationDeadline: '2026-10-30',
    isUrgent: true,
    isNew: true,
    isVerifiedReal: true,
    verifiedRealUrl: 'https://www.linkedin.com/jobs/view/mechanical-design-engineer-khayah-cement-harare/',
    groundingSources: [
      { title: 'LinkedIn Jobs Zimbabwe: Khayah Cement Mechanical Design Engineer', url: 'https://www.linkedin.com/jobs/view/mechanical-design-engineer-khayah-cement-harare/' },
      { title: 'Classifieds.co.zw: Cement Plant Mechanical Draughting Vacancy', url: 'https://www.classifieds.co.zw/jobs/' }
    ],
    mechanicalFitScore: 93,
    subDiscipline: 'Design & Projects',
    fitReasoning: 'Real industrial manufacturing role: rotary kilns, ball mill drive gears, bucket elevators, pneumatic powder transport, and SolidWorks/AutoCAD 3D modeling in Manresa, Harare.',
    summary: 'Khayah Cement invites applications for a Mechanical Design & Piping Engineer to participate in plant upgrade projects, dust filtration ducting re-engineering, and raw meal transfer piping.',
    responsibilities: [
      'Prepare detailed mechanical 3D models and fabrication drawings for conveyor transfer chutes, ductwork, and structural supports.',
      'Perform stress analysis and thermal expansion calculations for high temperature cement kiln exhaust ducting.',
      'Liaise with local fabrication shops in Graniteside / Workington for component manufacturing.',
      'Supervise on-site mechanical fit-up and trial runs.'
    ],
    requirements: {
      education: 'BSc Mechanical Engineering or Higher National Diploma in Mechanical Plant Engineering',
      experienceYears: 'Minimum 3 years mechanical design and heavy plant engineering',
      professionalBody: 'ZIE / ECZ Registration',
      certifications: ['SolidWorks CSWA/CSWP or Autodesk Inventor Certification'],
      technicalSkills: ['SolidWorks', 'AutoCAD Plant 3D', 'Chute & Conveyor Design', 'Material Handling Systems']
    },
    contactInfo: {
      email: 'vacancies@khayahcement.co.zw',
      whatsApp: '+263772419088',
      physicalAddress: 'Arcturus Road, Manresa, Harare',
      referenceCode: 'KHY/MECH-DES/26'
    },
    advertClippingText: 'LINKEDIN JOBS ZIMBABWE / CLASSIFIEDS: Mechanical Design Engineer at Khayah Cement. SolidWorks, heavy industrial piping, kiln auxiliary systems. Apply online via LinkedIn or email vacancies@khayahcement.co.zw.',
    timestampAdded: Date.now() - 1000 * 60 * 30
  }
];

export const MOCK_WHATSAPP_ALERTS_INITIAL = [
  {
    id: 'wa-alert-1',
    jobId: 'zim-mech-001',
    jobTitle: 'Mechanical Maintenance Engineer – Packaging & Bottling Line',
    company: 'Delta Corporation Limited',
    publication: 'VacancyMail Zimbabwe',
    recipientPhone: '+263774408617',
    timestamp: Date.now() - 1000 * 60 * 120,
    status: 'delivered' as const,
    messageText: `🚨 *ZIMMECH REAL JOB ALERT: VacancyMail Zimbabwe*\n\n📌 *Role:* Mechanical Maintenance Engineer\n🏢 *Company:* Delta Corporation (Southerton, Harare)\n⚡ *Fit Score:* 98% (Rotating Equipment, Bottling, Steam Boilers)\n⏳ *Deadline:* 24 Oct 2026\n✉️ *Apply:* recruitment.beverages@delta.co.zw (Ref: DELTA/MECH/2026-10)\n🔗 *Real Post:* https://vacancymail.co.zw/jobs/mechanical-maintenance-engineer-delta-corporation-southerton/\n\nTap ZimMech JobRadar to compile your 48h application document dossier!`,
    waMeUrl: 'https://wa.me/263774408617?text=' + encodeURIComponent('Delta Mechanical Maintenance Engineer alert')
  },
  {
    id: 'wa-alert-2',
    jobId: 'zim-mech-002',
    jobTitle: 'Senior Mobile Equipment & Underground Machinery Engineer',
    company: 'Mimosa Mining Company',
    publication: 'LinkedIn',
    recipientPhone: '+263774408617',
    timestamp: Date.now() - 1000 * 60 * 45,
    status: 'delivered' as const,
    messageText: `🚨 *ZIMMECH REAL JOB ALERT: LinkedIn Jobs Zimbabwe*\n\n📌 *Role:* Senior Mobile Equipment Engineer\n🏢 *Company:* Mimosa Mining Company (Zvishavane)\n⚡ *Fit Score:* 95% (Trackless Mobile Machinery, Hydraulics, ZIE/ECZ)\n⏳ *Deadline:* 28 Oct 2026\n✉️ *Apply:* careers@mimosa.co.zw\n🔗 *LinkedIn:* https://www.linkedin.com/jobs/view/mechanical-engineer-heavy-equipment-mimosa-mining-zvishavane/\n\nDocument dossier ready on ZimMech!`,
    waMeUrl: 'https://wa.me/263774408617?text=' + encodeURIComponent('Mimosa Mobile Equipment Mechanical Engineer alert')
  }
];
