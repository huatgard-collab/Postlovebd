import React, { useState, useMemo } from 'react';
import { PostcardTemplate } from '../types';
import { postcards } from '../data/postcards';
import { categories } from '../data/categories';
import { VintageCardView } from '../components/VintageCardView';
import { Search, Filter } from 'lucide-react';

interface PostcardsPageProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  initialCategory?: string;
}

export const PostcardsPage: React.FC<PostcardsPageProps> = ({
  onSelectPostcard,
  favoriteIds,
  onToggleFavorite,
  initialCategory = 'সবগুলো',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = useMemo(() => {
    return postcards.filter((p) => {
      const matchCat =
        selectedCategory === 'সবগুলো' ||
        p.category === selectedCategory ||
        p.tags?.includes(selectedCategory);

      const matchSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.defaultQuote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#c59b27]/20">
        <div>
          <div className="text-xs text-[#c59b27] uppercase font-serif tracking-widest mb-1">
            ARCHIVE TEMPLATES
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7efe1]">
            পোস্টকার্ড টেমপ্লেট লাইব্রেরি
          </h1>
          <p className="text-xs sm:text-sm text-[#bda282] font-serif mt-1">
            ভিন্টেজ রোমান্টিক ডিজাইন থেকে আপনার পছন্দের পোস্টকার্ডটি বেছে নিন
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-[#c59b27] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="পোস্টকার্ড খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#1a110c] border border-[#c59b27]/30 text-xs font-serif text-[#f5ebd7] focus:outline-hidden focus:border-[#c59b27]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setSelectedCategory('সবগুলো')}
          className={`px-3 py-1.5 rounded-full text-xs font-serif whitespace-nowrap transition-colors cursor-pointer ${
            selectedCategory === 'সবগুলো'
              ? 'bg-[#c59b27] text-[#120d0a] font-bold'
              : 'bg-[#1e130d] text-[#c5b29c] hover:bg-[#2c1b12]'
          }`}
        >
          সবগুলো ({postcards.length})
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-serif whitespace-nowrap flex items-center gap-1 transition-colors cursor-pointer ${
              selectedCategory === c.name
                ? 'bg-[#c59b27] text-[#120d0a] font-bold'
                : 'bg-[#1e130d] text-[#c5b29c] hover:bg-[#2c1b12]'
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Postcard Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-[#8e7456]">
          <p className="text-base font-serif">কোনো পোস্টকার্ড পাওয়া যায়নি</p>
          <button
            onClick={() => {
              setSelectedCategory('সবগুলো');
              setSearchTerm('');
            }}
            className="mt-3 px-4 py-1.5 rounded-md bg-[#251811] text-[#e8ba62] text-xs font-serif border border-[#c59b27]/30 hover:bg-[#342217]"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((card) => (
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
  );
};
