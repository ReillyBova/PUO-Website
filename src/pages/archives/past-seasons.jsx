// Library imports
import React, { useEffect, useState } from 'react';
import { graphql, navigate } from 'gatsby';
// UI imports
import { makeStyles } from '@material-ui/styles';
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
    preprocessConcerts,
    preprocessPosters,
    groupConcertsBySeason,
    winWidth,
} from 'utils';

// Styling for homepage elements
const concertStyles = makeStyles((theme) => ({
    // Shift sheet upwards to suggest scrolling
    concertSheet: {
        marginTop: 'calc(-65vh + 120px)',
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

function PastSeasons({ data }) {
    // Preprocess posters in object organized by fileName
    const posterData = preprocessPosters(data.posters.nodes);

    // Preprocess concert info into managable object
    const concertData = preprocessConcerts(data.concerts.nodes, posterData);

    // Corner case
    if (!concertData.length) {
        if (typeof window !== 'undefined') {
            // Return 404
            navigate('/404');
            return null;
        }
    }

    // Hook for toggle mobile mode on window resize
    const [cardLayoutIndex, setCardLayoutIndex] = useState(2);

    // Browser event controller
    useEffect(() => {
        // Resize handler
        function handleResize() {
            // Set mobile mode if necessary
            const width = winWidth();
            if (width < 960) {
                if (width <= 700) {
                    setCardLayoutIndex(0);
                } else {
                    setCardLayoutIndex(1);
                }
            } else {
                setCardLayoutIndex(2);
            }
        }

        // Register event handlers on component mount
        window.addEventListener('resize', handleResize, false);
        // Invoke resize to start
        handleResize();
        // Cleanup event handlers on unmount
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        };
    }, [
        /* Empty update-on array ensures useEffect only runs on mount */
    ]);

    // Seperate by season
    const dataBySeason = groupConcertsBySeason(concertData);
    const seasons = Object.keys(dataBySeason)
        .sort()
        .reverse();

    // CSS classes for styling
    const { concertSheet, subheader, seasonSection } = concertStyles();
    return (
        <PageLayout title="Past Seasons">
            <Parallax>
                <ImageBanner fluid={data.test.childImageSharp.fluid} />
            </Parallax>
            <Sheet className={concertSheet}>
                {seasons.map((season) => {
                    const concerts = dataBySeason[season];
                    // Sort concerts by date
                    concerts.sort((a, b) => a.date.localeCompare(b.date));
                    // Build season
                    return (
                        <div className={seasonSection} key={season}>
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
