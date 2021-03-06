// Library imports
import { navigate } from '@reach/router';
// UI imports
import { createMuiTheme } from '@material-ui/core/styles';
// Project imports
import { scrollTop, smoothStep, urlify } from 'utils';

// Generate a new theme from an existing one with different colors
export const recolorMuiTheme = (
    oldTheme,
    primaryColor = '',
    secondaryColor = ''
) => {
    // Default to existing color scheme
    let primaryMain = primaryColor;
    let secondaryMain = secondaryColor;
    if (!primaryMain) {
        primaryMain = oldTheme.palette.primary.main;
    }
    if (!secondaryMain) {
        secondaryMain = oldTheme.palette.secondary.main;
    }

    const newTheme = {
        ...oldTheme,
        palette: {
            ...oldTheme.palette,
            primary: {
                main: primaryMain,
            },
            secondary: {
                main: secondaryMain,
            },
        },
    };

    return createMuiTheme(newTheme);
};

/*
 * Asychronously smooth scroll window to a target offset in durationMS.
 * Adapted from https://stackoverflow.com/a/25574313
 */
export const smoothScroll = (targetScroll, durationMS) => {
    if (typeof window === 'undefined') {
        return;
    }

    // Round to simplify computation
    const target = Math.round(targetScroll);
    const duration = Math.round(durationMS);

    // Compute constants
    const startTime = Date.now();
    const endTime = startTime + duration;

    const startTop = scrollTop();
    const distance = target - startTop;

    // Handle basic corner cases
    if (duration < 0) {
        return Promise.reject('Bad duration');
    }
    if (duration === 0) {
        window.scrollBy(0, -startTop);
        return Promise.resolve();
    }

    return new Promise(function(resolve, reject) {
        // Keep track of where we are supposed to be to handle interrupt
        let previousTop = scrollTop();

        // Animation function
        const animateScroll = () => {
            if (scrollTop() !== previousTop) {
                // User must have interrupted scroll with input
                reject('Interrupted');
                return;
            }

            // Set the scrollTop for this frame
            const now = Date.now();
            const point = smoothStep(startTime, endTime, now);
            const newTargetTop = Math.round(startTop + distance * point);
            const delta = newTargetTop - previousTop;
            window.scrollBy(0, delta);

            // Check to see if we're done
            if (now >= endTime) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it finished; not
            // interrupted.
            const newScrollTop = scrollTop();
            if (newScrollTop === previousTop && newScrollTop !== newTargetTop) {
                resolve();
                return;
            }

            // Otherwise, update previous top, and buffer animation frame
            previousTop = newScrollTop;
            window.requestAnimationFrame(animateScroll);
        };

        // Initiate the animation process
        window.requestAnimationFrame(animateScroll);
    });
};

// Scroll window to sectionID hash and set window.hash
export const scrollToHash = (sectionID, currentPage) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    // Use hash to find element
    const targetElement = document.getElementById(sectionID);
    const targetLink = `/${urlify(currentPage)}#${sectionID}`;
    if (targetElement === null) {
        // Didn't find element (and maybe we can jump to it if browser is smart)
        navigate(targetLink);
        return;
    }

    // Function to track when scrolling ends
    let isScrolling;
    const onScrollEnd = () => {
        window.removeEventListener('scroll', handleScroll);
        // Update URL
        navigate(targetLink);
    };
    const handleScroll = () => {
        // Reset timeout
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(onScrollEnd, 100);
    };

    // Smoothly scroll to the target
    targetElement.scrollIntoView({ behavior: 'smooth' });
    isScrolling = setTimeout(onScrollEnd, 100);
    window.addEventListener('scroll', handleScroll, false);
};
