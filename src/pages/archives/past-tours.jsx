// Library imports
import React from 'react';
import { graphql } from 'gatsby';
// Project imports
import { PageLayout, Parallax, Sheet, ImageBanner } from 'components';

function PastSeasons({ data }) {
    // Render
    return (
        <PageLayout title='Past Tours'>
            <Parallax>
                <ImageBanner fluid={data.banner.childImageSharp.fluid} />
            </Parallax>
            <Sheet hinting='visible'>GAGAGAGGAGA</Sheet>
        </PageLayout>
    );
}

// Fetch data for page
export const pageQuery = graphql`
    query {
        banner: file(
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "banners" }
            name: { eq: "past-seasons" }
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

export default PastSeasons;
