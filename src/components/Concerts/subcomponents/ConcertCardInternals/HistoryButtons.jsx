// Library imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// UI imports
import Button from '@material-ui/core/Button';
import YouTubeIcon from 'mdi-material-ui/Youtube';
import SpotifyIcon from 'mdi-material-ui/Spotify';

// Element to render concert title text of concert card
const HistoryButtons = ({ youtube, spotify, buttonIcon }) => (
    <Fragment>
        <Button
            disabled={!youtube}
            color={'primary'}
            href={youtube}
            aria-label={'Watch on YouTube'}
            target={'_blank'}
            rel='noopener noreferrer'
        >
            <YouTubeIcon className={buttonIcon} />
            {'Watch on YouTube'}
        </Button>
        <Button
            disabled={!spotify}
            color={'primary'}
            href={spotify}
            aria-label={'Listen on Spotify'}
            target={'_blank'}
            rel='noopener noreferrer'
        >
            <SpotifyIcon className={buttonIcon} />
            {'Listen on Spotify'}
        </Button>
    </Fragment>
);

HistoryButtons.propTypes = {
    calendar: PropTypes.string, // Calendar link
    tickets: PropTypes.string, // Tickets link
    stream: PropTypes.string, // Stream link
};

export default HistoryButtons;
