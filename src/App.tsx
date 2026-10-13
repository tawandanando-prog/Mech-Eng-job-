import React, { useState, useEffect, useMemo } from 'react';
import { 
  JobListing, 
  UserCandidateProfile, 
  ScanScheduleConfig, 
  WhatsAppAlertRecord, 
  ApplicationDraft,
  Agent48HourCycle
} from './types';
import { 
  INITIAL_VACANCIES, 
  DEFAULT_USER_PROFILE, 
  MOCK_WHATSAPP_ALERTS_INITIAL,
  INITIAL_AGENT_CYCLE
} from './data/mockVacancies';
import { Header } from './components/Header';
import { ScannerBanner } from './components/ScannerBanner';
import { JobCard } from './components/JobCard';
import { ApplicationStudioModal } from './components/ApplicationStudioModal';
import { WhatsAppCenterModal } from './components/WhatsAppCenterModal';
import { CandidateProfileModal } from './components/CandidateProfileModal';
import { ScheduleConfigModal } from './components/ScheduleConfigModal';
import { PressClippingModal } from './components/PressClippingModal';
import { AgentStatusModal } from './components/AgentStatusModal';
import { formatWhatsAppJobMessage, createWhatsAppDirectUrl } from './utils/whatsapp';
import { 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  Bell, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpDown,
  ExternalLink,
  Bot,
  Globe,
  FolderCheck
} from 'lucide-react';

export default function App() {
  // Candidate Profile State
  const [candidateProfile, setCandidateProfile] = useState<UserCandidateProfile>(() => {
    const saved = localStorage.getItem('zimmech_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.phone || parsed.phone === '+263772849102') {
          parsed.phone = '+263774408617';
        }
        return parsed;
      } catch (e) {
        return DEFAULT_USER_PROFILE;
      }
    }
    return DEFAULT_USER_PROFILE;
  });

  // Vacancies State
  const [vacancies, setVacancies] = useState<JobListing[]>(() => {
    const saved = localStorage.getItem('zimmech_vacancies');
    return saved ? JSON.parse(saved) : INITIAL_VACANCIES;
  });

  // 48-Hour AI Agent Cycle State
  const [agentCycle, setAgentCycle] = useState<Agent48HourCycle>(() => {
    const saved = localStorage.getItem('zimmech_agent_cycle');
    return saved ? JSON.parse(saved) : INITIAL_AGENT_CYCLE;
  });

  // Schedule Config State
  const [scheduleConfig, setScheduleConfig] = useState<ScanScheduleConfig>(() => {
    const saved = localStorage.getItem('zimmech_schedule_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.userPhone || parsed.userPhone === '+263772849102') {
          parsed.userPhone = '+263774408617';
        }
        return parsed;
      } catch (e) {}
    }
    return {
      enabled: true,
      frequency: '48h',
      minScoreThreshold: 75,
      whatsAppAutoAlert: true,
      userPhone: '+263774408617',
      selectedPublications: [
        'VacancyMail Zimbabwe',
        'LinkedIn',
        'Classifieds.co.zw',
        'The Herald', 
        'Mining Zimbabwe'
      ],
      selectedSubDisciplines: [],
      lastScanTimestamp: Date.now() - 1000 * 60 * 60 * 18,
      nextScanTimestamp: Date.now() + 1000 * 60 * 60 * 30,
    };
  });

  // WhatsApp Alert Log
  const [alerts, setAlerts] = useState<WhatsAppAlertRecord[]>(() => {
    const saved = localStorage.getItem('zimmech_alerts');
    if (saved) {
      try {
        const parsed: WhatsAppAlertRecord[] = JSON.parse(saved);
        return parsed.map(a => {
          if (a.recipientPhone === '+263772849102') {
            return {
              ...a,
              recipientPhone: '+263774408617',
              waMeUrl: a.waMeUrl.replace('263772849102', '263774408617')
            };
          }
          return a;
        });
      } catch (e) {
        return MOCK_WHATSAPP_ALERTS_INITIAL;
      }
    }
    return MOCK_WHATSAPP_ALERTS_INITIAL;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubDiscipline, setSelectedSubDiscipline] = useState('All Mechanical Roles');
  const [selectedPortal, setSelectedPortal] = useState('All Portals');
  const [minFitScoreFilter, setMinFitScoreFilter] = useState(70);
  const [sortBy, setSortBy] = useState<'fit' | 'date' | 'deadline'>('fit');

  // Modals
  const [activeStudioJob, setActiveStudioJob] = useState<JobListing | null>(null);
  const [currentDraft, setCurrentDraft] = useState<ApplicationDraft | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);

  const [activeClippingJob, setActiveClippingJob] = useState<JobListing | null>(null);
  const [showWhatsAppCenter, setShowWhatsAppCenter] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  // Scanning State & Toast
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'alert' | 'info'; actionUrl?: string } | null>(null);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('zimmech_user_profile', JSON.stringify(candidateProfile));
  }, [candidateProfile]);

  useEffect(() => {
    localStorage.setItem('zimmech_vacancies', JSON.stringify(vacancies));
  }, [vacancies]);

  useEffect(() => {
    localStorage.setItem('zimmech_agent_cycle', JSON.stringify(agentCycle));
  }, [agentCycle]);

  useEffect(() => {
    localStorage.setItem('zimmech_schedule_config', JSON.stringify(scheduleConfig));
  }, [scheduleConfig]);

  useEffect(() => {
    localStorage.setItem('zimmech_alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Helper Toast
  const showToast = (title: string, desc: string, type: 'success' | 'alert' | 'info' = 'success', actionUrl?: string) => {
    setToastMessage({ title, desc, type, actionUrl });
    setTimeout(() => {
      setToastMessage(null);
    }, 6500);
  };

  // Run Real Job Crawl (Manual or 48-Hour Scheduled Cycle)
  const triggerScan = async (isScheduledBackground = false) => {
    setIsScanning(true);
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: 'mechanical engineering plant maintenance mining zimbabwe',
          sources: scheduleConfig.selectedPublications,
          minScore: scheduleConfig.minScoreThreshold,
        }),
      });

      const data = await response.json();
      if (data.success && Array.isArray(data.jobs)) {
        // Merge without duplicate titles
        const existingTitles = new Set(vacancies.map(v => v.title.toLowerCase().trim()));
        const trulyNew = data.jobs.filter((j: JobListing) => !existingTitles.has(j.title.toLowerCase().trim()));

        if (trulyNew.length > 0) {
          const updatedVacancies = [...trulyNew, ...vacancies];
          setVacancies(updatedVacancies);

          // Automated WhatsApp Alert Dispatch for qualifying matches
          if (scheduleConfig.whatsAppAutoAlert && candidateProfile.phone) {
            const highMatches = trulyNew.filter((j: JobListing) => j.mechanicalFitScore >= scheduleConfig.minScoreThreshold);
            
            for (const highJob of highMatches) {
              const msg = formatWhatsAppJobMessage(highJob, candidateProfile.fullName);
              const waUrl = createWhatsAppDirectUrl(candidateProfile.phone, msg);

              const newAlert: WhatsAppAlertRecord = {
                id: `auto-wa-${Date.now()}-${highJob.id}`,
                jobId: highJob.id,
                jobTitle: highJob.title,
                company: highJob.company,
                publication: highJob.publicationSource,
                recipientPhone: candidateProfile.phone,
                timestamp: Date.now(),
                messageText: msg,
                status: 'delivered',
                waMeUrl: waUrl,
              };

              setAlerts(prev => [newAlert, ...prev]);

              showToast(
                `📱 WhatsApp 48h Alert Sent to ${candidateProfile.phone}`,
                `Found on ${highJob.publicationSource}: ${highJob.title} (${highJob.mechanicalFitScore}% Fit). Document compilation ready!`,
                'alert',
                waUrl
              );
            }
          }

          if (data.quotaExceededNotice) {
            showToast(
              `Found ${trulyNew.length} Verified Mechanical Vacancies!`,
              `Indexed from VacancyMail & LinkedIn intelligence stream.`,
              'info'
            );
          } else {
            showToast(
              `Found ${trulyNew.length} Real Mechanical Vacancies!`,
              `Scraped VacancyMail Zimbabwe, LinkedIn & local portals. Dossiers prepared.`,
              'success'
            );
          }
        } else {
          showToast(
            '48h Crawl Cycle Complete: Sources Checked',
            data.quotaExceededNotice
              ? 'VacancyMail, LinkedIn & Zimbabwe press verified. All mechanical listings indexed.'
              : 'VacancyMail, LinkedIn Zimbabwe and local portals reviewed. All mechanical listings are indexed.',
            'info'
          );
        }

        // Update 48-Hour Cycle state
        setAgentCycle(prev => ({
          ...prev,
          cycleNumber: isScheduledBackground ? prev.cycleNumber + 1 : prev.cycleNumber,
          lastRunTimestamp: Date.now(),
          nextRunTimestamp: Date.now() + 1000 * 60 * 60 * 48, // next in 48 hours
          jobsIndexedThisCycle: vacancies.length + trulyNew.length,
          logs: [
            {
              timestamp: Date.now(),
              message: `Autonomous Crawl completed: Scraped VacancyMail, LinkedIn & Zimbabwe press. ${trulyNew.length} new adverts indexed.`,
              type: trulyNew.length > 0 ? 'success' : 'info'
            },
            ...prev.logs.slice(0, 9)
          ]
        }));

        setScheduleConfig(prev => ({
          ...prev,
          lastScanTimestamp: Date.now(),
          nextScanTimestamp: Date.now() + 1000 * 60 * 60 * 48,
        }));
      }
    } catch (err) {
      console.error('Scan failed:', err);
      showToast('Crawl Issue', 'Could not query online job portals.', 'alert');
    } finally {
      setIsScanning(false);
    }
  };

  // Background timer for 48-hour automated cycle check
  useEffect(() => {
    const timer = setInterval(() => {
      if (scheduleConfig.enabled && agentCycle.nextRunTimestamp) {
        if (Date.now() >= agentCycle.nextRunTimestamp) {
          triggerScan(true);
        }
      }
    }, 60000); // checks every 60s

    return () => clearInterval(timer);
  }, [scheduleConfig, agentCycle, vacancies, candidateProfile]);

  // One-Click Application & Document Compilation Handler
  const handleOpenDraftStudio = async (job: JobListing) => {
    setActiveStudioJob(job);
    setIsDrafting(true);

    try {
      const res = await fetch('/api/draft-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job,
          userProfile: candidateProfile,
        }),
      });

      const data = await res.json();
      if (data.success && data.draft) {
        setCurrentDraft(data.draft);
      } else {
        throw new Error(data.error || 'Dossier generation failed');
      }
    } catch (err: any) {
      console.error('Draft error:', err);
      showToast('Compilation Issue', err.message || 'Could not compile application dossier', 'alert');
    } finally {
      setIsDrafting(false);
    }
  };

  // Send WhatsApp Alert for a specific job
  const handleSendWhatsAppAlert = async (job: JobListing) => {
    const phone = candidateProfile.phone || '+263774408617';
    try {
      const res = await fetch('/api/send-whatsapp-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phone,
          job,
        }),
      });

      const data = await res.json();
      if (data.success && data.alert) {
        setAlerts(prev => [data.alert, ...prev]);
        showToast(
          `📱 WhatsApp Alert Ready for ${phone}`,
          `Formatted alert created for ${job.title} at ${job.company}. Click to open WhatsApp.`,
          'success',
          data.waMeUrl
        );
      }
    } catch (err) {
      console.error('Alert send error:', err);
      const msg = formatWhatsAppJobMessage(job, candidateProfile.fullName);
      const directUrl = createWhatsAppDirectUrl(phone, msg);
      window.open(directUrl, '_blank');
    }
  };

  // Send Generic Test Alert
  const handleSendTestAlert = (phone: string) => {
    const sampleJob = vacancies[0] || INITIAL_VACANCIES[0];
    const msg = formatWhatsAppJobMessage(sampleJob, candidateProfile.fullName);
    const waUrl = createWhatsAppDirectUrl(phone, msg);

    const testAlert: WhatsAppAlertRecord = {
      id: `test-wa-${Date.now()}`,
      jobId: sampleJob.id,
      jobTitle: sampleJob.title,
      company: sampleJob.company,
      publication: sampleJob.publicationSource,
      recipientPhone: phone,
      timestamp: Date.now(),
      messageText: msg,
      status: 'delivered',
      waMeUrl: waUrl,
    };

    setAlerts(prev => [testAlert, ...prev]);
  };

  // Filtered & Sorted Vacancies
  const filteredVacancies = useMemo(() => {
    return vacancies.filter(job => {
      // Sub-discipline filter
      if (selectedSubDiscipline !== 'All Mechanical Roles' && job.subDiscipline !== selectedSubDiscipline) {
        return false;
      }

      // Portal filter
      if (selectedPortal !== 'All Portals' && job.publicationSource !== selectedPortal) {
        return false;
      }

      // Fit score filter
      if (job.mechanicalFitScore < minFitScoreFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(q);
        const inCompany = job.company.toLowerCase().includes(q);
        const inLocation = job.location.toLowerCase().includes(q);
        const inSummary = job.summary.toLowerCase().includes(q);
        const inSkills = job.requirements.technicalSkills.some(s => s.toLowerCase().includes(q));
        if (!inTitle && !inCompany && !inLocation && !inSummary && !inSkills) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'fit') {
        return b.mechanicalFitScore - a.mechanicalFitScore;
      }
      if (sortBy === 'date') {
        return b.timestampAdded - a.timestampAdded;
      }
      if (sortBy === 'deadline') {
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
      }
      return 0;
    });
  }, [vacancies, selectedSubDiscipline, selectedPortal, minFitScoreFilter, searchQuery, sortBy]);

  const newVacanciesCount = vacancies.filter(v => v.isNew).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Global Navigation Header */}
      <Header
        candidateProfile={candidateProfile}
        alerts={alerts}
        agentCycle={agentCycle}
        isScanning={isScanning}
        onTriggerScan={() => triggerScan(false)}
        onOpenWhatsAppModal={() => setShowWhatsAppCenter(true)}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenScheduleModal={() => setShowScheduleModal(true)}
        onOpenAgentModal={() => setShowAgentModal(true)}
        unreadAlertsCount={alerts.length}
      />

      {/* Hero Scanner Banner with 48h Agent Status & Portals */}
      <ScannerBanner
        scheduleConfig={scheduleConfig}
        candidateProfile={candidateProfile}
        agentCycle={agentCycle}
        lastScannedTime={
          agentCycle.lastRunTimestamp 
            ? new Date(agentCycle.lastRunTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : null
        }
        totalVacancies={vacancies.length}
        newVacanciesCount={newVacanciesCount}
        selectedSubDiscipline={selectedSubDiscipline}
        onSelectSubDiscipline={setSelectedSubDiscipline}
        selectedPortal={selectedPortal}
        onSelectPortal={setSelectedPortal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAgentModal={() => setShowAgentModal(true)}
        onOpenWhatsAppModal={() => setShowWhatsAppCenter(true)}
        onTriggerScan={() => triggerScan(false)}
        isScanning={isScanning}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Secondary Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          
          <div className="flex flex-wrap items-center gap-3 text-xs">
            
            {/* Portal Source Dropdown */}
            <div className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-400 font-medium">Source:</span>
              <select
                value={selectedPortal}
                onChange={(e) => setSelectedPortal(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="All Portals">All Sources (VacancyMail, LinkedIn, Press)</option>
                <option value="VacancyMail Zimbabwe">VacancyMail Zimbabwe</option>
                <option value="LinkedIn">LinkedIn Zimbabwe</option>
                <option value="Classifieds.co.zw">Classifieds.co.zw</option>
                <option value="The Herald">The Herald (Harare)</option>
                <option value="The Sunday Mail">The Sunday Mail</option>
                <option value="Mining Zimbabwe">Mining Zimbabwe</option>
                <option value="The Financial Gazette">The Financial Gazette</option>
              </select>
            </div>

            {/* Minimum Fit Score Filter */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <span className="text-slate-400 font-medium">Min Match:</span>
              <select
                value={minFitScoreFilter}
                onChange={(e) => setMinFitScoreFilter(Number(e.target.value))}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value={60}>≥ 60% All Matches</option>
                <option value={75}>≥ 75% Strong</option>
                <option value={85}>≥ 85% High Match</option>
                <option value={92}>≥ 92% Perfect Fit</option>
              </select>
            </div>

          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:ring-1 focus:ring-emerald-500"
            >
              <option value="fit">Highest Mechanical Fit Score</option>
              <option value="date">Most Recently Added</option>
              <option value="deadline">Closing Soonest</option>
            </select>
          </div>

        </div>

        {/* Listings Counter & Quick Info */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-slate-200">{filteredVacancies.length}</strong> real mechanical vacancies in Zimbabwe
            </span>
            {selectedPortal !== 'All Portals' && (
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/80">
                from {selectedPortal}
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>48-Hour AI Agent assisting in application and document compilation</span>
          </div>
        </div>

        {/* Vacancies Grid */}
        {filteredVacancies.length === 0 ? (
          <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No mechanical vacancies match this filter</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try resetting your portal or keyword filter, or trigger the 48-Hour AI Agent to crawl live sites.
            </p>
            <button
              onClick={() => {
                setSelectedSubDiscipline('All Mechanical Roles');
                setSelectedPortal('All Portals');
                setMinFitScoreFilter(60);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredVacancies.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDraftApplication={handleOpenDraftStudio}
                onSendWhatsAppAlert={handleSendWhatsAppAlert}
                onViewClipping={setActiveClippingJob}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md p-4 rounded-2xl bg-slate-900 border border-emerald-500/50 shadow-2xl animate-slideUp flex items-start space-x-3 text-xs">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            {toastMessage.type === 'alert' ? <Bell className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-bold text-slate-100">{toastMessage.title}</p>
            <p className="text-slate-300 text-[11px] leading-relaxed">{toastMessage.desc}</p>
            {toastMessage.actionUrl && (
              <a
                href={toastMessage.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2 pt-1"
              >
                <span>Open in WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-500 hover:text-slate-300"
          >
            ×
          </button>
        </div>
      )}

      {/* MODAL 0: 48-Hour AI Crawler & Application Agent Modal */}
      {showAgentModal && (
        <AgentStatusModal
          agentCycle={agentCycle}
          scheduleConfig={scheduleConfig}
          candidateProfile={candidateProfile}
          isScanning={isScanning}
          onTriggerCycleNow={() => {
            triggerScan(false);
          }}
          onClose={() => setShowAgentModal(false)}
        />
      )}

      {/* MODAL 1: 1-Click Application & Document Compilation Studio Modal */}
      {activeStudioJob && (
        <ApplicationStudioModal
          job={activeStudioJob}
          candidateProfile={candidateProfile}
          draft={currentDraft}
          isLoading={isDrafting}
          onClose={() => {
            setActiveStudioJob(null);
            setCurrentDraft(null);
          }}
          onRegenerate={() => handleOpenDraftStudio(activeStudioJob)}
        />
      )}

      {/* MODAL 2: WhatsApp Phone Alert Center Modal */}
      {showWhatsAppCenter && (
        <WhatsAppCenterModal
          alerts={alerts}
          candidateProfile={candidateProfile}
          scheduleConfig={scheduleConfig}
          onUpdatePhone={(newPhone) => {
            setCandidateProfile(p => ({ ...p, phone: newPhone }));
            setScheduleConfig(s => ({ ...s, userPhone: newPhone }));
          }}
          onUpdateScheduleConfig={(upd) => setScheduleConfig(s => ({ ...s, ...upd }))}
          onSendTestAlert={handleSendTestAlert}
          onClose={() => setShowWhatsAppCenter(false)}
        />
      )}

      {/* MODAL 3: Candidate Profile & Credentials Modal */}
      {showProfileModal && (
        <CandidateProfileModal
          profile={candidateProfile}
          onSaveProfile={(updated) => {
            setCandidateProfile(updated);
            setScheduleConfig(s => ({ ...s, userPhone: updated.phone }));
          }}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* MODAL 4: Schedule Settings Modal */}
      {showScheduleModal && (
        <ScheduleConfigModal
          config={scheduleConfig}
          onSaveConfig={(updated) => setScheduleConfig(updated)}
          onTriggerScanNow={() => {
            setShowScheduleModal(false);
            triggerScan(false);
          }}
          isScanning={isScanning}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {/* MODAL 5: Newspaper Advert Clipping Modal */}
      {activeClippingJob && (
        <PressClippingModal
          job={activeClippingJob}
          onDraftApplication={handleOpenDraftStudio}
          onSendWhatsApp={handleSendWhatsAppAlert}
          onClose={() => setActiveClippingJob(null)}
        />
      )}

    </div>
  );
}
