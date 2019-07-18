// Library imports
import React, { useEffect, useMemo, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// UI imports
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import { shuffleArray } from 'utils';
//import { VideoButton } from './'

// Custom styles for component
const overlayStyles = makeStyles((theme) => ({
    '@keyframes orangeLine': {
        from: { width: 0 },
        to: { width: '50%' },
    },
    overlayWrapper: {
        position: 'absolute',
        top: 0,
        marginTop: 128,
        width: '100%',
        height: 'calc(100vh - 198px)',
        display: 'flex',
        flexDirection: 'column',

        '@media screen and (max-width: 599px), screen and (max-height: 500px) and (min-width: 600px)': {
            marginTop: 80,
            height: 'calc(100vh - 150px)',
        },
    },
    quotesWrapper: {
        flex: 0,
        color: 'white',
        textShadow: '3px 3px 5px rgba(0,0,0,0.6)',
        userSelect: 'none',
        cursor: 'default',

        // Expanding orange line element
        '&:after': {
            content: "''",
            display: 'block',
            width: '50%',
            height: 4,
            margin: 'calc(75vh - 256px + 12px) auto 0 auto',
            background: theme.palette.primary.main,
            animation: '$orangeLine 1.2s',
            animationTimingFunction: 'ease',
            animationDelay: '1s',
            animationFillMode: 'both',
        },

        '@media screen and (max-height: 500px) and (min-width: 600px)': {
            '@media screen and (max-height: 485px)': {
                display: 'none',
            },
            '@media screen and (min-width: 1030px)': {
                display: 'none',
            },
        },
        '@media screen and (max-width: 599px) and (min-width: 420px) and (max-height: 460px)': {
            display: 'none',
        },
        '@media screen and (max-width: 420px) and (max-height: 450px)': {
            display: 'none',
        },
    },
    quoteAuthor: {
        fontSize: 40,
        fontFamily: 'Roboto, Open Sans, Roboto, Helvetica, Arial, sans-serif',
        textAlign: 'right',
        padding: '0 64px',
        fontWeight: 500,

        '@media screen and (max-height: 790px) and (min-width: 600px),\
            screen and (max-width: 1295px) and (min-width: 600px) and (max-height: 1100px),\
            screen and (max-width: 760px) and (min-width: 600px)': {
            '@media screen and (max-height: 715px), screen and (max-width: 1050px)': {
                fontSize: 22,
                '@media screen and (max-height: 630px) and (max-width: 1030px),\
                    screen and (max-width: 765px) and (max-height: 725px)': {
                    padding: '12px 32px',
                    fontSize: 14,
                    '@media screen and (max-height: 485px)': {
                        display: 'none',
                    },
                },
                '@media screen and (max-height: 585px) and (min-width: 1030px)': {
                    fontSize: 14,
                    '@media screen and (max-height: 500px)': {
                        display: 'none',
                    },
                },
            },
        },
        '@media screen and (max-width: 599px)': {
            padding: '12px 32px',
            fontSize: 25,
            '@media screen and (min-width: 420px) and (max-height: 845px)': {
                fontSize: 22,
                '@media screen and (max-height: 740px)': {
                    fontSize: 18,
                    '@media screen and (max-height: 620px)': {
                        fontSize: 14,
                        '@media screen and (max-height: 525px)': {
                            fontSize: 11,
                            '@media screen and (max-height: 460px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
            '@media screen and (max-width: 420px)': {
                padding: '12px 16px',
                fontSize: 18,
                '@media screen and (max-height: 700px)': {
                    fontSize: 14,
                    '@media screen and (max-height: 570px)': {
                        fontSize: 11,
                        '@media screen and (max-height: 495px)': {
                            fontSize: 9,
                            '@media screen and (max-height: 450px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
        },
    },
    quoteBlock: {
        height: 'calc(75vh - 256px)',
        width: '100%',
        display: 'flex !important',
        alignItems: 'center',
        position: 'absolute',
    },
    quoteText: {
        fontSize: 64,
        lineHeight: '1.2',
        fontFamily: 'Lora, serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        padding: '32px 64px',
        transition: 'font-size, padding, 0.5s',

        '@media screen and (max-height: 790px) and (min-width: 600px),\
            screen and (max-width: 1295px) and (min-width: 600px) and (max-height: 1100px),\
            screen and (max-width: 760px) and (min-width: 600px)': {
            fontSize: 50,
            '@media screen and (max-height: 715px), screen and (max-width: 1050px)': {
                fontSize: 35,
                '@media screen and (max-height: 630px) and (max-width: 1030px),\
                    screen and (max-width: 765px) and (max-height: 725px)': {
                    padding: '0 32px',
                    fontSize: 22,
                    '@media screen and (max-height: 485px)': {
                        display: 'none',
                    },
                },
                '@media screen and (max-height: 585px) and (min-width: 1030px)': {
                    fontSize: 22,
                    '@media screen and (max-height: 500px)': {
                        display: 'none',
                    },
                },
            },
        },
        '@media screen and (max-width: 599px)': {
            padding: '0 32px',
            fontSize: 40,
            '@media screen and (min-width: 420px) and (max-height: 845px)': {
                fontSize: 35,
                '@media screen and (max-height: 740px)': {
                    fontSize: 28,
                    '@media screen and (max-height: 620px)': {
                        fontSize: 22,
                        '@media screen and (max-height: 525px)': {
                            fontSize: 18,
                            '@media screen and (max-height: 460px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
            '@media screen and (max-width: 420px)': {
                padding: '0 16px',
                fontSize: 28,
                '@media screen and (max-height: 700px)': {
                    fontSize: 22,
                    '@media screen and (max-height: 570px)': {
                        fontSize: 18,
                        '@media screen and (max-height: 495px)': {
                            fontSize: 14,
                            '@media screen and (max-height: 450px)': {
                                display: 'none',
                            },
                        },
                    },
                },
            },
        },
    },
    centerer: {
        width: '100%',
    },
}));

// Component for non-video welcome splash content
function WelcomeOverlay() {
    // Query quotes from markdown
    const rawQuotes = useStaticQuery(
        graphql`
        query {
            allFile(filter: {relativePath: {eq: "HomePage/quotes.md"}}) {
                edges {
                    node {
                        childMarkdownRemark {
                            rawMarkdownBody
                        }
                    }
                }
            }
        }
        `
    ).allFile.edges[0].node.childMarkdownRemark.rawMarkdownBody;

    // Hook that saves state about which quote we are showing
    const [activeQuote, setActiveQuote] = useState(0);

    // Process raw markdown into a more useful object format
    const quotes = useMemo(() => {
        const formattedQuotes = rawQuotes.split("\n\n").map((quote) => {
            // Split quote text from author
            const splitQuote = quote.split("\n");
            if (splitQuote.length < 2) {
                // Something went wrong; skip quote completely
                return null;
            }
            // Return (text, author) pair extracted from quote
            return {text: splitQuote[0], author: splitQuote[1]};
        }).filter((quote) => !!quote);

        // Shuffle to mix up order
        shuffleArray(formattedQuotes);
        return (formattedQuotes);
    }, [rawQuotes]);

    // Hooks for changing quote every 12s
    const advanceQuote = () => setActiveQuote((activeQuote + 1) % quotes.length);
    useEffect(() => {
            // Keep track of timeout so it can be cleared on dismount if necessary
            const id = setTimeout(advanceQuote, 15000);
            return (() => (clearTimeout(id)));
        },
        [activeQuote]
    );

    // CSS classes for styling
    const { overlayWrapper, quotesWrapper, quoteBlock, quoteAuthor, quoteText, centerer } = overlayStyles();
    // Render
    return (
        <div className={overlayWrapper}>
            <div className={quotesWrapper}>
                {quotes.map((quote, i) => (
                    <Fade in={i === activeQuote} key={i} timeout={4000} appear>
                        <div className={quoteBlock}>
                          <div className={centerer}>
                            <div className={quoteText}>
                               {`“${quote.text}”`}
                            </div>
                            <div className={quoteAuthor}>
                              {`– ${quote.author}`}
                            </div>
                          </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
}

export default WelcomeOverlay;
