import React, { useEffect, useRef, useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import RelatedArtworks from './RelatedArtworks';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Check,
  Calendar,
  Ruler,
  Tag
} from 'lucide-react';
import './ArtworkModal.css';

export default function ArtworkModal() {
  const {
    activeArtwork,
    closeArtwork,
    goToNextArtwork,
    goToPrevArtwork,
    toggleFavorite,
    isFavorite,
    isFullscreen,
    setIsFullscreen,
    showToast
  } = useGallery();

  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalScrollRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    if (!activeArtwork) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          closeArtwork();
        }
      } else if (e.key === 'ArrowRight') {
        goToNextArtwork();
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        goToPrevArtwork();
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeArtwork, isFullscreen, closeArtwork, goToNextArtwork, goToPrevArtwork, setIsFullscreen]);

  if (!activeArtwork) return null;

  const favorited = isFavorite(activeArtwork.id);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        showToast('Link to artwork copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } else {
        showToast('Link ready to share!');
      }
    } catch {
      showToast('Artwork URL ready to share');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('artwork-modal-backdrop')) {
      closeArtwork();
    }
  };

  return (
    <div
      className={`artwork-modal-backdrop ${isFullscreen ? 'fullscreen-active' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeArtwork.title} Details`}
    >
      {/* Top Floating Control Bar */}
      <header className="modal-top-bar">
        <div className="top-bar-left">
          <span className="modal-category-pill">{activeArtwork.categoryLabel}</span>
          <span className="modal-artwork-year">{activeArtwork.year}</span>
        </div>

        <div className="top-bar-right">
          {/* Share */}
          <button
            className="modal-action-btn"
            onClick={handleShare}
            title="Share artwork link"
            aria-label="Share artwork"
          >
            {copied ? <Check size={18} color="#2A7B4C" /> : <Share2 size={18} />}
          </button>

          {/* Save / Heart */}
          <button
            className={`modal-action-btn save-btn ${favorited ? 'saved' : ''}`}
            onClick={(e) => toggleFavorite(activeArtwork.id, e)}
            title={favorited ? 'Remove from saved' : 'Save to personal collection'}
            aria-label="Favorite artwork"
          >
            <Heart size={18} className={favorited ? 'heart-filled' : ''} />
            <span className="btn-text">{favorited ? 'Saved' : 'Save'}</span>
          </button>

          {/* Close Modal */}
          <button
            className="modal-close-btn"
            onClick={closeArtwork}
            title="Close (Esc)"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Prev / Next navigation floating buttons */}
      <button
        className="modal-nav-arrow prev"
        onClick={() => {
          goToPrevArtwork();
          setIsZoomed(false);
        }}
        title="Previous painting (Left Arrow)"
        aria-label="Previous artwork"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        className="modal-nav-arrow next"
        onClick={() => {
          goToNextArtwork();
          setIsZoomed(false);
        }}
        title="Next painting (Right Arrow)"
        aria-label="Next artwork"
      >
        <ChevronRight size={28} />
      </button>

      {/* Scrollable Container */}
      <div className="modal-scroll-container" ref={modalScrollRef}>
        <div className="modal-content-card">
          {/* Main Showcase Split Row */}
          <div className="artwork-showcase-grid">
            {/* Visual Media Showcase */}
            <div className={`artwork-media-stage ${isZoomed ? 'zoomed' : ''}`}>
              <div
                className="artwork-image-frame"
                onClick={() => setIsZoomed(!isZoomed)}
                title="Click to toggle inspection zoom"
              >
                <img
                  src={activeArtwork.image}
                  alt={activeArtwork.title}
                  className="showcase-main-image"
                />
              </div>
            </div>

            {/* Artwork Technical & Narrative Details */}
            <div className="artwork-details-panel">
              <div className="details-header">
                <div className="details-top-badge">
                  <span>Fine Art Collection</span>
                  <span>•</span>
                  <span>Catalogue No. {activeArtwork.id.toUpperCase()}</span>
                </div>

                <h2 className="artwork-modal-title">{activeArtwork.title}</h2>
                <div className="artwork-artist-credit">Original Artwork by <strong>Darshan</strong></div>
              </div>

              {/* Specification Grid (Dimensions & Year) */}
              <div className="artwork-specs-grid">
                <div className="spec-item">
                  <div className="spec-label">
                    <Ruler size={13} />
                    <span>Dimensions</span>
                  </div>
                  <div className="spec-value">{activeArtwork.dimensions}</div>
                </div>

                <div className="spec-item">
                  <div className="spec-label">
                    <Calendar size={13} />
                    <span>Year Created</span>
                  </div>
                  <div className="spec-value">{activeArtwork.year} (Original)</div>
                </div>
              </div>

              {/* Artwork Description */}
              <div className="artwork-narrative-section">
                <h4 className="narrative-heading">Curator & Artist Note</h4>
                <p className="narrative-text">{activeArtwork.description}</p>
              </div>

              

              {/* Tags */}
              <div className="artwork-tags-row">
                <div className="tags-label">
                  <Tag size={13} />
                  <span>Themes:</span>
                </div>
                <div className="tags-list">
                  {activeArtwork.tags.map((tag, i) => (
                    <span key={i} className="artwork-tag-pill">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="modal-cta-row">
                <button
                  className={`modal-primary-save ${favorited ? 'saved' : ''}`}
                  onClick={(e) => toggleFavorite(activeArtwork.id, e)}
                >
                  <Heart size={16} className={favorited ? 'heart-filled' : ''} />
                  <span>{favorited ? 'In Your Saved Collection' : 'Save to Personal Collection'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* RELATED PAINTINGS SECTION (Below Description) */}
          <RelatedArtworks modalContainerRef={modalScrollRef} />
        </div>
      </div>
    </div>
  );
}
