// Library imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import { scrollTop } from 'utils';

// Styling for the parallax container
const parallaxStyles = makeStyles(() => ({
    parallax: {
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0,
    },
}));

// A container that wraps children in a parallax scrolling effect
function Parallax({ distance = 3.0, children }) {
    // Hook for applying parallax effect through CSS 3D translations
    const [translation, translate] = useState();
    // Function for setting correct parallax translation
    const resetTransform = () => {
        translate(`translate3d(0,${scrollTop() / distance}px,0)`);
    };

    // Browser event controller
    useEffect(() => {
        // Scroll handler
        function handleScroll() {
            resetTransform();
        }

        // Register event handler on component mount
        window.addEventListener('scroll', handleScroll, false);
        // Invoke scroll to start
        handleScroll();
        // Cleanup event handler on unmount
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [
        /* Empty update-on array ensures useEffect only runs on mount */
    ]);
    // CSS classes for styling
    const { parallax } = parallaxStyles();
    // Render
    return (
        <div className={parallax} style={{ transform: translation }}>
            {children}
        </div>
    );
}

Parallax.propTypes = {
    distance: PropTypes.number, // The strength of the parallax effect
    children: PropTypes.node, // The rest of the web-page
};

export default Parallax;
