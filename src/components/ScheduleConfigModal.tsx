import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Newspaper, 
  Check, 
  SlidersHorizontal, 
  RefreshCw,
  BellRing,
  CheckCircle2,
  Sparkles,
  Bot,
  Globe
} from 'lucide-react';
import { ScanScheduleConfig } from '../types';

interface ScheduleConfigModalProps {
  config: ScanScheduleConfig;
  onSaveConfig: (updated: ScanScheduleConfig) => void;
  onTriggerScanNow: () => void;
  isScanning: boolean;
  onClose: () => void;
}

const AVAILABLE_PUBLICATIONS = [
  { name: 'VacancyMail Zimbabwe', description: 'Popular Zimbabwean recruitment portal (vacancymail.co.zw)' },
  { name: 'LinkedIn', description: 'LinkedIn Zimbabwe Jobs & multinational mining posts' },
  { name: 'Classifieds.co.zw', description: 'Engineering, plant maintenance & design notices' },
  { name: 'The Herald', description: 'Appointments, parastatal notices & Harare industries' },
  { name: 'Mining Zimbabwe', description: 'Underground trackless machinery & platinum/gold plants' },
  { name: 'The Sunday Mail', description: 'National careers, utilities & graduate trainee intakes' },
  { name: 'The Financial Gazette', description: 'Senior engineering workshop & management appointments' },
  { name: 'NewsDay', description: 'Bulawayo & Harare industrial vacancies' },
];

export const ScheduleConfigModal: React.FC<ScheduleConfigModalProps> = ({
  config,
  onSaveConfig,
  onTriggerScanNow,
  isScanning,
  onClose,
}) => {
  const [formData, setFormData] = useState<ScanScheduleConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const togglePublication = (pubName: string) => {
    if (formData.selectedPublications.includes(pubName)) {
      setFormData({
        ...formData,
        selectedPublications: formData.selectedPublications.filter(p => p !== pubName)
      });
    } else {
      setFormData({
        ...formData,
        selectedPublications: [...formData.selectedPublications, pubName]
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Scheduled Search & Monitoring Engine
              </h2>
              <p className="text-xs text-slate-400">
                Automated crawling of VacancyMail, LinkedIn & Zimbabwean press
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          
          {/* Scheduled Scanning Toggle */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-200">Enable Automated Agent Scheduling</p>
              <p className="text-[11px] text-slate-400">Periodically queries online job portals and compiles document blueprints</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                formData.enabled ? 'bg-emerald-600 justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
            </button>
          </div>

          {/* Frequency Options */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-300 block">Agent Crawl Frequency</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: '48h', label: 'Every 48 Hours', note: 'AI Agent Standard' },
                { id: '24h', label: 'Daily (24h)', note: 'Daily digest' },
                { id: '6h', label: 'Every 6 Hours', note: 'Frequent watch' },
                { id: '1h', label: 'Every 1 Hour', note: 'High frequency' },
              ].map((freq) => (
                <button
                  type="button"
                  key={freq.id}
                  onClick={() => setFormData({ ...formData, frequency: freq.id as any })}
                  className={`p-3 rounded-xl border text-left transition ${
                    formData.frequency === freq.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <p className="text-xs">{freq.label}</p>
                  <p className="text-[10px] opacity-75 font-normal">{freq.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Publications & Sites Checkboxes */}
          <div className="space-y-2 pt-1">
            <label className="font-semibold text-slate-300 block">
              Tracked Online Job Portals & Publications ({formData.selectedPublications.length} selected)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AVAILABLE_PUBLICATIONS.map((pub) => {
                const isSelected = formData.selectedPublications.includes(pub.name);
                return (
                  <button
                    type="button"
                    key={pub.name}
                    onClick={() => togglePublication(pub.name)}
                    className={`p-3 rounded-xl border text-left flex items-start space-x-2.5 transition ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-600/70 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200">{pub.name}</p>
                      <p className="text-[10px] text-slate-400">{pub.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant Trigger Test */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-200">Force Instant Portal Crawl</p>
              <p className="text-[10px] text-slate-400">Scrapes VacancyMail, LinkedIn and press right now without waiting</p>
            </div>
            <button
              type="button"
              onClick={onTriggerScanNow}
              disabled={isScanning}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-emerald-400' : ''}`} />
              <span>{isScanning ? 'Crawling...' : 'Crawl Now'}</span>
            </button>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition"
            >
              <Check className="w-4 h-4" />
              <span>{savedSuccess ? 'Saved!' : 'Save Settings'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
