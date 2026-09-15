import React, { useState, useMemo } from 'react';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { categories } from '../data/categories';
import { PostcardTemplate, RomanticQuote, VintageGalleryItem, CategoryItem } from '../types';
import { Search, X, Heart, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPostcard: (template: PostcardTemplate) => void;
  onSelectQuote: (quote: RomanticQuote) => void;
  onSelectCategory: (categoryName: string) => void;
  onSelectGallery: (item: VintageGalleryItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPostcard,
  onSelectQuote,
  onSelectCategory,
  onSelectGallery,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const trimmed = searchTerm.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) {
      return {
        matchedCategories: [] as CategoryItem[],
        matchedPostcards: [] as PostcardTemplate[],
        matchedQuotes: [] as RomanticQuote[],
        matchedGallery: [] as VintageGalleryItem[],
      };
    }

    const matchedCategories = categories.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed) ||
        c.englishKey.toLowerCase().includes(trimmed)
    );

    const matchedPostcards = postcards.filter(
      (p) =>
        p.title.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.defaultQuote.toLowerCase().includes(trimmed) ||
        p.tags?.some((t) => t.toLowerCase().includes(trimmed))
    );

    const matchedQuotes = quotes.filter(
      (q) =>
        q.text.toLowerCase().includes(trimmed) ||
        q.category.toLowerCase().includes(trimmed) ||
        q.author?.toLowerCase().includes(trimmed)
    );

    const matchedGallery = gallery.filter(
      (g) =>
        g.title.toLowerCase().includes(trimmed) ||
        g.category.toLowerCase().includes(trimmed) ||
        g.quote?.toLowerCase().includes(trimmed)
    );

    return {
      matchedCategories,
      matchedPostcards,
      matchedQuotes,
      matchedGallery,
    };
  }, [trimmed]);

  if (!isOpen) return null;

  const totalResults =
    results.matchedCategories.length +
    results.matchedPostcards.length +
    results.matchedQuotes.length +
    results.matchedGallery.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#17100b] border border-[#c59b27]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#c59b27]/25 flex items-center gap-3 bg-[#1e140d]">
          <Search className="w-5 h-5 text-[#c59b27]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="উক্তি বা পোস্টকার্ড খুঁজুন... (যেমন: বৃষ্টি, প্রেম, গোলাপ)"
            className="flex-1 bg-transparent border-none text-[#f5ebd7] placeholder-[#8d7559] focus:outline-hidden text-base sm:text-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#9e8362] hover:text-[#f5ebd7] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs uppercase tracking-wider font-mono text-[#c59b27] border border-[#c59b27]/30 rounded-md hover:bg-[#2e1d13]"
          >
            ESC
          </button>
        </div>

        {/* Results area */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1 text-[#f5ebd7]">
          {!trimmed ? (
            <div className="py-12 text-center text-[#8e7456]">
              <Search className="w-10 h-10 mx-auto text-[#c59b27]/30 mb-3" />
              <p className="text-sm font-serif">অনুসন্ধান করতে কোনো শব্দ বা ক্যাটাগরি টাইপ করুন</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4 max-w-md mx-auto">
                {['বৃষ্টি', 'প্রেমপত্র', 'গোলাপ', 'রাতের অনুভূতি', 'বিরহ', 'স্মৃতি'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setSearchTerm(chip)}
                    className="text-xs px-3 py-1 rounded-full bg-[#271911] hover:bg-[#7a1c24] text-[#d8c19d] border border-[#c59b27]/20 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-[#9c8469]">
              <p className="text-base font-serif">“{searchTerm}” দিয়ে কিছুই পাওয়া যায়নি</p>
              <p className="text-xs mt-1 text-[#786149]">অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন</p>
            </div>
          ) : (
            <>
              {/* Matched Categories */}
              {results.matchedCategories.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-serif tracking-widest text-[#c59b27] mb-2 flex items-center gap-1.5">
                    <span>ক্যাটাগরি</span>
                    <span className="text-[10px] text-[#8e7456]">({results.matchedCategories.length})</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.matchedCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCategory(c.name);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-md bg-[#241710] hover:bg-[#7a1c24] text-xs font-serif text-[#f2e1c6] border border-[#c59b27]/30 flex items-center gap-1.5 transition-colors"
                      >
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Postcards */}
              {results.matchedPostcards.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-serif tracking-widest text-[#c59b27] mb-2 flex items-center gap-1.5">
                    <span>পোস্টকার্ড টেমপ্লেট</span>
                    <span className="text-[10px] text-[#8e7456]">({results.matchedPostcards.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {results.matchedPostcards.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectPostcard(p);
                          onClose();
                        }}
                        className="p-3 rounded-lg bg-[#221610] hover:bg-[#2e1d15] border border-[#c59b27]/25 hover:border-[#c59b27]/50 cursor-pointer transition-all flex items-start gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-sm bg-[#382315] border border-[#c59b27]/30 flex items-center justify-center shrink-0 text-base">
                          💌
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-serif font-bold text-[#f7efe1] group-hover:text-[#e8ba62] truncate">
                              {p.title}
                            </span>
                            <span className="text-[9px] text-[#bda282] px-1.5 py-0.5 rounded-sm bg-[#160d09]">
                              {p.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#ab947a] line-clamp-1 mt-0.5 font-serif italic">
                            “{p.defaultQuote}”
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Quotes */}
              {results.matchedQuotes.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-serif tracking-widest text-[#c59b27] mb-2 flex items-center gap-1.5">
                    <span>প্রেমের উক্তি</span>
                    <span className="text-[10px] text-[#8e7456]">({results.matchedQuotes.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {results.matchedQuotes.map((q) => (
                      <div
                        key={q.id}
                        onClick={() => {
                          onSelectQuote(q);
                          onClose();
                        }}
                        className="p-3 rounded-lg bg-[#20150e] hover:bg-[#2d1c13] border border-[#c59b27]/20 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="flex-1 pr-3">
                          <p className="text-xs text-[#f4ead9] font-serif leading-relaxed group-hover:text-[#f8d48d]">
                            “{q.text}”
                          </p>
                          <span className="text-[10px] text-[#8d7151] mt-1 inline-block">
                            — {q.author || q.category}
                          </span>
                        </div>
                        <button className="px-2.5 py-1 text-[11px] font-serif rounded bg-[#352116] group-hover:bg-[#7a1c24] text-[#e8ba62] group-hover:text-white border border-[#c59b27]/30 shrink-0 flex items-center gap-1">
                          <span>ব্যবহার করুন</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Gallery Items */}
              {results.matchedGallery.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-serif tracking-widest text-[#c59b27] mb-2 flex items-center gap-1.5">
                    <span>ভিন্টেজ গ্যালারি</span>
                    <span className="text-[10px] text-[#8e7456]">({results.matchedGallery.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.matchedGallery.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => {
                          onSelectGallery(g);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-[#20150e] hover:bg-[#2d1c13] border border-[#c59b27]/25 cursor-pointer flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-sm bg-[#382315] flex items-center justify-center text-sm">
                          🖼️
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-serif font-semibold text-[#f5ebd7] truncate">
                            {g.title}
                          </div>
                          <div className="text-[10px] text-[#8d7151]">{g.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
