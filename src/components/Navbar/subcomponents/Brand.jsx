// Library imports
import React from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
// Project imports
import { LargeDarkLogo, MaterialDarkLogo, TextDarkLogo } from 'branding';

// A component that renders PUO logo and text for the navbar
const Brand = ({ classes, setMenuState, isMobileMode }) => {
    // CSS classes for styling
    const { brand, brandOrch, brandText } = classes;

    // Alt text for images
    const alt_brand = 'The Princeton University Orchestra';
    // Render
    return (
        <Link to="/" className={brand} onClick={() => setMenuState(false)}>
            <img
                className={brandOrch}
                src={isMobileMode ? MaterialDarkLogo : LargeDarkLogo}
                alt={alt_brand}
            />
            <img
                className={clsx(brandText, 'below')}
                src={TextDarkLogo}
                alt={alt_brand}
            />
            <img
                className={clsx(brandText, 'inline')}
                src={TextDarkLogo}
                alt={alt_brand}
            />
        </Link>
    );
};

Brand.propTypes = {
    classes: PropTypes.object, // CSS classes
    setMenuState: PropTypes.func, // Hook for setting menu state
    isMobileMode: PropTypes.bool, // Screen size status
};

export default Brand;
