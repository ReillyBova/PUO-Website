// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';

// Element to render concert subtitle text of concert card
const ConcertHall = ({ text }) => (
    <Typography variant="subtitle2">
        <span dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
);

ConcertHall.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertHall;
