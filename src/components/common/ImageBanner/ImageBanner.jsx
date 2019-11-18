// Library imports
import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Custom styles for component
const bannerStyles = makeStyles(() => ({
    wrapper: {
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'black',
        boxSizing: 'content-box',

        '& div': {
            position: 'static !important',
        },
    },
}));

// Welcoming and flashy video for homepage
function ImageBanner({ fluid }) {
    // CSS classes for styling
    const { wrapper } = bannerStyles();
    // Render
    return (
        <div className={wrapper}>
            <Image fluid={fluid} />
        </div>
    );
}

// Common query fragment for image bannners
export const imageBannerFragment = graphql`
    fragment ImageBannerFragment on File {
        name
        childImageSharp {
            fluid(quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
            }
        }
    }
`;

export default ImageBanner;
