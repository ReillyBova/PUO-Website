// Library imports
import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// Project imports
import { scrollToHash, urlify } from 'utils';
// Local imports
import { HoverDropdown } from './HoverDropdown';

// A container that holds the desktop version of the navbar
const DesktopLinks = ({ classes, navigation }) => {
    // Function for generating navbar elements from site navigation configuration
    const makeLinkAndDropdown = (navItem, i, location) => {
        // Make Header JSX
        const baseURL = urlify(navItem.page);
        const isCurrentPage = baseURL === location.pathname.split('/')[1];
        const headerLink = (
            <Link to={`/${baseURL}`} activeClassName='active' partiallyActive>
                {navItem.page}
            </Link>
        );

        // Render behavior determined by if there is a dropdown
        if (!navItem.sections) {
            // Render with no dropdown
            return (
                <div key={i} className={navbarLink}>
                    {headerLink}
                </div>
            );
        } else {
            // Generate dropdown
            const listLinks = navItem.sections.map((section, j) => {
                const sectionURL = urlify(section);
                if (navItem.type === 'OnePageOnly') {
                    const sectionAnchor = `#${sectionURL}`;
                    const isActive = sectionAnchor === location.hash;
                    if (isCurrentPage) {
                        // Smooth Scrolling alternative
                        return (
                            <div className={desktopDropdownLink} key={j}>
                                <span
                                    className={clsx(isActive && 'active')}
                                    onClick={() =>
                                        scrollToHash(sectionURL, navItem.page)
                                    }
                                >
                                    {section}
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div className={desktopDropdownLink} key={j}>
                                <Link
                                    to={`/${baseURL}${sectionAnchor}`}
                                    className={clsx(isActive && 'active')}
                                >
                                    {section}
                                </Link>
                            </div>
                        );
                    }
                } else {
                    const fullURL = `/${baseURL}/${sectionURL}`;
                    const isActive = fullURL === location.pathname;
                    return (
                        <div className={desktopDropdownLink} key={j}>
                            <Link
                                to={fullURL}
                                className={clsx(isActive && 'active')}
                            >
                                {section}
                            </Link>
                        </div>
                    );
                }
            });
            // Return dropdown
            return (
                <HoverDropdown
                    key={i}
                    header={<div className={navbarLink}>{headerLink}</div>}
                    list={listLinks}
                />
            );
        }
    };

    // CSS classes for styling
    const { desktopLinks, desktopDropdownLink, navbarLink } = classes;
    // Render
    return (
        <nav className={desktopLinks}>
            <Location>
                {({ location }) =>
                    navigation.map((navItem, i) =>
                        makeLinkAndDropdown(navItem, i, location)
                    )
                }
            </Location>
        </nav>
    );
};

DesktopLinks.propTypes = {
    classes: PropTypes.object, // Styling classes
    navigation: PropTypes.array, // Site navigation configuration
};

export default DesktopLinks;
