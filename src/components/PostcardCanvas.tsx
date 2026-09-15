import React from 'react';
import { PostcardCustomState } from '../types';
import { PostcardArtwork } from './PostcardArtwork';
import { postcards } from '../data/postcards';

interface PostcardCanvasProps {
  customState: PostcardCustomState;
  innerRef?: React.Ref<HTMLDivElement>;
  scaleRatio?: number;
}

export const PostcardCanvas: React.FC<PostcardCanvasProps> = ({
  customState,
  innerRef,
}) => {
  const currentTemplate =
    postcards.find((p) => p.id === customState.templateId) || postcards[0];

  // Aspect ratio styling
  const getAspectRatioClasses = () => {
    switch (customState.exportRatio) {
      case 'square': // 1:1
        return 'aspect-square max-w-[540px]';
      case 'story': // 9:16
      case 'status': // 9:16
        return 'aspect-[9/16] max-w-[400px] min-h-[580px]';
      case 'facebook': // 4:5
        return 'aspect-[4/5] max-w-[480px]';
      case 'postcard': // 4:3
      default:
        return 'aspect-[4/3] max-w-[620px]';
    }
  };

  // Font family mapping
  const getFontFamilyClass = () => {
    switch (customState.style.fontFamily) {
      case 'Calligraphy':
        return 'font-calligraphy';
      case 'Elegant Bengali':
        return 'font-bengali-elegant';
      case 'Typewriter':
        return 'font-typewriter tracking-normal';
      case 'Classic':
        return 'font-classic';
      case 'Handwritten':
        return 'font-handwritten';
      case 'Old Newspaper':
        return 'font-old-newspaper';
      case 'Vintage Serif':
      default:
        return 'font-vintage-serif';
    }
  };

  // Alignment
  const getAlignmentClass = () => {
    switch (customState.style.alignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      case 'justify':
        return 'text-justify items-center';
      case 'center':
      default:
        return 'text-center items-center';
    }
  };

  // Position
  const getPositionClass = () => {
    switch (customState.style.position) {
      case 'top':
        return 'justify-start pt-3';
      case 'bottom':
        return 'justify-end pb-3';
      case 'center':
      default:
        return 'justify-center';
    }
  };

  // Vintage Effects Filter styling
  const getEffectFilterStyle = () => {
    switch (customState.effect) {
      case 'sepia':
        return { filter: 'sepia(0.5) contrast(1.05) brightness(0.96)' };
      case 'old-paper':
        return { filter: 'sepia(0.65) saturate(1.2) hue-rotate(-15deg)' };
      case 'faded':
        return { filter: 'contrast(0.85) brightness(1.05) saturate(0.75)' };
      case 'black-and-white':
        return { filter: 'grayscale(1) contrast(1.15) brightness(0.95)' };
      case 'warm-vintage':
        return { filter: 'sepia(0.3) saturate(1.25) contrast(1.08)' };
      case 'dust':
      case 'scratch':
      case 'film-grain':
      case 'coffee-stain':
        return { filter: 'sepia(0.2) contrast(1.02)' };
      case 'original':
      default:
        return {};
    }
  };

  // Border style classes
  const getBorderClasses = () => {
    switch (customState.border) {
      case 'ornate':
        return 'border-[6px] border-[#9c7b32] ring-2 ring-[#4a3014] ring-offset-2 ring-offset-[#f7efe1]';
      case 'vintage-post':
        return 'border-2 border-dashed border-[#8d6928] p-1';
      case 'double-gold':
        return 'border-4 border-double border-[#bfa044]';
      case 'antique-stamps':
        return 'border-[8px] border-[#382618] shadow-inner';
      case 'filigree':
        return 'border-2 border-[#b88c3a] outline outline-2 outline-offset-4 outline-[#79541a]';
      case 'classic':
      default:
        return 'border-2 border-[#b89535]';
    }
  };

  return (
    <div
      ref={innerRef}
      data-postcard-container="true"
      id="postcard-live-preview"
      style={getEffectFilterStyle()}
      className={`relative w-full ${getAspectRatioClasses()} mx-auto rounded-sm overflow-hidden bg-parchment shadow-2xl transition-all duration-300 select-none text-[#2b180d]`}
    >
      {/* Film grain / Vintage vignette layer */}
      <div className="absolute inset-0 pointer-events-none vintage-film-grain vintage-vignette z-30" />

      {/* Coffee stain or Dust effect overlays */}
      {customState.effect === 'coffee-stain' && (
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border-[10px] border-[#704214]/15 opacity-70 pointer-events-none z-20 blur-[0.5px]" />
      )}
      {(customState.effect === 'dust' || customState.effect === 'scratch') && (
        <div className="absolute inset-0 pointer-events-none z-20 opacity-30 bg-[radial-gradient(#5a391a_1px,transparent_1px)] bg-[size:16px_16px]" />
      )}

      {/* Inner Postcard Border & Padding */}
      <div className={`relative w-full h-full p-4 sm:p-6 flex flex-col ${getBorderClasses()} box-border z-10`}>
        {/* Top Header Row: Dhaka GPO postmark, Vintage Postage Stamp, Airmail Stripe */}
        <div className="flex items-center justify-between pb-2 border-b border-[#c59b27]/30 mb-2">
          {/* Left: Vintage Bangladesh Postmark / Airmail indicator */}
          <div className="flex items-center gap-2">
            {customState.showAirmailStripe && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] tracking-widest uppercase font-serif text-[#7a1c24] font-semibold border border-[#7a1c24]/50 px-1.5 py-0.5 rounded-xs">
                  PAR AVION
                </span>
                <span className="text-[10px] font-serif text-[#8f6d2b] hidden sm:inline">
                  POSTLOVEBD ARCHIVE
                </span>
              </div>
            )}
            {customState.date && (
              <div className="text-[11px] font-serif text-[#5a3a20] italic tracking-wide">
                {customState.date}
              </div>
            )}
          </div>

          {/* Right: Vintage Stamp & Postmark Seal */}
          <div className="flex items-center gap-2">
            {customState.showPostmark && (
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-dashed border-[#8d6227] flex flex-col items-center justify-center text-[7px] sm:text-[8px] font-serif text-[#78501c] rotate-[-12deg] opacity-80">
                <span>DHAKA</span>
                <span className="font-bold text-[9px]">G.P.O.</span>
                <span>1968</span>
              </div>
            )}
            {customState.showStamp && (
              <div className="w-10 h-12 sm:w-12 sm:h-14 bg-[#8b232c] border-2 border-dashed border-[#f4ebdc] shadow-sm flex flex-col items-center justify-center text-center p-1 rounded-xs rotate-3 text-[#fcedc7]">
                <span className="text-[7px] tracking-wider uppercase font-serif">POST</span>
                <span className="text-xs sm:text-sm">💌</span>
                <span className="text-[8px] font-bold mt-0.5">৳৫</span>
              </div>
            )}
          </div>
        </div>

        {/* Center Content: Split or Flow layout for Artwork & Romantic Text */}
        <div className="relative flex-1 flex flex-col md:flex-row gap-3 sm:gap-5 items-center overflow-hidden min-h-0">
          {/* Postcard Vintage Artwork Illustration */}
          <div className="w-full md:w-5/12 h-36 md:h-full shrink-0 rounded-xs overflow-hidden border border-[#b89535]/40 shadow-inner bg-[#231710]">
            <PostcardArtwork imageKey={currentTemplate.image} mood={currentTemplate.artworkMood} />
          </div>

          {/* Postcard Custom Text Layout */}
          <div
            className={`w-full md:w-7/12 flex-1 flex flex-col ${getPositionClass()} ${getAlignmentClass()} p-2 overflow-hidden`}
          >
            {/* Recipient / প্রাপক */}
            {customState.recipient && (
              <div className="text-xs sm:text-sm font-serif italic text-[#633e21] mb-1.5 font-medium tracking-wide">
                {customState.recipient}
              </div>
            )}

            {/* Main Quote / Message */}
            <p
              className={`leading-relaxed transition-all max-w-[95%] ${getFontFamilyClass()}`}
              style={{
                fontSize: `${customState.style.fontSize}px`,
                color: customState.style.color,
                fontWeight: customState.style.bold ? '700' : '400',
                fontStyle: customState.style.italic ? 'italic' : 'normal',
                letterSpacing: `${customState.style.letterSpacing || 0}px`,
                lineHeight: customState.style.lineHeight || 1.6,
              }}
            >
              {customState.message || currentTemplate.defaultQuote}
            </p>

            {/* Sender / প্রেরক */}
            {customState.sender && (
              <div className="text-xs sm:text-sm font-serif italic text-[#633e21] mt-2 font-medium tracking-wide">
                {customState.sender}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Vintage Postcard Footer Watermark / Registry Info */}
        <div className="mt-2 pt-1 border-t border-[#c59b27]/20 flex items-center justify-between text-[8px] sm:text-[9px] font-serif text-[#8f6d2b]/80">
          <span>💌 POSTLOVEBD • CARTE POSTALE</span>
          <span className="hidden sm:inline">সিরিয়াল নং: {customState.templateId.toUpperCase()}-BD</span>
          <span>পুরনো দিনের অনুভূতি</span>
        </div>
      </div>
    </div>
  );
};
