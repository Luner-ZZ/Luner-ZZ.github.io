import React, { useEffect, useState, useRef } from 'react';

const Lightbox = ({ isOpen, currentIndex, onClose, onNext, onPrev, images, cachedColors, onColorCalculated }) => {
    const [isOriginal, setIsOriginal] = useState(false);
    // Initialize with cached color if available, otherwise default
    const [glowColor, setGlowColor] = useState('rgb(190, 68, 205)');

    // Update local glow when currentIndex changes
    useEffect(() => {
        if (cachedColors[currentIndex]) {
            setGlowColor(cachedColors[currentIndex]);
        } else {
            setGlowColor('rgb(190, 68, 205)');
        }
    }, [currentIndex, cachedColors]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsOriginal(true);
        }

        // Cleanup function ensures scroll is restored even if component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

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

    if (!isOpen || !images || !images[currentIndex]) return null;

    const currentImage = images[currentIndex];
    const imgSrc = (isOriginal && currentImage.original) ? currentImage.original : currentImage.webp;

    const toggleQuality = () => {
        setIsOriginal(!isOriginal);
    };

    const getDominantColor = (imgElement) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = imgElement.naturalWidth || imgElement.width;
            canvas.height = imgElement.naturalHeight || imgElement.height;

            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let r = 0, g = 0, b = 0;
            let count = 0;

            for (let i = 0; i < data.length; i += 40) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }

            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;

            if (saturation < 0.3) {
                const boost = 1.5;
                r = Math.min(255, Math.floor(r * boost));
                g = Math.min(255, Math.floor(g * boost));
                b = Math.min(255, Math.floor(b * boost));
            }

            return `rgb(${r}, ${g}, ${b})`;
        } catch (e) {
            return 'rgb(190, 68, 205)';
        }
    };

    const handleImageLoad = (e) => {
        // If we already have a cached color for this index, don't recalculate
        // This prevents the "switch" effect when toggling quality
        if (cachedColors[currentIndex]) return;

        const color = getDominantColor(e.target);
        setGlowColor(color);
        onColorCalculated(currentIndex, color);
    };

    return (
        <div className={`lightbox active`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close lightbox">×</button>
            <button className="quality-toggle" onClick={(e) => { e.stopPropagation(); toggleQuality(); }}>
                {isOriginal ? 'View Compressed' : 'View Original Quality'}
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous image">‹</button>

            <div className="lightbox-content">
                <img
                    key={currentIndex}
                    id="lightbox-img"
                    className="lightbox-img"
                    src={imgSrc}
                    alt={currentImage.alt}
                    crossOrigin="anonymous"
                    onLoad={handleImageLoad}
                    style={{ boxShadow: `0 0 50px ${glowColor}, 0 0 100px ${glowColor}` }}
                />
            </div>

            <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next image">›</button>
        </div>
    );
};

export default Lightbox;
