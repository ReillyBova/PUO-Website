// Library imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// UI imports
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from 'mdi-material-ui/FacebookBox';
import YouTubeIcon from 'mdi-material-ui/Youtube';
import SpotifyIcon from 'mdi-material-ui/Spotify';
import InstagramIcon from 'mdi-material-ui/Instagram';
import TwitterIcon from 'mdi-material-ui/Twitter';
// Project imports
import { PrincetonShieldIcon, MusicDepartmentIcon } from 'icons';

// Links to sites related to the orchestra
function SocialMedia({ classes, mediaLinks, relatedLinks }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    // CSS classes for styling
    const { button, buttonIcon } = classes;

    // Create links
    const facebookLink = mediaLinks.facebook
        && `https://www.facebook.com/${mediaLinks.facebook}`;
    const youtubeLink = mediaLinks.youtube
        && `https://www.youtube.com/c/${mediaLinks.youtube}`;
    const spotifyLink = mediaLinks.spotify
        && `https://open.spotify.com/artist/${mediaLinks.spotify}`;
    const instagramLink = mediaLinks.instagram
        && `https://www.instagram.com/${mediaLinks.instagram}`;
    const twitterLink = mediaLinks.twitter
        && `https://twitter.com/${mediaLinks.twitter}`;
    const departmentLink = relatedLinks.department
        && `https://${relatedLinks.department}`;
    const universityLink = relatedLinks.university
        && `https://${relatedLinks.university}`;

    // Links route to different page
    return (
        <Grid
            container
            item
            xs={12}
            justify={'space-evenly'}
            alignItems={'center'}
        >
        {matches ?
            <Fragment>
            <Button
                className={button}
                color="primary"
                disabled={!facebookLink}
                href={facebookLink}
                target={'_blank'}
                aria-label={'Facebook'}
                nofollow={''}
            >
                <FacebookIcon className={buttonIcon} />
                {'Facebook'}
            </Button>
            <Button
                className={button}
                color="primary"
                disabled={!youtubeLink}
                href={youtubeLink}
                target={'_blank'}
                aria-label={'YouTube'}
                nofollow={''}
            >
                <YouTubeIcon className={buttonIcon} />
                {'YouTube'}
            </Button>
            <Button
                className={button}
                color="primary"
                disabled={!spotifyLink}
                href={spotifyLink}
                target={'_blank'}
                aria-label={'Spotify'}
                nofollow={''}
            >
                <SpotifyIcon className={buttonIcon} />
                {'Spotify'}
            </Button>
            <Button
                className={button}
                color="primary"
                disabled={!instagramLink}
                href={instagramLink}
                target={'_blank'}
                aria-label={'Instagram'}
                nofollow={''}
            >
                <InstagramIcon className={buttonIcon} />
                {'Instagram'}
            </Button>
            <Button
                className={button}
                color="primary"
                disabled={!twitterLink}
                href={twitterLink}
                target={'_blank'}
                aria-label={'Twitter'}
                nofollow={''}
            >
                <TwitterIcon className={buttonIcon} />
                {'Twitter'}
            </Button>
            </Fragment>
        :
        <Fragment>
            <IconButton
                className={button}
                color="primary"
                disabled={!facebookLink}
                href={facebookLink}
                target={'_blank'}
                aria-label={'Facebook'}
                nofollow={''}
            >
                <FacebookIcon className={clsx(buttonIcon, 'circle')} />
            </IconButton>
            <IconButton
                className={button}
                color="primary"
                disabled={!youtubeLink}
                href={youtubeLink}
                target={'_blank'}
                aria-label={'YouTube'}
                nofollow={''}
            >
                <YouTubeIcon className={clsx(buttonIcon, 'circle')} />
            </IconButton>
            <IconButton
                className={button}
                color="primary"
                disabled={!spotifyLink}
                href={spotifyLink}
                target={'_blank'}
                aria-label={'Spotify'}
                nofollow={''}
            >
                <SpotifyIcon className={clsx(buttonIcon, 'circle')} />
            </IconButton>
            <IconButton
                className={button}
                color="primary"
                disabled={!instagramLink}
                href={instagramLink}
                target={'_blank'}
                aria-label={'Instagram'}
                nofollow={''}
            >
                <InstagramIcon className={clsx(buttonIcon, 'circle')} />
            </IconButton>
            <IconButton
                className={button}
                color="primary"
                disabled={!twitterLink}
                href={twitterLink}
                target={'_blank'}
                aria-label={'Twitter'}
                nofollow={''}
            >
                <TwitterIcon className={clsx(buttonIcon, 'circle')} />
            </IconButton>
            </Fragment>
        }
            <Button
                className={button}
                color="primary"
                disabled={!departmentLink}
                href={departmentLink}
                target={'_blank'}
                aria-label={'Music Departent'}
                nofollow={''}
            >
                <MusicDepartmentIcon
                    className={buttonIcon}
                    viewBox={"-15 -15 130 130"}
                />
                {'Music Dept'}
            </Button>
            <Button
                className={button}
                color="primary"
                disabled={!universityLink}
                href={universityLink}
                target={'_blank'}
                aria-label={'Princeton University'}
                nofollow={''}
            >
                <PrincetonShieldIcon
                    className={buttonIcon}
                    viewBox={"-2 -2 15 18"}
                />
                {'Princeton'}
            </Button>
        </Grid>
    );
}

// Proptypes
SocialMedia.propTypes = {
    classes: PropTypes.object, // Styling classes
    mediaLinks: PropTypes.object, // Links to major social media sites
    relatedLinks: PropTypes.object, // Links to related sites
};

export default SocialMedia;
