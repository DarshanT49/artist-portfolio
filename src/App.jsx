import React from 'react';
import { GalleryProvider } from './context/GalleryContext';
import Navbar from './components/layout/Navbar';
import HeroBanner from './components/layout/HeroBanner';
import CategoryTabs from './components/gallery/CategoryTabs';
import GalleryToolbar from './components/gallery/GalleryToolbar';
import MasonryGrid from './components/gallery/MasonryGrid';
import ArtworkModal from './components/modal/ArtworkModal';
import AboutModal from './components/about/AboutModal';
import MobileBottomNav from './components/layout/MobileBottomNav';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';

function App() {
  return (
    <GalleryProvider>
      {/* Background canvas subtle grain/linen texture */}
      <div className="gallery-bg-texture" aria-hidden="true" />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="gallery-main-layout">
        {/* Hero Section */}
        <HeroBanner />

        {/* Gallery Showcase Section */}
        <section id="gallery-showcase" className="gallery-section">
          <div className="container">
            {/* Category Pills (Pinterest Style) */}
            <CategoryTabs />

            {/* Toolbar (Result count, Sort dropdown, Saved filter) */}
            <GalleryToolbar />

            {/* Pinterest-Style Masonry Grid */}
            <MasonryGrid />
          </div>
        </section>
      </main>

      {/* Modal / Full-Screen Picture View with Description & Related Artworks */}
      <ArtworkModal />

      {/* Artist Profile & Statement Modal */}
      <AboutModal />

      {/* Mobile Bottom Navigation Bar (Home, Collections, Search, Saved, Artist) */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />

      {/* User Action Feedback Toast */}
      <Toast />
    </GalleryProvider>
  );
}

export default App;
