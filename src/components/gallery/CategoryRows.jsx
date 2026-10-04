import React, { useMemo } from 'react';
import { useGallery } from '../../context/GalleryContext';
import ArtworkCard from './ArtworkCard';
import { SearchX, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import './CategoryRows.css';

function CategoryRow({ categoryLabel, artworks }) {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-row-section">
      <div className="category-row-header">
        <div className="category-row-title-wrap">
          <h2 className="category-row-title">{categoryLabel}</h2>
          <span className="category-row-count">{artworks.length} {artworks.length === 1 ? 'Artwork' : 'Artworks'}</span>
        </div>
        <div className="category-row-nav">
          <button className="row-nav-btn" onClick={() => scroll('left')} aria-label="Scroll left">
            <ChevronLeft size={20} />
          </button>
          <button className="row-nav-btn" onClick={() => scroll('right')} aria-label="Scroll right">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="category-row-scroll-container" ref={scrollRef}>
        <div className="category-row-track">
          {artworks.map(artwork => (
            <div key={artwork.id} className="category-row-item">
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryRows() {
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

  // Group the filtered artworks by category
  const groupedArtworks = React.useMemo(() => {
    const groups = {};
    filteredArtworks.forEach(art => {
      if (!groups[art.categoryLabel]) {
        groups[art.categoryLabel] = [];
      }
      groups[art.categoryLabel].push(art);
    });
    return groups;
  }, [filteredArtworks]);

  return (
    <div className="category-rows-container">
      {Object.entries(groupedArtworks).map(([categoryLabel, artworks]) => (
        <CategoryRow key={categoryLabel} categoryLabel={categoryLabel} artworks={artworks} />
      ))}
    </div>
  );
}
