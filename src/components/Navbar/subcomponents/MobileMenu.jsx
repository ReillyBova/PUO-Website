// Library imports
import React, { useLayoutEffect } from 'react';
import { Link } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// Project imports
import { activeHash, activePath, urlify } from 'utils';
// Local imports
import { MobileDropdown } from './';

// A component that renders the mobile version of the navbar
const MobileMenu = ({
    classes,
    isMinified,
    isMobileMode,
    menuIsActive,
    setMenuState,
    navigation,
}) => {
    // Block scrolling behavior when menu is active
    useLayoutEffect(() => {
        // Block body element scrolling if menu is active
        if (isMobileMode && menuIsActive) {
            document.body.classList.add('mobile-menu');
        } else {
            document.body.classList.remove('mobile-menu');
            // Remove class property altogether if no more classes
            if (document.body.classList.length === 0) {
                document.body.removeAttribute('class');
            }
        }
    }, [isMobileMode, menuIsActive]);

    // Function for generating navbar elements from site navigation configuration
    const makeLinkAndDropdown = (navItem, i) => {
        // Make Header JSX
        const baseURL = navItem.specialLink
            ? navItem.link
            : urlify(navItem.page);
        const headerLink = (
            <Link
                to={`/${baseURL}`}
                key={i}
                partiallyActive={true}
                activeClassName={'active'}
                onClick={(event) => {
                    setMenuState(false);
                    event.stopPropagation();
                }}
            >
                <div className={mobileMenuLinkWrapper}>
                    <div className={navbarLink}>{navItem.page}</div>
                </div>
            </Link>
        );

        // Render behavior determined by if there is a dropdown
        if (!navItem.sections) {
            // Render with no dropdown
            return headerLink;
        } else {
            // Generate dropdown
            const listLinks = navItem.sections.map((section, j) => {
                const sectionURL = (navItem.type === "OnePageOnly")? (
                    `#${urlify(section)}`
                ) : (
                    `/${urlify(section)}`
                );
                const fullURL = `${baseURL}${sectionURL}`;
                const activationCallback = (navItem.type === "OnePageOnly")?
                    ({ location }) => activeHash(sectionURL, location.hash, mobileMenuDropdownLink)
                    : ({ location }) => activePath(`/${fullURL}`, location.pathname, mobileMenuDropdownLink);
                return (
                    <Link
                        to={`/${baseURL}${sectionURL}`}
                        key={j}
                        onClick={() => setMenuState(false)}
                        getProps={activationCallback}
                    >
                        <span>{'>'}</span>
                        <div>{section}</div>
                    </Link>
                );
            });
            // Return dropdown
            return (
                <MobileDropdown
                    key={i}
                    header={headerLink}
                    list={listLinks}
                    classes={classes}
                    baseURL={baseURL}
                    menuIsActive={menuIsActive}
                />
            );
        }
    };

    // CSS classes for styling
    const {
        mobileMenuWrapper,
        mobileMenu,
        mobileMenuLinkWrapper,
        mobileMenuDropdownLink,
        navbarLink,
    } = classes;
    // Animation duration
    const TIMEOUT = 500;
    // Render
    return (
        <div className={clsx(mobileMenuWrapper, isMinified ? 'mini' : 'full')}>
            <CSSTransition
                in={isMobileMode && menuIsActive}
                timeout={TIMEOUT}
                appear
                mountOnEnter
                unmountOnExit
            >
                <nav className={mobileMenu}>
                    {makeLinkAndDropdown(
                        { page: 'Home', specialLink: true, link: '' },
                        -1
                    )}
                    {navigation.map(makeLinkAndDropdown)}
                </nav>
            </CSSTransition>
        </div>
    );
};

MobileMenu.propTypes = {
    classes: PropTypes.object, // Styling classes
    isMinified: PropTypes.bool, // Menu compression state
    isMobileMode: PropTypes.bool, // Menu narrowness state
    menuIsActive: PropTypes.bool, // Mobile dropdown state
    setMenuState: PropTypes.func, // Toggle mobile dropdown state
    navigation: PropTypes.array, // Site navigation configuration
};

export default MobileMenu;
