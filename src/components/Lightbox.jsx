import React, { useEffect, useState, useRef } from 'react';

const Lightbox = ({ isOpen, currentIndex, onClose, onNext, onPrev, images }) => {
    const [isOriginal, setIsOriginal] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset quality when opening a new image? Or keep preference? 
            // Original logic reset it on close, but persisted during navigation?
            // Original: openLightbox -> isOriginalQuality = true (wait, code said: isOriginalQuality = true; ... then fallback handling)
            // Actually original logic: openLightbox sets isOriginalQuality = true initially but checks if original exists.
            // Let's default to false (compressed) or true depending on user preference?
            // Code says: function openLightbox(index) { isOriginalQuality = true; ... if(originalSrc) ... else isOriginalQuality = false }
            // So it defaults to high quality if available.
            setIsOriginal(true);
        } else {
            document.body.style.overflow = '';
            setIsOriginal(false);
        }
    }, [isOpen, currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'q' || e.key === 'Q') toggleQuality();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onNext, onPrev, onClose]);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];
    // Determine source based on quality toggle
    // original logic: if isOriginal && data-original, use it. else use compressed.
    const imgSrc = (isOriginal && currentImage.original) ? currentImage.original : currentImage.webp;

    const toggleQuality = () => {
        setIsOriginal(!isOriginal);
    };

    const getDominantColor = () => {
        // Complex logic to extract color on client side canvas.
        // For React, we might want to skip this or implement it in a useEffect on image load
        // For now, let's keep it simple or port the color logic if requested.
        // The original code uses a canvas to get average color for glow.
        return 'rgb(190, 68, 205)'; // Fallback default
    };

    return (
        <div className={`lightbox active`} onClick={(e) => e.target.className.includes('lightbox') && onClose()}>
            <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">×</button>
            <button className="quality-toggle" onClick={toggleQuality}>
                {isOriginal ? 'View Compressed' : 'View Original Quality'}
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous image">‹</button>

            <div className="lightbox-content">
                <img
                    ref={imgRef}
                    id="lightbox-img"
                    className="lightbox-img"
                    src={imgSrc}
                    alt={currentImage.alt}
                    style={{ boxShadow: `0 0 50px ${getDominantColor()}, 0 0 100px ${getDominantColor()}` }}
                />
            </div>

            <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next image">›</button>
        </div>
    );
};

export default Lightbox;
