import React, { useState } from 'react';
import { Menu, X, Search, Heart, Sparkles } from 'lucide-react';

export type NavPage =
  | 'home'
  | 'postcards'
  | 'quotes'
  | 'gallery'
  | 'categories'
  | 'favorites'
  | 'generator';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenSearch: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  favoritesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: NavPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Postcards', page: 'postcards' },
    { label: 'Quotes', page: 'quotes' },
    { label: 'Vintage Gallery', page: 'gallery' },
    { label: 'Categories', page: 'categories' },
  ];

  const handleLinkClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#120d0a]/95 backdrop-blur-md border-b border-[#c59b27]/25 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand / Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-110">
              💌
            </span>
            <div>
              <span className="text-lg sm:text-xl font-serif font-bold text-[#f7efe1] tracking-wide group-hover:text-[#e8ba62] transition-colors">
                Postlovebd
              </span>
              <span className="hidden sm:block text-[9px] text-[#c59b27] tracking-widest uppercase font-serif">
                VINTAGE ARCHIVE
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`px-3 py-1.5 rounded-md text-sm font-serif transition-colors cursor-pointer ${
                  currentPage === item.page
                    ? 'text-[#e8ba62] bg-[#271911] font-semibold border border-[#c59b27]/30'
                    : 'text-[#d6c2a8] hover:text-[#f7efe1] hover:bg-[#1d140e]'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Favorites Link */}
            <button
              onClick={() => handleLinkClick('favorites')}
              className={`relative px-3 py-1.5 rounded-md text-sm font-serif transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'favorites'
                  ? 'text-[#e63946] bg-[#271911] font-semibold border border-[#e63946]/40'
                  : 'text-[#d6c2a8] hover:text-[#f7efe1] hover:bg-[#1d140e]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#e63946]" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-[#7a1c24] text-[#fff0d9] rounded-full font-mono font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#d6c2a8] hover:text-[#e8ba62] hover:bg-[#20150f] rounded-full border border-transparent hover:border-[#c59b27]/25 transition-colors cursor-pointer"
              aria-label="অনুসন্ধান"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Primary CTA: Create Postcard */}
            <button
              onClick={() => handleLinkClick('generator')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#851c24] to-[#a32631] hover:from-[#9e2732] hover:to-[#b7303d] text-[#fff5e3] font-serif text-xs sm:text-sm font-bold shadow-lg shadow-[#7a1c24]/20 border border-[#d4af37]/40 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e8ba62]" />
              <span>✨ Create Postcard</span>
            </button>
          </div>

          {/* Mobile hamburger menu & search */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#d6c2a8] hover:text-[#e8ba62]"
              aria-label="অনুসন্ধান"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#d6c2a8] hover:text-[#f7efe1] focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#18110c] border-b border-[#c59b27]/30 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleLinkClick(item.page)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-serif ${
                currentPage === item.page
                  ? 'text-[#e8ba62] bg-[#291b13] font-bold border-l-2 border-[#c59b27]'
                  : 'text-[#d6c2a8] hover:bg-[#20150e]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => handleLinkClick('favorites')}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm font-serif flex items-center justify-between text-[#d6c2a8]"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#e63946]" />
              <span>Favorites</span>
            </div>
            {favoritesCount > 0 && (
              <span className="text-xs px-2 py-0.5 bg-[#7a1c24] text-white rounded-full font-mono">
                {favoritesCount}
              </span>
            )}
          </button>

          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('generator')}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#851c24] to-[#a32631] text-[#fff5e3] font-serif font-bold text-center border border-[#d4af37]/40 flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#e8ba62]" />
              <span>✨ Create Postcard</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
