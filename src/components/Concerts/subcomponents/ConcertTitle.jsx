// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';

// Element to render concert title text of concert card
const ConcertTitle = ({ text }) => (
    <Typography variant="h5">
        <span dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
);

ConcertTitle.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertTitle;
