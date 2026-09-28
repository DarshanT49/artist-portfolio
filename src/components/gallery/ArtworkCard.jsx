import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { Heart, Maximize2 } from 'lucide-react';
import './ArtworkCard.css';

export default function ArtworkCard({ artwork }) {
  const { openArtwork, toggleFavorite, isFavorite } = useGallery();
  const [imageLoaded, setImageLoaded] = useState(false);
  const favorited = isFavorite(artwork.id);

  return (
    <article
      className={`artwork-card ${imageLoaded ? 'loaded' : 'loading'}`}
      onClick={() => openArtwork(artwork.id)}
      tabIndex={0}
      role="button"
      aria-label={`View ${artwork.title} details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openArtwork(artwork.id);
        }
      }}
    >
      <div className="card-media-wrapper">
        {/* Skeleton placeholder */}
        {!imageLoaded && (
          <div className="card-skeleton" style={{ background: artwork.palette[1] || '#EFE9E3' }} />
        )}

        <img
          src={artwork.thumbnail}
          alt={artwork.title}
          className="artwork-image"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Pinterest-style overlay */}
        <div className="card-overlay">
          {/* Top action row */}
          <div className="overlay-top">
            <span className="overlay-category">{artwork.categoryLabel}</span>
            <button
              className={`overlay-save-btn ${favorited ? 'saved' : ''}`}
              onClick={(e) => toggleFavorite(artwork.id, e)}
              title={favorited ? 'Remove from collection' : 'Save to collection'}
              aria-label={favorited ? 'Remove from collection' : 'Save to collection'}
            >
              <Heart size={16} className={favorited ? 'heart-icon-filled' : ''} />
              <span>{favorited ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Bottom info row */}
          <div className="overlay-bottom">
            <div className="overlay-text">
              <h3 className="overlay-title">{artwork.title}</h3>
              <p className="overlay-medium">{artwork.medium} • {artwork.year}</p>
            </div>
            <div className="overlay-expand-icon">
              <Maximize2 size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-visible info below card for touch users */}
      <div className="card-caption-mobile">
        <h4 className="caption-title">{artwork.title}</h4>
        <div className="caption-meta">
          <span>{artwork.categoryLabel}</span>
          <span>•</span>
          <span>{artwork.year}</span>
        </div>
      </div>
    </article>
  );
}
