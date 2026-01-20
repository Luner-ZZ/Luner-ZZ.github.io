import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
    return (
        <header>
            <h1>LUNER</h1>
            <div className="subtitle">
                <div className="role-container">
                    <span className="role-text">Video Editor</span>
                    <div className="icon-group">
                        <svg
                            className="software-icon"
                            role="img"
                            aria-label="Premiere Pro"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="5" y="5" width="90" height="90" rx="20" />
                            <text x="50" y="68" fontSize="52" textAnchor="middle">
                                Pr
                            </text>
                        </svg>
                        <svg
                            className="software-icon"
                            role="img"
                            aria-label="After Effects"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="5" y="5" width="90" height="90" rx="20" />
                            <text x="50" y="68" fontSize="52" textAnchor="middle">
                                Ae
                            </text>
                        </svg>
                    </div>
                </div>
                <span className="separator">•</span>
                <div className="role-container">
                    <span className="role-text">Beginner 3D Animator</span>
                    <div className="icon-group">
                        <img
                            className="software-icon blender-img"
                            src="/icons/blender.svg"
                            alt="Blender"
                            width="32"
                            height="32"
                        />
                    </div>
                </div>
                <span className="separator">•</span>
                <div className="role-container">
                    <span className="role-text">Designer</span>
                    <div className="icon-group">
                        <svg
                            className="software-icon"
                            role="img"
                            aria-label="Photoshop"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="5" y="5" width="90" height="90" rx="20" />
                            <text x="50" y="68" fontSize="52" textAnchor="middle">
                                Ps
                            </text>
                        </svg>
                    </div>
                </div>
            </div>

            <nav className="nav-tabs" role="tablist">
                <button
                    className={`nav-btn ${activeTab === 'videos' ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab('videos')}
                    role="tab"
                    aria-selected={activeTab === 'videos'}
                >
                    Videos
                </button>
                <button
                    className={`nav-btn ${activeTab === 'thumbs' ? 'active-tab' : ''}`}
                    onClick={() => setActiveTab('thumbs')}
                    role="tab"
                    aria-selected={activeTab === 'thumbs'}
                >
                    Thumbnails | Designs
                </button>
            </nav>
        </header>
    );
};

export default Header;
