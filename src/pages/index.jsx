// Library imports
import React from 'react';
import { graphql } from 'gatsby';
// UI imports
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import {
    PageLayout,
    Parallax,
    Sheet,
    WelcomeOverlay,
    WelcomeVideo,
} from 'components';

// Styling for homepage elements
const homepageStyles = makeStyles(() => ({
    // Shift sheet upwards to suggest scrolling
    homeSheet: {
        marginTop: -20,
    },
}));

function HomePage({data}) {
    // Preprocess season string (NB: this uses an en-dash, not a hyphen)
    const currentSeason = data.site.siteMetadata.currentSeason;
    const currentSeasonString = `${currentSeason - 1} – ${currentSeason}`;
    // CSS classes for styling
    const { homeSheet } = homepageStyles();
    return (
        <PageLayout>
            <Parallax>
                <WelcomeVideo />
                <WelcomeOverlay to={'/concerts'}>
                    {`Explore Our ${currentSeasonString} Season`}
                </WelcomeOverlay>
            </Parallax>
            <Sheet className={homeSheet}>
                <div style={{ height: 5000, backgroundColor: 'red' }}>
                    {`This is just me tesrting :)
                This is just me tesrting :)
                This is just me tesrting :)
                This is just me tesrting :)This is just me tesrting :)
                This is just me tesrting :)
                This is just me tesrting :)
                This is just me tesrting :)
                This is just me tesrting :)
                This is just me tesrting :)This is just me tesrting :)
                This is just me tesrting :)
                This is just me tesrting :)`}
                </div>
            </Sheet>
            <div style={{ margin: 50, height: 5000, backgroundColor: 'blue' }}>
                {`This is just me tesrting :)
            This is just me tesrting :)
            This is just me tesrting :)
            This is just me tesrting :)This is just me tesrting :)
            This is just me tesrting :)
            This is just me tesrting :)
            This is just me tesrting :)
            This is just me tesrting :)
            This is just me tesrting :)This is just me tesrting :)
            This is just me tesrting :)
            This is just me tesrting :)`}
            </div>
        </PageLayout>
    );
}

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                currentSeason
            }
        }
    }
`;

export default HomePage;
