// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Styling for subtitle
const subtitleStyles = makeStyles(() => ({
    // Shift sheet upwards to suggest scrolling
    thin: {
        lineHeight: 'normal',
    },
}));

// Element to render concert subtitle text of concert card
const ConcertSubtitle = ({ text }) => {
    // CSS class for styling
    const { thin } = subtitleStyles();
    // Render
    return (
        <Typography
            className={thin}
            variant='subtitle1'
            color='textSecondary'
            gutterBottom
        >
            <span dangerouslySetInnerHTML={{ __html: text }} />
        </Typography>
    );
};

ConcertSubtitle.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertSubtitle;
