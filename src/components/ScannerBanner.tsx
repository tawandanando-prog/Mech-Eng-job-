import React from 'react';
import { 
  Bot, 
  Clock, 
  MessageSquare, 
  Search, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ScanScheduleConfig, UserCandidateProfile, Agent48HourCycle } from '../types';

interface ScannerBannerProps {
  scheduleConfig: ScanScheduleConfig;
  candidateProfile: UserCandidateProfile;
  agentCycle: Agent48HourCycle;
  lastScannedTime: string | null;
  totalVacancies: number;
  newVacanciesCount: number;
  selectedSubDiscipline: string;
  onSelectSubDiscipline: (sub: string) => void;
  selectedPortal: string;
  onSelectPortal: (portal: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAgentModal: () => void;
  onOpenWhatsAppModal: () => void;
  onTriggerScan: () => void;
  isScanning: boolean;
}

const SUB_DISCIPLINES = [
  'All Mechanical Roles',
  'Plant & Manufacturing',
  'Mining & Heavy Mobile',
  'Power Generation & Utilities',
  'HVAC & Piping',
  'Graduate Trainee',
  'Design & Projects'
];

const PORTALS = [
  'All Portals',
  'VacancyMail Zimbabwe',
  'LinkedIn',
  'Classifieds.co.zw',
  'The Herald',
  'Mining Zimbabwe',
  'The Sunday Mail'
];

export const ScannerBanner: React.FC<ScannerBannerProps> = ({
  scheduleConfig,
  candidateProfile,
  agentCycle,
  lastScannedTime,
  totalVacancies,
  newVacanciesCount,
  selectedSubDiscipline,
  onSelectSubDiscipline,
  selectedPortal,
  onSelectPortal,
  searchQuery,
  onSearchChange,
  onOpenAgentModal,
  onOpenWhatsAppModal,
  onTriggerScan,
  isScanning,
}) => {
  // Calculate remaining hours until next 48-hour cycle
  const remainingHours = Math.max(0, Math.round((agentCycle.nextRunTimestamp - Date.now()) / (1000 * 60 * 60)));

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Scheduling & 48-Hour AI Agent Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 48-Hour Autonomous Agent Status Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between shadow-inner">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5" />
                  48-Hour AI Job Agent
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-100">
                Cycle #{agentCycle.cycleNumber} Active • <span className="text-emerald-400">Next run in ~{remainingHours}h</span>
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                Scrapes VacancyMail, LinkedIn & Zimbabwe press every 48 hours
              </p>
            </div>
            <button
              onClick={onOpenAgentModal}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-2 py-1"
            >
              Agent Log
            </button>
          </div>

          {/* WhatsApp Direct Phone Receiver */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between shadow-inner">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                  📱
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  WhatsApp Phone Alerts
                </span>
              </div>
              <p className="text-sm font-semibold font-mono text-emerald-400">
                {candidateProfile.phone || '+263 77 000 0000'}
              </p>
              <p className="text-xs text-slate-400">
                Pushes instant phone alert with 1-click application document compile link
              </p>
            </div>
            <button
              onClick={onOpenWhatsAppModal}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-2 py-1"
            >
              Test Alert
            </button>
          </div>

          {/* Real Online Job Portals Crawled */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-inner">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Real Job Sites Scraped
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Live Sources
                </span>
              </div>
              <div className="flex flex-wrap gap-1 text-[11px] text-slate-400 font-medium">
                <span className="px-1.5 py-0.5 rounded bg-blue-950/70 text-blue-300 border border-blue-900/50">VacancyMail</span>
                <span className="px-1.5 py-0.5 rounded bg-sky-950/70 text-sky-300 border border-sky-900/50">LinkedIn</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-900/50">Classifieds</span>
                <span className="px-1.5 py-0.5 rounded bg-red-950/70 text-red-300 border border-red-900/50">The Herald</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-900/50">Mining Zim</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">{totalVacancies} Verified Vacancies in Zimbabwe</span>
              {newVacanciesCount > 0 && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {newVacanciesCount} Live This Cycle
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Search Input & Quick Sub-discipline Filters */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search real Zimbabwean mechanical vacancies (e.g. Delta, Zimplats, Mimosa, VacancyMail, Boilers, Mining)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Crawl Trigger */}
            <button
              onClick={onTriggerScan}
              disabled={isScanning}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-sm font-bold transition active:scale-95 shadow-md shadow-emerald-950/40"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isScanning ? 'Scraping VacancyMail & LinkedIn...' : 'Crawl Real Sites Now'}</span>
            </button>
          </div>

          {/* Real Portal Filters */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold px-1 shrink-0">Portal:</span>
            {PORTALS.map((portal) => {
              const isSelected = selectedPortal === portal;
              return (
                <button
                  key={portal}
                  onClick={() => onSelectPortal(portal)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition border ${
                    isSelected
                      ? 'bg-blue-600/30 text-blue-300 border-blue-500/60 font-bold'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {portal}
                </button>
              );
            })}
          </div>

          {/* Sub-discipline Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold px-1 shrink-0">Discipline:</span>
            {SUB_DISCIPLINES.map((sub) => {
              const isSelected = selectedSubDiscipline === sub;
              return (
                <button
                  key={sub}
                  onClick={() => onSelectSubDiscipline(sub)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition border ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
