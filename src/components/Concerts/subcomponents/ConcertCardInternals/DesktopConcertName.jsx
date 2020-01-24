// Library imports
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// UI imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Renders the floating concert name card for desktop layout
const DesktopConcertName = ({ concertName, concertNameCardClass }) => {
    // Hook for setting concertNameCard width
    const [concertNameCardWidth, setconcertNameCardWidth] = useState(150);

    // Refs for keeping track of the concert name width
    const concertNameWrapper = useRef();
    const concertNameText = useRef();

    // On desktop display, need to prevent the concert name from overflowing box
    useEffect(
        () => {
            // closure variable to keep track of event listener removals
            let finished = false;

            // Event handler cleanup (prevents double remove)
            function cleanup() {
                if (!finished) {
                    finished = true;
                    window.removeEventListener('resize', handleResize);
                }
            }

            // Resize handler
            function handleResize() {
                if (!concertNameWrapper || !concertNameText) {
                    return;
                }

                // Compute gap between internal and external divs
                const outerWidth = concertNameWrapper.current.clientWidth;
                const innerWidth = concertNameText.current.clientWidth;
                const difference = outerWidth - innerWidth;

                // 16px margin spacing on either side gives target of 32px difference
                if (difference < 32) {
                    setconcertNameCardWidth(outerWidth + (32 - difference));
                    // We only need to set once, so we can cleanup
                    cleanup();
                } else if (outerWidth === 150) {
                    // We can cleanup because outerWidth won't shrink anymore
                    cleanup();
                }
            }

            // Register event handlers on component mount
            window.addEventListener('resize', handleResize, false);
            // Invoke resize to start
            handleResize();

            // Cleanup event handler on unmount
            return cleanup;
        },
        [
            /* Empty update-on array ensures useEffect only runs on mount */
        ]
    );

    return (
        <Paper
            elevation={2}
            ref={concertNameWrapper}
            className={concertNameCardClass}
            style={{ minWidth: concertNameCardWidth }}
        >
            <Typography ref={concertNameText} variant='h4'>
                {concertName}
            </Typography>
        </Paper>
    );
};

DesktopConcertName.propTypes = {
    concertName: PropTypes.string, // Concert generic title (e.g. Fall Concert)
    concertNameCardClass: PropTypes.string, // Styling class for the name card
};

export default DesktopConcertName;
