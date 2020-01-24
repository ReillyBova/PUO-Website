// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import Button from '@material-ui/core/Button';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import { DelayedLink } from 'components';

// Custom styles for component
const buttonStyles = makeStyles((theme) => ({
    // Animation for SVG arrow
    '@keyframes bounce': {
        '0%, 100%': {
            transform: 'translateX(0)',
        },
        '56%': {
            transform: 'translateX(4px)',
        },
    },
    // Traditional opacity fade-in animation
    '@keyframes fadein': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    // Animation for ripple override
    '@keyframes pressDown': {
        '0%': {
            opacity: 0.75,
            transform: 'scale(0)',
        },
        '100%': {
            opacity: 1,
            transform: 'scale(1)',
        },
    },
    // SVG arrow
    arrow: {
        // Put distance between arrow and button text
        marginLeft: 8,
    },
    // Custom styling for button; messy because overrides Material UI
    button: {
        // Text default properties
        fontFamily: 'Roboto, Open Sans, Roboto, Helvetica, Arial, sans-serif',
        fontSize: '18px !important',
        '@media screen and (max-width: 400px)': {
            fontSize: '15px !important',
            '@media screen and (max-width: 350px)': {
                fontSize: '12px !important',
            },
        },
        // Button default properties
        borderRadius: '2px !important',
        border: '2px solid white !important',
        animation: '$fadein  1.2s',
        animationTimingFunction: 'ease',
        animationDelay: '.5s',
        animationFillMode: 'both',
        color: `${theme.palette.secondary.main} !important`,
        // Slightly opaque by default
        backgroundColor: 'rgba(0, 0, 0, 0.2) !important',
        // Orange on hover
        '&:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            border: `2px solid ${theme.palette.primary.main} !important`,
        },
        // Further text properties
        '&>span:first-of-type': {
            color: 'white !important',
            position: 'relative',
            zIndex: 1,
        },
        // Bouncing arrow animation on hover
        '&:hover svg': {
            animation: '$bounce 1s infinite',
        },
        // Ripple animation overrides
        '&>span:last-of-type': {
            borderRadius: '0 !important',

            '& span': {
                opacity: '1 !important',
                animation:
                    '$pressDown 550ms cubic-bezier(0.4, 0, 0.2, 1) !important',
            },
        },
        // Margins to match sheets
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    },
}));

// Custom button for welcome screen
const WelcomeButton = ({ children, to }) => {
    // CSS classes for styling
    const { arrow, button } = buttonStyles();
    // Render
    return (
        <DelayedLink delay={500} to={to}>
            <Button
                className={button}
                variant='outlined'
                color='primary'
                aria-label='Current Season'
            >
                {children}
                <ArrowRightAlt className={arrow} />
            </Button>
        </DelayedLink>
    );
};

DelayedLink.propTypes = {
    children: PropTypes.node, // Button text content
    to: PropTypes.string, // Button target link
};

export default WelcomeButton;
