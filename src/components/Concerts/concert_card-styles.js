// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Styling for concert card elements
const concertCardStyles = makeStyles((theme) => ({
    // Styling for concert card paper element
    card: ({ isRTL }) => ({
        // Flexible display with overflow for hovering element
        display: 'flex',
        overflow: 'visible',

        // Directional behavior
        marginLeft: isRTL ? 75 : 'unset',
        marginRight: isRTL ? 'unset' : 75,
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
    smallBreak: {
        height: theme.spacing(1),
    },
}));

export default concertCardStyles;
