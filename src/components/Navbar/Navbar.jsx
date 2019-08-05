// Library imports
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// Project imports
import { scrollTop, winHeight, winWidth } from 'utils';
// Local imports
import navbarStyles from './navbar-styles';
import {
    Brand,
    DesktopLinks,
    HamburgerMenu,
    MobileMenu,
} from './subcomponents';

// Cache for window dimensions
const WINDOW_DIMS = {};

// A Navbar that sits above the web-app
function Navbar({ children }) {
    // Query navbar settings from site configuration
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        navigation {
                            page
                            type
                            sections
                        }
                    }
                }
            }
        `
    );
    const { navigation } = site.siteMetadata;

    // Hook for minifying/compressing navbar on scroll
    const [isMinified, setMinified] = useState(false);
    // Hook for toggle mobile mode on window resize
    const [isMobileMode, setMobileMode] = useState(false);
    // Hook for toggling mobile naviagtion menu
    const [menuIsActive, setMenuState] = useState(false);

    // Ref for keeping track of the black triangle polygon element
    const blackTriangle = useRef();
    // Ref for keeping track of the white triangle polygon element
    const whiteTriangle = useRef();
    // Ref for keeping track of the orange line element
    const orangeLine = useRef();

    // Function that compresses navbar based on scroll and window dimensions
    const resizeNavbar = ({ width, height }) => {
        setMinified(scrollTop() > 115 || (height < 500 && width > 599));
    };
    // Function for resizing SVG "curtain" elements
    const resizeSVG = (width) => {
        // Compute triangle height in pixels; hide if shorter than 35px
        let maxHeight = Math.min(Math.max(width / 12.0 - 15.0, 0), 75);
        if (maxHeight < 35) {
            maxHeight = 0;
        }

        whiteTriangle.current.attributes.points.value = `0,0 ${width},0 0,${maxHeight}`;
        blackTriangle.current.attributes.points.value = `${width /
            3},2 ${width},2 ${width},${maxHeight + 2}`;
        orangeLine.current.attributes.x2.value = width + 4;
        orangeLine.current.attributes.y1.value = maxHeight + 1.5;
    };

    // Browser event controller
    useEffect(() => {
        // Scroll handler
        function handleScroll() {
            resizeNavbar(WINDOW_DIMS);
        }
        // Resize handler
        function handleResize() {
            // Update window dimensions
            WINDOW_DIMS.width = winWidth();
            WINDOW_DIMS.height = winHeight();
            // Minify navbar if necessary
            resizeNavbar(WINDOW_DIMS);
            // Adjust SVG dimensions
            resizeSVG(WINDOW_DIMS.width);
            // Set mobile mode if necessary
            setMobileMode(WINDOW_DIMS.width <= 700);
        }

        // Register event handlers on component mount
        window.addEventListener('scroll', handleScroll, false);
        window.addEventListener('resize', handleResize, false);
        // Invoke resize to start
        handleResize();
        // Cleanup event handlers on unmount
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [
        /* Empty update-on array ensures useEffect only runs on mount */
    ]);

    // CSS classes for styling
    const classes = navbarStyles();
    const { navbarHeader, navbarMain, navbarTriangle } = classes;

    // Useful variables for rendering
    const menuProps = { classes, menuIsActive, setMenuState, isMobileMode };
    const curtainProps = { fill: 'currentColor', points: '0,0 0,0 0,0' };
    const lineProps = {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '1.5',
        strokeWidth: '4px',
    };
    // Render
    return (
        <Fragment>
            <header className={navbarHeader}>
                <div className={clsx(navbarMain, isMinified ? 'mini' : 'full')}>
                    {/* Logo */}
                    <Brand {...menuProps} />
                    {/* Desktop Navbar */}
                    {!isMobileMode && (
                        <DesktopLinks
                            classes={classes}
                            navigation={navigation}
                        />
                    )}
                    {/* Mobile Navbar */}
                    {isMobileMode && <HamburgerMenu {...menuProps} />}
                    <MobileMenu
                        isMinified={isMinified}
                        navigation={navigation}
                        {...menuProps}
                    />
                </div>
                {/* Curtain Element */}
                <svg className={clsx(navbarTriangle, 'black')}>
                    <polygon ref={blackTriangle} {...curtainProps} />
                </svg>
                <svg className={clsx(navbarTriangle, 'orange')}>
                    <polygon ref={whiteTriangle} {...curtainProps} />
                    <line ref={orangeLine} {...lineProps} />
                </svg>
            </header>
            {children}
        </Fragment>
    );
}

Navbar.propTypes = {
    children: PropTypes.node, // The rest of the web-page
};

export default Navbar;
