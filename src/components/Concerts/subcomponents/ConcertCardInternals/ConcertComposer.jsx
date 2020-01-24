// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';

// Element to render concert composer text of concert card
const ConcertComposer = ({ text }) => (
    <Typography variant='body2' component='span'>
        <span dangerouslySetInnerHTML={{ __html: text }} />
    </Typography>
);

ConcertComposer.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertComposer;
