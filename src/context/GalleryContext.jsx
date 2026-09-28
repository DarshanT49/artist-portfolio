import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ARTWORKS } from '../data/artworks';

const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const [artworks] = useState(ARTWORKS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArtworkId, setActiveArtworkId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('darshan_gallery_favs');
      return saved ? JSON.parse(saved) : ['art-01', 'art-03'];
    } catch {
      return ['art-01', 'art-03'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('darshan_gallery_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from collection' : 'Saved to personal collection');
      return updated;
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 2400);
  };

  // Filtered artworks based on category, search, and favorites
  const filteredArtworks = useMemo(() => {
    return artworks.filter(art => {
      // Category filter
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(art.id)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = art.title.toLowerCase().includes(query);
        const matchMedium = art.medium.toLowerCase().includes(query);
        const matchCategory = art.categoryLabel.toLowerCase().includes(query);
        const matchYear = art.year.includes(query);
        const matchTags = art.tags.some(tag => tag.toLowerCase().includes(query));
        const matchDesc = art.description.toLowerCase().includes(query);
        return matchTitle || matchMedium || matchCategory || matchYear || matchTags || matchDesc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return parseInt(b.year) - parseInt(a.year);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [artworks, selectedCategory, searchQuery, showOnlyFavorites, favorites, sortBy]);

  // Active artwork object
  const activeArtwork = useMemo(() => {
    if (!activeArtworkId) return null;
    return artworks.find(art => art.id === activeArtworkId) || null;
  }, [artworks, activeArtworkId]);

  // Related artworks for modal view: match same category or shared tags
  const relatedArtworks = useMemo(() => {
    if (!activeArtwork) return [];
    return artworks
      .filter(art => art.id !== activeArtwork.id)
      .map(art => {
        let score = 0;
        if (art.category === activeArtwork.category) score += 3;
        const sharedTags = art.tags.filter(tag => activeArtwork.tags.includes(tag)).length;
        score += sharedTags * 2;
        return { art, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.art);
  }, [artworks, activeArtwork]);

  // Modal navigation (next / previous)
  const goToNextArtwork = () => {
    if (!activeArtworkId) return;
    const currentIndex = filteredArtworks.findIndex(art => art.id === activeArtworkId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredArtworks.length;
    setActiveArtworkId(filteredArtworks[nextIndex].id);
  };

  const goToPrevArtwork = () => {
    if (!activeArtworkId) return;
    const currentIndex = filteredArtworks.findIndex(art => art.id === activeArtworkId);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    setActiveArtworkId(filteredArtworks[prevIndex].id);
  };

  const openArtwork = (id) => {
    setActiveArtworkId(id);
    setIsFullscreen(false);
  };

  const closeArtwork = () => {
    setActiveArtworkId(null);
    setIsFullscreen(false);
  };

  return (
    <GalleryContext.Provider value={{
      artworks,
      filteredArtworks,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      activeArtwork,
      activeArtworkId,
      openArtwork,
      closeArtwork,
      relatedArtworks,
      goToNextArtwork,
      goToPrevArtwork,
      isFullscreen,
      setIsFullscreen,
      favorites,
      toggleFavorite,
      isFavorite,
      showOnlyFavorites,
      setShowOnlyFavorites,
      sortBy,
      setSortBy,
      isAboutOpen,
      setIsAboutOpen,
      toastMessage,
      showToast
    }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}
