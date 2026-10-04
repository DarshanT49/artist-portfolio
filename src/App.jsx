import React from 'react';
import { GalleryProvider, useGallery } from './context/GalleryContext';
import Navbar from './components/layout/Navbar';
import HeroBanner from './components/layout/HeroBanner';
import CategoryTabs from './components/gallery/CategoryTabs';
import GalleryToolbar from './components/gallery/GalleryToolbar';
import MasonryGrid from './components/gallery/MasonryGrid';
import ArtworkModal from './components/modal/ArtworkModal';
import AboutPage from './components/about/AboutPage';
import MobileBottomNav from './components/layout/MobileBottomNav';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import { Analytics } from '@vercel/analytics/react';

function MainContent() {
  const { isAboutOpen } = useGallery();

  if (isAboutOpen) {
    return <AboutPage />;
  }

  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <GalleryProvider>
      {/* Background canvas subtle grain/linen texture */}
      <div className="gallery-bg-texture" aria-hidden="true" />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="gallery-main-layout">
        <MainContent />
      </main>

      {/* Modal / Full-Screen Picture View with Description & Related Artworks */}
      <ArtworkModal />

      {/* Mobile Bottom Navigation Bar (Home, Collections, Search, Saved, Artist) */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />

      {/* User Action Feedback Toast */}
      <Toast />

      {/* Vercel Web Analytics */}
      <Analytics />
    </GalleryProvider>
  );
}

export default App;
