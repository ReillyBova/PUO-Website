// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// Project imports
import { Retheme } from 'components';
// Local imports
import ConcertCardCore from './ConcertCardCore.jsx';

// Card element for concert guides
function ConcertCard({
    fluidPoster,
    rawHTML,
    concertName,
    colorTheme,
    date,
    calendar,
    tickets,
    stream,
    youtube,
    spotify,
    id,
    cardLayoutIndex,
}) {
    /*
     * Extract content (we need to look at HTML to handle bold/italics)
     * Filter out extraneous <p /> elements and split by line
     */
    const filteredHTML = rawHTML.replace(/<\/?p>/g, '').split('\n');

    // Convert to key-value pairs based on content
    const contentByKey = filteredHTML.map((html) => {
        // Split by the '=' key delimiter in our custom format
        const htmlAsList = html.trim().split('=');
        // Extract and process key; null by default
        const key = (htmlAsList[0] || '').trim().toLowerCase();
        // Rejoin the remaining text (in case it has an '=' sign)
        const content = htmlAsList
            .slice(1)
            .join(' ')
            .trim();

        return { key, content };
    });

    // Render direction based on order
    const cardProps = {
        contentByKey,
        fluidPoster,
        concertName,
        date,
        calendar,
        tickets,
        stream,
        youtube,
        spotify,
        cardLayoutIndex,
    };

    return (
        <Retheme newColor={colorTheme}>
            <ConcertCardCore isRTL={!(id % 2)} {...cardProps} />
        </Retheme>
    );
}

ConcertCard.defaultProps = {
    rawHTML: '',
    concertName: 'Concert',
    colorTheme: '#f58025',
    date: null,
    calendar: '',
    tickets: '',
    stream: '',
    youtube: '',
    spotify: '',
    id: 0,
    cardLayoutIndex: 2,
};

ConcertCard.propTypes = {
    fluidPoster: PropTypes.object, // Fluid image-sharp from Gatsby
    rawHTML: PropTypes.string, // Raw HTML of concert content
    concertName: PropTypes.string, // Concert generic title (e.g. Fall Concert)
    concertTheme: PropTypes.string, // Concert color theme
    date: PropTypes.string, // Approximate date of concert
    calendar: PropTypes.string, // Link to calendar event
    tickets: PropTypes.string, // Link to purchase tickets
    stream: PropTypes.string, // Link to livestram concert
    youtube: PropTypes.string, // Link to concert youtube video (playlist)
    spotify: PropTypes.string, // Link to concert spotify album
    id: PropTypes.number, // Ordering of concert within larger list
    cardLayoutIndex: PropTypes.number, // In range [0,2]; indicates screen width
};

export default ConcertCard;
