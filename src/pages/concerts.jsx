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
const concertStyles = makeStyles(() => ({
    // Shift sheet upwards to suggest scrolling
    concertSheet: {
        marginTop: -20,
    },
}));

function Concerts() {
    // CSS classes for styling
    const { concertSheet } = concertStyles();
    return (
        <PageLayout>
            <Parallax>
                <WelcomeVideo />
                <WelcomeOverlay to={'/concerts'}>
                    {'Explore Our 2018 – 2019 Season'}
                </WelcomeOverlay>
            </Parallax>
            <Sheet className={concertSheet}>
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

export default Concerts;
