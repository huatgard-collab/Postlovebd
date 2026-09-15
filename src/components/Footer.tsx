import React from 'react';
import { NavPage } from './Navbar';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-[#c59b27]/25 bg-[#0e0a07] text-[#c5b29b] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Brand & Tagline */}
          <div className="max-w-md">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-2xl">💌</span>
              <span className="text-xl font-serif font-bold text-[#f7efe1] tracking-wide">
                Postlovebd
              </span>
            </div>
            <p className="text-sm font-serif italic text-[#dfc4a2] leading-relaxed">
              “পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য।”
            </p>
            <p className="text-xs text-[#8c7458] mt-2 leading-normal">
              একটি ডিজিটাল আর্কাইভ ও ভিন্টেজ রোমান্টিক পোস্টকার্ড জেনারেটর। ভালোবাসার অনুভূতিগুলো খামে বন্দি করে ছড়িয়ে দিন প্রিয়জনের ঠিকানায়।
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-serif">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#e8ba62] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('postcards')}
              className="hover:text-[#e8ba62] transition-colors"
            >
              Postcards
            </button>
            <button
              onClick={() => onNavigate('quotes')}
              className="hover:text-[#e8ba62] transition-colors"
            >
              Quotes
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="hover:text-[#e8ba62] transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className="hover:text-[#e8ba62] transition-colors"
            >
              Categories
            </button>
            <span className="text-[#554030]">|</span>
            <span className="text-[#887057] cursor-pointer hover:text-[#d6c2a8]">Privacy Policy</span>
            <span className="text-[#887057] cursor-pointer hover:text-[#d6c2a8]">Terms</span>
            <span className="text-[#887057] cursor-pointer hover:text-[#d6c2a8]">Contact</span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-[#c59b27]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#83694f] gap-3 font-serif">
          <div>© 2026 Postlovebd. All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Crafted with vintage love in Bangladesh</span>
            <Heart className="w-3 h-3 text-[#a32631] fill-[#a32631]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
