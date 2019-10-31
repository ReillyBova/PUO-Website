// Library imports
import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
// Project imports
import { activeHash, activePath, urlify } from 'utils';
// Local imports
import { HoverDropdown } from './HoverDropdown';

// A container that holds the desktop version of the navbar
const DesktopLinks = ({ classes, navigation }) => {
    // Function for generating navbar elements from site navigation configuration
    const makeLinkAndDropdown = (navItem, i) => {
        // Make Header JSX
        const baseURL = urlify(navItem.page);
        const headerLink = (
            <Link
                to={`/${baseURL}`}
                partiallyActive={true}
                activeClassName={'active'}
            >
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
                const sectionURL =
                    navItem.type === 'OnePageOnly'
                        ? `#${urlify(section)}`
                        : `/${urlify(section)}`;
                const fullURL = `${baseURL}${sectionURL}`;
                const activationCallback =
                    navItem.type === 'OnePageOnly'
                        ? ({ location }) =>
                              activeHash(sectionURL, location.hash)
                        : ({ location }) =>
                              activePath(`/${fullURL}`, location.pathname);
                return (
                    <div className={desktopDropdownLink} key={j}>
                        <Link
                            to={`/${baseURL}${sectionURL}`}
                            getProps={activationCallback}
                        >
                            {section}
                        </Link>
                    </div>
                );
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
            {navigation.map(makeLinkAndDropdown)}
        </nav>
    );
};

DesktopLinks.propTypes = {
    classes: PropTypes.object, // Styling classes
    navigation: PropTypes.array, // Site navigation configuration
};

export default DesktopLinks;
