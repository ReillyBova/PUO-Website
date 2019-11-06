// Library imports
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { graphql, navigate } from 'gatsby';
// UI imports
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Project imports
import {
    ConcertCard,
    PageLayout,
    Parallax,
    Sheet,
    ImageBanner,
} from 'components';
import {
    CAN_USE_IO,
    preprocessConcerts,
    preprocessPosters,
    groupConcertsBySeason,
    winHeight,
    winWidth,
} from 'utils';

// Styling for homepage elements
const concertStyles = makeStyles((theme) => ({
    // Shift sheet upwards to suggest scrolling
    concertSheet: {
        marginTop: 'calc(-65vh + 120px)',
    },
    lazyLoadingWrapper: {
        margin: 'auto',
        width: 'fit-content',
    },
    subheader: {
        position: 'relative',
        zIndex: 4,
        width: 'fit-content',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
        marginLeft: -theme.spacing(6),
        background: theme.palette.primary.main,
        color: 'white',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
            marginBottom: theme.spacing(2),
            marginLeft: -theme.spacing(3),
        },
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

function PastSeasons({ data }) {
    // Preprocess posters in object organized by fileName
    const posterData = preprocessPosters(data.posters.nodes);

    // Preprocess concert info into managable object
    const concertData = useMemo(() => preprocessConcerts(data.concerts.nodes, posterData), [data]);

    // Corner case
    if (!concertData.length) {
        if (typeof window !== 'undefined') {
            // Return 404
            navigate('/404');
            return null;
        }
    }

    // Seperate by season
    const dataBySeason = useMemo(() => groupConcertsBySeason(concertData), [concertData]);
    const seasons = useMemo(() => Object.keys(dataBySeason).sort().reverse(), [dataBySeason]);

    // Helper for computing the appropriate layout state
    const computeLayout = () => {
        // Set mobile mode if necessary
        const width = winWidth();
        if (width < 960) {
            if (width <= 700) {
                return 0;
            } else {
                return 1;
            }
        } else {
            return 2;
        }
    };

    // Ref to track last element lazy rendered
    const lastSeasonRenderedRef = useRef();

    // Hook for lazy rendering
    const [numRendered, setNumRendered] = useState(Math.min(LAZY_RENDER_BUFF_SIZE, seasons.length));

    // Hook for toggle mobile mode on window resize
    const [cardLayoutIndex, setCardLayoutIndex] = useState(computeLayout());

    // Browser event controller for setting layout on resize
    useEffect(() => {
        // Resize handler
        function handleResize() {
            setCardLayoutIndex(computeLayout());
        }

        // Register event handlers on component mount
        window.addEventListener('resize', handleResize, false);

        // Cleanup event handlers on unmount
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        };
    }, [
        /* Empty update-on array ensures useEffect only runs on mount */
    ]);

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

                if (lastSeasonRenderedRef.current.getBoundingClientRect().top < threshold) {
                    setNumRendered(Math.min(numRendered + LAZY_RENDER_BUFF_SIZE, seasons.length));
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
                    setNumRendered(Math.min(numRendered + LAZY_RENDER_BUFF_SIZE, seasons.length));
                    finished = true;
                }
            });
        };

        // Trigger callback when half of the card scrolls into view
        const intersectionObserver = new IntersectionObserver(visibilityCallback);

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
    const { concertSheet, subheader, seasonSection, lazyLoadingWrapper } = concertStyles();
    return (
        <PageLayout title="Past Seasons">
            <Parallax>
                <ImageBanner fluid={data.test.childImageSharp.fluid} />
            </Parallax>
            <Sheet className={concertSheet}>
                {seasonsToRender.map((season, i) => {
                    const concerts = dataBySeason[season];
                    const isLast = (i === seasonsToRender.length - 1);
                    // Sort concerts by date
                    concerts.sort((a, b) => a.date.localeCompare(b.date));
                    // Build season
                    return (
                        <div className={seasonSection} key={season} ref={(isLast) ? lastSeasonRenderedRef : null}>
                            <Paper elevation={4} className={subheader}>
                                <Typography variant="h3">
                                    {`The ${season} Season`}
                                </Typography>
                            </Paper>
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
                {(seasons.length !== numRendered) && (
                    <div className={lazyLoadingWrapper}>
                        <CircularProgress />
                    </div>
                )}
            </Sheet>
        </PageLayout>
    );
}

export const fluidImage = graphql`
    fragment fluidImage on File {
        name
        childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }
`;

export const fluidImage2 = graphql`
    fragment fluidImage2 on File {
        name
        childImageSharp {
            fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }
`;

export const pageQuery = graphql`
    query {
        posters: allFile(
            filter: {
                sourceInstanceName: { eq: "images" }
                relativeDirectory: { eq: "posters" }
                ext: { eq: ".jpg" }
            }
        ) {
            nodes {
                ...fluidImage
            }
        }
        test: file(relativePath: { eq: "poster.jpg" }) {
            ...fluidImage2
        }

        concerts: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/\\/src\\/content\\/Concerts\\/.*\\.md$/"},
                frontmatter: {current: {eq: "false"}}
            },
            sort: {fields: frontmatter___date}
        ) {
            nodes {
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
        }
    }
`;

export default PastSeasons;
