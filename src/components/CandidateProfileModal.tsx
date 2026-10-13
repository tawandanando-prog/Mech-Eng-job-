import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building2, 
  Award, 
  Check, 
  Save, 
  MapPin,
  Wrench
} from 'lucide-react';
import { UserCandidateProfile } from '../types';

interface CandidateProfileModalProps {
  profile: UserCandidateProfile;
  onSaveProfile: (updated: UserCandidateProfile) => void;
  onClose: () => void;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  profile,
  onSaveProfile,
  onClose,
}) => {
  const [formData, setFormData] = useState<UserCandidateProfile>(profile);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !formData.primarySkills.includes(newSkillInput.trim())) {
      setFormData({
        ...formData,
        primarySkills: [...formData.primarySkills, newSkillInput.trim()]
      });
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      primarySkills: formData.primarySkills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Mechanical Candidate Profile
              </h2>
              <p className="text-xs text-slate-400">
                Customizes all 1-click drafted application letters & WhatsApp alerts
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          
          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Tawanda Nando, Eng."
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">WhatsApp Alert Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:ring-2 focus:ring-emerald-500"
                placeholder="+263 77 440 8617"
              />
            </div>
          </div>

          {/* Email & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
                placeholder="tawandanando@gmail.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Location in Zimbabwe</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
                placeholder="Harare, Zimbabwe"
              />
            </div>
          </div>

          {/* Degree & University */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Degree Qualification</label>
              <input
                type="text"
                required
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
                placeholder="B.Sc. (Hons) Mechanical Engineering"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">University / Institution</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
                placeholder="University of Zimbabwe (UZ) / NUST"
              />
            </div>
          </div>

          {/* Experience Years & ZIE Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Years of Experience</label>
              <input
                type="number"
                min="0"
                max="35"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">ZIE / ECZ Registration Status</label>
              <select
                value={formData.zieStatus}
                onChange={(e) => setFormData({ ...formData, zieStatus: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Corporate Member (Chartered / Pr.Eng)">Corporate Member (Chartered / Pr.Eng)</option>
                <option value="Graduate Member">Graduate Member (ZIE)</option>
                <option value="Candidate Engineer">Candidate Engineer (ECZ)</option>
                <option value="Student Member">Student Member</option>
              </select>
            </div>
          </div>

          {/* Primary Mechanical Skills Tags */}
          <div className="space-y-2 pt-1">
            <label className="font-semibold text-slate-300">Key Mechanical Competencies</label>
            <div className="flex flex-wrap gap-1.5">
              {formData.primarySkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs flex items-center gap-1.5"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add mechanical skill (e.g. Slurry Pumps, Turbines, SolidWorks)..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Candidate Bio */}
          <div className="space-y-1.5 pt-1">
            <label className="font-semibold text-slate-300">Professional Summary Bio</label>
            <textarea
              rows={3}
              value={formData.summaryBio}
              onChange={(e) => setFormData({ ...formData, summaryBio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs leading-relaxed focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Actions */}
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
              <Save className="w-4 h-4" />
              <span>{savedFeedback ? 'Saved!' : 'Save Credentials'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
