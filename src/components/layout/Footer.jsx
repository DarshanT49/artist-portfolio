import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import { CATEGORIES } from '../../data/categories';
import { ArrowUp, Palette, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { setSelectedCategory, setShowOnlyFavorites, setIsAboutOpen } = useGallery();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setShowOnlyFavorites(false);
    const gallerySection = document.getElementById('gallery-showcase');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="gallery-footer">
      <div className="container">
        {/* Top split */}
        <div className="footer-top-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-brand-col">
        
            <h3 className="footer-brand-title">BHARTESH</h3>
            <p className="footer-brand-desc">
              Personal Art & Painting Portfolio. A celebration of natural earth pigments,
              textural oil glazes, and minimalist serenity.
            </p>
            
          </div>

          {/* Col 2: Categories / Collections */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Collections</h4>
            <ul className="footer-links-list">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button onClick={() => handleCategoryClick(cat.id)}>
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio & Navigation */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Studio Atelier</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => setIsAboutOpen(true)}>Artist Profile & Bio</button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)}>Exhibition History</button>
              </li>
              <li>
                <button onClick={() => setShowOnlyFavorites(true)}>
                  <Heart size={13} style={{ marginRight: 6 }} />
                  Saved Pinboard
                </button>
              </li>
              <li>
                <button onClick={scrollToTop}>Return to Top</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-wrapper">
            <span className="footer-copyright">
              © {new Date().getFullYear()} Bhartesh Art Gallery. All rights reserved.
            </span>
            <a 
              href="https://darshan-takade.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-credit"
            >
              Designed & Developed by Darshan Takade
            </a>
          </div>

          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
