// Library imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
// Project imports
import { Navbar, Footer } from 'components';

// A wrapper that allows the navbar and footer to persist above and below the
// page through navigation/routing changes
function SiteLayout({ children }) {
    // Render
    return (
        <Fragment>
            <Navbar />
            {children}
            <Location>
                {({ location }) => <Footer location={location} />}
            </Location>
        </Fragment>
    );
}

SiteLayout.propTypes = {
    children: PropTypes.node, // The rest of the web-page
};

export default SiteLayout;
