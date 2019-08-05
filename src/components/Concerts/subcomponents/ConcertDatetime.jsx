// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Typography from '@material-ui/core/Typography';
// Project imports
import { dateToUTCFullMonthName, dateToUTCWeekdayName } from 'utils';

// Element to render concert dates for concert card
const ConcertDatetime = ({ text }) => {
    // Convert date-time string to Date object in UTC timezone
    const dateTime_UTC = new Date(`${text} UTC`);

    // Extract time information
    let hourValue = dateTime_UTC.getUTCHours() % 12;
    hourValue = (hourValue === 0)? 12 :  hourValue; // 0am => 12am
    const minuteValue = dateTime_UTC.getUTCMinutes();
    const minuteString = (minuteValue < 10)? `0${minuteValue}` : `${minuteValue}`;
    const meridianSuffix = dateTime_UTC.getUTCHours() < 12 ? 'AM' : 'PM';
    const timeString = `${hourValue}:${minuteString}${meridianSuffix}`;

    // Extract date information
    const dayValue = dateTime_UTC.getUTCDate();
    const weekdayName = dateToUTCWeekdayName(dateTime_UTC);
    const monthName = dateToUTCFullMonthName(dateTime_UTC);
    const yearValue = dateTime_UTC.getUTCFullYear();
    const dateString = ` ${weekdayName}, ${monthName} ${dayValue}, ${yearValue}`;

    // Render
    return (
        <Typography variant="subtitle2">
            <Typography
                variant="subtitle2"
                color="textSecondary"
                component="span"
            >
                {timeString}
            </Typography>
            {dateString}
        </Typography>
    );
};

ConcertDatetime.propTypes = {
    text: PropTypes.string, // Text content
};

export default ConcertDatetime;
