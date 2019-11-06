// Library imports
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// UI imports
import { ThemeProvider } from '@material-ui/styles';
// Project imports
import { recolorMuiTheme } from 'utils';

/*
 * An efficient Theme Provider that overwrites the current theme with a different
 * primary color
 */
const Retheme = ({ children, newColor }) => {
    const newTheme = useCallback((theme) => recolorMuiTheme(theme, newColor), [
        newColor,
    ]);

    return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>;
};

Retheme.propTypes = {
    children: PropTypes.node, // Child React components
    newColor: PropTypes.string, // New color hex
};

export default Retheme;
