import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { PageLayout } from 'components';

export default function App() {
    return (
        <PageLayout title="About" description="about this jon">
            <Container maxWidth="sm">
                <Box my={4}></Box>
            </Container>
        </PageLayout>
    );
}
