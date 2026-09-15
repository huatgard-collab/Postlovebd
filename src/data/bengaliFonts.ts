export interface BengaliFontItem {
  id: string;
  name: string;
  bengaliName: string;
  fontFamily: string;
  previewPhrase: string; // Meaningful, romantic Bengali phrase
  styleDescription: string;
  category: 'serif' | 'classic' | 'handwritten' | 'romantic' | 'calligraphy' | 'vintage' | 'modern' | 'decorative' | 'traditional' | 'clean';
  badge?: string;
}

export const BENGALI_FONTS: BengaliFontItem[] = [
  {
    id: 'elegant-serif',
    name: 'Elegant Bengali Serif',
    bengaliName: 'এলিগেন্ট সেরিফ',
    fontFamily: "'Noto Serif Bengali', Georgia, serif",
    previewPhrase: 'সুন্দর বাংলা লেখা',
    styleDescription: 'সনাতন ও পরিশীলিত রূপ',
    category: 'serif',
    badge: 'ডিফল্ট',
  },
  {
    id: 'classic-bengali',
    name: 'Classic Bengali',
    bengaliName: 'ক্ল্যাসিক সাহিত্যিক',
    fontFamily: "'Tiro Bangla', 'Noto Serif Bengali', serif",
    previewPhrase: 'চিরন্তন ভালোবাসার কথা',
    styleDescription: 'সাহিত্যিক ঐতিহ্যবাহী ধারা',
    category: 'classic',
  },
  {
    id: 'handwritten-bengali',
    name: 'Handwritten Bengali',
    bengaliName: 'হাতের লেখা বাংলা',
    fontFamily: "'Atma', cursive, sans-serif",
    previewPhrase: 'ভালোবাসার চিঠি আমার',
    styleDescription: 'আন্তরিক নিজস্ব হাতের টান',
    category: 'handwritten',
    badge: 'জনপ্রিয়',
  },
  {
    id: 'romantic-bengali',
    name: 'Romantic Bengali',
    bengaliName: 'রোমান্টিক বাংলা',
    fontFamily: "'Baloo Da 2', cursive, sans-serif",
    previewPhrase: 'তোমাকে আজও ভালোবাসি',
    styleDescription: 'কোমল ও আকর্ষণীয় আবেদন',
    category: 'romantic',
    badge: 'রোমান্টিক',
  },
  {
    id: 'calligraphy-bengali',
    name: 'Calligraphy Bengali',
    bengaliName: 'চারুলিপি ক্যালিগ্রাফি',
    fontFamily: "'Galada', cursive, serif",
    previewPhrase: 'মধুর চারুলিপি প্রেম',
    styleDescription: 'শিল্পসম্মত চারুলিপি ভঙ্গি',
    category: 'calligraphy',
  },
  {
    id: 'vintage-bengali',
    name: 'Vintage Bengali',
    bengaliName: 'ভিন্টেজ ডাকঘর রূপ',
    fontFamily: "'Noto Serif Bengali', Georgia, serif",
    previewPhrase: 'পুরনো দিনের অনুভূতি',
    styleDescription: 'প্রাচীন পোস্টকার্ড স্টাইল',
    category: 'vintage',
    badge: 'ভিন্টেজ',
  },
  {
    id: 'modern-bengali',
    name: 'Modern Bengali',
    bengaliName: 'সমকালীন মডার্ন',
    fontFamily: "'Hind Siliguri', sans-serif",
    previewPhrase: 'সমকালীন আধুনিক রূপ',
    styleDescription: 'স্পষ্ট ও সহজপাঠ্য সমকালীন',
    category: 'modern',
  },
  {
    id: 'decorative-bengali',
    name: 'Decorative Bengali',
    bengaliName: 'নান্দনিক অলঙ্কৃত',
    fontFamily: "'Anek Bangla', sans-serif",
    previewPhrase: 'নান্দনিক মনের আকুলতা',
    styleDescription: 'অনন্য আকর্ষণীয় কারুকাজ',
    category: 'decorative',
  },
  {
    id: 'traditional-bengali',
    name: 'Traditional Bengali',
    bengaliName: 'ঐতিহ্যবাহী বাংলা',
    fontFamily: "'Mina', sans-serif",
    previewPhrase: 'ঐতিহ্যবাহী মধুর বাণী',
    styleDescription: 'চিরায়ত শুদ্ধ বিন্যাস',
    category: 'traditional',
  },
  {
    id: 'clean-bengali',
    name: 'Clean Bengali',
    bengaliName: 'ক্লিন ও স্পষ্ট',
    fontFamily: "'Noto Sans Bengali', sans-serif",
    previewPhrase: 'স্বচ্ছ নির্মল অনুভূতি',
    styleDescription: 'সরল, পরিচ্ছন্ন ও স্পষ্ট',
    category: 'clean',
  },
];

/**
 * Resolves any font ID, display name, or legacy template font name
 * to a concrete BengaliFontItem. Always returns a valid font.
 */
export function resolveBengaliFont(fontIdentifier?: string): BengaliFontItem {
  if (!fontIdentifier) return BENGALI_FONTS[0];

  const trimmed = fontIdentifier.trim().toLowerCase();

  // 1. Check exact ID match
  const byId = BENGALI_FONTS.find((f) => f.id.toLowerCase() === trimmed);
  if (byId) return byId;

  // 2. Check font name match
  const byName = BENGALI_FONTS.find((f) => f.name.toLowerCase() === trimmed);
  if (byName) return byName;

  // 3. Check Bengali name match
  const byBnName = BENGALI_FONTS.find((f) => f.bengaliName.toLowerCase() === trimmed);
  if (byBnName) return byBnName;

  // 4. Check legacy template font names
  if (trimmed.includes('calligraphy')) {
    return BENGALI_FONTS.find((f) => f.id === 'calligraphy-bengali') || BENGALI_FONTS[4];
  }
  if (trimmed.includes('handwritten')) {
    return BENGALI_FONTS.find((f) => f.id === 'handwritten-bengali') || BENGALI_FONTS[2];
  }
  if (trimmed.includes('classic')) {
    return BENGALI_FONTS.find((f) => f.id === 'classic-bengali') || BENGALI_FONTS[1];
  }
  if (trimmed.includes('vintage') || trimmed.includes('newspaper')) {
    return BENGALI_FONTS.find((f) => f.id === 'vintage-bengali') || BENGALI_FONTS[5];
  }
  if (trimmed.includes('romantic')) {
    return BENGALI_FONTS.find((f) => f.id === 'romantic-bengali') || BENGALI_FONTS[3];
  }
  if (trimmed.includes('typewriter') || trimmed.includes('clean')) {
    return BENGALI_FONTS.find((f) => f.id === 'clean-bengali') || BENGALI_FONTS[9];
  }
  if (trimmed.includes('modern')) {
    return BENGALI_FONTS.find((f) => f.id === 'modern-bengali') || BENGALI_FONTS[6];
  }
  if (trimmed.includes('decorative')) {
    return BENGALI_FONTS.find((f) => f.id === 'decorative-bengali') || BENGALI_FONTS[7];
  }
  if (trimmed.includes('traditional')) {
    return BENGALI_FONTS.find((f) => f.id === 'traditional-bengali') || BENGALI_FONTS[8];
  }
  if (trimmed.includes('elegant') || trimmed.includes('serif')) {
    return BENGALI_FONTS[0];
  }

  // Fallback to default elegant serif
  return BENGALI_FONTS[0];
}
