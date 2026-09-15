import React, { useState, useEffect } from 'react';
import { PostcardTemplate } from '../types';
import { SPONSOR_URL } from '../config/siteConfig';
import { Sparkles, ExternalLink, X, ArrowRight } from 'lucide-react';

interface PostcardUseCountdownModalProps {
  template: PostcardTemplate | null;
  isOpen: boolean;
  onComplete: (template: PostcardTemplate) => void;
  onClose: () => void;
}

export const PostcardUseCountdownModal: React.FC<PostcardUseCountdownModalProps> = ({
  template,
  isOpen,
  onComplete,
  onClose,
}) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [newTabBlocked, setNewTabBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !template) {
      setCountdown(5);
      setNewTabBlocked(false);
      return;
    }

    // Attempt to open sponsor link in a new tab immediately upon opening
    try {
      const openedWindow = window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
      if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
        setNewTabBlocked(true);
      } else {
        setNewTabBlocked(false);
      }
    } catch {
      setNewTabBlocked(true);
    }

    setCountdown(5);

    // 5-second countdown timer: 5 -> 4 -> 3 -> 2 -> 1 -> Automatically Complete
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Automatically transition to Generator with selected template
          onComplete(template);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, template, onComplete]);

  if (!isOpen || !template) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-[#160e0a] border border-[#c59b27]/45 rounded-2xl p-6 sm:p-7 shadow-2xl text-center text-[#f5ebd7] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="countdown-modal-title"
      >
        {/* Subtle decorative gold vintage corner ornaments */}
        <div className="absolute top-2 left-2 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute top-2 right-2 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute bottom-2 left-2 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute bottom-2 right-2 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>

        {/* Close / Skip Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-[#9e8362] hover:text-[#f5ebd7] p-1.5 rounded-full hover:bg-[#2a1b14] transition-colors cursor-pointer"
          aria-label="বাতিল করুন"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Postcard Context Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#271911] border border-[#c59b27]/35 text-[#e8ba62] text-xs font-serif mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px]">{template.title}</span>
        </div>

        <h3 id="countdown-modal-title" className="text-lg sm:text-xl font-serif font-bold text-[#f7efe1] mb-1">
          পোস্টকার্ডটি তৈরি হচ্ছে
        </h3>
        <p className="text-xs text-[#c5b29c] font-serif leading-relaxed mb-6">
          জেনারেটরে আপনার পোস্টকার্ডটি স্বয়ংক্রিয়ভাবে লোড হচ্ছে...
        </p>

        {/* 5-Second Countdown Display (5 -> 4 -> 3 -> 2 -> 1) */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          {/* Animated SVG Ring */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#28170f"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#c59b27"
              strokeWidth="6"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * (5 - countdown)) / 5}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Central Countdown Number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#e8ba62] tracking-tight animate-in zoom-in-50 duration-200">
              {countdown > 0 ? countdown : '✓'}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#9e8362] font-mono">
              সেকেন্ড
            </span>
          </div>
        </div>

        {/* Sponsor Tab Notice & Direct Fallback */}
        <div className="text-xs text-[#a88f72] font-serif mb-4 flex flex-col items-center gap-1.5">
          <div className="flex items-center justify-center gap-1">
            <span>স্পনসর পেজ নতুন ট্যাবে খোলা হচ্ছে</span>
            <ExternalLink className="w-3 h-3 text-[#c59b27]" />
          </div>

          {newTabBlocked && (
            <a
              href={SPONSOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#e8ba62] underline hover:text-[#ffd899] mt-0.5"
            >
              ব্রাউজার নতুন ট্যাব আটকে দিলে এখানে ক্লিক করুন
            </a>
          )}
        </div>

        {/* Instant Skip / Direct Access Option (Non-blocking user convenience) */}
        <div className="pt-2 border-t border-[#c59b27]/15">
          <button
            onClick={() => onComplete(template)}
            className="text-xs text-[#9e8362] hover:text-[#e8ba62] transition-colors flex items-center justify-center gap-1 mx-auto font-serif cursor-pointer"
          >
            <span>সরাসরি জেনারেটরে যান</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
