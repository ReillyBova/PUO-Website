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
    console.log(data)
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

// Query fragment for members data
export const memberDataFragment = graphql`
    fragment MemberDataFragment on MarkdownRemark {
        html
        frontmatter {
            suffixedName
            section
            seasons
        }
    }
`;

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

        members: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/\\/src\\/content\\/Members\\/.*\\.md$/"},
                frontmatter: {active: {eq: "true"}}
            },
        ) {
            nodes {
                ...MemberDataFragment
            }
        }
    }
`;

export default Members;
