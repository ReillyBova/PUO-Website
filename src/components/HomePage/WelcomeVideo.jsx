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
import { winWidth } from 'utils';

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
        // Styling for landscape browser windows
        '&.landscape': {
            position: 'absolute',
            bottom: 0,
            width: '100%',
        },
        // Styling for portrait browser windows
        '&.portrait': {
            marginLeft: '50%',
            transform: 'translateX(-50%)',
            height: '100%',
        },
    },
}));

// Welcoming and flashy video for homepage
function WelcomeVideo() {
    // Hook for toggling video orientation CSS
    const [orientation, setOrientation] = useState('landscape');
    // Ref for keeping track of wrapper
    const wrapperRef = useRef();
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
        // Load new source
        videoElement.load();
    };
    // Adjust dropdown orientation based on distance from screen edge
    const orientVideo = () => {
        const wrapperElement = wrapperRef.current;
        if (!wrapperElement) {
            return;
        }

        // Compute dimension ratio (need to subtract 40 because of padding)
        const ratio =
            wrapperElement.clientWidth / (wrapperElement.clientHeight - 40);
        // Set orientation
        if (16.0 / 9.0 - ratio > 0) {
            setOrientation('portrait');
        } else {
            setOrientation('landscape');
        }
    };
    // Browser event controller
    useLayoutEffect(() => {
        function handleResize() {
            // Reorient video if necessary
            orientVideo();
        }

        // Register event handler
        window.addEventListener('resize', orientVideo, false);
        // Invoke resize to start
        handleResize();
        // Load video
        lazyLoadVideo();
        // Cleapup event handler in case of unmount
        return function cleanup() {
            window.removeEventListener('resize', orientVideo);
        };
    }, []);

    // CSS classes for styling
    const { wrapper, video } = videoStyles();
    // Render
    return (
        <div className={wrapper} ref={wrapperRef}>
            <video
                ref={videoRef}
                className={clsx(video, orientation)}
                poster={posterWelcomeJPG}
                autoPlay
                loop
                muted
                playsInline
            >
                <source type="video/mp4" />
            </video>
        </div>
    );
}

export default WelcomeVideo;
