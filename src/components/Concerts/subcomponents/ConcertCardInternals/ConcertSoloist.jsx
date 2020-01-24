// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';

// Element to render concert soloist text of concert card
const ConcertSoloist = ({ text }) => (
    <Typography variant='body2' color='textSecondary'>
        <span dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
);

ConcertSoloist.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertSoloist;
