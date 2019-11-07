// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';
// Local imports
import { ConcertComposer, ConcertSoloist } from './';

// Element to render concert works for concert card
const ConcertWork = ({ text }) => {
    // Logically split up elements in text block, delineated by '~'
    const [composer, title, ...soloists] = text.split('~').map((e) => e.trim());

    // Render
    return (
        <Typography variant="body1" gutterBottom component="div">
            <ConcertComposer text={composer} />
            <span dangerouslySetInnerHTML={{ __html: ` ${title}` }} />
            {soloists.map((soloist, i) => (
                <ConcertSoloist key={i} text={soloist} />
            ))}
        </Typography>
    );
};

ConcertWork.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertWork;
