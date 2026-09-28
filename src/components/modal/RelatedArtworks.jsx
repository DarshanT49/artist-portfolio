import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import './RelatedArtworks.css';

export default function RelatedArtworks({ modalContainerRef }) {
  const { relatedArtworks, openArtwork, toggleFavorite, isFavorite } = useGallery();

  if (!relatedArtworks || relatedArtworks.length === 0) return null;

  const handleSelectRelated = (artId) => {
    openArtwork(artId);
    if (modalContainerRef && modalContainerRef.current) {
      modalContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="related-artworks-section">
      <div className="related-section-header">
        <div className="related-title-wrap">
          <Sparkles size={16} className="related-sparkle" />
          <h3 className="related-title">Related Works & Complementary Aesthetics</h3>
        </div>
        <span className="related-subtitle">Discover pieces with similar medium, palette, and thematic resonance</span>
      </div>

      <div className="related-cards-grid">
        {relatedArtworks.map(art => {
          const favorited = isFavorite(art.id);
          return (
            <div
              key={art.id}
              className="related-card"
              onClick={() => handleSelectRelated(art.id)}
              tabIndex={0}
              role="button"
              aria-label={`View related artwork ${art.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSelectRelated(art.id);
              }}
            >
              <div className="related-img-box">
                <img src={art.thumbnail} alt={art.title} loading="lazy" />
                <button
                  className={`related-fav-btn ${favorited ? 'saved' : ''}`}
                  onClick={(e) => toggleFavorite(art.id, e)}
                  title="Save artwork"
                >
                  <Heart size={14} className={favorited ? 'heart-filled' : ''} />
                </button>
              </div>

              <div className="related-meta">
                <h4 className="related-art-title">{art.title}</h4>
                <div className="related-art-details">
                  <span>{art.categoryLabel}</span>
                  <span>•</span>
                  <span>{art.year}</span>
                </div>
                <div className="related-view-link">
                  <span>View artwork</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
