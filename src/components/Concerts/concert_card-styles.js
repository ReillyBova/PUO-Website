// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Styling for concert card elements
const concertCardStyles = makeStyles((theme) => ({
    // Styling for background image
    backgroundImageStyle: {
        position: "unset !important",
    },
    backgroundImageWrapper: {
        // Covering
        objectFit: 'cover',
        objectPosition: 'center center',
        width: '100%',
        height: '100%',
        position: 'absolute !important',

        // Borders
        borderRadius: theme.shape.borderRadius,
    },
    // Styling for concert card paper element
    card: ({ isRTL }) => ({
        // Flexible display with overflow for hovering element
        display: 'flex',
        overflow: 'visible',

        // Enable internal element positioning
        position: 'relative',

        // Directional behavior
        marginLeft: isRTL ? 75 : 'unset',
        marginRight: !isRTL ? 75 : 'unset',

        '@media screen and (max-width: 959px)': {
            marginLeft: 'unset',
            marginRight: 'unset',
        },
    }),
    // Styling for floating concert name paper element
    concertNameCard: ({ isRTL }) => ({
        // Color
        color: 'white',
        background: theme.palette.primary.main,

        // Positioning
        alignItems: 'center',
        display: 'flex',
        zIndex: 4,
        position: 'relative',
        padding: theme.spacing(2),

        // Width
        width: '15vw',
        maxWidth: 200,

        // Height
        height: '15vw',
        minHeight: 150,
        maxHeight: 200,

        // Directional behavior
        margin: isRTL ? 'auto 0 auto -75px' : 'auto -75px auto 0',
    }),
    // Styling for details pane of concert card
    concertDetails: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        margin: '0 auto',
        // Remove margin on smaller screens
        '@media screen and (max-width: 700px)': {
            width: '100%',
            margin: 0,
        },
    },
    // Styling for text wrapping in details pane
    programContent: {
        flex: '1 0 auto',
    },
    // Styling for poster image
    posterStyle: ({ isRTL }) => ({
        // Covering
        objectFit: 'cover',
        objectPosition: 'center center',
        width: '35%',
        minWidth: 200,
        maxWidth: 300,

        // Positioning
        position: 'relative',
        zIndex: 3,

        // Directional behavior
        borderTopRightRadius: isRTL ? theme.shape.borderRadius : 0,
        borderBottomRightRadius: isRTL ? theme.shape.borderRadius : 0,
        borderTopLeftRadius: isRTL ? 0 : theme.shape.borderRadius,
        borderBottomLeftRadius: isRTL ? 0 : theme.shape.borderRadius,
    }),
    // Styling for button wrapper
    buttonWrapper: {
        flexWrap: 'wrap',
        '& button': {
            marginRight: theme.spacing(1),
        },
    },
    // Styling for icons in buttons
    buttonIcon: {
        marginRight: theme.spacing(0.5),
        fontSize: 20,
    },
    largeBreak: {
        height: theme.spacing(3),
    },
    // Styling for mobile version of concert name element
    mobileConcertName: {
        // Text
        color: 'white',
        '@media screen and (max-width: 700px)': {
            background: theme.palette.primary.main,
            textAlign: 'center',
            boxShadow: `0px 8px 12px -1px rgba(0,0,0,0.18),
                        0px 1px 6px -1px rgba(0,0,0,0.14),
                        0px 3px 8px -1px rgba(0,0,0,0.12),
                        0px -1px 3px -1px rgba(0,0,0,.16),
                        0px -3px 6px -1px rgba(0,0,0,0.12),
                        0px -6px 12px -1px rgba(0,0,0,0.08)`,
        },

        // Positioning
        position: 'relative',
        zIndex: 2,
        marginTop: theme.spacing(2),
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    // Styling for tablet version of concert name element
    mobileConcertNameRibbon: ({ isRTL }) => ({
        // Color
        background: theme.palette.primary.main,

        // Sizing (prevent the shadow overflow revealing the trick!)
        width: `calc(100% - ${theme.spacing(1)}px)`,

        // Positioning
        position: 'absolute',
        zIndex: 1,
        top: theme.spacing(2),
        left: isRTL ? 0 : 'unset',
        right: !isRTL ? 0 : 'unset',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        boxShadow: `0px 8px 12px -1px rgba(0,0,0,0.18),
                    0px 1px 6px -1px rgba(0,0,0,0.14),
                    0px 3px 8px -1px rgba(0,0,0,0.12),
                    0px -1px 3px -1px rgba(0,0,0,.16),
                    0px -3px 6px -1px rgba(0,0,0,0.12),
                    0px -6px 12px -1px rgba(0,0,0,0.08)`,
    }),
    // Wrapper for mobile concert cards
    mobileWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    smallBreak: {
        height: theme.spacing(1),
    },
}));

export default concertCardStyles;
