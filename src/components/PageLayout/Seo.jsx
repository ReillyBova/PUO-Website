// Library imports
import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

// Search engine optimizer (SEO); fills out imporant <head> tags
const Seo = ({ title, description, lang, meta }) => {
    // Query meta tags from site configuration
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        siteUrl
                        description
                        author
                        socialMedia {
                            twitter
                        }
                        card {
                            image
                            width
                            height
                        }
                    }
                }
            }
        `
    );

    /* If title is given, sets title to "Title | siteMetadata.title"
     *  Otherwise, title is just set as "siteMetadata.title"
     */
    const metaTitle = title
        ? `${title} | ${site.siteMetadata.title}`
        : site.siteMetadata.title;
    // Defer to specified description over default
    const metaDescription = description || site.siteMetadata.description;

    return (
        <Helmet
            title={metaTitle}
            htmlAttributes={{ lang }}
            meta={[
                // General Header:
                {
                    name: `description`,
                    content: metaDescription,
                },
                // Facebook Headers:
                {
                    property: `og:title`,
                    content: metaTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:url`,
                    content: site.siteMetadata.siteUrl,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:image`,
                    content: site.siteMetadata.card.image,
                },
                {
                    property: `og:image:width`,
                    content: site.siteMetadata.card.width,
                },
                {
                    property: `og:image:height`,
                    content: site.siteMetadata.card.height,
                },
                // Twitter Headers:
                {
                    name: `twitter:card`,
                    content: `summary_large_image`,
                },
                {
                    name: `twitter:site`,
                    content: `@${site.siteMetadata.socialMedia.twitter}`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: metaTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:image`,
                    content: site.siteMetadata.card.image,
                },
                // Misc:
                {
                    name: `viewport`,
                    content: `minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no`,
                },
                {
                    name: `msapplication-TileColor`,
                    content: `#221e20`,
                },
            ].concat(meta)}
            link={[
                {
                    rel: `mask-icon`,
                    href: `/safari-pinned-tab.svg`,
                    color: `#f58025`,
                },
                {
                    rel: `canonical`,
                    href: `https://orchestra.princeton.edu`,
                },
            ]}
        />
    );
};

Seo.defaultProps = {
    title: ``,
    description: ``,
    lang: `en`,
    meta: [],
};

Seo.propTypes = {
    title: PropTypes.string, // Page title (prefix)
    description: PropTypes.string, // Description
    lang: PropTypes.string, // ISO Language Code
    meta: PropTypes.arrayOf(PropTypes.object), // Extra HTML metadata
};

export default Seo;
