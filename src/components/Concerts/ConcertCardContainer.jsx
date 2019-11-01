// Library imports
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
// UI imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// Project imports
import { addUTCDays } from 'utils';
// Local imports
import concertCardStyles from './concert_card-styles';
import {
    ConcertBreak,
    ConcertDatetime,
    ConcertGeneraltime,
    ConcertHall,
    ConcertOverline,
    ConcertSubtitle,
    ConcertTitle,
    ConcertWork,
    HistoryButtons,
    UpcomingButtons,
} from './subcomponents';

// Card element for concert guides
const ConcertCardContainer = ({
    isRTL,
    fluidPoster,
    contentByKey,
    concertName,
    date,
    calendar,
    tickets,
    stream,
    youtube,
    spotify,
}) => {
    // Hook for setting concertNameCard width
    const [concertNameCardWidth, setconcertNameCardWidth] = useState(150);

    // Ref for keeping track of the black triangle polygon element
    const concertNameWrapper = useRef();// Ref for keeping track of the black triangle polygon element
    const concertNameText = useRef();

    /*
     * Use date to determine if we have already passed the concert
     * plus a one week (7 day) grace period
     */
    const oneWeekAfterConcert = addUTCDays(new Date(date), 7);
    const isUpcoming = oneWeekAfterConcert.getTime() > new Date().getTime();

    // If "Concert" isn't the longest word in concertName, we might need to resize
    useEffect(() => {
        // closure variable to keep track of event listener removals
        let exited = false;

        // Event handler cleanup
        function cleanup() {
            if (!exited) {
                exited = true;
                window.removeEventListener('resize', handleResize);
            }
        }

        // Resize handler
        function handleResize() {
            const outerWidth = concertNameWrapper.current.clientWidth;
            const innerWidth = concertNameText.current.clientWidth;
            const difference = outerWidth - innerWidth;

            // 16px margin spacing on either side gives 32px difference
            if (difference < 32) {
                setconcertNameCardWidth(concertNameCardWidth + difference);
                cleanup();
            } else if (outerWidth === 150) {
                cleanup();
            }
        }

        // Register event handlers on component mount
        window.addEventListener('resize', handleResize, false);
        // Invoke resize to start
        handleResize();

        // Cleanup event handlers on unmount
        return cleanup;
    }, [
        /* Empty update-on array ensures useEffect only runs on mount */
    ]);

    // CSS classes with props
    const {
        card,
        concertNameCard,
        concertDetails,
        programContent,
        posterStyle,
        buttonWrapper,
        buttonIcon,
        largeBreak,
        smallBreak,
    } = concertCardStyles({ isRTL });

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

    // Props for button links
    const buttonLinks = isUpcoming
        ? { calendar, tickets, stream, buttonIcon }
        : { youtube, spotify, buttonIcon };

    // Card JSX as list for easy reversal
    const concertCard = [
        <Paper
            key={0}
            elevation={2}
            ref={concertNameWrapper}
            className={concertNameCard}
            style={{minWidth: concertNameCardWidth}}
        >
            <Typography ref={concertNameText} variant="h4">{concertName}</Typography>
        </Paper>,
        <div key={1} className={concertDetails}>
            <CardContent className={programContent}>
                {contentByKey.map(mapKeyToComponent).filter((node) => !!node)}
            </CardContent>
            <CardActions disableSpacing className={buttonWrapper}>
                {isUpcoming ? (
                    <UpcomingButtons {...buttonLinks} />
                ) : (
                    <HistoryButtons {...buttonLinks} />
                )}
            </CardActions>
        </div>,
        fluidPoster && (
            <Image key={2} className={posterStyle} fluid={fluidPoster} />
        ),
    ];

    if (!isRTL) {
        concertCard.reverse();
    }

    // Render
    return (
        <Card elevation={4} className={card}>
            {concertCard}
        </Card>
    );
};

ConcertCardContainer.propTypes = {
    isRTL: PropTypes.bool, // Right to left ordering
    fluidPoster: PropTypes.object, // Fluid image-sharp from Gatsby
    contentByKey: PropTypes.array, // Array of (key, value) pairs for content
    concertName: PropTypes.string, // Concert generic title (e.g. Fall Concert)
    date: PropTypes.string, // Approximate date of concert
    calendar: PropTypes.string, // Link to calendar event
    tickets: PropTypes.string, // Link to purchase tickets
    stream: PropTypes.string, // Link to livestram concert
    youtube: PropTypes.string, // Link to concert youtube video (playlist)
    spotify: PropTypes.string, // Link to concert spotify album
};

export default ConcertCardContainer;
