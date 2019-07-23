// Library imports
import React from 'react';
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

function HomePage() {
    // CSS classes for styling
    const { homeSheet } = homepageStyles();
    return (
        <PageLayout>
            <Parallax>
                <WelcomeVideo />
                <WelcomeOverlay to={'/concerts'}>
                    {'Explore Our 2018 – 2019 Season'}
                </WelcomeOverlay>
            </Parallax>
            <Sheet className={homeSheet} maxWidth={1200}>
                <div
                    style={{height: 5000, backgroundColor: 'red' }}
                >
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

export default HomePage;
