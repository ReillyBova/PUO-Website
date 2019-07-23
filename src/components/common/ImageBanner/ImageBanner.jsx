// Library imports
import React, { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Custom styles for component
const bannerStyles = makeStyles(() => ({
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
    imageBanner: {
        // Styling for full screen images
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
    },
}));

// Welcoming and flashy video for homepage
function ImageBanner() {
    // CSS classes for styling
    const { wrapper, imageBanner } = bannerStyles();
    // Render
    return (
        <div className={wrapper}>
            <video
                className={imageBanner}
                poster={posterWelcomeJPG}
                autoPlay
                loop
                muted
                playsInline
                crossOrigin={'anonymous'}
            >
                <source type="video/mp4" />
            </video>
        </div>
    );
}

export default ImageBanner;
