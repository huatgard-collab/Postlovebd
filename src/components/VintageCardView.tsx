import React from 'react';
import { PostcardTemplate } from '../types';
import { PostcardArtwork } from './PostcardArtwork';
import { Heart } from 'lucide-react';

interface VintageCardViewProps {
  template: PostcardTemplate;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (template: PostcardTemplate) => void;
}

export const VintageCardView: React.FC<VintageCardViewProps> = ({
  template,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  return (
    <div className="group relative bg-[#18110c] border border-[#c59b27]/25 hover:border-[#c59b27]/60 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#c59b27]/5 flex flex-col">
      {/* Top Artwork container with subtle vintage postage look */}
      <div className="relative w-full aspect-[4/3] bg-[#221610] overflow-hidden border-b border-[#c59b27]/20">
        <PostcardArtwork imageKey={template.image} mood={template.artworkMood} />

        {/* Favorite Heart Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(template.id);
          }}
          className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-[#120d0a]/75 backdrop-blur-xs border border-[#c59b27]/30 flex items-center justify-center text-[#f5ebd7] hover:scale-110 active:scale-95 transition-transform"
          aria-label={isFavorite ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? 'fill-[#e63946] text-[#e63946]'
                : 'text-[#d8c19d] hover:text-[#e63946]'
            }`}
          />
        </button>

        {/* Category Pill */}
        <span className="absolute bottom-2.5 left-2.5 z-20 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#120d0a]/85 border border-[#c59b27]/30 text-[#e8ba62] tracking-wider font-serif">
          {template.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-base font-serif font-bold text-[#f7efe1] group-hover:text-[#e8ba62] transition-colors truncate">
            {template.title}
          </h4>
          <p className="mt-1.5 text-xs text-[#c5b29c] line-clamp-2 leading-relaxed italic font-serif">
            “{template.defaultQuote}”
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-[#c59b27]/15 flex items-center justify-between">
          <span className="text-[11px] text-[#9c7d54] font-serif">
            {template.border} border
          </span>
          <button
            onClick={() => onSelect(template)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#2d1b14] hover:bg-[#7a1c24] text-[#fbebd0] hover:text-white border border-[#c59b27]/40 transition-all flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
          >
            <span>ব্যবহার করুন</span>
            <span className="text-[10px]">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
