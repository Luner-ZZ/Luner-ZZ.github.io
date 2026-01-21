import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [views, setViews] = useState('Loading...');

    useEffect(() => {
        let isMounted = true;
        fetch('https://api.countapi.xyz/hit/luner-zz.github.io/visits')
            .then((res) => res.json())
            .then((data) => {
                if (isMounted) setViews(data.value);
            })
            .catch(() => {
                if (isMounted) setViews('N/A');
            });

        return () => { isMounted = false; };
    }, []);

    return (
        <footer>
            <div className="footer-content">
                <h2>Ready to collaborate?</h2>
                <a href="mailto:your-email@example.com" className="contact-btn">
                    Contact Me
                </a>
                <div className="social-links">
                    <a
                        href="https://youtube.com/@lunerzz?si=SGswyJ51LoL4yXvA"
                        className="social-icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                    >
                        <svg
                            className="social-icon-svg"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </a>
                    <a
                        href="https://youtube.com/@mp1-k3k?si=dgt5zDYZuSlebft1"
                        className="social-icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube Secondary"
                    >
                        <svg
                            className="social-icon-svg"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            <text
                                x="18"
                                y="8"
                                fontSize="10"
                                fontWeight="bold"
                                fontFamily="Arial"
                                textAnchor="middle"
                                fill="#2596be"
                            >
                                2
                            </text>
                        </svg>
                    </a>
                    <a
                        href="https://discord.com/users/1021899851891486760"
                        className="social-icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Discord"
                    >
                        <svg
                            className="social-icon-svg"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                        </svg>
                    </a>
                    <a
                        href="https://steamcommunity.com/id/Luner_Zz/"
                        className="social-icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Steam"
                    >
                        <img
                            className="steam-img"
                            src="/icons/steam.svg"
                            alt="Steam Profile"
                            width="32"
                            height="32"
                        />
                    </a>
                </div>
                <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '10px' }}>
                    👁️ Views: <span id="visit-count">{views}</span>
                </p>
                <p className="copyright">© 2026 Luner. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
