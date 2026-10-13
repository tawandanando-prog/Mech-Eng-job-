import React from 'react';
import { 
  X, 
  Bot, 
  Clock, 
  Globe, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  FileText, 
  Send, 
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Agent48HourCycle, ScanScheduleConfig, UserCandidateProfile } from '../types';

interface AgentStatusModalProps {
  agentCycle: Agent48HourCycle;
  scheduleConfig: ScanScheduleConfig;
  candidateProfile: UserCandidateProfile;
  isScanning: boolean;
  onTriggerCycleNow: () => void;
  onClose: () => void;
}

export const AgentStatusModal: React.FC<AgentStatusModalProps> = ({
  agentCycle,
  scheduleConfig,
  candidateProfile,
  isScanning,
  onTriggerCycleNow,
  onClose,
}) => {
  const hoursElapsed = Math.round((Date.now() - agentCycle.lastRunTimestamp) / (1000 * 60 * 60));
  const remainingHours = Math.max(0, Math.round((agentCycle.nextRunTimestamp - Date.now()) / (1000 * 60 * 60)));
  const progressPercent = Math.min(100, Math.max(5, (hoursElapsed / 48) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  48-Hour AI Crawler & Application Agent
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Autonomous Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Looks through real Zimbabwean job boards every 48 hours & assists in document compilation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* Cycle Status & Progress Bar */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Active Cycle #{agentCycle.cycleNumber} (48-Hour Schedule)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-semibold">
                Running in Background
              </span>
            </div>

            <p className="text-slate-400 text-xs">
              Last automated crawl was executed <strong>{hoursElapsed} hours ago</strong>. Next autonomous indexing cycle will trigger in <strong>~{remainingHours} hours</strong>.
            </p>

            {/* Visual 48h Progress Track */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0h (Crawl Start)</span>
                <span className="text-emerald-400 font-bold">{hoursElapsed}h elapsed</span>
                <span>48h (Next Full Crawl)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400">
                Jobs indexed this cycle: <strong className="text-emerald-400">{agentCycle.jobsIndexedThisCycle}</strong> verified vacancies
              </div>
              <button
                onClick={onTriggerCycleNow}
                disabled={isScanning}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition active:scale-95 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Crawling Sites...' : 'Trigger 48h Crawl Now'}</span>
              </button>
            </div>
          </div>

          {/* Sources Crawled by AI Agent */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              Targeted Real Job Portals & Sites in Zimbabwe
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { name: 'VacancyMail Zimbabwe', domain: 'vacancymail.co.zw', note: 'Crawls engineering, manufacturing & parastatals' },
                { name: 'LinkedIn Zimbabwe Jobs', domain: 'linkedin.com/jobs (ZW)', note: 'Crawls mining, platinum, cement & industrial roles' },
                { name: 'Classifieds.co.zw', domain: 'classifieds.co.zw/jobs', note: 'Crawls HVAC, plant design & engineering notices' },
                { name: 'The Herald Zimbabwe', domain: 'herald.co.zw', note: 'Official government, parastatal & corporate appointments' },
                { name: 'Mining Zimbabwe', domain: 'miningzimbabwe.com', note: 'Underground, surface fleet & plant reliability vacancies' },
                { name: 'The Sunday Mail', domain: 'sundaymail.co.zw', note: 'Weekly career supplements & engineering trainees' }
              ].map((site) => (
                <div
                  key={site.name}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <p className="font-bold text-slate-200">{site.name}</p>
                      <span className="font-mono text-[10px] text-slate-400">({site.domain})</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{site.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application & Document Compilation Assistance Blueprint */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              Document Compilation Assistance Features
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              For every verified job discovered during the 48-hour cycle, the AI agent compiles a turnkey 4-part application dossier:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>Formal Zimbabwean Application Letter citing source & ZIE status</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span>Tailored 2-Page CV formatted with company tech stack</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>Certified Documents & Regulatory Compliance Checklist</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span>Ready-to-Send Email Submission & WhatsApp Recruiter Pitch</span>
              </div>
            </div>
          </div>

          {/* Agent Activity Execution Logs */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recent 48h Crawl Execution Stream
            </span>

            <div className="space-y-2">
              {agentCycle.logs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2.5 font-mono text-[11px]"
                >
                  <span className="text-emerald-400 shrink-0">[{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                  <p className="text-slate-300 leading-relaxed">{log.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            WhatsApp Destination: <strong className="text-emerald-400 font-mono">{candidateProfile.phone}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
