import React, { useState, useRef } from 'react';
import { VintageGalleryItem } from '../types';
import { gallery } from '../data/gallery';
import { PostcardArtwork } from '../components/PostcardArtwork';
import { SponsorGateModal } from '../components/SponsorGateModal';
import { exportPostcardImage } from '../utils/exportPostcard';
import { Download, Eye, Heart, X } from 'lucide-react';

interface GalleryPageProps {
  favoriteGalleryIds: string[];
  onToggleFavoriteGallery: (id: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  favoriteGalleryIds,
  onToggleFavoriteGallery,
}) => {
  const [selectedItem, setSelectedItem] = useState<VintageGalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [itemToDownload, setItemToDownload] = useState<VintageGalleryItem | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Vintage Love', 'Classic Vintage', 'Bengali Vintage', 'Love Letters', 'Rain & Solitude', 'Night Thoughts', 'Romantic'];

  const filtered = activeCategory === 'All'
    ? gallery
    : gallery.filter((g) => g.category.includes(activeCategory));

  const handleStartDownload = (item: VintageGalleryItem) => {
    setItemToDownload(item);
    setIsSponsorModalOpen(true);
  };

  const handleConfirmDownload = async () => {
    setIsSponsorModalOpen(false);
    if (!previewRef.current || !itemToDownload) return;
    try {
      await exportPostcardImage({
        element: previewRef.current,
        fileName: `postlovebd-gallery-${itemToDownload.id}`,
        format: 'png',
        scale: 3,
      });
    } catch (err) {
      console.error('Download gallery error:', err);
      alert('গ্যালারি আর্টওয়ার্ক ডাউনলোড করতে সমস্যা হয়েছে।');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#c59b27]/20">
        <div>
          <div className="text-xs text-[#c59b27] uppercase font-serif tracking-widest mb-1">
            ARTWORK EXHIBITION
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7efe1] flex items-center gap-2">
            <span>🖼️ Vintage Quote Gallery</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#bda282] font-serif mt-1">
            ক্লাসিক ভিন্টেজ আর্ট ও অমর প্রেমের উক্তি দিয়ে সাজানো অপরিবর্তনীয় ডিজিটাল আর্টওয়ার্ক কালেকশন
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-serif whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#c59b27] text-[#120d0a] font-bold'
                : 'bg-[#1e130d] text-[#c5b29c] hover:bg-[#2c1b12]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isFav = favoriteGalleryIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="group relative rounded-xl bg-[#18110c] border border-[#c59b27]/25 hover:border-[#c59b27]/60 overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl flex flex-col"
            >
              {/* Artwork Container */}
              <div className="relative aspect-[4/3] bg-[#221610] overflow-hidden">
                <PostcardArtwork imageKey={item.image} />

                {/* Overlaid Quote in Vintage Typography */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-serif px-2 py-0.5 rounded-full bg-[#120d0a]/80 text-[#e8ba62] border border-[#c59b27]/30">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavoriteGallery(item.id);
                      }}
                      className="w-8 h-8 rounded-full bg-[#120d0a]/80 text-[#f5ebd7] flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'fill-[#e63946] text-[#e63946]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-serif italic text-[#fff5e3] leading-relaxed drop-shadow-md">
                      “{item.quote}”
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Actions */}
              <div className="p-4 flex items-center justify-between border-t border-[#c59b27]/20 bg-[#150e09]">
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#f7efe1] truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#9c8160] font-serif">
                    {item.author || 'Vintage Archive'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-2 rounded-lg bg-[#271911] hover:bg-[#342217] text-[#d6c2a8] hover:text-white border border-[#c59b27]/30 text-xs flex items-center gap-1 cursor-pointer"
                    title="বড় করে দেখুন"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleStartDownload(item)}
                    className="px-3 py-1.5 rounded-lg bg-[#7a1c24] hover:bg-[#96232d] text-white text-xs font-serif font-bold border border-[#d4af37]/40 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-[#18110c] border border-[#c59b27]/40 rounded-xl overflow-hidden shadow-2xl p-4 sm:p-6 text-[#f5ebd7]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#271911] text-[#c5b29c] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-[#f7efe1] mb-1">
              {selectedItem.title}
            </h3>
            <span className="text-xs text-[#c59b27] font-serif mb-4 block">
              {selectedItem.category} • {selectedItem.author}
            </span>

            {/* Target element for export */}
            <div
              ref={previewRef}
              data-postcard-container="true"
              className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-[#c59b27]/50 shadow-inner bg-[#221610]"
            >
              <PostcardArtwork imageKey={selectedItem.image} />
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-black/75 via-black/25 to-black/30">
                <div className="flex justify-between text-[10px] font-serif text-[#e8ba62] tracking-widest uppercase">
                  <span>POSTLOVEBD</span>
                  <span>ORIGINAL 1952</span>
                </div>
                <div className="text-center py-4">
                  <p className="text-base sm:text-lg font-serif italic text-[#fff4df] leading-relaxed drop-shadow-md">
                    “{selectedItem.quote}”
                  </p>
                </div>
                <div className="text-center text-[10px] text-[#bda282] font-serif">
                  — {selectedItem.author}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-lg bg-[#271911] text-xs font-serif text-[#d6c2a8]"
              >
                বন্ধ করুন
              </button>

              <button
                onClick={() => handleStartDownload(selectedItem)}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#851c24] to-[#a32631] text-white text-xs font-serif font-bold shadow-lg flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>HD ডাউনলোড করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sponsor Gate Modal */}
      <SponsorGateModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        onConfirmDownload={handleConfirmDownload}
        fileFormat="png"
      />
    </div>
  );
};
