import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import { SlidersHorizontal, Heart, X, RotateCcw } from 'lucide-react';
import './GalleryToolbar.css';

export default function GalleryToolbar() {
  const {
    filteredArtworks,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    showOnlyFavorites,
    setShowOnlyFavorites,
    sortBy,
    setSortBy,
    favorites
  } = useGallery();

  const isFiltered = selectedCategory !== 'all' || searchQuery.trim() !== '' || showOnlyFavorites;

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setShowOnlyFavorites(false);
  };

  return (
    <div className="gallery-toolbar">
      {/* Left: Count and Active Filter Tags */}
      <div className="toolbar-left">
        <span className="artworks-count">
          Showing <strong>{filteredArtworks.length}</strong> {filteredArtworks.length === 1 ? 'painting' : 'paintings'}
        </span>

        {searchQuery && (
          <div className="active-tag-chip">
            <span>Query: “{searchQuery}”</span>
            <button onClick={() => setSearchQuery('')} aria-label="Remove search filter">
              <X size={13} />
            </button>
          </div>
        )}

        {showOnlyFavorites && (
          <div className="active-tag-chip favorites-chip">
            <Heart size={12} className="heart-filled" />
            <span>Saved ({favorites.length})</span>
            <button onClick={() => setShowOnlyFavorites(false)} aria-label="Show all">
              <X size={13} />
            </button>
          </div>
        )}

        {isFiltered && (
          <button className="reset-filter-btn" onClick={handleResetFilters}>
            <RotateCcw size={12} />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Right: Controls & Sort */}
      <div className="toolbar-right">
        {/* Toggle Favorites Only */}
        <button
          className={`toolbar-fav-toggle ${showOnlyFavorites ? 'active' : ''}`}
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          title={showOnlyFavorites ? 'Show all artworks' : 'Show saved artworks only'}
        >
          <Heart size={15} className={showOnlyFavorites ? 'heart-filled' : ''} />
          <span>Saved ({favorites.length})</span>
        </button>

        {/* Sort Select */}
        <div className="sort-dropdown-container">
          <SlidersHorizontal size={14} className="sort-icon" />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort artworks"
          >
            <option value="featured">Featured Collection</option>
            <option value="newest">Newest First (2025)</option>
            <option value="title">Alphabetical (A–Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
