// Library imports
import React from 'react';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Styling to override font
const subheaderStyles = makeStyles((theme) => ({
    subheader: {
        position: 'relative',
        zIndex: 4,
        width: 'fit-content',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
        marginLeft: -theme.spacing(6),
        background: theme.palette.primary.main,
        color: 'white',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
            marginBottom: theme.spacing(2),
            marginLeft: -theme.spacing(3),
        },
    },
}));

// Gatsby Link wrapped in a material UI Button
function Subheader({ children }) {
    // CSS classes
    const { subheader } = subheaderStyles();

    // Render
    return (
        <Paper elevation={4} className={subheader}>
            <Typography variant='h3'>{children}</Typography>
        </Paper>
    );
}

export default Subheader;
