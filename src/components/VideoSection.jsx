import { useState, useCallback } from 'react';

const LiteYouTube = ({ id, title }) => {
    const [activated, setActivated] = useState(false);

    const handleClick = useCallback(() => {
        setActivated(true);
    }, []);

    const thumbUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    if (activated) {
        return (
            <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        );
    }

    return (
        <button
            className="lite-yt-btn"
            onClick={handleClick}
            aria-label={`Play ${title}`}
            style={{ backgroundImage: `url(${thumbUrl})` }}
        >
            <div className="lite-yt-play">
                <svg viewBox="0 0 68 48" width="68" height="48">
                    <path
                        d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.64 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                        fill="#212121" fillOpacity="0.8"
                    />
                    <path d="M45 24L27 14v20" fill="#fff" />
                </svg>
            </div>
        </button>
    );
};

const VideoSection = () => {
    const videos = [
        {
            id: 'mNxb4PlOAOM',
            title: 'X',
            description: 'Varieble X but worse.',
            tags: ['After Effects', 'Premiere'],
            iframeTitle: 'X'
        },
        {
            id: 'mNxb4PlOAOM',
            title: '3D Animation Test',
            description: 'Legit just a test.',
            tags: ['Blender 3D', 'Cycles'],
            iframeTitle: '3D Animation Test'
        },
        {
            id: 'mNxb4PlOAOM',
            title: 'Y',
            description: 'Varieble Y but better.',
            tags: ['Photoshop', 'Illustrator'],
            iframeTitle: 'Brand Identity'
        }
    ];

    return (
        <div className="tab-content active-content">
            <h2 className="section-title">Videos</h2>
            <div className="portfolio-grid">
                {videos.map((video, index) => (
                    <div className="video-card" key={index}>
                        <div className="video-wrapper">
                            <LiteYouTube id={video.id} title={video.iframeTitle} />
                        </div>
                        <div className="tags">
                            {video.tags.map((tag, i) => (
                                <span className="tag" key={i}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3>{video.title}</h3>
                        <p>{video.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoSection;
