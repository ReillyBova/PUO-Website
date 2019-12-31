// Library imports
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// UI imports
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// Project imports
import { InternalButtonLink } from 'components';
import { arrayToURL, scrollToHash, smoothScroll, urlify } from 'utils';

// Renders quick-links to subsections of current page at the top of the footer
function SubsectionNavigation({ classes, currentLocation }) {
    // Current location information
    const {
        currentPage,
        currentSection,
        pageType,
        subSections,
    } = currentLocation;

    // CSS classes for styling
    const { button } = classes;

    // Render different linkage based on page type
    if (pageType === 'OnePageOnly') {
        // Links trigger scrolling animation
        return (
            <Grid
                container
                item
                xs={12}
                justify={'space-evenly'}
                alignItems={'center'}
            >
                {subSections.map((section, i) => {
                    // Button for jumping to hash location
                    return (
                        <Button
                            className={clsx(
                                button,
                                section === currentSection && 'active'
                            )}
                            color="primary"
                            key={`${section}-${i}`}
                            onClick={() =>
                                scrollToHash(urlify(section), currentPage)
                            }
                        >
                            {section}
                        </Button>
                    );
                })}
            </Grid>
        );
    } else {
        // Links route to different page
        return (
            <Grid
                container
                item
                xs={12}
                justify={'space-evenly'}
                alignItems={'center'}
            >
                {subSections.map((section, i) => {
                    // Corner case for matching section
                    if (section === currentSection) {
                        // Button to jump up to top of page
                        return (
                            <Button
                                className={`${button} active`}
                                color="primary"
                                key={`${section}-${i}`}
                                onClick={() => smoothScroll(0, 1000)}
                            >
                                {currentSection}
                            </Button>
                        );
                    }

                    // Button for routing to different page
                    return (
                        <InternalButtonLink
                            className={button}
                            color="primary"
                            key={`${section}-${i}`}
                            to={arrayToURL([currentPage, section])}
                        >
                            {section}
                        </InternalButtonLink>
                    );
                })}
            </Grid>
        );
    }
}

// Proptypes
SubsectionNavigation.propTypes = {
    classes: PropTypes.object, // Styling classes
    currentLocation: PropTypes.object, // Location info from computeCurrentLocation()
};

export default SubsectionNavigation;
