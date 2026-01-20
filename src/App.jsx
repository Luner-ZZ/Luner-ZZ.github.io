import React, { useState } from 'react';
import Header from './components/Header';
import VideoSection from './components/VideoSection';
import ThumbnailSection from './components/ThumbnailSection';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import './index.css'; // Global styles

function App() {
  const [activeTab, setActiveTab] = useState('videos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Data for thumbnails (shared with ThumbnailSection and Lightbox)
  const thumbnails = [
    {
      webp: '/thumbnails/thumb1.webp',
      original: '/thumbnails/thumb1.png',
      alt: 'Professional gaming thumbnail with vibrant effects'
    },
    {
      webp: '/thumbnails/thumb2.webp',
      original: '/thumbnails/thumb2.png',
      alt: 'Eye-catching YouTube thumbnail design'
    },
    {
      webp: '/thumbnails/thumb3.webp',
      original: '/thumbnails/thumb3.png',
      alt: 'Creative thumbnail with bold typography'
    },
    {
      webp: '/thumbnails/thumb4.webp',
      original: '/thumbnails/thumb4.png',
      alt: 'Modern thumbnail design with gradient overlays'
    }
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % thumbnails.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + thumbnails.length) % thumbnails.length);
  };

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'videos' && <VideoSection />}
      {activeTab === 'thumbs' && <ThumbnailSection openLightbox={openLightbox} />}

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        images={thumbnails}
      />

      <BackToTop />
      <Footer />
    </>
  );
}

export default App;
