// Library imports
import React from 'react';
import { Link } from 'gatsby';
// UI imports
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
// Project imports
import { smoothScroll } from 'utils';
// Local imports
import footerStyles from './footer-styles';

// A Navbar that sits above the web-app
function Footer() {
    // CSS classes for styling
    const classes = footerStyles();
    const { dividerStyle, footerWrapper, button } = classes;

    // Render
    return (
        <footer className={footerWrapper}>
            <Grid
                container
                justify={'space-between'}
                alignItems={'center'}
                spacing={2}
            >
                <Grid
                    container
                    item
                    xs={12}
                    justify={'space-evenly'}
                    alignItems={'center'}
                >
                    <Grid item>
                        <Button
                            className={button}
                            disableGutters
                            color="primary"
                            onClick={() => smoothScroll(0, 1000)}
                        >
                            <a> Past Seasons </a>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className={button}
                            disableGutters
                            color="primary"
                        >
                            <Link to={`/concerts`}>Past Tours</Link>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className={button}
                            disableGutters
                            color="primary"
                        >
                            <Link to={`/concerts`}>Past Orchestras</Link>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider className={dividerStyle} />
                </Grid>
            </Grid>
        </footer>
    );
}

// No props!
Footer.propTypes = {};

export default Footer;
