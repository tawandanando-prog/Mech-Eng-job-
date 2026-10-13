import { JobListing } from '../types';

export function formatWhatsAppJobMessage(job: JobListing, candidateName?: string): string {
  const urgency = job.isUrgent ? '🔥 *URGENT VACANCY*' : '📌 *NEW VACANCY*';
  
  return `🚨 *ZIMMECH JOB ALERT* 🇿🇼\n` +
    `${urgency}: ${job.publicationSource}\n\n` +
    `🔧 *Position:* ${job.title}\n` +
    `🏢 *Company:* ${job.company}\n` +
    `📍 *Location:* ${job.location}\n` +
    `⚡ *Mechanical Fit:* ${job.mechanicalFitScore}% Match\n` +
    `📅 *Published:* ${job.publicationIssueDate}\n` +
    `⏳ *Closing Date:* ${job.applicationDeadline}\n\n` +
    `📋 *Key Requirements:*\n` +
    `• ${job.requirements.education}\n` +
    `• ${job.requirements.experienceYears}\n` +
    (job.requirements.professionalBody ? `• ${job.requirements.professionalBody}\n` : '') +
    `\n` +
    (job.contactInfo.email ? `✉️ *Email Application:* ${job.contactInfo.email}\n` : '') +
    (job.contactInfo.whatsApp ? `📱 *Recruiter WhatsApp:* ${job.contactInfo.whatsApp}\n` : '') +
    (job.contactInfo.referenceCode ? `🏷️ *Ref:* ${job.contactInfo.referenceCode}\n` : '') +
    `\n💡 *Action:* Tap ZimMech JobRadar to generate your 1-click tailored application letter!`;
}

export function createWhatsAppDirectUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function getRelativeTime(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
