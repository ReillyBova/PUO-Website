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
            color={"primary"}
            href={calendar}
            target={"_blank"}
            aria-label={"Add to Calendar"}
            nofollow={""}
        >
            <CalendarPlusIcon className={buttonIcon} />
            {'Add to Calendar'}
        </Button>
        <Button
            disabled={!tickets}
            color={"primary"}
            href={tickets}
            target={"_blank"}
            aria-label={"Get Tickets"}
            nofollow={""}
        >
            <TicketIcon className={buttonIcon} />
            {'Get Tickets'}
        </Button>
        <Button
            disabled={!stream}
            color={"primary"}
            href={stream}
            target={"_blank"}
            aria-label={"Go To Livestream"}
            nofollow={""}
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
