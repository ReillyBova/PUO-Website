// Library imports
import React, { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import {
    largeWelcomeMP4,
    mediumWelcomeMP4,
    smallWelcomeMP4,
    tinyWelcomeMP4,
    posterWelcomeJPG,
} from 'videos/Welcome';
import { addToVideoCache, winWidth } from 'utils';

// Custom styles for component
const videoStyles = makeStyles(() => ({
    wrapper: {
        paddingTop: 40,
        width: '100%',
        height: 'calc(100vh - 110px)',
        overflow: 'hidden',
        backgroundColor: 'black',
        boxSizing: 'content-box',

        '@media screen and (max-height: 500px) and (min-width: 600px)': {
            paddingTop: 0,
            height: 'calc(100vh - 70px)',
        },
    },
    video: {
        // Styling for full screen videos
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        // Loading transition from black
        transition: 'opacity 0.5s ease-in',
        opacity: 1,
        '&.loading': {
            opacity: 0,
        },
    },
}));

// Welcoming and flashy video for homepage
function WelcomeVideo() {
    // Hook for toggling loading state
    const [loading, setLoading] = useState(true);
    // Ref for keeping track of wrapper
    const videoRef = useRef();

    // Function for (lazy) loading video and forcing muted
    const lazyLoadVideo = () => {
        const videoElement = videoRef.current;
        if (!videoElement) {
            return;
        }

        // Force muted (possible bug in React 16.x requires us to do this)
        videoElement.defaultMuted = true;
        // Lazy load source based on browser width
        const videoSource = videoElement.children[0];
        const width = winWidth();
        if (width < 504) {
            // Load tiny video
            videoSource.src = tinyWelcomeMP4;
        } else if (width < 815) {
            // Load small video
            videoSource.src = smallWelcomeMP4;
        } else if (width < 1050) {
            // Load medium video
            videoSource.src = mediumWelcomeMP4;
        } else {
            // Load full size video
            videoSource.src = largeWelcomeMP4;
        }

        // Callbacks for loading side-effects
        videoSource.onerror = () => {
            // Show poster if it is there
            setLoading(false);
        };
        videoSource.onabort = () => {
            // Show poster if it is there
            setLoading(false);
        };
        videoSource.onstalled = () => {
            // Show poster if it is there
            setLoading(false);
        };
        videoElement.oncanplaythrough = () => {
            // Video is loaded and can be played
            setLoading(false);
            addToVideoCache(videoSource.src);
        };

        // Load new source
        videoElement.load();
    };
    // Trigger lazy loading on mount
    useLayoutEffect(() => {
        // Load video
        lazyLoadVideo();
    }, []);

    // CSS classes for styling
    const { wrapper, video } = videoStyles();
    // Render
    return (
        <div className={wrapper}>
            <video
                ref={videoRef}
                className={clsx(video, loading && 'loading')}
                poster={posterWelcomeJPG}
                autoPlay
                loop
                muted
                playsInline
                crossOrigin='anonymous'
            >
                <source type='video/mp4' />
            </video>
        </div>
    );
}

export default WelcomeVideo;
