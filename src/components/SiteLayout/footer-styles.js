// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Styling for navbar elements
const footerStyles = makeStyles((theme) => ({
    // Wrapper around footer box
    footerWrapper: {
        // Allocate space in UI
        width: '100%',
        minHeight: 250,

        // Positioning
        position: 'relative',
        zIndex: 1,

        // Spacing
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
    // White-on-black divider
    dividerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    // Footer buttons; messy because text overrides Material UI
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

        // Coloring
        '& span': {
            transition: 'color 250ms',
        },
        '&:not(.active):not(:hover):not(.Mui-disabled) span': {
            color: 'white',
        },
        '&.Mui-disabled span': {
            color: 'rgba(255, 255, 255, 0.26)',
        },
    },
    // Icon footer buttons
    buttonIcon: {
        // Spacing
        '&:not(.circle)': {
            marginRight: theme.spacing(0.5),
        },

        // Sizing
        display: 'inline-block',
        fontSize: 20,
        width: '1em',
        height: '1em',
        flexShrink: 0,

        // Coloring
        fill: 'currentColor',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

        // Behavior
        userSelect: 'none',
    },
    // Links to pages throughout site; mocks <a> styling
    footerNavLink: {
        padding: theme.spacing(0.5),
        fontSize: '18px !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px !important',
            [theme.breakpoints.down('xs')]: {
                fontSize: '12px !important',
            },
        },

        // Coloring
        color: `${theme.palette.primary.main} !important`,
        '&:not(.active):not(:hover)': {
            color: 'white !important',
        },

        // Additional hover behaviors
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    },
    // Brand signatures at bottom of footer
    brandSignature: {
        // Spacing and sizing
        margin: theme.spacing(1),
        height: 50,
        [theme.breakpoints.down('sm')]: {
            height: 40,
        },
    },
    // Wrapper around the composed orchestra brand signature
    orchestraSignatureWrapper: {
        // Display
        display: 'inline-flex',
        alignItems: 'center',
    },
    // The logo in the orchestra brand signature
    orchestraSignatureLogo: {
        // Spacing and sizing
        marginRight: 8,
        width: 80,
        [theme.breakpoints.down('sm')]: {
            marginRight: 6,
            width: 64,
        },
    },
    // The text in the orchestra brand signature
    orchestraSignatureText: {
        // Sizing
        maxWidth: 150,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 120,
        },
    },
    // Copyright and privacy info at the bottom of the footer
    legalese: {
        // Text styling
        color: 'white',
        fontSize: 12,
        textAlign: 'right',

        // Spacing
        margin: theme.spacing(1),

        // Display
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',

        // Centering in small mode
        [theme.breakpoints.down('xs')]: {
            // Sizing
            width: '100%',

            // Text styling
            textAlign: 'center',

            // Alignment
            alignItems: 'center',
        },

        // Link styling overrides
        '& a:hover': {
            textDecoration: 'underline',
        },
        '& a:not(:hover)': {
            color: 'white !important',
        },
    },
}));

export default footerStyles;
