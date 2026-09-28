import React, { useRef } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { CATEGORIES } from '../../data/categories';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CategoryTabs.css';

export default function CategoryTabs() {
  const { selectedCategory, setSelectedCategory, setShowOnlyFavorites } = useGallery();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSelect = (id) => {
    setSelectedCategory(id);
    setShowOnlyFavorites(false);
  };

  return (
    <div className="category-tabs-container">
      <button
        className="scroll-arrow-btn left"
        onClick={() => scroll('left')}
        aria-label="Scroll categories left"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="category-tabs-scroll" ref={scrollRef}>
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`cat-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(cat.id)}
              id={`cat-btn-${cat.id}`}
            >
              <span className="cat-label">{cat.label}</span>
              <span className="cat-pill-count">{cat.count}</span>
            </button>
          );
        })}
      </div>

      <button
        className="scroll-arrow-btn right"
        onClick={() => scroll('right')}
        aria-label="Scroll categories right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
