import React, { useEffect, useState, useRef } from 'react';

const Lightbox = ({ isOpen, currentIndex, onClose, onNext, onPrev, images }) => {
    const [isOriginal, setIsOriginal] = useState(false);
    const [glowColor, setGlowColor] = useState('rgb(190, 68, 205)');
    const imgRef = useRef(null);

    useEffect(() => {
        setGlowColor('rgb(190, 68, 205)');
    }, [currentIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
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
        const color = getDominantColor(e.target);
        setGlowColor(color);
    };

    return (
        <div className={`lightbox active`} onClick={(e) => e.target === e.currentTarget && onClose()}>
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
                    crossOrigin="anonymous"
                    onLoad={handleImageLoad}
                    style={{ boxShadow: `0 0 50px ${glowColor}, 0 0 100px ${glowColor}` }}
                />
            </div>

            <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next image">›</button>
        </div>
    );
};

export default Lightbox;
