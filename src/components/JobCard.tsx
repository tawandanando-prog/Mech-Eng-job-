import React from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Send, 
  Sparkles,
  Newspaper,
  Flame,
  Award,
  Globe,
  FolderCheck,
  ShieldCheck
} from 'lucide-react';
import { JobListing } from '../types';

interface JobCardProps {
  job: JobListing;
  onDraftApplication: (job: JobListing) => void;
  onSendWhatsAppAlert: (job: JobListing) => void;
  onViewClipping: (job: JobListing) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onDraftApplication,
  onSendWhatsAppAlert,
  onViewClipping,
}) => {
  // Portal styles
  const getPubBadgeStyle = (source: string) => {
    switch (source) {
      case 'VacancyMail Zimbabwe':
        return 'bg-blue-950/90 text-blue-300 border-blue-800/80';
      case 'LinkedIn':
        return 'bg-sky-950/90 text-sky-300 border-sky-800/80';
      case 'The Herald':
        return 'bg-red-950/90 text-red-200 border-red-800/70';
      case 'The Sunday Mail':
        return 'bg-indigo-950/90 text-indigo-200 border-indigo-800/70';
      case 'Mining Zimbabwe':
        return 'bg-emerald-950/90 text-emerald-200 border-emerald-800/70';
      case 'Classifieds.co.zw':
        return 'bg-amber-950/90 text-amber-200 border-amber-800/70';
      case 'NewsDay':
        return 'bg-rose-950/90 text-rose-200 border-rose-800/70';
      case 'The Financial Gazette':
        return 'bg-purple-950/90 text-purple-200 border-purple-800/70';
      default:
        return 'bg-slate-800 text-slate-200 border-slate-700';
    }
  };

  const calculateDaysLeft = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Closed';
    if (diff === 0) return 'Closes today!';
    if (diff === 1) return '1 day left';
    return `${diff} days left`;
  };

  const daysLeft = calculateDaysLeft(job.applicationDeadline);
  const isClosingSoon = daysLeft.includes('today') || daysLeft.includes('1 day') || daysLeft.includes('2 days');

  return (
    <div className="relative group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Top Banner: Publication Source & Fit Score */}
      <div>
        <div className="px-5 pt-4 pb-3 border-b border-slate-800/60 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${getPubBadgeStyle(job.publicationSource)}`}>
              {job.publicationSource === 'LinkedIn' || job.publicationSource === 'VacancyMail Zimbabwe' ? (
                <Globe className="w-3.5 h-3.5" />
              ) : (
                <Newspaper className="w-3.5 h-3.5" />
              )}
              {job.publicationSource}
            </span>

            {job.isVerifiedReal && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Verified Live Job
              </span>
            )}
          </div>

          {/* Mechanical Fit Score */}
          <div className="flex items-center space-x-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Fit Score</span>
              <span className={`text-xs font-extrabold font-mono ${
                job.mechanicalFitScore >= 95 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {job.mechanicalFitScore}%
              </span>
            </div>
            <Award className={`w-4 h-4 ${job.mechanicalFitScore >= 95 ? 'text-emerald-400' : 'text-amber-400'}`} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          
          {/* Urgency / New Badges */}
          <div className="flex items-center space-x-2">
            {job.isNew && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Fresh 48h Listing
              </span>
            )}
            {job.isUrgent && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-400" />
                Urgent Notice
              </span>
            )}
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
              {job.subDiscipline}
            </span>
          </div>

          {/* Title & Company */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
              {job.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300">
              <span className="flex items-center gap-1 font-semibold text-slate-200">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {job.company}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                {job.location}
              </span>
            </div>
          </div>

          {/* Direct Verified Live Job URL Link */}
          {job.verifiedRealUrl && (
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5 truncate pr-2">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">Source: {job.publicationSource}</span>
              </span>
              <a
                href={job.verifiedRealUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0 underline underline-offset-2"
              >
                <span>View Real Post</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Fit Reasoning & Summary */}
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/60">
            <span className="text-emerald-400 font-medium">Why it matches: </span>
            {job.fitReasoning}
          </p>

          {/* Key Requirements Checklist */}
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{job.requirements.education}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{job.requirements.experienceYears}</span>
            </div>
            {job.requirements.professionalBody && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate text-amber-300/90 font-medium">{job.requirements.professionalBody}</span>
              </div>
            )}
          </div>

          {/* Technical Skills Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {job.requirements.technicalSkills.slice(0, 4).map((skill, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700/50"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Footer Actions & Deadlines */}
      <div className="p-5 pt-3 border-t border-slate-800/80 bg-slate-950/50 space-y-3">
        
        {/* Deadline and Clipping Link */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className={`w-3.5 h-3.5 ${isClosingSoon ? 'text-red-400' : 'text-slate-400'}`} />
            <span className={`font-mono ${isClosingSoon ? 'text-red-300 font-bold' : 'text-slate-400'}`}>
              Deadline: {job.applicationDeadline} ({daysLeft})
            </span>
          </div>

          <button
            onClick={() => onViewClipping(job)}
            className="text-[11px] text-slate-400 hover:text-slate-200 underline underline-offset-2 flex items-center gap-1"
          >
            <Newspaper className="w-3 h-3" />
            Advert Copy
          </button>
        </div>

        {/* Action Buttons: Document Compilation & WhatsApp Alert */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          
          {/* Assist in Application & Compile Documents */}
          <button
            onClick={() => onDraftApplication(job)}
            className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/60 active:scale-95 transition"
            title="Compile full application dossier (cover letter, tailored CV, certified checklist, email)"
          >
            <FolderCheck className="w-4 h-4 text-slate-950" />
            <span>Compile Documents</span>
          </button>

          {/* Send WhatsApp Alert to Phone */}
          <button
            onClick={() => onSendWhatsAppAlert(job)}
            className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 hover:text-emerald-300 font-semibold text-xs sm:text-sm active:scale-95 transition"
            title="Send formatted alert to your WhatsApp phone"
          >
            <Send className="w-3.5 h-3.5" />
            <span>WhatsApp Alert</span>
          </button>

        </div>

      </div>

    </div>
  );
};
