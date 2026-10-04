import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useGallery } from '../../context/GalleryContext';
import './HeroShowcase.css';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroShowcase() {
  const { artworks, openArtwork } = useGallery();
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })]
  );

  const handleScrollLeft = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleScrollRight = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Find 5 featured images
  const featuredArtworks = artworks.filter(art => art.featured).slice(0, 5);
  const displayArtworks = featuredArtworks.length >= 5 ? featuredArtworks : artworks.slice(0, 5);

  if (displayArtworks.length === 0) return null;

  return (
    <section className="hero-showcase">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {displayArtworks.map((art, index) => (
            <div key={art.id} className="embla__slide hero-card full-size">
              <img 
                src={art.image} 
                alt={art.title} 
                className="hero-image"
                loading={index < 2 ? "eager" : "lazy"}
              />
              <div className="hero-card-overlay left-aligned">
                <div className="hero-card-content">
                  <span className="hero-category">{art.categoryLabel}</span>
                  <h3 className="hero-art-title">{art.title}</h3>
                  <p className="hero-art-desc">{art.medium} • {art.year}</p>
                  <button className="hero-view-btn" onClick={() => openArtwork(art.id)}>
                    <Play size={16} fill="currentColor" /> View Masterpiece
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="hero-nav-btn prev-btn" 
        onClick={handleScrollLeft}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} />
      </button>
      
      <button 
        className="hero-nav-btn next-btn" 
        onClick={handleScrollRight}
        aria-label="Next Slide"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
}
