// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';

// Element to render general concert dates for concert card
const ConcertDatetime = ({ text }) => (
    <Typography variant="subtitle2" color="textSecondary" >
        {text}
    </Typography>
);

ConcertDatetime.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertDatetime;
