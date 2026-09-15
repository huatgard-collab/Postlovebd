export type TextAlignment = 'left' | 'center' | 'right' | 'justify';
export type TextPosition = 'top' | 'center' | 'bottom';

export type FontFamilyChoice =
  | 'Vintage Serif'
  | 'Calligraphy'
  | 'Elegant Bengali'
  | 'Typewriter'
  | 'Classic'
  | 'Handwritten'
  | 'Old Newspaper';

export type VintageBorder =
  | 'classic'
  | 'ornate'
  | 'vintage-post'
  | 'double-gold'
  | 'antique-stamps'
  | 'filigree';

export type VintageEffectType =
  | 'original'
  | 'sepia'
  | 'old-paper'
  | 'faded'
  | 'black-and-white'
  | 'film-grain'
  | 'dust'
  | 'scratch'
  | 'coffee-stain'
  | 'warm-vintage';

export type ExportRatio =
  | 'postcard' // 4:3
  | 'square' // 1:1 Instagram
  | 'story' // 9:16 Instagram Story
  | 'facebook' // 4:5 Facebook Post
  | 'status'; // 9:16 WhatsApp Status

export interface TextStyleConfig {
  fontFamily: FontFamilyChoice;
  fontSize: number;
  alignment: TextAlignment;
  position: TextPosition;
  color: string;
  bold?: boolean;
  italic?: boolean;
  letterSpacing?: number;
  lineHeight?: number;
}

export interface PostcardTemplate {
  id: string;
  title: string;
  category: string;
  image: string;
  defaultQuote: string;
  style: TextStyleConfig;
  border: VintageBorder;
  tags?: string[];
  collection?: 'popular' | 'new' | 'romantic' | 'rainy' | 'letter';
  artworkMood?: string;
}

export interface RomanticQuote {
  id: string;
  text: string;
  category: string;
  author?: string;
}

export interface VintageGalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  quote?: string;
  author?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  englishKey: string;
  description?: string;
}

export interface CustomPhotoConfig {
  url: string;
  fit: 'cover' | 'contain';
  zoom: number; // 1 to 2.5
  posX: number; // -50 to 50
  posY: number; // -50 to 50
}

export interface PostcardCustomState {
  templateId: string;
  recipient: string; // প্রাপক
  message: string; // মূল লেখা
  sender: string; // প্রেরক
  date: string; // তারিখ
  style: TextStyleConfig;
  border: VintageBorder;
  effect: VintageEffectType;
  exportRatio: ExportRatio;
  showStamp: boolean;
  showPostmark: boolean;
  showAirmailStripe: boolean;
  customStampTitle?: string;
  customPhoto?: CustomPhotoConfig | null;
}
