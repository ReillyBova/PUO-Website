// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Custom styles for component
const sheetStyles = makeStyles((theme) => ({
    wrapper: {
        // Centering/positioning element
        position: 'relative',
        zIndex: 3,
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    },
    sheet: {
        // Bind width, add internal padding, and center
        maxWidth: ({ maxWidth }) => maxWidth,
        padding: theme.spacing(4),
        marginRight: 'auto',
        marginLeft: 'auto',

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2),
        },
    },
}));

// A container styled like a paper sheet
const Sheet = ({
    children,
    elevation = 24,
    component = 'section',
    maxWidth = '1200px',
    className = '',
}) => {
    // CSS classes for styling with prop
    const { wrapper, sheet } = sheetStyles({ maxWidth: maxWidth });
    return (
        <div className={`${wrapper} ${className}`}>
            <Paper
                className={sheet}
                elevation={elevation}
                component={component}
            >
                {children}
            </Paper>
        </div>
    );
};

Sheet.propTypes = {
    children: PropTypes.node, // Button text content
    elevation: PropTypes.number, // Element elevation (i.e. shadow depth). In range [0, 24)
    component: PropTypes.string, // HTML component to use for rendering
    maxWidth: PropTypes.string, // Maximum width of sheet (in pixels)
    className: PropTypes.string, // Extra styling classes for sheet
};

export default Sheet;
