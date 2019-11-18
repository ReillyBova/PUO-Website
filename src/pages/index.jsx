// Library imports
import React from 'react';
import { graphql } from 'gatsby';
// Project imports
import {
    PageLayout,
    Parallax,
    Sheet,
    WelcomeOverlay,
    WelcomeVideo,
} from 'components';

function HomePage({ data }) {
    // Preprocess season string (NB: this uses an en-dash, not a hyphen)
    const currentSeason = data.site.siteMetadata.currentSeason;
    const currentSeasonString = `${currentSeason - 1} – ${currentSeason}`;

    // Render
    return (
        <PageLayout>
            <Parallax>
                <WelcomeVideo />
                <WelcomeOverlay to={'/concerts'}>
                    {`Explore Our ${currentSeasonString} Season`}
                </WelcomeOverlay>
            </Parallax>
            <Sheet hinting={'peek'}>
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
