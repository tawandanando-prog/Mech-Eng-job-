import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Phone, 
  Send, 
  CheckCircle, 
  ExternalLink, 
  BellRing, 
  ShieldCheck, 
  Clock, 
  Copy, 
  Smartphone,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';
import { WhatsAppAlertRecord, JobListing, ScanScheduleConfig, UserCandidateProfile } from '../types';
import { formatWhatsAppJobMessage, createWhatsAppDirectUrl, getRelativeTime } from '../utils/whatsapp';

interface WhatsAppCenterModalProps {
  alerts: WhatsAppAlertRecord[];
  candidateProfile: UserCandidateProfile;
  scheduleConfig: ScanScheduleConfig;
  onUpdatePhone: (phone: string) => void;
  onUpdateScheduleConfig: (config: Partial<ScanScheduleConfig>) => void;
  onSendTestAlert: (phone: string) => void;
  onClose: () => void;
}

export const WhatsAppCenterModal: React.FC<WhatsAppCenterModalProps> = ({
  alerts,
  candidateProfile,
  scheduleConfig,
  onUpdatePhone,
  onUpdateScheduleConfig,
  onSendTestAlert,
  onClose,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(candidateProfile.phone || '+263774408617');
  const [copiedAlertId, setCopiedAlertId] = useState<string | null>(null);
  const [testSentFeedback, setTestSentFeedback] = useState(false);

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePhone(phoneNumber);
  };

  const handleTriggerTest = () => {
    onUpdatePhone(phoneNumber);
    onSendTestAlert(phoneNumber);
    setTestSentFeedback(true);
    setTimeout(() => setTestSentFeedback(false), 3000);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAlertId(id);
    setTimeout(() => setCopiedAlertId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>WhatsApp Phone Alert Center</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Direct phone alerts whenever a relevant Zimbabwean mechanical vacancy is posted
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Phone Configuration Form */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                Alert Destination Phone Number
              </span>
              <span className="text-[11px] text-slate-400">
                Zimbabwe (+263) or International format
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+263 77 440 8617"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={handleTriggerTest}
                className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm shadow-md transition active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{testSentFeedback ? 'Alert Generated!' : 'Send Test Alert to Phone'}</span>
              </button>
            </div>

            {testSentFeedback && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Test alert dispatched for {phoneNumber}! Tap below to open in WhatsApp.</span>
                </div>
                <a
                  href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Test alert from ZimMech Vacancy Radar')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
                >
                  Open WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Alert Automation Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Auto WhatsApp Alert Toggle */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">Instant Alert on New Vacancy</p>
                <p className="text-[11px] text-slate-400">Pushes WhatsApp notification as soon as scan detects job</p>
              </div>
              <button
                onClick={() => onUpdateScheduleConfig({ whatsAppAutoAlert: !scheduleConfig.whatsAppAutoAlert })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  scheduleConfig.whatsAppAutoAlert ? 'bg-emerald-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
              </button>
            </div>

            {/* Minimum Fit Threshold */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Minimum Fit Score Threshold</span>
                <span className="font-mono text-emerald-400 font-bold">{scheduleConfig.minScoreThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={scheduleConfig.minScoreThreshold}
                onChange={(e) => onUpdateScheduleConfig({ minScoreThreshold: Number(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">Only notify when job matches mechanical requirements by ≥{scheduleConfig.minScoreThreshold}%</p>
            </div>

          </div>

          {/* Interactive Phone Simulation Mockup */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Mobile Notification Preview
            </span>
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 max-w-md mx-auto shadow-2xl">
              
              {/* WhatsApp Lockscreen Notification Banner */}
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-lg space-y-1.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 font-bold text-slate-200">
                    <span className="text-emerald-400 font-bold">WhatsApp</span>
                    <span>•</span>
                    <span className="text-[11px] text-slate-400">ZimMech JobRadar</span>
                  </div>
                  <span className="text-[10px]">now</span>
                </div>
                <p className="text-xs font-bold text-emerald-400">
                  🚨 NEW VACANCY: The Herald (09 Oct 2026)
                </p>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  Mechanical Maintenance Engineer at Delta Corporation (Southerton, Harare). Fit: 98%. Closes 24 Oct.
                </p>
              </div>

              {/* Chat Message Bubble */}
              <div className="mt-3 p-3.5 rounded-xl bg-[#005c4b] text-[#e9edef] text-xs font-sans leading-relaxed shadow-md">
                <p className="font-bold text-emerald-200">🚨 ZIMMECH JOB ALERT 🇿🇼</p>
                <p className="text-[11px] mt-1">📌 <strong>Role:</strong> Mechanical Maintenance Engineer</p>
                <p className="text-[11px]">🏢 <strong>Company:</strong> Delta Corporation (Southerton, Harare)</p>
                <p className="text-[11px]">📰 <strong>Source:</strong> The Herald (Appointments)</p>
                <p className="text-[11px]">⚡ <strong>Fit:</strong> 98% Match (Rotating Equipment, Boilers)</p>
                <p className="text-[11px]">⏳ <strong>Closing Date:</strong> 24 Oct 2026</p>
                <p className="text-[10px] text-emerald-200/80 mt-1.5 italic">
                  💡 Tap to generate your 1-click tailored application letter!
                </p>
              </div>

            </div>
          </div>

          {/* Sent Alerts Log */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Dispatched WhatsApp Alert History ({alerts.length})
              </span>
            </div>

            <div className="space-y-2.5">
              {alerts.length === 0 ? (
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                  No alerts sent yet. Click "Send Test Alert to Phone" above or wait for the next scheduled search tick!
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">{alert.jobTitle}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {alert.publication}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <span>{alert.company}</span>
                        <span>•</span>
                        <span>Sent to {alert.recipientPhone}</span>
                        <span>•</span>
                        <span>{getRelativeTime(alert.timestamp)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleCopyText(alert.messageText, alert.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
                      >
                        {copiedAlertId === alert.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>

                      <a
                        href={alert.waMeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 transition shadow-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
