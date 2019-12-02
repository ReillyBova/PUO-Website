// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Styling for navbar elements
const footerStyles = makeStyles((theme) => ({
    // Classes
    footerWrapper: {
        // Allocate space in UI
        width: '100%',
        height: 250,

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

        // Coloring
        '& span': {
            transition: 'color 250ms',
        },
        '&:not(.active):not(:hover) span': {
            color: 'white',
        },
    },
}));

export default footerStyles;
