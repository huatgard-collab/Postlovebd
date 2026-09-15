import React, { useState, useMemo } from 'react';
import { RomanticQuote } from '../types';
import { quotes } from '../data/quotes';
import { categories } from '../data/categories';
import { Heart, Search, ArrowRight, Dices, Copy, Check } from 'lucide-react';

interface QuotesPageProps {
  onSelectQuote: (quote: RomanticQuote) => void;
  favoriteQuoteIds: string[];
  onToggleFavoriteQuote: (id: string) => void;
  initialCategory?: string;
}

export const QuotesPage: React.FC<QuotesPageProps> = ({
  onSelectQuote,
  favoriteQuoteIds,
  onToggleFavoriteQuote,
  initialCategory = 'সবগুলো',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return quotes.filter((q) => {
      const matchCat =
        selectedCategory === 'সবগুলো' || q.category === selectedCategory;
      const matchSearch =
        !searchTerm ||
        q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.author?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleCopyText = (quote: RomanticQuote) => {
    navigator.clipboard.writeText(quote.text);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSurpriseQuote = () => {
    const randomQ = quotes[Math.floor(Math.random() * quotes.length)];
    onSelectQuote(randomQ);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#c59b27]/20">
        <div>
          <div className="text-xs text-[#c59b27] uppercase font-serif tracking-widest mb-1">
            ROMANTIC ARCHIVE
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7efe1]">
            প্রেমের উক্তি ও চিরকুট সংকলন
          </h1>
          <p className="text-xs sm:text-sm text-[#bda282] font-serif mt-1">
            হৃদয়স্পর্শী বাংলা প্রেমের উক্তি খুঁজে নিন এবং সরাসরি আপনার পছন্দের পোস্টকার্ডে ব্যবহার করুন
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Surprise Button */}
          <button
            onClick={handleSurpriseQuote}
            className="px-3.5 py-2 rounded-lg bg-[#271911] hover:bg-[#342217] text-[#e8ba62] border border-[#c59b27]/30 text-xs font-serif flex items-center gap-1.5 cursor-pointer"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Surprise Quote</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 md:w-64 relative">
            <Search className="w-4 h-4 text-[#c59b27] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="উক্তি খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#1a110c] border border-[#c59b27]/30 text-xs font-serif text-[#f5ebd7] focus:outline-hidden focus:border-[#c59b27]"
            />
          </div>
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
          সবগুলো ({quotes.length})
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

      {/* Quotes Cards Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-[#8e7456]">
          <p className="text-base font-serif">কোনো উক্তি পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((quote) => {
            const isFav = favoriteQuoteIds.includes(quote.id);
            const isCopied = copiedId === quote.id;

            return (
              <div
                key={quote.id}
                className="group relative p-5 rounded-xl bg-[#18110c] border border-[#c59b27]/25 hover:border-[#c59b27]/55 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#c59b27]/15 mb-3">
                    <span className="text-[10px] uppercase tracking-wider font-serif px-2 py-0.5 rounded-full bg-[#241710] text-[#e8ba62] border border-[#c59b27]/20">
                      {quote.category}
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Copy button */}
                      <button
                        onClick={() => handleCopyText(quote)}
                        className="p-1.5 text-[#9e8362] hover:text-[#f5ebd7] rounded-md transition-colors"
                        title="উক্তি কপি করুন"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Favorite button */}
                      <button
                        onClick={() => onToggleFavoriteQuote(quote.id)}
                        className="p-1.5 text-[#9e8362] hover:text-[#e63946] rounded-md transition-colors"
                        title={isFav ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isFav ? 'fill-[#e63946] text-[#e63946]' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-serif leading-relaxed text-[#f7efe1] group-hover:text-[#fdf2df] italic">
                    “{quote.text}”
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#c59b27]/15 flex items-center justify-between">
                  <span className="text-xs text-[#9d8363] font-serif">
                    {quote.author ? `— ${quote.author}` : ''}
                  </span>

                  <button
                    onClick={() => onSelectQuote(quote)}
                    className="px-3 py-1 text-xs font-serif font-semibold rounded-md bg-[#291a12] hover:bg-[#7a1c24] text-[#e8ba62] hover:text-white border border-[#c59b27]/30 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>পোস্টকার্ডে ব্যবহার করুন</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
