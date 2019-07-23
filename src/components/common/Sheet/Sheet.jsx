// Library imports
import React from 'react';
import PropTypes from 'prop-types';
// UI imports
import { makeStyles } from '@material-ui/core/styles';

// Custom styles for component
const sheetStyles = makeStyles((theme) => ({
    wrapper: {
        // Centering/positioning element
        position: 'relative',
        zIndex: 3,
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4),
        '@media screen and (max-width: 768px)': {
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    },
    sheet: {
        // Material surface element
        background: theme.palette.background.paper,
        maxWidth: ({maxWidth}) => maxWidth,
        padding: theme.spacing(4),
        marginRight: 'auto',
        marginLeft: 'auto',
        overflow: 'hidden',
        overflowWrap: 'break-word',

        borderRadius: theme.shape.borderRadius,
        boxShadow: ({ depth }) => theme.shadows[depth],

        '@media screen and (max-width: 768px)': {
            padding: theme.spacing(2),
        },
    },
}));

// A container styled like a paper sheet
const Sheet = ({ children, depth=24, maxWidth='1200px', className='' }) => {
    // Bound depth to range [0, 25)
    let filteredDepth = depth;
    if (filteredDepth > 24) {
        filteredDepth = 24;
    } else if (filteredDepth < 0) {
        filteredDepth = 0;
    }
    // CSS classes for styling with prop
    const { wrapper, sheet } = sheetStyles({ depth: filteredDepth, maxWidth: maxWidth });
    return (
        <div className={`${wrapper} ${className}`}>
            <div className={sheet}>{children}</div>
        </div>
    );
};

Sheet.propTypes = {
    children: PropTypes.node, // Button text content
    depth: PropTypes.number, // Shadow depth. In range [0, 24)
    maxWidth: PropTypes.string, // Maximum width of sheet (in pixels)
    className: PropTypes.string, // Extra styling classes for sheet
};

export default Sheet;
