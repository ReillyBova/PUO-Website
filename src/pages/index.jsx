import React from 'react';
import Container from '@material-ui/core/Container';

import { PageLayout, Parallax, WelcomeVideo } from 'components';

function HomePage() {
    return (
        <PageLayout>
            <Parallax>
                <WelcomeVideo />
            </Parallax>
            <Container maxWidth="sm">
                <div style={{ height: 5000, backgroundColor: 'red' }} />
            </Container>
        </PageLayout>
    );
}

export default HomePage;
