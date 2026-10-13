import React from 'react';
import { X, Newspaper, Building2, MapPin, Calendar, ExternalLink, Send, Sparkles } from 'lucide-react';
import { JobListing } from '../types';

interface PressClippingModalProps {
  job: JobListing;
  onDraftApplication: (job: JobListing) => void;
  onSendWhatsApp: (job: JobListing) => void;
  onClose: () => void;
}

export const PressClippingModal: React.FC<PressClippingModalProps> = ({
  job,
  onDraftApplication,
  onSendWhatsApp,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-stone-200">
              Publication Advert Clipping Archive
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Newspaper Style Clipping Paper Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-950 flex flex-col items-center">
          
          <div className="w-full max-w-lg bg-[#faf8f2] text-stone-900 p-6 sm:p-8 rounded-lg shadow-2xl border-4 border-stone-400 font-serif space-y-4">
            
            {/* Newspaper Masthead */}
            <div className="border-b-2 border-stone-900 pb-2 text-center space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-stone-600 font-sans font-bold flex justify-between">
                <span>CLASSIFIED VACANCIES</span>
                <span>VOL. CXXVI NO. 284</span>
                <span>HARARE, ZIMBABWE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900 border-y border-stone-800 py-1">
                {job.publicationSource}
              </h1>
              <div className="text-[10px] text-stone-600 font-sans italic flex justify-between pt-0.5">
                <span>{job.publicationIssueDate}</span>
                <span>APPOINTMENTS & OFFICIAL NOTICES</span>
                <span>Page B-4</span>
              </div>
            </div>

            {/* Clipping Content */}
            <div className="space-y-3 pt-2">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase font-sans font-bold px-2 py-0.5 bg-stone-900 text-white inline-block">
                  VACANCY NOTICE
                </span>
                <h2 className="text-lg font-bold uppercase tracking-tight text-stone-900">
                  {job.title}
                </h2>
                <p className="text-xs font-bold text-stone-700">
                  {job.company.toUpperCase()} — {job.location.toUpperCase()}
                </p>
              </div>

              <div className="text-xs text-stone-800 leading-relaxed text-justify border-y border-stone-300 py-3 space-y-2 font-serif">
                <p>
                  Applications are invited from suitably qualified, experienced, and motivated Zimbabwean citizens for the above position within our operations.
                </p>
                
                <p className="font-sans text-[11px] font-bold text-stone-900 uppercase">
                  Duties & Key Performance Areas:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[11px] font-sans">
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <p className="font-sans text-[11px] font-bold text-stone-900 uppercase pt-1">
                  Minimum Qualifications & Experience:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[11px] font-sans">
                  <li>{job.requirements.education}</li>
                  <li>{job.requirements.experienceYears}</li>
                  {job.requirements.professionalBody && (
                    <li>{job.requirements.professionalBody}</li>
                  )}
                  <li>Skills: {job.requirements.technicalSkills.join(', ')}</li>
                </ul>

                <p className="pt-2 font-sans text-[11px] text-stone-900">
                  <strong>How to Apply:</strong> Interested candidates submitting applications with detailed Curriculum Vitae, certified copies of academic transcripts and professional certificates should forward documents by <strong>{job.applicationDeadline}</strong>.
                </p>

                {job.contactInfo.email && (
                  <p className="font-mono text-xs font-bold text-stone-950">
                    Email: {job.contactInfo.email}
                  </p>
                )}
                {job.contactInfo.referenceCode && (
                  <p className="font-sans text-[11px] font-semibold text-stone-700">
                    Quote Reference: {job.contactInfo.referenceCode}
                  </p>
                )}
              </div>

              <div className="text-[10px] text-stone-500 font-sans text-center pt-1">
                ZimMech Digital Clipping Verification • Match Score: {job.mechanicalFitScore}%
              </div>
            </div>

          </div>

        </div>

        {/* Action Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-400">
            Source: <strong>{job.publicationSource}</strong>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onSendWhatsApp(job);
              }}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp Alert</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onDraftApplication(job);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Draft 1-Click Application</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
