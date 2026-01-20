import React from 'react';

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
                            <iframe
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.iframeTitle}
                                loading="lazy"
                                allowFullScreen
                            ></iframe>
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
