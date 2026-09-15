import React, { useState, useEffect } from 'react';
import { SPONSOR_URL, SITE_CONFIG } from '../config/siteConfig';
import { ExternalLink, Lock, CheckCircle2, Download, AlertCircle, X } from 'lucide-react';

interface SponsorGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: () => void;
  fileFormat: 'png' | 'jpg';
}

export const SponsorGateModal: React.FC<SponsorGateModalProps> = ({
  isOpen,
  onClose,
  onConfirmDownload,
  fileFormat,
}) => {
  const [hasClickedSponsor, setHasClickedSponsor] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(SITE_CONFIG.sponsorCountdownSeconds);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [popupBlocked, setPopupBlocked] = useState<boolean>(false);

  // Reset state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setHasClickedSponsor(false);
      setCountdown(SITE_CONFIG.sponsorCountdownSeconds);
      setIsReady(false);
      setPopupBlocked(false);
    }
  }, [isOpen]);

  // Countdown timer when sponsor clicked
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasClickedSponsor && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsReady(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [hasClickedSponsor, countdown]);

  if (!isOpen) return null;

  const handleOpenSponsor = () => {
    setPopupBlocked(false);
    try {
      const newWin = window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        setPopupBlocked(true);
      }
    } catch {
      setPopupBlocked(true);
    }
    setHasClickedSponsor(true);
  };

  const handleDownloadClick = () => {
    if (!isReady) return;
    onConfirmDownload();
  };

  const formatCountdown = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#160e0a] border border-[#c59b27]/40 rounded-xl p-6 sm:p-8 shadow-2xl text-center text-[#f5ebd7] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sponsor-modal-title"
      >
        {/* Ornate corner embellishments */}
        <div className="absolute top-2 left-2 text-[#c59b27]/40 text-xs font-serif">✦</div>
        <div className="absolute top-2 right-2 text-[#c59b27]/40 text-xs font-serif">✦</div>
        <div className="absolute bottom-2 left-2 text-[#c59b27]/40 text-xs font-serif">✦</div>
        <div className="absolute bottom-2 right-2 text-[#c59b27]/40 text-xs font-serif">✦</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#d8c19d]/70 hover:text-[#f5ebd7] p-1.5 rounded-full hover:bg-[#281811] transition-colors"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <span className="text-3xl sm:text-4xl block mb-2">💌</span>
          <h3 id="sponsor-modal-title" className="text-xl sm:text-2xl font-serif text-[#f2e2c4] font-bold tracking-wide">
            আপনার পোস্টকার্ড প্রস্তুত
          </h3>
          <p className="text-xs text-[#c59b27] uppercase tracking-widest mt-1 font-serif">
            POSTCARD READY • {fileFormat.toUpperCase()} HD
          </p>
        </div>

        {/* Body Text */}
        <p className="text-sm text-[#d6c2a8] leading-relaxed mb-6 font-sans">
          আপনার Vintage Postcard প্রস্তুত হয়েছে। ডাউনলোড চালু করার আগে Sponsor Page দেখুন এবং কয়েক সেকেন্ড অপেক্ষা করুন।
        </p>

        {/* Popup blocker notice */}
        {popupBlocked && (
          <div className="mb-4 p-3 rounded-lg bg-[#2d1416] border border-[#a32631]/40 text-xs text-[#f7c8cc] flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#e65c69] mt-0.5" />
            <div>
              <span>ব্রাউজারে পপ-আপ ব্লক হয়ে থাকতে পারে। স্পন্সর পেজটি সরাসরি দেখতে নিচের বাটনে ক্লিক করুন:</span>
              <a
                href={SPONSOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1 underline text-[#ffb4bc] hover:text-white font-medium"
              >
                স্পন্সর পেজ খুলুন (ম্যানুয়াল লিংক)
              </a>
            </div>
          </div>
        )}

        {/* Flow State */}
        {!hasClickedSponsor ? (
          <div className="space-y-4">
            <button
              onClick={handleOpenSponsor}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#851c24] via-[#9e2732] to-[#851c24] hover:from-[#9e2732] hover:to-[#b3333f] text-[#fff4e0] font-semibold rounded-lg shadow-lg shadow-[#851c24]/20 border border-[#d4af37]/40 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <span>👁️</span>
              <span>Sponsor দেখুন</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </button>

            <div className="py-2 text-xs text-[#9d7d54] italic font-serif">
              * Sponsor ক্লিক করলে ৮ সেকেন্ডের ডাউনলোড কাউন্টডাউন শুরু হবে
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Countdown / Ready Display */}
            <div className="py-4 px-6 rounded-lg bg-[#221610] border border-[#c59b27]/30 flex flex-col items-center justify-center">
              {!isReady ? (
                <>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-[#e8ba62] tracking-wider mb-1">
                    {formatCountdown(countdown)}
                  </div>
                  <div className="text-xs text-[#cbb290] flex items-center gap-1.5 font-serif">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#e8ba62] animate-ping" />
                    <span>Download প্রস্তুত হচ্ছে...</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-[#4ade80] text-xl font-serif font-bold">
                    <CheckCircle2 className="w-6 h-6 text-[#4ade80]" />
                    <span>✓ READY</span>
                  </div>
                  <span className="text-xs text-[#bda282] mt-0.5">এখন আপনার HD পোস্টকার্ড ডাউনলোড করুন</span>
                </div>
              )}
            </div>

            {/* Download Button Locked vs Ready */}
            {!isReady ? (
              <button
                disabled
                className="w-full py-3.5 px-6 bg-[#251b15] text-[#8e7b68] rounded-lg border border-[#4a3424] flex items-center justify-center gap-2 cursor-not-allowed text-sm font-medium"
              >
                <Lock className="w-4 h-4 text-[#8e7b68]" />
                <span>🔒 Download Locked</span>
              </button>
            ) : (
              <button
                onClick={handleDownloadClick}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#2e7d32] to-[#388e3c] hover:from-[#388e3c] hover:to-[#43a047] text-white font-bold rounded-lg shadow-lg shadow-green-950/40 border border-[#81c784]/40 transition-all flex items-center justify-center gap-2 cursor-pointer text-base animate-pulse"
              >
                <Download className="w-5 h-5" />
                <span>⬇️ DOWNLOAD NOW ({fileFormat.toUpperCase()})</span>
              </button>
            )}

            <button
              onClick={handleOpenSponsor}
              className="text-xs text-[#bfa044] hover:text-[#e8c668] underline font-serif transition-colors"
            >
              আবার Sponsor খুলুন
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 pt-3 border-t border-[#c59b27]/20 text-[11px] text-[#8e7456] font-serif">
          পোস্টকার্ডে কোনো ওয়াটারমার্ক ছাড়াই সম্পূর্ণ ফ্রি এবং HD কোয়ালিটিতে সংরক্ষিত হবে।
        </div>
      </div>
    </div>
  );
};
