import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { PageLayout } from 'components';

export default function App() {
    return (
        <PageLayout title='About' description='about this jon'>
            <Container maxWidth='sm'>
                <div
                    id='for-our-audience'
                    style={{ backgroundColor: 'red', minHeight: 500 }}
                />
                <div
                    id='for-princeton-students'
                    style={{
                        position: 'relative',
                        backgroundColor: 'blue',
                        minHeight: 500,
                    }}
                >
                    <div
                        style={{ backgroundColor: 'purple', minHeight: 300 }}
                    />
                    <div
                        id='for-prospective-high-school-students'
                        style={{ backgroundColor: 'green', minHeight: 500 }}
                    />
                </div>
            </Container>
        </PageLayout>
    );
}
