import React, { useState } from 'react';
import { PostcardTemplate, RomanticQuote, VintageGalleryItem } from '../types';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { VintageCardView } from '../components/VintageCardView';
import { PostcardArtwork } from '../components/PostcardArtwork';
import { Heart, ArrowRight, Trash2, BookOpen, Layers, Image as ImageIcon } from 'lucide-react';

interface FavoritesPageProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  onSelectQuote: (quote: RomanticQuote) => void;
  onSelectGallery: (item: VintageGalleryItem) => void;
  favoritePostcardIds: string[];
  favoriteQuoteIds: string[];
  favoriteGalleryIds: string[];
  onToggleFavoritePostcard: (id: string) => void;
  onToggleFavoriteQuote: (id: string) => void;
  onToggleFavoriteGallery: (id: string) => void;
  onNavigateToPostcards: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onSelectPostcard,
  onSelectQuote,
  onSelectGallery,
  favoritePostcardIds,
  favoriteQuoteIds,
  favoriteGalleryIds,
  onToggleFavoritePostcard,
  onToggleFavoriteQuote,
  onToggleFavoriteGallery,
  onNavigateToPostcards,
}) => {
  const [activeTab, setActiveTab] = useState<'postcards' | 'quotes' | 'gallery'>('postcards');

  const favPostcards = postcards.filter((p) => favoritePostcardIds.includes(p.id));
  const favQuotes = quotes.filter((q) => favoriteQuoteIds.includes(q.id));
  const favGallery = gallery.filter((g) => favoriteGalleryIds.includes(g.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#c59b27]/20">
        <div>
          <div className="text-xs text-[#e63946] uppercase font-serif tracking-widest mb-1 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-[#e63946]" />
            <span>SAVED ARCHIVES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7efe1]">
            ♡ আমার পছন্দ
          </h1>
          <p className="text-xs sm:text-sm text-[#bda282] font-serif mt-1">
            আপনার পছন্দের সংগৃহীত পোস্টকার্ড, রোমান্টিক উক্তি এবং গ্যালারি আর্টওয়ার্ক
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#c59b27]/20 pb-1">
        <button
          onClick={() => setActiveTab('postcards')}
          className={`px-4 py-2 rounded-t-lg text-xs sm:text-sm font-serif flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'postcards'
              ? 'bg-[#221610] text-[#e8ba62] border-t-2 border-x border-[#c59b27]/40 font-bold -mb-[1px]'
              : 'text-[#ab947a] hover:text-[#f7efe1]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Favorite Postcards ({favPostcards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2 rounded-t-lg text-xs sm:text-sm font-serif flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'quotes'
              ? 'bg-[#221610] text-[#e8ba62] border-t-2 border-x border-[#c59b27]/40 font-bold -mb-[1px]'
              : 'text-[#ab947a] hover:text-[#f7efe1]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Favorite Quotes ({favQuotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-t-lg text-xs sm:text-sm font-serif flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-[#221610] text-[#e8ba62] border-t-2 border-x border-[#c59b27]/40 font-bold -mb-[1px]'
              : 'text-[#ab947a] hover:text-[#f7efe1]'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Favorite Gallery ({favGallery.length})</span>
        </button>
      </div>

      {/* TAB 1: FAVORITE POSTCARDS */}
      {activeTab === 'postcards' && (
        <div>
          {favPostcards.length === 0 ? (
            <div className="py-16 text-center bg-[#17100b] rounded-xl border border-[#c59b27]/20 space-y-3">
              <Heart className="w-10 h-10 text-[#c59b27]/30 mx-auto" />
              <p className="text-base font-serif text-[#d6c2a8]">
                এখনো কোনো পোস্টকার্ড ফেভারিটে যোগ করা হয়নি
              </p>
              <button
                onClick={onNavigateToPostcards}
                className="px-5 py-2 rounded-lg bg-[#7a1c24] text-white text-xs font-serif font-bold hover:bg-[#96232d] cursor-pointer"
              >
                পোস্টকার্ড লাইব্রেরি ব্রাউজ করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favPostcards.map((card) => (
                <VintageCardView
                  key={card.id}
                  template={card}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavoritePostcard}
                  onSelect={onSelectPostcard}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FAVORITE QUOTES */}
      {activeTab === 'quotes' && (
        <div>
          {favQuotes.length === 0 ? (
            <div className="py-16 text-center bg-[#17100b] rounded-xl border border-[#c59b27]/20 space-y-3">
              <BookOpen className="w-10 h-10 text-[#c59b27]/30 mx-auto" />
              <p className="text-base font-serif text-[#d6c2a8]">
                কোনো উক্তি ফেভারিটে যোগ করা হয়নি
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-[#18110c] border border-[#c59b27]/25 flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-serif text-[#f7efe1] italic leading-relaxed">
                      “{q.text}”
                    </p>
                    <span className="text-[11px] text-[#9e8362] mt-1 block">
                      — {q.author || q.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleFavoriteQuote(q.id)}
                      className="p-1.5 text-[#e63946] hover:text-[#ff6b6b]"
                      title="পছন্দ থেকে মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectQuote(q)}
                      className="px-3 py-1.5 rounded-md bg-[#2c1d15] hover:bg-[#7a1c24] text-[#e8ba62] hover:text-white border border-[#c59b27]/30 text-xs font-serif flex items-center gap-1 cursor-pointer"
                    >
                      <span>ব্যবহার করুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FAVORITE GALLERY */}
      {activeTab === 'gallery' && (
        <div>
          {favGallery.length === 0 ? (
            <div className="py-16 text-center bg-[#17100b] rounded-xl border border-[#c59b27]/20 space-y-3">
              <ImageIcon className="w-10 h-10 text-[#c59b27]/30 mx-auto" />
              <p className="text-base font-serif text-[#d6c2a8]">
                কোনো গ্যালারি আইটেম ফেভারিটে যোগ করা হয়নি
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectGallery(item)}
                  className="rounded-xl bg-[#18110c] border border-[#c59b27]/25 overflow-hidden group cursor-pointer hover:border-[#c59b27]/60 transition-all"
                >
                  <div className="relative aspect-[4/3] bg-[#221610]">
                    <PostcardArtwork imageKey={item.image} />
                    <div className="absolute inset-0 p-4 flex flex-col justify-between bg-black/40">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-serif text-[#e8ba62] px-2 py-0.5 rounded-full bg-[#120d0a]/80">
                          {item.category}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavoriteGallery(item.id);
                          }}
                          className="p-1.5 rounded-full bg-[#120d0a]/80 text-[#e63946]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-serif text-white italic text-center drop-shadow-sm">
                        “{item.quote}”
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#150e09] flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-[#f7efe1]">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#c59b27]">দেখুন →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
