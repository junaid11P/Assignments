import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ url }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        // Use a timeout to ensure the DOM is painted and element is connected
        const initPlayer = () => {
            if (playerRef.current || !videoRef.current) return;

            playerRef.current = videojs(videoRef.current, {
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{
                    src: url,
                    type: url.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
                }]
            }, () => {
                console.log('Video.js player is ready');
            });
        };

        const timer = setTimeout(initPlayer, 100);

        return () => {
            clearTimeout(timer);
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.src({
                src: url,
                type: url.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
            });
        }
    }, [url]);

    return (
        <div data-vjs-player style={{ width: '100%', height: '100%', background: '#000' }}>
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );
};

export default VideoPlayer;
