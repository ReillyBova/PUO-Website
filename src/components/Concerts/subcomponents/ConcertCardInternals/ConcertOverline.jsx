// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Styling for overline
const overlineStyles = makeStyles(() => ({
    // Shift sheet upwards to suggest scrolling
    thin: {
        lineHeight: 'normal',
    },
}));

// Element to render concert overline text of concert card
const ConcertOverline = ({ text }) => {
    // CSS class for styling
    const { thin } = overlineStyles();
    // Render
    return (
        <Typography className={thin} variant='overline' color='textSecondary'>
            <span dangerouslySetInnerHTML={{ __html: text }} />
        </Typography>
    );
};

ConcertOverline.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertOverline;
