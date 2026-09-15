import React from 'react';
import { PostcardTemplate, CategoryItem } from '../types';
import { categories } from '../data/categories';
import { postcards } from '../data/postcards';
import { VintageCardView } from '../components/VintageCardView';
import { PostcardCanvas } from '../components/PostcardCanvas';
import { Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  onSelectCategory: (categoryName: string) => void;
  onNavigateToGallery: () => void;
  onNavigateToGenerator: () => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectPostcard,
  onSelectCategory,
  onNavigateToGallery,
  onNavigateToGenerator,
  favoriteIds,
  onToggleFavorite,
}) => {
  // Hero interactive sample state
  const heroSamplePostcard = postcards[0]; // Rainy Love

  // Featured collections
  const popularCards = postcards.filter((p) => p.collection === 'popular').slice(0, 4);
  const newCards = postcards.filter((p) => p.collection === 'new').slice(0, 4);
  const romanticCards = postcards.filter((p) => p.collection === 'romantic').slice(0, 4);
  const rainyCards = postcards.filter((p) => p.collection === 'rainy').slice(0, 4);
  const letterCards = postcards.filter((p) => p.collection === 'letter').slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative pt-6 pb-8 sm:pt-12 sm:pb-16 overflow-hidden">
        {/* Subtle warm glow behind hero */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#c59b27]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#7a1c24]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241710] border border-[#c59b27]/30 text-xs font-serif text-[#e8ba62] shadow-xs">
                <span>💌</span>
                <span>ডিজিটাল ভিন্টেজ পোস্টকার্ড আর্কাইভ</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-bold text-[#f9f2e4] leading-[1.25] tracking-tight">
                “পুরনো দিনের অনুভূতি, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8ba62] via-[#f7ebd4] to-[#c59b27]">
                  আজকের ভালোবাসার জন্য।”
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#d4c0a8] font-serif leading-relaxed max-w-xl mx-auto lg:mx-0">
                আপনার প্রিয় মানুষটির জন্য তৈরি করুন একটি সুন্দর Vintage Postcard। পছন্দের ডিজাইন ও প্রেমের উক্তি নির্বাচন করুন, নিজের মিষ্টি লেখা যোগ করুন এবং HD কোয়ালিটিতে ডাউনলোড করুন।
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onNavigateToGenerator}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#851c24] via-[#9e2732] to-[#851c24] hover:from-[#9e2732] hover:to-[#ba323f] text-[#fff4e0] font-serif font-bold text-sm sm:text-base shadow-xl shadow-[#7a1c24]/30 border border-[#d4af37]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#e8ba62]" />
                  <span>✨ পোস্টকার্ড তৈরি করুন</span>
                </button>

                <button
                  onClick={onNavigateToGallery}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#221610] hover:bg-[#2e1d15] text-[#ecd9bf] hover:text-[#fff] font-serif text-sm sm:text-base border border-[#c59b27]/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-[#c59b27]" />
                  <span>🖼️ Vintage Gallery দেখুন</span>
                </button>
              </div>

              {/* Trust/Feature Pills */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#a88f72] font-serif">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#c59b27]">✓</span>
                  <span>কোনো লগইন ছাড়াই ফ্রি</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#c59b27]">✓</span>
                  <span>HD রেজল্যুশন ডাউনলোড</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#c59b27]">✓</span>
                  <span>সোশ্যাল মিডিয়া সাইজ</span>
                </div>
              </div>
            </div>

            {/* Right Realistic Postcard Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg group">
                {/* Vintage postal stamp envelope decoration background */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#c59b27]/20 via-[#7a1c24]/20 to-[#c59b27]/20 blur-xl opacity-60 group-hover:opacity-85 transition-opacity" />

                <div className="relative transform hover:scale-[1.01] transition-transform duration-300">
                  <PostcardCanvas
                    customState={{
                      templateId: heroSamplePostcard.id,
                      recipient: 'প্রিয়তমা,',
                      message: heroSamplePostcard.defaultQuote,
                      sender: 'ইতি, তোমার সুজন',
                      date: '১৬ই শ্রাবণ, ঢাকা',
                      style: heroSamplePostcard.style,
                      border: heroSamplePostcard.border,
                      effect: 'sepia',
                      exportRatio: 'postcard',
                      showStamp: true,
                      showPostmark: true,
                      showAirmailStripe: true,
                    }}
                  />

                  {/* Floating Action Badge on Postcard */}
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      onClick={() => onSelectPostcard(heroSamplePostcard)}
                      className="px-4 py-2 rounded-full bg-[#1b120c]/90 backdrop-blur-md border border-[#c59b27]/40 text-xs text-[#ecd9bf] hover:text-[#f8ebd7] hover:border-[#c59b27] flex items-center gap-2 shadow-lg transition-all"
                    >
                      <span>এই পোস্টকার্ডটি এডিট করুন</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5ebd7] tracking-tight flex items-center gap-2">
              <span>ক্যাটাগরি বেছে নিন</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#b59e83] font-serif mt-1">
              যেকোনো ক্যাটাগরিতে ক্লিক করে প্রাসঙ্গিক পোস্টকার্ড ও রোমান্টিক উক্তি খুঁজে নিন
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat: CategoryItem) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="p-3.5 rounded-xl bg-[#1a120d] hover:bg-[#2d1b13] border border-[#c59b27]/25 hover:border-[#c59b27]/60 text-center transition-all group flex flex-col items-center justify-center cursor-pointer shadow-xs hover:-translate-y-1"
            >
              <span className="text-2xl mb-1.5 transition-transform group-hover:scale-125">
                {cat.icon}
              </span>
              <span className="text-xs sm:text-sm font-serif font-bold text-[#f2e2cb] group-hover:text-[#e8ba62] transition-colors line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#8e7456] mt-0.5">
                {cat.englishKey}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED SECTIONS */}
      {/* 1. জনপ্রিয় পোস্টকার্ড */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#c59b27]/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7efe1]">
              জনপ্রিয় পোস্টকার্ড
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('জনপ্রিয়')}
            className="text-xs font-serif text-[#c59b27] hover:text-[#f8d48d] flex items-center gap-1"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularCards.map((card) => (
            <VintageCardView
              key={card.id}
              template={card}
              isFavorite={favoriteIds.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* 2. নতুন পোস্টকার্ড */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#c59b27]/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7efe1]">
              নতুন পোস্টকার্ড
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('নতুন')}
            className="text-xs font-serif text-[#c59b27] hover:text-[#f8d48d] flex items-center gap-1"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newCards.map((card) => (
            <VintageCardView
              key={card.id}
              template={card}
              isFavorite={favoriteIds.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* 3. ❤️ Romantic Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#c59b27]/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">❤️</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7efe1]">
              Romantic Collection
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('রোমান্টিক')}
            className="text-xs font-serif text-[#c59b27] hover:text-[#f8d48d] flex items-center gap-1"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {romanticCards.map((card) => (
            <VintageCardView
              key={card.id}
              template={card}
              isFavorite={favoriteIds.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* 4. 🌧️ Rainy Love Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#c59b27]/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌧️</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7efe1]">
              Rainy Love Collection
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('বৃষ্টি')}
            className="text-xs font-serif text-[#c59b27] hover:text-[#f8d48d] flex items-center gap-1"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rainyCards.map((card) => (
            <VintageCardView
              key={card.id}
              template={card}
              isFavorite={favoriteIds.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* 5. 💌 Vintage Letter Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#c59b27]/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7efe1]">
              Vintage Letter Collection
            </h3>
          </div>
          <button
            onClick={() => onSelectCategory('প্রেমপত্র')}
            className="text-xs font-serif text-[#c59b27] hover:text-[#f8d48d] flex items-center gap-1"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {letterCards.map((card) => (
            <VintageCardView
              key={card.id}
              template={card}
              isFavorite={favoriteIds.includes(card.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
