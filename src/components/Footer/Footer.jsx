// Library imports
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
// UI imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
// Project imports
import { computeCurrentLocation } from 'utils';
// Local imports
import footerStyles from './footer-styles';
import { FooterNavigation, SocialMedia, SubsectionNavigation } from './subcomponents';

// A Navbar that sits above the web-app
function Footer({ location }) {
    // Query navigation settings from site configuration
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        socialMedia {
                            facebook
                            twitter
                            instagram
                            youtube
                        }
                        relatedLinks {
                            department
                            university
                        }
                        navigation {
                            page
                            type
                            sections
                        }
                    }
                }
            }
        `
    );

    // Identify this page and extract its subsections
    const siteSkeleton = site.siteMetadata.navigation;
    const currentLocation = computeCurrentLocation(location, siteSkeleton);
    const { subSections } = currentLocation;

    // CSS classes for styling
    const classes = footerStyles();
    const { dividerStyle, footerWrapper, footerNavLink, button, buttonIcon } = classes;

    // Render
    return (
        <footer className={footerWrapper}>
            <Grid
                container
                justify={'space-between'}
                alignItems={'center'}
                spacing={2}
            >
                {subSections.length > 0 && (
                    <SubsectionNavigation
                        classes={{button}}
                        currentLocation={currentLocation}
                    />
                )}
                <FooterNavigation
                    classes={{footerNavLink}} currentLocation={currentLocation} siteSkeleton={siteSkeleton}
                />
                <Grid item xs={12}>
                    <Divider className={dividerStyle} />
                </Grid>
                <SocialMedia
                    classes={{button, buttonIcon}}
                    mediaLinks={site.siteMetadata.socialMedia}
                    relatedLinks={site.siteMetadata.relatedLinks}
                />
            </Grid>
        </footer>
    );
}

// No props!
Footer.propTypes = {};

export default Footer;
