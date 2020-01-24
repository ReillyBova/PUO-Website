// Library imports
import React from 'react';
import { graphql } from 'gatsby';
// Project imports
import {
    ConcertSeasons,
    PageLayout,
    Parallax,
    Sheet,
    ImageBanner,
} from 'components';

function PastSeasons({ data }) {
    // Render
    return (
        <PageLayout title='Past Seasons'>
            <Parallax>
                <ImageBanner fluid={data.banner.childImageSharp.fluid} />
            </Parallax>
            <Sheet hinting='visible'>
                <ConcertSeasons
                    concerts={data.concerts.nodes}
                    posters={data.posters.nodes}
                />
            </Sheet>
        </PageLayout>
    );
}

// Fetch data for page
export const pageQuery = graphql`
    query {
        banner: file(
            sourceInstanceName: {eq: "images"},
            relativeDirectory: {eq: "banners"},
            name: {eq: "past-seasons"}
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

        concerts: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/\\/src\\/content\\/Concerts\\/.*\\.md$/"},
                frontmatter: {current: {eq: "false"}}
            },
            sort: {fields: frontmatter___date}
        ) {
            nodes {
                ...ConcertDataFragment
            }
        }
    }
`;

export default PastSeasons;
