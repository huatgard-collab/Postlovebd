const FAVORITE_POSTCARDS_KEY = 'postlovebd_fav_postcards';
const FAVORITE_QUOTES_KEY = 'postlovebd_fav_quotes';
const FAVORITE_GALLERY_KEY = 'postlovebd_fav_gallery';

export const getFavoritePostcardIds = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITE_POSTCARDS_KEY);
    return raw ? JSON.parse(raw) : ['vp001', 'vp002'];
  } catch {
    return ['vp001', 'vp002'];
  }
};

export const saveFavoritePostcardIds = (ids: string[]): void => {
  try {
    localStorage.setItem(FAVORITE_POSTCARDS_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save postcard favorites', e);
  }
};

export const toggleFavoritePostcardId = (id: string): string[] => {
  const current = getFavoritePostcardIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  try {
    localStorage.setItem(FAVORITE_POSTCARDS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update favorites', e);
  }
  return updated;
};

export const isPostcardFavorite = (id: string): boolean => {
  return getFavoritePostcardIds().includes(id);
};

export const getFavoriteQuoteIds = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITE_QUOTES_KEY);
    return raw ? JSON.parse(raw) : ['q001', 'q003'];
  } catch {
    return ['q001', 'q003'];
  }
};

export const saveFavoriteQuoteIds = (ids: string[]): void => {
  try {
    localStorage.setItem(FAVORITE_QUOTES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save quote favorites', e);
  }
};

export const toggleFavoriteQuoteId = (id: string): string[] => {
  const current = getFavoriteQuoteIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  try {
    localStorage.setItem(FAVORITE_QUOTES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update quote favorites', e);
  }
  return updated;
};

export const isQuoteFavorite = (id: string): boolean => {
  return getFavoriteQuoteIds().includes(id);
};

export const getFavoriteGalleryIds = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITE_GALLERY_KEY);
    return raw ? JSON.parse(raw) : ['g001', 'g003'];
  } catch {
    return ['g001', 'g003'];
  }
};

export const saveFavoriteGalleryIds = (ids: string[]): void => {
  try {
    localStorage.setItem(FAVORITE_GALLERY_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save gallery favorites', e);
  }
};

export const toggleFavoriteGalleryId = (id: string): string[] => {
  const current = getFavoriteGalleryIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  try {
    localStorage.setItem(FAVORITE_GALLERY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update gallery favorites', e);
  }
  return updated;
};

export const isGalleryFavorite = (id: string): boolean => {
  return getFavoriteGalleryIds().includes(id);
};
