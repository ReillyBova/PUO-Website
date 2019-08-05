// UI imports
import { createMuiTheme } from '@material-ui/core/styles';

// Generate a new theme from an existing one with different colors
export const recolorMuiTheme = (
    oldTheme,
    primaryColor = '',
    secondaryColor = ''
) => {
    // Default to existing color scheme
    let primaryMain = primaryColor;
    let secondaryMain = secondaryColor;
    if (!primaryMain) {
        primaryMain = oldTheme.palette.primary.main;
    }
    if (!secondaryMain) {
        secondaryMain = oldTheme.palette.secondary.main;
    }

    const newTheme = {
        ...oldTheme,
        palette: {
            ...oldTheme.palette,
            primary: {
                main: primaryMain,
            },
            secondary: {
                main: secondaryMain,
            },
        },
    };

    return createMuiTheme(newTheme);
};
