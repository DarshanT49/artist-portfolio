import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { CATEGORIES } from '../../data/categories';
import { Search, X, Heart, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
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

  const [searchFocused, setSearchFocused] = useState(false);

  const handleHomeClick = () => {
    setIsAboutOpen(false);
    setSelectedCategory('all');
    setSearchQuery('');
    setShowOnlyFavorites(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (catId) => {
    setIsAboutOpen(false);
    setSelectedCategory(catId);
    setShowOnlyFavorites(false);
    const gallerySection = document.getElementById('gallery-showcase');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFavoritesClick = () => {
    setIsAboutOpen(false);
    setShowOnlyFavorites(!showOnlyFavorites);
    const gallerySection = document.getElementById('gallery-showcase');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand" onClick={handleHomeClick} role="button" tabIndex={0}>
          <div className="brand-monogram">
            <span>B</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">BHARTESH</span>
            <span className="brand-tagline">Art Gallery</span>
          </div>
        </div>

        {/* Search Bar - Center */}
        <div className={`navbar-search ${searchFocused ? 'focused' : ''}`}>
          <Search className="search-icon" size={18} />
          <input
            type="text"
            id="gallery-search-input"
            placeholder="Search paintings, mediums, styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search art gallery"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-actions">
          <button
            className={`nav-btn ${selectedCategory === 'all' && !showOnlyFavorites && !searchQuery ? 'active' : ''}`}
            onClick={handleHomeClick}
            id="nav-home-btn"
          >
            Home
          </button>

          {/* Categories Pill Dropdown / Quick Links */}
          <div className="nav-dropdown-wrapper">
            <button
              className={`nav-btn ${selectedCategory !== 'all' && !showOnlyFavorites ? 'active' : ''}`}
              id="nav-categories-btn"
            >
              <span>Collections</span>
              <span className="dropdown-caret">▾</span>
            </button>
            <div className="nav-dropdown-menu">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`dropdown-item ${selectedCategory === cat.id && !showOnlyFavorites ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="dropdown-item-count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Saved / Favorites Pinboard */}
          <button
            className={`nav-btn fav-btn ${showOnlyFavorites ? 'active' : ''}`}
            onClick={handleFavoritesClick}
            id="nav-favorites-btn"
            title="Saved Artworks"
          >
            <Heart size={18} className={favorites.length > 0 ? 'heart-filled' : ''} />
            <span className="fav-label">Saved</span>
            {favorites.length > 0 && (
              <span className="fav-badge">{favorites.length}</span>
            )}
          </button>

          {/* About Artist */}
          <button
            className="nav-btn about-btn"
            onClick={() => setIsAboutOpen(true)}
            id="nav-about-btn"
          >
            <User size={17} />
            <span>Artist</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
