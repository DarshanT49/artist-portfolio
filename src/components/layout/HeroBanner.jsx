import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import { Sparkles, ArrowDown, Palette } from 'lucide-react';
import './HeroBanner.css';

export default function HeroBanner() {
  const { setIsAboutOpen, artworks } = useGallery();

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
          An intimate visual archive of original paintings by <strong>Darshan</strong>. 
          Exploring delicate impasto textures, raw linen, mineral pigments, and the quiet poetry 
          found in contemplation.
        </p>

        {/* Palette Strip Highlight */}
        <div className="palette-strip">
          <div className="palette-strip-label">
            <Palette size={13} />
            <span>Studio Palette</span>
          </div>
          <div className="palette-swatches">
            <div className="swatch" style={{ background: '#F9F8F6' }} title="#F9F8F6 • Alabaster White">
              <span>#F9F8F6</span>
            </div>
            <div className="swatch" style={{ background: '#EFE9E3' }} title="#EFE9E3 • Warm Canvas">
              <span>#EFE9E3</span>
            </div>
            <div className="swatch" style={{ background: '#D9CFC7' }} title="#D9CFC7 • Muted Stone">
              <span>#D9CFC7</span>
            </div>
            <div className="swatch" style={{ background: '#C9B59C' }} title="#C9B59C • Desert Clay">
              <span>#C9B59C</span>
            </div>
          </div>
        </div>

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
