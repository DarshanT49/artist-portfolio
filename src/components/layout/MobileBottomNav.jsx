import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { CATEGORIES } from '../../data/categories';
import { Home, Layers, Search, Heart, User, X, Sparkles } from 'lucide-react';
import './MobileBottomNav.css';

export default function MobileBottomNav() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    favorites,
    showOnlyFavorites,
    setShowOnlyFavorites,
    setIsAboutOpen
  } = useGallery();

  const [activeSheet, setActiveSheet] = useState(null); // 'categories' | 'search' | null

  const handleHomeClick = () => {
    setActiveSheet(null);
    setIsAboutOpen(false);
    setSelectedCategory('all');
    setSearchQuery('');
    setShowOnlyFavorites(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoriesClick = () => {
    setActiveSheet(activeSheet === 'categories' ? null : 'categories');
  };

  const handleSearchClick = () => {
    setActiveSheet(activeSheet === 'search' ? null : 'search');
  };

  const handleSavedClick = () => {
    setActiveSheet(null);
    setIsAboutOpen(false);
    setShowOnlyFavorites(!showOnlyFavorites);
    const gallerySection = document.getElementById('gallery-showcase');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleArtistClick = () => {
    setActiveSheet(null);
    setIsAboutOpen(true);
  };

  const handleSelectCategory = (catId) => {
    setIsAboutOpen(false);
    setSelectedCategory(catId);
    setShowOnlyFavorites(false);
    setActiveSheet(null);
    const gallerySection = document.getElementById('gallery-showcase');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const popularTags = ['Oil', 'Abstract', 'Watercolor', 'Landscape', 'Portrait', 'Linen'];

  return (
    <>
      {/* Overlay Backdrop when a bottom sheet is open */}
      {activeSheet && (
        <div
          className="bottom-sheet-backdrop"
          onClick={() => setActiveSheet(null)}
          aria-hidden="true"
        />
      )}

      {/* Categories / Collections Bottom Sheet */}
      {activeSheet === 'categories' && (
        <div className="bottom-sheet categories-sheet" role="dialog" aria-label="Collections">
          <div className="sheet-handle-bar" />
          <div className="sheet-header">
            <div className="sheet-title-wrap">
              <Layers size={17} className="sheet-icon" />
              <h3>Collections & Mediums</h3>
            </div>
            <button
              className="sheet-close-btn"
              onClick={() => setActiveSheet(null)}
              aria-label="Close collections sheet"
            >
              <X size={18} />
            </button>
          </div>

          <div className="sheet-categories-list">
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id && !showOnlyFavorites;
              return (
                <button
                  key={cat.id}
                  className={`sheet-cat-item ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectCategory(cat.id)}
                >
                  <span className="sheet-cat-name">{cat.label}</span>
                  <span className="sheet-cat-count">{cat.count} works</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Bottom Sheet */}
      {activeSheet === 'search' && (
        <div className="bottom-sheet search-sheet" role="dialog" aria-label="Search Paintings">
          <div className="sheet-handle-bar" />
          <div className="sheet-header">
            <div className="sheet-title-wrap">
              <Search size={17} className="sheet-icon" />
              <h3>Search Art Gallery</h3>
            </div>
            <button
              className="sheet-close-btn"
              onClick={() => setActiveSheet(null)}
              aria-label="Close search sheet"
            >
              <X size={18} />
            </button>
          </div>

          <div className="sheet-search-input-box">
            <Search size={18} className="search-box-icon" />
            <input
              type="text"
              autoFocus
              placeholder="Search by title, medium, palette, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search art"
            />
            {searchQuery && (
              <button
                className="sheet-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search text"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick search tags */}
          <div className="sheet-quick-tags">
            <span className="quick-tags-title">Popular searches:</span>
            <div className="quick-tags-wrap">
              {popularTags.map(tag => (
                <button
                  key={tag}
                  className="quick-tag-pill"
                  onClick={() => {
                    setIsAboutOpen(false);
                    setSearchQuery(tag);
                    setActiveSheet(null);
                    const gallerySection = document.getElementById('gallery-showcase');
                    if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <div className="bottom-nav-inner">
          {/* 1. Home */}
          <button
            className={`bottom-nav-tab ${
              selectedCategory === 'all' && !showOnlyFavorites && !searchQuery && !activeSheet
                ? 'active'
                : ''
            }`}
            onClick={handleHomeClick}
            id="mobile-tab-home"
          >
            <div className="nav-tab-icon-wrap">
              <Home size={20} />
            </div>
            <span className="nav-tab-label">Home</span>
          </button>

          {/* 2. Collections / Categories */}
          <button
            className={`bottom-nav-tab ${
              activeSheet === 'categories' || (selectedCategory !== 'all' && !showOnlyFavorites)
                ? 'active'
                : ''
            }`}
            onClick={handleCategoriesClick}
            id="mobile-tab-collections"
          >
            <div className="nav-tab-icon-wrap">
              <Layers size={20} />
            </div>
            <span className="nav-tab-label">Collections</span>
          </button>

          {/* 3. Search */}
          <button
            className={`bottom-nav-tab ${activeSheet === 'search' || searchQuery ? 'active' : ''}`}
            onClick={handleSearchClick}
            id="mobile-tab-search"
          >
            <div className="nav-tab-icon-wrap">
              <Search size={20} />
            </div>
            <span className="nav-tab-label">Search</span>
          </button>

          {/* 4. Saved */}
          <button
            className={`bottom-nav-tab ${showOnlyFavorites ? 'active' : ''}`}
            onClick={handleSavedClick}
            id="mobile-tab-saved"
          >
            <div className="nav-tab-icon-wrap">
              <Heart
                size={20}
                className={favorites.length > 0 || showOnlyFavorites ? 'tab-heart-filled' : ''}
              />
              {favorites.length > 0 && (
                <span className="tab-badge">{favorites.length}</span>
              )}
            </div>
            <span className="nav-tab-label">Saved</span>
          </button>

          {/* 5. Artist */}
          <button
            className="bottom-nav-tab"
            onClick={handleArtistClick}
            id="mobile-tab-artist"
          >
            <div className="nav-tab-icon-wrap">
              <User size={20} />
            </div>
            <span className="nav-tab-label">Artist</span>
          </button>
        </div>
      </nav>
    </>
  );
}
