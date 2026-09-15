import React, { useState } from 'react';
import { categories } from '../data/categories';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { PostcardTemplate, RomanticQuote, CategoryItem } from '../types';
import { VintageCardView } from '../components/VintageCardView';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

interface CategoriesPageProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  onSelectQuote: (quote: RomanticQuote) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  initialCategory?: string;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onSelectPostcard,
  onSelectQuote,
  favoriteIds,
  onToggleFavorite,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || categories[0].name
  );

  const activeCategoryItem =
    categories.find((c) => c.name === selectedCategory) || categories[0];

  const categoryPostcards = postcards.filter(
    (p) =>
      p.category === selectedCategory ||
      p.tags?.includes(selectedCategory)
  );

  const categoryQuotes = quotes.filter(
    (q) => q.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pb-4">
        <div className="text-xs text-[#c59b27] uppercase font-serif tracking-widest mb-1">
          THEMED ARCHIVES
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f7efe1]">
          ক্যাটাগরি বেছে নিন
        </h1>
        <p className="text-xs sm:text-sm text-[#bda282] font-serif mt-2">
          আপনার মনের অনুভূতির সাথে মানানসই ক্যাটাগরি নির্বাচন করে পোস্টকার্ড ও প্রেমের চিরকুট ব্রাউজ করুন
        </p>
      </div>

      {/* Categories Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((c: CategoryItem) => {
          const isSelected = selectedCategory === c.name;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.name)}
              className={`p-3.5 rounded-xl border transition-all text-center flex flex-col items-center justify-center cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-[#7a1c24] text-white border-[#d4af37]/60 ring-2 ring-[#c59b27]/40 transform -translate-y-1'
                  : 'bg-[#1a120d] text-[#e3d0ba] hover:bg-[#281810] border-[#c59b27]/25 hover:border-[#c59b27]/50'
              }`}
            >
              <span className="text-2xl mb-1">{c.icon}</span>
              <span className="text-xs sm:text-sm font-serif font-bold line-clamp-1">
                {c.name}
              </span>
              <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#ffd899]' : 'text-[#8e7456]'}`}>
                {c.englishKey}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Header Banner */}
      <div className="p-5 rounded-xl bg-[#20140d] border border-[#c59b27]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{activeCategoryItem.icon}</span>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#f7efe1]">
              {activeCategoryItem.name} ({activeCategoryItem.englishKey})
            </h2>
            <p className="text-xs text-[#bda282] font-serif mt-0.5">
              {activeCategoryItem.description || 'এই ক্যাটাগরির সমস্ত পোস্টকার্ড ও ভালোবাসার উক্তি'}
            </p>
          </div>
        </div>

        <div className="text-xs font-serif text-[#c59b27] px-3 py-1.5 rounded-lg bg-[#140c08] border border-[#c59b27]/25">
          <span>{categoryPostcards.length} পোস্টকার্ড</span>
          <span className="mx-2">•</span>
          <span>{categoryQuotes.length} উক্তি</span>
        </div>
      </div>

      {/* Category Postcards Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#c59b27]/20">
          <Layers className="w-4 h-4 text-[#c59b27]" />
          <h3 className="text-lg font-serif font-bold text-[#f7efe1]">
            “{selectedCategory}” সম্পর্কিত পোস্টকার্ড
          </h3>
        </div>

        {categoryPostcards.length === 0 ? (
          <div className="p-8 text-center bg-[#17100b] rounded-xl border border-[#c59b27]/20 text-[#8e7456]">
            <p className="text-sm font-serif">এই মুহূর্তে কোনো পোস্টকার্ড নেই। শীঘ্রই আরও নতুন ডিজাইন যুক্ত করা হবে।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryPostcards.map((card) => (
              <VintageCardView
                key={card.id}
                template={card}
                isFavorite={favoriteIds.includes(card.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectPostcard}
              />
            ))}
          </div>
        )}
      </div>

      {/* Category Quotes Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#c59b27]/20">
          <BookOpen className="w-4 h-4 text-[#c59b27]" />
          <h3 className="text-lg font-serif font-bold text-[#f7efe1]">
            “{selectedCategory}” সম্পর্কিত প্রেমের উক্তি
          </h3>
        </div>

        {categoryQuotes.length === 0 ? (
          <div className="p-8 text-center bg-[#17100b] rounded-xl border border-[#c59b27]/20 text-[#8e7456]">
            <p className="text-sm font-serif">এই মুহূর্তে কোনো উক্তি নেই।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryQuotes.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-[#1a110c] border border-[#c59b27]/25 flex items-center justify-between gap-4 group"
              >
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-serif text-[#f5ebd7] leading-relaxed italic">
                    “{q.text}”
                  </p>
                  <span className="text-[11px] text-[#9c8469] mt-1 block">
                    — {q.author || q.category}
                  </span>
                </div>

                <button
                  onClick={() => onSelectQuote(q)}
                  className="px-3 py-1.5 rounded-lg bg-[#271911] hover:bg-[#7a1c24] text-[#e8ba62] hover:text-white border border-[#c59b27]/30 text-xs font-serif flex items-center gap-1 shrink-0 cursor-pointer transition-all"
                >
                  <span>ব্যবহার করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
