import React from 'react';

const ThumbnailSection = ({ openLightbox, thumbnails }) => {
    // Thumbnails data is passed via props to maintain single source of truth

    const handleImageLoad = (e) => {
        const img = e.target;
        const thumbCard = img.closest('.thumb-card');
        img.classList.add('loaded');
        if (thumbCard) thumbCard.classList.add('loaded');
    };

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
                                src={thumb.webp}
                                alt={thumb.alt}
                                loading="lazy"
                                onLoad={handleImageLoad}
                            />
                        </picture>
                        <div className="thumb-overlay">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        {thumb.tags && thumb.tags.length > 0 && (
                            <div className="thumb-tags">
                                {thumb.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="thumb-tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThumbnailSection;
