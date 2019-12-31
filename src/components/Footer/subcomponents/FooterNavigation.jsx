// Library imports
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// UI imports
import Grid from '@material-ui/core/Grid';
// Project imports
import { InternalLink } from 'components';
import { smoothScroll, urlify } from 'utils';

// Lists major navigation pages in the footer
function FooterNavigation({ classes, currentLocation, siteSkeleton }) {
    // CSS classes for styling
    const { footerNavLink } = classes;

    // Current location information
    const { currentPage } = currentLocation;

    // Boolean to determine whether the current page is the home page (not in site skeleton)
    const isHomepageActive = currentPage === 'Home';

    // Links route to different page
    return (
        <Grid
            container
            item
            xs={12}
            justify={'space-evenly'}
            alignItems={'center'}
        >
            {isHomepageActive ? (
                <span
                    className={clsx(footerNavLink, 'active')}
                    onClick={() => smoothScroll(0, 1000)}
                >
                    {'Home'}
                </span>
            ) : (
                <InternalLink className={footerNavLink} to={'/'}>
                    {'Home'}
                </InternalLink>
            )}
            {siteSkeleton.map(({ page }, i) => {
                // Corner case for matching section
                if (page === currentPage) {
                    // Button to jump up to top of page
                    return (
                        <span
                            className={clsx(footerNavLink, 'active')}
                            key={`${page}-${i}`}
                            onClick={() => smoothScroll(0, 1000)}
                        >
                            {page}
                        </span>
                    );
                }

                // Button for routing to different page
                return (
                    <InternalLink
                        className={footerNavLink}
                        key={`${page}-${i}`}
                        to={`/${urlify(page)}`}
                    >
                        {page}
                    </InternalLink>
                );
            })}
        </Grid>
    );
}

// Proptypes
FooterNavigation.propTypes = {
    classes: PropTypes.object, // Styling classes
    currentLocation: PropTypes.object, // Location info from computeCurrentLocation()
    siteSkeleton: PropTypes.array, // Layout of site
};

export default FooterNavigation;
