import React from 'react';
import Container from '@material-ui/core/Container';

import { PageLayout, Parallax, WelcomeOverlay, WelcomeVideo } from 'components';

function HomePage() {
    return (
        <PageLayout>
            <Parallax>
                <WelcomeVideo />
                <WelcomeOverlay />
            </Parallax>
            <Container maxWidth="sm">
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
            </Container>
        </PageLayout>
    );
}

export default HomePage;
