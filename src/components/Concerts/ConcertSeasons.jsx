// Library imports
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { graphql, navigate } from 'gatsby';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// Project imports
import { Subheader } from 'components';
import {
    CAN_USE_IO,
    preprocessConcerts,
    preprocessPosters,
    groupConcertsBySeason,
    winHeight,
    winWidth,
} from 'utils';
// Local imports
import { ConcertCard } from './subcomponents';

// Styling for homepage elements
const concertStyles = makeStyles((theme) => ({
    lazyLoadingWrapper: {
        margin: 'auto',
        width: 'fit-content',
    },
    seasonSection: {
        // Padding below each season
        '&:not(:last-of-type)': {
            paddingBottom: theme.spacing(8),
            [theme.breakpoints.down('xs')]: {
                paddingBottom: theme.spacing(4),
            },
        },
        '& > div:not(:last-child)': {
            // Margin below each card
            marginBottom: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(2),
            },
        },
    },
}));

// Constant to determine lazy rendering buffer
const LAZY_RENDER_BUFF_SIZE = 3;

function ConcertSeasons({ concerts, posters }) {
    // Preprocess posters in object organized by fileName
    const posterData = preprocessPosters(posters);

    // Preprocess concert info into managable object
    const concertData = useMemo(
        () => preprocessConcerts(concerts, posterData),
        [concerts, posters]
    );

    // Corner case
    if (!concertData.length) {
        if (typeof window !== 'undefined') {
            // Return 404
            navigate('/404');
            return null;
        }
    }

    // Seperate by season
    const dataBySeason = useMemo(() => groupConcertsBySeason(concertData), [
        concertData,
    ]);
    const seasons = useMemo(
        () =>
            Object.keys(dataBySeason)
                .sort()
                .reverse(),
        [dataBySeason]
    );

    // Ref to track last element lazy rendered
    const lastSeasonRenderedRef = useRef();

    // Hook for lazy rendering
    const [numRendered, setNumRendered] = useState(
        Math.min(LAZY_RENDER_BUFF_SIZE, seasons.length)
    );

    // Hook for toggle mobile mode on window resize: init to invalid to force rerender due to SSR issues
    const [cardLayoutIndex, setCardLayoutIndex] = useState(3);

    // Browser event controller for setting layout on resize
    useEffect(
        () => {
            // Helper for computing the appropriate layout state
            const computeLayout = () => {
                // Set mobile mode if necessary
                const width = winWidth();
                if (width < 1280) {
                    if (width <= 700) {
                        return 0;
                    } else {
                        return 1;
                    }
                } else {
                    return 2;
                }
            };

            // Resize handler
            function handleResize() {
                setCardLayoutIndex(computeLayout());
            }

            // Register event handlers on component mount
            window.addEventListener('resize', handleResize, false);

            // Invoke to start
            handleResize();

            // Cleanup event handlers on unmount
            return function cleanup() {
                window.removeEventListener('resize', handleResize);
            };
        },
        [
            /* Empty update-on array ensures useEffect only runs on mount */
        ]
    );

    // Intersection observer for handling lazy rendering
    useEffect(() => {
        // We can ditch lazy rendering when everything is loaded
        if (numRendered === seasons.length) {
            return;
        }

        // We can't do anything without the ref
        if (!lastSeasonRenderedRef.current) {
            setNumRendered(seasons.length);
            return;
        }

        // Closure variable to ensure callbacks only trigger once
        let finished = false;

        // Ensure Intersection Observer support
        if (!CAN_USE_IO) {
            // Implement using scroll events instead
            let threshold;
            const handleScroll = () => {
                if (finished || !lastSeasonRenderedRef.current) {
                    return;
                }

                if (
                    lastSeasonRenderedRef.current.getBoundingClientRect().top <
                    threshold
                ) {
                    setNumRendered(
                        Math.min(
                            numRendered + LAZY_RENDER_BUFF_SIZE,
                            seasons.length
                        )
                    );
                    finished = true;
                }
            };

            const handleResize = () => {
                if (!lastSeasonRenderedRef.current) {
                    return;
                }

                // Recompute threshold
                threshold = winHeight();

                // Re-execute opacity handler
                handleScroll();
            };

            // Invoke resize to start
            handleResize();

            // Register event handlers on component mount
            window.addEventListener('scroll', handleScroll, false);
            window.addEventListener('resize', handleResize, false);

            // Cleanup event handlers on unmount or visibility change
            return function cleanup() {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            };
        }

        // More efficient Intersection Observer implementation
        const visibilityCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !finished) {
                    setNumRendered(
                        Math.min(
                            numRendered + LAZY_RENDER_BUFF_SIZE,
                            seasons.length
                        )
                    );
                    finished = true;
                }
            });
        };

        // Trigger callback when half of the card scrolls into view
        const intersectionObserver = new IntersectionObserver(
            visibilityCallback
        );

        // Watch the card's intersection
        intersectionObserver.observe(lastSeasonRenderedRef.current);

        // Disconnect observer when layout changes
        return function cleanup() {
            // Stop watching the card's intersection
            intersectionObserver.disconnect();
        };
    }, [numRendered, seasons]);

    // Extract seasons for lazy rendering
    const seasonsToRender = seasons.slice(0, numRendered);

    // CSS classes for styling
    const { seasonSection, lazyLoadingWrapper } = concertStyles();

    // Normal Render
    return (
        <Fragment>
            {seasonsToRender.map((season, i) => {
                const concerts = dataBySeason[season];
                const isLast = i === seasonsToRender.length - 1;
                // Sort concerts by date
                concerts.sort((a, b) => a.date.localeCompare(b.date));
                // Build season
                return (
                    <div
                        className={seasonSection}
                        key={season}
                        ref={isLast ? lastSeasonRenderedRef : null}
                    >
                        <Subheader>{`The ${season} Season`}</Subheader>
                        {concerts.map((props, i) => (
                            <ConcertCard
                                key={i}
                                cardLayoutIndex={cardLayoutIndex}
                                id={i}
                                {...props}
                            />
                        ))}
                    </div>
                );
            })}
            {seasons.length !== numRendered && (
                <div className={lazyLoadingWrapper}>
                    <CircularProgress />
                </div>
            )}
        </Fragment>
    );
}

// Query fragment for posters
export const concertPosterFragment = graphql`
    fragment ConcertPosterFragment on File {
        name
        childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
            }
        }
    }
`;

// Query fragment for concert data
export const concertDataFragment = graphql`
    fragment ConcertDataFragment on MarkdownRemark {
        html
        frontmatter {
            concertName
            colorTheme
            date
            season
            poster
            calendar
            tickets
            stream
            youtube
            spotify
        }
        parent {
            ... on File {
                name
            }
        }
    }
`;

ConcertSeasons.propTypes = {
    concerts: PropTypes.array, // List of concert data
    posters: PropTypes.array, // List of poster images
};

export default ConcertSeasons;
