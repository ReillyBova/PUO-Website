// Library imports
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Match } from '@reach/router';
// UI Imports
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Dropdown for subpage links inside large mobile menu dropdown
const MobileDropdown = ({ classes, header, list, baseURL, menuIsActive }) => {
    // Hook for capturing hover
    const [isHovered, setHover] = useState(false);

    // CSS classes for styling
    const {
        mobileDropdown,
        mobileDropdownChevron,
        mobileDropdownDetails,
        mobileDropdownHoverCapture,
    } = classes;
    // Render
    return (
        <Match path={baseURL}>
            {({ match }) => (
                <ExpansionPanel
                    defaultExpanded={match && menuIsActive}
                    className={mobileDropdown}
                >
                    <ExpansionPanelSummary
                        expandIcon={
                            <ExpandMoreIcon
                                className={clsx(
                                    mobileDropdownChevron,
                                    isHovered && 'hover'
                                )}
                            />
                        }
                    >
                        {header}
                        <div
                            className={mobileDropdownHoverCapture}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={mobileDropdownDetails}>
                        {list}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
        </Match>
    );
};

MobileDropdown.propTypes = {
    classes: PropTypes.object, // Styling classes
    header: PropTypes.node, // Page header JSX
    list: PropTypes.node, // Page sections JSX
    baseURL: PropTypes.string, // URL string for path matching
    menuIsActive: PropTypes.bool, // Mobile dropdown state
};

export default MobileDropdown;
