import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  MessageSquare, 
  RefreshCw,
  Clock,
  ExternalLink,
  Bot,
  Sparkles,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { UserCandidateProfile, WhatsAppAlertRecord, Agent48HourCycle } from '../types';

interface HeaderProps {
  candidateProfile: UserCandidateProfile;
  alerts: WhatsAppAlertRecord[];
  agentCycle: Agent48HourCycle;
  isScanning: boolean;
  onTriggerScan: () => void;
  onOpenWhatsAppModal: () => void;
  onOpenProfileModal: () => void;
  onOpenScheduleModal: () => void;
  onOpenAgentModal: () => void;
  unreadAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  candidateProfile,
  alerts,
  agentCycle,
  isScanning,
  onTriggerScan,
  onOpenWhatsAppModal,
  onOpenProfileModal,
  onOpenScheduleModal,
  onOpenAgentModal,
  unreadAlertsCount,
}) => {
  const [catTime, setCatTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Harare',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCatTime(new Intl.DateTimeFormat('en-GB', options).format(now) + ' CAT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand & Zimbabwean Engineering Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 shadow-lg shadow-emerald-950/50 text-white font-black text-xl border border-amber-400/30">
            <span>⚙️</span>
            <span className="absolute -bottom-1 -right-1 text-[10px] bg-red-600 px-1 py-0.2 rounded font-bold uppercase tracking-wider text-white border border-slate-900">
              ZW
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>ZimMech</span>
                <span className="text-emerald-400">JobRadar</span>
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                Real Portals AI Agent
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              VacancyMail • LinkedIn Zimbabwe • Classifieds • Mining Zimbabwe • The Herald
            </p>
          </div>
        </div>

        {/* Live Clock, Status & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Central Africa Time indicator */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-slate-200">{catTime || 'Harare Time'}</span>
          </div>

          {/* 48-Hour AI Agent Status Button */}
          <button
            onClick={onOpenAgentModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-xs font-semibold text-emerald-300 transition"
            title="Open 48-Hour AI Crawler & Document Compilation Agent"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">48h Agent Cycle #{agentCycle.cycleNumber}</span>
            <span className="sm:hidden">48h Agent</span>
          </button>

          {/* Instant Crawl Trigger */}
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              isScanning
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 cursor-wait'
                : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-emerald-900/40 active:scale-95'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-slate-950' : ''}`} />
            <span className="hidden sm:inline">
              {isScanning ? 'Scraping Job Sites...' : 'Run Real Job Crawl'}
            </span>
            <span className="sm:hidden">Crawl</span>
          </button>

          {/* WhatsApp Alert Center Button */}
          <button
            onClick={onOpenWhatsAppModal}
            className="relative flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs sm:text-sm font-medium transition"
            title="WhatsApp Alerts & Mobile Sync"
          >
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold">
                  {unreadAlertsCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-emerald-300">WhatsApp Alerts</span>
          </button>

          {/* Candidate Profile Avatar */}
          <button
            onClick={onOpenProfileModal}
            className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition text-left"
            title="Candidate Profile & ZIE Credentials"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs">
              {candidateProfile.fullName ? candidateProfile.fullName.charAt(0) : 'T'}
            </div>
            <div className="hidden xl:block">
              <p className="text-xs font-semibold text-slate-200 truncate max-w-[110px]">
                {candidateProfile.fullName}
              </p>
              <p className="text-[10px] text-emerald-400 font-mono">
                ZIE Reg.
              </p>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};
