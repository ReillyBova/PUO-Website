// Library imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// Project imports
import { Navbar, Footer } from 'components';
// Local imports
import navbarStyles from './navbar-styles';
import footerStyles from './footer-styles';

/*
 * A wrapper that allows the navbar and footer to persist above and below the
 * page through navigation/routing changes.
 */
function SiteLayout({ children }) {
    /*
     * Issue with ServerStyleSheets, SSR, and hydration causes class conflicts.
     * Thus, need to evaluate top level styles before the rest of the app.
     */
    const navbarClasses = navbarStyles();
    const footerClasses = footerStyles();

    // Render
    return (
        <Fragment>
            <Navbar classes={navbarClasses} />
            {children}
            <Footer classes={footerClasses} />
        </Fragment>
    );
}

SiteLayout.propTypes = {
    children: PropTypes.node, // The rest of the web-page
};

export default SiteLayout;
