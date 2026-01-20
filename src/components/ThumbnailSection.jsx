import React, { useEffect } from 'react';

const ThumbnailSection = ({ openLightbox }) => {
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

    useEffect(() => {
        // Re-implement intersection observer for lazy loading logic here if needed,
        // or rely on native loading="lazy" and the CSS blur-up which we will support.

        // Simple improved lazy loader matching the original logic
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const thumbCard = img.closest('.thumb-card');

                    const compressedSrc = img.getAttribute('data-src');
                    if (compressedSrc) {
                        img.src = compressedSrc;
                        img.onload = () => {
                            img.classList.add('loaded');
                            if (thumbCard) thumbCard.classList.add('loaded');
                        };
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        document.querySelectorAll('.thumb-img').forEach(img => imageObserver.observe(img));

        return () => imageObserver.disconnect();
    }, []);

    return (
        <div className="tab-content active-content">
            <h2 className="section-title">Thumbnails | Designs</h2>
            <div className="thumbnail-grid">
                {thumbnails.map((thumb, index) => (
                    <div
                        className="thumb-card"
                        key={index}
                        onClick={() => openLightbox(index)}
                    >
                        <picture>
                            <source srcSet={thumb.webp} type="image/webp" />
                            <img
                                className="thumb-img"
                                data-src={thumb.webp}
                                data-original={thumb.original}
                                src={thumb.webp} // Fallback or placeholder
                                alt={thumb.alt}
                                loading="lazy"
                            />
                        </picture>
                        <div className="thumb-overlay">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThumbnailSection;
