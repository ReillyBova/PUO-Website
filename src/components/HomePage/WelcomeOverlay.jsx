// Library imports
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
// UI imports
import Fade from '@material-ui/core/Fade';
// Project imports
import { shuffleArray } from 'utils';
// Local imports
import overlayStyles from './overlay-styles';
import { WelcomeButton } from './subcomponents';

// Component for non-video welcome splash content
function WelcomeOverlay({ to, children }) {
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
    const { overlayWrapper, quotesWrapper, quoteBlock, centerer, quoteText, quoteAuthor, buttonWrapper } = overlayStyles();
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
            <div className={buttonWrapper}>
                <WelcomeButton to={to}>
                    { children }
                </WelcomeButton>
            </div>
        </div>
    );
}

WelcomeOverlay.propTypes = {
    children: PropTypes.node, // Overlay button text content
    to: PropTypes.string, // Overlay button target link
};

export default WelcomeOverlay;
