// Library imports
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import { scrollTop, winHeight } from 'utils';

// Styling for the parallax container
const parallaxStyles = makeStyles(() => ({
    parallax: {
        position: 'relative',
        margin: 0,
        padding: 0,
        willChange: 'transform',
    },
}));

// A container that wraps children in a parallax scrolling effect
function Parallax({ anchorBottom = false, distance = 3.0, children }) {
    // Hook for keeping track of banner's offset from the page's top
    const parallaxRef = useRef();
    // Hook for applying parallax effect through CSS 3D translations
    const [translation, translate] = useState();

    // Function for setting correct parallax translation
    const resetTransform = (scrollOffset, elementOffset) => {
        translate(
            `translate3d(0,${(scrollOffset - elementOffset) / distance}px,0)`
        );
    };

    // Browser event controller
    useEffect(() => {
        let windowHeight;

        // Scroll handler
        function handleScroll() {
            if (!parallaxRef.current) {
                return;
            }

            if (!anchorBottom) {
                resetTransform(scrollTop(), parallaxRef.current.offsetTop);
            } else {
                resetTransform(
                    scrollTop() + windowHeight,
                    parallaxRef.current.offsetTop +
                        parallaxRef.current.offsetHeight
                );
            }
        }

        // Scroll handler
        function handleResize() {
            if (!parallaxRef.current) {
                return;
            }

            // Recompute height of window
            windowHeight = winHeight();

            // Reexecute scroll handler
            handleScroll();
        }

        // Register event handler(s) on component mount
        window.addEventListener('scroll', handleScroll, false);
        if (anchorBottom) {
            window.addEventListener('resize', handleResize, false);
            // Invoke resize to start (will invoke scroll)
            handleResize();
        } else {
            // Invoke scroll to start
            handleScroll();
        }

        // Cleanup event handler(s) on unmount
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
            if (anchorBottom) {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, [anchorBottom]);
    // CSS classes for styling
    const { parallax } = parallaxStyles();
    // Render
    return (
        <div
            className={parallax}
            ref={parallaxRef}
            style={{ transform: translation }}
        >
            {children}
        </div>
    );
}

Parallax.propTypes = {
    anchorBottom: PropTypes.bool, // False (default) aligns tranform to screen top. True aligns tranform to screen bottom.
    distance: PropTypes.number, // The strength of the parallax effect
    children: PropTypes.node, // The rest of the web-page
};

export default Parallax;
