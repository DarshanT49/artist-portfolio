import React, { useEffect } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { ARTIST_INFO } from '../../data/artworks';
import { X, Sparkles, MapPin, Award, Mail, ExternalLink, Palette } from 'lucide-react';
import './AboutModal.css';

export default function AboutModal() {
  const { isAboutOpen, setIsAboutOpen } = useGallery();

  useEffect(() => {
    if (!isAboutOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAboutOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAboutOpen, setIsAboutOpen]);

  if (!isAboutOpen) return null;

  return (
    <div className="about-modal-backdrop" onClick={() => setIsAboutOpen(false)}>
      <div className="about-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="about-dialog-header">
          <div className="about-title-wrap">
            <Sparkles size={16} className="about-sparkle" />
            <span>Artist Portfolio & Statement</span>
          </div>
          <button
            className="about-close-btn"
            onClick={() => setIsAboutOpen(false)}
            aria-label="Close about modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="about-dialog-body">
          {/* Artist Profile Header */}
          <div className="about-profile-hero">
            <div className="about-avatar-ring">
              <div className="about-avatar-inner">D</div>
            </div>
            <div className="about-profile-info">
              <h2 className="about-artist-name">{ARTIST_INFO.name}</h2>
              <p className="about-artist-title">{ARTIST_INFO.title}</p>
              <div className="about-location">
                <MapPin size={13} />
                <span>{ARTIST_INFO.location} • {ARTIST_INFO.experience}</span>
              </div>
            </div>
          </div>

          {/* Philosophy Quote */}
          <blockquote className="about-philosophy-quote">
            <p>{ARTIST_INFO.philosophy}</p>
          </blockquote>

          {/* Bio text */}
          <div className="about-bio-text">
            <p>{ARTIST_INFO.bio}</p>
            <p>
              Working with raw Belgian linen, hand-milled oil glazes, cold wax, and organic mineral pigments, 
              each piece is a dialogue between deliberate geometric structure and spontaneous, tactile natural decay.
            </p>
          </div>

          {/* Career Stats */}
          <div className="about-stats-grid">
            {ARTIST_INFO.stats.map((stat, idx) => (
              <div key={idx} className="about-stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Selected Exhibitions */}
          <div className="about-section">
            <h4 className="about-section-heading">
              <Award size={15} />
              <span>Selected Exhibitions</span>
            </h4>
            <div className="about-exhibitions-list">
              {ARTIST_INFO.exhibitions.map((ex, idx) => (
                <div key={idx} className="exhibition-item">
                  <span className="exhibition-year">{ex.year}</span>
                  <span className="exhibition-title">{ex.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Palette Tribute */}
          <div className="about-palette-tribute">
            <div className="tribute-header">
              <Palette size={14} />
              <span>Signature Gallery Palette</span>
            </div>
            <div className="tribute-colors">
              <div className="tribute-swatch" style={{ background: '#F9F8F6' }}>
                <span className="tribute-code">#F9F8F6</span>
                <span className="tribute-name">Alabaster</span>
              </div>
              <div className="tribute-swatch" style={{ background: '#EFE9E3' }}>
                <span className="tribute-code">#EFE9E3</span>
                <span className="tribute-name">Warm Linen</span>
              </div>
              <div className="tribute-swatch" style={{ background: '#D9CFC7' }}>
                <span className="tribute-code">#D9CFC7</span>
                <span className="tribute-name">Stone Umber</span>
              </div>
              <div className="tribute-swatch" style={{ background: '#C9B59C' }}>
                <span className="tribute-code">#C9B59C</span>
                <span className="tribute-name">Desert Clay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="about-dialog-footer">
          <div className="contact-note">
            <Mail size={14} />
            <span>Studio inquiries: <strong>darshan.studio@gallery.art</strong></span>
          </div>
          <button className="about-dismiss-btn" onClick={() => setIsAboutOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
