export type PublicationSource = 
  | 'VacancyMail Zimbabwe' 
  | 'LinkedIn' 
  | 'Classifieds.co.zw' 
  | 'The Herald' 
  | 'The Sunday Mail' 
  | 'Mining Zimbabwe' 
  | 'NewsDay' 
  | 'The Financial Gazette';

export interface GroundingSource {
  title: string;
  url: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  publicationSource: PublicationSource;
  publicationIssueDate: string;
  applicationDeadline: string;
  isUrgent?: boolean;
  isNew?: boolean;
  isVerifiedReal?: boolean;
  verifiedRealUrl?: string; // Direct link to VacancyMail / LinkedIn / Portal
  groundingSources?: GroundingSource[];
  mechanicalFitScore: number; // 0 - 100
  subDiscipline: 'Plant & Manufacturing' | 'Mining & Heavy Mobile' | 'Power Generation & Utilities' | 'HVAC & Piping' | 'Graduate Trainee' | 'Design & Projects';
  fitReasoning: string;
  summary: string;
  responsibilities: string[];
  requirements: {
    education: string;
    experienceYears: string;
    professionalBody?: string; // e.g. "ZIE / ECZ Registration"
    certifications?: string[];
    technicalSkills: string[];
  };
  contactInfo: {
    email?: string;
    whatsApp?: string;
    physicalAddress?: string;
    referenceCode?: string;
  };
  sourceUrl?: string;
  advertClippingText?: string;
  timestampAdded: number;
}

export interface UserCandidateProfile {
  fullName: string;
  phone: string; // e.g. +263 77 000 0000
  email: string;
  location: string;
  degree: string;
  university: string;
  yearsExperience: number;
  zieStatus: 'Corporate Member (Chartered / Pr.Eng)' | 'Graduate Member' | 'Candidate Engineer' | 'Student Member';
  primarySkills: string[];
  summaryBio: string;
}

export interface ApplicationDraft {
  jobId: string;
  coverLetter: string;
  cvHighlights: string[];
  tailoredCvDocument?: string; // Full formatted tailored mechanical CV
  complianceChecklist?: { item: string; description: string; status: 'ready' | 'required' }[];
  emailSubject: string;
  emailBody: string;
  whatsAppRecruiterMessage: string;
  technicalInterviewPoints: string[];
  generatedAt: string;
}

export interface WhatsAppAlertRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  publication: string;
  recipientPhone: string;
  timestamp: number;
  messageText: string;
  status: 'sent' | 'delivered' | 'ready_to_send';
  waMeUrl: string;
}

export interface Agent48HourCycle {
  cycleNumber: number;
  lastRunTimestamp: number;
  nextRunTimestamp: number;
  status: 'idle' | 'running' | 'completed';
  jobsIndexedThisCycle: number;
  sourcesCrawled: string[];
  logs: { timestamp: number; message: string; type: 'info' | 'success' | 'alert' }[];
}

export interface ScanScheduleConfig {
  enabled: boolean;
  frequency: '48h' | '1h' | '6h' | '24h';
  minScoreThreshold: number;
  whatsAppAutoAlert: boolean;
  userPhone: string;
  selectedPublications: string[];
  selectedSubDisciplines: string[];
  lastScanTimestamp: number | null;
  nextScanTimestamp: number | null;
}
