// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';

// Element to render concert overline text of concert card
const ConcertBreak = ({ text }) => (
    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        <span dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
);

ConcertBreak.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertBreak;
