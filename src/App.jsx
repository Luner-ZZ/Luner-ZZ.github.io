import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import './index.css'; // Global styles

// Lazy load heavy components
const VideoSection = React.lazy(() => import('./components/VideoSection'));
const ThumbnailSection = React.lazy(() => import('./components/ThumbnailSection'));
const Lightbox = React.lazy(() => import('./components/Lightbox'));

function App() {
  const [activeTab, setActiveTab] = useState('videos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cachedColors, setCachedColors] = useState({});

  const updateColorCache = (index, color) => {
    setCachedColors(prev => ({ ...prev, [index]: color }));
  };

  // Global click listener for Text Selection capability
  React.useEffect(() => {
    let textSelectable = false;
    const handleClick = (e) => {
      // If click is NOT on an interactive element, allow selection
      if (!textSelectable && !e.target.closest('.nav-btn, .thumb-card, .lightbox, .back-to-top, a, button')) {
        document.body.classList.add('text-selectable');
        textSelectable = true;
      }
    };

    const handleDblClick = (e) => {
      if (e.target === document.body || e.target.tagName === 'HTML' || !e.target.closest('.text-selectable')) {
        document.body.classList.remove('text-selectable');
        textSelectable = false;
        window.getSelection().removeAllRanges();
      }
    };

    document.body.addEventListener('click', handleClick);
    document.body.addEventListener('dblclick', handleDblClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
      document.body.removeEventListener('dblclick', handleDblClick);
    };
  }, []);

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

      <Suspense fallback={<div style={{ minHeight: '50vh' }}></div>}>
        {activeTab === 'videos' && <VideoSection />}
        {activeTab === 'thumbs' && <ThumbnailSection openLightbox={openLightbox} thumbnails={thumbnails} />}
      </Suspense>

      <Suspense fallback={null}>
        {lightboxOpen && (
          <Lightbox
            isOpen={lightboxOpen}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            images={thumbnails}
            cachedColors={cachedColors}
            onColorCalculated={updateColorCache}
          />
        )}
      </Suspense>

      <BackToTop />
      <Footer />
    </>
  );
}

export default App;
