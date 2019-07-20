// Library imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

/**
 * A Gatsby Link with a delay after the link is clicked.
 *
 * Orignally inspired by https://gist.github.com/headzoo/8f4c6a5e843ec26abdcad87cd93e3e2e
 */
function DelayedLink({children, to="/", replace=false, delay=0, onDelayStart = (() => {}), onDelayEnd = (() => {})}) {
    // Hook to keep track of current timers
    const [timeOutID, setTimeOutID] = useState(null);

    // Function for handling click delay
    const handleClick = ((e) => {
        // Clear timer if necessary bc we should only have one running at a time
        if (timeOutID) {
            clearTimeout(timeOutID);
            setTimeOutID(null);
        }

        // Trigger delay start function if provided
        onDelayStart(e, to);
        e.preventDefault();

        // Set timer for "click" behavior
        const id = setTimeout(() => {
            // Gatsby navigation
            navigate(to, { replace: replace });
            // Trigger delay end function if provided
            if (onDelayEnd) {
              onDelayEnd(e, to);
            }
        }, delay);
        // Keep track of timer id
        setTimeOutID(id);
    });

    // Function for clearing up timers on dismount
    useEffect(() => {
        // Cleanup a lingering timer if necessary to avoid bad calls/mem leak
        return function cleanup() {
            if (timeOutID) {
                clearTimeout(timeOutID);
            }
        };
    }, []);

    // Render
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    );
}

DelayedLink.propTypes = {
    children: PropTypes.node, // Link content
    to: PropTypes.string, // Link target
    replace: PropTypes.bool, // Flag for browser history replacement. False by default
    delay: PropTypes.bool, // Milliseconds to wait before navigating
    onDelayStart: PropTypes.func, // Called on click before delay
    onDelayEnd: PropTypes.func // Called after delay
};

export default DelayedLink;
