// Library imports
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
// UI imports
import Card from '@material-ui/core/Card';
// Project imports
import { addUTCDays, CAN_USE_IO, winHeight } from 'utils';
// Local imports
import concertCardCoreStyles from './concert_card_core-styles';
import {
    ConcertBreak,
    ConcertDatetime,
    ConcertGeneraltime,
    ConcertHall,
    ConcertOverline,
    ConcertSubtitle,
    ConcertTitle,
    ConcertWork,
    DesktopConcertName,
    Program,
} from './ConcertCardInternals';

// Constant for minimum background image opacity in mobile mode
const MIN_OPACITY = 0.1;
/*
 * Constant for determining the min pixels from the top at which mobile
 * background posters no longer change their opacity
 */
const LOWER_BOUND = 300;
// Constant for program key strings based on cardLayoutIndex
const PROGRAM_LAYOUT_NAMES = [
    'mobile-program',
    'tablet-program',
    'desktop-program',
    'prerender-program',
];

// Card element for rendering the concert programs/posters
const ConcertCardCore = ({
    cardLayoutIndex,
    contentByKey,
    concertName,
    fluidPoster,
    isRTL,
    date,
    calendar,
    tickets,
    stream,
    youtube,
    spotify,
}) => {
    // Hook for keeping track of card visibility
    const [isVisible, setVisibility] = useState(false);

    // Ref for mobile intersection observer
    const cardRef = useRef();
    // Ref for mobile background poster
    const backgroundPosterRef = useRef();

    // Helper function for setting mobile background poster default opacities
    const setDefaultOpacity = (threshold) => {
        // Force opacity to clamped value in case events weren't finished
        if (!backgroundPosterRef.current) {
            return;
        }

        // Compute proportion of the changing-range already scrolled through
        if (
            backgroundPosterRef.current.getBoundingClientRect().top < threshold
        ) {
            backgroundPosterRef.current.style.opacity = MIN_OPACITY;
        } else {
            backgroundPosterRef.current.style.opacity = 1.0;
        }
    };

    // Controller for animating poster image opacity for mobile layout
    useEffect(() => {
        if (!isVisible) {
            return;
        }

        if (!backgroundPosterRef.current) {
            return;
        }

        /*
         * Determine the offset location relative to the top of the browser
         * at which the opacity changes. Unit is pixels.
         */
        let threshold;

        // Keep track of current background opacity
        let backgroundOpacity = 1;

        // Scroll handler
        function handleScroll() {
            if (!backgroundPosterRef.current) {
                return;
            }

            if (
                backgroundPosterRef.current.getBoundingClientRect().top <
                threshold
            ) {
                if (backgroundOpacity === 1) {
                    backgroundOpacity = MIN_OPACITY;
                    backgroundPosterRef.current.style.opacity = MIN_OPACITY;
                }
            } else if (backgroundOpacity === MIN_OPACITY) {
                backgroundOpacity = 1;
                backgroundPosterRef.current.style.opacity = 1;
            }
        }

        // Resize handler
        function handleResize() {
            if (!backgroundPosterRef.current) {
                return;
            }

            /*
             * Recompute threshold (max of fixed offset from top and 3/4 of
             * card showing)
             */
            threshold = Math.max(
                LOWER_BOUND,
                winHeight() - backgroundPosterRef.current.offsetHeight * 0.75
            );

            // Re-execute opacity handler
            handleScroll();
        }
        // Invoke resize to start
        handleResize();

        // Register event handlers on component mount
        window.addEventListener('scroll', handleScroll, false);
        window.addEventListener('resize', handleResize, false);

        // Cleanup event handlers on unmount or visibility change
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);

            // Set opacity on exit
            threshold = winHeight();
            setDefaultOpacity(threshold);
        };
    }, [isVisible]);

    // Intersection observer for card visibility in mobile layout
    useEffect(() => {
        // Ensure this only executes for mobile layouts
        if (cardLayoutIndex !== 0) {
            setVisibility(false); // To return to base state
            return;
        } else {
            // Initialize opacity to correct value
            const threshold = LOWER_BOUND;
            setDefaultOpacity(threshold);
        }

        // Ensure Intersection Observer support and DOM access via refs
        if (!CAN_USE_IO || !cardRef.current) {
            if (!backgroundPosterRef.current) {
                return;
            }

            // Need to set all background to transparent
            backgroundPosterRef.current.style.opacity = MIN_OPACITY;
            return;
        }

        const visibilityCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisibility(true);
                } else {
                    setVisibility(false);
                }
            });
        };

        // Trigger callback when half of the card scrolls into view
        const intersectionObserver = new IntersectionObserver(
            visibilityCallback,
            { threshold: 0 }
        );

        // Watch the card's intersection
        intersectionObserver.observe(cardRef.current);

        // Disconnect observer when layout changes
        return function cleanup() {
            // Stop watching the card's intersection
            intersectionObserver.disconnect();
        };
    }, [cardLayoutIndex]);

    // CSS classes with props
    const classes = concertCardCoreStyles({ isRTL });
    const {
        backgroundImageStyle,
        backgroundImageWrapper,
        card,
        concertNameCard,
        posterStyle,
        buttonIcon,
        largeBreak,
        smallBreak,
    } = classes;

    // Evaluate internal text once (unless CSS changes)
    const program = useMemo(() => {
        // Util function for mapping keys to JSX Component
        const mapKeyToComponent = ({ key, content }, i) => {
            switch (key) {
                case 'title':
                    return <ConcertTitle key={i} text={content} />;
                case 'subtitle':
                    return <ConcertSubtitle key={i} text={content} />;
                case 'section':
                    return <div className={largeBreak} key={i} />;
                case 'spacing':
                    return <div className={smallBreak} key={i} />;
                case 'hall':
                    return <ConcertHall key={i} text={content} />;
                case 'datetime':
                    return <ConcertDatetime key={i} text={content} />;
                case 'generaltime':
                    return <ConcertGeneraltime key={i} text={content} />;
                case 'overline':
                    return <ConcertOverline key={i} text={content} />;
                case 'work':
                    return <ConcertWork key={i} text={content} />;
                case 'break':
                    return <ConcertBreak key={i} text={content} />;

                default:
                    return;
            }
        };

        // Compute program from content
        return contentByKey.map(mapKeyToComponent).filter((node) => !!node);
    }, [largeBreak, smallBreak]);

    /*
     * Use date to determine if we have already passed the concert
     * plus a one week (7 day) grace period (determines which buttons to show)
     */
    const oneWeekAfterConcert = addUTCDays(new Date(date), 7);
    const isUpcoming = oneWeekAfterConcert.getTime() > new Date().getTime();

    // Props for button links
    const buttonLinks = isUpcoming
        ? { calendar, tickets, stream, buttonIcon }
        : { youtube, spotify, buttonIcon };

    // Build Concert Card JSX as list for easy RTL reversal
    const programProps = {
        buttonLinks,
        cardLayoutIndex,
        classes,
        concertName,
        isUpcoming,
        program,
    };
    const concertCard = [];
    // Desktop Concert Name JSX (desktop layout only)
    if (cardLayoutIndex > 1) {
        concertCard.push(
            <DesktopConcertName
                key={'desktop-name'}
                concertName={concertName}
                concertNameCardClass={concertNameCard}
            />
        );
    }
    // Program JSX (all layouts)
    concertCard.push(
        <Program
            key={PROGRAM_LAYOUT_NAMES[cardLayoutIndex]}
            {...programProps}
        />
    );
    // Image JSX (all layouts, if poster is provided)
    if (fluidPoster) {
        if (cardLayoutIndex > 0) {
            // Inline poster (desktop and tablet layouts)
            concertCard.push(
                <Image
                    key={'poster-image'}
                    className={posterStyle}
                    fluid={fluidPoster}
                />
            );
        } else {
            // Background poster (mobile layout only)
            concertCard.push(
                <div
                    key={'background-image'}
                    ref={backgroundPosterRef}
                    className={backgroundImageWrapper}
                >
                    <Image
                        className={backgroundImageStyle}
                        fluid={fluidPoster}
                    />
                </div>
            );
        }
    }

    // Alternating RTL behavior
    if (!isRTL && cardLayoutIndex > 0) {
        concertCard.reverse();
    }

    // Render
    return (
        <Card ref={cardRef} elevation={4} className={card}>
            {concertCard}
        </Card>
    );
};

ConcertCardCore.propTypes = {
    cardLayoutIndex: PropTypes.number, // In range [0,2]; indicates screen width
    contentByKey: PropTypes.array, // Array of (key, value) pairs for content
    concertName: PropTypes.string, // Concert generic title (e.g. Fall Concert)
    fluidPoster: PropTypes.object, // Fluid image-sharp from Gatsby
    isRTL: PropTypes.bool, // Right to left ordering
    date: PropTypes.string, // Approximate date of concert
    calendar: PropTypes.string, // Link to calendar event
    tickets: PropTypes.string, // Link to purchase tickets
    stream: PropTypes.string, // Link to livestram concert
    youtube: PropTypes.string, // Link to concert youtube video (playlist)
    spotify: PropTypes.string, // Link to concert spotify album
};

export default ConcertCardCore;
