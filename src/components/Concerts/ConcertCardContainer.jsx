// Library imports
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
// UI imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// Project imports
import { addUTCDays, longestWord } from 'utils';
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
    /*
     * Use date to determine if we have already passed the concert
     * plus a one week (7 day) grace period
     */
    const oneWeekAfterConcert = addUTCDays(new Date(date), 7);
    const isUpcoming = oneWeekAfterConcert.getTime() > new Date().getTime();

    /* Compute custom min-width for concerNameCard boxes based on concertName
     * Explanation: absolute min is 150px, with an extra 10px for every character
     *              in the longest word beyond its 7th character
     */
    const nameCardMinWidth = (
        80 + (10 * Math.max(7, longestWord(concertName).length))
    );

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
    } = concertCardStyles({ isRTL, nameCardMinWidth });

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
        <Paper key={0} elevation={2} className={concertNameCard}>
            <Typography variant="h4">{concertName}</Typography>
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
