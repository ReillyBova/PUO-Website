// Library imports
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import clsx from 'clsx';
// UI imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
// Project imports
import { computeCurrentLocation } from 'utils';
// Local imports
import footerStyles from './footer-styles';
import {
    FooterNavigation,
    SocialMedia,
    SubsectionNavigation,
} from './subcomponents';
import {
    PrincetonSignature,
    MusicDepartmentSignature,
    TextLightLogo,
    SmallLightLogo,
} from 'branding';

// A Navbar that sits above the web-app
function Footer({ location }) {
    // Query navigation settings from site configuration
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteUrl
                        socialMedia {
                            facebook
                            twitter
                            instagram
                            youtube
                        }
                        relatedLinks {
                            department
                            university
                            copyright
                            privacy
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

    // Extract links from query
    const socialMedia = site.siteMetadata.socialMedia;
    const relatedLinks = site.siteMetadata.relatedLinks;

    // CSS classes for styling
    const classes = footerStyles();
    console.log(classes);
    const {
        footerWrapper,
        dividerStyle,
        button,
        buttonIcon,
        footerNavLink,
        brandSignature,
        orchestraSignatureWrapper,
        orchestraSignatureLogo,
        orchestraSignatureText,
        legalese,
    } = classes;

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
                        classes={{ button }}
                        currentLocation={currentLocation}
                    />
                )}
                <FooterNavigation
                    classes={{ footerNavLink }}
                    currentLocation={currentLocation}
                    siteSkeleton={siteSkeleton}
                />
                <Grid item xs={12}>
                    <Divider className={dividerStyle} />
                </Grid>
                <SocialMedia
                    classes={{ button, buttonIcon }}
                    mediaLinks={socialMedia}
                    relatedLinks={relatedLinks}
                />
                <Grid
                    container
                    item
                    justify={'space-around'}
                    alignItems={'center'}
                    lg={9}
                    md={8}
                    sm={6}
                    xs={12}
                >
                    <a
                        href={`https://www.${relatedLinks.university}`}
                        target={'_blank'}
                        rel="noopener noreferrer"
                    >
                        <img
                            src={PrincetonSignature}
                            className={brandSignature}
                        />
                    </a>
                    <a
                        href={`https://www.${relatedLinks.department}`}
                        target={'_blank'}
                        rel="noopener noreferrer"
                    >
                        <img
                            src={MusicDepartmentSignature}
                            className={brandSignature}
                        />
                    </a>
                    <a
                        href={site.siteMetadata.siteUrl}
                        target={'_blank'}
                        rel="me noopener noreferrer"
                    >
                        <div
                            className={clsx(
                                brandSignature,
                                orchestraSignatureWrapper
                            )}
                        >
                            <img
                                src={SmallLightLogo}
                                className={orchestraSignatureLogo}
                            />
                            <img
                                src={TextLightLogo}
                                className={orchestraSignatureText}
                            />
                        </div>
                    </a>
                </Grid>
                <Grid
                    container
                    item
                    justify={'flex-end'}
                    alignItems={'center'}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <div className={legalese}>
                        <div>{'The Princeton University Orchestra'}</div>
                        <div>
                            {'© 2020 The Trustees of Princeton University'}
                        </div>
                        <div>
                            <a
                                href={`https://www.${relatedLinks.copyright}`}
                                target={'_blank'}
                                rel="nofollow noopener noreferrer"
                            >
                                {'Copyright Infringement'}
                            </a>
                            {' | '}
                            <a
                                href={`https://www.${relatedLinks.privacy}`}
                                target={'_blank'}
                                rel="nofollow noopener noreferrer"
                            >
                                {'Privacy Notice'}
                            </a>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </footer>
    );
}

// No props!
Footer.propTypes = {};

export default Footer;
