// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Styling for navbar elements
const footerStyles = makeStyles((theme) => ({
    // Classes
    footerWrapper: {
        // Allocate space in UI
        width: '100%',
        height: 250,

        marginTop: `calc(4px - ${theme.spacing(8)}px)`,
        paddingTop: theme.spacing(9),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginTop: `calc(4px - ${theme.spacing(6)}px)`,
            paddingTop: theme.spacing(7),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        // Color background
        backgroundColor: theme.palette.secondary.main,
        borderTop: `4px solid ${theme.palette.primary.main}`,
    },
    dividerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    // Custom styling for button; messy because overrides Material UI
    button: {
        // Text default properties
        fontFamily: 'Roboto, Open Sans, Roboto, Helvetica, Arial, sans-serif',
        fontSize: '18px !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px !important',
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px !important',
            },
        },
        // Ensure all interactive content is the link
        padding: '0 !important',
        // Style link element
        '& a': {
            padding: `${theme.spacing(0.75)}px ${theme.spacing(1)}px`,
            transition: 'color 250ms',
        },
        '&:not(:hover) a': {
            color: 'white',
        },
    },
    navbarMain: {
        // Basic styling parameters
        height: 120,
        fontSize: 24,
        lineHeight: '24px',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Helvetica, Arial, sans-serif',
        // To make text look more bold
        '-webkit-font-smoothing': 'subpixel-antialiased',

        // Smooth transition of the above when changing between full and mini
        transition: 'height 0.5s ease, font-size 0.5s ease',

        // Media queries for default navbar
        '&.full': {
            '@media screen and (min-width: 1521px)': {
                '& $brandOrch': { width: 300 },
                '& $brandText.inline': {
                    width: 335,
                    animationName: '$fadeDownInline',
                },
                '& $brandText.below': {
                    display: 'none',
                    animation: 'none',
                },
            },
            '@media screen and (min-width: 1025px) and (max-width: 1520px)': {
                '& $brand': { display: 'block', maxWidth: 225 },
                '& $brandOrch': { width: 225, paddingBottom: 0 },
                '& $brandText.inline': {
                    display: 'none',
                    animation: 'none',
                },
                '& $brandText.below': {
                    width: 225,
                    animationName: '$fadeDownBelow',
                },
            },
            '@media screen and (min-width: 701px) and (max-width: 1024px)': {
                '& $brand': { display: 'block', maxWidth: 190 },
                '& $brandOrch': { width: 190, paddingBottom: 0 },
                '& $brandText.inline': {
                    display: 'none',
                    animation: 'none',
                },
                '& $brandText.below': {
                    width: 190,
                    animationName: '$fadeDownBelow',
                },
            },
            '@media screen and (min-width: 536px) and (max-width: 700px)': {
                '& $brandOrch': { width: 190, padding: '18px 16px' },
                '& $brandText.inline': {
                    width: 220,
                    padding: 0,
                    animationName: '$fadeDownInline',
                },
                '& $brandText.below': {
                    display: 'none',
                    animation: 'none',
                },
            },
            '@media screen and (min-width: 421px) and (max-width: 535px)': {
                '& $brandOrch': { width: 150, padding: '27px 16px' },
                '& $brandText.inline': {
                    width: 150,
                    padding: 0,
                    animationName: '$fadeDownInline',
                },
                '& $brandText.below': {
                    display: 'none',
                    animation: 'none',
                },
            },
            '@media screen and (max-width: 420px)': {
                '& $brand': {
                    display: 'block',
                    maxWidth: 125,
                    lineHeight: 0,
                },
                '& $brandOrch': {
                    width: 125,
                    padding: '15px 0 4px 16px',
                },
                '& $brandText.inline': {
                    display: 'none',
                    animation: 'none',
                },
                '& $brandText.below': {
                    width: 125,
                    animationName: '$fadeDownBelow',
                },
            },
        },
        // Media queries for mini (compressed) navbar
        '&.mini': {
            fontSize: 18,
            lineHeight: '18px',
            height: 70,

            // Mini scaling for dropdown elements
            '& $desktopDropdownLink': {
                fontSize: 14,
                '& a': { padding: 14 },
            },

            '@media screen and (min-width: 1251px)': {
                '& $brandOrch': { width: 225 },
                '& $brandText.inline': {
                    width: 250,
                    padding: '16px 0px',
                    animationName: '$fadeDownInline',
                },
                '& $brandText.below': {
                    display: 'none',
                    animation: 'none',
                },
            },
            '@media screen and (min-width: 1101px) and (max-width: 1250px)': {
                '& $brandOrch': { width: 150 },
                '& $brandText.inline': {
                    width: 215,
                    padding: '16px 0px',
                    animationName: '$fadeDownInline',
                },
                '& $brandText.below': {
                    display: 'none',
                    animation: 'none',
                },
            },
            '@media screen and (min-width: 1016px) and (max-width: 1100px)': {
                '& $brand': { display: 'block', maxWidth: 150 },
                '& $brandOrch': { width: 150, paddingBottom: 0 },
                '& $brandText.inline': {
                    display: 'none',
                    animation: 'none',
                },
                '& $brandText.below': {
                    width: 150,
                    animationName: '$fadeDownBelow',
                },
            },
            '@media screen and (min-width: 701px) and (max-width: 1015px)': {
                '& $brand': { display: 'block', maxWidth: 120 },
                '& $brandOrch': { width: 120, paddingBottom: 0 },
                '& $brandText.inline': {
                    display: 'none',
                    animation: 'none',
                },
                '& $brandText.below': {
                    width: 120,
                    animationName: '$fadeDownBelow',
                },
            },
            '@media screen and (min-width: 600px) and (max-width: 700px)': {
                '& $brandOrch': { width: 152 },
                '& $brandText.inline': {
                    width: 175,
                    padding: 0,
                    animationName: '$fadeDownInline',
                },
                '& $brandText.below': {
                    display: 'none',
                    animation: 'none',
                },
            },
            '@media screen and (min-width: 361px) and (max-width: 599px)': {
                '& $brandOrch': { width: 120, padding: '8px 12px 0 8px' },
                '& $brandText.inline': {
                    width: 138,
                    padding: '10px 0 0 0',
                    animationName: '$fadeDownInline',
                },
                '& $brandText.below': {
                    display: 'none',
                    animation: 'none',
                },
            },
            '@media screen and (max-width: 360px)': {
                '& $brand': {
                    display: 'block',
                    maxWidth: 80,
                    lineHeight: 0,
                },
                '& $brandOrch': { width: 80, padding: '7.5px 0 3px 8px' },
                '& $brandText.inline': {
                    display: 'none',
                    animation: 'none',
                },
                '& $brandText.below': {
                    width: 80,
                    padding: '0 8px',
                    animationName: '$fadeDownBelow',
                },
            },
        },
    },
    navbarTriangle: {
        // Properties for SVG triangle "curtain" elements below navbar
        width: '100%',
        height: 80,
        position: 'absolute',
        pointerEvents: 'none',
        marginTop: '-2px',
        zIndex: theme.zIndex.appBar - 2,
        '&.orange': {
            color: theme.palette.background.paper,
            '& line': {
                stroke: theme.palette.primary.main,
            },
        },
        '&.black': {
            color: theme.palette.secondary.main,
        },
    },
    brand: {
        // Basic properties
        position: 'absolute',
        fontSize: 24,
        lineHeight: '1.15',
        zIndex: theme.zIndex.appBar - 1,

        // Alignment
        display: 'flex',
        alignItems: 'center',

        // Hide for ultra narrow screens
        '@media screen and (max-width: 215px)': {
            // Need !important to override media query in navbarHeader
            display: 'none !important',
        },
    },
    brandOrch: {
        // Properties for orchestra logo
        padding: 16,
        transition: 'width 0.5s ease, padding 0.5s ease',
        animation: '$fadein 1s',
        boxSizing: 'content-box',
    },
    brandText: {
        // Properties for text part of logo
        boxSizing: 'content-box',
        '&.inline': {
            padding: 16,
            animationName: '$fadeDownInline',
        },
        '&.below': {
            padding: '0 16px',
            animationName: '$fadeDownBelow',
        },
        // Smooth transitions
        transition: 'width 0.5s ease, padding 0.5s ease',
        // Animation properties
        animationIterationCount: 1,
        animationDuration: '2s',
        animationTimingFunction: 'ease',
        animationFillMode: 'both',
    },
    desktopLinks: {
        // Wrapper for desktop links
        padding: '0 16px 0 24px',
        marginLeft: 225,
        height: '100%',
        justifyContent: 'flex-end',
        flexFlow: 'row wrap',
        alignItems: 'center',
        display: 'flex',
        alignContent: 'center',

        '@media screen and (max-width: 700px)': {
            display: 'none',
        },
    },
    desktopDropdownLink: {
        fontSize: 18,
        width: '100%',
        transition: 'font-size 0.5s ease',

        '& a': {
            color: theme.palette.secondary.main,
            display: 'block',
            padding: 18,
            transition: 'padding 0.5s ease, color 0.2s ease',
        },
        '& a.active': {
            color: theme.palette.primary.main,
        },
    },
    hamburgerWrapper: {
        // A div element to wrap hamburger
        paddingRight: 16,
        float: 'right',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '@media screen and (min-width: 701px)': {
            display: 'none !important',
        },
    },
    hamburger: {
        // Button properties
        width: 64,
        height: 64,
        cursor: 'pointer',

        // SVG animation
        animation: '$fadein 1s',
        '& svg': {
            width: 32,
            height: 32,
            stroke: theme.palette.secondary.main,
            '&:hover': { stroke: theme.palette.primary.main },
        },
        '& path': {
            transition: 'all 0.5s ease',
            transform: 'rotate(0)',
        },
        '& #menuButtonL0': {
            transformOrigin: 'bottom left',
        },
        '& #menuButtonL1': {
            transformOrigin: 'bottom right',
        },
        '& #menuButtonL2': {
            transformOrigin: 'center',
        },
        '& #menuButtonL3': {
            transformOrigin: 'top left',
        },
        '& #menuButtonL4': {
            transformOrigin: 'top right',
        },
        '&.active': {
            '& svg': {
                stroke: `${theme.palette.primary.main} !important`,
            },
            '& #menuButtonL0': {
                transform: 'translateY(2.1px) rotate(-45deg)',
            },
            '& #menuButtonL1': {
                transform: 'translateY(12.3px) rotate(45deg)',
            },
            '& #menuButtonL2': {
                transform: 'rotate(-45deg)',
            },
            '& #menuButtonL3': {
                transform: 'translateY(-12.3px) rotate(45deg)',
            },
            '& #menuButtonL4': {
                transform: 'translateY(-2.1px) rotate(-45deg)',
            },
        },
    },
    mobileDropdown: {
        margin: '0 !important',
        backgroundColor: 'unset !important',
        boxShadow: 'none !important',

        '&::before': {
            content: 'none !important',
        },

        '&>div:first-of-type': {
            minHeight: '0 !important',
            padding: '0 !important',
            '&>div:first-of-type': {
                margin: '0 !important',
                '& a': {
                    padding: '0 !important',
                    width: 'fit-content',
                },
            },
            '&>div:last-of-type': {
                margin: '3px !important',
                padding: 4,
                '&:hover': {
                    color: theme.palette.primary.main,
                    '& span': {
                        '& svg': {
                            color: `${theme.palette.primary.main} !important`,
                        },
                    },
                },
            },
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        '&>div:last-of-type': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    mobileDropdownChevron: {
        color: 'white',
        fontSize: '22px !important',
        width: '22px !important',
        height: '22px !important',
        '&.hover': {
            color: theme.palette.primary.main,
        },
    },
    mobileDropdownDetails: {
        display: 'block !important',
        padding: '0 0 8px 0 !important',
    },
    mobileDropdownHoverCapture: {
        width: '100%',
    },
    mobileMenuWrapper: {
        '&.full nav': {
            marginTop: 120,
            height: 'calc(100vh - 120px)',
        },
        '&.mini nav': {
            marginTop: 70,
            height: 'calc(100vh - 70px)',
        },
    },
    mobileMenu: {
        // Basic formatting for mobile dropdown element
        backgroundColor: theme.palette.secondary.main,
        width: '100%',
        position: 'fixed',
        overflowY: 'auto',
        // CSS approximation of jQuery's slideToggle()
        '&.appear:not(.appear-active)': {
            height: '0 !important',
            padding: '0 !important',
        },
        '&.enter:not(.enter-active)': {
            height: '0 !important',
            padding: '0 !important',
        },
        '&.appear-active': {
            transition: `height .5s ease-in-out, margin .5s ease, padding-top .5s ease-in-out`,
        },
        '&.enter-active': {
            transition: `height .5s ease-in-out, margin .5s ease, padding-top .5s ease-in-out`,
        },
        '&.exit-active': {
            transition: `height .5s ease-in-out, margin .5s ease, padding-top .5s ease-in-out`,
            height: '0 !important',
            padding: '0 !important',
        },
        '&.exit-done': {
            display: `none`,
            height: '0 !important',
            padding: '0 !important',
        },

        padding: '12px 0',
        transition: `margin .5s ease`,
        '@media screen and (min-width: 600px) and (max-width: 700px)': {
            paddingTop: 60,
        },
        '@media screen and (min-width: 701px)': {
            display: 'none !important',
        },

        // Add padding to last element
        '&>div:last-child>div:last-child': {
            marginBottom: 128,
        },
        '&>a:last-child>div:last-child': {
            marginBottom: 128,
        },
    },
    mobileMenuLinkWrapper: {
        height: 36,
        display: 'flex',
        alignItems: 'center',

        '& div': {
            transition: 'border-bottom, color, .2s !important',
            color: theme.palette.background.paper,
        },
        '&:hover': {
            '& div': {
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
            },
        },
    },
    mobileMenuDropdownLink: {
        fontSize: 18,
        width: '100%',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',

        '& span': {
            color: 'transparent',
            transition: 'color .2s',
        },

        '&:hover': {
            '& span': {
                color: theme.palette.secondary.main,
            },
        },
        '& div': {
            color: theme.palette.background.paper,
            transition: 'color .2s',
            flexGrow: 1,
            padding: 6,
            '&:hover': {
                color: theme.palette.secondary.main,
            },
        },
        '&.active div': {
            color: theme.palette.secondary.main,
        },
    },
    navbarLink: {
        margin: '4px 12px',
        cursor: 'pointer',

        // Smooth href color transitions
        borderBottom: '0px solid transparent',
        transition: 'border-bottom .2s',
        '& a': {
            color: theme.palette.secondary.main,
            transition: 'color .2s',
        },
        '&:hover a, & a.active': {
            color: theme.palette.primary.main,
        },

        // Fade in
        animation: '$fadein 1s',

        // Orange underline
        '&::after': {
            height: 2,
            content: '""',
            display: 'block',
            width: 0,
            background: theme.palette.primary.main,
            // Left to right motion transition
            transition: 'width .2s ease 0s',
        },

        '@media screen and (min-width: 769px)': {
            '&:hover::after': {
                // Left to right motion
                width: '100%',
            },
        },
        '@media screen and (max-width: 769px)': {
            // Underline alternative for mobile screens
            borderBottom: '1px solid transparent',
            borderTop: '1px solid transparent',
            '&:hover': {
                borderBottom: `1px solid ${theme.palette.primary.main}`,
            },
        },
        '@media screen and (max-width: 700px)': {
            // Mobile styling
            fontSize: 24,
            width: 'fit-content',
            lineHeight: '24px',
            margin: '0 0 0 16px',
        },
    },
}));

export default footerStyles;
