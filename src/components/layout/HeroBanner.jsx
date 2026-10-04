import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import { Sparkles, ArrowDown } from 'lucide-react';
import './HeroBanner.css';

export default function HeroBanner() {
  const { setIsAboutOpen } = useGallery();

  const scrollToGallery = () => {
    const el = document.getElementById('gallery-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-banner">
      <div className="hero-content">
        {/* Subtle pill tag */}
        <div className="hero-tag">
          <Sparkles size={14} className="tag-sparkle" />
          <span>Personal Art Collection • Portfolio 2024–2025</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          Silence, Texture &<br />
          <em>The Anatomy of Light</em>
        </h1>

        {/* Curator Statement */}
        <p className="hero-description">
          An intimate visual archive of original paintings by <strong>Bhartesh</strong>. 
          Exploring delicate impasto textures, raw linen, mineral pigments, and the quiet poetry 
          found in contemplation.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button className="hero-primary-btn" onClick={scrollToGallery}>
            <span>View Paintings</span>
            <ArrowDown size={16} />
          </button>
          <button className="hero-secondary-btn" onClick={() => setIsAboutOpen(true)}>
            <span>Artist Statement</span>
          </button>
        </div>
      </div>
    </section>
  );
}
