import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import ArtworkCard from './ArtworkCard';
import { SearchX, RotateCcw } from 'lucide-react';
import './MasonryGrid.css';

export default function MasonryGrid() {
  const { filteredArtworks, searchQuery, setSearchQuery, setSelectedCategory, setShowOnlyFavorites } = useGallery();

  const handleReset = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setShowOnlyFavorites(false);
  };

  if (filteredArtworks.length === 0) {
    return (
      <div className="gallery-empty-state">
        <div className="empty-icon-wrap">
          <SearchX size={38} />
        </div>
        <h3 className="empty-title">No artworks match your search</h3>
        <p className="empty-text">
          {searchQuery
            ? `We couldn't find any paintings matching “${searchQuery}”. Try searching for “oil”, “watercolor”, “landscape”, or “abstract”.`
            : "No paintings found in this collection filter."}
        </p>
        <button className="empty-reset-btn" onClick={handleReset}>
          <RotateCcw size={15} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pinterest-masonry-wrapper">
      <div className="pinterest-masonry-grid">
        {filteredArtworks.map(artwork => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
