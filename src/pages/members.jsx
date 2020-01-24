// Library imports
import React from 'react';
import { graphql } from 'gatsby';
// Project imports
import {
    PageLayout,
    Parallax,
    Sheet,
    Subheader,
    ImageBanner,
} from 'components';

function Members({ data }) {
    // Render
    return (
        <PageLayout title='Members'>
            <Parallax>
                <ImageBanner fluid={data.banner.childImageSharp.fluid} />
            </Parallax>
            <Sheet hinting='visible'>
                <Subheader>{'Members'}</Subheader>
            </Sheet>
        </PageLayout>
    );
}

// Fetch data for page
export const pageQuery = graphql`
    query {
        banner: file(
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "banners" }
            name: { eq: "members" }
        ) {
            ...ImageBannerFragment
        }

        posters: allFile(
            filter: {
                sourceInstanceName: { eq: "images" }
                relativeDirectory: { eq: "posters" }
                ext: { eq: ".jpg" }
            }
        ) {
            nodes {
                ...ConcertPosterFragment
            }
        }
    }
`;

export default Members;
