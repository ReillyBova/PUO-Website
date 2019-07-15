// Library imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
// Local imports
import Seo from './Seo.jsx';

// Custom styles for component
const pageStyles = makeStyles(() => ({
    layout: {
        marginTop: 70,
    },
}));

// Wrap the Search Engine Optimization (SEO) around the site
const PageLayout = ({ title, description, lang, meta, children }) => {
    // CSS classes for styling
    const { layout } = pageStyles();
    return (
        <Fragment>
            <Seo
                title={title}
                description={description}
                lang={lang}
                meta={meta}
            />
            <div className={layout}> {children} </div>
        </Fragment>
    );
};

PageLayout.propTypes = {
    title: PropTypes.string, // Page title (prefix)
    description: PropTypes.string, // Description
    lang: PropTypes.string, // ISO Language Code
    meta: PropTypes.arrayOf(PropTypes.object), // Extra HTML metadata
    children: PropTypes.node, // The rest of the web-page
};

export default PageLayout;
