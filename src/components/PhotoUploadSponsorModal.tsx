import React, { useState, useEffect, useRef } from 'react';
import { SPONSOR_URL } from '../config/siteConfig';
import { Camera, ExternalLink, X, Lock, CheckCircle2 } from 'lucide-react';

interface PhotoUploadSponsorModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export const PhotoUploadSponsorModal: React.FC<PhotoUploadSponsorModalProps> = ({
  isOpen,
  onComplete,
  onClose,
}) => {
  const [countdown, setCountdown] = useState<number>(10);
  const [newTabBlocked, setNewTabBlocked] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const autoTriggeredRef = useRef<boolean>(false);

  // Initialize countdown and open sponsor URL when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(10);
      setIsCompleted(false);
      autoTriggeredRef.current = false;
      setNewTabBlocked(false);

      // Open sponsor URL in a new tab immediately
      try {
        const win = window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          setNewTabBlocked(true);
        }
      } catch {
        setNewTabBlocked(true);
      }
    }
  }, [isOpen]);

  // Full 10-second countdown interval (10, 9, 8, 7, 6, 5, 4, 3, 2, 1)
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // When countdown hits exactly 0, mark completed and attempt auto-open photo picker if allowed by browser
  useEffect(() => {
    if (isOpen && countdown === 0 && !autoTriggeredRef.current) {
      setIsCompleted(true);
      autoTriggeredRef.current = true;
      try {
        onComplete();
      } catch {
        // If browser blocks programmatic file open without direct touch, the enabled button is ready
      }
    }
  }, [countdown, isOpen, onComplete]);

  if (!isOpen) return null;

  const handleManualProceed = () => {
    if (countdown > 0) return;
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-[#160e0a] border border-[#c59b27]/45 rounded-2xl p-6 sm:p-7 shadow-2xl text-center text-[#f5ebd7] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-ad-modal-title"
      >
        {/* Subtle vintage corner ornaments */}
        <div className="absolute top-2.5 left-2.5 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute top-2.5 right-2.5 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute bottom-2.5 left-2.5 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute bottom-2.5 right-2.5 text-[#c59b27]/30 text-xs font-serif pointer-events-none">✦</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-[#9e8362] hover:text-[#f5ebd7] p-1.5 rounded-full hover:bg-[#2a1b14] transition-colors cursor-pointer"
          aria-label="বাতিল করুন"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Clear "10 sec ad" label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7a1c24]/80 border border-[#c59b27]/40 text-[#fcedc7] text-xs font-bold font-serif mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#fcedc7] animate-ping" />
          <span className="tracking-wider uppercase">10 sec ad</span>
        </div>

        <h3 id="photo-ad-modal-title" className="text-lg sm:text-xl font-serif font-bold text-[#f7efe1] mb-1">
          কাস্টম ছবি নির্বাচন
        </h3>
        <p className="text-xs text-[#c5b29c] font-serif leading-relaxed mb-5">
          স্পনসর বিজ্ঞাপন নতুন ট্যাবে খোলা হয়েছে। অনুগ্রহ করে কাউন্টডাউন শেষ হওয়া পর্যন্ত অপেক্ষা করুন।
        </p>

        {/* 10-Second Countdown Display (10 -> 9 -> ... -> 1) */}
        <div className="relative w-28 h-28 mx-auto mb-5 flex items-center justify-center">
          {/* Animated SVG Ring */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#261710"
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
              strokeDashoffset={264 - (264 * (10 - countdown)) / 10}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Central Countdown Number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {countdown > 0 ? (
              <>
                <span className="text-4xl font-serif font-bold text-[#e8ba62] tracking-tight">
                  {countdown}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#9e8362] font-mono">
                  সেকেন্ড বাকি
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-9 h-9 text-[#4ade80] mb-0.5" />
                <span className="text-[9px] uppercase tracking-widest text-[#4ade80] font-serif font-bold">
                  প্রস্তুত
                </span>
              </>
            )}
          </div>
        </div>

        {/* Sponsor Tab Link if pop-up was blocked */}
        {newTabBlocked && (
          <div className="text-xs text-[#a88f72] font-serif mb-4 flex items-center justify-center gap-1.5">
            <span>স্পনসর পেজ খুলুন:</span>
            <a
              href={SPONSOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e8ba62] underline hover:text-[#ffd899] inline-flex items-center gap-1"
            >
              <span>ক্লিক করুন</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Action Button: Disabled during 10 seconds, Enabled after exactly 10 seconds */}
        <div className="mt-2 space-y-2">
          {countdown > 0 ? (
            <button
              type="button"
              disabled
              className="w-full py-3 px-4 rounded-lg bg-[#241913] text-[#827161] border border-[#3e2b20] flex items-center justify-center gap-2 cursor-not-allowed text-xs sm:text-sm font-serif font-medium"
            >
              <Lock className="w-4 h-4 text-[#827161]" />
              <span>ছবি নির্বাচন আনলক হচ্ছে ({countdown}s)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleManualProceed}
              className="w-full py-3 px-4 rounded-lg bg-[#7a1c24] hover:bg-[#92232c] text-[#fcedc7] font-serif font-bold border border-[#c59b27]/60 shadow-lg shadow-[#7a1c24]/30 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm animate-pulse"
            >
              <Camera className="w-4 h-4" />
              <span>📷 ছবি নির্বাচন করুন</span>
            </button>
          )}

          <div className="text-[10px] text-[#8e7456] font-serif pt-1">
            * আপনার ছবি সম্পূর্ণ সুরক্ষিত থাকবে এবং ব্রাউজার থেকেই প্রসেস হবে।
          </div>
        </div>
      </div>
    </div>
  );
};
