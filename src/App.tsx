/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavPage } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PostcardUseCountdownModal } from './components/PostcardUseCountdownModal';

// Pages
import { HomePage } from './pages/HomePage';
import { GeneratorPage } from './pages/GeneratorPage';
import { PostcardsPage } from './pages/PostcardsPage';
import { QuotesPage } from './pages/QuotesPage';
import { GalleryPage } from './pages/GalleryPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';

// Types & Data
import { PostcardTemplate, RomanticQuote, VintageGalleryItem } from './types';
import { postcards } from './data/postcards';
import { quotes } from './data/quotes';
import {
  getFavoritePostcardIds,
  saveFavoritePostcardIds,
  getFavoriteQuoteIds,
  saveFavoriteQuoteIds,
  getFavoriteGalleryIds,
  saveFavoriteGalleryIds,
} from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Active selections for generator
  const [selectedTemplate, setSelectedTemplate] = useState<PostcardTemplate>(postcards[0]);
  const [selectedQuote, setSelectedQuote] = useState<RomanticQuote>(quotes[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('সবগুলো');

  // Favorites state
  const [favPostcardIds, setFavPostcardIds] = useState<string[]>([]);
  const [favQuoteIds, setFavQuoteIds] = useState<string[]>([]);
  const [favGalleryIds, setFavGalleryIds] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setFavPostcardIds(getFavoritePostcardIds());
    setFavQuoteIds(getFavoriteQuoteIds());
    setFavGalleryIds(getFavoriteGalleryIds());
  }, []);

  // Keyboard shortcut (cmd+k / ctrl+k) or escape for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on page change
  const navigateTo = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favorite handlers
  const handleToggleFavPostcard = (id: string) => {
    setFavPostcardIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavoritePostcardIds(next);
      return next;
    });
  };

  const handleToggleFavQuote = (id: string) => {
    setFavQuoteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavoriteQuoteIds(next);
      return next;
    });
  };

  const handleToggleFavGallery = (id: string) => {
    setFavGalleryIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavoriteGalleryIds(next);
      return next;
    });
  };

  // 5-second countdown sponsor flow state
  const [countdownTemplate, setCountdownTemplate] = useState<PostcardTemplate | null>(null);

  // Action handlers
  const handleSelectPostcardForGenerator = (template: PostcardTemplate) => {
    setCountdownTemplate(template);
  };

  const handleCountdownComplete = (template: PostcardTemplate) => {
    setSelectedTemplate(template);
    setCountdownTemplate(null);
    navigateTo('generator');
  };

  const handleCountdownClose = () => {
    setCountdownTemplate(null);
  };

  const handleSelectQuoteForGenerator = (quote: RomanticQuote) => {
    setSelectedQuote(quote);
    navigateTo('generator');
  };

  const handleSelectCategory = (categoryName: string) => {
    setActiveCategoryFilter(categoryName);
    navigateTo('categories');
  };

  const handleSelectGalleryItem = (item: VintageGalleryItem) => {
    navigateTo('gallery');
  };

  const totalFavoritesCount = favPostcardIds.length + favQuoteIds.length + favGalleryIds.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#120d0a] text-[#f5ebd7] font-sans selection:bg-[#7a1c24] selection:text-[#fff5e3]">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        favoritesCount={totalFavoritesCount}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onSelectPostcard={handleSelectPostcardForGenerator}
            onSelectCategory={handleSelectCategory}
            onNavigateToGallery={() => navigateTo('gallery')}
            onNavigateToGenerator={() => navigateTo('generator')}
            favoriteIds={favPostcardIds}
            onToggleFavorite={handleToggleFavPostcard}
          />
        )}

        {currentPage === 'generator' && (
          <GeneratorPage
            initialTemplate={selectedTemplate}
            initialQuote={selectedQuote}
          />
        )}

        {currentPage === 'postcards' && (
          <PostcardsPage
            onSelectPostcard={handleSelectPostcardForGenerator}
            favoriteIds={favPostcardIds}
            onToggleFavorite={handleToggleFavPostcard}
            initialCategory={activeCategoryFilter}
          />
        )}

        {currentPage === 'quotes' && (
          <QuotesPage
            onSelectQuote={handleSelectQuoteForGenerator}
            favoriteQuoteIds={favQuoteIds}
            onToggleFavoriteQuote={handleToggleFavQuote}
            initialCategory={activeCategoryFilter}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            favoriteGalleryIds={favGalleryIds}
            onToggleFavoriteGallery={handleToggleFavGallery}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage
            onSelectPostcard={handleSelectPostcardForGenerator}
            onSelectQuote={handleSelectQuoteForGenerator}
            favoriteIds={favPostcardIds}
            onToggleFavorite={handleToggleFavPostcard}
            initialCategory={activeCategoryFilter}
          />
        )}

        {currentPage === 'favorites' && (
          <FavoritesPage
            onSelectPostcard={handleSelectPostcardForGenerator}
            onSelectQuote={handleSelectQuoteForGenerator}
            onSelectGallery={handleSelectGalleryItem}
            favoritePostcardIds={favPostcardIds}
            favoriteQuoteIds={favQuoteIds}
            favoriteGalleryIds={favGalleryIds}
            onToggleFavoritePostcard={handleToggleFavPostcard}
            onToggleFavoriteQuote={handleToggleFavQuote}
            onToggleFavoriteGallery={handleToggleFavGallery}
            onNavigateToPostcards={() => navigateTo('postcards')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPostcard={handleSelectPostcardForGenerator}
        onSelectQuote={handleSelectQuoteForGenerator}
        onSelectCategory={handleSelectCategory}
        onSelectGallery={handleSelectGalleryItem}
      />

      {/* 5-Second Postcard Use Countdown Modal */}
      <PostcardUseCountdownModal
        template={countdownTemplate}
        isOpen={!!countdownTemplate}
        onComplete={handleCountdownComplete}
        onClose={handleCountdownClose}
      />
    </div>
  );
}
