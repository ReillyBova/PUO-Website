// Library imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// UI imports
import Button from '@material-ui/core/Button';
import CalendarPlusIcon from 'mdi-material-ui/CalendarPlus';
import TicketIcon from 'mdi-material-ui/Ticket';
import LiveTvIcon from '@material-ui/icons/LiveTvRounded';

// Element to render concert title text of concert card
const UpcomingButtons = ({ calendar, tickets, stream, buttonIcon }) => (
    <Fragment>
        <Button
            disabled={!calendar}
            color={'primary'}
            href={calendar}
            aria-label={'Add to Calendar'}
            target={'_blank'}
            rel="nofollow noopener noreferrer"
        >
            <CalendarPlusIcon className={buttonIcon} />
            {'Add to Calendar'}
        </Button>
        <Button
            disabled={!tickets}
            color={'primary'}
            href={tickets}
            aria-label={'Get Tickets'}
            target={'_blank'}
            rel="noopener noreferrer"
        >
            <TicketIcon className={buttonIcon} />
            {'Get Tickets'}
        </Button>
        <Button
            disabled={!stream}
            color={'primary'}
            href={stream}
            aria-label={'Go To Livestream'}
            target={'_blank'}
            rel="noopener noreferrer"
        >
            <LiveTvIcon className={buttonIcon} />
            {'Livestream'}
        </Button>
    </Fragment>
);

UpcomingButtons.propTypes = {
    calendar: PropTypes.string, // Calendar link
    tickets: PropTypes.string, // Tickets link
    stream: PropTypes.string, // Stream link
};

export default UpcomingButtons;
